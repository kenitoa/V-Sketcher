const { app, BrowserWindow, protocol, session, ipcMain } = require('electron'),
  fs = require('node:fs/promises'),
  path = require('node:path');
const arg = (k) => process.argv.find((v) => v.startsWith('--' + k + '='))?.slice(k.length + 3),
  root = path.resolve(__dirname, '..'),
  content = path.resolve(arg('content')),
  out = path.resolve(arg('report'));
const { CameraTracker } = require(path.join(root, '.local/test-js/apps/desktop/camera-tracker'));
app.setPath('userData', path.resolve(arg('profile')));
protocol.registerSchemesAsPrivileged([
  { scheme: 'mediatest', privileges: { standard: true, secure: true, supportFetchAPI: true } },
]);
let window,
  tracker,
  cameraAllowed = false,
  microphoneAllowed = false,
  backend = 'development';
const trusted = (e) => {
  if (e.sender !== window.webContents) throw Error('E_MEDIA_ORIGIN');
};
const makeTracker = () => {
  const env = { ...process.env };
  delete env.ELECTRON_RUN_AS_NODE;
  return new CameraTracker(
    backend === 'development'
      ? path.join(root, '.venv-product/Scripts/python.exe')
      : path.join(root, 'out/2DSketcher-win32-x64/resources/worker/worker.exe'),
    backend === 'development' ? ['-I', '-u', path.join(root, 'worker/main.py')] : [],
    env,
  );
};
app.whenReady().then(async () => {
  try {
    protocol.handle('mediatest', async (req) => {
      const u = new URL(req.url),
        file = path.resolve(content, decodeURIComponent(u.pathname).slice(1));
      if (u.hostname !== 'app' || !file.startsWith(content + path.sep))
        return new Response('', { status: 403 });
      try {
        return new Response(await fs.readFile(file), {
          headers: {
            'Content-Type':
              {
                '.html': 'text/html',
                '.js': 'text/javascript',
                '.json': 'application/json',
                '.png': 'image/png',
              }[path.extname(file)] ?? 'application/octet-stream',
          },
        });
      } catch {
        return new Response('', { status: 404 });
      }
    });
    session.defaultSession.webRequest.onBeforeRequest({ urls: ['<all_urls>'] }, (d, cb) =>
      cb({ cancel: !d.url.startsWith('mediatest://app/') }),
    );
    session.defaultSession.setPermissionRequestHandler((wc, permission, callback, details) =>
      callback(
        wc === window?.webContents &&
          permission === 'media' &&
          details.mediaTypes?.length > 0 &&
          details.mediaTypes.every((type) =>
            type === 'video' ? cameraAllowed : type === 'audio' ? microphoneAllowed : false,
          ),
      ),
    );
    session.defaultSession.setPermissionCheckHandler(
      (wc, permission, _origin, details) =>
        wc === window?.webContents &&
        permission === 'media' &&
        (details.mediaType === 'video'
          ? cameraAllowed
          : details.mediaType === 'audio'
            ? microphoneAllowed
            : false),
    );
    ipcMain.handle('media:backend', async (e, value) => {
      trusted(e);
      if (!['development', 'packaged'].includes(value)) throw Error('E_MEDIA_BACKEND');
      await tracker?.stop();
      backend = value;
      tracker = makeTracker();
    });
    ipcMain.handle('media:begin', async (e) => {
      trusted(e);
      cameraAllowed = true;
      tracker ??= makeTracker();
      const ok = await tracker.begin();
      return { ok, reason: tracker.startReason, errorCode: ok ? undefined : 'E_TRACKING_WORKER' };
    });
    ipcMain.handle('media:end', async (e) => {
      trusted(e);
      cameraAllowed = false;
      await tracker?.stop();
    });
    ipcMain.handle('media:frame', async (e, seq, bytes) => {
      trusted(e);
      const result = await tracker.frame(seq, bytes);
      return { ok: !!result, result };
    });
    ipcMain.handle('media:microphone', (e, value) => {
      trusted(e);
      microphoneAllowed = value === true;
      return true;
    });
    ipcMain.handle('media:sample', (e) => {
      trusted(e);
      const metrics = app.getAppMetrics();
      return {
        processes: metrics.length,
        workingSetKiB: metrics.reduce((n, p) => n + p.memory.workingSetSize, 0),
        cpuNormalizedPercent: metrics.reduce((n, p) => n + p.cpu.percentCPUUsage, 0),
      };
    });
    window = new BrowserWindow({
      width: 900,
      height: 600,
      show: false,
      webPreferences: {
        preload: path.join(root, 'tools/remediation-media-preload.cjs'),
        sandbox: true,
        contextIsolation: true,
        nodeIntegration: false,
        webSecurity: true,
        backgroundThrottling: false,
      },
    });
    window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
    await window.loadURL('mediatest://app/index.html?cycles=' + (arg('cycles') ?? '60'));
    window.showInactive();
    await window.webContents.executeJavaScript(
      'new Promise((resolve,reject)=>{const end=Date.now()+20000;const t=setInterval(()=>{if(window.remediationMedia){clearInterval(t);resolve(true);}else if(Date.now()>end){clearInterval(t);reject(Error("E_MEDIA_MODULE"));}},50);})',
    );
    const report = await window.webContents.executeJavaScript('window.remediationMedia');
    await tracker?.stop();
    await fs.writeFile(
      out,
      JSON.stringify(
        {
          ...report,
          protections: {
            sandbox: true,
            contextIsolation: true,
            nodeIntegration: false,
            externalNetworkBlocked: true,
          },
        },
        null,
        2,
      ) + '\n',
    );
    app.exit(report.passed ? 0 : 1);
  } catch {
    await tracker?.stop();
    await fs.writeFile(
      out,
      JSON.stringify({
        passed: false,
        code: 'E_MEDIA_MAIN',
        physicalCameraFramesStored: false,
        microphonePCMStored: false,
      }) + '\n',
    );
    app.exit(1);
  }
});
