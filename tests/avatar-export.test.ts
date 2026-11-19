import { scratchPath } from './temp';
import { exportContentHash } from '../packages/avatar-export/identity';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, mkdtemp, readdir, rename } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID, createHash } from 'node:crypto';
import { readProject, type Project } from '../packages/project-model';
import { projectToPreview } from '../packages/project-model/preview';
import { NEUTRAL, type PreviewLayer } from '../packages/scene-core';
import { inspectCompatibility } from '../packages/export-check';
import { CompatibilityService } from '../packages/export-check/service';
import { TARGET_ID, type TargetOptions } from '../packages/export-check/types';
import { convertAvatar } from '../packages/avatar-export/converter';
import { parseINP, REPORT_EXTENSION, sha, encodeINP } from '../packages/avatar-export/inp';
import { encodePNG, decodePNG } from '../packages/avatar-export/png';

import { bakeLayer } from '../packages/avatar-export/textures';
import { evaluated, separabilityError } from '../packages/avatar-export/geometry';
import { nativePreview } from '../packages/avatar-export/preview';
import { writeINP, targetHash } from '../packages/avatar-export/atomic';
import { AvatarExportService, type PrivateExportRecord } from '../packages/avatar-export/service';
let cached: Promise<{ project: Project; resources: Map<string, Buffer> }> | undefined;
test('RGB and RGBA split-IDAT textures decode all five row filters exactly', () => {
  const fixtures = [
    [
      3,
      'iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAIAAAAPE8H1AAAACUlEQVR4nGNgcO+7KpOYZoaEAAAAL0lEQVS86qMFY+fv3DAwYOrccp/LNKF720PmSTyshu4xRe2yLJ1b7if1JnRvuwkA+DgU6/TbmqgAAAAASUVORK5CYII=',
    ],
    [
      4,
      'iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAACUlEQVR4nGNgcO+7KpOYZoaEAAAAO0lEQVS86qNF/TFexs7fufdPQAFT55b7XKYJ3dse8pgnMU/iYa3XdriWzSimc5AFJHPmzOptZ86cOQMAAnogDBLiItQAAAAASUVORK5CYII=',
    ],
  ] as const;
  for (const [channels, source] of fixtures) {
    const { rgba, width, height } = decodePNG(Buffer.from(source, 'base64'));
    assert.equal(width, 3);
    assert.equal(height, 5);
    const expected = Buffer.alloc(width * height * 4, 255);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width * channels; x++) {
        const pixel = y * width + Math.floor(x / channels);
        expected[4 * pixel + (x % channels)] = (x * 71 + y * 137 + x * y * 43) & 255;
      }
    }
    assert.deepEqual(rgba, expected);
  }
});

async function fixture() {
  cached ??= (async () => {
    const r = readProject(await readFile('assets/product/preview-project.json', 'utf8'));
    if (r.mode !== 'read-write') throw new Error('fixture');
    const resources = new Map<string, Buffer>();
    for (const a of r.project.assets)
      resources.set(
        a.id,
        await readFile(join('assets/product/preview', a.fingerprint.sha256 + '.png')),
      );
    return { project: r.project, resources };
  })();
  const f = await cached;
  return { project: structuredClone(f.project), resources: new Map(f.resources) };
}
const basis = (p: Project) => ({
  source: 'working' as const,
  projectId: p.projectId,
  revision: p.revision,
  fingerprint: createHash('sha256').update(JSON.stringify(p)).digest('hex'),
});
const opts = (p: Project): TargetOptions => ({
  targetId: TARGET_ID,
  parameterMap: p.parameters.map((v) => ({
    parameterId: v.id,
    targetName: v.previewKey ?? v.semantic,
  })),
});
async function converted() {
  const f = await fixture(),
    b = basis(f.project),
    check = inspectCompatibility(f.project, b, opts(f.project), new Set(f.resources.keys()));
  assert.notEqual(check.status, 'BLOCKED');
  check.acknowledged = true;
  return {
    ...(await convertAvatar(
      { ...f, basis: b },
      check,
      true,
      (b) => b,
      new AbortController().signal,
    )),
    f,
    check,
  };
}
let built: ReturnType<typeof converted> | undefined;
const avatar = () => (built ??= converted());
async function directory() {
  await mkdir(scratchPath('avatar-export-tests'), { recursive: true });
  return mkdtemp(scratchPath('avatar-export-tests/run-'));
}
async function service() {
  let running = false;
  let writer: typeof writeINP = writeINP;
  const f = await fixture();
  let valid = true,
    rows: PrivateExportRecord[] = [],
    choose: string | null = null,
    locate: string | null = null;
  const dir = await directory();
  choose = join(dir, 'avatar.inp');
  const compatibility = new CompatibilityService(
      async () => ({ ...f, basis: basis(f.project) }),
      () => valid,
    ),
    check = await compatibility.inspect(
      'working',
      f.project.projectId,
      f.project.revision,
      opts(f.project),
    );
  compatibility.acknowledge(check.id, check.signature, check.warningScope);
  const s = new AvatarExportService({
    compatibility,
    validate: () => valid,
    validateReceipt: (b, h) =>
      valid && b.revision === f.project.revision && exportContentHash(f.project) === h,
    canonicalize: (b) => b,
    running: () => running,
    write: (...args) => writer(...args),
    choose: async () => choose,
    locate: async () => locate,
    records: async () => structuredClone(rows),
    persist: async (next) => {
      rows = structuredClone(next);
    },
    reveal: () => {},
  });
  return {
    s,
    f,
    check,
    dir,
    setRunning: (v: boolean) => {
      running = v;
    },
    setWriter: (v: typeof writeINP) => {
      writer = v;
    },
    rows: () => rows,
    setValid: (v: boolean) => {
      valid = v;
    },
    setChoice: (v: string | null) => {
      choose = v;
    },
    setLocate: (v: string | null) => {
      locate = v;
    },
    prepare: () => s.prepare(randomUUID(), check.id, opts(f.project), true),
  };
}

test('strict PNG round-trip validates CRC and rejects malformed/inflation input', () => {
  const p = {
      width: 2,
      height: 2,
      rgba: Buffer.from([255, 0, 0, 128, 0, 255, 0, 255, 0, 0, 255, 1, 0, 0, 0, 0]),
    },
    b = encodePNG(p);
  assert.deepEqual(decodePNG(b), p);
  const corrupt = Buffer.from(b);
  corrupt[45] = corrupt[45]! ^ 1;
  assert.throws(() => decodePNG(corrupt), /E_AVATAR_TEXTURE/);
  assert.throws(() => decodePNG(Buffer.alloc(40)), /E_AVATAR_TEXTURE/);
});
test('real premium project becomes a self-contained valid native INP without original mutation', async () => {
  const a = await avatar(),
    parsed = parseINP(a.bytes);
  assert.equal(parsed.model.param.length, 5);
  assert.equal(parsed.textures.length, a.report.textures.length);
  assert.ok(parsed.nodes.size > 5);
  assert.equal(a.report.revision, a.f.project.revision);
  assert.ok(parsed.extensions[REPORT_EXTENSION]);
  assert.ok(parsed.model.animations['2DSketcher-demo']);
  assert.equal(JSON.stringify(a.f.project), JSON.stringify((await fixture()).project));
  assert.ok(a.report.parts.every((p) => p.nodes.length > 0));
});
test('parameter ranges/defaults and exported pose are preserved, including asymmetric neutral', async () => {
  const f = await fixture(),
    p = f.project.parameters.find((v) => v.previewKey === 'head_yaw')!;
  p.min = -20;
  p.neutral = 5;
  p.max = 40;
  f.project.motion!.settings.pose = [{ parameterId: p.id, value: 7 }];
  const b = basis(f.project),
    c = inspectCompatibility(f.project, b, opts(f.project), new Set(f.resources.keys()));
  c.acknowledged = true;
  const r = await convertAvatar(
      { ...f, basis: b },
      c,
      false,
      (b) => b,
      new AbortController().signal,
    ),
    n = parseINP(r.bytes).model.param.find((v) => v.name === 'head_yaw')!;
  assert.equal(n.min[0], -20);
  assert.equal(n.max[0], 40);
  assert.equal(n.defaults[0], 7);
  assert.ok(n.axis_points[0]!.includes(25 / 60));
});
test('native weighted yaw and roll preserve combined source vertices within 0.05 pixels', async () => {
  const a = await avatar(),
    p = parseINP(a.bytes),
    source = projectToPreview(a.f.project);
  for (const q of [-1, -0.83, -0.5, -0.13, 0, 0.27, 0.5, 0.89, 1]) {
    const input = { ...NEUTRAL, head_yaw: q, head_roll: -q },
      scene = nativePreview(p, a.f.project, input, null, (i) => 'assets/t' + i + '.png');
    for (const layer of source.layers) {
      assert.ok(separabilityError(layer) <= 0.02);
      const expected = evaluated(layer, input),
        ids = a.report.parts.find((v) => v.sourceId === layer.id)!.nodes;
      for (const l of scene.layers.filter((v) => ids.includes(Number(v.id.slice(5)))))
        l.mesh!.vertices.forEach((v, i) =>
          assert.ok(
            Math.hypot(v.position[0] - expected[i]!.x, v.position[1] - expected[i]!.y) < 0.05,
          ),
        );
    }
  }
});
test('65 pixel-interpolated states preserve premultiplied RGBA at grid points', async () => {
  const l: PreviewLayer = {
      id: 'eye',
      z: 0,
      origin: [0, 0],
      opacity: 1,
      bind: 'eye_left',
      stateBlend: 'interpolate',
      states: { closed: 'a', open: 'b' },
      geometry: {
        a: { matrix: [1, 0, 0, 1, 0, 0], crop: { x: 0, y: 0, width: 1, height: 1 } },
        b: { matrix: [1, 0, 0, 1, 0, 0], crop: { x: 0, y: 0, width: 1, height: 1 } },
      },
    },
    images = new Map([
      ['a', { width: 1, height: 1, rgba: Buffer.from([255, 0, 0, 128]) }],
      ['b', { width: 1, height: 1, rgba: Buffer.from([0, 0, 255, 255]) }],
    ]),
    r = await bakeLayer(l, images);
  assert.equal(r.length, 65);
  const p = decodePNG(r[32]!.bytes),
    i = p.rgba.findIndex((_, j) => j % 4 === 3 && p.rgba[j]! > 0) - 3;
  assert.deepEqual([...p.rgba.subarray(i, i + 4)], [64, 0, 128, 192]);
  assert.ok(r.every((v) => decodePNG(v.bytes).rgba[3] === 0));
});
test('color baking retains alpha and produces independent premultiplied texture bytes', async () => {
  const l: PreviewLayer = {
      id: 'hair',
      z: 0,
      origin: [0, 0],
      opacity: 1,
      bind: null,
      states: { base: 'a' },
      color: { hueDegrees: 18, minimumHue: 0, maximumHue: 1, minimumSaturation: 0 },
      geometry: { a: { matrix: [1, 0, 0, 1, 0, 0], crop: { x: 0, y: 0, width: 1, height: 1 } } },
    },
    r = await bakeLayer(
      l,
      new Map([['a', { width: 1, height: 1, rgba: Buffer.from([255, 0, 0, 128]) }]]),
    ),
    p = decodePNG(r[0]!.bytes),
    i = p.rgba.findIndex((_, j) => j % 4 === 3 && p.rgba[j]! > 0) - 3;
  assert.equal(p.rgba[i], 128);
  assert.ok(p.rgba[i + 1]! > 30);
  assert.equal(p.rgba[i + 3], 128);
});
test('missing or changed source resource is rejected before a native file can be made', async () => {
  const a = await avatar(),
    resources = new Map(a.f.resources);
  resources.delete(a.f.project.parts[0]!.textures[0]!.assetId);
  await assert.rejects(
    convertAvatar(
      { ...a.f, resources, basis: basis(a.f.project) },
      a.check,
      true,
      (b) => b,
      new AbortController().signal,
    ),
    /E_AVATAR_RESOURCE/,
  );
});
test('binary revalidation rejects graph, texture, binding and trailing-byte corruption', async () => {
  const a = await avatar(),
    p = parseINP(a.bytes);
  assert.throws(() => parseINP(Buffer.concat([a.bytes, Buffer.from([0])])), /E_AVATAR_INP/);
  const m = structuredClone(p.model);
  m.param[0]!.bindings[0]!.node = 999999;
  assert.throws(() => encodeINP(m, p.textures, p.extensions), /E_AVATAR_BINDING/);
  const broken = Buffer.from(p.textures[0]!);
  broken[50] = broken[50]! ^ 1;
  assert.throws(
    () => encodeINP(p.model, [broken, ...p.textures.slice(1)], p.extensions),
    /E_AVATAR_TEXTURE/,
  );
});
test('non-INP output paths are rejected and unrelated files are unchanged', async () => {
  const a = await avatar(),
    d = await directory(),
    file = join(d, 'unrelated.txt');
  await writeFile(file, 'keep');
  await assert.rejects(
    writeINP(file, a.bytes, sha(Buffer.from('keep')), new AbortController().signal),
    /E_AVATAR_PATH/,
  );
  assert.equal(await readFile(file, 'utf8'), 'keep');
});
test('cancellation before commit preserves previous native file and clears owned temp files', async () => {
  const a = await avatar(),
    d = await directory(),
    file = join(d, 'a.inp');
  await writeFile(file, a.bytes);
  const c = new AbortController();
  await assert.rejects(
    writeINP(file, a.bytes, sha(a.bytes), c.signal, (phase) => {
      if (phase === 'after-sync') c.abort();
    }),
    /E_AVATAR_CANCELLED/,
  );
  assert.equal(await targetHash(file), sha(a.bytes));
  assert.deepEqual(await readdir(d), ['a.inp']);
});
test('write, flush and final-rename boundary failures preserve old result and unrelated files', async () => {
  const a = await avatar();
  for (const phase of ['before-write', 'after-sync', 'before-replace']) {
    const d = await directory(),
      file = join(d, 'a.inp');
    await writeFile(file, a.bytes);
    await writeFile(join(d, 'keep.txt'), 'keep');
    await assert.rejects(
      writeINP(file, a.bytes, sha(a.bytes), new AbortController().signal, (p) => {
        if (p === phase) throw Object.assign(new Error('fault'), { code: 'ENOSPC' });
      }),
    );
    assert.equal(await targetHash(file), sha(a.bytes));
    assert.deepEqual((await readdir(d)).sort(), ['a.inp', 'keep.txt']);
  }
});
test('external modification is detected by compare-and-swap before native replacement', async () => {
  const a = await avatar(),
    d = await directory(),
    file = join(d, 'a.inp');
  await writeFile(file, a.bytes);
  await assert.rejects(
    writeINP(file, a.bytes, sha(a.bytes), new AbortController().signal, async (phase) => {
      if (phase === 'before-replace') await writeFile(file, 'external');
    }),
    /E_AVATAR_CONFLICT/,
  );
  assert.equal(await readFile(file, 'utf8'), 'external');
});
test('compatibility pin requires exact acknowledgement and freezes asset/project snapshots', async () => {
  const f = await fixture();
  let valid = true;
  const s = new CompatibilityService(
      async () => ({ ...f, basis: basis(f.project) }),
      () => valid,
    ),
    r = await s.inspect('working', f.project.projectId, f.project.revision, opts(f.project));
  assert.throws(() => s.pin(r.id, opts(f.project)), /E_AVATAR_CHECK/);
  s.acknowledge(r.id, r.signature, r.warningScope);
  const pin = s.pin(r.id, opts(f.project));
  pin.input.project.displayName = 'changed';
  pin.input.resources.values().next().value!.fill(0);
  assert.notEqual(s.pin(r.id, opts(f.project)).input.project.displayName, 'changed');
  assert.notEqual(s.pin(r.id, opts(f.project)).input.resources.values().next().value![0], 0);
  valid = false;
  assert.throws(() => s.pin(r.id, opts(f.project)), /E_EXPORT_STALE/);
  s.close();
});
test('late cancellation cannot publish a completed prepared avatar', async () => {
  const x = await service(),
    id = randomUUID(),
    pending = x.s.prepare(id, x.check.id, opts(x.f.project), true);
  const cancelled = x.s.cancel(id);
  await assert.rejects(pending, /E_AVATAR_CANCELLED/);
  assert.equal((await cancelled).cancelled, true);
  assert.equal(x.s.stats().preparing, false);
  assert.equal(x.s.stats().prepared, false);
  assert.equal(x.s.stats().resources, 0);
});
test('prepared preview interprets actual native bytes and save requires reviewed exact digest', async () => {
  const x = await service();
  x.setRunning(true);
  await assert.rejects(x.prepare(), /E_AVATAR_DEFER/);
  x.setRunning(false);
  const ticket = await x.prepare();
  const scene = x.s.preview(ticket.id, NEUTRAL, null);
  assert.ok(scene.premultipliedTextures && scene.layers.length);
  assert.ok(x.s.resource(Object.values(scene.layers[0]!.states)[0]!));
  await assert.rejects(x.s.save(ticket.id, 'wrong'), /E_AVATAR_STALE/);
  x.s.cancel(randomUUID());
  assert.equal(x.s.stats().prepared, true);
  x.s.close();
  assert.equal(x.s.stats().resources, 0);
});
test('real native save returns sanitized receipt and explicitly tracks newer edits during write', async () => {
  const x = await service(),
    t = await x.prepare();
  x.setWriter(async (...args) => {
    x.setValid(false);
    return writeINP(...args);
  });
  const r = await x.s.save(t.id, t.sha256);
  assert.ok(r);
  assert.equal(r.newerEdits, true);
  assert.equal(await targetHash(join(x.dir, 'avatar.inp')), t.sha256);
  assert.equal(JSON.stringify(r).includes(x.dir), false);
  assert.equal(r.state, 'WRITTEN');
  x.setValid(false);
  assert.equal((await x.s.list())[0]!.current, false);
  x.s.close();
});
test('user confirmation is separate from file generation and version/current-hash constrained', async () => {
  const x = await service(),
    t = await x.prepare(),
    r = (await x.s.save(t.id, t.sha256))!;
  assert.equal(r.confirmation, null);
  x.f.project.savedRevision = x.f.project.revision;
  x.f.project.modifiedAt = new Date().toISOString();
  assert.equal((await x.s.list())[0]!.current, true);
  await assert.rejects(x.s.confirm(r.id, '0.9.0'), /E_AVATAR_VERSION/);
  assert.equal((await x.s.confirm(r.id, '0.8.7')).confirmation!.method, 'USER_CONFIRMED');
  x.setValid(false);
  await assert.rejects(x.s.confirm(r.id, '0.8.7'), /E_AVATAR_STALE/);
  x.s.close();
});
test('moved outputs retain embedded resources and can reconnect only with the same digest', async () => {
  const x = await service(),
    t = await x.prepare(),
    r = (await x.s.save(t.id, t.sha256))!;
  await rename(join(x.dir, 'avatar.inp'), join(x.dir, 'moved.inp'));
  assert.equal((await x.s.list())[0]!.fileState, 'MISSING');
  await writeFile(join(x.dir, 'wrong.inp'), 'wrong');
  x.setLocate(join(x.dir, 'wrong.inp'));
  await assert.rejects(x.s.relocate(r.id), /E_AVATAR_CHANGED/);
  x.setLocate(join(x.dir, 'moved.inp'));
  assert.equal((await x.s.relocate(r.id))!.name, 'moved.inp');
  assert.equal((await x.s.list())[0]!.fileState, 'PRESENT');
  x.s.close();
});
test('re-export creates a new result identity and never inherits old external confirmation', async () => {
  const x = await service(),
    t = await x.prepare(),
    a = (await x.s.save(t.id, t.sha256))!;
  await x.s.confirm(a.id, '0.8.7');
  x.setChoice(join(x.dir, 'second.inp'));
  const b = (await x.s.save(t.id, t.sha256))!;
  assert.notEqual(a.id, b.id);
  assert.equal(b.confirmation, null);
  assert.equal(
    (await x.s.list()).find((v) => v.id === a.id)!.confirmation!.method,
    'USER_CONFIRMED',
  );
  x.setChoice(null);
  assert.equal(await x.s.save(t.id, t.sha256), null);
  x.s.close();
});
test('unrepresentable coupled transforms and changed expression anchors remain blocked', async () => {
  const f = await fixture(),
    yaw = f.project.parameters.find((p) => p.previewKey === 'head_yaw')!,
    roll = f.project.parameters.find((p) => p.previewKey === 'head_roll')!,
    part = f.project.parts[0]!;
  f.project.partBindings.push(
    {
      id: randomUUID(),
      partId: part.id,
      parameterId: yaw.id,
      kind: 'transform',
      mapping: { component: 'translate-x', outputRange: [-30, 30] },
    },
    {
      id: randomUUID(),
      partId: part.id,
      parameterId: roll.id,
      kind: 'transform',
      mapping: { component: 'rotate-degrees', outputRange: [-6, 6] },
    },
  );
  f.project.expressions[0]!.values[0]!.partIds = [part.id];
  const r = inspectCompatibility(
    f.project,
    basis(f.project),
    opts(f.project),
    new Set(f.resources.keys()),
  );
  assert.equal(r.status, 'BLOCKED');
  assert.ok(r.issues.some((i) => i.code === 'COUPLED_DEFORM'));
  assert.ok(r.issues.some((i) => i.code === 'EXPRESSION_SCOPE'));
});
