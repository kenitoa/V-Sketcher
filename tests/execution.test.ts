import { scratchPath } from './temp';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import {
  checkReadiness,
  defaultRunPreferences,
  assertRunPreferences,
  availableRunActions,
  eventAccelerator,
  freezeSnapshot,
  type RunAction,
} from '../packages/execution';
import {
  RunShortcuts,
  RunPreferenceStore,
  type ShortcutBackend,
} from '../apps/desktop/run-shortcuts';
import { ProjectSession } from '../packages/project-session';
import { readProject, createProject, type Project } from '../packages/project-model';
import { MotionPlayer } from '../packages/motion';
const fixture = async () => {
  const r = readProject(await readFile('assets/product/preview-project.json', 'utf8'));
  if (r.mode !== 'read-write') throw new Error('fixture');
  return r.project;
};
const all = (p: Project) => new Set(p.assets.map((a) => a.id));
async function service() {
  await mkdir(scratchPath('execution-tests'), { recursive: true });
  const dir = await mkdtemp(scratchPath('execution-tests/run-')),
    p = await fixture(),
    bytes = new Map<string, Buffer>();
  for (const a of p.assets)
    bytes.set(a.id, await readFile(join('assets/product/preview', a.fingerprint.sha256 + '.png')));
  let leave: 'discard' | 'cancel' = 'discard';
  const s = new ProjectSession({
    dataDir: dir,
    dialogs: {
      unsaved: async () => leave,
      saveProject: async () => join(dir, 'saved.2dsketch'),
      openProject: async () => null,
      relinkImage: async () => null,
    },
    bundled: p,
    bundledBytes: bytes,
    autoTimers: false,
  });
  await s.init();
  await s.newProject('run', 'parts');
  await s.dispatch({ type: 'sample' });
  return {
    s,
    dir,
    setLeave: (v: typeof leave) => {
      leave = v;
    },
  };
}
const request = (s: ProjectSession) => ({
  requestId: randomUUID(),
  sessionId: s.view().sessionId!,
  revision: s.view().project!.revision,
  mode: 'manual' as const,
});
function backend() {
  const keys = new Map<string, () => void>(),
    sent: RunAction[] = [];
  let focused = true;
  const api: ShortcutBackend = {
    register: (key, cb) => {
      if (keys.has(key)) return false;
      keys.set(key, cb);
      return true;
    },
    isRegistered: (key) => keys.has(key),
    unregister: (key) => {
      keys.delete(key);
    },
  };
  const s = new RunShortcuts(
    api,
    () => focused,
    (_id, action) => sent.push(action),
  );
  return {
    s,
    keys,
    sent,
    api,
    focus: (v: boolean) => {
      focused = v;
      s.refresh();
    },
  };
}
function globalPrefs() {
  const p = defaultRunPreferences();
  p.allowGlobal = true;
  p.bindings[0]!.scope = 'global';
  return p;
}
test('T201: manual and automatic require no device; combined checks only selected inputs', async () => {
  const p = await fixture(),
    a = all(p);
  for (const mode of ['manual', 'automatic'] as const)
    assert.ok(checkReadiness(p, mode, a, { camera: false, microphone: false }).canStart);
  const c = checkReadiness(p, 'camera', a, { camera: true, microphone: false });
  assert.ok(c.canStart);
  const m = checkReadiness(p, 'camera-microphone', a, { camera: false, microphone: false });
  assert.deepEqual(
    m.issues.filter((i) => i.severity === 'block').map((i) => i.code),
    ['E_RUN_CAMERA', 'E_RUN_MICROPHONE'],
  );
  assert.ok(m.canStartLimited);
});
test('T201/T202: missing artwork, resources, invalid references and busy work identify fix locations', async () => {
  const p = await fixture();
  assert.equal(
    checkReadiness(createProject('empty', 'parts'), 'manual', new Set()).canStartLimited,
    false,
  );
  const missing = checkReadiness(p, 'manual', new Set());
  assert.ok(
    missing.issues.some((i) => i.code === 'E_RUN_RESOURCE' && i.target === 'resources' && i.id),
  );
  assert.equal(missing.canStartLimited, false);
  const broken = structuredClone(p);
  broken.parts[0]!.parentId = 'unknown';
  assert.ok(
    checkReadiness(broken, 'manual', all(p)).issues.some(
      (i) => i.code === 'E_RUN_MODEL' && i.target === 'motion',
    ),
  );
  assert.equal(checkReadiness(p, 'manual', all(p), undefined, true).canStartLimited, false);
});
test('T203: authoritative lease hashes original assets, pins grants, clones revision while working edits stay separate', async () => {
  const { s } = await service();
  try {
    const before = s.view(),
      r = request(s),
      lease = await s.prepareRuntime(r);
    assert.equal(lease.revision, before.project!.revision);
    assert.equal(lease.fingerprint.length, 64);
    assert.equal(s.activeRuntime(r.requestId), true);
    const url = new URL(Object.values(lease.scene.layers[0]!.states)[0]!, 'https://local/');
    const pieces = url.pathname.split('/');
    assert.ok(await s.resource(pieces.at(-2)!, pieces.at(-1)!));
    lease.project.displayName = 'mutated IPC clone';
    assert.equal(s.view().project!.displayName, before.project!.displayName);
    assert.equal(
      (
        await s.dispatch({
          type: 'edit',
          target: 'project-name',
          id: null,
          parameterId: null,
          value: 'working change',
          expectedRevision: r.revision,
          groupId: null,
        })
      ).view.errorCode,
      null,
    );
    assert.equal(s.activeRuntime(r.requestId), true);
    assert.equal(lease.project.revision, before.project!.revision);
    assert.equal(s.view().dirty, before.dirty);
    s.releaseRuntime(r.requestId);
    assert.equal(await s.resource(pieces.at(-2)!, pieces.at(-1)!), null);
  } finally {
    await s.shutdown();
  }
});
test('T203: stale revision and empty scene never acquire an execution owner', async () => {
  const { s } = await service();
  try {
    const r = request(s);
    r.revision--;
    await assert.rejects(s.prepareRuntime(r), /E_RUN_STALE/);
    assert.equal(s.runtimeBusy(), false);
    const a = s
      .view()
      .project!.assets.find((a) =>
        s.view().project!.parts.some((p) => p.textures.some((t) => t.assetId === a.id)),
      )!;
    await writeFile(s.cache.path(a), Buffer.from('corrupted after initial load'));
    await assert.rejects(s.prepareRuntime(request(s)), /E_RUN_RESOURCE/);
    assert.equal(s.runtimeBusy(), false);
    await s.newProject('empty', 'single-image');
    await assert.rejects(s.prepareRuntime(request(s)), /E_RUN_ARTWORK/);
    assert.equal(s.runtimeBusy(), false);
  } finally {
    await s.shutdown();
  }
});
test('T207/T210: repeated lease acquisition, duplicate starts and stale stops preserve working data', async () => {
  const { s, setLeave } = await service();
  try {
    const before = JSON.stringify(s.view().project),
      dirty = s.view().dirty;
    for (let i = 0; i < 12; i++) {
      const r = request(s);
      await s.prepareRuntime(r);
      await assert.rejects(s.prepareRuntime({ ...r, requestId: randomUUID() }), /E_RUN_ACTIVE/);
      s.releaseRuntime(randomUUID());
      assert.ok(s.runtimeBusy());
      s.releaseRuntime(r.requestId);
      assert.equal(s.runtimeBusy(), false);
    }
    assert.equal(JSON.stringify(s.view().project), before);
    assert.equal(s.view().dirty, dirty);
    await s.save(false);
    const saved = s.view().recent[0]!;
    await s.dispatch({
      type: 'edit',
      target: 'project-name',
      id: null,
      parameterId: null,
      value: 'unsaved quick-run cancellation',
      expectedRevision: s.view().project!.revision,
      groupId: null,
    });
    setLeave('cancel');
    const session = s.view().sessionId;
    const cancelled = await s.dispatch({ type: 'recent', id: saved.id });
    assert.equal(cancelled.view.sessionId, session);
    assert.equal(cancelled.view.dirty, true);
    setLeave('discard');
    const opened = await s.dispatch({ type: 'recent', id: saved.id });
    assert.notEqual(opened.view.sessionId, session);
    assert.equal(opened.view.dirty, false);
  } finally {
    await s.shutdown();
  }
});
test('T203/T210: cancellation while verifying bytes cannot publish a stale lease', async () => {
  const { s } = await service();
  try {
    const r = request(s),
      original = s.cache.read.bind(s.cache);
    let unblock!: () => void;
    const wait = new Promise<void>((resolve) => {
      unblock = resolve;
    });
    s.cache.read = async (a) => {
      await wait;
      return original(a);
    };
    const pending = s.prepareRuntime(r);
    s.releaseRuntime(r.requestId);
    unblock();
    await assert.rejects(pending, /E_RUN_STALE/);
    assert.equal(s.runtimeBusy(), false);
  } finally {
    await s.shutdown();
  }
});
test('T206: neutral hold preserves selected expression and does not mutate project; release is independent', async () => {
  const p = await fixture(),
    before = JSON.stringify(p),
    m = new MotionPlayer();
  m.setProject(p, new Set(p.parts.map((v) => v.id)));
  m.automaticBlink = true;
  m.neutralHold = true;
  for (const now of [0, 1000, 5000]) {
    m.frame(now);
    for (const v of p.parameters)
      assert.equal(
        m.controls.snapshot().values.get(v.id),
        p.motion?.settings.pose.find((x) => x.parameterId === v.id)?.value ?? v.neutral,
      );
  }
  assert.equal(JSON.stringify(p), before);
  m.neutralHold = false;
  m.frame(5200);
  assert.equal(JSON.stringify(p), before);
});
test('T203: recursively frozen snapshot rejects nested mutation', async () => {
  const p = freezeSnapshot(await fixture());
  assert.throws(() => {
    p.parts[0]!.displayName = 'x';
  }, TypeError);
  assert.ok(Object.isFrozen(p.parts[0]!.textures));
});
test('T208: default shortcuts are local, global opt-in, unique and bounded', () => {
  const p = defaultRunPreferences();
  assert.equal(p.allowGlobal, false);
  assert.ok(p.bindings.every((b) => b.scope === 'local'));
  assert.doesNotThrow(() => assertRunPreferences(p));
  p.bindings[1]!.accelerator = p.bindings[0]!.accelerator;
  assert.throws(() => assertRunPreferences(p), /E_RUN_SHORTCUT_DUPLICATE/);
  p.bindings[1]!.enabled = false;
  assert.doesNotThrow(() => assertRunPreferences(p));
  for (const accelerator of [
    'Alt+F4',
    'Control+S',
    'Control+Alt+Delete',
    'Control+Alt+Shift+F12',
    'Super+A',
    'Control+Alt+Shift+A',
  ]) {
    const q = defaultRunPreferences();
    q.bindings[0]!.accelerator = accelerator;
    assert.throws(() => assertRunPreferences(q), /E_RUN_SHORTCUT_RESERVED/);
  }
});
test('T208: registration conflict remains unavailable, other applications keys are never released', () => {
  const h = backend(),
    p = globalPrefs(),
    key = p.bindings[0]!.accelerator;
  h.keys.set(key, () => {});
  h.s.configure(p);
  const status = h.s.activate('run', ['neutral']);
  assert.equal(status[0]!.state, 'conflict');
  h.s.close();
  assert.ok(h.keys.has(key));
  assert.equal(h.sent.length, 0);
});
test('T208: register/isRegistered disagreement and exceptions clean only new owned registration', () => {
  const h = backend(),
    p = globalPrefs(),
    key = p.bindings[0]!.accelerator;
  h.s.configure(p);
  h.api.isRegistered = () => {
    throw new Error('private path');
  };
  assert.equal(h.s.activate('run', ['neutral'])[0]!.state, 'conflict');
  assert.equal(h.keys.has(key), false);
});
test('T209: local scope never registers globally; global callback is generation guarded', () => {
  const h = backend();
  h.s.configure(globalPrefs());
  h.s.activate('a', ['neutral', 'hide']);
  assert.equal(h.keys.size, 1);
  const stale = [...h.keys.values()][0]!;
  h.s.activate('b', ['neutral']);
  stale();
  assert.equal(h.sent.length, 0);
  [...h.keys.values()][0]!();
  assert.deepEqual(h.sent, ['neutral']);
  h.s.close();
  assert.equal(h.keys.size, 0);
});
test('T209: focused text/IME context suspends global keys; outside focus restores global only', () => {
  const h = backend();
  h.s.configure(globalPrefs());
  h.s.activate('run', ['neutral']);
  h.s.context(true);
  assert.equal(h.s.status()[0]!.state, 'suspended');
  assert.equal(h.keys.size, 0);
  h.focus(false);
  assert.equal(h.s.status()[0]!.state, 'registered');
  [...h.keys.values()][0]!();
  assert.equal(h.sent.length, 1);
  h.focus(true);
  assert.equal(h.keys.size, 0);
});
test('T209: key-edit and native dialog suspension remains hard while another application is focused', () => {
  const h = backend();
  h.s.configure(globalPrefs());
  h.s.activate('run', ['neutral']);
  h.s.context(false, true);
  h.focus(false);
  assert.equal(h.keys.size, 0);
  h.s.context(false, false);
  assert.equal(h.keys.size, 1);
  h.s.modal(true);
  assert.equal(h.keys.size, 0);
  h.s.modal(false);
  assert.equal(h.keys.size, 1);
  h.s.close();
});
test('T208: PC preferences round-trip atomically and reject malformed files without exposing contents', async () => {
  await mkdir(scratchPath('execution-tests'), { recursive: true });
  const dir = await mkdtemp(scratchPath('execution-tests/prefs-')),
    s = new RunPreferenceStore(dir);
  assert.deepEqual(await s.read(), defaultRunPreferences());
  const p = globalPrefs();
  await s.save(p);
  assert.deepEqual(await s.read(), p);
  await writeFile(join(dir, 'execution.json'), 'private user string');
  await assert.rejects(s.read(), /^Error: E_RUN_PREFERENCES$/);
  await s.save(defaultRunPreferences());
  assert.equal((await s.read()).allowGlobal, false);
});
test('T209: physical key normalization ignores missing modifiers, Meta and non-reserved chords', () => {
  const e = { ctrlKey: true, altKey: true, shiftKey: true, metaKey: false, code: 'Digit3' };
  assert.equal(eventAccelerator(e), 'Control+Alt+Shift+3');
  assert.equal(eventAccelerator({ ...e, metaKey: true }), null);
  assert.equal(eventAccelerator({ ...e, shiftKey: false }), null);
  assert.equal(eventAccelerator({ ...e, code: 'KeyS' }), null);
});
test('T208: unavailable expression and recalibration actions do not register', async () => {
  const p = await fixture(),
    a = availableRunActions(p, 'manual');
  assert.ok(!a.includes('recalibrate'));
  assert.ok(!a.includes('expression-3'));
  const h = backend(),
    prefs = globalPrefs();
  prefs.bindings[3]!.scope = 'global';
  h.s.configure(prefs);
  h.s.activate('run', a);
  assert.equal(h.s.status()[3]!.state, 'inactive');
  h.s.close();
});
