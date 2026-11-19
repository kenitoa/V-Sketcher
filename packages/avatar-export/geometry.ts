import { NEUTRAL, type PreviewLayer, type Parameters } from '../scene-core';
import { deformPoint } from '../motion/geometry';
import { inverse, transform } from '../coordinates';
export const SAMPLE_COUNT = 65;
export const AXIS = Array.from({ length: SAMPLE_COUNT }, (_, i) => i / (SAMPLE_COUNT - 1));
export function points(layer: PreviewLayer) {
  return (
    layer.mesh?.vertices ??
    (() => {
      const path = Object.values(layer.states)[0]!,
        g = layer.geometry![path]!,
        r = g.crop;
      return [
        [r.x, r.y],
        [r.x + r.width, r.y],
        [r.x + r.width, r.y + r.height],
        [r.x, r.y + r.height],
      ].map(([x, y]) => {
        const p = transform(g.matrix, { x: x!, y: y! });
        return {
          position: [p.x, p.y] as [number, number],
          weight: 0,
          minimum: [0, 0] as [number, number],
          maximum: [0, 0] as [number, number],
        };
      });
    })()
  );
}
export function evaluated(layer: PreviewLayer, input: Parameters) {
  return points(layer).map((v) =>
    deformPoint(
      layer,
      { x: v.position[0], y: v.position[1] },
      v.weight,
      { x: v.minimum[0], y: v.minimum[1] },
      { x: v.maximum[0], y: v.maximum[1] },
      input,
    ),
  );
}
export function uvs(
  layer: PreviewLayer,
  path: string,
  rect: { x: number; y: number; width: number; height: number },
) {
  const back = inverse(layer.geometry![path]!.matrix);
  return points(layer).flatMap((v) => {
    const p = transform(back, { x: v.position[0], y: v.position[1] });
    return [(p.x - rect.x) / rect.width, (p.y - rect.y) / rect.height];
  });
}
/** Detect cross terms that additive native deformation bindings cannot preserve. */
export function separabilityError(layer: PreviewLayer): number {
  const base = evaluated(layer, NEUTRAL);
  let error = 0;
  const keys = Object.keys(NEUTRAL) as (keyof Parameters)[];
  for (let a = 0; a < keys.length; a++)
    for (let b = a + 1; b < keys.length; b++)
      for (const x of [-1, -0.5, 0.5, 1])
        for (const y of [-1, -0.5, 0.5, 1]) {
          const ka = keys[a]!,
            kb = keys[b]!,
            va = ka.startsWith('head') ? x : (x + 1) / 2,
            vb = kb.startsWith('head') ? y : (y + 1) / 2,
            pa = evaluated(layer, { ...NEUTRAL, [ka]: va }),
            pb = evaluated(layer, { ...NEUTRAL, [kb]: vb }),
            both = evaluated(layer, { ...NEUTRAL, [ka]: va, [kb]: vb });
          for (let i = 0; i < base.length; i++)
            error = Math.max(
              error,
              Math.hypot(
                both[i]!.x - pa[i]!.x - pb[i]!.x + base[i]!.x,
                both[i]!.y - pa[i]!.y - pb[i]!.y + base[i]!.y,
              ),
            );
        }
  return error;
}
