import { AvatarExportPanel } from './avatar-export-panel';
import { useEffect, useRef, useState } from 'react';
import { Modal } from './ui-foundations';
import {
  defaultImageSettings,
  type ImageSettings,
  type ImageTicket,
} from '../../../packages/image-export/types';
import {
  TARGETS,
  TARGET_ID,
  CHECKER_VERSION,
  CONVERTER_VERSION,
  type TargetOptions,
  type CheckResult,
  type CheckIssue,
} from '../../../packages/export-check/types';
import type {
  SessionView,
  SessionCommand,
  SessionReply,
} from '../../../packages/project-session/contracts';
import type { RunRuntime } from './run-runtime';
import { AvatarRenderer } from '../../../packages/avatar-renderer';
const messages: Record<string, string> = {
  E_IMAGE_STALE: '입력본이 바뀌었습니다. 미리보기를 다시 준비하세요.',
  E_EXPORT_STALE: '검사 뒤 입력본이 바뀌었습니다. 다시 검사하세요.',
  E_IMAGE_RESOURCE: '그림 파일을 다시 연결하세요.',
  E_IMAGE_EMPTY: '표시할 그림이 없습니다. 외형을 준비하세요.',
  E_IMAGE_SETTINGS: 'PNG 크기·배경·배치 설정을 확인하세요.',
  E_IMAGE_POSE: '현재 기준본에서 사용할 표정·자세를 선택하세요.',
  E_IMAGE_RENDER: '그림을 렌더링하지 못했습니다. 설정·그림을 확인하고 다시 준비하세요.',
  E_IMAGE_WRITE: '파일을 저장하지 못했습니다. 다른 위치로 다시 저장하세요.',
  E_IMAGE_SPACE: '저장 공간이 부족합니다. 이전 파일은 유지됩니다.',
  E_IMAGE_PERMISSION: '쓰기 권한이 없습니다. 다른 저장 위치를 선택하세요.',
  E_IMAGE_CONFLICT: '선택한 파일이 다른 곳에서 바뀌었습니다. 저장 위치를 다시 선택하세요.',
  E_IMAGE_DEFER:
    '실행 중에는 2,073,600픽셀 이하로 저장할 수 있습니다. 큰 이미지는 실행 중지 후 준비하세요.',
  E_IMAGE_BUDGET: '그림 디코드 메모리 한도를 넘습니다. 원본을 보존하고 구성을 검토하세요.',
  E_EXPORT_BUDGET: '파일 입력 한도를 넘습니다. 실행 중이면 중지 후 다시 시도하세요.',
  E_EXPORT_BUSY: '저장·연속 편집·분석이 끝난 뒤 준비하세요.',
  E_EXPORT_ACK: '차단 항목이나 바뀐 경고는 확인 처리할 수 없습니다. 다시 검사하세요.',
};
export function defaultTargetOptions(project: NonNullable<SessionView['project']>): TargetOptions {
  return {
    targetId: TARGET_ID,
    parameterMap: project.parameters.map((p) => ({
      parameterId: p.id,
      targetName: p.previewKey ?? p.semantic ?? p.id,
    })),
  };
}
function CopyPreview({ result }: { result: CheckResult }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!result.scene) return;
    const scene = structuredClone(result.scene);
    for (const l of scene.layers) {
      const part = result.copy?.parts.find((p) => p.sourceId === l.id);
      if (part) {
        l.z = -part.z;
        if (l.mesh)
          l.mesh.vertices.forEach((v, i) => {
            const p = part.vertices[i];
            if (p) v.position = [p[0] + scene.canvas[0] / 2, p[1] + scene.canvas[1] / 2];
          });
      }
    }
    let renderer: AvatarRenderer | null = null,
      cancel = false;
    try {
      renderer = new AvatarRenderer(ref.current!, scene);
      void renderer
        .load(document.baseURI)
        .then(() => {
          if (!cancel) renderer!.draw();
        })
        .catch(() => {});
    } catch {
      /* invalid resource is already a report blocker */
    }
    return () => {
      cancel = true;
      renderer?.dispose();
      renderer?.gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [result.id]);
  return <canvas ref={ref} width="360" height="440" aria-label="변환 검토 사본의 원화·중립 좌표" />;
}
export function FileOutputPanel({
  view,
  runtime: r,
  command,
  close,
  fix,
}: {
  view: SessionView;
  runtime: RunRuntime;
  command: (c: SessionCommand) => Promise<SessionReply>;
  close: () => void;
  fix: (issue: CheckIssue) => void;
}) {
  const [source, setSource] = useState<'working' | 'execution'>(
      view.project ? 'working' : 'execution',
    ),
    [tab, setTab] = useState<'image' | 'target'>('image');
  const project = source === 'working' ? view.project : (r.lease?.project ?? null);
  const [form, setForm] = useState<ImageSettings>(() =>
      defaultImageSettings(project?.canvas.width, project?.canvas.height),
    ),
    [ticket, setTicket] = useState<ImageTicket | null>(null),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState(''),
    [options, setOptions] = useState<TargetOptions>(() =>
      project
        ? {
            targetId: TARGET_ID,
            parameterMap: structuredClone(
              project.exportProfiles.find((p) => p.targetVersion === '0.8.7')?.parameterMap ??
                defaultTargetOptions(project).parameterMap,
            ),
          }
        : { targetId: TARGET_ID, parameterMap: [] },
    ),
    [result, setResult] = useState<CheckResult | null>(null),
    [showCopy, setShowCopy] = useState(false);
  const currentRequest = useRef<string | null>(null),
    currentCheck = useRef<string | null>(null),
    epoch = useRef(0);
  const active = useRef(true);
  const cancel = () => {
    ++epoch.current;
    if (currentRequest.current) void window.studio.image.release(currentRequest.current);
    currentRequest.current = null;
    setTicket(null);
    setBusy(false);
  };
  useEffect(() => {
    active.current = true;
    return () => {
      active.current = false;
      ++epoch.current;
      if (currentRequest.current) void window.studio.image.release(currentRequest.current);
      if (currentCheck.current) void window.studio.compatibility.release(currentCheck.current);
    };
  }, []);
  const staleImage =
    !ticket ||
    ticket.basis.source !== source ||
    ticket.basis.projectId !== project?.projectId ||
    ticket.basis.revision !== project?.revision ||
    JSON.stringify(ticket.settings) !== JSON.stringify(form);
  const staleCheck =
    !result ||
    result.basis.source !== source ||
    result.basis.projectId !== project?.projectId ||
    result.basis.revision !== project?.revision ||
    JSON.stringify(result.settings) !== JSON.stringify(options) ||
    result.checkerVersion !== CHECKER_VERSION;
  const error = (code: string | undefined) =>
    setMessage(
      messages[code ?? ''] ?? '작업을 완료하지 못했습니다. 입력과 설정을 확인하고 다시 시도하세요.',
    );
  const prepare = async () => {
    if (!project || busy) return;
    cancel();
    const id = crypto.randomUUID(),
      generation = ++epoch.current;
    currentRequest.current = id;
    setBusy(true);
    setMessage('');
    const reply = await window.studio.image.prepare({
      id,
      source,
      projectId: project.projectId,
      revision: project.revision,
      settings: form,
      live: form.pose === 'live' ? r.player.frame(performance.now()).parameters : null,
    });
    if (!active.current || generation !== epoch.current) {
      void window.studio.image.release(id);
      return;
    }
    setBusy(false);
    if (reply.ok && reply.ticket) setTicket(reply.ticket);
    else error(reply.errorCode);
  };
  const save = async () => {
    if (!ticket || staleImage || busy) return;
    setBusy(true);
    setMessage('');
    const reply = await window.studio.image.save(ticket.id);
    if (!active.current) return;
    setBusy(false);
    if (reply.ok)
      setMessage(
        reply.cancelled
          ? '저장을 취소했습니다. 기존 파일은 유지됩니다.'
          : `저장 완료 · ${reply.receipt?.name} · 입력 리비전 ${reply.receipt?.basis.revision}`,
      );
    else error(reply.errorCode);
  };
  const inspect = async () => {
    if (!project || busy) return;
    const generation = ++epoch.current;
    setBusy(true);
    setMessage('');
    const reply = await window.studio.compatibility.inspect(
      source,
      project.projectId,
      project.revision,
      options,
    );
    if (!active.current || generation !== epoch.current) {
      if (reply.result) void window.studio.compatibility.release(reply.result.id);
      return;
    }
    setBusy(false);
    if (reply.ok && reply.result) {
      currentCheck.current = reply.result.id;
      setResult(reply.result);
      setShowCopy(false);
    } else error(reply.errorCode);
  };
  const chooseSource = (value: 'working' | 'execution') => {
    cancel();
    setSource(value);
    setTicket(null);
    setResult(null);
    setShowCopy(false);
    const p = value === 'working' ? view.project : r.lease?.project;
    if (p) {
      setForm(defaultImageSettings(p.canvas.width, p.canvas.height));
      setOptions({
        targetId: TARGET_ID,
        parameterMap: structuredClone(
          p.exportProfiles.find((v) => v.targetVersion === '0.8.7')?.parameterMap ??
            defaultTargetOptions(p).parameterMap,
        ),
      });
    }
  };
  return (
    <Modal
      titleId="file-output-title"
      className="file-output-dialog"
      onClose={() => {
        cancel();
        close();
      }}
    >
      <h2 id="file-output-title">이미지 저장·외부 대상</h2>
      <div className="file-output-toolbar">
        <label>
          입력본
          <select
            data-file-source
            disabled={busy}
            value={source}
            onChange={(e) => chooseSource(e.target.value as typeof source)}
          >
            <option value="working" disabled={!view.project}>
              작업본
            </option>
            <option value="execution" disabled={!r.active}>
              현재 실행본
            </option>
          </select>
        </label>
        <span data-file-basis>
          {project?.displayName ?? '선택할 입력본 없음'} · 리비전 {project?.revision ?? '—'}
        </span>
        <button
          data-file-tab="image"
          aria-pressed={tab === 'image'}
          onClick={() => setTab('image')}
        >
          정지 PNG 저장
        </button>
        <button
          data-file-tab="target"
          aria-pressed={tab === 'target'}
          onClick={() => setTab('target')}
        >
          외부 아바타 대상·사전검사
        </button>
      </div>
      {message && (
        <p role="status" data-file-message>
          {message}
        </p>
      )}
      {tab === 'image' ? (
        <div className="file-output-grid">
          <div className="image-export-preview">
            {ticket ? (
              <img
                data-image-export-preview
                data-image-sha={ticket.sha256}
                src={ticket.url}
                alt="저장할 PNG 고정 미리보기"
              />
            ) : (
              <p>설정을 선택하고 미리보기를 준비하세요.</p>
            )}
            <p>
              {ticket
                ? `${ticket.settings.width}×${ticket.settings.height} PNG · ${ticket.settings.transparent ? '투명 배경' : '배경 포함'} · 리비전 ${ticket.basis.revision}`
                : '장치·움직임 연결 없이 외형만 저장할 수 있습니다.'}
            </p>
            {ticket && staleImage && (
              <p data-image-stale role="alert">
                입력본 또는 설정이 바뀌었습니다. 다시 준비하세요.
              </p>
            )}
          </div>
          <div>
            <label>
              형식
              <select value="png" disabled>
                <option value="png">PNG · RGBA 8bit / sRGB</option>
              </select>
            </label>
            <div className="file-fields">
              {(['width', 'height'] as const).map((key, i) => (
                <label key={key}>
                  {i ? '높이' : '너비'} px
                  <input
                    data-image-size={key}
                    type="number"
                    min="64"
                    max="4096"
                    value={form[key]}
                    onChange={(e) => setForm((v) => ({ ...v, [key]: Number(e.target.value) }))}
                  />
                </label>
              ))}
            </div>
            <label>
              <input
                data-image-transparent
                type="checkbox"
                checked={form.transparent}
                onChange={(e) => setForm((v) => ({ ...v, transparent: e.target.checked }))}
              />
              투명 배경
            </label>
            <label>
              배경 색
              <input
                data-image-background
                type="color"
                value={form.background}
                onChange={(e) => setForm((v) => ({ ...v, background: e.target.value }))}
              />
            </label>
            <label>
              표정·자세
              <select
                data-image-pose
                value={form.pose === 'expression' ? (form.expressionId ?? 'neutral') : form.pose}
                onChange={(e) =>
                  setForm((v) => ({
                    ...v,
                    pose:
                      e.target.value === 'neutral'
                        ? 'neutral'
                        : e.target.value === 'live'
                          ? 'live'
                          : 'expression',
                    expressionId: ['neutral', 'live'].includes(e.target.value)
                      ? null
                      : e.target.value,
                  }))
                }
              >
                <option value="neutral">기본 자세</option>
                {project?.expressions.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.displayName}
                  </option>
                ))}
                {source === 'execution' && <option value="live">현재 실행 입력 고정</option>}
              </select>
            </label>
            {(['scale', 'x', 'y'] as const).map((key, i) => (
              <label key={key}>
                {['크기', '가로 위치', '세로 위치'][i]}
                <input
                  data-image-placement={key}
                  type="range"
                  min={key === 'scale' ? 0.1 : -1}
                  max={key === 'scale' ? 3 : 1}
                  step=".01"
                  value={form[key]}
                  onChange={(e) => setForm((v) => ({ ...v, [key]: Number(e.target.value) }))}
                />
                {form[key].toFixed(2)}
              </label>
            ))}
            <details>
              <summary>잘림 %</summary>
              <div className="file-fields">
                {(['left', 'right', 'top', 'bottom'] as const).map((key, i) => (
                  <label key={key}>
                    {['왼쪽', '오른쪽', '위', '아래'][i]}
                    <input
                      data-image-crop={key}
                      type="number"
                      min="0"
                      max="45"
                      value={Math.round(form.crop[key] * 100)}
                      onChange={(e) =>
                        setForm((v) => ({
                          ...v,
                          crop: { ...v.crop, [key]: Number(e.target.value) / 100 },
                        }))
                      }
                    />
                  </label>
                ))}
              </div>
            </details>
            <div className="edit-actions">
              <button data-image-prepare disabled={busy || !project} onClick={() => void prepare()}>
                미리보기 준비
              </button>
              <button data-image-save disabled={busy || staleImage} onClick={() => void save()}>
                이 미리보기 PNG 저장
              </button>
              <button data-image-cancel disabled={!busy} onClick={cancel}>
                준비 취소
              </button>
            </div>
            <p>
              64~4096px/한 변 · 최대 16,777,216픽셀. 체크무늬·편집 UI·카메라 영상은 PNG에 포함되지
              않습니다.
            </p>
          </div>
        </div>
      ) : (
        <div>
          <label>
            대상 프로필
            <select
              data-export-target
              value={options.targetId}
              onChange={(e) => setOptions((v) => ({ ...v, targetId: e.target.value }))}
            >
              {TARGETS.map((t) => (
                <option key={t.id} value={t.id} disabled={t.status !== 'inspection-supported'}>
                  {t.name} {t.version} ·{' '}
                  {t.status === 'inspection-supported'
                    ? '검사·INP 내보내기 지원'
                    : t.status === 'experimental'
                      ? '실험'
                      : '미지원'}
                </option>
              ))}
            </select>
          </label>
          <p>
            INP · Inochi Session 0.8.7 / SDK 0.8.6 · 검사 {CHECKER_VERSION} / 변환 검토{' '}
            {CONVERTER_VERSION}
          </p>
          <p>{TARGETS[0].validation}. 실제 파일 변환·움직임 검토·저장은 아래에서 진행합니다.</p>
          <details>
            <summary>필수 구조·제한</summary>
            <p>
              {TARGETS[0].description} · 초기 어댑터 64부위/128텍스처 · 4096px/그림 · RGBA 합계
              256MiB. 원화나 핵심 움직임을 자동 삭제·축소하지 않습니다.
            </p>
          </details>
          <details>
            <summary>매개변수 대상 이름</summary>
            <div className="file-fields">
              {project?.parameters.map((p) => (
                <label key={p.id}>
                  {p.displayName}
                  <input
                    data-export-map={p.id}
                    maxLength={120}
                    value={
                      options.parameterMap.find((m) => m.parameterId === p.id)?.targetName ?? ''
                    }
                    onChange={(e) =>
                      setOptions((v) => ({
                        ...v,
                        parameterMap: [
                          ...v.parameterMap.filter((m) => m.parameterId !== p.id),
                          { parameterId: p.id, targetName: e.target.value },
                        ],
                      }))
                    }
                  />
                </label>
              ))}
            </div>
          </details>
          <div className="edit-actions">
            <button
              data-export-remember
              disabled={busy || source !== 'working' || !project}
              onClick={() => {
                if (!project) return;
                const prev = project.exportProfiles.find((p) => p.targetVersion === '0.8.7');
                void command({
                  type: 'export-profile',
                  expectedRevision: project.revision,
                  profile: {
                    id: prev?.id ?? crypto.randomUUID(),
                    revision: (prev?.revision ?? 0) + 1,
                    displayName: 'Inochi Session 0.8.7',
                    target: 'inochi2d',
                    targetVersion: '0.8.7',
                    format: 'inp',
                    converterVersion: CONVERTER_VERSION,
                    parameterMap: options.parameterMap,
                  },
                }).then((reply) =>
                  setMessage(
                    reply.view.errorCode
                      ? '설정을 기억하지 못했습니다. 연결을 확인하세요.'
                      : '프로젝트에 대상 설정을 기억했습니다. 프로젝트 저장 후 다시 열어도 재사용합니다.',
                  ),
                );
              }}
            >
              프로젝트에 대상 설정 기억
            </button>
            <button data-export-inspect disabled={busy || !project} onClick={() => void inspect()}>
              현재 입력본 사전검사
            </button>
          </div>
          {result && (
            <section data-export-result data-export-status={staleCheck ? 'STALE' : result.status}>
              <h3>
                {staleCheck
                  ? '오래된 검사 · 다시 검사'
                  : { PASS: '통과', WARNING: '경고 검토 필요', BLOCKED: '차단 · 수정 필요' }[
                      result.status
                    ]}
              </h3>
              <p>
                입력 {result.basis.revision} · 대상 {result.targetVersion} · 검사{' '}
                {result.checkerVersion}. 파일 생성·외부 구동 확인과 구분합니다.
              </p>
              <ul className="compatibility-issues">
                {result.issues.map((issue) => (
                  <li key={issue.id}>
                    <strong>
                      {issue.severity === 'block' ? '차단' : '경고'} · {issue.message}
                    </strong>
                    <p>{issue.impact}</p>
                    <p>{issue.alternative}</p>
                    <button
                      data-export-fix={issue.id}
                      disabled={
                        staleCheck ||
                        (source === 'execution' && project?.projectId !== view.project?.projectId)
                      }
                      onClick={() => {
                        cancel();
                        close();
                        fix(issue);
                      }}
                    >
                      수정 위치로
                    </button>
                  </li>
                ))}
              </ul>
              {!result.issues.length && (
                <p>현재 사전검사 항목을 통과했습니다. 외부 파일은 아직 생성되지 않았습니다.</p>
              )}
              <button
                data-export-copy
                disabled={!result.copy || staleCheck}
                onClick={() => setShowCopy((v) => !v)}
              >
                변환 검토 사본 {showCopy ? '닫기' : '보기'}
              </button>
              {showCopy && result.copy && (
                <div className="conversion-review">
                  <CopyPreview result={result} />
                  <div>
                    <p>
                      원화·중립 좌표 검토입니다. 차단된 변형을 적용한 외부 실행 화면은 아닙니다.
                    </p>
                    {result.copy.changes.map((c) => (
                      <p key={c}>{c}</p>
                    ))}
                    <p>
                      {result.copy.parts.length} 부위 · {result.copy.parameters.length} 매개변수 ·{' '}
                      {result.copy.textures.length} 텍스처 · {result.copy.expressions.length} 표정
                    </p>
                    <details>
                      <summary>사본 이름·좌표·파일 변환 규약</summary>
                      <pre>{JSON.stringify(result.copy, null, 2)}</pre>
                    </details>
                  </div>
                </div>
              )}
              <div className="edit-actions">
                <button
                  data-export-ack
                  disabled={
                    busy || staleCheck || result.status !== 'WARNING' || result.acknowledged
                  }
                  onClick={() =>
                    void window.studio.compatibility
                      .acknowledge(result.id, result.signature, result.warningScope, options)
                      .then((reply) => {
                        if (reply.ok && reply.result) setResult(reply.result);
                        else error(reply.errorCode);
                      })
                  }
                >
                  {result.acknowledged
                    ? '이 입력/대상/경고 범위 확인됨'
                    : '이 입력·대상·경고 범위 확인'}
                </button>
                <button
                  data-export-verify
                  disabled={busy}
                  onClick={() =>
                    void window.studio.compatibility.verify(result.id, options).then((reply) => {
                      if (!reply.ok) error(reply.errorCode);
                      else setMessage('입력·대상·검사 버전이 일치합니다.');
                    })
                  }
                >
                  검사 유효성 확인
                </button>
              </div>
            </section>
          )}
          <AvatarExportPanel result={result} stale={staleCheck} running={r.active} />
        </div>
      )}
    </Modal>
  );
}
