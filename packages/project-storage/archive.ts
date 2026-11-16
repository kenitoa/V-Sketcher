import { createHash } from 'node:crypto';
import { crc32 } from 'node:zlib';
import type { Readable } from 'node:stream';
import { readFile, stat } from 'node:fs/promises';
import { ZipFile as Writer } from 'yazl';
import { fromBuffer, type Entry, type ZipFile } from 'yauzl';
import { assertProject, readProject, serializeProject, portableResourcePath, type Project } from '../project-model';
export const LIMITS = { compressed:256*1024*1024,uncompressed:512*1024*1024,entries:1024,project:16*1024*1024,manifest:1024*1024 };
export const sha256 = (bytes:Uint8Array):string => createHash('sha256').update(bytes).digest('hex');
export type SnapshotKind = 'manual' | 'autosave' | 'checkpoint';
export interface BundleManifest { format:'2dsketch'; version:{ major:number; minor:number }; project:{ path:'project.json'; bytes:number; sha256:string };
  resources:{ path:string; bytes:number; sha256:string }[]; snapshot:{ kind:SnapshotKind; createdAt:string; revision:number; reason:string }; }
export interface LoadedBundle { mode:'editable' | 'read-only'; project:Project | null; raw:unknown; manifest:BundleManifest; resources:Map<string,Buffer>;
  issues:{ assetId:string; code:'E_RESOURCE_MISSING' | 'E_RESOURCE_CHANGED' }[]; fileHash:string; }
const validHash = (value:unknown):value is string => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value);
function validateManifest(value:unknown):asserts value is BundleManifest {
  const m = value as BundleManifest;
  if (!m || m.format !== '2dsketch' || m.version?.major !== 1 || !Number.isSafeInteger(m.version.minor) || m.version.minor < 0) throw new Error('E_FILE_VERSION');
  if (m.project?.path !== 'project.json' || !validHash(m.project.sha256) || !Number.isSafeInteger(m.project.bytes) || m.project.bytes < 1 || m.project.bytes > LIMITS.project ||
    !Array.isArray(m.resources) || m.resources.length > 1022 || !m.snapshot || !['manual','autosave','checkpoint'].includes(m.snapshot.kind) || !Number.isSafeInteger(m.snapshot.revision) || m.snapshot.revision < 0 || typeof m.snapshot.reason !== 'string' || m.snapshot.reason.length > 120 || !Number.isFinite(Date.parse(m.snapshot.createdAt))) throw new Error('E_MANIFEST');
  const names = new Set<string>();
  for (const resource of m.resources) {
    if (!resource || !portableResourcePath(resource.path) || !/^resources\/[a-f0-9]{64}\.(png|jpg|jpeg)$/.test(resource.path) || !validHash(resource.sha256) || !Number.isSafeInteger(resource.bytes) || resource.bytes < 1 || resource.bytes > LIMITS.uncompressed || names.has(resource.path.toLowerCase())) throw new Error('E_MANIFEST');
    if (!resource.path.startsWith('resources/'+resource.sha256+'.')) throw new Error('E_MANIFEST'); names.add(resource.path.toLowerCase());
  }
}
async function zipEntries(bytes:Buffer):Promise<Map<string,Buffer>> {
  if (bytes.length < 22 || bytes.length > LIMITS.compressed) throw new Error('E_ZIP_SIZE');
  const zip = await new Promise<ZipFile>((resolve,reject) => fromBuffer(bytes,{ lazyEntries:true,autoClose:false,validateEntrySizes:true,strictFileNames:true },(error,value) => error || !value ? reject(new Error('E_ZIP_CORRUPT')) : resolve(value)));
  try {
    const entries = await new Promise<Entry[]>((resolve,reject) => {
      const list:Entry[] = []; const names = new Set<string>(); let size = 0;
      zip.on('error',() => reject(new Error('E_ZIP_CORRUPT'))); zip.on('end',() => resolve(list));
      zip.on('entry',(entry:Entry) => {
        const name = entry.fileName; const unixType = (entry.externalFileAttributes >>> 16) & 0xf000;
        if (list.length >= LIMITS.entries || names.has(name.toLowerCase()) || !['project.json','manifest.json'].includes(name) && !/^resources\/[a-f0-9]{64}\.(png|jpg|jpeg)$/.test(name) ||
          name.normalize('NFC') !== name || name.includes('\\') || (entry.generalPurposeBitFlag & 1) !== 0 || ![0,8].includes(entry.compressionMethod) || unixType === 0xa000 || entry.uncompressedSize < 0 || !Number.isSafeInteger(entry.uncompressedSize)) { reject(new Error('E_ZIP_ENTRY')); return; }
        size += entry.uncompressedSize;
        const limit = name === 'project.json' ? LIMITS.project : name === 'manifest.json' ? LIMITS.manifest : LIMITS.uncompressed;
        if (size > LIMITS.uncompressed || entry.uncompressedSize > limit) { reject(new Error('E_ZIP_BUDGET')); return; }
        list.push(entry); names.add(name.toLowerCase()); zip.readEntry();
      }); zip.readEntry();
    });
    const output = new Map<string,Buffer>();
    for (const entry of entries) {
      const data = await new Promise<Buffer>((resolve,reject) => zip.openReadStream(entry,(error,stream) => {
        if (error || !stream) { reject(new Error('E_ZIP_CORRUPT')); return; }
        const parts:Buffer[] = []; let size = 0;
        stream.on('data',(chunk:Buffer) => { size += chunk.length; if (size > entry.uncompressedSize || size > LIMITS.uncompressed) { stream.destroy(); reject(new Error('E_ZIP_BUDGET')); } else parts.push(chunk); });
        stream.once('error',() => reject(new Error('E_ZIP_CORRUPT'))); stream.once('end',() => { const value = Buffer.concat(parts);
          if (size !== entry.uncompressedSize || crc32(value) !== entry.crc32) reject(new Error('E_ZIP_CORRUPT')); else resolve(value); });
      })); output.set(entry.fileName,data);
    }
    return output;
  } finally { zip.close(); }
}
export async function decodeBundle(bytes:Buffer,allowPartial = true):Promise<LoadedBundle> {
  const entries = await zipEntries(bytes); const manifestBytes = entries.get('manifest.json'); const projectBytes = entries.get('project.json');
  if (!manifestBytes || !projectBytes) throw new Error('E_PROJECT_MISSING');
  const utf8 = new TextDecoder('utf-8',{ fatal:true });
  let manifest:unknown; try { manifest = JSON.parse(utf8.decode(manifestBytes)); } catch { throw new Error('E_MANIFEST'); } validateManifest(manifest);
  if (projectBytes.length !== manifest.project.bytes || sha256(projectBytes) !== manifest.project.sha256) throw new Error('E_PROJECT_HASH');
  let projectText:string; try { projectText = utf8.decode(projectBytes); } catch { throw new Error('E_PROJECT_UTF8'); }
  const parsed = readProject(projectText);
  const listed = new Map(manifest.resources.map(r => [r.path,r]));
  for (const name of entries.keys()) if (!['project.json','manifest.json'].includes(name) && !listed.has(name)) throw new Error('E_RESOURCE_UNDECLARED');
  const resources = new Map<string,Buffer>();
  for (const resource of manifest.resources) { const data = entries.get(resource.path); if (data && data.length === resource.bytes && sha256(data) === resource.sha256) resources.set(resource.path,data); }
  if (parsed.mode === 'read-only' || manifest.version.minor > 0) return { mode:'read-only',project:null,raw:parsed.mode === 'read-only' ? parsed.raw : parsed.project,manifest,resources,issues:[],fileHash:sha256(bytes) };
  const project = parsed.project; const issues:LoadedBundle['issues'] = [];
  if (manifest.resources.some(r => !project.assets.some(a => a.storage.path === r.path))) throw new Error('E_RESOURCE_UNDECLARED');
  for (const asset of project.assets) {
    const entry = listed.get(asset.storage.path); if (!entry || entry.sha256 !== asset.fingerprint.sha256 || entry.bytes !== asset.fingerprint.bytes) throw new Error('E_RESOURCE_MANIFEST');
    if (!resources.has(asset.storage.path)) issues.push({ assetId:asset.id,code:entries.has(asset.storage.path) ? 'E_RESOURCE_CHANGED' : 'E_RESOURCE_MISSING' });
  }
  if (!allowPartial && issues.length) throw new Error(issues[0]!.code);
  if (manifest.snapshot.revision !== project.revision) throw new Error('E_MANIFEST_REVISION');
  return { mode:'editable',project,raw:project,manifest,resources,issues,fileHash:sha256(bytes) };
}
export async function readBundle(file:string,allowPartial = true):Promise<LoadedBundle> {
  const info = await stat(file); if (!info.isFile() || info.size > LIMITS.compressed) throw new Error('E_ZIP_SIZE');
  const data = await readFile(file); return decodeBundle(data,allowPartial);
}
export function resourcePath(asset:Project['assets'][number]):string { return `resources/${asset.fingerprint.sha256}.${asset.mediaType === 'image/png' ? 'png' : 'jpg'}`; }
export async function encodeBundle(input:Project,resources:ReadonlyMap<string,Buffer>,kind:SnapshotKind,reason = ''):Promise<Buffer> {
  assertProject(input); const project = structuredClone(input); if (kind === 'manual') project.savedRevision = project.revision;
  const data = new Map<string,Buffer>();
  for (const asset of project.assets) {
    const bytes = resources.get(asset.id) ?? resources.get(asset.storage.path);
    if (!bytes || bytes.length !== asset.fingerprint.bytes || sha256(bytes) !== asset.fingerprint.sha256) throw new Error('E_RESOURCE_MISSING');
    asset.storage.path = resourcePath(asset); data.set(asset.storage.path,bytes);
  }
  const projectBytes = Buffer.from(serializeProject(project));
  const manifest:BundleManifest = { format:'2dsketch',version:{ major:1,minor:0 },project:{ path:'project.json',bytes:projectBytes.length,sha256:sha256(projectBytes) },
    resources:[...data].map(([path,bytes]) => ({ path,bytes:bytes.length,sha256:sha256(bytes) })),snapshot:{ kind,createdAt:new Date().toISOString(),revision:project.revision,reason } };
  const entries = new Map([['project.json',projectBytes],['manifest.json',Buffer.from(JSON.stringify(manifest))],...data]);
  if (entries.size > LIMITS.entries || [...entries.values()].reduce((n,b) => n+b.length,0) > LIMITS.uncompressed) throw new Error('E_ZIP_BUDGET');
  return new Promise<Buffer>((resolve,reject) => {
    const zip = new Writer(); const chunks:Buffer[] = []; let size = 0;
    zip.on('error',() => reject(new Error('E_ZIP_WRITE'))); zip.outputStream.on('error',() => reject(new Error('E_ZIP_WRITE')));
    zip.outputStream.on('data',(chunk:Buffer) => { size += chunk.length; if (size > LIMITS.compressed) { (zip.outputStream as Readable).destroy(); reject(new Error('E_ZIP_SIZE')); } else chunks.push(chunk); });
    zip.outputStream.once('end',() => resolve(Buffer.concat(chunks)));
    for (const [name,bytes] of entries) zip.addBuffer(bytes,name,{ compress:true,mtime:new Date('2026-01-01T00:00:00Z') }); zip.end();
  });
}
