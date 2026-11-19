import { randomUUID } from 'node:crypto';
import { assertProject, type Project, type CharacterPart, type MotionMesh } from '../project-model';
import { partWorldTransform } from '../project-model/geometry';
import { inverse, multiply } from '../coordinates';
import { authorRig, capabilities } from '../motion';
import {
  assertOperation,
  assertLocation,
  type DetailOperation,
  type DetailLocation,
  type DetailImpact,
} from './types';
const equal = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const groupShape = (g: Project['groups'][number] | undefined) =>
  g ? { ...g, displayName: '', opacity: g.opacity ?? 1 } : null;
const part = (p: Project, id: string) => {
  const v = p.parts.find((v) => v.id === id);
  if (!v) throw new Error('E_DETAIL_PART');
  return v;
};
const mesh = (p: Project, id: string) => p.motion?.meshes.find((m) => m.partId === id) ?? null;
const bindings = (p: Project, id: string) => p.partBindings.filter((b) => b.partId === id);
const structural = (v: CharacterPart) => {
  const c = structuredClone(v);
  delete (c as Partial<CharacterPart>).displayName;
  delete (c as Partial<CharacterPart>).opacity;
  delete (c as Partial<CharacterPart>).visible;
  return c;
};
export function protectedIds(p: Project): string[] {
  const ids =
    p.detail?.baselines
      .filter((b) => {
        const current = p.parts.find((v) => v.id === b.part.id);
        return (
          !current ||
          !equal(structural(current), structural(b.part)) ||
          !equal(mesh(p, b.part.id), b.mesh) ||
          !equal(bindings(p, b.part.id), b.bindings)
        );
      })
      .map((b) => b.part.id) ?? [];
  for (const group of p.detail?.groups ?? [])
    if (!equal(groupShape(group), groupShape(p.groups.find((g) => g.id === group.id))))
      ids.push(...groupMembers(p, group.id));
  return [...new Set(ids)];
}
function groupMembers(p: Project, id: string): string[] {
  const groups = new Set([id]);
  for (let pass = 0; pass < 128; pass++) {
    const n = groups.size;
    for (const g of p.groups) if (g.parentGroupId && groups.has(g.parentGroupId)) groups.add(g.id);
    if (n === groups.size) break;
  }
  return p.parts.filter((v) => v.groupId && groups.has(v.groupId)).map((v) => v.id);
}
export function assertSimpleSafe(p: Project): void {
  if (protectedIds(p).length || p.detail?.groups.length) throw new Error('E_DETAIL_PROTECTED');
}
export function resolveLocation(
  p: Project,
  location: DetailLocation,
): { partId: string | null; parameterId: string | null } {
  assertLocation(location);
  let partId: string | null = null,
    parameterId: string | null = null;
  if (location.kind === 'part' || location.kind === 'vertex') {
    partId = location.id;
    part(p, partId);
    if (location.kind === 'vertex' && !mesh(p, partId)?.vertices[location.index])
      throw new Error('E_DETAIL_LOCATION');
  } else if (location.kind === 'parameter') {
    if (!p.parameters.some((v) => v.id === location.id)) throw new Error('E_DETAIL_LOCATION');
    parameterId = location.id;
    partId =
      p.partBindings.find((b) => b.parameterId === location.id)?.partId ??
      p.motion?.meshes.find(
        (m) => m.yawParameterId === location.id || m.rollParameterId === location.id,
      )?.partId ??
      null;
  } else if (location.kind === 'binding') {
    const b = p.partBindings.find((b) => b.id === location.id);
    if (!b) throw new Error('E_DETAIL_LOCATION');
    partId = b.partId;
    parameterId = b.parameterId;
  } else {
    if (!p.groups.some((v) => v.id === location.id)) throw new Error('E_DETAIL_LOCATION');
    partId = p.parts.find((v) => v.groupId === location.id)?.id ?? null;
  }
  return { partId, parameterId };
}
function remember(p: Project, id: string) {
  p.detail ??= {
    version: 1,
    partOrder: p.parts.map((v) => v.id),
    meshOrder: p.motion?.meshes.map((v) => v.partId) ?? [],
    baselines: [],
    groups: [],
  };
  if (!p.detail.baselines.some((b) => b.part.id === id)) {
    const v = part(p, id);
    p.detail.baselines.push({
      part: structuredClone(v),
      partIndex: Math.max(0, p.detail.partOrder.indexOf(id)),
      mesh: structuredClone(mesh(p, id)),
      meshIndex: Math.max(0, p.detail.meshOrder.indexOf(id)),
      bindings: structuredClone(bindings(p, id)),
    });
  }
}
function ensureMesh(p: Project, id: string): MotionMesh {
  let m = mesh(p, id);
  if (!m) {
    const rig = authorRig(p),
      prepared = rig.meshes.find((m) => m.partId === id);
    if (!prepared) throw new Error('E_DETAIL_MESH');
    if (!p.motion) {
      rig.meshes = [prepared];
      p.motion = rig;
    } else {
      const ratio = p.motion.faceWidth / rig.faceWidth;
      for (const v of prepared.vertices) {
        v.minimum = [v.minimum[0] * ratio, v.minimum[1] * ratio];
        v.maximum = [v.maximum[0] * ratio, v.maximum[1] * ratio];
      }
      p.motion.meshes.push(prepared);
    }
    m = mesh(p, id)!;
  }
  return m;
}
export function propose(
  input: Project,
  operation: DetailOperation,
): { project: Project; impact: DetailImpact } {
  assertProject(input);
  assertOperation(operation);
  const p = structuredClone(input),
    op = structuredClone(operation),
    id = op.kind === 'group' || op.kind === 'restore-group' ? null : op.partId;
  const initial = id ? input.parts.find((v) => v.id === id) : null;
  const childIds = id ? input.parts.filter((v) => v.parentId === id).map((v) => v.id) : [];
  if (op.kind !== 'group' && op.kind !== 'restore-group') {
    if (op.kind !== 'restore' || initial) part(p, op.partId);
    if (initial) remember(p, op.partId);
  }
  p.schemaVersion.minor = Math.max(7, p.schemaVersion.minor);
  if (op.kind === 'part') {
    const v = part(p, op.partId),
      world = partWorldTransform(p, v.id);
    if (op.parentId !== v.parentId) {
      if (op.parentId) part(p, op.parentId);
      v.localTransform = op.parentId
        ? multiply(inverse(partWorldTransform(p, op.parentId)), world)
        : world;
    }
    Object.assign(v, {
      displayName: op.name.trim(),
      role: op.role,
      side: op.side,
      parentId: op.parentId,
      groupId: op.groupId,
      drawOrder: op.order,
      visible: op.visible,
      opacity: op.opacity,
    });
    if (op.parentId === initial!.parentId) {
      v.localTransform[4] = op.x;
      v.localTransform[5] = op.y;
    } // Reparent preserves the visible world pose, including affine ancestors.
  } else if (op.kind === 'group') {
    const g = op.id ? p.groups.find((g) => g.id === op.id) : null;
    if (op.id && !g) throw new Error('E_DETAIL_GROUP');
    if (g) {
      p.detail ??= {
        version: 1,
        partOrder: p.parts.map((v) => v.id),
        meshOrder: p.motion?.meshes.map((v) => v.partId) ?? [],
        baselines: [],
        groups: [],
      };
      if (!p.detail.groups.some((v) => v.id === g.id)) p.detail.groups.push(structuredClone(g));
    }
    if (g)
      Object.assign(g, {
        displayName: op.name.trim(),
        parentGroupId: op.parentId,
        visible: op.visible,
        opacity: op.opacity,
      });
    else
      p.groups.push({
        id: randomUUID(),
        displayName: op.name.trim(),
        parentGroupId: op.parentId,
        visible: op.visible,
        opacity: op.opacity,
      });
  } else if (op.kind === 'restore-group') {
    const g = p.detail?.groups.find((g) => g.id === op.id),
      index = p.groups.findIndex((g) => g.id === op.id);
    if (!g || index < 0) throw new Error('E_DETAIL_GROUP');
    p.groups[index] = structuredClone(g);
  } else if (op.kind === 'mesh')
    Object.assign(ensureMesh(p, op.partId), {
      pivot: op.pivot,
      curve: op.curve,
      yawParameterId: op.yawParameterId,
      rollParameterId: op.rollParameterId,
    });
  else if (op.kind === 'vertex') {
    const m = ensureMesh(p, op.partId),
      v = m.vertices[op.index];
    if (!v) throw new Error('E_DETAIL_VERTEX');
    Object.assign(v, {
      position: op.position,
      weight: op.weight,
      minimum: op.minimum,
      maximum: op.maximum,
    });
  } else if (op.kind === 'influence') {
    const m = ensureMesh(p, op.partId);
    if (op.yawDelta > p.motion!.faceWidth * 0.045) throw new Error('E_MOTION_RANGE');
    for (const v of m.vertices) {
      const t = Math.max(
          0,
          1 - Math.hypot(v.position[0] - op.center[0], v.position[1] - op.center[1]) / op.radius,
        ),
        weight = t * t * (3 - 2 * t) * op.strength;
      v.weight = weight;
      v.minimum = [-op.yawDelta * weight, 0];
      v.maximum = [op.yawDelta * weight, 0];
    }
  } else if (op.kind === 'binding') {
    const b = op.binding,
      param = p.parameters.find((v) => v.id === b.parameterId);
    if (!param?.previewKey) throw new Error('E_DETAIL_PARAMETER');
    const old = p.partBindings.find((v) => v.id === b.id);
    if (old && old.partId !== op.partId) throw new Error('E_DETAIL_BINDING');
    p.partBindings = p.partBindings.filter((v) => v.id !== b.id);
    p.partBindings.push(b);
  } else if (op.kind === 'unbind') {
    if (!p.partBindings.some((v) => v.id === op.bindingId && v.partId === op.partId))
      throw new Error('E_DETAIL_BINDING');
    p.partBindings = p.partBindings.filter((v) => v.id !== op.bindingId);
  } else if (op.kind === 'texture') {
    const v = part(p, op.partId),
      t = v.textures.find((t) => t.state === op.state),
      a = p.assets.find((a) => a.id === op.assetId);
    if (!t || !a) throw new Error('E_DETAIL_TEXTURE');
    t.assetId = a.id;
    t.assetVersion = a.version;
  } else if (op.kind === 'delete') {
    for (const child of p.parts.filter((v) => v.parentId === op.partId)) {
      remember(p, child.id);
      child.localTransform = partWorldTransform(p, child.id);
      child.parentId = null;
    }
    p.parts = p.parts.filter((v) => v.id !== op.partId);
    p.partBindings = p.partBindings.filter((v) => v.partId !== op.partId);
    if (p.motion) p.motion.meshes = p.motion.meshes.filter((m) => m.partId !== op.partId);
  } else if (op.kind === 'restore') {
    const baseline = p.detail?.baselines.find((b) => b.part.id === op.partId);
    if (!baseline) throw new Error('E_DETAIL_BASELINE');
    const current = p.parts.find((v) => v.id === op.partId);
    if (!current && op.scope !== 'all') throw new Error('E_DETAIL_PART');
    if (op.scope === 'all') {
      p.parts = p.parts.filter((v) => v.id !== op.partId);
      p.parts.splice(
        Math.min(baseline.partIndex, p.parts.length),
        0,
        structuredClone(baseline.part),
      );
    } else if (op.scope === 'structure') {
      for (const key of [
        'role',
        'side',
        'parentId',
        'groupId',
        'drawOrder',
        'localTransform',
      ] as const)
        (current as unknown as Record<string, unknown>)[key] = structuredClone(baseline.part[key]);
    } else if (op.scope === 'textures') current!.textures = structuredClone(baseline.part.textures);
    if (op.scope === 'all' || op.scope === 'mesh') {
      if (p.motion) {
        p.motion.meshes = p.motion.meshes.filter((m) => m.partId !== op.partId);
        if (baseline.mesh)
          p.motion.meshes.splice(
            Math.min(baseline.meshIndex, p.motion.meshes.length),
            0,
            structuredClone(baseline.mesh),
          );
      } else if (baseline.mesh) throw new Error('E_DETAIL_MESH');
    }
    if (op.scope === 'all' || op.scope === 'bindings') {
      p.partBindings = p.partBindings.filter((v) => v.partId !== op.partId);
      p.partBindings.push(...structuredClone(baseline.bindings));
    }
    const rank = (order: string[], id: string) => {
      const index = order.indexOf(id);
      return index < 0 ? order.length : index;
    };
    p.parts.sort((a, b) => rank(p.detail!.partOrder, a.id) - rank(p.detail!.partOrder, b.id));
    p.motion?.meshes.sort(
      (a, b) => rank(p.detail!.meshOrder, a.partId) - rank(p.detail!.meshOrder, b.partId),
    );
  }
  if (p.detail) {
    const kept = new Set(protectedIds(p));
    p.detail.baselines = p.detail.baselines.filter((b) => kept.has(b.part.id));
    p.detail.groups = p.detail.groups.filter(
      (g) => !equal(groupShape(g), groupShape(p.groups.find((v) => v.id === g.id))),
    );
    if (!p.detail.baselines.length && !p.detail.groups.length) delete p.detail;
  }
  assertProject(p);
  const presentationOnly =
    (op.kind === 'part' &&
      !!initial &&
      equal({ ...initial, displayName: '' }, { ...part(p, op.partId), displayName: '' })) ||
    (op.kind === 'group' &&
      op.id !== null &&
      equal(
        groupShape(input.groups.find((g) => g.id === op.id)),
        groupShape(p.groups.find((g) => g.id === op.id)),
      ));
  const affected = new Set<string>(
    id
      ? [id]
      : op.kind === 'group' || op.kind === 'restore-group'
        ? groupMembers(p, op.id ?? '')
        : [],
  );
  const propagate =
    (op.kind === 'part' && !presentationOnly) ||
    op.kind === 'delete' ||
    op.kind === 'group' ||
    op.kind === 'restore-group' ||
    (op.kind === 'binding' && op.binding.kind === 'transform') ||
    (op.kind === 'unbind' &&
      input.partBindings.find((b) => b.id === op.bindingId)?.kind === 'transform') ||
    (op.kind === 'restore' && ['all', 'structure', 'bindings'].includes(op.scope));
  let expanded = propagate;
  while (expanded) {
    expanded = false;
    for (const v of [...input.parts, ...p.parts])
      if (v.parentId && affected.has(v.parentId) && !affected.has(v.id)) {
        affected.add(v.id);
        expanded = true;
      }
  }
  const parameterIds = new Set<string>();
  for (const source of [input, p]) {
    for (const b of source.partBindings)
      if (affected.has(b.partId)) parameterIds.add(b.parameterId);
    for (const m of source.motion?.meshes ?? [])
      if (affected.has(m.partId))
        for (const key of [m.yawParameterId, m.rollParameterId]) if (key) parameterIds.add(key);
  }
  const used = new Set(
    capabilities(p)
      .filter((c) => c.supported && c.parameter)
      .map((c) => c.parameter!.id),
  );
  const warnings: string[] = [];
  if (op.kind === 'delete')
    warnings.push('CHILDREN_REPARENTED_WORLD_PRESERVED', 'PARAMETERS_AND_EXPRESSIONS_RETAINED');
  if (op.kind === 'texture') warnings.push('TEXTURE_SIZE_AND_AUTHORED_STATES_RECHECK');
  if (op.kind === 'influence') warnings.push('SELECTED_MESH_WEIGHTS_AND_YAW_DELTAS_REPLACED');
  if (!presentationOnly) warnings.push('RUNTIME_AND_EXTERNAL_CONVERSION_NOT_VALIDATED');
  const impact: DetailImpact = {
    kind: op.kind,
    presentationOnly,
    partIds: [...affected],
    childIds: propagate ? childIds : [],
    parameterIds: [...parameterIds],
    expressionIds: input.expressions
      .filter((e) => e.values.some((v) => parameterIds.has(v.parameterId)))
      .map((e) => e.id),
    inputBindingIds: input.inputBindings
      .filter((b) => parameterIds.has(b.parameterId))
      .map((b) => b.id),
    exportProfileIds: input.exportProfiles
      .filter((e) => e.parameterMap.some((v) => parameterIds.has(v.parameterId)))
      .map((e) => e.id),
    disconnectedParameterIds: [...parameterIds].filter((v) => !used.has(v)),
    checks: presentationOnly
      ? ['export-names']
      : ['references', 'preview', 'motion', 'runtime', 'compatibility', 'export'],
    warnings,
  };
  return { project: p, impact };
}
