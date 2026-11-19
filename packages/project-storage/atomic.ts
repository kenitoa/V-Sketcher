import { open, readFile, lstat, realpath, rename, unlink } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { randomUUID } from 'node:crypto';
import { decodeBundle, readBundle, sha256 } from './archive';
export type SavePhase =
  | 'before-write'
  | 'after-sync'
  | 'after-verify'
  | 'before-backup'
  | 'after-backup'
  | 'before-replace'
  | 'after-replace';
export interface AtomicOptions {
  expectedHash: string | null;
  signal?: AbortSignal;
  backup?: (bytes: Buffer) => Promise<void>;
  fault?: (phase: SavePhase) => void | Promise<void>;
}
export interface CommitReceipt {
  hash: string;
  committed: true;
  warning: string | null;
}
const writers = new Set<string>();
export function storageError(error: unknown): string {
  const code = (error as NodeJS.ErrnoException | null)?.code;
  if (code === 'ENOSPC') return 'E_SAVE_SPACE';
  if (code === 'EACCES' || code === 'EPERM') return 'E_SAVE_PERMISSION';
  if (['ENOENT', 'ENOTDIR', 'ENAMETOOLONG', 'EINVAL'].includes(code ?? '')) return 'E_SAVE_PATH';
  return error instanceof Error && /^E_[A-Z_]{1,48}$/.test(error.message)
    ? error.message
    : 'E_STORAGE_IO';
}
async function currentHash(file: string): Promise<string | null> {
  try {
    const info = await lstat(file);
    if (!info.isFile() || info.isSymbolicLink()) throw new Error('E_SAVE_TARGET');
    return sha256(await readFile(file));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw error;
  }
}
export async function lock(file: string): Promise<() => Promise<void>> {
  const path = file + '.lock';
  const token = JSON.stringify({
    magic: '2dsketch-writer-v1',
    pid: process.pid,
    nonce: randomUUID(),
  });
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const handle = await open(path, 'wx');
      try {
        try {
          await handle.writeFile(token);
          await handle.sync();
        } finally {
          await handle.close();
        }
      } catch (error) {
        try {
          await unlink(path);
        } catch {
          /* own failed lock creation only */
        }
        throw error;
      }
      return async () => {
        try {
          if ((await readFile(path, 'utf8')) === token) await unlink(path);
        } catch (error) {
          if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
        }
      };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error;
      const raw = await readFile(path, 'utf8');
      let previous: { magic?: string; pid?: number };
      try {
        previous = JSON.parse(raw);
      } catch {
        throw new Error('E_SAVE_LOCK_UNKNOWN');
      }
      if (
        previous.magic !== '2dsketch-writer-v1' ||
        !Number.isSafeInteger(previous.pid) ||
        previous.pid! <= 0
      )
        throw new Error('E_SAVE_LOCK_UNKNOWN');
      let alive = true;
      try {
        process.kill(previous.pid!, 0);
      } catch (probe) {
        alive = (probe as NodeJS.ErrnoException).code !== 'ESRCH';
      }
      if (alive) throw new Error('E_SAVE_BUSY');
      if ((await readFile(path, 'utf8')) !== raw) throw new Error('E_SAVE_BUSY');
      await unlink(path);
    }
  }
  throw new Error('E_SAVE_BUSY');
}
/** Same-volume write/fsync/reopen/verify/backup/rename. No destructive fallback on rename failure. */
export async function atomicBundle(
  file: string,
  bytes: Buffer,
  options: AtomicOptions,
): Promise<CommitReceipt> {
  const target = resolve(file);
  const key = target.toLowerCase();
  if (writers.has(key)) throw new Error('E_SAVE_BUSY');
  writers.add(key);
  let release: (() => Promise<void>) | null = null;
  let temporary: string | null = null;
  let committed = false;
  let warning: string | null = null;
  const boundary = (): void => {
    if (options.signal?.aborted) throw new Error('E_SAVE_CANCELLED');
  };
  const phase = async (value: SavePhase): Promise<void> => {
    if (options.fault) await options.fault(value);
  };
  try {
    boundary();
    const parent = await realpath(dirname(target));
    if (resolve(parent).toLowerCase() !== resolve(dirname(target)).toLowerCase())
      throw new Error('E_SAVE_PARENT_LINK');
    release = await lock(target);
    if ((await currentHash(target)) !== options.expectedHash) throw new Error('E_SAVE_CONFLICT');
    await phase('before-write');
    temporary = join(parent, '.2dsketch-' + randomUUID() + '.tmp');
    const handle = await open(temporary, 'wx');
    try {
      await handle.writeFile(bytes);
      await handle.sync();
    } finally {
      await handle.close();
    }
    await phase('after-sync');
    boundary();
    await readBundle(temporary, false);
    await phase('after-verify');
    boundary();
    if ((await currentHash(target)) !== options.expectedHash) throw new Error('E_SAVE_CONFLICT');
    if (options.expectedHash !== null) {
      const original = await readFile(target);
      await decodeBundle(original, false);
      await phase('before-backup');
      if (!options.backup) throw new Error('E_SAVE_BACKUP_REQUIRED');
      await options.backup(original);
      await phase('after-backup');
    }
    await phase('before-replace');
    boundary();
    if ((await currentHash(target)) !== options.expectedHash) throw new Error('E_SAVE_CONFLICT');
    await rename(temporary, target);
    temporary = null;
    committed = true;
    try {
      await phase('after-replace');
    } catch (error) {
      warning = storageError(error);
    }
    return { committed: true, hash: sha256(bytes), warning };
  } catch (error) {
    throw new Error(storageError(error));
  } finally {
    if (temporary) {
      try {
        await unlink(temporary);
      } catch {
        /* incomplete owned temp is never treated as a valid project */
      }
    }
    if (release) {
      try {
        await release();
      } catch {
        if (!committed) warning = 'E_SAVE_LOCK_CLEANUP';
      }
    }
    writers.delete(key);
  }
}
