import {validateProject,type Project} from '../project-model';
import {partIsVisible} from '../project-model/geometry';
import {capabilities} from '../motion';
import {referenceIssue} from '../expression-control';
import type {PreviewScene} from '../scene-core';
export const RUN_MODES=['manual','automatic','camera','microphone','camera-microphone'] as const;
export type RunMode=typeof RUN_MODES[number];
export type FixTarget='parts'|'resources'|'motion'|'expressions'|'camera'|'microphone'|'tasks';
export interface RunIssue {code:string;severity:'block'|'warning';target:FixTarget;id:string|null;}
export interface Readiness {projectId:string|null;revision:number|null;mode:RunMode;issues:RunIssue[];canStart:boolean;canStartLimited:boolean;}
export interface RunLease {requestId:string;sessionId:string;revision:number;fingerprint:string;mode:RunMode;project:Project;scene:PreviewScene;issues:RunIssue[];}
export const needsCamera=(mode:RunMode):boolean=>mode==='camera'||mode==='camera-microphone';
export const needsMicrophone=(mode:RunMode):boolean=>mode==='microphone'||mode==='camera-microphone';
export function checkReadiness(project:Project|null,mode:RunMode,available:ReadonlySet<string>,devices:{camera:boolean|null;microphone:boolean|null}={camera:null,microphone:null},busy=false):Readiness {
 if(!RUN_MODES.includes(mode))throw new Error('E_RUN_MODE');const issues:RunIssue[]=[];const add=(code:string,severity:RunIssue['severity'],target:FixTarget,id:string|null=null)=>issues.push({code,severity,target,id});
 if(!project)add('E_RUN_PROJECT','block','parts');else if(validateProject(project).length)add('E_RUN_MODEL','block','motion');else {
  const visible=project.parts.filter(p=>partIsVisible(project,p)&&p.textures.length);if(!visible.length)add('E_RUN_ARTWORK','block','parts');
  const used=new Set(project.parts.flatMap(p=>p.textures.map(t=>t.assetId)));for(const id of used)if(!available.has(id))add('E_RUN_RESOURCE','block','resources',id);
  for(const a of project.assets)if(!used.has(a.id)&&!available.has(a.id))add('E_RUN_UNUSED_RESOURCE','warning','resources',a.id);
  const caps=capabilities(project);if(mode!=='manual'&&!caps.some(c=>c.supported))add('E_RUN_STATIC_ONLY','warning','motion');
  if(mode==='automatic'&&!caps.some(c=>c.supported&&c.key.startsWith('eye')))add('E_RUN_NO_BLINK','warning','motion');
  for(const e of project.expressions)if(e.values.some(v=>referenceIssue(project,v)))add('E_RUN_EXPRESSION','warning','expressions',e.id);
  if(project.assets.some(a=>a.origin==='auto-completion'||a.origin==='generated'))add('E_RUN_ART_LIMIT','warning','motion');
 }
 if(busy)add('E_RUN_BUSY','block','tasks');
 if(needsCamera(mode)&&devices.camera===false)add('E_RUN_CAMERA','block','camera');
 if(needsMicrophone(mode)&&devices.microphone===false)add('E_RUN_MICROPHONE','block','microphone');
 const structural=issues.some(i=>i.severity==='block'&&!['E_RUN_CAMERA','E_RUN_MICROPHONE'].includes(i.code));return {projectId:project?.projectId??null,revision:project?.revision??null,mode,issues,canStart:!issues.some(i=>i.severity==='block'),canStartLimited:!structural};
}
export function freezeSnapshot<T>(value:T):T {if(value&&typeof value==='object'){for(const child of Object.values(value))freezeSnapshot(child);Object.freeze(value);}return value;}
export const RUN_ACTIONS=['neutral','release','hide','recalibrate','expression-1','expression-2','expression-3','stop'] as const;
export type RunAction=typeof RUN_ACTIONS[number];
export interface ShortcutBinding {action:RunAction;enabled:boolean;scope:'local'|'global';accelerator:string;}
export interface RunPreferences {version:1;mode:RunMode;allowGlobal:boolean;bindings:ShortcutBinding[];}
const keys=['F8','F10','F9','F7','1','2','3','F6'];
export const defaultRunPreferences=():RunPreferences=>({version:1,mode:'manual',allowGlobal:false,bindings:RUN_ACTIONS.map((action,i)=>({action,enabled:true,scope:'local',accelerator:'Control+Alt+Shift+'+keys[i]}))});
export function validAccelerator(v:unknown):v is string {return typeof v==='string'&&/^Control\+Alt\+Shift\+(?:[0-9]|F[1-9]|F10|F11)$/.test(v);}
export function assertRunPreferences(v:unknown):asserts v is RunPreferences {const p=v as RunPreferences;if(!p||Object.keys(p).sort().join(',')!=='allowGlobal,bindings,mode,version'||p.version!==1||!RUN_MODES.includes(p.mode)||typeof p.allowGlobal!=='boolean'||!Array.isArray(p.bindings)||p.bindings.length!==RUN_ACTIONS.length||p.bindings.some(b=>!b||typeof b!=='object')||new Set(p.bindings.map(b=>b.action)).size!==RUN_ACTIONS.length||p.bindings.some(b=>!b||Object.keys(b).sort().join(',')!=='accelerator,action,enabled,scope'||!RUN_ACTIONS.includes(b.action)||typeof b.enabled!=='boolean'||!['local','global'].includes(b.scope)||!validAccelerator(b.accelerator)))throw new Error('E_RUN_SHORTCUT_RESERVED');const active=p.bindings.filter(b=>b.enabled);if(new Set(active.map(b=>b.accelerator)).size!==active.length)throw new Error('E_RUN_SHORTCUT_DUPLICATE');}
export function eventAccelerator(e:{ctrlKey:boolean;altKey:boolean;shiftKey:boolean;metaKey:boolean;code:string}):string|null {if(!e.ctrlKey||!e.altKey||!e.shiftKey||e.metaKey)return null;const key=/^Digit[0-9]$/.test(e.code)?e.code.slice(5):e.code;const chord='Control+Alt+Shift+'+key;return validAccelerator(chord)?chord:null;}
export interface ShortcutStatus {action:RunAction;state:'local'|'disabled'|'inactive'|'suspended'|'registered'|'conflict';}

export function availableRunActions(p:Project,mode:RunMode):RunAction[]{return RUN_ACTIONS.filter(action=>action==='recalibrate'?needsCamera(mode):action.startsWith('expression-')?!!p.expressionSettings?.shortcuts[Number(action.slice(-1))-1]&&p.expressions.some(e=>e.id===p.expressionSettings!.shortcuts[Number(action.slice(-1))-1]&&e.values.some(v=>!referenceIssue(p,v))):true);}
