import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, createReadStream, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, resolve } from 'node:path';
const out = resolve(process.argv[2]),
  load = (name) => JSON.parse(readFileSync(join(out, name), 'utf8'));
assert.ok(!existsSync(join(out, 'review.json')));
const gate = load('gate.json'),
  packet = load('package/package-review.json'),
  version = JSON.parse(readFileSync('package.json')).version;
assert.equal(gate.exitCode, 0);
assert.equal(gate.nodeTests, 329);
assert.equal(gate.pythonTests, 36);
assert.equal(packet.passed, true);
assert.equal(packet.appVersion, version);
assert.equal(packet.oldReleaseProjectOpenedByNewRelease, true);
assert.equal(packet.userAssetPreserved, true);
assert.equal(packet.cleanWindowsOS, false);
for (const name of ['package/after.json', 'package/repeat.json']) {
  const row = load(name);
  assert.equal(row.guide.passed, true);
  assert.equal(row.guide.topics, 11);
  assert.equal(row.guide.deviceRequests, 0);
  assert.equal(row.guide.existingProjectOpened, true);
  assert.deepEqual(row.protections, {
    sandbox: true,
    contextIsolation: true,
    nodeIntegration: false,
    externalNetworkBlocked: true,
  });
}
const sourceFiles = [
  'package.json',
  'package-lock.json',
  'forge.config.cjs',
  'apps/desktop/main.ts',
  'apps/renderer/src/project-desk.tsx',
  'apps/renderer/src/help-panel.tsx',
  'apps/renderer/src/help.css',
  'apps/renderer/src/guide-self-check.ts',
  'apps/renderer/src/global.d.ts',
  'apps/renderer/src/environment-self-check.ts',
  'packages/user-guide/index.ts',
  'scripts/build.mjs',
  'scripts/prepare-release.mjs',
  'scripts/test.mjs',
  'scripts/usability-ui-check.mjs',
  'scripts/usability-package-check.mjs',
  'scripts/portable-lifecycle-test.mjs',
  'scripts/usability-review.mjs',
  'tests/user-guide.test.ts',
  'tools/portable-lifecycle.mjs',
  'docs/planning/29-observation-protocol.md',
  'docs/user/observation-template.json',
  'docs/user/feedback.md',
  'docs/user/install.md',
  'docs/user/troubleshooting.md',
];
sourceFiles.push(
  'docs/Todo',
  'docs/PRD.md',
  'docs/Function.md',
  'docs/planning/29-usability-release.md',
);
const sources = sourceFiles.map((path) => ({
  path,
  sha256: createHash('sha256').update(readFileSync(path)).digest('hex'),
}));
const zip = 'out/make/zip/win32/x64/2DSketcher-win32-x64-' + version + '.zip',
  hash = createHash('sha256');
let bytes = 0;
for await (const chunk of createReadStream(zip)) {
  hash.update(chunk);
  bytes += chunk.length;
}
const result = {
  phase: 29,
  appVersion: version,
  passedLocalScope: true,
  entirePhaseComplete: false,
  completedTasks: ['T-281', 'T-285', 'T-286', 'T-287', 'T-289'],
  incompleteTasks: ['T-282', 'T-283', 'T-284', 'T-288', 'T-290'],
  gate,
  package: packet,
  novice: {
    consented: 1,
    successSelfReports: 1,
    directFullPathCompletions: 0,
    measuredTimingRows: 0,
    releaseSampleGoal: 30,
    firstRouteGoalEach: 10,
    userRequestedLaterRecheck: true,
  },
  unresolved: [
    'three-route novice observation',
    'quantitative time and correction measurement',
    're-observation after changes',
    '7-day first use and 14-day repeat windows',
    'clean Windows installation',
    'controlled trial distribution and environment-classified feedback',
    'predecessor 27/28 and actual devices/endurance/performance gates',
  ],
  m0: 'HOLD',
  publicDistributionApproved: false,
  distributed: false,
  rawMediaStored: false,
  zip: { path: zip, bytes, sha256: hash.digest('hex') },
  sources,
};
writeFileSync(join(out, 'review.json'), JSON.stringify(result, null, 2) + '\n');
console.log(
  'Phase 29 local implementation verified; actual-user, clean-OS and distribution gates remain open.',
);
