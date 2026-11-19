import { run, bin } from './common.mjs';
import { existsSync, readFileSync } from 'node:fs';
const version = JSON.parse(readFileSync('package.json', 'utf8')).version;
if (existsSync('out/make/zip/win32/x64/2DSketcher-win32-x64-' + version + '.zip'))
  throw Error('E_PACKAGE_FROZEN_VERSION');
run(process.execPath, ['scripts/worker-build.mjs']);
run(process.execPath, ['scripts/build.mjs', '--mode=release']);
bin('@electron-forge/cli', 'electron-forge', ['make', '--platform=win32', '--arch=x64']);
