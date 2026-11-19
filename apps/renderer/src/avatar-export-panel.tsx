import { useEffect, useRef, useState } from 'react';
import { NEUTRAL, type Parameters } from '../../../packages/scene-core';
import type { CheckResult } from '../../../packages/export-check/types';
import type { AvatarReceipt, AvatarTicket } from '../../../packages/avatar-export/types';
import { AvatarRenderer } from '../../../packages/avatar-renderer';
const errors: Record<string, string> = {
  E_AVATAR_DEFER:
    '외부 파일 변환은 실행 중지 후 작업본 기준으로 준비하세요. 방송과 입력 처리를 보호하기 위해 실행 중에는 보류합니다.',
  E_AVATAR_STALE: '입력·설정이 바뀌었습니다. 재검사 후 변환을 다시 준비하세요.',
  E_AVATAR_CHECK: '차단 항목을 수정하고 현재 검사 경고를 확인하세요.',
  E_AVATAR_CANCELLED: '변환을 취소했습니다. 기존 파일은 유지됩니다.',
  E_AVATAR_BUSY: '이전 작업을 정리하고 있습니다. 잠시 후 다시 시도하세요.',
  E_AVATAR_CONFLICT: '선택한 파일이 다른 곳에서 변경됐습니다. 저장 위치를 다시 선택하세요.',
  E_AVATAR_SPACE: '저장 공간이 부족합니다. 이전 정상 파일은 유지됩니다.',
  E_AVATAR_PERMISSION: '쓰기 권한이 없습니다. 다른 저장 위치를 선택하세요.',
  E_AVATAR_CHANGED: '파일의 내용이 달라졌거나 없습니다. 같은 해시의 INP를 다시 연결하세요.',
  E_AVATAR_VERSION: '확인한 대상 버전이 0.8.7과 다릅니다. 이 버전은 지원 검증 대상이 아닙니다.',
  E_AVATAR_BUDGET: '변환 텍스처/파일 예산을 초과했습니다. 원본은 유지되며 구성 검토가 필요합니다.',
  E_AVATAR_COUPLING: '현재 대상에서 보존하지 못하는 교차 변형입니다. 해당 연결을 검토하세요.',
};
function ConvertedPreview({
  ticket,
  values,
  expressionId,
}: {
  ticket: AvatarTicket;
  values: Parameters;
  expressionId: string | null;
}) {
  const canvas = useRef<HTMLCanvasElement>(null),
    renderer = useRef<AvatarRenderer | null>(null),
    epoch = useRef(0),
    queue = useRef(Promise.resolve()),
    [error, setError] = useState(false);
  useEffect(() => {
    const id = ++epoch.current;
    queue.current = queue.current.then(async () => {
      const reply = await window.studio.avatar.preview(ticket.id, values, expressionId);
      if (id !== epoch.current) return;
      if (!reply.ok || !reply.scene) {
        setError(true);
        return;
      }
      try {
        if (!renderer.current) {
          renderer.current = new AvatarRenderer(canvas.current!, reply.scene);
          await renderer.current.load(document.baseURI);
          renderer.current.draw();
        } else await renderer.current.setNativeScene(reply.scene, document.baseURI);
        if (id === epoch.current)
          canvas.current!.dataset.nativePose = JSON.stringify(values) + ':' + expressionId;
        setError(false);
      } catch {
        setError(true);
      }
    });
  }, [ticket.id, JSON.stringify(values), expressionId]);
  useEffect(() => {
    const element = canvas.current!;
    const capture = (event: Event) => {
      const output = (event as CustomEvent<{ data: string | null }>).detail;
      if (renderer.current) {
        renderer.current.draw();
        output.data = element.toDataURL('image/png');
      }
    };
    element.addEventListener('avatar-capture', capture);
    return () => element.removeEventListener('avatar-capture', capture);
  }, []);
  useEffect(
    () => () => {
      ++epoch.current;
      renderer.current?.dispose();
      renderer.current?.gl.getExtension('WEBGL_lose_context')?.loseContext();
      renderer.current = null;
    },
    [],
  );
  return (
    <div className="image-export-preview">
      <canvas
        data-avatar-preview
        ref={canvas}
        width="480"
        height="600"
        aria-label="실제 INP 키점·텍스처를 해석한 변환 미리보기"
      />
      {error && <p role="alert">변환 미리보기를 표시하지 못했습니다. 다시 준비하세요.</p>}
      <p>
        실제 INP의 망·상태·키점을 해석한 앱 미리보기입니다. 외부 프로그램 구동 확인은 저장 후 별도로
        기록합니다.
      </p>
    </div>
  );
}
export function AvatarExportPanel({
  result,
  stale,
  running,
}: {
  result: CheckResult | null;
  stale: boolean;
  running: boolean;
}) {
  const [ticket, setTicket] = useState<AvatarTicket | null>(null),
    [busy, setBusy] = useState(false),
    [demo, setDemo] = useState(true),
    [reviewed, setReviewed] = useState(false),
    [message, setMessage] = useState(''),
    [values, setValues] = useState<Parameters>({ ...NEUTRAL }),
    [expression, setExpression] = useState<string | null>(null),
    [playing, setPlaying] = useState(false),
    [rows, setRows] = useState<AvatarReceipt[]>([]),
    [version, setVersion] = useState('0.8.7');
  const request = useRef<string | null>(null),
    cancelPending = useRef(false),
    alive = useRef(true),
    serial = useRef(0);
  const error = (code?: string) =>
    setMessage(
      errors[code ?? ''] ??
        '작업을 완료하지 못했습니다. 기존 파일은 유지됩니다. 입력·경로를 확인하고 다시 시도하세요.',
    );
  const refresh = async () => {
    const r = await window.studio.avatar.list();
    if (alive.current) {
      if (r.ok) setRows(r.receipts ?? []);
      else error(r.errorCode);
    }
  };
  useEffect(() => {
    alive.current = true;
    void refresh();
    return () => {
      alive.current = false;
      ++serial.current;
      if (request.current) void window.studio.avatar.cancel(request.current);
    };
  }, []);
  useEffect(() => {
    setReviewed(false);
    setPlaying(false);
  }, [stale, result?.id, demo]);
  useEffect(() => {
    if (!playing) return;
    const start = performance.now(),
      timer = setInterval(() => {
        const t = (performance.now() - start) / 1000;
        setValues({
          eye_left: 1 - Math.max(0, Math.cos(t * Math.PI)) ** 12,
          eye_right: 1 - Math.max(0, Math.cos((t + 0.12) * Math.PI)) ** 12,
          mouth: (1 - Math.cos(t * Math.PI)) / 2,
          head_yaw: Math.sin((t * Math.PI) / 2),
          head_roll: Math.sin((t * Math.PI) / 2),
        });
      }, 100);
    return () => clearInterval(timer);
  }, [playing]);
  const prepare = async () => {
    if (!result || stale || busy) return;
    const id = crypto.randomUUID(),
      generation = ++serial.current;
    if (request.current) await window.studio.avatar.cancel(request.current);
    request.current = id;
    setTicket(null);
    setReviewed(false);
    setBusy(true);
    setMessage('망·표정·텍스처를 변환하고 INP 전체를 다시 검사합니다.');
    const r = await window.studio.avatar.prepare(id, result.id, result.settings, demo);
    if (!alive.current || generation !== serial.current) {
      void window.studio.avatar.cancel(id);
      return;
    }
    setBusy(false);
    if (r.ok && r.ticket) {
      setTicket(r.ticket);
      setValues({ ...NEUTRAL });
      setExpression(null);
      setMessage('변환 준비 완료 · 움직임을 확인한 뒤 저장하세요.');
    } else error(r.errorCode);
  };
  const cancel = async () => {
    if (cancelPending.current) return;
    cancelPending.current = true;
    const generation = ++serial.current,
      id = request.current;
    setBusy(true);
    setPlaying(false);
    setMessage('취소 요청 · 변환/쓰기 자원을 정리하고 있습니다.');
    const reply = id ? await window.studio.avatar.cancel(id) : null;
    cancelPending.current = false;
    if (!alive.current || generation !== serial.current) return;
    request.current = null;
    setTicket(null);
    setBusy(false);
    setMessage(
      reply?.committed
        ? '정리 완료 · 이미 확정한 파일은 유지됩니다. 결과 목록을 확인하세요.'
        : '취소 완료 · 기존 파일은 유지됩니다.',
    );
    await refresh();
  };
  const save = async () => {
    if (!ticket || busy || !reviewed || stale) return;
    setBusy(true);
    const generation = serial.current,
      r = await window.studio.avatar.save(ticket.id, ticket.sha256);
    if (!alive.current || generation !== serial.current) return;
    setBusy(false);
    if (r.ok) {
      setMessage(
        r.cancelled
          ? '저장을 취소했습니다. 기존 파일은 유지됩니다.'
          : `INP 저장 완료 · ${r.receipt?.name} · 입력 리비전 ${r.receipt?.basis.revision}${r.receipt?.newerEdits ? ' · 더 최신 편집 있음' : ''}${r.receipt?.historyWarning ? ' · 파일 저장은 완료됐으나 이력 저장에 실패했습니다. 선택한 파일 위치를 확인하세요.' : ''}`,
      );
      await refresh();
    } else error(r.errorCode);
  };
  return (
    <section className="avatar-export" data-avatar-panel>
      <h3>외부 아바타 파일</h3>
      {running && (
        <p role="status">
          실행을 중지한 뒤 작업본 기준으로 외부 변환을 준비하세요. 방송·입력 처리를 보호하기 위해
          실행 중에는 보류합니다.
        </p>
      )}
      <label>
        <input
          data-avatar-demo
          type="checkbox"
          checked={demo}
          disabled={busy}
          onChange={(e) => setDemo(e.target.checked)}
        />
        장치 없이 사용할 내장 움직임·저장 표정 순환 포함
      </label>
      <div className="edit-actions">
        <button
          data-avatar-prepare
          disabled={
            running ||
            busy ||
            stale ||
            !result ||
            result.status === 'BLOCKED' ||
            (result.status === 'WARNING' && !result.acknowledged)
          }
          onClick={() => void prepare()}
        >
          INP 변환·미리보기 준비
        </button>
        <button
          data-avatar-cancel
          disabled={cancelPending.current || (!busy && !ticket)}
          onClick={() => void cancel()}
        >
          변환 취소·정리
        </button>
      </div>
      <p data-avatar-message role="status">
        {message}
      </p>
      {ticket && (
        <div data-avatar-ticket data-avatar-id={ticket.id} data-avatar-sha={ticket.sha256}>
          <p>
            고정 입력 리비전 {ticket.basis.revision} · INP · {(ticket.bytes / 1048576).toFixed(2)}{' '}
            MiB · 변환 {ticket.report.converterVersion}
          </p>
          {stale && (
            <p role="alert">더 최신 입력이나 검사 설정이 있습니다. 재검사·재변환 후 저장하세요.</p>
          )}
          <div className="file-output-grid">
            <ConvertedPreview
              key={ticket.id}
              ticket={ticket}
              values={values}
              expressionId={expression}
            />
            <div>
              <button
                data-avatar-play
                aria-pressed={playing}
                onClick={() => {
                  setExpression(null);
                  setPlaying((v) => !v);
                }}
              >
                {playing ? '움직임 중지' : '변환 움직임 재생'}
              </button>
              {(Object.keys(NEUTRAL) as (keyof Parameters)[]).map((key) => (
                <label key={key}>
                  {
                    {
                      eye_left: '왼쪽 눈',
                      eye_right: '오른쪽 눈',
                      mouth: '입',
                      head_yaw: '고개 좌우',
                      head_roll: '고개 기울기',
                    }[key]
                  }
                  <input
                    data-avatar-input={key}
                    type="range"
                    min={key.startsWith('head') ? -1 : 0}
                    max="1"
                    step=".01"
                    value={values[key]}
                    onChange={(e) => {
                      setPlaying(false);
                      setExpression(null);
                      setValues((v) => ({ ...v, [key]: Number(e.target.value) }));
                    }}
                  />
                </label>
              ))}
              <label>
                저장 표정
                <select
                  data-avatar-expression
                  value={expression ?? ''}
                  onChange={(e) => {
                    setPlaying(false);
                    setExpression(e.target.value || null);
                  }}
                >
                  <option value="">수동 입력</option>
                  {ticket.report.expressions.map((e) => (
                    <option key={e.sourceId} value={e.sourceId}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </label>
              {ticket.report.approximations.map((v) => (
                <p key={v}>{v}</p>
              ))}
            </div>
          </div>
          <label>
            <input
              data-avatar-reviewed
              type="checkbox"
              checked={reviewed}
              onChange={(e) => setReviewed(e.target.checked)}
            />
            변환 움직임·표정과 현재 경고 범위를 확인했습니다.
          </label>
          <button
            data-avatar-save
            disabled={running || busy || stale || !reviewed || ticket.report.demo !== demo}
            onClick={() => void save()}
          >
            이 INP 저장
          </button>
          <details>
            <summary>결과 파일·부위·표정·리소스 보고</summary>
            <p>
              텍스처 {ticket.report.textures.length}개와 보고서는 단일 INP에 내장됩니다. 외부 종속
              파일은 없습니다.
            </p>
            <pre>{JSON.stringify(ticket.report, null, 2)}</pre>
          </details>
          <ol>
            {ticket.report.guide.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ol>
        </div>
      )}
      <h3>저장 결과·외부 확인</h3>
      <button data-avatar-refresh disabled={busy} onClick={() => void refresh()}>
        결과 상태 새로 확인
      </button>
      <label>
        직접 확인한 Inochi Session 버전
        <input
          data-avatar-version
          value={version}
          onChange={(e) => setVersion(e.target.value)}
          maxLength={20}
        />
      </label>
      {rows.length === 0 && <p>저장한 외부 아바타 파일이 없습니다.</p>}
      <ul data-avatar-history>
        {rows.map((row) => (
          <li key={row.id} data-avatar-record={row.id}>
            <strong>{row.name}</strong>
            <p>
              리비전 {row.basis.revision} · 변환 {row.converterVersion} ·{' '}
              {row.fileState === 'PRESENT'
                ? '파일 있음'
                : row.fileState === 'MISSING'
                  ? '누락·이동됨'
                  : '파일 내용 변경'}{' '}
              · {row.current ? '현재 입력' : '이전 입력·재내보내기 필요'}
            </p>
            <p>
              {row.confirmation
                ? `사용자 외부 확인 · ${row.confirmation.targetVersion} · ${row.current ? '현재' : '과거 결과 기록'}`
                : '외부 구동 미확인 · 파일 저장과 별도'}
            </p>
            <button
              data-avatar-reveal={row.id}
              onClick={() =>
                void window.studio.avatar.reveal(row.id).then((r) => {
                  if (!r.ok) error(r.errorCode);
                })
              }
            >
              파일 위치
            </button>
            <button
              data-avatar-relocate={row.id}
              onClick={() =>
                void window.studio.avatar.relocate(row.id).then((r) => {
                  if (!r.ok) error(r.errorCode);
                  else void refresh();
                })
              }
            >
              이동한 같은 파일 연결
            </button>
            <button
              data-avatar-confirm={row.id}
              disabled={!row.current || row.fileState !== 'PRESENT'}
              onClick={() =>
                void window.studio.avatar.confirm(row.id, version).then((r) => {
                  if (!r.ok) error(r.errorCode);
                  else void refresh();
                })
              }
            >
              대상에서 직접 구동했음을 기록
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
