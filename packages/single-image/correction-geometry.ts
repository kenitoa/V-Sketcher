import { inverse, transform, type Rect } from '../coordinates';
import type { Project } from '../project-model';
export function originalRegion(p: Project, r: Rect): Rect {
  const a = p.assets.find((a) => a.id === p.inputPreparation?.originalAssetId);
  if (!a) throw new Error('E_CORRECTION_SOURCE');
  const m = inverse(a.sourceToEdited);
  const points = [
    [r.x, r.y],
    [r.x + r.width, r.y],
    [r.x, r.y + r.height],
    [r.x + r.width, r.y + r.height],
  ].map(([x, y]) => transform(m, { x: x!, y: y! }));
  const x = Math.min(...points.map((p) => p.x)),
    y = Math.min(...points.map((p) => p.y));
  return {
    x,
    y,
    width: Math.max(...points.map((p) => p.x)) - x,
    height: Math.max(...points.map((p) => p.y)) - y,
  };
}
