import{randomUUID}from'node:crypto';
import type{FileInput}from'../image-export/service';
import type{InputBasis}from'../execution/changes';
import{projectToPreview}from'../project-model/preview';
import{inspectCompatibility}from'./index';
import{CHECKER_VERSION,CONVERTER_VERSION,TARGET_ID,type TargetOptions,type CheckResult}from'./types';
export class CompatibilityService{
 private input:FileInput|null=null;
 private result:CheckResult|null=null;private resources=new Map<string,Buffer>();private generation=0;
 constructor(private capture:(source:'working'|'execution',id:string,revision:number)=>Promise<FileInput>,private validate:(basis:InputBasis)=>boolean){}
 async inspect(source:'working'|'execution',id:string,revision:number,options:TargetOptions):Promise<CheckResult>{this.close();const generation=this.generation,input=await this.capture(source,id,revision);if(generation!==this.generation)throw new Error('E_EXPORT_STALE');const token=randomUUID(),assets=new Map<string,Buffer>();let scene:CheckResult['scene']=null;
  try{scene=projectToPreview(input.project,a=>{const path=`assets/check-export/${token}/${a.id}/${a.fingerprint.sha256}.${a.mediaType==='image/png'?'png':'jpg'}`;const b=input.resources.get(a.id);if(b)assets.set(path,b);return path;});}catch{/* structural report below owns the blocking reason */}
  const result=inspectCompatibility(input.project,input.basis,options,new Set(input.resources.keys()),scene);result.id=token;if(!this.validate(result.basis))throw new Error('E_EXPORT_STALE');this.resources=assets;this.result=result;this.input={basis:structuredClone(input.basis),project:structuredClone(input.project),resources:new Map([...input.resources].map(([id,b])=>[id,Buffer.from(b)]))};return structuredClone(result);
 }
 verify(id:string,options?:TargetOptions):CheckResult{const r=this.result;if(!r||r.id!==id||r.checkerVersion!==CHECKER_VERSION||r.converterVersion!==CONVERTER_VERSION||r.targetId!==TARGET_ID||options&&JSON.stringify(options)!==JSON.stringify(r.settings)||!this.validate(r.basis))throw new Error('E_EXPORT_STALE');return structuredClone(r);}
 acknowledge(id:string,signature:string,warningScope:string,options?:TargetOptions):CheckResult{const r=this.verify(id,options);if(r.status==='BLOCKED'||r.signature!==signature||r.warningScope!==warningScope)throw new Error('E_EXPORT_ACK');this.result!.acknowledged=true;return structuredClone(this.result!);}
 resource(path:string):Buffer|null{return this.resources.get(path)??null;}
 release(id:string):void{if(this.result?.id===id)this.close();}
 pin(id:string,options:TargetOptions):{input:FileInput;check:CheckResult}{const check=this.verify(id,options);if(!this.input||check.status==='BLOCKED'||check.status==='WARNING'&&!check.acknowledged)throw new Error('E_AVATAR_CHECK');return {input:{basis:structuredClone(this.input.basis),project:structuredClone(this.input.project),resources:new Map([...this.input.resources].map(([id,b])=>[id,Buffer.from(b)]))},check};}
 close():void{++this.generation;this.result=null;this.input=null;this.resources.clear();}
}
