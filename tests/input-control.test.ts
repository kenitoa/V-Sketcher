import { scratchPath } from './temp';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import vm from 'node:vm';
import { CameraTracker } from '../apps/desktop/camera-tracker';
import {
  AudioClock,
  InputWatchdog,
  NoiseCalibration,
  MicrophoneMapper,
  microphoneDefaults,
  assertMicrophoneProfile,
  InputTransitions,
  inputTiming,
} from '../packages/input-control';
import { MicrophoneProfiles } from '../apps/desktop/microphone-profiles';
import { ExpressionController, editExpressions, defaults } from '../packages/expression-control';
import { MotionPlayer } from '../packages/motion';
import { readProject, serializeProject, type Project } from '../packages/project-model';
const key = 'a'.repeat(64),
  near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 1e-7, `${a} != ${b}`);
const load = async (route?: string): Promise<Project> => {
  const r = readProject(
    await readFile(
      route
        ? `tests/fixtures/common-model/${route}/project.json`
        : 'assets/product/preview-project.json',
      'utf8',
    ),
  );
  if (r.mode !== 'read-write') throw new Error('fixture');
  return r.project;
};
const setup = async () => {
  const p = await load(),
    c = new ExpressionController();
  c.setProject(p);
  c.recoveryEnabled = true;
  return {
    p,
    c,
    mouth: p.parameters.find((v) => v.previewKey === 'mouth')!,
    head: p.parameters.find((v) => v.previewKey === 'head_yaw')!,
  };
};
const calibration = () => {
  const c = new NoiseCalibration();
  c.begin(0);
  for (let i = 0; i <= 40; i++) c.sample(0.01, i * 50);
  return c;
};
test('T191: actual worklet computes RMS, bounded aggregate messages and zero output without emitting PCM', async () => {
  const messages: unknown[] = [];
  let processor: any;
  const context = vm.createContext({
    sampleRate: 48000,
    currentTime: 0,
    currentFrame: 0,
    AudioWorkletProcessor: class {
      port = { postMessage: (v: unknown) => messages.push(v) };
    },
    registerProcessor: (_name: string, C: any) => {
      processor = new C();
    },
  });
  vm.runInContext(await readFile('apps/renderer/src/level-worklet.js', 'utf8'), context);
  for (let i = 0; i < 40; i++) {
    context.currentTime = (i * 128) / 48000;
    context.currentFrame = i * 128;
    const a = Float32Array.from(
        { length: 128 },
        (_, j) => 0.5 * Math.sin((2 * Math.PI * (i * 128 + j)) / 48),
      ),
      out = new Float32Array(128).fill(1);
    processor.process([[a]], [[out]]);
    assert.ok(out.every((v) => v === 0));
  }
  assert.ok(messages.length >= 2);
  for (const v of messages as { rms: number; peak: number }[]) {
    assert.deepEqual(Object.keys(v).sort(), ['frames', 'peak', 'rms', 'time']);
    assert.ok(v.rms > 0.34 && v.rms < 0.36);
    assert.ok(v.peak <= 0.5);
  }
  const warm = new AudioClock();
  near(warm.map(0.05, 0.06, 5000)!, 4990);
  assert.equal(warm.map(0.05, 0.06, 10000), null);
  const backlog = new AudioClock();
  assert.equal(backlog.map(8, 10, 10000), null);
  near(backlog.map(9.99, 10.01, 10010)!, 9990);
});
test('T255 regression: fresh audio survives UI/engine clock offset changes while queued and duplicate packets stay rejected', () => {
  const clock = new AudioClock();
  near(clock.map(1, 1.01, 1000)!, 990);
  near(clock.map(1.05, 1.06, 1850)!, 1840);
  assert.equal(clock.map(1.05, 1.06, 5000), null);
  assert.equal(clock.map(1.1, 1.9, 1900), null);
  near(clock.map(1.91, 1.92, 1950)!, 1940);
  near(clock.lastAgeMs!, 10);
  assert.equal(clock.map(1.92, 2.2, 2000), null);
  assert.equal(clock.map(NaN, 2, 2100), null);
});

test('fresh audio quanta remain usable at receipt while stale and future control packets stay excluded', async () => {
  const { p, c, mouth } = await setup();
  p.expressionSettings = { ...defaults, mouth: 'microphone', alternate: false };
  c.recoveryEnabled = true;
  const clock = new AudioClock();
  const mapped = clock.map(1.02, 1, 1000)!;
  near(mapped, 1000);
  assert.equal(c.input('microphone', new Map([[mouth.id, mouth.max]]), mapped, 1), true);
  c.frame(1000);
  assert.equal(c.snapshot().owners.get(mouth.id), 'microphone');
  assert.equal(clock.map(1.03, 2, 1100), null);
  c.frame(2000);
  assert.notEqual(c.snapshot().owners.get(mouth.id), 'microphone');
  c.input('microphone', new Map([[mouth.id, mouth.max]]), 2200, 2);
  c.frame(2190);
  assert.notEqual(c.snapshot().owners.get(mouth.id), 'microphone');
});
test('T191: stereo opposite phase remains audible level and genuine zero is valid silence', async () => {
  const rows: any[] = [];
  let processor: any;
  const context = vm.createContext({
    sampleRate: 1000,
    currentTime: 0,
    currentFrame: 0,
    AudioWorkletProcessor: class {
      port = { postMessage: (v: any) => rows.push(v) };
    },
    registerProcessor: (_name: string, C: any) => {
      processor = new C();
    },
  });
  vm.runInContext(await readFile('apps/renderer/src/level-worklet.js', 'utf8'), context);
  processor.process([[new Float32Array(50).fill(0.5), new Float32Array(50).fill(-0.5)]], []);
  near(rows[0].rms, 0.5);
  processor.process([[new Float32Array(50)]], []);
  near(rows[1].rms, 0);
});
test('T192: quiet calibration needs time and samples, stores conservative 90th percentile candidate before apply', () => {
  const c = calibration();
  assert.equal(c.state, 'ready');
  near(c.candidate!, 0.01);
  const d = new NoiseCalibration();
  d.begin(0);
  for (let i = 0; i < 100; i++) d.sample(0.01, 10);
  assert.equal(d.state, 'collecting');
});
test('T192: loud, insufficient and cancelled measurement cannot overwrite a prior floor', () => {
  const p = microphoneDefaults(key);
  p.noiseFloor = 0.03;
  const c = calibration();
  c.cancel();
  assert.equal(c.candidate, null);
  near(p.noiseFloor, 0.03);
  c.begin(0);
  c.sample(0.5, 10);
  assert.equal(c.state, 'failed');
  c.begin(0);
  c.sample(0.01, 6000);
  assert.equal(c.state, 'failed');
});
test('T192: noise gate suppresses ambient input and strength zero closes mouth', () => {
  const p = microphoneDefaults(key);
  p.noiseFloor = 0.02;
  p.smoothingMs = 0;
  const m = new MicrophoneMapper();
  near(m.map(0.024, p, 1)!, 0);
  assert.ok(m.map(0.3, p, 51)! > 0);
  p.strength = 0;
  for (let i = 0; i < 10; i++) m.map(1, p, 101 + i * 50);
  near(m.map(1, p, 1001)!, 0);
});
test('T192: sensitivity and strength are bounded and mapping rejects NaN, infinity and reverse time', () => {
  const p = microphoneDefaults(key),
    m = new MicrophoneMapper();
  for (const value of [NaN, Infinity, -1, 2]) assert.equal(m.map(value, p, 1), null);
  assert.ok(m.map(0.1, p, 10)! >= 0);
  assert.equal(m.map(0.1, p, 9), null);
  for (const v of [
    { ...p, sensitivity: 11 },
    { ...p, noiseFloor: 0.5 },
    { ...p, pcm: [1] },
    { ...p, key: 'private-device' },
  ])
    assert.throws(() => assertMicrophoneProfile(v));
});
test('T192: large sound steps and physical input packets obey rate, range and uncertain artwork limits', async () => {
  const m = new MicrophoneMapper(),
    p = { ...microphoneDefaults(key), smoothingMs: 0, sensitivity: 10, strength: 2 };
  let last = 0;
  for (let i = 0; i < 100; i++) {
    const next = m.map(i % 2 ? 0 : 1, p, 1 + i * 16)!;
    assert.ok(Math.abs(next - last) <= 0.401);
    assert.ok(next >= 0 && next <= 1);
    last = next;
  }
  const project = await load();
  project.assets[0]!.origin = 'generated';
  const player = new MotionPlayer();
  player.setProject(project);
  const mouth = project.parameters.find((p) => p.previewKey === 'mouth')!;
  player.feedMicrophone(new Map([[mouth.id, mouth.max]]), 0);
  near(player.frame(0).values.get(mouth.id)!, mouth.neutral + (mouth.max - mouth.neutral) * 0.65);
  player.feedCamera(new Map([[mouth.id, mouth.max]]), 10);
  near(player.frame(10).values.get(mouth.id)!, mouth.neutral + (mouth.max - mouth.neutral) * 0.65);
});
test('T193: microphone priority uses one owner, never sums camera and audio; valid silence retains ownership', async () => {
  const { p, c, mouth } = await setup();
  p.expressionSettings = { ...defaults, mouth: 'microphone' };
  c.input('camera', new Map([[mouth.id, 0.8]]), 0, 0);
  c.input('microphone', new Map([[mouth.id, 0]]), 0, 0);
  c.frame(0);
  for (let t = 50; t <= 300; t += 50) {
    c.input('camera', new Map([[mouth.id, 0.8]]), t, t);
    c.input('microphone', new Map([[mouth.id, 0]]), t, t);
    c.frame(t);
  }
  near(c.frame(300).values.get(mouth.id)!, 0);
  assert.equal(c.snapshot().owners.get(mouth.id), 'microphone');
});
test('T193: preferred input expiry selects only configured valid alternate', async () => {
  const { p, c, mouth } = await setup();
  p.expressionSettings = { ...defaults, mouth: 'microphone' };
  c.input('microphone', new Map([[mouth.id, 1]]), 0, 0);
  c.frame(0);
  c.input('camera', new Map([[mouth.id, 0.4]]), 200, 1);
  c.frame(200);
  assert.equal(c.snapshot().owners.get(mouth.id), 'camera');
  p.expressionSettings.alternate = false;
  c.frame(201);
  assert.notEqual(c.snapshot().owners.get(mouth.id), 'camera');
});
test('T194: microphone callback stall closes mouth using display time even with no new packets', async () => {
  const { c, mouth } = await setup();
  for (let t = 0; t <= 300; t += 50) {
    c.input('microphone', new Map([[mouth.id, 1]]), t, t);
    c.frame(t);
  }
  assert.ok(c.snapshot().values.get(mouth.id)! > 0.9);
  assert.ok(c.frame(500).values.get(mouth.id)! > 0);
  near(c.frame(1000).values.get(mouth.id)!, mouth.neutral);
});
test('T195: camera holds exactly 300ms then relaxes over 500ms without inference callbacks', async () => {
  const { c, head } = await setup();
  for (let t = 0; t <= 300; t += 50) {
    c.input('camera', new Map([[head.id, 0.9]]), t, t);
    c.frame(t);
  }
  near(c.frame(600).values.get(head.id)!, 0.9);
  assert.ok(c.frame(850).values.get(head.id)! > 0.1);
  near(c.frame(1100).values.get(head.id)!, head.neutral);
});
test('T196: camera loss does not clear valid microphone; microphone loss does not clear head tracking', async () => {
  const { c, mouth, head } = await setup();
  c.input('camera', new Map([[head.id, 0.5]]), 0, 0);
  c.input('microphone', new Map([[mouth.id, 0.7]]), 0, 0);
  c.frame(0);
  c.clearInput('camera');
  c.input('microphone', new Map([[mouth.id, 0.7]]), 600, 1);
  c.frame(600);
  assert.equal(c.snapshot().owners.get(mouth.id), 'microphone');
  c.input('camera', new Map([[head.id, 0.5]]), 700, 1);
  c.clearInput('microphone');
  c.frame(700);
  assert.equal(c.snapshot().owners.get(head.id), 'camera');
});
test('T197: recovery starts from displayed fallback and converges to latest packets over 250ms', async () => {
  const { c, head } = await setup();
  c.frame(1000);
  c.input('camera', new Map([[head.id, 1]]), 1000, 0);
  near(c.frame(1000).values.get(head.id)!, 0);
  c.input('camera', new Map([[head.id, 0.6]]), 1125, 1);
  const mid = c.frame(1125).values.get(head.id)!;
  assert.ok(mid > 0 && mid < 0.6);
  c.input('camera', new Map([[head.id, 0.8]]), 1250, 2);
  near(c.frame(1250).values.get(head.id)!, 0.8);
});
test('T193/197: fixed expression and test override recovery; release uses latest live value', async () => {
  const { p, c, mouth } = await setup();
  editExpressions(
    p,
    {
      kind: 'save',
      id: null,
      name: 'Closed',
      values: [{ parameterId: mouth.id, value: 0, locked: true }],
      transitionMs: 0,
      releaseMs: 200,
      release: 'live-input',
    },
    () => 'locked-input',
  );
  c.setProject(p);
  c.recoveryEnabled = true;
  c.activate('locked-input', 0);
  for (let t = 0; t <= 300; t += 50) {
    c.input('microphone', new Map([[mouth.id, 1]]), t, t);
    near(c.frame(t).values.get(mouth.id)!, 0);
  }
  near(c.frame(300, new Map([[mouth.id, 0.4]])).values.get(mouth.id)!, 0.4);
  c.release(300);
  c.input('microphone', new Map([[mouth.id, 0.8]]), 500, 501);
  assert.ok(c.frame(500).values.get(mouth.id)! > 0);
});
test('T198: project switch clears device-derived transition state and preserves project bytes', async () => {
  const { p, c, mouth } = await setup(),
    before = serializeProject(p);
  c.input('microphone', new Map([[mouth.id, 1]]), 0, 0);
  c.frame(0);
  c.setProject(p, 'another-session');
  near(c.frame(1000).values.get(mouth.id)!, mouth.neutral);
  assert.equal(serializeProject(p), before);
});
test('T198: device profiles are atomic, bounded, separate and preserve prior data after corruption', async () => {
  await mkdir(scratchPath('input-tests'), { recursive: true });
  const dir = await mkdtemp(scratchPath('input-tests/profiles-')),
    store = new MicrophoneProfiles(dir),
    p = microphoneDefaults(key);
  await store.save(p);
  await store.save({ ...p, key: 'b'.repeat(64), sensitivity: 3 });
  assert.equal((await store.read()).length, 2);
  await assert.rejects(store.save({ ...p, noiseFloor: 1 }));
  await writeFile(join(dir, 'microphone.json'), 'broken');
  await assert.rejects(store.save(p));
  assert.equal(await readFile(join(dir, 'microphone.json'), 'utf8'), 'broken');
});
test('T199: manual reconnection policy has finite timing constants and no retry timer in control engine', () => {
  assert.deepEqual(inputTiming, {
    cameraFreshMs: 300,
    microphoneFreshMs: 150,
    returnMs: 500,
    recoverMs: 250,
  });
  const m = new InputTransitions();
  near(m.frame('a', null, 0.2, 9999), 0.2);
  assert.equal(m.phase(9999), 'idle');
});
test('T200: combined source loss, fallback, recovery and locked expression retain valid bounds on all routes', async () => {
  for (const route of ['parts', 'single-image', 'split-image']) {
    const p = await load(route),
      c = new ExpressionController(),
      before = serializeProject(p);
    c.setProject(p);
    c.recoveryEnabled = true;
    for (let i = 0; i < 100; i++) {
      const t = i * 50;
      if (i < 15 || i > 70)
        c.input('camera', new Map(p.parameters.map((v) => [v.id, v.max])), t, i);
      if (i < 30 || i > 50)
        c.input(
          'microphone',
          new Map(p.parameters.filter((v) => v.previewKey === 'mouth').map((v) => [v.id, v.max])),
          t,
          i,
        );
      const f = c.frame(t);
      for (const param of p.parameters)
        assert.ok(f.values.get(param.id)! >= param.min && f.values.get(param.id)! <= param.max);
    }
    assert.equal(serializeProject(p), before);
  }
});
test('T198: reconnect waits for old process exit and concurrent starts admit only the latest request', async () => {
  await mkdir(scratchPath('input-tests'), { recursive: true });
  const dir = await mkdtemp(scratchPath('input-tests/child-')),
    marker = join(dir, 'closed');
  const code = `process.stdout.write('{"ready":true}\\n');process.stdin.on('data',()=>{setTimeout(()=>{require('node:fs').writeFileSync(${JSON.stringify(marker)},'closed');process.exit(0);},120)});`;
  const tracker = new CameraTracker(process.execPath, ['-e', code, '--'], process.env);
  try {
    assert.equal(await tracker.begin(), true);
    const stopping = tracker.stop();
    assert.equal(await tracker.begin(), true);
    assert.equal(await readFile(marker, 'utf8'), 'closed');
    await stopping;
    const starts = await Promise.all([tracker.begin(), tracker.begin()]);
    assert.deepEqual(starts, [false, true]);
  } finally {
    await tracker.stop();
  }
});

test('T196: scheduler hitch drains pending callbacks once while genuine callback loss still times out', () => {
  const w = new InputWatchdog(0);
  assert.equal(w.expired(100, 0), false);
  assert.equal(w.expired(2000, 0), false);
  assert.equal(w.expired(2100, 0), false);
  assert.equal(w.expired(2200, 2150), false);
  assert.equal(w.expired(2300, 2150), false);
  for (let now = 2400; now <= 3600; now += 100) assert.equal(w.expired(now, 2150), false);
  assert.equal(w.expired(3700, 2150), true);
  const slow = new InputWatchdog(0);
  assert.equal(slow.expired(2000, 0), false);
  assert.equal(slow.expired(3000, 0), true);
});
