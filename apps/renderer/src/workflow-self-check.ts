import { Workflow, type Plan, type Json } from '../../../packages/workflow';
import { editProject, type Project } from '../../../packages/project-model';
/** Explicit automatic check, never presented as real image analysis or file I/O. */
export async function checkWorkflow(project: Project): Promise<Record<string, unknown>> {
  const flow = new Workflow(project);
  let release!: (value: Json) => void;
  let start!: () => void;
  let owned = 0;
  const started = new Promise<void>((resolve) => {
    start = resolve;
  });
  const plan: Plan = {
    key: 'renderer-lifecycle',
    label: '명시적 상태 검증',
    kind: 'prepare',
    processingVersion: '1.0.0',
    settings: { fixture: true },
    steps: [
      {
        id: 'fixed-result',
        version: '1.0.0',
        cache: 'none',
        cancellable: true,
        run: async (context) => {
          owned++;
          context.own(() => {
            owned--;
          });
          start();
          return new Promise<Json>((resolve) => {
            release = resolve;
          });
        },
      },
    ],
    collect: (input, identity) => ({
      identity,
      outcome: {
        kind: 'candidate',
        project: editProject(input, (draft) => {
          draft.parts[1]!.opacity = 0.75;
        }),
      },
    }),
  };
  try {
    flow.stageRuntime();
    const runtime = flow.publishAtFrameBoundary();
    const id = flow.start(plan).jobId;
    await started;
    flow.edit('현재 수정 보존', (draft) => {
      draft.displayName = '최신 편집';
    });
    release(null);
    const completed = await flow.wait(id);
    const held = completed.state === 'AWAITING_REVIEW';
    const comparison = flow.comparison(id);
    const applied = await flow.applyReviewed(id, comparison.revision);
    const preserved = flow.project().displayName === '최신 편집';
    const snapshotPreserved = flow.runtimeSnapshot() === runtime;
    const report = {
      passed: held && applied.applied && preserved && snapshotPreserved && owned === 0,
      staleHeld: held,
      reviewApplied: applied.applied,
      latestEditPreserved: preserved,
      runtimeSnapshotPreserved: snapshotPreserved,
      ownedResources: owned,
      scope:
        'Fixed in-memory async state check; no real analysis, disk save, tracking or broadcast',
    };
    return report;
  } finally {
    await flow.close();
  }
}
