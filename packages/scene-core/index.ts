export const NEUTRAL = { eye_left: 1, eye_right: 1, mouth: 0, head_yaw: 0, head_roll: 0 };
export type Parameters = typeof NEUTRAL;
import { inverse, validRect, type Affine, type Rect } from '../coordinates';
export interface SceneMesh { pivot:[number,number]; vertices:{ position:[number,number];weight:number;minimum:[number,number];maximum:[number,number] }[];triangles:number[];yaw:boolean;roll:boolean;maxRollDegrees:number;curve:'linear' | 'smoothstep'; }
export interface PreviewLayer { color?:import('../parts-library/types').ColorAdjustment; id: string; z: number; origin: [number, number]; opacity: number; bind: keyof Parameters | null; states: Record<string, string>; geometry?: Record<string,{ matrix:Affine; crop:Rect }>; mesh?:SceneMesh; transforms?:{ key:keyof Parameters;component:string;range:[number,number];pivot:[number,number];basis?:Affine }[]; }
export interface PreviewScene { version: 1; name: string; canvas: [number, number]; layers: PreviewLayer[]; defaults?:Parameters; model?: { projectId:string; revision:number; sourceType:string; schemaVersion:string }; }
export function parameters(input: Partial<Parameters>): Parameters {
  const result = { ...NEUTRAL };
  for (const key of Object.keys(input) as (keyof Parameters)[]) {
    if (!(key in NEUTRAL)) throw new Error('E_PARAMETER_UNKNOWN');
    const value = input[key];
    if (typeof value !== 'number' || !Number.isFinite(value)) throw new Error('E_PARAMETER_INVALID');
    result[key] = Math.max(key.startsWith('head') ? -1 : 0, Math.min(1, value));
  }
  return result;
}
export function validateScene(scene: PreviewScene): void {
  if (scene.version !== 1 || scene.canvas.length !== 2 || scene.canvas.some(v => !Number.isInteger(v) || v < 1 || v > 4096) || scene.layers.length > 64) throw new Error('E_SCENE_INVALID');
  if (scene.defaults) parameters(scene.defaults);
  const ids = new Set<string>();
  for (const layer of scene.layers) {
    if (ids.has(layer.id) || !layer.id || layer.origin.some(v => !Number.isFinite(v)) || !Number.isFinite(layer.z) || !Number.isFinite(layer.opacity) || layer.opacity < 0 || layer.opacity > 1) throw new Error('E_SCENE_REFERENCE');
    if (layer.bind !== null && !(layer.bind in NEUTRAL)) throw new Error('E_SCENE_BINDING');
    if (Object.values(layer.states).some(v => !/^assets\/[a-zA-Z0-9./_-]+\.(png|jpe?g)(\?asset=[A-Za-z0-9_-]{1,64})?$/.test(v) || v.includes('..'))) throw new Error('E_ASSET_REFERENCE');
    if (layer.geometry) for (const [path,geometry] of Object.entries(layer.geometry)) {
      if (!Object.values(layer.states).includes(path) || !validRect(geometry.crop) || geometry.crop.x < 0 || geometry.crop.y < 0) throw new Error('E_ASSET_GEOMETRY');
      inverse(geometry.matrix);
    }
    if (layer.color && (![layer.color.hueDegrees,layer.color.minimumHue,layer.color.maximumHue,layer.color.minimumSaturation].every(Number.isFinite)||Math.abs(layer.color.hueDegrees)>18||[layer.color.minimumHue,layer.color.maximumHue,layer.color.minimumSaturation].some(v=>v<0||v>1)))throw new Error('E_SCENE_COLOR');
    if (layer.mesh) { const m = layer.mesh; if (m.vertices.length<3 || m.vertices.length>1024 || m.triangles.length%3 || m.triangles.length>6144 || m.triangles.some(i => !Number.isInteger(i) || i<0 || i>=m.vertices.length) || m.pivot.some(v => !Number.isFinite(v)) || !Number.isFinite(m.maxRollDegrees) || m.maxRollDegrees<0 || m.maxRollDegrees>6 || m.vertices.some(v => ![...v.position,...v.minimum,...v.maximum,v.weight].every(Number.isFinite) || v.weight<0 || v.weight>1)) throw new Error('E_SCENE_MESH'); }
    for (const t of layer.transforms ?? []) { if (!(t.key in NEUTRAL) || !['rotate-degrees','translate-x','translate-y','scale-x','scale-y'].includes(t.component) || t.range.length!==2 || ![...t.range,...t.pivot,t.range[1]-t.range[0]].every(Number.isFinite)) throw new Error('E_SCENE_MOTION'); if (t.basis) inverse(t.basis); }
    ids.add(layer.id);
  }
}
