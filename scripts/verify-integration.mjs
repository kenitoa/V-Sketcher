import {spawnSync} from 'node:child_process';
import {mkdirSync,writeFileSync,readFileSync,readdirSync,copyFileSync,existsSync} from 'node:fs';
import {resolve,join,relative,dirname} from 'node:path';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {root,python} from './common.mjs';

// A fresh run is mandatory: previous evidence is never overwritten or relabelled.
const out=resolve(root,process.argv.find(v=>v.startsWith('--output-dir='))?.slice(13)??'evidence/phase27/run-'+Date.now());
assert.ok(!existsSync(out),'E_INTEGRATION_EXISTS');mkdirSync(out,{recursive:true});
const work=resolve(root,'.local/integration-'+Date.now());mkdirSync(work,{recursive:true});
const env={...process.env,PATH:dirname(process.execPath)+';'+process.env.PATH};delete env.ELECTRON_RUN_AS_NODE;
const hash=b=>createHash('sha256').update(b).digest('hex'),load=p=>JSON.parse(readFileSync(p,'utf8'));
const sources={};function inventory(folder){for(const i of readdirSync(folder,{withFileTypes:true})){if(i.name==='__pycache__'||i.name.endsWith('.pyc'))continue;const p=join(folder,i.name);if(i.isDirectory())inventory(p);else sources[relative(root,p).replaceAll('\\','/')]=hash(readFileSync(p));}}
for(const folder of ['apps','packages','worker','scripts','tools','tests','assets/product'])inventory(resolve(root,folder));
for(const name of ['package.json','package-lock.json'])sources[name]=hash(readFileSync(resolve(root,name)));
const stages=[];let nodeTests=0,pythonTests=0;
function run(stage,exe,args){console.log('Integration: '+stage);const r=spawnSync(exe,args,{cwd:root,env,windowsHide:true,encoding:'utf8',timeout:1800000,maxBuffer:24*1024*1024});const text=(r.stdout??'')+(r.stderr??'');const passed=!r.error&&r.status===0;stages.push({stage,passed});writeFileSync(join(out,'progress.json'),JSON.stringify({stages},null,2)+'\n');if(stage==='required-check'){nodeTests=Number(text.match(/\btests (\d+)/)?.[1]);pythonTests=Number(text.match(/Ran (\d+) tests/)?.[1]);}assert.ok(passed,'E_INTEGRATION_STAGE_'+stage.toUpperCase().replaceAll('-','_'));}
try{
 run('required-check',process.env.ComSpec??'cmd.exe',['/d','/c','tools\\dev.cmd','run','check']);assert.ok(nodeTests>=328&&pythonTests>=36);
 run('full-regression',process.execPath,['scripts/smoke.mjs']);
 copyFileSync(resolve(root,'.local/smoke/development/report.json'),join(out,'development-run.json'));
 const full=load(join(out,'development-run.json'));assert.ok(full.passed&&full.workerStopped);
 for(const key of ['runtimeChanges','execution','inputRecovery','tracking','expressions','detail','split','corrections','structure','parts','input','projects','editor','motion'])assert.ok(full[key].passed,key);
 for(const key of ['runtimeChanges','execution','inputRecovery','tracking','expressions','detail'])assert.equal(full[key].routes.length,3,key);
 for(const [stage,script,option] of [['broadcast','broadcast-ui-check','--output-dir='],['image','file-output-ui-check','--output-dir='],['avatar','avatar-export-ui-check','--output-dir='],['settings','environment-ui-check','--evidence-dir=']]){
  const folder=join(out,stage),privateFolder=join(work,stage);mkdirSync(folder,{recursive:true});run(stage,process.execPath,['scripts/'+script+'.mjs',option+privateFolder]);const report=load(join(privateFolder,'report.json'));assert.ok(report.passed);
  for(const name of readdirSync(privateFolder))if(/\.(png|inp)$/.test(name)||['report.json','runner.json','minimal-diagnostic.json'].includes(name))copyFileSync(join(privateFolder,name),join(folder,name));
  if(stage==='image'||stage==='avatar')run(stage+'-pixels',python,['scripts/'+(stage==='image'?'file-output':'avatar-export')+'-pixels.py','--report='+join(folder,'report.json'),'--images-dir='+folder,'--output='+join(out,stage+'-pixel-quality.json')]);
 }
 const avatar=load(join(out,'avatar/report.json'));assert.equal(avatar.avatarExport.files.length,6);assert.equal(avatar.avatarExport.images.length,42);assert.ok(avatar.workerStopped&&!avatar.avatarExport.actualExternalRuntimeVerified);
 assert.equal(load(join(out,'image/report.json')).fileOutput.images.length,14);
 for(const [p,digest] of Object.entries(sources))assert.equal(hash(readFileSync(resolve(root,p))),digest,'E_INTEGRATION_SOURCE_CHANGED');
 run('coverage',python,['scripts/integration-coverage.py','--output-dir='+out]);
 writeFileSync(join(out,'verification.json'),JSON.stringify({passed:true,scope:'AUTOMATED_INTEGRATION_ONLY',created:new Date().toISOString(),appVersion:load(resolve(root,'package.json')).version,nodeTestGroups:nodeTests,pythonTestGroups:pythonTests,totalTestGroups:nodeTests+pythonTests,stages,sourceSha256:sources,physicalDevicesVerified:false,osGlobalKeysVerified:false,actualOBSVerified:false,actualIndependentTargetVerified:false,noviceVerified:false,m0:'HOLD',phase27Complete:false},null,2)+'\n');
 console.log('Automated integration passed; physical, external target, novice and release gates remain separate.');
}catch(e){writeFileSync(join(out,'failure.json'),JSON.stringify({passed:false,code:e instanceof Error?e.message.match(/E_[A-Z_-]+/)?.[0]??'E_INTEGRATION_ASSERTION':'E_INTEGRATION_ASSERTION',stages,m0:'HOLD'},null,2)+'\n');console.error('E_INTEGRATION_FAILED: inspect isolated stage reports');process.exitCode=1;}
