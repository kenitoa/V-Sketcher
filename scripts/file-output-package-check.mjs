import { inventory as packageInventory } from '../tools/portable-lifecycle.mjs';
import assert from 'node:assert/strict';
import { cpSync, mkdirSync, readFileSync, writeFileSync, existsSync, renameSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { listPackage, extractFile } from '@electron/asar';
import { packageTestPath, root } from './common.mjs';
const evidence = resolve(
  root,
  process.argv.find((v) => v.startsWith('--evidence-dir='))?.slice(15) ??
    '.local/file-output-package-' + Date.now(),
);
mkdirSync(evidence, { recursive: true });
assert.ok(!existsSync(join(evidence, 'package-audit.json')), 'E_EVIDENCE_EXISTS');
const source = resolve(root, 'out/2DSketcher-win32-x64'),
  target = packageTestPath(),
  bundle = join(target, '2DSketcher');
mkdirSync(target, { recursive: true });
cpSync(source, bundle, { recursive: true, errorOnExist: true, force: false });
const archive = join(bundle, 'resources/app.asar'),
  entries = listPackage(archive).map((p) => p.replaceAll('\\', '/'));
assert.ok(
  !entries.some((p) =>
    /(^|\/)(experiments|tests|\.git|\.venv-product|\.local|scripts|tools|worker\/main\.py|electron-forge|typescript|vite)(\/|$)/.test(
      p,
    ),
  ),
);
assert.ok(!entries.some((p) => /obs64\.exe/.test(p)));
const file = (p) => extractFile(archive, join(...p.split('/'))),
  digest = (b) => createHash('sha256').update(b).digest('hex');
assert.equal(JSON.parse(file('dist/runtime-config.json')).channel, 'release');
assert.equal(JSON.parse(file('package.json')).version, '0.19.0');
assert.equal(JSON.parse(file('dist/renderer/assets/preview-project.json')).schemaVersion.minor, 9);
const manifest = JSON.parse(readFileSync('assets/product/manifest.json'));
for (const asset of manifest.assets)
  assert.equal(digest(file('dist/renderer/assets/' + asset.path)), asset.sha256);
const catalog = JSON.parse(readFileSync('assets/product/parts/catalog.json'));
for (const [sha, path] of Object.entries(catalog.files))
  assert.equal(digest(file('dist/renderer/assets/' + path)), sha);
const split = JSON.parse(readFileSync('assets/product/split/manifest.json'));
assert.equal(digest(file('dist/renderer/assets/split/premium-example.2dparts')), split.sha256);
const system = process.env.SystemRoot ?? 'C:\\Windows',
  env = Object.fromEntries(
    Object.entries(process.env).filter(
      ([k]) => !/^(PYTHON|NODE|NPM|ELECTRON|VIRTUAL_ENV|CONDA|VSCODE)/i.test(k),
    ),
  );
env.PATH = join(system, 'System32');
for (const command of ['node', 'npm', 'python', 'py'])
  assert.notEqual(
    spawnSync(join(system, 'System32/where.exe'), [command], {
      cwd: target,
      env,
      windowsHide: true,
    }).status,
    0,
  );
const reports = [];
for (const attempt of [1, 2]) {
  const scenario = join(evidence, 'packaged-' + attempt);
  mkdirSync(scenario, { recursive: true });
  const reportPath = join(target, `report-${attempt}.json`),
    args = [
      '--file-output-only=true',
      `--profile-dir=${join(target, 'profile-' + attempt)}`,
      `--self-check-report=${reportPath}`,
      `--file-output-evidence=${scenario}`,
    ];
  if (attempt === 2) args.push('--compact-editor=true');
  const result = spawnSync(join(bundle, '2DSketcher.exe'), args, {
    cwd: target,
    env,
    windowsHide: true,
    encoding: 'utf8',
    timeout: 600000,
  });
  writeFileSync(
    join(target, 'launch-' + attempt + '.log'),
    ((result.stdout ?? '') + (result.stderr ?? '')).replace(/\/b\/[a-f0-9]{64}/g, '/b/[REDACTED]'),
  );
  if (result.error) throw result.error;
  const report = JSON.parse(readFileSync(reportPath));
  writeFileSync(
    join(evidence, `packaged-run-${attempt}.json`),
    JSON.stringify(report, null, 2) + '\n',
  );
  assert.equal(result.status, 0);
  assert.equal(report.passed, true);
  assert.equal(report.packaged, true);
  assert.equal(report.appVersion, '0.19.0');
  assert.equal(report.channel, 'release');
  assert.equal(report.worker.frozen, true);
  assert.equal(report.worker.dependencyFilesInsideBundle, true);
  assert.equal(report.workerStopped, true);
  assert.equal(report.fileOutput.passed, true);
  for (const route of report.fileOutput.routes)
    for (const key of [
      'passed',
      'actualRoutePreparation',
      'staleImageRejected',
      'coreLossBlocked',
      'staleInspection',
      'copyReview',
      'fixNavigation',
      'targetSettingsReopened',
    ])
      assert.equal(route[key], true);
  assert.equal(report.fileOutput.routes.length, 3);
  assert.equal(report.fileOutput.images.length, 14);
  assert.equal(report.fileOutput.staticWithoutMotion, true);
  assert.equal(report.fileOutput.frozenExecutionImage, true);
  assert.equal(report.fileOutput.warningAcknowledgement, true);
  assert.equal(report.fileOutput.warningScopeReset, true);
  assert.equal(report.fileOutput.deviceRequests, 0);
  assert.equal(report.fileOutput.externalFileGenerated, false);
  assert.equal(report.fileOutput.externalRuntimeVerified, false);
  assert.equal(report.fileOutput.m0, 'HOLD');
  assert.equal(report.fileOutput.allImageResourcesReleased, true);
  assert.deepEqual(report.protections, {
    sandbox: true,
    contextIsolation: true,
    nodeIntegration: false,
    externalNetworkBlocked: true,
  });
  if (attempt === 2) assert.deepEqual(report.windowSize, [1080, 720]);
  const pixel = spawnSync(
    resolve(root, '.venv-product/Scripts/python.exe'),
    [
      'scripts/file-output-pixels.py',
      '--report=' + join(evidence, `packaged-run-${attempt}.json`),
      '--images-dir=' + scenario,
      '--output=' + join(evidence, `pixel-quality-release-${attempt}.json`),
    ],
    { cwd: root, encoding: 'utf8', windowsHide: true },
  );
  assert.equal(pixel.status, 0, 'E_FILE_OUTPUT_PIXELS');
  reports.push({ attempt, passed: true, freshProfile: true, windowSize: report.windowSize });
}
const files = packageInventory(source, { sort: false });
writeFileSync(
  join(evidence, 'package-audit.json'),
  JSON.stringify(
    {
      passed: true,
      toolSourceSha256: digest(readFileSync('scripts/file-output-package-check.mjs')),
      appVersion: '0.19.0',
      commonProjectSchema: '1.9',
      scope:
        'PNG exact preview/save bytes, independent alpha/color/variant checks, static/no-motion and frozen execution image, target settings round-trip, blocking core loss, stale results and warning scope on three actual routes. INP writing/external runtime remain phase25.',
      cleanWindowsOS: false,
      isolation: {
        developerToolsOnPath: false,
        externalNodeOrPythonRequired: false,
        freshProfiles: 2,
        unicodeAndSpacePath: true,
        externalNetworkBlocked: true,
        imageRendererNetwork: 'external network blocked; sketcher asset grants only',
      },
      reports,
      archiveEntries: entries.length,
      forbiddenDevelopmentContent: false,
      obsBundled: false,
      packageBytes: files.reduce((n, v) => n + v.bytes, 0),
      limitations: [
        'Same Windows installation/drivers/system DLLs retained',
        'No INP writer/independent avatar runtime, physical devices or OS global key acceptance; M0 HOLD',
      ],
      files,
    },
    null,
    2,
  ) + '\n',
);
console.log('File output release passed twice with frozen worker and no developer tools on PATH.');
