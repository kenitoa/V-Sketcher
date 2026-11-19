import React, { useState, useRef, useEffect } from 'react';
import type { SessionView, SessionCommand } from '../../../packages/project-session/contracts';
import {
  configuration,
  configured,
  configKey,
  issues,
  effective,
  ROLES,
  SIDES,
  type SplitConfig,
  type LayerConfig,
  type SplitIssue,
} from '../../../packages/split-image/types';
import { roleNames } from '../../../packages/editor-view/guidance';
import { AvatarRenderer } from '../../../packages/avatar-renderer';
import { MotionPlayer } from '../../../packages/motion';
const sideNames: Record<(typeof SIDES)[number], string> = {
  'character-left': '캐릭터 왼쪽',
  'character-right': '캐릭터 오른쪽',
  center: '중앙',
  none: '미지정',
};
const issueText: Record<string, string> = {
  LAYOUT_UNCONFIRMED: '자료의 배치 방식을 확인하세요.',
  POSITION_UNCONFIRMED: '추정 위치입니다. 드래그·수치로 맞추거나 현재 위치를 확인하세요.',
  ROLE_UNCONFIRMED: '그림을 보고 역할과 캐릭터 기준 좌우를 확인하세요.',
  COMMON_SIZE_MISMATCH: '이미지 크기가 다릅니다. 잘린 조각 방식에서 위치를 맞추세요.',
  PARENT_CYCLE: '부모 연결이 순환합니다. 부모를 변경하거나 연결을 해제하세요.',
  GROUP_CYCLE: '그룹 연결이 순환합니다. 그룹의 부모를 변경하세요.',
  REFERENCE_MISSING: '없는 부위·그룹을 가리킵니다. 연결을 다시 선택하세요.',
  ALTERNATIVE_INVALID: '대체 그림의 대상·역할·좌우·상태를 맞추고 직접 표시는 꺼 주세요.',
  ROLE_DUPLICATE: '대표 역할이 중복됩니다. 하나를 보조·대체 그림으로 바꾸거나 역할을 수정하세요.',
  STATE_DUPLICATE: '같은 부위에 같은 표정 상태가 두 개입니다. 대표·보조·대체 연결을 확인하세요.',
  EXPRESSION_LIMITED: '열림·닫힘 그림 또는 좌우 연결이 부족해 이 부위 표정을 정지합니다.',
  ROLE_MISSING: '눈 또는 입 역할이 없습니다. 필요한 부위를 연결하거나 제한을 확인하세요.',
  WHOLE_ART_HEAD: '대표 머리가 없어 전체 그림에 작은 평면 고개만 제공합니다.',
  LIMITS_UNCONFIRMED: '누락 역할과 표정 제한을 확인해 주세요.',
  OMITTED_UNCONFIRMED: '읽지 않은 파일 목록을 확인해 주세요.',
  EMPTY_LAYER: '투명한 빈 부위입니다. 원본과 이름은 보관하고 움직임에서 제외합니다.',
  HIDDEN_LAYER: '숨긴 부위입니다. 원본 표시 상태를 보관합니다.',
  UNASSIGNED_DECORATION: '미지정 부위는 장식으로 표시하고 독립 표정은 연결하지 않습니다.',
  OUTSIDE_CANVAS: '일부 또는 전체가 캔버스 밖에 있습니다. 위치와 캔버스 크기를 확인하세요.',
  FEATURE_BEHIND_HEAD: '눈·입이 머리보다 뒤에 있습니다. 합성을 보고 앞뒤 순서를 확인하세요.',
  OPAQUE_LAYER: '투명도가 없는 PNG입니다. 원본 배경도 함께 표시됩니다.',
  ICC_CONVERTED: '편집용 색상을 sRGB로 변환했습니다. 원본 PNG는 보관합니다.',
  NO_VISIBLE_LAYER: '캔버스에 표시되는 부위가 없습니다.',
};
const errorText: Record<string, string> = {
  E_SPLIT_TIMEOUT: '자료 준비 시간이 길어 작업을 멈췄어요. 다시 시도해 주세요.',
  E_INPUT_STALE: '작업 중 프로젝트가 바뀌었어요. 현재 자료에서 다시 준비하세요.',
  E_SPLIT_LAYER_ATTRIBUTES:
    '지원하지 않는 혼합·효과·속성 또는 잘못된 부위 정보입니다. normal PNG로 변환해 주세요.',
  E_SPLIT_GROUP_ATTRIBUTES: '지원하지 않는 그룹 효과·변환입니다. 그룹 변환을 정리해 주세요.',
  E_SPLIT_HASH: '묶음의 원본 해시가 다릅니다. 정상 자료를 다시 선택하세요.',
  E_SPLIT_VERSION: '지원하는 .2dparts v1.0 자료를 선택하세요.',
  E_SPLIT_MEMORY: '이미지 합계가 메모리 예산을 넘습니다. 부위 해상도와 수를 확인하세요.',
  E_SPLIT_ADVANCED_CONFLICT: '세부 연결을 바꾼 프로젝트입니다. 기존 연결을 덮어쓰지 않았습니다.',
};
export function SplitPanel({
  view,
  command,
}: {
  view: SessionView;
  command: (c: SessionCommand) => void;
}) {
  const s = view.split;
  if (view.project?.sourceType !== 'split-image') return null;
  return (
    <section className="split-panel" aria-label="분리 자료">
      <h3>분리 자료</h3>
      <div className="button-row">
        <button
          data-split-load="folder"
          disabled={s?.busy}
          onClick={() => command({ type: 'split-load', kind: 'folder' })}
        >
          PNG 폴더
        </button>
        <button
          data-split-load="2dparts"
          disabled={s?.busy}
          onClick={() => command({ type: 'split-load', kind: '2dparts' })}
        >
          .2dparts 열기
        </button>
        <button
          data-split-load="example"
          disabled={s?.busy}
          onClick={() => command({ type: 'split-load', kind: 'example' })}
        >
          분리 자료 예제
        </button>
      </div>
      {view.errorCode === 'E_SPLIT_DETAIL_SOURCE' && (
        <p role="alert">
          세부 편집에서 교체한 그림이나 변경한 구조를 원래 분리 자료로 정확히 표현할 수 없습니다.
          현재 작업은 .2dsketch 프로젝트로 저장하세요. 자료 교환이 필요하면 사본에서 해당 부위를
          복원한 뒤 다시 확인하세요.
        </p>
      )}
      {s?.busy && <p role="status">부위 자료를 준비 중입니다. 현재 프로젝트는 유지합니다.</p>}
      {s?.draft && !s.busy && (
        <button data-split-guide onClick={() => window.dispatchEvent(new Event('studio:split'))}>
          배치·역할·연결 확인
        </button>
      )}
      {view.project.split && (
        <>
          <button
            data-split-edit
            disabled={s?.busy}
            onClick={() => command({ type: 'split-edit' })}
          >
            적용한 연결 다시 확인
          </button>
          <button
            data-split-export
            disabled={s?.busy}
            onClick={() => command({ type: 'split-export' })}
          >
            분리 PNG 묶음 저장
          </button>
          <small>
            .2dparts는 원본 그림·배치·역할 자료입니다. 움직임·표정·이력은 프로젝트 저장을
            사용하세요.
          </small>
        </>
      )}
      {s?.busy && (
        <button data-split-cancel onClick={() => command({ type: 'split-cancel' })}>
          자료 준비 취소 · 현재 작업 유지
        </button>
      )}
      {s?.errorCode && (
        <p role="alert">
          {errorText[s.errorCode] ??
            '분리 자료를 준비하지 못했어요. 형식·파일·좌표를 확인해 주세요.'}{' '}
          원본과 현재 프로젝트는 유지합니다.
        </p>
      )}
      {s?.canRetry && (
        <button data-split-retry disabled={s.busy} onClick={() => command({ type: 'split-retry' })}>
          같은 자료 다시 준비
        </button>
      )}
      {s?.exported && <p role="status">저장됨: {s.exported}</p>}
      <details>
        <summary>지원 형식·한도</summary>
        <p>
          PNG 폴더·.2dparts v1.0, 1~64부위, PNG RGB/RGBA 8bit·1~4096px, 묶음 256MiB 이하.
          PSD/PSB·그룹 변환·다른 혼합 모드는 지원하지 않습니다.
        </p>
      </details>
    </section>
  );
}
function MotionPreview({ view }: { view: SessionView }) {
  const current = useRef<HTMLCanvasElement>(null),
    candidate = useRef<HTMLCanvasElement>(null);
  const s = view.split;
  const key = JSON.stringify([s?.scene, view.scene]);
  const [play, setPlay] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!s?.scene || !s.project) return;
    let done = false,
      frame = 0;
    const renderers: AvatarRenderer[] = [],
      players: MotionPlayer[] = [];
    const rows = [
      [current.current, view.scene, view.project],
      [candidate.current, s.scene, s.project],
    ] as const;
    setFailed(false);
    void Promise.all(
      rows.map(async ([canvas, scene, project]) => {
        if (!canvas || !scene || !project) return;
        delete canvas.dataset.splitReady;
        const r = new AvatarRenderer(canvas, scene),
          player = new MotionPlayer();
        renderers.push(r);
        players.push(player);
        player.setProject(project);
        if (play) {
          try {
            player.play('all', true);
          } catch {
            /* Current project may have no authored controls yet. */
          }
        }
        await r.load(document.baseURI);
      }),
    )
      .then(() => {
        if (done) return;
        const draw = (now: number) => {
          renderers.forEach((r, i) => {
            r.draw(players[i]!.frame(now).parameters);
            const canvas = rows[i]![0];
            if (canvas) canvas.dataset.splitReady = 'true';
          });
          frame = requestAnimationFrame(draw);
        };
        frame = requestAnimationFrame(draw);
      })
      .catch(() => {
        if (!done) setFailed(true);
      });
    return () => {
      done = true;
      cancelAnimationFrame(frame);
      renderers.forEach((r) => r.dispose());
    };
  }, [key, play]);
  return (
    <div>
      <div className="split-compare">
        <div>
          <h5>현재 적용 결과</h5>
          <canvas
            data-split-motion="current"
            width="512"
            height="640"
            ref={current}
            aria-label="현재 적용 결과"
          />
        </div>
        <div>
          <h5>새 후보 · 적용 전</h5>
          <canvas
            data-split-motion="candidate"
            width="512"
            height="640"
            ref={candidate}
            aria-label="분리 부위 기본 움직임 후보"
          />
        </div>
      </div>
      <button data-split-play onClick={() => setPlay((v) => !v)}>
        {play ? '시험 멈추기' : '기본 움직임 시험'}
      </button>
      {failed && <p role="alert">미리보기를 읽지 못했어요. 적용하지 말고 다시 준비하세요.</p>}
    </div>
  );
}
export function SplitGuide({
  view,
  command,
}: {
  view: SessionView;
  command: (c: SessionCommand) => void;
}) {
  const s = view.split!,
    d = s.draft!;
  const [config, setConfig] = useState<SplitConfig>(() => configuration(d));
  const [selected, setSelected] = useState(d.layers[0]!.id);
  const [mirror, setMirror] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [canvasError, setCanvasError] = useState(false);
  const svg = useRef<SVGSVGElement>(null);
  const drag = useRef<{ x: number; y: number; origin: [number, number] } | null>(null);
  const draft = configured(d, config),
    layer = draft.layers.find((l) => l.id === selected) ?? draft.layers[0]!,
    problems = issues(draft);
  const dirty = s.preparedKey !== configKey(config);
  const edit = (value: Partial<LayerConfig>) =>
    setConfig((c) => ({
      ...c,
      layers: c.layers.map((l) => (l.id === layer.id ? { ...l, ...value } : l)),
    }));
  const select = (id: string) => {
    setSelected(id);
    setZoom(1);
  };
  const w = draft.canvas.width,
    h = draft.canvas.height,
    vw = w / zoom,
    vh = h / zoom;
  const cx = layer.origin[0] + layer.image.width / 2,
    cy = layer.origin[1] + layer.image.height / 2;
  const x = Math.max(0, Math.min(w - vw, (mirror ? w - cx : cx) - vw / 2)),
    y = Math.max(0, Math.min(h - vh, cy - vh / 2));
  const point = (e: React.PointerEvent<SVGSVGElement>) => {
    const p = svg.current!.createSVGPoint();
    p.x = e.clientX;
    p.y = e.clientY;
    const q = p.matrixTransform(svg.current!.getScreenCTM()!.inverse());
    return { x: mirror ? w - q.x : q.x, y: q.y };
  };
  const rowIssue = (i: SplitIssue) => issueText[i.code] ?? i.code;
  return (
    <section data-split-state={s.state} className="split-guide">
      <div className="split-toolbar">
        <label>
          부위
          <select
            data-split-select
            value={layer.id}
            disabled={s.busy}
            onChange={(e) => select(e.target.value)}
          >
            {draft.layers.map((l, index) => (
              <option key={l.id} value={l.id}>
                {index + 1}. {l.name}
                {l.image.empty ? ' · 빈 부위' : !l.visible ? ' · 숨김' : ''}
              </option>
            ))}
          </select>
        </label>
        <label>
          <input
            data-split-mirror
            type="checkbox"
            checked={mirror}
            onChange={(e) => setMirror(e.target.checked)}
          />
          미러 보기
        </label>
        <span>좌우는 캐릭터 기준 · 미러는 보기만 바꿉니다.</span>
      </div>
      <fieldset disabled={s.busy}>
        <legend>캔버스·좌표</legend>
        <div className="split-canvas-fields">
          {(['width', 'height'] as const).map((k) => (
            <label key={k}>
              {k === 'width' ? '가로' : '세로'}
              <input
                data-split-canvas={k}
                type="number"
                min="256"
                max="4096"
                key={d.id + k}
                defaultValue={config.canvas[k]}
                onBlur={(e) => {
                  const n = Number(e.target.value);
                  if (Number.isInteger(n) && n >= 256 && n <= 4096) {
                    setConfig((c) => ({ ...c, canvas: { ...c.canvas, [k]: n } }));
                    setCanvasError(false);
                  } else {
                    e.target.value = String(config.canvas[k]);
                    setCanvasError(true);
                  }
                }}
              />
            </label>
          ))}
          <button
            data-split-layout="common"
            disabled={
              !draft.layers.every(
                (l) =>
                  l.image.width === config.canvas.width && l.image.height === config.canvas.height,
              )
            }
            onClick={() =>
              setConfig((c) => ({
                ...c,
                layout: 'common',
                layoutConfirmed: true,
                layers: c.layers.map((l) => ({ ...l, origin: [0, 0], positionConfirmed: true })),
              }))
            }
          >
            공통 캔버스 좌표 확인
          </button>
          <button
            data-split-layout="cropped"
            onClick={() => setConfig((c) => ({ ...c, layout: 'cropped', layoutConfirmed: true }))}
          >
            잘린 조각 · 위치 직접 확인
          </button>
        </div>
      </fieldset>
      {canvasError && <p role="alert">256~4096px</p>}
      <div className="split-editor-grid">
        <div className="split-art">
          <div className="button-row">
            <button data-split-zoom onClick={() => setZoom((z) => Math.min(4, z * 2))}>
              확대 +
            </button>
            <button onClick={() => setZoom((z) => Math.max(1, z / 2))}>축소 −</button>
            <button onClick={() => setZoom(1)}>전체 맞춤</button>
            <span>{zoom * 100}%</span>
          </div>
          <svg
            ref={svg}
            data-split-canvas-svg
            tabIndex={0}
            role="img"
            aria-label="분리 그림 배치 · 드래그와 방향키로 위치 이동"
            viewBox={`${x} ${y} ${vw} ${vh}`}
            onKeyDown={(e) => {
              if (s.busy || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key))
                return;
              e.preventDefault();
              const n = e.shiftKey ? 10 : 1;
              edit({
                origin: [
                  layer.origin[0] +
                    (e.key === 'ArrowLeft' ? -n : e.key === 'ArrowRight' ? n : 0) *
                      (mirror ? -1 : 1),
                  layer.origin[1] + (e.key === 'ArrowUp' ? -n : e.key === 'ArrowDown' ? n : 0),
                ],
                positionConfirmed: true,
              });
            }}
            onPointerDown={(e) => {
              if (s.busy) return;
              const q = point(e);
              drag.current = { ...q, origin: [...layer.origin] };
              try {
                e.currentTarget.setPointerCapture(e.pointerId);
              } catch {
                /* Programmatic verification has no OS pointer capture. */
              }
            }}
            onPointerMove={(e) => {
              if (!drag.current) return;
              const q = point(e),
                a = drag.current;
              edit({
                origin: [Math.round(a.origin[0] + q.x - a.x), Math.round(a.origin[1] + q.y - a.y)],
                positionConfirmed: true,
              });
            }}
            onPointerUp={() => {
              drag.current = null;
            }}
            onPointerCancel={() => {
              drag.current = null;
            }}
          >
            <g transform={mirror ? `translate(${w},0) scale(-1,1)` : undefined}>
              {[...draft.layers]
                .sort((a, b) => a.z - b.z || (a.sourceId < b.sourceId ? -1 : 1))
                .filter((l) => l.usage !== 'alternative' && effective(draft, l).visible)
                .map((l) => (
                  <image
                    key={l.id}
                    href={`assets/session/${d.id}/${l.imageHash}.png`}
                    x={l.origin[0]}
                    y={l.origin[1]}
                    width={l.image.width}
                    height={l.image.height}
                    opacity={effective(draft, l).opacity}
                  />
                ))}
              <rect
                x={layer.origin[0]}
                y={layer.origin[1]}
                width={layer.image.width}
                height={layer.image.height}
                fill="none"
                stroke={layer.positionConfirmed ? '#a37b24' : '#a04a62'}
                strokeWidth={2 / zoom}
              />
            </g>
          </svg>
          <p role="status">
            {layer.positionConfirmed ? '위치 확인됨' : '추정 배치 · 원래 위치가 아닐 수 있습니다.'}{' '}
            · {layer.image.width}×{layer.image.height}px
          </p>
        </div>
        <fieldset disabled={s.busy}>
          <legend>{layer.sourceName} · 배치와 역할</legend>
          <img
            className="split-thumb"
            src={`assets/session/${d.id}/${layer.imageHash}.png`}
            alt="선택한 원본 부위"
          />
          <label>
            이름
            <input
              data-split-name
              value={layer.name}
              maxLength={120}
              onChange={(e) => edit({ name: e.target.value || layer.sourceName })}
            />
          </label>
          {([0, 1] as const).map((n) => (
            <label key={n}>
              {n === 0 ? '왼쪽 위치' : '위쪽 위치'}
              <input
                data-split-position={n}
                type="number"
                value={layer.origin[n]}
                min="-8192"
                max="8192"
                onChange={(e) => {
                  const a: [number, number] = [...layer.origin];
                  a[n] = Math.max(-8192, Math.min(8192, Number(e.target.value)));
                  edit({ origin: a, positionConfirmed: true });
                }}
              />
            </label>
          ))}
          <label>
            역할
            <select
              data-split-role
              value={layer.role}
              onChange={(e) =>
                edit({ role: e.target.value as LayerConfig['role'], roleConfirmed: true })
              }
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {roleNames[r]}
                </option>
              ))}
            </select>
          </label>
          <label>
            캐릭터 기준 좌우
            <select
              data-split-side
              value={layer.side}
              onChange={(e) =>
                edit({ side: e.target.value as LayerConfig['side'], roleConfirmed: true })
              }
            >
              {SIDES.map((v) => (
                <option key={v} value={v}>
                  {sideNames[v]}
                </option>
              ))}
            </select>
          </label>
          <small>
            이름·불투명 영역·위치 제안: {roleNames[layer.proposal.role]} /{' '}
            {sideNames[layer.proposal.side]} · {Math.round(layer.proposal.confidence * 100)}%.
            제안은 확인된 역할을 덮어쓰지 않습니다.
          </small>
          <button
            data-split-confirm
            onClick={() => edit({ positionConfirmed: true, roleConfirmed: true })}
          >
            이 부위 위치·역할 확인
          </button>
          <label>
            사용 방식
            <select
              data-split-usage
              value={layer.usage}
              onChange={(e) =>
                edit({
                  usage: e.target.value as LayerConfig['usage'],
                  ...(e.target.value === 'alternative' ? { visible: false } : { variantOf: null }),
                })
              }
            >
              <option value="primary">대표 부위</option>
              <option value="auxiliary">보조·장식 · 독립 표정 없음</option>
              <option value="alternative">표정 대체 그림</option>
            </select>
          </label>
          {layer.usage === 'alternative' && (
            <>
              <label>
                대체할 대표
                <select
                  data-split-variant
                  value={layer.variantOf ?? ''}
                  onChange={(e) => edit({ variantOf: e.target.value || null })}
                >
                  <option value="">선택해 주세요</option>
                  {draft.layers
                    .filter((l) => l.id !== layer.id && l.usage === 'primary')
                    .map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.name}
                      </option>
                    ))}
                </select>
              </label>
              <label>
                표정 상태
                <select
                  data-split-state-kind
                  value={layer.state}
                  onChange={(e) => edit({ state: e.target.value as LayerConfig['state'] })}
                >
                  <option value="default">미지정</option>
                  <option value="open">열림</option>
                  <option value="closed">닫힘</option>
                  <option value="middle">중간</option>
                </select>
              </label>
            </>
          )}
          <label>
            앞뒤 순서
            <input
              data-split-order
              type="number"
              min="-100000"
              max="100000"
              value={layer.z}
              onChange={(e) =>
                edit({ z: Math.max(-100000, Math.min(100000, Math.round(Number(e.target.value)))) })
              }
            />
          </label>
          <label>
            부모 부위
            <select
              data-split-parent
              value={layer.parentId ?? ''}
              onChange={(e) => edit({ parentId: e.target.value || null })}
            >
              <option value="">연결 없음</option>
              {layer.parentId && !draft.layers.some((l) => l.id === layer.parentId) && (
                <option value={layer.parentId}>없는 연결</option>
              )}
              {draft.layers.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            화면 그룹
            <select
              data-split-group
              value={layer.groupId ?? ''}
              onChange={(e) => edit({ groupId: e.target.value || null })}
            >
              <option value="">그룹 없음</option>
              {layer.groupId && !draft.groups.some((g) => g.id === layer.groupId) && (
                <option value={layer.groupId}>없는 그룹</option>
              )}
              {draft.groups.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            부위 투명도
            <input
              data-split-opacity
              type="number"
              min="0"
              max="1"
              step="0.05"
              value={layer.opacity}
              onChange={(e) => edit({ opacity: Math.max(0, Math.min(1, Number(e.target.value))) })}
            />
          </label>
          <label>
            <input
              data-split-visible
              type="checkbox"
              checked={layer.visible}
              onChange={(e) => edit({ visible: e.target.checked })}
            />
            직접 표시
          </label>
        </fieldset>
      </div>
      {draft.groups.length > 0 && (
        <details>
          <summary>화면 그룹 · 움직임 부모와 별도</summary>
          {draft.groups.map((g) => (
            <fieldset key={g.id} disabled={s.busy}>
              <legend>{g.name}</legend>
              <label>
                부모 그룹
                <select
                  data-split-group-parent={g.id}
                  value={g.parentGroupId ?? ''}
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      groups: c.groups.map((v) =>
                        v.id === g.id ? { ...v, parentGroupId: e.target.value || null } : v,
                      ),
                    }))
                  }
                >
                  <option value="">없음</option>
                  {draft.groups.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                그룹 투명도
                <input
                  data-split-group-opacity={g.id}
                  type="number"
                  min="0"
                  max="1"
                  step="0.05"
                  value={g.opacity}
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      groups: c.groups.map((v) =>
                        v.id === g.id
                          ? { ...v, opacity: Math.max(0, Math.min(1, Number(e.target.value))) }
                          : v,
                      ),
                    }))
                  }
                />
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={g.visible}
                  onChange={(e) =>
                    setConfig((c) => ({
                      ...c,
                      groups: c.groups.map((v) =>
                        v.id === g.id ? { ...v, visible: e.target.checked } : v,
                      ),
                    }))
                  }
                />
                그룹 표시
              </label>
            </fieldset>
          ))}
        </details>
      )}
      <div className="split-checks">
        <h3>연결 확인</h3>
        <ul data-split-issues>
          {problems.map((v, i) => (
            <li key={i} data-split-issue={v.code}>
              <button
                onClick={() => {
                  if (v.layerId && draft.layers.some((l) => l.id === v.layerId)) select(v.layerId);
                }}
              >
                {v.level === 'block' ? '확인 필요' : '안내'} · {rowIssue(v)}
              </button>
            </li>
          ))}
        </ul>
        {draft.missingProperties.length > 0 && (
          <p>
            파일에 없는 정보: {draft.missingProperties.join(' · ')}. 배치와 연결은 확인한 값으로
            저장합니다.
          </p>
        )}
        {draft.omitted.length > 0 && (
          <>
            <ul>
              {draft.omitted.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
            <label>
              <input
                data-split-omitted
                type="checkbox"
                checked={config.omittedAccepted}
                onChange={(e) => setConfig((c) => ({ ...c, omittedAccepted: e.target.checked }))}
              />
              위 파일은 읽지 않음을 확인했습니다.
            </label>
          </>
        )}
        <label>
          <input
            data-split-limits
            type="checkbox"
            checked={config.limitedAccepted}
            onChange={(e) => setConfig((c) => ({ ...c, limitedAccepted: e.target.checked }))}
          />
          누락·정지한 표정과 제한된 평면 고개를 확인했습니다.
        </label>
        <button
          data-split-prepare
          className="primary"
          disabled={s.busy || problems.some((v) => v.level === 'block')}
          onClick={() =>
            command({
              type: 'split-prepare',
              draftId: d.id,
              expectedRevision: view.project!.revision,
              config,
            })
          }
        >
          확인한 배치로 움직임 준비
        </button>
        {s.errorCode && (
          <p role="alert">
            {errorText[s.errorCode] ?? '준비하지 못했습니다. 배치·연결을 확인하고 다시 준비하세요.'}{' '}
            현재 프로젝트는 유지합니다.
          </p>
        )}
        {s.busy && <p role="status">자원과 공통 움직임을 준비 중입니다.</p>}
        {s.scene && s.project && (
          <>
            <h3>적용 전 움직임 비교</h3>
            <MotionPreview view={view} />
            {dirty && <p role="status">배치가 바뀌었습니다. 새 배치로 다시 준비해 주세요.</p>}
            <button
              data-split-apply
              className="primary"
              disabled={s.busy || !s.canApply || dirty}
              onClick={() =>
                command({
                  type: 'split-apply',
                  draftId: d.id,
                  expectedRevision: view.project!.revision,
                  config,
                })
              }
            >
              확인한 결과만 프로젝트에 적용
            </button>
            <button
              data-split-discard
              disabled={s.busy}
              onClick={() => command({ type: 'split-discard' })}
            >
              후보 폐기 · 현재 작업 유지
            </button>
          </>
        )}
        {s.state === 'applied' && (
          <p role="status">
            공통 캐릭터에 적용했습니다. 작업실의 움직임 시험·저장을 사용할 수 있습니다.
          </p>
        )}
      </div>
    </section>
  );
}
