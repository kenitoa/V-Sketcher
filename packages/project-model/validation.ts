import type { ValidateFunction } from 'ajv';
import { inverse,multiply,transform, type Affine } from '../coordinates';
import { projectStructure, machineStructure } from './structure.generated';
import type { Project, MachineSettings, ValidationIssue } from './types';
import { deformPoint } from '../motion/geometry';
import { NEUTRAL } from '../scene-core';
const check = projectStructure as ValidateFunction<Project>; const checkMachine = machineStructure as ValidateFunction<MachineSettings>;
export function portableResourcePath(value: string): boolean {
  return value.length <= 240 && value.normalize('NFC') === value && value.startsWith('resources/') && !/[\\:\x00-\x1f%<>"|?*]/.test(value) &&
    value.split('/').every(part => part.length > 0 && part !== '.' && part !== '..' && !/[. ]$/.test(part) && !/^(con|prn|aux|nul|com[0-9]|lpt[0-9])(?:\.|$)/i.test(part));
}
export function validateProject(value: unknown): ValidationIssue[] {
  if (!check(value)) return [{ code:'E_PROJECT_SCHEMA',location:check.errors?.[0]?.instancePath ?? '' }];
  const p = value; const issues: ValidationIssue[] = []; const ids = new Set<string>();
  const issue = (code: string, location: string): void => { issues.push({ code,location }); };
  const unique = <T extends { id:string }>(items: T[], location: string): Map<string,T> => {
    const map = new Map<string,T>(); items.forEach((item,i) => { if (ids.has(item.id)) issue('E_DUPLICATE_ID',`${location}/${i}/id`); ids.add(item.id); map.set(item.id,item); }); return map;
  };
  ids.add(p.projectId);
  const assets = unique(p.assets,'/assets'); const parts = unique(p.parts,'/parts'); const groups = unique(p.groups,'/groups');
  const parameters = unique(p.parameters,'/parameters'); unique(p.partBindings,'/partBindings'); unique(p.inputBindings,'/inputBindings');
  const expressions = unique(p.expressions,'/expressions'); unique([p.runtimeProfile],'/runtimeProfile'); unique(p.broadcastProfiles,'/broadcastProfiles'); unique(p.exportProfiles,'/exportProfiles');
  const matrix = (m: Affine, location: string): void => { try { inverse(m); } catch { issue('E_TRANSFORM_INVALID',location); } };
  const graph = (edges: Map<string,string[]>, location: string): void => {
    const state = new Map<string,number>();
    const visit = (id: string): void => {
      if (state.get(id) === 1) { issue('E_REFERENCE_CYCLE',location); return; }
      if (state.get(id) === 2) return; state.set(id,1);
      for (const parent of edges.get(id) ?? []) { if (!edges.has(parent)) issue('E_REFERENCE_MISSING',location); else visit(parent); }
      state.set(id,2);
    };
    for (const id of edges.keys()) visit(id);
  };
  graph(new Map(p.assets.map(a => [a.id,a.parentAssetIds])),'/assets/parentAssetIds');
  graph(new Map(p.parts.map(a => [a.id,a.parentId ? [a.parentId] : []])),'/parts/parentId');
  graph(new Map(p.groups.map(a => [a.id,a.parentGroupId ? [a.parentGroupId] : []])),'/groups/parentGroupId');
  if (p.displayName.trim() !== p.displayName || !p.displayName.trim()) issue('E_PROJECT_NAME','/displayName');
  if (![p.createdAt,p.modifiedAt].every(date => Number.isFinite(Date.parse(date)) && new Date(date).toISOString() === date) || p.modifiedAt < p.createdAt) issue('E_PROJECT_TIME','/modifiedAt');
  if (p.savedRevision !== null && p.savedRevision > p.revision) issue('E_REVISION_RANGE','/savedRevision');
  const paths = new Map<string,{ path:string; hash:string; bytes:number }>();
  p.assets.forEach((a,i) => {
    const location = `/assets/${i}`; matrix(a.sourceToEdited,location+'/sourceToEdited');
    if (!portableResourcePath(a.storage.path)) issue('E_RESOURCE_PATH',location+'/storage/path');
    const prior = paths.get(a.storage.path.toLowerCase());
    if (prior && (prior.path !== a.storage.path || prior.hash !== a.fingerprint.sha256 || prior.bytes !== a.fingerprint.bytes)) issue('E_RESOURCE_PATH_COLLISION',location+'/storage/path');
    paths.set(a.storage.path.toLowerCase(),{ path:a.storage.path,hash:a.fingerprint.sha256,bytes:a.fingerprint.bytes });
    const r = a.sourceRegion;
    if (r.x < 0 || r.y < 0 || r.x+r.width > a.dimensions.width || r.y+r.height > a.dimensions.height) issue('E_RESOURCE_REGION',location+'/sourceRegion');
    if (['auto-preparation','auto-completion','manual-edit'].includes(a.origin) && !a.parentAssetIds.length) issue('E_PROVENANCE_PARENT',location+'/parentAssetIds');
    if (a.kind === 'original-image' && a.parentAssetIds.length) issue('E_PROVENANCE_ORIGINAL',location+'/parentAssetIds');
    if (a.mediaType === 'image/jpeg' && a.alphaMode !== 'opaque') issue('E_RESOURCE_ALPHA',location+'/alphaMode');
  });
  p.inputAssetIds.forEach(id => { if (!assets.has(id)) issue('E_REFERENCE_MISSING','/inputAssetIds'); });
  p.parts.forEach((part,i) => {
    const location = `/parts/${i}`; matrix(part.localTransform,location+'/localTransform');
    if (part.groupId && !groups.has(part.groupId)) issue('E_REFERENCE_MISSING',location+'/groupId');
    const states = new Set<string>();
    part.textures.forEach((texture,j) => {
      matrix(texture.assetToLocal,`${location}/textures/${j}/assetToLocal`);
      if (states.has(texture.state)) issue('E_TEXTURE_STATE_DUPLICATE',location+'/textures'); states.add(texture.state);
      const a = assets.get(texture.assetId);
      if (!a) issue('E_REFERENCE_MISSING',location+'/textures'); else if (a.version !== texture.assetVersion) issue('E_RESOURCE_VERSION',location+'/textures');
    });
  });
  const previewKeys = new Set<string>();
  p.parameters.forEach((parameter,i) => {
    if (!(Number.isFinite(parameter.max-parameter.min) && parameter.min < parameter.max && parameter.min <= parameter.neutral && parameter.neutral <= parameter.max)) issue('E_PARAMETER_RANGE',`/parameters/${i}`);
    if (parameter.previewKey) { if (previewKeys.has(parameter.previewKey)) issue('E_PARAMETER_SEMANTIC',`/parameters/${i}`); previewKeys.add(parameter.previewKey); }
  });
  const boundParts = new Set<string>();
  p.partBindings.forEach((binding,i) => {
    if (!parts.has(binding.partId) || !parameters.has(binding.parameterId)) issue('E_REFERENCE_MISSING',`/partBindings/${i}`);
    if (binding.kind === 'transform' && !Number.isFinite(binding.mapping.outputRange[1]-binding.mapping.outputRange[0])) issue('E_MOTION_RANGE',`/partBindings/${i}`);
    if (binding.kind === 'state-blend') {
      const states = new Set(parts.get(binding.partId)?.textures.map(t => t.state));
      if (!states.has(binding.mapping.minimumState) || !states.has(binding.mapping.maximumState) || binding.mapping.minimumState === binding.mapping.maximumState) issue('E_BINDING_STATES',`/partBindings/${i}`);
    }
    const key = binding.partId+'/'+binding.kind+(binding.kind === 'transform' ? '/'+binding.mapping.component : '');
    if (boundParts.has(key)) issue('E_BINDING_AMBIGUOUS',`/partBindings/${i}`); boundParts.add(key);
  });
  const inputParameters = new Set<string>();
  p.inputBindings.forEach((binding,i) => {
    const parameter = parameters.get(binding.parameterId);
    if (!parameter) issue('E_REFERENCE_MISSING',`/inputBindings/${i}`);
    if (inputParameters.has(binding.parameterId)) issue('E_INPUT_AMBIGUOUS',`/inputBindings/${i}`); inputParameters.add(binding.parameterId);
    if (binding.inputRange[0] >= binding.inputRange[1]) issue('E_INPUT_RANGE',`/inputBindings/${i}`);
    if (parameter && (binding.fallback.value < parameter.min || binding.fallback.value > parameter.max)) issue('E_PARAMETER_RANGE',`/inputBindings/${i}/fallback`);
  });
  p.expressions.forEach((expression,i) => {
    const targets = new Set<string>();
    expression.values.forEach(target => {
      const parameter = parameters.get(target.parameterId);
      if (!parameter) issue('E_REFERENCE_MISSING',`/expressions/${i}`);
      else if (target.value < parameter.min || target.value > parameter.max) issue('E_PARAMETER_RANGE',`/expressions/${i}`);
      if (targets.has(target.parameterId)) issue('E_EXPRESSION_DUPLICATE',`/expressions/${i}`); targets.add(target.parameterId);
    });
  });
  if (p.runtimeProfile.fallbackExpressionId && !expressions.has(p.runtimeProfile.fallbackExpressionId)) issue('E_REFERENCE_MISSING','/runtimeProfile/fallbackExpressionId');
  for (const profile of p.exportProfiles) {
    const targets = new Set<string>(); const sources = new Set<string>();
    for (const mapping of profile.parameterMap) {
      if (!parameters.has(mapping.parameterId)) issue('E_REFERENCE_MISSING','/exportProfiles/parameterMap');
      if (targets.has(mapping.targetName) || sources.has(mapping.parameterId)) issue('E_EXPORT_MAPPING_DUPLICATE','/exportProfiles/parameterMap');
      targets.add(mapping.targetName); sources.add(mapping.parameterId);
    }
  }
  if (p.derivedProjects.some(v => v.projectId === p.projectId) || new Set(p.derivedProjects.map(v => v.projectId)).size !== p.derivedProjects.length) issue('E_DERIVED_PROJECT_REFERENCE','/derivedProjects');
  if (p.motion) {
    if (p.schemaVersion.minor < 1 || p.motion.faceWidth > p.canvas.width) issue('E_MOTION_VERSION','/motion');
    const seen = new Set<string>(); const world = (id:string,depth = 0):Affine => { const part = parts.get(id); if (!part || depth>64) return [1,0,0,1,0,0]; return part.parentId ? multiply(world(part.parentId,depth+1),part.localTransform) : part.localTransform; };
    for (const m of p.motion.meshes) {
      if (seen.has(m.partId) || !parts.has(m.partId)) issue('E_MOTION_REFERENCE','/motion/meshes'); seen.add(m.partId);
      if (m.yawParameterId && parameters.get(m.yawParameterId)?.previewKey !== 'head_yaw' || m.rollParameterId && parameters.get(m.rollParameterId)?.previewKey !== 'head_roll') issue('E_MOTION_REFERENCE','/motion/meshes');
      if (m.triangles.length%3 || m.triangles.some(i => i>=m.vertices.length)) issue('E_MOTION_TRIANGLE','/motion/meshes');
      for (let i=0;i<m.triangles.length;i+=3) { const a = m.vertices[m.triangles[i]!]!; const b = m.vertices[m.triangles[i+1]!]!; const c = m.vertices[m.triangles[i+2]!]!; if (!a || !b || !c) continue; const area = (b.position[0]-a.position[0])*(c.position[1]-a.position[1])-(b.position[1]-a.position[1])*(c.position[0]-a.position[0]); if (area<=1e-8) issue('E_MOTION_TRIANGLE','/motion/meshes'); }
      const mtx = world(m.partId); const deltaLength = (v:[number,number]):number => Math.hypot(mtx[0]*v[0]+mtx[2]*v[1],mtx[1]*v[0]+mtx[3]*v[1]);
      for (const v of m.vertices) if (![...v.position,...m.pivot].every(n => Math.abs(n)<=1e7) || deltaLength(v.minimum)>p.motion.faceWidth*.045+1e-6 || deltaLength(v.maximum)>p.motion.faceWidth*.045+1e-6) issue('E_MOTION_RANGE','/motion/meshes');
      if (!issues.length) {
        const pivot = transform(mtx,{ x:m.pivot[0],y:m.pivot[1] }); const zero = transform(mtx,{ x:0,y:0 });
        const vectors = m.vertices.map(v => { const position = transform(mtx,{ x:v.position[0],y:v.position[1] }); const min = transform(mtx,{ x:v.minimum[0],y:v.minimum[1] }); const max = transform(mtx,{ x:v.maximum[0],y:v.maximum[1] }); return { position,weight:v.weight,min:{ x:min.x-zero.x,y:min.y-zero.y },max:{ x:max.x-zero.x,y:max.y-zero.y } }; });
        const layer = { id:m.partId,z:0,origin:[0,0] as [number,number],opacity:1,bind:null,states:{},mesh:{ pivot:[pivot.x,pivot.y] as [number,number],vertices:[],triangles:[],yaw:m.yawParameterId!==null,roll:m.rollParameterId!==null,maxRollDegrees:p.motion.maxRollDegrees,curve:m.curve } };
        const area = (a:{ x:number;y:number },b:{ x:number;y:number },c:{ x:number;y:number }):number => (b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);
        for (const head_yaw of [-1,0,1]) for (const head_roll of [-1,0,1]) { const points = vectors.map(v => deformPoint(layer,v.position,v.weight,v.min,v.max,{ ...NEUTRAL,head_yaw,head_roll }));
          for (let i=0;i<m.triangles.length;i+=3) { const [a,b,c] = m.triangles.slice(i,i+3) as [number,number,number]; const before = area(vectors[a]!.position,vectors[b]!.position,vectors[c]!.position); const after = area(points[a]!,points[b]!,points[c]!); if (!Number.isFinite(after) || after*before<=0 || Math.abs(after)<Math.abs(before)*.01) { issue('E_MOTION_FOLD','/motion/meshes'); break; } }
        }
      }
    }
    const pose = new Set<string>(); for (const v of p.motion.settings.pose) { const param = parameters.get(v.parameterId); if (!param || pose.has(v.parameterId)) issue('E_MOTION_REFERENCE','/motion/settings/pose'); else if (v.value<param.min || v.value>param.max) issue('E_PARAMETER_RANGE','/motion/settings/pose'); pose.add(v.parameterId); }
  }
  return issues;
}
export function assertProject(value: unknown): asserts value is Project {
  const issues = validateProject(value); if (issues.length) throw new Error(issues[0]!.code);
}
export function assertMachineSettings(value: unknown, project: Project): asserts value is MachineSettings {
  if (!checkMachine(value)) throw new Error('E_MACHINE_SCHEMA');
  if (value.projectId !== project.projectId) throw new Error('E_MACHINE_PROJECT');
  const ids = new Set<string>(); const bindings = new Set(project.inputBindings.map(v => v.id));
  for (const c of value.calibrations) {
    if (!bindings.has(c.bindingId) || ids.has(c.bindingId) || c.inputRange[0] >= c.inputRange[1]) throw new Error('E_MACHINE_CALIBRATION'); ids.add(c.bindingId);
  }
}
