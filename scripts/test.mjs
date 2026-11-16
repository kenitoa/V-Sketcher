import { mkdirSync } from 'node:fs';
import { python, run, bin } from './common.mjs';
mkdirSync('.local', { recursive: true });
bin('typescript', 'tsc', ['-p', 'tsconfig.json', '--outDir', '.local/test-js']);
run(process.execPath, ['--test', '.local/test-js/tests/core.test.js', '.local/test-js/tests/project.test.js', '.local/test-js/tests/workflow.test.js', '.local/test-js/tests/storage.test.js']);
run(python, ['-I', '-m', 'unittest', 'discover', '-s', 'tests/worker', '-v']);
