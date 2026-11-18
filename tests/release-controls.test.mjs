import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import {assessRelease,requiredChecks,incidentIntake,transitionIncident,evidencePath} from '../tools/release-controls.mjs';
const candidate={version:'0.22.0',sha256:'a'.repeat(64)},evidence=[{path:'evidence/test-only.json',sha256:'b'.repeat(64)}];
// Synthetic policy cases never count as actual release or user evidence.
const allPass=()=>requiredChecks.map(id=>({id,status:'PASS',candidateSha256:candidate.sha256,evidence}));
test('release defaults every omitted condition to NOT_RUN and HOLD; no empty green result',()=>{
 const r=assessRelease(candidate,[]);assert.equal(r.decision,'HOLD');assert.equal(r.blockers.length,requiredChecks.length);assert.ok(r.checks.every(c=>c.status==='NOT_RUN'));assert.equal(r.publicDistributionApproved,false);
});
test('every non-PASS state, including partial and missing predecessor, blocks release',()=>{
 for(const status of ['FAIL','PARTIAL','NOT_RUN','BLOCKED']){const rows=allPass();rows.find(r=>r.id==='PREDECESSOR-29').status=status;assert.equal(assessRelease(candidate,rows).decision,'HOLD');}
 const r=assessRelease(candidate,allPass());assert.equal(r.decision,'READY_FOR_REVIEW');assert.equal(r.published,false);assert.equal(r.publicDistributionApproved,false);
});
test('PASS cannot be borrowed from another candidate or an unreferenced report',()=>{
 for(const patch of [{candidateSha256:'c'.repeat(64)},{evidence:[]}]){const rows=allPass();Object.assign(rows[0],patch);assert.throws(()=>assessRelease(candidate,rows),/E_RELEASE_UNBOUND_PASS/);}
 assert.throws(()=>assessRelease(candidate,[...allPass(),allPass()[0]]),/E_RELEASE_CHECK/);
 assert.throws(()=>assessRelease(candidate,[{...allPass()[0],id:'AC-999'}]),/E_RELEASE_CHECK/);
});
test('policy catalog covers every performance/quality/run/UX gate in the committed decision',()=>{
 const source=readFileSync('docs/planning/05-release-gates.md','utf8');const ids=[...source.matchAll(/\| ((?:PERF|RUN|DATA|ART|OUT|UX)-[A-Z0-9]+)/g)].map(m=>m[1]);
 assert.ok(ids.length>25);for(const id of ids)assert.ok(requiredChecks.includes(id),id);assert.throws(()=>requiredChecks.pop(),TypeError);
});
test('normal incident intake requires consent and excludes nested secrets, names, media and paths',()=>{
 const secret='C:\\Users\\private\\face.png?token=secret';
 assert.deepEqual(incidentIntake({consent:false,error:secret}),{accepted:false,reason:'NO_CONSENT'});
 const r=incidentIntake({consent:true,id:'INC30-001',appVersion:'0.22.0',route:'parts',stage:'camera',symptom:'no-face',origin:'consented-user-report',evidenceLevel:'self-report',errorCode:'E_CAMERA_READ',name:secret,error:secret,frame:secret,pcm:[1,2],token:secret,severity:'P3',environment:{os:'windows11',arch:'x64',osBuild:'10.0.26300',gpu:'nvidia',camera:'uvc',deviceId:secret,driver:secret,obsVersion:'33.0.1',externalVersion:secret}});
 assert.equal(r.severity,'P1');assert.equal(r.environment.obsVersion,'33.0.1');assert.ok(!JSON.stringify(r).includes(secret));assert.equal(r.automaticUpload,false);assert.equal(r.rawMediaStored,false);
});
test('data loss and privacy always escalate to P0; raw error strings are not accepted codes',()=>{
 for(const symptom of ['data-loss','privacy-exposure']){const r=incidentIntake({consent:true,id:'INC30-002',route:'application',stage:'security',symptom,origin:'developer-observation',evidenceLevel:'direct-observation',errorCode:'Error: C:/Users/test/token'});assert.equal(r.severity,'P0');assert.equal(r.errorCode,undefined);}
});
test('an incident cannot skip verification, docs, actual distribution or closure confirmation',()=>{
 let r=incidentIntake({consent:true,id:'INC30-003',route:'application',stage:'save',symptom:'cannot-save',origin:'developer-observation',evidenceLevel:'automated'});
 assert.throws(()=>transitionIncident(r,'CLOSED'),/E_INCIDENT_TRANSITION/);r=transitionIncident(r,'TRIAGED');r=transitionIncident(r,'REPRODUCING');
 assert.throws(()=>transitionIncident(r,'FIX_VERIFIED',{reproduction:'yes',affectedRoutes:true,regression:true}),/E_INCIDENT_UNVERIFIED_FIX/);
 r=transitionIncident(r,'FIX_VERIFIED',{reproduction:true,affectedRoutes:true,regression:true});assert.throws(()=>transitionIncident(r,'RELEASE_REVIEW'),/E_INCIDENT_RELEASE_DOCS/);
 r=transitionIncident(r,'RELEASE_REVIEW',{releaseNotes:true,recoveryInstructions:true});assert.throws(()=>transitionIncident(r,'RELEASED',{releaseDecision:'HOLD',distributionPerformed:true}),/E_INCIDENT_NOT_RELEASED/);
 r=transitionIncident(r,'RELEASED',{releaseDecision:'READY_FOR_REVIEW',distributionPerformed:true});assert.throws(()=>transitionIncident(r,'CLOSED'),/E_INCIDENT_CLOSURE/);r=transitionIncident(r,'CLOSED',{userOrReproductionConfirmed:true});assert.equal(r.state,'CLOSED');
});
test('actual project reader preserves current, future minor and rejected future major inputs',()=>{
 const {createProject,readProject}=createRequire(import.meta.url)('../.local/test-js/packages/project-model/index.js');const p=createProject('Compatibility fixture','parts');
 const original=JSON.stringify(p);assert.equal(readProject(p).mode,'read-write');assert.equal(JSON.stringify(p),original);
 const minor=structuredClone(p);minor.schemaVersion.minor++;const savedMinor=JSON.stringify(minor);assert.equal(readProject(minor).mode,'read-only');assert.equal(JSON.stringify(minor),savedMinor);
 const major=structuredClone(p);major.schemaVersion.major++;const savedMajor=JSON.stringify(major);assert.throws(()=>readProject(major),/E_SCHEMA_MAJOR/);assert.equal(JSON.stringify(major),savedMajor);
});
test('evidence references reject personal/absolute paths and traversal',()=>{
 for(const path of ['C:/Users/private/report.json','evidence/../secret','/evidence/a.json','evidence//a.json','evidence/a?token=x'])assert.equal(evidencePath(path),false);
 assert.equal(evidencePath('evidence/phase30/run-01/package.json'),true);
});
