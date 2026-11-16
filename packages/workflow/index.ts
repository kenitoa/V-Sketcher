import { assertProject, acknowledgeSave, isDirty, editProject, type Project } from '../project-model';
import { transaction, compare, applyTransaction, freeze, json, equal, type Json, type Transaction, type Comparison } from './transactions';
import { DerivedRegistry, impactedKeys } from './dependencies';
export * from './transactions';
export * from './dependencies';
export type JobState = 'QUEUED' | 'RUNNING' | 'CANCEL_REQUESTED' | 'RESULT_READY' | 'AWAITING_REVIEW' | 'SUCCEEDED' | 'FAILED' | 'CANCELLED' | 'DISCARDED';
export type JobKind = 'prepare' | 'save' | 'export' | 'check' | 'preview';
export interface Axes {
  project:'EMPTY' | 'DRAFT' | 'READY' | 'RECOVERY_REQUIRED'; save:'CLEAN' | 'DIRTY' | 'SAVING' | 'SAVE_FAILED';
  preparation:'INPUT_READY' | 'ANALYZING' | 'NEEDS_FIX' | 'EDITABLE' | 'MOTION_READY';
  camera:'DISCONNECTED' | 'CONNECTING' | 'AVAILABLE' | 'DENIED' | 'BUSY' | 'FAILED';
  microphone:Axes['camera']; tracking:'IDLE' | 'CALIBRATING' | 'TRACKING' | 'LOST' | 'RECOVERING';
  runtime:'STOPPED' | 'STARTING' | 'RUNNING' | 'DEGRADED' | 'STOPPING' | 'FAILED';
  output:'OFF' | 'PREPARING' | 'SOURCE_READY' | 'FAILED'; external:'UNCONFIRMED' | 'USER_CONFIRMED' | 'AUTO_VERIFIED' | 'STALE';
  compatibility:'NOT_CHECKED' | 'CHECKING' | 'PASS' | 'WARNING' | 'BLOCKED' | 'STALE'; files:'NONE' | 'BUILDING' | 'WRITTEN' | 'WRITE_FAILED';
}
export interface JobIdentity { protocol:1; jobId:string; projectId:string; inputRevision:number; generation:number; processingVersion:string; }
export interface JobView extends JobIdentity { kind:JobKind; label:string; state:JobState; stageId:string | null; progress:number; errorCode:string | null; retryOf:string | null; resumedSteps:number; }
export interface StageContext {
  readonly input:Project; readonly identity:Readonly<JobIdentity>; readonly settings:Json; readonly signal:AbortSignal;
  checkpoint():void; progress(fraction:number):boolean; own(cleanup:()=>void | Promise<void>):void;
}
export interface Step { id:string; version:string; cache:'none' | 'pure-json'; cancellable:boolean; run(context:StageContext,previous:ReadonlyMap<string,Json>):Promise<Json>; }
export type Outcome = { kind:'candidate'; project:Project } | { kind:'checked'; reportId:string; dependencies:string[] } |
  { kind:'saved' } | { kind:'exported' };
export interface ResultEnvelope { identity:JobIdentity; outcome:Outcome; }
export interface Plan { key:string; label:string; kind:JobKind; processingVersion:string; settings:Json; steps:readonly Step[];
  collect(input:Project,identity:JobIdentity,outputs:ReadonlyMap<string,Json>):ResultEnvelope; }
interface Entry {
  view:JobView; input:Project; plan:Plan; identity:JobIdentity; controller:AbortController;
  activeStage:number; stageOpen:boolean; cancelled:boolean; revoked:boolean; cleanups:(()=>void | Promise<void>)[]; released:boolean;
  cache:Map<string,{ version:string; value:Json }>; outputs:Map<string,Json>; tx:Transaction | null; outcome:Outcome | null;
  waiters:Set<(value:JobView)=>void>; execution:Promise<void> | null; finalizing:Promise<void> | null; executing:boolean; reviewBusy:boolean; dependencySnapshot:ReadonlyMap<string,number>;
}
const terminal = new Set<JobState>(['SUCCEEDED','FAILED','CANCELLED','DISCARDED']);
const settled = (state:JobState):boolean => terminal.has(state) || state === 'AWAITING_REVIEW';
const codeOf = (error:unknown):string => error instanceof Error && /^E_[A-Z_]{1,48}$/.test(error.message) ? error.message : 'E_TASK_FAILED';
const identityMatches = (a:JobIdentity,b:JobIdentity):boolean => ['protocol','jobId','projectId','inputRevision','generation','processingVersion'].every(key => a[key as keyof JobIdentity] === b[key as keyof JobIdentity]);
const initialAxes = (project:Project):Axes => ({ project:project.parts.length ? 'READY' : 'DRAFT',save:isDirty(project) ? 'DIRTY' : 'CLEAN',preparation:project.parts.length ? 'EDITABLE' : 'INPUT_READY',camera:'DISCONNECTED',microphone:'DISCONNECTED',tracking:'IDLE',runtime:'STOPPED',output:'OFF',external:'UNCONFIRMED',compatibility:'NOT_CHECKED',files:'NONE' });
/** Owns one editable project and an independently published immutable runtime snapshot. */
export class Workflow {
  private current:Project;
  private axes:Axes;
  private generation = 0;
  private entries = new Map<string,Entry>();
  private queue:string[] = [];
  private busy = new Set<JobKind>();
  private listeners = new Set<()=>void>();
  private closed = false;
  private closePromise:Promise<void> | null = null;
  private switching = false;
  private runtime:Project | null = null;
  private pendingRuntime:{ project:Project; generation:number } | null = null;
  private checkpoints:{ jobId:string; project:Project }[] = [];
  readonly derived = new DerivedRegistry();
  constructor(project:Project) { assertProject(project); this.current = freeze(structuredClone(project)); this.axes = initialAxes(project); }
  project():Project { return this.current; }
  acknowledgeSaved(snapshotRevision:number):void { this.available(); this.current = freeze(acknowledgeSave(this.current,snapshotRevision)); this.axes.save = isDirty(this.current) ? 'DIRTY' : 'CLEAN'; this.emit(); }
  view():{ project:Project; axes:Axes; generation:number; switching:boolean; jobs:JobView[]; runtimeProjectId:string | null; runtimeRevision:number | null; checkpointCount:number } {
    const axes = { ...this.axes }; const active = [...this.entries.values()].filter(e => e.identity.generation === this.generation && e.executing && ['RUNNING','CANCEL_REQUESTED','RESULT_READY'].includes(e.view.state));
    if (active.some(e => e.plan.kind === 'prepare')) axes.preparation = 'ANALYZING';
    else if ([...this.entries.values()].some(e => e.identity.generation === this.generation && e.plan.kind === 'prepare' && e.view.state === 'AWAITING_REVIEW')) axes.preparation = 'NEEDS_FIX';
    if (active.some(e => e.plan.kind === 'save')) axes.save = 'SAVING';
    if (active.some(e => e.plan.kind === 'export')) axes.files = 'BUILDING';
    return freeze({ project:this.current,axes,generation:this.generation,switching:this.switching,jobs:[...this.entries.values()].map(e => ({ ...e.view })),runtimeProjectId:this.runtime?.projectId ?? null,runtimeRevision:this.runtime?.revision ?? null,checkpointCount:this.checkpoints.length });
  }
  subscribe(listener:()=>void):()=>void { this.listeners.add(listener); return () => this.listeners.delete(listener); }
  private emit():void { for (const listener of this.listeners) { try { listener(); } catch { /* observer failures cannot corrupt work */ } } }
  private available():void { if (this.closed || this.switching) throw new Error('E_WORKSPACE_UNAVAILABLE'); }
  setAxis<K extends keyof Axes>(key:K,value:Axes[K]):void { this.available(); this.axes[key] = value; this.emit(); }
  deviceChanged(device:'camera' | 'microphone',state:Axes['camera']):void {
    this.available(); this.derived.invalidate([`device:${device}`,'device:*','input:*','runtime:*']); this.axes[device] = state; this.emit();
  }
  can(action:'image' | 'camera' | 'microphone' | 'export' | 'output'):boolean {
    if (this.closed || this.switching || this.axes.project === 'EMPTY' || this.axes.project === 'RECOVERY_REQUIRED') return false;
    if (action === 'camera') return this.axes.camera === 'AVAILABLE';
    if (action === 'microphone') return this.axes.microphone === 'AVAILABLE';
    if (action === 'output') return this.runtime !== null && ['RUNNING','DEGRADED'].includes(this.axes.runtime);
    return this.current.parts.some(part => part.visible && part.textures.length > 0);
  }
  edit(label:string,mutate:(draft:Project)=>void):Transaction {
    this.available(); const next = editProject(this.current,mutate); const tx = transaction(this.current,next,label);
    if (!tx.changes.length) return tx;
    this.commitProject(next,tx); this.emit(); return tx;
  }
  private commitProject(next:Project,tx:Transaction):void {
    const impact = impactedKeys(this.current,next,tx); this.derived.invalidate(impact);
    this.current = freeze(next); this.pendingRuntime = null;
    if (this.axes.project !== 'RECOVERY_REQUIRED') this.axes.project = next.parts.length ? 'READY' : 'DRAFT';
    if (!next.parts.length) this.axes.preparation = 'INPUT_READY'; else if (this.axes.preparation === 'INPUT_READY') this.axes.preparation = 'EDITABLE';
    if (!['SAVING','SAVE_FAILED'].includes(this.axes.save)) this.axes.save = isDirty(next) ? 'DIRTY' : 'CLEAN';
    if (this.axes.compatibility === 'PASS' || this.axes.compatibility === 'WARNING') {
      if ([...impact].some(key => key.startsWith('compatibility:'))) this.axes.compatibility = 'STALE';
    }
    if ([...impact].some(key => key.startsWith('external-confirmation:')) && this.axes.external !== 'UNCONFIRMED') this.axes.external = 'STALE';
  }
  stageRuntime():void { this.available(); assertProject(this.current); this.pendingRuntime = { project:this.current,generation:this.generation }; }
  publishAtFrameBoundary():Project | null {
    const pending = this.pendingRuntime;
    if (pending && pending.generation === this.generation && pending.project === this.current && !this.closed && !this.switching) {
      this.runtime = pending.project; this.pendingRuntime = null; this.axes.runtime = 'RUNNING'; this.emit();
    }
    return this.runtime;
  }
  runtimeSnapshot():Project | null { return this.runtime; }
  checkpoint(index = 0):Project | null { return this.checkpoints.at(-1-index)?.project ?? null; }
  job(id:string):JobView { const entry = this.entry(id); return freeze({ ...entry.view }); }
  private entry(id:string):Entry { const entry = this.entries.get(id); if (!entry) throw new Error('E_JOB_UNKNOWN'); return entry; }
  start(plan:Plan):{ jobId:string; reused:boolean } { return this.enqueue(plan,null); }
  private enqueue(plan:Plan,retryOf:string | null):{ jobId:string; reused:boolean } {
    this.available();
    if (!['prepare','save','export','check','preview'].includes(plan.kind) || !/^[A-Za-z0-9_-]{1,64}$/.test(plan.key) || !plan.label.trim() || plan.label.length > 120 || !/^\d+\.\d+\.\d+$/.test(plan.processingVersion) || !plan.steps.length || plan.steps.length > 32 || new Set(plan.steps.map(s => s.id)).size !== plan.steps.length || plan.steps.some(s => !/^[A-Za-z0-9_-]{1,64}$/.test(s.id) || !/^\d+\.\d+\.\d+$/.test(s.version))) throw new Error('E_JOB_PLAN');
    const duplicate = [...this.entries.values()].find(e => e.identity.generation === this.generation && e.plan.kind === plan.kind && e.plan.key === plan.key && !terminal.has(e.view.state));
    const settings = freeze(json(plan.settings));
    if (duplicate) {
      if (duplicate.identity.inputRevision !== this.current.revision || duplicate.identity.processingVersion !== plan.processingVersion || !equal(duplicate.plan.settings,settings) || !equal(duplicate.plan.steps.map(s => [s.id,s.version]),plan.steps.map(s => [s.id,s.version]))) throw new Error('E_JOB_ACTIVE_CHANGED');
      return { jobId:duplicate.view.jobId,reused:true };
    }
    const completed = [...this.entries.values()].filter(e => terminal.has(e.view.state) && !e.executing && !e.reviewBusy && !e.cleanups.length);
    while (this.entries.size >= 32 && completed.length) this.entries.delete(completed.shift()!.view.jobId);
    if (this.entries.size >= 32) throw new Error('E_JOB_LIMIT');
    const jobId = crypto.randomUUID(); const identity = freeze({ protocol:1 as const,jobId,projectId:this.current.projectId,inputRevision:this.current.revision,generation:this.generation,processingVersion:plan.processingVersion });
    const entry:Entry = { identity,view:{ ...identity,kind:plan.kind,label:plan.label.trim(),state:'QUEUED',stageId:null,progress:0,errorCode:null,retryOf,resumedSteps:0 },input:freeze(structuredClone(this.current)),
      plan:Object.freeze({ ...plan,settings,steps:Object.freeze(plan.steps.map(step => Object.freeze({ ...step }))) }),controller:new AbortController(),activeStage:-1,stageOpen:false,cancelled:false,revoked:false,cleanups:[],released:false,cache:new Map(),outputs:new Map(),tx:null,outcome:null,waiters:new Set(),execution:null,finalizing:null,executing:false,reviewBusy:false,dependencySnapshot:this.derived.snapshot() };
    if (retryOf) {
      const prior = this.entry(retryOf);
      if (prior.identity.projectId === identity.projectId && prior.identity.generation === identity.generation && prior.identity.inputRevision === identity.inputRevision && prior.identity.processingVersion === identity.processingVersion) {
        for (const step of plan.steps) { const cached = prior.cache.get(step.id); if (step.cache !== 'pure-json' || !cached || cached.version !== step.version) break;
          entry.cache.set(step.id,{ version:cached.version,value:freeze(structuredClone(cached.value)) }); entry.view.resumedSteps++; }
      }
    }
    this.entries.set(jobId,entry); this.queue.push(jobId); this.emit(); queueMicrotask(() => this.pump()); return { jobId,reused:false };
  }
  private transition(entry:Entry,state:JobState):void {
    entry.view.state = state; this.emit(); if (settled(entry.view.state)) { const view = freeze({ ...entry.view }); for (const resolve of entry.waiters) resolve(view); entry.waiters.clear(); }
  }
  private valid(entry:Entry):boolean { return !this.closed && !entry.revoked && entry.identity.generation === this.generation && entry.identity.projectId === this.current.projectId; }
  private boundary(entry:Entry):void { if (!this.valid(entry)) throw new Error('E_JOB_REVOKED'); if (entry.cancelled) throw new Error('E_JOB_CANCELLED'); }
  private pump():void {
    for (const id of [...this.queue]) {
      const entry = this.entry(id); if (this.busy.has(entry.plan.kind) || entry.view.state !== 'QUEUED') continue;
      this.queue = this.queue.filter(v => v !== id); this.busy.add(entry.plan.kind); entry.executing = true;
      entry.execution = this.execute(entry).finally(() => { this.busy.delete(entry.plan.kind); this.pump(); });
    }
  }
  private async execute(entry:Entry):Promise<void> {
    try {
      this.boundary(entry);
      this.transition(entry,'RUNNING');
      for (let index = 0; index < entry.plan.steps.length; index++) {
        this.boundary(entry); const step = entry.plan.steps[index]!; entry.activeStage = index; entry.stageOpen = true; entry.view.stageId = step.id; this.emit(); this.boundary(entry);
        const context:StageContext = { input:entry.input,identity:entry.identity,settings:entry.plan.settings,signal:entry.controller.signal,
          checkpoint:() => { if (!entry.stageOpen || entry.activeStage !== index) throw new Error('E_RESOURCE_SCOPE_CLOSED'); if (step.cancellable) this.boundary(entry); },
          progress:fraction => {
            if (!entry.stageOpen || entry.activeStage !== index || entry.view.state !== 'RUNNING' || !Number.isFinite(fraction) || fraction < 0 || fraction > 1 || !this.valid(entry)) return false;
            const progress = (index+fraction)/entry.plan.steps.length; if (progress < entry.view.progress) return false; entry.view.progress = progress; this.emit(); return true;
          },own:cleanup => { if (!entry.stageOpen || entry.activeStage !== index || entry.released) throw new Error('E_RESOURCE_SCOPE_CLOSED'); entry.cleanups.push(cleanup); } };
        const cached = entry.cache.get(step.id);
        const value = cached ? cached.value : await step.run(context,new Map(entry.outputs));
        entry.stageOpen = false; this.boundary(entry); const output = freeze(json(value)); entry.outputs.set(step.id,output);
        if (new TextEncoder().encode(JSON.stringify([...entry.outputs])).length > 1024*1024) throw new Error('E_TASK_DATA_SIZE');
        if (step.cache === 'pure-json') entry.cache.set(step.id,{ version:step.version,value:output });
        entry.view.progress = (index+1)/entry.plan.steps.length; this.emit();
      }
      this.boundary(entry);
      const result = entry.plan.collect(entry.input,{ ...entry.identity },new Map(entry.outputs));
      if (!identityMatches(entry.identity,result.identity)) throw new Error('E_RESULT_IDENTITY');
      const expectedKind = { prepare:'candidate',save:'saved',export:'exported',check:'checked',preview:'checked' }[entry.plan.kind];
      if (result.outcome?.kind !== expectedKind) throw new Error('E_RESULT_KIND');
      entry.outcome = freeze(structuredClone(result.outcome));
      if (entry.outcome.kind === 'candidate') entry.tx = transaction(entry.input,entry.outcome.project,entry.plan.label);
      this.transition(entry,'RESULT_READY'); await Promise.resolve(); this.boundary(entry);
      if (entry.tx && this.current.revision !== entry.identity.inputRevision) { this.transition(entry,'AWAITING_REVIEW'); this.boundary(entry); return; }
      await this.finalize(entry);
    } catch (error) { await this.failed(entry,error); }
    finally { entry.stageOpen = false; entry.executing = false; }
  }
  private async release(entry:Entry):Promise<void> {
    if (entry.released) return; const failed:(()=>void | Promise<void>)[] = [];
    for (const cleanup of entry.cleanups.splice(0).reverse()) { try { await cleanup(); } catch { failed.push(cleanup); } }
    entry.cleanups = failed.reverse(); entry.released = failed.length === 0;
    if (failed.length) throw new Error('E_RESOURCE_CLEANUP');
  }
  private async failed(entry:Entry,error:unknown):Promise<void> {
    entry.stageOpen = false;
    try { await this.release(entry); } catch { entry.view.errorCode = 'E_RESOURCE_CLEANUP'; this.transition(entry,'FAILED'); return; }
    if (entry.cancelled || entry.revoked || !this.valid(entry)) {
      this.transition(entry,entry.revoked ? 'DISCARDED' : 'CANCELLED'); return;
    }
    entry.view.errorCode = codeOf(error);
    if (entry.plan.kind === 'prepare') this.axes.preparation = 'NEEDS_FIX';
    if (entry.plan.kind === 'save') this.axes.save = 'SAVE_FAILED';
    if (entry.plan.kind === 'export') this.axes.files = 'WRITE_FAILED';
    this.transition(entry,'FAILED');
  }
  private async finalize(entry:Entry,expectedRevision = this.current.revision,selection?:readonly string[]):Promise<void> {
    this.boundary(entry); const before = this.current;
    const next = entry.tx && entry.tx.changes.length ? applyTransaction(before,entry.tx,expectedRevision,selection) : before;
    await this.release(entry); this.boundary(entry);
    if (entry.tx && this.current.revision !== expectedRevision) { this.transition(entry,'AWAITING_REVIEW'); this.boundary(entry); return; }
    if (next !== before) {
      this.checkpoints.push({ jobId:entry.identity.jobId,project:before }); if (this.checkpoints.length > 5) this.checkpoints.shift();
      this.commitProject(next,transaction(before,next,entry.plan.label));
    }
    if (entry.outcome?.kind === 'saved') { this.current = freeze(acknowledgeSave(this.current,entry.identity.inputRevision)); this.axes.save = isDirty(this.current) ? 'DIRTY' : 'CLEAN'; }
    if (entry.outcome?.kind === 'exported') this.axes.files = 'WRITTEN';
    if (entry.outcome?.kind === 'checked') this.derived.register(entry.outcome.reportId,entry.identity.inputRevision,entry.outcome.dependencies,entry.dependencySnapshot);
    if (entry.plan.kind === 'prepare') this.axes.preparation = 'EDITABLE';
    entry.view.errorCode = null; entry.view.progress = 1; this.transition(entry,'SUCCEEDED');
  }
  wait(id:string):Promise<JobView> { const entry = this.entry(id); return settled(entry.view.state) ? Promise.resolve(this.job(id)) : new Promise(resolve => { entry.waiters.add(resolve); }); }
  cancel(id:string):boolean {
    const entry = this.entry(id); if (terminal.has(entry.view.state) || entry.cancelled) return false;
    entry.cancelled = true; this.transition(entry,'CANCEL_REQUESTED');
    const stage = entry.plan.steps[entry.activeStage]; if (!stage || stage.cancellable) entry.controller.abort();
    if (!entry.executing && !entry.reviewBusy) {
      this.queue = this.queue.filter(v => v !== id); entry.finalizing = this.failed(entry,new Error('E_JOB_CANCELLED'));
    }
    return true;
  }
  retry(id:string):{ jobId:string; reused:boolean } {
    const entry = this.entry(id); if (!['FAILED','CANCELLED'].includes(entry.view.state)) throw new Error('E_RETRY_STATE');
    if (entry.cleanups.length) throw new Error('E_RESOURCE_CLEANUP');
    return this.enqueue(entry.plan,id);
  }
  refreshStaleChecks(checks:readonly { reportId:string; plan:Plan }[]):string[] {
    this.available(); const jobs:string[] = [];
    for (const check of checks) {
      if (check.plan.kind !== 'check' || check.reportId !== check.plan.key) throw new Error('E_REPORT_PLAN');
      if (this.derived.state(check.reportId) === 'STALE') jobs.push(this.start(check.plan).jobId);
    }
    return jobs;
  }
  comparison(id:string):{ revision:number; changes:Comparison[] } {
    const entry = this.entry(id); if (entry.view.state !== 'AWAITING_REVIEW' || !entry.tx || !this.valid(entry)) throw new Error('E_REVIEW_STATE');
    return { revision:this.current.revision,changes:compare(this.current,entry.tx) };
  }
  revalidate(id:string,expectedRevision:number,selected?:readonly string[]):{ valid:boolean; code:string | null } {
    const entry = this.entry(id);
    try { this.comparison(id); if (this.current.revision !== expectedRevision) throw new Error('E_TRANSACTION_STALE'); if (entry.tx!.changes.length) applyTransaction(this.current,entry.tx!,expectedRevision,selected); return { valid:true,code:null }; }
    catch (error) { return { valid:false,code:codeOf(error) }; }
  }
  async applyReviewed(id:string,expectedRevision:number,selected?:readonly string[]):Promise<{ applied:boolean; code:string | null }> {
    const entry = this.entry(id); if (entry.reviewBusy) return { applied:false,code:'E_REVIEW_BUSY' }; const validation = this.revalidate(id,expectedRevision,selected);
    if (!validation.valid) { entry.view.errorCode = validation.code; this.emit(); return { applied:false,code:validation.code }; }
    entry.reviewBusy = true;
    try { entry.finalizing = this.finalize(entry,expectedRevision,selected); await entry.finalizing; return { applied:entry.view.state === 'SUCCEEDED',code:entry.view.errorCode }; }
    catch (error) { await this.failed(entry,error); return { applied:false,code:entry.view.errorCode }; }
    finally { entry.reviewBusy = false; }
  }
  async discard(id:string):Promise<void> {
    const entry = this.entry(id); if (entry.reviewBusy) throw new Error('E_REVIEW_BUSY'); if (entry.view.state !== 'AWAITING_REVIEW') throw new Error('E_REVIEW_STATE');
    entry.reviewBusy = true;
    entry.finalizing = (async () => { try { await this.release(entry); this.transition(entry,'DISCARDED'); } catch (error) { await this.failed(entry,error); } finally { entry.reviewBusy = false; } })(); await entry.finalizing;
  }
  async rerun(id:string):Promise<{ jobId:string; reused:boolean }> { const entry = this.entry(id); await this.discard(id); if (entry.view.state !== 'DISCARDED') throw new Error('E_RESOURCE_CLEANUP'); return this.start(entry.plan); }
  async retryCleanup(id:string):Promise<void> { const entry = this.entry(id); if (entry.executing && terminal.has(entry.view.state)) await entry.execution; if (entry.executing || entry.reviewBusy) throw new Error('E_REVIEW_BUSY'); await this.release(entry); if (entry.view.errorCode === 'E_RESOURCE_CLEANUP') { entry.view.errorCode = null; this.emit(); } }
  private async revoke():Promise<void> {
    this.generation++;
    for (const entry of this.entries.values()) if (!terminal.has(entry.view.state)) { entry.revoked = true; this.cancel(entry.view.jobId); }
    await Promise.all([...this.entries.values()].map(entry => entry.finalizing ?? entry.execution ?? Promise.resolve()));
    for (const entry of this.entries.values()) if (entry.cleanups.length) await this.release(entry);
  }
  async switchProject(project:Project,runtimePolicy:'keep' | 'stop'):Promise<void> {
    this.available(); assertProject(project); this.switching = true; this.emit();
    try { await this.revoke(); if (this.closed) throw new Error('E_WORKSPACE_UNAVAILABLE');
    const prior = { ...this.axes }; this.current = freeze(structuredClone(project)); this.axes = initialAxes(project);
    this.axes.camera = prior.camera; this.axes.microphone = prior.microphone;
    if (runtimePolicy === 'keep' && this.runtime) { this.axes.runtime = prior.runtime; this.axes.output = prior.output; this.axes.external = prior.external; } else this.runtime = null;
    this.pendingRuntime = null; this.derived.clear(); this.checkpoints = [];
    } finally { this.switching = false; this.emit(); }
  }
  close():Promise<void> {
    if (this.closePromise) return this.closePromise; this.closed = true;
    const closing = (async () => { await this.revoke(); this.runtime = null; this.pendingRuntime = null; this.axes.project = 'EMPTY'; this.axes.runtime = 'STOPPED'; this.axes.output = 'OFF'; this.emit(); this.listeners.clear(); })();
    this.closePromise = closing; void closing.catch(() => { if (this.closePromise === closing) this.closePromise = null; }); return closing;
  }
}
