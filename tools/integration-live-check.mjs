import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { spawn } from 'node:child_process';
import { electronPath } from '../scripts/common.mjs';
const out = resolve('evidence/phase27/run-1794981764746/live-02'),
  work = resolve('.local/phase27-live-02');
mkdirSync(out, { recursive: true });
mkdirSync(work, { recursive: true });
const env = { ...process.env };
delete env.ELECTRON_RUN_AS_NODE;
const child = spawn(
  electronPath(),
  [
    '.',
    '--profile-dir=' + join(work, 'profile'),
    '--live-environment-report=' + join(out, 'report.json'),
    '--environment-bridge=' + join(work, 'bridge'),
  ],
  { env, windowsHide: true, stdio: 'ignore' },
);
writeFileSync(join(work, 'pid.json'), JSON.stringify({ pid: child.pid }));
child.on('exit', (code) => {
  console.log('Live device test ended: ' + code);
  process.exitCode = code ?? 1;
});
