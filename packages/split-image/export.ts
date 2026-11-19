import { open, readFile, lstat, realpath, rename, unlink } from 'node:fs/promises';
import { resolve, dirname, join, basename } from 'node:path';
import { randomUUID } from 'node:crypto';
import { readArchive, hash } from './archive';
export async function saveParts(
  file: string,
  bytes: Buffer,
): Promise<{ label: string; hash: string; backup: string | null }> {
  const target = resolve(file);
  if (!target.toLowerCase().endsWith('.2dparts') || target.startsWith('\\\\'))
    throw new Error('E_SPLIT_EXPORT_PATH');
  const parent = await realpath(dirname(target));
  if (resolve(parent).toLowerCase() !== resolve(dirname(target)).toLowerCase())
    throw new Error('E_SAVE_PARENT_LINK');
  await readArchive(bytes);
  const lock = target + '.lock';
  const token = randomUUID();
  let held = false,
    temp: string | null = null,
    backup: string | null = null;
  const current = async () => {
    try {
      const st = await lstat(target);
      if (!st.isFile() || st.isSymbolicLink() || st.size > 256 * 1024 * 1024)
        throw new Error('E_SAVE_TARGET');
      return await readFile(target);
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === 'ENOENT') return null;
      throw e;
    }
  };
  try {
    let handle;
    try {
      handle = await open(lock, 'wx');
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === 'EEXIST') throw new Error('E_SAVE_BUSY');
      throw e;
    }
    held = true;
    try {
      await handle.writeFile(token);
      await handle.sync();
    } finally {
      await handle.close();
    }
    const old = await current();
    if (old) await readArchive(old);
    const expected = old ? hash(old) : null;
    temp = join(parent, '.2dparts-' + randomUUID() + '.tmp');
    const writer = await open(temp, 'wx');
    try {
      await writer.writeFile(bytes);
      await writer.sync();
    } finally {
      await writer.close();
    }
    const checked = await readFile(temp);
    if (hash(checked) !== hash(bytes)) throw new Error('E_SPLIT_EXPORT_VERIFY');
    await readArchive(checked);
    const now = await current();
    if ((now ? hash(now) : null) !== expected) throw new Error('E_SAVE_CONFLICT');
    if (old) {
      backup = join(parent, '.' + basename(target) + '.before-' + randomUUID() + '.2dparts');
      const b = await open(backup, 'wx');
      try {
        await b.writeFile(old);
        await b.sync();
      } finally {
        await b.close();
      }
      if (hash(await readFile(backup)) !== expected) throw new Error('E_SPLIT_EXPORT_VERIFY');
    }
    const final = await current();
    if ((final ? hash(final) : null) !== expected) throw new Error('E_SAVE_CONFLICT');
    await rename(temp, target);
    temp = null;
    return { label: basename(target), hash: hash(bytes), backup: backup ? basename(backup) : null };
  } finally {
    if (temp) await unlink(temp).catch(() => {});
    if (held && (await readFile(lock, 'utf8').catch(() => null)) === token)
      await unlink(lock).catch(() => {});
  }
}
