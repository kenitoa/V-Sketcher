import { assertProject,type Project,type PreviewKey,type Parameter,type MotionRig } from '../project-model';
import { partWorldTransform,partIsVisible } from '../project-model/geometry';
import { inverse,transform,multiply,type Point } from '../coordinates';
import { NEUTRAL,type Parameters } from '../scene-core';
import {ExpressionController} from '../expression-control';
export const KEYS = Object.keys(NEUTRAL) as PreviewKey[];
export const motionNames:Record<PreviewKey,string> = { eye_left:'왼쪽 눈',eye_right:'오른쪽 눈',mouth:'입 열기',head_yaw:'고개 좌우',head_roll:'고개 기울기' };
export function clampValue(p:Parameter,value:number):number { if (!Number.isFinite(value) || !Number.isFinite(p.max-p.min) || p.max<=p.min) throw new Error('E_PARAMETER_INVALID'); return Math.max(p.min,Math.min(p.max,value)); }
export function normalize(p:Parameter,value:number):number { const v = clampValue(p,value); return p.previewKey?.startsWith('head') ? v<p.neutral ? (v-p.neutral)/(p.neutral-p.min || 1) : (v-p.neutral)/(p.max-p.neutral || 1) : (v-p.min)/(p.max-p.min); }
export function authorRig(project:Project):MotionRig {
  assertProject(project); const w = project.canvas.width; const h = project.canvas.height; const eyes = project.parts.filter(p => p.role==='eye').map(p => { const t = p.textures[0]; if (!t) return null; const a = project.assets.find(a => a.id===t.assetId)!; return transform(multiply(partWorldTransform(project,p.id),multiply(t.assetToLocal,a.sourceToEdited)),{ x:a.sourceRegion.x+a.sourceRegion.width/2,y:a.sourceRegion.y+a.sourceRegion.height/2 }); }).filter((p):p is Point => p!==null); const faceWidth = eyes.length>=2 ? Math.min(w,Math.max(w*.1,Math.abs(eyes[0]!.x-eyes[1]!.x)*2)) : w*.38; const gain = project.structure?.report.headGain ?? (/occlu|\uac00\ub9bc/i.test(project.provenance.limitations.join(' ')) ? .35 : 1);
  const keyId = (key:PreviewKey) => project.parameters.find(p => p.previewKey === key)?.id ?? null;
  const meshes:MotionRig['meshes'] = [];
  for (const part of project.parts.filter(p => p.textures.length)) {
    const points:Point[] = []; for (const t of part.textures) { const a = project.assets.find(a => a.id === t.assetId)!; const m = multiply(t.assetToLocal,a.sourceToEdited); const c = a.sourceRegion; for (const [x,y] of [[c.x,c.y],[c.x+c.width,c.y],[c.x,c.y+c.height],[c.x+c.width,c.y+c.height]]) points.push(transform(m,{ x:x!,y:y! })); }
    const x0 = Math.min(...points.map(p => p.x)); const y0 = Math.min(...points.map(p => p.y)); const x1 = Math.max(...points.map(p => p.x)); const y1 = Math.max(...points.map(p => p.y));
    const world = partWorldTransform(project,part.id); const local = inverse(world); const pivot = transform(local,{ x:w*.5,y:h*.43 }); const rows = [0,.25,.5,.65,.8,1]; const columns = [0,.25,.5,.75,1];
    const vertices = rows.flatMap(y => columns.map(x => { const p = { x:x0+(x1-x0)*x,y:y0+(y1-y0)*y }; const global = transform(world,p); const weight = Math.max(0,Math.min(1,(h*.8-global.y)/(h*.3))); const delta = transform(local,{ x:global.x+faceWidth*.045*weight*gain,y:global.y }); return { position:[p.x,p.y] as [number,number],weight,minimum:[p.x-delta.x,p.y-delta.y] as [number,number],maximum:[delta.x-p.x,delta.y-p.y] as [number,number] }; }));
    const triangles:number[] = []; for (let y=0;y<rows.length-1;y++) for (let x=0;x<columns.length-1;x++) { const a = y*columns.length+x; triangles.push(a,a+1,a+columns.length,a+1,a+columns.length+1,a+columns.length); }
    const ancestry = new Set<string>(); let ancestor:typeof part | undefined = part; while (ancestor) { ancestry.add(ancestor.id); ancestor = project.parts.find(p => p.id===ancestor!.parentId); }
    const bound = (key:PreviewKey) => project.partBindings.some(b => ancestry.has(b.partId) && b.kind === 'transform' && project.parameters.find(p => p.id === b.parameterId)?.previewKey === key);
    meshes.push({ partId:part.id,pivot:[pivot.x,pivot.y],vertices,triangles,yawParameterId:bound('head_yaw') ? null : keyId('head_yaw'),rollParameterId:bound('head_roll') ? null : keyId('head_roll'),curve:'smoothstep' });
  }
  return { version:1,faceWidth,maxRollDegrees:6*gain,meshes,settings:{ strength:1,smoothingMs:120,pose:[] },secondary:'disabled' };
}
export interface Capability { key:PreviewKey; parameter:Parameter | null; supported:boolean; reason:string; limited:boolean; }
export function capabilities(p:Project,available = new Set(p.parts.filter(v => partIsVisible(p,v) && v.textures.length).map(v => v.id))):Capability[] {
  return KEYS.map(key => { const parameter = p.parameters.find(v => v.previewKey === key) ?? null;
    const affects = (id:string):boolean => [...available].some(partId => { let item = p.parts.find(v => v.id===partId); for (let i=0;item && i<64;i++) { if (item.id===id) return true; item = p.parts.find(v => v.id===item!.parentId); } return false; });
    const bound = !!parameter && (p.partBindings.some(b => b.parameterId === parameter.id && affects(b.partId) && (b.kind === 'transform' ? b.mapping.outputRange[0]!==b.mapping.outputRange[1] : b.mapping.minimumState !== b.mapping.maximumState)) || !!p.motion?.meshes.some(m => available.has(m.partId) && (key === 'head_yaw' ? m.yawParameterId === parameter.id&&m.vertices.some(v=>[...v.minimum,...v.maximum].some(n=>Math.abs(n)>1e-8)) : key === 'head_roll' && m.rollParameterId === parameter.id&&p.motion!.maxRollDegrees>0&&m.vertices.some(v=>v.weight>0))));
    const supported = !!parameter && bound; const limited = key.startsWith('head') || key === 'mouth' && p.assets.some(a => a.origin === 'auto-completion' || a.origin === 'generated');
    return { key,parameter,supported,limited,reason:!parameter ? '매개변수가 없어요' : !bound ? '표시 가능한 부위의 연결이 없어요' : key.startsWith('head') ? '제한된 평면 변형 · 옆모습 복원 아님' : limited ? '보완 그림 · 작은 범위에서 먼저 확인해 주세요' : '준비된 부위로 시험 가능' };
  });
}
export interface MotionFrame { parameters:Parameters; values:ReadonlyMap<string,number>; playing:boolean; elapsed:number; clamped:boolean; }
/** Device-free test input. No project mutation, wall clock, timers, secondary dynamics or file writes. */
export class MotionPlayer {
  readonly controls=new ExpressionController(); private testOwned=new Set<string>();
  synthetic:{camera:boolean;microphone:boolean;paused:boolean}={camera:false,microphone:false,paused:false};private signalSerial=0;

  private project:Project | null = null; private supported:Capability[] = []; private goals = new Map<string,number>(); private filtered = new Map<string,number>();
  private previous:number | null = null; private elapsed = 0; private mode:PreviewKey | 'all' | null = null; private repeat = false; private generation = ''; private revision = -1; private last:MotionFrame = { parameters:{ ...NEUTRAL },values:new Map(),playing:false,elapsed:0,clamped:false };
  setProject(p:Project | null,available?:Set<string>,generation?:string):void {
    this.controls.setProject(p,generation??p?.projectId??'');
    if(this.project?.projectId!==p?.projectId||this.generation!==(generation??p?.projectId))this.synthetic={camera:false,microphone:false,paused:false};
    if (!p) { this.project = null; this.supported = []; this.stop(); return; } if (this.project?.projectId !== p.projectId || this.generation !== (generation ?? p.projectId)) { this.generation = generation ?? p.projectId; this.project = p; this.revision = p.revision; this.supported = capabilities(p,available); this.stop(); return; }
    this.project = p; this.supported = capabilities(p,available); if (this.revision !== p.revision) { this.revision = p.revision; this.stop(); }
  }
  snapshot():MotionFrame { return this.last; }
  list():Capability[] { return this.supported; }
  set(key:PreviewKey,value:number):number { const c = this.supported.find(c => c.key === key); if (!c?.supported || !c.parameter) throw new Error('E_MOTION_UNSUPPORTED'); let v = clampValue(c.parameter,value); if (key === 'mouth' && c.limited) v = Math.min(v,c.parameter.min+(c.parameter.max-c.parameter.min)*.65); this.mode = null; this.goals.set(c.parameter.id,v); this.testOwned.add(c.parameter.id); return v; }
  play(key:PreviewKey | 'all',repeat:boolean):void { if (!this.project || key !== 'all' && !this.supported.some(c => c.key === key && c.supported) || key === 'all' && !this.supported.some(c => c.supported)) throw new Error('E_MOTION_UNSUPPORTED'); this.stop(); this.mode = key; this.repeat = repeat; }
  stop():void { this.testOwned.clear(); this.mode = null; this.elapsed = 0; this.previous = null; this.goals.clear(); this.filtered.clear(); if (this.project) for (const p of this.project.parameters) { const value = this.project.motion?.settings.pose.find(v => v.parameterId === p.id)?.value ?? p.neutral; this.goals.set(p.id,value); this.filtered.set(p.id,value); } const parameters = { ...NEUTRAL }; for (const c of this.supported) if (c.supported && c.parameter) parameters[c.key] = normalize(c.parameter,this.filtered.get(c.parameter.id) ?? c.parameter.neutral); const composed=this.controls.frame(0);for(const c of this.supported)if(c.supported&&c.parameter)parameters[c.key]=normalize(c.parameter,composed.values.get(c.parameter.id)??c.parameter.neutral);this.last = { parameters,values:this.project?composed.values:new Map(),playing:false,elapsed:0,clamped:false }; }
  targets():{ parameterId:string;value:number }[] { return [...this.goals].map(([parameterId,value]) => ({ parameterId,value })); }
  frame(now:number):MotionFrame {
    if (!Number.isFinite(now)) throw new Error('E_MOTION_TIME'); const p = this.project; const parameters = { ...NEUTRAL }; if (!p) return { parameters,values:new Map(),playing:false,elapsed:0,clamped:false };
    const rawDt = this.previous === null ? 0 : Math.max(0,(now-this.previous)/1000); const dt = Math.min(.1,rawDt); this.previous = now; this.elapsed += dt; let clamped = rawDt>.1;
    if (this.mode && this.elapsed>=4 && !this.repeat) this.stop();
    const settings = p.motion?.settings ?? { strength:1,smoothingMs:120,pose:[] }; const t = this.elapsed%4; const wave = t<1 ? -t : t<2 ? t-2 : t<3 ? t-2 : 4-t;
    for (const c of this.supported) { const param = c.parameter; if (!param || !c.supported) continue; const baseline = settings.pose.find(v => v.parameterId===param.id)?.value ?? param.neutral; let target = this.goals.get(param.id) ?? baseline;
      if (this.mode === 'all' || this.mode === c.key) { const q = this.mode === 'all' ? c.key.startsWith('eye') ? -(Math.max(0,Math.cos((t+(c.key==='eye_left' ? .15 : 0))*Math.PI))**16) : c.key === 'mouth' ? (1-Math.cos(t*Math.PI))/2 : Math.sin(t*Math.PI/2) : wave; target = q<0 ? baseline+(baseline-param.min)*q : baseline+(param.max-baseline)*q; if (c.key === 'mouth' && c.limited) target = Math.min(target,param.min+(param.max-param.min)*.65); }
      target = baseline+(clampValue(param,target)-baseline)*settings.strength;
      const previous = this.filtered.get(param.id) ?? param.neutral; const value = settings.smoothingMs === 0 ? target : previous+(target-previous)*(1-Math.exp(-dt/(settings.smoothingMs/1000))); this.filtered.set(param.id,value); parameters[c.key] = normalize(param,value);
    }

    const test=new Map<string,number>();for(const c of this.supported)if(c.parameter&&(this.testOwned.has(c.parameter.id)||this.mode==='all'||this.mode===c.key))test.set(c.parameter.id,this.filtered.get(c.parameter.id)??c.parameter.neutral);
    if(!this.synthetic.paused)for(const source of ['camera','microphone'] as const)if(this.synthetic[source]){const values=new Map<string,number>();for(const c of this.supported)if(c.supported&&c.parameter&&(source==='camera'||c.key==='mouth')){const q=c.key.startsWith('eye')?.7:c.key==='mouth'?(source==='camera'?.3:.6):.45*Math.sin(now/700);const p=c.parameter;values.set(p.id,c.key.startsWith('head')?p.neutral+q*(p.max-p.neutral):p.min+q*(p.max-p.min));}this.controls.input(source,values,now,++this.signalSerial);}
    const composed=this.controls.frame(Math.max(0,now),test);for(const c of this.supported)if(c.parameter&&c.supported)parameters[c.key]=normalize(c.parameter,composed.values.get(c.parameter.id)??c.parameter.neutral);
    this.last = { parameters,values:composed.values,playing:this.mode!==null,elapsed:this.elapsed,clamped }; return this.last;
  }
}
