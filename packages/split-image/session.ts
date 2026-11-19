import { randomUUID } from 'node:crypto';
import type { Project } from '../project-model/types';
import type { Workflow } from '../workflow';
import type { ResourceCache } from '../project-storage/cache';
import { readSource, readArchive, hash, writeArchive, type SplitSource } from './archive';
import {
  draftFromSource,
  draftFromProject,
  materials,
  buildProject,
  assertGuidanceCompatible,
} from './model';
import {
  configured,
  configKey,
  issues,
  type SplitDraft,
  type SplitConfig,
  type SplitProcessor,
} from './types';
interface Host {
  token: string;
  flow: Workflow;
  cache: ResourceCache;
  current(): boolean;
  checkpoint(): Promise<void>;
  commit(p: Project): Promise<void>;
  emit(): void;
}
export class SplitSession {
  private generation = 0;
  private revision = -1;
  private job: string | null = null;
  private state = 'idle';
  private busy = false;
  private error: string | null = null;
  private draft: SplitDraft | null = null;
  private candidate: Project | null = null;
  private preparedKey: string | null = null;
  private raw = new Map<string, Buffer>();
  private normalized = new Map<string, Buffer>();
  private urls = new Map<string, Buffer>();
  private retryAction: (() => void) | null = null;
  private exported: string | null = null;
  constructor(
    private host: Host,
    private processor: SplitProcessor,
  ) {}
  view() {
    return {
      state: this.state,
      busy: this.busy,
      errorCode: this.error,
      jobId: this.job,
      draft: this.draft,
      issues: this.draft ? issues(this.draft) : [],
      canApply:
        !this.busy && !!this.candidate && this.revision === this.host.flow.project().revision,
      canRetry: !this.busy && !!this.retryAction,
      preparedKey: this.preparedKey,
      exported: this.exported,
    };
  }
  exportedFile(label: string) {
    this.exported = label;
    this.host.emit();
  }
  preview() {
    return this.revision === this.host.flow.project().revision ? this.candidate : null;
  }
  resource(token: string, name: string): Buffer | null {
    return this.draft && (token === this.draft.id || token === this.host.token + '-split')
      ? (this.urls.get(name) ?? null)
      : null;
  }
  private begin(label: string, run: (signal: AbortSignal) => Promise<void>): void {
    if (
      this.busy ||
      this.host.flow
        .view()
        .jobs.some((j) => ['RUNNING', 'QUEUED', 'CANCEL_REQUESTED'].includes(j.state))
    )
      throw new Error('E_SPLIT_BUSY');
    const gen = ++this.generation;
    this.revision = this.host.flow.project().revision;
    this.busy = true;
    this.state = 'reading';
    this.error = null;
    this.candidate = null;
    this.preparedKey = null;
    const job = this.host.flow.start({
      key: 'split-' + randomUUID(),
      label,
      kind: 'preview',
      processingVersion: '1.0.0',
      settings: { scope: 'png-parts' },
      steps: [
        {
          id: 'read-normalize-and-check',
          version: '1.0.0',
          cache: 'none',
          cancellable: true,
          run: async (ctx) => {
            await run(ctx.signal);
            ctx.checkpoint();
            return { prepared: true };
          },
        },
      ],
      collect: (_p, identity) => ({
        identity,
        outcome: { kind: 'checked', reportId: 'split-input', dependencies: ['input:*'] },
      }),
    });
    this.job = job.jobId;
    this.host.emit();
    void this.host.flow.wait(job.jobId).then((result) => {
      if (gen !== this.generation || !this.host.current()) return;
      this.busy = false;
      if (result.state === 'SUCCEEDED' && this.host.flow.project().revision === this.revision)
        this.state = this.candidate ? 'review' : 'draft';
      else {
        this.state = result.state === 'CANCELLED' ? 'cancelled' : 'failed';
        this.error =
          this.host.flow.project().revision === this.revision
            ? (result.errorCode ?? 'E_SPLIT_PROCESSING')
            : 'E_INPUT_STALE';
        this.candidate = null;
      }
      this.host.emit();
    });
  }
  private async ingest(source: SplitSource, signal: AbortSignal, gen: number): Promise<void> {
    const raw = new Map<string, Buffer>();
    for (const b of source.files.values()) raw.set(hash(b), b);
    const result = await this.processor.probe(raw, signal);
    if (signal.aborted || gen !== this.generation || !this.host.current())
      throw new Error('E_JOB_CANCELLED');
    const normal = new Map<string, Buffer>();
    for (const b of result.files.values()) normal.set(hash(b), b);
    const draft = draftFromSource(source, result.images, result.files);
    this.raw = raw;
    this.normalized = normal;
    this.draft = draft;
    this.urls = new Map([...normal].map(([key, b]) => [key + '.png', b]));
  }
  startFile(path: string, kind: 'folder' | '2dparts'): void {
    const run = () => {
      if (
        this.busy ||
        this.host.flow
          .view()
          .jobs.some((j) => ['RUNNING', 'QUEUED', 'CANCEL_REQUESTED'].includes(j.state))
      )
        throw new Error('E_SPLIT_BUSY');
      this.draft = null;
      this.urls.clear();
      this.raw.clear();
      this.normalized.clear();
      this.begin('분리 PNG 읽기 · 좌표와 역할 확인', async (signal) => {
        const gen = this.generation;
        const source = await readSource(path, kind, signal);
        await this.ingest(source, signal, gen);
      });
    };
    this.retryAction = run;
    run();
  }
  startBytes(bytes: Buffer): void {
    const run = () => {
      if (
        this.busy ||
        this.host.flow
          .view()
          .jobs.some((j) => ['RUNNING', 'QUEUED', 'CANCEL_REQUESTED'].includes(j.state))
      )
        throw new Error('E_SPLIT_BUSY');
      this.draft = null;
      this.urls.clear();
      this.raw.clear();
      this.normalized.clear();
      this.begin('분리 자료 예제 읽기', async (signal) => {
        const gen = this.generation;
        await this.ingest(await readArchive(bytes), signal, gen);
      });
    };
    this.retryAction = run;
    run();
  }
  edit(): void {
    const p = this.host.flow.project();
    assertGuidanceCompatible(p);
    if (!p.split) throw new Error('E_SPLIT_SOURCE');
    const run = () =>
      this.begin('분리 자료 연결 다시 확인', async (signal) => {
        const gen = this.generation,
          d = draftFromProject(p),
          raw = new Map<string, Buffer>(),
          normal = new Map<string, Buffer>();
        for (const l of d.layers) {
          for (const [id, key, map] of [
            [l.originalAssetId, l.sourceHash, raw],
            [l.imageAssetId, l.imageHash, normal],
          ] as const) {
            if (signal.aborted) throw new Error('E_JOB_CANCELLED');
            const a = p.assets.find((a) => a.id === id),
              b = a ? await this.host.cache.read(a) : null;
            if (!b || hash(b) !== key) throw new Error('E_RESOURCE_MISSING');
            map.set(key, b);
          }
        }
        if (gen !== this.generation || !this.host.current()) throw new Error('E_INPUT_STALE');
        this.draft = d;
        this.raw = raw;
        this.normalized = normal;
        this.urls = new Map([...normal].map(([h, b]) => [h + '.png', b]));
      });
    this.retryAction = run;
    run();
  }
  prepare(id: string, c: SplitConfig, expected: number): void {
    if (
      this.busy ||
      this.host.flow
        .view()
        .jobs.some((j) => ['RUNNING', 'QUEUED', 'CANCEL_REQUESTED'].includes(j.state))
    )
      throw new Error('E_SPLIT_BUSY');
    if (!this.draft || id !== this.draft.id || expected !== this.host.flow.project().revision)
      throw new Error('E_INPUT_STALE');
    const d = configured(this.draft, c);
    this.draft = d;
    this.candidate = null;
    this.preparedKey = null;
    if (issues(d).some((v) => v.level === 'block')) {
      this.state = 'draft';
      this.host.emit();
      return;
    }
    const input = this.host.flow.project();
    const run = () =>
      this.begin('분리 자료 · 공통 움직임 준비', async (signal) => {
        const gen = this.generation;
        const m = materials(d, this.raw, this.normalized);
        const next = buildProject(input, d, m.assets);
        for (const a of m.assets) {
          if (signal.aborted) throw new Error('E_JOB_CANCELLED');
          await this.host.cache.put(a, m.bytes.get(a.id)!);
        }
        if (
          gen !== this.generation ||
          !this.host.current() ||
          this.host.flow.project().revision !== expected
        )
          throw new Error('E_INPUT_STALE');
        this.candidate = next;
        this.preparedKey = configKey(c);
      });
    this.retryAction = run;
    run();
  }
  async apply(id: string, c: SplitConfig, expected: number): Promise<void> {
    if (
      this.busy ||
      !this.draft ||
      id !== this.draft.id ||
      !this.candidate ||
      this.preparedKey !== configKey(c) ||
      expected !== this.revision ||
      expected !== this.host.flow.project().revision
    )
      throw new Error('E_INPUT_STALE');
    const gen = this.generation,
      next = this.candidate;
    this.busy = true;
    this.state = 'applying';
    this.host.emit();
    try {
      await this.host.checkpoint();
      if (
        gen !== this.generation ||
        !this.host.current() ||
        this.host.flow.project().revision !== expected
      )
        throw new Error('E_INPUT_STALE');
      await this.host.commit(next);
      if (gen !== this.generation) return;
      this.state = 'applied';
      this.candidate = null;
      this.preparedKey = null;
    } catch (e) {
      if (gen !== this.generation) return;
      this.error =
        e instanceof Error && /^E_[A-Z_]+$/.test(e.message) ? e.message : 'E_SPLIT_PROCESSING';
      this.state = 'failed';
    } finally {
      if (gen === this.generation) {
        this.busy = false;
        this.host.emit();
      }
    }
  }
  async export(): Promise<Buffer> {
    const p = this.host.flow.project(),
      d = draftFromProject(p),
      raw = new Map<string, Buffer>();
    for (const l of d.layers) {
      const a = p.assets.find((a) => a.id === l.originalAssetId),
        b = a ? await this.host.cache.read(a) : null;
      if (!b) throw new Error('E_RESOURCE_MISSING');
      raw.set(l.sourceHash, b);
    }
    if (!this.host.current()) throw new Error('E_INPUT_STALE');
    return writeArchive(d, raw);
  }
  discard() {
    if (this.busy) throw new Error('E_SPLIT_BUSY');
    ++this.generation;
    this.candidate = null;
    this.preparedKey = null;
    this.state = this.draft ? 'draft' : 'idle';
    this.host.emit();
  }
  cancel() {
    ++this.generation;
    if (this.busy && this.job) this.host.flow.cancel(this.job);
    this.busy = false;
    this.draft = null;
    this.candidate = null;
    this.preparedKey = null;
    this.urls.clear();
    this.raw.clear();
    this.normalized.clear();
    this.error = null;
    this.state = 'cancelled';
    this.host.emit();
  }
  retry() {
    if (this.retryAction) this.retryAction();
  }
  dispose() {
    this.cancel();
    this.retryAction = null;
  }
}
