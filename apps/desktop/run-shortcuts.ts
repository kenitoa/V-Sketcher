import {readFile,mkdir,writeFile,rename,unlink} from 'node:fs/promises';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
import {assertRunPreferences,defaultRunPreferences,type RunPreferences,type RunAction,type ShortcutStatus} from '../../packages/execution';
export interface ShortcutBackend {register:(key:string,callback:()=>void)=>boolean;isRegistered:(key:string)=>boolean;unregister:(key:string)=>void;}
export class RunPreferenceStore {
 constructor(private directory:string){}
 async read():Promise<RunPreferences>{try{const raw=await readFile(join(this.directory,'execution.json'),'utf8');if(Buffer.byteLength(raw)>16384)throw new Error();const value=JSON.parse(raw);assertRunPreferences(value);return value;}catch(e){if((e as NodeJS.ErrnoException).code==='ENOENT')return defaultRunPreferences();throw new Error('E_RUN_PREFERENCES');}}
 async save(value:RunPreferences):Promise<void>{assertRunPreferences(value);await mkdir(this.directory,{recursive:true});const file=join(this.directory,'execution-'+randomUUID()+'.tmp');try{await writeFile(file,JSON.stringify(value)+'\n',{flag:'wx'});await rename(file,join(this.directory,'execution.json'));}finally{await unlink(file).catch(()=>{});}}
}
/** Own registrations only. No global hook, key recording, or unregisterAll. */
export class RunShortcuts {
 private value=defaultRunPreferences();private own=new Set<string>();private requestId:string|null=null;private available=new Set<RunAction>();private suspended=false;private editing=false;private nativeModal=false;private statuses:ShortcutStatus[]=[];
 constructor(private backend:ShortcutBackend,private focused:()=>boolean,private dispatch:(requestId:string,action:RunAction)=>void){this.refresh();}
 preferences():RunPreferences{return structuredClone(this.value);}
 status():ShortcutStatus[]{return structuredClone(this.statuses);}
 configure(value:RunPreferences):ShortcutStatus[]{assertRunPreferences(value);this.value=structuredClone(value);return this.refresh();}
 activate(requestId:string|null,available:RunAction[]=[]):ShortcutStatus[]{this.requestId=requestId;this.available=new Set(available);return this.refresh();}
 context(suspended:boolean,editing=false):ShortcutStatus[]{this.suspended=suspended;this.editing=editing;return this.refresh();}
 modal(suspended:boolean):void{this.nativeModal=suspended;this.refresh();}
 refresh():ShortcutStatus[]{this.clear();this.statuses=this.value.bindings.map(binding=>{let state:ShortcutStatus['state'];if(!binding.enabled)state='disabled';else if(!this.requestId||!this.available.has(binding.action))state='inactive';else if(binding.scope==='local')state='local';else if(!this.value.allowGlobal)state='disabled';else if(this.nativeModal||this.editing||this.focused()&&this.suspended)state='suspended';else{const request=this.requestId;let registered=false;try{registered=this.backend.register(binding.accelerator,()=>{if(this.requestId===request&&!this.nativeModal&&!this.editing&&!(this.focused()&&this.suspended))this.dispatch(request,binding.action);});if(registered&&!this.backend.isRegistered(binding.accelerator)){this.backend.unregister(binding.accelerator);registered=false;}}catch{if(registered){try{this.backend.unregister(binding.accelerator);}catch{ /* only the just-registered owned chord */ }}registered=false;}if(registered){this.own.add(binding.accelerator);state='registered';}else state='conflict';}return {action:binding.action,state};});return this.status();}
 clear():void{for(const key of this.own)this.backend.unregister(key);this.own.clear();}
 close():void{this.requestId=null;this.clear();}
}
