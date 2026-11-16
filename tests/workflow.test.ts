import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { readProject, editProject, type Project } from '../packages/project-model';
import { Workflow, transaction, applyTransaction, type Plan, type Step, type Json, type StageContext, type JobState } from '../packages/workflow';
import { ScratchLease, processStep } from '../packages/workflow-host';
const project = ():Project => { const p = readProject(readFileSync('assets/product/preview-project.json','utf8')); if (p.mode !== 'read-write') throw new Error('fixture version'); return p.project; };
function deferred<T = void>() { let resolve!:(value:T)=>void; let reject!:(error:Error)=>void; const promise = new Promise<T>((a,b) => { resolve = a; reject = b; }); return { promise,resolve,reject }; }
const step = (id:string,run:Step['run'],cache:Step['cache'] = 'none',cancellable = true):Step => ({ id,run,cache,cancellable,version:'1.0.0' });
function plan(key:string,steps:Step[],mutate:(draft:Project)=>void = () => {}):Plan {
  return { key,label:'고정 입력 시험',kind:'prepare',processingVersion:'1.0.0',settings:{ mode:'fixture' },steps,
    collect:(input,identity) => ({ identity,outcome:{ kind:'candidate',project:editProject(input,mutate) } }) };
}
const report = (key:string,steps:Step[],kind:Plan['kind'] = 'check'):Plan => ({ key,label:'시험 작업',kind,processingVersion:'1.0.0',settings:{},steps,
  collect:(_input,identity) => ({ identity,outcome:kind === 'save' ? { kind:'saved' } : kind === 'export' ? { kind:'exported' } : { kind:'checked',reportId:key,dependencies:['geometry:*'] } }) });
const ticks = async ():Promise<void> => { for (let i=0;i<6;i++) await Promise.resolve(); };

test('T071: storage, microphone and output failures leave independent actions and last runtime available',async () => {
  const w = new Workflow(project()); w.stageRuntime(); const last = w.publishAtFrameBoundary();
  w.setAxis('save','SAVE_FAILED'); w.deviceChanged('microphone','DENIED'); w.deviceChanged('camera','AVAILABLE'); w.setAxis('output','FAILED');
  assert.equal(w.can('camera'),true); assert.equal(w.can('microphone'),false); assert.equal(w.can('image'),true); assert.equal(w.can('export'),true);
  assert.equal(w.runtimeSnapshot(),last); assert.equal(w.view().axes.runtime,'RUNNING'); assert.equal(w.view().axes.save,'SAVE_FAILED'); await w.close();
  const prepared = project(); const draft = structuredClone(prepared); draft.parts = []; draft.partBindings = [];
  const creating = new Workflow(draft); assert.equal(creating.view().axes.project,'DRAFT'); creating.edit('prepared',p => { p.parts = structuredClone(prepared.parts); p.partBindings = structuredClone(prepared.partBindings); });
  assert.equal(creating.view().axes.project,'READY'); await creating.close();
});

test('T072: queued input, settings, identity and processing version are frozen independently from later edits',async () => {
  const w = new Workflow(project()); const entered = deferred(); const gate = deferred<Json>(); let context!:StageContext;
  const p = plan('frozen',[step('read',async ctx => { context = ctx; entered.resolve(); return gate.promise; })]);
  p.settings = { value:1 }; const job = w.start(p); (p.settings as { value:number }).value = 9;
  await entered.promise; const oldName = context.input.displayName; w.edit('rename',draft => { draft.displayName = 'Latest'; });
  assert.equal(context.input.displayName,oldName); assert.deepEqual(context.settings,{ value:1 }); assert.equal(context.identity.processingVersion,'1.0.0');
  assert.throws(() => { context.input.parts[0]!.displayName = 'mutate'; },TypeError);
  gate.resolve(null); assert.equal((await w.wait(job.jobId)).state,'AWAITING_REVIEW'); assert.equal(w.project().displayName,'Latest'); await w.close();
});

test('T073: queue, real stage progress, result validation and cleanup precede success; late callbacks are ignored',async () => {
  const w = new Workflow(project()); const entered = deferred(); const finish = deferred<Json>(); const cleaning = deferred(); const cleaned = deferred(); let context!:StageContext;
  const states:JobState[] = []; const progress:number[] = []; let id = '';
  w.subscribe(() => { const j = w.view().jobs.find(v => v.jobId === id); if (j) { states.push(j.state); progress.push(j.progress); } });
  const job = w.start(plan('progress',[step('analysis',async ctx => { context = ctx; ctx.own(async () => { cleaning.resolve(); await cleaned.promise; }); entered.resolve(); ctx.progress(.4); return finish.promise; })])); id = job.jobId;
  assert.equal(w.job(id).state,'QUEUED'); await entered.promise; assert.equal(w.job(id).stageId,'analysis'); assert.equal(context.progress(.2),false); assert.equal(context.progress(NaN),false);
  const queued = w.start(plan('queued-cancel',[step('never',async () => null)])).jobId; w.cancel(queued); await w.wait(queued);
  assert.equal(w.view().axes.preparation,'ANALYZING');
  finish.resolve({ stage:'complete' }); await cleaning.promise; assert.equal(w.job(id).state,'RESULT_READY'); assert.equal(states.includes('SUCCEEDED'),false);
  cleaned.resolve(); assert.equal((await w.wait(id)).state,'SUCCEEDED'); assert.equal(context.progress(.9),false);
  assert.ok(progress.every((value,i) => i === 0 || value >= progress[i-1]!)); assert.ok(states.includes('RUNNING') && states.includes('RESULT_READY')); await w.close();
});

test('T074: cancel during work stays requested through cleanup and preserves editor and runtime',async () => {
  const w = new Workflow(project()); w.stageRuntime(); const runtime = w.publishAtFrameBoundary(); const before = JSON.stringify(w.project());
  const entered = deferred(); const finish = deferred<Json>(); const cleaning = deferred(); const release = deferred(); let cleaned = 0;
  const id = w.start(plan('cancel',[step('work',async ctx => { ctx.own(async () => { cleaning.resolve(); await release.promise; cleaned++; }); entered.resolve(); return finish.promise; })],draft => { draft.displayName = 'Never apply'; })).jobId;
  await entered.promise; assert.equal(w.cancel(id),true); assert.equal(w.job(id).state,'CANCEL_REQUESTED'); finish.resolve(null); await cleaning.promise;
  assert.equal(w.job(id).state,'CANCEL_REQUESTED'); release.resolve(); assert.equal((await w.wait(id)).state,'CANCELLED');
  assert.equal(cleaned,1); assert.equal(JSON.stringify(w.project()),before); assert.equal(w.runtimeSnapshot(),runtime); await w.close();
});

test('T074: cancellation at RESULT_READY wins; after commit it cannot pretend to undo success',async () => {
  const w = new Workflow(project()); let id = ''; let released = 0;
  w.subscribe(() => { if (id && w.job(id).state === 'RESULT_READY') w.cancel(id); });
  id = w.start(plan('edge',[step('final',async ctx => { ctx.own(() => { released++; }); return null; })],p => { p.displayName = 'Cancelled'; })).jobId;
  assert.equal((await w.wait(id)).state,'CANCELLED'); assert.notEqual(w.project().displayName,'Cancelled'); assert.equal(released,1);
  const next = w.start(plan('success',[step('final',async () => null)],p => { p.displayName = 'Applied'; })).jobId;
  assert.equal((await w.wait(next)).state,'SUCCEEDED'); assert.equal(w.cancel(next),false); assert.equal(w.project().displayName,'Applied'); await w.close();
});

test('T074: noninterruptible stage waits for its boundary and cleanup failure is visible and retryable',async () => {
  const w = new Workflow(project()); const entered = deferred(); const finish = deferred<Json>(); let ctx!:StageContext;
  const id = w.start(plan('boundary',[step('commit-boundary',async context => { ctx = context; entered.resolve(); return finish.promise; },'none',false)])).jobId;
  await entered.promise; w.cancel(id); assert.equal(ctx.signal.aborted,false); assert.doesNotThrow(() => ctx.checkpoint()); assert.equal(w.job(id).state,'CANCEL_REQUESTED'); finish.resolve(null);
  assert.equal((await w.wait(id)).state,'CANCELLED');
  let canClean = false; const failure = w.start(plan('cleanup',[step('owned',async context => { context.own(() => { if (!canClean) throw new Error('private error'); }); return null; })])).jobId;
  assert.equal((await w.wait(failure)).state,'FAILED'); assert.equal(w.job(failure).errorCode,'E_RESOURCE_CLEANUP'); assert.throws(() => w.retry(failure),/E_RESOURCE_CLEANUP/);
  canClean = true; await w.retryCleanup(failure); const retry = w.retry(failure); assert.equal((await w.wait(retry.jobId)).state,'SUCCEEDED'); await w.close();
  const closing = new Workflow(project()); let removable = false;
  const held = closing.start(plan('close-cleanup',[step('lease',async context => { context.own(() => { if (!removable) throw new Error('private cleanup text'); }); return null; })])).jobId;
  await closing.wait(held); await assert.rejects(closing.close(),/E_RESOURCE_CLEANUP/); removable = true; await closing.retryCleanup(held); await closing.close(); assert.equal(closing.view().axes.project,'EMPTY');
});

test('T075: duplicate starts share work, a failed pure prefix resumes, changed input reruns that prefix',async () => {
  const w = new Workflow(project()); let reads = 0; let computes = 0; let fail = true;
  const p = plan('retry',[step('read',async () => { reads++; return { ids:[1,2,3] }; },'pure-json'),step('compute',async () => { computes++; if (fail) throw new Error('unfiltered private path'); return null; })]);
  const first = w.start(p); assert.deepEqual(w.start(p),{ jobId:first.jobId,reused:true }); assert.throws(() => w.start({ ...p,settings:{ changed:true } }),/E_JOB_ACTIVE_CHANGED/); assert.equal((await w.wait(first.jobId)).state,'FAILED');
  assert.equal(w.job(first.jobId).stageId,'compute'); assert.equal(w.job(first.jobId).errorCode,'E_TASK_FAILED'); fail = false;
  const next = w.retry(first.jobId); assert.notEqual(next.jobId,first.jobId); assert.equal((await w.wait(next.jobId)).state,'SUCCEEDED'); assert.equal(reads,1); assert.equal(computes,2); assert.equal(w.job(next.jobId).resumedSteps,1);
  fail = true; const another = w.start(p); await w.wait(another.jobId); w.edit('latest',draft => { draft.displayName = 'Latest input'; }); fail = false;
  const rerun = w.retry(another.jobId); await w.wait(rerun.jobId); assert.equal(w.job(rerun.jobId).resumedSteps,0); assert.equal(reads,3); await w.close();
});

test('T073/T075: lanes serialize their own queue while storage and checks can proceed independently',async () => {
  const w = new Workflow(project()); const gate = deferred<Json>(); const entered = deferred(); let queuedRevision = -1;
  const a = w.start(report('one',[step('wait',async () => { entered.resolve(); return gate.promise; })]));
  const b = w.start(report('two',[step('queued',async ctx => { queuedRevision = ctx.input.revision; return null; })]));
  const input = w.project().revision; await entered.promise; assert.equal(w.job(b.jobId).state,'QUEUED');
  const save = w.start(report('save',[step('mock-write',async () => null)],'save')); assert.equal((await w.wait(save.jobId)).state,'SUCCEEDED');
  w.edit('edit during queue',p => { p.displayName = 'Changed'; }); gate.resolve(null); await w.wait(a.jobId); await w.wait(b.jobId); assert.equal(queuedRevision,input); await w.close();
});

test('T076: stale candidates stay available for review and unrelated edits remain intact',async () => {
  const w = new Workflow(project()); const entered = deferred(); const done = deferred<Json>();
  const id = w.start(plan('stale',[step('analysis',async () => { entered.resolve(); return done.promise; })],p => { p.parts[1]!.opacity = .7; })).jobId;
  await entered.promise; w.edit('rename',p => { p.displayName = 'Latest name'; }); const latest = w.project().revision; done.resolve(null);
  assert.equal((await w.wait(id)).state,'AWAITING_REVIEW'); assert.equal(w.project().parts[1]!.opacity,1); assert.equal(w.project().displayName,'Latest name');
  const comparison = w.comparison(id); assert.equal(comparison.revision,latest); assert.equal(comparison.changes[0]!.status,'safe'); assert.equal(w.revalidate(id,latest).valid,true); await w.close();
});

test('T077: selected safe changes apply once, conflicts preserve manual corrections and a checkpoint',async () => {
  const w = new Workflow(project()); const ready = deferred(); const done = deferred<Json>();
  const id = w.start(plan('review',[step('analysis',async () => { ready.resolve(); return done.promise; })],p => { p.parts[0]!.displayName = 'Generated body'; p.parts[1]!.opacity = .5; })).jobId;
  await ready.promise; w.edit('manual correction',p => { p.parts[0]!.displayName = 'Manual body'; }); done.resolve(null); await w.wait(id);
  const comparison = w.comparison(id); assert.ok(comparison.changes.some(c => c.status === 'conflict')); assert.equal(w.revalidate(id,comparison.revision).code,'E_TRANSACTION_CONFLICT');
  const selected = comparison.changes.filter(c => c.status === 'safe').map(c => c.key); const before = w.project();
  const applying = w.applyReviewed(id,comparison.revision,selected); const duplicate = await w.applyReviewed(id,comparison.revision,selected);
  assert.equal(duplicate.code,'E_REVIEW_BUSY'); assert.equal((await applying).applied,true); assert.equal(w.project().parts[0]!.displayName,'Manual body'); assert.equal(w.project().parts[1]!.opacity,.5);
  assert.equal(w.checkpoint(),before); assert.equal(w.project().revision,before.revision+1); assert.equal(w.job(id).state,'SUCCEEDED'); await w.close();
});

test('T077: review revalidates references, CAS detects later edits, rerun freezes the latest input',async () => {
  const w = new Workflow(project()); const ready = deferred(); const done = deferred<Json>();
  const p = plan('references',[step('analysis',async () => { ready.resolve(); return done.promise; })],draft => { draft.expressions.push({ id:'generated-expression',displayName:'Generated',values:[{ parameterId:draft.parameters[0]!.id,value:draft.parameters[0]!.neutral,locked:false }],transitionMs:0,release:'live-input' }); });
  const id = w.start(p).jobId; await ready.promise;
  w.edit('remove parameter',draft => { const target = draft.parameters.shift()!.id; draft.partBindings = draft.partBindings.filter(b => b.parameterId !== target); draft.inputBindings = draft.inputBindings.filter(b => b.parameterId !== target); for (const e of draft.expressions) e.values = e.values.filter(v => v.parameterId !== target); for (const e of draft.exportProfiles) e.parameterMap = e.parameterMap.filter(v => v.parameterId !== target); });
  done.resolve(null); await w.wait(id); const revision = w.project().revision;
  assert.equal(w.revalidate(id,revision).code,'E_REFERENCE_MISSING'); assert.equal((await w.applyReviewed(id,revision)).applied,false); assert.equal(w.job(id).state,'AWAITING_REVIEW');
  w.edit('another change',draft => { draft.displayName = 'Latest'; }); assert.equal(w.revalidate(id,revision).code,'E_TRANSACTION_STALE');
  const rerun = await w.rerun(id); assert.equal(w.job(id).state,'DISCARDED'); assert.equal(w.job(rerun.jobId).inputRevision,w.project().revision); assert.equal((await w.wait(rerun.jobId)).state,'SUCCEEDED');
  assert.ok(w.project().expressions.some(e => e.id === 'generated-expression')); await w.close();
});

test('T077: discard and cancellation of a held result clean owned resources without replacing current work',async () => {
  for (const action of ['discard','cancel'] as const) {
    const w = new Workflow(project()); const ready = deferred(); const done = deferred<Json>(); let owned = 0;
    const id = w.start(plan(action,[step('work',async ctx => { owned++; ctx.own(() => { owned--; }); ready.resolve(); return done.promise; })],p => { p.parts[1]!.opacity = .4; })).jobId;
    await ready.promise; w.edit('changed',p => { p.displayName = 'Keep latest'; }); done.resolve(null); await w.wait(id); assert.equal(owned,1);
    if (action === 'discard') await w.discard(id); else { assert.equal(w.cancel(id),true); await w.wait(id); }
    assert.equal(w.job(id).state,action === 'discard' ? 'DISCARDED' : 'CANCELLED'); assert.equal(owned,0); assert.equal(w.project().displayName,'Keep latest'); assert.equal(w.project().parts[1]!.opacity,1); await w.close();
  }
});

test('T078: names, roles, expressions and device changes invalidate their own dependencies',async () => {
  const w = new Workflow(project()); const right = w.project().parts[1]!.id; const left = w.project().parts[2]!.id;
  for (const [id,keys] of [['geometry-right',[`geometry:${right}`]],['geometry-left',[`geometry:${left}`]],['textures',['texture:*']],['export',['export:*']],['runtime',['runtime:*']],['expression',['expression:*']]] as [string,string[]][]) w.derived.register(id,w.project().revision,keys);
  w.edit('name',p => { p.parts[1]!.displayName = 'New name'; }); assert.equal(w.derived.state('export'),'STALE'); assert.equal(w.derived.state('geometry-right'),'VALID'); assert.equal(w.derived.state('textures'),'VALID');
  w.edit('role',p => { p.parts[1]!.role = 'custom'; }); assert.equal(w.derived.state('geometry-right'),'STALE'); assert.equal(w.derived.state('geometry-left'),'VALID'); assert.equal(w.derived.state('textures'),'VALID');
  let affected = 0; let unaffected = 0;
  const jobs = w.refreshStaleChecks([{ reportId:'geometry-right',plan:report('geometry-right',[step('recheck',async () => { affected++; return null; })]) },{ reportId:'geometry-left',plan:report('geometry-left',[step('recheck',async () => { unaffected++; return null; })]) }]);
  await Promise.all(jobs.map(id => w.wait(id))); assert.equal(affected,1); assert.equal(unaffected,0); assert.equal(jobs.length,1);
  w.derived.register('export-new',w.project().revision,['export:*']); w.derived.register('input',w.project().revision,['input:*']);
  w.deviceChanged('microphone','AVAILABLE'); assert.equal(w.derived.state('export-new'),'VALID'); assert.equal(w.derived.state('input'),'STALE');
  w.derived.register('geometry-new',w.project().revision,['geometry:*']); w.edit('expression',p => { p.expressions[0]!.transitionMs = 250; });
  assert.equal(w.derived.state('geometry-new'),'VALID'); assert.equal(w.derived.state('export-new'),'STALE'); await w.close();
});

test('T078: a check based on an old snapshot cannot mark changed dependencies valid at completion',async () => {
  const w = new Workflow(project()); const entered = deferred(); const finish = deferred<Json>();
  const id = w.start(report('old-check',[step('validate',async () => { entered.resolve(); return finish.promise; })])).jobId;
  await entered.promise; w.edit('geometry',p => { p.parts[0]!.localTransform[4] += 20; }); finish.resolve(null); await w.wait(id);
  assert.equal(w.derived.state('old-check'),'STALE'); await w.close();
});

test('T079: project switch revokes delayed results before waiting and explicitly preserves or stops runtime',async () => {
  const w = new Workflow(project()); w.stageRuntime(); const running = w.publishAtFrameBoundary(); const ready = deferred(); const finish = deferred<Json>(); let late!:StageContext; let owned = 0;
  const id = w.start(plan('switch',[step('slow',async ctx => { late = ctx; ctx.own(() => { owned--; }); owned++; ready.resolve(); return finish.promise; })],p => { p.displayName = 'Wrong project result'; })).jobId;
  await ready.promise; const next = project(); next.projectId = 'another-project'; const switching = w.switchProject(next,'keep');
  assert.equal(w.view().switching,true); assert.throws(() => w.start(plan('blocked',[step('work',async () => null)])),/E_WORKSPACE_UNAVAILABLE/);
  assert.equal(late.progress(.8),false); finish.resolve(null); await switching;
  assert.equal(w.job(id).state,'DISCARDED'); assert.equal(owned,0); assert.equal(w.project().projectId,'another-project'); assert.equal(w.runtimeSnapshot(),running);
  await w.switchProject(project(),'stop'); assert.equal(w.runtimeSnapshot(),null); await w.close();
});

test('T079: shutdown is joined, queued work is cancelled and runtime is swapped only at a validated frame boundary',async () => {
  const w = new Workflow(project()); w.stageRuntime(); const old = w.publishAtFrameBoundary(); w.edit('geometry',p => { p.parts[0]!.localTransform[4] += 1; });
  assert.equal(w.runtimeSnapshot(),old); w.stageRuntime(); w.edit('new geometry',p => { p.parts[0]!.localTransform[4] += 1; }); assert.equal(w.publishAtFrameBoundary(),old);
  w.stageRuntime(); assert.notEqual(w.publishAtFrameBoundary(),old); assert.equal(Object.isFrozen(w.runtimeSnapshot()!.parts),true);
  const ready = deferred(); const finish = deferred<Json>(); const id = w.start(plan('shutdown',[step('slow',async () => { ready.resolve(); return finish.promise; })])).jobId;
  const queued = w.start(plan('queued',[step('never',async () => { throw new Error('must not run'); })])).jobId;
  await ready.promise; const closing = w.close(); assert.equal(w.close(),closing); assert.equal(w.job(id).state,'CANCEL_REQUESTED'); finish.resolve(null); await closing;
  assert.equal(w.job(id).state,'DISCARDED'); assert.equal(w.job(queued).state,'DISCARDED'); assert.equal(w.view().axes.project,'EMPTY'); assert.equal(w.runtimeSnapshot(),null);
});

test('T080: wrong job/project/revision/generation/processor identities and invalid candidates never apply',async () => {
  for (const field of ['protocol','jobId','projectId','inputRevision','generation','processingVersion'] as const) {
    const w = new Workflow(project()); const before = w.project(); const p = plan('identity',[step('work',async () => null)],draft => { draft.displayName = 'Invalid'; }); const collect = p.collect;
    p.collect = (...args) => { const result = collect(...args); (result.identity as unknown as Record<string,unknown>)[field] = field === 'generation' || field === 'inputRevision' ? 999 : 'wrong'; return result; };
    const id = w.start(p).jobId; assert.equal((await w.wait(id)).state,'FAILED'); assert.equal(w.job(id).errorCode,'E_RESULT_IDENTITY'); assert.equal(w.project(),before); await w.close();
  }
  const w = new Workflow(project()); const p = plan('invalid',[step('work',async () => null)]); p.collect = (input,identity) => { const candidate = structuredClone(input); candidate.parts[0]!.textures[0]!.assetId = 'missing'; return { identity,outcome:{ kind:'candidate',project:candidate } }; };
  const before = w.project(); const id = w.start(p).jobId; assert.equal((await w.wait(id)).state,'FAILED'); assert.equal(w.project(),before); await w.close();
  const bounded = new Workflow(project()); const oversized = bounded.start(report('oversized',[step('output',async () => 'x'.repeat(300000))])).jobId;
  assert.equal((await bounded.wait(oversized)).state,'FAILED'); assert.equal(bounded.job(oversized).errorCode,'E_TASK_DATA_SIZE'); await bounded.close();
});

test('T080: fixed save/export adapters keep input revisions and later edits dirty without disk-success claims',async () => {
  for (const kind of ['save','export'] as const) {
    const w = new Workflow(project()); const ready = deferred(); const finish = deferred<Json>(); const inputRevision = w.project().revision;
    const id = w.start(report(kind,[step('fixed-adapter',async () => { ready.resolve(); return finish.promise; })],kind)).jobId;
    await ready.promise; w.edit('later edit',p => { p.displayName = 'Dirty latest'; }); finish.resolve(null); await w.wait(id);
    assert.equal(w.job(id).inputRevision,inputRevision); assert.equal(w.project().displayName,'Dirty latest');
    if (kind === 'save') { assert.equal(w.project().savedRevision,inputRevision); assert.equal(w.view().axes.save,'DIRTY'); }
    else assert.equal(w.view().axes.files,'WRITTEN'); await w.close();
  }
});

test('T080: transaction CAS and reference validation leave the original object intact on failure',() => {
  const p = project(); const next = editProject(p,draft => { draft.parts[0]!.displayName = 'New'; }); const tx = transaction(p,next,'rename');
  assert.throws(() => applyTransaction(p,tx,p.revision+1),/E_TRANSACTION_STALE/); assert.equal(p.parts[0]!.displayName,project().parts[0]!.displayName);
  const result = applyTransaction(p,tx,p.revision); assert.equal(result.parts[0]!.id,p.parts[0]!.id); assert.equal(result.revision,p.revision+1);
});

test('T079/T080: real child cancellation joins process exit, malformed identity fails, owned scratch alone is removed',async () => {
  for (const mode of ['good','bad','hang']) {
    const w = new Workflow(project()); const id = w.start(report('child',[processStep('child',process.execPath,['tests/fixtures/workflow-child.cjs',mode])])).jobId;
    if (mode === 'hang') { await ticks(); w.cancel(id); }
    const state = (await w.wait(id)).state; assert.equal(state,mode === 'good' ? 'SUCCEEDED' : mode === 'bad' ? 'FAILED' : 'CANCELLED'); await w.close();
  }
  const folder = mkdtempSync(resolve('.local/workflow-scratch-')); const sentinel = join(folder,'unrelated.txt'); writeFileSync(sentinel,'keep'); const w = new Workflow(project());
  const id = w.start(plan('scratch',[step('temporary',async ctx => { const lease = await ScratchLease.create(folder,ctx.identity); ctx.own(() => lease.cleanup()); await lease.write('stage.json',new TextEncoder().encode('temporary')); throw new Error('private error text'); })])).jobId;
  assert.equal((await w.wait(id)).state,'FAILED'); assert.deepEqual(readdirSync(folder),['unrelated.txt']); assert.equal(existsSync(sentinel),true); await w.close();
});
