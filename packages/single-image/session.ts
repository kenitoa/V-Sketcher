import { randomUUID } from 'node:crypto';
import type { Project } from '../project-model';
import type { Workflow } from '../workflow';
import type { ResourceCache } from '../project-storage/cache';
import type { InputProcessor } from '../image-input/types';
import { structuredProject, assertReport, type StructureReport } from './index';
interface Host {
  flow: Workflow;
  cache: ResourceCache;
  current(): boolean;
  checkpoint(): Promise<void>;
  commit(change: (p: Project) => void): Promise<void>;
  emit(): void;
}
export class StructureSession {
  private generation = 0;
  private job: string | null = null;
  private busy = false;
  private state = 'idle';
  private error: string | null = null;
  private candidate: Project | null = null;
  private early: Project | null = null;
  private report: StructureReport | null = null;
  private revision = -1;
  private mode: 'estimated' | 'restrict' = 'estimated';
  constructor(
    private host: Host,
    private processor: InputProcessor,
  ) {}
  view() {
    return {
      state: this.state,
      busy: this.busy,
      errorCode: this.error,
      report: this.report,
      canApply: !!this.candidate && this.revision === this.host.flow.project().revision,
      canRetry: !this.busy && this.revision >= 0,
      jobId: this.job,
      earlyReady: !!this.early,
    };
  }
  preview(): Project | null {
    return this.revision === this.host.flow.project().revision
      ? (this.candidate ?? this.early)
      : null;
  }
  start(mode: 'estimated' | 'restrict', expected: number): void {
    const snapshot = this.host.flow.project();
    if (snapshot.structure?.corrections) throw new Error('E_CORRECTION_PROTECTED');
    if (expected !== snapshot.revision) throw new Error('E_INPUT_STALE');
    if (
      !snapshot.inputPreparation ||
      snapshot.sourceType !== 'single-image' ||
      !this.processor.structure
    )
      throw new Error('E_INPUT_STRUCTURE_SOURCE');
    if (
      this.busy ||
      this.host.flow
        .view()
        .jobs.some((j) => ['RUNNING', 'QUEUED', 'CANCEL_REQUESTED'].includes(j.state))
    )
      throw new Error('E_INPUT_STRUCTURE_BUSY');
    const generation = ++this.generation;
    this.revision = expected;
    this.mode = mode;
    this.busy = true;
    this.error = null;
    this.candidate = null;
    this.early = null;
    this.report = null;
    this.state = 'analyzing';
    let input: Buffer;
    let result: Project | null = null;
    const valid = () =>
      generation === this.generation &&
      this.host.current() &&
      this.host.flow.project().revision === expected;
    const job = this.host.flow.start({
      key: 'structure-' + randomUUID(),
      kind: 'preview',
      label: '한 장 그림 · 자동 구조화',
      processingVersion: '1.0.0',
      settings: {
        mode,
        platform: 'win32-x64-local',
        inputAssetId: snapshot.inputPreparation.selectedAssetId,
      },
      steps: [
        {
          id: 'landmarks-and-visibility',
          version: '1.0.0',
          cache: 'none',
          cancellable: true,
          run: async (ctx) => {
            const source = snapshot.assets.find(
              (a) => a.id === snapshot.inputPreparation!.selectedAssetId,
            )!;
            const read = await this.host.cache.read(source);
            if (!read) throw new Error('E_INPUT_STRUCTURE_SOURCE');
            input = read;
            const r = await this.processor.structure!(
              'analyze',
              input,
              { occluded: snapshot.inputPreparation!.selection.occluded },
              ctx.signal,
            );
            ctx.checkpoint();
            assertReport(r.report);
            if (!valid()) throw new Error('E_INPUT_STALE');
            this.report = r.report;
            if (r.report.status === 'failed') throw new Error('E_INPUT_STRUCTURE_FACE');
            this.early = structuredProject(snapshot, r.report, new Map(), true).project;
            this.state = 'preparing';
            this.host.emit();
            return { faceReady: true };
          },
        },
        {
          id: 'expression-patches-and-rig',
          version: '1.0.0',
          cache: 'none',
          cancellable: true,
          run: async (ctx) => {
            const r = await this.processor.structure!(
              'build',
              input!,
              { report: this.report!, completion: mode },
              ctx.signal,
            );
            ctx.checkpoint();
            assertReport(r.report);
            if (!valid()) throw new Error('E_INPUT_STALE');
            const prepared = structuredProject(snapshot, r.report, r.files);
            for (const a of prepared.project.assets) {
              const b = prepared.bytes.get(a.id);
              if (b) await this.host.cache.put(a, b);
            }
            ctx.checkpoint();
            if (!valid()) throw new Error('E_INPUT_STALE');
            this.report = r.report;
            result = prepared.project;
            return { prepared: true };
          },
        },
      ],
      collect: (_p, identity) => ({
        identity,
        outcome: { kind: 'checked', reportId: 'single-image-structure', dependencies: ['input:*'] },
      }),
    });
    this.job = job.jobId;
    this.host.emit();
    void this.host.flow.wait(job.jobId).then((r) => {
      if (generation !== this.generation || !this.host.current()) return;
      this.busy = false;
      if (r.state === 'SUCCEEDED' && valid() && result) {
        this.candidate = result;
        this.state = 'review';
      } else {
        this.early = null;
        this.state = r.state === 'CANCELLED' ? 'cancelled' : 'failed';
        this.error = valid() ? (r.errorCode ?? 'E_INPUT_PROCESSING') : 'E_INPUT_STALE';
      }
      this.host.emit();
    });
  }
  async apply(expected: number): Promise<void> {
    if (
      this.busy ||
      !this.candidate ||
      expected !== this.revision ||
      expected !== this.host.flow.project().revision
    )
      throw new Error('E_INPUT_STALE');
    const generation = this.generation;
    const candidate = this.candidate;
    await this.host.checkpoint();
    if (
      generation !== this.generation ||
      !this.host.current() ||
      this.host.flow.project().revision !== expected
    )
      throw new Error('E_INPUT_STALE');
    await this.host.commit((p) => {
      for (const key of [
        'assets',
        'parts',
        'groups',
        'parameters',
        'partBindings',
        'inputBindings',
        'expressions',
        'motion',
        'runtimeProfile',
        'exportProfiles',
        'provenance',
        'structure',
        'schemaVersion',
      ] as const)
        (p as unknown as Record<string, unknown>)[key] = structuredClone(candidate[key]);
      delete p.assembly;
    });
    this.candidate = null;
    this.early = null;
    this.state = 'applied';
    this.host.emit();
  }
  cancel(): void {
    ++this.generation;
    if (this.busy && this.job) this.host.flow.cancel(this.job);
    this.busy = false;
    this.candidate = null;
    this.early = null;
    this.state = 'cancelled';
    this.error = null;
    this.host.emit();
  }
  retry(expected: number): void {
    this.start(this.mode, expected);
  }
  dispose(): void {
    this.cancel();
  }
}
