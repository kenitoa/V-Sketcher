import { CoordinateMap, IDENTITY, multiply, fitRect, viewport, type Affine, type Point } from '../coordinates';
import { assertProject } from './validation';
import type { Project, CharacterPart, BroadcastProfile } from './types';
function world(project: Project, part: CharacterPart): Affine {
  return part.parentId ? multiply(world(project,project.parts.find(p => p.id === part.parentId)!),part.localTransform) : part.localTransform;
}
export function partWorldTransform(project: Project, partId: string): Affine {
  assertProject(project); const part = project.parts.find(p => p.id === partId); if (!part) throw new Error('E_REFERENCE_MISSING'); return [...world(project,part)];
}
export function coordinatesFor(project: Project, partId: string, state: string,
  view: { width:number; height:number; zoom:number; pan:Point; mirror:boolean }, output: BroadcastProfile): CoordinateMap {
  assertProject(project); const part = project.parts.find(p => p.id === partId); const texture = part?.textures.find(t => t.state === state);
  if (!part || !texture) throw new Error('E_REFERENCE_MISSING');
  const asset = project.assets.find(a => a.id === texture.assetId)!;
  const canvas = { x:0,y:0,...project.canvas };
  return new CoordinateMap(asset.sourceToEdited,texture.assetToLocal,world(project,part),
    viewport(canvas,view.width,view.height,view.zoom,view.pan,view.mirror),fitRect(output.region,{ x:0,y:0,width:output.width,height:output.height },output.fit));
}
export function partIsVisible(project: Project, part: CharacterPart): boolean {
  if (!part.visible) return false;
  if (part.parentId && !partIsVisible(project,project.parts.find(p => p.id === part.parentId)!)) return false;
  let group = part.groupId;
  while (group) { const value = project.groups.find(g => g.id === group)!; if (!value.visible) return false; group = value.parentGroupId; }
  return true;
}
export const identityTransform = (): Affine => [...IDENTITY];
/** DEC-03 pass-through group opacity, multiplied along the group ancestry. */
export function partOpacity(project:Project,part:CharacterPart):number {
 let value=part.opacity,id=part.groupId;let depth=0;
 while(id){const g=project.groups.find(g=>g.id===id);if(!g||++depth>128)throw new Error('E_GROUP_REFERENCE');value*=g.opacity??1;id=g.parentGroupId;}
 return value;
}
