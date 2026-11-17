import type {MicrophoneProfile} from './index';
export interface MicrophoneAPI {begin:(owner?:string|null)=>Promise<boolean>;end:(owner?:string|null)=>Promise<void>;profiles:()=>Promise<{ok:boolean;profiles:MicrophoneProfile[]}>;save:(value:MicrophoneProfile)=>Promise<boolean>;}
