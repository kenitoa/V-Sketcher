import { scratchPath } from './temp';
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { createServer } from 'node:http';
import { BroadcastServer } from '../apps/desktop/broadcast-server';
import {
  assertOutputSettings,
  defaultOutputSettings,
  type OutputSource,
} from '../packages/broadcast';
import { NEUTRAL } from '../packages/scene-core';
import { ProjectSession } from '../packages/project-session';
import { readProject } from '../packages/project-model';
async function setup(now = Date.now) {
  await mkdir(scratchPath('broadcast-tests'), { recursive: true });
  const dir = await mkdtemp(scratchPath('broadcast-tests/run-'));
  await mkdir(join(dir, 'renderer'));
  await writeFile(join(dir, 'renderer/output.html'), '<!doctype html><canvas></canvas>');
  const server = new BroadcastServer(join(dir, 'machine'), join(dir, 'renderer'), now);
  await server.init();
  return { server, dir };
}
function source(): OutputSource {
  const id = randomUUID(),
    path = `assets/output/${id}/asset/texture.png`;
  return {
    id,
    revision: 7,
    scene: {
      version: 1,
      name: '2DSketcher',
      canvas: [100, 100],
      layers: [
        { id: 'body', z: 0, origin: [0, 0], opacity: 1, bind: null, states: { default: path } },
      ],
    },
    assets: new Map([[path, Buffer.from('avatar-only')]]),
  };
}
const frame = (id: string, seq = 1, hidden = false) => ({
  sourceId: id,
  seq,
  parameters: { ...NEUTRAL },
  hidden,
});
test('broadcast snapshot freezes the published run, with no project name/path/editor data', async () => {
  const opened = readProject(await readFile('assets/product/preview-project.json', 'utf8'));
  assert.equal(opened.mode, 'read-write');
  if (opened.mode !== 'read-write') return;
  const p = opened.project,
    bundledBytes = new Map<string, Buffer>();
  for (const a of p.assets)
    bundledBytes.set(
      a.id,
      await readFile(join('assets/product/preview', a.fingerprint.sha256 + '.png')),
    );
  await mkdir(scratchPath('broadcast-tests'), { recursive: true });
  const dir = await mkdtemp(scratchPath('broadcast-tests/project-'));
  const s = new ProjectSession({
    dataDir: dir,
    dialogs: {
      openProject: async () => null,
      saveProject: async () => null,
      relinkImage: async () => null,
      unsaved: async () => 'discard',
    },
    bundled: p,
    bundledBytes,
    autoTimers: false,
  });
  await s.init();
  try {
    await s.newProject('private-project-name', 'parts');
    await s.dispatch({ type: 'sample' });
    const lease = await s.prepareRuntime({
      requestId: randomUUID(),
      sessionId: s.view().sessionId!,
      revision: s.view().project!.revision,
      mode: 'manual',
    });
    const source = await s.broadcastSnapshot(lease.requestId);
    assert.equal(source.id, lease.requestId);
    assert.equal(source.scene.name, '2DSketcher');
    assert.equal(source.scene.model, undefined);
    assert.ok(source.assets.size > 0);
    assert.ok(!JSON.stringify(source.scene).includes('private-project-name'));
    assert.ok(!JSON.stringify(source.scene).includes('session/'));
    await s.dispatch({ type: 'rename', name: 'newer working edit' });
    assert.equal((await s.broadcastSnapshot(lease.requestId)).revision, lease.revision);
    assert.deepEqual(source.scene, (await s.broadcastSnapshot(lease.requestId)).scene);
    s.stopRuntime(lease.requestId);
    await assert.rejects(s.broadcastSnapshot(lease.requestId), /E_RUN_STALE/);
  } finally {
    await s.shutdown();
  }
});
test('output settings admit explicit 1080p/720p 15/30 FPS without silent quality changes', () => {
  for (const [width, height] of [
    [1920, 1080],
    [1280, 720],
  ])
    for (const fps of [15, 30])
      assertOutputSettings({ ...defaultOutputSettings(), width, height, fps });
  for (const value of [
    { ...defaultOutputSettings(), width: 4096 },
    { ...defaultOutputSettings(), fps: 60 },
    { ...defaultOutputSettings(), scale: NaN },
    { ...defaultOutputSettings(), x: 2 },
    { ...defaultOutputSettings(), crop: { left: 0.45, right: 0.45, top: 0, bottom: 0 } },
    { ...defaultOutputSettings(), extra: true },
  ])
    assert.throws(() => assertOutputSettings(value), /E_OUTPUT_SETTINGS/);
});
test('loopback output state and URL capability are separate, monotonic and hidden-safe', async () => {
  const { server } = await setup();
  try {
    assert.equal(server.view().state, 'OFF');
    const s = source();
    await server.start(s);
    assert.equal(server.view().state, 'SOURCE_READY');
    assert.equal('url' in server.view(), false);
    server.publish(frame(s.id, 2, true));
    server.publish(frame(s.id, 1, false));
    const state = await (await fetch(server.url() + 'state')).json();
    assert.equal(state.frame.hidden, true);
    assert.equal(state.frame.seq, 2);
    server.publish({ ...frame(s.id, 3), parameters: { ...NEUTRAL, mouth: NaN } });
    assert.equal((await (await fetch(server.url() + 'state')).json()).frame.seq, 2);
  } finally {
    await server.close();
  }
});
test('HTTP reader rejects missing/rotated capability, traversal and control requests', async () => {
  const { server } = await setup();
  try {
    await server.start(source());
    const url = server.url()!;
    const root = new URL(url).origin;
    assert.equal((await fetch(root + '/')).status, 403);
    assert.equal((await fetch(url + '%2e%2e/private')).status, 403);
    assert.equal((await fetch(url + 'state', { method: 'POST' })).status, 405);
    assert.equal((await fetch(url + 'index.html')).status, 404);
    const response = await fetch(url);
    assert.match(response.headers.get('content-security-policy')!, /object-src 'none'/);
    assert.equal(response.headers.get('referrer-policy'), 'no-referrer');
    assert.equal(response.headers.get('access-control-allow-origin'), null);
    await server.rotate();
    assert.equal((await fetch(url + 'state')).status, 403);
    assert.equal((await fetch(server.url() + 'state')).status, 200);
  } finally {
    await server.close();
  }
});
test('only current and one retained avatar resource set can be read', async () => {
  const { server } = await setup();
  try {
    const a = source(),
      b = source(),
      c = source();
    await server.start(a);
    const path = [...a.assets.keys()][0]!;
    assert.equal(await (await fetch(server.url() + path)).text(), 'avatar-only');
    server.setSource(b);
    assert.equal((await fetch(server.url() + path)).status, 200);
    server.setSource(c);
    assert.equal((await fetch(server.url() + path)).status, 404);
    server.stop();
    assert.equal((await fetch(server.url() + [...c.assets.keys()][0]!)).status, 404);
  } finally {
    await server.close();
  }
});
test('stale frames become null and stop exposes no project or input payload', async () => {
  let now = 10000;
  const { server } = await setup(() => now);
  try {
    const s = source();
    await server.start(s);
    server.publish(frame(s.id));
    now += 1001;
    assert.equal(server.view().health, 'STALE');
    assert.equal((await (await fetch(server.url() + 'state')).json()).frame, null);
    server.stop();
    const state = await (await fetch(server.url() + 'state')).json();
    assert.equal(state.state, 'OFF');
    assert.equal(state.frame, null);
    assert.equal(state.sourceId, null);
    assert.equal(JSON.stringify(state).includes('token'), false);
  } finally {
    await server.close();
  }
});
test('renderer ACK is bounded, same-origin, current-version and never external verification', async () => {
  let now = 10000;
  const { server } = await setup(() => now);
  try {
    const s = source();
    await server.start(s);
    const url = server.url()!,
      ack = {
        clientId: randomUUID(),
        sourceId: s.id,
        settingsVersion: server.view().settingsVersion,
        ready: true,
        width: 800,
        height: 600,
      };
    const send = (origin: string, value = ack) =>
      fetch(url + 'ack', {
        method: 'POST',
        headers: { Origin: origin, 'Content-Type': 'application/json' },
        body: JSON.stringify(value),
      });
    assert.equal((await send('https://outside.example')).status, 403);
    assert.equal((await send(new URL(url).origin, { ...ack, settingsVersion: 0 })).status, 400);
    assert.equal((await send(new URL(url).origin)).status, 200);
    assert.equal(server.view().pageConsumers, 1);
    assert.equal(server.view().viewportMismatch, true);
    assert.equal(server.view().confirmation, null);
    now += 4001;
    assert.equal(server.view().pageConsumers, 0);
  } finally {
    await server.close();
  }
});
test('explicit user confirmation records target/version/time and is invalidated by settings/source', async () => {
  const { server } = await setup();
  try {
    const s = source();
    await server.start(s);
    const input = {
      targetVersion: '33.0.1',
      sourceId: s.id,
      settingsVersion: server.view().settingsVersion,
      checks: { alpha: true, motion: true, expression: true, shortcut: true },
    };
    await assert.rejects(
      server.confirm({ ...input, targetVersion: 'unknown' }),
      /E_OUTPUT_CONFIRM/,
    );
    await server.confirm(input);
    assert.equal(server.view().confirmationCurrent, true);
    assert.equal(server.view().confirmation!.method, 'USER_CONFIRMED');
    await server.configure({ ...defaultOutputSettings(), fps: 15 });
    assert.equal(server.view().confirmationCurrent, false);
    await server.restore();
    assert.equal(server.view().settings.fps, 30);
    assert.equal(server.view().confirmationCurrent, false);
    server.setSource(source());
    assert.equal(server.view().confirmationCurrent, false);
    assert.equal(server.view().confirmation!.settingsVersion, input.settingsVersion);
  } finally {
    await server.close();
  }
});
test('port/read capability and settings survive app restart, not as a project field', async () => {
  const { server, dir } = await setup();
  const s = source();
  await server.start(s);
  const url = server.url();
  await server.configure({ ...defaultOutputSettings(), fps: 15 });
  await server.close();
  const second = new BroadcastServer(join(dir, 'machine'), join(dir, 'renderer'));
  await second.init();
  try {
    assert.equal(second.view().state, 'OFF');
    assert.equal(second.view().settings.fps, 15);
    await second.start(s);
    assert.equal(second.url(), url);
  } finally {
    await second.close();
  }
});
test('occupied saved port fails with a code and leaves the previous profile intact', async () => {
  const { server, dir } = await setup();
  await server.start(source());
  const url = server.url()!;
  await server.close();
  const blocked = createServer();
  await new Promise<void>((r) => blocked.listen(Number(new URL(url).port), '127.0.0.1', r));
  const before = await readFile(join(dir, 'machine/broadcast.json'));
  const second = new BroadcastServer(join(dir, 'machine'), join(dir, 'renderer'));
  await second.init();
  try {
    await second.start(source());
    assert.equal(second.view().state, 'FAILED');
    assert.equal(second.view().errorCode, 'E_OUTPUT_PORT');
    assert.deepEqual(await readFile(join(dir, 'machine/broadcast.json')), before);
  } finally {
    await second.close();
    await new Promise<void>((r) => blocked.close(() => r()));
  }
});
test('failed settings persistence preserves the active source, settings and old profile', async () => {
  const { server, dir } = await setup();
  try {
    const s = source();
    await server.start(s);
    const before = server.view();
    await mkdir(join(dir, 'machine/broadcast.json.pending'));
    await assert.rejects(server.configure({ ...defaultOutputSettings(), fps: 15 }));
    assert.deepEqual(server.view().settings, before.settings);
    assert.equal(server.view().sourceId, s.id);
    assert.equal(server.view().state, 'SOURCE_READY');
  } finally {
    await server.close();
  }
});
test('overlapping settings writes are rejected and stop invalidates late startup', async () => {
  const { server } = await setup();
  try {
    const pending = server.configure({ ...defaultOutputSettings(), fps: 15 });
    await assert.rejects(server.configure(defaultOutputSettings()), /E_OUTPUT_BUSY/);
    await pending;
    const start = server.start(source());
    server.stop();
    await start;
    assert.equal(server.view().state, 'OFF');
  } finally {
    await server.close();
  }
});
test('malformed frames cannot add unknown control fields or revive an inactive source', async () => {
  const { server } = await setup();
  try {
    const s = source();
    await server.start(s);
    server.publish({ ...frame(s.id), parameters: { ...NEUTRAL, camera: 'raw' } } as never);
    assert.equal((await (await fetch(server.url() + 'state')).json()).frame, null);
    server.publish(frame(s.id));
    server.stop();
    server.publish(frame(s.id, 2));
    assert.equal((await (await fetch(server.url() + 'state')).json()).frame, null);
  } finally {
    await server.close();
  }
});
