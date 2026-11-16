import type { ValidateFunction } from 'ajv';
import { inverse, type Affine } from '../coordinates';
import { projectStructure, machineStructure } from './structure.generated';
import type { Project, MachineSettings, ValidationIssue } from './types';
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
    if (!(parameter.min < parameter.max && parameter.min <= parameter.neutral && parameter.neutral <= parameter.max)) issue('E_PARAMETER_RANGE',`/parameters/${i}`);
    if (parameter.previewKey) { if (previewKeys.has(parameter.previewKey)) issue('E_PARAMETER_SEMANTIC',`/parameters/${i}`); previewKeys.add(parameter.previewKey); }
  });
  const boundParts = new Set<string>();
  p.partBindings.forEach((binding,i) => {
    if (!parts.has(binding.partId) || !parameters.has(binding.parameterId)) issue('E_REFERENCE_MISSING',`/partBindings/${i}`);
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
