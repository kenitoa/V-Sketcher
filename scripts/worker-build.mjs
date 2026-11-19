import { python, run } from './common.mjs';
run(python, ['scripts/provision.py']);
run(python, [
  '-m',
  'PyInstaller',
  '--noconfirm',
  '--distpath',
  '.local/build',
  '--workpath',
  '.local/pyinstaller',
  'worker/worker.spec',
]);
