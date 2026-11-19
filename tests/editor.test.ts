import { scratchPath } from './temp';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdir, mkdtemp, unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  FIT,
  viewMatrix,
  zoomAt,
  hitPart,
  originalScene,
  layerCorners,
  newestState,
} from '../packages/editor-view';
import { contrastRatio } from '../packages/editor-view/contrast';
import { guidance } from '../packages/editor-view/guidance';
import { transform, inverse, type Affine } from '../packages/coordinates';
import type { PreviewScene } from '../packages/scene-core';
import { TaskCard } from '../apps/renderer/src/ui-foundations';
import { readProject } from '../packages/project-model';
import { ProjectSession } from '../packages/project-session';
import type { JobView } from '../packages/workflow';
const close = (a: number, b: number): void => assert.ok(Math.abs(a - b) < 1e-8, `${a} != ${b}`);
const rectangle = (
  id: string,
  z = 0,
  matrix: Affine = [1, 0, 0, 1, 0, 0],
): PreviewScene['layers'][number] => ({
  id,
  z,
  opacity: 1,
  origin: [0, 0],
  bind: null,
  states: { plain: 'assets/a.png' },
  geometry: { 'assets/a.png': { matrix, crop: { x: 10, y: 20, width: 40, height: 60 } } },
});
test('T098: contrast uses linear luminance and rejects invalid colors', () => {
  close(contrastRatio([0, 0, 0], [255, 255, 255]), 21);
  close(contrastRatio([100, 100, 100], [100, 100, 100]), 1);
  assert.ok(contrastRatio([81, 56, 95], [253, 251, 248]) > 4.5);
  assert.throws(() => contrastRatio([300, 0, 0], [0, 0, 0]), /E_COLOR_VALUE/);
});
test('T100: delayed saving and old-project notifications cannot roll back a newer completed UI snapshot', () => {
  const current = { sequence: 20, saving: false, projectId: 'new' };
  assert.equal(newestState(current, { sequence: 19, saving: true, projectId: 'old' }), current);
  assert.equal(
    newestState(current, { sequence: 21, saving: false, projectId: 'latest' }).projectId,
    'latest',
  );
  assert.throws(
    () => newestState(current, { sequence: NaN, saving: false, projectId: 'bad' }),
    /E_UI_SEQUENCE/,
  );
});
test('T094/T100: fit, zoom-anchor and pan round trips across aspect ratios do not alter model coordinates', () => {
  for (const canvas of [
    [1254, 1254],
    [800, 1600],
    [2400, 800],
  ] as [number, number][])
    for (const size of [
      { x: 420, y: 500 },
      { x: 960, y: 640 },
    ]) {
      const point = { x: canvas[0] * 0.37, y: canvas[1] * 0.61 };
      let view = structuredClone(FIT);
      const anchor = transform(viewMatrix(canvas, size, view), point);
      for (let i = 0; i < 50; i++) {
        view = zoomAt(view, i % 2 ? 1 / 1.1 : 1.1, anchor, size);
        const mapped = transform(viewMatrix(canvas, size, view), point);
        close(mapped.x, anchor.x);
        close(mapped.y, anchor.y);
        const p = transform(inverse(viewMatrix(canvas, size, view)), mapped);
        close(p.x, point.x);
        close(p.y, point.y);
      }
      const panned = viewMatrix(canvas, size, { zoom: 1, pan: { x: 33, y: -19 } });
      const p = transform(panned, point);
      close(p.x, anchor.x + 33);
      close(p.y, anchor.y - 19);
    }
});
test('T094: zoom bounds and invalid values are guarded without modifying previous viewport state', () => {
  const original = structuredClone(FIT);
  assert.equal(zoomAt(FIT, 100, { x: 50, y: 50 }, { x: 100, y: 100 }).zoom, 8);
  assert.equal(zoomAt(FIT, 0.001, { x: 50, y: 50 }, { x: 100, y: 100 }).zoom, 0.25);
  assert.deepEqual(FIT, original);
  for (const factor of [NaN, Infinity, -1, 0])
    assert.throws(
      () => zoomAt(FIT, factor, { x: 0, y: 0 }, { x: 400, y: 400 }),
      /E_VIEWPORT_VALUE/,
    );
});
test('T093/T100: selection follows inverse transform, crop, alpha and actual renderer draw ordering', () => {
  const scene: PreviewScene = {
    version: 1,
    name: 'hit',
    canvas: [100, 100],
    layers: [rectangle('base'), rectangle('eye', 2, [2, 0, 0, 2, 5, 9])],
  };
  assert.equal(
    hitPart(scene, { x: 30, y: 50 }, (path) => (path ? 255 : 0)),
    'eye',
  );
  assert.equal(
    hitPart(scene, { x: 30, y: 50 }, (_p, x) => (x === 12 ? 0 : 255)),
    'base',
  );
  assert.equal(
    hitPart(scene, { x: 9, y: 30 }, () => 255),
    null,
  );
  scene.layers[1]!.opacity = 0;
  assert.equal(
    hitPart(scene, { x: 30, y: 50 }, () => 255),
    'base',
  );
  scene.layers = ['a', 'B', 'a-'].map((id) => rectangle(id));
  assert.equal(
    hitPart(scene, { x: 20, y: 30 }, () => 255),
    'a-',
  );
  assert.deepEqual(layerCorners(rectangle('x')), [
    { x: 10, y: 20 },
    { x: 50, y: 20 },
    { x: 50, y: 80 },
    { x: 10, y: 80 },
  ]);
});
test('T093: inactive eye/mouth states cannot capture selection through transparent or unused patches', () => {
  const layer = rectangle('eye');
  layer.bind = 'eye_left';
  layer.states = { open: 'assets/open.png', closed: 'assets/closed.png' };
  const geom = layer.geometry!['assets/a.png']!;
  layer.geometry = { 'assets/open.png': geom, 'assets/closed.png': geom };
  const scene: PreviewScene = { version: 1, name: 'states', canvas: [100, 100], layers: [layer] };
  assert.equal(
    hitPart(scene, { x: 20, y: 30 }, (path) => (path.includes('open') ? 255 : 0)),
    'eye',
  );
  assert.equal(
    hitPart(scene, { x: 20, y: 30 }, (path) => (path.includes('open') ? 255 : 0), { eye_left: 0 }),
    null,
  );
});
test('T095: original comparison fits full original bytes and is independent of cropped/edited geometry', () => {
  const scene = originalScene([1000, 500], { x: 100, y: 100 }, 'assets/original.png');
  const geometry = scene.layers[0]!.geometry!['assets/original.png']!;
  assert.deepEqual(geometry.crop, { x: 0, y: 0, width: 100, height: 100 });
  assert.deepEqual(transform(geometry.matrix, { x: 0, y: 0 }), { x: 250, y: 0 });
  assert.deepEqual(transform(geometry.matrix, { x: 100, y: 100 }), { x: 750, y: 500 });
});
test('T096: common task UI displays indeterminate work unless counts are measured, with correct cancellation/retry states', () => {
  const job: JobView = {
    protocol: 1,
    jobId: 'id',
    projectId: 'p',
    inputRevision: 2,
    generation: 0,
    processingVersion: '1',
    kind: 'check',
    label: '파일 확인',
    state: 'RUNNING',
    stageId: 'verify-resources',
    progress: 0.8,
    errorCode: null,
    retryOf: null,
    resumedSteps: 0,
  };
  const render = (j: JobView) =>
    renderToStaticMarkup(
      createElement(TaskCard, { job: j, onCancel: () => {}, onRetry: () => {} }),
    );
  const html = render(job);
  assert.match(html, /<progress[^>]*aria-label="처리 중/);
  assert.doesNotMatch(html, /<progress[^>]*value=|80%|예상.*초/);
  assert.match(render({ ...job, state: 'CANCEL_REQUESTED' }), /취소 요청 · 정리 중/);
  assert.match(render({ ...job, state: 'FAILED' }), /다시 시도/);
  assert.doesNotMatch(render({ ...job, state: 'SUCCEEDED' }), /<progress/);
});
test('T097/T099: guidance separates permission, space, version, corruption and missing resources with actionable preservation messages', () => {
  for (const code of [
    'E_SAVE_PERMISSION',
    'E_SAVE_SPACE',
    'E_SCHEMA_MAJOR',
    'E_ZIP_CORRUPT',
    'E_RESOURCE_MISSING',
    'E_PROJECT_SCHEMA',
    'E_SESSION_READ_ONLY',
    'unknown private path',
  ]) {
    const n = guidance(code);
    assert.ok(n.title && n.impact && n.preserved && n.actionLabel);
    assert.ok(['안내', '경고', '작업 차단'].includes(n.severity));
    assert.ok(!JSON.stringify(n).includes('unknown private path'));
  }
  assert.notEqual(guidance('E_SAVE_SPACE').title, guidance('E_SAVE_PERMISSION').title);
  assert.equal(guidance('E_RESOURCE_MISSING').action, 'resources');
  assert.equal(guidance('E_PROJECT_SCHEMA').action, 'parts');
});
async function session() {
  await mkdir(scratchPath('editor-tests'), { recursive: true });
  const dir = await mkdtemp(scratchPath('editor-tests/run-'));
  const opened = readProject(await readFile('assets/product/preview-project.json', 'utf8'));
  if (opened.mode !== 'read-write') throw new Error('fixture');
  const bytes = new Map<string, Buffer>();
  for (const a of opened.project.assets)
    bytes.set(a.id, await readFile(join('assets/product/preview', a.fingerprint.sha256 + '.png')));
  const s = new ProjectSession({
    dataDir: dir,
    dialogs: {
      openProject: async () => null,
      saveProject: async () => null,
      relinkImage: async () => null,
      unsaved: async () => 'discard',
    },
    bundled: opened.project,
    bundledBytes: bytes,
    autoTimers: false,
  });
  await s.init();
  await s.newProject('editor', 'parts');
  await s.dispatch({ type: 'sample' });
  return { s, bytes };
}
const settled = async (s: ProjectSession): Promise<JobView> => {
  const start = Date.now();
  while (!['SUCCEEDED', 'FAILED', 'CANCELLED'].includes(s.view().jobs.at(-1)?.state ?? '')) {
    if (Date.now() - start > 10000) throw new Error('timeout');
    await new Promise((r) => setTimeout(r, 5));
  }
  return s.view().jobs.at(-1)!;
};
test('T095/T100: real session original scene grants original resource only; view/checking never edits project/output profiles', async () => {
  const { s } = await session();
  const before = JSON.stringify(s.view().project);
  const original = s.view().originalScene!;
  assert.equal(original.layers.length, 1);
  const path = original.layers[0]!.states.original!;
  const [, token, name] = /assets\/session\/([^/]+)\/(.+)/.exec(path)!;
  assert.ok(await s.resource(token!, name!));
  assert.equal(await s.resource(token!, 'unknown.png'), null);
  await s.dispatch({ type: 'check-resources' });
  assert.equal((await settled(s)).state, 'SUCCEEDED');
  assert.equal(JSON.stringify(s.view().project), before);
  assert.ok(s.view().dirty);
  await s.shutdown();
});
test('T096/T097/T100: actual missing cache file fails check, preserves current edits, and retry uses latest revision after repair', async () => {
  const { s, bytes } = await session();
  const p = s.view().project!;
  const asset = p.assets[0]!;
  await unlink(s.cache.path(asset));
  await s.dispatch({ type: 'check-resources' });
  const failed = await settled(s);
  assert.equal(failed.state, 'FAILED');
  assert.equal(failed.errorCode, 'E_RESOURCE_MISSING');
  assert.equal(s.view().project!.revision, p.revision);
  await s.dispatch({
    type: 'edit',
    target: 'project-name',
    id: null,
    parameterId: null,
    value: 'latest manual edit',
    expectedRevision: p.revision,
    groupId: null,
  });
  await s.cache.put(asset, bytes.get(asset.id)!);
  await s.dispatch({ type: 'retry-task', id: failed.jobId });
  const success = await settled(s);
  assert.equal(success.state, 'SUCCEEDED');
  assert.equal(success.inputRevision, s.view().project!.revision);
  assert.equal(s.view().project!.displayName, 'latest manual edit');
  await s.shutdown();
});
test('T096/T100: cancellation and project switch revoke actual resource checks without cross-project result application', async () => {
  const { s } = await session();
  const initial = JSON.stringify(s.view().project);
  await s.dispatch({ type: 'check-resources' });
  const id = s.view().jobs.at(-1)!.jobId;
  await s.dispatch({ type: 'cancel-task', id });
  assert.equal((await settled(s)).state, 'CANCELLED');
  assert.equal(JSON.stringify(s.view().project), initial);
  await s.dispatch({ type: 'retry-task', id });
  await s.newProject('next route', 'split-image');
  assert.equal(s.view().jobs.length, 0);
  assert.equal(s.view().project!.sourceType, 'split-image');
  await s.shutdown();
});
