const {app,BrowserWindow,session}=require('electron');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),crypto=require('node:crypto'),{spawn,spawnSync}=require('node:child_process');
const arg=k=>process.argv.find(v=>v.startsWith('--'+k+'='))?.slice(k.length+3),root=path.resolve(__dirname,'..'),work=path.resolve(arg('work')),model=path.resolve(arg('model')),mode=arg('mode')??'auto',evidence=path.resolve(arg('evidence'));
fs.mkdirSync(work,{recursive:true});fs.mkdirSync(evidence,{recursive:true});fs.mkdirSync(path.join(work,'profile-'+mode),{recursive:true});app.setPath('userData',path.join(work,'profile-'+mode));
const token=crypto.randomBytes(20).toString('hex'),defaults={width:1,depth:.18,upper:1,tint:0};let controls={...defaults},pose={yaw:0,roll:0,mouth:0,blinkLeft:0,blinkRight:0},live=null,summary=null,stopFile=null,exportCount=0,server,window;
const bodyChannels=['chest','leftUpperArm','leftLowerArm','rightUpperArm','rightLowerArm'];
function fail(code){fs.writeFileSync(path.join(evidence,'failure.json'),JSON.stringify({passed:false,code,mode})+'\n');app.exit(1);}
process.on('uncaughtException',()=>fail('E_3D_MAIN_EXCEPTION'));process.on('unhandledRejection',()=>fail('E_3D_MAIN_PROMISE'));
function json(res,status,value){res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(value));}
function valid(c){return c&&Object.keys(c).length===4&&Object.entries({width:[.8,1.2],depth:[.08,.3],upper:[.85,1.2],tint:[0,1]}).every(([k,[lo,hi]])=>Number.isFinite(c[k])&&c[k]>=lo&&c[k]<=hi);}
const privateState=()=>{const dest=path.join(work,'live-state.json');fs.writeFileSync(dest+'.tmp',JSON.stringify({live:!!live,summary,pose:live?{seconds:pose.seconds,faces:pose.faces,bodyObserved:pose.bodyObserved}:null}));fs.renameSync(dest+'.tmp',dest);};
async function stopLive(){if(live&&stopFile)fs.writeFileSync(stopFile,'stop');}
function startLive(){
 if(live)return;stopFile=path.join(work,'stop-'+Date.now());summary=null;
 const child=spawn(path.join(root,'.venv-product/Scripts/python.exe'),['-I',path.join(root,'tools/three-d-live.py'),'--stop-file='+stopFile],{windowsHide:true,stdio:['ignore','pipe','pipe']});live=child;let text='';
 child.stderr.on('data',()=>{});
 child.stdout.on('data',chunk=>{text+=chunk;if(text.length>32000){child.kill();return;}for(;;){const at=text.indexOf('\n');if(at<0)break;const line=text.slice(0,at);text=text.slice(at+1);try{
  const v=JSON.parse(line);if(v.type==='pose'){const p={};for(const k of ['yaw','roll','mouth','blinkLeft','blinkRight','faces','seconds','rms',...bodyChannels])if(Number.isFinite(v[k]))p[k]=v[k];p.bodyObserved=Object.fromEntries(bodyChannels.map(k=>[k,v.bodyObserved?.[k]===true]));pose={...pose,...p};}
  else if(v.type==='summary'){summary=v;fs.writeFileSync(path.join(evidence,'live-summary.json'),JSON.stringify(v,null,2)+'\n');}privateState();
 }catch{}}});
 child.on('exit',()=>{live=null;pose={yaw:0,roll:0,mouth:0,blinkLeft:0,blinkRight:0};if(!summary){summary={passed:false,code:'E_3D_LIVE_EXIT',resourcesReleased:false,framesStored:false,pcmStored:false};fs.writeFileSync(path.join(evidence,'live-summary.json'),JSON.stringify(summary,null,2)+'\n');}privateState();});
 child.on('error',()=>{live=null;summary={passed:false,code:'E_3D_LIVE_START',framesStored:false,pcmStored:false};privateState();});
}
app.whenReady().then(async()=>{
 server=http.createServer(async(req,res)=>{try{const u=new URL(req.url,'http://127.0.0.1');if(!u.pathname.startsWith('/'+token+'/'))return json(res,404,{code:'E_3D_ROUTE'});const rel=u.pathname.slice(token.length+2);
  if(rel==='api/state')return json(res,200,{controls,pose,live:!!live,summary});
  if(rel.startsWith('api/')&&req.method==='POST'){
   const origin=req.headers.origin;if(origin&&origin!=='http://127.0.0.1:'+server.address().port)return json(res,403,{code:'E_3D_ORIGIN'});let body='';for await(const chunk of req){body+=chunk;if(body.length>2048)return json(res,413,{code:'E_3D_BYTES'});}const value=JSON.parse(body||'{}');
   if(rel==='api/controls'){if(!valid(value))return json(res,400,{code:'E_3D_CONTROLS'});controls=value;return json(res,200,{ok:true});}
   if(rel==='api/pose'){for(const k of ['yaw','roll','mouth','blinkLeft','blinkRight',...bodyChannels])if(Number.isFinite(value[k]))pose[k]=Math.max(k==='yaw'||k==='roll'||bodyChannels.includes(k)?-1.2:0,Math.min(1.2,value[k]));return json(res,200,{ok:true});}
   if(rel==='api/live-start'){if(mode!=='live')return json(res,403,{code:'E_3D_LIVE_EXPLICIT'});startLive();return json(res,200,{ok:true});}
   if(rel==='api/live-stop'){await stopLive();return json(res,200,{ok:true});}
   if(rel==='api/export'){if(!valid(value))return json(res,400,{code:'E_3D_CONTROLS'});const dest=path.join(work,'corrected-'+(++exportCount));const r=spawnSync(path.join(root,'.venv-product/Scripts/python.exe'),['-I',path.join(root,'tools/three-d-build.py'),'--source='+arg('source'),'--output='+dest,...Object.entries(value).map(([k,v])=>'--'+k+'='+v)],{windowsHide:true,encoding:'utf8',timeout:30000});if(r.status!==0)return json(res,500,{code:'E_3D_EXPORT'});fs.writeFileSync(path.join(work,'corrected-path.json'),JSON.stringify({directory:dest,controls:value}));return json(res,200,{ok:true,name:path.basename(dest)});}
   return json(res,404,{code:'E_3D_ACTION'});
  }
  if(rel==='index'){const html=fs.readFileSync(path.join(root,'tools/three-d-viewer.html'),'utf8').replaceAll('__BASE__','/'+token+'/');res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});return res.end(html);}
  let file;
  if(rel==='model.glb'||rel==='model.vrm')file=path.join(model,rel);
  else if(rel.startsWith('vendor/three/')){const base=path.join(root,'.local/research31/node_modules/three');file=path.resolve(base,decodeURIComponent(rel.slice(13)));if(!file.startsWith(base+path.sep))throw Error();}
  else if(rel==='vendor/vrm/lib/three-vrm.module.js')file=path.join(root,'.local/research31/node_modules/@pixiv/three-vrm/lib/three-vrm.module.js');
  else return json(res,404,{code:'E_3D_FILE'});
  const bytes=fs.readFileSync(file);res.writeHead(200,{'Content-Type':file.endsWith('.js')?'text/javascript':'model/gltf-binary','Cache-Control':'no-store'});res.end(bytes);
 }catch{if(!res.headersSent)json(res,500,{code:'E_3D_REQUEST'});else res.end();}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port,base=origin+'/'+token+'/';
 session.defaultSession.setPermissionRequestHandler((_a,_b,callback)=>callback(false));session.defaultSession.setPermissionCheckHandler(()=>false);session.defaultSession.webRequest.onBeforeRequest({urls:['<all_urls>']},(d,cb)=>cb({cancel:!(d.url.startsWith(base)||d.url.startsWith('blob:'+origin)||d.url.startsWith('data:'))}));
 window=new BrowserWindow({title:mode==='live'?'3D 가능성 검증 — 실제 장치 시험':'3D 가능성 검증',width:1320,height:920,show:mode==='live',webPreferences:{sandbox:true,contextIsolation:true,nodeIntegration:false,webSecurity:true,backgroundThrottling:false}});window.webContents.setWindowOpenHandler(()=>({action:'deny'}));
 fs.writeFileSync(path.join(work,'connection.json'),JSON.stringify({outputURL:base+'index?output=1',url:base+'index',port:server.address().port}));
 await window.loadURL(base+'index'+(mode==='target'?'?target=1':mode==='auto'?'?auto=1':''));window.showInactive();
 await window.webContents.executeJavaScript(`new Promise((resolve,reject)=>{const end=Date.now()+45000;const t=setInterval(()=>{if(window.phase31?.ready()){clearInterval(t);resolve(true);}else if(window.phase31?.error()||Date.now()>end){clearInterval(t);reject(Error('E_3D_RENDER_READY'));}},50);})`);
 if(mode==='live'){window.show();window.focus();privateState();return;}
 const shots=[];async function shot(name){await window.webContents.executeJavaScript('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))');const data=await window.webContents.executeJavaScript('window.phase31.snapshot()');const bytes=Buffer.from(data.split(',')[1],'base64');fs.writeFileSync(path.join(evidence,name+'.png'),bytes);shots.push({name,sha256:crypto.createHash('sha256').update(bytes).digest('hex')});}
 for(const view of ['front','side','rear','threequarter']){await window.webContents.executeJavaScript(`window.phase31.view('${view}')`);await shot(mode+'-'+view);}
 await window.webContents.executeJavaScript("window.phase31.view('front')");for(const [name,value]of Object.entries({head:{yaw:.45},blink:{blinkLeft:1,blinkRight:1},mouth:{mouth:1},neutral:{}})){await window.webContents.executeJavaScript('window.phase31.pose('+JSON.stringify(value)+')');await shot(mode+'-'+name);}
 const motionProof=[];for(const name of bodyChannels){const proof=await window.webContents.executeJavaScript('window.phase31.motionProbe('+JSON.stringify(name)+')');motionProof.push(proof);await window.webContents.executeJavaScript('window.phase31.pose('+JSON.stringify({[name]:.5})+')');await shot(mode+'-'+name);}await window.webContents.executeJavaScript('window.phase31.pose({})');
 const bodyWeightsVerified=motionProof.every(p=>p.maxDisplacementByDominantBone[p.name]>.015)&&motionProof.filter(p=>p.name!=='chest').every(p=>{const other=p.name.startsWith('left')?'rightUpperArm':'leftUpperArm';return p.maxDisplacementByDominantBone[other]<.00001&&p.maxDisplacementByDominantBone.head<.00001;});
 let controlsVerified=false,exportVerified=false,syntheticInputResetVerified=false;
 if(mode==='auto'){
  // Transport regression only: no device process exists. Exercise real HTTP polling and stop-to-neutral rendering.
  live={researchSynthetic:true};pose={yaw:.4,roll:0,mouth:0,blinkLeft:0,blinkRight:0,leftUpperArm:.4};await new Promise(r=>setTimeout(r,400));await shot('auto-synthetic-input');
  live=null;pose={yaw:0,roll:0,mouth:0,blinkLeft:0,blinkRight:0};await new Promise(r=>setTimeout(r,400));await shot('auto-synthetic-stopped');
  syntheticInputResetVerified=shots.find(s=>s.name==='auto-synthetic-stopped').sha256===shots.find(s=>s.name==='auto-neutral').sha256&&shots.find(s=>s.name==='auto-synthetic-input').sha256!==shots.find(s=>s.name==='auto-neutral').sha256;
  await window.webContents.executeJavaScript(`(async()=>{const input=document.querySelector('[data-control=depth]');input.value=.28;input.dispatchEvent(new Event('input',{bubbles:true}));await new Promise(r=>setTimeout(r,100));document.querySelector('[data-control=upper]').value=1.15;document.querySelector('[data-control=upper]').dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('[data-control=tint]').value=.8;document.querySelector('[data-control=tint]').dispatchEvent(new Event('input',{bubbles:true}));})();`);await shot('auto-corrected');const changed=await window.webContents.executeJavaScript('window.phase31.report()');controlsVerified=changed.controls.depth===.28&&changed.controls.upper===1.15&&changed.controls.tint===.8;
  await window.webContents.executeJavaScript("document.querySelector('[data-export]').click()");const until=Date.now()+30000;while(!fs.existsSync(path.join(work,'corrected-path.json'))&&Date.now()<until)await new Promise(r=>setTimeout(r,100));exportVerified=fs.existsSync(path.join(work,'corrected-path.json'));await window.webContents.executeJavaScript("document.querySelector('[data-reset]').click()");await shot('auto-reset');
 }
 const report=await window.webContents.executeJavaScript('window.phase31.report()');const passed=report.loaded&&report.depth>.1&&report.boneCount>=19&&bodyWeightsVerified&&report.morphCounts.every(n=>n===3)&&report.glError===0&&new Set(shots.map(s=>s.sha256)).size>=6&&(mode!=='auto'||controlsVerified&&exportVerified&&syntheticInputResetVerified);
 fs.writeFileSync(path.join(evidence,mode+'-report.json'),JSON.stringify({passed,mode,...report,bodyWeightsVerified,motionProof,controlsVerified,exportVerified,syntheticInputResetVerified,shots,physicalDevicesOpened:false,protections:{sandbox:true,contextIsolation:true,nodeIntegration:false,externalNetworkBlocked:true},productionQualityAcceptance:false},null,2)+'\n');server.close();app.exit(passed?0:1);
}).catch(error=>{fs.writeFileSync(path.join(evidence,'failure.json'),JSON.stringify({passed:false,code:error.message.match(/E_[A-Z0-9_]+/)?.[0]??'E_3D_VIEWER',mode}));server?.close();app.exit(1);});
app.on('window-all-closed',async()=>{await stopLive();if(live){await new Promise(r=>setTimeout(r,1200));if(live)live.kill();}server?.close();app.exit(0);});
