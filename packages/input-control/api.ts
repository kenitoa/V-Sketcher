import type {MicrophoneProfile} from './index';
export interface MicrophoneAPI {begin:()=>Promise<boolean>;end:()=>Promise<void>;profiles:()=>Promise<{ok:boolean;profiles:MicrophoneProfile[]}>;save:(value:MicrophoneProfile)=>Promise<boolean>;}
