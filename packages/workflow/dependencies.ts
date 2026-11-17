import type { Project } from '../project-model';
import type { Transaction } from './transactions';
export type DependencyKey = string;
/** Domain:entity keys and domain:* counters; no prior valid result is deleted. */
export function impactedKeys(before:Project,after:Project,tx:Transaction): Set<DependencyKey> {
  const keys = new Set<string>();
  const add = (domain:string,id = '*'): void => { keys.add(domain+':'+id); keys.add(domain+':*'); };
  const projects = [before,after];
  const parametersForPart = (id:string): Set<string> => new Set(projects.flatMap(p => p.partBindings.filter(b => b.partId === id).map(b => b.parameterId)));
  const parameter = (id:string): void => {
    add('parameter',id); add('input',id); add('runtime',id); add('compatibility',id); add('export',id);
    for (const p of projects) for (const e of p.expressions) if (e.values.some(v => v.parameterId === id)) add('expression',e.id);
  };
  const part = (id:string,appearance:boolean,descendants=true): void => {
    const affected = new Set([id]); let changed = descendants;
    while (changed) { changed = false; for (const p of projects) for (const item of p.parts) if (item.parentId && affected.has(item.parentId) && !affected.has(item.id)) { affected.add(item.id); changed = true; } }
    for (const target of affected) {
      add('references',target); add('geometry',target); add('runtime',target); add('compatibility',target); add('export',target);
      if (appearance) add('texture',target);
      for (const parameterId of parametersForPart(target)) { add('bindings',parameterId); for (const p of projects) for (const e of p.expressions) if (e.values.some(v => v.parameterId === parameterId)) add('expression',e.id); }
    }
  };
  for (const change of tx.changes) {
    const id = change.entityId ?? '*'; const field = change.field;
    if (change.collection === 'parts') {
      if (field === 'displayName') { add('export-names',id); add('export',id); }
      else part(id,field === null || field === 'textures' || field === 'opacity' || field === 'visible');
    } else if (change.collection === 'assets') {
      if (field === 'storage') { add('resources',id); continue; }
      if (['attribution','origin','kind','parentAssetIds'].includes(field ?? '')) { add('provenance',id); continue; }
      const assets = new Set([id]); let changed = true;
      while (changed) { changed = false; for (const p of projects) for (const a of p.assets) if (a.parentAssetIds.some(parent => assets.has(parent)) && !assets.has(a.id)) { assets.add(a.id); changed = true; } }
      for (const asset of assets) { add('analysis',asset); add('texture',asset); add('resources',asset); for (const p of projects) for (const item of p.parts) if (item.textures.some(t => t.assetId === asset)) part(item.id,true); }
    } else if (change.collection === 'parameters') { if (field === 'displayName') { add('export-names',id); add('export',id); } else parameter(id); }
    else if (change.collection === 'inputBindings') {
      for (const p of projects) { const binding = p.inputBindings.find(v => v.id === id); if (binding) { add('input',binding.parameterId); add('runtime',binding.parameterId); } }
    } else if (change.collection === 'partBindings') {
      for (const p of projects) { const binding = p[change.collection].find(v => v.id === id); if (binding) { parameter(binding.parameterId); if ('partId' in binding) part(binding.partId,false); } }
    } else if (change.collection === 'expressions') { add('expression',id); add('runtime',id); add('compatibility',id); add('export',id); }
    else if (change.collection === 'exportProfiles') { add('compatibility',id); add('export',id); }
    else if (change.collection === 'broadcastProfiles') { add('output',id); add('external-confirmation',id); }
    else if (change.collection === 'groups') {
      if (field === 'displayName') { add('export-names',id); add('export',id); continue; }
      const groups = new Set([id]); let changed = true;
      while (changed) { changed = false; for (const p of projects) for (const g of p.groups) if (g.parentGroupId && groups.has(g.parentGroupId) && !groups.has(g.id)) { groups.add(g.id); changed = true; } }
      for (const p of projects) for (const item of p.parts) if (item.groupId && groups.has(item.groupId)) part(item.id,false);
    }
    else if (change.collection === 'project') {
      if (field === 'displayName') { add('export-names'); add('export'); }
      else if (field === 'runtimeProfile') { add('runtime'); add('input'); add('output'); }
      else if(field==='motion'){const all=new Set([...before.motion?.meshes.map(m=>m.partId)??[],...after.motion?.meshes.map(m=>m.partId)??[]]);for(const id of all)if(JSON.stringify(before.motion?.meshes.find(m=>m.partId===id))!==JSON.stringify(after.motion?.meshes.find(m=>m.partId===id))||JSON.stringify(before.motion?.settings)!==JSON.stringify(after.motion?.settings)||before.motion?.maxRollDegrees!==after.motion?.maxRollDegrees)part(id,false,false);add('runtime');add('compatibility');add('export');}
      else if(field==='tracking'||field==='expressionSettings'){add('input');add('runtime');add('expression');}
      else if(field==='detail')add('provenance');
      else if (field === 'provenance' || field === 'derivedProjects') add('provenance');
      else { add('analysis'); add('references'); add('geometry'); add('runtime'); add('compatibility'); add('export'); }
    }
  }
  return keys;
}
export class DerivedRegistry {
  private versions = new Map<string,number>();
  private entries = new Map<string,{ dependencies:Map<string,number>; sourceRevision:number }>();
  register(id:string,revision:number,dependencies:readonly string[],snapshot:ReadonlyMap<string,number> = this.versions): void {
    if (!dependencies.length || dependencies.some(key => !/^[a-z-]+:(\*|[A-Za-z0-9_-]+)$/.test(key))) throw new Error('E_DEPENDENCY_KEY');
    this.entries.set(id,{ sourceRevision:revision,dependencies:new Map(dependencies.map(key => [key,snapshot.get(key) ?? 0])) });
  }
  snapshot():ReadonlyMap<string,number> { return new Map(this.versions); }
  invalidate(keys:Iterable<string>): void { for (const key of new Set(keys)) this.versions.set(key,(this.versions.get(key) ?? 0)+1); }
  state(id:string): 'MISSING' | 'VALID' | 'STALE' {
    const item = this.entries.get(id); if (!item) return 'MISSING'; return [...item.dependencies].every(([key,version]) => (this.versions.get(key) ?? 0) === version) ? 'VALID' : 'STALE';
  }
  clear(): void { this.versions.clear(); this.entries.clear(); }
}
