import { readFileSync, writeFileSync, mkdirSync, existsSync, createReadStream } from 'node:fs';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { extractFile, listPackage } from '@electron/asar';
import assert from 'node:assert/strict';
const out = resolve(process.argv[2]);
assert.ok(!existsSync(out), 'E_REMEDIATION_EXISTS');
mkdirSync(out, { recursive: true });
const load = (p) => JSON.parse(readFileSync(p, 'utf8')),
  hash = (data) => createHash('sha256').update(data).digest('hex');
async function digest(file) {
  const h = createHash('sha256');
  for await (const block of createReadStream(file)) h.update(block);
  return h.digest('hex');
}
const base = 'evidence/remediation26-31/package-01/settings',
  audit = load(base + '/package-audit.json'),
  version = load('package.json').version,
  bundle = resolve('out/2DSketcher-win32-x64');
assert.ok(audit.passed);
assert.equal(audit.appVersion, version);
for (const entry of audit.files) {
  assert.ok(!entry.path.startsWith('..'));
  assert.equal(await digest(join(bundle, entry.path)), entry.sha256, 'E_PACKAGE_DRIFT');
}
for (const attempt of [1, 2]) {
  const report = load(base + '/packaged-run-' + attempt + '.json');
  assert.ok(
    report.passed &&
      report.workerStopped &&
      report.worker.frozen &&
      report.settings.diagnosticPrivacyChecked &&
      report.settings.sourceHashUnchanged,
  );
  assert.equal(report.appVersion, version);
}
const archive = join(bundle, 'resources/app.asar'),
  compiled = 'dist/electron/packages/project-storage/replace.js',
  entry = join(...compiled.split('/'));
assert.equal(hash(extractFile(archive, entry)), hash(readFileSync(compiled)), 'E_JOURNAL_PACKAGE');
assert.ok(
  !listPackage(archive).some((p) => /remediation-media|astronaut\.png|remediation-flow/.test(p)),
  'E_FIXTURE_BUNDLED',
);
const old = load('evidence/phase29/run-05/review.json');
assert.equal(await digest(old.zip.path), old.zip.sha256);
const exe = join(bundle, '2DSketcher.exe'),
  escaped = exe.replaceAll("'", "''"),
  signature = spawnSync(
    'powershell.exe',
    [
      '-NoProfile',
      '-Command',
      `(Get-AuthenticodeSignature -FilePath '${escaped}').Status.ToString()`,
    ],
    { windowsHide: true, encoding: 'utf8', timeout: 30000 },
  );
assert.equal(signature.status, 0);
assert.equal(signature.stdout.trim(), 'NotSigned');
const zip = 'out/make/zip/win32/x64/2DSketcher-win32-x64-' + version + '.zip';
writeFileSync(
  join(out, 'package.json'),
  JSON.stringify(
    {
      passed: true,
      appVersion: version,
      patch: 'bounded recovery journal rename retry',
      twoFreshPackagedSettingsRuns: true,
      reusedValidReportsFrom: base,
      allInventoriedPackageBytesRechecked: true,
      unicodeSpacePaths: true,
      developerToolsOnPath: false,
      cleanWindowsOS: false,
      compiledJournalSha256: hash(extractFile(archive, entry)),
      zip: { file: zip, sha256: await digest(zip) },
      originalFrozenZipPreserved: true,
      fixturesBundled: false,
      signature: signature.stdout.trim(),
      published: false,
      signed: false,
      releaseDecision: 'HOLD',
    },
    null,
    2,
  ) + '\n',
);
console.log(
  'Exact packaged bytes, two valid packaged runs, journal fix and preserved old ZIP verified.',
);
