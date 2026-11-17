import {spawn} from 'node:child_process';
import {mkdir,mkdtemp,writeFile,readFile,rm} from 'node:fs/promises';
import {join} from 'node:path';
import type {SplitProcessor,ProbeImage} from '../../packages/split-image/types';
export function splitProcessor(executable:string,args:string[],directory:string,env:NodeJS.ProcessEnv):SplitProcessor{
 return {async probe(input,signal){
  if(signal.aborted)throw new Error('E_JOB_CANCELLED');await mkdir(directory,{recursive:true});const temp=await mkdtemp(join(directory,'layers-'));
  try{
   const sources:{key:string;source:string}[]=[];let n=0;for(const [key,b] of input){if(!/^[a-f0-9]{64}$/.test(key))throw new Error('E_SPLIT_PROCESSING');const file=join(temp,'source-'+(n++)+'.png');await writeFile(file,b);sources.push({key,source:file});}
   const request=JSON.stringify({operation:'split-probe',sources,output:temp})+'\n';if(Buffer.byteLength(request)>32768)throw new Error('E_SPLIT_REQUEST_SIZE');
   const report=await new Promise<{images:ProbeImage[]}>((ok,no)=>{
    const child=spawn(executable,[...args,'--image-input'],{env,shell:false,windowsHide:true,stdio:'pipe'});let output=Buffer.alloc(0),settled=false,timedOut=false;
    const abort=()=>child.kill();const timer=setTimeout(()=>{timedOut=true;child.kill();},120000);signal.addEventListener('abort',abort,{once:true});child.stdout.on('data',(b:Buffer)=>{output=Buffer.concat([output,b]);if(output.length>65536)child.kill();});child.stderr.on('data',()=>{});child.stdin.on('error',()=>{});
    const finish=(code:number|null)=>{if(settled)return;settled=true;clearTimeout(timer);signal.removeEventListener('abort',abort);if(signal.aborted){no(new Error('E_JOB_CANCELLED'));return;}if(timedOut){no(new Error('E_SPLIT_TIMEOUT'));return;}try{const value=JSON.parse(output.toString('utf8'));if(code!==0||!value.ok)throw new Error(typeof value.code==='string'&&/^E_INPUT_SPLIT_[A-Z_]+$/.test(value.code)?value.code:'E_SPLIT_PROCESSING');const r=value.report;if(!Array.isArray(r?.images)||r.images.length!==sources.length||new Set(r.images.map((v:ProbeImage)=>v.key)).size!==sources.length||r.images.some((v:ProbeImage)=>!input.has(v.key)||![v.width,v.height].every(n=>Number.isInteger(n)&&n>=1&&n<=4096)||![v.empty,v.opaque,v.iccConverted].every(n=>typeof n==='boolean')||v.bounds!==null&&(![v.bounds.x,v.bounds.y,v.bounds.width,v.bounds.height].every(Number.isFinite)||v.bounds.x<0||v.bounds.y<0||v.bounds.width<1||v.bounds.height<1||v.bounds.x+v.bounds.width>v.width||v.bounds.y+v.bounds.height>v.height)||v.empty!==(v.bounds===null)))throw new Error('E_SPLIT_REPORT');ok(r);}catch(e){no(e instanceof Error&&/^E_[A-Z_]+$/.test(e.message)?e:new Error('E_SPLIT_PROCESSING'));}};
    child.once('error',()=>finish(-1));child.once('close',finish);child.stdin.end(request);if(signal.aborted)abort();
   });
   const files=new Map<string,Buffer>();for(const image of report.images){const b=await readFile(join(temp,image.key+'.png'));if(b.length>64*1024*1024)throw new Error('E_SPLIT_MEMORY');files.set(image.key,b);}return {images:report.images,files};
  }finally{await rm(temp,{recursive:true,force:true});}
 }};
}
