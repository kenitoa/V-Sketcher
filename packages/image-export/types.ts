import type { Parameters, PreviewScene } from '../scene-core';
import type { InputBasis } from '../execution/changes';
export interface ImageSettings {
  format: 'png';
  width: number;
  height: number;
  transparent: boolean;
  background: string;
  scale: number;
  x: number;
  y: number;
  crop: { left: number; right: number; top: number; bottom: number };
  pose: 'neutral' | 'expression' | 'live';
  expressionId: string | null;
}
export const defaultImageSettings = (width = 1024, height = 1024): ImageSettings => ({
  format: 'png',
  width,
  height,
  transparent: true,
  background: '#f5f2ed',
  scale: 1,
  x: 0,
  y: 0,
  crop: { left: 0, right: 0, top: 0, bottom: 0 },
  pose: 'neutral',
  expressionId: null,
});
export function assertImageSettings(value: unknown): asserts value is ImageSettings {
  const v = value as ImageSettings;
  if (
    !v ||
    Object.keys(v).sort().join(',') !==
      'background,crop,expressionId,format,height,pose,scale,transparent,width,x,y' ||
    v.format !== 'png' ||
    ![v.width, v.height].every((n) => Number.isInteger(n) && n >= 64 && n <= 4096) ||
    v.width * v.height > 16777216 ||
    typeof v.transparent !== 'boolean' ||
    !/^#[a-f0-9]{6}$/i.test(v.background) ||
    !Number.isFinite(v.scale) ||
    v.scale < 0.1 ||
    v.scale > 3 ||
    ![v.x, v.y].every((n) => Number.isFinite(n) && Math.abs(n) <= 1) ||
    !v.crop ||
    Object.keys(v.crop).sort().join(',') !== 'bottom,left,right,top' ||
    !Object.values(v.crop).every((n) => Number.isFinite(n) && n >= 0 && n <= 0.45) ||
    v.crop.left + v.crop.right >= 0.9 ||
    v.crop.top + v.crop.bottom >= 0.9 ||
    !['neutral', 'expression', 'live'].includes(v.pose) ||
    (v.expressionId !== null &&
      (typeof v.expressionId !== 'string' ||
        !/^[A-Za-z0-9][A-Za-z0-9_.:-]{0,99}$/.test(v.expressionId))) ||
    (v.pose === 'expression' && !v.expressionId) ||
    (v.pose !== 'expression' && v.expressionId !== null)
  )
    throw new Error('E_IMAGE_SETTINGS');
}
export interface ImageRequest {
  id: string;
  source: 'working' | 'execution';
  projectId: string;
  revision: number;
  settings: ImageSettings;
  live: Parameters | null;
}
export interface ImageTicket {
  id: string;
  basis: InputBasis;
  settings: ImageSettings;
  url: string;
  bytes: number;
  sha256: string;
}
export interface ImageRenderInput {
  scene: PreviewScene;
  settings: ImageSettings;
  parameters: Parameters;
}
export interface ImageReply {
  ok: boolean;
  ticket?: ImageTicket;
  errorCode?: string;
  cancelled?: boolean;
  receipt?: { name: string; bytes: number; sha256: string; basis: InputBasis };
}
export interface ImageAPI {
  prepare: (value: ImageRequest) => Promise<ImageReply>;
  save: (id: string) => Promise<ImageReply>;
  release: (id: string) => Promise<void>;
}
