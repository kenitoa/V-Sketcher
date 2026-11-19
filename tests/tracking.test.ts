import { scratchPath } from './temp';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { readProject, assertProject, type Project } from '../packages/project-model';
import {
  TargetLock,
  NeutralCalibration,
  TrackingMapper,
  defaultTracking,
  assertTracking,
  assertCalibration,
  assertDetection,
  cameraError,
  type Face,
  type Calibration,
  type Signals,
} from '../packages/tracking';
import { CameraProfiles, CameraTracker } from '../apps/desktop/camera-tracker';
import { MotionPlayer } from '../packages/motion';
import { encodeBundle, decodeBundle } from '../packages/project-storage/archive';
import { parseSessionCommand } from '../packages/project-session/contracts';
const raw: Signals = { eye_left: 0.9, eye_right: 0.95, mouth: 0.04, head_yaw: 2, head_roll: -1 };
const face = (x = 0.2, patch: Partial<Signals> = {}): Face => ({
  box: { x, y: 0.2, width: 0.2, height: 0.3 },
  values: { ...raw, ...patch },
  brightness: 120,
});
const key = 'a'.repeat(64);
const load = async (): Promise<Project> => {
  const p = readProject(await readFile('assets/product/preview-project.json', 'utf8'));
  if (p.mode !== 'read-write') throw new Error('fixture');
  return p.project;
};
function calibrate(): Calibration {
  const c = new NeutralCalibration();
  c.start(0);
  for (let i = 0; i < 20; i++) c.sample(face(), 120, i * 100, key);
  assert.equal(c.state, 'ready');
  return c.candidate!;
}
test('T181/182: camera OS error names distinguish confirmed missing/denied from open/busy possibilities', () => {
  assert.equal(cameraError('NotAllowedError'), 'E_CAMERA_PERMISSION');
  assert.equal(cameraError('NotFoundError'), 'E_CAMERA_MISSING');
  assert.equal(cameraError('NotReadableError'), 'E_CAMERA_OPEN');
  assert.equal(cameraError('AbortError'), 'E_CAMERA_READ');
  assert.equal(cameraError('arbitrary private path'), 'E_CAMERA_UNKNOWN');
});
test('T184: first single face locks, incoming second face and reordered output cannot steal ownership', () => {
  const c = new TargetLock(),
    a = face(),
    b = face(0.7);
  assert.equal(c.update([a], 0), a);
  assert.equal(c.update([b, face(0.21)], 100)!.box.x, 0.21);
  assert.equal(c.update([b], 200), null);
  assert.equal(c.state, 'lost');
  assert.equal(c.update([face(0.22), b], 300)!.box.x, 0.22);
  assert.equal(c.update([face(0.22)], 1300)!.box.x, 0.22);
  assert.equal(c.update([face(0.22)], 3400), null);
});
test('T184: initial multiple faces require selection; target overlap and long loss fail closed until explicit reselect', () => {
  const c = new TargetLock();
  assert.equal(c.update([face(), face(0.7)], 0), null);
  assert.equal(c.state, 'select');
  c.select(face().box, 10);
  assert.equal(c.update([face(0.21), face(0.22)], 20), null);
  assert.equal(c.state, 'ambiguous');
  assert.equal(c.update([face(0.21)], 30), null);
  assert.equal(c.update([face()], 600), null);
  assert.equal(c.update([face()], 700), null);
  c.select(face().box, 710);
  assert.ok(c.update([face()], 720));
});
test('T185: neutral requires 12 fresh samples and 1.5s stability, computes median raw input independent of expressions', () => {
  const c = new NeutralCalibration();
  c.start(0);
  for (let i = 0; i < 11; i++) c.sample(face(), 120, i * 150, key);
  assert.equal(c.state, 'collecting');
  c.sample(face(), 120, 1650, key);
  assert.equal(c.state, 'ready');
  assert.deepEqual(c.candidate!.neutral, raw);
  assertCalibration(c.candidate);
});
test('T185/188: closed eyes, moving head, darkness, mouth opening, missing face and duplicates never form a baseline', () => {
  for (const invalid of [
    face(0.2, { eye_left: 0 }),
    face(0.2, { mouth: 0.8 }),
    face(0.2, { head_yaw: 50 }),
    null,
  ]) {
    const c = new NeutralCalibration();
    c.start(0);
    for (let i = 0; i < 50; i++) c.sample(invalid, 120, i * 100, key);
    assert.equal(c.state, 'collecting');
  }
  const c = new NeutralCalibration();
  c.start(0);
  for (let i = 0; i < 50; i++) c.sample(face(), 12, i * 100, key);
  assert.equal(c.count, 0);
  c.sample(face(), 120, 11000, key);
  assert.equal(c.state, 'failed');
});
test('T185/186: unstable samples restart acquisition and cancel drops candidate only, caller baseline is unchanged', () => {
  const old = calibrate(),
    before = JSON.stringify(old),
    c = new NeutralCalibration();
  c.start(0);
  for (let i = 0; i < 40; i++)
    c.sample(face(0.2, { head_yaw: i % 2 ? 15 : -15 }), 120, i * 100, key);
  assert.notEqual(c.state, 'ready');
  c.cancel();
  assert.equal(c.candidate, null);
  assert.equal(JSON.stringify(old), before);
});
test('T187: semantic mapping supports independent direction/gain/ranges and custom parameter units', async () => {
  const p = await load();
  p.tracking = defaultTracking();
  p.tracking.channels.forEach((c) => {
    c.smoothingMs = 0;
  });
  p.tracking.channels.find((c) => c.key === 'head_yaw')!.invert = true;
  const mapper = new TrackingMapper(),
    cal = calibrate();
  let values = new Map<string, number>();
  for (let i = 0; i < 100; i++) values = mapper.map(p, { ...raw, head_yaw: 17 }, cal, 100 + i * 33);
  assert.ok(values.get(p.parameters.find((v) => v.previewKey === 'head_yaw')!.id)! < -0.49);
  assert.equal(values.get(p.parameters.find((v) => v.previewKey === 'mouth')!.id), 0);
  assert.ok(values.get(p.parameters.find((v) => v.previewKey === 'eye_left')!.id)! > 0.99);
  const eye = p.parameters.find((v) => v.previewKey === 'eye_left')!;
  eye.unit = 'custom';
  eye.min = 10;
  eye.neutral = 40;
  eye.max = 110;
  for (const e of p.expressions)
    for (const v of e.values) if (v.parameterId === eye.id) v.value = 10 + v.value * 100;
  for (const b of p.inputBindings)
    if (b.parameterId === eye.id) b.fallback.value = 10 + b.fallback.value * 100;
  const mouth = p.parameters.find((v) => v.previewKey === 'mouth')!;
  mouth.unit = 'custom';
  mouth.min = 20;
  mouth.neutral = 30;
  mouth.max = 90;
  for (const e of p.expressions)
    for (const v of e.values) if (v.parameterId === mouth.id) v.value = 20 + v.value * 70;
  for (const b of p.inputBindings)
    if (b.parameterId === mouth.id) b.fallback.value = 20 + b.fallback.value * 70;
  p.motion!.settings.pose = [{ parameterId: eye.id, value: 55 }];
  assertProject(p);
  const centered = new TrackingMapper();
  const atRest = centered.map(p, raw, cal, 5000);
  assert.equal(atRest.get(eye.id), 55);
  assert.equal(atRest.get(mouth.id), 30);
  p.tracking.channels.forEach((c) => {
    c.invert = true;
    c.gain = 2;
  });
  assert.equal(new TrackingMapper().map(p, raw, cal, 5000).get(eye.id), 55);
});
test('T187: turning a channel off leaves ownership to expression/default and never emits stale values', async () => {
  const p = await load(),
    c = new TrackingMapper();
  p.tracking = defaultTracking();
  p.tracking.channels[0]!.enabled = false;
  const values = c.map(p, raw, null, 10);
  assert.equal(values.has(p.parameters.find((v) => v.previewKey === 'eye_left')!.id), false);
  assert.equal(values.size, 4);
});
test('T188: nonfinite/unknown/oversized raw results and reversed clocks emit no unsafe map', async () => {
  const p = await load(),
    m = new TrackingMapper();
  for (const value of [NaN, Infinity, 999])
    assert.equal(m.map(p, { ...raw, head_yaw: value }, null, 1).size, 0);
  assert.equal(m.map(p, raw, null, 10).size, 5);
  assert.equal(m.map(p, raw, null, 9).size, 0);
  assert.throws(() =>
    assertDetection({ seq: 1, faces: [face()], brightness: NaN, inferenceMs: 1 }),
  );
});
test('T188: extreme changes are rate limited and all outputs remain inside each independently authored parameter range', async () => {
  const p = await load(),
    m = new TrackingMapper();
  p.tracking = defaultTracking();
  p.tracking.channels.forEach((c) => {
    c.gain = 2;
    c.smoothingMs = 0;
  });
  const id = p.parameters.find((v) => v.previewKey === 'head_yaw')!.id;
  let prior = 0;
  for (let i = 0; i < 200; i++) {
    const output = m.map(
      p,
      { ...raw, head_yaw: i % 2 ? 79 : -79, mouth: i % 2 ? 1 : 0 },
      null,
      1 + i * 16,
    );
    const yaw = output.get(id)!;
    assert.ok(Math.abs(yaw - prior) <= 0.134);
    prior = yaw;
    for (const param of p.parameters)
      if (output.has(param.id))
        assert.ok(output.get(param.id)! >= param.min && output.get(param.id)! <= param.max);
  }
});
test('T187/188: time-based smoothing at 30 and 120Hz agrees for moderate targets and configurable dead zone removes small neutral noise', async () => {
  const p = await load();
  p.tracking = defaultTracking();
  p.tracking.channels.forEach((c) => {
    c.smoothingMs = 200;
    c.deadzone = 0.03;
  });
  const id = p.parameters.find((v) => v.previewKey === 'head_yaw')!.id;
  const run = (hz: number) => {
    const m = new TrackingMapper();
    m.map(p, { ...raw, head_yaw: 0 }, null, 0);
    let last = 0;
    for (let i = 1; i <= hz; i++)
      last = m.map(p, { ...raw, head_yaw: 3 }, null, (i * 1000) / hz).get(id)!;
    return last;
  };
  assert.ok(Math.abs(run(30) - run(120)) < 1e-7);
  const m = new TrackingMapper();
  assert.equal(m.map(p, { ...raw, head_yaw: 0.5 }, null, 1).get(id), 0);
});
test('T187/189: strict project settings reject missing/duplicate channels, invalid ranges/gains and OS device data', () => {
  const s = defaultTracking();
  for (const next of [
    { ...s, deviceId: 'private' },
    { ...s, channels: s.channels.slice(1) },
    { ...s, channels: [s.channels[0], ...s.channels.slice(0, 4)] },
  ])
    assert.throws(() => assertTracking(next));
  const q = defaultTracking();
  q.channels[0]!.range = [1, 0];
  assert.throws(() => assertTracking(q));
  assert.throws(() =>
    parseSessionCommand({
      type: 'tracking-settings',
      expectedRevision: 0,
      value: { ...s, frame: 'raw' },
    }),
  );
});
test('T189: machine profiles are device/resolution-specific and never silently replace good data on malformed writes', async () => {
  await mkdir(scratchPath('tracking-tests'), { recursive: true });
  const dir = await mkdtemp(scratchPath('tracking-tests/profiles-')),
    store = new CameraProfiles(dir),
    a = calibrate(),
    b = { ...a, profileKey: 'b'.repeat(64) };
  await store.save(a);
  await store.save(b);
  assert.equal((await store.read()).length, 2);
  await assert.rejects(store.save({ ...a, neutral: { ...raw, eye_left: 0 } }));
  assert.deepEqual(await store.read(), [a, b]);
  assert.ok(!(await readFile(join(dir, 'camera-calibration.json'), 'utf8')).includes('deviceId'));
});
test('T189: machine profile corruption fails explicitly without overwriting original bytes', async () => {
  await mkdir(scratchPath('tracking-tests'), { recursive: true });
  const dir = await mkdtemp(scratchPath('tracking-tests/corrupt-'));
  await writeFile(join(dir, 'camera-calibration.json'), 'broken');
  const store = new CameraProfiles(dir);
  await assert.rejects(store.read());
  await assert.rejects(store.save(calibrate()));
  assert.equal(await readFile(join(dir, 'camera-calibration.json'), 'utf8'), 'broken');
});
test('T189: project roundtrip contains mapping only, retains appearance/expression and excludes calibration/hardware', async () => {
  const p = await load(),
    before = JSON.stringify({ parts: p.parts, expressions: p.expressions });
  p.tracking = defaultTracking();
  p.tracking.channels[4]!.invert = true;
  const bytes = new Map<string, Buffer>();
  for (const a of p.assets)
    bytes.set(a.id, await readFile(join('assets/product/preview', a.fingerprint.sha256 + '.png')));
  const q = (await decodeBundle(await encodeBundle(p, bytes, 'manual'))).project!;
  assert.deepEqual(q.tracking, p.tracking);
  assert.equal(JSON.stringify({ parts: q.parts, expressions: q.expressions }), before);
  assert.equal(JSON.stringify(q).includes('profileKey'), false);
  assertProject(q);
});
test('T187: real mapped camera packets enter shared expression/test priority and disappear on source timeout', async () => {
  const p = await load(),
    m = new MotionPlayer(),
    mapper = new TrackingMapper();
  m.setProject(p);
  m.frame(0);
  m.cameraLive = true;
  const values = mapper.map(p, raw, calibrate(), 16);
  assert.equal(m.feedCamera(values, 16), true);
  m.frame(16);
  assert.equal(m.controls.snapshot().owners.get(p.parameters[0]!.id), 'camera');
  m.set('eye_left', 0);
  for (let i = 0; i < 10; i++) m.frame(16 + i * 16);
  assert.equal(
    m.controls.snapshot().owners.get(p.parameters.find((v) => v.previewKey === 'eye_left')!.id),
    'test',
  );
  m.stop();
  m.frame(400);
  assert.equal(m.controls.snapshot().owners.get(p.parameters[0]!.id), 'neutral');
});
test('T184/190: crossing/occlusion/face substitution synthetic sequence never auto-adopts a far replacement', () => {
  const c = new TargetLock();
  c.update([face()], 0);
  for (let i = 1; i < 10; i++) assert.equal(c.update([face(0.7)], i * 100), null);
  assert.equal(c.state, 'lost');
  assert.equal(c.update([face()], 1100), null);
  c.select(face(0.7).box, 1110);
  assert.equal(c.update([face(0.7)], 1120)!.box.x, 0.7);
});
test('T182/183: actual private tracking process starts without opening hardware, rejects invalid in-memory JPEG and joins shutdown', async () => {
  const tracker = new CameraTracker(
    resolve('.venv-product/Scripts/python.exe'),
    ['-I', '-u', resolve('worker/main.py')],
    process.env,
  );
  assert.equal(await tracker.begin(), true);
  assert.equal(await tracker.frame(1, new Uint8Array([1, 2, 3, 4])), null);
  await tracker.stop();
  await assert.rejects(tracker.frame(2, new Uint8Array([1, 2, 3, 4])));
});
