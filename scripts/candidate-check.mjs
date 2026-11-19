// Freeze local candidate evidence only after portable checks pass. Never signs or publishes.
import { mkdirSync, readFileSync, writeFileSync, createReadStream, existsSync } from 'node:fs';
import { resolve, join, relative } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { privacyCheck } from '../tools/completion-controls.mjs';

const version = JSON.parse(readFileSync('package.json', 'utf8')).version;
const out = resolve('evidence/candidates', version);
const privateOut = resolve('.local/candidate-' + Date.now());
mkdirSync(privateOut, { recursive: true });
mkdirSync(out, { recursive: true });
const save = (file, value) =>
  writeFileSync(file, JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });
const hash = async (file) => {
  const digest = createHash('sha256');
  for await (const chunk of createReadStream(file)) digest.update(chunk);
  return digest.digest('hex');
};
function run(script, args = []) {
  const result = spawnSync(process.execPath, [script, ...args], {
    windowsHide: true,
    encoding: 'utf8',
    timeout: 3000000,
    maxBuffer: 8 * 1024 * 1024,
  });
  writeFileSync(
    join(privateOut, script.split('/').at(-1) + '.log'),
    (result.stdout ?? '') + (result.stderr ?? ''),
  );
  if (result.status !== 0) throw Error('E_CANDIDATE_CHECK');
  return result.stdout;
}
try {
  if (existsSync(join(out, 'package.json'))) throw Error('E_CANDIDATE_FROZEN');
  const zip = resolve('out/make/zip/win32/x64/2DSketcher-win32-x64-' + version + '.zip');
  const sha256 = await hash(zip);
  const baseFile = join(out, 'package-base.json');
  if (!existsSync(baseFile)) {
    const settings = join(out, 'settings-' + Date.now());
    run('scripts/environment-package-check.mjs', ['--evidence-dir=' + settings]);
    save(baseFile, {
      passed: true,
      scope: 'two portable settings checks; full regression pending',
      appVersion: version,
      zip: { file: relative(process.cwd(), zip).replaceAll('\\', '/'), sha256 },
      m0: 'HOLD',
      signed: false,
      published: false,
      settingsAudit: relative(process.cwd(), join(settings, 'package-audit.json')).replaceAll(
        '\\',
        '/',
      ),
    });
  }
  const base = JSON.parse(readFileSync(baseFile, 'utf8'));
  if (base.zip.sha256 !== sha256 || base.appVersion !== version) throw Error('E_CANDIDATE_STALE');
  const stdout = run('scripts/completion-probe-check.mjs');
  const match = stdout.match(/Native portable probe checked: (\.local\/completion-probe-\d+)/);
  if (!match) throw Error('E_CANDIDATE_PROBE');
  const probe = JSON.parse(readFileSync(join(match[1], 'probe-check.json'), 'utf8'));
  if (!probe.passed || probe.candidate.sha256 !== sha256) throw Error('E_CANDIDATE_PROBE');
  privacyCheck(probe);
  save(join(out, 'native-probe.json'), probe);
  if ((await hash(zip)) !== sha256) throw Error('E_CANDIDATE_CHANGED');
  save(join(out, 'package.json'), {
    ...base,
    scope:
      'two fresh-profile settings checks plus full native portable regression and same-profile reopening',
    fullPortableRegression: true,
    archiveUnchanged: true,
    cleanWindowsVerified: false,
    updateVerified: false,
    powerShellInvoked: false,
    securityBypasses: 0,
    nativeProbe: {
      file: relative(process.cwd(), join(out, 'native-probe.json')).replaceAll('\\', '/'),
      sha256: await hash(join(out, 'native-probe.json')),
    },
  });
  console.log('Local candidate verified: ' + version + '; M0/release HOLD');
} catch (error) {
  const code = /^E_[A-Z_]+$/.test(error.message) ? error.message : 'E_CANDIDATE_CHECK';
  save(join(privateOut, 'failure.json'), { passed: false, code, version });
  console.error(code);
  process.exitCode = 1;
}
