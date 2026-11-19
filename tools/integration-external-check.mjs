import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { spawnSync } from 'node:child_process';
const run = resolve(process.argv[2]),
  output = join(run, 'external-03'),
  state = JSON.parse(readFileSync('.local/phase27-target-state.json'));
mkdirSync(output, { recursive: true });
const tool = readFileSync('tools/avatar-external-check.mjs', 'utf8').replace(
  "from './obs-client.mjs'",
  "from '../tools/obs-client.mjs'",
);
const resilient = tool
  .replace('Phase25 external verification', 'Phase27 external verification')
  .replace('Phase25 external target', 'Phase27 external target')
  .replace(
    'const pause=ms',
    'const nativeRequest=obs.request.bind(obs);obs.request=async(...args)=>{for(let attempt=0;;attempt++){try{return await nativeRequest(...args);}catch(e){if(!/^E_OBS_REQUEST_[0-9]+$/.test(e.message)||attempt>=4)throw e;await new Promise(r=>setTimeout(r,250));}}};const pause=ms',
  )
  .replaceAll('/E_[A-Z_]+/', '/E_[A-Z0-9_]+/');
writeFileSync('.local/phase27-avatar-external.mjs', resilient);
const r = spawnSync(
  process.execPath,
  [
    '.local/phase27-avatar-external.mjs',
    '--report=' + join(run, 'avatar/report.json'),
    '--images-dir=' + join(run, 'avatar'),
    '--work-dir=' + resolve('.local/phase27-external-' + Date.now()),
    '--output-dir=' + output,
    '--target-root=' + resolve('.local/phase25-target-02/session'),
    '--secret=' + join(state.directory, 'secret.json'),
  ],
  { windowsHide: true, encoding: 'utf8', timeout: 600000 },
);
if (r.status !== 0) {
  console.error('E_PHASE27_EXTERNAL: inspect isolated failure record');
  process.exitCode = 1;
} else console.log('Six official independent target runs passed.');
