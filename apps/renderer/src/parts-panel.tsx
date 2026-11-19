import { useState } from 'react';
import type { Project } from '../../../packages/project-model';
import {
  SLOTS,
  defaults,
  assemblyReason,
  type Catalog,
  type Slot,
  type Adjustment,
} from '../../../packages/parts-library/types';
import type { SessionCommand } from '../../../packages/project-session/contracts';
const names: Record<Slot, string> = {
  face: '얼굴·피부',
  hair: '머리 세트',
  eyes: '눈',
  mouth: '입',
  outfit: '의상',
  accessory: '장식',
};
export function PartsPanel({
  project,
  catalog,
  partKey,
  onCommand,
  onNext,
}: {
  project: Project;
  catalog: Catalog | null;
  partKey: string | null;
  onCommand: (c: SessionCommand) => void;
  onNext: () => void;
}) {
  const [adjustError, setAdjustError] = useState('');
  const [slot, setSlot] = useState<Slot>('hair');
  if (!catalog) return <p>파츠 라이브러리를 읽지 못했어요. 기존 그림은 보존됩니다.</p>;
  const assembly = project.assembly;
  const reason = assemblyReason(project, catalog);
  const ready = !reason;
  const revision = project.revision;
  const activePart =
    project.parts.find((v) => v.library?.key === partKey) ??
    project.parts.find((v) => v.library?.key === 'eye-left') ??
    project.parts.find((v) => v.library);
  const item = catalog.items.find((i) => i.id === activePart?.library?.itemId);
  const a =
    assembly?.adjustments.find((a) => a.key === activePart?.library?.key) ??
    defaults(activePart?.library?.key ?? 'face');
  const send = (c: SessionCommand): void => {
    setAdjustError('');
    onCommand(c);
  };
  const adjust = (field: keyof Omit<Adjustment, 'key'>, value: number): void =>
    send({ type: 'parts-adjust', expectedRevision: revision, value: { ...a, [field]: value } });
  return (
    <section className="parts-library" aria-label="파츠 조합">
      <h3>아틀리에 루나</h3>
      {!ready && (
        <>
          <p>
            {assembly
              ? reason
              : '기본 조합을 준비하면 현재 부위를 교체합니다. 변경 전 복구본과 편집 이력을 보관해요.'}
          </p>
          <button
            data-parts-start
            className="primary"
            onClick={() => send({ type: 'parts-start', expectedRevision: revision })}
          >
            기본 파츠 조합 준비
          </button>
        </>
      )}
      <div className="parts-categories" aria-label="파츠 종류">
        {SLOTS.map((s) => (
          <button
            data-parts-category={s}
            key={s}
            aria-pressed={slot === s}
            onClick={() => setSlot(s)}
          >
            {names[s]}
          </button>
        ))}
      </div>
      <div className="parts-options">
        {catalog.items
          .filter((i) => i.slot === slot)
          .map((i) => {
            const thumb = i.thumbnail;
            const asset = catalog.assets.find((a) => a.id === thumb?.assetId);
            const current = assembly?.choices.find((c) => c.slot === slot)?.itemId === i.id;
            return (
              <button
                key={i.id}
                data-parts-item={i.id}
                aria-pressed={current}
                disabled={!ready}
                title={!ready ? '기본 조합을 먼저 준비해 주세요' : undefined}
                onClick={() =>
                  send({ type: 'parts-select', expectedRevision: revision, itemId: i.id })
                }
              >
                {thumb && asset ? (
                  <svg
                    aria-hidden
                    viewBox={`${thumb.region.x} ${thumb.region.y} ${thumb.region.width} ${thumb.region.height}`}
                  >
                    <image
                      href={'assets/' + catalog.files[asset.fingerprint.sha256]}
                      width={asset.dimensions.width}
                      height={asset.dimensions.height}
                    />
                  </svg>
                ) : (
                  <span className="no-part">◇ 없음</span>
                )}
                <strong>{i.label}</strong>
                <small>
                  {current
                    ? '✓ 현재 선택'
                    : !ready
                      ? '기본 조합 준비 필요'
                      : '선택 가능 · 같은 몸체 규격'}
                </small>
              </button>
            );
          })}
      </div>
      <button
        data-parts-remove
        disabled={
          !ready || slot === 'face' || !assembly?.choices.find((c) => c.slot === slot)?.itemId
        }
        onClick={() => send({ type: 'parts-remove', expectedRevision: revision, slot })}
      >
        {names[slot]} 제거
      </button>
      {slot === 'face' && (
        <small>얼굴은 위치 기준이라 제거할 수 없어요. 다른 얼굴로 교체할 수 있습니다.</small>
      )}
      {slot === 'hair' && <small>앞·뒤 머리는 검수한 세트로 함께 교체합니다.</small>}
      {ready && activePart && item && (
        <details open className="parts-adjust">
          <summary>선택 부위 조절 · {activePart.displayName}</summary>
          <p>
            그림이나 왼쪽 목록에서 조절할 부위를 선택하세요. 값을 입력한 뒤 다른 항목으로 이동하면
            적용됩니다.
          </p>
          <label>
            <input
              data-parts-linked
              type="checkbox"
              checked={assembly!.linkedEyes}
              onChange={(e) =>
                send({
                  type: 'parts-link',
                  expectedRevision: revision,
                  linked: e.target.checked,
                  anchor: a.key,
                })
              }
            />
            양쪽 눈 연동
          </label>
          <small>
            연동을 켜면 선택한 눈을 기준으로 반대 눈을 대칭으로 맞춥니다. 눈 외의 부위를 선택했다면
            왼쪽 눈이 기준입니다.
          </small>
          {(
            [
              {
                key: 'x',
                label: '가로 이동',
                min: -item.limits.position,
                max: item.limits.position,
                step: 0.5,
                unit: 'px',
              },
              {
                key: 'y',
                label: '세로 이동',
                min: -item.limits.position,
                max: item.limits.position,
                step: 0.5,
                unit: 'px',
              },
              {
                key: 'scale',
                label: '크기 배율',
                min: 1 - item.limits.scale,
                max: 1 + item.limits.scale,
                step: 0.005,
                unit: '배',
              },
              {
                key: 'rotation',
                label: '회전',
                min: -item.limits.rotation,
                max: item.limits.rotation,
                step: 0.25,
                unit: '°',
              },
              {
                key: 'hue',
                label: '색상 영역의 색조',
                min: -item.limits.hue,
                max: item.limits.hue,
                step: 1,
                unit: '°',
              },
            ] as const
          ).map((f) => (
            <label key={f.key}>
              {f.label}{' '}
              <small>
                {f.min}~{f.max}
                {f.unit}
              </small>
              <div className="part-field">
                <input
                  data-parts-adjust={f.key}
                  aria-label={f.label}
                  key={a.key + '-' + f.key + '-' + a[f.key]}
                  type="number"
                  step={f.step}
                  min={f.min}
                  max={f.max}
                  defaultValue={a[f.key]}
                  disabled={f.min === f.max}
                  onBlur={(e) => {
                    const value = Number(e.target.value);
                    if (!Number.isFinite(value) || value < f.min || value > f.max) {
                      e.currentTarget.value = String(a[f.key]);
                      setAdjustError(
                        '\uD5C8\uC6A9 \uBC94\uC704 \uC548\uC758 \uAC12\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694. \uC774\uC804 \uAC12\uC744 \uC720\uC9C0\uD569\uB2C8\uB2E4.',
                      );
                    } else if (value !== a[f.key]) {
                      setAdjustError('');
                      adjust(f.key, value);
                    }
                  }}
                />
                <button
                  aria-label={f.label + ' 기본값'}
                  onClick={() => adjust(f.key, f.key === 'scale' ? 1 : 0)}
                >
                  기본
                </button>
              </div>
            </label>
          ))}
          <small>
            색은 지정된 유색 영역만 조절하며 선·밝은 부분·금속 장식과 피부를 보존합니다. 피부 파츠는
            색조 조절을 제공하지 않습니다.
          </small>
          <button
            data-parts-reset
            onClick={() => send({ type: 'parts-reset', expectedRevision: revision, key: a.key })}
          >
            선택 부위 조절 초기화
          </button>
          <button
            data-parts-reset-all
            onClick={() => send({ type: 'parts-reset', expectedRevision: revision, key: null })}
          >
            전체 조절 초기화 · 파츠 선택 유지
          </button>
        </details>
      )}
      {adjustError && <p role="alert">{adjustError}</p>}
      {assembly?.warnings.map((w, i) => (
        <p role="status" className="parts-warning" key={i}>
          {w}
        </p>
      ))}
      {ready && (
        <button data-parts-motion onClick={onNext}>
          이 조합으로 움직임 시험 →
        </button>
      )}
      <details>
        <summary>파츠 출처·사용 범위</summary>
        <p>
          이 프로젝트를 위해 ImageGen으로 제작한 독립 파츠입니다. 출처·버전·그림은 프로젝트 저장에
          포함됩니다. 공개 제품 배포의 전체 품질·사용 조건 검토는 별도 출시 기준을 따릅니다.
        </p>
      </details>
    </section>
  );
}
