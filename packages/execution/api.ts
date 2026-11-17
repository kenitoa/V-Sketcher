import type {RunAction,RunLease,RunMode,RunPreferences,ShortcutStatus} from './index';
export interface RunAPI {
 prepare:(request:{requestId:string;sessionId:string;revision:number;mode:RunMode})=>Promise<{ok:boolean;lease?:RunLease;errorCode?:string}>;
 release:(requestId:string)=>Promise<void>;
 preferences:()=>Promise<{ok:boolean;value:RunPreferences;statuses:ShortcutStatus[]}>;
 configure:(value:RunPreferences)=>Promise<{ok:boolean;errorCode?:string;statuses:ShortcutStatus[]}>;
 active:(requestId:string,active:boolean)=>Promise<ShortcutStatus[]>;
 context:(suspended:boolean,editing?:boolean)=>Promise<ShortcutStatus[]>;
 subscribe:(listener:(event:{requestId:string;action:RunAction})=>void)=>()=>void;
}
