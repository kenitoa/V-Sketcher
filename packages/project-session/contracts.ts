import type { Project, SourceType } from '../project-model';
import type { PreviewScene } from '../scene-core';
import type { JobView } from '../workflow';
export interface RecentView { id:string; displayName:string; openedAt:string; sourceType:string; }
export interface RecoveryView { id:string; displayName:string; revision:number; createdAt:string; kind:string; reason:string; originalLabel:string | null; pending:boolean; }
export interface SessionView { sequence:number; sessionId:string | null; mode:'empty' | 'editable' | 'read-only'; project:Project | null; label:string; dirty:boolean; saving:boolean; canUndo:boolean; canRedo:boolean;
  scene:PreviewScene | null; originalScene:PreviewScene | null; jobs:JobView[]; renderKey:string; issues:{ assetId:string; code:string }[]; errorCode:string | null; lastRecoveryAt:string | null; recent:RecentView[]; recoveries:RecoveryView[]; readOnlyName:string | null; }
export type EditTarget = 'project-name' | 'part-name' | 'part-role' | 'part-opacity' | 'part-translate-x' | 'expression-value';
export type SessionCommand = { type:'prepare-motion';expectedRevision:number } | { type:'motion-settings';expectedRevision:number;strength:number;smoothingMs:number;pose:{ parameterId:string;value:number }[] } | { type:'motion-parameter';expectedRevision:number;id:string;min:number;neutral:number;max:number } | { type:'new'; name:string; sourceType:SourceType } | { type:'open' | 'save' | 'save-as' | 'duplicate' | 'close' | 'undo' | 'redo' | 'sample' | 'checkpoint' } |
  { type:'recent' | 'remove-recent' | 'recover' | 'preview-recovery' | 'original' | 'cancel-task' | 'retry-task'; id:string } | { type:'check-resources' } |
  { type:'relink'; assetId:string } | { type:'begin-group'; label:string } | { type:'end-group'; id:string; commit:boolean } |
  { type:'edit'; target:EditTarget; id:string | null; parameterId:string | null; value:string | number; expectedRevision:number; groupId:string | null };
export interface SessionReply { view:SessionView; value?:string; preview?:RecoveryComparison; }
export interface RecoveryComparison { recovered:{ label:string; revision:number; modifiedAt:string; scene:PreviewScene | null }; saved:{ label:string; revision:number; modifiedAt:string; scene:PreviewScene | null } | null; }
export function parseSessionCommand(value:unknown):SessionCommand {
  if (!value || typeof value !== 'object' || Array.isArray(value) || JSON.stringify(value).length > 8192) throw new Error('E_SESSION_COMMAND');
  const v = value as Record<string,unknown>; const type = v.type;
  const fields:Record<string,string[]> = { 'prepare-motion':['type','expectedRevision'],'motion-settings':['type','expectedRevision','strength','smoothingMs','pose'],'motion-parameter':['type','expectedRevision','id','min','neutral','max'], new:['type','name','sourceType'],open:['type'],save:['type'],'save-as':['type'],duplicate:['type'],close:['type'],undo:['type'],redo:['type'],sample:['type'],checkpoint:['type'],
    'check-resources':['type'],'cancel-task':['type','id'],'retry-task':['type','id'],recent:['type','id'],'remove-recent':['type','id'],recover:['type','id'],'preview-recovery':['type','id'],original:['type','id'],relink:['type','assetId'],'begin-group':['type','label'],'end-group':['type','id','commit'],edit:['type','target','id','parameterId','value','expectedRevision','groupId'] };
  if (typeof type !== 'string' || !Object.hasOwn(fields,type) || Object.keys(v).length !== fields[type]!.length || Object.keys(v).some(key => !fields[type]!.includes(key))) throw new Error('E_SESSION_COMMAND');
  if (type === 'new' && (typeof v.name !== 'string' || v.name.length > 120 || !['parts','single-image','split-image'].includes(String(v.sourceType)))) throw new Error('E_SESSION_COMMAND');
  if (['recent','remove-recent','recover','preview-recovery','original','end-group','cancel-task','retry-task'].includes(type) && (typeof v.id !== 'string' || !/^[a-f0-9-]{36}$/.test(v.id))) throw new Error('E_SESSION_COMMAND');
  if (type === 'relink' && (typeof v.assetId !== 'string' || !/^[A-Za-z0-9_-]{1,64}$/.test(v.assetId))) throw new Error('E_SESSION_COMMAND');
  if (type === 'begin-group' && (typeof v.label !== 'string' || !v.label.trim() || v.label.length > 120)) throw new Error('E_SESSION_COMMAND');
  if (type === 'end-group' && typeof v.commit !== 'boolean') throw new Error('E_SESSION_COMMAND');
  if (type === 'edit' && (!['project-name','part-name','part-role','part-opacity','part-translate-x','expression-value'].includes(String(v.target)) ||
    ![v.id,v.parameterId,v.groupId].every(id => id === null || typeof id === 'string' && /^[A-Za-z0-9_-]{1,64}$/.test(id)) || !Number.isSafeInteger(v.expectedRevision) || Number(v.expectedRevision) < 0 ||
    !(typeof v.value === 'string' && v.value.length <= 120 || typeof v.value === 'number' && Number.isFinite(v.value)))) throw new Error('E_SESSION_COMMAND');
  if (['prepare-motion','motion-settings','motion-parameter'].includes(type) && (!Number.isSafeInteger(v.expectedRevision) || Number(v.expectedRevision)<0)) throw new Error('E_SESSION_COMMAND');
  if (type === 'motion-settings' && (!Number.isFinite(v.strength) || Number(v.strength)<0 || Number(v.strength)>1 || !Number.isSafeInteger(v.smoothingMs) || Number(v.smoothingMs)<0 || Number(v.smoothingMs)>1000 || !Array.isArray(v.pose) || v.pose.length>128 || v.pose.some(p => !p || typeof p.parameterId !== 'string' || !/^[A-Za-z0-9_-]{1,64}$/.test(p.parameterId) || !Number.isFinite(p.value) || Object.keys(p).sort().join(',')!=='parameterId,value'))) throw new Error('E_SESSION_COMMAND');
  if (type === 'motion-parameter' && (typeof v.id !== 'string' || !/^[A-Za-z0-9_-]{1,64}$/.test(v.id) || ![v.min,v.neutral,v.max].every(n => typeof n === 'number' && Number.isFinite(n)))) throw new Error('E_SESSION_COMMAND');
  return value as SessionCommand;
}
