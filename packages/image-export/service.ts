import{basename}from'node:path';
import type{Project}from'../project-model';
import{projectToPreview,previewParameters}from'../project-model/preview';
import{parameters as cleanParameters,type Parameters}from'../scene-core';
import type{InputBasis}from'../execution/changes';
import{assertImageSettings,type ImageTicket,type ImageRequest,type ImageRenderInput}from'./types';
import{imageHash,assertPNG,targetImageHash,writePNG}from'./atomic';
export interface FileInput {basis:InputBasis;project:Project;resources:Map<string,Buffer>;}
export interface ImageHost {capture:(source:'working'|'execution',id:string,revision:number)=>Promise<FileInput>;validate:(basis:InputBasis)=>boolean;running:()=>boolean;render:(input:ImageRenderInput,signal:AbortSignal)=>Promise<Buffer>;choose:(name:string)=>Promise<string|null>;write?:typeof writePNG;}
export class ImageExportService{
 private requestId:string|null=null;private generation=0;private controller:AbortController|null=null;private ticket:ImageTicket|null=null;private bytes:Buffer|null=null;private resources=new Map<string,Buffer>();private writing=false;
 constructor(private host:ImageHost){}
 async prepare(request:ImageRequest):Promise<ImageTicket>{
  if(this.writing)throw new Error('E_IMAGE_BUSY');assertImageSettings(request.settings);if(typeof request.id!=='string'||!/^[a-f0-9-]{36}$/.test(request.id))throw new Error('E_IMAGE_REQUEST');if(!['working','execution'].includes(request.source)||typeof request.projectId!=='string'||!Number.isSafeInteger(request.revision)||request.revision<0)throw new Error('E_IMAGE_REQUEST');if(this.host.running()&&request.settings.width*request.settings.height>2073600)throw new Error('E_IMAGE_DEFER');if(request.settings.pose==='live'&&(request.source!=='execution'||!request.live))throw new Error('E_IMAGE_POSE');
  this.close();this.requestId=request.id;const generation=this.generation,controller=new AbortController();this.controller=controller;
  try{const input=await this.host.capture(request.source,request.projectId,request.revision);if(generation!==this.generation)throw new Error('E_IMAGE_CANCELLED');const id=request.id,assets=new Map<string,Buffer>();let decoded=0;const used=new Set<string>();const scene=projectToPreview(input.project,a=>{const value=input.resources.get(a.id);if(!value)throw new Error('E_IMAGE_RESOURCE');if(!used.has(a.id)){decoded+=a.dimensions.width*a.dimensions.height*4;used.add(a.id);}const path=`assets/image-export/${id}/${a.id}/${a.fingerprint.sha256}.${a.mediaType==='image/png'?'png':'jpg'}`;assets.set(path,value);return path;});if(!scene.layers.length)throw new Error('E_IMAGE_EMPTY');if(decoded>268435456)throw new Error('E_IMAGE_BUDGET');
   const values=new Map(input.project.motion?.settings.pose.map(p=>[p.parameterId,p.value])??[]);if(request.settings.pose==='expression'){const expression=input.project.expressions.find(e=>e.id===request.settings.expressionId);if(!expression)throw new Error('E_IMAGE_POSE');for(const v of expression.values){const p=input.project.parameters.find(p=>p.id===v.parameterId);if(!p||v.value<p.min||v.value>p.max)throw new Error('E_IMAGE_POSE');values.set(v.parameterId,v.value);}}
   let parameters:Parameters=previewParameters(input.project,values);if(request.settings.pose==='live'){if(!request.live||Object.keys(request.live).sort().join(',')!=='eye_left,eye_right,head_roll,head_yaw,mouth')throw new Error('E_IMAGE_POSE');parameters=cleanParameters(request.live);}
   this.resources=assets;const bytes=await this.host.render({scene,settings:structuredClone(request.settings),parameters},controller.signal);assertPNG(bytes,request.settings.width,request.settings.height);if(generation!==this.generation||!this.host.validate(input.basis))throw new Error('E_IMAGE_STALE');this.bytes=bytes;this.ticket={id,basis:input.basis,settings:structuredClone(request.settings),url:`sketcher://app/assets/image-export/${id}/preview.png`,bytes:bytes.length,sha256:imageHash(bytes)};return structuredClone(this.ticket);
  }catch(e){if(generation===this.generation)this.close();throw e;}
 }
 resource(path:string):Buffer|null{return path===`assets/image-export/${this.ticket?.id}/preview.png`?this.bytes:this.resources.get(path)??null;}
 async save(id:string){if(this.writing)throw new Error('E_IMAGE_BUSY');const ticket=this.ticket,bytes=this.bytes;if(!ticket||ticket.id!==id||!bytes||!this.host.validate(ticket.basis))throw new Error('E_IMAGE_STALE');this.writing=true;const generation=this.generation;
  try{const file=await this.host.choose('character.png');if(!file)return null;if(generation!==this.generation||!this.host.validate(ticket.basis))throw new Error('E_IMAGE_STALE');const expected=await targetImageHash(file);await(this.host.write??writePNG)(file,bytes,ticket.settings.width,ticket.settings.height,expected,this.controller?.signal);return {name:basename(file),bytes:bytes.length,sha256:imageHash(bytes),basis:ticket.basis};}finally{this.writing=false;}
 }
 release(id:string):void{if(this.requestId===id)this.close();}
 close():void{++this.generation;this.requestId=null;this.controller?.abort();this.controller=null;this.ticket=null;this.bytes=null;this.resources.clear();}
 stats(){return {tickets:this.ticket?1:0,resources:this.resources.size,writing:this.writing};}
}
