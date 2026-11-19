import { spawnSync } from 'node:child_process';
import {
  mkdirSync,
  writeFileSync,
  appendFileSync,
  readFileSync,
  readdirSync,
  copyFileSync,
} from 'node:fs';
import { resolve, join, relative, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { root } from './common.mjs';
const output = resolve(root, 'evidence/phase26'),
  log = resolve(root, '.local/phase26-check.log'),
  stamp = Date.now(),
  folders = {
    broadcast: resolve(root, '.local/smoke/broadcast26-' + stamp),
    image: resolve(root, '.local/smoke/file-output26-' + stamp),
    avatar: resolve(root, '.local/smoke/avatar-export26-' + stamp),
    settings: resolve(root, '.local/smoke/environment26-' + stamp),
  };
mkdirSync(output, { recursive: true });
writeFileSync(log, '');
const env = { ...process.env, PATH: dirname(process.execPath) + ';' + process.env.PATH };
delete env.ELECTRON_RUN_AS_NODE;
const hash = (b) => createHash('sha256').update(b).digest('hex'),
  load = (p) => JSON.parse(readFileSync(p, 'utf8')),
  sources = {};
function inventory(folder) {
  for (const item of readdirSync(folder, { withFileTypes: true })) {
    if (item.name === '__pycache__' || item.name.endsWith('.pyc')) continue;
    const path = join(folder, item.name);
    if (item.isDirectory()) inventory(path);
    else sources[relative(root, path).replaceAll('\\', '/')] = hash(readFileSync(path));
  }
}
for (const folder of ['apps', 'packages', 'worker', 'scripts', 'tools', 'tests', 'assets/product'])
  inventory(resolve(root, folder));
for (const name of [
  'package.json',
  'package-lock.json',
  'vite.config.mjs',
  'forge.config.cjs',
  'tsconfig.json',
  'tsconfig.build.json',
])
  sources[name] = hash(readFileSync(resolve(root, name)));
let combined = '';
const stages = [
  ['check', null],
  ['prior-full', 'scripts/smoke.mjs'],
  ['broadcast', 'scripts/broadcast-ui-check.mjs'],
  ['image', 'scripts/file-output-ui-check.mjs'],
  ['avatar', 'scripts/avatar-export-ui-check.mjs'],
  ['settings', 'scripts/environment-ui-check.mjs'],
];
for (const [stage, script] of stages) {
  writeFileSync(join(output, 'progress.json'), JSON.stringify({ stage, complete: false }) + '\n');
  const command = script ? process.execPath : (process.env.ComSpec ?? 'cmd.exe'),
    args = script
      ? [
          script,
          ...(stage in folders
            ? [(stage === 'settings' ? '--evidence-dir=' : '--output-dir=') + folders[stage]]
            : []),
        ]
      : ['/d', '/c', 'tools\\dev.cmd', 'run', 'check'];
  const result = spawnSync(command, args, {
    cwd: root,
    env,
    windowsHide: true,
    encoding: 'utf8',
    timeout: 1860000,
  });
  const text = (result.stdout ?? '') + (result.stderr ?? '');
  combined += text;
  appendFileSync(log, text);
  if (result.error || result.status !== 0)
    throw new Error('E_ENVIRONMENT_GATE: inspect .local/phase26-check.log');
}
const node = Number(combined.match(/\btests (\d+)/)?.[1]),
  python = Number(combined.match(/Ran (\d+) tests/)?.[1]);
assert.equal(node, 328);
assert.equal(python, 36);
const full = load(resolve(root, '.local/smoke/development/report.json'));
assert.ok(full.passed && full.workerStopped);
for (const key of [
  'runtimeChanges',
  'execution',
  'inputRecovery',
  'tracking',
  'expressions',
  'detail',
  'split',
  'corrections',
  'structure',
  'parts',
  'input',
  'projects',
  'editor',
  'motion',
])
  assert.ok(full[key].passed, key);
for (const key of [
  'runtimeChanges',
  'execution',
  'inputRecovery',
  'tracking',
  'expressions',
  'detail',
])
  assert.equal(full[key].routes.length, 3, key);
for (const name of readdirSync(resolve(root, '.local/smoke/development')))
  if (name.endsWith('.png'))
    copyFileSync(
      resolve(root, '.local/smoke/development', name),
      join(output, 'regression-' + name),
    );
copyFileSync(
  resolve(root, '.local/smoke/development/report.json'),
  join(output, 'development-run.json'),
);
const broadcast = load(join(folders.broadcast, 'report.json'));
assert.ok(broadcast.passed && broadcast.broadcast.routes.length === 3);
copyFileSync(
  join(folders.broadcast, 'report.json'),
  join(output, 'broadcast-development-run.json'),
);
copyFileSync(join(folders.broadcast, 'broadcast-ui.png'), join(output, 'broadcast-ui.png'));
for (const [kind, destination] of [
  ['image', 'development-images'],
  ['avatar', 'development-avatar'],
]) {
  const directory = join(output, destination);
  mkdirSync(directory, { recursive: true });
  for (const file of readdirSync(folders[kind]))
    if (/\.(png|inp)$/.test(file) || file === 'runner.json')
      copyFileSync(join(folders[kind], file), join(directory, file));
  copyFileSync(join(folders[kind], 'report.json'), join(output, kind + '-development-run.json'));
  if (kind === 'avatar')
    copyFileSync(join(folders[kind], 'report.json'), join(directory, 'report.json'));
  const tool =
    kind === 'image' ? 'scripts/file-output-pixels.py' : 'scripts/avatar-export-pixels.py';
  const result = spawnSync(
    resolve(root, '.venv-product/Scripts/python.exe'),
    [
      tool,
      '--report=' + join(output, kind + '-development-run.json'),
      '--images-dir=' + directory,
      '--output=' + join(output, kind + '-pixel-quality.json'),
    ],
    { cwd: root, encoding: 'utf8', windowsHide: true },
  );
  assert.equal(result.status, 0, 'E_' + kind.toUpperCase() + '_PIXELS');
}
const avatar = load(join(output, 'avatar-development-run.json')),
  image = load(join(output, 'image-development-run.json'));
assert.equal(avatar.avatarExport.files.length, 6);
assert.equal(avatar.avatarExport.images.length, 42);
assert.equal(image.fileOutput.images.length, 14);
assert.ok(
  avatar.avatarExport.resourcesReleased &&
    avatar.avatarExport.actualFileMoveReconnected &&
    avatar.avatarExport.deviceRequests === 0 &&
    avatar.avatarExport.programmaticConfirmationOnly &&
    !avatar.avatarExport.actualExternalRuntimeVerified,
);
const settings = load(join(folders.settings, 'report.json'));
assert.ok(
  settings.passed &&
    settings.settings.persistenceReopened &&
    settings.settings.defaultFolderFileExists &&
    settings.settings.diagnosticPrivacyChecked &&
    settings.settings.executionTracksReleased,
);
for (const file of [
  'report.json',
  'environment-ui.png',
  'environment-environment.png',
  'environment-privacy.png',
  'environment-performance.png',
  'environment-support.png',
  'minimal-diagnostic.json',
])
  copyFileSync(join(folders.settings, file), join(output, 'settings-' + file));
for (const [file, digest] of Object.entries(sources))
  assert.equal(hash(readFileSync(resolve(root, file))), digest, 'E_SOURCE_CHANGED: ' + file);
writeFileSync(
  join(output, 'verification.json'),
  JSON.stringify(
    {
      passed: true,
      created: new Date().toISOString(),
      appVersion: '0.21.0',
      projectSchema: '1.9',
      checkerVersion: '1.1.0',
      converterVersion: '0.3.0',
      newEnvironmentNodeGroups: 13,
      nodeTestGroups: node,
      pythonTestGroups: python,
      totalTestGroups: node + python,
      typecheck: true,
      ruff: true,
      generatedValidatorMatches: true,
      testBuild: true,
      previousFullRegression: true,
      broadcastRegression: true,
      imageRegression: true,
      settingsIntegration: true,
      actualINPFiles: 6,
      nativeReferenceImages: 42,
      independentSourcePixelQuality: true,
      physicalDevicesVerified: false,
      osGlobalKeysVerified: false,
      m0: 'HOLD',
      sourceSha256: sources,
    },
    null,
    2,
  ) + '\n',
);
writeFileSync(
  join(output, 'progress.json'),
  JSON.stringify({ stage: 'complete', complete: true }) + '\n',
);
console.log(
  'Environment gate passed: 328 Node + 36 Python; full regression, PNG/broadcast and six real INP outputs.',
);
