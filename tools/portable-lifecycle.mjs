// Local validation helper. Never manages a user's real installation.
import {mkdirSync,existsSync,lstatSync,readdirSync,readFileSync,unlinkSync,rmdirSync} from 'node:fs';
import {createWriteStream} from 'node:fs';
import {pipeline} from 'node:stream/promises';
import {resolve,join,relative,isAbsolute,dirname} from 'node:path';
import {createHash} from 'node:crypto';
import {open} from 'yauzl';
const digest=b=>createHash('sha256').update(b).digest('hex');
export function inside(parent,path){const rel=relative(resolve(parent),resolve(path));return rel!==''&&!isAbsolute(rel)&&!rel.split(/[\\/]/).includes('..');}
export function inventory(folder){
 const files=[];const walk=dir=>{for(const name of readdirSync(dir)){const path=join(dir,name),stat=lstatSync(path);if(stat.isSymbolicLink())throw new Error('E_PORTABLE_LINK');if(stat.isDirectory())walk(path);else if(stat.isFile())files.push({path:relative(folder,path).replaceAll('\\','/'),bytes:stat.size,sha256:digest(readFileSync(path))});else throw new Error('E_PORTABLE_TYPE');}};walk(folder);return files.sort((a,b)=>a.path.localeCompare(b.path));
}
export async function extractNew(zipPath,parent,name){
 if(!/^[a-zA-Z0-9.-]+$/.test(name)||name==='.'||name==='..')throw new Error('E_PORTABLE_NAME');
 const target=resolve(parent,name);if(!inside(parent,target)||existsSync(target))throw new Error('E_PORTABLE_TARGET');mkdirSync(target,{recursive:true});
 let total=0;const seen=new Set();
 await new Promise((yes,no)=>open(zipPath,{lazyEntries:true},(error,zip)=>{
  if(error)return no(error);const fail=error=>{zip.close();no(error);};zip.on('error',fail);
  zip.on('entry',entry=>{void(async()=>{
   const key=entry.fileName.replaceAll('\\','/');const path=resolve(target,key);const mode=(entry.externalFileAttributes>>>16)&0xf000;
   if(!inside(target,path)||isAbsolute(key)||key.includes(':')||key.split('/').some(p=>p==='..')||mode===0xa000||seen.has(key.toLowerCase()))throw new Error('E_PORTABLE_ENTRY');
   total+=entry.uncompressedSize;if(total>3*1024**3||seen.size>20000)throw new Error('E_PORTABLE_SIZE');seen.add(key.toLowerCase());
   if(key.endsWith('/'))mkdirSync(path,{recursive:true});else{mkdirSync(dirname(path),{recursive:true});const stream=await new Promise((res,rej)=>zip.openReadStream(entry,(e,s)=>e?rej(e):res(s)));await pipeline(stream,createWriteStream(path,{flags:'wx'}));}
   zip.readEntry();
  })().catch(fail);});zip.on('end',yes);zip.readEntry();
 }));return {folder:target,files:inventory(target)};
}
export function removeOwned(parent,folder,expected){
 if(!inside(parent,folder)||lstatSync(folder).isSymbolicLink())throw new Error('E_PORTABLE_REMOVE_TARGET');
 const actual=inventory(folder);if(JSON.stringify(actual)!==JSON.stringify(expected))throw new Error('E_PORTABLE_MODIFIED');
 // Verify every absolute path before any deletion. No recursive remove or shell composition.
 const paths=expected.map(f=>resolve(folder,f.path));if(paths.some(p=>!inside(folder,p)))throw new Error('E_PORTABLE_REMOVE_PATH');
 for(const path of paths)unlinkSync(path);
 const dirs=[];const walk=dir=>{for(const name of readdirSync(dir)){const p=join(dir,name);if(lstatSync(p).isDirectory()){walk(p);dirs.push(p);}}};walk(folder);for(const dir of dirs)rmdirSync(dir);rmdirSync(folder);
}
