import { after } from 'node:test';
import { createTempArea } from '../tools/temp-area.cjs';

let area: ReturnType<typeof createTempArea> | undefined;
export function scratchPath(relative: string): string {
  area ??= createTempArea('unit');
  return area.path(relative);
}
after(() => area?.dispose());
