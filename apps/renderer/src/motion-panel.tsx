import { useEffect, useState } from 'react';
import type { Project, PreviewKey } from '../../../packages/project-model';
import { MotionPlayer, motionNames } from '../../../packages/motion';
export function MotionPanel({
  project,
  player,
  onPrepare,
  onSettings,
  onParameter,
}: {
  project: Project;
  player: MotionPlayer;
  onPrepare: () => void;
  onSettings: (
    strength: number,
    smoothingMs: number,
    pose: { parameterId: string; value: number }[],
  ) => void;
  onParameter: (id: string, min: number, neutral: number, max: number) => void;
}) {
  const [, refresh] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [chosen, setChosen] = useState<PreviewKey>('eye_left');
  const [error, setError] = useState('');
  useEffect(() => {
    const timer = setInterval(() => refresh((v) => v + 1), 100);
    return () => {
      clearInterval(timer);
      player.stop();
    };
  }, [player]);
  const frame = player.snapshot();
  const list = player.list();
  const settings = project.motion?.settings;
  const selected = list.find((c) => c.key === chosen);
  const p = selected?.parameter;
  const set = (key: PreviewKey, value: number): void => {
    try {
      player.set(key, value);
      setError('');
      refresh((v) => v + 1);
    } catch {
      setError('계산할 수 없는 값이거나 연결되지 않은 움직임이에요. 이전 자세를 유지합니다.');
    }
  };
  const saveSettings = (strength: number, smoothingMs: number, pose = settings?.pose ?? []): void =>
    onSettings(strength, smoothingMs, pose);
  return (
    <section className="motion-panel" aria-label="움직임 시험">
      <h3>장치 없는 움직임 시험</h3>
      <p>슬라이더는 일시적인 시험 입력입니다. 재생과 중지는 저장된 기본 자세를 바꾸지 않아요.</p>
      {!project.motion && (
        <>
          <p>
            이 프로젝트에는 고개 변형용 망이 아직 없어요. 이전 편집을 보관하고 기본 망을 준비할 수
            있어요.
          </p>
          <button data-motion-prepare onClick={onPrepare}>
            기본 움직임 망 준비
          </button>
        </>
      )}
      <div className="motion-controls">
        {list.map((c) => {
          const parameter = c.parameter;
          const value = parameter
            ? (player.targets().find((v) => v.parameterId === parameter.id)?.value ??
              parameter.neutral)
            : 0;
          const maximum =
            parameter && c.key === 'mouth' && c.limited
              ? parameter.min + (parameter.max - parameter.min) * 0.65
              : (parameter?.max ?? 1);
          return (
            <div className="motion-control" key={c.key}>
              <label>
                {motionNames[c.key]} <output>{frame.parameters[c.key].toFixed(2)}</output>
                <input
                  data-motion-key={c.key}
                  aria-label={`${motionNames[c.key]} 시험 값`}
                  type="range"
                  min={parameter?.min ?? 0}
                  max={maximum}
                  step=".01"
                  disabled={!c.supported}
                  value={value}
                  onChange={(e) => set(c.key, Number(e.target.value))}
                />
              </label>
              <small>
                {c.supported ? (c.limited ? '제한 제공 · ' : '사용 가능 · ') : '사용 불가 · '}
                {c.reason}
              </small>
              <div className="motion-points">
                {['최소', '기본', '최대'].map((label, i) => (
                  <button
                    key={label}
                    data-motion-point={`${c.key}-${i}`}
                    disabled={!c.supported || !parameter}
                    onClick={() => {
                      if (parameter) set(c.key, [parameter.min, parameter.neutral, maximum][i]!);
                    }}
                  >
                    {label}
                  </button>
                ))}
                <button
                  data-motion-play={c.key}
                  disabled={!c.supported}
                  onClick={() => {
                    player.play(c.key, repeat);
                    refresh((v) => v + 1);
                  }}
                >
                  예제 재생
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <label>
        <input
          data-motion-repeat
          type="checkbox"
          checked={repeat}
          onChange={(e) => setRepeat(e.target.checked)}
        />
        반복 재생
      </label>
      <div className="motion-points">
        <button
          data-motion-all
          disabled={!list.some((c) => c.supported)}
          onClick={() => player.play('all', repeat)}
        >
          전체 동작 재생
        </button>
        <button
          data-motion-stop
          onClick={() => {
            player.stop();
            refresh((v) => v + 1);
          }}
        >
          중지 · 기본 자세
        </button>
      </div>
      <p data-motion-state role="status">
        {frame.playing
          ? `시험 재생 중 · ${frame.elapsed.toFixed(1)}초`
          : '기본 자세 또는 수동 시험'}{' '}
        · 카메라·마이크 미사용
      </p>
      {settings && (
        <details data-motion-settings>
          <summary>움직임 조절과 기본 자세</summary>
          <label>
            움직임 세기
            <input
              data-motion-strength
              key={`strength-${settings.strength}`}
              type="number"
              min="0"
              max="1"
              step=".05"
              defaultValue={settings.strength}
              onBlur={(e) => {
                const value = Number(e.target.value);
                if (Number.isFinite(value) && value >= 0 && value <= 1)
                  saveSettings(value, settings.smoothingMs);
                else setError('움직임 세기는 0~1 안에서 입력해 주세요.');
              }}
            />
          </label>
          <label>
            부드럽게 잇는 시간 (밀리초)
            <input
              data-motion-smoothing
              key={`smooth-${settings.smoothingMs}`}
              type="number"
              min="0"
              max="1000"
              step="10"
              defaultValue={settings.smoothingMs}
              onBlur={(e) => {
                const value = Number(e.target.value);
                if (Number.isInteger(value) && value >= 0 && value <= 1000)
                  saveSettings(settings.strength, value);
                else setError('시간은 0~1000 사이 정수로 입력해 주세요.');
              }}
            />
          </label>
          <button
            data-motion-save-pose
            onClick={() => saveSettings(settings.strength, settings.smoothingMs, player.targets())}
          >
            현재 시험 값을 기본 자세로 저장
          </button>
          <button data-motion-reset onClick={() => saveSettings(1, 120, [])}>
            세기·부드러움·기본 자세 초기화
          </button>
          <p>
            설정을 바꾸면 재생을 멈추고 기본 자세로 돌아와요. 설정 저장은 편집 이력에 남습니다. 매
            프레임의 시험 입력은 저장되지 않아요.
          </p>
        </details>
      )}
      <details>
        <summary>매개변수 범위 확인·수정</summary>
        <label>
          움직임
          <select value={chosen} onChange={(e) => setChosen(e.target.value as PreviewKey)}>
            {list.map((c) => (
              <option key={c.key} value={c.key}>
                {motionNames[c.key]}
              </option>
            ))}
          </select>
        </label>
        {p && (
          <form
            key={`${p.id}-${p.min}-${p.neutral}-${p.max}`}
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              onParameter(
                p.id,
                Number(data.get('min')),
                Number(data.get('neutral')),
                Number(data.get('max')),
              );
            }}
          >
            <label>
              최소
              <input name="min" type="number" step=".01" defaultValue={p.min} required />
            </label>
            <label>
              기본
              <input name="neutral" type="number" step=".01" defaultValue={p.neutral} required />
            </label>
            <label>
              최대
              <input name="max" type="number" step=".01" defaultValue={p.max} required />
            </label>
            <button type="submit">범위 적용</button>
            <small>연결된 저장 표정·기본 자세도 새 범위 안으로 제한합니다.</small>
          </form>
        )}
      </details>
      <p className="support-note">
        고개는 작은 평면 변형이며 실제 옆모습을 복원하지 않습니다. 보조 흔들림은 이번 초기 범위에서
        제공하지 않습니다. 별도 머리카락·장식 파츠와 품질 검증이 필요해요.
      </p>
      {project.parameters.some((p) => !p.previewKey) && (
        <p>이름만 있는 사용자 매개변수는 이 시험기의 지원 동작으로 표시하지 않습니다.</p>
      )}
      {error && <p role="alert">{error}</p>}
    </section>
  );
}
