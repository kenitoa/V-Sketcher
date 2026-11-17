import type {Project} from '../project-model';
import type {RunMode} from './index';
export type ChangeKind='none'|'immediate'|'manual'|'restart';
export interface RunChange {kind:ChangeKind;reason:'unchanged'|'controls'|'appearance'|'structure'|'project';}
const json=(v:unknown)=>JSON.stringify(v);
function normalized(p:Project):Record<string,unknown>{const v=structuredClone(p) as unknown as Record<string,unknown>;for(const k of ['revision','savedRevision','modifiedAt','createdAt'])delete v[k];return v;}
function structure(p:Project):unknown{return {projectId:p.projectId,sourceType:p.sourceType,canvas:p.canvas,inputAssetIds:p.inputAssetIds,parameters:p.parameters,partBindings:p.partBindings,parts:p.parts.map(v=>({id:v.id,parentId:v.parentId,role:v.role})),groups:p.groups};}
/** Default unknown/visual changes to manual. Only the enumerated control fields auto-apply. */
export function classifyChange(active:Project,working:Project):RunChange{
 if(active.projectId!==working.projectId)return {kind:'restart',reason:'project'};
 if(json(structure(active))!==json(structure(working)))return {kind:'restart',reason:'structure'};
 const a=normalized(active),b=normalized(working);if(json(a)===json(b))return {kind:active.revision===working.revision?'none':'immediate',reason:active.revision===working.revision?'unchanged':'controls'};
 const strip=(p:Record<string,unknown>)=>{for(const k of ['expressions','expressionSettings','tracking','displayName'])delete p[k];const m=p.motion as {settings?:Record<string,unknown>}|undefined;if(m?.settings){delete m.settings.strength;delete m.settings.smoothingMs;}return p;};
 return json(strip(a))===json(strip(b))?{kind:'immediate',reason:'controls'}:{kind:'manual',reason:'appearance'};
}
export const TRANSITIONS=['new','open','recent','close','duplicate','recover','original'] as const;
const HEAVY=new Set(['sample','parts-start','import-image','input-retry','input-apply','prepare-motion','structure-start','structure-retry','correction-start','correction-retry','split-load','split-prepare','split-retry','split-export','detail-import','retry-task']);
export const RUN_FILE_BUDGET=64*1024*1024;
export function concurrentCommand(type:string):'transition'|'defer'|'allow'{return (TRANSITIONS as readonly string[]).includes(type)?'transition':HEAVY.has(type)?'defer':'allow';}
export interface InputBasis {source:'working'|'execution';projectId:string;revision:number;fingerprint:string;}
export interface ExecutionView {ownerId:string;requestId:string;sessionId:string;projectId:string;name:string;revision:number;mode:RunMode;pending:RunChange|null;preparing:boolean;publishing:boolean;}
export interface ChangeRequest {ownerId:string;baseId:string;requestId:string;sessionId:string;revision:number;}
export function assertChangeRequest(v:unknown):asserts v is ChangeRequest{const r=v as ChangeRequest;if(!r||Object.keys(r).sort().join(',')!=='baseId,ownerId,requestId,revision,sessionId'||![r.ownerId,r.baseId,r.requestId,r.sessionId].every(id=>typeof id==='string'&&/^[a-f0-9-]{36}$/.test(id))||!Number.isSafeInteger(r.revision)||r.revision<0||r.requestId===r.baseId)throw new Error('E_RUN_REQUEST');}
