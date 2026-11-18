import {AvatarRenderer} from '../packages/avatar-renderer';
import {NEUTRAL} from '../packages/scene-core';
export async function references(ticket:string,scene:any,expression:string){
 const sourceCanvas=document.createElement('canvas'),targetCanvas=document.createElement('canvas');sourceCanvas.width=480;sourceCanvas.height=600;targetCanvas.width=targetCanvas.height=1024;
 const source=new AvatarRenderer(sourceCanvas,scene);await source.load(document.baseURI);let target:AvatarRenderer|null=null;const result=[];
 const states=[['neutral',{}],['eyes-closed',{eye_left:0,eye_right:0}],['middle',{eye_left:.5,eye_right:.5,mouth:.5}],['mouth-open',{mouth:1}],['head-negative',{head_yaw:-1,head_roll:-1}],['head-positive',{head_yaw:1,head_roll:1}],['expression',{eye_left:0,mouth:1}]] as const;
 try{for(const [label,value]of states){const values={...NEUTRAL,...value};source.draw(values);const native=await window.studio.avatar.preview(ticket,values,label==='expression'?expression:null);if(!native.ok||!native.scene)throw Error('E_LINEAR_REFERENCE');if(!target){target=new AvatarRenderer(targetCanvas,native.scene,'mipmapped');await target.load(document.baseURI);}else await target.setNativeScene(native.scene,document.baseURI);target.draw(NEUTRAL,undefined,.5);result.push({label,original:sourceCanvas.toDataURL('image/png'),converted:targetCanvas.toDataURL('image/png'),target:targetCanvas.toDataURL('image/png')});}}finally{for(const renderer of [source,target]){renderer?.dispose();renderer?.gl.getExtension('WEBGL_lose_context')?.loseContext();}}return result;
}
