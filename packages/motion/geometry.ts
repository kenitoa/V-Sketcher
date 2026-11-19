import {
  inverse,
  multiply,
  translate,
  rotate,
  scale,
  transform,
  IDENTITY,
  type Affine,
  type Point,
} from '../coordinates';
import type { PreviewLayer, Parameters } from '../scene-core';
export function dynamicMatrix(layer: PreviewLayer, input: Parameters): Affine {
  let result: Affine = [...IDENTITY];
  for (const t of layer.transforms ?? []) {
    const u = t.key.startsWith('head') ? (input[t.key] + 1) / 2 : input[t.key];
    let value = t.range[0] + (t.range[1] - t.range[0]) * u;
    const limit = t.component === 'rotate-degrees' ? 6 : t.component.startsWith('scale') ? 1.2 : 64;
    value = Math.max(t.component.startsWith('scale') ? 0.8 : -limit, Math.min(limit, value));
    const m =
      t.component === 'rotate-degrees'
        ? rotate(value)
        : t.component === 'translate-x'
          ? translate(value, 0)
          : t.component === 'translate-y'
            ? translate(0, value)
            : t.component === 'scale-x'
              ? scale(value, 1)
              : scale(1, value);
    const around = t.component.startsWith('translate')
      ? m
      : multiply(translate(...t.pivot), multiply(m, translate(-t.pivot[0], -t.pivot[1])));
    const world = t.basis ? multiply(t.basis, multiply(around, inverse(t.basis))) : around;
    result = multiply(world, result);
  }
  return result;
}
export function deformPoint(
  layer: PreviewLayer,
  p: Point,
  weight: number,
  min: Point,
  max: Point,
  input: Parameters,
): Point {
  const base = transform(dynamicMatrix(layer, input), p);
  const mesh = layer.mesh;
  if (!mesh) return base;
  const q = mesh.yaw ? input.head_yaw : 0;
  const raw = Math.abs(q);
  const amount = mesh.curve === 'smoothstep' ? raw * raw * (3 - 2 * raw) : raw;
  const delta = q < 0 ? min : max;
  const angle =
    (((mesh.roll ? input.head_roll : 0) * mesh.maxRollDegrees * Math.PI) / 180) * weight;
  const x = base.x - mesh.pivot[0];
  const y = base.y - mesh.pivot[1];
  return {
    x: mesh.pivot[0] + Math.cos(angle) * x - Math.sin(angle) * y + delta.x * amount,
    y: mesh.pivot[1] + Math.sin(angle) * x + Math.cos(angle) * y + delta.y * amount,
  };
}
export function barycentric(
  p: Point,
  a: Point,
  b: Point,
  c: Point,
): [number, number, number] | null {
  const d = (b.y - c.y) * (a.x - c.x) + (c.x - b.x) * (a.y - c.y);
  if (Math.abs(d) < 1e-9) return null;
  const u = ((b.y - c.y) * (p.x - c.x) + (c.x - b.x) * (p.y - c.y)) / d;
  const v = ((c.y - a.y) * (p.x - c.x) + (a.x - c.x) * (p.y - c.y)) / d;
  const w = 1 - u - v;
  return Math.min(u, v, w) >= -1e-6 ? [u, v, w] : null;
}
