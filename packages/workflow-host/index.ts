/** Host-only ownership helpers. No recursive deletion or arbitrary paths from worker messages. */
import { mkdir, mkdtemp, open, realpath, unlink, rmdir } from 'node:fs/promises';
import { join, relative, isAbsolute } from 'node:path';
import { spawn } from 'node:child_process';
import type { JobIdentity, Json, StageContext, Step } from '../workflow';
import { json } from '../workflow';
const inside = (root:string,path:string):boolean => { const part = relative(root,path); return part !== '..' && !part.startsWith('..\\') && !part.startsWith('../') && !isAbsolute(part); };
export class ScratchLease {
  private files = new Set<string>();
  private disposed = false;
  private constructor(private base:string,private directory:string) {}
  static async create(base:string,identity:JobIdentity):Promise<ScratchLease> {
    if (!/^[a-f0-9-]{36}$/.test(identity.jobId)) throw new Error('E_SCRATCH_ID');
    await mkdir(base,{ recursive:true }); const canonical = await realpath(base);
    const directory = await mkdtemp(join(canonical,identity.jobId+'-'));
    if (!inside(canonical,directory)) throw new Error('E_SCRATCH_PATH'); return new ScratchLease(canonical,directory);
  }
  async write(name:string,data:Uint8Array):Promise<void> {
    if (this.disposed || !/^[a-zA-Z0-9_-]{1,64}\.[a-z]{1,8}$/.test(name)) throw new Error('E_SCRATCH_PATH');
    const file = join(this.directory,name); const handle = await open(file,'wx'); this.files.add(file);
    try { await handle.writeFile(data); } finally { await handle.close(); }
  }
  async cleanup():Promise<void> {
    if (this.disposed) return;
    const actual = await realpath(this.directory);
    if (actual !== this.directory || !inside(this.base,actual)) throw new Error('E_SCRATCH_ESCAPE');
    for (const file of [...this.files]) {
      if (!inside(this.directory,file)) throw new Error('E_SCRATCH_PATH');
      try { await unlink(file); } catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw new Error('E_SCRATCH_CLEANUP'); }
      this.files.delete(file);
    }
    // Unknown files keep the directory alive and fail cleanup; they are never deleted.
    await rmdir(this.directory); this.disposed = true;
  }
}
/** A bounded JSON child step, used with fixed fixtures now; real analysis is a later adapter. */
export function processStep(id:string,executable:string,args:readonly string[]):Step {
  return { id,version:'1.0.0',cache:'none',cancellable:true,run:async (context:StageContext):Promise<Json> => {
    context.checkpoint(); const child = spawn(executable,[...args],{ stdio:'pipe',shell:false,windowsHide:true });
    let closed = false; let stop!:()=>void; const exited = new Promise<void>(resolve => { stop = resolve; });
    child.once('close',() => { closed = true; stop(); });
    const kill = async ():Promise<void> => { if (!closed) child.kill(); await exited; };
    context.own(kill);
    return new Promise<Json>((resolve,reject) => {
      let bytes = Buffer.alloc(0); let reply:Json | undefined; let failed = false; let protocolRejected = false;
      const abort = ():void => { failed = true; child.kill(); };
      child.once('spawn',() => { if (context.signal.aborted) abort(); });
      context.signal.addEventListener('abort',abort,{ once:true });
      child.once('error',() => { failed = true; });
      child.stdin.on('error',() => { failed = true; });
      child.stderr.on('data',() => { /* no raw native diagnostics in normal logs */ });
      child.stdout.on('data',(chunk:Buffer) => {
        bytes = Buffer.concat([bytes,chunk]); if (bytes.length > 65536) { protocolRejected = true; child.kill(); }
      });
      child.once('close',code => {
        context.signal.removeEventListener('abort',abort);
        if (context.signal.aborted) { reject(new Error('E_JOB_CANCELLED')); return; }
        if (failed || code !== 0 || protocolRejected) { reject(new Error('E_CHILD_FAILED')); return; }
        try {
          const value = JSON.parse(bytes.toString('utf8')) as { identity:JobIdentity; value:unknown };
          if (!value.identity || Object.keys(context.identity).some(key => value.identity[key as keyof JobIdentity] !== context.identity[key as keyof JobIdentity])) throw new Error('E_RESULT_IDENTITY');
          reply = json(value.value); resolve(reply);
        } catch { reject(new Error('E_CHILD_PROTOCOL')); }
      });
      child.stdin.end(JSON.stringify({ identity:context.identity,inputRevision:context.input.revision })+'\n');
      if (context.signal.aborted) abort();
    });
  } };
}
