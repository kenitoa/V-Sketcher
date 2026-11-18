import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {electronPath} from './common.mjs';
const out=resolve(process.argv.find(v=>v.startsWith('--evidence-dir='))?.slice(15)??'.local/usability-'+Date.now()),profile=resolve('.local/usability-profile-'+Date.now());mkdirSync(out,{recursive:true});mkdirSync(profile,{recursive:true});
const env={...process.env};delete env.ELECTRON_RUN_AS_NODE;
const args=['.','--guide-only=true','--profile-dir='+profile,'--self-check-report='+join(out,'report.json'),'--guide-evidence='+out];if(process.argv.includes('--compact'))args.push('--compact-editor=true');
const r=spawnSync(electronPath(),args,{env,windowsHide:true,encoding:'utf8',timeout:180000});
// Raw Chromium output stays in the ignored private profile, never normal evidence.
writeFileSync(join(profile,'launch.log'),(r.stdout??'')+(r.stderr??''));if(r.error)throw new Error('E_GUIDE_LAUNCH');
const report=JSON.parse(readFileSync(join(out,'report.json'),'utf8'));assert.equal(r.status,0);assert.equal(report.passed,true);console.log('Guide UI passed; this is developer automation, not a novice observation.');
