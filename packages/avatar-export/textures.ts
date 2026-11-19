import { createHash } from 'node:crypto';
import { activeTextures } from '../editor-view';
import { NEUTRAL, type PreviewLayer } from '../scene-core';
import { AXIS } from './geometry';
import { encodePNG, type Pixels } from './png';
export interface BakedTexture {
  bytes: Buffer;
  sha256: string;
  rect: { x: number; y: number; width: number; height: number };
  path: string;
  sample: number | null;
}
function shiftHue(
  r: number,
  g: number,
  b: number,
  color: NonNullable<PreviewLayer['color']>,
): number[] {
  const hi = Math.max(r, g, b),
    lo = Math.min(r, g, b),
    d = hi - lo;
  let h = d < 0.00001 ? 0 : hi === r ? (g - b) / d : hi === g ? 2 + (b - r) / d : 4 + (r - g) / d;
  h = (h / 6 + 1) % 1;
  const s = hi > 0.00001 ? d / hi : 0;
  const inside =
    color.minimumHue <= color.maximumHue
      ? h >= color.minimumHue && h <= color.maximumHue
      : h >= color.minimumHue || h <= color.maximumHue;
  if (!inside || s < color.minimumSaturation) return [r, g, b];
  h = (h + color.hueDegrees / 360 + 1) % 1;
  const q = [0, 2 / 3, 1 / 3].map((offset) =>
    Math.max(0, Math.min(1, Math.abs(((h + offset) % 1) * 6 - 3) - 1)),
  );
  return q.map((v) => hi * (1 - s + s * v));
}
export async function bakeLayer(
  layer: PreviewLayer,
  images: Map<string, Pixels>,
  signal?: AbortSignal,
): Promise<BakedTexture[]> {
  const paths =
      layer.bind && layer.states.closed && layer.states.open
        ? [
            layer.states.closed,
            ...(layer.states.middle ? [layer.states.middle] : []),
            layer.states.open,
          ]
        : Object.values(layer.states),
    first = paths[0]!,
    source = images.get(first)!;
  if (!source) throw new Error('E_AVATAR_TEXTURE');
  if (
    layer.stateBlend === 'interpolate' &&
    paths.some((p) => {
      const i = images.get(p);
      return (
        !i ||
        i.width !== source.width ||
        i.height !== source.height ||
        JSON.stringify(layer.geometry?.[p]) !== JSON.stringify(layer.geometry?.[first])
      );
    })
  )
    throw new Error('E_AVATAR_STATE_GEOMETRY');
  const variants =
    layer.stateBlend === 'interpolate'
      ? AXIS.map((sample) => ({ path: first, sample }))
      : paths.map((path) => ({ path, sample: null }));
  const bounds = new Map<string, { x0: number; y0: number; x1: number; y1: number }>();
  for (const path of paths) {
    const pixels = images.get(path)!,
      crop = layer.geometry![path]!.crop;
    let x0 = pixels.width,
      y0 = pixels.height,
      x1 = -1,
      y1 = -1;
    for (
      let y = Math.max(0, Math.ceil(crop.y));
      y < Math.min(pixels.height, Math.ceil(crop.y + crop.height));
      y++
    )
      for (
        let x = Math.max(0, Math.ceil(crop.x));
        x < Math.min(pixels.width, Math.ceil(crop.x + crop.width));
        x++
      )
        if (pixels.rgba[(y * pixels.width + x) * 4 + 3]) {
          x0 = Math.min(x0, x);
          x1 = Math.max(x1, x);
          y0 = Math.min(y0, y);
          y1 = Math.max(y1, y);
        }
    bounds.set(path, { x0, y0, x1, y1 });
  }
  const result: BakedTexture[] = [];
  for (const { path, sample } of variants) {
    if (signal?.aborted) throw new Error('E_AVATAR_CANCELLED');
    const selected =
      sample === null
        ? [[path, 1] as [string, number]]
        : activeTextures(layer, { ...NEUTRAL, [layer.bind!]: sample });
    const image = images.get(path)!;
    let x0 = image.width,
      y0 = image.height,
      x1 = -1,
      y1 = -1;
    for (const [p] of selected) {
      const b = bounds.get(p)!;
      x0 = Math.min(x0, b.x0);
      x1 = Math.max(x1, b.x1);
      y0 = Math.min(y0, b.y0);
      y1 = Math.max(y1, b.y1);
    }
    // Power-of-two mip chains and transparent gutters avoid cross-backend NPOT edge sampling differences.
    const power = (v: number) => 2 ** Math.ceil(Math.log2(v)),
      gutter = 8;
    const rect =
        x1 < 0
          ? { x: 0, y: 0, width: 2, height: 2 }
          : {
              x: x0 - gutter,
              y: y0 - gutter,
              width: power(x1 - x0 + 1 + gutter * 2),
              height: power(y1 - y0 + 1 + gutter * 2),
            },
      rgba = Buffer.alloc(rect.width * rect.height * 4);
    if (rect.width > 4096 || rect.height > 4096) throw new Error('E_AVATAR_TEXTURE_SIZE');
    for (let y = gutter; y < gutter + Math.max(0, y1 - y0 + 1); y++)
      for (let x = gutter; x < gutter + Math.max(0, x1 - x0 + 1); x++) {
        const sx = rect.x + x,
          sy = rect.y + y;
        let a = 0,
          r = 0,
          g = 0,
          b = 0;
        for (const [p, weight] of selected) {
          const pixels = images.get(p)!,
            i = (sy * pixels.width + sx) * 4,
            alpha = pixels.rgba[i + 3]! / 255;
          a += alpha * weight;
          r += (pixels.rgba[i]! / 255) * alpha * weight;
          g += (pixels.rgba[i + 1]! / 255) * alpha * weight;
          b += (pixels.rgba[i + 2]! / 255) * alpha * weight;
        }
        if (layer.color && a > 0.00001) {
          const rgb = shiftHue(r / a, g / a, b / a, layer.color);
          r = rgb[0]! * a;
          g = rgb[1]! * a;
          b = rgb[2]! * a;
        }
        const i = (y * rect.width + x) * 4;
        rgba[i] = Math.round(r * 255);
        rgba[i + 1] = Math.round(g * 255);
        rgba[i + 2] = Math.round(b * 255);
        rgba[i + 3] = Math.round(a * 255);
      }
    const bytes = encodePNG({ width: rect.width, height: rect.height, rgba });
    result.push({
      path,
      sample,
      rect,
      bytes,
      sha256: createHash('sha256').update(bytes).digest('hex'),
    });
    await new Promise<void>((resolve) => setImmediate(resolve));
  }
  return result;
}
