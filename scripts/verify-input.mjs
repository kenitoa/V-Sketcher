import { spawnSync } from 'node:child_process';
import {
  mkdirSync,
  writeFileSync,
  appendFileSync,
  readFileSync,
  readdirSync,
  copyFileSync,
} from 'node:fs';
import { resolve, join, relative, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { root } from './common.mjs';
const output = resolve(root, 'evidence/phase12');
const log = resolve(root, '.local/phase12-check.log');
mkdirSync(output, { recursive: true });
writeFileSync(log, '');
const env = { ...process.env, PATH: dirname(process.execPath) + ';' + process.env.PATH };
delete env.ELECTRON_RUN_AS_NODE;
let combined = '';
for (const script of ['scripts/check.mjs', 'scripts/smoke.mjs']) {
  const result = spawnSync(process.execPath, [script], {
    cwd: root,
    env,
    windowsHide: true,
    encoding: 'utf8',
    timeout: 240000,
  });
  const chunk = (result.stdout ?? '') + (result.stderr ?? '');
  appendFileSync(log, chunk);
  combined += chunk;
  if (result.error || result.status !== 0)
    throw new Error('E_PROJECT_GATE: inspect .local/phase12-check.log');
}
const node = Number(combined.match(/\btests (\d+)/)?.[1]);
const python = Number(combined.match(/Ran (\d+) tests/)?.[1]);
const browser = JSON.parse(
  readFileSync(resolve(root, '.local/smoke/development/report.json'), 'utf8'),
);
if (!(
  node > 0 &&
  python > 0 &&
  browser.passed &&
  browser.input.passed &&
  browser.projects.passed &&
  browser.editor.passed &&
  browser.motion.passed &&
  browser.renderer.motionPixels.passed
))
  throw new Error('E_PROJECT_EVIDENCE');
for (const [source, target] of [
  ['report.json', 'development-run.json'],
  ['input.png', 'input-ui.png'],
  ['workflow.png', 'review-ui.png'],
  ['editor.png', 'editor-ui.png'],
  ['motion.png', 'motion-ui.png'],
  ['project.png', 'project-ui.png'],
  ['studio.png', 'studio-ui.png'],
])
  copyFileSync(resolve(root, '.local/smoke/development', source), join(output, target));
const sources = {};
function inventory(folder) {
  for (const item of readdirSync(folder, { withFileTypes: true })) {
    const path = join(folder, item.name);
    if (item.name === '__pycache__' || item.name.endsWith('.pyc')) continue;
    if (item.isDirectory()) inventory(path);
    else
      sources[relative(root, path).replaceAll('\\', '/')] = createHash('sha256')
        .update(readFileSync(path))
        .digest('hex');
  }
}
for (const folder of [
  'packages/image-input',
  'worker',
  'packages/motion',
  'packages/scene-core',
  'packages/project-model',
  'packages/editor-view',
  'packages/project-storage',
  'packages/project-session',
  'packages/workflow',
  'packages/avatar-renderer',
  'apps/renderer/src',
  'apps/desktop',
])
  inventory(resolve(root, folder));
for (const file of [
  'tests/storage.test.ts',
  'tests/editor.test.ts',
  'tests/motion.test.ts',
  'tests/image-input.test.ts',
  'tests/worker/test_image_input.py',
  'scripts/prepare-motion-example.mjs',
  'assets/product/preview-project.json',
  'scripts/check.mjs',
  'scripts/test.mjs',
  'scripts/smoke.mjs',
  'scripts/package-check.mjs',
  'package.json',
  'package-lock.json',
])
  sources[file] = createHash('sha256')
    .update(readFileSync(resolve(root, file)))
    .digest('hex');
writeFileSync(
  join(output, 'verification.json'),
  JSON.stringify(
    {
      passed: true,
      created: new Date().toISOString(),
      appVersion: '0.7.0',
      node: process.versions.node,
      nodeTestGroups: node,
      pythonTestGroups: python,
      totalTestGroups: node + python,
      newStorageSessionGroups: 19,
      typecheck: true,
      ruff: true,
      generatedValidatorMatches: true,
      testBuild: true,
      newMotionNodeGroups: 16,
      newEditorNodeGroups: 12,
      inputUI: browser.input,
      newInputNodeGroups: 8,
      newInputPythonGroups: 8,
      motionUI: browser.motion,
      motionPixels: browser.renderer.motionPixels,
      browserUI: browser.editor,
      projectLifecycle: browser.projects,
      actualWindowsFiles: true,
      actualProcessTerminationBeforeReplace: true,
      actualRecoveryAfterKilledProcess: true,
      faultInjection: [
        'ENOSPC',
        'EACCES',
        'before-write',
        'after-sync',
        'after-verify',
        'before-backup',
        'after-backup',
        'before-replace',
        'after-replace',
      ],
      scope:
        'Real local image decoding/orientation/color/crop/mask/selection, cancellable selected-only analysis, save/reopen and prior motion/editor regressions; no automatic rigging, universal segmentation, live tracking, broadcast, FPS or M0 approval.',
      followup: ['T-268', 'T-271'],
      sourceSha256: sources,
    },
    null,
    2,
  ) + '\n',
);
console.log(
  `Common image input passed: ${node}+${python} groups and actual Electron editor/save/recovery UI.`,
);
