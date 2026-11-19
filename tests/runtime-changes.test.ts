import { scratchPath } from './temp';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, mkdtemp } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { readProject, type Project } from '../packages/project-model';
import { ProjectSession } from '../packages/project-session';
import { readBundle } from '../packages/project-storage/archive';
import {
  classifyChange,
  assertChangeRequest,
  concurrentCommand,
  RUN_FILE_BUDGET,
  type ChangeRequest,
} from '../packages/execution/changes';
import { InputOwnership } from '../packages/execution/ownership';
import { defaultTracking } from '../packages/tracking';
import type { SavePhase } from '../packages/project-storage/atomic';
async function fixture(): Promise<Project> {
  const r = readProject(await readFile('assets/product/preview-project.json', 'utf8'));
  if (r.mode !== 'read-write') throw new Error('fixture');
  return r.project;
}
async function service(fault?: (phase: SavePhase) => Promise<void>) {
  await mkdir(scratchPath('runtime-change-tests'), { recursive: true });
  const dir = await mkdtemp(scratchPath('runtime-change-tests/run-')),
    p = await fixture(),
    bytes = new Map<string, Buffer>();
  for (const a of p.assets)
    bytes.set(a.id, await readFile(join('assets/product/preview', a.fingerprint.sha256 + '.png')));
  let leave: 'cancel' | 'discard' | 'save' = 'discard',
    chosen: string | null = null,
    chooseCalls = 0,
    openWait: Promise<void> | null = null;
  const file = join(dir, 'saved.2dsketch');
  const s = new ProjectSession({
    dataDir: dir,
    dialogs: {
      saveProject: async () => file,
      openProject: async () => {
        await openWait;
        return chosen;
      },
      relinkImage: async () => null,
      chooseImage: async () => {
        chooseCalls++;
        return null;
      },
      unsaved: async () => leave,
    },
    bundled: p,
    bundledBytes: bytes,
    autoTimers: false,
    ...(fault ? { saveFault: fault } : {}),
  });
  await s.init();
  await s.newProject('working', 'parts');
  await s.dispatch({ type: 'sample' });
  return {
    s,
    file,
    dir,
    chooseCalls: () => chooseCalls,
    setLeave: (v: typeof leave) => {
      leave = v;
    },
    setOpen: (v: string) => {
      chosen = v;
    },
    setOpenWait: (v: Promise<void>) => {
      openWait = v;
    },
  };
}
const start = async (s: ProjectSession) =>
  s.prepareRuntime({
    requestId: randomUUID(),
    sessionId: s.view().sessionId!,
    revision: s.view().project!.revision,
    mode: 'manual',
  });
const req = (s: ProjectSession, ownerId: string, baseId: string): ChangeRequest => ({
  ownerId,
  baseId,
  requestId: randomUUID(),
  sessionId: s.view().sessionId!,
  revision: s.view().project!.revision,
});
async function opacity(s: ProjectSession, value: number) {
  const p = s.view().project!;
  const reply = await s.dispatch({
    type: 'edit',
    target: 'part-opacity',
    id: p.parts[0]!.id,
    parameterId: null,
    value,
    expectedRevision: p.revision,
    groupId: null,
  });
  assert.equal(reply.view.errorCode, null);
}
const path = (lease: Awaited<ReturnType<typeof start>>) =>
  new URL(Object.values(lease.scene.layers[0]!.states)[0]!, 'https://local/').pathname
    .split('/')
    .slice(-2) as [string, string];
const until = async (fn: () => boolean) => {
  const end = Date.now() + 5000;
  while (!fn()) {
    if (Date.now() > end) throw new Error('test timeout');
    await new Promise((r) => setTimeout(r, 10));
  }
};

test('T211: control whitelist, appearance and structural/project changes are classified conservatively', async () => {
  const p = await fixture(),
    q = structuredClone(p);
  q.tracking = defaultTracking();
  q.tracking.channels[3]!.gain = 0.5;
  assert.equal(classifyChange(p, q).kind, 'immediate');
  q.parts[0]!.opacity = 0.5;
  assert.equal(classifyChange(p, q).kind, 'manual');
  q.parameters[0]!.max += 0.1;
  assert.equal(classifyChange(p, q).kind, 'restart');
  q.projectId = randomUUID();
  assert.equal(classifyChange(p, q).reason, 'project');
  assert.equal(classifyChange(p, p).kind, 'none');
});
test('T211: unknown content and mesh/bindings never accidentally auto-apply; revision-only undo is safe', async () => {
  const p = await fixture(),
    q = structuredClone(p);
  q.parts[0]!.localTransform[4] += 2;
  assert.equal(classifyChange(p, q).kind, 'manual');
  const r = structuredClone(p);
  r.revision++;
  assert.equal(classifyChange(p, r).kind, 'immediate');
  const t = structuredClone(p);
  t.partBindings = [];
  assert.equal(classifyChange(p, t).kind, 'restart');
});
test('T212: safe control snapshot keeps the old revision until authoritative commit', async () => {
  const { s } = await service();
  try {
    const old = await start(s),
      settings = defaultTracking();
    settings.channels[3]!.gain = 0.7;
    await s.dispatch({
      type: 'tracking-settings',
      expectedRevision: s.view().project!.revision,
      value: settings,
    });
    const r = req(s, old.requestId, old.requestId),
      next = await s.prepareRuntimeChange(r);
    assert.ok(s.activeRuntime(old.requestId));
    assert.equal(old.project.tracking?.channels[3]?.gain ?? 1, 1);
    s.commitRuntimeChange(r.ownerId, r.baseId, r.requestId, false);
    assert.ok(s.activeRuntime(next.requestId));
    assert.equal(s.view().execution!.revision, next.revision);
    s.releaseRuntime(old.requestId);
    assert.equal(s.runtimeOwner()!.ownerId, old.requestId);
  } finally {
    await s.shutdown();
  }
});
test('T213/T219: manual snapshot pins both resource grants until publication acknowledgement', async () => {
  const { s } = await service();
  try {
    const old = await start(s);
    await opacity(s, 0.65);
    const r = req(s, old.requestId, old.requestId),
      next = await s.prepareRuntimeChange(r);
    assert.ok(await s.resource(...path(old)));
    assert.ok(await s.resource(...path(next)));
    s.commitRuntimeChange(r.ownerId, r.baseId, r.requestId, false);
    assert.ok(await s.resource(...path(old)));
    assert.throws(
      () => s.runtimeInputBasis('execution', next.project.projectId, next.revision),
      /E_RUN_BUSY/,
    );
    s.releaseRuntime(old.requestId);
    assert.equal(
      s.runtimeInputBasis('execution', next.project.projectId, next.revision).revision,
      next.revision,
    );
    assert.equal(await s.resource(...path(old)), null);
    assert.ok(await s.resource(...path(next)));
    assert.ok(s.activeRuntime(next.requestId));
  } finally {
    await s.shutdown();
  }
});
test('T214: cancel prepared changes preserves working edits and the last normal execution', async () => {
  const { s } = await service();
  try {
    const old = await start(s);
    await opacity(s, 0.4);
    const r = req(s, old.requestId, old.requestId);
    await s.prepareRuntimeChange(r);
    s.releaseRuntime(r.requestId);
    assert.ok(s.activeRuntime(old.requestId));
    assert.equal(s.view().project!.parts[0]!.opacity, 0.4);
    assert.equal(s.view().dirty, true);
    assert.equal(s.view().execution!.preparing, false);
  } finally {
    await s.shutdown();
  }
});
test('T214: structural change requires explicit logical restart confirmation', async () => {
  const { s } = await service();
  try {
    const old = await start(s),
      p = s.view().project!,
      head = p.parameters.find((v) => v.previewKey === 'head_yaw')!;
    const result = await s.dispatch({
      type: 'motion-parameter',
      expectedRevision: p.revision,
      id: head.id,
      min: head.min,
      neutral: head.neutral,
      max: head.max * 0.9,
    });
    assert.equal(result.view.errorCode, null);
    const r = req(s, old.requestId, old.requestId);
    await s.prepareRuntimeChange(r);
    assert.throws(
      () => s.commitRuntimeChange(r.ownerId, r.baseId, r.requestId, false),
      /E_RUN_RESTART/,
    );
    assert.ok(s.activeRuntime(old.requestId));
    s.commitRuntimeChange(r.ownerId, r.baseId, r.requestId, true);
    assert.ok(s.activeRuntime(r.requestId));
  } finally {
    await s.shutdown();
  }
});
test('T215: corrupted asset verification failure cannot replace the healthy active identity', async () => {
  const { s } = await service();
  try {
    const old = await start(s);
    await opacity(s, 0.8);
    const a = old.project.assets.find((a) =>
        old.project.parts.some((p) => p.textures.some((t) => t.assetId === a.id)),
      )!,
      file = s.cache.path(a),
      original = await readFile(file);
    await writeFile(file, 'bad');
    const r = req(s, old.requestId, old.requestId);
    await assert.rejects(s.prepareRuntimeChange(r), /E_RUN_RESOURCE/);
    assert.ok(s.activeRuntime(old.requestId));
    assert.equal(s.view().project!.parts[0]!.opacity, 0.8);
    await writeFile(file, original);
  } finally {
    await s.shutdown();
  }
});
test('T215: rejected publication rolls back the server lease without rolling back later working edits', async () => {
  const { s } = await service();
  try {
    const old = await start(s);
    await opacity(s, 0.6);
    const r = req(s, old.requestId, old.requestId);
    await s.prepareRuntimeChange(r);
    s.commitRuntimeChange(r.ownerId, r.baseId, r.requestId, false);
    await opacity(s, 0.3);
    s.rollbackRuntimeChange(r.ownerId, r.requestId, r.baseId);
    s.releaseRuntime(r.requestId);
    assert.ok(s.activeRuntime(old.requestId));
    assert.equal(s.view().project!.parts[0]!.opacity, 0.3);
    assert.ok(await s.resource(...path(old)));
  } finally {
    await s.shutdown();
  }
});
test('T216: project transitions require explicit intent and native unsaved cancellation remains authoritative', async () => {
  const h = await service(),
    { s } = h;
  try {
    await s.save(false);
    const recent = s.view().recent[0]!,
      savedId = s.view().project!.projectId;
    await s.newProject('other', 'parts');
    await s.dispatch({ type: 'sample' });
    const old = await start(s),
      session = s.view().sessionId;
    assert.equal(
      (await s.dispatch({ type: 'recent', id: recent.id })).view.errorCode,
      'E_RUN_TRANSITION',
    );
    h.setLeave('cancel');
    await s.dispatch({ type: 'recent', id: recent.id }, old.requestId);
    assert.equal(s.view().sessionId, session);
    assert.ok(s.activeRuntime(old.requestId));
    h.setLeave('discard');
    await s.dispatch({ type: 'recent', id: recent.id }, old.requestId);
    assert.equal(s.view().project!.projectId, savedId);
    assert.notEqual(s.view().project!.projectId, old.project.projectId);
    assert.ok(await s.resource(...path(old)));
    const r = req(s, old.requestId, old.requestId);
    await s.prepareRuntimeChange(r);
    assert.throws(
      () => s.commitRuntimeChange(r.ownerId, r.baseId, r.requestId, false),
      /E_RUN_RESTART/,
    );
    s.commitRuntimeChange(r.ownerId, r.baseId, r.requestId, true);
    assert.equal(s.view().execution!.projectId, savedId);
    s.releaseRuntime(old.requestId);
    h.setOpen(h.file);
    let unblock!: () => void;
    h.setOpenWait(
      new Promise<void>((resolve) => {
        unblock = resolve;
      }),
    );
    const sessionBefore = s.view().sessionId;
    const pending = s.dispatch({ type: 'open' }, r.requestId);
    s.stopRuntime(old.requestId);
    const fresh = await start(s);
    unblock();
    const late = await pending;
    assert.equal(late.view.errorCode, 'E_RUN_STALE');
    assert.equal(s.view().sessionId, sessionBefore);
    assert.ok(s.activeRuntime(fresh.requestId));
  } finally {
    await s.shutdown();
  }
});
test('T216: switching the editor to an unready draft keeps the running character available', async () => {
  const { s } = await service();
  try {
    const old = await start(s);
    await s.dispatch({ type: 'new', name: 'unready', sourceType: 'single-image' }, old.requestId);
    assert.ok(s.activeRuntime(old.requestId));
    assert.equal(s.view().project!.parts.length, 0);
    await assert.rejects(
      s.prepareRuntimeChange(req(s, old.requestId, old.requestId)),
      /E_RUN_ARTWORK/,
    );
    assert.ok(s.activeRuntime(old.requestId));
  } finally {
    await s.shutdown();
  }
});
test('T217: working and execution input bases identify separate immutable revisions and reject stale selection', async () => {
  const { s } = await service();
  try {
    const old = await start(s),
      before = s.runtimeInputBasis('execution', old.project.projectId, old.revision);
    await opacity(s, 0.4);
    const p = s.view().project!,
      working = s.runtimeInputBasis('working', p.projectId, p.revision);
    assert.notEqual(working.revision, before.revision);
    assert.notEqual(working.fingerprint, before.fingerprint);
    assert.deepEqual(s.runtimeInputBasis('execution', old.project.projectId, old.revision), before);
    assert.throws(() => s.runtimeInputBasis('working', p.projectId, old.revision), /E_RUN_STALE/);
    const original = s.cache.read.bind(s.cache);
    let release!: () => void;
    const held = new Promise<void>((resolve) => {
      release = resolve;
    });
    s.cache.read = async (a) => {
      await held;
      return original(a);
    };
    const capture = s.captureRuntimeInput(working);
    await opacity(s, 0.2);
    release();
    const fixed = await capture;
    assert.equal(fixed.project.parts[0]!.opacity, 0.4);
    assert.equal(fixed.basis.revision, working.revision);
    assert.equal(fixed.resources.size, fixed.project.assets.length);
    assert.ok(Object.isFrozen(fixed.project));
  } finally {
    await s.shutdown();
  }
});
test('T217/T220: save captures the working revision while later edits stay dirty and execution stays pinned', async () => {
  let release!: () => void,
    ready!: () => void,
    delay = false;
  let held = new Promise<void>((r) => {
      release = r;
    }),
    entered = new Promise<void>((r) => {
      ready = r;
    });
  const h = await service(async (phase) => {
    if (delay && phase === 'before-replace') {
      ready();
      await held;
    }
  });
  const { s, file } = h;
  try {
    await s.save(false);
    const old = await start(s);
    await opacity(s, 0.7);
    const savedRevision = s.view().project!.revision;
    delay = true;
    const saving = s.save(false);
    await entered;
    await opacity(s, 0.4);
    assert.ok(s.activeRuntime(old.requestId));
    release();
    await saving;
    assert.equal((await readBundle(file, false)).project!.revision, savedRevision);
    assert.equal(s.view().savedRevision, savedRevision);
    assert.ok(s.view().project!.revision > savedRevision);
    assert.equal(s.view().dirty, true);
    assert.equal(s.view().execution!.revision, old.revision);
    h.setLeave('save');
    held = new Promise<void>((resolve) => {
      release = resolve;
    });
    entered = new Promise<void>((resolve) => {
      ready = resolve;
    });
    const session = s.view().sessionId;
    const leaving = s.dispatch({ type: 'close' }, old.requestId);
    await entered;
    await opacity(s, 0.2);
    release();
    await leaving;
    assert.equal(s.view().sessionId, session);
    assert.equal(s.view().project!.parts[0]!.opacity, 0.2);
    assert.equal(s.view().dirty, true);
    assert.ok(s.activeRuntime(old.requestId));
  } finally {
    release();
    await s.shutdown();
  }
});
test('T218: heavy analysis is deferred before any file dialog or worker work; safe edits/save remain allowed', async () => {
  const h = await service(),
    { s } = h;
  try {
    const old = await start(s);
    for (const type of ['import-image', 'input-retry'] as const)
      assert.equal((await s.dispatch({ type })).view.errorCode, 'E_RUN_HEAVY');
    assert.equal(h.chooseCalls(), 0);
    await opacity(s, 0.9);
    assert.equal((await s.dispatch({ type: 'save' })).view.errorCode, null);
    assert.ok(s.activeRuntime(old.requestId));
    assert.equal(concurrentCommand('structure-start'), 'defer');
    assert.equal(concurrentCommand('tracking-settings'), 'allow');
    const original = s.cache.read.bind(s.cache);
    let unblock!: () => void;
    const held = new Promise<void>((resolve) => {
      unblock = resolve;
    });
    s.cache.read = async (a) => {
      await held;
      return original(a);
    };
    const checking = await s.dispatch({ type: 'check-resources' }),
      job = checking.view.jobs.at(-1)!;
    await assert.rejects(
      s.prepareRuntimeChange(req(s, old.requestId, old.requestId)),
      /E_RUN_BUSY/,
    );
    await s.dispatch({ type: 'cancel-task', id: job.jobId });
    unblock();
    await until(() => s.view().jobs.find((v) => v.jobId === job.jobId)?.state === 'CANCELLED');
    assert.ok(s.activeRuntime(old.requestId));
  } finally {
    await s.shutdown();
  }
});
test('T218: oversized archive is deferred before decoding without changing editor or execution', async () => {
  const { s, dir } = await service();
  try {
    const old = await start(s),
      project = s.view().project!.projectId,
      file = join(dir, 'large.2dsketch');
    await writeFile(file, Buffer.alloc(RUN_FILE_BUDGET + 1));
    await assert.rejects(s.openFile(file), /E_RUN_HEAVY/);
    assert.equal(s.view().project!.projectId, project);
    assert.ok(s.activeRuntime(old.requestId));
  } finally {
    await s.shutdown();
  }
});
test('T219: stale editor/device cleanup cannot revoke the execution owner or its other input', () => {
  let run: { ownerId: string; mode: 'camera-microphone' } | null = null;
  const root = randomUUID(),
    next = randomUUID(),
    o = new InputOwnership(
      () => run,
      () => true,
    );
  assert.ok(o.claim('camera', undefined));
  run = { ownerId: root, mode: 'camera-microphone' };
  assert.equal(o.claim('camera', root), false);
  assert.ok(o.release('camera', undefined));
  assert.ok(o.claim('camera', root));
  assert.ok(o.claim('microphone', root));
  assert.equal(o.release('camera', undefined), false);
  assert.ok(o.owns('camera', root));
  assert.ok(o.release('camera', root));
  assert.ok(o.owns('microphone', root));
  run = { ownerId: next, mode: 'camera-microphone' };
  assert.ok(o.claim('camera', next));
  assert.equal(o.release('camera', root), false);
  assert.ok(o.owns('camera', next));
});
test('T219: only mode-required inputs can be claimed and stopped run IDs cannot reconnect', () => {
  let run: { ownerId: string; mode: 'manual' | 'microphone' } | null = {
    ownerId: randomUUID(),
    mode: 'manual',
  };
  const o = new InputOwnership(
      () => run,
      () => true,
    ),
    root = run.ownerId;
  assert.equal(o.claim('camera', root), false);
  assert.equal(o.claim('microphone', undefined), false);
  run.mode = 'microphone';
  assert.ok(o.claim('microphone', root));
  o.release('microphone', root);
  run = null;
  assert.equal(o.claim('microphone', root), false);
  assert.ok(o.claim('microphone', undefined));
});
test('T220: edits after candidate validation reject stale commit and preserve newer working data', async () => {
  const { s } = await service();
  try {
    const old = await start(s);
    await opacity(s, 0.8);
    const r = req(s, old.requestId, old.requestId);
    await s.prepareRuntimeChange(r);
    await opacity(s, 0.2);
    assert.throws(
      () => s.commitRuntimeChange(r.ownerId, r.baseId, r.requestId, false),
      /E_RUN_STALE/,
    );
    assert.equal(s.view().project!.parts[0]!.opacity, 0.2);
    assert.ok(s.activeRuntime(old.requestId));
    s.releaseRuntime(r.requestId);
  } finally {
    await s.shutdown();
  }
});
test('T220: cancel and stop during asynchronous validation cannot publish a delayed candidate', async () => {
  const { s } = await service();
  try {
    const old = await start(s);
    await opacity(s, 0.8);
    const original = s.cache.read.bind(s.cache);
    let release!: () => void;
    const held = new Promise<void>((r) => {
      release = r;
    });
    s.cache.read = async (a) => {
      await held;
      return original(a);
    };
    const r = req(s, old.requestId, old.requestId),
      pending = s.prepareRuntimeChange(r);
    s.releaseRuntime(r.requestId);
    release();
    await assert.rejects(pending, /E_RUN_STALE/);
    assert.ok(s.activeRuntime(old.requestId));
    const r2 = req(s, old.requestId, old.requestId);
    await s.prepareRuntimeChange(r2);
    s.commitRuntimeChange(r2.ownerId, r2.baseId, r2.requestId, false);
    assert.ok(s.stopRuntime(old.requestId));
    assert.equal(s.runtimeBusy(), false);
    assert.equal(await s.resource(...path(old)), null);
    const fresh = await start(s);
    assert.equal(s.stopRuntime(old.requestId), false);
    assert.ok(s.activeRuntime(fresh.requestId));
  } finally {
    await s.shutdown();
  }
});
test('T220: grouped edits block publication until commit/cancel has settled', async () => {
  const { s } = await service();
  try {
    const old = await start(s),
      group = (await s.dispatch({ type: 'begin-group', label: 'held' })).value!;
    await s.dispatch({
      type: 'edit',
      target: 'part-opacity',
      id: s.view().project!.parts[0]!.id,
      parameterId: null,
      value: 0.3,
      expectedRevision: s.view().project!.revision,
      groupId: group,
    });
    assert.equal(s.view().editingGroup, true);
    await assert.rejects(
      s.prepareRuntimeChange(req(s, old.requestId, old.requestId)),
      /E_RUN_BUSY/,
    );
    await s.dispatch({ type: 'end-group', id: group, commit: false });
    assert.equal(s.view().project!.parts[0]!.opacity, old.project.parts[0]!.opacity);
    assert.ok(s.activeRuntime(old.requestId));
  } finally {
    await s.shutdown();
  }
});
test('T220: malformed/duplicate/foreign requests cannot steal or release an active snapshot', async () => {
  const { s } = await service();
  try {
    const old = await start(s),
      r = req(s, old.requestId, old.requestId);
    assert.throws(() => assertChangeRequest({ ...r, extra: 'x' }), /E_RUN_REQUEST/);
    await assert.rejects(s.prepareRuntimeChange({ ...r, ownerId: randomUUID() }), /E_RUN_STALE/);
    await opacity(s, 0.8);
    await s.prepareRuntimeChange({ ...r, revision: s.view().project!.revision });
    await assert.rejects(
      s.prepareRuntimeChange(req(s, old.requestId, old.requestId)),
      /E_RUN_CHANGE_BUSY/,
    );
    assert.equal(s.stopRuntime(randomUUID()), false);
    assert.ok(s.activeRuntime(old.requestId));
  } finally {
    await s.shutdown();
  }
});
