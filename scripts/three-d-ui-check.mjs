import {spawnSync} from 'node:child_process';
import {mkdirSync,readFileSync,writeFileSync,copyFileSync,existsSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {createRequire} from 'node:module';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {python,electronPath} from './common.mjs';
const out=resolve(process.argv[2]);assert.ok(!existsSync(out),'E_3D_OUTPUT_EXISTS');mkdirSync(out,{recursive:true});
const work=resolve('.local/phase31-auto-'+Date.now()),model=join(work,'model');mkdirSync(work,{recursive:true});
const manifest=JSON.parse(readFileSync('assets/product/manifest.json')),source=resolve('assets/product',manifest.assets[0].path),hash=b=>createHash('sha256').update(b).digest('hex'),before=hash(readFileSync(source));assert.equal(before,manifest.assets[0].sha256);
const env={...process.env};delete env.ELECTRON_RUN_AS_NODE;
const result=spawnSync(python,['-I','tools/three-d-build.py','--source='+source,'--output='+model],{env,windowsHide:true,encoding:'utf8',timeout:30000});assert.equal(result.status,0,'E_3D_BUILD');
const require=createRequire(resolve('.local/research31/package.json')),validator=require('gltf-validator');
for(const name of ['model.glb','model.vrm']){const data=readFileSync(join(model,name)),report=await validator.validateBytes(new Uint8Array(data),{uri:name,maxIssues:100});assert.equal(report.issues.numErrors,0,'E_3D_GLTF_VALIDATION');writeFileSync(join(out,name+'-validation.json'),JSON.stringify(report,null,2)+'\n');copyFileSync(join(model,name),join(out,name));}
copyFileSync(join(model,'metrics.json'),join(out,'metrics.json'));
for(const mode of ['auto','target']){const r=spawnSync(electronPath(),['tools/three-d-main.cjs','--work='+work,'--model='+model,'--source='+source,'--mode='+mode,'--evidence='+out],{env,windowsHide:true,encoding:'utf8',timeout:180000,maxBuffer:8*1024*1024});writeFileSync(join(work,mode+'.log'),(r.stdout??'')+(r.stderr??''));assert.ok(!r.error,'E_3D_UI_START');assert.equal(r.status,0,'E_3D_UI_'+mode.toUpperCase());const report=JSON.parse(readFileSync(join(out,mode+'-report.json')));assert.equal(report.passed,true);if(mode==='target')assert.equal(report.independentVRM,true);}
const corrected=JSON.parse(readFileSync(join(work,'corrected-path.json')));for(const name of ['model.glb','model.vrm']){const r=await validator.validateBytes(new Uint8Array(readFileSync(join(corrected.directory,name))),{uri:name,maxIssues:100});assert.equal(r.issues.numErrors,0);copyFileSync(join(corrected.directory,name),join(out,'corrected-'+name));}
assert.equal(hash(readFileSync(source)),before);writeFileSync(join(work,'work.json'),JSON.stringify({work,model,source}));
writeFileSync(join(out,'ui-summary.json'),JSON.stringify({passed:true,sourceSha256:before,sourceUnchanged:true,prototypeOnly:true,physicalDevicesOpened:false,sourceWasPremium:true,independentVRMLoader:true,correctionExportValidated:true,sideRearGroundTruth:false,threeVersion:JSON.parse(readFileSync(resolve('.local/research31/node_modules/three/package.json'))).version},null,2)+'\n');console.log('3D volume, controls, glTF validation and independent three-vrm loading passed.');
