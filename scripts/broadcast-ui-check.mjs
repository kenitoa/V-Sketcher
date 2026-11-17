import{spawnSync}from'node:child_process';
import{mkdirSync,existsSync,readFileSync,writeFileSync}from'node:fs';
import{resolve,join}from'node:path';
import{root,electronPath}from'./common.mjs';
const output=resolve(root,process.argv.find(v=>v.startsWith('--output-dir='))?.slice(13)??'.local/broadcast-'+Date.now());if(existsSync(join(output,'report.json')))throw new Error('E_EVIDENCE_EXISTS');mkdirSync(output,{recursive:true});
const env={...process.env};delete env.ELECTRON_RUN_AS_NODE;const args=['.','--broadcast-only=true',`--profile-dir=${join(output,'profile')}`,`--self-check-report=${join(output,'report.json')}`,`--broadcast-evidence=${output}`];if(process.argv.includes('--compact'))args.push('--compact-editor=true');
const child=spawnSync(electronPath(),args,{cwd:root,env,windowsHide:true,encoding:'utf8',timeout:900000});writeFileSync(join(output,'launch.log'),(child.stdout??'')+(child.stderr??''));if(child.error)throw child.error;const report=JSON.parse(readFileSync(join(output,'report.json'),'utf8'));if(child.status!==0||!report.passed)throw new Error('E_BROADCAST_UI: inspect isolated report');console.log('Broadcast UI passed on three real creation routes.');
