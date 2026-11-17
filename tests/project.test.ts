import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdirSync, mkdtempSync, cpSync, renameSync, appendFileSync, symlinkSync, writeFileSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { createProject, editProject, acknowledgeSave, isDirty, renamePart, serializeProject, readProject, validateProject, assertProject,
  createMachineSettings, assertMachineSettings, mapInputs, type Project } from '../packages/project-model';
import { coordinatesFor, partWorldTransform } from '../packages/project-model/geometry';
import { projectToPreview, previewParameters } from '../packages/project-model/preview';
import { multiply, inverse, transform, translate, scale, rotate, viewport, fitRect, IDENTITY, CoordinateMap } from '../packages/coordinates';
import { inspectProjectResources, findRelinkCandidates, relinkAsset } from '../packages/project-io';
const routes = ['parts','single-image','split-image'] as const;
const load = (route = 'single-image'): Project => {
  const result = readProject(readFileSync(`tests/fixtures/common-model/${route}/project.json`,'utf8'));
  assert.equal(result.mode,'read-write'); if (result.mode !== 'read-write') throw new Error('Unexpected version'); return result.project;
};
const premium = (): Project => { const p: unknown = JSON.parse(readFileSync('assets/product/preview-project.json','utf8')); assertProject(p); return p; };
const codes = (p: Project): string[] => validateProject(p).map(v => v.code);
const close = (a: number, b: number, epsilon = 1e-7): void => { assert.ok(Math.abs(a-b) <= epsilon*Math.max(1,Math.abs(a),Math.abs(b)),`${a} != ${b}`); };

test('T061: identity is independent from names, paths, routes and canonical UTC timestamps', () => {
  const now = new Date('2026-11-16T09:00:00.000Z');
  const projects = routes.map(route => createProject('  같은 이름  ',route,now));
  assert.equal(new Set(projects.map(p => p.projectId)).size,3);
  for (const p of projects) { assert.equal(p.displayName,'같은 이름'); assert.equal(p.createdAt,now.toISOString()); assert.equal(p.savedRevision,null); }
  const renamed = editProject(projects[0]!,p => { p.displayName = '다른 이름'; },now);
  assert.equal(renamed.projectId,projects[0]!.projectId); assert.equal(projects[0]!.displayName,'같은 이름');
  for (const mutation of [(p: Project) => { p.createdAt = '2026-02-30T00:00:00.000Z'; }, (p: Project) => { p.modifiedAt = '2025-01-01T00:00:00.000Z'; }]) { const p = load(); mutation(p); assert.ok(codes(p).includes('E_PROJECT_TIME')); }
});

test('T062: save acknowledgement records the saved snapshot and preserves later dirty edits', () => {
  let p = createProject('Revision test','parts'); assert.ok(isDirty(p));
  p = acknowledgeSave(p,0); assert.equal(isDirty(p),false);
  const old = p; p = editProject(p,draft => { draft.displayName = 'Edited'; });
  assert.equal(p.revision,1); assert.equal(p.savedRevision,0); assert.ok(isDirty(p)); assert.equal(old.revision,0);
  p = editProject(p,draft => { draft.displayName = 'Edited again'; });
  p = acknowledgeSave(p,1); assert.equal(p.revision,2); assert.equal(p.savedRevision,1); assert.ok(isDirty(p));
  assert.throws(() => acknowledgeSave(p,0),/E_SAVE_STALE/); assert.throws(() => acknowledgeSave(p,3),/E_REVISION_RANGE/);
  assert.throws(() => editProject(p,draft => { draft.projectId = 'changed'; }),/E_PROJECT_IDENTITY_EDIT/);
  const before = serializeProject(p); assert.throws(() => editProject(p,draft => { draft.canvas.width = 0; })); assert.equal(serializeProject(p),before);
  assert.equal(isDirty(acknowledgeSave(p,2)),false);
});

test('T063: original, automatic completion and manual edit lineage survives serialization', () => {
  const p = load(); const original = p.assets.find(a => p.inputAssetIds.includes(a.id))!;
  const auto = structuredClone(original); auto.id = 'asset-completion'; auto.kind = 'supplement-image'; auto.origin = 'auto-completion'; auto.parentAssetIds = [original.id];
  const manual = structuredClone(auto); manual.id = 'asset-manual'; manual.kind = 'edited-image'; manual.origin = 'manual-edit'; manual.parentAssetIds = [auto.id];
  const next = editProject(p,draft => { draft.assets.push(auto,manual); });
  const opened = readProject(serializeProject(next)); assert.equal(opened.mode,'read-write');
  if (opened.mode === 'read-write') assert.deepEqual(opened.project.assets.slice(-2).map(a => a.parentAssetIds),[[original.id],[auto.id]]);
  assert.deepEqual(p.assets.find(a => a.id === original.id),original);
  next.assets.at(-1)!.parentAssetIds = []; assert.ok(codes(next).includes('E_PROVENANCE_PARENT'));
});

test('T064: duplicate names and renaming preserve texture, group, parent and parameter ID references', () => {
  const p = load('parts'); const first = p.parts[0]!; const second = p.parts[1]!;
  second.parentId = first.id; second.displayName = first.displayName;
  const next = renamePart(p,first.id,'重複 이름'); assert.equal(next.parts[0]!.id,first.id);
  assert.equal(next.parts[1]!.parentId,first.id); assert.deepEqual(next.partBindings,p.partBindings);
  assert.deepEqual(next.parts[0]!.textures,first.textures); assert.deepEqual(next.groups,p.groups); assert.deepEqual(codes(next),[]);
  const scene = projectToPreview(next); const order = scene.layers.map(l => l.id);
  next.parts.reverse(); assert.deepEqual(projectToPreview(next).layers.map(l => l.id),order);
});

test('T065: known crop, scale, parent rotation, zoom, pan, mirror and output mapping keep one source anchor', () => {
  const p = premium(); const root = p.parts[0]!; const child = p.parts[1]!; const texture = child.textures[0]!; const asset = p.assets.find(a => a.id === texture.assetId)!;
  root.localTransform = translate(100,200); child.parentId = root.id; child.localTransform = multiply(translate(10,20),rotate(90));
  asset.sourceRegion = { x:20,y:30,width:60,height:40 }; asset.sourceToEdited = multiply(scale(2),translate(-20,-30)); texture.assetToLocal = translate(5,7);
  const view = { width:1000,height:1000,zoom:2,pan:{ x:15,y:-25 },mirror:false };
  const output = { ...p.broadcastProfiles[0]!,width:400,height:400,region:{ x:50,y:100,width:100,height:200 } };
  const snapshot = serializeProject(p); const map = coordinatesFor(p,child.id,texture.state,view,output); const source = { x:40,y:50 };
  assert.deepEqual(map.convert(source,'source','edited'),{ x:40,y:40 }); assert.deepEqual(map.convert(source,'source','local'),{ x:45,y:47 });
  const project = map.convert(source,'source','project'); close(project.x,63); close(project.y,265);
  const screen = map.convert(source,'source','screen'); close(screen.x,515+2*(63*1000/1254-500)); close(screen.y,475+2*(265*1000/1254-500));
  const pixel = map.convert(screen,'screen','output'); close(pixel.x,126); close(pixel.y,330);
  const restored = map.convert(pixel,'output','source'); close(restored.x,40); close(restored.y,50);
  const mirrored = coordinatesFor(p,child.id,texture.state,{ ...view,mirror:true },output).convert(source,'source','screen');
  close(mirrored.x,515+2*((1254-63)*1000/1254-500)); close(mirrored.y,screen.y);
  assert.equal(serializeProject(p),snapshot);
  const preview = projectToPreview(p); const geometry = preview.layers.find(l => l.id === child.id)!.geometry!;
  const modelPoint = transform(Object.values(geometry)[0]!.matrix,source); close(modelPoint.x,project.x); close(modelPoint.y,project.y);
});

test('T065: deterministic affine stress round-trips and singular/nonfinite rejection', () => {
  let seed = 173; const random = (): number => { seed = (seed*1664525+1013904223)>>>0; return seed/4294967296; };
  for (let i = 0; i < 400; i++) {
    const matrix = multiply(translate(random()*2000-1000,random()*2000-1000),multiply(rotate(random()*720-360),scale(.1+random()*4,.1+random()*4)));
    const point = { x:random()*4096,y:random()*4096 }; const back = transform(inverse(matrix),transform(matrix,point)); close(back.x,point.x); close(back.y,point.y);
  }
  assert.throws(() => inverse([1,2,2,4,0,0]),/E_COORDINATE_SINGULAR/); assert.throws(() => inverse([1,0,0,1,Infinity,0]));
  assert.throws(() => viewport({ x:0,y:0,width:100,height:100 },100,100,0,{ x:0,y:0 }));
  assert.throws(() => fitRect({ x:0,y:0,width:0,height:100 },{ x:0,y:0,width:100,height:100 }));
  assert.throws(() => transform(IDENTITY,{ x:NaN,y:0 }));
  const source = translate(2,3); const map = new CoordinateMap(source,IDENTITY,IDENTITY,IDENTITY,IDENTITY);
  source[4] = 999; assert.deepEqual(map.convert({ x:0,y:0 },'source','edited'),{ x:2,y:3 });
});

test('T066: local calibration maps device samples to independent character parameters and fallbacks', () => {
  const p = load(); const machine = createMachineSettings(p); const binding = p.inputBindings.find(v => v.channel === 'mouth')!;
  machine.cameraId = 'opaque-machine-camera'; machine.microphoneId = 'opaque-machine-mic'; machine.calibrations = [{ bindingId:binding.id,inputRange:[10,110] }];
  const before = serializeProject(p); const values = mapInputs(p,machine,new Map([['face:mouth',60]])); close(values.get(binding.parameterId)!,0.5);
  assert.equal(serializeProject(p),before); assert.ok(!before.includes(machine.cameraId));
  assert.equal(mapInputs(p,machine,new Map()).get(binding.parameterId),0);
  binding.fallback.mode = 'hold'; assert.equal(mapInputs(p,machine,new Map(),new Map([[binding.parameterId,.7]])).get(binding.parameterId),.7);
  binding.fallback.mode = 'constant'; binding.fallback.value = .2; assert.equal(mapInputs(p,machine,new Map()).get(binding.parameterId),.2);
  binding.invert = true; assert.equal(mapInputs(p,machine,new Map([['face:mouth',110]])).get(binding.parameterId),0);
  assert.throws(() => mapInputs(p,machine,new Map([['face:mouth',NaN]])),/E_INPUT_NONFINITE/);
  assert.equal(previewParameters(p,new Map([[binding.parameterId,.8]])).mouth,.8);
  const wrong = { ...machine,projectId:'another-project' }; assert.throws(() => assertMachineSettings(wrong,p),/E_MACHINE_PROJECT/);
});

test('T067: expressions, runtime, output and export settings survive round-trip; device data stays local', () => {
  const p = load(); const opened = readProject(serializeProject(p)); assert.equal(opened.mode,'read-write');
  if (opened.mode === 'read-write') for (const key of ['expressions','runtimeProfile','broadcastProfiles','exportProfiles'] as const) assert.deepEqual(opened.project[key],p[key]);
  const invalid = { ...p,cameraId:'opaque-private-camera' }; assert.ok(validateProject(invalid).some(v => v.code === 'E_PROJECT_SCHEMA'));
  const machine = createMachineSettings(p); machine.calibrations = [{ bindingId:'deleted-binding',inputRange:[0,1] }];
  assert.throws(() => assertMachineSettings(machine,p),/E_MACHINE_CALIBRATION/);
});

test('T068: missing, cyclic, duplicate, stale-version and ambiguous references produce targeted failures', () => {
  const cases: [string,(p: Project) => void][] = [
    ['E_DUPLICATE_ID',p => { p.parts.push(structuredClone(p.parts[0]!)); }],
    ['E_REFERENCE_CYCLE',p => { p.parts[0]!.parentId = p.parts[1]!.id; p.parts[1]!.parentId = p.parts[0]!.id; }],
    ['E_REFERENCE_CYCLE',p => { p.groups[0]!.parentGroupId = p.groups[0]!.id; }],
    ['E_REFERENCE_CYCLE',p => { p.assets[0]!.parentAssetIds = [p.assets[1]!.id]; p.assets[1]!.parentAssetIds = [p.assets[0]!.id]; }],
    ['E_REFERENCE_MISSING',p => { p.assets = []; }],
    ['E_REFERENCE_MISSING',p => { p.parts[0]!.groupId = 'deleted-group'; }],
    ['E_REFERENCE_MISSING',p => { p.partBindings[0]!.parameterId = 'deleted-parameter'; }],
    ['E_REFERENCE_MISSING',p => { p.expressions[0]!.values[0]!.parameterId = 'deleted-parameter'; }],
    ['E_RESOURCE_VERSION',p => { p.parts[0]!.textures[0]!.assetVersion++; }],
    ['E_BINDING_STATES',p => { const binding = p.partBindings[0]!; if (binding.kind === 'state-blend') binding.mapping.maximumState = 'missing'; }],
    ['E_INPUT_AMBIGUOUS',p => { p.inputBindings.push({ ...p.inputBindings[0]!,id:'input-collision' }); }],
    ['E_EXPORT_MAPPING_DUPLICATE',p => { p.exportProfiles[0]!.parameterMap[1]!.targetName = p.exportProfiles[0]!.parameterMap[0]!.targetName; }],
    ['E_TRANSFORM_INVALID',p => { p.parts[0]!.localTransform = [0,0,0,0,0,0]; }],
    ['E_PARAMETER_RANGE',p => { p.parameters[0]!.neutral = 99; }],
    ['E_DERIVED_PROJECT_REFERENCE',p => { p.derivedProjects.push({ projectId:p.projectId,relation:'3d' }); }]
  ];
  for (const [code,mutate] of cases) { const p = load(); mutate(p); assert.ok(codes(p).includes(code),code); assert.throws(() => serializeProject(p)); }
});

test('T069: unsafe, case-colliding and nonportable resource paths are rejected before file access', () => {
  for (const path of ['C:/private.png','resources/../private.png','resources\\private.png','resources/a:stream.png','resources/CON.png','resources/a. /x.png','resources/%2e%2e/a.png']) {
    const p = load(); p.assets[0]!.storage.path = path; assert.ok(validateProject(p).length > 0,path);
  }
  const p = load(); p.assets[1]!.storage.path = p.assets[0]!.storage.path.toUpperCase().replace('RESOURCES/','resources/');
  assert.ok(codes(p).includes('E_RESOURCE_PATH_COLLISION'));
});

test('T069: future minor preserves unknown fields read-only; new major, malformed and oversized documents fail', () => {
  const p = load(); const future = { ...p,schemaVersion:{ major:1,minor:9 },future:{ originalData:[1,2,3] } };
  const original = JSON.stringify(future); const result = readProject(original); assert.equal(result.mode,'read-only');
  if (result.mode === 'read-only') { assert.deepEqual(result.raw,future); assert.equal('project' in result,false); }
  assert.equal(JSON.stringify(future),original); assert.throws(() => serializeProject(future as Project));
  assert.throws(() => readProject({ ...p,schemaVersion:{ major:2,minor:0 } }),/E_SCHEMA_MAJOR/);
  assert.throws(() => readProject('{bad'),/E_PROJECT_JSON/); assert.throws(() => readProject(' '.repeat(16*1024*1024+1)),/E_PROJECT_SIZE/);
  const infinite = load(); infinite.parameters[0]!.min = -Infinity; assert.throws(() => readProject(infinite));
});

test('T069: real file movement, changed bytes, root relocation and fingerprint-based relink preserve IDs', async () => {
  const project = load(); const folder = mkdtempSync(resolve('.local/model-resource-')); const root = join(folder,'한글 with spaces');
  cpSync('tests/fixtures/common-model/single-image',root,{ recursive:true });
  assert.ok((await inspectProjectResources(project,root)).every(v => v.state === 'ok'));
  const asset = project.assets[0]!; const old = resolve(root,asset.storage.path); const relative = 'resources/moved/source.png'; const moved = resolve(root,relative);
  assert.ok(moved.startsWith(resolve(root)+require('node:path').sep)); mkdirSync(dirname(moved),{ recursive:true }); renameSync(old,moved);
  assert.equal((await inspectProjectResources(project,root))[0]!.state,'missing');
  assert.deepEqual(await findRelinkCandidates(project,root,asset.id,['resources/missing.png',relative,'resources/../private.png']),[relative]);
  const fixed = await relinkAsset(project,root,asset.id,relative); assert.equal(fixed.assets[0]!.id,asset.id); assert.equal(fixed.assets[0]!.version,asset.version);
  assert.deepEqual(fixed.assets[0]!.fingerprint,asset.fingerprint); assert.equal(project.assets[0]!.storage.path,asset.storage.path); assert.equal(fixed.revision,project.revision+1);
  assert.ok((await inspectProjectResources(fixed,root)).every(v => v.state === 'ok'));
  const relocated = join(folder,'relocated'); cpSync(root,relocated,{ recursive:true }); assert.ok((await inspectProjectResources(fixed,relocated)).every(v => v.state === 'ok'));
  appendFileSync(moved,Buffer.from([1])); assert.equal((await inspectProjectResources(fixed,root))[0]!.state,'changed');
  await assert.rejects(relinkAsset(fixed,root,asset.id,relative),/E_RELINK_CONTENT/);
});

test('T069: junction escape and a matching-hash fake image cannot be accepted', async () => {
  const p = load(); const folder = mkdtempSync(resolve('.local/model-escape-')); const root = join(folder,'project'); const outside = join(folder,'outside');
  cpSync('tests/fixtures/common-model/single-image',root,{ recursive:true }); mkdirSync(outside);
  const a = p.assets[0]!; cpSync(join(root,a.storage.path),join(outside,'source.png'));
  symlinkSync(outside,join(root,'resources/escape'),process.platform === 'win32' ? 'junction' : 'dir');
  a.storage.path = 'resources/escape/source.png'; assert.equal((await inspectProjectResources(p,root))[0]!.state,'unsafe');
  const fake = Buffer.from('this is not a PNG'); a.storage.path = 'resources/fake.png'; a.fingerprint = { bytes:fake.length,sha256:createHash('sha256').update(fake).digest('hex') };
  writeFileSync(join(root,a.storage.path),fake); assert.equal((await inspectProjectResources(p,root))[0]!.state,'invalid');
});

test('T070: actual three-route prepared characters use the same schema, renderer adapter and complete resources', async () => {
  for (const route of routes) {
    const p = load(route); assert.equal(p.sourceType,route); const json = serializeProject(p); const decoded = readProject(json);
    assert.equal(decoded.mode,'read-write'); if (decoded.mode === 'read-write') assert.deepEqual(decoded.project,p);
    assert.ok(p.parts.length > 0); assert.ok(p.parameters.length === 5); assert.ok(p.inputAssetIds.length > 0);
    assert.ok((await inspectProjectResources(p,resolve('tests/fixtures/common-model',route))).every(v => v.state === 'ok'));
    const scene = projectToPreview(p); assert.equal(scene.model!.sourceType,route); assert.equal(scene.layers.length,p.parts.length);
    for (const layer of scene.layers) { assert.ok(Object.keys(layer.states).length > 0); assert.ok(layer.geometry); }
  }
  const p = premium(); assert.equal(p.assets.length,9); assert.equal(projectToPreview(p).layers.length,4);
  p.groups[0]!.visible = false; assert.equal(projectToPreview(p).layers.length,0);
});
