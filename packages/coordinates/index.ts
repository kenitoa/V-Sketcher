/** Pixel-corner coordinates, x right/y down; A*B applies B first. No device or renderer state. */
export type Affine = [number, number, number, number, number, number];
export interface Point {
  x: number;
  y: number;
}
export interface Rect extends Point {
  width: number;
  height: number;
}
export const IDENTITY: Affine = [1, 0, 0, 1, 0, 0];
export function multiply(a: Affine, b: Affine): Affine {
  const [aa, ab, ac, ad, ae, af] = a;
  const [ba, bb, bc, bd, be, bf] = b;
  return [
    aa * ba + ac * bb,
    ab * ba + ad * bb,
    aa * bc + ac * bd,
    ab * bc + ad * bd,
    aa * be + ac * bf + ae,
    ab * be + ad * bf + af,
  ];
}
export function inverse(m: Affine): Affine {
  if (m.length !== 6 || m.some((v) => !Number.isFinite(v))) throw new Error('E_COORDINATE_MATRIX');
  const [a, b, c, d, e, f] = m;
  const determinant = a * d - b * c;
  if (Math.abs(determinant) <= Number.EPSILON * Math.max(1, Math.abs(a * d), Math.abs(b * c)))
    throw new Error('E_COORDINATE_SINGULAR');
  const result: Affine = [
    d / determinant,
    -b / determinant,
    -c / determinant,
    a / determinant,
    (c * f - d * e) / determinant,
    (b * e - a * f) / determinant,
  ];
  if (result.some((v) => !Number.isFinite(v))) throw new Error('E_COORDINATE_MATRIX');
  return result;
}
export function transform(m: Affine, p: Point): Point {
  if (![...m, p.x, p.y].every(Number.isFinite)) throw new Error('E_COORDINATE_NONFINITE');
  const result = { x: m[0] * p.x + m[2] * p.y + m[4], y: m[1] * p.x + m[3] * p.y + m[5] };
  if (!Number.isFinite(result.x) || !Number.isFinite(result.y))
    throw new Error('E_COORDINATE_NONFINITE');
  return result;
}
export const translate = (x: number, y: number): Affine => [1, 0, 0, 1, x, y];
export const scale = (x: number, y = x): Affine => [x, 0, 0, y, 0, 0];
export function rotate(degrees: number): Affine {
  const radians = (degrees * Math.PI) / 180;
  const c = Math.cos(radians);
  const s = Math.sin(radians);
  return [c, s, -s, c, 0, 0];
}
export function validRect(rect: Rect): boolean {
  return Object.values(rect).every(Number.isFinite) && rect.width > 0 && rect.height > 0;
}
export function fitRect(
  source: Rect,
  destination: Rect,
  mode: 'contain' | 'cover' = 'contain',
): Affine {
  if (!validRect(source) || !validRect(destination)) throw new Error('E_COORDINATE_RECT');
  const factor = (mode === 'contain' ? Math.min : Math.max)(
    destination.width / source.width,
    destination.height / source.height,
  );
  return multiply(
    translate(
      destination.x + (destination.width - source.width * factor) / 2,
      destination.y + (destination.height - source.height * factor) / 2,
    ),
    multiply(scale(factor), translate(-source.x, -source.y)),
  );
}
export function viewport(
  canvas: Rect,
  width: number,
  height: number,
  zoom: number,
  pan: Point,
  mirror = false,
): Affine {
  if (!Number.isFinite(zoom) || zoom <= 0 || zoom > 100) throw new Error('E_COORDINATE_ZOOM');
  const fit = fitRect(canvas, { x: 0, y: 0, width, height });
  const view = multiply(
    translate(width / 2 + pan.x, height / 2 + pan.y),
    multiply(scale(zoom), translate(-width / 2, -height / 2)),
  );
  const reflected = mirror
    ? multiply(translate(2 * canvas.x + canvas.width, 0), scale(-1, 1))
    : IDENTITY;
  const result = multiply(view, multiply(fit, reflected));
  inverse(result);
  return result;
}
export type CoordinateSpace = 'source' | 'edited' | 'local' | 'project' | 'screen' | 'output';
export class CoordinateMap {
  private maps: Record<CoordinateSpace, Affine>;
  constructor(
    sourceToEdited: Affine,
    editedToLocal: Affine,
    localToProject: Affine,
    projectToScreen: Affine,
    projectToOutput: Affine,
  ) {
    const sourceToLocal = multiply(editedToLocal, sourceToEdited);
    const sourceToProject = multiply(localToProject, sourceToLocal);
    this.maps = {
      source: [...IDENTITY],
      edited: [...sourceToEdited],
      local: sourceToLocal,
      project: sourceToProject,
      screen: multiply(projectToScreen, sourceToProject),
      output: multiply(projectToOutput, sourceToProject),
    };
    for (const matrix of Object.values(this.maps)) inverse(matrix);
  }
  matrix(from: CoordinateSpace, to: CoordinateSpace): Affine {
    return multiply(this.maps[to], inverse(this.maps[from]));
  }
  convert(point: Point, from: CoordinateSpace, to: CoordinateSpace): Point {
    return transform(this.matrix(from, to), point);
  }
}
