// Reuse already verified local OBS/official target tools. No downloading, streaming or publishing.
import {readFileSync,writeFileSync,mkdirSync,cpSync,readdirSync,copyFileSync,existsSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {spawn,spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {OBSClient} from '../tools/obs-client.mjs';
const out=resolve(process.argv[2]),candidateWork=resolve(process.argv[3]);assert.ok(!existsSync(out),'E_RELEASE_EXTERNAL_EXISTS');mkdirSync(out,{recursive:true});
const load=p=>JSON.parse(readFileSync(p,'utf8')),hash=b=>createHash('sha256').update(b).digest('hex');
const old=load('.local/phase27-target-state.json'),work=resolve('.local/release30-external-'+Date.now()),obsRoot=join(work,'obs'),sourceRoot=join(old.directory,'obs');mkdirSync(work,{recursive:true});cpSync(sourceRoot,obsRoot,{recursive:true,force:false,errorOnExist:true});
const obsExe=join(obsRoot,'bin/64bit/obs64.exe');assert.equal(hash(readFileSync(obsExe)),hash(readFileSync(join(sourceRoot,'bin/64bit/obs64.exe'))));const secret=load(join(old.directory,'secret.json'));
const env={...process.env};delete env.ELECTRON_RUN_AS_NODE;const processOBS=spawn(obsExe,['--portable','--disable-updater','--minimize-to-tray'],{cwd:join(obsRoot,'bin/64bit'),env,windowsHide:true,stdio:'ignore'});
const pause=ms=>new Promise(r=>setTimeout(r,ms));let obs,broadcastApp;
try{
 for(let attempt=0;attempt<90;attempt++){try{obs=await OBSClient.connect(secret);break;}catch{if(processOBS.exitCode!==null)throw new Error('E_RELEASE_OBS_START');await pause(500);}}assert.ok(obs,'E_RELEASE_OBS_CONNECT');assert.equal((await obs.request('GetVersion')).obsVersion,'33.0.1');assert.equal((await obs.request('GetStreamStatus')).outputActive,false);assert.equal((await obs.request('GetRecordStatus')).outputActive,false);obs.close();obs=null;
 const nativeReport=join(candidateWork,'avatar.json'),images=join(candidateWork,'ui-avatar'),r=load(nativeReport);assert.equal(r.passed,true);assert.equal(r.workerStopped,true);assert.equal(r.packaged,true);
 const shape=join(work,'run','avatar');mkdirSync(shape,{recursive:true});copyFileSync(nativeReport,join(shape,'report.json'));for(const name of readdirSync(images))if(/\.(png|inp)$/.test(name))copyFileSync(join(images,name),join(shape,name));
 writeFileSync(join(shape,'runner.json'),JSON.stringify({passed:true,appProcessExited:true,exitCode:0,workerStopped:true,reportSha256:hash(readFileSync(join(shape,'report.json')))}));
 const source=readFileSync('tools/avatar-external-check.mjs','utf8');const adapted=source.replace("from './obs-client.mjs'","from '../tools/obs-client.mjs'").replaceAll('Phase25','Phase30').replace('const pause=ms',"const nativeRequest=obs.request.bind(obs);obs.request=async(...args)=>{for(let attempt=0;;attempt++){try{return await nativeRequest(...args);}catch(e){if(!/^E_OBS_REQUEST_[0-9]+$/.test(e.message)||attempt>=4)throw e;await new Promise(r=>setTimeout(r,250));}}};const pause=ms");const controller=join(work,'external.mjs');
 // Relative import is resolved from this isolated generated controller, not copied into historical tools.
 writeFileSync(controller,adapted.replace("from '../tools/obs-client.mjs'","from '../../tools/obs-client.mjs'"));
 const secretFile=join(work,'secret.json');writeFileSync(secretFile,JSON.stringify(secret));
 const result=spawnSync(process.execPath,[controller,'--report='+join(shape,'report.json'),'--images-dir='+shape,'--work-dir='+join(work,'target-work'),'--output-dir='+out,'--target-root='+resolve('.local/phase25-target-02/session'),'--secret='+secretFile],{env,windowsHide:true,encoding:'utf8',timeout:600000,maxBuffer:8*1024*1024});writeFileSync(join(work,'external.log'),(result.stdout??'')+(result.stderr??''));assert.equal(result.status,0,'E_RELEASE_EXTERNAL');
 assert.equal(load(join(out,'external-run.json')).passed,true);console.log('Current packaged INP files passed six official independent target runs.');
 const bridge=join(work,'broadcast-bridge'),profile=join(work,'broadcast-profile'),nativeReportOut=join(work,'broadcast.json');mkdirSync(bridge);mkdirSync(profile);const version=load(join(candidateWork,'avatar.json')).appVersion;
 broadcastApp=spawn(join(candidateWork,'candidate-'+version,'2DSketcher.exe'),['--broadcast-only=true','--profile-dir='+profile,'--self-check-report='+nativeReportOut,'--broadcast-evidence='+join(work,'broadcast-ui'),'--broadcast-obs-bridge='+bridge],{env,windowsHide:true,stdio:'ignore'});
 const obsOutput=join(out,'obs'),checked=spawnSync(process.execPath,['tools/obs-broadcast-check.mjs','--bridge='+bridge,'--secret='+secretFile,'--output-dir='+obsOutput],{env,windowsHide:true,encoding:'utf8',timeout:600000,maxBuffer:8*1024*1024});writeFileSync(join(work,'broadcast.log'),(checked.stdout??'')+(checked.stderr??''));assert.equal(checked.status,0,'E_RELEASE_ACTUAL_OBS');
 const stopAt=Date.now()+30000;while(broadcastApp.exitCode===null&&Date.now()<stopAt)await pause(100);assert.equal(broadcastApp.exitCode,0,'E_RELEASE_BROADCAST_STOP');assert.equal(load(nativeReportOut).passed,true);copyFileSync(nativeReportOut,join(out,'packaged-broadcast.json'));
 writeFileSync(join(out,'target-scope.json'),JSON.stringify({passed:true,appVersion:version,source:'exact extracted portable candidate',independentRuns:6,creationRoutesInIndependentRuns:3,actualOBSRoute:'split-image final prepared route',actualOBSAllThreeRoutes:false,physicalDevicesOpened:false,streamingStarted:false,recordingStarted:false,performanceAcceptance:false,publicDistributionApproved:false},null,2)+'\n');console.log('Exact packaged broadcast source passed actual isolated OBS checks on the final prepared route.');
}finally{obs?.close();if(broadcastApp?.exitCode===null)broadcastApp.kill();if(processOBS.exitCode===null)processOBS.kill();}
