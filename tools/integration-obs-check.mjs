import { spawn } from 'node:child_process';
import { resolve, join } from 'node:path';
import { readFileSync, writeFileSync, mkdirSync, existsSync, renameSync } from 'node:fs';
import { randomUUID, createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { electronPath } from '../scripts/common.mjs';
import { OBSClient } from '../tools/obs-client.mjs';
const out = resolve(process.argv[2]),
  work = resolve('.local/phase27-obs-app-' + Date.now()),
  bridge = join(work, 'bridge');
mkdirSync(out, { recursive: true });
mkdirSync(bridge, { recursive: true });
const env = { ...process.env };
delete env.ELECTRON_RUN_AS_NODE;
const child = spawn(
  electronPath(),
  [
    resolve('tools/integration-obs-main.cjs'),
    '--broadcast-only=true',
    '--profile-dir=' + join(work, 'profile'),
    '--self-check-report=' + join(out, 'app-report.json'),
    '--broadcast-evidence=' + join(work, 'broadcast'),
    '--broadcast-obs-bridge=' + bridge,
  ],
  { env, windowsHide: true, stdio: 'ignore' },
);
let obs;
const pause = (ms) => new Promise((r) => setTimeout(r, ms)),
  load = (p) => JSON.parse(readFileSync(p)),
  wait = async (p, accept = () => true) => {
    const end = Date.now() + 600000;
    while (Date.now() < end) {
      if (child.exitCode !== null) throw Error('E_APP_EXIT');
      try {
        if (existsSync(p)) {
          const v = load(p);
          if (accept(v)) return v;
        }
      } catch {}
      await pause(100);
    }
    throw Error('E_OBS_TIMEOUT');
  };
let stage = 'ready';
const routes = [];
try {
  await wait(join(bridge, 'ready.json'));
  const target = load('.local/phase27-target-state.json');
  obs = await OBSClient.connect(load(join(target.directory, 'secret.json')));
  const version = await obs.request('GetVersion');
  assert.equal(version.obsVersion, '33.0.1');
  assert.equal((await obs.request('GetStreamStatus')).outputActive, false);
  assert.equal((await obs.request('GetRecordStatus')).outputActive, false);
  const scene = 'Phase27 ' + Date.now(),
    source = scene + ' avatar';
  await obs.request('CreateScene', { sceneName: scene });
  await obs.request('SetCurrentProgramScene', { sceneName: scene });
  const connection = load(join(bridge, 'connection.json'));
  await obs.request('CreateInput', {
    sceneName: scene,
    inputName: source,
    inputKind: 'browser_source',
    inputSettings: {
      url: connection.url,
      width: 1920,
      height: 1080,
      fps: 30,
      reroute_audio: false,
    },
    sceneItemEnabled: true,
  });
  const command = async (action, value) => {
    const id = randomUUID();
    writeFileSync(join(bridge, 'pending.json'), JSON.stringify({ id, action, value }));
    for (let attempt = 0; ; attempt++) {
      try {
        renameSync(join(bridge, 'pending.json'), join(bridge, 'command.json'));
        break;
      } catch (error) {
        if (error.code !== 'EPERM' || attempt >= 40) throw error;
        await pause(25);
      }
    }
    const reply = await wait(join(bridge, 'reply-' + id + '.json'));
    assert.ok(reply.ok);
    return reply.result;
  };
  for (const route of ['parts', 'single-image', 'split-image']) {
    stage = 'prepare-' + route;
    const id = randomUUID();
    writeFileSync(join(bridge, 'route-request.json'), JSON.stringify({ id, route }));
    assert.ok((await wait(join(bridge, 'route-reply.json'), (r) => r.id === id)).passed);
    await pause(1500);
    const images = [];
    for (const state of ['neutral', 'expression', 'motion']) {
      stage = route + '-' + state;
      await command('step', state);
      await pause(700);
      const png = await obs.screenshot(source),
        name = route + '-' + state + '.png';
      writeFileSync(join(out, name), png);
      images.push({ state, file: name, sha256: createHash('sha256').update(png).digest('hex') });
    }
    assert.equal(new Set(images.map((v) => v.sha256)).size, 3);
    routes.push({
      route,
      passed: true,
      images,
      input: 'example playback; physical devices NOT_RUN',
    });
    console.log('Actual OBS received ' + route);
  }
  const result = {
    passed: true,
    obsVersion: version.obsVersion,
    obsWebSocketVersion: version.obsWebSocketVersion,
    sourceType: 'browser_source',
    dimensions: [1920, 1080],
    routes,
    physicalDevicesOpened: false,
    streamingStarted: false,
    recordingStarted: false,
    existingUserScenesModified: false,
    m0: 'HOLD',
    scope: 'actual OBS screenshots of three new route preparations; separate from lifecycle suites',
  };
  writeFileSync(join(out, 'obs-run.json'), JSON.stringify(result, null, 2));
  writeFileSync(join(bridge, 'result.json'), JSON.stringify(result));
  await command('quit');
  await new Promise((r, j) => {
    child.on('exit', (c) => (c === 0 ? r() : j(Error('E_APP_EXIT'))));
    setTimeout(() => j(Error('E_APP_STOP_TIMEOUT')), 30000).unref();
  });
} catch (e) {
  writeFileSync(
    join(out, 'failure.json'),
    JSON.stringify({
      passed: false,
      code: e.message.match(/E_[A-Z_]+/)?.[0] ?? 'E_OBS_ASSERTION',
      routes,
      stage,
      systemCode: typeof e.code === 'string' && /^[A-Z_]+$/.test(e.code) ? e.code : null,
    }),
  );
  child.kill();
  console.error('E_PHASE27_OBS');
  process.exitCode = 1;
} finally {
  obs?.close();
}
