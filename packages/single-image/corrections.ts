import { assertSimpleSafe } from '../detail-editor/model';
import { randomUUID } from 'node:crypto';
import { assertProject, type Project, type Asset, type CharacterPart } from '../project-model';
import { authorRig } from '../motion';
import { sha256 } from '../project-storage/archive';
import { assertReport, type StructureReport } from './types';
import {
  assertCorrection,
  withCorrection,
  type FeatureCorrection,
  type FeatureKey,
  type CorrectionRequest,
  FEATURE_KEYS,
} from './correction-types';
export function proposal(
  input: Project,
  request: CorrectionRequest,
  analysis?: StructureReport,
): {
  report: StructureReport;
  entries: FeatureCorrection[];
  keys: FeatureKey[];
  changes: { key: FeatureKey; action: 'keep-protected' | 'replace' | 'recheck' }[];
} {
  const record = input.structure;
  if (!record) throw new Error('E_CORRECTION_SOURCE');
  const report = structuredClone(record.report);
  const original = record.corrections?.automatic ?? record.report;
  let entries = structuredClone(record.corrections?.entries ?? []);
  const keys = request.kind === 'edit' ? request.entries.map((e) => e.key) : request.keys;
  const changes: { key: FeatureKey; action: 'keep-protected' | 'replace' | 'recheck' }[] = [];
  for (const key of keys) {
    let region = report.regions.find((r) => r.key === key);
    if (!region) throw new Error('E_CORRECTION_SOURCE');
    const protectedEntry = entries.find((e) => e.key === key && e.protect);
    if (request.kind === 'edit') {
      const c = request.entries.find((e) => e.key === key)!;
      assertCorrection(c, input.canvas.width, input.canvas.height);
      region = withCorrection(region, c);
      entries = entries.filter((e) => e.key !== key);
      entries.push(structuredClone(c));
      changes.push({ key, action: 'replace' });
    } else if (request.kind === 'reset') {
      const auto = original.regions.find((r) => r.key === key);
      if (!auto) throw new Error('E_CORRECTION_SOURCE');
      region = structuredClone(auto);
      entries = entries.filter((e) => e.key !== key);
      changes.push({ key, action: 'replace' });
    } else if (protectedEntry && !request.overwrite.includes(key)) {
      changes.push({ key, action: 'keep-protected' });
      continue;
    } else {
      const fresh = analysis?.regions.find((r) => r.key === key);
      if (!fresh) throw new Error('E_CORRECTION_ANALYSIS');
      region = structuredClone(fresh);
      region.enabled = region.observed;
      entries = entries.filter((e) => e.key !== key);
      changes.push({ key, action: 'recheck' });
    }
    report.regions = report.regions.map((r) => (r.key === key ? region! : r));
  }
  for (const r of report.regions) {
    const c = entries.find((e) => e.key === r.key);
    if (c) Object.assign(r, withCorrection(r, c));
  }
  report.completion = 'estimated';
  report.status = report.regions.every((r) => r.observed) ? 'ready' : 'partial';
  report.headGain = report.status === 'ready' ? 0.65 : 0.35;
  report.maxRollDegrees = 6 * report.headGain;
  report.files = [];
  report.unconfirmed = [
    ...report.unconfirmed.filter((v) => !FEATURE_KEYS.includes(v as FeatureKey)),
    ...report.regions.filter((r) => !r.observed).map((r) => r.key),
  ];
  for (const r of report.regions) {
    if (
      r.rect.x + r.rect.width > input.canvas.width ||
      r.rect.y + r.rect.height > input.canvas.height
    )
      throw new Error('E_CORRECTION_REGION');
  }
  const enabled = report.regions.filter((r) => r.enabled ?? r.observed);
  for (let i = 0; i < enabled.length; i++)
    for (let j = i + 1; j < enabled.length; j++) {
      const a = enabled[i]!.rect,
        b = enabled[j]!.rect;
      if (
        a.x < b.x + b.width &&
        b.x < a.x + a.width &&
        a.y < b.y + b.height &&
        b.y < a.y + a.height
      )
        throw new Error('E_CORRECTION_OVERLAP');
    }
  assertSimpleSafe(input);
  assertReport(report);
  return { report, entries, keys, changes };
}
export function rebuildCorrected(
  input: Project,
  report: StructureReport,
  entries: FeatureCorrection[],
  keys: FeatureKey[],
  files: ReadonlyMap<string, Buffer>,
): { project: Project; bytes: Map<string, Buffer> } {
  assertReport(report);
  if (!input.structure || !input.inputPreparation) throw new Error('E_CORRECTION_SOURCE');
  const p = structuredClone(input);
  p.schemaVersion.minor = Math.max(5, p.schemaVersion.minor);
  const source = p.assets.find((a) => a.id === p.inputPreparation!.selectedAssetId)!;
  const bytes = new Map<string, Buffer>();
  const asset = (name: string, w: number, h: number, estimated: boolean): Asset => {
    const b = files.get(name);
    if (!b) throw new Error('E_CORRECTION_FILES');
    const hash = sha256(b);
    const a: Asset = {
      ...structuredClone(source),
      id: randomUUID(),
      kind: estimated ? 'supplement-image' : 'part-texture',
      origin: estimated ? 'auto-completion' : 'manual-edit',
      parentAssetIds: [source.id],
      storage: { path: `resources/${hash}.png` },
      fingerprint: { sha256: hash, bytes: b.length },
      dimensions: { width: w, height: h },
      sourceRegion: { x: 0, y: 0, width: w, height: h },
      sourceToEdited: [1, 0, 0, 1, 0, 0],
      producer: { name: 'single-image-structure', version: '1.1.0' },
    };
    p.assets.push(a);
    bytes.set(a.id, b);
    return a;
  };
  const texture = (a: Asset, state: string) => ({
    state,
    assetId: a.id,
    assetVersion: 1,
    assetToLocal: [1, 0, 0, 1, 0, 0] as [number, number, number, number, number, number],
  });
  const base = p.parts.find((v) => v.role === 'base');
  if (!base) throw new Error('E_CORRECTION_SOURCE');
  base.textures = [
    texture(asset('structure-base.png', p.canvas.width, p.canvas.height, true), 'default'),
  ];
  const changed = new Set([base.id]);
  for (const key of keys) {
    const parameter = p.parameters.find((v) => v.previewKey === key);
    if (!parameter) throw new Error('E_CORRECTION_SOURCE');
    const binding = p.partBindings.find(
      (b) => b.parameterId === parameter.id && b.kind === 'state-blend',
    );
    let part = p.parts.find((v) => v.id === binding?.partId);
    const r = report.regions.find((v) => v.key === key)!;
    if (part) {
      changed.add(part.id);
      p.parts = p.parts.filter((v) => v.id !== part!.id);
      p.partBindings = p.partBindings.filter(
        (v) => v.partId !== part!.id || ((r.enabled ?? r.observed) && v.kind !== 'state-blend'),
      );
    }
    if (!(r.enabled ?? r.observed)) continue;
    const first = key === 'mouth' ? 'closed' : 'open',
      other = first === 'closed' ? 'open' : 'closed';
    const a = asset(`structure-${key}-${first}.png`, r.rect.width, r.rect.height, false),
      b = asset(`structure-${key}-${other}.png`, r.rect.width, r.rect.height, true);
    part = {
      ...(part ?? {
        id: randomUUID(),
        displayName: key,
        role: key === 'mouth' ? 'mouth' : 'eye',
        side:
          key === 'mouth' ? 'center' : key === 'eye_left' ? 'character-left' : 'character-right',
        parentId: null,
        groupId: null,
        visible: true,
        opacity: 1,
      }),
      textures: [texture(a, first), texture(b, other)],
      localTransform: [1, 0, 0, 1, r.rect.x, r.rect.y],
      drawOrder: r.order ?? 10,
      correctionOrigin: entries.some((e) => e.key === key) ? 'user-confirmed' : 'automatic',
      limitations: ['Estimated state; source and correction retained'],
    } as CharacterPart;
    p.parts.push(part);
    changed.add(part.id);
    p.partBindings.push({
      id: binding?.id ?? randomUUID(),
      partId: part.id,
      parameterId: parameter.id,
      kind: 'state-blend',
      mapping: { minimumState: 'closed', maximumState: 'open' },
    });
  }
  p.structure = {
    ...p.structure!,
    configurationVersion: '1.1.0',
    inputRevision: input.revision,
    report: structuredClone(report),
    corrections: {
      version: 1,
      automatic: structuredClone(input.structure.corrections?.automatic ?? input.structure.report),
      entries: structuredClone(entries),
      invalidated: { keys: [...keys], checks: ['preview', 'compatibility', 'export'] },
    },
  };
  const prior = p.motion;
  delete p.motion;
  const rig = authorRig(p);
  rig.faceWidth = report.face!.width;
  const rawWidth = authorRig(p).faceWidth;
  for (const m of rig.meshes)
    for (const v of m.vertices) {
      v.minimum = [
        (v.minimum[0] * rig.faceWidth) / rawWidth,
        (v.minimum[1] * rig.faceWidth) / rawWidth,
      ];
      v.maximum = [
        (v.maximum[0] * rig.faceWidth) / rawWidth,
        (v.maximum[1] * rig.faceWidth) / rawWidth,
      ];
    }
  const sameHead = input.structure.report.headGain === report.headGain;
  rig.meshes = rig.meshes.map((m) =>
    sameHead && !changed.has(m.partId)
      ? structuredClone(prior?.meshes.find((v) => v.partId === m.partId) ?? m)
      : m,
  );
  if (prior) rig.settings = structuredClone(prior.settings);
  p.motion = rig;
  p.provenance = {
    ...p.provenance,
    preparation: 'Corrected single-image structure; selected changes applied',
    limitations: [
      ...p.provenance.limitations.filter((v) => !v.startsWith('UNCONFIRMED:')),
      ...report.unconfirmed.map((v) => 'UNCONFIRMED:' + v),
    ],
  };
  assertProject(p);
  return { project: p, bytes };
}
