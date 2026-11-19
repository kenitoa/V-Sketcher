import { useEffect, useState } from 'react';
import './workflow.css';
import { TaskCard, Modal } from './ui-foundations';
import { Workflow, type JobState, type Plan, type Json } from '../../../packages/workflow';
import { editProject, type Project } from '../../../packages/project-model';
const labels: Record<JobState, string> = {
  QUEUED: '대기 중',
  RUNNING: '처리 중',
  CANCEL_REQUESTED: '취소 정리 중',
  RESULT_READY: '결과 확인 중',
  AWAITING_REVIEW: '최신 보정과 비교 필요',
  SUCCEEDED: '적용 완료',
  FAILED: '작업 실패',
  CANCELLED: '취소 완료',
  DISCARDED: '결과 폐기됨',
};
export interface LabController {
  flow: Workflow;
  start(): string;
  complete(): void;
  edit(): void;
  fail(): void;
  owned(): number;
}
export function createLab(project: Project): LabController {
  const flow = new Workflow(project);
  let complete: (v: Json) => void = () => {};
  let failing = false;
  let owned = 0;
  const plan: Plan = {
    key: 'fixed-state-lab',
    label: '고정 입력 상태 시험',
    kind: 'prepare',
    processingVersion: '1.0.0',
    settings: { mode: 'fixed-input-no-analysis' },
    steps: [
      {
        id: 'input',
        version: '1.0.0',
        cache: 'pure-json',
        cancellable: true,
        run: async (context) => {
          context.progress(0.5);
          return { sourceRevision: context.input.revision };
        },
      },
      {
        id: 'result',
        version: '1.0.0',
        cache: 'none',
        cancellable: true,
        run: async (context) => {
          owned++;
          context.own(() => {
            owned--;
          });
          await new Promise<Json>((resolve) => {
            complete = resolve;
            const abort = (): void => resolve(null);
            if (context.signal.aborted) resolve(null);
            else {
              context.signal.addEventListener('abort', abort, { once: true });
              context.own(() => context.signal.removeEventListener('abort', abort));
            }
          });
          if (failing) {
            failing = false;
            throw new Error('E_FIXTURE_STAGE');
          }
          return null;
        },
      },
    ],
    collect: (input, identity) => ({
      identity,
      outcome: {
        kind: 'candidate',
        project: editProject(input, (draft) => {
          draft.parts[0]!.displayName = '자동 제안';
          draft.parts[1]!.opacity = 0.8;
        }),
      },
    }),
  };
  return {
    flow,
    start: () => flow.start(plan).jobId,
    complete: () => complete(null),
    edit: () =>
      flow.edit('수동 보정', (draft) => {
        draft.parts[0]!.displayName = '내 보정';
      }),
    fail: () => {
      failing = true;
    },
    owned: () => owned,
  };
}
export function WorkflowLab({ project, onClose }: { project: Project; onClose: () => void }) {
  const [lab] = useState(() => createLab(project));
  const [view, setView] = useState(lab.flow.view());
  const [id, setId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [excluded, setExcluded] = useState<Set<string>>(new Set());
  useEffect(() => setExcluded(new Set()), [id]);
  useEffect(() => lab.flow.subscribe(() => setView(lab.flow.view())), [lab]);
  useEffect(() => {
    return () => {
      void lab.flow.close();
    };
  }, [lab]);
  const job = view.jobs.find((v) => v.jobId === id);
  const comparison = job?.state === 'AWAITING_REVIEW' ? lab.flow.comparison(job.jobId) : null;
  const safe =
    comparison?.changes
      .filter((v) => v.status === 'safe' && !excluded.has(v.key))
      .map((v) => v.key) ?? [];
  const apply = async (): Promise<void> => {
    if (!id || !comparison) return;
    const result = await lab.flow.applyReviewed(id, comparison.revision, safe);
    setMessage(
      result.applied
        ? '최신 보정을 유지하고 선택 항목을 적용했어요.'
        : '현재 구조에서 다시 확인해야 해요.',
    );
  };
  useEffect(() => {
    window.workflowLabCheck = async (options) => {
      const click = (selector: string): void => {
        const element = document.querySelector<HTMLButtonElement>(selector);
        if (!element || element.disabled) throw new Error('E_WORKFLOW_UI_CONTROL');
        element.click();
      };
      const until = async (predicate: () => boolean): Promise<void> => {
        const start = performance.now();
        while (!predicate()) {
          if (performance.now() - start > 5000) throw new Error('E_WORKFLOW_UI_TIMEOUT');
          await new Promise((resolve) => setTimeout(resolve, 10));
        }
      };
      click('[data-workflow-start]');
      await until(
        () =>
          document.querySelector('[data-workflow-state]')?.getAttribute('data-workflow-state') ===
          'RUNNING',
      );
      await until(() => lab.flow.view().jobs.at(-1)?.stageId === 'result');
      click('[data-workflow-edit]');
      click('[data-workflow-complete]');
      await until(
        () =>
          document.querySelector('[data-workflow-state]')?.getAttribute('data-workflow-state') ===
          'AWAITING_REVIEW',
      );
      const hasComparison = document.querySelectorAll('[data-workflow-comparison]').length > 0;
      const comparisonValuesVisible = [...document.querySelectorAll('[data-workflow-values]')].some(
        (element) =>
          element.textContent?.includes('내 보정') && element.textContent?.includes('자동 제안'),
      );
      if (options?.holdForCapture)
        return { passed: hasComparison, heldForCapture: true, comparisonVisible: hasComparison };
      click('[data-workflow-apply]');
      await until(
        () =>
          document.querySelector('[data-workflow-state]')?.getAttribute('data-workflow-state') ===
          'SUCCEEDED',
      );
      const preserved =
        lab.flow.project().parts[0]!.displayName === '내 보정' &&
        lab.flow.project().parts[1]!.opacity === 0.8;
      click('[data-workflow-start]');
      await until(() => lab.flow.view().jobs.at(-1)?.stageId === 'result');
      click('.workflow-lab [data-task-cancel]');
      await until(
        () =>
          document.querySelector('[data-workflow-state]')?.getAttribute('data-workflow-state') ===
          'CANCELLED',
      );
      click('[data-workflow-start]');
      await until(() => lab.flow.view().jobs.at(-1)?.stageId === 'result');
      lab.fail();
      click('[data-workflow-complete]');
      await until(() => lab.flow.view().jobs.at(-1)?.state === 'FAILED');
      click('.workflow-lab [data-task-retry]');
      await until(
        () =>
          lab.flow.view().jobs.at(-1)?.stageId === 'result' &&
          lab.flow.view().jobs.at(-1)?.state === 'RUNNING',
      );
      click('[data-workflow-complete]');
      await until(() => lab.flow.view().jobs.at(-1)?.state === 'SUCCEEDED');
      const result = {
        passed: hasComparison && comparisonValuesVisible && preserved && lab.owned() === 0,
        comparisonVisible: hasComparison,
        comparisonValuesVisible,
        manualCorrectionPreserved: preserved,
        cancelled: true,
        commonTaskRetry: true,
        ownedResources: lab.owned(),
      };
      await lab.flow.close();
      onClose();
      return result;
    };
    return () => {
      delete window.workflowLabCheck;
    };
  }, [lab, onClose]);
  return (
    <Modal
      titleId="workflow-title"
      className="workflow-lab"
      onClose={() => {
        void lab.flow.close().then(onClose);
      }}
    >
      <span className="eyebrow">DEVELOPMENT ONLY</span>
      <h2 id="workflow-title">작업 상태 시험</h2>
      <p>고정 입력을 사용하는 상태 시험입니다. 실제 분석·파일 저장을 실행하지 않습니다.</p>
      <div data-workflow-state={job?.state ?? 'IDLE'} role="status">
        <strong>{job ? labels[job.state] : '시작 전'}</strong>
        <p>
          {job?.stageId === 'input'
            ? '입력 고정'
            : job?.stageId === 'result'
              ? '결과 준비 단계'
              : '작업을 시작해 주세요.'}
        </p>
        {job && (
          <TaskCard
            job={job}
            onCancel={() => {
              if (id) lab.flow.cancel(id);
            }}
            onRetry={() => {
              if (id) setId(lab.flow.retry(id).jobId);
            }}
          />
        )}
      </div>
      <div className="workflow-actions">
        <button
          data-workflow-start
          disabled={!!job && !['SUCCEEDED', 'FAILED', 'CANCELLED', 'DISCARDED'].includes(job.state)}
          onClick={() => {
            setId(lab.start());
            setMessage('');
          }}
        >
          시험 시작
        </button>
        <button data-workflow-edit onClick={() => lab.edit()}>
          처리 중 수동 보정
        </button>
        <button
          data-workflow-complete
          disabled={job?.state !== 'RUNNING' || job.stageId !== 'result'}
          onClick={() => lab.complete()}
        >
          현재 단계 완료
        </button>
        <button
          data-workflow-cancel
          disabled={
            !job || !['RUNNING', 'QUEUED', 'RESULT_READY', 'AWAITING_REVIEW'].includes(job.state)
          }
          onClick={() => {
            if (id) lab.flow.cancel(id);
          }}
        >
          취소
        </button>
        <button onClick={() => lab.fail()}>다음 단계 실패 시험</button>
        <button
          disabled={!job || !['FAILED', 'CANCELLED'].includes(job.state)}
          onClick={() => {
            if (id) setId(lab.flow.retry(id).jobId);
          }}
        >
          실패 단계 재시도
        </button>
      </div>
      {comparison && (
        <div>
          <h3>현재 보정과 비교</h3>
          {comparison.changes.map((change) => (
            <div data-workflow-comparison key={change.key}>
              <p>
                <label>
                  <input
                    type="checkbox"
                    disabled={change.status !== 'safe'}
                    checked={change.status === 'safe' && !excluded.has(change.key)}
                    onChange={(event) => {
                      const selected = event.currentTarget.checked;
                      setExcluded((prior) => {
                        const next = new Set(prior);
                        if (selected) next.delete(change.key);
                        else next.add(change.key);
                        return next;
                      });
                    }}
                  />
                  {change.key} ·{' '}
                  {change.status === 'conflict'
                    ? '현재 보정 유지'
                    : change.status === 'already'
                      ? '이미 반영됨'
                      : '선택 적용 가능'}
                </label>
              </p>
              <p data-workflow-values>
                입력 시점: {JSON.stringify(change.before.value)}
                <br />
                현재: {JSON.stringify(change.current.value)} · 작업 제안:{' '}
                {JSON.stringify(change.after.value)}
              </p>
            </div>
          ))}
          <div className="workflow-actions">
            <button
              data-workflow-apply
              disabled={!safe.length}
              onClick={() => {
                void apply();
              }}
            >
              안전한 항목 적용
            </button>
            <button
              onClick={() => {
                if (id) {
                  const result = lab.flow.revalidate(id, comparison.revision, safe);
                  setMessage(result.valid ? '선택 항목 검증 통과' : '추가 보정이 필요해요.');
                }
              }}
            >
              재검증
            </button>
            <button
              onClick={() => {
                if (id) void lab.flow.discard(id);
              }}
            >
              결과 폐기
            </button>
            <button
              onClick={() => {
                if (id) void lab.flow.rerun(id).then((next) => setId(next.jobId));
              }}
            >
              최신 입력으로 재실행
            </button>
          </div>
        </div>
      )}
      <p role="status">{message}</p>
    </Modal>
  );
}
