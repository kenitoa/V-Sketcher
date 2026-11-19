import { createHash } from 'node:crypto';
import { decodePNG } from './png';
export const REPORT_EXTENSION = 'org.2dsketcher.export.v1';
export interface NativeBinding {
  node: number;
  param_name: string;
  values: unknown[][];
  isSet: boolean[][];
  interpolate_mode: 'Linear' | 'Nearest';
}
export interface NativeParameter {
  uuid: number;
  name: string;
  is_vec2: boolean;
  min: number[];
  max: number[];
  defaults: number[];
  axis_points: number[][];
  merge_mode: string;
  bindings: NativeBinding[];
}
export interface NativeNode {
  uuid: number;
  name: string;
  type: string;
  enabled: boolean;
  zsort: number;
  lockToRoot: boolean;
  transform: { translation: number[]; rotation: number[]; scale: number[] };
  children: NativeNode[];
  mesh?: { verts: number[]; uvs: number[]; indices: number[]; origin: number[] };
  textures?: number[];
  opacity?: number;
  blend_mode?: string;
  tint?: number[];
  screenTint?: number[];
  masks?: unknown[];
  mask_threshold?: number;
}
export interface NativeModel {
  meta: Record<string, unknown>;
  physics: { pixelsPerMeter: number; gravity: number };
  nodes: NativeNode;
  param: NativeParameter[];
  automation: unknown[];
  animations: Record<string, unknown>;
}
export const sha = (b: Buffer) => createHash('sha256').update(b).digest('hex');
function size(n: number) {
  const b = Buffer.alloc(4);
  b.writeUInt32BE(n);
  return b;
}
export function encodeINP(
  model: NativeModel,
  textures: Buffer[],
  extensions: Record<string, unknown>,
): Buffer {
  const json = Buffer.from(JSON.stringify(model)),
    entries = Object.entries(extensions);
  const bytes = Buffer.concat([
    Buffer.from('TRNSRTS\0'),
    size(json.length),
    json,
    Buffer.from('TEX_SECT'),
    size(textures.length),
    ...textures.flatMap((b) => [size(b.length), Buffer.from([0]), b]),
    Buffer.from('EXT_SECT'),
    size(entries.length),
    ...entries.flatMap(([name, value]) => {
      const n = Buffer.from(name),
        b = Buffer.from(JSON.stringify(value));
      return [size(n.length), n, size(b.length), b];
    }),
  ]);
  parseINP(bytes);
  return bytes;
}
/** Reopens the complete binary, validates texture CRC/decoding, graph and binding references. */
export function parseINP(bytes: Buffer) {
  if (bytes.length > 268435456 || bytes.toString('ascii', 0, 8) !== 'TRNSRTS\0')
    throw new Error('E_AVATAR_INP');
  let p = 8;
  const integer = () => {
    if (p + 4 > bytes.length) throw new Error('E_AVATAR_INP');
    const n = bytes.readUInt32BE(p);
    p += 4;
    return n;
  };
  const take = (n: number) => {
    if (n > 67108864 || p + n > bytes.length) throw new Error('E_AVATAR_INP');
    const b = bytes.subarray(p, p + n);
    p += n;
    return b;
  };
  const tag = (name: string) => {
    if (take(8).toString('ascii') !== name) throw new Error('E_AVATAR_INP');
  };
  const model = JSON.parse(take(integer()).toString('utf8')) as NativeModel;
  tag('TEX_SECT');
  const count = integer();
  if (!count || count > 512) throw new Error('E_AVATAR_INP');
  const textures: Buffer[] = [];
  let decoded = 0;
  for (let i = 0; i < count; i++) {
    const length = integer();
    if (take(1)[0] !== 0) throw new Error('E_AVATAR_INP');
    const b = take(length),
      image = decodePNG(b);
    decoded += image.width * image.height * 4;
    if (decoded > 268435456) throw new Error('E_AVATAR_BUDGET');
    textures.push(b);
  }
  tag('EXT_SECT');
  const ec = integer();
  if (ec > 8) throw new Error('E_AVATAR_INP');
  const extensions: Record<string, unknown> = {};
  for (let i = 0; i < ec; i++) {
    const name = take(integer()).toString('utf8');
    if (name in extensions) throw new Error('E_AVATAR_INP');
    extensions[name] = JSON.parse(take(integer()).toString('utf8'));
  }
  if (p !== bytes.length || !extensions[REPORT_EXTENSION]) throw new Error('E_AVATAR_INP');
  const nodes = new Map<number, NativeNode>();
  const visit = (n: NativeNode, depth: number) => {
    if (
      depth > 64 ||
      nodes.size > 4096 ||
      !Number.isSafeInteger(n.uuid) ||
      n.uuid <= 0 ||
      nodes.has(n.uuid) ||
      !Array.isArray(n.children)
    )
      throw new Error('E_AVATAR_GRAPH');
    nodes.set(n.uuid, n);
    if (n.type === 'Part') {
      const m = n.mesh!;
      if (
        !m ||
        m.verts.length % 2 ||
        m.uvs.length !== m.verts.length ||
        m.verts.length < 6 ||
        m.verts.length > 32768 ||
        m.indices.length % 3 ||
        m.indices.some((i) => !Number.isInteger(i) || i < 0 || i >= m.verts.length / 2) ||
        [...m.verts, ...m.uvs].some((v) => !Number.isFinite(v)) ||
        !n.textures ||
        n.textures[0]! >= textures.length
      )
        throw new Error('E_AVATAR_GRAPH');
    }
    for (const c of n.children) visit(c, depth + 1);
  };
  visit(model.nodes, 0);
  const ids = new Set<number>(),
    names = new Set<string>();
  if (!Array.isArray(model.param) || model.param.length > 128)
    throw new Error('E_AVATAR_PARAMETER');
  for (const v of model.param) {
    if (
      ids.has(v.uuid) ||
      nodes.has(v.uuid) ||
      !Number.isSafeInteger(v.uuid) ||
      v.uuid <= 0 ||
      typeof v.name !== 'string' ||
      names.has(v.name.toLowerCase()) ||
      v.is_vec2 ||
      v.min[0]! >= v.max[0]! ||
      v.defaults[0]! < v.min[0]! ||
      v.defaults[0]! > v.max[0]!
    )
      throw new Error('E_AVATAR_PARAMETER');
    ids.add(v.uuid);
    names.add(v.name.toLowerCase());
    const axis = v.axis_points[0]!;
    if (
      axis.length < 2 ||
      axis.length > 128 ||
      axis[0] !== 0 ||
      axis.at(-1) !== 1 ||
      axis.some((n, i) => !Number.isFinite(n) || (i > 0 && n <= axis[i - 1]!))
    )
      throw new Error('E_AVATAR_PARAMETER');
    for (const b of v.bindings) {
      const node = nodes.get(b.node);
      if (
        !node ||
        !['opacity', 'deform'].includes(b.param_name) ||
        !['Linear', 'Nearest'].includes(b.interpolate_mode) ||
        b.values.length !== axis.length ||
        b.isSet.length !== axis.length
      )
        throw new Error('E_AVATAR_BINDING');
      for (let i = 0; i < axis.length; i++) {
        if (b.values[i]!.length !== 1 || b.isSet[i]!.length !== 1 || b.isSet[i]![0] !== true)
          throw new Error('E_AVATAR_BINDING');
        const val = b.values[i]![0];
        if (b.param_name === 'opacity') {
          if (typeof val !== 'number' || !Number.isFinite(val) || val < 0 || val > 1)
            throw new Error('E_AVATAR_BINDING');
        } else {
          const a = val as number[][];
          if (
            !Array.isArray(a) ||
            a.length !== node.mesh!.verts.length / 2 ||
            a.some((v) => !Array.isArray(v) || v.length !== 2 || v.some((n) => !Number.isFinite(n)))
          )
            throw new Error('E_AVATAR_BINDING');
        }
      }
    }
  }
  return { model, textures, extensions, nodes, decodedBytes: decoded };
}
