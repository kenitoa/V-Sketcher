// Current-host probe validation, explicitly NOT a clean-OS acceptance test.
import {
  mkdirSync,
  readFileSync,
  writeFileSync,
  linkSync,
  readdirSync,
  createReadStream,
  statfsSync,
  existsSync,
  unlinkSync,
} from 'node:fs';
import { join, resolve, relative } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { compileProbe } from '../tools/completion-native.mjs';
const out = resolve('.local/completion-probe-' + Date.now());
mkdirSync(out);
const hash = async (file) => {
  const h = createHash('sha256');
  for await (const c of createReadStream(file)) h.update(c);
  return h.digest('hex');
};
try {
  const disk = statfsSync(out);
  if (disk.bavail * disk.bsize < 1500 * 1024 ** 2) throw Error('E_COMPLETION_SPACE');
  const version = JSON.parse(readFileSync('package.json', 'utf8')).version;
  const expected = JSON.parse(
    readFileSync('evidence/candidates/' + version + '/package-base.json'),
  );
  const zip = resolve(expected.zip.file),
    digest = await hash(zip);
  if (digest !== expected.zip.sha256) throw Error('E_PROBE_CANDIDATE');
  const exe = compileProbe(out);
  linkSync(zip, join(out, 'candidate.zip'));
  // Test-only, read-only input sharing; neither native probe nor checker writes the archive.
  const manifest = {
    format: '2dsketcher-completion-kit/1',
    candidate: { version: expected.appVersion, sha256: digest },
    files: [{ name: 'Run-CleanWindows.exe', sha256: await hash(exe) }],
  };
  writeFileSync(join(out, 'kit-manifest.json'), JSON.stringify(manifest), { flag: 'wx' });
  const env = { ...process.env };
  delete env.ELECTRON_RUN_AS_NODE;
  const results = [];
  for (const args of [['--inventory-only'], []]) {
    const before = new Set(readdirSync(out));
    const run = spawnSync(exe, args, {
      env,
      windowsHide: true,
      encoding: 'utf8',
      timeout: 2400000,
      maxBuffer: 1024 * 1024,
    });
    const fresh = readdirSync(out).filter(
      (name) => /^probe-[0-9-]+-[a-f0-9]{8}\.json$/.test(name) && !before.has(name),
    );
    if (fresh.length !== 1) throw Error('E_PROBE_RESULT');
    const value = JSON.parse(readFileSync(join(out, fresh[0])));
    results.push(value);
    if (
      run.status !== 0 ||
      value.errorCode ||
      value.cleanWindowsVerified !== false ||
      value.powerShellInvoked !== false ||
      value.cleanupErrorCode
    )
      throw Error('E_PROBE_CHECK');
  }
  if (!results[1].passed || results[1].tests.length !== 2 || (await hash(zip)) !== digest)
    throw Error('E_PROBE_PACKAGED_CHECK');
  writeFileSync(
    join(out, 'probe-check.json'),
    JSON.stringify(
      {
        passed: true,
        candidate: manifest.candidate,
        inventory: results[0],
        packaged: results[1],
        archiveUnchanged: true,
        sharedArchiveReadOnly: true,
        cleanWindowsVerified: false,
        updateVerified: false,
        powerShellInvoked: false,
        securityBypasses: 0,
      },
      null,
      2,
    ) + '\n',
    { flag: 'wx' },
  );
  console.log(
    'Native portable probe checked: ' + relative(process.cwd(), out).replaceAll('\\', '/'),
  );
} catch (error) {
  writeFileSync(
    join(out, 'failure.json'),
    JSON.stringify({
      passed: false,
      code: /^E_[A-Z_]+$/.test(error.message) ? error.message : 'E_PROBE_CHECK',
      cleanWindowsVerified: false,
    }) + '\n',
    { flag: 'wx' },
  );
  console.error(/^E_[A-Z_]+$/.test(error.message) ? error.message : 'E_PROBE_CHECK');
  process.exitCode = 1;
} finally {
  const temporaryLink = join(out, 'candidate.zip');
  if (existsSync(temporaryLink)) unlinkSync(temporaryLink);
}
