import { open, readFile, lstat, realpath, rename, unlink } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { randomUUID, createHash } from 'node:crypto';
import { lock as fileLock } from '../project-storage/atomic';
export const imageHash = (b: Buffer) => createHash('sha256').update(b).digest('hex');
export function assertPNG(bytes: Buffer, width: number, height: number): void {
  if (
    bytes.length < 33 ||
    bytes.length > 83886080 ||
    !bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) ||
    bytes.toString('ascii', 12, 16) !== 'IHDR' ||
    bytes.readUInt32BE(16) !== width ||
    bytes.readUInt32BE(20) !== height ||
    bytes[24] !== 8 ||
    bytes[25] !== 6
  )
    throw new Error('E_IMAGE_PNG');
}
export async function targetImageHash(file: string): Promise<string | null> {
  try {
    const s = await lstat(file);
    if (!s.isFile() || s.isSymbolicLink()) throw new Error('E_IMAGE_TARGET');
    return imageHash(await readFile(file));
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw e;
  }
}
export async function writePNG(
  file: string,
  bytes: Buffer,
  width: number,
  height: number,
  expected: string | null,
  signal?: AbortSignal,
  fault?: (phase: 'before-write' | 'after-sync' | 'before-replace') => void | Promise<void>,
): Promise<void> {
  assertPNG(bytes, width, height);
  const target = resolve(file);
  if (!target.toLowerCase().endsWith('.png') || target.startsWith('\\\\'))
    throw new Error('E_IMAGE_PATH');
  const parent = await realpath(dirname(target));
  if (parent.toLowerCase() !== resolve(dirname(target)).toLowerCase())
    throw new Error('E_IMAGE_PATH');
  let release: (() => Promise<void>) | null = null,
    temp: string | null = null;
  const boundary = () => {
    if (signal?.aborted) throw new Error('E_IMAGE_CANCELLED');
  };
  try {
    boundary();
    release = await fileLock(target);
    if ((await targetImageHash(target)) !== expected) throw new Error('E_IMAGE_CONFLICT');
    await fault?.('before-write');
    boundary();
    temp = join(parent, '.2dsketch-image-' + randomUUID() + '.tmp');
    const h = await open(temp, 'wx');
    try {
      await h.writeFile(bytes);
      await h.sync();
    } finally {
      await h.close();
    }
    await fault?.('after-sync');
    boundary();
    const reopened = await readFile(temp);
    assertPNG(reopened, width, height);
    if (imageHash(reopened) !== imageHash(bytes)) throw new Error('E_IMAGE_VERIFY');
    await fault?.('before-replace');
    boundary();
    if ((await targetImageHash(target)) !== expected) throw new Error('E_IMAGE_CONFLICT');
    await rename(temp, target);
    temp = null;
  } finally {
    if (temp)
      try {
        await unlink(temp);
      } catch {
        /* only own temporary file */
      }
    if (release) await release();
  }
}
