import { appendFileSync, mkdirSync, existsSync, statSync, renameSync } from 'node:fs';
import { join } from 'node:path';

const events = new Set([
  'app-start',
  'app-stop',
  'worker-start',
  'worker-ready',
  'worker-stop',
  'worker-error',
  'request-start',
  'request-end',
  'protocol-rejected',
  'renderer-ready',
]);
const fields = new Set([
  'version',
  'protocol',
  'requestId',
  'jobId',
  'durationMs',
  'byteCount',
  'exitCode',
  'code',
]);
export function safeEvent(
  event: string,
  input: Record<string, unknown> = {},
): Record<string, string | number> {
  const result: Record<string, string | number> = {
    timestamp: new Date().toISOString(),
    event: events.has(event) ? event : 'protocol-rejected',
  };
  for (const [key, value] of Object.entries(input)) {
    if (!fields.has(key)) continue;
    if (typeof value === 'number' && Number.isFinite(value)) result[key] = value;
    else if (
      typeof value === 'string' &&
      ((key === 'version' && /^\d+\.\d+\.\d+$/.test(value)) ||
        (key === 'code' && /^E_[A-Z_]{1,48}$/.test(value)) ||
        (['requestId', 'jobId'].includes(key) && /^[a-f0-9-]{16,64}$/.test(value)))
    )
      result[key] = value;
  }
  return result;
}
export class DiagnosticLog {
  constructor(private directory: string) {
    mkdirSync(directory, { recursive: true });
  }
  private enabled = true;
  configure(enabled: boolean): void {
    this.enabled = enabled;
  }
  write(event: string, fields: Record<string, unknown> = {}): void {
    if (!this.enabled) return;
    const file = join(this.directory, 'events.jsonl');
    if (existsSync(file) && statSync(file).size > 1024 * 1024) {
      for (let i = 3; i >= 1; i--)
        if (existsSync(join(this.directory, `events.${i}.jsonl`)))
          renameSync(
            join(this.directory, `events.${i}.jsonl`),
            join(this.directory, `events.${i + 1}.jsonl`),
          );
      renameSync(file, join(this.directory, 'events.1.jsonl'));
    }
    appendFileSync(file, JSON.stringify(safeEvent(event, fields)) + '\n', 'utf8');
  }
}
