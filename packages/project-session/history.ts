import { createHash } from 'node:crypto';
import { assertProject, type Project } from '../project-model';
import { Workflow, freeze } from '../workflow';
export function contentKey(project:Project):string {
  const value = structuredClone(project); value.revision = 0; value.savedRevision = null; value.modifiedAt = value.createdAt;
  for (const asset of value.assets) asset.storage.path = `resources/${asset.fingerprint.sha256}.${asset.mediaType === 'image/png' ? 'png' : 'jpg'}`;
  return createHash('sha256').update(JSON.stringify(value)).digest('hex');
}
interface HistoryEntry { label:string; before:Project; after:Project; }
function restore(flow:Workflow,snapshot:Project,label:string):void {
  flow.edit(label,draft => {
    const protectedFields = new Set(['projectId','sourceType','createdAt','modifiedAt','revision','savedRevision','schemaVersion']);
    if (!snapshot.motion) delete draft.motion;
    if (!snapshot.inputPreparation) delete draft.inputPreparation;
    if (!snapshot.assembly) delete draft.assembly;
    if (!snapshot.structure) delete draft.structure;
    for (const [key,value] of Object.entries(snapshot)) if (!protectedFields.has(key)) (draft as unknown as Record<string,unknown>)[key] = structuredClone(value);
  });
}
export class EditHistory {
  private undoStack:HistoryEntry[] = [];
  private redoStack:HistoryEntry[] = [];
  private group:{ id:string; label:string; before:Project } | null = null;
  constructor(private flow:Workflow) {}
  get canUndo():boolean { return this.undoStack.length > 0 || this.group !== null && contentKey(this.group.before) !== contentKey(this.flow.project()); }
  get canRedo():boolean { return this.group === null && this.redoStack.length > 0; }
  get groupId():string | null { return this.group?.id ?? null; }
  begin(label:string):string { if (this.group) throw new Error('E_EDIT_GROUP_ACTIVE'); const id = crypto.randomUUID(); this.group = { id,label,before:this.flow.project() }; return id; }
  change(label:string,mutate:(draft:Project)=>void,groupId:string | null = null):void {
    if ((this.group?.id ?? null) !== groupId) throw new Error('E_EDIT_GROUP_ACTIVE');
    const before = this.flow.project(); this.flow.edit(label,mutate); const after = this.flow.project();
    if (contentKey(before) === contentKey(after)) return;
    if (!this.group) { this.undoStack.push({ label,before,after }); if (this.undoStack.length > 100) this.undoStack.shift(); this.redoStack = []; }
  }
  finish(id:string,commit:boolean):void {
    if (!this.group || this.group.id !== id) throw new Error('E_EDIT_GROUP_UNKNOWN');
    const group = this.group; this.group = null; const after = this.flow.project();
    if (contentKey(group.before) === contentKey(after)) return;
    if (!commit) { restore(this.flow,group.before,'조절 취소'); return; }
    this.undoStack.push({ label:group.label,before:group.before,after }); if (this.undoStack.length > 100) this.undoStack.shift(); this.redoStack = [];
  }
  settle():void { if (this.group) this.finish(this.group.id,true); }
  undo():void { this.settle(); const entry = this.undoStack.at(-1); if (!entry) return; restore(this.flow,entry.before,'되돌리기'); this.undoStack.pop(); this.redoStack.push(entry); }
  redo():void { if (this.group) throw new Error('E_EDIT_GROUP_ACTIVE'); const entry = this.redoStack.at(-1); if (!entry) return; restore(this.flow,entry.after,'다시 실행'); this.redoStack.pop(); this.undoStack.push(entry); }
}
export function duplicateProject(input:Project):Project {
  assertProject(input); const result = structuredClone(input); result.projectId = crypto.randomUUID(); result.displayName = (input.displayName.slice(0,110)+' (복사본)').trim();
  result.createdAt = new Date().toISOString(); result.modifiedAt = result.createdAt; result.revision = 0; if(result.structure)result.structure.inputRevision=0; result.savedRevision = null; assertProject(result); return freeze(result);
}
