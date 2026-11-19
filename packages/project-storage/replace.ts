import { rename } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';

/** Preserve both files on failure. Windows scanners/readers can briefly deny an atomic rename. */
export async function replaceJournal(
  from: string,
  to: string,
  operation: typeof rename = rename,
): Promise<void> {
  const waits = [10, 20, 40, 80, 100, 100];
  for (let attempt = 0; ; attempt++) {
    try {
      await operation(from, to);
      return;
    } catch (error) {
      if (
        !['EPERM', 'EACCES', 'EBUSY'].includes((error as NodeJS.ErrnoException).code ?? '') ||
        attempt >= waits.length
      )
        throw error;
      await delay(waits[attempt]);
    }
  }
}
