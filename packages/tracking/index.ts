import type { Project, PreviewKey } from '../project-model/types';
import { targets } from '../expression-control';
export const TRACK_KEYS: PreviewKey[] = ['eye_left', 'eye_right', 'mouth', 'head_yaw', 'head_roll'];
export type Signals = Record<PreviewKey, number>;
export interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface Face {
  box: Box;
  values: Signals;
  brightness: number;
}
export interface Detection {
  seq: number;
  faces: Face[];
  brightness: number;
  inferenceMs: number;
}
export interface Mapping {
  key: PreviewKey;
  enabled: boolean;
  range: [number, number];
  invert: boolean;
  gain: number;
  smoothingMs: number;
  deadzone: number;
}
export interface TrackingSettings {
  version: 1;
  channels: Mapping[];
}
export interface Calibration {
  version: 1;
  profileKey: string;
  neutral: Signals;
  sampleCount: number;
  durationMs: number;
  createdAt: string;
}
export const defaultTracking = (): TrackingSettings => ({
  version: 1,
  channels: TRACK_KEYS.map((key) => ({
    key,
    enabled: true,
    range:
      key === 'head_yaw'
        ? [-30, 30]
        : key === 'head_roll'
          ? [-20, 20]
          : key === 'mouth'
            ? [-0.15, 0.6]
            : [0, 1.1],
    invert: false,
    gain: 1,
    smoothingMs: 100,
    deadzone: 0.01,
  })),
});
const finite = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
export function validBox(b: Box): boolean {
  return (
    !!b &&
    [b.x, b.y, b.width, b.height].every(finite) &&
    b.x >= 0 &&
    b.y >= 0 &&
    b.width > 0.01 &&
    b.height > 0.01 &&
    b.x + b.width <= 1.000001 &&
    b.y + b.height <= 1.000001
  );
}
export function validSignals(v: Signals): boolean {
  return (
    !!v &&
    Object.keys(v).sort().join(',') === [...TRACK_KEYS].sort().join(',') &&
    TRACK_KEYS.every(
      (k) => finite(v[k]) && Math.abs(v[k]) <= (k === 'head_yaw' ? 80 : k === 'head_roll' ? 70 : 1),
    ) &&
    TRACK_KEYS.filter((k) => !k.startsWith('head')).every((k) => v[k] >= 0)
  );
}
export function assertTracking(v: unknown): asserts v is TrackingSettings {
  const s = v as TrackingSettings;
  if (
    !s ||
    Object.keys(s).sort().join(',') !== 'channels,version' ||
    s.version !== 1 ||
    !Array.isArray(s.channels) ||
    s.channels.length !== 5 ||
    new Set(s.channels.map((v) => v.key)).size !== 5 ||
    s.channels.some(
      (c) =>
        Object.keys(c).sort().join(',') !== 'deadzone,enabled,gain,invert,key,range,smoothingMs' ||
        !TRACK_KEYS.includes(c.key) ||
        typeof c.enabled !== 'boolean' ||
        typeof c.invert !== 'boolean' ||
        !Array.isArray(c.range) ||
        c.range.length !== 2 ||
        !c.range.every(finite) ||
        c.range[0] >= c.range[1] ||
        (c.key.startsWith('head') && (c.range[0] >= 0 || c.range[1] <= 0)) ||
        c.range[0] < (c.key.startsWith('head') ? -80 : c.key === 'mouth' ? -1 : 0) ||
        c.range[1] > (c.key.startsWith('head') ? 80 : c.key.startsWith('eye') ? 2 : 1) ||
        (c.key.startsWith('eye') && (c.range[0] >= 1 || c.range[1] < 1)) ||
        !finite(c.gain) ||
        c.gain < 0 ||
        c.gain > 2 ||
        !Number.isInteger(c.smoothingMs) ||
        c.smoothingMs < 0 ||
        c.smoothingMs > 500 ||
        !finite(c.deadzone) ||
        c.deadzone < 0 ||
        c.deadzone > 0.1,
    )
  )
    throw new Error('E_TRACKING_SETTINGS');
}
export function assertCalibration(v: unknown): asserts v is Calibration {
  const c = v as Calibration;
  if (
    !c ||
    Object.keys(c).sort().join(',') !==
      'createdAt,durationMs,neutral,profileKey,sampleCount,version' ||
    c.version !== 1 ||
    !/^[a-f0-9]{64}$/.test(c.profileKey) ||
    !validSignals(c.neutral) ||
    c.neutral.eye_left < 0.35 ||
    c.neutral.eye_right < 0.35 ||
    c.neutral.mouth > 0.25 ||
    Math.abs(c.neutral.head_yaw) > 20 ||
    Math.abs(c.neutral.head_roll) > 15 ||
    !Number.isInteger(c.sampleCount) ||
    c.sampleCount < 12 ||
    c.sampleCount > 300 ||
    !finite(c.durationMs) ||
    c.durationMs < 1500 ||
    c.durationMs > 10000 ||
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(c.createdAt)
  )
    throw new Error('E_TRACKING_CALIBRATION');
}
export function assertDetection(v: unknown): asserts v is Detection {
  const d = v as Detection;
  if (
    !d ||
    Object.keys(d).sort().join(',') !== 'brightness,faces,inferenceMs,seq' ||
    !Number.isSafeInteger(d.seq) ||
    d.seq < 0 ||
    !finite(d.brightness) ||
    d.brightness < 0 ||
    d.brightness > 255 ||
    !finite(d.inferenceMs) ||
    d.inferenceMs < 0 ||
    d.inferenceMs > 30000 ||
    !Array.isArray(d.faces) ||
    d.faces.length > 4 ||
    d.faces.some(
      (f) =>
        !f ||
        Object.keys(f).sort().join(',') !== 'box,brightness,values' ||
        !finite(f.brightness) ||
        f.brightness < 0 ||
        f.brightness > 255 ||
        !validBox(f.box) ||
        !validSignals(f.values),
    )
  )
    throw new Error('E_TRACKING_RESULT');
}
function score(a: Box, b: Box): number {
  const intersection =
    Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x)) *
    Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y));
  const iou = intersection / (a.width * a.height + b.width * b.height - intersection);
  const distance = Math.hypot(
    a.x + a.width / 2 - b.x - b.width / 2,
    a.y + a.height / 2 - b.y - b.height / 2,
  );
  const ratio = (b.width * b.height) / (a.width * a.height);
  return iou >= 0.25 && distance < 0.18 && ratio > 0.5 && ratio < 2 ? iou - distance : -1;
}
/** Geometric continuity only, never face recognition. Ambiguity fails closed. */
export class TargetLock {
  private anchor: Box | null = null;
  private acquired = false;
  private lastSeen = 0;
  private missingSince: number | null = null;
  state: 'waiting' | 'select' | 'tracked' | 'lost' | 'ambiguous' = 'waiting';
  reset(): void {
    this.anchor = null;
    this.acquired = false;
    this.lastSeen = 0;
    this.missingSince = null;
    this.state = 'waiting';
  }
  select(box: Box, now: number): void {
    if (!validBox(box) || !finite(now)) throw new Error('E_TRACKING_TARGET');
    this.anchor = { ...box };
    this.acquired = true;
    this.lastSeen = now;
    this.missingSince = null;
    this.state = 'select';
  }
  update(faces: Face[], now: number): Face | null {
    if (!finite(now) || faces.some((f) => !validBox(f.box) || !validSignals(f.values))) return null;
    if (!this.acquired) {
      if (faces.length === 1) {
        this.anchor = { ...faces[0]!.box };
        this.acquired = true;
        this.lastSeen = now;
        this.state = 'tracked';
        return faces[0]!;
      }
      this.state = faces.length ? 'select' : 'waiting';
      return null;
    }
    if (
      !this.anchor ||
      now - this.lastSeen > 2000 ||
      (this.missingSince !== null && now - this.missingSince > 500)
    ) {
      this.anchor = null;
      this.state = 'lost';
      return null;
    }
    const matches = faces
      .map((f) => ({ f, score: score(this.anchor!, f.box) }))
      .filter((v) => v.score >= 0)
      .sort((a, b) => b.score - a.score);
    if (!matches.length) {
      this.missingSince ??= this.lastSeen;
      this.state = 'lost';
      return null;
    }
    if (matches.length > 1) {
      this.anchor = null;
      this.state = 'ambiguous';
      return null;
    }
    const face = matches[0]!.f;
    this.anchor = { ...face.box };
    this.lastSeen = now;
    this.missingSince = null;
    this.state = 'tracked';
    return face;
  }
}
export class NeutralCalibration {
  private samples: { time: number; values: Signals }[] = [];
  private started: number | null = null;
  state: 'idle' | 'collecting' | 'ready' | 'failed' | 'cancelled' = 'idle';
  reason = '';
  candidate: Calibration | null = null;
  start(now: number): void {
    this.started = now;
    this.samples = [];
    this.state = 'collecting';
    this.reason = '';
    this.candidate = null;
  }
  cancel(): void {
    this.samples = [];
    this.candidate = null;
    this.reason = '';
    this.state = 'cancelled';
  }
  get count(): number {
    return this.samples.length;
  }
  sample(face: Face | null, brightness: number, now: number, profileKey: string): void {
    if (this.state !== 'collecting' || this.started === null) return;
    if (now < this.started) return;
    if (!finite(now) || !finite(brightness) || brightness < 0 || brightness > 255) {
      this.samples = [];
      return;
    }
    if (now - this.started > 10000) {
      this.state = 'failed';
      this.reason = '안정된 정면 입력을 충분히 받지 못했어요.';
      return;
    }
    if (
      !face ||
      brightness < 35 ||
      !validSignals(face.values) ||
      face.values.eye_left < 0.35 ||
      face.values.eye_right < 0.35 ||
      face.values.mouth > 0.25 ||
      Math.abs(face.values.head_yaw) > 20 ||
      Math.abs(face.values.head_roll) > 15
    ) {
      this.samples = [];
      this.reason = '밝은 곳에서 정면을 보고 눈을 뜬 채 입을 편하게 다물어 주세요.';
      return;
    }
    if (this.samples.length && now <= this.samples.at(-1)!.time) return;
    this.samples.push({ time: now, values: { ...face.values } });
    if (this.samples.length > 300) this.samples.shift();
    const duration = now - this.samples[0]!.time;
    if (this.samples.length < 12 || duration < 1500) return;
    const neutral = {} as Signals;
    for (const k of TRACK_KEYS) {
      const values = this.samples.map((s) => s.values[k]).sort((a, b) => a - b);
      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      const sd = Math.sqrt(values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length);
      if (sd > (k.startsWith('head') ? 2 : 0.07)) {
        this.samples = this.samples.slice(-1);
        this.reason = '움직임이 커서 다시 모으고 있어요. 잠시 가만히 있어 주세요.';
        return;
      }
      neutral[k] = values[Math.floor(values.length / 2)]!;
    }
    this.candidate = {
      version: 1,
      profileKey,
      neutral,
      sampleCount: this.samples.length,
      durationMs: duration,
      createdAt: new Date().toISOString(),
    };
    assertCalibration(this.candidate);
    this.state = 'ready';
    this.reason = '';
  }
}
export class TrackingMapper {
  private last = new Map<PreviewKey, number>();
  private previous: number | null = null;
  reset(): void {
    this.last.clear();
    this.previous = null;
  }
  map(p: Project, raw: Signals, calibration: Calibration | null, now: number): Map<string, number> {
    const result = new Map<string, number>();
    if (
      !validSignals(raw) ||
      !finite(now) ||
      now < 0 ||
      (this.previous !== null && now <= this.previous)
    )
      return result;
    const dt = this.previous === null ? 1 / 30 : Math.min(0.1, (now - this.previous) / 1000);
    this.previous = now;
    const config = p.tracking ?? defaultTracking();
    assertTracking(config);
    for (const c of config.channels) {
      const parameter = p.parameters.find((v) => v.previewKey === c.key);
      if (!c.enabled || !parameter || !targets(p, parameter.id).length) {
        this.last.delete(c.key);
        continue;
      }
      let input = raw[c.key];
      if (calibration) {
        if (c.key.startsWith('head') || c.key === 'mouth') input -= calibration.neutral[c.key];
        else input = input / Math.max(0.35, calibration.neutral[c.key]);
      }
      const eye = c.key.startsWith('eye'),
        reference = eye ? 1 : 0;
      let q: number;
      if (input < reference) {
        const span = eye ? 1 - c.range[0] : c.range[0] < 0 ? -c.range[0] : 0;
        q = span > 0 ? Math.max(-1, (input - reference) / span) : 0;
      } else {
        const start = eye ? 1 : Math.max(0, c.range[0]),
          span = c.range[1] - start;
        q = span > 0 ? Math.max(0, Math.min(1, (input - start) / span)) : 0;
      }
      if (c.invert) q = -q;
      q *= c.gain;
      if (Math.abs(q) < c.deadzone) q = 0;
      q = Math.max(-1, Math.min(1, q));
      const previous = this.last.get(c.key) ?? 0;
      const smoothed =
        c.smoothingMs === 0
          ? q
          : previous + (q - previous) * (1 - Math.exp(-dt / (c.smoothingMs / 1000)));
      const step = (c.key.startsWith('head') ? 4 : 20) * dt;
      const filtered = previous + Math.max(-step, Math.min(step, smoothed - previous));
      this.last.set(c.key, filtered);
      const baseline =
        p.motion?.settings.pose.find((v) => v.parameterId === parameter.id)?.value ??
        parameter.neutral;
      result.set(
        parameter.id,
        Math.max(
          parameter.min,
          Math.min(
            parameter.max,
            baseline +
              filtered * (filtered < 0 ? baseline - parameter.min : parameter.max - baseline),
          ),
        ),
      );
    }
    return result;
  }
}
export function cameraError(name: string): string {
  return name === 'NotAllowedError'
    ? 'E_CAMERA_PERMISSION'
    : name === 'NotFoundError' || name === 'OverconstrainedError'
      ? 'E_CAMERA_MISSING'
      : name === 'NotReadableError'
        ? 'E_CAMERA_OPEN'
        : name === 'AbortError'
          ? 'E_CAMERA_READ'
          : 'E_CAMERA_UNKNOWN';
}
export const cameraMessages: Record<string, string> = {
  E_CAMERA_PERMISSION: '카메라 접근이 거부됐어요. Windows의 카메라 개인정보 설정을 확인해 주세요.',
  E_CAMERA_MISSING: '선택한 카메라를 찾지 못했어요. 목록을 새로 고르고 연결해 주세요.',
  E_CAMERA_OPEN:
    '카메라를 열지 못했어요. 다른 앱의 점유, 드라이버 또는 운영체제 제한 가능성을 확인해 주세요.',
  E_CAMERA_READ: '카메라 영상이 끊겼어요. 장치와 연결 상태를 확인해 주세요.',
  E_CAMERA_UNKNOWN: '카메라 연결에 실패했어요. 장치를 다시 선택해 주세요.',
  E_TRACKING_WORKER: '로컬 추적기를 시작하지 못했어요. 카메라를 중지한 뒤 다시 연결해 주세요.',
  E_TRACKING_TIMEOUT: '추적 응답을 받지 못했어요. 중지한 뒤 다시 연결해 주세요.',
  E_TRACKING_RESULT: '추적 결과를 확인하지 못해 이번 입력을 제외했어요.',
  E_TRACKING_CALIBRATION: '보정 기준을 저장하지 못했어요. 기존 기준은 유지합니다.',
};
