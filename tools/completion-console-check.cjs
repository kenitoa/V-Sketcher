const {app,BrowserWindow,session}=require('electron');
const fs=require('node:fs'),path=require('node:path'),{pathToFileURL}=require('node:url');
const output=process.argv.find(v=>v.startsWith('--output='))?.slice(9);
if(!output||!path.resolve(output).startsWith(path.resolve('.local')+path.sep))throw Error('E_CONSOLE_OUTPUT');
const c={version:'0.0.0',sha256:'0'.repeat(64)};
const html=path.join(output,'Observation-test.html');
fs.writeFileSync(html,fs.readFileSync('tools/completion-console.html','utf8').replace('__CANDIDATE__',JSON.stringify(c)),{flag:'wx'});
let window;
app.whenReady().then(async()=>{
 try{
  const own=session.fromPartition('completion-console-'+Date.now());own.setPermissionCheckHandler(()=>false);own.setPermissionRequestHandler((_w,_p,done)=>done(false));
  own.webRequest.onBeforeRequest((details,done)=>done({cancel:details.url!==pathToFileURL(html).href}));
  window=new BrowserWindow({show:false,width:1100,height:920,webPreferences:{session:own,sandbox:true,contextIsolation:true,nodeIntegration:false}});
  await window.loadFile(html);
  const result=await window.webContents.executeJavaScript(`(async()=>{
   const find=id=>document.getElementById(id),pause=ms=>new Promise(r=>setTimeout(r,ms)),assert=(v,c)=>{if(!v)throw Error(c);};
   assert(find('correction').disabled,'E_CONSOLE_BEFORE_START');find('start').click();assert(record===null,'E_CONSOLE_CONSENT');
   find('consent').checked=true;find('novice').checked=true;find('origin').value='simulation';find('observer').value='developer';find('start').click();await pause(40);
   document.querySelector('[data-kind="first-motion"]').click();const first=record.events[0].elapsedMs;document.querySelector('[data-kind="first-motion"]').click();assert(record.events.length===1&&record.events[0].elapsedMs===first,'E_CONSOLE_FIRST_TIME');
   find('correction').click();find('correction').click();find('hint').click();find('proxy').click();find('segment').value='wait';find('segment').dispatchEvent(new Event('change'));await pause(40);find('segment').value='blocked';find('segment').dispatchEvent(new Event('change'));await pause(20);find('finish-blocked').click();
   assert(record.outcome==='blocked'&&record.corrections===2&&record.correctedParts===1&&record.segmentsMs.wait>0&&record.segmentsMs.blocked>0,'E_CONSOLE_SEGMENTS');
   const count=record.events.length;find('hint').click();assert(record.events.length===count&&find('hint').disabled,'E_CONSOLE_FINISHED');
   find('follow-direct').checked=true;find('follow').click();assert(record.followups.length===1&&find('window-state').textContent.includes('/14'),'E_CONSOLE_FOLLOWUP');
   const malicious={...record,participantName:'PRIVATE_CANARY'};const data=new DataTransfer();data.items.add(new File([JSON.stringify(malicious)],'test.json',{type:'application/json'}));find('load').files=data.files;find('load').dispatchEvent(new Event('change'));await pause(60);assert(find('message').textContent.startsWith('E_OBSERVATION_IMPORT')&&!document.body.textContent.includes('PRIVATE_CANARY'),'E_CONSOLE_PRIVACY');
   let blocked=false;try{await fetch('https://example.invalid/');}catch{blocked=true;}assert(blocked,'E_CONSOLE_NETWORK');
   return {passed:true,consentGuard:true,firstMilestoneImmutable:true,timerSegmentsRecorded:true,assistanceRecorded:true,finishedRecordProtected:true,followupWindowVisible:true,privateImportRejected:true,externalNetworkBlocked:true,simulation:true,realNoviceObservations:0,rawMediaCollected:false};
  })()`);
  await fs.promises.writeFile(path.join(output,'console.png'),(await window.webContents.capturePage()).toPNG(),{flag:'wx'});
  fs.writeFileSync(path.join(output,'console-check.json'),JSON.stringify(result,null,2)+'\n',{flag:'wx'});window.destroy();app.exit(0);
 }catch(error){fs.writeFileSync(path.join(output,'console-check.json'),JSON.stringify({passed:false,code:error.message.match(/E_[A-Z_]+/)?.[0]??'E_CONSOLE_CHECK',simulation:true,realNoviceObservations:0})+'\n',{flag:'wx'});window?.destroy();app.exit(1);}
});
