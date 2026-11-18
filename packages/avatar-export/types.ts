import type {InputBasis} from '../execution/changes';
import type {TargetOptions} from '../export-check/types';
import type {PreviewScene,Parameters} from '../scene-core';
import type {ExportReport} from './converter';
export interface AvatarTicket {id:string;basis:InputBasis;sha256:string;bytes:number;report:ExportReport;}
export interface AvatarReceipt {contentFingerprint:string;historyWarning?:'E_AVATAR_HISTORY';id:string;name:string;bytes:number;sha256:string;basis:InputBasis;created:string;targetVersion:string;converterVersion:string;state:'WRITTEN';newerEdits:boolean;confirmation:{method:'USER_CONFIRMED';targetVersion:string;sha256:string;at:string}|null;fileState:'PRESENT'|'MISSING'|'CHANGED';current:boolean;}
export interface AvatarReply {ok:boolean;ticket?:AvatarTicket;receipt?:AvatarReceipt;receipts?:AvatarReceipt[];scene?:PreviewScene;cancelled?:boolean;committed?:boolean;errorCode?:string;}
export interface AvatarAPI {
 prepare:(id:string,checkId:string,options:TargetOptions,demo:boolean)=>Promise<AvatarReply>;
 preview:(id:string,values:Parameters,expressionId:string|null)=>Promise<AvatarReply>;
 save:(id:string,reviewedSha:string)=>Promise<AvatarReply>;
 cancel:(id:string)=>Promise<AvatarReply>;
 list:()=>Promise<AvatarReply>;
 confirm:(id:string,version:string)=>Promise<AvatarReply>;
 relocate:(id:string)=>Promise<AvatarReply>;
 reveal:(id:string)=>Promise<AvatarReply>;
}
