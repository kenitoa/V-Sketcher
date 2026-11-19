import { open, lstat, readdir, realpath } from 'node:fs/promises';
import { join, relative, isAbsolute } from 'node:path';
import { createHash } from 'node:crypto';
import { crc32 } from 'node:zlib';
import { fromBuffer, type ZipFile, type Entry } from 'yauzl';
import { ZipFile as Writer } from 'yazl';
import { ROLES, SIDES, STATES, type SplitDraft } from './types';
export const SPLIT_LIMITS = {
  compressed: 256 * 1024 * 1024,
  uncompressed: 512 * 1024 * 1024,
  entries: 1024,
  manifest: 1024 * 1024,
  png: 64 * 1024 * 1024,
  decoded: 256 * 1024 * 1024,
};
export const hash = (b: Uint8Array): string => createHash('sha256').update(b).digest('hex');
export interface SourceLayer {
  id: string;
  name: string;
  path: string;
  origin: [number, number] | null;
  z: number | null;
  role: (typeof ROLES)[number] | null;
  side: (typeof SIDES)[number] | null;
  visible: boolean;
  opacity: number;
  group: string | null;
  parent: string | null;
  usage: 'primary' | 'auxiliary' | 'alternative';
  variantOf: string | null;
  state: (typeof STATES)[number];
}
export interface SourceGroup {
  id: string;
  name: string;
  parent: string | null;
  visible: boolean;
  opacity: number;
}
export interface SplitSource {
  kind: 'folder' | '2dparts';
  sourceHash: string;
  manifest: string | null;
  canvas: { width: number; height: number } | null;
  layers: SourceLayer[];
  groups: SourceGroup[];
  files: Map<string, Buffer>;
  omitted: string[];
  missingProperties: string[];
}
function fail(code: string): never {
  throw new Error('E_SPLIT_' + code);
}
const text = (x: unknown, max = 128): x is string =>
  typeof x === 'string' &&
  x.length > 0 &&
  x.length <= max &&
  x.normalize('NFC') === x &&
  !/[\u0000-\u001f\u007f]/.test(x);
export function safeEntry(name: string): boolean {
  return (
    text(name, 240) &&
    !/[\\:<>"|?*]/.test(name) &&
    !name.startsWith('/') &&
    !name
      .split('/')
      .some(
        (p) =>
          !p ||
          p === '.' ||
          p === '..' ||
          /[. ]$/.test(p) ||
          /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(\.|$)/i.test(p),
      )
  );
}
const keys = (x: unknown, allowed: string[]): x is Record<string, unknown> =>
  !!x &&
  typeof x === 'object' &&
  !Array.isArray(x) &&
  Object.keys(x).every((k) => allowed.includes(k));
const number = (x: unknown, min: number, max: number) =>
  typeof x === 'number' && Number.isFinite(x) && x >= min && x <= max;
function pngBudget(files: ReadonlyMap<string, Buffer>): void {
  let decoded = 0;
  for (const b of files.values()) {
    if (
      b.length < 33 ||
      b.length > SPLIT_LIMITS.png ||
      !b.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) ||
      b.toString('ascii', 12, 16) !== 'IHDR' ||
      b[24] !== 8 ||
      ![2, 6].includes(b[25]!)
    )
      fail('PNG');
    const w = b.readUInt32BE(16),
      h = b.readUInt32BE(20);
    if (!w || !h || w > 4096 || h > 4096 || w * h > 16777216) fail('DIMENSIONS');
    decoded += w * h * 4;
    if (decoded > SPLIT_LIMITS.decoded) fail('MEMORY');
  }
}
export async function readSnapshot(file: string, limit: number): Promise<Buffer> {
  const st = await lstat(file);
  if (st.isSymbolicLink() || !st.isFile() || st.size < 1 || st.size > limit) fail('FILE');
  const f = await open(file, 'r');
  try {
    const before = await f.stat();
    if (
      !before.isFile() ||
      before.size !== st.size ||
      before.ino !== st.ino ||
      before.dev !== st.dev ||
      before.mtimeMs !== st.mtimeMs ||
      before.size > limit
    )
      fail('CHANGED');
    const b = Buffer.alloc(before.size);
    let off = 0;
    while (off < b.length) {
      const r = await f.read(b, off, b.length - off, off);
      if (!r.bytesRead) fail('CHANGED');
      off += r.bytesRead;
    }
    const after = await f.stat();
    if (after.size !== before.size || after.mtimeMs !== before.mtimeMs) fail('CHANGED');
    return b;
  } finally {
    await f.close();
  }
}
export async function readEntries(bytes: Buffer): Promise<Map<string, Buffer>> {
  if (bytes.length < 22 || bytes.length > SPLIT_LIMITS.compressed) fail('ZIP_SIZE');
  const zip = await new Promise<ZipFile>((ok, no) =>
    fromBuffer(
      bytes,
      { lazyEntries: true, autoClose: false, strictFileNames: true, validateEntrySizes: true },
      (e, z) => (e || !z ? no(new Error('E_SPLIT_ZIP')) : ok(z)),
    ),
  );
  try {
    const entries = await new Promise<Entry[]>((ok, no) => {
      const all: Entry[] = [];
      const names = new Set<string>();
      let count = 0,
        total = 0;
      zip.on('error', () => no(new Error('E_SPLIT_ZIP')));
      zip.on('end', () => ok(all));
      zip.on('entry', (e: Entry) => {
        const dir = e.fileName.endsWith('/'),
          name = dir ? e.fileName.slice(0, -1) : e.fileName;
        const type = (e.externalFileAttributes >>> 16) & 0xf000;
        if (
          ++count > SPLIT_LIMITS.entries ||
          !safeEntry(name) ||
          names.has(name.toLowerCase()) ||
          type === 0xa000 ||
          (e.generalPurposeBitFlag & 1) !== 0 ||
          ![0, 8].includes(e.compressionMethod) ||
          !Number.isSafeInteger(e.uncompressedSize) ||
          e.uncompressedSize < 0 ||
          (dir && e.uncompressedSize !== 0) ||
          (!dir && e.fileName !== 'manifest.json' && !/\.png$/i.test(name))
        ) {
          no(new Error('E_SPLIT_ENTRY'));
          return;
        }
        names.add(name.toLowerCase());
        total += e.uncompressedSize;
        if (
          total > SPLIT_LIMITS.uncompressed ||
          e.uncompressedSize > (name === 'manifest.json' ? SPLIT_LIMITS.manifest : SPLIT_LIMITS.png)
        ) {
          no(new Error('E_SPLIT_ZIP_BUDGET'));
          return;
        }
        if (!dir) all.push(e);
        zip.readEntry();
      });
      zip.readEntry();
    });
    const result = new Map<string, Buffer>();
    for (const entry of entries) {
      const b = await new Promise<Buffer>((ok, no) =>
        zip.openReadStream(entry, (e, s) => {
          if (e || !s) {
            no(new Error('E_SPLIT_ZIP'));
            return;
          }
          const chunks: Buffer[] = [];
          let n = 0;
          s.on('data', (c: Buffer) => {
            n += c.length;
            if (n > entry.uncompressedSize) {
              s.destroy();
              no(new Error('E_SPLIT_ZIP_BUDGET'));
            } else chunks.push(c);
          });
          s.once('error', () => no(new Error('E_SPLIT_ZIP')));
          s.once('end', () => {
            const b = Buffer.concat(chunks);
            if (n !== entry.uncompressedSize || crc32(b) !== entry.crc32)
              no(new Error('E_SPLIT_CRC'));
            else ok(b);
          });
        }),
      );
      result.set(entry.fileName, b);
    }
    return result;
  } finally {
    zip.close();
  }
}
export function manifestSource(
  bytes: Buffer,
  entries: Map<string, Buffer>,
  sourceHash: string,
  kind: 'folder' | '2dparts' = '2dparts',
): SplitSource {
  if (bytes.length > SPLIT_LIMITS.manifest) fail('MANIFEST');
  let raw: unknown;
  let json: string;
  try {
    json = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    raw = JSON.parse(json);
  } catch {
    fail('MANIFEST');
  }
  if (
    !keys(raw, ['format', 'schemaVersion', 'canvas', 'layers', 'groups', 'hashes']) ||
    raw.format !== '2dparts' ||
    !keys(raw.schemaVersion, ['major', 'minor']) ||
    raw.schemaVersion.major !== 1 ||
    raw.schemaVersion.minor !== 0
  )
    fail('VERSION');
  const c = raw.canvas;
  if (
    !keys(c, ['width', 'height']) ||
    ![c.width, c.height].every((n) => Number.isInteger(n) && number(n, 256, 4096))
  )
    fail('CANVAS');
  if (
    !Array.isArray(raw.layers) ||
    !raw.layers.length ||
    raw.layers.length > 64 ||
    (raw.groups !== undefined && (!Array.isArray(raw.groups) || raw.groups.length > 128)) ||
    !raw.hashes ||
    typeof raw.hashes !== 'object' ||
    Array.isArray(raw.hashes)
  )
    fail('MANIFEST');
  const layers: SourceLayer[] = raw.layers.map((v: unknown) => {
    if (
      !keys(v, [
        'id',
        'name',
        'path',
        'origin',
        'z',
        'role',
        'side',
        'visible',
        'opacity',
        'group',
        'parent',
        'usage',
        'variantOf',
        'state',
        'blendMode',
      ]) ||
      !text(v.id) ||
      !text(v.name ?? v.id, 120) ||
      !text(v.path, 240) ||
      !safeEntry(v.path) ||
      !/\.png$/i.test(v.path) ||
      (v.origin != null &&
        (!Array.isArray(v.origin) ||
          v.origin.length !== 2 ||
          !v.origin.every((n) => number(n, -8192, 8192)))) ||
      (v.z != null && (!Number.isInteger(v.z) || !number(v.z, -100000, 100000))) ||
      (v.role != null && !ROLES.includes(v.role as never)) ||
      (v.side != null && !SIDES.includes(v.side as never)) ||
      (v.visible !== undefined && typeof v.visible !== 'boolean') ||
      (v.opacity !== undefined && !number(v.opacity, 0, 1)) ||
      ![v.group, v.parent, v.variantOf].every((a) => a == null || text(a)) ||
      (v.usage !== undefined &&
        !['primary', 'auxiliary', 'alternative'].includes(String(v.usage))) ||
      (v.state !== undefined && !STATES.includes(v.state as never)) ||
      (v.blendMode !== undefined && v.blendMode !== 'normal')
    )
      fail('LAYER_ATTRIBUTES');
    return {
      id: v.id,
      name: (v.name ?? v.id) as string,
      path: v.path,
      origin: (v.origin ?? null) as [number, number] | null,
      z: (v.z ?? null) as number | null,
      role: (v.role ?? null) as SourceLayer['role'],
      side: (v.side ?? null) as SourceLayer['side'],
      visible: (v.visible ?? true) as boolean,
      opacity: (v.opacity ?? 1) as number,
      group: (v.group ?? null) as string | null,
      parent: (v.parent ?? null) as string | null,
      usage: (v.usage ?? 'primary') as SourceLayer['usage'],
      variantOf: (v.variantOf ?? null) as string | null,
      state: (v.state ?? 'default') as SourceLayer['state'],
    };
  });
  const groups: SourceGroup[] = ((raw.groups ?? []) as unknown[]).map((v: unknown) => {
    if (
      !keys(v, ['id', 'name', 'parent', 'visible', 'opacity', 'blendMode']) ||
      !text(v.id) ||
      !text(v.name ?? v.id, 120) ||
      (v.parent != null && !text(v.parent)) ||
      (v.visible !== undefined && typeof v.visible !== 'boolean') ||
      (v.opacity !== undefined && !number(v.opacity, 0, 1)) ||
      (v.blendMode !== undefined && v.blendMode !== 'normal')
    )
      fail('GROUP_ATTRIBUTES');
    return {
      id: v.id,
      name: (v.name ?? v.id) as string,
      parent: (v.parent ?? null) as string | null,
      visible: (v.visible ?? true) as boolean,
      opacity: (v.opacity ?? 1) as number,
    };
  });
  if (
    new Set(layers.map((l) => l.id)).size !== layers.length ||
    new Set(groups.map((g) => g.id)).size !== groups.length
  )
    fail('DUPLICATE_ID');
  const files = new Map<string, Buffer>();
  const hashes = raw.hashes as Record<string, unknown>;
  const paths = new Set(layers.map((l) => l.path));
  if (Object.keys(hashes).length !== paths.size || Object.keys(hashes).some((p) => !paths.has(p)))
    fail('HASHES');
  for (const path of paths) {
    const b = entries.get(path);
    if (
      !b ||
      typeof hashes[path] !== 'string' ||
      !/^[a-f0-9]{64}$/.test(hashes[path] as string) ||
      hash(b) !== hashes[path]
    )
      fail('HASH');
    files.set(path, b);
  }
  if ([...entries.keys()].some((p) => p !== 'manifest.json' && !paths.has(p))) fail('UNDECLARED');
  pngBudget(files);
  return {
    kind,
    sourceHash,
    manifest: json!,
    canvas: { width: c.width as number, height: c.height as number },
    layers,
    groups,
    files,
    omitted: [],
    missingProperties: layers.some(
      (l) => l.origin === null || l.role === null || l.side === null || l.z === null,
    )
      ? ['LAYER_FIELDS_UNPROVIDED']
      : [],
  };
}
export async function readArchive(bytes: Buffer): Promise<SplitSource> {
  const e = await readEntries(bytes);
  const m = e.get('manifest.json');
  if (!m) fail('MANIFEST');
  return manifestSource(m, e, hash(bytes));
}
export async function readSource(
  path: string,
  kind: 'folder' | '2dparts',
  signal: AbortSignal,
): Promise<SplitSource> {
  if (path.startsWith('\\\\') || !isAbsolute(path)) fail('LOCAL_PATH');
  if (signal.aborted) throw new Error('E_JOB_CANCELLED');
  if (kind === '2dparts') {
    if (!path.toLowerCase().endsWith('.2dparts')) fail('EXTENSION');
    return readArchive(await readSnapshot(path, SPLIT_LIMITS.compressed));
  }
  const root = await realpath(path);
  const info = await lstat(path);
  if (!info.isDirectory() || info.isSymbolicLink()) fail('FOLDER');
  const entries = new Map<string, Buffer>();
  const omitted: string[] = [];
  const names = new Set<string>();
  let count = 0,
    size = 0;
  const walk = async (dir: string, depth: number): Promise<void> => {
    if (depth > 8) fail('FOLDER_DEPTH');
    for (const e of await readdir(dir, { withFileTypes: true })) {
      if (signal.aborted) throw new Error('E_JOB_CANCELLED');
      if (++count > SPLIT_LIMITS.entries) fail('ENTRIES');
      const file = join(dir, e.name),
        name = relative(root, file).replaceAll('\\', '/');
      if (!safeEntry(name) || names.has(name.toLowerCase())) fail('ENTRY');
      names.add(name.toLowerCase());
      const st = await lstat(file);
      if (st.isSymbolicLink()) fail('LINK');
      if (st.isDirectory()) {
        await walk(file, depth + 1);
        continue;
      }
      if (!st.isFile()) fail('FILE');
      if (name === 'manifest.json' || /\.png$/i.test(name)) {
        const b = await readSnapshot(
          file,
          name === 'manifest.json' ? SPLIT_LIMITS.manifest : SPLIT_LIMITS.png,
        );
        size += b.length;
        if (size > SPLIT_LIMITS.uncompressed) fail('ZIP_BUDGET');
        entries.set(name, b);
      } else if (omitted.length < 128) omitted.push(name);
    }
  };
  await walk(root, 0);
  const m = entries.get('manifest.json');
  if (m) {
    const s = manifestSource(
      m,
      entries,
      hash(
        Buffer.from(
          [...entries]
            .map(([p, b]) => p + ':' + hash(b))
            .sort()
            .join('\n'),
        ),
      ),
      'folder',
    );
    s.omitted = omitted;
    return s;
  }
  if (!entries.size || entries.size > 64) fail('LAYER_COUNT');
  pngBudget(entries);
  const paths = [...entries.keys()].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  return {
    kind: 'folder',
    sourceHash: hash(Buffer.from(paths.map((p) => p + ':' + hash(entries.get(p)!)).join('\n'))),
    manifest: null,
    canvas: null,
    groups: [],
    files: entries,
    omitted,
    missingProperties: ['ORIGIN', 'ROLE', 'SIDE', 'ORDER', 'GROUPS', 'OPACITY', 'VISIBILITY'],
    layers: paths.map((path, i) => ({
      id: 'file-' + i,
      name: path.split('/').at(-1)!.slice(0, 120),
      path,
      origin: null,
      z: null,
      role: null,
      side: null,
      visible: true,
      opacity: 1,
      group: null,
      parent: null,
      usage: 'primary',
      variantOf: null,
      state: 'default',
    })),
  };
}
export async function writeArchive(
  d: SplitDraft,
  sources: ReadonlyMap<string, Buffer>,
): Promise<Buffer> {
  const files = new Map<string, Buffer>();
  const hashes: Record<string, string> = {};
  const layers = d.layers.map((l) => {
    const b = sources.get(l.sourceHash);
    if (!b || hash(b) !== l.sourceHash) fail('RESOURCE');
    const path = 'images/' + l.sourceHash + '.png';
    files.set(path, b);
    hashes[path] = l.sourceHash;
    return {
      id: l.id,
      name: l.name,
      path,
      origin: l.origin,
      z: l.z,
      role: l.role,
      side: l.side,
      visible: l.visible,
      opacity: l.opacity,
      parent: l.parentId,
      group: l.groupId,
      usage: l.usage,
      variantOf: l.variantOf,
      state: l.state,
      blendMode: 'normal',
    };
  });
  const manifest = {
    format: '2dparts',
    schemaVersion: { major: 1, minor: 0 },
    canvas: d.canvas,
    layers,
    groups: d.groups.map((g) => ({
      id: g.id,
      name: g.name,
      parent: g.parentGroupId,
      visible: g.visible,
      opacity: g.opacity,
      blendMode: 'normal',
    })),
    hashes,
  };
  const mb = Buffer.from(JSON.stringify(manifest));
  if (mb.length > SPLIT_LIMITS.manifest) fail('MANIFEST');
  files.set('manifest.json', mb);
  return new Promise<Buffer>((ok, no) => {
    const zip = new Writer();
    const chunks: Buffer[] = [];
    let n = 0;
    zip.on('error', () => no(new Error('E_SPLIT_WRITE')));
    zip.outputStream.on('error', () => no(new Error('E_SPLIT_WRITE')));
    zip.outputStream.on('data', (b: Buffer) => {
      n += b.length;
      if (n > SPLIT_LIMITS.compressed) {
        (zip.outputStream as import('node:stream').Readable).destroy();
        no(new Error('E_SPLIT_ZIP_SIZE'));
      } else chunks.push(b);
    });
    zip.outputStream.once('end', () => ok(Buffer.concat(chunks)));
    for (const [p, b] of files) zip.addBuffer(b, p, { mtime: new Date('2026-01-01T00:00:00Z') });
    zip.end();
  });
}
