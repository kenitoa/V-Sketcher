import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { parseResponse, parseRequest, matches, MAX_MESSAGE_BYTES, type RequestEnvelope, type Operation } from '../../packages/contracts';
import type { DiagnosticLog } from '../../packages/diagnostics';

export class WorkerClient {
  private child: ChildProcessWithoutNullStreams;
  private buffer = Buffer.alloc(0);
  private pending = new Map<string, { request: RequestEnvelope; resolve: (value: Record<string, unknown>) => void; reject: (error: Error) => void; timer: NodeJS.Timeout; started: number }>();
  private closed: Promise<void>;
  private stopping = false;
  constructor(executable: string, args: string[], env: NodeJS.ProcessEnv, private log: DiagnosticLog) {
    this.child = spawn(executable, args, { env, shell: false, windowsHide: true, stdio: 'pipe' });
    this.log.write('worker-start', { protocol: 1 });
    this.closed = new Promise(resolve => this.child.once('close', () => { this.failAll('E_WORKER_EXIT'); this.log.write('worker-stop'); resolve(); }));
    this.child.once('error', () => this.failAll('E_WORKER_START'));
    this.child.stdin.on('error', () => this.failAll('E_WORKER_PIPE'));
    this.child.stdout.on('data', (data: Buffer) => {
      this.buffer = Buffer.concat([this.buffer, data]);
      if (this.buffer.length > MAX_MESSAGE_BYTES * 2) { this.failAll('E_PROTOCOL_SIZE'); this.child.kill(); return; }
      let index: number;
      while ((index = this.buffer.indexOf(10)) >= 0) {
        const line = this.buffer.subarray(0, index).toString('utf8'); this.buffer = this.buffer.subarray(index + 1);
        try {
          const response = parseResponse(line); const item = this.pending.get(response.requestId);
          if (!item || !matches(item.request, response)) { this.log.write('protocol-rejected', { code: 'E_PROTOCOL_IDENTITY' }); continue; }
          clearTimeout(item.timer); this.pending.delete(response.requestId);
          this.log.write('request-end', { requestId: response.requestId, durationMs: performance.now() - item.started });
          if (response.ok) item.resolve(response.result ?? {}); else item.reject(new Error(response.error?.code ?? 'E_WORKER_OPERATION'));
        } catch { this.failAll('E_PROTOCOL_RESPONSE'); this.child.kill(); }
      }
    });
    // Native libraries may write diagnostics; raw stderr may contain personal paths.
    this.child.stderr.on('data', (data: Buffer) => this.log.write('worker-error', { code: 'E_WORKER_STDERR', byteCount: data.length }));
  }
  private failAll(code: string): void {
    for (const item of this.pending.values()) { clearTimeout(item.timer); item.reject(new Error(code)); }
    this.pending.clear();
  }
  request(operation: Operation, identity = { projectId: 'foundation', revision: 0, generation: 0 }): Promise<Record<string, unknown>> {
    if (this.stopping && operation !== 'shutdown') return Promise.reject(new Error('E_WORKER_STOPPING'));
    const request = parseRequest({ protocol: 1, requestId: randomUUID(), ...identity, operation });
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => { this.pending.delete(request.requestId); reject(new Error('E_WORKER_TIMEOUT')); }, operation === 'validate-runtime' ? 60000 : 10000);
      this.pending.set(request.requestId, { request, resolve, reject, timer, started: performance.now() });
      this.log.write('request-start', { requestId: request.requestId, protocol: 1 });
      this.child.stdin.write(JSON.stringify(request) + '\n', error => { if (error) { clearTimeout(timer); this.pending.delete(request.requestId); reject(new Error('E_WORKER_PIPE')); } });
    });
  }
  async stop(): Promise<void> {
    if (this.stopping) return this.closed;
    this.stopping = true;
    try { await this.request('shutdown'); } catch { /* controlled termination below */ }
    const timer = setTimeout(() => this.child.kill(), 2000);
    await this.closed; clearTimeout(timer);
  }
}
