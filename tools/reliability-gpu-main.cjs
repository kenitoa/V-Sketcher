const { app, BrowserWindow, protocol, session } = require('electron');
const { readFile, writeFile } = require('node:fs/promises');
const { resolve, sep, extname } = require('node:path');
const arg = (k) => process.argv.find((v) => v.startsWith('--' + k + '='))?.slice(k.length + 3),
  root = resolve(arg('content')),
  out = resolve(arg('report'));
app.setPath('userData', resolve(arg('profile')));
protocol.registerSchemesAsPrivileged([
  { scheme: 'reliability', privileges: { standard: true, secure: true, supportFetchAPI: true } },
]);
app.whenReady().then(async () => {
  let window,
    stage = 'setup';
  try {
    session.defaultSession.setPermissionRequestHandler((_w, _p, cb) => cb(false));
    session.defaultSession.setPermissionCheckHandler(() => false);
    session.defaultSession.webRequest.onBeforeRequest({ urls: ['<all_urls>'] }, (d, cb) =>
      cb({ cancel: !d.url.startsWith('reliability://app/') }),
    );
    protocol.handle('reliability', async (q) => {
      const u = new URL(q.url),
        file = resolve(root, decodeURIComponent(u.pathname).slice(1));
      if (u.hostname !== 'app' || !file.startsWith(root + sep))
        return new Response('', { status: 403 });
      try {
        return new Response(await readFile(file), {
          headers: {
            'Content-Type':
              {
                '.html': 'text/html',
                '.js': 'text/javascript',
                '.json': 'application/json',
                '.png': 'image/png',
              }[extname(file)] ?? 'application/octet-stream',
            'Cache-Control': 'no-store',
          },
        });
      } catch {
        return new Response('', { status: 404 });
      }
    });
    window = new BrowserWindow({
      width: 1280,
      height: 800,
      show: false,
      webPreferences: {
        sandbox: true,
        contextIsolation: true,
        nodeIntegration: false,
        webSecurity: true,
        backgroundThrottling: false,
      },
    });
    stage = 'load';
    await window.loadURL('reliability://app/tools/reliability-gpu.html');
    stage = 'execute';
    await window.webContents.executeJavaScript(
      'new Promise((resolve,reject)=>{const end=Date.now()+15000;const timer=setInterval(()=>{if(window.reliabilityGPU){clearInterval(timer);resolve(true);}else if(Date.now()>end){clearInterval(timer);reject(new Error("E_GPU_MODULE"));}},50);})',
    );
    const data = await window.webContents.executeJavaScript('window.reliabilityGPU');
    await writeFile(
      out,
      JSON.stringify(
        {
          ...data,
          gpuFeatures: app.getGPUFeatureStatus(),
          protections: {
            sandbox: true,
            contextIsolation: true,
            nodeIntegration: false,
            networkBlocked: true,
          },
        },
        null,
        2,
      ) + '\n',
    );
    app.exit(0);
  } catch (error) {
    await writeFile(
      out,
      JSON.stringify({
        passed: false,
        code: error.message.match(/E_[A-Z_]+/)?.[0] ?? 'E_RELIABILITY_GPU',
        stage,
        errorKind: error.name,
      }) + '\n',
    );
    app.exit(1);
  }
});
