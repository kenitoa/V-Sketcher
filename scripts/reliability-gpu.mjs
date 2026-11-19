import { build } from 'vite';
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, writeFileSync, cpSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { electronPath } from './common.mjs';
import { createTempArea } from '../tools/temp-area.cjs';
const tempArea = createTempArea('gpu-check');
process.on('exit', () => tempArea.dispose());
const output = resolve(process.argv[2]),
  work = tempArea.path(),
  content = join(work, 'content');
mkdirSync(output, { recursive: true });
assert.ok(!existsSync(join(output, 'gpu.json')));
await build({
  configFile: false,
  root: resolve('.'),
  publicDir: false,
  base: './',
  logLevel: 'silent',
  build: {
    outDir: content,
    emptyOutDir: false,
    rolldownOptions: { input: resolve('tools/reliability-gpu.html') },
  },
});
const require = createRequire(import.meta.url),
  { projectToPreview } = require(resolve('.local/test-js/packages/project-model/preview'));
const p = JSON.parse(readFileSync('assets/product/preview-project.json', 'utf8'));
writeFileSync(
  join(content, 'scene.json'),
  JSON.stringify(projectToPreview(p, (a) => 'assets/preview/' + a.fingerprint.sha256 + '.png')),
);
cpSync(resolve('assets/product/preview'), join(content, 'assets/preview'), { recursive: true });
const env = { ...process.env };
delete env.ELECTRON_RUN_AS_NODE;
const result = spawnSync(
  electronPath(),
  [
    resolve('tools/reliability-gpu-main.cjs'),
    '--content=' + content,
    '--profile=' + join(work, 'profile'),
    '--report=' + join(output, 'gpu.json'),
  ],
  { env, windowsHide: true, stdio: 'ignore', timeout: 180000 },
);
assert.equal(result.status, 0, 'E_RELIABILITY_GPU');
assert.ok(JSON.parse(readFileSync(join(output, 'gpu.json'))).passed);
console.log(
  'Actual product GPU renderer: 12 allocation/disposal cycles, 720p/1080p and bounded load measured; release gate separate.',
);
