import { readFileSync, writeFileSync, mkdirSync, existsSync, renameSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { OBSClient } from './obs-client.mjs';
const arg = (n) => process.argv.find((v) => v.startsWith(`--${n}=`))?.slice(n.length + 3);
const bridge = resolve(arg('bridge')),
  secret = resolve(arg('secret')),
  out = resolve(arg('output-dir'));
mkdirSync(out, { recursive: true });
assert.ok(!existsSync(join(out, 'obs-run.json')));
const pause = (ms) => new Promise((r) => setTimeout(r, ms));
async function waitFile(file, timeout = 60000) {
  const end = Date.now() + timeout;
  while (Date.now() < end) {
    try {
      if (existsSync(file)) return JSON.parse(readFileSync(file));
    } catch {
      /* writer has not completed this isolated response yet */
    }
    await pause(100);
  }
  throw new Error('E_OBS_APP_TIMEOUT');
}
async function command(action, value) {
  const id = randomUUID();
  writeFileSync(join(bridge, 'command.pending'), JSON.stringify({ id, action, value }));
  renameSync(join(bridge, 'command.pending'), join(bridge, 'command.json'));
  const reply = await waitFile(join(bridge, 'reply-' + id + '.json'));
  assert.equal(reply.ok, true, reply.code ?? 'E_OBS_APP_COMMAND');
  return reply.result;
}
const python = resolve('.venv-product/Scripts/python.exe');
function pixels(...args) {
  const r = spawnSync(python, ['scripts/broadcast-pixels.py', ...args], {
    encoding: 'utf8',
    windowsHide: true,
  });
  assert.equal(r.status, 0, 'E_OBS_PIXEL_TOOL');
  return JSON.parse(r.stdout);
}
await waitFile(join(bridge, 'ready.json'), 300000);
const obs = await OBSClient.connect(JSON.parse(readFileSync(secret)));
const version = await obs.request('GetVersion');
assert.equal(version.obsVersion, '33.0.1');
assert.equal(version.obsWebSocketVersion, '5.7.6');
assert.equal((await obs.request('GetStreamStatus')).outputActive, false);
assert.equal((await obs.request('GetRecordStatus')).outputActive, false);
const runId = Date.now(),
  scene = '2DSketcher Phase23 ' + runId,
  source = '2DSketcher Avatar ' + runId,
  background = '2DSketcher Alpha Background ' + runId;
const saved = [];
async function shot(label, name = source) {
  const file = join(out, label + '.png');
  writeFileSync(file, await obs.screenshot(name));
  const m = pixels(file);
  saved.push({ label, ...m });
  return { file, ...m };
}
async function visible(label, width = 1920) {
  for (let i = 0; i < 25; i++) {
    const file = join(out, label + '.png');
    writeFileSync(file, await obs.screenshot(source));
    const m = pixels(file);
    if (m.visiblePixels > 10000 && m.width === width) {
      saved.push({ label, ...m });
      return { file, ...m };
    }
    await pause(300);
  }
  throw new Error('E_OBS_AVATAR_NOT_VISIBLE');
}
try {
  await command('configure', {
    width: 1920,
    height: 1080,
    fps: 30,
    scale: 1,
    x: 0,
    y: 0,
    crop: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  await obs.request('SetVideoSettings', {
    baseWidth: 1920,
    baseHeight: 1080,
    outputWidth: 1920,
    outputHeight: 1080,
    fpsNumerator: 30,
    fpsDenominator: 1,
  });
  await obs.request('CreateScene', { sceneName: scene });
  await obs.request('SetCurrentProgramScene', { sceneName: scene });
  await obs.request('CreateInput', {
    sceneName: scene,
    inputName: background,
    inputKind: 'color_source_v3',
    inputSettings: { width: 1920, height: 1080, color: 0xff202020 },
    sceneItemEnabled: true,
  });
  const connection = JSON.parse(readFileSync(join(bridge, 'connection.json')));
  assert.match(connection.url, /^http:\/\/127\.0\.0\.1:\d+\/b\/[a-f0-9]{64}\/$/);
  await obs.request('CreateInput', {
    sceneName: scene,
    inputName: source,
    inputKind: 'browser_source',
    inputSettings: {
      url: connection.url,
      width: 1920,
      height: 1080,
      fps: 30,
      is_local_file: false,
      shutdown: false,
      restart_when_active: false,
      reroute_audio: false,
      css: 'body { background-color: rgba(0,0,0,0); margin:0; overflow:hidden; }',
    },
    sceneItemEnabled: true,
  });
  await command('step', 'neutral');
  const neutral = await visible('obs-neutral');
  assert.ok(neutral.transparentPixels > 10000 && neutral.partialAlphaPixels > 0);
  const composites = [];
  for (const [label, level, color] of [
    ['dark', 32, 0xff202020],
    ['light', 240, 0xfff0f0f0],
  ]) {
    await obs.request('SetInputSettings', {
      inputName: background,
      inputSettings: { color },
      overlay: true,
    });
    await pause(400);
    const image = await shot('obs-alpha-' + label, scene);
    const check = pixels('composite', neutral.file, image.file, String(level));
    composites.push({ background: label, ...check });
    assert.equal(check.passed, true, 'E_OBS_ALPHA_COMPOSITE');
  }
  await command('step', 'motion');
  const motionA = await visible('obs-motion-a');
  await pause(500);
  const motionB = await visible('obs-motion-b');
  assert.notEqual(motionA.pixelSha256, motionB.pixelSha256);
  await command('step', 'neutral');
  const baseline = await visible('obs-base');
  await command('step', 'expression');
  const expression = await visible('obs-expression');
  assert.notEqual(expression.pixelSha256, baseline.pixelSha256);
  await command('step', 'neutral');
  const hidden = await command('key', 'F9');
  assert.equal(hidden.hidden, true);
  assert.equal(hidden.lastAction, 'hide');
  await pause(250);
  assert.equal((await shot('obs-key-hidden')).visiblePixels, 0);
  const shown = await command('key', 'F9');
  assert.equal(shown.hidden, false);
  await visible('obs-key-shown');
  const keyExpression = await command('key', '1');
  assert.equal(keyExpression.lastAction, 'expression-1');
  await visible('obs-key-expression');
  await command('key', 'F10');
  await command('step', 'neutral');
  const before = await visible('obs-before-edit'),
    state = await command('step', 'edit');
  const after = await visible('obs-work-edit');
  assert.equal(before.pixelSha256, after.pixelSha256);
  const save = await command('step', 'save');
  assert.equal(save.workRevision, save.savedRevision);
  assert.notEqual(save.workRevision, save.runRevision);
  const applied = await command('step', 'apply');
  assert.notEqual(applied.runId, state.runId);
  await visible('obs-applied');
  await command('hold', true);
  const stalledSave = await command('step', 'save');
  assert.equal(stalledSave.active, true);
  await pause(1500);
  assert.equal((await shot('obs-publisher-stale')).visiblePixels, 0);
  await command('hold', false);
  await visible('obs-publisher-restored');
  await command('step', 'input-loss');
  const input = await visible('obs-input-active');
  await pause(1400);
  const fallback = await visible('obs-input-fallback');
  assert.notEqual(input.pixelSha256, fallback.pixelSha256);
  await command('step', 'neutral');
  const configured = await command('configure', {
    width: 1280,
    height: 720,
    fps: 15,
    scale: 0.75,
    x: 0.1,
    y: 0,
    crop: { left: 0, right: 0, top: 0, bottom: 0.1 },
  });
  await obs.request('SetInputSettings', {
    inputName: source,
    inputSettings: { width: 1280, height: 720, fps: 15 },
    overlay: true,
  });
  const resized = await visible('obs-720p', 1280);
  assert.equal(resized.width, 1280);
  assert.equal(resized.height, 720);
  await command('restore');
  await obs.request('SetInputSettings', {
    inputName: source,
    inputSettings: { width: 1920, height: 1080, fps: 30 },
    overlay: true,
  });
  await visible('obs-settings-restored');
  await command('restart');
  await visible('obs-output-reconnected');
  await command('off');
  await pause(200);
  assert.equal((await shot('obs-output-off')).visiblePixels, 0);
  await command('on');
  await visible('obs-output-resumed');
  await command('rotate');
  await pause(1000);
  assert.equal((await shot('obs-revoked-address')).visiblePixels, 0);
  const renewed = JSON.parse(readFileSync(join(bridge, 'connection.json')));
  await obs.request('SetInputSettings', {
    inputName: source,
    inputSettings: { url: renewed.url },
    overlay: true,
  });
  await visible('obs-new-address');
  const stats = await obs.request('GetStats');
  assert.equal((await obs.request('GetStreamStatus')).outputActive, false);
  assert.equal((await obs.request('GetRecordStatus')).outputActive, false);
  const result = {
    passed: true,
    created: new Date().toISOString(),
    obsVersion: version.obsVersion,
    obsWebSocketVersion: version.obsWebSocketVersion,
    rpcVersion: version.rpcVersion,
    method: 'AUTOMATED_OBS_WEBSOCKET_SOURCE_AND_SCENE_PNG',
    target: 'isolated existing portable OBS on same PC',
    streamingStarted: false,
    recordingStarted: false,
    existingUserScenesModified: false,
    sourceType: 'browser_source',
    sourceDimensions: [1920, 1080],
    settingsVersionTested: configured.settingsVersion,
    alphaComposites: composites,
    motion: true,
    expression: true,
    shortcut: true,
    shortcutScope:
      'App-focused Electron keyboard injection; physical keys and outside-app OS delivery NOT_RUN',
    workingEditIsolation: true,
    saveDuringBroadcast: true,
    executionChange: true,
    publisherFailureTransparent: true,
    publisherRecovery: true,
    syntheticInputLossFallback: true,
    settingsRestore: true,
    outputRestart: true,
    outputOffOn: true,
    addressRotationReconnect: true,
    physicalDevicesOpened: false,
    rawCameraFramesSaved: false,
    rawAudioSaved: false,
    m0: 'HOLD',
    performanceAcceptance: false,
    observedRenderFrames: stats.renderTotalFrames,
    images: saved,
  };
  writeFileSync(join(out, 'obs-run.json'), JSON.stringify(result, null, 2) + '\n');
  writeFileSync(join(bridge, 'result.json'), JSON.stringify(result));
  await command('quit');
  console.log('Actual OBS alpha, motion, expression, app keys, live edits and recovery passed.');
} catch (e) {
  writeFileSync(
    join(out, 'obs-failed.json'),
    JSON.stringify(
      {
        passed: false,
        code: e.message.match(/E_[A-Z_]+/)?.[0] ?? 'E_OBS_ASSERTION',
        images: saved,
      },
      null,
      2,
    ) + '\n',
  );
  throw e;
} finally {
  obs.close();
}
