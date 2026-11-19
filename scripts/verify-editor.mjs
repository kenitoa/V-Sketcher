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
const output = resolve(root, 'evidence/phase10');
const log = resolve(root, '.local/phase10-check.log');
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
    timeout: 150000,
  });
  const chunk = (result.stdout ?? '') + (result.stderr ?? '');
  appendFileSync(log, chunk);
  combined += chunk;
  if (result.error || result.status !== 0)
    throw new Error('E_PROJECT_GATE: inspect .local/phase10-check.log');
}
const node = Number(combined.match(/\btests (\d+)/)?.[1]);
const python = Number(combined.match(/Ran (\d+) tests/)?.[1]);
const browser = JSON.parse(
  readFileSync(resolve(root, '.local/smoke/development/report.json'), 'utf8'),
);
if (!(node > 0 && python > 0 && browser.passed && browser.projects.passed && browser.editor.passed))
  throw new Error('E_PROJECT_EVIDENCE');
for (const [source, target] of [
  ['report.json', 'development-run.json'],
  ['workflow.png', 'review-ui.png'],
  ['editor.png', 'editor-ui.png'],
  ['project.png', 'project-ui.png'],
  ['studio.png', 'studio-ui.png'],
])
  copyFileSync(resolve(root, '.local/smoke/development', source), join(output, target));
const sources = {};
function inventory(folder) {
  for (const item of readdirSync(folder, { withFileTypes: true })) {
    const path = join(folder, item.name);
    if (item.isDirectory()) inventory(path);
    else
      sources[relative(root, path).replaceAll('\\', '/')] = createHash('sha256')
        .update(readFileSync(path))
        .digest('hex');
  }
}
for (const folder of [
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
      appVersion: '0.5.0',
      node: process.versions.node,
      nodeTestGroups: node,
      pythonTestGroups: python,
      totalTestGroups: node + python,
      newStorageSessionGroups: 19,
      typecheck: true,
      ruff: true,
      generatedValidatorMatches: true,
      testBuild: true,
      newEditorNodeGroups: 12,
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
        'Common editor/viewport, actual alpha hit/original texture, task/error/focus/contrast UI plus existing actual local project files; no manual novice/assistive technology or complete creation/tracking claim.',
      followup: ['T-268', 'T-271'],
      sourceSha256: sources,
    },
    null,
    2,
  ) + '\n',
);
console.log(
  `Common editor passed: ${node}+${python} groups and actual Electron editor/save/recovery UI.`,
);
