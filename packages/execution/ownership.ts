import {needsCamera,needsMicrophone,type RunMode} from './index';
export type DeviceKind='camera'|'microphone';
/** Main-process permission ownership. Idle/stale editor cleanup cannot revoke a run. */
export class InputOwnership {
 private owners:Record<DeviceKind,string|null>={camera:null,microphone:null};
 constructor(private execution:()=>{ownerId:string;mode:RunMode}|null,private hasProject:()=>boolean){}
 private key(owner:unknown):string|null{return owner===undefined||owner===null?'editor':typeof owner==='string'&&/^[a-f0-9-]{36}$/.test(owner)?owner:null;}
 claim(kind:DeviceKind,owner:unknown):boolean{const key=this.key(owner),run=this.execution();if(!key||!this.hasProject()&&!run||this.owners[kind]!==null&&this.owners[kind]!==key)return false;if(run?(key!==run.ownerId||!(kind==='camera'?needsCamera(run.mode):needsMicrophone(run.mode))):key!=='editor')return false;this.owners[kind]=key;return true;}
 owns(kind:DeviceKind,owner:unknown):boolean{return this.owners[kind]!==null&&this.owners[kind]===this.key(owner);}
 release(kind:DeviceKind,owner:unknown):boolean{if(!this.owns(kind,owner))return false;this.owners[kind]=null;return true;}
}
