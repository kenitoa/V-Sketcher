import type {Rect} from '../coordinates';
import type {StructureReport,Region} from './types';
export const FEATURE_KEYS=['eye_left','eye_right','mouth'] as const;
export type FeatureKey=typeof FEATURE_KEYS[number];
export interface FeatureCorrection {key:FeatureKey;rect:Rect;masks:{mode:'erase'|'restore';rect:Rect}[];order:number;decision:'confirmed'|'skip'|'blocked';occluded:boolean;protect:boolean;}
export interface CorrectionRecord {version:1;automatic:StructureReport;entries:FeatureCorrection[];invalidated:{keys:FeatureKey[];checks:('preview'|'compatibility'|'export')[]};}
export type CorrectionRequest={kind:'edit';entries:FeatureCorrection[]}|{kind:'reset';keys:FeatureKey[]}|{kind:'reanalyse';keys:FeatureKey[];overwrite:FeatureKey[]};
export function featureKeys(v:unknown):asserts v is FeatureKey[]{if(!Array.isArray(v)||!v.length||v.length>3||new Set(v).size!==v.length||v.some(k=>!FEATURE_KEYS.includes(k as FeatureKey)))throw new Error('E_CORRECTION_KEYS');}
export function assertCorrection(v:unknown,width=4096,height=4096):asserts v is FeatureCorrection{
 const r=v as FeatureCorrection;const rect=(b:Rect)=>!!b&&Object.keys(b).sort().join(',')==='height,width,x,y'&&[b.x,b.y,b.width,b.height].every(Number.isSafeInteger)&&b.x>=0&&b.y>=0&&b.width>=8&&b.height>=5&&b.x+b.width<=width&&b.y+b.height<=height;
 if(!r||Object.keys(r).sort().join(',')!=='decision,key,masks,occluded,order,protect,rect'||!FEATURE_KEYS.includes(r.key)||!rect(r.rect)||!Array.isArray(r.masks)||r.masks.length>32||r.masks.some(m=>!m||Object.keys(m).sort().join(',')!=='mode,rect'||!['erase','restore'].includes(m.mode)||!rect(m.rect))||!Number.isSafeInteger(r.order)||r.order<5||r.order>20||!['confirmed','skip','blocked'].includes(r.decision)||typeof r.occluded!=='boolean'||typeof r.protect!=='boolean')throw new Error('E_CORRECTION_REGION');
}
export function assertRequest(v:unknown):asserts v is CorrectionRequest{
 const r=v as CorrectionRequest;if(!r||typeof r!=='object')throw new Error('E_CORRECTION_REQUEST');
 if(r.kind==='edit'){if(Object.keys(r).sort().join(',')!=='entries,kind'||!Array.isArray(r.entries)||!r.entries.length||r.entries.length>3||new Set(r.entries.map(e=>e.key)).size!==r.entries.length)throw new Error('E_CORRECTION_REQUEST');r.entries.forEach(e=>assertCorrection(e));}
 else if(r.kind==='reset'){if(Object.keys(r).sort().join(',')!=='keys,kind')throw new Error('E_CORRECTION_REQUEST');featureKeys(r.keys);}
 else if(r.kind==='reanalyse'){if(Object.keys(r).sort().join(',')!=='keys,kind,overwrite')throw new Error('E_CORRECTION_REQUEST');featureKeys(r.keys);if(!Array.isArray(r.overwrite)||new Set(r.overwrite).size!==r.overwrite.length||r.overwrite.some(k=>!r.keys.includes(k)))throw new Error('E_CORRECTION_REQUEST');}
 else throw new Error('E_CORRECTION_REQUEST');
}
export function fromRegion(r:Region):FeatureCorrection{return {key:r.key,rect:{...r.rect},masks:structuredClone(r.masks??[]),order:r.order??10,decision:r.enabled===false?'skip':r.observed?'confirmed':'blocked',occluded:!r.observed,protect:true};}
export function withCorrection(region:Region,c:FeatureCorrection):Region{return {...region,rect:{...c.rect},masks:structuredClone(c.masks),order:c.order,observed:c.decision==='confirmed'&&!c.occluded,enabled:c.decision==='confirmed'&&!c.occluded,reason:c.decision==='confirmed'?'USER_CONFIRMED':'USER_LIMITED'};}
