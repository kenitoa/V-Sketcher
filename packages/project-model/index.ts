export * from './types';
export * from './validation';
export { PROJECT_SCHEMA, MACHINE_SCHEMA } from './schema';
import { assertProject, assertMachineSettings } from './validation';
import type { Project, SourceType, MachineSettings } from './types';
export const SCHEMA_VERSION = { major:1,minor:7 } as const;
const MAX_DOCUMENT_BYTES = 16*1024*1024;
export function createProject(displayName: string, sourceType: SourceType, now = new Date(), id = crypto.randomUUID()): Project {
  const timestamp = now.toISOString();
  const project: Project = { projectId:id,schemaVersion:{ ...SCHEMA_VERSION },displayName:displayName.trim(),sourceType,
    createdAt:timestamp,modifiedAt:timestamp,revision:0,savedRevision:null,canvas:{ width:1254,height:1254 },inputAssetIds:[],assets:[],parts:[],groups:[],parameters:[],partBindings:[],inputBindings:[],expressions:[],
    runtimeProfile:{ id:'runtime-'+id,revision:0,mode:'idle',mirror:false,fallbackExpressionId:null },broadcastProfiles:[],exportProfiles:[],
    provenance:{ preparation:'Not prepared',limitations:[] },derivedProjects:[] };
  assertProject(project); return project;
}
/** Pure synchronous model edit. Async transactions, disk save and undo belong to later phases. */
export function editProject(project: Project, edit: (draft: Project) => void, now = new Date()): Project {
  assertProject(project); const draft = structuredClone(project); edit(draft);
  for (const key of ['projectId','sourceType','createdAt','revision','savedRevision'] as const) if (draft[key] !== project[key]) throw new Error('E_PROJECT_IDENTITY_EDIT');
  if (draft.schemaVersion.major !== project.schemaVersion.major || draft.schemaVersion.minor<project.schemaVersion.minor || draft.schemaVersion.minor>SCHEMA_VERSION.minor) throw new Error('E_PROJECT_IDENTITY_EDIT');
  draft.revision = project.revision+1;
  draft.modifiedAt = new Date(Math.max(now.getTime(),Date.parse(project.modifiedAt))).toISOString();
  assertProject(draft); return draft;
}
export function renamePart(project: Project, partId: string, displayName: string, now?: Date): Project {
  return editProject(project, draft => { const part = draft.parts.find(v => v.id === partId); if (!part) throw new Error('E_REFERENCE_MISSING'); part.displayName = displayName.trim(); }, now);
}
export function acknowledgeSave(project: Project, snapshotRevision: number): Project {
  assertProject(project);
  if (!Number.isSafeInteger(snapshotRevision) || snapshotRevision < 0 || snapshotRevision > project.revision) throw new Error('E_REVISION_RANGE');
  if (project.savedRevision !== null && snapshotRevision < project.savedRevision) throw new Error('E_SAVE_STALE');
  const result = structuredClone(project); result.savedRevision = snapshotRevision; return result;
}
export const isDirty = (project: Project): boolean => project.savedRevision !== project.revision;
export function serializeProject(project: Project): string { assertProject(project); return JSON.stringify(project,null,2)+'\n'; }
export type ReadResult = { mode:'read-write'; project:Project } | { mode:'read-only'; schemaVersion:{ major:number; minor:number }; raw:unknown };
export function readProject(input: string | unknown): ReadResult {
  let value: unknown = input;
  if (typeof input === 'string') {
    if (new TextEncoder().encode(input).length > MAX_DOCUMENT_BYTES) throw new Error('E_PROJECT_SIZE');
    try { value = JSON.parse(input); } catch { throw new Error('E_PROJECT_JSON'); }
  }
  const jsonSafe = (v: unknown, depth: number): void => {
    if (depth > 32) throw new Error('E_PROJECT_DEPTH');
    if (v === null || typeof v === 'string' || typeof v === 'boolean') return;
    if (typeof v === 'number' && Number.isFinite(v)) return;
    if (typeof v !== 'object' || (!Array.isArray(v) && Object.getPrototypeOf(v) !== Object.prototype && Object.getPrototypeOf(v) !== null)) throw new Error('E_PROJECT_JSON');
    for (const child of Object.values(v)) jsonSafe(child,depth+1);
  };
  jsonSafe(value,0);
  if (new TextEncoder().encode(JSON.stringify(value)).length > MAX_DOCUMENT_BYTES) throw new Error('E_PROJECT_SIZE');
  const version = (value as { schemaVersion?: { major?:unknown; minor?:unknown } } | null)?.schemaVersion;
  if (!version || !Number.isSafeInteger(version.major) || !Number.isSafeInteger(version.minor) || Number(version.minor) < 0) throw new Error('E_SCHEMA_VERSION');
  if (version.major !== SCHEMA_VERSION.major) throw new Error('E_SCHEMA_MAJOR');
  if (Number(version.minor) > SCHEMA_VERSION.minor) return { mode:'read-only',schemaVersion:{ major:1,minor:Number(version.minor) },raw:structuredClone(value) };
  assertProject(value); return { mode:'read-write',project:structuredClone(value) };
}
export function createMachineSettings(project: Project): MachineSettings {
  assertProject(project); return { schemaVersion:1,projectId:project.projectId,cameraId:null,microphoneId:null,calibrations:[] };
}
/** Instantaneous mapping only. Time-dependent smoothing/return transitions are runtime work. */
export function mapInputs(project: Project, machine: MachineSettings, signals: ReadonlyMap<string, number>, previous: ReadonlyMap<string, number> = new Map()): Map<string,number> {
  assertProject(project); assertMachineSettings(machine,project);
  const result = new Map(project.parameters.map(p => [p.id,p.neutral]));
  for (const binding of project.inputBindings) {
    const parameter = project.parameters.find(p => p.id === binding.parameterId)!;
    const raw = signals.get(binding.source+':'+binding.channel); const clamp = (v: number): number => Math.max(parameter.min,Math.min(parameter.max,v));
    if (raw === undefined) {
      const prior = previous.get(parameter.id);
      result.set(parameter.id,binding.fallback.mode === 'constant' ? binding.fallback.value : binding.fallback.mode === 'hold' && prior !== undefined && Number.isFinite(prior) ? clamp(prior) : parameter.neutral); continue;
    }
    if (!Number.isFinite(raw)) throw new Error('E_INPUT_NONFINITE');
    const [min,max] = machine.calibrations.find(c => c.bindingId === binding.id)?.inputRange ?? binding.inputRange;
    let t = Math.max(0,Math.min(1,(raw-min)/(max-min))); if (binding.invert) t = 1-t;
    const value = parameter.min+t*(parameter.max-parameter.min);
    result.set(parameter.id,clamp(parameter.neutral+(value-parameter.neutral)*binding.gain+binding.offset));
  }
  return result;
}
