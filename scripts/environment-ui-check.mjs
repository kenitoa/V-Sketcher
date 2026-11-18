import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {electronPath} from './common.mjs';
const out=resolve(process.argv.find(v=>v.startsWith('--evidence-dir='))?.slice(15)??'.local/environment-'+Date.now()),profile=resolve('.local/environment-profile-'+Date.now());mkdirSync(out,{recursive:true});mkdirSync(profile,{recursive:true});
const env={...process.env};delete env.ELECTRON_RUN_AS_NODE;const args=['.','--settings-only=true','--profile-dir='+profile,'--self-check-report='+join(out,'report.json'),'--settings-evidence='+out];if(process.argv.includes('--compact'))args.push('--compact-editor=true');
const r=spawnSync(electronPath(),args,{env,windowsHide:true,encoding:'utf8',timeout:1200000});writeFileSync(join(profile,'launch.log'),(r.stdout??'')+(r.stderr??''));if(r.error)throw r.error;const report=JSON.parse(readFileSync(join(out,'report.json'),'utf8'));assert.equal(r.status,0);assert.equal(report.passed,true);console.log('Environment UI passed; synthetic media cleanup and native files verified.');
