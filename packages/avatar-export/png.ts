import { crc32, deflateSync, inflateSync } from 'node:zlib';
export { crc32 };
export interface Pixels {
  width: number;
  height: number;
  rgba: Buffer;
}
function chunk(name: string, data: Buffer) {
  const chunk = Buffer.allocUnsafe(12 + data.length);
  chunk.writeUInt32BE(data.length);
  chunk.write(name, 4, 4, 'ascii');
  data.copy(chunk, 8);
  chunk.writeUInt32BE(crc32(chunk.subarray(4, 8 + data.length)), 8 + data.length);
  return chunk;
}
export function encodePNG(p: Pixels): Buffer {
  if (p.rgba.length !== p.width * p.height * 4) throw new Error('E_AVATAR_TEXTURE');
  const h = Buffer.alloc(13);
  h.writeUInt32BE(p.width);
  h.writeUInt32BE(p.height, 4);
  h[8] = 8;
  h[9] = 6;
  const rows = Buffer.alloc((p.width * 4 + 1) * p.height);
  for (let y = 0; y < p.height; y++)
    p.rgba.copy(rows, y * (p.width * 4 + 1) + 1, y * p.width * 4, (y + 1) * p.width * 4);
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', h),
    chunk('IDAT', deflateSync(rows)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}
/** Strict bounded RGB/RGBA PNG decoder. JPEG is canonicalized by the host first. */
export function decodePNG(bytes: Buffer): Pixels {
  if (!bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])))
    throw new Error('E_AVATAR_TEXTURE');
  let offset = 8,
    width = 0,
    height = 0,
    channels = 0,
    ended = false,
    header = false;
  const parts: Buffer[] = [];
  while (offset + 12 <= bytes.length) {
    const length = bytes.readUInt32BE(offset),
      name = bytes.toString('ascii', offset + 4, offset + 8);
    if (length > 67108864 || offset + length + 12 > bytes.length)
      throw new Error('E_AVATAR_TEXTURE');
    const data = bytes.subarray(offset + 8, offset + 8 + length);
    if (
      crc32(bytes.subarray(offset + 4, offset + 8 + length)) !==
      bytes.readUInt32BE(offset + 8 + length)
    )
      throw new Error('E_AVATAR_TEXTURE');
    if (name === 'IHDR') {
      if (header || offset !== 8 || length !== 13) throw new Error('E_AVATAR_TEXTURE');
      header = true;
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      channels = data[9] === 6 ? 4 : data[9] === 2 ? 3 : 0;
      if (
        !width ||
        !height ||
        width > 4096 ||
        height > 4096 ||
        data[8] !== 8 ||
        !channels ||
        data[10] ||
        data[11] ||
        data[12]
      )
        throw new Error('E_AVATAR_TEXTURE');
    } else if (name === 'IDAT') {
      if (!header) throw new Error('E_AVATAR_TEXTURE');
      parts.push(data);
    } else if (name === 'IEND') {
      ended = true;
      offset += length + 12;
      break;
    } else if (name[0] === name[0]?.toUpperCase()) throw new Error('E_AVATAR_TEXTURE');
    offset += length + 12;
  }
  if (!ended || offset !== bytes.length || !parts.length) throw new Error('E_AVATAR_TEXTURE');
  const stride = width * channels;
  const rowBytes = stride + 1;
  const raw = inflateSync(parts.length === 1 ? parts[0]! : Buffer.concat(parts), {
    maxOutputLength: rowBytes * height,
  });
  if (raw.length !== rowBytes * height) throw new Error('E_AVATAR_TEXTURE');
  for (let y = 0; y < height; y++) {
    const start = y * rowBytes + 1;
    const kind = raw[start - 1]!;
    if (kind > 4) throw new Error('E_AVATAR_TEXTURE');
    if (kind === 0) continue;
    for (let x = 0; x < stride; x++) {
      const i = start + x;
      const left = x >= channels ? raw[i - channels]! : 0;
      const up = y ? raw[i - rowBytes]! : 0;
      let predictor = left;
      if (kind === 2) predictor = up;
      if (kind === 3) predictor = (left + up) >>> 1;
      if (kind === 4) {
        const corner = y && x >= channels ? raw[i - rowBytes - channels]! : 0;
        predictor = paeth(left, up, corner);
      }
      raw[i] = raw[i]! + predictor;
    }
  }
  // Unfiltering needs the preceding row. Strip filter bytes only after all rows are decoded.
  if (channels === 4) {
    for (let y = 0; y < height; y++) {
      const start = y * rowBytes + 1;
      raw.copyWithin(y * stride, start, start + stride);
    }
    return { width, height, rgba: raw.subarray(0, height * stride) };
  }
  const rgba = Buffer.allocUnsafe(width * height * 4);
  let dest = 0;
  for (let y = 0; y < height; y++) {
    const start = y * rowBytes + 1;
    for (let i = start; i < start + stride; i += 3) {
      rgba[dest++] = raw[i]!;
      rgba[dest++] = raw[i + 1]!;
      rgba[dest++] = raw[i + 2]!;
      rgba[dest++] = 255;
    }
  }
  return { width, height, rgba };
}

function paeth(left: number, up: number, corner: number): number {
  const estimate = left + up - corner;
  const a = Math.abs(estimate - left);
  const b = Math.abs(estimate - up);
  const c = Math.abs(estimate - corner);
  if (a <= b && a <= c) return left;
  return b <= c ? up : corner;
}
