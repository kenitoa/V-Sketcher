import { app, BrowserWindow, ipcMain, protocol, session, screen } from 'electron';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, resolve, relative, isAbsolute, extname } from 'node:path';
import { WorkerClient } from './worker-client';
import { DiagnosticLog } from '../../packages/diagnostics';
import type { BuildProfile, StudioInfo } from '../../packages/contracts';

protocol.registerSchemesAsPrivileged([{ scheme: 'sketcher', privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true } }]);
const argument = (name: string): string | undefined => process.argv.find(v => v.startsWith(`--${name}=`))?.slice(name.length + 3);
const reportPath = argument('self-check-report');
const profileDir = argument('profile-dir');
if (profileDir) app.setPath('userData', resolve(profileDir));
app.setAppUserModelId('local.2dsketcher.studio'); app.setName('2DSketcher');
let worker: WorkerClient | undefined;
let log: DiagnosticLog;
let quitting = false;

app.on('before-quit', event => {
  if (!quitting && worker) {
    event.preventDefault(); quitting = true;
    void worker.stop().finally(() => { log.write('app-stop'); app.exit(); });
  }
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
  const trusted = (event: Electron.IpcMainInvokeEvent): void => {
    if (event.sender !== window.webContents || event.senderFrame !== window.webContents.mainFrame || !event.senderFrame.url.startsWith('sketcher://app/')) throw new Error('E_IPC_ORIGIN');
  };
  const info: StudioInfo = { name: '2DSketcher', version: build.version, channel: build.channel, features: { creation: false, tracking: false, preview: true } };
  ipcMain.handle('studio:info', event => { trusted(event); return info; });
  ipcMain.handle('studio:health', async event => { trusted(event); await workerReady; return { ready }; });
  if (!reportPath) window.once('ready-to-show', () => window.show());
  await window.loadURL('sketcher://app/index.html');
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
      await worker.stop(); worker = undefined;
      passed = renderer.webgl2 === true && Number(renderer.visiblePixels) > 1000 && Number(renderer.transparentPixels) > 1000 && renderer.glError === 0 && renderer.nodeExposed === false && renderer.shellExposed === false && renderer.appInfoDialog === true && (renderer.modelPixels as { passed?:boolean } | undefined)?.passed === true && (renderer.workflowCore as { passed?:boolean } | undefined)?.passed === true && (renderer.workflowUI as { passed?:boolean } | undefined)?.passed === true && renderer.sampleRuntimeFrozen === true && health.modelLoaded === true && (!app.isPackaged || health.dependencyFilesInsideBundle === true);
      const report = { passed, packaged: app.isPackaged, channel: build.channel, appVersion: build.version,
        electron: process.versions.electron, node: process.versions.node, worker: health, workerStopped: true, renderer,
        protections: { sandbox: true, contextIsolation: true, nodeIntegration: false, externalNetworkBlocked: true },
        gpuFeatureStatus: app.getGPUFeatureStatus(), devicesOpened: false,
        scope: 'Foundation startup/render/bundled worker/shutdown only; no creation, live tracking, clean-OS or M0 performance claim' };
      await mkdir(resolve(reportPath, '..'), { recursive: true }); await writeFile(reportPath, JSON.stringify(report, null, 2) + '\n');
    } catch (error) {
      if (worker) { await worker.stop(); worker = undefined; }
      const detail = error instanceof Error ? error.message.match(/\bE_[A-Z_]{1,48}\b/)?.[0] : undefined;
      await mkdir(resolve(reportPath, '..'), { recursive: true }); await writeFile(reportPath, JSON.stringify({ passed: false, code: 'E_FOUNDATION_CHECK', stage, detail, packaged: app.isPackaged }) + '\n');
    }
    log.write('app-stop'); quitting = true; app.exit(passed ? 0 : 1);
  }
}).catch(() => { if (log) log.write('worker-error', { code: 'E_APP_START' }); app.exit(1); });
