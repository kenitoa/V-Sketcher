import { useEffect, useState } from 'react';
import {
  defaultOutputSettings,
  OUTPUT_DIAGNOSIS,
  type OutputView,
  type OutputSettings,
} from '../../../packages/broadcast';
import type { RunRuntime } from './run-runtime';
const states = {
  OFF: 'OFF · 출력 꺼짐',
  PREPARING: '준비 중',
  SOURCE_READY: '출력 준비',
  FAILED: '출력 실패',
};
const health = {
  WAITING: '페이지 소비 대기',
  RENDERING: '페이지 렌더 응답 있음',
  STALE: '실행 프레임 끊김 · 투명 전환',
  CLIENT_FAILED: '페이지 렌더 실패 · 투명 전환',
};
const problems = {
  missing: '소스가 안 보임',
  opaque: '배경이 불투명함',
  cropped: '캐릭터가 잘림',
  frozen: '움직임이 멈춤',
  load: '출력 부하가 큼',
};
const errors: Record<string, string> = {
  E_OUTPUT_PORT: '연결 포트를 열지 못했습니다. 다른 앱의 점유를 확인하고 다시 연결하세요.',
  E_OUTPUT_PROFILE: 'PC의 출력 설정을 읽지 못했습니다. 설정을 확인하고 출력을 다시 준비하세요.',
  E_OUTPUT_SETTINGS: '지원하는 크기·프레임·배치 범위를 확인하세요.',
  E_OUTPUT_RUN: '캐릭터 실행을 먼저 시작하세요.',
  E_OUTPUT_CONFIRM: '대상 버전·확인 항목과 최신 출력 설정을 다시 확인하세요.',
  E_OUTPUT_BUSY: '이전 출력 변경이 끝난 뒤 다시 시도하세요.',
};
export function BroadcastPanel({ runtime: r }: { runtime: RunRuntime }) {
  const [view, setView] = useState<OutputView | null>(null),
    [form, setForm] = useState<OutputSettings>(defaultOutputSettings),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState(''),
    [problem, setProblem] = useState<keyof typeof problems>('missing'),
    [checks, setChecks] = useState({
      alpha: false,
      motion: false,
      expression: false,
      shortcut: false,
    });
  useEffect(() => {
    let alive = true;
    void window.studio.broadcast.view().then((v) => {
      if (alive) {
        setView(v);
        setForm(v.settings);
      }
    });
    const off = window.studio.broadcast.subscribe((v) => {
      if (alive) setView(v);
    });
    return () => {
      alive = false;
      off();
    };
  }, []);
  const perform = async (fn: () => Promise<OutputView>) => {
    if (busy) return;
    setBusy(true);
    try {
      const next = await fn();
      setView(next);
      setForm(next.settings);
      setMessage(
        next.errorCode
          ? (errors[next.errorCode] ?? '출력 변경에 실패했습니다. 실행과 저장은 유지됩니다.')
          : '',
      );
    } catch {
      setMessage('출력 변경에 실패했습니다. 실행과 저장은 유지됩니다.');
    } finally {
      setBusy(false);
    }
  };
  useEffect(
    () => setChecks({ alpha: false, motion: false, expression: false, shortcut: false }),
    [view?.settingsVersion, view?.sourceId],
  );
  if (!view) return null;
  const update = (key: 'scale' | 'x' | 'y', value: number) =>
    setForm((v) => ({ ...v, [key]: value }));
  return (
    <section
      className="broadcast-panel"
      data-broadcast-panel
      data-output-state={view.state}
      aria-label="방송 출력"
    >
      <div className="broadcast-heading">
        <h3>방송 출력</h3>
        <strong data-output-status>{states[view.state]}</strong>
        <span>{health[view.health]}</span>
        {view.hidden && view.state === 'SOURCE_READY' && <strong>캐릭터 숨김</strong>}
      </div>
      <p>
        실행본 {view.sourceRevision ?? '—'} · 설정 {view.settingsVersion} · {view.settings.width}×
        {view.settings.height} / {view.settings.fps}FPS · 페이지 소비 {view.pageConsumers}개
      </p>
      <p>페이지 응답에는 앱 미리보기도 포함됩니다. OBS 수신·미리보기 확인과는 별개입니다.</p>
      <div className="edit-actions">
        <button
          data-output-start
          disabled={busy || !r.active}
          onClick={() => void perform(() => window.studio.broadcast.start(r.lease!.requestId))}
        >
          출력 준비
        </button>
        <button
          data-output-copy
          disabled={busy || view.state !== 'SOURCE_READY'}
          onClick={() =>
            void window.studio.broadcast
              .copyURL()
              .then((ok) =>
                setMessage(
                  ok
                    ? '연결 주소를 복사했습니다. OBS 브라우저 소스에 붙여 넣으세요.'
                    : '먼저 출력을 준비하세요.',
                ),
              )
          }
        >
          OBS 연결 주소 복사
        </button>
        <button
          data-output-preview
          disabled={view.state !== 'SOURCE_READY'}
          onClick={() => void window.studio.broadcast.preview()}
        >
          출력 범위 미리보기
        </button>
        <button
          data-output-restart
          disabled={busy || !view.sourceId}
          onClick={() => void perform(() => window.studio.broadcast.restart())}
        >
          출력 다시 연결
        </button>
        <button
          data-output-stop
          disabled={busy || view.state === 'OFF'}
          onClick={() => void perform(() => window.studio.broadcast.stop())}
        >
          출력 끄기
        </button>
      </div>
      {message && (
        <p role="status" data-output-message>
          {message}
        </p>
      )}
      {view.errorCode && (
        <p role="alert">
          {errors[view.errorCode] ?? '출력을 준비하지 못했습니다. 다시 연결해 주세요.'}
        </p>
      )}
      {view.viewportMismatch && (
        <p role="alert">페이지 크기가 출력 설정과 다릅니다. OBS 소스 너비·높이를 맞춰 주세요.</p>
      )}
      <details>
        <summary>출력 크기·배치</summary>
        <p>
          적용하면 출력 페이지를 다시 준비하며 잠깐 투명해질 수 있습니다. 해상도를 바꾸면 OBS 소스
          크기도 변경하고 다시 확인하세요. 편집기 확대와 원본 그림은 유지됩니다.
        </p>
        <div className="broadcast-grid">
          <label>
            출력 크기
            <select
              data-output-size
              value={form.width}
              onChange={(e) =>
                setForm((v) => ({
                  ...v,
                  width: Number(e.target.value),
                  height: Number(e.target.value) === 1920 ? 1080 : 720,
                }))
              }
            >
              <option value="1920">1920 × 1080</option>
              <option value="1280">1280 × 720</option>
            </select>
          </label>
          <label>
            프레임
            <select
              data-output-fps
              value={form.fps}
              onChange={(e) => setForm((v) => ({ ...v, fps: Number(e.target.value) as 15 | 30 }))}
            >
              <option value="30">30 FPS</option>
              <option value="15">15 FPS</option>
            </select>
          </label>
          {(['scale', 'x', 'y'] as const).map((key, i) => (
            <label key={key}>
              {['캐릭터 크기', '가로 위치', '세로 위치'][i]}
              <input
                data-output-placement={key}
                type="range"
                min={key === 'scale' ? 0.1 : -1}
                max={key === 'scale' ? 3 : 1}
                step=".01"
                value={form[key]}
                onChange={(e) => update(key, Number(e.target.value))}
              />
              <output>{form[key].toFixed(2)}</output>
            </label>
          ))}
          {(['left', 'right', 'top', 'bottom'] as const).map((key, i) => (
            <label key={key}>
              {['왼쪽', '오른쪽', '위', '아래'][i]} 잘림 %
              <input
                data-output-crop={key}
                type="number"
                min="0"
                max="45"
                step="1"
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
        <div className="edit-actions">
          <button
            data-output-apply
            disabled={busy}
            onClick={() => void perform(() => window.studio.broadcast.configure(form))}
          >
            출력 설정 적용
          </button>
          <button
            data-output-restore
            disabled={busy || !view.previous}
            onClick={() => void perform(() => window.studio.broadcast.restore())}
          >
            직전 설정 복원
          </button>
          <button onClick={() => setForm(defaultOutputSettings())}>기본 배치 불러오기</button>
        </div>
      </details>
      <details>
        <summary>OBS Studio 33.0.1 연결·확인</summary>
        <ol>
          <li>
            Windows용 OBS Studio 33.0.1의 소스 목록에서 + → 브라우저를 추가하세요. 로컬 파일은
            끕니다.
          </li>
          <li>
            복사한 연결 주소를 URL에 붙여 넣고 너비 {view.settings.width}, 높이{' '}
            {view.settings.height}를 입력하세요. 사용자 지정 프레임을 {view.settings.fps}FPS로
            맞추세요.
          </li>
          <li>
            기본 투명 CSS를 유지하세요. ‘소스가 보이지 않을 때 종료’와 ‘장면이 활성화되면
            새로고침’은 끄는 조건으로 검증합니다.
          </li>
          <li>
            OBS 미리보기에서 밝고 어두운 배경 위의 투명 가장자리·움직임·표정을 확인하세요. 앱 안
            단축키는 앱에 초점이 있을 때만 시험합니다. PC 전역 키는 별도 허용·등록·실제 확인이
            필요합니다.
          </li>
          <li>
            앱을 먼저 켜고 출력을 준비하세요. OBS가 먼저 켜졌다면 브라우저 소스의 현재 페이지 캐시
            새로고침을 누르세요. 공개 송출이나 녹화 시작은 필요 없습니다.
          </li>
        </ol>
        <p data-output-confirmation>
          {view.confirmationCurrent
            ? '사용자 확인 완료'
            : '외부 미리보기 미확인 · 앱이 OBS 화면을 자동 관찰하지 않습니다.'}
          {view.confirmation && (
            <>
              {' '}
              · 이전 기록: OBS {view.confirmation.targetVersion}, 설정{' '}
              {view.confirmation.settingsVersion}, {view.confirmation.at} (
              {view.confirmation.method})
            </>
          )}
        </p>
        <div className="broadcast-checks">
          {(['alpha', 'motion', 'expression', 'shortcut'] as const).map((key, i) => (
            <label key={key}>
              <input
                data-output-check={key}
                type="checkbox"
                checked={checks[key]}
                onChange={(e) => setChecks((v) => ({ ...v, [key]: e.target.checked }))}
              />
              {['투명도', '움직임', '표정', '사용할 범위의 단축키'][i]}를 OBS 미리보기에서 확인함
            </label>
          ))}
        </div>
        <button
          data-output-confirm
          disabled={busy || view.state !== 'SOURCE_READY' || !Object.values(checks).every(Boolean)}
          onClick={() =>
            void perform(() =>
              window.studio.broadcast.confirm({
                targetVersion: '33.0.1',
                settingsVersion: view.settingsVersion,
                sourceId: view.sourceId!,
                checks,
              }),
            )
          }
        >
          OBS 미리보기 사용자 확인 기록
        </button>
      </details>
      <details>
        <summary>연결 문제 해결</summary>
        <label>
          증상
          <select
            data-output-problem
            value={problem}
            onChange={(e) => setProblem(e.target.value as keyof typeof problems)}
          >
            {Object.entries(problems).map(([key, text]) => (
              <option key={key} value={key}>
                {text}
              </option>
            ))}
          </select>
        </label>
        <ol>
          {OUTPUT_DIAGNOSIS[problem].map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ol>
        <p>
          추적 손실은 실행 화면의 장치 재연결·중립 재보정을 사용하세요. 숨김·기본 자세·표정 해제는
          실행 조작에서 제어합니다. 출력 실패 중에도 작업본 저장은 가능합니다.
        </p>
        <details>
          <summary>연결 주소 재발급</summary>
          <p>
            기존 주소는 즉시 사용할 수 없게 됩니다. OBS URL을 새 주소로 바꾸고 다시 확인해야 합니다.
          </p>
          <button
            data-output-rotate
            disabled={busy}
            onClick={() => void perform(() => window.studio.broadcast.rotate())}
          >
            기존 주소 폐기·새 주소 발급
          </button>
        </details>
      </details>
    </section>
  );
}
