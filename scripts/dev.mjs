import { run, electronPath } from './common.mjs';
run(process.execPath, ['scripts/build.mjs', '--mode=development']);
run(electronPath(), ['.']);
