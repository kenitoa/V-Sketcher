import { scratchPath } from './temp';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdir, mkdtemp, writeFile, rename, readdir, unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { spawn } from 'node:child_process';
import { ZipFile } from 'yazl';
import { createProject, editProject, readProject, type Project } from '../packages/project-model';
import {
  encodeBundle,
  decodeBundle,
  readBundle,
  sha256,
  type BundleManifest,
} from '../packages/project-storage/archive';
import { atomicBundle, type SavePhase } from '../packages/project-storage/atomic';
import { ProjectCatalog } from '../packages/project-storage/catalog';
import { ResourceCache } from '../packages/project-storage/cache';
import { ProjectSession, type ProjectDialogs } from '../packages/project-session';
import { EditHistory, contentKey } from '../packages/project-session/history';
import { Workflow } from '../packages/workflow';
const root = scratchPath('project-tests');
async function folder(): Promise<string> {
  await mkdir(root, { recursive: true });
  return mkdtemp(join(root, 'run-'));
}
async function fixture(): Promise<{ p: Project; bytes: Map<string, Buffer> }> {
  const opened = readProject(await readFile('assets/product/preview-project.json', 'utf8'));
  if (opened.mode !== 'read-write') throw new Error('fixture');
  const bytes = new Map<string, Buffer>();
  for (const a of opened.project.assets)
    bytes.set(a.id, await readFile(join('assets/product/preview', a.fingerprint.sha256 + '.png')));
  return { p: opened.project, bytes };
}
async function zip(entries: Map<string, Buffer>): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const z = new ZipFile();
    const chunks: Buffer[] = [];
    z.outputStream.on('data', (b: Buffer) => chunks.push(b));
    z.outputStream.on('end', () => resolve(Buffer.concat(chunks)));
    z.outputStream.on('error', reject);
    for (const [name, b] of entries) z.addBuffer(b, name, { compress: false });
    z.end();
  });
}
async function custom(
  p: Project,
  bytes: Map<string, Buffer>,
  mutate: (
    entries: Map<string, Buffer>,
    manifest: BundleManifest,
    raw: Record<string, unknown>,
  ) => void,
): Promise<Buffer> {
  const b = await decodeBundle(await encodeBundle(p, bytes, 'manual'), false);
  const raw = structuredClone(b.project!) as unknown as Record<string, unknown>;
  const manifest = structuredClone(b.manifest);
  const entries = new Map(b.resources);
  mutate(entries, manifest, raw);
  const data = Buffer.from(JSON.stringify(raw));
  manifest.project.bytes = data.length;
  manifest.project.sha256 = sha256(data);
  entries.set('project.json', data);
  entries.set('manifest.json', Buffer.from(JSON.stringify(manifest)));
  return zip(entries);
}
async function service(
  options: { fault?: (phase: SavePhase) => void | Promise<void>; now?: () => number } = {},
) {
  const dir = await folder();
  const f = await fixture();
  const saves: (string | null)[] = [];
  let leave: 'save' | 'discard' | 'cancel' = 'cancel';
  let open: string | null = null;
  let relink: string | null = null;
  const dialogs: ProjectDialogs = {
    saveProject: async () => saves.shift() ?? null,
    openProject: async () => open,
    relinkImage: async () => relink,
    unsaved: async () => leave,
  };
  const s = new ProjectSession({
    dataDir: dir,
    dialogs,
    bundled: f.p,
    bundledBytes: f.bytes,
    autoTimers: false,
    ...(options.fault ? { saveFault: options.fault } : {}),
    ...(options.now ? { now: options.now } : {}),
  });
  await s.init();
  return {
    s,
    dir,
    f,
    saves,
    setLeave: (v: typeof leave) => {
      leave = v;
    },
    setOpen: (v: string) => {
      open = v;
    },
    setRelink: (v: string) => {
      relink = v;
    },
  };
}
async function edit(
  s: ProjectSession,
  value: string | number,
  target: 'project-name' | 'part-opacity' = 'project-name',
  groupId: string | null = null,
): Promise<void> {
  const p = s.view().project!;
  const r = await s.dispatch({
    type: 'edit',
    target,
    id: target === 'project-name' ? null : p.parts[0]!.id,
    parameterId: null,
    value,
    expectedRevision: p.revision,
    groupId,
  });
  assert.equal(r.view.errorCode, null);
}

test('T081: all three new drafts have distinct IDs, source route, empty resources and dirty state', async () => {
  const h = await service();
  const ids = new Set<string>();
  h.setLeave('discard');
  for (const sourceType of ['parts', 'single-image', 'split-image'] as const) {
    await h.s.newProject('초안', sourceType);
    const v = h.s.view();
    ids.add(v.project!.projectId);
    assert.equal(v.project!.sourceType, sourceType);
    assert.equal(v.dirty, true);
    assert.equal(v.project!.assets.length, 0);
  }
  assert.equal(ids.size, 3);
  await h.s.shutdown();
});
test('T086: ZIP round trip contains all nine verified originals/generated textures and needs no source location', async () => {
  const f = await fixture();
  const dir = await folder();
  const a = join(dir, 'original.2dsketch');
  const destination = join(dir, '한글 경로 with spaces');
  await mkdir(destination);
  await writeFile(a, await encodeBundle(f.p, f.bytes, 'manual'));
  await rename(a, join(destination, 'moved.2dsketch'));
  const b = await readBundle(join(destination, 'moved.2dsketch'), false);
  assert.equal(b.resources.size, 9);
  assert.equal(b.project!.savedRevision, b.project!.revision);
  const cache = new ResourceCache(join(dir, 'fresh-cache'));
  await cache.ingest(b);
  assert.equal((await cache.available(b.project!)).size, 9);
  assert.equal((await cache.bytes(b.project!)).size, 9);
  assert.ok(
    b.project!.assets.every((a) => a.storage.path === 'resources/' + a.fingerprint.sha256 + '.png'),
  );
});
test('T082: newer minor is preserved read-only; unsupported major and corrupt ZIP fail without changing active document', async () => {
  const h = await service();
  await h.s.newProject('keep', 'parts');
  const id = h.s.view().project!.projectId;
  const bad = join(h.dir, 'bad.2dsketch');
  await writeFile(bad, Buffer.from('bad'));
  await assert.rejects(h.s.openFile(bad));
  assert.equal(h.s.view().project!.projectId, id);
  const future = await custom(h.f.p, h.f.bytes, (_e, _m, p) => {
    p.schemaVersion = { major: 1, minor: 10 };
    p.futureField = { preserve: true };
  });
  const f = await decodeBundle(future);
  assert.equal(f.mode, 'read-only');
  assert.deepEqual((f.raw as Record<string, unknown>).futureField, { preserve: true });
  const major = await custom(h.f.p, h.f.bytes, (_e, _m, p) => {
    p.schemaVersion = { major: 2, minor: 0 };
  });
  await assert.rejects(decodeBundle(major));
  const path = join(h.dir, 'future.2dsketch');
  await writeFile(path, future);
  h.setLeave('discard');
  await h.s.openFile(path);
  const r = await h.s.dispatch({ type: 'save' });
  assert.equal(r.view.mode, 'read-only');
  assert.equal(sha256(await readFile(path)), sha256(future));
  await h.s.shutdown();
});
test('T083: missing embedded resource retains usable appearance; hash-checked relink restores only matching original', async () => {
  const h = await service();
  const asset = h.f.p.assets.find((a) => a.kind !== 'original-image')!;
  const broken = await custom(h.f.p, h.f.bytes, (e) => {
    e.delete(asset.storage.path);
  });
  const path = join(h.dir, 'missing.2dsketch');
  await writeFile(path, broken);
  await h.s.openFile(path);
  assert.equal(h.s.view().issues.length, 1);
  assert.ok(h.s.view().scene);
  assert.equal(h.s.view().dirty, true);
  const wrong = join(h.dir, 'wrong.png');
  await writeFile(wrong, h.f.bytes.get(h.f.p.assets[0]!.id)!);
  h.setRelink(wrong);
  assert.ok((await h.s.dispatch({ type: 'relink', assetId: asset.id })).view.errorCode);
  assert.equal(h.s.view().issues.length, 1);
  const correct = join(h.dir, 'moved.png');
  await writeFile(correct, h.f.bytes.get(asset.id)!);
  h.setRelink(correct);
  assert.equal((await h.s.dispatch({ type: 'relink', assetId: asset.id })).view.issues.length, 0);
  h.saves.push(join(h.dir, 'repaired.2dsketch'));
  await h.s.save(false);
  assert.equal(sha256(await readFile(path)), sha256(broken));
  await h.s.shutdown();
});
test('T084: each precommit failure preserves original bytes and clears owned temp/lock; postcommit reports genuine success', async () => {
  const dir = await folder();
  const a = createProject('old', 'parts');
  const old = await encodeBundle(a, new Map(), 'manual');
  const next = await encodeBundle(
    editProject(a, (p) => {
      p.displayName = 'new';
    }),
    new Map(),
    'manual',
  );
  const path = join(dir, 'safe.2dsketch');
  for (const phase of [
    'before-write',
    'after-sync',
    'after-verify',
    'before-backup',
    'after-backup',
    'before-replace',
  ] as const) {
    await writeFile(path, old);
    let backed = false;
    await assert.rejects(
      atomicBundle(path, next, {
        expectedHash: sha256(old),
        backup: async (b) => {
          assert.equal(sha256(b), sha256(old));
          backed = true;
        },
        fault: (p) => {
          if (p === phase) throw new Error('E_INJECTED');
        },
      }),
    );
    assert.equal(sha256(await readFile(path)), sha256(old));
    assert.equal(
      (await readdir(dir)).filter((n) => n.endsWith('.tmp') || n.endsWith('.lock')).length,
      0,
    );
    if (phase === 'before-replace') assert.equal(backed, true);
  }
  const receipt = await atomicBundle(path, next, {
    expectedHash: sha256(old),
    backup: async () => {},
    fault: (p) => {
      if (p === 'after-replace') throw new Error('E_INJECTED');
    },
  });
  assert.equal(receipt.committed, true);
  assert.equal(receipt.warning, 'E_INJECTED');
  assert.equal(sha256(await readFile(path)), sha256(next));
});
test('T084: conflict, busy writer, stale/unknown locks and backup failure never overwrite a good file', async () => {
  const dir = await folder();
  const bytes = await encodeBundle(createProject('safe', 'parts'), new Map(), 'manual');
  const path = join(dir, 'safe.2dsketch');
  await writeFile(path, bytes);
  const hash = sha256(bytes);
  await assert.rejects(atomicBundle(path, bytes, { expectedHash: null }), /E_SAVE_CONFLICT/);
  await assert.rejects(
    atomicBundle(path, bytes, {
      expectedHash: hash,
      backup: async () => {
        throw new Error('E_BACKUP');
      },
    }),
    /E_BACKUP/,
  );
  await writeFile(
    path + '.lock',
    JSON.stringify({ magic: '2dsketch-writer-v1', pid: process.pid }),
  );
  await assert.rejects(atomicBundle(path, bytes, { expectedHash: hash }), /E_SAVE_BUSY/);
  await unlink(path + '.lock');
  await writeFile(path + '.lock', 'unknown owner');
  await assert.rejects(atomicBundle(path, bytes, { expectedHash: hash }), /E_SAVE_LOCK_UNKNOWN/);
  await unlink(path + '.lock');
  await writeFile(path + '.lock', JSON.stringify({ magic: '2dsketch-writer-v1', pid: 2147483646 }));
  assert.equal(
    (await atomicBundle(path, bytes, { expectedHash: hash, backup: async () => {} })).committed,
    true,
  );
  assert.equal(sha256(await readFile(path)), hash);
});
test('T084/T090: cancellation and injected disk/permission errors preserve destination; canceled after commit stays committed', async () => {
  const dir = await folder();
  const bytes = await encodeBundle(createProject('safe', 'parts'), new Map(), 'manual');
  const path = join(dir, 'safe.2dsketch');
  await writeFile(path, bytes);
  const hash = sha256(bytes);
  for (const code of ['ENOSPC', 'EACCES'])
    await assert.rejects(
      atomicBundle(path, bytes, {
        expectedHash: hash,
        backup: async () => {},
        fault: (p) => {
          if (p === 'before-replace') throw Object.assign(new Error('private path'), { code });
        },
      }),
      code === 'ENOSPC' ? /E_SAVE_SPACE/ : /E_SAVE_PERMISSION/,
    );
  const controller = new AbortController();
  await assert.rejects(
    atomicBundle(path, bytes, {
      expectedHash: hash,
      backup: async () => {},
      signal: controller.signal,
      fault: (p) => {
        if (p === 'after-sync') controller.abort();
      },
    }),
    /E_SAVE_CANCELLED/,
  );
  assert.equal(sha256(await readFile(path)), hash);
  const late = new AbortController();
  assert.equal(
    (
      await atomicBundle(path, bytes, {
        expectedHash: hash,
        backup: async () => {},
        signal: late.signal,
        fault: (p) => {
          if (p === 'after-replace') late.abort();
        },
      })
    ).committed,
    true,
  );
});
test('T085: Save As preserves original, canceled/failed Save As keeps target; duplicate changes only project identity', async () => {
  const h = await service();
  await h.s.newProject('original', 'parts');
  await h.s.dispatch({ type: 'sample' });
  const a = join(h.dir, 'a.2dsketch');
  const b = join(h.dir, 'b.2dsketch');
  h.saves.push(a);
  await h.s.save(false);
  const original = await readFile(a);
  await edit(h.s, 'changed');
  h.saves.push(null);
  assert.equal(await h.s.save(true), false);
  assert.equal(h.s.view().label, 'a.2dsketch');
  h.saves.push(b);
  await h.s.save(true);
  assert.equal(sha256(await readFile(a)), sha256(original));
  assert.equal(h.s.view().label, 'b.2dsketch');
  const prior = h.s.view().project!;
  const copy = join(h.dir, 'copy.2dsketch');
  h.saves.push(copy);
  await h.s.dispatch({ type: 'duplicate' });
  const clone = h.s.view().project!;
  assert.notEqual(clone.projectId, prior.projectId);
  for (const key of [
    'assets',
    'parts',
    'groups',
    'partBindings',
    'inputBindings',
    'expressions',
  ] as const)
    assert.deepEqual(clone[key], prior[key]);
  assert.equal(h.s.view().dirty, false);
  assert.equal(h.s.view().recent.length, 3);
  await h.s.shutdown();
});
test('T087: 15 second idle / 60 second maximum recovery does not acknowledge manual saved revision', async () => {
  let now = 0;
  const h = await service({ now: () => now });
  await h.s.newProject('auto', 'parts');
  now = 14999;
  await h.s.autosaveDue();
  assert.equal(h.s.view().recoveries.length, 0);
  now = 15000;
  await h.s.autosaveDue();
  assert.equal(h.s.view().recoveries.length, 1);
  assert.equal(h.s.view().project!.savedRevision, null);
  assert.equal(h.s.view().dirty, true);
  await h.s.autosaveDue(true);
  assert.equal(h.s.view().recoveries.length, 1);
  for (now = 20000; now <= 70000; now += 10000) {
    await edit(h.s, 'auto' + now);
    await h.s.autosaveDue();
  }
  now = 75000;
  await h.s.autosaveDue();
  assert.equal(h.s.view().recoveries.length, 2);
  await h.s.shutdown();
});
test('T087: retain five normal backups and five recovery snapshots; budget preserves newest valid snapshots', async () => {
  const dir = await folder();
  const c = new ProjectCatalog(dir);
  await c.init();
  let p = createProject('retention', 'parts');
  for (let i = 0; i < 8; i++) {
    p = editProject(p, (d) => {
      d.displayName = 'revision' + i;
    });
    await c.record(p, new Map(), 'autosave', null, 'test');
    await c.record(p, new Map(), 'manual', null, 'test');
  }
  const records = c.recoveries();
  assert.equal(records.filter((r) => r.kind === 'backup').length, 5);
  assert.equal(records.filter((r) => r.kind !== 'backup').length, 5);
  assert.equal((await readdir(join(dir, 'snapshots'))).length, 10);
  for (const r of records) assert.equal((await readBundle(c.file(r.id), false)).fileHash, r.hash);
  const one = await encodeBundle(p, new Map(), 'autosave');
  const small = new ProjectCatalog(await folder(), one.length * 2 + 100);
  await small.init();
  const first = await small.record(p, new Map(), 'autosave', null, '');
  await assert.rejects(
    small
      .record(
        editProject(p, (d) => {
          d.displayName = 'x'.repeat(100);
        }),
        new Map(),
        'manual',
        null,
        '',
      )
      .then(async () =>
        small.record(
          editProject(p, (d) => {
            d.displayName = 'z';
          }),
          new Map(),
          'autosave',
          null,
          '',
        ),
      ),
    /E_RECOVERY_SPACE/,
  );
  assert.equal((await readBundle(small.file(first.id), false)).fileHash, first.hash);
});
test('T088: killed writer leaves verified recovery discoverable at next startup and restores into a new file', async () => {
  const dir = await folder();
  const childCode = `const {ProjectSession}=require('./.local/test-js/packages/project-session');const {createProject}=require('./.local/test-js/packages/project-model');(async()=>{const s=new ProjectSession({dataDir:process.argv[1],dialogs:{unsaved:async()=> 'cancel',saveProject:async()=>null,openProject:async()=>null,relinkImage:async()=>null},bundled:createProject('fixture','parts'),bundledBytes:new Map(),autoTimers:false});await s.init();await s.newProject('crash recovery','parts');await s.autosaveDue(true);process.stdout.write('READY');setInterval(()=>{},1000)})()`;
  const child = spawn(process.execPath, ['-e', childCode, dir], {
    cwd: process.cwd(),
    windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  await new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('E_CHILD_TIMEOUT')), 15000);
    child.once('error', reject);
    child.stdout.once('data', (data) => {
      clearTimeout(timer);
      data.toString().includes('READY') ? resolve() : reject(new Error('E_CHILD_OUTPUT'));
    });
    child.once('exit', (code) => {
      if (code) {
        clearTimeout(timer);
        reject(new Error('E_CHILD_EXIT'));
      }
    });
  });
  const exited = new Promise((resolve) => child.once('exit', resolve));
  child.kill();
  await exited;
  const f = await fixture();
  const output = join(dir, 'restored.2dsketch');
  const s = new ProjectSession({
    dataDir: dir,
    dialogs: {
      unsaved: async () => 'discard',
      saveProject: async () => output,
      openProject: async () => null,
      relinkImage: async () => null,
    },
    bundled: f.p,
    bundledBytes: f.bytes,
    autoTimers: false,
  });
  await s.init();
  const rec = s.view().recoveries.find((r) => r.pending)!;
  assert.ok(rec);
  const compare = await s.dispatch({ type: 'preview-recovery', id: rec.id });
  assert.equal(compare.preview!.saved, null);
  await s.dispatch({ type: 'recover', id: rec.id });
  assert.equal(s.view().dirty, true);
  await s.save(false);
  assert.equal(s.view().dirty, false);
  assert.equal((await readBundle(output, false)).project!.displayName, 'crash recovery');
  await s.shutdown();
});
test('T088: original/recovery comparison uses distinct actual revisions; defer and original choice preserve files', async () => {
  const h = await service();
  await h.s.newProject('saved', 'parts');
  const path = join(h.dir, 'saved.2dsketch');
  h.saves.push(path);
  await h.s.save(false);
  const old = sha256(await readFile(path));
  await edit(h.s, 'unsaved recovery');
  await h.s.autosaveDue(true);
  const rec = h.s.view().recoveries.find((r) => r.pending)!;
  const result = await h.s.dispatch({ type: 'preview-recovery', id: rec.id });
  assert.ok(result.preview!.saved!.revision < result.preview!.recovered.revision);
  assert.equal(h.s.view().project!.displayName, 'unsaved recovery');
  h.setLeave('discard');
  await h.s.dispatch({ type: 'original', id: rec.id });
  assert.equal(h.s.view().project!.displayName, 'saved');
  assert.equal(sha256(await readFile(path)), old);
  await h.s.shutdown();
});
test('T089: structure, appearance, expressions undo/redo and continuous edits; live runtime frames add no history', async () => {
  const f = await fixture();
  const w = new Workflow(f.p);
  const h = new EditHistory(w);
  const initial = contentKey(w.project());
  const id = h.begin('drag');
  for (const v of [0.9, 0.8, 0.6])
    h.change(
      'opacity',
      (p) => {
        p.parts[0]!.opacity = v;
      },
      id,
    );
  h.finish(id, true);
  h.undo();
  assert.equal(contentKey(w.project()), initial);
  assert.equal(h.canUndo, false);
  h.redo();
  assert.equal(w.project().parts[0]!.opacity, 0.6);
  const canceled = h.begin('cancel');
  h.change(
    'move',
    (p) => {
      p.parts[0]!.localTransform[4] = 40;
    },
    canceled,
  );
  h.finish(canceled, false);
  assert.equal(w.project().parts[0]!.localTransform[4], f.p.parts[0]!.localTransform[4]);
  h.change('role', (p) => {
    p.parts[0]!.role = 'custom';
  });
  h.undo();
  h.change('name', (p) => {
    p.parts[0]!.displayName = 'new';
  });
  assert.equal(h.canRedo, false);
  if (w.project().expressions[0]?.values[0]) {
    const before = w.project().expressions[0]!.values[0]!.value;
    h.change('expression', (p) => {
      p.expressions[0]!.values[0]!.value = before === 0 ? 1 : 0;
    });
    h.undo();
    assert.equal(w.project().expressions[0]!.values[0]!.value, before);
    h.redo();
  }
  const revision = w.project().revision;
  w.stageRuntime();
  for (let i = 0; i < 60; i++) w.publishAtFrameBoundary();
  assert.equal(w.project().revision, revision);
  await w.close();
});
test('T089: undo back to saved content is clean without decrementing document revision; new branch clears redo', async () => {
  const h = await service();
  await h.s.newProject('saved', 'parts');
  h.saves.push(join(h.dir, 'saved.2dsketch'));
  await h.s.save(false);
  await edit(h.s, 'edited');
  const rev = h.s.view().project!.revision;
  await h.s.dispatch({ type: 'undo' });
  assert.equal(h.s.view().dirty, false);
  assert.ok(h.s.view().project!.revision > rev);
  await h.s.dispatch({ type: 'redo' });
  assert.equal(h.s.view().dirty, true);
  await h.s.dispatch({ type: 'undo' });
  await edit(h.s, 'new branch');
  assert.equal(h.s.view().canRedo, false);
  await h.s.shutdown();
});
test('T090: unsaved close/new/open cancel and save failure preserve active project; explicit discard permits leaving', async () => {
  const h = await service({
    fault: (phase) => {
      if (phase === 'after-sync') throw new Error('E_INJECTED');
    },
  });
  await h.s.newProject('keep', 'parts');
  const id = h.s.view().project!.projectId;
  assert.equal(await h.s.requestClose(), false);
  await h.s.dispatch({ type: 'close' });
  await h.s.newProject('other', 'split-image');
  assert.equal(h.s.view().project!.projectId, id);
  h.setLeave('save');
  h.saves.push(join(h.dir, 'fail.2dsketch'));
  await assert.rejects(h.s.requestClose(), /E_INJECTED/);
  assert.equal(h.s.view().project!.projectId, id);
  assert.equal(h.s.view().dirty, true);
  h.setLeave('discard');
  assert.equal(await h.s.requestClose(), true);
  await h.s.shutdown();
});
test('T084/T090: edit made while save is in flight stays dirty and is absent from the frozen saved snapshot', async () => {
  let release!: () => void;
  let entered!: () => void;
  const gate = new Promise<void>((r) => {
    release = r;
  });
  const started = new Promise<void>((r) => {
    entered = r;
  });
  const h = await service({
    fault: async (phase) => {
      if (phase === 'after-sync') {
        entered();
        await gate;
      }
    },
  });
  await h.s.newProject('frozen', 'parts');
  const path = join(h.dir, 'frozen.2dsketch');
  h.saves.push(path);
  const saving = h.s.save(false);
  await started;
  await edit(h.s, 'latest edit');
  release();
  await saving;
  assert.equal((await readBundle(path, false)).project!.displayName, 'frozen');
  assert.equal(h.s.view().project!.displayName, 'latest edit');
  assert.equal(h.s.view().dirty, true);
  assert.equal(h.s.view().project!.savedRevision, 0);
  await h.s.shutdown();
});
test('T086: strict ZIP entry allowlist, CRC, hash, duplicate and metadata budget validation', async () => {
  const f = await fixture();
  const original = await encodeBundle(f.p, f.bytes, 'manual');
  const loaded = await decodeBundle(original, false);
  const unknown = await custom(f.p, f.bytes, (e) => {
    e.set('unexpected.txt', Buffer.from('x'));
  });
  await assert.rejects(decodeBundle(unknown), /E_ZIP_ENTRY/);
  const duplicate = new ZipFile();
  const chunks: Buffer[] = [];
  const done = new Promise<Buffer>((resolve) => {
    duplicate.outputStream.on('data', (b: Buffer) => chunks.push(b));
    duplicate.outputStream.on('end', () => resolve(Buffer.concat(chunks)));
  });
  duplicate.addBuffer(Buffer.from('{}'), 'manifest.json');
  duplicate.addBuffer(Buffer.from('{}'), 'manifest.json');
  duplicate.end();
  await assert.rejects(decodeBundle(await done), /E_ZIP_ENTRY/);
  const corruptResource = await custom(f.p, f.bytes, (e) => {
    const [path, bytes] = [...e][0]!;
    const changed = Buffer.from(bytes);
    changed[20] = changed[20]! ^ 1;
    e.set(path, changed);
  });
  await assert.rejects(decodeBundle(corruptResource, false), /E_RESOURCE_CHANGED/);
  const crc = Buffer.from(
    await zip(
      new Map([
        ['project.json', Buffer.from('unique-crc-test')],
        ['manifest.json', Buffer.from('{}')],
      ]),
    ),
  );
  const offset = crc.indexOf('unique-crc-test');
  crc[offset] = crc[offset]! ^ 1;
  await assert.rejects(decodeBundle(crc), /E_ZIP_CORRUPT/);
  const metadata = Buffer.from(original);
  const central = metadata.indexOf(Buffer.from([0x50, 0x4b, 0x01, 0x02]));
  metadata.writeUInt32LE(600 * 1024 * 1024, central + 24);
  await assert.rejects(decodeBundle(metadata), /E_ZIP_BUDGET|E_ZIP_CORRUPT/);
  assert.equal(loaded.resources.size, 9);
});
test('T084: actual process termination before replacement preserves normal file; dead writer lock is reclaimed', async () => {
  const dir = await folder();
  const path = join(dir, 'normal.2dsketch');
  const old = await encodeBundle(createProject('normal', 'parts'), new Map(), 'manual');
  const nextPath = join(dir, 'next.2dsketch');
  await writeFile(path, old);
  await writeFile(
    nextPath,
    await encodeBundle(createProject('next', 'parts'), new Map(), 'manual'),
  );
  const code = `const fs=require('node:fs/promises');const {atomicBundle}=require('./.local/test-js/packages/project-storage/atomic');const {sha256}=require('./.local/test-js/packages/project-storage/archive');(async()=>{const old=await fs.readFile(process.argv[1]);const next=await fs.readFile(process.argv[2]);await atomicBundle(process.argv[1],next,{expectedHash:sha256(old),backup:async b=>{await fs.writeFile(process.argv[1]+'.backup',b)},fault:async phase=>{if(phase==='before-replace'){process.stdout.write('READY');await new Promise(()=>{setInterval(()=>{},1000)});}}});})()`;
  const writer = spawn(process.execPath, ['-e', code, path, nextPath], {
    cwd: process.cwd(),
    windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  await new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('E_CHILD_TIMEOUT')), 15000);
    writer.stdout.once('data', (b) => {
      clearTimeout(timer);
      b.toString().includes('READY') ? resolve() : reject(new Error('E_CHILD_OUTPUT'));
    });
    writer.once('error', reject);
    writer.once('exit', (c) => {
      if (c) {
        clearTimeout(timer);
        reject(new Error('E_CHILD_EXIT'));
      }
    });
  });
  const exited = new Promise((r) => writer.once('exit', r));
  writer.kill();
  await exited;
  assert.equal(sha256(await readFile(path)), sha256(old));
  assert.equal(sha256(await readFile(path + '.backup')), sha256(old));
  assert.ok((await readdir(dir)).some((n) => n.endsWith('.tmp')));
  assert.equal((await readBundle(path, false)).project!.displayName, 'normal');
  const next = await readFile(nextPath);
  assert.equal(
    (await atomicBundle(path, next, { expectedHash: sha256(old), backup: async () => {} }))
      .committed,
    true,
  );
});
test('T087/T090: important structural edit makes a durable checkpoint; invalid/canceled change preserves project', async () => {
  const h = await service();
  await h.s.newProject('structural', 'parts');
  await h.s.dispatch({ type: 'sample' });
  const before = h.s.view().project!;
  const reply = await h.s.dispatch({
    type: 'edit',
    target: 'part-role',
    id: before.parts[0]!.id,
    parameterId: null,
    value: 'invalid-role',
    expectedRevision: before.revision,
    groupId: null,
  });
  assert.ok(reply.view.errorCode);
  assert.equal(contentKey(reply.view.project!), contentKey(before));
  const record = h.s.view().recoveries.find((r) => r.revision === before.revision)!;
  assert.equal(
    contentKey((await readBundle(h.s.catalog.file(record.id), false)).project!),
    contentKey(before),
  );
  const group = (await h.s.dispatch({ type: 'begin-group', label: 'cancel move' })).value!;
  await edit(h.s, 0.3, 'part-opacity', group);
  await h.s.dispatch({ type: 'end-group', id: group, commit: false });
  assert.equal(contentKey(h.s.view().project!), contentKey(before));
  await h.s.shutdown();
});
