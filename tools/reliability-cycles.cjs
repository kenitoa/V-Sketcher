const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const { resolve, join } = require('node:path');
const { randomUUID } = require('node:crypto');
const { performance, monitorEventLoopDelay } = require('node:perf_hooks');
const { ProjectSession } = require(resolve('.local/test-js/packages/project-session'));
const { readProject } = require(resolve('.local/test-js/packages/project-model'));
const { BroadcastServer } = require(resolve('.local/test-js/apps/desktop/broadcast-server'));
const { NEUTRAL } = require(resolve('.local/test-js/packages/scene-core'));
const { safeEvent, DiagnosticLog } = require(resolve('.local/test-js/packages/diagnostics'));
const { diagnosticData } = require(resolve('.local/test-js/packages/settings'));
const out = resolve(process.argv[2]),
  work = resolve('.local/reliability-cycles-' + Date.now());
const privateCanary = 'PRIVATE-CANARY-28',
  secretCanary = 'SECRET-CANARY-28',
  rawCanary = 'FRAME-PCM-CANARY-28';
async function main() {
  await fs.mkdir(out, { recursive: true });
  await fs.mkdir(work, { recursive: true });
  const p = readProject(await fs.readFile('assets/product/preview-project.json', 'utf8')).project,
    bytes = new Map();
  for (const a of p.assets)
    bytes.set(
      a.id,
      await fs.readFile(join('assets/product/preview', a.fingerprint.sha256 + '.png')),
    );
  const s = new ProjectSession({
    dataDir: join(work, 'session'),
    dialogs: {
      unsaved: async () => 'discard',
      saveProject: async () => null,
      openProject: async () => null,
      relinkImage: async () => null,
    },
    bundled: p,
    bundledBytes: bytes,
    autoTimers: false,
  });
  await s.init();
  const server = new BroadcastServer(join(work, 'machine'), resolve('dist/renderer'));
  await server.init();
  const samples = [],
    timer = setInterval(
      () =>
        samples.push({
          at: performance.now(),
          rss: process.memoryUsage().rss,
          heap: process.memoryUsage().heapUsed,
          external: process.memoryUsage().external,
        }),
      1000,
    );
  const delay = monitorEventLoopDelay({ resolution: 20 });
  delay.enable();
  const durations = [],
    started = performance.now();
  let cycles = 0,
    privacyRequests = 0;
  try {
    for (let i = 0; i < 60; i++) {
      const at = performance.now();
      await s.newProject(privateCanary + '-' + i, ['parts', 'single-image', 'split-image'][i % 3]);
      await s.dispatch({ type: 'sample' });
      const lease = await s.prepareRuntime({
          requestId: randomUUID(),
          sessionId: s.view().sessionId,
          revision: s.view().project.revision,
          mode: 'manual',
        }),
        source = await s.broadcastSnapshot(lease.requestId);
      assert.ok(!JSON.stringify(source.scene).includes(privateCanary));
      assert.equal(source.scene.model, undefined);
      await server.start(source);
      server.publish({ sourceId: source.id, seq: 1, parameters: { ...NEUTRAL }, hidden: false });
      const url = server.url();
      const first = await (await fetch(url + 'state')).json();
      assert.equal(first.frame.seq, 1);
      assert.ok(!JSON.stringify(first).includes(privateCanary));
      server.publish({
        sourceId: source.id,
        seq: 2,
        parameters: { ...NEUTRAL },
        hidden: false,
        cameraFrame: rawCanary,
        microphonePCM: rawCanary,
      });
      assert.equal((await (await fetch(url + 'state')).json()).frame.seq, 1);
      for (const path of ['../../private', '%2e%2e/private', 'state?secret=' + secretCanary]) {
        const response = await fetch(url + path);
        assert.ok(response.status === 403 || response.status === 404);
        assert.ok(!(await response.text()).includes(secretCanary));
        privacyRequests++;
      }
      await server.configure({
        ...server.view().settings,
        width: i % 2 ? 1920 : 1280,
        height: i % 2 ? 1080 : 720,
        fps: i % 2 ? 30 : 15,
      });
      await server.restore();
      if (i % 10 === 0) {
        await server.rotate();
        assert.equal((await fetch(url + 'state')).status, 403);
      }
      server.stop();
      s.stopRuntime(lease.requestId);
      assert.equal(s.runtimeBusy(), false);
      const resource = [...source.assets.keys()][0];
      const parts = resource.split('/');
      assert.equal(await s.resource('run-' + lease.requestId, parts.at(-1)), null);
      await server.close();
      assert.equal(server.url(), null);
      await s.dispatch({ type: 'close' });
      assert.equal(s.view().project, null);
      durations.push(performance.now() - at);
      cycles++;
    }
    const poison = {
      message: privateCanary,
      path: privateCanary,
      token: secretCanary,
      cameraFrame: rawCanary,
      pcm: rawCanary,
      code: 'E_FAILED',
      requestId: randomUUID(),
      version: '0.21.0',
      durationMs: 1,
    };
    const log = new DiagnosticLog(join(work, 'logs'));
    log.write('app-start', poison);
    for (let i = 0; i < 50; i++)
      log.write('worker-error', { ...poison, code: 'E_FAILED: ' + secretCanary, jobId: rawCanary });
    const raw = await fs.readFile(join(work, 'logs/events.jsonl'), 'utf8');
    for (const marker of [privateCanary, secretCanary, rawCanary]) assert.ok(!raw.includes(marker));
    const diag = diagnosticData(
      { ...poison, run: privateCanary, camera: 'open', microphone: 'open', fps: 30 },
      { app: '0.21.0' },
    );
    for (const marker of [privateCanary, secretCanary, rawCanary])
      assert.ok(!JSON.stringify(diag).includes(marker));
    assert.ok(!JSON.stringify(safeEvent(privateCanary, poison)).includes(privateCanary));
    durations.sort((a, b) => a - b);
    await fs.writeFile(
      join(out, 'cycles-privacy.json'),
      JSON.stringify(
        {
          passed: true,
          cycles,
          cycleScope:
            'Compiled product project/run/output host services, premium sample on three route labels; not three route preparation or GPU rendering',
          durationMs: performance.now() - started,
          cycleP95Ms: durations[Math.floor(durations.length * 0.95)],
          eventLoopP95Ms: delay.percentile(95) / 1e6,
          samples,
          samplingScope: 'This Node host-service test process only; not Electron/worker/OBS tree',
          privacy: {
            canaryLogChecks: true,
            diagnosticAllowlist: true,
            broadcastWhitelist: true,
            privateProjectNameExcluded: true,
            traversalAndQueryRequests: privacyRequests,
          },
          actualGPUVerified: false,
          physicalDevicesOpened: false,
          actualOBSVerified: false,
          performanceAcceptance: false,
          twoHourAcceptance: false,
          m0: 'HOLD',
        },
        null,
        2,
      ) + '\n',
    );
    console.log('60 real host-service lifecycle cycles and privacy canaries passed.');
  } finally {
    clearInterval(timer);
    delay.disable();
    await server.close();
    await s.shutdown();
  }
}
main().catch(async () => {
  await fs.mkdir(out, { recursive: true });
  await fs.writeFile(
    join(out, 'cycles-failed.json'),
    JSON.stringify({ passed: false, code: 'E_RELIABILITY_CYCLES' }) + '\n',
  );
  console.error('E_RELIABILITY_CYCLES');
  process.exitCode = 1;
});
