import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { randomUUID } from 'node:crypto';
const require = createRequire(import.meta.url),
  model = require('../.local/test-js/packages/project-model'),
  split = require('../.local/test-js/packages/split-image/model'),
  archive = require('../.local/test-js/packages/split-image/archive'),
  { splitProcessor } = require('../.local/test-js/apps/desktop/split-processor');
const source = await archive.readArchive(
    await readFile('assets/product/split/premium-example.2dparts'),
  ),
  raw = new Map([...source.files.values()].map((b) => [archive.hash(b), b])),
  processor = splitProcessor(
    resolve('.venv-product/Scripts/python.exe'),
    ['-I', resolve('worker/main.py')],
    resolve('.local/split-preservation-worker'),
    process.env,
  ),
  result = await processor.probe(raw, new AbortController().signal),
  draft = split.draftFromSource(source, result.images, result.files),
  materials = split.materials(
    draft,
    raw,
    new Map([...result.files.values()].map((b) => [archive.hash(b), b])),
  ),
  p = split.buildProject(
    model.createProject('Preservation', 'split-image'),
    draft,
    materials.assets,
  );
const eye = p.parameters.find((p) => p.previewKey === 'eye_left');
p.expressions.push({
  id: randomUUID(),
  displayName: 'Manual asymmetric expression',
  values: [{ parameterId: eye.id, value: 0.35, locked: true }],
  transitionMs: 150,
  release: 'live-input',
});
p.inputBindings.push({
  id: randomUUID(),
  source: 'manual',
  channel: 'preservation-check',
  parameterId: eye.id,
  inputRange: [0, 1],
  invert: true,
  gain: 0.8,
  offset: 0.05,
  smoothingMs: 75,
  fallback: { mode: 'neutral', value: 1, returnMs: 250 },
});
p.motion.settings = {
  strength: 0.7,
  smoothingMs: 230,
  pose: [{ parameterId: eye.id, value: 0.6 }],
};
model.assertProject(p);
const nextDraft = split.draftFromProject(p);
nextDraft.layers.find((l) => l.role === 'accessory' && l.visible).origin[0] += 2;
const next = split.buildProject(p, nextDraft, []);
for (const field of ['projectId', 'parameters', 'expressions', 'inputBindings'])
  assert.deepEqual(next[field], p[field]);
assert.deepEqual(next.motion.settings, p.motion.settings);
assert.deepEqual(
  next.parts.map((p) => p.id),
  p.parts.map((p) => p.id),
);
assert.equal(
  next.split.draft.layers.find((l) => l.role === 'accessory' && l.visible).origin[0],
  draft.layers.find((l) => l.role === 'accessory' && l.visible).origin[0] + 2,
);
const output = {
  passed: true,
  nonemptyExpressionPreserved: true,
  asymmetricLockedValuePreserved: true,
  inputMappingAndFallbackPreserved: true,
  nondefaultStrengthSmoothingAndPosePreserved: true,
  parameterAndPartIdsPreserved: true,
  manualDecorationPositionChanged: true,
  devicesOpened: false,
  scope:
    'Supplemental nonempty semantic preservation check using actual PNG worker and public split model; not expression UI completion',
};
await mkdir('evidence/phase16', { recursive: true });
await writeFile('evidence/phase16/preservation.json', JSON.stringify(output, null, 2) + '\n');
console.log(JSON.stringify(output));
