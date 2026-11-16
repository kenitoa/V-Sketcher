import { run, bin } from './common.mjs';
run(process.execPath, ['scripts/worker-build.mjs']);
run(process.execPath, ['scripts/build.mjs', '--mode=release']);
bin('@electron-forge/cli', 'electron-forge', ['make', '--platform=win32', '--arch=x64']);
