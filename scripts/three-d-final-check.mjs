import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {createRequire} from 'node:module';
import {createHash} from 'node:crypto';
import {resolve,join} from 'node:path';
import assert from 'node:assert/strict';
const out=resolve('evidence/phase31/validation-01');assert.ok(!existsSync(out),'E_3D_OUTPUT_EXISTS');mkdirSync(out,{recursive:true});
const require=createRequire(resolve('.local/research31/package.json')),validator=require('gltf-validator');
const hash=data=>createHash('sha256').update(data).digest('hex');
const records=[];
for(const [directory,names] of [['run-07',['model.glb','model.vrm','corrected-model.glb','corrected-model.vrm']],['learned-02',['model.glb']],['learned-03',['model.glb']]]){
 for(const name of names){const file=join('evidence/phase31',directory,name),data=readFileSync(file),report=await validator.validateBytes(new Uint8Array(data),{uri:name,maxIssues:100});assert.equal(report.issues.numErrors,0,'E_3D_GLTF_VALIDATION');writeFileSync(join(out,directory+'-'+name+'.json'),JSON.stringify(report,null,2)+'\n');records.push({file,sha256:hash(data),errors:0});}
}
const read=file=>JSON.parse(readFileSync('evidence/phase31/'+file));
assert.equal(read('run-07/auto-report.json').syntheticInputResetVerified,true);
assert.equal(read('run-07/target-report.json').passed,true);
assert.equal(hash(readFileSync('evidence/phase31/run-07/model.glb')),read('run-05/blender/report.json').sourceSha256,'E_3D_EXTERNAL_SOURCE_HASH');
for(const name of ['model.glb','model.vrm','corrected-model.glb','corrected-model.vrm'])assert.equal(hash(readFileSync('evidence/phase31/run-05/'+name)),hash(readFileSync('evidence/phase31/run-07/'+name)),'E_3D_FROZEN_GEOMETRY_HASH');
assert.equal(read('device-04/live-summary.json').resourcesReleased,true);
assert.equal(read('live-03/obs-live.json').streamingStarted,false);
assert.equal(read('live-03/obs-live.json').recordingStarted,false);
writeFileSync(join(out,'summary.json'),JSON.stringify({passed:true,records,finalUI:'run-07',neutralAfterSyntheticStop:true,independentBlenderExactBytes:'run-05/blender/report.json',syntheticInputIsNotHumanTrackingEvidence:true,devicesReleased:true,productQualityAcceptance:false},null,2)+'\n');
console.log('Final model validation, exact-byte external evidence and stop-to-neutral regression passed.');
