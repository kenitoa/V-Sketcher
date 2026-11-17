import type {CharacterPart,MotionMesh,PartBinding,PartGroup} from '../project-model/types';
export interface PartBaseline {part:CharacterPart;partIndex:number;mesh:MotionMesh|null;meshIndex:number;bindings:PartBinding[];}
export interface DetailRecord {version:1;partOrder:string[];meshOrder:string[];baselines:PartBaseline[];groups:PartGroup[];}
export type DetailLocation={kind:'part'|'parameter'|'binding'|'group';id:string}|{kind:'vertex';id:string;index:number};
export type DetailOperation=
 |{kind:'part';partId:string;name:string;role:CharacterPart['role'];side:CharacterPart['side'];parentId:string|null;groupId:string|null;order:number;visible:boolean;opacity:number;x:number;y:number}
 |{kind:'group';id:string|null;name:string;parentId:string|null;visible:boolean;opacity:number}
 |{kind:'mesh';partId:string;pivot:[number,number];curve:'linear'|'smoothstep';yawParameterId:string|null;rollParameterId:string|null}
 |{kind:'vertex';partId:string;index:number;position:[number,number];weight:number;minimum:[number,number];maximum:[number,number]}
 |{kind:'influence';partId:string;center:[number,number];radius:number;strength:number;yawDelta:number}
 |{kind:'binding';partId:string;binding:PartBinding}
 |{kind:'unbind';partId:string;bindingId:string}
 |{kind:'texture';partId:string;state:string;assetId:string}
 |{kind:'delete';partId:string}
 |{kind:'restore-group';id:string}
 |{kind:'restore';partId:string;scope:'all'|'structure'|'mesh'|'bindings'|'textures'};
export interface DetailImpact {kind:DetailOperation['kind'];presentationOnly:boolean;partIds:string[];childIds:string[];parameterIds:string[];expressionIds:string[];inputBindingIds:string[];exportProfileIds:string[];disconnectedParameterIds:string[];checks:string[];warnings:string[];}
const fail=():never=>{throw new Error('E_DETAIL_REQUEST');};
export const validId=(v:unknown):v is string=>typeof v==='string'&&/^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/.test(v);
const ref=(v:unknown)=>v===null||validId(v),finite=(v:unknown,min:number,max:number)=>typeof v==='number'&&Number.isFinite(v)&&v>=min&&v<=max;
const pair=(v:unknown,min=-1e7,max=1e7)=>Array.isArray(v)&&v.length===2&&v.every(n=>finite(n,min,max));
const text=(v:unknown,max=120)=>typeof v==='string'&&v.trim().length>0&&v.length<=max&&!/[\u0000-\u001f\u007f]/.test(v);
const fields=(v:unknown,keys:string[])=>!!v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===keys.length&&Object.keys(v).every(k=>keys.includes(k));
export function assertLocation(value:unknown):asserts value is DetailLocation {const v=value as DetailLocation;if(!v||!['part','parameter','binding','group','vertex'].includes(v.kind)||!fields(v,v.kind==='vertex'?['kind','id','index']:['kind','id'])||!validId(v.id)||v.kind==='vertex'&&(!Number.isSafeInteger(v.index)||v.index<0||v.index>1023))fail();}
export function assertOperation(value:unknown):asserts value is DetailOperation {
 const v=value as DetailOperation;const keys:Record<string,string[]>={part:['partId','name','role','side','parentId','groupId','order','visible','opacity','x','y'],group:['id','name','parentId','visible','opacity'],'restore-group':['id'],mesh:['partId','pivot','curve','yawParameterId','rollParameterId'],vertex:['partId','index','position','weight','minimum','maximum'],influence:['partId','center','radius','strength','yawDelta'],binding:['partId','binding'],unbind:['partId','bindingId'],texture:['partId','state','assetId'],delete:['partId'],restore:['partId','scope']};
 if(!v||!Object.hasOwn(keys,v.kind)||!fields(v,['kind',...keys[v.kind]!])||v.kind!=='group'&&(v.kind==='restore-group'?!validId(v.id):!validId(v.partId)))fail();
 if(v.kind==='part'&&(!text(v.name)||!['base','body','head','hair-front','hair-back','eye','mouth','accessory','custom'].includes(v.role)||!['character-left','character-right','center','none'].includes(v.side)||![v.parentId,v.groupId].every(ref)||!Number.isSafeInteger(v.order)||Math.abs(v.order)>100000||typeof v.visible!=='boolean'||!finite(v.opacity,0,1)||![v.x,v.y].every(n=>finite(n,-8192,8192))))fail();
 if(v.kind==='group'&&(!ref(v.id)||!text(v.name)||!ref(v.parentId)||typeof v.visible!=='boolean'||!finite(v.opacity,0,1)))fail();
 if(v.kind==='mesh'&&(!pair(v.pivot)||!['linear','smoothstep'].includes(v.curve)||![v.yawParameterId,v.rollParameterId].every(ref)))fail();
 if(v.kind==='vertex'&&(!Number.isSafeInteger(v.index)||v.index<0||v.index>1023||!pair(v.position)||!finite(v.weight,0,1)||!pair(v.minimum)||!pair(v.maximum)))fail();
 if(v.kind==='influence'&&(!pair(v.center)||!finite(v.radius,.1,16384)||!finite(v.strength,0,1)||!finite(v.yawDelta,0,184.32)))fail();
 if(v.kind==='unbind'&&!validId(v.bindingId)||v.kind==='texture'&&(!text(v.state,32)||!validId(v.assetId))||v.kind==='restore'&&!['all','structure','mesh','bindings','textures'].includes(v.scope))fail();
 if(v.kind==='binding'){
  const b=v.binding;if(!b||!fields(b,['id','partId','parameterId','kind','mapping'])||![b.id,b.partId,b.parameterId].every(validId)||b.partId!==v.partId)fail();
  if(b.kind==='transform'){if(!fields(b.mapping,['component','outputRange'])||!['rotate-degrees','translate-x','translate-y','scale-x','scale-y'].includes(b.mapping.component)||!pair(b.mapping.outputRange))fail();const limit=b.mapping.component==='rotate-degrees'?6:b.mapping.component.startsWith('scale')?1.2:64,minimum=b.mapping.component.startsWith('scale')?.8:-limit;if(!b.mapping.outputRange.every(n=>finite(n,minimum,limit)))fail();}
  else if(b.kind==='state-blend'){const m=b.mapping;if(!fields(m,m.middleState===undefined?['minimumState','maximumState']:['minimumState','middleState','maximumState'])||![m.minimumState,m.maximumState,...m.middleState?[m.middleState]:[]].every(s=>text(s,32)))fail();}else fail();
 }
}
