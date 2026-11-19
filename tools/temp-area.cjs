// A uniquely owned system-temporary area. Cleanup never accepts an arbitrary root.
const fs = require('node:fs');
const path = require('node:path');
const { tmpdir } = require('node:os');
const { randomUUID } = require('node:crypto');

function clearChildren(directory, keep) {
  if (fs.lstatSync(directory).isSymbolicLink() || fs.realpathSync(directory) !== directory)
    throw Error('E_TEMP_ROOT');
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const child = path.join(directory, entry.name);
    if (child === keep) continue;
    if (entry.isDirectory() && !entry.isSymbolicLink()) {
      clearChildren(child);
      fs.rmdirSync(child);
    } else {
      try {
        fs.unlinkSync(child);
      } catch (error) {
        if (
          process.platform !== 'win32' ||
          error.code !== 'EPERM' ||
          entry.isSymbolicLink() ||
          fs.lstatSync(child).mode & 0o200
        )
          throw error;
        fs.chmodSync(child, 0o600);
        fs.unlinkSync(child);
      }
    }
  }
}

function createTempArea(label = 'test') {
  if (!/^[a-z][a-z0-9-]{0,40}$/.test(label)) throw Error('E_TEMP_LABEL');
  const parent = fs.realpathSync(tmpdir());
  const root = fs.mkdtempSync(path.join(parent, '2dsketcher-' + label + '-'));
  const marker = path.join(root, '.owned-area.json');
  const token = randomUUID();
  fs.writeFileSync(marker, JSON.stringify({ format: '2dsketcher-temp/1', token }), { flag: 'wx' });
  let disposed = false;
  return Object.freeze({
    path(relative = '') {
      if (disposed) throw Error('E_TEMP_DISPOSED');
      const target = path.resolve(root, relative);
      const part = path.relative(root, target);
      if (path.isAbsolute(part) || part.split(/[\\/]/).includes('..')) throw Error('E_TEMP_PATH');
      return target;
    },
    dispose() {
      if (disposed) return;
      if (!fs.existsSync(root)) throw Error('E_TEMP_MISSING');
      if (
        fs.lstatSync(root).isSymbolicLink() ||
        fs.realpathSync(root) !== root ||
        path.dirname(root) !== parent
      )
        throw Error('E_TEMP_ROOT');
      for (let attempt = 0; ; attempt++) {
        if (JSON.parse(fs.readFileSync(marker, 'utf8')).token !== token)
          throw Error('E_TEMP_OWNER');
        try {
          clearChildren(root, marker);
          break;
        } catch (error) {
          if (
            !['EBUSY', 'EPERM', 'EACCES', 'ENOTEMPTY', 'ENOENT'].includes(error.code) ||
            attempt >= 8
          )
            throw Error('E_TEMP_CLEANUP');
          // Exit handlers are synchronous. Windows can hold a just-closed executable briefly.
          Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100 * (attempt + 1));
        }
      }
      fs.unlinkSync(marker);
      fs.rmdirSync(root);
      disposed = true;
    },
  });
}
module.exports = { createTempArea };
