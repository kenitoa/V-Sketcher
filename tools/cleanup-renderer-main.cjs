const { app, BrowserWindow, protocol, session } = require('electron');
const fs = require('node:fs/promises'),
  path = require('node:path');
const arg = (k) => process.argv.find((v) => v.startsWith('--' + k + '='))?.slice(k.length + 3);
const content = path.resolve(arg('content')),
  output = path.resolve(arg('output')),
  variant = arg('variant');
if (!['before', 'after'].includes(variant)) throw Error('E_BENCH_VARIANT');
app.setPath('userData', path.resolve(arg('profile')));
protocol.registerSchemesAsPrivileged([
  { scheme: 'cleanup', privileges: { standard: true, secure: true, supportFetchAPI: true } },
]);
app.whenReady().then(async () => {
  let window;
  try {
    session.defaultSession.setPermissionCheckHandler(() => false);
    session.defaultSession.setPermissionRequestHandler((_w, _p, done) => done(false));
    session.defaultSession.webRequest.onBeforeRequest((q, done) =>
      done({ cancel: !q.url.startsWith('cleanup://app/') }),
    );
    protocol.handle('cleanup', async (request) => {
      const url = new URL(request.url),
        file = path.resolve(content, decodeURIComponent(url.pathname).slice(1));
      if (url.hostname !== 'app' || !file.startsWith(content + path.sep))
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
            'Cache-Control': 'no-store',
          },
        });
      } catch {
        return new Response('', { status: 404 });
      }
    });
    window = new BrowserWindow({
      width: 1200,
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
    await window.loadURL('cleanup://app/tools/cleanup-renderer-bench.html?variant=' + variant);
    await window.webContents.executeJavaScript(
      'new Promise((resolve,reject)=>{const end=Date.now()+30000;const timer=setInterval(()=>{if(window.cleanupBench){clearInterval(timer);resolve(true);}else if(Date.now()>end){clearInterval(timer);reject(new Error("E_BENCH_MODULE"));}},50);})',
    );
    const result = await window.webContents.executeJavaScript('window.cleanupBench');
    if (result.neutralPNG) {
      if (arg('save-image') === 'true')
        await fs.writeFile(
          path.join(output, variant + '-neutral.png'),
          Buffer.from(result.neutralPNG.split(',')[1], 'base64'),
        );
      delete result.neutralPNG;
    }
    const metrics = app.getAppMetrics();
    result.processWorkingSets = metrics.map((p) => ({
      type: p.type,
      workingSetKiB: p.memory.workingSetSize,
      peakWorkingSetKiB: p.memory.peakWorkingSetSize,
    }));
    result.memorySamplePhase = 'active-renderer-before-disposal';
    await window.webContents.executeJavaScript('window.cleanupDispose(); true');
    result.protections = {
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false,
      networkBlocked: true,
    };
    await fs.writeFile(path.join(output, 'result.json'), JSON.stringify(result, null, 2) + '\n', {
      flag: 'wx',
    });
    window.destroy();
    app.exit(result.passed ? 0 : 1);
  } catch (error) {
    await fs.writeFile(
      path.join(output, 'failure.json'),
      JSON.stringify({
        passed: false,
        code: error.message.match(/E_[A-Z_]+/)?.[0] ?? 'E_BENCH_MAIN',
      }) + '\n',
      { flag: 'wx' },
    );
    window?.destroy();
    app.exit(1);
  }
});
