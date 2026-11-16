import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const python = resolve(root, '.venv-product/Scripts/python.exe');
export function electronPath() {
  delete process.env.ELECTRON_OVERRIDE_DIST_PATH;
  process.env.electron_config_cache = resolve(root, '.local/caches/electron');
  return createRequire(import.meta.url)('electron');
}
export function run(executable, args, options = {}) {
  const env = { ...process.env }; delete env.ELECTRON_RUN_AS_NODE;
  env.PATH = dirname(process.execPath) + ';' + (env.PATH ?? '');
  const result = spawnSync(executable, args, { cwd: root, stdio: 'inherit', windowsHide: true, env, ...options });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Task failed (${result.status}): ${args[0] ?? executable}`);
  return result;
}
export function bin(name, key, args = []) {
  const directory = resolve(root, 'node_modules', name); const pkg = JSON.parse(readFileSync(resolve(directory, 'package.json'), 'utf8'));
  const executable = typeof pkg.bin === 'string' ? pkg.bin : pkg.bin[key];
  return run(process.execPath, [resolve(directory, executable), ...args]);
}
