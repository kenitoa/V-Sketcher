import { scratchPath } from './temp';
import { editExpressions, referenceIssue } from '../packages/expression-control';
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { ProjectSession } from '../packages/project-session';
import { readProject } from '../packages/project-model';
import { imageProcessor } from '../apps/desktop/image-processor';
import type { InputProcessor } from '../packages/image-input/types';
import { assertReport, structuredProject } from '../packages/single-image';
import { encodeBundle, sha256 } from '../packages/project-storage/archive';
import { capabilities, authorRig } from '../packages/motion';
import { parseSessionCommand } from '../packages/project-session/contracts';
const sleep = () => new Promise((r) => setTimeout(r, 15));
async function until(fn: () => boolean) {
  const t = Date.now();
  while (!fn()) {
    if (Date.now() - t > 300000) throw new Error('E_STRUCTURE_TEST_TIMEOUT');
    await sleep();
  }
}
let memo: ReturnType<typeof fixture> | undefined;
async function fixture() {
  await mkdir(scratchPath('structure-tests'), { recursive: true });
  const dir = await mkdtemp(scratchPath('structure-tests/fixture-'));
  const read = readProject(await readFile('assets/product/preview-project.json', 'utf8'));
  if (read.mode !== 'read-write') throw new Error('fixture');
  const bundled = read.project;
  const bundledBytes = new Map(
    await Promise.all(
      bundled.assets.map(
        async (a) =>
          [
            a.id,
            await readFile(join('assets/product/preview', a.fingerprint.sha256 + '.png')),
          ] as const,
      ),
    ),
  );
  const source = bundledBytes.get(bundled.inputAssetIds[0]!)!;
  const file = join(dir, 'source.png');
  await writeFile(file, source);
  const processor = imageProcessor(
    resolve('.venv-product/Scripts/python.exe'),
    ['-I', '-u', resolve('worker/main.py')],
    join(dir, 'worker'),
    process.env,
  );
  const s = new ProjectSession({
    dataDir: dir,
    bundled,
    bundledBytes,
    inputProcessor: processor,
    autoTimers: false,
    dialogs: {
      chooseImage: async () => file,
      openProject: async () => null,
      saveProject: async () => null,
      relinkImage: async () => null,
      unsaved: async () => 'discard',
    },
  });
  await s.init();
  await s.newProject('Automatic portrait', 'single-image');
  await s.dispatch({ type: 'import-image' });
  await until(() => !s.view().input!.busy);
  const d = s.view().input!.draft!;
  await s.dispatch({
    type: 'input-apply',
    draftId: d.id,
    selection: {
      rect: { x: 0, y: 0, ...d.probe.size },
      masks: [],
      backgroundTolerance: null,
      occluded: false,
    },
  });
  await until(() => !s.view().input!.busy);
  assert.equal(s.view().input!.errorCode, null);
  const p = structuredClone(s.view().project!);
  const bytes = await s.cache.bytes(p);
  const input = bytes.get(p.inputPreparation!.selectedAssetId)!;
  const analysis = await processor.structure!(
    'analyze',
    input,
    { occluded: false },
    new AbortController().signal,
  );
  const built = await processor.structure!(
    'build',
    input,
    { report: analysis.report, completion: 'estimated' },
    new AbortController().signal,
  );
  await s.shutdown();
  return { p, bytes, bundled, bundledBytes, processor, analysis, built };
}
async function setup(processor?: InputProcessor) {
  const f = await (memo ??= fixture());
  const dir = await mkdtemp(scratchPath('structure-tests/run-'));
  const file = join(dir, 'input.2dsketch');
  await writeFile(file, await encodeBundle(f.p, f.bytes, 'manual'));
  let output = join(dir, 'saved.2dsketch');
  const s = new ProjectSession({
    dataDir: dir,
    bundled: f.bundled,
    bundledBytes: f.bundledBytes,
    inputProcessor: processor ?? f.processor,
    autoTimers: false,
    dialogs: {
      chooseImage: async () => null,
      openProject: async () => null,
      saveProject: async () => output,
      relinkImage: async () => null,
      unsaved: async () => 'discard',
    },
  });
  await s.init();
  await s.openFile(file);
  return {
    ...f,
    s,
    dir,
    file,
    output: (v: string) => {
      output = v;
    },
  };
}
async function run(s: ProjectSession) {
  await s.dispatch({
    type: 'structure-start',
    expectedRevision: s.view().project!.revision,
    completion: 'estimated',
  });
  await until(() => !s.view().structure!.busy);
  assert.equal(s.view().structure!.state, 'review', JSON.stringify(s.view().structure));
}
test('T131/132: real local processor analyzes supported premium without annotations and rejects malformed reports/IPC', async () => {
  const f = await (memo ??= fixture());
  assert.equal(f.analysis.report.status, 'ready');
  assert.equal(f.built.files.size, 7);
  assertReport(f.built.report);
  for (const bad of [
    { ...f.built.report, headGain: 1 },
    { ...f.built.report, files: ['../leak.png'] },
    { ...f.built.report, regions: [...f.built.report.regions, f.built.report.regions[0]] },
  ])
    assert.throws(() => assertReport(bad));
  assert.throws(() =>
    parseSessionCommand({
      type: 'structure-start',
      expectedRevision: true,
      completion: 'estimated',
    }),
  );
  assert.throws(() =>
    parseSessionCommand({
      type: 'structure-start',
      expectedRevision: 1,
      completion: 'real-hidden-restore',
    }),
  );
  assert.throws(() =>
    parseSessionCommand({ type: 'structure-apply', expectedRevision: 1, path: 'outside' }),
  );
});
test('T133/134/137/138: common model has authored source links, ordered crops and bounded five controls', async () => {
  const f = await (memo ??= fixture());
  const { project: p, bytes } = structuredProject(f.p, f.built.report, f.built.files);
  assert.equal(p.parts.length, 4);
  assert.equal(p.partBindings.length, 3);
  assert.equal(bytes.size, 7);
  assert.equal(p.structure!.inputAssetId, f.p.inputPreparation!.selectedAssetId);
  assert.equal(p.parameters.length, 5);
  assert.ok(capabilities(p).every((v) => v.supported));
  assert.ok(
    p.assets
      .filter((a) => bytes.has(a.id))
      .every((a) => a.parentAssetIds.includes(f.p.inputPreparation!.selectedAssetId)),
  );
  assert.ok(p.motion!.maxRollDegrees <= 3.91);
  assert.ok(authorRig(p).maxRollDegrees <= 3.91);
  assert.equal(p.parts[0]!.drawOrder, 0);
  assert.ok(p.parts.slice(1).every((v) => v.drawOrder === 10));
  assert.deepEqual(f.p.parts.length, 1);
});
test('T136: early face/head preview before expressions is isolated and cancellable', async () => {
  const f = await (memo ??= fixture());
  let release!: () => void;
  const gate = new Promise<void>((r) => {
    release = r;
  });
  const processor: InputProcessor = {
    run: f.processor.run,
    structure: async (op, _bytes, _options, signal) => {
      if (op === 'analyze') return f.analysis;
      await gate;
      if (signal.aborted) throw new Error('E_JOB_CANCELLED');
      return f.built;
    },
  };
  const { s } = await setup(processor);
  const before = JSON.stringify(s.view().project);
  await s.dispatch({
    type: 'structure-start',
    expectedRevision: s.view().project!.revision,
    completion: 'estimated',
  });
  await until(() => s.view().structure!.earlyReady);
  assert.equal(s.view().structure!.project!.parts.length, 1);
  assert.equal(capabilities(s.view().structure!.project!).filter((v) => v.supported).length, 2);
  assert.equal(JSON.stringify(s.view().project), before);
  await s.dispatch({ type: 'structure-cancel' });
  release();
  await sleep();
  assert.equal(s.view().structure!.canApply, false);
  assert.equal(JSON.stringify(s.view().project), before);
  await s.shutdown();
});
test('T140: real preview/apply/save/duplicate/reopen, undo/redo and original byte retention', async () => {
  const { s, dir, output, bytes } = await setup();
  const before = JSON.stringify(s.view().project!.parts);
  const original = s.view().project!.inputAssetIds[0]!;
  const originalHash = sha256(bytes.get(original)!);
  await run(s);
  assert.equal(JSON.stringify(s.view().project!.parts), before);
  assert.ok(s.view().structure!.scene!.layers.length >= 4);
  await s.dispatch({ type: 'structure-apply', expectedRevision: s.view().project!.revision });
  assert.equal(s.view().project!.parts.length, 4);
  assert.equal(s.view().structure!.state, 'applied');
  const record = structuredClone(s.view().project!.structure);
  await s.dispatch({ type: 'undo' });
  assert.equal(s.view().project!.structure, undefined);
  assert.equal(JSON.stringify(s.view().project!.parts), before);
  await s.dispatch({ type: 'redo' });
  assert.deepEqual(s.view().project!.structure, record);
  await s.save(true);
  output(join(dir, 'copy.2dsketch'));
  const id = s.view().project!.projectId;
  await s.dispatch({ type: 'duplicate' });
  assert.notEqual(s.view().project!.projectId, id);
  await s.openFile(join(dir, 'copy.2dsketch'));
  assert.deepEqual(s.view().project!.structure, { ...record, inputRevision: 0 });
  assert.equal(
    sha256((await s.cache.read(s.view().project!.assets.find((a) => a.id === original)!))!),
    originalHash,
  );
  assert.ok(s.view().project!.motion);
  await s.shutdown();
});
test('T140: stale revision never applies over current manual edits, retry uses current snapshot', async () => {
  const { s } = await setup();
  await run(s);
  const revision = s.view().project!.revision;
  await s.dispatch({
    type: 'edit',
    target: 'project-name',
    id: null,
    parameterId: null,
    value: 'Keep current work',
    expectedRevision: revision,
    groupId: null,
  });
  assert.equal(s.view().structure!.canApply, false);
  assert.equal(s.view().structure!.scene, null);
  const reply = await s.dispatch({ type: 'structure-apply', expectedRevision: revision });
  assert.equal(reply.view.errorCode, 'E_INPUT_STALE');
  assert.equal(reply.view.project!.displayName, 'Keep current work');
  assert.equal(reply.view.project!.structure, undefined);
  await s.dispatch({ type: 'structure-retry', expectedRevision: s.view().project!.revision });
  await until(() => !s.view().structure!.busy);
  assert.equal(s.view().structure!.state, 'review', JSON.stringify(s.view().structure));
  await s.shutdown();
});
test('T135/140: worker failure preserves last normal result and retry is explicit', async () => {
  const f = await (memo ??= fixture());
  let fail = true;
  const processor: InputProcessor = {
    run: f.processor.run,
    structure: async (op) => {
      if (fail) throw new Error('E_INPUT_PROCESSING');
      return op === 'analyze' ? f.analysis : f.built;
    },
  };
  const { s } = await setup(processor);
  const before = JSON.stringify(s.view().project);
  await s.dispatch({
    type: 'structure-start',
    expectedRevision: s.view().project!.revision,
    completion: 'estimated',
  });
  await until(() => !s.view().structure!.busy);
  assert.equal(s.view().structure!.state, 'failed');
  assert.equal(JSON.stringify(s.view().project), before);
  fail = false;
  await s.dispatch({ type: 'structure-retry', expectedRevision: s.view().project!.revision });
  await until(() => !s.view().structure!.busy);
  assert.equal(s.view().structure!.state, 'review', JSON.stringify(s.view().structure));
  await s.shutdown();
});
test('T137/138: restrict alternative creates no fake feature, preserves original and only head controls', async () => {
  const f = await (memo ??= fixture());
  const source = f.bytes.get(f.p.inputPreparation!.selectedAssetId)!;
  const built = await f.processor.structure!(
    'build',
    source,
    { report: f.analysis.report, completion: 'restrict' },
    new AbortController().signal,
  );
  const { project: p } = structuredProject(f.p, built.report, built.files);
  assert.equal(p.parts.length, 1);
  assert.equal(p.partBindings.length, 0);
  assert.equal(capabilities(p).filter((v) => v.supported).length, 2);
  assert.equal(p.structure!.report.completion, 'restrict');
  assert.equal(sha256(built.files.get('structure-base.png')!), sha256(source));
});
test('T140: project switch revokes delayed result and prevents cross-project resources', async () => {
  const f = await (memo ??= fixture());
  let release!: () => void;
  const gate = new Promise<void>((r) => {
    release = r;
  });
  const processor: InputProcessor = {
    run: f.processor.run,
    structure: async (op) => {
      if (op === 'analyze') return f.analysis;
      await gate;
      return f.built;
    },
  };
  const { s } = await setup(processor);
  await s.dispatch({
    type: 'structure-start',
    expectedRevision: s.view().project!.revision,
    completion: 'estimated',
  });
  await until(() => s.view().structure!.earlyReady);
  const switched = s.newProject('Other', 'parts');
  await sleep();
  release();
  await switched;
  await sleep();
  assert.equal(s.view().project!.displayName, 'Other');
  assert.equal(s.view().project!.structure, undefined);
  assert.equal(s.view().project!.parts.length, 0);
  await s.shutdown();
});

test('T178: actual one-sheet regeneration preserves authored values/parameter IDs/settings and requires anchor repair', async () => {
  const f = await (memo ??= fixture());
  const p = structuredProject(f.p, f.built.report, f.built.files).project,
    left = p.parameters.find((v) => v.previewKey === 'eye_left')!;
  editExpressions(
    p,
    {
      kind: 'save',
      id: null,
      name: 'Keep authored eye',
      values: [{ parameterId: left.id, value: 0.2, locked: true }],
      transitionMs: 200,
      releaseMs: 250,
      release: 'live-input',
    },
    () => 'authored-eye',
  );
  p.expressionSettings = {
    version: 1,
    mouth: 'microphone',
    alternate: true,
    autoBlink: false,
    releaseMs: 250,
    shortcuts: ['authored-eye', null, null],
  };
  const q = structuredProject(p, f.built.report, f.built.files).project;
  assert.deepEqual(q.parameters, p.parameters);
  assert.deepEqual(q.expressions, p.expressions);
  assert.deepEqual(q.expressionSettings, p.expressionSettings);
  const value = q.expressions.find((e) => e.id === 'authored-eye')!.values[0]!;
  assert.equal(referenceIssue(q, value), 'changed');
  editExpressions(
    q,
    { kind: 'repair', id: 'authored-eye', parameterId: left.id, action: 'reconnect' },
    () => 'unused',
  );
  assert.equal(referenceIssue(q, value), null);
  assert.equal(value.value, 0.2);
});
