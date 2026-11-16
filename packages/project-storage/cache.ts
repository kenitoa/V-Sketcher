import { mkdir, readFile, writeFile, rename, unlink, lstat } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import type { Asset, Project } from '../project-model';
import { resourcePath, sha256, type LoadedBundle } from './archive';
export function validImage(asset:Asset,bytes:Buffer):boolean {
  if (asset.mediaType === 'image/png') return bytes.length >= 24 && bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])) && bytes.toString('ascii',12,16) === 'IHDR' && bytes.readUInt32BE(16) === asset.dimensions.width && bytes.readUInt32BE(20) === asset.dimensions.height;
  return bytes.length >= 3 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
}
export class ResourceCache {
  constructor(readonly root:string) {}
  path(asset:Asset):string { return join(this.root,resourcePath(asset)); }
  async put(asset:Asset,bytes:Buffer):Promise<void> {
    if (bytes.length !== asset.fingerprint.bytes || sha256(bytes) !== asset.fingerprint.sha256 || !validImage(asset,bytes)) throw new Error('E_RESOURCE_CHANGED');
    await mkdir(join(this.root,'resources'),{ recursive:true }); if ((await lstat(join(this.root,'resources'))).isSymbolicLink()) throw new Error('E_CACHE_LINK'); const path = this.path(asset);
    try { const info = await lstat(path); if (info.isSymbolicLink() || !info.isFile()) throw new Error('E_CACHE_LINK'); if (sha256(await readFile(path)) === asset.fingerprint.sha256) return; }
    catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT' && (error as Error).message !== 'E_RESOURCE_CHANGED') throw error; }
    const temporary = join(this.root,'resources','.cache-'+randomUUID()+'.tmp');
    try { await writeFile(temporary,bytes,{ flag:'wx' }); await rename(temporary,path); } finally { try { await unlink(temporary); } catch { /* promoted or retained non-authoritative temp */ } }
  }
  async ingest(bundle:LoadedBundle):Promise<void> { if (!bundle.project) return; for (const asset of bundle.project.assets) { const bytes = bundle.resources.get(asset.storage.path); if (bytes) { try { await this.put(asset,bytes); } catch { /* availability reports retain other readable parts */ } } } }
  async bytes(project:Project):Promise<Map<string,Buffer>> {
    const result = new Map<string,Buffer>(); for (const asset of project.assets) { const data = await this.read(asset); if (!data) throw new Error('E_RESOURCE_MISSING'); result.set(asset.id,data); } return result;
  }
  async read(asset:Asset):Promise<Buffer | null> {
    try { if ((await lstat(join(this.root,'resources'))).isSymbolicLink()) return null; const info = await lstat(this.path(asset)); if (!info.isFile() || info.isSymbolicLink()) return null; const bytes = await readFile(this.path(asset)); return sha256(bytes) === asset.fingerprint.sha256 && bytes.length === asset.fingerprint.bytes && validImage(asset,bytes) ? bytes : null; } catch { return null; }
  }
  async available(project:Project):Promise<Set<string>> { const ids = new Set<string>(); for (const asset of project.assets) if (await this.read(asset)) ids.add(asset.id); return ids; }
}
