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
const output = resolve(root, 'evidence/phase08');
const log = resolve(root, '.local/phase08-check.log');
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
    throw new Error('E_WORKFLOW_GATE: inspect .local/phase08-check.log');
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
  browser.renderer.workflowUI.passed &&
  browser.renderer.workflowCore.passed
))
  throw new Error('E_WORKFLOW_EVIDENCE');
copyFileSync(
  resolve(root, '.local/smoke/development/report.json'),
  join(output, 'development-run.json'),
);
copyFileSync(resolve(root, '.local/smoke/development/workflow.png'), join(output, 'review-ui.png'));
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
for (const folder of ['packages/workflow', 'packages/workflow-host', 'apps/renderer/src'])
  inventory(resolve(root, folder));
for (const file of [
  'apps/desktop/main.ts',
  'tests/workflow.test.ts',
  'tests/fixtures/workflow-child.cjs',
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
      appVersion: '0.3.0',
      node: process.versions.node,
      nodeTestGroups: node,
      pythonTestGroups: python,
      totalTestGroups: node + python,
      workflowNodeGroups: 20,
      typecheck: true,
      ruff: true,
      generatedValidatorMatches: true,
      testBuild: true,
      browserCore: browser.renderer.workflowCore,
      browserUI: browser.renderer.workflowUI,
      realChildLifecycle: true,
      ownedScratchCleanup: true,
      scope:
        'Fixed-input task/state/transaction/resource tests and actual app UI; not real image analysis or durable saving',
      followup: ['T-268', 'T-271'],
      sourceSha256: sources,
    },
    null,
    2,
  ) + '\n',
);
console.log(
  `Workflow gate passed: ${node}+${python} test groups, actual Electron review/cancel UI and runtime snapshot.`,
);
