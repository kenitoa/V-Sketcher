import { app, BrowserWindow, ipcMain, protocol, session, screen, dialog } from 'electron';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, resolve, relative, isAbsolute, extname } from 'node:path';
import { WorkerClient } from './worker-client';
import { DiagnosticLog } from '../../packages/diagnostics';
import type { BuildProfile, StudioInfo } from '../../packages/contracts';
import { ProjectSession, type ProjectDialogs } from '../../packages/project-session';
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
  const testSaves = reportPath ? ['project-a.2dsketch','project-b.2dsketch','project-premium.2dsketch','project-other.2dsketch','project-copy.2dsketch','project-recovered.2dsketch'].map(name => join(app.getPath('userData'),name)) : [];
  let testLeave:'cancel' | 'discard' = 'cancel';
  const dialogs:ProjectDialogs = {
    openProject:async () => { if (reportPath) return join(app.getPath('userData'),'project-a.2dsketch'); const result = await dialog.showOpenDialog(window,{ title:'프로젝트 열기',properties:['openFile'],filters:[{ name:'2DSketcher 프로젝트',extensions:['2dsketch'] }] }); return result.canceled ? null : result.filePaths[0] ?? null; },
    saveProject:async suggested => { if (reportPath) return testSaves.shift() ?? null; const safeName = suggested.replace(/[<>:"/\\|?*\u0000-\u001f]/g,'_'); const result = await dialog.showSaveDialog(window,{ title:'프로젝트 저장',defaultPath:safeName,filters:[{ name:'2DSketcher 프로젝트',extensions:['2dsketch'] }] }); return result.canceled ? null : result.filePath ?? null; },
    relinkImage:async () => { const result = await dialog.showOpenDialog(window,{ title:'같은 원본 이미지 다시 연결',properties:['openFile'],filters:[{ name:'이미지',extensions:['png','jpg','jpeg'] }] }); return result.canceled ? null : result.filePaths[0] ?? null; },
    unsaved:async name => { if (reportPath) return testLeave; const result = await dialog.showMessageBox(window,{ type:'question',title:'저장하지 않은 변경',message:`“${name}”의 변경 내용을 저장할까요?`,detail:'자동 복구본은 명시적으로 저장한 프로젝트 파일과 별도로 보관됩니다.',buttons:['저장','저장하지 않고 나가기','계속 편집'],defaultId:0,cancelId:2,noLink:true }); return (['save','discard','cancel'] as const)[result.response] ?? 'cancel'; }
  };
  const bundled = readProject(await readFile(join(rendererRoot,'assets/preview-project.json'),'utf8')); if (bundled.mode !== 'read-write') throw new Error('E_BUNDLED_PROJECT');
  const bundledBytes = new Map<string,Buffer>(); for (const asset of bundled.project.assets) bundledBytes.set(asset.id,await readFile(join(rendererRoot,'assets/preview',asset.fingerprint.sha256+'.png')));
  projectSession = new ProjectSession({ dataDir:app.getPath('userData'),dialogs,bundled:bundled.project,bundledBytes }); await projectSession.init();
  projectSession.subscribe(() => { if (!window.isDestroyed()) window.webContents.send('projects:changed',projectSession!.view()); });
  const trusted = (event: Electron.IpcMainInvokeEvent): void => {
    if (event.sender !== window.webContents || event.senderFrame !== window.webContents.mainFrame || !event.senderFrame.url.startsWith('sketcher://app/')) throw new Error('E_IPC_ORIGIN');
  };
  const info: StudioInfo = { name: '2DSketcher', version: build.version, channel: build.channel, features: { creation: false, tracking: false, preview: true, projects:true } };
  ipcMain.handle('studio:info', event => { trusted(event); return info; });
  ipcMain.handle('studio:health', async event => { trusted(event); await workerReady; return { ready }; });
  ipcMain.handle('projects:view',event => { trusted(event); return projectSession!.view(); });
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
      stage = 'project-ui';
      const projects = await window.webContents.executeJavaScript('window.projectSelfCheck()') as Record<string,unknown>;
      stage = 'editor-ui';
      if (argument('compact-editor') === 'true') { window.setSize(1080,720); await window.webContents.executeJavaScript('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))'); }
      const editor = await window.webContents.executeJavaScript('window.editorSelfCheck()') as Record<string,unknown>;
      stage = 'motion-ui'; const motion = await window.webContents.executeJavaScript('window.motionSelfCheck()') as Record<string,unknown>;
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
      await projectSession.shutdown(); await worker.stop(); worker = undefined;
      passed = renderer.webgl2 === true && Number(renderer.visiblePixels) > 1000 && Number(renderer.transparentPixels) > 1000 && renderer.glError === 0 && renderer.nodeExposed === false && renderer.shellExposed === false && renderer.appInfoDialog === true && (renderer.modelPixels as { passed?:boolean } | undefined)?.passed === true && (renderer.workflowCore as { passed?:boolean } | undefined)?.passed === true && (renderer.workflowUI as { passed?:boolean } | undefined)?.passed === true && renderer.sampleRuntimeFrozen === true && health.modelLoaded === true && (!app.isPackaged || health.dependencyFilesInsideBundle === true);
      passed = passed && projects.passed === true && editor.passed === true && motion.passed === true && (renderer.motionPixels as { passed?:boolean } | undefined)?.passed === true;
      const report = { passed, projects, editor, motion, packaged: app.isPackaged, channel: build.channel, appVersion: build.version,
        electron: process.versions.electron, node: process.versions.node, worker: health, workerStopped: true, renderer,
        protections: { sandbox: true, contextIsolation: true, nodeIntegration: false, externalNetworkBlocked: true },
        gpuFeatureStatus: app.getGPUFeatureStatus(), devicesOpened: false,
        windowSize:window.getSize(),scope: 'Local project lifecycle/common editor, GPU and bundled worker; no automatic creation, live tracking, clean-OS or M0 performance claim' };
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
