import React, { useEffect, useRef, useState } from 'react';
import type { SessionView, SessionCommand } from '../../../packages/project-session/contracts';
import type { Project, PartBinding, MotionMesh, PreviewKey } from '../../../packages/project-model';
import { previewParameters } from '../../../packages/project-model/preview';
import { multiply } from '../../../packages/coordinates';
import { AvatarRenderer } from '../../../packages/avatar-renderer';
import type { PreviewScene } from '../../../packages/scene-core';
import type {
  DetailOperation,
  DetailLocation,
  DetailImpact,
} from '../../../packages/detail-editor/types';
import { roleNames } from '../../../packages/editor-view/guidance';
import { motionNames } from '../../../packages/motion';
import { EditorPreview } from './editor-preview';
const errorText: Record<string, string> = {
  E_DETAIL_PROTECTED:
    '세부 조정이 보관된 구조입니다. 영향받는 부위나 그룹을 세부 화면에서 복원한 뒤 간단 제작을 다시 시도하세요. 사본에 계속 작업할 수도 있습니다.',
  E_DETAIL_STALE: '프로젝트가 바뀌었습니다. 현재 내용으로 후보를 다시 준비하세요.',
  E_DETAIL_LOCATION:
    '수정할 위치를 찾지 못했습니다. 아래 목록에서 현재 부위나 매개변수를 선택하세요.',
  E_REFERENCE_CYCLE: '부모나 그룹 연결이 순환합니다. 연결을 바꿔 다시 준비하세요.',
  E_REFERENCE_MISSING: '부위·그룹·매개변수 연결이 없습니다. 현재 목록에서 다시 선택하세요.',
  E_MOTION_FOLD: '극단 동작에서 삼각망이 뒤집히거나 접힙니다. 점·영향·변위를 줄여 다시 준비하세요.',
  E_MOTION_RANGE: '변형이 허용된 범위를 넘습니다. 얼굴 폭의 4.5% 이내 변위로 줄여 주세요.',
  E_BINDING_AMBIGUOUS:
    '같은 부위의 표현 연결이나 같은 변형 축이 중복됩니다. 기존 연결을 수정하거나 먼저 해제하세요.',
  E_BINDING_STATES:
    '연결한 표정 상태가 없거나 중복됩니다. 실제로 있는 서로 다른 그림 상태를 선택하세요.',
  E_DETAIL_PARAMETER: '현재 GPU에서 시험 가능한 매개변수를 선택하세요.',
  E_DETAIL_BUSY: '다른 준비 작업이 끝나거나 취소된 뒤 다시 시도하세요.',
  E_DETAIL_BASELINE: '복원할 원래 부위 정보나 참조를 확인할 수 없습니다.',
  E_DETAIL_TEXTURE: '교체할 그림과 상태를 현재 목록에서 다시 선택하세요.',
};
const fieldNumber = (value: string) => Number(value);
export function DetailFrame({
  project,
  scene,
  control,
  point,
  label,
}: {
  project: Project;
  scene: PreviewScene | null;
  control: PreviewKey;
  point: 'min' | 'neutral' | 'max';
  label: string;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState(false);
  const key = JSON.stringify([scene, project.parameters, control, point]);
  useEffect(() => {
    if (!canvas.current || !scene) return;
    const target = canvas.current;
    delete target.dataset.detailReady;
    let disposed = false,
      r: AvatarRenderer;
    setError(false);
    try {
      r = new AvatarRenderer(target, scene);
    } catch {
      setError(true);
      return;
    }
    void r
      .load(document.baseURI)
      .then(() => {
        if (disposed) return;
        const values = new Map(project.parameters.map((p) => [p.id, p.neutral]));
        const p = project.parameters.find((p) => p.previewKey === control);
        if (p) values.set(p.id, point === 'min' ? p.min : point === 'max' ? p.max : p.neutral);
        r.draw(previewParameters(project, values));
        r.gl.finish();
        target.dataset.detailReady = 'true';
      })
      .catch(() => {
        if (!disposed) setError(true);
      });
    return () => {
      disposed = true;
      r.dispose();
    };
  }, [key]);
  return (
    <div>
      <h4>{label}</h4>
      {scene ? (
        <canvas
          data-detail-frame={label}
          ref={canvas}
          width="480"
          height="600"
          aria-label={label}
        />
      ) : (
        <p data-detail-empty-frame role="status">
          표시할 부위가 없습니다.
        </p>
      )}
      {error && (
        <p role="alert">비교 그림을 표시하지 못했습니다. 적용하지 말고 자원 연결을 확인하세요.</p>
      )}
    </div>
  );
}
function Impact({
  impact,
  project,
  open,
}: {
  impact: DetailImpact;
  project: Project;
  open: (location: DetailLocation) => void;
}) {
  const names = (ids: string[], rows: { id: string; displayName: string }[]) =>
    ids
      .map((id) => rows.find((v) => v.id === id)?.displayName ?? '현재 목록에 없는 항목')
      .join(', ') || '없음';
  return (
    <section className="detail-impact" data-detail-impact>
      <h3>{impact.presentationOnly ? '표시 변경 영향' : '구조·동작 변경 영향'}</h3>
      <p>
        부위 {impact.partIds.length}개 · 매개변수 {impact.parameterIds.length}개 · 표정{' '}
        {impact.expressionIds.length}개
      </p>
      <details open={['delete', 'texture', 'unbind'].includes(impact.kind)}>
        <summary>영향 목록과 수정 위치</summary>
        <dl>
          <dt>부위</dt>
          <dd>
            {impact.partIds.map((id) => (
              <button data-detail-fix-part={id} key={id} onClick={() => open({ kind: 'part', id })}>
                {project.parts.find((v) => v.id === id)?.displayName ?? '삭제할 부위'}
              </button>
            ))}
          </dd>
          <dt>자식 부위</dt>
          <dd>{names(impact.childIds, project.parts)}</dd>
          <dt>표정</dt>
          <dd>{names(impact.expressionIds, project.expressions)}</dd>
          <dt>입력 매핑</dt>
          <dd>{impact.inputBindingIds.length}개 · 설정은 보존합니다.</dd>
          <dt>외부 변환 프로필</dt>
          <dd>{names(impact.exportProfileIds, project.exportProfiles)}</dd>
          <dt>다시 확인할 위치</dt>
          <dd>
            {impact.parameterIds.map((id) => (
              <button
                data-detail-fix-parameter={id}
                key={id}
                onClick={() => open({ kind: 'parameter', id })}
              >
                {project.parameters.find((v) => v.id === id)?.displayName ?? '매개변수'}
              </button>
            ))}
          </dd>
        </dl>
      </details>
      {impact.disconnectedParameterIds.length > 0 && (
        <p role="alert">
          {impact.disconnectedParameterIds.length}개 매개변수의 부위 연결이 없어집니다. 해당
          표정·입력 값은 남지만 움직일 부위를 다시 연결해야 합니다.
        </p>
      )}
      {impact.kind === 'delete' && (
        <p>
          삭제할 부위의 연결과 망을 해제합니다. 자식은 화면 위치를 유지하며 최상위로 옮기고,
          원본·매개변수·표정·입력 설정은 보관합니다.
        </p>
      )}
      {impact.kind === 'texture' && (
        <p>
          선택한 그림 상태만 교체합니다. 크기·alpha·다른 표정과의 이음새를 비교하세요. 원래 그림은
          보관합니다.
        </p>
      )}
      {impact.kind === 'influence' && (
        <p>선택 부위의 기울기 가중치와 좌우 변위를 지정한 원형 범위로 다시 만듭니다.</p>
      )}
      <p>
        {impact.presentationOnly
          ? '표시 이름과 외부 이름을 다시 확인하세요.'
          : '미리보기·참조·동작·실행·외부 호환/변환의 재검사가 필요합니다. 실제 장치·방송·외부 실행은 아직 검증되지 않았습니다.'}
      </p>
    </section>
  );
}
function MeshMap({
  project,
  sessionToken,
  partId,
  mesh,
  index,
  onIndex,
  onMesh,
  onVertex,
  center,
  onCenter,
}: {
  project: Project;
  sessionToken: string;
  partId: string;
  mesh: MotionMesh;
  index: number;
  onIndex: (i: number) => void;
  onMesh: (m: MotionMesh) => void;
  onVertex: (v: MotionMesh['vertices'][number]) => void;
  center: [number, number];
  onCenter: (v: [number, number]) => void;
}) {
  const svg = useRef<SVGSVGElement>(null),
    drag = useRef<'pivot' | 'vertex' | 'center' | null>(null);
  const [zoom, setZoom] = useState(1);
  const part = project.parts.find((p) => p.id === partId)!,
    texture = part.textures[0],
    asset = project.assets.find((a) => a.id === texture?.assetId);
  const m = asset && texture ? multiply(texture.assetToLocal, asset.sourceToEdited) : null;
  const clip = 'detail-clip-' + partId;
  const points = mesh.vertices.map((v) => v.position),
    xs = points.map((p) => p[0]),
    ys = points.map((p) => p[1]),
    x = Math.min(...xs) - 20,
    y = Math.min(...ys) - 20,
    w = Math.max(40, Math.max(...xs) - x + 20),
    h = Math.max(40, Math.max(...ys) - y + 20);
  const v = mesh.vertices[index] ?? mesh.vertices[0]!,
    cw = w / zoom,
    ch = h / zoom,
    cx = Math.max(x, Math.min(x + w - cw, v.position[0] - cw / 2)),
    cy = Math.max(y, Math.min(y + h - ch, v.position[1] - ch / 2));
  const point = (e: React.PointerEvent<SVGSVGElement>): [number, number] => {
    const p = svg.current!.createSVGPoint();
    p.x = e.clientX;
    p.y = e.clientY;
    const q = p.matrixTransform(svg.current!.getScreenCTM()!.inverse());
    return [Math.round(q.x * 100) / 100, Math.round(q.y * 100) / 100];
  };
  return (
    <div className="detail-map">
      <div className="button-row">
        <button data-detail-map-zoom onClick={() => setZoom((z) => Math.min(8, z * 2))}>
          망 확대 +
        </button>
        <button onClick={() => setZoom(1)}>망 전체</button>
        <span>{zoom * 100}% · 부위 로컬 px</span>
      </div>
      <svg
        data-detail-map
        ref={svg}
        viewBox={`${cx} ${cy} ${cw} ${ch}`}
        role="img"
        aria-label="부위 망·기준점·영향 중심"
        onPointerMove={(e) => {
          if (!drag.current) return;
          const p = point(e);
          if (drag.current === 'pivot') onMesh({ ...mesh, pivot: p });
          else if (drag.current === 'center') onCenter(p);
          else onVertex({ ...v, position: p });
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        {asset && m && (
          <>
            <defs>
              <clipPath id={clip}>
                <rect {...asset.sourceRegion} />
              </clipPath>
            </defs>
            <g transform={`matrix(${m.join(' ')})`}>
              <image
                href={`assets/session/${sessionToken}/${asset.fingerprint.sha256}.${asset.mediaType === 'image/png' ? 'png' : 'jpg'}`}
                width={asset.dimensions.width}
                height={asset.dimensions.height}
                clipPath={`url(#${clip})`}
              />
            </g>
          </>
        )}
        {Array.from({ length: mesh.triangles.length / 3 }, (_, i) => {
          const p = mesh.triangles
            .slice(i * 3, i * 3 + 3)
            .map((n) => mesh.vertices[n]!.position.join(','));
          return (
            <polygon
              key={i}
              points={p.join(' ')}
              fill="none"
              stroke="#7449a0"
              strokeWidth={w / 700}
            />
          );
        })}
        {mesh.vertices.map((point, i) => (
          <circle
            key={i}
            data-detail-vertex-dot={i}
            cx={point.position[0]}
            cy={point.position[1]}
            r={w / (i === index ? 70 : 110)}
            fill={`hsl(${160 - point.weight * 120} 65% 40%)`}
            stroke={i === index ? '#fff' : '#222'}
            strokeWidth={w / 800}
            onPointerDown={(e) => {
              e.preventDefault();
              onIndex(i);
              drag.current = 'vertex';
              try {
                e.currentTarget.ownerSVGElement!.setPointerCapture(e.pointerId);
              } catch {
                /* Synthetic pointer check. */
              }
            }}
          />
        ))}
        <circle
          data-detail-pivot-dot
          cx={mesh.pivot[0]}
          cy={mesh.pivot[1]}
          r={w / 55}
          fill="#f8c859"
          stroke="#33283c"
          strokeWidth={w / 500}
          onPointerDown={(e) => {
            drag.current = 'pivot';
            try {
              e.currentTarget.ownerSVGElement!.setPointerCapture(e.pointerId);
            } catch {
              /* Synthetic pointer check. */
            }
          }}
        />
        <path
          d={`M${center[0] - w / 40} ${center[1]}h${w / 20}M${center[0]} ${center[1] - w / 40}v${w / 20}`}
          stroke="#209f9f"
          strokeWidth={w / 200}
          onPointerDown={(e) => {
            drag.current = 'center';
            try {
              e.currentTarget.ownerSVGElement!.setPointerCapture(e.pointerId);
            } catch {
              /* Synthetic pointer check. */
            }
          }}
        />
      </svg>
    </div>
  );
}
export function DetailPanel({
  view,
  partId,
  onSelect,
  command,
}: {
  view: SessionView;
  partId: string | null;
  onSelect: (id: string | null) => void;
  command: (c: SessionCommand) => void;
}) {
  const p = view.project!,
    d = view.detail!,
    part = p.parts.find((v) => v.id === partId) ?? p.parts[0] ?? null;
  const [dirty, setDirty] = useState(false),
    [control, setControl] = useState<PreviewKey>('head_yaw'),
    [point, setPoint] = useState<'min' | 'neutral' | 'max'>('neutral');
  useEffect(() => {
    if (d.draftId) setDirty(false);
  }, [d.draftId]);
  const open = (location: DetailLocation) => {
    command({ type: 'detail-open', location });
  };
  const prepare = (operation: DetailOperation) => {
    setDirty(false);
    command({ type: 'detail-prepare', expectedRevision: p.revision, operation });
  };
  const choose = (id: string) => {
    setDirty(true);
    command({ type: 'detail-cancel' });
    onSelect(id);
    open({ kind: 'part', id });
  };
  useEffect(() => {
    if (d.partId && p.parts.some((v) => v.id === d.partId)) onSelect(d.partId);
    if (d.parameterId) {
      const key = p.parameters.find((v) => v.id === d.parameterId)?.previewKey;
      if (key) setControl(key);
    }
  }, [d.openSerial]);
  const error = d.errorCode ?? view.errorCode;
  return (
    <section className="detail-editor" data-detail-editor>
      <div className="detail-top">
        <label>
          선택 부위
          <select
            data-detail-select
            value={part?.id ?? ''}
            disabled={d.busy}
            onChange={(e) => choose(e.target.value)}
          >
            {p.parts.map((v) => (
              <option key={v.id} value={v.id}>
                {v.displayName}
              </option>
            ))}
          </select>
        </label>
        <label>
          매개변수 위치 열기
          <select
            data-detail-locator
            defaultValue=""
            onChange={(e) => {
              if (e.target.value) open({ kind: 'parameter', id: e.target.value });
            }}
          >
            <option value="">매개변수 선택</option>
            {p.parameters.map((v) => (
              <option key={v.id} value={v.id}>
                {v.displayName}
              </option>
            ))}
          </select>
        </label>
      </div>
      {error && (
        <p role="alert" data-detail-error>
          {errorText[error] ??
            '후보를 준비하지 못했습니다. 값·연결·그림을 확인하세요. 현재 프로젝트와 원본은 유지합니다.'}
        </p>
      )}
      {(d.protectedPartIds.length > 0 || d.protectedGroupIds.length > 0) && (
        <details open={error === 'E_DETAIL_PROTECTED'} data-detail-protection>
          <summary>
            세부 조정 보관 · 부위 {d.protectedPartIds.length}개 / 그룹 {d.protectedGroupIds.length}
            개
          </summary>
          <p>
            간단 제작이 이 구조를 다시 만드는 경우 먼저 해당 부분을 복원하거나 사본을 사용하세요.
            이름·불투명도 같은 간단 조절은 유지됩니다.
          </p>
          {d.protectedPartIds
            .filter((id) => p.parts.some((v) => v.id === id))
            .map((id) => (
              <button key={id} data-detail-protected={id} onClick={() => choose(id)}>
                {p.parts.find((v) => v.id === id)!.displayName}
              </button>
            ))}
          <button onClick={() => command({ type: 'duplicate' })}>프로젝트 사본 만들기</button>
        </details>
      )}
      <div className="detail-layout">
        <div>
          {part ? (
            <>
              <EditorPreview
                probe={false}
                scene={view.scene}
                original={view.originalScene}
                selected={part.id}
                onSelect={(id) => {
                  if (id) choose(id);
                }}
              />
              <DetailFields
                key={part.id + ':' + p.revision}
                project={p}
                sessionToken={view.sessionId!}
                partId={part.id}
                location={d.location}
                busy={d.busy}
                changed={() => setDirty(true)}
                prepare={prepare}
                command={command}
              />
            </>
          ) : (
            <p role="status">남은 부위가 없습니다. 아래에서 삭제한 부위 복원 후보를 선택하세요.</p>
          )}
        </div>
        <div className="detail-review">
          {d.impact && <Impact impact={d.impact} project={p} open={open} />}
          <h3>중립·극단 비교</h3>
          <label>
            시험 제어
            <select
              data-detail-control
              value={control}
              onChange={(e) => setControl(e.target.value as PreviewKey)}
            >
              {Object.entries(motionNames).map(([key, name]) => (
                <option key={key} value={key}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          <div className="button-row">
            {(['min', 'neutral', 'max'] as const).map((v, i) => (
              <button
                data-detail-point={v}
                aria-pressed={point === v}
                key={v}
                onClick={() => setPoint(v)}
              >
                {['최소', '중립', '최대'][i]}
              </button>
            ))}
          </div>
          <div className="detail-compare">
            <DetailFrame
              project={p}
              scene={view.scene}
              control={control}
              point={point}
              label="현재 적용 결과"
            />
            {d.project && d.scene && (
              <DetailFrame
                project={d.project}
                scene={d.scene}
                control={control}
                point={point}
                label="새 후보 · 적용 전"
              />
            )}
          </div>
          {dirty && d.project && (
            <p role="status">입력이 바뀌었습니다. 새 후보를 다시 준비하세요.</p>
          )}
          {d.busy && (
            <p role="status">
              {d.jobId ? 'PNG 자료를 준비 중입니다.' : '복구 지점을 보관하고 적용 중입니다.'}
            </p>
          )}
          <button
            data-detail-apply
            className="primary"
            disabled={d.busy || !d.canApply || dirty}
            onClick={() =>
              command({ type: 'detail-apply', draftId: d.draftId!, expectedRevision: p.revision })
            }
          >
            비교한 변경 적용
          </button>
          <button
            data-detail-discard
            disabled={!d.project && !d.busy}
            onClick={() => {
              setDirty(false);
              command({ type: 'detail-cancel' });
            }}
          >
            후보 폐기 · 현재 작업 유지
          </button>
        </div>
      </div>
      {p.detail?.baselines.some((b) => !p.parts.some((v) => v.id === b.part.id)) && (
        <section>
          <h3>삭제한 부위 복원</h3>
          {p.detail.baselines
            .filter((b) => !p.parts.some((v) => v.id === b.part.id))
            .map((b) => (
              <button
                data-detail-restore-deleted={b.part.id}
                key={b.part.id}
                onClick={() => prepare({ kind: 'restore', partId: b.part.id, scope: 'all' })}
              >
                {b.part.displayName} 복원 후보
              </button>
            ))}
        </section>
      )}
    </section>
  );
}
function DetailFields({
  project: p,
  partId,
  sessionToken,
  location,
  busy,
  changed,
  prepare,
  command,
}: {
  project: Project;
  partId: string;
  sessionToken: string;
  location: DetailLocation | null;
  busy: boolean;
  changed: () => void;
  prepare: (op: DetailOperation) => void;
  command: (c: SessionCommand) => void;
}) {
  const part = p.parts.find((v) => v.id === partId)!,
    savedMesh = p.motion?.meshes.find((m) => m.partId === partId);
  const [form, setForm] = useState<Extract<DetailOperation, { kind: 'part' }>>({
    kind: 'part',
    partId,
    name: part.displayName,
    role: part.role,
    side: part.side,
    parentId: part.parentId,
    groupId: part.groupId,
    order: part.drawOrder,
    visible: part.visible,
    opacity: part.opacity,
    x: part.localTransform[4],
    y: part.localTransform[5],
  });
  const [mesh, setMesh] = useState<MotionMesh | null>(
      savedMesh ? structuredClone(savedMesh) : null,
    ),
    [index, setIndex] = useState(
      location?.kind === 'vertex' && location.id === partId ? location.index : 0,
    ),
    [center, setCenter] = useState<[number, number]>(savedMesh?.pivot ?? [0, 0]),
    [radius, setRadius] = useState(250),
    [strength, setStrength] = useState(1),
    [delta, setDelta] = useState((p.motion?.faceWidth ?? 100) * 0.02);
  const existing = p.partBindings.filter((v) => v.partId === partId);
  const blankBinding = (): PartBinding => ({
    id: crypto.randomUUID(),
    partId,
    parameterId: p.parameters.find((v) => v.previewKey)?.id ?? '',
    kind: 'transform',
    mapping: { component: 'rotate-degrees', outputRange: [-2, 2] },
  });
  const [binding, setBinding] = useState<PartBinding>(() =>
      structuredClone(existing[0] ?? blankBinding()),
    ),
    [state, setState] = useState(part.textures[0]?.state ?? ''),
    [assetId, setAssetId] = useState(part.textures[0]?.assetId ?? ''),
    [restore, setRestore] = useState<'all' | 'structure' | 'mesh' | 'bindings' | 'textures'>(
      'mesh',
    ),
    [groupId, setGroupId] = useState(part.groupId ?? ''),
    [groupName, setGroupName] = useState(
      part.groupId
        ? (p.groups.find((g) => g.id === part.groupId)?.displayName ?? '새 그룹')
        : '새 그룹',
    ),
    [groupParent, setGroupParent] = useState<string | null>(
      p.groups.find((g) => g.id === part.groupId)?.parentGroupId ?? null,
    ),
    [groupOpacity, setGroupOpacity] = useState(
      p.groups.find((g) => g.id === part.groupId)?.opacity ?? 1,
    ),
    [groupVisible, setGroupVisible] = useState(
      p.groups.find((g) => g.id === part.groupId)?.visible ?? true,
    );
  const change = (f: () => void) => {
    changed();
    f();
  };
  const vertex = mesh?.vertices[index] ?? mesh?.vertices[0];
  const putVertex = (v: MotionMesh['vertices'][number]) =>
    change(() =>
      setMesh((m) =>
        m ? { ...m, vertices: m.vertices.map((old, i) => (i === index ? v : old)) } : null,
      ),
    );
  const number = (
    key: string,
    label: string,
    value: number,
    update: (v: number) => void,
    min = -1e7,
    max = 1e7,
  ) => (
    <label key={key}>
      {label}
      <input
        data-detail-field={key}
        type="number"
        min={min}
        max={max}
        step="any"
        value={value}
        onChange={(e) => change(() => update(fieldNumber(e.target.value)))}
      />
    </label>
  );
  useEffect(() => {
    if (location?.kind === 'vertex' && location.id === partId) setIndex(location.index);
    if (location?.kind === 'binding') {
      const v = existing.find((b) => b.id === location.id);
      if (v) setBinding(structuredClone(v));
    }
  }, [JSON.stringify(location)]);
  const fieldset = (title: string, content: React.ReactNode) => (
    <fieldset disabled={busy}>
      <legend>{title}</legend>
      {content}
    </fieldset>
  );
  return (
    <div className="detail-fields">
      {fieldset(
        '부위 · 표시와 구조',
        <>
          <label>
            이름
            <input
              data-detail-name
              value={form.name}
              maxLength={120}
              onChange={(e) => change(() => setForm((f) => ({ ...f, name: e.target.value })))}
            />
          </label>
          <label>
            역할
            <select
              data-detail-role
              value={form.role}
              onChange={(e) =>
                change(() => setForm((f) => ({ ...f, role: e.target.value as typeof f.role })))
              }
            >
              {Object.entries(roleNames).map(([id, label]) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label>
            캐릭터 기준 좌우
            <select
              data-detail-side
              value={form.side}
              onChange={(e) =>
                change(() => setForm((f) => ({ ...f, side: e.target.value as typeof f.side })))
              }
            >
              {[
                ['character-left', '캐릭터 왼쪽'],
                ['character-right', '캐릭터 오른쪽'],
                ['center', '중앙'],
                ['none', '미지정'],
              ].map(([id, label]) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          {(['parentId', 'groupId'] as const).map((key) => (
            <label key={key}>
              {key === 'parentId' ? '움직임 부모' : '화면 그룹'}
              <select
                data-detail-relation={key}
                value={form[key] ?? ''}
                onChange={(e) =>
                  change(() => setForm((f) => ({ ...f, [key]: e.target.value || null })))
                }
              >
                <option value="">연결 없음</option>
                {(key === 'parentId' ? p.parts : p.groups).map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.displayName}
                  </option>
                ))}
              </select>
            </label>
          ))}
          {number(
            'order',
            '앞뒤 순서',
            form.order,
            (v) => setForm((f) => ({ ...f, order: v })),
            -100000,
            100000,
          )}
          {number(
            'x',
            '부모 기준 가로 px',
            form.x,
            (v) => setForm((f) => ({ ...f, x: v })),
            -8192,
            8192,
          )}
          {number(
            'y',
            '부모 기준 세로 px',
            form.y,
            (v) => setForm((f) => ({ ...f, y: v })),
            -8192,
            8192,
          )}
          {number(
            'opacity',
            '불투명도',
            form.opacity,
            (v) => setForm((f) => ({ ...f, opacity: v })),
            0,
            1,
          )}
          <label>
            <input
              data-detail-visible
              type="checkbox"
              checked={form.visible}
              onChange={(e) => change(() => setForm((f) => ({ ...f, visible: e.target.checked })))}
            />
            부위 표시
          </label>
          <small>
            부모 변경은 현재 화면 위치를 유지합니다. 위치 수치는 새 부모를 적용한 뒤 다시
            조절하세요. 이름은 표시 변경이며 역할·연결·순서는 동작과 검사에 영향을 줍니다.
          </small>
          <button data-detail-part-preview onClick={() => prepare(form)}>
            부위 변경 비교
          </button>
        </>,
      )}
      {fieldset(
        '화면 그룹',
        <>
          <label>
            그룹
            <select
              data-detail-group-select
              value={groupId}
              onChange={(e) => {
                const g = p.groups.find((g) => g.id === e.target.value);
                change(() => {
                  setGroupId(e.target.value);
                  setGroupName(g?.displayName ?? '새 그룹');
                  setGroupParent(g?.parentGroupId ?? null);
                  setGroupVisible(g?.visible ?? true);
                  setGroupOpacity(g?.opacity ?? 1);
                });
              }}
            >
              <option value="">새 그룹 만들기</option>
              {p.groups.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.displayName}
                </option>
              ))}
            </select>
          </label>
          <label>
            그룹 이름
            <input
              data-detail-group-name
              value={groupName}
              onChange={(e) => change(() => setGroupName(e.target.value))}
            />
          </label>
          <label>
            부모 그룹
            <select
              data-detail-group-parent
              value={groupParent ?? ''}
              onChange={(e) => change(() => setGroupParent(e.target.value || null))}
            >
              <option value="">없음</option>
              {p.groups.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.displayName}
                </option>
              ))}
            </select>
          </label>
          {number('group-opacity', '그룹 불투명도', groupOpacity, setGroupOpacity, 0, 1)}
          <label>
            <input
              type="checkbox"
              data-detail-group-visible
              checked={groupVisible}
              onChange={(e) => change(() => setGroupVisible(e.target.checked))}
            />
            그룹 표시
          </label>
          <button
            data-detail-group-preview
            onClick={() =>
              prepare({
                kind: 'group',
                id: groupId || null,
                name: groupName,
                parentId: groupParent,
                visible: groupVisible,
                opacity: groupOpacity,
              })
            }
          >
            그룹 변경 비교
          </button>
          {p.detail?.groups.some((g) => g.id === groupId) && (
            <button
              data-detail-group-restore
              onClick={() => prepare({ kind: 'restore-group', id: groupId })}
            >
              이 그룹 복원 비교
            </button>
          )}
        </>,
      )}
      {fieldset(
        '삼각망 · 기준점·영향·변형',
        mesh && vertex ? (
          <>
            <MeshMap
              project={p}
              sessionToken={sessionToken}
              partId={partId}
              mesh={mesh}
              index={index}
              onIndex={setIndex}
              onMesh={(m) => change(() => setMesh(m))}
              onVertex={putVertex}
              center={center}
              onCenter={(v) => change(() => setCenter(v))}
            />
            {([0, 1] as const).map((i) =>
              number(
                'pivot-' + i,
                i === 0 ? '기준점 가로 px' : '기준점 세로 px',
                mesh.pivot[i],
                (v) =>
                  setMesh((m) =>
                    m
                      ? {
                          ...m,
                          pivot: m.pivot.map((n, j) => (i === j ? v : n)) as [number, number],
                        }
                      : m,
                  ),
              ),
            )}
            <label>
              제어 곡선
              <select
                data-detail-curve
                value={mesh.curve}
                onChange={(e) =>
                  change(() =>
                    setMesh((m) => (m ? { ...m, curve: e.target.value as typeof m.curve } : m)),
                  )
                }
              >
                <option value="linear">선형</option>
                <option value="smoothstep">완만한 연결</option>
              </select>
            </label>
            {(['yawParameterId', 'rollParameterId'] as const).map((key, i) => (
              <label key={key}>
                {i === 0 ? '좌우 고개 연결' : '기울기 연결'}
                <select
                  data-detail-mesh-link={key}
                  value={mesh[key] ?? ''}
                  onChange={(e) =>
                    change(() => setMesh((m) => (m ? { ...m, [key]: e.target.value || null } : m)))
                  }
                >
                  <option value="">연결 해제</option>
                  {p.parameters
                    .filter((v) => v.previewKey === (i === 0 ? 'head_yaw' : 'head_roll'))
                    .map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.displayName}
                      </option>
                    ))}
                </select>
              </label>
            ))}
            <button
              data-detail-mesh-preview
              onClick={() =>
                prepare({
                  kind: 'mesh',
                  partId,
                  pivot: mesh.pivot,
                  curve: mesh.curve,
                  yawParameterId: mesh.yawParameterId,
                  rollParameterId: mesh.rollParameterId,
                })
              }
            >
              기준점·고개 연결 비교
            </button>
            <label>
              점
              <select
                data-detail-vertex-select
                value={index}
                onChange={(e) => setIndex(Number(e.target.value))}
              >
                {mesh.vertices.map((_, i) => (
                  <option key={i} value={i}>
                    점 {i + 1}
                  </option>
                ))}
              </select>
            </label>
            {(['position', 'minimum', 'maximum'] as const).flatMap((key) =>
              ([0, 1] as const).map((i) =>
                number(
                  key + '-' + i,
                  `${key === 'position' ? '점 위치' : key === 'minimum' ? '좌우 최소 변위' : '좌우 최대 변위'} ${i === 0 ? '가로' : '세로'} px`,
                  vertex[key][i],
                  (v) =>
                    putVertex({ ...vertex, [key]: vertex[key].map((n, j) => (i === j ? v : n)) }),
                ),
              ),
            )}
            {number(
              'weight',
              '기울기 영향 가중치',
              vertex.weight,
              (v) => putVertex({ ...vertex, weight: v }),
              0,
              1,
            )}
            <button
              data-detail-vertex-preview
              onClick={() =>
                prepare({
                  kind: 'vertex',
                  partId,
                  index,
                  position: vertex.position,
                  weight: vertex.weight,
                  minimum: vertex.minimum,
                  maximum: vertex.maximum,
                })
              }
            >
              선택 점 변형 비교
            </button>
            {([0, 1] as const).map((i) =>
              number('center-' + i, i === 0 ? '영향 중심 가로' : '영향 중심 세로', center[i], (v) =>
                setCenter((c) => c.map((n, j) => (j === i ? v : n)) as [number, number]),
              ),
            )}
            {number('radius', '영향 반경 px', radius, setRadius, 0.1, 16384)}
            {number('strength', '영향 세기', strength, setStrength, 0, 1)}
            {number(
              'yawDelta',
              '중심점 좌우 변위 px',
              delta,
              setDelta,
              0,
              (p.motion?.faceWidth ?? 0) * 0.045,
            )}
            <button
              data-detail-influence-preview
              onClick={() =>
                prepare({ kind: 'influence', partId, center, radius, strength, yawDelta: delta })
              }
            >
              이 부위 영향 범위 다시 지정 · 비교
            </button>
            <small>
              원 안의 기울기 가중치와 좌우 변위를 다시 지정합니다. 원 밖은 영향 0입니다. 변위는 얼굴
              폭의 4.5% 이내이며, 접히는 망은 적용하지 않습니다.
            </small>
          </>
        ) : (
          <button
            data-detail-create-mesh
            onClick={() =>
              prepare({
                kind: 'mesh',
                partId,
                pivot: [0, 0],
                curve: 'smoothstep',
                yawParameterId: p.parameters.find((v) => v.previewKey === 'head_yaw')?.id ?? null,
                rollParameterId: p.parameters.find((v) => v.previewKey === 'head_roll')?.id ?? null,
              })
            }
          >
            선택 부위 기본 망 준비 · 비교
          </button>
        ),
      )}
      {fieldset(
        '매개변수·부위 연결',
        <>
          <label>
            연결
            <select
              data-detail-binding-select
              value={existing.some((b) => b.id === binding.id) ? binding.id : ''}
              onChange={(e) =>
                change(() =>
                  setBinding(
                    structuredClone(
                      existing.find((b) => b.id === e.target.value) ?? blankBinding(),
                    ),
                  ),
                )
              }
            >
              <option value="">새 연결</option>
              {existing.map((b, i) => (
                <option key={b.id} value={b.id}>
                  {i + 1}. {b.kind === 'transform' ? b.mapping.component : '그림 상태'} ·{' '}
                  {p.parameters.find((p) => p.id === b.parameterId)?.displayName}
                </option>
              ))}
            </select>
          </label>
          <label>
            매개변수
            <select
              data-detail-binding-parameter
              value={binding.parameterId}
              onChange={(e) =>
                change(() => setBinding((b) => ({ ...b, parameterId: e.target.value })))
              }
            >
              {p.parameters
                .filter((v) => v.previewKey)
                .map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.displayName} ({v.min}~{v.max})
                  </option>
                ))}
            </select>
          </label>
          <label>
            연결 방식
            <select
              data-detail-binding-kind
              value={binding.kind}
              onChange={(e) =>
                change(() =>
                  setBinding((b) =>
                    e.target.value === 'transform'
                      ? {
                          ...b,
                          kind: 'transform',
                          mapping: { component: 'rotate-degrees', outputRange: [-2, 2] },
                        }
                      : {
                          ...b,
                          kind: 'state-blend',
                          mapping: {
                            minimumState:
                              part.textures.find((t) => t.state === 'closed')?.state ??
                              part.textures[0]?.state ??
                              '',
                            maximumState:
                              part.textures.find((t) => t.state === 'open')?.state ??
                              part.textures.at(-1)?.state ??
                              '',
                          },
                        },
                  ),
                )
              }
            >
              <option value="transform">회전·이동·배율</option>
              <option value="state-blend">저작된 그림 상태</option>
            </select>
          </label>
          {binding.kind === 'transform' ? (
            <>
              <label>
                변형 축
                <select
                  data-detail-component
                  value={binding.mapping.component}
                  onChange={(e) =>
                    change(() =>
                      setBinding((b) => ({
                        ...b,
                        kind: 'transform',
                        mapping: {
                          component: e.target.value as 'rotate-degrees',
                          outputRange: e.target.value.startsWith('scale') ? [1, 1.05] : [-2, 2],
                        },
                      })),
                    )
                  }
                >
                  {[
                    ['rotate-degrees', '회전 도'],
                    ['translate-x', '가로 px'],
                    ['translate-y', '세로 px'],
                    ['scale-x', '가로 배율'],
                    ['scale-y', '세로 배율'],
                  ].map(([id, label]) => (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              {([0, 1] as const).map((i) =>
                number(
                  'output-' + i,
                  i === 0 ? '매개변수 최소에서 출력' : '매개변수 최대에서 출력',
                  binding.mapping.outputRange[i],
                  (v) =>
                    setBinding((b) =>
                      b.kind === 'transform'
                        ? {
                            ...b,
                            mapping: {
                              ...b.mapping,
                              outputRange: b.mapping.outputRange.map((n, j) =>
                                i === j ? v : n,
                              ) as [number, number],
                            },
                          }
                        : b,
                    ),
                ),
              )}
              <small>회전 ±6° · 이동 ±64px · 배율 0.8~1.2. 값이 같으면 해당 축은 정지합니다.</small>
            </>
          ) : (
            <>
              {(['minimumState', 'middleState', 'maximumState'] as const).map((key) => (
                <label key={key}>
                  {key === 'minimumState'
                    ? '최소 그림'
                    : key === 'middleState'
                      ? '중간 그림 (선택)'
                      : '최대 그림'}
                  <select
                    data-detail-state-map={key}
                    value={binding.mapping[key] ?? ''}
                    onChange={(e) =>
                      change(() =>
                        setBinding((b) => {
                          if (b.kind !== 'state-blend') return b;
                          const mapping = { ...b.mapping };
                          if (key === 'middleState' && !e.target.value) delete mapping.middleState;
                          else mapping[key] = e.target.value;
                          return { ...b, mapping };
                        }),
                      )
                    }
                  >
                    {key === 'middleState' && <option value="">없음</option>}
                    {part.textures.map((t) => (
                      <option key={t.state} value={t.state}>
                        {t.state}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </>
          )}
          <button
            data-detail-binding-preview
            onClick={() => prepare({ kind: 'binding', partId, binding })}
          >
            연결 추가·수정 비교
          </button>
          <button
            data-detail-unbind
            disabled={!existing.some((b) => b.id === binding.id)}
            onClick={() => prepare({ kind: 'unbind', partId, bindingId: binding.id })}
          >
            선택 연결 해제 비교
          </button>
        </>,
      )}
      {fieldset(
        '그림 교체·부위 삭제·복원',
        <>
          <label>
            교체할 상태
            <select
              data-detail-texture-state
              value={state}
              onChange={(e) =>
                change(() => {
                  setState(e.target.value);
                  setAssetId(part.textures.find((t) => t.state === e.target.value)!.assetId);
                })
              }
            >
              {part.textures.map((t) => (
                <option key={t.state} value={t.state}>
                  {t.state}
                </option>
              ))}
            </select>
          </label>
          <label>
            프로젝트 안의 그림
            <select
              data-detail-asset
              value={assetId}
              onChange={(e) => change(() => setAssetId(e.target.value))}
            >
              {p.assets.map((a, i) => (
                <option value={a.id} key={a.id}>
                  그림 {i + 1} · {a.dimensions.width}×{a.dimensions.height}
                </option>
              ))}
            </select>
          </label>
          <button
            data-detail-texture-preview
            onClick={() => prepare({ kind: 'texture', partId, state, assetId })}
          >
            선택 그림으로 교체 비교
          </button>
          <button
            data-detail-import
            onClick={() => {
              changed();
              command({ type: 'detail-import', partId, state, expectedRevision: p.revision });
            }}
          >
            새 PNG로 교체 후보 준비
          </button>
          <button data-detail-delete onClick={() => prepare({ kind: 'delete', partId })}>
            이 부위 삭제 영향 확인
          </button>
          <label>
            이 부위만 복원
            <select
              data-detail-restore-scope
              value={restore}
              onChange={(e) => setRestore(e.target.value as typeof restore)}
            >
              {[
                ['mesh', '망·기준점·영향'],
                ['structure', '역할·계층·순서·위치'],
                ['bindings', '매개변수 연결'],
                ['textures', '그림 상태'],
                ['all', '부위의 보관된 설정 전체'],
              ].map(([id, label]) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <button
            data-detail-restore
            disabled={!p.detail?.baselines.some((b) => b.part.id === partId)}
            onClick={() => prepare({ kind: 'restore', partId, scope: restore })}
          >
            선택 범위 복원 비교
          </button>
        </>,
      )}
    </div>
  );
}
