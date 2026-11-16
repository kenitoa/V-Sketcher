export const NEUTRAL = { eye_left: 1, eye_right: 1, mouth: 0, head_yaw: 0, head_roll: 0 };
export type Parameters = typeof NEUTRAL;
export interface PreviewLayer { id: string; z: number; origin: [number, number]; opacity: number; bind: keyof Parameters | null; states: Record<string, string>; }
export interface PreviewScene { version: 1; name: string; canvas: [number, number]; layers: PreviewLayer[]; }
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
  const ids = new Set<string>();
  for (const layer of scene.layers) {
    if (ids.has(layer.id) || !layer.id || layer.origin.some(v => !Number.isFinite(v)) || !Number.isFinite(layer.z) || !Number.isFinite(layer.opacity) || layer.opacity < 0 || layer.opacity > 1) throw new Error('E_SCENE_REFERENCE');
    if (layer.bind !== null && !(layer.bind in NEUTRAL)) throw new Error('E_SCENE_BINDING');
    if (Object.values(layer.states).some(v => !/^assets\/[a-zA-Z0-9./_-]+\.png$/.test(v) || v.includes('..'))) throw new Error('E_ASSET_REFERENCE');
    ids.add(layer.id);
  }
}
