import { mkdirSync,copyFileSync } from 'node:fs';
import { python, run, bin } from './common.mjs';
mkdirSync('.local', { recursive: true });
bin('typescript', 'tsc', ['-p', 'tsconfig.json', '--outDir', '.local/test-js']);
copyFileSync('packages/project-model/structure.runtime.js','.local/test-js/packages/project-model/structure.runtime.js');
run(process.execPath, ['--test', '--test-concurrency=3', '.local/test-js/tests/core.test.js', '.local/test-js/tests/project.test.js', '.local/test-js/tests/workflow.test.js', '.local/test-js/tests/storage.test.js', '.local/test-js/tests/editor.test.js', '.local/test-js/tests/motion.test.js', '.local/test-js/tests/image-input.test.js', '.local/test-js/tests/parts-library.test.js', '.local/test-js/tests/single-image.test.js', '.local/test-js/tests/corrections.test.js', '.local/test-js/tests/split-image.test.js', '.local/test-js/tests/detail-editor.test.js', '.local/test-js/tests/expression-control.test.js', '.local/test-js/tests/tracking.test.js']);
run(python, ['-I', '-m', 'unittest', 'discover', '-s', 'tests/worker', '-v']);
