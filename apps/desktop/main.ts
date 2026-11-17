import {assertCatalog,combination,type Catalog} from '../../packages/parts-library';
import { app, BrowserWindow, ipcMain, protocol, session, screen, dialog } from 'electron';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, resolve, relative, isAbsolute, extname } from 'node:path';
import { WorkerClient } from './worker-client';
import { imageProcessor } from './image-processor';
import {splitProcessor} from './split-processor';
import {readArchive,hash as splitHash} from '../../packages/split-image/archive';
import { DiagnosticLog } from '../../packages/diagnostics';
import type { BuildProfile, StudioInfo } from '../../packages/contracts';
import { ProjectSession, type ProjectDialogs } from '../../packages/project-session';
import { projectToPreview } from '../../packages/project-model/preview';
import { readProject } from '../../packages/project-model';

protocol.registerSchemesAsPrivileged([{ scheme: 'sketcher', privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true } }]);
const argument = (name: string): string | undefined => process.argv.find(v => v.startsWith(`--${name}=`))?.slice(name.length + 3);
const reportPath = argument('self-check-report');
const profileDir = argument('profile-dir');
if (profileDir) app.setPath('userData', resolve(profileDir));
app.setAppUserModelId('local.2dsketcher.studio'); app.setName('2DSketcher');
let worker: WorkerClient | undefined;
let log: DiagnosticLog;
let quitting = false;
let projectSession:ProjectSession | undefined;
let exitPending = false;
async function requestExit():Promise<void> {
  if (exitPending || quitting) return; exitPending = true;
  try { if (projectSession && !await projectSession.requestClose()) return; await projectSession?.shutdown(); await worker?.stop(); quitting = true; log.write('app-stop'); app.exit(); }
  catch { log.write('app-error',{ code:'E_SAVE_LEAVE' }); }
  finally { exitPending = false; }
}

app.on('before-quit', event => {
  if (!quitting) { event.preventDefault(); void requestExit(); }
});
app.on('window-all-closed', () => app.quit());

app.whenReady().then(async () => {
  const root = app.getAppPath(); const rendererRoot = join(root, 'dist/renderer');
  const build = JSON.parse(await readFile(join(root, 'dist/runtime-config.json'), 'utf8')) as BuildProfile;
  log = new DiagnosticLog(join(app.getPath('userData'), 'logs')); log.write('app-start', { version: build.version, protocol: 1 });
  session.defaultSession.setPermissionRequestHandler((_contents, _permission, callback) => callback(false));
  session.defaultSession.webRequest.onBeforeRequest({ urls: ['http://*/*', 'https://*/*', 'ws://*/*', 'wss://*/*'] }, (_details, callback) => callback({ cancel: true }));
  protocol.handle('sketcher', async request => {
    try {
      const url = new URL(request.url); if (url.hostname !== 'app' || request.method !== 'GET') return new Response(null, { status: 403 });
      const part = decodeURIComponent(url.pathname).slice(1) || 'index.html';
      if (part.includes('\\') || part.includes('\0') || part.split('/').includes('..')) return new Response(null, { status: 403 });
      const resource = /^assets\/session\/([a-z0-9-]+)\/([a-f0-9]{64}\.(png|jpg))$/.exec(part);
      if (resource) { const bytes = await projectSession?.resource(resource[1]!,resource[2]!); return bytes ? new Response(new Uint8Array(bytes),{ headers:{ 'Content-Type':resource[3] === 'png' ? 'image/png' : 'image/jpeg','Cache-Control':'no-store' } }) : new Response(null,{ status:404 }); }
      const file = resolve(rendererRoot, part); const inside = relative(rendererRoot, file);
      if (inside.startsWith('..') || isAbsolute(inside)) return new Response(null, { status: 403 });
      const type: Record<string, string> = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml' };
      const content = await readFile(file);
      return new Response(content, { headers: { 'Content-Type': type[extname(file)] ?? 'application/octet-stream', 'Cache-Control': 'no-store' } });
    } catch { return new Response(null, { status: 404 }); }
  });
  const env: NodeJS.ProcessEnv = { ...process.env, MPLBACKEND: 'Agg', MPLCONFIGDIR: join(app.getPath('userData'), 'worker-cache') };
  for (const key of ['PYTHONHOME', 'PYTHONPATH', 'PYTHONSTARTUP', 'ELECTRON_RUN_AS_NODE']) delete env[key];
  const executable = app.isPackaged ? join(process.resourcesPath, 'worker/worker.exe') : join(root, '.venv-product/Scripts/python.exe');
  worker = new WorkerClient(executable, app.isPackaged ? [] : ['-I', '-u', join(root, 'worker/main.py')], env, log);
  let ready = false; const workerReady = worker.request('ping').then(() => { ready = true; log.write('worker-ready'); }).catch(() => log.write('worker-error', { code: 'E_WORKER_START' }));
  const workArea = screen.getPrimaryDisplay().workAreaSize;
  const window = new BrowserWindow({ width: Math.min(1380, workArea.width - 48), height: Math.min(900, workArea.height - 48),
    minWidth: 1080, minHeight: 720, show: false, backgroundColor: '#f5f2ed', autoHideMenuBar: true,
    title: '2DSketcher Studio', webPreferences: { preload: join(__dirname, 'preload.js'), sandbox: true, contextIsolation: true,
      nodeIntegration: false, webSecurity: true, devTools: build.channel !== 'release', backgroundThrottling: !reportPath } });
  window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  window.webContents.on('will-navigate', event => event.preventDefault());
  window.on('close',event => { if (!quitting) { event.preventDefault(); void requestExit(); } });
  const testSaves = reportPath ? ['project-a.2dsketch','project-b.2dsketch','project-premium.2dsketch','project-other.2dsketch','project-copy.2dsketch','project-recovered.2dsketch','input-project.2dsketch','parts-project.2dsketch','parts-copy.2dsketch','structure-project.2dsketch','structure-copy.2dsketch','corrected-project.2dsketch','corrected-copy.2dsketch','split-project.2dsketch','split-copy.2dsketch','split-folder.2dsketch'].map(name => join(app.getPath('userData'),name)) : [];
  let testLeave:'cancel' | 'discard' = 'cancel';
  const dialogs:ProjectDialogs = {
    chooseDetailTexture:async()=>{if(reportPath)return join(app.getPath('userData'),'input-check.png');const picked=await dialog.showOpenDialog(window,{title:'부위 그림 교체 · PNG',properties:['openFile'],filters:[{name:'PNG RGB/RGBA 8bit',extensions:['png']}]});return picked.canceled?null:picked.filePaths[0]??null;},
    chooseSplit:async kind=>{if(reportPath)return join(app.getPath('userData'),kind==='folder'?'split-input':'split-input.2dparts');const picked=await dialog.showOpenDialog(window,{title:kind==='folder'?'분리 PNG 폴더':'분리 그림 묶음',properties:kind==='folder'?['openDirectory']:['openFile'],...(kind==='2dparts'?{filters:[{name:'분리 PNG 묶음',extensions:['2dparts']}]}:{})});return picked.canceled?null:picked.filePaths[0]??null;},
    saveSplit:async suggested=>{if(reportPath)return join(app.getPath('userData'),'split-output.2dparts');const picked=await dialog.showSaveDialog(window,{title:'분리 PNG 자료 묶음 저장',defaultPath:suggested.replace(/[<>:"/\\|?*\u0000-\u001f]/g,'_'),filters:[{name:'분리 PNG 묶음',extensions:['2dparts']}]});return picked.canceled?null:picked.filePath??null;},
    chooseImage:async () => { if(reportPath)return join(app.getPath('userData'),'input-check.png');const result=await dialog.showOpenDialog(window,{ title:'캐릭터 그림 가져오기 · PNG/JPEG',properties:['openFile'],filters:[{ name:'RGB/RGBA 8bit · 256~4096px · 최대 64MiB',extensions:['png','jpg','jpeg'] }] });return result.canceled ? null : result.filePaths[0] ?? null; },
    openProject:async () => { if (reportPath) return join(app.getPath('userData'),'project-a.2dsketch'); const result = await dialog.showOpenDialog(window,{ title:'프로젝트 열기',properties:['openFile'],filters:[{ name:'2DSketcher 프로젝트',extensions:['2dsketch'] }] }); return result.canceled ? null : result.filePaths[0] ?? null; },
    saveProject:async suggested => { if (reportPath) return testSaves.shift() ?? null; const safeName = suggested.replace(/[<>:"/\\|?*\u0000-\u001f]/g,'_'); const result = await dialog.showSaveDialog(window,{ title:'프로젝트 저장',defaultPath:safeName,filters:[{ name:'2DSketcher 프로젝트',extensions:['2dsketch'] }] }); return result.canceled ? null : result.filePath ?? null; },
    relinkImage:async () => { const result = await dialog.showOpenDialog(window,{ title:'같은 원본 이미지 다시 연결',properties:['openFile'],filters:[{ name:'이미지',extensions:['png','jpg','jpeg'] }] }); return result.canceled ? null : result.filePaths[0] ?? null; },
    unsaved:async name => { if (reportPath) return testLeave; const result = await dialog.showMessageBox(window,{ type:'question',title:'저장하지 않은 변경',message:`“${name}”의 변경 내용을 저장할까요?`,detail:'자동 복구본은 명시적으로 저장한 프로젝트 파일과 별도로 보관됩니다.',buttons:['저장','저장하지 않고 나가기','계속 편집'],defaultId:0,cancelId:2,noLink:true }); return (['save','discard','cancel'] as const)[result.response] ?? 'cancel'; }
  };
  const bundled = readProject(await readFile(join(rendererRoot,'assets/preview-project.json'),'utf8')); if (bundled.mode !== 'read-write') throw new Error('E_BUNDLED_PROJECT');
  const bundledBytes = new Map<string,Buffer>(); for (const asset of bundled.project.assets) bundledBytes.set(asset.id,await readFile(join(rendererRoot,'assets/preview',asset.fingerprint.sha256+'.png')));
  if(reportPath)await writeFile(join(app.getPath('userData'),'input-check.png'),bundledBytes.get(bundled.project.inputAssetIds[0]!)!);
  const catalog=JSON.parse(await readFile(join(rendererRoot,'assets/parts/catalog.json'),'utf8')) as Catalog;assertCatalog(catalog);const partBytes=new Map<string,Buffer>();const partFiles=new Map<string,Buffer>();for(const a of catalog.assets){let bytes=partFiles.get(a.fingerprint.sha256);if(!bytes){bytes=await readFile(join(rendererRoot,'assets',catalog.files[a.fingerprint.sha256]!));partFiles.set(a.fingerprint.sha256,bytes);}partBytes.set(a.id,bytes);}
  const splitExample=await readFile(join(rendererRoot,'assets/split/premium-example.2dparts'));const splitRegistry=JSON.parse(await readFile(join(rendererRoot,'assets/split/manifest.json'),'utf8'));if(splitHash(splitExample)!==splitRegistry.sha256)throw new Error('E_SPLIT_EXAMPLE_HASH');
  if(reportPath){await writeFile(join(app.getPath('userData'),'split-input.2dparts'),splitExample);const sample=await readArchive(splitExample),folder=join(app.getPath('userData'),'split-input');await mkdir(folder,{recursive:true});for(let i=0;i<sample.layers.length;i++)await writeFile(join(folder,'fragment-'+String(i).padStart(2,'0')+'.png'),sample.files.get(sample.layers[i]!.path)!);await writeFile(join(folder,'README.txt'),'Source metadata intentionally absent; confirm layout and roles.');}
  projectSession = new ProjectSession({ splitExample,splitProcessor:splitProcessor(executable,app.isPackaged?[]:['-I','-u',join(root,'worker/main.py')],join(app.getPath('userData'),'split-work'),env),parts:{catalog,bytes:partBytes},dataDir:app.getPath('userData'),dialogs,bundled:bundled.project,bundledBytes,inputProcessor:imageProcessor(executable,app.isPackaged ? [] : ['-I','-u',join(root,'worker/main.py')],join(app.getPath('userData'),'input-work'),env) }); await projectSession.init();
  projectSession.subscribe(() => { if (!window.isDestroyed()) window.webContents.send('projects:changed',projectSession!.view()); });
  const trusted = (event: Electron.IpcMainInvokeEvent): void => {
    if (event.sender !== window.webContents || event.senderFrame !== window.webContents.mainFrame || !event.senderFrame.url.startsWith('sketcher://app/')) throw new Error('E_IPC_ORIGIN');
  };
  const info: StudioInfo = { name: '2DSketcher', version: build.version, channel: build.channel, features: { creation: false, tracking: false, preview: true, projects:true } };
  ipcMain.handle('studio:info', event => { trusted(event); return info; });
  ipcMain.handle('studio:health', async event => { trusted(event); await workerReady; return { ready }; });
  ipcMain.handle('projects:view',event => { trusted(event); return projectSession!.view(); });
  ipcMain.handle('projects:drop-image',(event,file:unknown) => { trusted(event);if(typeof file!=='string' || file.length>32768 || !isAbsolute(file) || file.startsWith('\\\\'))throw new Error('E_INPUT_NATIVE_FILE');return projectSession!.dropImage(file); });
  ipcMain.handle('projects:command',async (event,command:unknown) => { trusted(event); return projectSession!.dispatch(command); });
  if (!reportPath) window.once('ready-to-show', () => window.show());
  await window.loadURL('sketcher://app/index.html');
  if (reportPath) window.showInactive();
  if (reportPath) {
    let passed = false;
    let stage = 'worker';
    try {
      await workerReady;
      const health = await worker.request('validate-runtime');
      stage = 'renderer-ready';
      await window.webContents.executeJavaScript(`new Promise((resolve,reject)=>{const start=Date.now();const timer=setInterval(()=>{if(typeof window.foundationSelfCheck==='function'){clearInterval(timer);resolve(true)}else if(Date.now()-start>30000){clearInterval(timer);reject(new Error('E_RENDER_TIMEOUT'))}},50)})`);
      stage = 'renderer-check';
      const renderer = await window.webContents.executeJavaScript('window.foundationSelfCheck()') as Record<string, unknown>;
      const checkSplit=async()=>{testLeave='discard';stage='split-ui';const source=await readArchive(splitExample);const rows=source.layers.map((l,i)=>({name:'fragment-'+String(i).padStart(2,'0')+'.png',sourceId:l.id,origin:l.origin,role:l.role,side:l.side,z:l.z,visible:l.visible,opacity:l.opacity,usage:l.usage,variantOf:l.variantOf,state:l.state}));const split=await window.webContents.executeJavaScript('window.splitSelfCheck('+JSON.stringify(rows)+')') as Record<string,unknown>;const screenshot=argument('split-screenshot');if(screenshot){await mkdir(resolve(screenshot,'..'),{recursive:true});await writeFile(screenshot,(await window.webContents.capturePage()).toPNG());}const extremes=argument('split-extremes');if(extremes){const data=await window.webContents.executeJavaScript('window.splitExtremeData') as string;await mkdir(resolve(extremes,'..'),{recursive:true});await writeFile(extremes,Buffer.from(data.split(',')[1]!,'base64'));}await window.webContents.executeJavaScript("document.querySelector('[data-split-close]').click()");await window.webContents.executeJavaScript("window.studio.projects.command({type:'split-cancel'})");return split;};
      const checkDetail=async()=>{stage='detail-ui';testLeave='discard';testSaves.splice(0,testSaves.length,...['detail-parts.2dsketch','detail-parts-copy.2dsketch','detail-single.2dsketch','detail-single-copy.2dsketch','detail-split.2dsketch','detail-split-copy.2dsketch'].map(name=>join(app.getPath('userData'),name)));const detail=await window.webContents.executeJavaScript('window.detailSelfCheck()') as Record<string,unknown>;const screenshot=argument('detail-screenshot');if(screenshot){await mkdir(resolve(screenshot,'..'),{recursive:true});await writeFile(screenshot,(await window.webContents.capturePage()).toPNG());}const extremes=argument('detail-extremes');if(extremes){const data=await window.webContents.executeJavaScript('window.detailExtremeData') as string;await mkdir(resolve(extremes,'..'),{recursive:true});await writeFile(extremes,Buffer.from(data.split(',')[1]!,'base64'));}await window.webContents.executeJavaScript("document.querySelector('[data-detail-close]').click()");await window.webContents.executeJavaScript("window.studio.projects.command({type:'detail-cancel'})");return detail;};
      if(argument('detail-only')==='true'){
        if(argument('compact-editor')==='true')window.setSize(1080,720);const detail=await checkDetail();await projectSession.shutdown();await worker.stop();worker=undefined;passed=detail.passed===true&&renderer.webgl2===true&&renderer.glError===0&&renderer.nodeExposed===false&&renderer.shellExposed===false&&(renderer.modelPixels as {passed?:boolean})?.passed===true&&(renderer.workflowCore as {passed?:boolean})?.passed===true&&health.modelLoaded===true&&(!app.isPackaged||health.dependencyFilesInsideBundle===true);
        await mkdir(resolve(reportPath,'..'),{recursive:true});await writeFile(reportPath,JSON.stringify({passed,detail,renderer,worker:health,workerStopped:true,packaged:app.isPackaged,channel:build.channel,appVersion:build.version,windowSize:window.getSize(),devicesOpened:false,protections:{sandbox:true,contextIsolation:true,nodeIntegration:false,externalNetworkBlocked:true},priorRouteUI:'NOT_RUN',scope:'Targeted detailed editor on three actual creation routes, PNG replacement worker, GPU, save/reopen plus foundation core; prior feature UI is NOT_RUN in this scope; same PC, no clean OS, M2 exit or M0 claim'},null,2)+'\n');log.write('app-stop');quitting=true;app.exit(passed?0:1);return;
      }
      if(argument('split-only')==='true'){
        if(argument('compact-editor')==='true')window.setSize(1080,720);const split=await checkSplit();await projectSession.shutdown();await worker.stop();worker=undefined;passed=split.passed===true&&renderer.webgl2===true&&renderer.glError===0&&renderer.nodeExposed===false&&renderer.shellExposed===false&&(renderer.modelPixels as {passed?:boolean})?.passed===true&&(renderer.workflowCore as {passed?:boolean})?.passed===true&&health.modelLoaded===true&&(!app.isPackaged||health.dependencyFilesInsideBundle===true);
        await mkdir(resolve(reportPath,'..'),{recursive:true});await writeFile(reportPath,JSON.stringify({passed,split,renderer,worker:health,workerStopped:true,packaged:app.isPackaged,channel:build.channel,appVersion:build.version,windowSize:window.getSize(),devicesOpened:false,protections:{sandbox:true,contextIsolation:true,nodeIntegration:false,externalNetworkBlocked:true},priorRouteUI:'NOT_RUN',scope:'Targeted split artwork UI, actual source PNG worker, GPU, save/reopen/export plus foundation core; same PC, no clean OS or M0 claim'},null,2)+'\n');log.write('app-stop');quitting=true;app.exit(passed?0:1);return;
      }
      stage = 'project-ui';
      const projects = await window.webContents.executeJavaScript('window.projectSelfCheck()') as Record<string,unknown>;
      stage = 'editor-ui';
      if (argument('compact-editor') === 'true') { window.setSize(1080,720); await window.webContents.executeJavaScript('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))'); }
      const editor = await window.webContents.executeJavaScript('window.editorSelfCheck()') as Record<string,unknown>;
      stage = 'motion-ui'; const motion = await window.webContents.executeJavaScript('window.motionSelfCheck()') as Record<string,unknown>;
      stage='input-ui';const input=await window.webContents.executeJavaScript('window.inputSelfCheck()') as Record<string,unknown>;
      stage='parts-ui';const parts=await window.webContents.executeJavaScript('window.partsSelfCheck()') as Record<string,unknown>;
      stage='parts-pixels';const scenes=Array.from({length:64},(_,i)=>projectToPreview(combination(catalog,i),a=>'assets/'+catalog.files[a.fingerprint.sha256]+'?asset='+a.id));renderer.partsPixels=await window.webContents.executeJavaScript('window.partsPixels('+JSON.stringify(scenes)+')');
      const partsContact=argument('parts-contact');if(partsContact){const data=await window.webContents.executeJavaScript('window.partsContactData') as string;await mkdir(resolve(partsContact,'..'),{recursive:true});await writeFile(partsContact,Buffer.from(data.split(',')[1]!,'base64'));}
      const partsExtremes=argument('parts-extremes');if(partsExtremes){const data=await window.webContents.executeJavaScript('window.partsExtremeData') as string;await mkdir(resolve(partsExtremes,'..'),{recursive:true});await writeFile(partsExtremes,Buffer.from(data.split(',')[1]!,'base64'));}
      stage='structure-ui';const structure=await window.webContents.executeJavaScript('window.structureSelfCheck()') as Record<string,unknown>;
      const structureScreenshot=argument('structure-screenshot');if(structureScreenshot){await mkdir(resolve(structureScreenshot,'..'),{recursive:true});await writeFile(structureScreenshot,(await window.webContents.capturePage()).toPNG());}
      const structureExtremes=argument('structure-extremes');if(structureExtremes){const data=await window.webContents.executeJavaScript('window.structureExtremeData') as string;await mkdir(resolve(structureExtremes,'..'),{recursive:true});await writeFile(structureExtremes,Buffer.from(data.split(',')[1]!,'base64'));}
      await window.webContents.executeJavaScript("window.studio.projects.command({type:'structure-cancel'})");
      stage='correction-ui';const corrections=await window.webContents.executeJavaScript('window.correctionSelfCheck()') as Record<string,unknown>;
      const correctionScreenshot=argument('correction-screenshot');if(correctionScreenshot){await mkdir(resolve(correctionScreenshot,'..'),{recursive:true});await writeFile(correctionScreenshot,(await window.webContents.capturePage()).toPNG());}
      const correctionExtremes=argument('correction-extremes');if(correctionExtremes){const data=await window.webContents.executeJavaScript('window.correctionExtremeData') as string;await mkdir(resolve(correctionExtremes,'..'),{recursive:true});await writeFile(correctionExtremes,Buffer.from(data.split(',')[1]!,'base64'));}
      await window.webContents.executeJavaScript("document.querySelector('[data-correction-close]').click()");await window.webContents.executeJavaScript("window.studio.projects.command({type:'correction-cancel'})");

      await projectSession.dispatch({ type:'new',name:'Exit guard check',sourceType:'parts' }); const guardedId = projectSession.view().project?.projectId;
      window.close(); await new Promise(resolve => setTimeout(resolve,100));
      projects.windowCloseCancelled = !window.isDestroyed() && projectSession.view().project?.projectId === guardedId;
      app.quit(); await new Promise(resolve => setTimeout(resolve,100)); projects.appQuitCancelled = !window.isDestroyed() && !quitting;
      if (!projects.windowCloseCancelled || !projects.appQuitCancelled) throw new Error('E_PROJECT_EXIT_GUARD');
      testLeave = 'discard'; await projectSession.dispatch({ type:'close' }); testLeave = 'cancel';
      const projectScreenshot = argument('project-screenshot');
      if (projectScreenshot) { await window.webContents.executeJavaScript('window.projectSelfCheckCapture()'); await window.webContents.executeJavaScript('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))'); await mkdir(resolve(projectScreenshot,'..'),{ recursive:true }); await writeFile(projectScreenshot,(await window.webContents.capturePage()).toPNG()); await window.webContents.executeJavaScript("window.studio.projects.command({type:'close'})"); }
      const editorScreenshot = argument('editor-screenshot');
      if (editorScreenshot) { await window.webContents.executeJavaScript('window.editorCapture()'); await window.webContents.executeJavaScript('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))'); await mkdir(resolve(editorScreenshot,'..'),{ recursive:true }); await writeFile(editorScreenshot,(await window.webContents.capturePage()).toPNG()); await window.webContents.executeJavaScript("window.studio.projects.command({type:'close'})"); }
      await window.webContents.executeJavaScript('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))');
      const motionScreenshot = argument('motion-screenshot');
      if (motionScreenshot) { await window.webContents.executeJavaScript('window.motionCapture()'); await window.webContents.executeJavaScript('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))'); await mkdir(resolve(motionScreenshot,'..'),{ recursive:true }); await writeFile(motionScreenshot,(await window.webContents.capturePage()).toPNG()); await window.webContents.executeJavaScript("window.studio.projects.command({type:'close'})"); }
      await window.webContents.executeJavaScript('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))');
      const inputScreenshot=argument('input-screenshot');if(inputScreenshot){await window.webContents.executeJavaScript('window.inputCapture()');await mkdir(resolve(inputScreenshot,'..'),{recursive:true});await writeFile(inputScreenshot,(await window.webContents.capturePage()).toPNG());await window.webContents.executeJavaScript("window.studio.projects.command({type:'close'})");}
      const partsScreenshot=argument('parts-screenshot');if(partsScreenshot){await window.webContents.executeJavaScript('window.partsCapture()');await mkdir(resolve(partsScreenshot,'..'),{recursive:true});await writeFile(partsScreenshot,(await window.webContents.capturePage()).toPNG());await window.webContents.executeJavaScript("window.studio.projects.command({type:'close'})");}
      await window.webContents.executeJavaScript('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))');
      stage = 'capture';
      const screenshotPath = argument('screenshot');
      if (screenshotPath) { await mkdir(resolve(screenshotPath, '..'), { recursive: true }); await writeFile(screenshotPath, (await window.webContents.capturePage()).toPNG()); }
      const workflowScreenshot = argument('workflow-screenshot');
      if (workflowScreenshot && build.channel !== 'release') {
        await window.webContents.executeJavaScript(`(async()=>{document.querySelector('[data-workflow-lab]').click();const start=Date.now();while(!window.workflowLabCheck){if(Date.now()-start>5000)throw new Error('E_WORKFLOW_UI_TIMEOUT');await new Promise(r=>setTimeout(r,10))}return window.workflowLabCheck({holdForCapture:true})})()`);
        await window.webContents.executeJavaScript(`new Promise((resolve,reject)=>{const timeout=setTimeout(()=>reject(new Error('E_CAPTURE_TIMEOUT')),3000);requestAnimationFrame(()=>requestAnimationFrame(()=>{clearTimeout(timeout);resolve(true)}))})`);
        await mkdir(resolve(workflowScreenshot,'..'),{ recursive:true }); await writeFile(workflowScreenshot,(await window.webContents.capturePage()).toPNG());
        await window.webContents.executeJavaScript(`(async()=>{document.querySelector('.workflow-lab .close').click();const start=Date.now();while(document.querySelector('.workflow-lab')){if(Date.now()-start>5000)throw new Error('E_WORKFLOW_UI_TIMEOUT');await new Promise(r=>setTimeout(r,10))}})()`);
      }
      const split=await checkSplit();const detail=await checkDetail();
      await projectSession.shutdown(); await worker.stop(); worker = undefined;
      passed = renderer.webgl2 === true && Number(renderer.visiblePixels) > 1000 && Number(renderer.transparentPixels) > 1000 && renderer.glError === 0 && renderer.nodeExposed === false && renderer.shellExposed === false && renderer.appInfoDialog === true && (renderer.modelPixels as { passed?:boolean } | undefined)?.passed === true && (renderer.workflowCore as { passed?:boolean } | undefined)?.passed === true && (renderer.workflowUI as { passed?:boolean } | undefined)?.passed === true && renderer.sampleRuntimeFrozen === true && health.modelLoaded === true && (!app.isPackaged || health.dependencyFilesInsideBundle === true);
      passed = passed && detail.passed===true && split.passed===true && corrections.passed===true && structure.passed===true && parts.passed===true && (renderer.partsPixels as {passed?:boolean}).passed===true && input.passed === true && projects.passed === true && editor.passed === true && motion.passed === true && (renderer.motionPixels as { passed?:boolean } | undefined)?.passed === true;
      const report = { passed, detail, split, projects, editor, motion, input, parts, structure, corrections, packaged: app.isPackaged, channel: build.channel, appVersion: build.version,
        electron: process.versions.electron, node: process.versions.node, worker: health, workerStopped: true, renderer,
        protections: { sandbox: true, contextIsolation: true, nodeIntegration: false, externalNetworkBlocked: true },
        gpuFeatureStatus: app.getGPUFeatureStatus(), devicesOpened: false,
        windowSize:window.getSize(),scope: 'Local project lifecycle/common editor, GPU and bundled worker; no live tracking, clean-OS or M0 performance claim' };
      await mkdir(resolve(reportPath, '..'), { recursive: true }); await writeFile(reportPath, JSON.stringify(report, null, 2) + '\n');
    } catch (error) {
      const failureCapture = argument('editor-screenshot');
      if (failureCapture && !window.isDestroyed()) { await mkdir(resolve(failureCapture,'..'),{ recursive:true }); await writeFile(failureCapture,(await window.webContents.capturePage()).toPNG()); }
      if (worker) { await worker.stop(); worker = undefined; }
      const detail = error instanceof Error ? error.message.match(/\bE_[A-Z_]{1,48}\b/)?.[0] : undefined;
      const diagnostic = await window.webContents.executeJavaScript('window.editorFailureState ?? null').catch(() => null);
      await mkdir(resolve(reportPath, '..'), { recursive: true }); await writeFile(reportPath, JSON.stringify({ passed: false, code: 'E_FOUNDATION_CHECK', stage, detail, diagnostic, packaged: app.isPackaged }) + '\n');
    }
    log.write('app-stop'); quitting = true; app.exit(passed ? 0 : 1);
  }
}).catch(() => { if (log) log.write('worker-error', { code: 'E_APP_START' }); app.exit(1); });
