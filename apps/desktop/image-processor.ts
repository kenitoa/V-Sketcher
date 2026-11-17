import { spawn } from 'node:child_process';
import { mkdtemp,writeFile,readFile,rm,mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import {assertReport,type StructureReport,type StructureOptions} from '../../packages/single-image/types';
import type { InputProcessor,Probe,Analysis } from '../../packages/image-input/types';
export function imageProcessor(executable:string,args:string[],directory:string,env:NodeJS.ProcessEnv,operationTimeoutMs?:number):InputProcessor {
  async function execute(operation:string,bytes:Buffer,suffix:string,selection:unknown,signal:AbortSignal) {
    if (signal.aborted) throw new Error('E_JOB_CANCELLED');await mkdir(directory,{ recursive:true });const temp=await mkdtemp(join(directory,'input-'));
    try { const source=join(temp,'source'+suffix);await writeFile(source,bytes);if (signal.aborted) throw new Error('E_JOB_CANCELLED');
      const result=await new Promise<{ report:Probe | Analysis | StructureReport }>((resolve,reject) => {
        const child=spawn(executable,[...args,'--image-input'],{ env,shell:false,windowsHide:true,stdio:'pipe' });let output=Buffer.alloc(0);let settled=false;let timedOut=false;
        const abort=():void => { child.kill(); };const timer=setTimeout(() => { timedOut=true;child.kill(); },operationTimeoutMs??(operation.startsWith('structure-')?120000:60000));signal.addEventListener('abort',abort,{ once:true });
        child.stdout.on('data',(b:Buffer) => { output=Buffer.concat([output,b]);if (output.length>65536) child.kill(); });child.stderr.on('data',() => {});child.stdin.on('error',() => {});
        const finish=(code:number | null):void => { if (settled)return;settled=true;clearTimeout(timer);signal.removeEventListener('abort',abort);if (signal.aborted) return reject(new Error('E_JOB_CANCELLED'));if(timedOut)return reject(new Error('E_INPUT_TIMEOUT'));try { const value=JSON.parse(output.toString('utf8'));if (code!==0 || !value.ok) throw new Error(/^E_INPUT_[A-Z_]+$/.test(value.code) ? value.code : 'E_INPUT_PROCESSING');resolve(value); } catch (e) { reject(e instanceof Error && /^E_INPUT_[A-Z_]+$/.test(e.message) ? e : new Error('E_INPUT_PROCESSING')); } };
        child.once('error',() => finish(-1));child.once('close',finish);child.stdin.end(JSON.stringify({ operation,source,suffix,selection,output:temp })+'\n');if (signal.aborted) abort();
      });
      let names=operation==='probe' ? ['normalized.png'] : ['selected.png','analysis.png'];if(operation.startsWith('structure-')){assertReport(result.report);names=result.report.files;}const files=new Map<string,Buffer>();for (const name of names) {const data=await readFile(join(temp,name));if(data.length>64*1024*1024)throw new Error('E_INPUT_BYTES');files.set(name,data);}return { ...result,files };
    } finally { await rm(temp,{ recursive:true,force:true }); }
  }
  return {async run(operation,bytes,suffix,selection,signal){const r=await execute(operation,bytes,suffix,selection,signal);return {...r,report:r.report as Probe|Analysis};},async structure(operation,bytes,options:StructureOptions,signal){const r=await execute('structure-'+operation,bytes,'.png',options,signal);assertReport(r.report);return {...r,report:r.report};}};
}
