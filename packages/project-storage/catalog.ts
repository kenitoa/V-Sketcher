import { mkdir, readFile, unlink, readdir, stat, lstat } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { readBundle, decodeBundle, sha256, encodeBundle, type SnapshotKind } from './archive';
import {replaceJournal} from './replace';
import { serializeProject, type Project } from '../project-model';
export interface RecoveryRecord { id:string; projectId:string; displayName:string; revision:number; createdAt:string; kind:'autosave' | 'checkpoint' | 'backup'; reason:string; sourcePath:string | null; pending:boolean; bytes:number; hash:string; }
export interface RecentRecord { id:string; path:string; displayName:string; sourceType:string; openedAt:string; }
interface Catalog { version:1; recent:RecentRecord[]; recovery:RecoveryRecord[]; }
const UUID = /^[a-f0-9-]{36}$/;
export class ProjectCatalog {
  private data:Catalog = { version:1,recent:[],recovery:[] }; private queue:Promise<unknown> = Promise.resolve();
  constructor(readonly root:string,readonly budget = 2*1024*1024*1024) {}
  file(id:string):string { if (!UUID.test(id)) throw new Error('E_RECOVERY_ID'); return join(this.root,'snapshots',id+'.2dsketch'); }
  private async persist():Promise<void> {
    await mkdir(this.root,{ recursive:true }); const file = join(this.root,'catalog.json'); const temporary = join(this.root,'.catalog-'+randomUUID()+'.tmp');
    try { const handle = await import('node:fs/promises').then(fs => fs.open(temporary,'wx')); try { await handle.writeFile(JSON.stringify(this.data)); await handle.sync(); } finally { await handle.close(); } await replaceJournal(temporary,file); }
    finally { try { await unlink(temporary); } catch { /* non-authoritative temporary journal */ } }
  }
  private mutate<T>(operation:()=>Promise<T>):Promise<T> { const result = this.queue.then(operation); this.queue = result.catch(() => {}); return result; }
  async init():Promise<void> {
    await mkdir(join(this.root,'snapshots'),{ recursive:true });
    if ((await lstat(join(this.root,'snapshots'))).isSymbolicLink()) throw new Error('E_RECOVERY_PATH');
    try { const data = JSON.parse(await readFile(join(this.root,'catalog.json'),'utf8')) as Catalog;
      if (data.version !== 1 || !Array.isArray(data.recent) || !Array.isArray(data.recovery)) throw new Error('E_CATALOG');
      this.data.recent = data.recent.filter(r => r && UUID.test(r.id) && typeof r.path === 'string' && typeof r.displayName === 'string' && typeof r.sourceType === 'string' && Number.isFinite(Date.parse(r.openedAt))).slice(0,20);
      this.data.recovery = data.recovery.filter(r => r && UUID.test(r.id) && /^[A-Za-z0-9_-]{1,64}$/.test(r.projectId) && typeof r.displayName === 'string' && typeof r.reason === 'string' && Number.isFinite(Date.parse(r.createdAt)) && Number.isSafeInteger(r.revision) && r.revision >= 0 && typeof r.pending === 'boolean' && (r.sourcePath === null || typeof r.sourcePath === 'string') && Number.isSafeInteger(r.bytes) && r.bytes > 0 && ['autosave','checkpoint','backup'].includes(r.kind) && typeof r.hash === 'string' && /^[a-f0-9]{64}$/.test(r.hash));
    } catch { this.data = { version:1,recent:[],recovery:[] }; }
    // A crash between snapshot commit and journal commit must not hide a valid recovery bundle.
    for (const name of (await readdir(join(this.root,'snapshots'))).slice(0,512)) {
      const id = name.slice(0,-9); if (!name.endsWith('.2dsketch') || !UUID.test(id) || this.data.recovery.some(r => r.id === id)) continue;
      try { const bundle = await readBundle(this.file(id),false); if (!bundle.project) continue; const p = bundle.project; const info = await stat(this.file(id));
        this.data.recovery.push({ id,projectId:p.projectId,displayName:p.displayName,revision:p.revision,createdAt:bundle.manifest.snapshot.createdAt,kind:bundle.manifest.snapshot.kind === 'manual' ? 'backup' : bundle.manifest.snapshot.kind,reason:bundle.manifest.snapshot.reason,sourcePath:null,pending:bundle.manifest.snapshot.kind !== 'manual',bytes:info.size,hash:bundle.fileHash });
      } catch { /* corrupted snapshots are never offered as valid recovery */ }
    }
  }
  recent():RecentRecord[] { return structuredClone(this.data.recent); }
  recoveries():RecoveryRecord[] { return structuredClone(this.data.recovery).sort((a,b) => b.createdAt.localeCompare(a.createdAt)); }
  async addRecent(path:string,project:Project):Promise<void> { await this.mutate(async () => { const prior = this.data.recent.find(r => r.path.toLowerCase() === path.toLowerCase()); this.data.recent = [{ id:prior?.id ?? randomUUID(),path,displayName:project.displayName,sourceType:project.sourceType,openedAt:new Date().toISOString() },...this.data.recent.filter(r => r.path.toLowerCase() !== path.toLowerCase())].slice(0,20); await this.persist(); }); }
  async removeRecent(id:string):Promise<void> { await this.mutate(async () => { this.data.recent = this.data.recent.filter(r => r.id !== id); await this.persist(); }); }
  async acknowledge(projectId:string):Promise<void> { await this.mutate(async () => { for (const record of this.data.recovery) if (record.projectId === projectId) record.pending = false; await this.persist(); }); }
  async record(project:Project,resources:ReadonlyMap<string,Buffer>,kind:SnapshotKind,sourcePath:string | null,reason:string,rawBackup?:Buffer):Promise<RecoveryRecord> {
    return this.mutate(async () => {
      const existing = kind !== 'manual' ? this.data.recovery.find(r => r.projectId === project.projectId && r.revision === project.revision && r.kind !== 'backup') : undefined;
      if (existing) { try { const previous = await readBundle(this.file(existing.id),false); if (previous.fileHash === existing.hash && previous.project && serializeProject(previous.project) === serializeProject(project)) return structuredClone(existing); } catch { /* replace a corrupt candidate with a new verified record */ } }
      const bytes = rawBackup ?? await encodeBundle(project,resources,kind,reason); const bundle = await decodeBundle(bytes,false); if (!bundle.project) throw new Error('E_RECOVERY_VERSION');
      const same = this.data.recovery.filter(r => r.projectId === project.projectId); const protectedIds = new Set<string>();
      for (const type of ['backup','recovery']) { const newest = same.filter(r => type === 'backup' ? r.kind === 'backup' : r.kind !== 'backup').sort((a,b) => b.createdAt.localeCompare(a.createdAt))[0]; if (newest) protectedIds.add(newest.id); }
      let total = same.reduce((n,r) => n+r.bytes,0);
      for (const record of same.sort((a,b) => a.createdAt.localeCompare(b.createdAt))) { if (total+bytes.length <= this.budget) break; if (!protectedIds.has(record.id) && await this.removeOwned(record)) total -= record.bytes; }
      if (total+bytes.length > this.budget) throw new Error('E_RECOVERY_SPACE');
      const id = randomUUID(); const file = this.file(id); const handle = await import('node:fs/promises').then(fs => fs.open(file,'wx'));
      let hash:string;
      try { try { await handle.writeFile(bytes); await handle.sync(); } finally { await handle.close(); }
        const verified = await readBundle(file,false); if (verified.fileHash !== sha256(bytes)) throw new Error('E_RECOVERY_HASH'); hash = verified.fileHash;
      } catch (error) { try { await unlink(file); } catch { /* never authoritative */ } throw error; }
      const timestamp = Math.max(Date.now(),...same.map(r => Date.parse(r.createdAt)+1));
      const record:RecoveryRecord = { id,projectId:project.projectId,displayName:project.displayName,revision:project.revision,createdAt:new Date(timestamp).toISOString(),kind:kind === 'manual' ? 'backup' : kind,reason,sourcePath,pending:kind !== 'manual',bytes:bytes.length,hash };
      this.data.recovery.push(record); await this.persist();
      const group = this.data.recovery.filter(r => r.projectId === project.projectId && (r.kind === 'backup') === (record.kind === 'backup')).sort((a,b) => b.createdAt.localeCompare(a.createdAt));
      for (const old of group.slice(5)) await this.removeOwned(old); await this.persist(); return structuredClone(record);
    });
  }
  private async removeOwned(record:RecoveryRecord):Promise<boolean> {
    try { const bytes = await readFile(this.file(record.id)); if (sha256(bytes) !== record.hash) return false; await unlink(this.file(record.id)); this.data.recovery = this.data.recovery.filter(r => r.id !== record.id); return true; } catch { return false; }
  }
}
