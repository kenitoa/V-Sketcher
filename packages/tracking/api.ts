import type {Calibration,Detection} from './index';
export interface TrackingAPI{
 begin:()=>Promise<{ok:boolean;errorCode?:string}>;
 end:()=>Promise<void>;
 frame:(seq:number,jpeg:Uint8Array)=>Promise<{ok:boolean;result?:Detection;errorCode?:string}>;
 profiles:()=>Promise<{ok:boolean;profiles:Calibration[]}>;
 saveCalibration:(value:Calibration)=>Promise<{ok:boolean;errorCode?:string}>;
}
