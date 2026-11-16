import { multiply,transform } from '../coordinates';
import { NEUTRAL, type PreviewScene, type Parameters } from '../scene-core';
import type { Project, Asset } from './types';
import { assertProject } from './validation';
import { partWorldTransform, partIsVisible } from './geometry';
/** Explicit adapter for the currently supported planar preview, not the full deformation runtime. */
export function projectToPreview(project: Project, url = (asset: Asset): string => `assets/preview/${asset.fingerprint.sha256}.${asset.mediaType === 'image/png' ? 'png' : 'jpg'}${asset.producer.name.startsWith('atelier-luna') ? '?asset='+asset.id : ''}`): PreviewScene {
  assertProject(project);
  return { version:1,name:project.displayName,defaults:previewParameters(project,new Map(project.motion?.settings.pose.map(v => [v.parameterId,v.value]) ?? [])),canvas:[project.canvas.width,project.canvas.height],
    model:{ projectId:project.projectId,revision:project.revision,sourceType:project.sourceType,schemaVersion:`1.${project.schemaVersion.minor}` },
    layers:project.parts.filter(part => part.textures.length && partIsVisible(project,part)).sort((a,b) => a.drawOrder-b.drawOrder || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0)).map(part => {
      const binding = project.partBindings.find(b => b.partId === part.id && b.kind === 'state-blend' && project.parameters.some(p => p.id === b.parameterId && p.previewKey)); const parameter = project.parameters.find(p => p.id === binding?.parameterId);
      if (binding && !parameter?.previewKey) throw new Error('E_PREVIEW_BINDING_UNSUPPORTED');
      const states: Record<string,string> = {}; const geometry: NonNullable<PreviewScene['layers'][number]['geometry']> = {};
      for (const texture of part.textures) {
        if (binding?.kind === 'state-blend' && texture.state !== binding.mapping.minimumState && texture.state !== binding.mapping.maximumState && texture.state !== binding.mapping.middleState) continue;
        const asset = project.assets.find(a => a.id === texture.assetId)!;
        if (asset.alphaMode === 'premultiplied') throw new Error('E_PREVIEW_ALPHA_UNSUPPORTED');
        const path = url(asset);
        const state = binding?.kind === 'state-blend' ? texture.state === binding.mapping.minimumState ? 'closed' : texture.state === binding.mapping.maximumState ? 'open' : texture.state === binding.mapping.middleState ? 'middle' : texture.state : texture.state;
        states[state] = path;
        geometry[path] = { matrix:multiply(partWorldTransform(project,part.id),multiply(texture.assetToLocal,asset.sourceToEdited)),crop:{ ...asset.sourceRegion } };
      }
      const mesh = project.motion?.meshes.find(m => m.partId === part.id); const world = partWorldTransform(project,part.id); const zero = transform(world,{ x:0,y:0 }); const vector = (v:[number,number]):[number,number] => { const p = transform(world,{ x:v[0],y:v[1] }); return [p.x-zero.x,p.y-zero.y]; }; const pivot = mesh ? transform(world,{ x:mesh.pivot[0],y:mesh.pivot[1] }) : { x:project.canvas.width/2,y:project.canvas.height/2 };
      const ancestry:string[] = []; let owner:typeof part | undefined = part; while (owner) { ancestry.push(owner.id); owner = project.parts.find(p => p.id===owner!.parentId); }
      const transforms = ancestry.flatMap(id => project.partBindings.filter(b => b.partId===id && b.kind==='transform').flatMap(b => { const key = project.parameters.find(p => p.id===b.parameterId)?.previewKey; const ownMesh = project.motion?.meshes.find(m => m.partId===id); return b.kind==='transform' && key ? [{ key,component:b.mapping.component,range:b.mapping.outputRange,pivot:ownMesh?.pivot ?? [project.canvas.width/2,project.canvas.height/2] as [number,number],basis:partWorldTransform(project,id) }] : []; }));
      return { ...(project.structure&&part.textures.length===2&&part.textures.every(t=>project.assets.find(a=>a.id===t.assetId)?.producer.name==='single-image-structure')?{stateBlend:'interpolate' as const}:{}),id:part.id,z:part.drawOrder,origin:[0,0] as [number,number],opacity:part.opacity,...(part.color?{color:part.color}:{}),bind:parameter?.previewKey ?? null,states,geometry,transforms,
        ...(mesh ? { mesh:{ pivot:[pivot.x,pivot.y] as [number,number],vertices:mesh.vertices.map(v => { const p = transform(world,{ x:v.position[0],y:v.position[1] }); return { position:[p.x,p.y] as [number,number],weight:v.weight,minimum:vector(v.minimum),maximum:vector(v.maximum) }; }),triangles:mesh.triangles,yaw:mesh.yawParameterId!==null,roll:mesh.rollParameterId!==null,maxRollDegrees:project.motion!.maxRollDegrees,curve:mesh.curve } } : {}) };
    }) };
}
export function previewParameters(project: Project, values: ReadonlyMap<string,number>): Parameters {
  assertProject(project); const result = { ...NEUTRAL };
  for (const parameter of project.parameters) {
    if (!parameter.previewKey) continue;
    const value = values.get(parameter.id) ?? parameter.neutral; if (!Number.isFinite(value)) throw new Error('E_PARAMETER_INVALID');
    const clamped = Math.max(parameter.min,Math.min(parameter.max,value));
    result[parameter.previewKey] = parameter.previewKey.startsWith('head') ? clamped < parameter.neutral ? (clamped-parameter.neutral)/(parameter.neutral-parameter.min || 1) : (clamped-parameter.neutral)/(parameter.max-parameter.neutral || 1) : (clamped-parameter.min)/(parameter.max-parameter.min);
  }
  return result;
}
