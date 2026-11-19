import { referenceIssue } from '../expression-control';
import { randomUUID } from 'node:crypto';
import { projectToPreview } from '../project-model/preview';
import { normalize } from '../motion';
import { NEUTRAL, type Parameters } from '../scene-core';
import { activeTextures } from '../editor-view';
import type { FileInput } from '../image-export/service';
import { CONVERTER_VERSION, CHECKER_VERSION, type CheckResult } from '../export-check/types';
import { AXIS, evaluated, separabilityError, uvs } from './geometry';
import { decodePNG, type Pixels } from './png';
import { bakeLayer } from './textures';
import {
  encodeINP,
  parseINP,
  REPORT_EXTENSION,
  sha,
  type NativeModel,
  type NativeNode,
  type NativeBinding,
} from './inp';
export interface ExportReport {
  id: string;
  created: string;
  canvas: [number, number];
  projectId: string;
  revision: number;
  fingerprint: string;
  source: 'working' | 'execution';
  target: 'Inochi Session';
  targetVersion: '0.8.7';
  format: 'INP';
  converterVersion: string;
  checkerVersion: string;
  signature: string;
  warningScope: string;
  warnings: CheckResult['issues'];
  demo: boolean;
  parts: { sourceId: string; name: string; nodes: number[] }[];
  textures: { index: number; sha256: string; bytes: number }[];
  parameters: { sourceId: string; uuid: number; name: string }[];
  expressions: {
    sourceId: string;
    name: string;
    nativeAnimation: string;
    transitionMs: number;
    release: string;
    releaseMs: number;
    values: unknown[];
  }[];
  approximations: string[];
  guide: string[];
}
export interface ConvertedAvatar {
  bytes: Buffer;
  report: ExportReport;
}
const node = (uuid: number, name: string, z = 0): NativeNode => ({
  uuid,
  name,
  type: 'Node',
  enabled: true,
  zsort: z,
  lockToRoot: false,
  transform: { translation: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1] },
  children: [],
});
function bind(node: number, name: string, values: unknown[], nearest = false): NativeBinding {
  return {
    node,
    param_name: name,
    values: values.map((v) => [v]),
    isSet: values.map(() => [true]),
    interpolate_mode: nearest ? 'Nearest' : 'Linear',
  };
}
function lane(uuid: number, frames: [number, number][]) {
  return {
    uuid,
    target: 0,
    interpolation: 'Linear',
    merge_mode: 'Forced',
    keyframes: frames.map(([frame, value]) => ({ frame, value, tension: 0.5 })),
  };
}
function animation(lanes: unknown[], length: number, leadIn = 0, leadOut = length - 1) {
  return { timestep: 1 / 30, additive: false, animationWeight: 1, length, leadIn, leadOut, lanes };
}
export async function convertAvatar(
  input: FileInput,
  check: CheckResult,
  demo: boolean,
  canonicalize: (bytes: Buffer) => Buffer,
  signal: AbortSignal,
): Promise<ConvertedAvatar> {
  if (
    check.status === 'BLOCKED' ||
    (check.status === 'WARNING' && !check.acknowledged) ||
    check.basis.fingerprint !== input.basis.fingerprint ||
    check.converterVersion !== CONVERTER_VERSION ||
    check.checkerVersion !== CHECKER_VERSION ||
    check.basis.projectId !== input.basis.projectId ||
    check.basis.revision !== input.basis.revision
  )
    throw new Error('E_AVATAR_CHECK');
  const project = input.project,
    all = structuredClone(project);
  for (const p of all.parts) p.visible = true;
  for (const g of all.groups) g.visible = true;
  const images = new Map<string, Pixels>(),
    scene = projectToPreview(all, (a) => {
      const bytes = input.resources.get(a.id);
      if (!bytes || sha(bytes) !== a.fingerprint.sha256) throw new Error('E_AVATAR_RESOURCE');
      if (!images.has(a.id)) {
        const decoded = decodePNG(a.mediaType === 'image/png' ? bytes : canonicalize(bytes));
        if (decoded.width !== a.dimensions.width || decoded.height !== a.dimensions.height)
          throw new Error('E_AVATAR_RESOURCE');
        images.set(a.id, decoded);
      }
      return 'assets/' + a.id + '.png';
    });
  // Scene paths are capability names only. Image buffers never cross into normal logs.
  const pathImages = new Map([...images].map(([id, value]) => ['assets/' + id + '.png', value]));
  let next = 1;
  const root = node(next++, '2DSketcher');
  const parameters = project.parameters.map((p) => {
    if (!p.previewKey) throw new Error('E_AVATAR_PARAMETER');
    const axis = [...new Set([...AXIS, (p.neutral - p.min) / (p.max - p.min)])].sort(
      (a, b) => a - b,
    );
    return {
      uuid: next++,
      name: check.settings.parameterMap.find((v) => v.parameterId === p.id)!.targetName,
      is_vec2: false,
      min: [p.min, 0],
      max: [p.max, 1],
      defaults: [
        project.motion?.settings.pose.find((v) => v.parameterId === p.id)?.value ?? p.neutral,
        0,
      ],
      axis_points: [axis, [0]],
      merge_mode: 'Forced',
      bindings: [] as NativeBinding[],
    };
  });
  const report: ExportReport = {
    id: randomUUID(),
    created: new Date().toISOString(),
    canvas: [project.canvas.width, project.canvas.height],
    projectId: project.projectId,
    revision: project.revision,
    fingerprint: input.basis.fingerprint,
    source: input.basis.source,
    target: 'Inochi Session',
    targetVersion: '0.8.7',
    format: 'INP',
    converterVersion: CONVERTER_VERSION,
    checkerVersion: CHECKER_VERSION,
    signature: check.signature,
    warningScope: check.warningScope,
    warnings: check.issues.filter((v) => v.severity === 'warning'),
    demo,
    parts: [],
    textures: [],
    parameters: parameters.map((p, i) => ({
      sourceId: project.parameters[i]!.id,
      uuid: p.uuid,
      name: p.name,
    })),
    expressions: [],
    approximations: [
      '고개/변환 곡선은 65개 이상 키점 사이 선형 보간입니다.',
      '픽셀 보간 상태는 실제 중간 RGBA 텍스처 65단계에서 가장 가까운 상태로 전환합니다.',
      '표정은 대상의 독립 애니메이션이며 입력 잠금/해제는 대상의 애니메이션 우선순위를 사용합니다.',
    ],
    guide: [
      'Inochi Session 0.8.7에서 File → Open으로 이 INP를 직접 엽니다. 다른 파일이나 2DSketcher 실행은 필요하지 않습니다.',
      '자동 동작을 포함했으면 2DSketcher-demo가 로드 시 반복됩니다. 대상 Animations 패널에서 정지한 뒤 실제 장치 바인딩을 설정하세요.',
      '저장 표정은 Animations 패널의 expression-* 이름으로 재생합니다. 이름 대응과 원래 정책은 이 파일의 export 확장 보고서에 포함됩니다.',
      '장치 미연결 상태에서도 내장 자동 동작과 표정을 사용할 수 있습니다. 웹캠/마이크 설정과 OS 단축키는 자동 이전하지 않습니다.',
      '결과를 다른 폴더로 이동해도 텍스처가 모두 내장되어 있습니다. 재내보낸 파일은 새 결과이며 이전 외부 확인을 승계하지 않습니다.',
    ],
  };
  const textures: Buffer[] = [],
    textureIds = new Map<string, number>();
  let decodedBytes = 0;
  for (const layer of scene.layers) {
    if (signal.aborted) throw new Error('E_AVATAR_CANCELLED');
    if (separabilityError(layer) > 0.02) throw new Error('E_AVATAR_COUPLING');
    const part = project.parts.find((v) => v.id === layer.id)!,
      copy = check.copy!.parts.find((v) => v.sourceId === part.id)!,
      base = evaluated(layer, NEUTRAL),
      record = { sourceId: part.id, name: part.displayName, nodes: [] as number[] };
    report.parts.push(record);
    const deforms = parameters.map((p, i) => {
      const source = project.parameters[i]!,
        key = source.previewKey!;
      return p.axis_points[0]!.map((u) => {
        const value = source.min + u * (source.max - source.min),
          pose = { ...NEUTRAL, [key]: normalize(source, value) };
        return evaluated(layer, pose).map((v, j) => [v.x - base[j]!.x, v.y - base[j]!.y]);
      });
    });
    for (const baked of await bakeLayer(layer, pathImages, signal)) {
      let texture = textureIds.get(baked.sha256);
      if (texture === undefined) {
        texture = textures.length;
        textureIds.set(baked.sha256, texture);
        textures.push(baked.bytes);
        decodedBytes += baked.rect.width * baked.rect.height * 4;
        report.textures.push({ index: texture, sha256: baked.sha256, bytes: baked.bytes.length });
        if (textures.length > 512 || decodedBytes > 268435456) throw new Error('E_AVATAR_BUDGET');
      }
      const n = node(next++, 'part_' + copy.uuid + '_' + record.nodes.length, -layer.z);
      n.type = 'Part';
      n.enabled = copy.enabled;
      n.mesh = {
        verts: base.flatMap((v) => [
          v.x - project.canvas.width / 2,
          v.y - project.canvas.height / 2,
        ]),
        uvs: uvs(layer, baked.path, baked.rect),
        indices: layer.mesh?.triangles ?? [0, 1, 2, 0, 2, 3],
        origin: [0, 0],
      };
      Object.assign(n, {
        textures: [texture, 4294967295, 4294967295],
        blend_mode: 'Normal',
        tint: [1, 1, 1],
        screenTint: [0, 0, 0],
        masks: [],
        mask_threshold: 0.5,
        opacity: copy.opacity,
      });
      root.children.push(n);
      record.nodes.push(n.uuid);
      parameters.forEach((p, i) => {
        if (
          deforms[i]!.some((sample) =>
            sample.some((v) => Math.abs(v[0]!) > 0.000001 || Math.abs(v[1]!) > 0.000001),
          )
        )
          p.bindings.push(bind(n.uuid, 'deform', deforms[i]!));
        const source = project.parameters[i]!;
        if (layer.bind === source.previewKey) {
          const weights = p.axis_points[0]!.map((u) => {
            const q = normalize(source, source.min + u * (source.max - source.min));
            if (baked.sample !== null)
              return Math.round(q * 64) === Math.round(baked.sample * 64) ? 1 : 0;
            return (
              activeTextures(layer, { ...NEUTRAL, [source.previewKey!]: q }).find(
                ([path]) => path === baked.path,
              )?.[1] ?? 0
            );
          });
          p.bindings.push(bind(n.uuid, 'opacity', weights, baked.sample !== null));
        }
      });
    }
  }
  const animations: Record<string, unknown> = {},
    controls: unknown[] = [];
  for (const e of project.expressions) {
    if (e.values.some((v) => referenceIssue(project, v)))
      throw new Error('E_AVATAR_EXPRESSION_SCOPE');
    const name = 'expression-' + e.id,
      transition = Math.max(1, Math.round((e.transitionMs * 30) / 1000)),
      release = Math.max(
        1,
        Math.round(((e.releaseMs ?? project.expressionSettings?.releaseMs ?? 200) * 30) / 1000),
      ),
      hold = 60,
      length = transition + hold + release + 1;
    const lanes = e.values.map((v) => {
      const i = project.parameters.findIndex((p) => p.id === v.parameterId);
      if (i < 0) throw new Error('E_AVATAR_PARAMETER');
      const p = parameters[i]!;
      return lane(p.uuid, [
        [0, p.defaults[0]!],
        [transition, v.value],
        [transition + hold, v.value],
        [length - 1, p.defaults[0]!],
      ]);
    });
    animations[name] = animation(lanes, length, transition, transition + hold);
    controls.push({ name, loop: false, triggerType: 'None' });
    report.expressions.push({
      sourceId: e.id,
      name: e.displayName,
      nativeAnimation: name,
      transitionMs: e.transitionMs,
      release: e.release,
      releaseMs: e.releaseMs ?? 0,
      values: structuredClone(e.values),
    });
  }
  const poses: Partial<Parameters>[] = [
    { ...NEUTRAL },
    { ...NEUTRAL, eye_left: 0, eye_right: 0 },
    { ...NEUTRAL, eye_left: 0.5, eye_right: 0.5, mouth: 0.5 },
    { ...NEUTRAL, mouth: 1 },
    { ...NEUTRAL, head_yaw: -1, head_roll: -1 },
    { ...NEUTRAL, head_yaw: 1, head_roll: 1 },
    { ...NEUTRAL },
  ];
  const expressionStart = poses.length * 30;
  const demoLanes = parameters.map((p, i) => {
    const source = project.parameters[i]!,
      key = source.previewKey!,
      frames: [number, number][] = [];
    poses.forEach((pose, j) => {
      const q = pose[key]!,
        value = key.startsWith('head')
          ? q < 0
            ? source.neutral + q * (source.neutral - source.min)
            : source.neutral + q * (source.max - source.neutral)
          : source.min + q * (source.max - source.min);
      frames.push([j * 30, value], [j * 30 + 19, value]);
    });
    project.expressions.forEach((e, j) => {
      const value = e.values.find((v) => v.parameterId === source.id)?.value ?? p.defaults[0]!;
      frames.push(
        [expressionStart + j * 90 + 10, value],
        [expressionStart + j * 90 + 69, value],
        [expressionStart + (j + 1) * 90, p.defaults[0]!],
      );
    });
    return lane(p.uuid, frames);
  });
  animations['2DSketcher-demo'] = animation(
    demoLanes,
    expressionStart + project.expressions.length * 90 + 1,
  );
  controls.push({
    name: '2DSketcher-demo',
    loop: true,
    triggerType: demo ? 'Event' : 'None',
    playEvent: demo ? 1 : 0,
    stopEvent: 0,
    fullStopEvent: 0,
  });
  // Expression showcase is a separate target-native animation for device-free validation/use.
  if (project.expressions.length) {
    const length = project.expressions.length * 90 + 1;
    animations['2DSketcher-expressions'] = animation(
      parameters.map((p, i) => {
        const frames: [number, number][] = [[0, p.defaults[0]!]];
        project.expressions.forEach((e, j) => {
          const v =
            e.values.find((v) => v.parameterId === project.parameters[i]!.id)?.value ??
            p.defaults[0]!;
          frames.push([j * 90 + 15, v], [j * 90 + 60, v], [(j + 1) * 90, p.defaults[0]!]);
        });
        return lane(p.uuid, frames);
      }),
      length,
    );
    controls.push({ name: '2DSketcher-expressions', loop: true, triggerType: 'None' });
  }
  const model: NativeModel = {
    meta: {
      name: project.displayName,
      version: '0.8.6',
      rigger: '2DSketcher ' + CONVERTER_VERSION,
      artist: 'See embedded export provenance',
      preservePixels: false,
    },
    physics: { pixelsPerMeter: 1000, gravity: 9.8 },
    nodes: root,
    param: parameters,
    automation: [],
    animations,
  };
  const bytes = encodeINP(model, textures, {
    [REPORT_EXTENSION]: {
      ...report,
      provenance: {
        assets: project.assets.map((a) => ({
          id: a.id,
          sha256: a.fingerprint.sha256,
          attribution: a.attribution,
        })),
        limitations: project.provenance.limitations,
      },
    },
    'com.inochi2d.inochi-session.animations': controls,
  });
  if (signal.aborted) throw new Error('E_AVATAR_CANCELLED');
  parseINP(bytes);
  return { bytes, report };
}
