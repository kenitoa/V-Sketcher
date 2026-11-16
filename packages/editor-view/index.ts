import { viewport,inverse,transform,multiply,translate,scale,type Point,type Affine } from '../coordinates';
import { NEUTRAL,type Parameters,type PreviewScene,type PreviewLayer } from '../scene-core';
export interface ViewportState { zoom:number; pan:Point; }
export const FIT:ViewportState = { zoom:1,pan:{ x:0,y:0 } };
/** IPC notifications may arrive after a newer invoke response; never roll UI state back. */
export function newestState<T extends { sequence:number }>(current:T | null,incoming:T):T { if (!Number.isSafeInteger(incoming.sequence) || incoming.sequence < 1) throw new Error('E_UI_SEQUENCE'); return current && current.sequence > incoming.sequence ? current : incoming; }
export function viewMatrix(canvas:[number,number],size:Point,state:ViewportState):Affine { return viewport({ x:0,y:0,width:canvas[0],height:canvas[1] },size.x,size.y,state.zoom,state.pan); }
export function zoomAt(state:ViewportState,factor:number,anchor:Point,size:Point):ViewportState {
  if (![factor,anchor.x,anchor.y,size.x,size.y,state.zoom,state.pan.x,state.pan.y].every(Number.isFinite) || factor <= 0 || state.zoom <= 0) throw new Error('E_VIEWPORT_VALUE');
  const zoom = Math.max(.25,Math.min(8,state.zoom*factor)); const ratio = zoom/state.zoom;
  return { zoom,pan:{ x:anchor.x-size.x/2-(anchor.x-size.x/2-state.pan.x)*ratio,y:anchor.y-size.y/2-(anchor.y-size.y/2-state.pan.y)*ratio } };
}
export function activeTextures(layer:PreviewLayer,input:Partial<Parameters> = {}):[string,number][] {
  const values = { ...NEUTRAL,...input };
  if (layer.bind && layer.states.open && layer.states.closed) { const raw = Math.max(0,Math.min(1,values[layer.bind])); if(layer.states.middle){const q=raw<=.5?raw*2:(raw-.5)*2;const t=q*q*(3-2*q);return raw<=.5?[[layer.states.closed,1-t],[layer.states.middle,t]]:[[layer.states.middle,1-t],[layer.states.open,t]];} const t = raw*raw*(3-2*raw); return [[layer.states.closed,1-t],[layer.states.open,t]]; }
  return Object.values(layer.states).slice(0,1).map(path => [path,1]);
}
export function layerCorners(layer:PreviewLayer):Point[] { return Object.values(layer.geometry ?? {}).flatMap(({ matrix,crop }) => [[crop.x,crop.y],[crop.x+crop.width,crop.y],[crop.x+crop.width,crop.y+crop.height],[crop.x,crop.y+crop.height]].map(([x,y]) => transform(matrix,{ x:x!,y:y! }))); }
/** Alpha sampling is supplied by the loaded renderer; transparent patches cannot steal a selection. */
export function hitPart(scene:PreviewScene,point:Point,alpha:(path:string,x:number,y:number)=>number,input:Partial<Parameters> = {}):string | null {
  for (const layer of [...scene.layers].sort((a,b) => b.z-a.z || (a.id < b.id ? 1 : a.id > b.id ? -1 : 0))) {
    if (layer.opacity <= .01) continue;
    for (const [path,weight] of activeTextures(layer,{ ...(scene.defaults ?? NEUTRAL),...input })) { if (weight <= .01) continue; const geometry = layer.geometry?.[path]; if (!geometry) continue;
      const p = transform(inverse(geometry.matrix),point); const c = geometry.crop;
      if (p.x >= c.x && p.y >= c.y && p.x < c.x+c.width && p.y < c.y+c.height && alpha(path,Math.floor(p.x),Math.floor(p.y))*weight*layer.opacity > 8) return layer.id;
    }
  } return null;
}
export function originalScene(canvas:[number,number],dimensions:Point,path:string):PreviewScene {
  const factor = Math.min(canvas[0]/dimensions.x,canvas[1]/dimensions.y);
  return { version:1,name:'원본 그림',canvas,layers:[{ id:'original',z:0,origin:[0,0],opacity:1,bind:null,states:{ original:path },geometry:{ [path]:{ crop:{ x:0,y:0,width:dimensions.x,height:dimensions.y },matrix:multiply(translate((canvas[0]-dimensions.x*factor)/2,(canvas[1]-dimensions.y*factor)/2),scale(factor)) } } }] };
}
