import { assertProject, editProject, type Project } from '../project-model';
export type Json = null | boolean | number | string | Json[] | { [key:string]:Json };
export type Collection = 'assets' | 'parts' | 'groups' | 'parameters' | 'partBindings' | 'inputBindings' | 'expressions' | 'broadcastProfiles' | 'exportProfiles';
export interface Slot { exists:boolean; value:Json; }
export interface Change { key:string; collection:Collection | 'project'; entityId:string | null; field:string | null; before:Slot; after:Slot; }
export interface Transaction { projectId:string; baseRevision:number; label:string; changes:Change[]; }
export interface Comparison { key:string; status:'safe' | 'conflict' | 'already'; current:Slot; before:Slot; after:Slot; }
const collections: Collection[] = ['assets','parts','groups','parameters','partBindings','inputBindings','expressions','broadcastProfiles','exportProfiles'];
const projectFields = new Set(['displayName','canvas','inputAssetIds','runtimeProfile','provenance','derivedProjects']);
const forbidden = new Set(['id','__proto__','constructor','prototype']);
export function freeze<T>(value:T): T { if (value && typeof value === 'object') { for (const child of Object.values(value)) freeze(child); Object.freeze(value); } return value; }
export function json(value:unknown, depth = 0): Json {
  if (depth > 32) throw new Error('E_TASK_DATA_DEPTH');
  if (value === null || typeof value === 'string' || typeof value === 'boolean' || typeof value === 'number' && Number.isFinite(value)) {
    if (depth === 0 && typeof value === 'string' && new TextEncoder().encode(JSON.stringify(value)).length > 256*1024) throw new Error('E_TASK_DATA_SIZE'); return value;
  }
  if (typeof value !== 'object' || (!Array.isArray(value) && Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null)) throw new Error('E_TASK_DATA');
  const result = Array.isArray(value) ? value.map(v => json(v,depth+1)) : Object.fromEntries(Object.entries(value).map(([key,v]) => {
    if (['__proto__','constructor','prototype'].includes(key)) throw new Error('E_TASK_DATA_KEY'); return [key,json(v,depth+1)];
  }));
  if (depth === 0 && new TextEncoder().encode(JSON.stringify(result)).length > 256*1024) throw new Error('E_TASK_DATA_SIZE');
  return result;
}
export const equal = (a:unknown,b:unknown): boolean => {
  if (a === b) return true;
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object' || Array.isArray(a) !== Array.isArray(b)) return false;
  const ka = Object.keys(a).sort(); const kb = Object.keys(b).sort();
  return ka.length === kb.length && ka.every((key,i) => key === kb[i] && equal((a as Record<string,unknown>)[key],(b as Record<string,unknown>)[key]));
};
const slot = (exists:boolean,value:unknown): Slot => ({ exists,value:exists ? structuredClone(value) as Json : null });
export function transaction(before:Project, after:Project, label:string): Transaction {
  assertProject(before); assertProject(after);
  for (const field of ['projectId','sourceType','createdAt','savedRevision'] as const) if (!equal(before[field],after[field])) throw new Error('E_TRANSACTION_IDENTITY');
  if (!equal(before.schemaVersion,after.schemaVersion)) throw new Error('E_TRANSACTION_IDENTITY');
  if (!label.trim() || label.length > 120) throw new Error('E_TRANSACTION_LABEL');
  const changes: Change[] = [];
  for (const field of projectFields) if (!equal(before[field as keyof Project],after[field as keyof Project])) changes.push({ key:'project/'+field,collection:'project',entityId:null,field,before:slot(true,before[field as keyof Project]),after:slot(true,after[field as keyof Project]) });
  for (const collection of collections) {
    const a = new Map(before[collection].map(v => [v.id,v as unknown as Record<string,unknown>]));
    const b = new Map(after[collection].map(v => [v.id,v as unknown as Record<string,unknown>]));
    for (const id of [...new Set([...a.keys(),...b.keys()])].sort()) {
      const av = a.get(id); const bv = b.get(id);
      if (!av || !bv) { changes.push({ key:collection+'/'+id,collection,entityId:id,field:null,before:slot(!!av,av),after:slot(!!bv,bv) }); continue; }
      for (const field of [...new Set([...Object.keys(av),...Object.keys(bv)])].sort()) if (!equal(av[field],bv[field])) {
        if (forbidden.has(field)) throw new Error('E_TRANSACTION_FIELD');
        changes.push({ key:collection+'/'+id+'/'+field,collection,entityId:id,field,before:slot(Object.hasOwn(av,field),av[field]),after:slot(Object.hasOwn(bv,field),bv[field]) });
      }
    }
  }
  return freeze({ projectId:before.projectId,baseRevision:before.revision,label:label.trim(),changes });
}
function currentSlot(project:Project,change:Change): Slot {
  if (change.collection === 'project') return slot(true,project[change.field as keyof Project]);
  const entity = project[change.collection].find(v => v.id === change.entityId) as unknown as Record<string,unknown> | undefined;
  return change.field === null ? slot(!!entity,entity) : slot(!!entity && Object.hasOwn(entity,change.field),entity?.[change.field]);
}
export function compare(project:Project,tx:Transaction): Comparison[] {
  assertProject(project);
  if (project.projectId !== tx.projectId) throw new Error('E_TRANSACTION_PROJECT');
  return tx.changes.map(change => { const current = currentSlot(project,change); return { key:change.key,current,before:change.before,after:change.after,
    status:equal(current,change.after) ? 'already' : equal(current,change.before) ? 'safe' : 'conflict' }; });
}
export function applyTransaction(project:Project,tx:Transaction,expectedRevision:number,selected:readonly string[] = tx.changes.map(v => v.key)): Project {
  assertProject(project);
  if (project.revision !== expectedRevision) throw new Error('E_TRANSACTION_STALE');
  const comparisons = compare(project,tx); const keys = new Set(selected);
  if (!keys.size || keys.size !== selected.length || [...keys].some(key => !tx.changes.some(c => c.key === key))) throw new Error('E_TRANSACTION_SELECTION');
  if (comparisons.some(c => keys.has(c.key) && c.status === 'conflict')) throw new Error('E_TRANSACTION_CONFLICT');
  const chosen = tx.changes.filter(c => keys.has(c.key) && comparisons.find(v => v.key === c.key)!.status !== 'already');
  if (!chosen.length) return project;
  return editProject(project,draft => {
    const seen = new Set<string>();
    for (const change of chosen) {
      if (seen.has(change.key)) throw new Error('E_TRANSACTION_DUPLICATE'); seen.add(change.key);
      if (change.collection === 'project') {
        if (!change.field || !projectFields.has(change.field) || change.entityId !== null || !change.after.exists) throw new Error('E_TRANSACTION_FIELD');
        (draft as unknown as Record<string,unknown>)[change.field] = structuredClone(change.after.value); continue;
      }
      if (!collections.includes(change.collection) || !change.entityId) throw new Error('E_TRANSACTION_FIELD');
      const items = draft[change.collection] as unknown as Record<string,unknown>[]; const index = items.findIndex(v => v.id === change.entityId);
      if (change.field === null) {
        if (!change.after.exists) { if (index >= 0) items.splice(index,1); }
        else {
          const item = structuredClone(change.after.value) as Record<string,unknown>;
          if (item.id !== change.entityId) throw new Error('E_TRANSACTION_IDENTITY');
          if (index >= 0) items[index] = item; else items.push(item);
        }
      } else {
        if (forbidden.has(change.field) || index < 0) throw new Error('E_TRANSACTION_FIELD');
        if (change.after.exists) items[index]![change.field] = structuredClone(change.after.value); else delete items[index]![change.field];
      }
    }
  });
}
