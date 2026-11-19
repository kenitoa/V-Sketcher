import { scratchPath } from './temp';
import { transaction } from '../packages/workflow/transactions';
import { impactedKeys } from '../packages/workflow/dependencies';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, mkdtemp } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { randomUUID } from 'node:crypto';
import {
  propose,
  protectedIds,
  resolveLocation,
  assertSimpleSafe,
} from '../packages/detail-editor/model';
import {
  assertOperation,
  assertLocation,
  type DetailOperation,
} from '../packages/detail-editor/types';
import {
  createProject,
  readProject,
  assertProject,
  validateProject,
  type Project,
} from '../packages/project-model';
import { partWorldTransform } from '../packages/project-model/geometry';
import { projectToPreview } from '../packages/project-model/preview';
import { dynamicMatrix } from '../packages/motion/geometry';
import { NEUTRAL } from '../packages/scene-core';
import { capabilities } from '../packages/motion';
import { combination, selectItem, type Catalog } from '../packages/parts-library';
import { readArchive, hash } from '../packages/split-image/archive';
import {
  draftFromSource,
  materials,
  buildProject,
  draftFromProject,
  assertGuidanceCompatible,
} from '../packages/split-image/model';
import { splitProcessor } from '../apps/desktop/split-processor';
import { imageProcessor } from '../apps/desktop/image-processor';
import { ProjectSession } from '../packages/project-session';
import { parseSessionCommand } from '../packages/project-session/contracts';
import { encodeBundle } from '../packages/project-storage/archive';
const partOp = (p: Project, id = p.parts[0]!.id): Extract<DetailOperation, { kind: 'part' }> => {
  const v = p.parts.find((v) => v.id === id)!;
  return {
    kind: 'part',
    partId: id,
    name: v.displayName,
    role: v.role,
    side: v.side,
    parentId: v.parentId,
    groupId: v.groupId,
    order: v.drawOrder,
    visible: v.visible,
    opacity: v.opacity,
    x: v.localTransform[4],
    y: v.localTransform[5],
  };
};
const meshOp = (p: Project, id = p.parts[0]!.id): Extract<DetailOperation, { kind: 'mesh' }> => {
  const m = p.motion!.meshes.find((v) => v.partId === id)!;
  return {
    kind: 'mesh',
    partId: id,
    pivot: [m.pivot[0] + 2, m.pivot[1] + 1],
    curve: m.curve,
    yawParameterId: m.yawParameterId,
    rollParameterId: m.rollParameterId,
  };
};
async function temp() {
  await mkdir(scratchPath('detail-tests'), { recursive: true });
  return mkdtemp(scratchPath('detail-tests/run-'));
}
async function until(fn: () => boolean) {
  const end = Date.now() + 300000;
  while (!fn()) {
    if (Date.now() > end) throw new Error('E_DETAIL_TEST_TIMEOUT');
    await new Promise((r) => setTimeout(r, 15));
  }
}
let fixtures: ReturnType<typeof buildFixtures> | undefined;
async function buildFixtures() {
  const dir = await temp(),
    catalog = JSON.parse(await readFile('assets/product/parts/catalog.json', 'utf8')) as Catalog,
    parts = combination(catalog, 0),
    partBytes = new Map(
      await Promise.all(
        catalog.assets.map(
          async (a) =>
            [
              a.id,
              await readFile(join('assets/product', catalog.files[a.fingerprint.sha256]!)),
            ] as const,
        ),
      ),
    );
  const source = await readArchive(await readFile('assets/product/split/premium-example.2dparts')),
    raw = new Map([...source.files.values()].map((b) => [hash(b), b])),
    processor = splitProcessor(
      resolve('.venv-product/Scripts/python.exe'),
      ['-I', resolve('worker/main.py')],
      join(dir, 'split-worker'),
      process.env,
    ),
    result = await processor.probe(raw, new AbortController().signal),
    draft = draftFromSource(source, result.images, result.files),
    m = materials(draft, raw, new Map([...result.files.values()].map((b) => [hash(b), b]))),
    split = buildProject(createProject('Split', 'split-image'), draft, m.assets);
  const r = readProject(await readFile('assets/product/preview-project.json', 'utf8'));
  if (r.mode !== 'read-write') throw new Error('E_FIXTURE');
  const bundled = r.project,
    bundledBytes = new Map(
      await Promise.all(
        bundled.assets.map(
          async (a) =>
            [
              a.id,
              await readFile(join('assets/product/preview', a.fingerprint.sha256 + '.png')),
            ] as const,
        ),
      ),
    ),
    file = join(dir, 'source.png');
  await writeFile(file, bundledBytes.get(bundled.inputAssetIds[0]!)!);
  const s = new ProjectSession({
    dataDir: join(dir, 'single'),
    bundled,
    bundledBytes,
    inputProcessor: imageProcessor(
      resolve('.venv-product/Scripts/python.exe'),
      ['-I', resolve('worker/main.py')],
      join(dir, 'image-worker'),
      process.env,
    ),
    autoTimers: false,
    dialogs: {
      chooseImage: async () => file,
      saveProject: async () => null,
      openProject: async () => null,
      relinkImage: async () => null,
      unsaved: async () => 'discard',
    },
  });
  await s.init();
  await s.newProject('Real single image', 'single-image');
  await s.dispatch({ type: 'import-image' });
  await until(() => !s.view().input!.busy);
  const d = s.view().input!.draft!;
  await s.dispatch({
    type: 'input-apply',
    draftId: d.id,
    selection: {
      rect: { x: 0, y: 0, ...d.probe.size },
      masks: [],
      occluded: false,
      backgroundTolerance: null,
    },
  });
  await until(() => !s.view().input!.busy);
  await s.dispatch({
    type: 'structure-start',
    expectedRevision: s.view().project!.revision,
    completion: 'estimated',
  });
  await until(() => !s.view().structure!.busy);
  assert.equal(s.view().structure!.state, 'review');
  await s.dispatch({ type: 'structure-apply', expectedRevision: s.view().project!.revision });
  const single = structuredClone(s.view().project!),
    singleBytes = await s.cache.bytes(single);
  await s.shutdown();
  return {
    catalog,
    processor,
    file,
    routes: [
      { p: parts, bytes: partBytes },
      { p: single, bytes: singleBytes },
      { p: split, bytes: m.bytes },
    ],
  };
}
const setup = () => (fixtures ??= buildFixtures());
async function session(route = 0, processor?: ReturnType<typeof splitProcessor>) {
  const f = await setup(),
    r = f.routes[route]!,
    dir = await temp(),
    original = join(dir, 'original.2dsketch');
  await writeFile(original, await encodeBundle(r.p, r.bytes, 'manual'));
  let output = join(dir, 'saved.2dsketch');
  const s = new ProjectSession({
    dataDir: dir,
    bundled: r.p,
    bundledBytes: r.bytes,
    parts: { catalog: f.catalog, bytes: f.routes[0]!.bytes },
    splitProcessor: processor ?? f.processor,
    autoTimers: false,
    dialogs: {
      chooseDetailTexture: async () => f.file,
      saveProject: async () => output,
      openProject: async () => null,
      relinkImage: async () => null,
      unsaved: async () => 'discard',
    },
  });
  await s.init();
  await s.openFile(original);
  return { s, dir, output: (v: string) => (output = v) };
}
async function apply(s: ProjectSession, operation: DetailOperation) {
  await s.dispatch({
    type: 'detail-prepare',
    operation,
    expectedRevision: s.view().project!.revision,
  });
  assert.equal(s.view().errorCode, null);
  const d = s.view().detail!;
  assert.ok(d.canApply);
  await s.dispatch({
    type: 'detail-apply',
    draftId: d.draftId!,
    expectedRevision: s.view().project!.revision,
  });
  assert.equal(s.view().errorCode, null);
}
test('T161/T168: strict operation and ID locator contracts reject extra fields, paths, NaN, unknown roles and oversized/unbounded transforms', () => {
  for (const op of [
    { kind: 'delete', partId: '../private' },
    { kind: 'delete', partId: 'x', path: 'private' },
    { kind: 'influence', partId: 'x', center: [0, 0], radius: 0, strength: 1, yawDelta: 2 },
    {
      kind: 'vertex',
      partId: 'x',
      index: 0,
      position: [NaN, 0],
      weight: 1,
      minimum: [0, 0],
      maximum: [0, 0],
    },
    {
      kind: 'binding',
      partId: 'x',
      binding: {
        id: 'b',
        partId: 'x',
        parameterId: 'p',
        kind: 'transform',
        mapping: { component: 'rotate-degrees', outputRange: [-7, 7] },
      },
    },
  ])
    assert.throws(() => assertOperation(op));
  assert.throws(() => assertLocation({ kind: 'part', id: 'x', path: 'private' }));
  assert.throws(() =>
    parseSessionCommand({ type: 'detail-apply', expectedRevision: 0, draftId: 'bad' }),
  );
});
test('T162: name-only change is presentation; role, visibility, order and parent changes report geometry/runtime/export impacts', async () => {
  const p = (await setup()).routes[0]!.p,
    op = partOp(p);
  const name = propose(p, { ...op, name: 'Renamed' });
  assert.equal(name.impact.presentationOnly, true);
  assert.deepEqual(name.impact.checks, ['export-names']);
  assert.equal(name.project.detail, undefined);
  for (const extra of [{ role: 'custom' as const }, { visible: false }, { order: op.order + 1 }]) {
    const r = propose(p, { ...op, ...extra });
    assert.equal(r.impact.presentationOnly, false);
    assert.ok(r.impact.checks.includes('compatibility'));
  }
  assert.equal(p.parts[0]!.displayName, op.name);
});
test('T162/T158: reparent preserves visible affine pose and rejects cycles/missing groups without changing input', async () => {
  const p = (await setup()).routes[0]!.p,
    id = p.parts.find((v) => v.parentId)!.id,
    before = JSON.stringify(p),
    world = partWorldTransform(p, id);
  const r = propose(p, { ...partOp(p, id), parentId: null });
  assert.deepEqual(partWorldTransform(r.project, id), world);
  assert.throws(() => propose(p, { ...partOp(p, id), parentId: id }), /CYCLE/);
  assert.throws(() => propose(p, { ...partOp(p, id), groupId: 'missing' }), /REFERENCE/);
  assert.equal(JSON.stringify(p), before);
});
test('T163: local pivot/curve/axis editing changes only selected mesh and keeps image assets/other parts/semantic settings', async () => {
  for (const { p } of (await setup()).routes) {
    const r = propose(p, meshOp(p)),
      id = p.parts[0]!.id;
    assert.deepEqual(r.project.assets, p.assets);
    assert.deepEqual(r.project.parts, p.parts);
    assert.deepEqual(r.project.parameters, p.parameters);
    assert.deepEqual(r.project.motion!.settings, p.motion!.settings);
    assert.deepEqual(
      r.project.motion!.meshes.filter((m) => m.partId !== id),
      p.motion!.meshes.filter((m) => m.partId !== id),
    );
    assert.ok(protectedIds(r.project).includes(id));
    const impacts = impactedKeys(p, r.project, transaction(p, r.project, 'Detail mesh'));
    assert.ok(impacts.has('geometry:' + id));
    for (const other of p.parts.filter((v) => v.id !== id))
      assert.ok(!impacts.has('geometry:' + other.id));
  }
});
test('T163: vertex weights/displacement/positions validate finite limits and extreme triangle folding before apply', async () => {
  const p = (await setup()).routes[0]!.p,
    m = p.motion!.meshes[0]!,
    v = m.vertices[0]!,
    op: DetailOperation = {
      kind: 'vertex',
      partId: m.partId,
      index: 0,
      position: v.position,
      weight: 0.3,
      minimum: v.minimum,
      maximum: v.maximum,
    };
  const r = propose(p, op);
  assert.equal(r.project.motion!.meshes[0]!.vertices[0]!.weight, 0.3);
  assert.throws(() => propose(p, { ...op, maximum: [p.motion!.faceWidth, 0] }), /MOTION_RANGE/);
  assert.throws(() => propose(p, { ...op, position: m.vertices[1]!.position }), /TRIANGLE|FOLD/);
  assert.equal(p.motion!.meshes[0]!.vertices[0]!.weight, v.weight);
});
test('T163: radial influence explicitly rebuilds selected weights/yaw deltas, keeps outside zero and other meshes unchanged', async () => {
  const p = (await setup()).routes[0]!.p,
    m = p.motion!.meshes[0]!,
    center = m.vertices[0]!.position,
    r = propose(p, {
      kind: 'influence',
      partId: m.partId,
      center,
      radius: 100,
      strength: 0.6,
      yawDelta: 2,
    });
  const next = r.project.motion!.meshes[0]!;
  assert.equal(next.vertices[0]!.weight, 0.6);
  assert.ok(next.vertices.some((v) => v.weight === 0));
  assert.deepEqual(r.project.motion!.meshes.slice(1), p.motion!.meshes.slice(1));
  assert.ok(r.impact.warnings.includes('SELECTED_MESH_WEIGHTS_AND_YAW_DELTAS_REPLACED'));
});
test('T164: add/edit/unbind actual authored states and reject duplicate state bindings, absent states and unknown parameters', async () => {
  const p = (await setup()).routes[0]!.p,
    b = p.partBindings.find((b) => b.kind === 'state-blend')!,
    r = propose(p, { kind: 'unbind', partId: b.partId, bindingId: b.id }),
    q = propose(r.project, { kind: 'binding', partId: b.partId, binding: b });
  assert.deepEqual(
    q.project.partBindings.find((v) => v.id === b.id),
    b,
  );
  assert.throws(
    () => propose(p, { kind: 'binding', partId: b.partId, binding: { ...b, id: randomUUID() } }),
    /AMBIGUOUS/,
  );
  assert.throws(
    () =>
      propose(p, { kind: 'binding', partId: b.partId, binding: { ...b, parameterId: 'missing' } }),
    /PARAMETER/,
  );
  if (b.kind === 'state-blend')
    assert.throws(
      () =>
        propose(p, {
          kind: 'binding',
          partId: b.partId,
          binding: { ...b, mapping: { minimumState: 'absent', maximumState: 'open' } },
        }),
      /STATES/,
    );
});
test('T164: all five bounded transform components use actual common CPU/GPU matrix mapping; constant transform does not advertise a moving control', async () => {
  const p = (await setup()).routes[0]!.p,
    partId = p.parts[0]!.id,
    parameterId = p.parameters.find((v) => v.previewKey === 'head_yaw')!.id;
  for (const component of [
    'rotate-degrees',
    'translate-x',
    'translate-y',
    'scale-x',
    'scale-y',
  ] as const) {
    const q = propose(p, {
      kind: 'binding',
      partId,
      binding: {
        id: randomUUID(),
        partId,
        parameterId,
        kind: 'transform',
        mapping: { component, outputRange: component.startsWith('scale') ? [0.9, 1.1] : [-2, 2] },
      },
    }).project;
    const layer = projectToPreview(q).layers.find((v) => v.id === partId)!;
    assert.notDeepEqual(
      dynamicMatrix(layer, { ...NEUTRAL, head_yaw: -1 }),
      dynamicMatrix(layer, { ...NEUTRAL, head_yaw: 1 }),
    );
  }
  const q = structuredClone(p);
  q.motion!.meshes.forEach((m) => (m.yawParameterId = null));
  q.partBindings = q.partBindings.filter((b) => b.parameterId !== parameterId);
  q.partBindings.push({
    id: randomUUID(),
    partId,
    parameterId,
    kind: 'transform',
    mapping: { component: 'translate-x', outputRange: [0, 0] },
  });
  assert.equal(capabilities(q).find((v) => v.key === 'head_yaw')!.supported, false);
});
test('T165: one-state texture replacement preserves immutable originals, other authored states and asset versions', async () => {
  const p = (await setup()).routes[0]!.p,
    v = p.parts.find((v) => v.role === 'eye')!,
    t = v.textures[0]!,
    a = p.assets.find((a) => a.id !== t.assetId)!,
    before = JSON.stringify(p);
  const r = propose(p, { kind: 'texture', partId: v.id, state: t.state, assetId: a.id });
  assert.equal(r.project.parts.find((row) => row.id === v.id)!.textures[0]!.assetId, a.id);
  assert.deepEqual(
    r.project.parts.find((row) => row.id === v.id)!.textures.slice(1),
    v.textures.slice(1),
  );
  assert.deepEqual(r.project.assets, p.assets);
  assert.ok(r.impact.warnings.includes('TEXTURE_SIZE_AND_AUTHORED_STATES_RECHECK'));
  assert.equal(JSON.stringify(p), before);
  const split = (await setup()).routes[2]!.p,
    sv = split.parts.find((v) => v.role === 'eye')!,
    asset = split.assets.find((a) => a.id !== sv.textures[0]!.assetId)!;
  const edited = propose(split, {
    kind: 'texture',
    partId: sv.id,
    state: sv.textures[0]!.state,
    assetId: asset.id,
  }).project;
  assert.throws(() => draftFromProject(edited), /E_SPLIT_DETAIL_SOURCE/);
});
test('T165: deletion reports expression/input/export effects, reparents children in world pose, keeps parameters and source resources', async () => {
  const p = structuredClone((await setup()).routes[0]!.p),
    id = p.parts.find((v) => v.role === 'head')!.id,
    param = p.parameters.find((v) => v.previewKey === 'head_yaw')!;
  p.inputBindings.push({
    id: randomUUID(),
    source: 'manual',
    channel: 'test',
    parameterId: param.id,
    inputRange: [0, 1],
    invert: false,
    gain: 1,
    offset: 0,
    smoothingMs: 100,
    fallback: { mode: 'neutral', value: 0, returnMs: 100 },
  });
  p.exportProfiles.push({
    id: randomUUID(),
    revision: 0,
    displayName: 'Future INP',
    target: 'inochi2d',
    targetVersion: '0.8.7',
    format: 'inp',
    converterVersion: '0.0.0',
    parameterMap: [{ parameterId: param.id, targetName: 'HeadX' }],
  });
  const children = p.parts.filter((v) => v.parentId === id),
    worlds = children.map((v) => partWorldTransform(p, v.id)),
    r = propose(p, { kind: 'delete', partId: id });
  assert.ok(!r.project.parts.some((v) => v.id === id));
  children.forEach((c, i) => assert.deepEqual(partWorldTransform(r.project, c.id), worlds[i]));
  assert.deepEqual(r.project.parameters, p.parameters);
  assert.deepEqual(r.project.expressions, p.expressions);
  assert.deepEqual(r.project.inputBindings, p.inputBindings);
  assert.equal(r.impact.inputBindingIds.length, 1);
  assert.equal(r.impact.exportProfileIds.length, 1);
  assert.ok(r.impact.expressionIds.length);
  assert.deepEqual(r.project.assets, p.assets);
});
test('T166: selective restoration preserves other edits and full restoration removes protection with original mesh order and split signature', async () => {
  for (const { p } of (await setup()).routes) {
    const id = p.parts[0]!.id,
      a = propose(p, meshOp(p)).project,
      b = propose(a, { ...partOp(a), order: a.parts[0]!.drawOrder + 1 }).project,
      c = propose(b, { kind: 'restore', partId: id, scope: 'mesh' }).project;
    assert.deepEqual(c.motion, p.motion);
    assert.equal(c.parts[0]!.drawOrder, p.parts[0]!.drawOrder + 1);
    const d = propose(c, { kind: 'restore', partId: id, scope: 'all' }).project;
    assert.deepEqual(d.parts, p.parts);
    assert.deepEqual(d.motion, p.motion);
    assert.equal(d.detail, undefined);
    assert.doesNotThrow(() => assertSimpleSafe(d));
    let empty = structuredClone(p);
    for (const v of p.parts) empty = propose(empty, { kind: 'delete', partId: v.id }).project;
    assert.equal(empty.parts.length, 0);
    for (const v of p.parts)
      empty = propose(empty, { kind: 'restore', partId: v.id, scope: 'all' }).project;
    assert.deepEqual(empty.parts, p.parts);
    assert.equal(empty.detail, undefined);
    if (d.split) assert.doesNotThrow(() => assertGuidanceCompatible(d));
  }
});
test('T162/T166: groups create/rename/membership/opacity/cycles and independent group restore preserve unrelated fields', async () => {
  const p = (await setup()).routes[2]!.p,
    g = p.groups[0]!,
    rename = propose(p, {
      kind: 'group',
      id: g.id,
      name: 'Group rename',
      parentId: g.parentGroupId,
      visible: g.visible,
      opacity: g.opacity ?? 1,
    });
  assert.equal(rename.impact.presentationOnly, true);
  assert.equal(rename.project.detail, undefined);
  const change = propose(p, {
    kind: 'group',
    id: g.id,
    name: g.displayName,
    parentId: g.parentGroupId,
    visible: g.visible,
    opacity: 0.6,
  });
  assert.ok(change.project.detail!.groups.length);
  assert.ok(protectedIds(change.project).length);
  const restored = propose(change.project, { kind: 'restore-group', id: g.id }).project;
  assert.deepEqual(restored.groups, p.groups);
  assert.equal(restored.detail, undefined);
  assert.throws(
    () =>
      propose(p, {
        kind: 'group',
        id: g.id,
        name: g.displayName,
        parentId: g.id,
        visible: true,
        opacity: 1,
      }),
    /CYCLE/,
  );
});
test('T167: route regeneration is blocked for manual structure in actual public models; safe display edits and per-part restore remain available', async () => {
  const f = await setup();
  for (const { p } of f.routes) {
    const q = propose(p, meshOp(p)).project;
    assert.throws(() => assertSimpleSafe(q), /PROTECTED/);
    if (q.assembly) {
      const before = JSON.stringify(q);
      assert.throws(() => selectItem(q, f.catalog, 'hair-b'), /PROTECTED/);
      assert.equal(JSON.stringify(q), before);
    }
    if (q.split) assert.throws(() => assertGuidanceCompatible(q), /PROTECTED/);
    const safe = propose(q, { ...partOp(q), name: 'Manual name kept' }).project;
    assert.equal(safe.parts[0]!.displayName, 'Manual name kept');
  }
});
test('T168: logical part/parameter/binding/group/vertex locations resolve current IDs and reject stale or invalid references', async () => {
  const p = (await setup()).routes[2]!.p;
  for (const loc of [
    { kind: 'part', id: p.parts[0]!.id },
    { kind: 'parameter', id: p.parameters[0]!.id },
    { kind: 'binding', id: p.partBindings[0]!.id },
    { kind: 'group', id: p.groups[0]!.id },
    { kind: 'vertex', id: p.parts[0]!.id, index: 0 },
  ] as const)
    assert.doesNotThrow(() => resolveLocation(p, loc));
  assert.throws(() => resolveLocation(p, { kind: 'part', id: 'removed' }), /PART|LOCATION/);
  assert.throws(
    () => resolveLocation(p, { kind: 'vertex', id: p.parts[0]!.id, index: 999 }),
    /LOCATION/,
  );
});
test('T161/T169: actual session preview is isolated, apply checkpoints once, undo/redo restores complete detailed record', async () => {
  const { s } = await session(),
    p = structuredClone(s.view().project!),
    op = meshOp(p);
  await s.dispatch({ type: 'detail-open', location: { kind: 'part', id: p.parts[0]!.id } });
  assert.equal(s.view().detail!.partId, p.parts[0]!.id);
  await s.dispatch({ type: 'detail-prepare', operation: op, expectedRevision: p.revision });
  assert.deepEqual(s.view().project, p);
  assert.ok(s.view().detail!.project);
  await s.dispatch({
    type: 'detail-apply',
    draftId: s.view().detail!.draftId!,
    expectedRevision: p.revision,
  });
  assert.ok(s.view().project!.detail);
  assert.ok(s.view().recoveries.length);
  await s.dispatch({ type: 'undo' });
  assert.equal(s.view().project!.detail, undefined);
  assert.deepEqual(s.view().project!.motion, p.motion);
  await s.dispatch({ type: 'redo' });
  assert.ok(s.view().project!.detail);
  await s.shutdown();
});
test('T165: actual PNG replacement worker/cache prepares before apply and undo restores original state without deleting original bytes', async () => {
  const { s } = await session(2),
    p = structuredClone(s.view().project!),
    v = p.parts.find((v) => v.role === 'accessory')!;
  await s.dispatch({
    type: 'detail-import',
    partId: v.id,
    state: v.textures[0]!.state,
    expectedRevision: p.revision,
  });
  await until(() => !s.view().detail!.busy);
  assert.equal(s.view().detail!.errorCode, null);
  assert.deepEqual(s.view().project, p);
  const candidate = s.view().detail!.project!;
  assert.equal(candidate.assets.length, p.assets.length + 2);
  await s.dispatch({
    type: 'detail-apply',
    draftId: s.view().detail!.draftId!,
    expectedRevision: p.revision,
  });
  assert.equal(s.view().errorCode, null);
  await s.dispatch({ type: 'undo' });
  assert.deepEqual(s.view().project!.parts, p.parts);
  for (const id of p.inputAssetIds)
    assert.equal(
      hash((await s.cache.read(p.assets.find((a) => a.id === id)!))!),
      p.assets.find((a) => a.id === id)!.fingerprint.sha256,
    );
  await s.shutdown();
});
test('T167/T169: stale revision and replacement guard preserve current project; failed IDs do not lose current selection', async () => {
  const { s } = await session(),
    p = s.view().project!;
  await s.dispatch({ type: 'detail-prepare', operation: meshOp(p), expectedRevision: p.revision });
  const id = s.view().detail!.draftId!;
  await s.dispatch({
    type: 'edit',
    target: 'project-name',
    id: null,
    parameterId: null,
    value: 'Keep new name',
    groupId: null,
    expectedRevision: p.revision,
  });
  await s.dispatch({ type: 'detail-apply', draftId: id, expectedRevision: p.revision });
  assert.equal(s.view().errorCode, 'E_DETAIL_STALE');
  assert.equal(s.view().project!.displayName, 'Keep new name');
  await apply(s, meshOp(s.view().project!));
  const before = JSON.stringify(s.view().project);
  await s.dispatch({
    type: 'parts-select',
    itemId: 'hair-b',
    expectedRevision: s.view().project!.revision,
  });
  assert.equal(s.view().errorCode, 'E_DETAIL_PROTECTED');
  assert.equal(JSON.stringify(s.view().project), before);
  await s.dispatch({ type: 'detail-open', location: { kind: 'part', id: 'missing' } });
  assert.equal(s.view().detail!.errorCode, 'E_DETAIL_LOCATION');
  assert.equal(JSON.stringify(s.view().project), before);
  await s.shutdown();
});
test('T169/T170: three actual route bundles save/duplicate/reopen detailed edits with unchanged sources and nonempty semantic settings', async () => {
  for (let route = 0; route < 3; route++) {
    const { s, dir, output } = await session(route),
      p = s.view().project!,
      original = hash(await readFile(join(dir, 'original.2dsketch')));
    await apply(s, meshOp(p));
    const detail = structuredClone(s.view().project!.detail),
      motion = structuredClone(s.view().project!.motion),
      id = s.view().project!.projectId;
    await s.save(true);
    output(join(dir, 'copy.2dsketch'));
    await s.dispatch({ type: 'duplicate' });
    assert.notEqual(s.view().project!.projectId, id);
    assert.deepEqual(s.view().project!.detail, detail);
    await s.openFile(join(dir, 'saved.2dsketch'));
    assert.deepEqual(s.view().project!.detail, detail);
    assert.deepEqual(s.view().project!.motion, motion);
    assert.equal(hash(await readFile(join(dir, 'original.2dsketch'))), original);
    for (const a of p.assets) assert.equal(hash((await s.cache.read(a))!), a.fingerprint.sha256);
    await s.shutdown();
  }
});
test('T169: cancelled or switched-document PNG job cannot publish old resources or overwrite new project', async () => {
  const f = await setup();
  let entered!: () => void, release!: () => void;
  const started = new Promise<void>((r) => (entered = r)),
    gate = new Promise<void>((r) => (release = r));
  const processor = {
    probe: async (input: ReadonlyMap<string, Buffer>, signal: AbortSignal) => {
      entered();
      signal.addEventListener('abort', () => release(), { once: true });
      await gate;
      return f.processor.probe(input, signal);
    },
  };
  const { s } = await session(0, processor),
    p = s.view().project!,
    v = p.parts[0]!;
  await s.dispatch({
    type: 'detail-import',
    partId: v.id,
    state: v.textures[0]!.state,
    expectedRevision: p.revision,
  });
  await started;
  await s.newProject('Switch kept', 'parts');
  release();
  await new Promise((r) => setTimeout(r, 50));
  assert.equal(s.view().project!.displayName, 'Switch kept');
  assert.equal(s.view().detail!.project, null);
  assert.equal(s.view().project!.detail, undefined);
  await s.shutdown();
});
test('T170: detailed baseline schema rejects invalid asset/parameter references and obsolete minor versions; next minor remains read-only', async () => {
  const p = propose((await setup()).routes[0]!.p, meshOp((await setup()).routes[0]!.p)).project;
  for (const edit of [
    (v: Project) => (v.schemaVersion.minor = 6),
    (v: Project) => (v.detail!.baselines[0]!.part.textures[0]!.assetId = 'missing'),
    (v: Project) => (v.detail!.baselines[0]!.mesh!.yawParameterId = 'missing'),
  ]) {
    const q = structuredClone(p);
    edit(q);
    assert.ok(validateProject(q).length);
  }
  assert.equal(
    readProject({ ...p, schemaVersion: { major: 1, minor: 10 }, future: 'preserved' }).mode,
    'read-only',
  );
  assertProject(p);
});
