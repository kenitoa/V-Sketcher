import type {CharacterPart} from '../project-model/types';
import type {Rect} from '../coordinates';
export const ROLES=['base','body','head','hair-front','hair-back','eye','mouth','accessory','custom'] as const;
export const SIDES=['character-left','character-right','center','none'] as const;
export const STATES=['default','open','closed','middle'] as const;
export interface ProbeImage {key:string;width:number;height:number;bounds:Rect|null;empty:boolean;opaque:boolean;iccConverted:boolean;}
export interface SplitProcessor {probe(sources:ReadonlyMap<string,Buffer>,signal:AbortSignal):Promise<{images:ProbeImage[];files:Map<string,Buffer>}>;}
export interface LayerConfig {id:string;name:string;origin:[number,number];z:number;role:CharacterPart['role'];side:CharacterPart['side'];visible:boolean;opacity:number;parentId:string|null;groupId:string|null;usage:'primary'|'auxiliary'|'alternative';variantOf:string|null;state:typeof STATES[number];positionConfirmed:boolean;roleConfirmed:boolean;}
export interface SplitGroup {id:string;name:string;parentGroupId:string|null;visible:boolean;opacity:number;}
export interface SplitLayer extends LayerConfig {sourceId:string;sourceName:string;sourcePath:string;sourceZ:number|null;sourceOrigin:[number,number]|null;originalAssetId:string;imageAssetId:string;sourceHash:string;imageHash:string;image:ProbeImage;proposal:{role:CharacterPart['role'];side:CharacterPart['side'];confidence:number;reasons:string[]};}
export interface SplitConfig {canvas:{width:number;height:number};layout:'manifest'|'common'|'cropped';layoutConfirmed:boolean;limitedAccepted:boolean;omittedAccepted:boolean;layers:LayerConfig[];groups:SplitGroup[];}
export interface SplitDraft extends Omit<SplitConfig,'layers'> {id:string;sourceKind:'folder'|'2dparts';sourceHash:string|null;sourceManifest:string|null;missingProperties:string[];omitted:string[];layers:SplitLayer[];}
export interface SplitRecord {version:1;draft:SplitDraft;rigSignature:string;}
export interface SplitIssue {code:string;level:'block'|'warning';layerId:string|null;}
const error=():never=>{throw new Error('E_SPLIT_CONFIG');};
export const isId=(v:unknown):v is string=>typeof v==='string'&&/^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/.test(v);
const fields=(v:unknown,names:string[]):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===names.length&&Object.keys(v).every(k=>names.includes(k));
const text=(v:unknown,max=120)=>typeof v==='string'&&v.length>0&&v.length<=max&&!/[\u0000-\u001f\u007f]/.test(v);
const finite=(v:unknown,min:number,max:number)=>typeof v==='number'&&Number.isFinite(v)&&v>=min&&v<=max;
export function assertConfig(value:unknown):asserts value is SplitConfig {
 const c=value as SplitConfig;
 if(!fields(c,['canvas','layout','layoutConfirmed','limitedAccepted','omittedAccepted','layers','groups'])||!fields(c.canvas,['width','height'])||![c.canvas.width,c.canvas.height].every(n=>Number.isInteger(n)&&n>=256&&n<=4096)||!['manifest','common','cropped'].includes(c.layout)||![c.layoutConfirmed,c.limitedAccepted,c.omittedAccepted].every(v=>typeof v==='boolean')||!Array.isArray(c.layers)||c.layers.length<1||c.layers.length>64||!Array.isArray(c.groups)||c.groups.length>128)error();
 const names=['id','name','origin','z','role','side','visible','opacity','parentId','groupId','usage','variantOf','state','positionConfirmed','roleConfirmed'];
 for(const l of c.layers)if(!fields(l,names)||!isId(l.id)||!text(l.name)||!Array.isArray(l.origin)||l.origin.length!==2||!l.origin.every(n=>finite(n,-8192,8192))||!Number.isInteger(l.z)||!finite(l.z,-100000,100000)||!ROLES.includes(l.role)||!SIDES.includes(l.side)||![l.visible,l.positionConfirmed,l.roleConfirmed].every(v=>typeof v==='boolean')||!finite(l.opacity,0,1)||![l.parentId,l.groupId,l.variantOf].every(v=>v===null||isId(v))||!['primary','auxiliary','alternative'].includes(l.usage)||!STATES.includes(l.state))error();
 for(const g of c.groups)if(!fields(g,['id','name','parentGroupId','visible','opacity'])||!isId(g.id)||!text(g.name)||!(g.parentGroupId===null||isId(g.parentGroupId))||typeof g.visible!=='boolean'||!finite(g.opacity,0,1))error();
 if(new Set(c.layers.map(l=>l.id)).size!==c.layers.length||new Set(c.groups.map(g=>g.id)).size!==c.groups.length)error();
}
export function configuration(d:SplitDraft):SplitConfig {return {canvas:{...d.canvas},layout:d.layout,layoutConfirmed:d.layoutConfirmed,limitedAccepted:d.limitedAccepted,omittedAccepted:d.omittedAccepted,layers:d.layers.map(l=>({id:l.id,name:l.name,origin:[...l.origin],z:l.z,role:l.role,side:l.side,visible:l.visible,opacity:l.opacity,parentId:l.parentId,groupId:l.groupId,usage:l.usage,variantOf:l.variantOf,state:l.state,positionConfirmed:l.positionConfirmed,roleConfirmed:l.roleConfirmed})),groups:structuredClone(d.groups)};}
export function configured(d:SplitDraft,c:SplitConfig):SplitDraft {
 assertConfig(c);if(c.layers.length!==d.layers.length||c.groups.length!==d.groups.length||c.layers.some(l=>!d.layers.some(a=>a.id===l.id))||c.groups.some(g=>!d.groups.some(a=>a.id===g.id)))error();
 return {...structuredClone(d),...structuredClone(c),layers:d.layers.map(l=>({...l,...structuredClone(c.layers.find(v=>v.id===l.id)!)}))};
}
export function configKey(c:SplitConfig):string {assertConfig(c);return JSON.stringify({...c,layers:c.layers.map(l=>[l.id,l.name,l.origin,l.z,l.role,l.side,l.visible,l.opacity,l.parentId,l.groupId,l.usage,l.variantOf,l.state,l.positionConfirmed,l.roleConfirmed]),groups:c.groups.map(g=>[g.id,g.name,g.parentGroupId,g.visible,g.opacity])});}
export function effective(d:SplitDraft,l:SplitLayer):{visible:boolean;opacity:number}{
 let visible=l.visible,opacity=l.opacity;let id=l.groupId;const seen=new Set<string>();
 while(id){const g=d.groups.find(v=>v.id===id);if(!g||seen.has(id))return {visible:false,opacity:0};seen.add(id);visible&&=g.visible;opacity*=g.opacity;id=g.parentGroupId;}
 id=l.parentId;seen.clear();while(id){const p=d.layers.find(v=>v.id===id);if(!p||seen.has(id))return {visible:false,opacity:0};seen.add(id);visible&&=p.visible;id=p.parentId;}
 const b=l.image.bounds;return {visible:visible&&!l.image.empty&&!!b&&l.origin[0]+b.x<d.canvas.width&&l.origin[1]+b.y<d.canvas.height&&l.origin[0]+b.x+b.width>0&&l.origin[1]+b.y+b.height>0,opacity};
}
export function issues(d:SplitDraft):SplitIssue[]{
 const result:SplitIssue[]=[];const add=(code:string,layerId:string|null=null,level:'block'|'warning'='block')=>result.push({code,layerId,level});
 if(!d.layoutConfirmed)add('LAYOUT_UNCONFIRMED');if(d.omitted.length&&!d.omittedAccepted)add('OMITTED_UNCONFIRMED');
 const chain=(start:string,map:Map<string,string|null>,code:string)=>{const seen=new Set<string>();let id:string|null=start;while(id){if(seen.has(id)){add(code,start);return;}seen.add(id);if(!map.has(id)){add('REFERENCE_MISSING',start);return;}id=map.get(id)!;}};
 const parents=new Map(d.layers.map(l=>[l.id,l.parentId]));for(const l of d.layers)chain(l.id,parents,'PARENT_CYCLE');const groups=new Map(d.groups.map(g=>[g.id,g.parentGroupId]));for(const g of d.groups)chain(g.id,groups,'GROUP_CYCLE');
 if(d.layout==='common'&&d.layers.some(l=>l.image.width!==d.canvas.width||l.image.height!==d.canvas.height))add('COMMON_SIZE_MISMATCH');
 for(const l of d.layers){if(!l.positionConfirmed)add('POSITION_UNCONFIRMED',l.id);if(!l.roleConfirmed&&!l.image.empty)add('ROLE_UNCONFIRMED',l.id);if(l.groupId&&!groups.has(l.groupId))add('REFERENCE_MISSING',l.id);
  if(l.image.empty)add('EMPTY_LAYER',l.id,'warning');if(!l.visible)add('HIDDEN_LAYER',l.id,'warning');if(l.role==='custom'&&!l.image.empty)add('UNASSIGNED_DECORATION',l.id,'warning');if(l.image.opaque)add('OPAQUE_LAYER',l.id,'warning');if(l.image.iccConverted)add('ICC_CONVERTED',l.id,'warning');const b=l.image.bounds;if(b&&(l.origin[0]+b.x<0||l.origin[1]+b.y<0||l.origin[0]+b.x+b.width>d.canvas.width||l.origin[1]+b.y+b.height>d.canvas.height))add('OUTSIDE_CANVAS',l.id,'warning');if(['eye','mouth'].includes(l.role)&&l.usage==='primary'&&d.layers.some(h=>h.role==='head'&&h.usage==='primary'&&h.z>=l.z))add('FEATURE_BEHIND_HEAD',l.id,'warning');
  if(l.usage==='alternative'){const target=d.layers.find(v=>v.id===l.variantOf);if(!target||target.usage!=='primary'||!['eye','mouth'].includes(target.role)||target.role!==l.role||target.side!==l.side||!['open','closed','middle'].includes(l.state)||l.visible)add('ALTERNATIVE_INVALID',l.id);}
 }
 const active=d.layers.filter(l=>l.usage==='primary'&&effective(d,l).visible&&effective(d,l).opacity>0);
 if(!d.layers.some(l=>effective(d,l).visible&&effective(d,l).opacity>0&&l.usage!=='alternative'))add('NO_VISIBLE_LAYER');
 for(const [role,side] of [['eye','character-left'],['eye','character-right'],['mouth',null],['head',null]] as const){const matches=active.filter(l=>l.role===role&&(side===null||l.side===side));if(matches.length>1)add('ROLE_DUPLICATE',matches[1]!.id);if(!matches.length)add(role==='head'?'WHOLE_ART_HEAD':'ROLE_MISSING',null,'warning');}
 for(const l of active.filter(l=>['eye','mouth'].includes(l.role))){const states=[l.state==='default'?(l.role==='eye'?'open':'closed'):l.state,...d.layers.filter(a=>a.usage==='alternative'&&a.variantOf===l.id).map(a=>a.state)];if(new Set(states).size!==states.length)add('STATE_DUPLICATE',l.id);if(!states.includes('open')||!states.includes('closed')||l.role==='eye'&&!['character-left','character-right'].includes(l.side))add('EXPRESSION_LIMITED',l.id,'warning');}
 const limited=result.some(v=>v.level==='warning'&&['ROLE_MISSING','WHOLE_ART_HEAD','EXPRESSION_LIMITED'].includes(v.code));if(limited&&!d.limitedAccepted)add('LIMITS_UNCONFIRMED');
 return result;
}
