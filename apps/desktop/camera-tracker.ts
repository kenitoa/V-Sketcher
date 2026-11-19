import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import { readFile, writeFile, rename, unlink, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import {
  assertCalibration,
  assertDetection,
  type Calibration,
  type Detection,
} from '../../packages/tracking';
/** Dedicated bounded protocol: payloads/stderr must never enter DiagnosticLog. */
export class CameraTracker {
  private generation = 0;
  startReason = 'none';
  private stopping: Promise<unknown> = Promise.resolve();
  private child: ChildProcessWithoutNullStreams | null = null;
  private pending: ((v: Detection | null) => void) | null = null;
  private ready: ((v: boolean) => void) | null = null;
  private sequence = -1;
  constructor(
    private executable: string,
    private args: string[],
    private env: NodeJS.ProcessEnv,
  ) {}
  async begin(): Promise<boolean> {
    const stopped = this.stop(),
      generation = this.generation;
    await stopped;
    if (generation !== this.generation) return false;
    this.startReason = 'none';
    const child = spawn(this.executable, [...this.args, '--tracking'], {
      env: this.env,
      windowsHide: true,
      stdio: 'pipe',
    });
    this.child = child;
    this.sequence = -1;
    child.stdin.on('error', () => this.failed(child));
    let buffer = '';
    const result = new Promise<boolean>((resolve) => {
      this.ready = resolve;
    });
    child.stderr.on('data', () => {});
    child.on('error', () => {
      if (this.child === child) this.startReason = 'spawn';
      this.failed(child);
    });
    child.on('exit', () => {
      if (this.child === child && this.startReason === 'none') this.startReason = 'child-exit';
      this.failed(child);
    });
    child.stdout.on('data', (chunk: Buffer) => {
      if (this.child !== child) return;
      buffer += chunk.toString('utf8');
      if (Buffer.byteLength(buffer) > 32768) {
        this.failed(child);
        child.kill();
        return;
      }
      for (;;) {
        const at = buffer.indexOf('\n');
        if (at < 0) break;
        const line = buffer.slice(0, at);
        buffer = buffer.slice(at + 1);
        try {
          const value = JSON.parse(line) as Record<string, unknown>;
          if (this.ready) {
            if (value.ready !== true) this.startReason = 'rejected';
            this.ready(value.ready === true);
            this.ready = null;
            continue;
          }
          if (!this.pending) continue;
          if (value.ok !== true) {
            const finish = this.pending;
            this.pending = null;
            finish(null);
            continue;
          }
          assertDetection(value.result);
          if (value.result.seq !== this.sequence) throw new Error('E_TRACKING_RESULT');
          const finish = this.pending;
          this.pending = null;
          finish(value.result);
        } catch {
          this.pending?.(null);
          this.pending = null;
          this.failed(child);
          child.kill();
        }
      }
    });
    const timer = setTimeout(() => {
      if (this.child !== child) return;
      this.startReason = 'deadline';
      this.failed(child);
    }, 20000);
    const ready = await result;
    clearTimeout(timer);
    if (!ready) await this.stop();
    return ready;
  }
  private failed(child: ChildProcessWithoutNullStreams): void {
    if (this.child !== child) return;
    this.ready?.(false);
    this.ready = null;
    this.pending?.(null);
    this.pending = null;
    this.child = null;
    const exited = new Promise<void>((resolve) => {
      if (child.exitCode !== null || child.signalCode !== null) {
        resolve();
        return;
      }
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        resolve();
      };
      const timer = setTimeout(finish, 1500);
      child.once('exit', finish);
      child.once('close', finish);
    });
    this.stopping = Promise.allSettled([this.stopping, exited]).then(() => undefined);
    child.kill();
  }
  async frame(seq: number, bytes: Uint8Array): Promise<Detection | null> {
    const child = this.child;
    if (
      !child ||
      this.pending ||
      !Number.isSafeInteger(seq) ||
      seq <= this.sequence ||
      !(bytes instanceof Uint8Array) ||
      bytes.byteLength > 220 * 1024 ||
      bytes.byteLength < 4
    )
      throw new Error('E_TRACKING_FRAME');
    this.sequence = seq;
    const result = new Promise<Detection | null>((resolve) => {
      this.pending = resolve;
    });
    const timer = setTimeout(() => this.failed(child), 5000);
    try {
      child.stdin.write(
        JSON.stringify({ seq, jpeg: Buffer.from(bytes).toString('base64') }) + '\n',
      );
      const value = await result;
      return value;
    } finally {
      clearTimeout(timer);
    }
  }
  async stop(): Promise<void> {
    ++this.generation;
    const child = this.child;
    if (!child) {
      await this.stopping;
      return;
    }
    this.child = null;
    this.ready?.(false);
    this.ready = null;
    this.pending?.(null);
    this.pending = null;
    const previous = this.stopping;
    const pending = new Promise<void>((resolve) => {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        resolve();
      };
      const timer = setTimeout(() => {
        child.kill();
        finish();
      }, 1500);
      child.once('exit', finish);
      child.stdin.on('error', () => {});
      child.stdin.end('{"stop":true}\n');
    });
    this.stopping = Promise.allSettled([previous, pending]).then(() => undefined);
    await this.stopping;
  }
}
export class CameraProfiles {
  private chain = Promise.resolve();
  constructor(private directory: string) {}
  async read(): Promise<Calibration[]> {
    let raw: string;
    try {
      raw = await readFile(join(this.directory, 'camera-calibration.json'), 'utf8');
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === 'ENOENT') return [];
      throw new Error('E_TRACKING_CALIBRATION');
    }
    if (Buffer.byteLength(raw) > 131072) throw new Error('E_TRACKING_CALIBRATION');
    try {
      const value = JSON.parse(raw) as { version: number; profiles: Calibration[] };
      if (
        Object.keys(value).sort().join(',') !== 'profiles,version' ||
        value.version !== 1 ||
        !Array.isArray(value.profiles) ||
        value.profiles.length > 32 ||
        new Set(value.profiles.map((p) => p.profileKey)).size !== value.profiles.length
      )
        throw new Error();
      value.profiles.forEach(assertCalibration);
      return value.profiles;
    } catch {
      throw new Error('E_TRACKING_CALIBRATION');
    }
  }
  async save(value: Calibration): Promise<void> {
    assertCalibration(value);
    const action = this.chain.then(async () => {
      const profiles = (await this.read()).filter((p) => p.profileKey !== value.profileKey);
      profiles.push(structuredClone(value));
      if (profiles.length > 32) profiles.shift();
      await mkdir(this.directory, { recursive: true });
      const temp = join(this.directory, 'camera-' + randomUUID() + '.tmp');
      try {
        await writeFile(temp, JSON.stringify({ version: 1, profiles }) + '\n', { flag: 'wx' });
        await rename(temp, join(this.directory, 'camera-calibration.json'));
      } finally {
        await unlink(temp).catch(() => {});
      }
    });
    this.chain = action.catch(() => {});
    return action;
  }
}
