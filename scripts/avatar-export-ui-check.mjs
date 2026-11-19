import { spawnSync } from 'node:child_process';
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { root, electronPath } from './common.mjs';
const out = resolve(
  root,
  process.argv.find((v) => v.startsWith('--output-dir='))?.slice(13) ??
    '.local/avatar-export-' + Date.now(),
);
mkdirSync(out, { recursive: true });
if (existsSync(join(out, 'report.json'))) throw new Error('E_EVIDENCE_EXISTS');
const env = { ...process.env };
delete env.ELECTRON_RUN_AS_NODE;
const args = [
  '.',
  '--avatar-export-only=true',
  `--profile-dir=${join(out, 'profile')}`,
  `--self-check-report=${join(out, 'report.json')}`,
  `--avatar-export-evidence=${out}`,
];
if (process.argv.includes('--compact')) args.push('--compact-editor=true');
const result = spawnSync(electronPath(), args, {
  cwd: root,
  env,
  windowsHide: true,
  encoding: 'utf8',
  timeout: 1200000,
});
writeFileSync(
  join(out, 'launch.log'),
  ((result.stdout ?? '') + (result.stderr ?? '')).replace(/\/b\/[a-f0-9]{64}/g, '/b/[REDACTED]'),
);
if (result.error) throw result.error;
const report = JSON.parse(readFileSync(join(out, 'report.json'), 'utf8'));
if (result.status !== 0 || !report.passed)
  throw new Error('E_AVATAR_EXPORT_UI: inspect isolated report');
writeFileSync(
  join(out, 'runner.json'),
  JSON.stringify(
    {
      passed: true,
      appProcessExited: true,
      exitCode: result.status,
      workerStopped: report.workerStopped,
      reportSha256: (await import('node:crypto'))
        .createHash('sha256')
        .update(readFileSync(join(out, 'report.json')))
        .digest('hex'),
    },
    null,
    2,
  ) + '\n',
);
console.log(
  'Native INP saving, previews, re-export and recovery passed on three actual creation routes.',
);
