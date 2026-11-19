import { python, run, bin } from './common.mjs';
run(process.execPath, ['scripts/generate-project-validators.mjs', '--check']);
bin('typescript', 'tsc', ['--noEmit', '-p', 'tsconfig.json']);
run(python, [
  '-m',
  'ruff',
  'check',
  'worker',
  'scripts',
  'tools',
  'tests/worker',
  '--select',
  'E9,F401,F63,F7,F82',
]);
run(process.execPath, ['scripts/test.mjs']);
run(process.execPath, ['scripts/build.mjs', '--mode=test']);
console.log('Required foundation checks passed');
