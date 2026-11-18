import {AvatarRenderer} from '../../../packages/avatar-renderer';
import type {RunLease} from '../../../packages/execution';
import type {MotionPlayer} from '../../../packages/motion';
import type {Parameters} from '../../../packages/scene-core';
import {RenderMetrics} from '../../../packages/settings';
import {environmentValue} from './environment-state';
export interface PreparedSurface {id:string;canvas:HTMLCanvasElement;renderer:AvatarRenderer;alive:boolean;cancel:()=>void;painted:boolean|null;}
/** The execution owns this surface, independently of editor/modal mount lifetimes. */
export class RunSurface {
 readonly metrics=new RenderMetrics();private lastPaint=0;
 textureEstimateMiB():number|null{return this.current?.renderer.textureEstimateMiB()??null;}
 readonly element=document.createElement('div');private current:PreparedSurface|null=null;private pending=new Map<string,PreparedSurface>();private created=0;private disposed=0;
 constructor(){this.element.className='run-surface';}
 measure():Record<string,unknown>|null{return this.current&&this.current.painted===false?this.current.renderer.report():null;}
 stats(){return {created:this.created,disposed:this.disposed,live:this.created-this.disposed,pending:this.pending.size,current:this.current?.id??null};}
 async prepare(lease:RunLease,player:MotionPlayer):Promise<PreparedSurface>{
  const canvas=document.createElement('canvas');canvas.width=640;canvas.height=800;canvas.setAttribute('aria-label','실행 캐릭터');canvas.dataset.runCanvas='loading';canvas.dataset.snapshotId=lease.requestId;canvas.dataset.runRevision=String(lease.revision);
  let renderer:AvatarRenderer;try{renderer=new AvatarRenderer(canvas,lease.scene);}catch{canvas.getContext('webgl2')?.getExtension('WEBGL_lose_context')?.loseContext();throw new Error('E_RUN_RENDER');}
  this.created++;let rejectCancel!:(error:Error)=>void;const cancelled=new Promise<never>((_,reject)=>{rejectCancel=reject;});const value:PreparedSurface={id:lease.requestId,canvas,renderer,alive:true,cancel:()=>rejectCancel(new Error('E_RUN_CANCELLED')),painted:null};this.pending.set(value.id,value);
  let timer:ReturnType<typeof setTimeout>|undefined;
  try{await Promise.race([renderer.load(document.baseURI),cancelled,new Promise<never>((_,reject)=>{timer=setTimeout(()=>reject(new Error('E_RUN_RENDER')),15000);})]);if(!value.alive)throw new Error('E_RUN_CANCELLED');
   const neutral=player.frame(performance.now()).parameters;const probes:Parameters[]=[neutral,{eye_left:.5,eye_right:.5,mouth:.5,head_yaw:.5,head_roll:.5},{eye_left:0,eye_right:0,mouth:1,head_yaw:-1,head_roll:-1},{eye_left:1,eye_right:1,mouth:0,head_yaw:1,head_roll:1}];for(const probe of probes){renderer.draw(probe);if(renderer.gl.getError()!==0)throw new Error('E_RUN_RENDER');}renderer.draw(neutral);const report=renderer.report();if(report.glError!==0||Number(report.visiblePixels)<1)throw new Error('E_RUN_RENDER');canvas.dataset.visiblePixels=String(report.visiblePixels);canvas.dataset.runCanvas='ready';return value;
  }catch(e){this.destroy(value);throw e;}finally{if(timer)clearTimeout(timer);}
 }
 commit(value:PreparedSurface,parameters:Parameters,hidden:boolean):void{if(!value.alive)throw new Error('E_RUN_RENDER');this.paint(value,parameters,hidden);const old=this.current;this.current=value;this.pending.delete(value.id);this.element.replaceChildren(value.canvas);if(old&&old!==value)this.destroy(old);}
 retag(lease:RunLease):void{if(this.current){this.current.id=lease.requestId;this.current.canvas.dataset.snapshotId=lease.requestId;this.current.canvas.dataset.runRevision=String(lease.revision);}}
 draw(parameters:Parameters,hidden:boolean):void{const now=performance.now();if(this.current&&(this.current.painted!==hidden||now-this.lastPaint>=1000/environmentValue().previewFps-1)){this.lastPaint=now;const start=performance.now();this.paint(this.current,parameters,hidden);this.metrics.record(now,performance.now()-start);}}
 private paint(value:PreparedSurface,parameters:Parameters,hidden:boolean):void{const {renderer,canvas}=value;const scale=environmentValue().previewScale,width=Math.round(640*scale),height=Math.round(800*scale);if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;}if(hidden){const gl=renderer.gl;gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);}else renderer.draw(parameters);canvas.dataset.hidden=String(hidden);if(value.painted!==hidden){value.painted=hidden;canvas.dataset.visiblePixels=hidden?'0':String(renderer.report().visiblePixels);}}
 discard(id:string):void{const value=this.pending.get(id);if(value){value.cancel();this.destroy(value);}}
 private destroy(value:PreparedSurface):void{if(!value.alive)return;value.alive=false;this.pending.delete(value.id);value.renderer.dispose();value.renderer.gl.getExtension('WEBGL_lose_context')?.loseContext();value.canvas.remove();this.disposed++;}
 clear():void{this.metrics.reset();this.lastPaint=0;for(const value of [...this.pending.values()]){value.cancel();this.destroy(value);}if(this.current)this.destroy(this.current);this.current=null;this.element.replaceChildren();}
}
