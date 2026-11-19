import { build } from 'vite';
import { mkdirSync, existsSync, readFileSync, writeFileSync, cpSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import { electronPath } from './common.mjs';
import { createTempArea } from '../tools/temp-area.cjs';
const out = resolve(process.argv[2]);
if (existsSync(out)) throw Error('E_BENCH_EXISTS');
mkdirSync(out, { recursive: true });
const tempArea = createTempArea('renderer-bench');
process.on('exit', () => tempArea.dispose());
const work = tempArea.path(),
  content = join(work, 'content');
await build({
  configFile: false,
  publicDir: false,
  base: './',
  logLevel: 'silent',
  resolve: {
    alias: {
      '@cleanup-before-renderer': resolve(
        '.local/cleanup-baseline-01/packages/avatar-renderer/index.ts',
      ),
    },
  },
  build: {
    outDir: content,
    emptyOutDir: false,
    rolldownOptions: { input: resolve('tools/cleanup-renderer-bench.html') },
  },
});
const require = createRequire(import.meta.url),
  { projectToPreview } = require(resolve('.local/test-js/packages/project-model/preview.js'));
const project = JSON.parse(readFileSync('assets/product/preview-project.json'));
writeFileSync(
  join(content, 'scene.json'),
  JSON.stringify(
    projectToPreview(project, (a) => 'assets/preview/' + a.fingerprint.sha256 + '.png'),
  ),
);
cpSync('assets/product/preview', join(content, 'assets/preview'), { recursive: true });
const rows = [],
  env = { ...process.env };
delete env.ELECTRON_RUN_AS_NODE;
for (const [i, variant] of ['before', 'after', 'after', 'before', 'before', 'after'].entries()) {
  const dir = join(out, 'run-' + (i + 1));
  mkdirSync(dir);
  const launched = spawnSync(
    electronPath(),
    [
      'tools/cleanup-renderer-main.cjs',
      '--content=' + content,
      '--output=' + dir,
      '--profile=' + join(work, 'profile-' + i),
      '--variant=' + variant,
      '--save-image=' + (i < 2),
    ],
    { env, windowsHide: true, stdio: 'ignore', timeout: 180000 },
  );
  if (launched.status !== 0) throw Error('E_BENCH_RUN');
  const row = JSON.parse(readFileSync(join(dir, 'result.json')));
  rows.push(row);
  console.log('Renderer comparison ' + (i + 1) + '/6: ' + variant);
}
const q = (a, p) => [...a].sort((x, y) => x - y)[Math.max(0, Math.ceil(p * a.length) - 1)],
  median = (a) => q(a, 0.5);
const summary = (variant) => {
  const group = rows.filter((r) => r.variant === variant);
  return {
    variant,
    medianLoadMs: median(group.map((r) => r.loadMs)),
    medianConstructionMs: median(group.map((r) => r.constructionMs)),
    medianReadyMs: median(group.map((r) => r.readyMs)),
    medianHitMs: median(group.map((r) => r.hitMs)),
    drawP95Ms: median(group.map((r) => q(r.drawMs, 0.95))),
    frameIntervalP95Ms: median(group.map((r) => q(r.intervalMs, 0.95))),
    medianCompletedFPS: median(group.map((r) => (r.completedFrames * 1000) / r.durationMs)),
    ownedAlphaBytes: group[0].ownedAlphaBytes,
    referencedDecodedRGBABytesEstimate: group[0].referencedDecodedRGBABytesEstimate,
    medianRendererWorkingSetKiB: median(
      group.map((r) =>
        r.processWorkingSets
          .filter((p) => p.type === 'Tab')
          .reduce((n, p) => n + p.workingSetKiB, 0),
      ),
    ),
    medianRendererPeakWorkingSetKiB: median(
      group.map((r) =>
        r.processWorkingSets
          .filter((p) => p.type === 'Tab')
          .reduce((total, p) => total + p.peakWorkingSetKiB, 0),
      ),
    ),
    maximumRendererPeakWorkingSetKiB: Math.max(
      ...group.map((r) =>
        r.processWorkingSets
          .filter((p) => p.type === 'Tab')
          .reduce((total, p) => total + p.peakWorkingSetKiB, 0),
      ),
    ),
  };
};
const before = summary('before'),
  after = summary('after');
const pixels = rows.every(
    (r) => JSON.stringify(r.posePixelHashes) === JSON.stringify(rows[0].posePixelHashes),
  ),
  picking = rows.every((r) => r.hitDigest === rows[0].hitDigest);
const noFrameRegression =
  after.drawP95Ms <= before.drawP95Ms * 1.05 + 0.1 &&
  after.medianCompletedFPS >= before.medianCompletedFPS * 0.99;
const noLoadRegression =
  after.medianLoadMs <= before.medianLoadMs * 1.05 + 2 &&
  after.medianReadyMs <= before.medianReadyMs * 1.05 + 2;
const noPickingRegression = after.medianHitMs <= before.medianHitMs * 1.05 + 1;
const noMemoryRegression =
  after.medianRendererWorkingSetKiB <= before.medianRendererWorkingSetKiB * 1.02 + 2048 &&
  after.maximumRendererPeakWorkingSetKiB <= before.maximumRendererPeakWorkingSetKiB * 1.02 + 2048;
const report = {
  passed:
    pixels &&
    picking &&
    noFrameRegression &&
    noLoadRegression &&
    noPickingRegression &&
    noMemoryRegression,
  before,
  after,
  pixelsIdentical: pixels,
  pickingIdentical: picking,
  noFrameRegression,
  noLoadRegression,
  noPickingRegression,
  noMemoryRegression,
  memorySamplePhase: 'active-renderer-before-disposal',
  timingWindow: 'GPU-completed 15-second draw loop; excludes PNG and diagnostic readback',
  alphaCacheVsPriorRGBAEstimateReduction:
    1 - after.ownedAlphaBytes / before.referencedDecodedRGBABytesEstimate,
  physicalDevicesOpened: false,
  actualOBS: false,
  releasePerformanceAcceptance: false,
  scope:
    'Six interleaved fresh-process premium-renderer runs; exact six-pose pixels and 3750 picking points across those poses. Includes constructor and ready timing. RSS includes caches/shared pages; decoded RGBA is an estimate. Device/OBS/2h acceptance is separate.',
};
writeFileSync(join(out, 'comparison.json'), JSON.stringify(report, null, 2) + '\n', { flag: 'wx' });
if (!report.passed) process.exitCode = 1;
