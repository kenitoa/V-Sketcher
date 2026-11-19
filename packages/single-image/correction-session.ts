import { randomUUID } from 'node:crypto';
import type { Project } from '../project-model';
import type { Workflow } from '../workflow';
import type { ResourceCache } from '../project-storage/cache';
import type { InputProcessor } from '../image-input/types';
import type { StructureReport } from './types';
import { proposal, rebuildCorrected } from './corrections';
import {
  assertRequest,
  featureKeys,
  type CorrectionRequest,
  type FeatureKey,
  FEATURE_KEYS,
} from './correction-types';
interface Host {
  flow: Workflow;
  cache: ResourceCache;
  current(): boolean;
  checkpoint(): Promise<void>;
  commit(change: (p: Project) => void): Promise<void>;
  emit(): void;
}
export class CorrectionSession {
  private generation = 0;
  private revision = -1;
  private job: string | null = null;
  private busy = false;
  private state = 'idle';
  private error: string | null = null;
  private candidate: Project | null = null;
  private keys: FeatureKey[] = [];
  private changes: { key: FeatureKey; action: string }[] = [];
  private request: CorrectionRequest | null = null;
  private files = new Map<string, Buffer>();
  private applying: AbortController | null = null;
  constructor(
    private host: Host,
    private processor: InputProcessor,
  ) {}
  view() {
    return {
      state: this.state,
      busy: this.busy,
      errorCode: this.error,
      jobId: this.job,
      keys: this.keys,
      changes: this.changes,
      canApply:
        !this.busy &&
        !!this.candidate &&
        this.keys.length > 0 &&
        this.revision === this.host.flow.project().revision,
      canRetry: !this.busy && !!this.request,
    };
  }
  preview() {
    return this.revision === this.host.flow.project().revision ? this.candidate : null;
  }
  start(request: CorrectionRequest, expected: number): void {
    assertRequest(request);
    const input = this.host.flow.project();
    if (input.revision !== expected) throw new Error('E_INPUT_STALE');
    if (!input.structure || !input.inputPreparation || !this.processor.structure)
      throw new Error('E_CORRECTION_SOURCE');
    if (
      this.busy ||
      this.host.flow
        .view()
        .jobs.some((v) => ['RUNNING', 'QUEUED', 'CANCEL_REQUESTED'].includes(v.state))
    )
      throw new Error('E_INPUT_STRUCTURE_BUSY');
    const generation = ++this.generation;
    this.request = structuredClone(request);
    this.revision = expected;
    this.state = 'preparing';
    this.busy = true;
    this.error = null;
    this.candidate = null;
    this.files.clear();
    this.keys = [];
    this.changes = [];
    let ready: Project | null = null;
    let analysis: StructureReport | undefined;
    let source: Buffer;
    const valid = () =>
      generation === this.generation &&
      this.host.current() &&
      this.host.flow.project().revision === expected;
    const job = this.host.flow.start({
      key: 'correction-' + randomUUID(),
      kind: 'preview',
      label:
        request.kind === 'reanalyse'
          ? '선택 부위 재분석 · 보정 보호'
          : '선택 부위 보정 · 움직임 준비',
      processingVersion: '1.1.0',
      settings: {
        scope: request.kind,
        keys: request.kind === 'edit' ? request.entries.map((e) => e.key) : request.keys,
      },
      steps: [
        {
          id: 'snapshot-and-proposals',
          version: '1.1.0',
          cache: 'none',
          cancellable: true,
          run: async (ctx) => {
            const a = input.assets.find((a) => a.id === input.inputPreparation!.selectedAssetId)!;
            const bytes = await this.host.cache.read(a);
            if (!bytes) throw new Error('E_CORRECTION_SOURCE');
            source = bytes;
            if (request.kind === 'reanalyse') {
              const result = await this.processor.structure!(
                'analyze',
                source,
                { occluded: input.inputPreparation!.selection.occluded },
                ctx.signal,
              );
              analysis = result.report;
              if (analysis.status === 'failed') throw new Error('E_CORRECTION_ANALYSIS');
            }
            ctx.checkpoint();
            return { snapshot: true };
          },
        },
        {
          id: 'selected-patches-and-base',
          version: '1.1.0',
          cache: 'none',
          cancellable: true,
          run: async (ctx) => {
            const proposed = proposal(input, request, analysis);
            this.changes = proposed.changes;
            this.keys = proposed.changes
              .filter((v) => v.action !== 'keep-protected')
              .map((v) => v.key);
            const result = await this.processor.structure!(
              'build',
              source!,
              { report: proposed.report, completion: 'estimated', keys: this.keys },
              ctx.signal,
            );
            ctx.checkpoint();
            if (!valid()) throw new Error('E_INPUT_STALE');
            if (!this.keys.length) {
              ready = structuredClone(input);
              this.host.emit();
              return { unchanged: true };
            }
            const next = rebuildCorrected(
              input,
              result.report,
              proposed.entries,
              this.keys,
              result.files,
            );
            for (const a of next.project.assets) {
              const b = next.bytes.get(a.id);
              if (b) await this.host.cache.put(a, b);
            }
            ctx.checkpoint();
            if (!valid()) throw new Error('E_INPUT_STALE');
            this.files = result.files;
            ready = next.project;
            return { prepared: true };
          },
        },
      ],
      collect: (_p, identity) => ({
        identity,
        outcome: {
          kind: 'checked',
          reportId: 'single-image-correction',
          dependencies: ['input:*'],
        },
      }),
    });
    this.job = job.jobId;
    this.host.emit();
    void this.host.flow.wait(job.jobId).then((result) => {
      if (generation !== this.generation || !this.host.current()) return;
      this.busy = false;
      if (valid() && result.state === 'SUCCEEDED' && ready) {
        this.candidate = ready;
        this.state = 'review';
      } else {
        this.state = result.state === 'CANCELLED' ? 'cancelled' : 'failed';
        this.error = valid() ? (result.errorCode ?? 'E_INPUT_PROCESSING') : 'E_INPUT_STALE';
      }
      this.host.emit();
    });
  }
  async apply(keys: FeatureKey[], expected: number): Promise<void> {
    featureKeys(keys);
    if (
      this.busy ||
      !this.candidate ||
      expected !== this.revision ||
      this.host.flow.project().revision !== expected ||
      keys.some((k) => !this.keys.includes(k))
    )
      throw new Error('E_INPUT_STALE');
    const generation = this.generation,
      candidate = this.candidate,
      input = this.host.flow.project();
    this.busy = true;
    this.applying = new AbortController();
    this.state = 'applying';
    this.host.emit();
    const valid = () =>
      generation === this.generation &&
      this.host.current() &&
      this.host.flow.project().revision === expected;
    try {
      await this.host.checkpoint();
      if (!valid()) throw new Error('E_INPUT_STALE');
      const source = input.assets.find((a) => a.id === input.inputPreparation!.selectedAssetId)!;
      const bytes = await this.host.cache.read(source);
      if (!bytes) throw new Error('E_CORRECTION_SOURCE');
      const report = structuredClone(input.structure!.report);
      report.regions = report.regions.map((r) =>
        keys.includes(r.key)
          ? structuredClone(candidate.structure!.report.regions.find((v) => v.key === r.key)!)
          : r,
      );
      report.status = report.regions.every((r) => r.observed) ? 'ready' : 'partial';
      report.headGain = report.status === 'ready' ? 0.65 : 0.35;
      report.maxRollDegrees = 6 * report.headGain;
      report.completion = 'estimated';
      report.files = [];
      report.unconfirmed = [
        ...report.unconfirmed.filter((v) => !FEATURE_KEYS.includes(v as FeatureKey)),
        ...report.regions.filter((r) => !r.observed).map((r) => r.key),
      ];
      const entries = [
        ...(input.structure!.corrections?.entries ?? []).filter((e) => !keys.includes(e.key)),
        ...(candidate.structure!.corrections?.entries ?? []).filter((e) => keys.includes(e.key)),
      ];
      const base = await this.processor.structure!(
        'build',
        bytes,
        { report, completion: 'estimated', keys: [] },
        this.applying!.signal,
      );
      if (!valid()) throw new Error('E_INPUT_STALE');
      const files = new Map(this.files);
      files.set('structure-base.png', base.files.get('structure-base.png')!);
      const next = rebuildCorrected(input, base.report, entries, keys, files);
      for (const a of next.project.assets) {
        const b = next.bytes.get(a.id);
        if (b) await this.host.cache.put(a, b);
      }
      if (!valid()) throw new Error('E_INPUT_STALE');
      await this.host.commit((p) => {
        for (const key of [
          'assets',
          'parts',
          'partBindings',
          'motion',
          'structure',
          'schemaVersion',
          'provenance',
        ] as const)
          (p as unknown as Record<string, unknown>)[key] = structuredClone(next.project[key]);
      });
      this.candidate = null;
      this.state = 'applied';
      this.files.clear();
    } catch (e) {
      if (generation !== this.generation) return;
      this.error =
        e instanceof Error && /^E_[A-Z_]+$/.test(e.message) ? e.message : 'E_INPUT_PROCESSING';
      this.state = 'failed';
    } finally {
      if (generation === this.generation) {
        this.busy = false;
        this.applying = null;
        this.host.emit();
      }
    }
  }
  cancel() {
    ++this.generation;
    this.applying?.abort();
    this.applying = null;
    if (this.busy && this.job) this.host.flow.cancel(this.job);
    this.busy = false;
    this.candidate = null;
    this.files.clear();
    this.state = 'cancelled';
    this.error = null;
    this.host.emit();
  }
  retry(expected: number) {
    if (this.request) this.start(this.request, expected);
  }
  dispose() {
    this.cancel();
  }
}
