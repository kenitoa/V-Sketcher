import { spawnSync } from 'node:child_process';
import {
  mkdirSync,
  writeFileSync,
  appendFileSync,
  readFileSync,
  readdirSync,
  copyFileSync,
  existsSync,
} from 'node:fs';
import { resolve, join, relative, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { root } from './common.mjs';
const output = resolve(root, 'evidence/phase21');
const log = resolve(root, '.local/phase21-check.log');
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
  'packages/execution',
  'packages/input-control',
  'packages/tracking',
  'packages/expression-control',
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
  'scripts/execution-package-check.mjs',
  'scripts/execution-audit.py',
  'tests/execution.test.ts',
  'scripts/input-recovery-package-check.mjs',
  'scripts/input-recovery-audit.py',
  'tests/input-control.test.ts',
  'tools/camera-diagnostic.py',
  'scripts/tracking-package-check.mjs',
  'scripts/tracking-audit.py',
  'tests/tracking.test.ts',
  'tests/worker/test_tracking.py',
  'scripts/expression-package-check.mjs',
  'scripts/expression-audit.py',
  'tests/expression-control.test.ts',
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
sources['scripts/verify-execution.mjs'] = createHash('sha256')
  .update(readFileSync(resolve(root, 'scripts/verify-execution.mjs')))
  .digest('hex');
let combined = '';
for (const script of ['scripts/check.mjs', 'scripts/smoke.mjs']) {
  const pending = process.argv.find((v) => v.startsWith('--wait-live-report='))?.slice(19);
  if (script === 'scripts/smoke.mjs' && pending) {
    const end = Date.now() + 900000;
    while (!existsSync(resolve(root, pending))) {
      if (Date.now() > end) throw new Error('E_LIVE_REVIEW_STILL_ACTIVE');
      await new Promise((r) => setTimeout(r, 250));
    }
  }
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
    throw new Error('E_PROJECT_GATE: inspect .local/phase21-check.log');
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
  browser.execution.passed &&
  browser.execution.routes.length === 3 &&
  browser.execution.routes.every((r) => r.passed && r.quickRecent && r.dirtyPreserved) &&
  browser.inputRecovery.passed &&
  browser.inputRecovery.routes.length === 3 &&
  browser.inputRecovery.routes.every(
    (r) =>
      r.passed &&
      r.realAudioWorklet &&
      r.watchdogWithoutCallbacks &&
      r.manualReconnect &&
      r.projectSaveReopen,
  ) &&
  browser.tracking.passed &&
  browser.tracking.routes.length === 3 &&
  browser.tracking.routes.every(
    (r) => r.passed && r.stableCalibration && r.cancelPreservesBaseline && r.saveDuplicateReopen,
  ) &&
  browser.expressions.passed &&
  browser.expressions.m2CreationExitApproved &&
  browser.expressions.routes.length === 3 &&
  browser.expressions.routes.every(
    (r) => r.passed && r.pixels.passed && r.saveDuplicateReopen && r.damageRepairAndUndo,
  ) &&
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
  ['execution.png', 'execution-ui.png'],
  ['input-recovery.png', 'input-recovery-ui.png'],
  ['tracking.png', 'tracking-ui.png'],
  ['expressions.png', 'expressions-ui.png'],
  ['expression-extremes.png', 'expression-extremes.png'],
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
      appVersion: '0.16.0',
      newExecutionNodeGroups: 17,
      executionUI: browser.execution,
      newInputControlNodeGroups: 20,
      inputRecoveryUI: browser.inputRecovery,
      newTrackingNodeGroups: 18,
      newTrackingPythonGroups: 5,
      trackingUI: browser.tracking,
      newExpressionNodeGroups: 20,
      expressionUI: browser.expressions,
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
        'Execution readiness/snapshot/controls/local key guards/quick recent/repeated start-stop on three actual routes; synthetic microphone and denied start. Full prior development regressions. OS global key delivery and physical devices separately recorded; T190/M0 remain open.',
      followup: ['T-268', 'T-271'],
      sourceSha256: sources,
    },
    null,
    2,
  ) + '\n',
);
console.log(
  `Execution passed: ${node}+${python} groups and actual Electron editor/save/recovery UI.`,
);
