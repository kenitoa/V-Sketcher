import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { OBSClient } from '../tools/obs-client.mjs';
const work = resolve(process.argv[2]),
  out = resolve(process.argv[3]);
assert.ok(!existsSync(out), 'E_3D_OUTPUT_EXISTS');
mkdirSync(out, { recursive: true });
const load = (p) => JSON.parse(readFileSync(p, 'utf8')),
  hash = (b) => createHash('sha256').update(b).digest('hex'),
  pause = (ms) => new Promise((r) => setTimeout(r, ms));
const state = load('.local/phase27-target-state.json'),
  target = join(work, 'obs'),
  source = join(state.directory, 'obs');
cpSync(source, target, { recursive: true, force: false, errorOnExist: true });
const executable = join(target, 'bin/64bit/obs64.exe');
assert.equal(
  hash(readFileSync(executable)),
  hash(readFileSync(join(source, 'bin/64bit/obs64.exe'))),
);
const secret = load(join(state.directory, 'secret.json')),
  connection = load(join(work, 'connection.json'));
const child = spawn(executable, ['--portable', '--disable-updater', '--minimize-to-tray'], {
  cwd: join(target, 'bin/64bit'),
  windowsHide: true,
  stdio: 'ignore',
});
let obs,
  stage = 'connect';
try {
  for (let n = 0; n < 90; n++) {
    try {
      obs = await OBSClient.connect(secret);
      break;
    } catch {
      if (child.exitCode !== null) throw Error('E_3D_OBS_EXIT');
      await pause(500);
    }
  }
  assert.ok(obs, 'E_3D_OBS_CONNECT');
  for (let n = 0; ; n++) {
    try {
      assert.equal((await obs.request('GetVersion')).obsVersion, '33.0.1');
      assert.equal((await obs.request('GetStreamStatus')).outputActive, false);
      assert.equal((await obs.request('GetRecordStatus')).outputActive, false);
      break;
    } catch (e) {
      if (e.message !== 'E_OBS_REQUEST_207' || n >= 59) throw e;
      await pause(500);
    }
  }
  assert.ok(Number.isSafeInteger(secret.port));
  const ownership = spawnSync(
    'powershell.exe',
    [
      '-NoProfile',
      '-Command',
      `(Get-NetTCPConnection -State Listen -LocalPort ${secret.port}).OwningProcess | Select-Object -Unique`,
    ],
    { encoding: 'utf8', windowsHide: true, timeout: 15000 },
  );
  assert.equal(Number(ownership.stdout.trim()), child.pid, 'E_3D_OBS_OWNER');
  stage = 'source';
  const scene = 'Phase31 local 3D ' + Date.now(),
    input = scene + ' model';
  await obs.request('CreateScene', { sceneName: scene });
  await obs.request('SetCurrentProgramScene', { sceneName: scene });
  await obs.request('CreateInput', {
    sceneName: scene,
    inputName: input,
    inputKind: 'browser_source',
    inputSettings: {
      url: connection.outputURL,
      width: 1920,
      height: 1080,
      fps: 30,
      reroute_audio: false,
    },
    sceneItemEnabled: true,
  });
  await pause(1800);
  const samples = [];
  async function shot(name) {
    const bytes = await obs.screenshot(input);
    writeFileSync(join(out, name + '.png'), bytes);
    samples.push({ name, sha256: hash(bytes) });
  }
  await shot('obs-3d-neutral');
  writeFileSync(
    join(work, 'obs-ready.json'),
    JSON.stringify({
      ready: true,
      ownedOBS: true,
      streamingStarted: false,
      recordingStarted: false,
    }),
  );
  stage = 'wait-user';
  if (process.argv.includes('--start-live')) {
    await pause(5000);
    const response = await fetch(connection.url.replace(/index$/, 'api/live-start'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    });
    assert.ok(response.ok, 'E_3D_LIVE_START');
  }
  const end = Date.now() + 300000;
  let liveBegan = false,
    next = 6;
  while (Date.now() < end) {
    const s = load(join(work, 'live-state.json'));
    if (s.live) {
      liveBegan = true;
      stage = 'live-capture';
      const elapsed = s.pose?.seconds ?? 0;
      if (elapsed >= next) {
        await shot('obs-3d-live-' + next);
        next += 8;
      }
    }
    if (liveBegan && s.summary && !s.live) break;
    await pause(250);
  }
  const result = load(join(work, 'live-state.json')).summary;
  assert.ok(result, 'E_3D_LIVE_NOT_STARTED');
  const unique = new Set(samples.map((v) => v.sha256)).size;
  const faceBroadcastPassed =
    result.passed === true &&
    result.maximumRMS > 0.005 &&
    result.controlRanges.yaw[1] - result.controlRanges.yaw[0] > 0.12 &&
    unique >= 3 &&
    samples.length >= 4;
  const passed = faceBroadcastPassed && result.bodyMotionAccepted === true;
  assert.equal((await obs.request('GetStreamStatus')).outputActive, false);
  assert.equal((await obs.request('GetRecordStatus')).outputActive, false);
  writeFileSync(
    join(out, 'obs-live.json'),
    JSON.stringify(
      {
        passed,
        faceBroadcastPassed,
        bodyMotionAccepted: result.bodyMotionAccepted === true,
        obsVersion: '33.0.1',
        source: 'actual WebGL 3D model browser source',
        samples,
        uniqueImages: unique,
        trackingBackend:
          'DirectShow index 0 + pinned face and pose models; browser identity not compared',
        live: result,
        ownedOBS: true,
        our3DPrototypeOnly: true,
        sourceDimensions: [1920, 1080],
        streamingStarted: false,
        recordingStarted: false,
        rawCameraFramesStored: false,
        rawMicrophonePCMStored: false,
        actualUserVisualAttestation: 'PENDING',
        releasePerformanceAcceptance: false,
      },
      null,
      2,
    ) + '\n',
  );
  console.log(
    passed ? 'Actual 3D tracking and isolated OBS response passed.' : 'E_3D_LIVE_OBS_ACCEPTANCE',
  );
  if (!passed) process.exitCode = 1;
} catch (e) {
  writeFileSync(
    join(out, 'failure.json'),
    JSON.stringify(
      {
        passed: false,
        stage,
        code: e.message.match(/E_[A-Z0-9_]+/)?.[0] ?? 'E_3D_OBS',
        rawCameraFramesStored: false,
        rawMicrophonePCMStored: false,
      },
      null,
      2,
    ) + '\n',
  );
  console.error('E_3D_OBS_TEST');
  process.exitCode = 1;
} finally {
  obs?.close();
  if (child.exitCode === null) child.kill();
}
