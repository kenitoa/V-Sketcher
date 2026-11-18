// Local release review only. This module has no upload, signing or publishing capability.
export const statuses=Object.freeze(['PASS','FAIL','PARTIAL','NOT_RUN','BLOCKED']);
export const requiredChecks=Object.freeze([
 ...Array.from({length:15},(_,i)=>'AC-'+String(i+1).padStart(2,'0')),
 ...Array.from({length:5},(_,i)=>'M0-R0'+(i+1)),
 'PERF-01','PERF-02','PERF-03','PERF-04','PERF-05','PERF-06','PERF-07',
 'RUN-01','RUN-02','RUN-03','RUN-04','RUN-05','DATA-01',
 'ART-01','ART-02','ART-03','OUT-01','OUT-02','OUT-03',
 'UX-M0','UX-01','UX-02','UX-03','UX-04','UX-05','UX-06',
 'CLEAN-WINDOWS','SIGNATURE','DISTRIBUTION-RIGHTS','CONTROLLED-TRIAL','PREDECESSOR-29'
]);
const sha=value=>typeof value==='string'&&/^[a-f0-9]{64}$/.test(value);
const version=value=>typeof value==='string'&&/^\d+\.\d+\.\d+$/.test(value);
export function evidencePath(value){return typeof value==='string'&&/^(docs|evidence)\/[A-Za-z0-9._/-]+$/.test(value)&&!value.split('/').some(v=>!v||v==='.'||v==='..');}
export function assessRelease(candidate,checks){
 if(!version(candidate?.version)||!sha(candidate?.sha256))throw new Error('E_RELEASE_CANDIDATE');
 if(!Array.isArray(checks))throw new Error('E_RELEASE_CHECKS');const known=new Set(requiredChecks),seen=new Map();
 for(const row of checks){
  if(!row||!known.has(row.id)||seen.has(row.id)||!statuses.includes(row.status))throw new Error('E_RELEASE_CHECK');
  if(!Array.isArray(row.evidence)||row.evidence.some(e=>!evidencePath(e?.path)||!sha(e?.sha256)))throw new Error('E_RELEASE_EVIDENCE');
  if(row.status==='PASS'&&(!row.evidence.length||row.candidateSha256!==candidate.sha256))throw new Error('E_RELEASE_UNBOUND_PASS');
  seen.set(row.id,{id:row.id,status:row.status,evidence:row.evidence.map(e=>({path:e.path,sha256:e.sha256})),candidateBound:row.candidateSha256===candidate.sha256});
 }
 const results=requiredChecks.map(id=>seen.get(id)??{id,status:'NOT_RUN',evidence:[],candidateBound:false});
 const blockers=results.filter(r=>r.status!=='PASS').map(r=>r.id);
 return {candidate:{version:candidate.version,sha256:candidate.sha256},decision:blockers.length?'HOLD':'READY_FOR_REVIEW',blockers,checks:results,publicDistributionApproved:false,published:false};
}

const allowed={route:['parts','single-image','split-image','application'],stage:['install','update','create','correct','save','recover','execute','camera','microphone','broadcast','export','security','help'],symptom:['data-loss','privacy-exposure','cannot-start','cannot-save','no-face','no-audio','broadcast-empty','export-failed','performance','confusing-guidance','other'],origin:['developer-observation','consented-user-report'],evidenceLevel:['direct-observation','self-report','automated','unverified']};
export function incidentIntake(input){
 if(input?.consent!==true)return {accepted:false,reason:'NO_CONSENT'};
 const result={accepted:true};
 for(const [key,values]of Object.entries(allowed)){if(!values.includes(input[key]))throw new Error('E_INCIDENT_CATEGORY');result[key]=input[key];}
 if(typeof input.id!=='string'||!/^INC30-[0-9]{3}$/.test(input.id))throw new Error('E_INCIDENT_ID');result.id=input.id;
 if(version(input.appVersion))result.appVersion=input.appVersion;
 if(typeof input.errorCode==='string'&&/^E_[A-Z_]{1,48}$/.test(input.errorCode))result.errorCode=input.errorCode;
 result.environment={};const env=input.environment??{};
 for(const key of ['obsVersion','externalVersion'])if(version(env[key]))result.environment[key]=env[key];
 if(typeof env.osBuild==='string'&&/^\d{1,3}\.\d{1,3}\.\d{1,6}$/.test(env.osBuild))result.environment.osBuild=env.osBuild;
 for(const [key,values]of Object.entries({os:['windows11','other','unknown'],arch:['x64','arm64','unknown'],gpu:['nvidia','intel','amd','other','unknown'],camera:['uvc','virtual','other','unknown'],microphone:['headset','usb','builtin','other','unknown']}))if(values.includes(env[key]))result.environment[key]=env[key];
 const symptom=result.symptom;result.severity=['data-loss','privacy-exposure'].includes(symptom)?'P0':['cannot-start','cannot-save','no-face','broadcast-empty','export-failed'].includes(symptom)?'P1':symptom==='confusing-guidance'?'P3':'P2';
 result.state='NEW';result.automaticUpload=false;result.rawMediaStored=false;return result;
}

const nextStates={NEW:['TRIAGED'],TRIAGED:['REPRODUCING','MITIGATED'],REPRODUCING:['MITIGATED','FIX_VERIFIED'],MITIGATED:['REPRODUCING','FIX_VERIFIED'],FIX_VERIFIED:['RELEASE_REVIEW'],RELEASE_REVIEW:['RELEASED','REPRODUCING'],RELEASED:['CLOSED','REPRODUCING'],CLOSED:['REPRODUCING']};
export function transitionIncident(incident,next,proof={}){
 if(incident?.accepted!==true||!nextStates[incident.state]?.includes(next))throw new Error('E_INCIDENT_TRANSITION');
 if(next==='FIX_VERIFIED'&&(proof.reproduction!==true||proof.affectedRoutes!==true||proof.regression!==true))throw new Error('E_INCIDENT_UNVERIFIED_FIX');
 if(next==='RELEASE_REVIEW'&&(proof.releaseNotes!==true||proof.recoveryInstructions!==true))throw new Error('E_INCIDENT_RELEASE_DOCS');
 if(next==='RELEASED'&&(proof.releaseDecision!=='READY_FOR_REVIEW'||proof.distributionPerformed!==true))throw new Error('E_INCIDENT_NOT_RELEASED');
 if(next==='CLOSED'&&proof.userOrReproductionConfirmed!==true)throw new Error('E_INCIDENT_CLOSURE');
 return {...incidentIntake({...incident,consent:true}),state:next};
}
