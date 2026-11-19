import { inventory as packageInventory } from '../tools/portable-lifecycle.mjs';
import assert from 'node:assert/strict';
import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { listPackage, extractFile } from '@electron/asar';
import { packageTestPath, root } from './common.mjs';
const source = resolve(root, 'out/2DSketcher-win32-x64'),
  target = packageTestPath(),
  bundle = join(target, '2DSketcher');
mkdirSync(target, { recursive: true });
cpSync(source, bundle, { recursive: true, errorOnExist: true, force: false });
const evidence = resolve(
  root,
  process.argv.find((v) => v.startsWith('--evidence-dir='))?.slice(15) ??
    '.local/smoke/expression-package',
);
mkdirSync(evidence, { recursive: true });
const archive = join(bundle, 'resources/app.asar'),
  entries = listPackage(archive).map((p) => p.replaceAll('\\', '/'));
assert.ok(
  !entries.some((p) =>
    /(^|\/)(experiments|tests|\.git|\.venv-product|\.local|scripts|worker\/main\.py|electron-forge|typescript|vite)(\/|$)/.test(
      p,
    ),
  ),
);
assert.equal(
  JSON.parse(extractFile(archive, join('dist', 'runtime-config.json'))).channel,
  'release',
);
assert.equal(JSON.parse(extractFile(archive, 'package.json')).version, '0.13.0');
const file = (path) => extractFile(archive, join(...path.split('/')));
const digest = (b) => createHash('sha256').update(b).digest('hex');
const provenance = JSON.parse(readFileSync('assets/product/split/manifest.json'));
const sample = file('dist/renderer/assets/split/premium-example.2dparts');
assert.equal(digest(sample), provenance.sha256);
assert.equal(JSON.parse(file('dist/renderer/assets/preview-project.json')).schemaVersion.minor, 8);
const assetManifest = JSON.parse(readFileSync('assets/product/manifest.json'));
for (const item of assetManifest.assets)
  assert.equal(digest(extractFile(archive, join('dist/renderer/assets', item.path))), item.sha256);
const catalog = JSON.parse(file('dist/renderer/assets/parts/catalog.json'));
for (const [sha, path] of Object.entries(catalog.files))
  assert.equal(digest(extractFile(archive, join('dist/renderer/assets', path))), sha);
const system = process.env.SystemRoot ?? 'C:\\Windows',
  env = Object.fromEntries(
    Object.entries(process.env).filter(
      ([key]) => !/^(PYTHON|NODE|NPM|ELECTRON|VIRTUAL_ENV|CONDA|VSCODE)/i.test(key),
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
  const reportPath = join(target, `report-${attempt}.json`),
    args = [
      '--expression-only=true',
      `--profile-dir=${join(target, 'profile-' + attempt)}`,
      `--self-check-report=${reportPath}`,
      `--expression-screenshot=${join(evidence, attempt === 1 ? 'release-expression.png' : 'release-expression-compact.png')}`,
      `--expression-extremes=${join(evidence, 'release-expression-extremes-' + attempt + '.png')}`,
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
    (result.stdout ?? '') + (result.stderr ?? ''),
  );
  if (result.error) throw result.error;
  const report = JSON.parse(readFileSync(reportPath));
  writeFileSync(
    join(evidence, 'packaged-run-' + attempt + '.json'),
    JSON.stringify(report, null, 2) + '\n',
  );
  assert.equal(result.status, 0);
  assert.equal(report.passed, true);
  assert.equal(report.packaged, true);
  assert.equal(report.channel, 'release');
  assert.equal(report.appVersion, '0.13.0');
  assert.equal(report.worker.frozen, true);
  assert.equal(report.worker.dependencyFilesInsideBundle, true);
  assert.equal(report.workerStopped, true);
  assert.equal(report.expressions.passed, true);
  assert.equal(report.expressions.routes.length, 3);
  for (const route of report.expressions.routes) {
    for (const key of [
      'passed',
      'actualRoutePreparation',
      'appearanceAndCorrection',
      'commonMotion',
      'createScopeLocks',
      'noNoiseSaved',
      'latestInputRelease',
      'exclusiveMouthPolicy',
      'appLocalShortcutAndGuards',
      'duplicateDelete',
      'damageRepairAndUndo',
      'saveDuplicateReopen',
      'originalHashesPreserved',
    ])
      assert.equal(route[key], true);
    assert.equal(route.pixels.passed, true);
    assert.equal(route.pixels.frames, 4);
  }
  assert.equal(report.expressions.m2CreationExitApproved, true);
  assert.equal(report.expressions.m0, 'HOLD');
  assert.equal(report.renderer.diagnosticsVisible, false);
  assert.equal(report.renderer.workflowLabVisible, false);
  assert.equal(report.renderer.projectModel.schemaVersion, '1.8');
  assert.equal(report.priorRouteUI, 'NOT_RUN');
  assert.equal(report.devicesOpened, false);
  assert.deepEqual(report.protections, {
    sandbox: true,
    contextIsolation: true,
    nodeIntegration: false,
    externalNetworkBlocked: true,
  });
  reports.push({
    attempt,
    freshProfile: true,
    passed: true,
    exitCode: result.status,
    windowSize: report.windowSize,
  });
}
const inventory = packageInventory(source, { sort: false });
writeFileSync(
  join(evidence, 'package-audit.json'),
  JSON.stringify(
    {
      passed: true,
      toolSourceSha256: digest(readFileSync('scripts/expression-package-check.mjs')),
      appVersion: '0.13.0',
      commonProjectSchema: '1.8',
      scope:
        'Expression and M2 local creation flows on three actual routes, synthetic inputs, GPU and save/reopen plus foundation core; prior feature UI NOT_RUN in packaged scope (full development regression recorded separately)',
      userApprovedScope: 'Same PC isolated runtime; no separate PC or VM available',
      cleanWindowsOS: false,
      isolation: {
        developerToolsOnPath: false,
        externalNodeOrPythonRequired: false,
        freshProfiles: 2,
        unicodeAndSpacePath: true,
        rendererExternalNetworkBlocked: true,
        systemNetworkDisabled: false,
      },
      reports,
      splitExampleSha256: digest(sample),
      archiveEntries: entries.length,
      forbiddenDevelopmentContent: false,
      packageBytes: inventory.reduce((n, v) => n + v.bytes, 0),
      limitations: [
        'Same Windows installation/drivers/system DLLs retained',
        'No new camera/microphone, OBS, independent avatar export or M0 performance approval',
      ],
      files: inventory,
    },
    null,
    2,
  ) + '\n',
);
console.log(
  'Detailed editor passed on three routes twice with frozen worker and no developer tools on PATH.',
);
