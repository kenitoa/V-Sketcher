import { open, readFile, lstat, realpath, rename, unlink } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { lock } from '../project-storage/atomic';
import { parseINP, sha } from './inp';
export async function targetHash(file: string): Promise<string | null> {
  try {
    const stat = await lstat(file);
    if (!stat.isFile() || stat.isSymbolicLink() || stat.size > 268435456)
      throw new Error('E_AVATAR_PATH');
    return sha(await readFile(file));
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw e;
  }
}
export async function writeINP(
  file: string,
  bytes: Buffer,
  expected: string | null,
  signal: AbortSignal,
  fault?: (phase: 'before-write' | 'after-sync' | 'before-replace') => void | Promise<void>,
) {
  parseINP(bytes);
  const target = resolve(file),
    parent = await realpath(dirname(target));
  if (
    !target.toLowerCase().endsWith('.inp') ||
    target.startsWith('\\\\') ||
    parent.toLowerCase() !== resolve(dirname(target)).toLowerCase()
  )
    throw new Error('E_AVATAR_PATH');
  let temp: string | null = null,
    release: (() => Promise<void>) | null = null;
  const boundary = () => {
    if (signal.aborted) throw new Error('E_AVATAR_CANCELLED');
  };
  try {
    boundary();
    release = await lock(target);
    if ((await targetHash(target)) !== expected) throw new Error('E_AVATAR_CONFLICT');
    await fault?.('before-write');
    boundary();
    temp = join(parent, '.2dsketch-avatar-' + randomUUID() + '.tmp');
    const f = await open(temp, 'wx');
    try {
      await f.writeFile(bytes);
      await f.sync();
    } finally {
      await f.close();
    }
    await fault?.('after-sync');
    boundary();
    const reopened = await readFile(temp);
    parseINP(reopened);
    if (sha(reopened) !== sha(bytes)) throw new Error('E_AVATAR_VERIFY');
    await fault?.('before-replace');
    boundary();
    if ((await targetHash(target)) !== expected) throw new Error('E_AVATAR_CONFLICT');
    await rename(temp, target);
    temp = null;
    return { sha256: sha(bytes), bytes: bytes.length };
  } finally {
    if (temp)
      try {
        await unlink(temp);
      } catch {
        /* own temporary file only */
      }
    if (release) await release();
  }
}
