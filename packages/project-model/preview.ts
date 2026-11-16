import { multiply } from '../coordinates';
import { NEUTRAL, type PreviewScene, type Parameters } from '../scene-core';
import type { Project, Asset } from './types';
import { assertProject } from './validation';
import { partWorldTransform, partIsVisible } from './geometry';
/** Explicit adapter for the currently supported planar preview, not the full deformation runtime. */
export function projectToPreview(project: Project, url = (asset: Asset): string => `assets/preview/${asset.fingerprint.sha256}.${asset.mediaType === 'image/png' ? 'png' : 'jpg'}`): PreviewScene {
  assertProject(project);
  if (project.partBindings.some(b => b.kind !== 'state-blend')) throw new Error('E_PREVIEW_TRANSFORM_UNSUPPORTED');
  return { version:1,name:project.displayName,canvas:[project.canvas.width,project.canvas.height],
    model:{ projectId:project.projectId,revision:project.revision,sourceType:project.sourceType,schemaVersion:'1.0' },
    layers:project.parts.filter(part => part.textures.length && partIsVisible(project,part)).sort((a,b) => a.drawOrder-b.drawOrder || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0)).map(part => {
      const binding = project.partBindings.find(b => b.partId === part.id); const parameter = project.parameters.find(p => p.id === binding?.parameterId);
      if (binding && (!parameter?.previewKey || parameter.unit !== 'ratio' || parameter.min !== 0 || parameter.max !== 1)) throw new Error('E_PREVIEW_BINDING_UNSUPPORTED');
      const states: Record<string,string> = {}; const geometry: NonNullable<PreviewScene['layers'][number]['geometry']> = {};
      for (const texture of part.textures) {
        if (binding?.kind === 'state-blend' && texture.state !== binding.mapping.minimumState && texture.state !== binding.mapping.maximumState) continue;
        const asset = project.assets.find(a => a.id === texture.assetId)!;
        if (asset.alphaMode === 'premultiplied') throw new Error('E_PREVIEW_ALPHA_UNSUPPORTED');
        const path = url(asset);
        const state = binding?.kind === 'state-blend' ? texture.state === binding.mapping.minimumState ? 'closed' : texture.state === binding.mapping.maximumState ? 'open' : texture.state : texture.state;
        states[state] = path;
        geometry[path] = { matrix:multiply(partWorldTransform(project,part.id),multiply(texture.assetToLocal,asset.sourceToEdited)),crop:{ ...asset.sourceRegion } };
      }
      return { id:part.id,z:part.drawOrder,origin:[0,0] as [number,number],opacity:part.opacity,bind:parameter?.previewKey ?? null,states,geometry };
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
