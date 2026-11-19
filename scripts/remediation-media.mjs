import { build } from 'vite';
import { mkdirSync, copyFileSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { electronPath } from './common.mjs';
const out = resolve(process.argv[2]);
assert.ok(!existsSync(out), 'E_REMEDIATION_EXISTS');
mkdirSync(out, { recursive: true });
const work = resolve('.local/remediation-media-' + Date.now()),
  content = join(work, 'content');
mkdirSync(content, { recursive: true });
await build({
  configFile: false,
  root: resolve('.'),
  publicDir: false,
  base: './',
  logLevel: 'silent',
  build: {
    outDir: content,
    emptyOutDir: false,
    rolldownOptions: { input: resolve('tools/remediation-media.html') },
  },
});
copyFileSync(join(content, 'tools/remediation-media.html'), join(content, 'index.html'));
copyFileSync('assets/product/preview-project.json', join(content, 'project.json'));
copyFileSync('tools/fixtures/camera/astronaut.png', join(content, 'fixture.png'));
mkdirSync(join(content, 'assets'), { recursive: true });
copyFileSync(
  'dist/renderer/assets/audio-level-worklet.js',
  join(content, 'assets/audio-level-worklet.js'),
);
const env = { ...process.env };
delete env.ELECTRON_RUN_AS_NODE;
const cycles = process.argv.includes('--source-probe') ? 6 : 60;
const result = spawnSync(
  electronPath(),
  [
    'tools/remediation-media-main.cjs',
    '--content=' + content,
    '--profile=' + join(work, 'profile'),
    '--report=' + join(out, 'media.json'),
    '--cycles=' + cycles,
  ],
  { env, windowsHide: true, stdio: 'ignore', timeout: 900000 },
);
assert.equal(result.status, 0, 'E_REMEDIATION_MEDIA');
const report = JSON.parse(readFileSync(join(out, 'media.json')));
assert.equal(report.passed, true);
assert.equal(report.physicalDeviceCycles, cycles);
writeFileSync(join(out, 'fixture-source.json'), readFileSync('tools/fixtures/camera/source.json'));
console.log(
  'Product media classes: positive controls and ' +
    cycles +
    ' real device open/close cycles passed.',
);
