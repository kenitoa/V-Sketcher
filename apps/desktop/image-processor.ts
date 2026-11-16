import { spawn } from 'node:child_process';
import { mkdtemp,writeFile,readFile,rm,mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import type { InputProcessor,Probe,Analysis } from '../../packages/image-input/types';
export function imageProcessor(executable:string,args:string[],directory:string,env:NodeJS.ProcessEnv):InputProcessor {
  return { async run(operation,bytes,suffix,selection,signal) {
    if (signal.aborted) throw new Error('E_JOB_CANCELLED');await mkdir(directory,{ recursive:true });const temp=await mkdtemp(join(directory,'input-'));
    try { const source=join(temp,'source'+suffix);await writeFile(source,bytes);if (signal.aborted) throw new Error('E_JOB_CANCELLED');
      const result=await new Promise<{ report:Probe | Analysis }>((resolve,reject) => {
        const child=spawn(executable,[...args,'--image-input'],{ env,shell:false,windowsHide:true,stdio:'pipe' });let output=Buffer.alloc(0);let settled=false;
        const abort=():void => { child.kill(); };const timer=setTimeout(() => child.kill(),60000);signal.addEventListener('abort',abort,{ once:true });
        child.stdout.on('data',(b:Buffer) => { output=Buffer.concat([output,b]);if (output.length>65536) child.kill(); });child.stderr.on('data',() => {});child.stdin.on('error',() => {});
        const finish=(code:number | null):void => { if (settled)return;settled=true;clearTimeout(timer);signal.removeEventListener('abort',abort);if (signal.aborted) return reject(new Error('E_JOB_CANCELLED'));try { const value=JSON.parse(output.toString('utf8'));if (code!==0 || !value.ok) throw new Error(/^E_INPUT_[A-Z_]+$/.test(value.code) ? value.code : 'E_INPUT_PROCESSING');resolve(value); } catch (e) { reject(e instanceof Error && /^E_INPUT_[A-Z_]+$/.test(e.message) ? e : new Error('E_INPUT_PROCESSING')); } };
        child.once('error',() => finish(-1));child.once('close',finish);child.stdin.end(JSON.stringify({ operation,source,suffix,selection,output:temp })+'\n');if (signal.aborted) abort();
      });
      const files=new Map<string,Buffer>();for (const name of operation==='probe' ? ['normalized.png'] : ['selected.png','analysis.png']) files.set(name,await readFile(join(temp,name)));return { ...result,files };
    } finally { await rm(temp,{ recursive:true,force:true }); }
  } };
}
