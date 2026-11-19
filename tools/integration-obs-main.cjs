const { app } = require('electron'),
  fs = require('node:fs'),
  path = require('node:path');
const root = path.resolve(__dirname, '..');
app.setAppPath(root);
let window,
  seen = '';
app.on('browser-window-created', (_, w) => {
  if (!window) window = w;
});
const dir = process.argv
  .find((v) => v.startsWith('--broadcast-obs-bridge='))
  .split('=')
  .slice(1)
  .join('=');
let busy = false;
const timer = setInterval(async () => {
  if (busy || !window || !fs.existsSync(path.join(dir, 'ready.json'))) return;
  const p = path.join(dir, 'route-request.json');
  if (!fs.existsSync(p)) return;
  const q = JSON.parse(fs.readFileSync(p));
  if (q.id === seen) return;
  busy = true;
  seen = q.id;
  try {
    if (!['parts', 'single-image', 'split-image'].includes(q.route)) throw Error();
    await window.webContents.executeJavaScript(
      `window.broadcastCheckStep('prepare',${JSON.stringify(q.route)})`,
    );
    fs.writeFileSync(
      path.join(dir, 'route-reply.json'),
      JSON.stringify({ id: q.id, passed: true, route: q.route }),
    );
  } catch {
    fs.writeFileSync(
      path.join(dir, 'route-reply.json'),
      JSON.stringify({ id: q.id, passed: false }),
    );
  } finally {
    busy = false;
  }
}, 100);
timer.unref();
require(path.join(root, 'dist/electron/apps/desktop/main.js'));
