import { packageTestPath } from './common.mjs';
import assert from 'node:assert/strict';
import {
  mkdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  copyFileSync,
  readdirSync,
} from 'node:fs';
import { resolve, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { extractFile, listPackage } from '@electron/asar';
import { extractNew, inventory, removeOwned } from '../tools/portable-lifecycle.mjs';
const out = resolve(
  process.argv.find((v) => v.startsWith('--evidence-dir='))?.slice(15) ??
    '.local/usability-package-' + Date.now(),
);
mkdirSync(out, { recursive: true });
assert.ok(!existsSync(join(out, 'package-review.json')));
const version = JSON.parse(readFileSync('package.json')).version,
  target = packageTestPath();
mkdirSync(target, { recursive: true });
const oldZip = resolve('out/make/zip/win32/x64/2DSketcher-win32-x64-0.21.0.zip'),
  newZip = resolve('out/make/zip/win32/x64/2DSketcher-win32-x64-' + version + '.zip');
const old = await extractNew(oldZip, target, 'app-0.21.0'),
  fresh = await extractNew(newZip, target, 'app-' + version);
const userAssets = join(target, 'user-assets');
mkdirSync(userAssets);
const userAsset = join(userAssets, 'my-copy.png');
copyFileSync('assets/product/parts/eyes-a-clean.png', userAsset);
const userAssetBytes = readFileSync(userAsset);
const archive = join(fresh.folder, 'resources/app.asar'),
  entries = listPackage(archive).map((p) => p.replaceAll('\\', '/'));
assert.equal(JSON.parse(extractFile(archive, 'package.json')).version, version);
assert.ok(
  !entries.some((p) =>
    /(^|\/)(experiments|tests|\.git|\.local|scripts|tools|typescript|vite)(\/|$)/.test(p),
  ),
);
const packet = join(fresh.folder, 'resources/release'),
  support = JSON.parse(readFileSync(join(packet, 'support.json')));
assert.equal(support.app, version);
assert.equal(support.status.m0, 'HOLD');
assert.equal(support.status.publicDistributionApproved, false);
assert.equal(support.testedEnvironment.minimumSpecification, false);
for (const name of readdirSync('dist/release'))
  assert.deepEqual(
    readFileSync(join(packet, name)),
    readFileSync(join('dist/release', name)),
    'E_TRIAL_PACKET_DRIFT',
  );
for (const name of [
  'START-HERE.txt',
  'USER-GUIDE.md',
  'EXAMPLE-USAGE.md',
  'RELEASE-NOTES.md',
  'FEEDBACK.md',
])
  assert.ok(readFileSync(join(packet, name)).length > 50);
assert.deepEqual(
  readFileSync(join(fresh.folder, 'START-HERE.txt')),
  readFileSync(join(packet, 'START-HERE.txt')),
);
const flat = JSON.parse(readFileSync('worker/resources/license-overrides.json')).flatbuffers;
assert.equal(
  createHash('sha256')
    .update(readFileSync(join(fresh.folder, 'resources/notices/python/flatbuffers/LICENSE')))
    .digest('hex'),
  flat.sha256,
);
const system = process.env.SystemRoot ?? 'C:\\Windows',
  env = Object.fromEntries(
    Object.entries(process.env).filter(
      ([k]) => !/^(PYTHON|NODE|NPM|ELECTRON|VIRTUAL_ENV|CONDA|VSCODE)/i.test(k),
    ),
  );
env.PATH = join(system, 'System32');
for (const tool of ['node', 'npm', 'python', 'py'])
  assert.notEqual(
    spawnSync(join(system, 'System32/where.exe'), [tool], { cwd: target, env, windowsHide: true })
      .status,
    0,
  );
const profile = join(target, 'profile'),
  project = join(profile, 'project-a.2dsketch');
mkdirSync(profile);
let baseline;
const reports = [];
for (const [label, bundle, flags] of [
  [
    'before',
    old.folder,
    [
      '--settings-only=true',
      '--self-check-report=' + join(target, 'before.json'),
      '--settings-evidence=' + join(out, 'old-release-ui'),
    ],
  ],
  [
    'after',
    fresh.folder,
    [
      '--guide-only=true',
      '--guide-reopen-existing=true',
      '--self-check-report=' + join(target, 'after.json'),
      '--guide-evidence=' + join(out, 'packaged-ui'),
    ],
  ],
  [
    'repeat',
    fresh.folder,
    [
      '--guide-only=true',
      '--guide-reopen-existing=true',
      '--compact-editor=true',
      '--self-check-report=' + join(target, 'repeat.json'),
      '--guide-evidence=' + join(out, 'packaged-compact-ui'),
    ],
  ],
]) {
  const r = spawnSync(join(bundle, '2DSketcher.exe'), ['--profile-dir=' + profile, ...flags], {
    cwd: target,
    env,
    windowsHide: true,
    encoding: 'utf8',
    timeout: 240000,
  });
  writeFileSync(join(target, label + '.log'), (r.stdout ?? '') + (r.stderr ?? ''));
  if (r.error) throw new Error('E_TRIAL_PACKAGE_LAUNCH');
  const report = JSON.parse(readFileSync(join(target, label + '.json')));
  assert.equal(r.status, 0);
  assert.equal(report.passed, true);
  assert.equal(report.packaged, true);
  assert.equal(report.appVersion, label === 'before' ? '0.21.0' : version);
  assert.equal(report.channel, 'release');
  assert.equal(report.worker.frozen, true);
  assert.equal(report.worker.dependencyFilesInsideBundle, true);
  assert.equal(report.workerStopped, true);
  if (label !== 'before') {
    assert.equal(report.guide.deviceRequests, 0);
    assert.equal(report.guide.existingProjectOpened, true);
    assert.equal(report.m0, 'HOLD');
  }
  writeFileSync(join(out, label + '.json'), JSON.stringify(report, null, 2) + '\n');
  reports.push({ label, passed: true, windowSize: report.windowSize });
  if (label === 'before') {
    // Open an actual old-release saved archive in the new release, preserving the original bytes.
    const { readdirSync } = await import('node:fs'),
      folder = join(profile, 'default-saves'),
      saved = readdirSync(folder).find((p) => p.endsWith('.2dsketch'));
    assert.ok(saved, 'E_TRIAL_PROJECT_FILE');
    copyFileSync(join(folder, saved), project);
    baseline = readFileSync(project);
  }
}
assert.deepEqual(readFileSync(project), baseline);
assert.deepEqual(inventory(old.folder), old.files);
// Removal refuses a user's extra asset; then removes only the exact inventoried application files.
const extra = join(old.folder, 'user-asset.txt');
writeFileSync(extra, 'preserve me');
assert.throws(() => removeOwned(target, old.folder, old.files), /E_PORTABLE_MODIFIED/);
assert.ok(existsSync(extra));
const { unlinkSync } = await import('node:fs');
unlinkSync(extra);
removeOwned(target, old.folder, old.files);
assert.deepEqual(readFileSync(project), baseline);
removeOwned(target, fresh.folder, fresh.files);
assert.deepEqual(readFileSync(project), baseline);
assert.deepEqual(readFileSync(userAsset), userAssetBytes);
const summary = {
  passed: true,
  appVersion: version,
  oldVersion: '0.21.0',
  realZipExtraction: true,
  sideBySideUpdate: true,
  oldBundleUnchanged: true,
  userProjectPreserved: true,
  userAssetPreserved: true,
  oldReleaseProjectOpenedByNewRelease: true,
  removalRefusesAddedAsset: true,
  bothAppFoldersRemovedWithoutRecursiveDelete: true,
  sharedProfilePreserved: true,
  developerToolsOnPath: false,
  frozenWorker: true,
  cleanWindowsOS: false,
  crossVersionProjectMigration: true,
  previousVersionWasNotRerun: false,
  packagedRuns: reports,
  publicDistributionApproved: false,
  limitedTrialDistributed: false,
  m0: 'HOLD',
};
writeFileSync(join(out, 'package-review.json'), JSON.stringify(summary, null, 2) + '\n');
console.log(
  'Portable ZIP lifecycle and packaged guide checks passed. Clean Windows remains unverified.',
);
