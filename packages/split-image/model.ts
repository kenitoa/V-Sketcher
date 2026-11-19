import { assertSimpleSafe } from '../detail-editor/model';
import { randomUUID } from 'node:crypto';
import type { Project, Asset, Parameter, PreviewKey } from '../project-model/types';
import { assertProject } from '../project-model/validation';
import { partWorldTransform } from '../project-model/geometry';
import { transform } from '../coordinates';
import { hash, type SplitSource } from './archive';
import {
  issues,
  effective,
  configuration,
  type SplitDraft,
  type ProbeImage,
  type SplitLayer,
} from './types';
function suggestion(
  name: string,
  image: ProbeImage,
  origin: [number, number],
  canvas: { width: number; height: number },
): SplitLayer['proposal'] {
  const n = name.toLowerCase();
  let role: SplitLayer['role'] = 'custom';
  if (/eye|눈/.test(n)) role = 'eye';
  else if (/mouth|입/.test(n)) role = 'mouth';
  else if (/hair.*back|back.*hair|뒷머리/.test(n)) role = 'hair-back';
  else if (/hair|앞머리/.test(n)) role = 'hair-front';
  else if (/body|outfit|몸|의상/.test(n)) role = 'body';
  else if (/head|face|얼굴|머리/.test(n)) role = 'head';
  else if (/access|장식/.test(n)) role = 'accessory';
  const b = image.bounds;
  const x = origin[0] + (b ? b.x + b.width / 2 : image.width / 2),
    y = origin[1] + (b ? b.y + b.height / 2 : image.height / 2);
  let side: SplitLayer['side'] = 'none';
  const reasons: string[] = [];
  if (role !== 'custom') reasons.push('NAME_HINT');
  if (role === 'eye' && b) {
    side =
      x > canvas.width * 0.53
        ? 'character-left'
        : x < canvas.width * 0.47
          ? 'character-right'
          : 'center';
    reasons.push('CANVAS_POSITION');
    if (b.width > b.height * 0.8 && b.width < b.height * 6 && y < canvas.height * 0.65)
      reasons.push('ALPHA_SHAPE');
    if (
      (/(^|[_ .-])(left|l)([_ .-]|$)|왼/.test(n) && side !== 'character-left') ||
      (/(^|[_ .-])(right|r)([_ .-]|$)|오른/.test(n) && side !== 'character-right')
    )
      reasons.push('SIDE_CONFLICT');
  } else if (['head', 'mouth', 'body', 'base'].includes(role)) side = 'center';
  return {
    role,
    side,
    confidence: reasons.includes('SIDE_CONFLICT') ? 0.3 : Math.min(0.92, reasons.length * 0.3),
    reasons,
  };
}
export function draftFromSource(
  source: SplitSource,
  images: ProbeImage[],
  normalized: Map<string, Buffer>,
): SplitDraft {
  const lookup = new Map(images.map((i) => [i.key, i]));
  const sizes = source.layers.map((l) => lookup.get(hash(source.files.get(l.path)!))!);
  if (sizes.some((v) => !v)) throw new Error('E_SPLIT_REPORT');
  const common =
    sizes.every((s) => s.width === sizes[0]!.width && s.height === sizes[0]!.height) &&
    sizes[0]!.width >= 256 &&
    sizes[0]!.height >= 256;
  const canvas =
    source.canvas ??
    (common
      ? { width: sizes[0]!.width, height: sizes[0]!.height }
      : {
          width: Math.max(1024, ...sizes.map((s) => s.width)),
          height: Math.max(1280, ...sizes.map((s) => s.height)),
        });
  const partIds = new Map(source.layers.map((l) => [l.id, randomUUID()]));
  const groupIds = new Map(source.groups.map((g) => [g.id, randomUUID()]));
  const originals = new Map<string, string>(),
    edited = new Map<string, string>();
  const ref = (v: string | null, ids: Map<string, string>) =>
    v === null ? null : (ids.get(v) ?? 'missing_' + hash(Buffer.from(v)).slice(0, 24));
  const layers = source.layers.map((l, i): SplitLayer => {
    const key = hash(source.files.get(l.path)!);
    const image = lookup.get(key)!;
    const norm = normalized.get(key);
    if (!norm) throw new Error('E_SPLIT_REPORT');
    const imageHash = hash(norm);
    if (!originals.has(key)) originals.set(key, randomUUID());
    if (!edited.has(key + imageHash)) edited.set(key + imageHash, randomUUID());
    const origin =
      l.origin ??
      (common
        ? [0, 0]
        : [
            Math.round((canvas.width - image.width) / 2),
            Math.round((canvas.height - image.height) / 2),
          ]);
    const proposed = suggestion(l.name, image, origin, canvas);
    return {
      id: partIds.get(l.id)!,
      sourceId: l.id,
      sourceName: l.name,
      sourcePath: l.path,
      sourceZ: l.z,
      sourceOrigin: l.origin,
      originalAssetId: originals.get(key)!,
      imageAssetId: edited.get(key + imageHash)!,
      sourceHash: key,
      imageHash,
      image,
      proposal: proposed,
      name: l.name,
      origin: [...origin],
      z: l.z ?? i,
      role: l.role ?? proposed.role,
      side: l.side ?? proposed.side,
      visible: l.visible,
      opacity: l.opacity,
      parentId: ref(l.parent, partIds),
      groupId: ref(l.group, groupIds),
      usage: l.usage,
      variantOf: ref(l.variantOf, partIds),
      state: l.state,
      positionConfirmed: l.origin !== null,
      roleConfirmed: l.role !== null && l.side !== null,
    };
  });
  return {
    id: randomUUID(),
    sourceKind: source.kind,
    sourceHash: source.sourceHash,
    sourceManifest: source.manifest,
    canvas,
    layout: source.canvas ? 'manifest' : common ? 'common' : 'cropped',
    layoutConfirmed: !!source.canvas,
    limitedAccepted: false,
    omittedAccepted: false,
    layers,
    groups: source.groups.map((g) => ({
      id: groupIds.get(g.id)!,
      name: g.name,
      parentGroupId: ref(g.parent, groupIds),
      visible: g.visible,
      opacity: g.opacity,
    })),
    omitted: source.omitted,
    missingProperties: source.missingProperties,
  };
}
export function materials(
  d: SplitDraft,
  raw: ReadonlyMap<string, Buffer>,
  normal: ReadonlyMap<string, Buffer>,
): { assets: Asset[]; bytes: Map<string, Buffer> } {
  const assets = new Map<string, Asset>(),
    bytes = new Map<string, Buffer>();
  for (const l of d.layers)
    for (const original of [true, false]) {
      const id = original ? l.originalAssetId : l.imageAssetId;
      const b = (original ? raw : normal).get(original ? l.sourceHash : l.imageHash);
      if (!b) throw new Error('E_SPLIT_RESOURCE');
      const digest = hash(b);
      if (digest !== (original ? l.sourceHash : l.imageHash)) throw new Error('E_SPLIT_RESOURCE');
      if (!assets.has(id)) {
        assets.set(id, {
          id,
          kind: original ? 'original-image' : 'part-texture',
          origin: original ? 'imported' : 'auto-preparation',
          parentAssetIds: original ? [] : [l.originalAssetId],
          storage: { path: 'resources/' + digest + '.png' },
          fingerprint: { sha256: digest, bytes: b.length },
          version: 1,
          mediaType: 'image/png',
          dimensions: { width: l.image.width, height: l.image.height },
          sourceRegion: { x: 0, y: 0, width: l.image.width, height: l.image.height },
          sourceToEdited: [1, 0, 0, 1, 0, 0],
          colorSpace: original && l.image.iccConverted ? 'unknown' : 'srgb',
          alphaMode: l.image.opaque ? 'opaque' : 'straight',
          producer: { name: 'split-image-input', version: '1.0.0' },
          attribution: {
            creator: 'User supplied',
            source: 'Local PNG layer',
            usage: 'User responsibility',
            status: 'unverified',
          },
        });
        bytes.set(id, b);
      }
    }
  return { assets: [...assets.values()], bytes };
}
export function rigSignature(p: Project): string {
  return hash(
    Buffer.from(
      JSON.stringify(
        p.motion
          ? {
              meshes: p.motion.meshes,
              faceWidth: p.motion.faceWidth,
              maxRollDegrees: p.motion.maxRollDegrees,
            }
          : null,
      ),
    ),
  );
}
export function assertGuidanceCompatible(p: Project): void {
  assertSimpleSafe(p);
  if (p.split && p.split.rigSignature !== rigSignature(p))
    throw new Error('E_SPLIT_ADVANCED_CONFLICT');
}
export function buildProject(input: Project, draft: SplitDraft, newAssets: Asset[]): Project {
  assertSimpleSafe(input);
  assertGuidanceCompatible(input);
  if (issues(draft).some((v) => v.level === 'block')) throw new Error('E_SPLIT_INCOMPLETE');
  const p = structuredClone(input),
    d = structuredClone(draft);
  p.schemaVersion.minor = Math.max(6, p.schemaVersion.minor);
  p.sourceType = 'split-image';
  p.canvas = { ...d.canvas };
  delete p.assembly;
  delete p.structure;
  delete p.inputPreparation;
  for (const a of newAssets) {
    const old = p.assets.find((v) => v.id === a.id);
    if (old && JSON.stringify(old) !== JSON.stringify(a)) throw new Error('E_SPLIT_RESOURCE');
    if (!old) p.assets.push(a);
  }
  p.inputAssetIds = [...new Set(d.layers.map((l) => l.originalAssetId))];
  const ordered = [...d.layers].sort(
    (a, b) => a.z - b.z || (a.sourceId < b.sourceId ? -1 : a.sourceId > b.sourceId ? 1 : 0),
  );
  p.groups = d.groups.map((g) => ({
    id: g.id,
    displayName: g.name,
    parentGroupId: g.parentGroupId,
    visible: g.visible,
    opacity: g.opacity,
  }));
  p.parts = d.layers.map((l) => {
    const parent = d.layers.find((v) => v.id === l.parentId);
    const initial =
      l.state === 'default'
        ? l.role === 'eye'
          ? 'open'
          : l.role === 'mouth'
            ? 'closed'
            : 'default'
        : l.state;
    const variants =
      l.usage === 'primary'
        ? d.layers.filter((v) => v.usage === 'alternative' && v.variantOf === l.id)
        : [];
    return {
      id: l.id,
      displayName: l.name,
      role: l.role,
      side: l.side,
      parentId: l.parentId,
      groupId: l.groupId,
      textures: [
        {
          state: initial,
          assetId: l.imageAssetId,
          assetVersion: 1,
          assetToLocal: [1, 0, 0, 1, 0, 0] as [number, number, number, number, number, number],
        },
        ...variants.map((v) => ({
          state: v.state,
          assetId: v.imageAssetId,
          assetVersion: 1,
          assetToLocal: [1, 0, 0, 1, v.origin[0] - l.origin[0], v.origin[1] - l.origin[1]] as [
            number,
            number,
            number,
            number,
            number,
            number,
          ],
        })),
      ],
      localTransform: [
        1,
        0,
        0,
        1,
        l.origin[0] - (parent?.origin[0] ?? 0),
        l.origin[1] - (parent?.origin[1] ?? 0),
      ] as [number, number, number, number, number, number],
      drawOrder: ordered.findIndex((v) => v.id === l.id),
      visible: l.visible,
      opacity: l.opacity,
      correctionOrigin: 'user-confirmed' as const,
      limitations: l.image.empty
        ? ['Empty authored layer']
        : l.usage === 'auxiliary'
          ? ['Auxiliary layer; no independent expression binding']
          : [],
    };
  });
  const currentIds = new Set(p.parts.map((v) => v.id));
  if (
    input.split &&
    input.partBindings.some((v) => v.kind === 'transform' && currentIds.has(v.partId))
  )
    throw new Error('E_SPLIT_ADVANCED_CONFLICT');
  p.partBindings = [];
  const parameter = (key: PreviewKey, neutral: number): Parameter => {
    let v = p.parameters.find((v) => v.previewKey === key);
    if (!v) {
      v = {
        id: randomUUID(),
        displayName: key,
        semantic: key,
        unit: 'ratio',
        min: key.startsWith('head') ? -1 : 0,
        neutral,
        max: 1,
        previewKey: key,
      };
      p.parameters.push(v);
    }
    return v;
  };
  for (const l of d.layers.filter(
    (l) => l.usage === 'primary' && effective(d, l).visible && effective(d, l).opacity > 0,
  )) {
    const key: PreviewKey | null =
      l.role === 'mouth'
        ? 'mouth'
        : l.role === 'eye' && l.side === 'character-left'
          ? 'eye_left'
          : l.role === 'eye' && l.side === 'character-right'
            ? 'eye_right'
            : null;
    const part = p.parts.find((v) => v.id === l.id)!;
    if (
      key &&
      part.textures.some((t) => t.state === 'open') &&
      part.textures.some((t) => t.state === 'closed')
    ) {
      const neutral = part.textures[0]!.state === 'closed' ? 0 : 1;
      const param = parameter(key, neutral);
      p.partBindings.push({
        id:
          input.partBindings.find((v) => v.partId === l.id && v.kind === 'state-blend')?.id ??
          randomUUID(),
        partId: l.id,
        parameterId: param.id,
        kind: 'state-blend',
        mapping: {
          minimumState: 'closed',
          maximumState: 'open',
          ...(part.textures.some((t) => t.state === 'middle') ? { middleState: 'middle' } : {}),
        },
      });
    }
  }
  const yaw = parameter('head_yaw', 0),
    roll = parameter('head_roll', 0);
  p.split = { version: 1, draft: d, rigSignature: '' };
  const active = d.layers.filter(
    (l) => l.usage !== 'alternative' && effective(d, l).visible && effective(d, l).opacity > 0,
  );
  const head = active.filter((l) => l.role === 'head');
  const pivotLayer = head[0] ?? active[0]!;
  const b = pivotLayer.image.bounds!;
  const pivot: [number, number] = [
    pivotLayer.origin[0] + b.x + b.width / 2,
    pivotLayer.origin[1] + b.y + b.height / 2,
  ];
  const whole = !head.length;
  const faceWidth = Math.min(p.canvas.width, Math.max(1, b.width));
  p.motion = {
    version: 1,
    faceWidth,
    maxRollDegrees: 3,
    secondary: 'disabled',
    settings: input.motion
      ? structuredClone(input.motion.settings)
      : { strength: 1, smoothingMs: 120, pose: [] },
    meshes: p.parts.map((part) => {
      const l = d.layers.find((v) => v.id === part.id)!;
      const live = !l.image.empty && l.usage !== 'alternative' && (whole || l.role !== 'body');
      const w = l.image.width,
        h = l.image.height;
      return {
        partId: l.id,
        pivot: [pivot[0] - l.origin[0], pivot[1] - l.origin[1]],
        yawParameterId: live ? yaw.id : null,
        rollParameterId: live ? roll.id : null,
        curve: 'smoothstep' as const,
        vertices: [
          [0, 0],
          [w, 0],
          [0, h],
          [w, h],
        ].map((pos) => ({
          position: pos as [number, number],
          weight: live ? 1 : 0,
          minimum: [-faceWidth * 0.02, 0] as [number, number],
          maximum: [faceWidth * 0.02, 0] as [number, number],
        })),
        triangles: [0, 1, 2, 1, 3, 2],
      };
    }),
  };
  p.split.rigSignature = rigSignature(p);
  p.provenance = {
    preparation:
      'Imported PNG parts with confirmed positions and roles; authored expression alternatives only',
    limitations: [
      'Small planar head motion; no hidden artwork reconstruction or live tracking',
      ...issues(d)
        .filter((v) => v.level === 'warning')
        .map((v) => v.code),
    ],
  };
  assertProject(p);
  return p;
}
export function draftFromProject(p: Project): SplitDraft {
  if (!p.split) throw new Error('E_SPLIT_SOURCE');
  if (
    p.detail?.baselines.some((b) => {
      const current = p.parts.find((v) => v.id === b.part.id);
      return !current || JSON.stringify(current.textures) !== JSON.stringify(b.part.textures);
    })
  )
    throw new Error('E_SPLIT_DETAIL_SOURCE');
  const d = structuredClone(p.split.draft);
  d.id = randomUUID();
  d.canvas = { ...p.canvas };
  for (const l of d.layers) {
    const part = p.parts.find((v) => v.id === l.id);
    if (!part) throw new Error('E_SPLIT_REFERENCE');
    let matrix = partWorldTransform(p, l.id);
    if (matrix.slice(0, 4).some((v, i) => Math.abs(v - [1, 0, 0, 1][i]!) > 1e-8))
      throw new Error('E_SPLIT_TRANSFORM');
    if (l.usage === 'alternative' && l.variantOf) {
      const target = p.parts.find((v) => v.id === l.variantOf);
      const texture = target?.textures.find((t) => t.state === l.state);
      if (!target || !texture) throw new Error('E_SPLIT_REFERENCE');
      if (texture.assetToLocal.slice(0, 4).some((v, i) => Math.abs(v - [1, 0, 0, 1][i]!) > 1e-8))
        throw new Error('E_SPLIT_TRANSFORM');
      matrix = partWorldTransform(p, target.id);
      const q = transform(matrix, { x: texture.assetToLocal[4], y: texture.assetToLocal[5] });
      l.origin = [q.x, q.y];
    } else l.origin = [matrix[4], matrix[5]];
    l.name = part.displayName;
    l.role = part.role;
    l.side = part.side;
    l.parentId = part.parentId;
    l.groupId = part.groupId;
    l.opacity = part.opacity;
    l.visible = part.visible;
    l.z = part.drawOrder;
  }
  d.groups = p.groups.map((g) => ({
    id: g.id,
    name: g.displayName,
    parentGroupId: g.parentGroupId,
    visible: g.visible,
    opacity: g.opacity ?? 1,
  }));
  configuration(d);
  if (issues(d).some((v) => v.level === 'block')) throw new Error('E_SPLIT_DETAIL_SOURCE');
  return d;
}
