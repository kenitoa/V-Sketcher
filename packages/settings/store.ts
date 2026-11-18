import {readFile,mkdir,open,rename,unlink,lstat} from 'node:fs/promises';
import {join,isAbsolute} from 'node:path';
import {randomUUID} from 'node:crypto';
import {defaults,assertSettings,type EnvironmentSettings,type SettingsView} from './index';
async function replace(temporary:string,destination:string):Promise<void>{for(let attempt=0;;attempt++){try{await rename(temporary,destination);return;}catch(error){if(attempt>=4||!['EPERM','EACCES','EBUSY'].includes((error as NodeJS.ErrnoException).code??''))throw error;await new Promise(r=>setTimeout(r,20*(attempt+1)));}}}
export class SettingsStore {
 private value=defaults();private directoryPath:string|null=null;private failed=false;private queue=Promise.resolve();
 constructor(private directory:string){}
 async init():Promise<void>{try{const file=join(this.directory,'environment.json');if((await lstat(file)).isSymbolicLink())throw new Error();const raw=await readFile(file,'utf8');if(Buffer.byteLength(raw)>16384)throw new Error();const data=JSON.parse(raw);if(Object.keys(data).sort().join(',')!=='folder,value')throw new Error();assertSettings(data.value);if(data.folder!==null&&(typeof data.folder!=='string'||!isAbsolute(data.folder)||data.folder.startsWith('\\\\')))throw new Error();this.value=data.value;this.directoryPath=data.folder;}catch(e){if((e as NodeJS.ErrnoException).code!=='ENOENT')this.failed=true;}}
 view():SettingsView{return {value:structuredClone(this.value),loadError:this.failed,defaultFolderSet:this.directoryPath!==null,diagnosticTransmission:false,assetTraining:false,automaticQuality:false};}
 get folder():string|null{return this.directoryPath;}
 private async persist(value:EnvironmentSettings,folder:string|null):Promise<void>{await mkdir(this.directory,{recursive:true});if((await lstat(this.directory)).isSymbolicLink())throw new Error('E_SETTINGS_WRITE');const destination=join(this.directory,'environment.json');try{if((await lstat(destination)).isSymbolicLink())throw new Error('E_SETTINGS_WRITE');}catch(e){if((e as NodeJS.ErrnoException).code!=='ENOENT')throw e;}const temporary=join(this.directory,'environment-'+randomUUID()+'.tmp');try{const fd=await open(temporary,'wx',0o600);try{await fd.writeFile(JSON.stringify({value,folder})+'\n');await fd.sync();}finally{await fd.close();}await replace(temporary,destination);this.value=structuredClone(value);this.directoryPath=folder;this.failed=false;}finally{await unlink(temporary).catch(()=>{});}}
 private serial(action:()=>Promise<void>):Promise<void>{const next=this.queue.then(action);this.queue=next.catch(()=>{});return next;}
 save(value:EnvironmentSettings):Promise<void>{assertSettings(value);const copy=structuredClone(value);return this.serial(()=>this.persist(copy,this.directoryPath));}
 setFolder(folder:string|null):Promise<void>{return this.serial(async()=>{if(folder!==null){if(!isAbsolute(folder)||folder.startsWith('\\\\'))throw new Error('E_SETTINGS_FOLDER');const s=await lstat(folder);if(!s.isDirectory()||s.isSymbolicLink())throw new Error('E_SETTINGS_FOLDER');}await this.persist(this.value,folder);});}
}
