import {build} from 'vite';
import {readFileSync,writeFileSync,mkdirSync,cpSync,existsSync,renameSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {spawn,spawnSync} from 'node:child_process';
import {randomUUID,createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {electronPath} from './common.mjs';
import {OBSClient} from '../tools/obs-client.mjs';
const out=resolve(process.argv[2]);assert.ok(!existsSync(out),'E_REMEDIATION_EXISTS');mkdirSync(out,{recursive:true});
const work=resolve('.local/remediation-linear-'+Date.now()),bridge=join(work,'bridge'),avatar=join(out,'avatar');mkdirSync(bridge,{recursive:true});mkdirSync(avatar);
const load=p=>JSON.parse(readFileSync(p,'utf8')),hash=data=>createHash('sha256').update(data).digest('hex'),pause=ms=>new Promise(r=>setTimeout(r,ms));
await build({configFile:false,publicDir:false,logLevel:'silent',build:{outDir:join(work,'lib'),emptyOutDir:false,lib:{entry:resolve('tools/remediation-reference.ts'),formats:['iife'],name:'RemediationRef',fileName:()=> 'reference.js'}}});
const previous=load('.local/phase27-target-state.json'),secret=load(join(previous.directory,'secret.json')),obsRoot=join(work,'obs');cpSync(join(previous.directory,'obs'),obsRoot,{recursive:true,force:false,errorOnExist:true});
const exe=join(obsRoot,'bin/64bit/obs64.exe'),env={...process.env};delete env.ELECTRON_RUN_AS_NODE;
const obsChild=spawn(exe,['--portable','--disable-updater','--minimize-to-tray'],{cwd:join(obsRoot,'bin/64bit'),env,windowsHide:true,stdio:'ignore'});
const appReport=join(out,'app.json'),appChild=spawn(electronPath(),['tools/remediation-flow-main.cjs','--broadcast-only=true','--profile-dir='+join(work,'profile'),'--self-check-report='+appReport,'--broadcast-evidence='+join(work,'broadcast'),'--broadcast-obs-bridge='+bridge,'--linear-output='+avatar,'--linear-library='+join(work,'lib/reference.js')],{env,windowsHide:true,stdio:'ignore'});
writeFileSync(join(work,'state.json'),JSON.stringify({work,appPid:appChild.pid,obsPid:obsChild.pid}));
let obs,stage='ready';const rows=[];
const wait=async(file,predicate=()=>true)=>{const end=Date.now()+600000;while(Date.now()<end){if(appChild.exitCode!==null)throw Error('E_LINEAR_APP_EXIT');try{if(existsSync(file)){const value=load(file);if(predicate(value))return value;}}catch(e){if(e.message==='E_LINEAR_APP_EXIT')throw e;}await pause(100);}throw Error('E_LINEAR_TIMEOUT');};
const command=async(action,value)=>{const id=randomUUID();writeFileSync(join(bridge,'command.tmp'),JSON.stringify({id,action,value}));renameSync(join(bridge,'command.tmp'),join(bridge,'command.json'));const reply=await wait(join(bridge,'reply-'+id+'.json'));assert.ok(reply.ok,'E_LINEAR_BRIDGE');return reply.result;};
try{
 for(let n=0;n<90;n++){try{obs=await OBSClient.connect(secret);break;}catch{if(obsChild.exitCode!==null)throw Error('E_LINEAR_OBS_START');await pause(500);}}assert.ok(obs,'E_LINEAR_OBS_CONNECT');
 for(let n=0;;n++){try{assert.equal((await obs.request('GetVersion')).obsVersion,'33.0.1');assert.equal((await obs.request('GetStreamStatus')).outputActive,false);assert.equal((await obs.request('GetRecordStatus')).outputActive,false);break;}catch(e){if(e.message!=='E_OBS_REQUEST_207'||n>=59)throw e;await pause(500);}}
 const owner=spawnSync('powershell.exe',['-NoProfile','-Command',`(Get-NetTCPConnection -State Listen -LocalPort ${secret.port}).OwningProcess | Select-Object -Unique`],{encoding:'utf8',windowsHide:true,timeout:15000});assert.equal(Number(owner.stdout.trim()),obsChild.pid,'E_LINEAR_OBS_OWNER');
 await wait(join(bridge,'ready.json'));const scene='Remediation linear '+Date.now(),input=scene+' avatar';await obs.request('CreateScene',{sceneName:scene});await obs.request('SetCurrentProgramScene',{sceneName:scene});await obs.request('CreateInput',{sceneName:scene,inputName:input,inputKind:'browser_source',inputSettings:{url:load(join(bridge,'connection.json')).url,width:1920,height:1080,fps:30,reroute_audio:false},sceneItemEnabled:true});
 for(const route of ['parts','single-image','split-image'])for(const version of [1,2]){
  stage=route+'-v'+version;const id=randomUUID();writeFileSync(join(bridge,'linear.tmp'),JSON.stringify({id,route,version}));renameSync(join(bridge,'linear.tmp'),join(bridge,'linear-request.json'));const reply=await wait(join(bridge,'linear-reply.json'),v=>v.id===id);assert.ok(reply.passed,reply.code??'E_LINEAR_ROUTE');
  const result=load(join(avatar,route+'-v'+version+'.json')),images=[];
  const readyUntil=Date.now()+60000;let readyState;for(;;){readyState=await command('step','state');if(readyState?.output?.health==='RENDERING'&&readyState.output.sourceRevision===result.runRevision&&!readyState.hidden)break;if(Date.now()>readyUntil)throw Error('E_LINEAR_SOURCE_NOT_READY');await pause(250);}await pause(3000);
  for(const pose of ['neutral','expression','motion']){
   await command('step',pose);await pause(900);let bytes,pixels;const until=Date.now()+15000;
   for(;;){bytes=await obs.screenshot(input);const check=spawnSync(resolve('.venv-product/Scripts/python.exe'),['-I','tools/remediation-png-check.py'],{input:bytes,encoding:'utf8',windowsHide:true,timeout:10000});assert.equal(check.status,0,'E_LINEAR_PNG_CHECK');pixels=JSON.parse(check.stdout);if(pixels.passed)break;if(Date.now()>until)throw Error('E_LINEAR_EMPTY_OBS');await pause(500);}
   const name=route+'-v'+version+'-'+pose+'-obs.png';writeFileSync(join(out,name),bytes);images.push({pose,file:name,sha256:hash(bytes),pixels,sourceReadyBeforeCapture:true,sourceRevision:readyState.output.sourceRevision});
  }
  assert.equal(new Set(images.map(v=>v.sha256)).size,3,'E_LINEAR_OBS_RESPONSE');rows.push({...result,images:undefined,obsImages:images,officialOBS:true});writeFileSync(join(out,'progress.json'),JSON.stringify({stage,completed:rows.length}));console.log('Same project saved/reopened, PNG/INP exported and OBS received '+stage);
 }
 const files=rows.map(row=>row.file),references=rows.flatMap(row=>load(join(avatar,row.route+'-v'+row.version+'.json')).images);
 const result={passed:true,scope:'same-project automated production-code paths, actual OBS, independent target tested after app exit; no live-participant acceptance',rows,physicalDevicesOpened:false,streamingStarted:false,recordingStarted:false,existingUserScenesModified:false,m0:'HOLD'};
 writeFileSync(join(bridge,'result.json'),JSON.stringify(result));const exit=new Promise(r=>appChild.once('exit',r));await command('quit');assert.equal(await exit,0,'E_LINEAR_SHUTDOWN');
 writeFileSync(join(avatar,'report.json'),JSON.stringify({passed:true,workerStopped:true,avatarExport:{files,images:references},appVersion:load('package.json').version},null,2)+'\n');
 writeFileSync(join(avatar,'runner.json'),JSON.stringify({appProcessExited:true,exitCode:0,workerStopped:true,reportSha256:hash(readFileSync(join(avatar,'report.json')))}));
 obs.close();obs=null;stage='independent-target';const secretFile=join(work,'secret.json');writeFileSync(secretFile,JSON.stringify(secret));
 const independent=spawnSync(process.execPath,['tools/avatar-external-check.mjs','--report='+join(avatar,'report.json'),'--images-dir='+avatar,'--work-dir='+join(work,'external'),'--output-dir='+join(out,'external'),'--target-root='+resolve('.local/phase25-target-02/session'),'--secret='+secretFile],{env,windowsHide:true,stdio:['ignore','pipe','pipe'],encoding:'utf8',timeout:600000,maxBuffer:8*1024*1024});writeFileSync(join(work,'external.log'),(independent.stdout??'')+(independent.stderr??''));assert.equal(independent.status,0,'E_LINEAR_EXTERNAL');
 const external=load(join(out,'external/external-run.json'));assert.ok(external.passed&&external.runs.length===6);
 for(const route of ['parts','single-image','split-image']){const pair=rows.filter(row=>row.route===route);assert.equal(pair[0].projectId,pair[1].projectId);assert.notEqual(pair[0].file.sha256,pair[1].file.sha256);assert.notEqual(pair[0].png.sha256,pair[1].png.sha256);assert.ok(pair[1].olderResultsStale);}
 writeFileSync(join(out,'linear.json'),JSON.stringify({...result,independentTarget:external,sameProjectForBothVersions:true,allSourceRevisionsCorrelated:true,normalCameraAndMicrophoneAcceptance:false,noviceObservation:false},null,2)+'\n');console.log('Six same-project end-to-end runs and six independent target runs passed.');
}catch(error){writeFileSync(join(out,'failure.json'),JSON.stringify({passed:false,stage,code:error.message.match(/E_[A-Z0-9_]+/)?.[0]??'E_LINEAR_CHECK',errorClass:['TypeError','SyntaxError','AssertionError','Error'].includes(error.name)?error.name:'Error',completed:rows.length},null,2)+'\n');console.error('E_REMEDIATION_LINEAR');process.exitCode=1;}finally{
 obs?.close();
 if(appChild.exitCode===null&&existsSync(join(bridge,'ready.json'))){
  writeFileSync(join(bridge,'result.json'),JSON.stringify({passed:false,code:'E_LINEAR_ABORTED'}));const exit=new Promise(r=>appChild.once('exit',r));const id=randomUUID();writeFileSync(join(bridge,'command.json'),JSON.stringify({id,action:'quit'}));await Promise.race([exit,pause(30000)]);
 }
 if(appChild.exitCode===null)appChild.kill();if(obsChild.exitCode===null)obsChild.kill();
}
