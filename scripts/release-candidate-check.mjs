import {mkdirSync,existsSync,readFileSync,writeFileSync,createReadStream,statSync,openSync,readSync,writeSync,closeSync} from 'node:fs';
import {resolve,join,relative} from 'node:path';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {extractFile} from '@electron/asar';
import {extractNew,inventory} from '../tools/portable-lifecycle.mjs';
const out=resolve(process.argv[2]);assert.ok(!existsSync(out),'E_RELEASE_OUTPUT_EXISTS');mkdirSync(out,{recursive:true});
const load=p=>JSON.parse(readFileSync(p,'utf8')),hash=b=>createHash('sha256').update(b).digest('hex');
async function fileHash(path){const h=createHash('sha256');for await(const b of createReadStream(path))h.update(b);return h.digest('hex');}
const previous=load('evidence/phase29/run-05/review.json'),version=load('package.json').version,zip=resolve(previous.zip.path);assert.equal(previous.appVersion,version);assert.equal(await fileHash(zip),previous.zip.sha256,'E_RELEASE_CANDIDATE_DRIFT');
const target=resolve('.local/release30-'+Date.now(),'한글 경로 with spaces');mkdirSync(target,{recursive:true});
const extracted=await extractNew(zip,target,'candidate-'+version),bundle=extracted.folder,archive=join(bundle,'resources/app.asar');
assert.equal(load(join(bundle,'resources/release/support.json')).app,version);assert.equal(JSON.parse(extractFile(archive,'package.json')).version,version);assert.equal(JSON.parse(extractFile(archive,'dist/runtime-config.json')).channel,'release');
const componentPaths=['2DSketcher.exe','resources/app.asar','resources/worker/worker.exe','resources/release/support.json','resources/release/USER-GUIDE.md','resources/notices/dependency-inventory.json','resources/notices/model-source.json'];
const components=[];for(const path of componentPaths)components.push({path,bytes:statSync(join(bundle,path)).size,sha256:await fileHash(join(bundle,path))});
// A failed update is never used as the active app, and never merges into an existing version folder.
const before=inventory(bundle);const invalid=join(target,'invalid.zip');writeFileSync(invalid,'not a ZIP');await assert.rejects(()=>extractNew(invalid,target,'failed-update'));await assert.rejects(()=>extractNew(zip,target,'candidate-'+version),/E_PORTABLE_TARGET/);assert.deepEqual(inventory(bundle),before);
// Detect an actual byte change in the isolated candidate, then restore the original byte before launching it.
const fd=openSync(archive,'r+'),first=Buffer.alloc(1);readSync(fd,first,0,1,0);try{writeSync(fd,Buffer.from([first[0]^255]),0,1,0);assert.notEqual(await fileHash(archive),components.find(c=>c.path==='resources/app.asar').sha256);}finally{writeSync(fd,first,0,1,0);closeSync(fd);}assert.deepEqual(inventory(bundle),before);
const system=process.env.SystemRoot??'C:\\Windows',env=Object.fromEntries(Object.entries(process.env).filter(([k])=>!/^(PYTHON|NODE|NPM|ELECTRON|VIRTUAL_ENV|CONDA|VSCODE)/i.test(k)));env.PATH=join(system,'System32');for(const name of ['node','npm','python','py'])assert.notEqual(spawnSync(join(system,'System32/where.exe'),[name],{cwd:target,env,windowsHide:true}).status,0);
const modes=[['full',[]],['image',['--file-output-only=true']],['avatar',['--avatar-export-only=true']],['broadcast',['--broadcast-only=true']]];
const reports=[];
for(const [name,mode]of modes){
 const report=join(target,name+'.json'),profile=join(target,'profile-'+name),evidence=join(target,'ui-'+name);mkdirSync(profile);mkdirSync(evidence);
 const args=[...mode,'--profile-dir='+profile,'--self-check-report='+report];
 if(name==='image')args.push('--file-output-evidence='+evidence);
 if(name==='avatar')args.push('--avatar-export-evidence='+evidence);
 if(name==='broadcast')args.push('--broadcast-evidence='+evidence);
 const result=spawnSync(join(bundle,'2DSketcher.exe'),args,{cwd:target,env,windowsHide:true,encoding:'utf8',timeout:1200000,maxBuffer:8*1024*1024});writeFileSync(join(target,name+'.log'),(result.stdout??'')+(result.stderr??''));
 assert.ok(!result.error,'E_RELEASE_LAUNCH');const data=load(report);assert.equal(result.status,0,'E_RELEASE_'+name.toUpperCase());assert.equal(data.passed,true);assert.equal(data.appVersion,version);assert.equal(data.packaged,true);assert.equal(data.channel,'release');assert.equal(data.worker.frozen,true);assert.equal(data.workerStopped,true);assert.equal(data.worker.dependencyFilesInsideBundle,true);assert.deepEqual(data.protections,{sandbox:true,contextIsolation:true,nodeIntegration:false,externalNetworkBlocked:true});
 writeFileSync(join(out,name+'.json'),JSON.stringify(data,null,2)+'\n');reports.push({name,passed:true});
}
assert.deepEqual(inventory(bundle),before);assert.equal(await fileHash(zip),previous.zip.sha256);
const candidate={version,sha256:previous.zip.sha256,bytes:statSync(zip).size,path:relative(process.cwd(),zip).replaceAll('\\','/'),components};
writeFileSync(join(out,'candidate.json'),JSON.stringify({candidate,reports,invalidArchiveRejected:true,existingVersionOverwriteRejected:true,modifiedAsarDetectedAndRestored:true,originalCandidatePreserved:true,developerToolsOnPath:false,cleanWindowsOS:false,signed:false,releaseDecision:'HOLD',finalReleaseCandidateApproved:false,publicDistributionApproved:false},null,2)+'\n');console.log('Fixed local candidate rechecked; release approval remains HOLD.');
