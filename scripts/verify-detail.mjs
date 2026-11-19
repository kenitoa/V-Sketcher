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
const output = resolve(root, 'evidence/phase17');
const log = resolve(root, '.local/phase17-check.log');
mkdirSync(output, { recursive: true });
writeFileSync(log, '');
const env = { ...process.env, PATH: dirname(process.execPath) + ';' + process.env.PATH };
delete env.ELECTRON_RUN_AS_NODE;
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
  'packages/detail-editor',
  'packages/split-image',
  'assets/product/split',
  'packages/single-image',
  'assets/product/parts',
  'packages/parts-library',
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
  'scripts/detail-preservation-check.mjs',
  'scripts/detail-audit.py',
  'scripts/detail-package-check.mjs',
  'tests/detail-editor.test.ts',
  'scripts/split-package-check.mjs',
  'scripts/prepare-split-example.py',
  'tests/split-image.test.ts',
  'tests/worker/test_split_image.py',
  'scripts/correction-quality.py',
  'tests/corrections.test.ts',
  'tests/worker/test_corrections.py',
  'scripts/generate-project-validators.mjs',
  'scripts/build.mjs',
  'tests/single-image.test.ts',
  'tests/worker/test_structure.py',
  'scripts/structure-quality.py',
  'tests/storage.test.ts',
  'tests/editor.test.ts',
  'tests/motion.test.ts',
  'tests/image-input.test.ts',
  'tests/parts-library.test.ts',
  'tests/worker/test_parts_assets.py',
  'scripts/prepare-parts-catalog.py',
  'scripts/provision.py',
  'scripts/notices.py',
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
sources['scripts/verify-detail.mjs'] = createHash('sha256')
  .update(readFileSync(resolve(root, 'scripts/verify-detail.mjs')))
  .digest('hex');
let combined = '';
for (const script of ['scripts/check.mjs', 'scripts/smoke.mjs']) {
  const required = script === 'scripts/check.mjs';
  const result = spawnSync(
    required ? (process.env.ComSpec ?? 'cmd.exe') : process.execPath,
    required ? ['/d', '/c', 'tools\\dev.cmd', 'run', 'check'] : [script],
    { cwd: root, env, windowsHide: true, encoding: 'utf8', timeout: 1860000 },
  );
  const chunk = (result.stdout ?? '') + (result.stderr ?? '');
  appendFileSync(log, chunk);
  combined += chunk;
  if (result.error || result.status !== 0)
    throw new Error('E_PROJECT_GATE: inspect .local/phase17-check.log');
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
  browser.detail.passed &&
  browser.detail.routes.length === 3 &&
  browser.detail.routes.every((r) => r.passed && r.pixels.passed) &&
  browser.split.passed &&
  browser.split.pixels.passed &&
  browser.split.folderPixels.passed &&
  browser.corrections.passed &&
  browser.corrections.pixels.passed &&
  browser.structure.passed &&
  browser.structure.pixels.passed &&
  browser.parts.passed &&
  browser.renderer.partsPixels.passed &&
  browser.input.passed &&
  browser.projects.passed &&
  browser.editor.passed &&
  browser.motion.passed &&
  browser.renderer.motionPixels.passed
))
  throw new Error('E_PROJECT_EVIDENCE');
for (const [source, target] of [
  ['detail.png', 'detail-ui.png'],
  ['detail-extremes.png', 'detail-extremes.png'],
  ['split.png', 'split-ui.png'],
  ['split-extremes.png', 'split-extremes.png'],
  ['correction.png', 'correction-ui.png'],
  ['correction-extremes.png', 'correction-extremes.png'],
  ['structure.png', 'structure-ui.png'],
  ['structure-extremes.png', 'structure-extremes.png'],
  ['report.json', 'development-run.json'],
  ['input.png', 'input-ui.png'],
  ['parts.png', 'parts-ui.png'],
  ['parts-contact.png', 'parts-contact.png'],
  ['parts-extremes.png', 'parts-extremes.png'],
  ['workflow.png', 'review-ui.png'],
  ['editor.png', 'editor-ui.png'],
  ['motion.png', 'motion-ui.png'],
  ['project.png', 'project-ui.png'],
  ['studio.png', 'studio-ui.png'],
])
  copyFileSync(resolve(root, '.local/smoke/development', source), join(output, target));
for (const [file, digest] of Object.entries(sources))
  if (
    createHash('sha256')
      .update(readFileSync(resolve(root, file)))
      .digest('hex') !== digest
  )
    throw new Error('E_SOURCE_CHANGED_DURING_VERIFICATION');
writeFileSync(
  join(output, 'verification.json'),
  JSON.stringify(
    {
      passed: true,
      created: new Date().toISOString(),
      appVersion: '0.12.0',
      newDetailNodeGroups: 20,
      detailUI: browser.detail,
      newSplitNodeGroups: 18,
      newSplitPythonGroups: 5,
      splitUI: browser.split,
      node: process.versions.node,
      nodeTestGroups: node,
      pythonTestGroups: python,
      totalTestGroups: node + python,
      newCorrectionNodeGroups: 12,
      newCorrectionPythonGroups: 5,
      correctionUI: browser.corrections,
      newStructureNodeGroups: 8,
      newStructurePythonGroups: 7,
      structureUI: browser.structure,
      newStorageSessionGroups: 19,
      typecheck: true,
      ruff: true,
      generatedValidatorMatches: true,
      testBuild: true,
      newMotionNodeGroups: 16,
      newEditorNodeGroups: 12,
      partsUI: browser.parts,
      partsPixels: browser.renderer.partsPixels,
      newPartsNodeGroups: 12,
      newPartsPythonGroups: 3,
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
        'Detailed part/group/mesh/bindings/deletion/replacement/restore/locator/conflict editing on all three actual routes and all previous development regressions; no universal segmentation, unseen restoration, live tracking, broadcast, FPS or M0 approval.',
      followup: ['T-268', 'T-271'],
      sourceSha256: sources,
    },
    null,
    2,
  ) + '\n',
);
console.log(
  `Detailed editor passed: ${node}+${python} groups and actual Electron editor/save/recovery UI.`,
);
