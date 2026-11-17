import {mkdir,readFile,writeFile,rename,unlink} from 'node:fs/promises';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
import {assertMicrophoneProfile,type MicrophoneProfile} from '../../packages/input-control';
export class MicrophoneProfiles {
 private chain=Promise.resolve();constructor(private directory:string){}
 async read():Promise<MicrophoneProfile[]>{let text:string;try{text=await readFile(join(this.directory,'microphone.json'),'utf8');}catch(e){if((e as NodeJS.ErrnoException).code==='ENOENT')return [];throw new Error('E_MIC_PROFILE');}try{if(Buffer.byteLength(text)>65536)throw new Error();const v=JSON.parse(text);if(Object.keys(v).sort().join(',')!=='profiles,version'||v.version!==1||!Array.isArray(v.profiles)||v.profiles.length>32||new Set(v.profiles.map((p:MicrophoneProfile)=>p.key)).size!==v.profiles.length)throw new Error();v.profiles.forEach(assertMicrophoneProfile);return v.profiles;}catch{throw new Error('E_MIC_PROFILE');}}
 async save(value:MicrophoneProfile):Promise<void>{assertMicrophoneProfile(value);const action=this.chain.then(async()=>{const profiles=(await this.read()).filter(p=>p.key!==value.key);profiles.push(structuredClone(value));if(profiles.length>32)profiles.shift();await mkdir(this.directory,{recursive:true});const temp=join(this.directory,'microphone-'+randomUUID()+'.tmp');try{await writeFile(temp,JSON.stringify({version:1,profiles})+'\n',{flag:'wx'});await rename(temp,join(this.directory,'microphone.json'));}finally{await unlink(temp).catch(()=>{});}});this.chain=action.catch(()=>{});return action;}
}
