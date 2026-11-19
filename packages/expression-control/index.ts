import { InputTransitions, inputTiming } from '../input-control';
import type {
  Project,
  Expression,
  ExpressionSettings,
  ExpressionValue,
  Parameter,
} from '../project-model/types';
export const defaults: ExpressionSettings = {
  version: 1,
  mouth: 'camera',
  alternate: true,
  autoBlink: false,
  releaseMs: 250,
  shortcuts: [null, null, null],
};
export const settings = (p: Project): ExpressionSettings => p.expressionSettings ?? defaults;
const limit = (p: Parameter, v: number) =>
  Math.max(p.min, Math.min(p.max, Number.isFinite(v) ? v : p.neutral));
/** Anchors describe the reviewed affected parts, not extra bindings. Deleted IDs stay as repair evidence. */
export function targets(p: Project, parameterId: string): string[] {
  const roots = p.partBindings
    .filter(
      (b) =>
        b.parameterId === parameterId &&
        (b.kind === 'transform'
          ? b.mapping.outputRange[0] !== b.mapping.outputRange[1]
          : b.mapping.minimumState !== b.mapping.maximumState),
    )
    .map((b) => b.partId);
  const mesh =
    p.motion?.meshes
      .filter(
        (m) =>
          (m.yawParameterId === parameterId &&
            m.vertices.some((v) => [...v.minimum, ...v.maximum].some((n) => Math.abs(n) > 1e-8))) ||
          (m.rollParameterId === parameterId &&
            p.motion!.maxRollDegrees > 0 &&
            m.vertices.some((v) => v.weight > 0)),
      )
      .map((m) => m.partId) ?? [];
  return p.parts
    .filter((part) => {
      if (mesh.includes(part.id)) return true;
      let q: typeof part | undefined = part;
      for (let i = 0; q && i < 64; i++) {
        if (roots.includes(q.id)) return true;
        q = p.parts.find((v) => v.id === q!.parentId);
      }
      return false;
    })
    .map((v) => v.id)
    .sort();
}
export function referenceIssue(p: Project, v: ExpressionValue): 'unbound' | 'changed' | null {
  const current = targets(p, v.parameterId);
  if (!current.length) return 'unbound';
  return v.partIds && JSON.stringify([...v.partIds].sort()) !== JSON.stringify(current)
    ? 'changed'
    : null;
}
export type ExpressionOperation =
  | {
      kind: 'save';
      id: string | null;
      name: string;
      values: { parameterId: string; value: number; locked: boolean }[];
      transitionMs: number;
      releaseMs: number;
      release: 'live-input' | 'neutral';
    }
  | { kind: 'duplicate' | 'delete'; id: string }
  | { kind: 'repair'; id: string; parameterId: string; action: 'reconnect' | 'remove' }
  | { kind: 'settings'; value: ExpressionSettings };
const id = (v: unknown): v is string =>
  typeof v === 'string' && /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/.test(v);
const ms = (v: unknown) => Number.isInteger(v) && Number(v) >= 0 && Number(v) <= 3000;
const exact = (v: Record<string, unknown>, keys: string[]) =>
  Object.keys(v).sort().join(',') === [...keys].sort().join(',');
export function assertOperation(value: unknown): asserts value is ExpressionOperation {
  if (!value || typeof value !== 'object' || Array.isArray(value))
    throw new Error('E_EXPRESSION_COMMAND');
  const v = value as Record<string, unknown>;
  let ok = false;
  if (v.kind === 'save')
    ok =
      exact(v, ['kind', 'id', 'name', 'values', 'transitionMs', 'releaseMs', 'release']) &&
      (v.id === null || id(v.id)) &&
      typeof v.name === 'string' &&
      v.name.trim().length > 0 &&
      v.name.length <= 120 &&
      ms(v.transitionMs) &&
      ms(v.releaseMs) &&
      ['live-input', 'neutral'].includes(String(v.release)) &&
      Array.isArray(v.values) &&
      v.values.length > 0 &&
      v.values.length <= 128 &&
      v.values.every(
        (x) =>
          x &&
          typeof x === 'object' &&
          exact(x, ['parameterId', 'value', 'locked']) &&
          id(x.parameterId) &&
          typeof x.value === 'number' &&
          Number.isFinite(x.value) &&
          typeof x.locked === 'boolean',
      );
  if (v.kind === 'delete' || v.kind === 'duplicate') ok = exact(v, ['kind', 'id']) && id(v.id);
  if (v.kind === 'repair')
    ok =
      exact(v, ['kind', 'id', 'parameterId', 'action']) &&
      id(v.id) &&
      id(v.parameterId) &&
      ['reconnect', 'remove'].includes(String(v.action));
  if (v.kind === 'settings') {
    const s = v.value as Record<string, unknown>;
    ok =
      exact(v, ['kind', 'value']) &&
      !!s &&
      exact(s, ['version', 'mouth', 'alternate', 'autoBlink', 'releaseMs', 'shortcuts']) &&
      s.version === 1 &&
      ['camera', 'microphone'].includes(String(s.mouth)) &&
      typeof s.alternate === 'boolean' &&
      typeof s.autoBlink === 'boolean' &&
      ms(s.releaseMs) &&
      Array.isArray(s.shortcuts) &&
      s.shortcuts.length === 3 &&
      s.shortcuts.every((x) => x === null || id(x));
  }
  if (!ok) throw new Error('E_EXPRESSION_COMMAND');
}
export function editExpressions(p: Project, op: ExpressionOperation, newId: () => string): void {
  assertOperation(op);
  p.schemaVersion.minor = Math.max(p.schemaVersion.minor, 8);
  if (op.kind === 'settings') {
    if (op.value.shortcuts.some((id) => id !== null && !p.expressions.some((e) => e.id === id)))
      throw new Error('E_EXPRESSION_REFERENCE');
    p.expressionSettings = structuredClone(op.value);
    return;
  }
  const e = op.id === null ? undefined : p.expressions.find((e) => e.id === op.id);
  if (op.id !== null && !e) throw new Error('E_EXPRESSION_REFERENCE');
  if (op.kind === 'delete') {
    p.expressions = p.expressions.filter((v) => v.id !== op.id);
    if (p.runtimeProfile.fallbackExpressionId === op.id)
      p.runtimeProfile.fallbackExpressionId = null;
    if (p.expressionSettings)
      p.expressionSettings.shortcuts = p.expressionSettings.shortcuts.map((v) =>
        v === op.id ? null : v,
      );
    return;
  }
  if (op.kind === 'duplicate') {
    if (p.expressions.length >= 64) throw new Error('E_EXPRESSION_LIMIT');
    p.expressions.push({
      ...structuredClone(e!),
      id: newId(),
      displayName: e!.displayName.slice(0, 110) + ' (복제)',
    });
    return;
  }
  if (op.kind === 'repair') {
    const v = e!.values.find((v) => v.parameterId === op.parameterId);
    if (!v) throw new Error('E_EXPRESSION_REFERENCE');
    if (op.action === 'remove') e!.values = e!.values.filter((x) => x !== v);
    else {
      const ids = targets(p, v.parameterId);
      if (!ids.length) throw new Error('E_EXPRESSION_REFERENCE');
      v.partIds = ids;
    }
    return;
  }
  if (op.kind !== 'save') throw new Error('E_EXPRESSION_COMMAND');
  const seen = new Set<string>();
  const values = op.values.map((v) => {
    const param = p.parameters.find((a) => a.id === v.parameterId);
    if (!param || seen.has(v.parameterId) || v.value < param.min || v.value > param.max)
      throw new Error('E_EXPRESSION_VALUE');
    seen.add(v.parameterId);
    const old = e?.values.find((x) => x.parameterId === v.parameterId);
    if (old && referenceIssue(p, old)) throw new Error('E_EXPRESSION_REPAIR');
    const ids = targets(p, v.parameterId);
    if (!ids.length) throw new Error('E_EXPRESSION_REFERENCE');
    return { ...v, partIds: ids };
  });
  const next: Expression = {
    id: e?.id ?? newId(),
    displayName: op.name.trim(),
    values,
    transitionMs: op.transitionMs,
    releaseMs: op.releaseMs,
    release: op.release,
  };
  if (e) p.expressions[p.expressions.indexOf(e)] = next;
  else {
    if (p.expressions.length >= 64) throw new Error('E_EXPRESSION_LIMIT');
    p.expressions.push(next);
  }
}
export type Owner =
  | 'test'
  | 'expression-locked'
  | 'camera'
  | 'microphone'
  | 'automatic'
  | 'expression-default'
  | 'neutral'
  | 'neutral-hold';
type Source = 'camera' | 'microphone';
type Packet = { time: number; serial: number; values: Map<string, number> };
export interface ControlFrame {
  values: Map<string, number>;
  owners: Map<string, Owner>;
  activeId: string | null;
  transitioning: boolean;
  issues: { parameterId: string; reason: string }[];
}
/** Runtime only. Receives mapped parameter units, never frames/audio, and never mutates Project. */
export class ExpressionController {
  recoveryEnabled = false;
  private inputTransitions = new InputTransitions();
  private project: Project | null = null;
  private generation = '';
  private packets = new Map<Source, Packet>();
  private serials = new Map<Source, number>();
  private active: string | null = null;
  private hold = new Set<string>();
  private fade: {
    start: number;
    duration: number;
    from: Map<string, number>;
    ids: Set<string>;
  } | null = null;
  private last: ControlFrame = {
    values: new Map(),
    owners: new Map(),
    activeId: null,
    transitioning: false,
    issues: [],
  };
  private clock = 0;
  setProject(p: Project | null, generation = p?.projectId ?? ''): void {
    const previous = this.project?.expressions.find((e) => e.id === this.active);
    if (generation !== this.generation || !p) {
      this.reset();
      this.generation = generation;
    }
    this.project = p;
    if (this.active && !p?.expressions.some((e) => e.id === this.active)) {
      this.active = null;
      this.hold.clear();
      this.transition(
        this.clock,
        previous?.releaseMs ?? 250,
        new Set(previous?.values.map((v) => v.parameterId) ?? []),
      );
    } else if (
      this.active &&
      previous &&
      JSON.stringify(previous) !== JSON.stringify(p?.expressions.find((e) => e.id === this.active))
    ) {
      this.transition(
        this.clock,
        Math.min(3000, p!.expressions.find((e) => e.id === this.active)!.transitionMs),
        new Set(previous.values.map((v) => v.parameterId)),
      );
    }
    if (p) {
      for (const packet of this.packets.values())
        packet.values = new Map(
          [...packet.values].filter(([id]) => p.parameters.some((v) => v.id === id)),
        );
    }
  }
  reset(): void {
    this.recoveryEnabled = false;
    this.inputTransitions.reset();
    this.packets.clear();
    this.serials.clear();
    this.active = null;
    this.hold.clear();
    this.fade = null;
    this.clock = 0;
    this.last = {
      values: new Map(),
      owners: new Map(),
      activeId: null,
      transitioning: false,
      issues: [],
    };
  }
  input(
    source: Source,
    values: ReadonlyMap<string, number>,
    time: number,
    serial: number,
  ): boolean {
    const p = this.project;
    if (
      !p ||
      !['camera', 'microphone'].includes(source) ||
      !Number.isFinite(time) ||
      time < 0 ||
      time < this.clock - 300 ||
      !Number.isSafeInteger(serial) ||
      serial < 0 ||
      serial <= (this.serials.get(source) ?? -1) ||
      time < (this.packets.get(source)?.time ?? 0)
    )
      return false;
    const clean = new Map<string, number>();
    for (const [id, v] of values) {
      const param = p.parameters.find((v) => v.id === id);
      if (
        param &&
        Number.isFinite(v) &&
        (source !== 'microphone' || param.previewKey === 'mouth') &&
        targets(p, id).length
      )
        clean.set(id, limit(param, v));
    }
    if (!clean.size) return false;
    this.packets.set(source, { time, serial, values: clean });
    this.serials.set(source, serial);
    return true;
  }
  clearInput(source: Source): void {
    this.packets.delete(source);
  }
  snapshot(): ControlFrame {
    return this.last;
  }
  recoveryState(now: number): 'idle' | 'live' | 'recovering' | 'returning' {
    return this.inputTransitions.phase(now);
  }
  private time(now: number): number {
    if (!Number.isFinite(now) || now < 0) throw new Error('E_EXPRESSION_TIME');
    this.clock = Math.max(this.clock, now);
    return this.clock;
  }
  private transition(now: number, duration: number, ids: Set<string>): void {
    this.fade = { start: now, duration, from: new Map(this.last.values), ids };
  }
  activate(id: string, now: number): void {
    const p = this.project;
    const e = p?.expressions.find((v) => v.id === id);
    if (!p || !e || !e.values.some((v) => !referenceIssue(p, v)))
      throw new Error('E_EXPRESSION_REFERENCE');
    now = this.time(now);
    this.frame(now);
    const ids = new Set([
      ...this.hold,
      ...(p.expressions.find((e) => e.id === this.active)?.values.map((v) => v.parameterId) ?? []),
      ...e.values.map((v) => v.parameterId),
    ]);
    this.active = id;
    this.hold.clear();
    this.transition(now, Math.min(3000, e.transitionMs), ids);
  }
  release(now: number): void {
    const p = this.project;
    if (!p) return;
    now = this.time(now);
    this.frame(now);
    const e = p.expressions.find((e) => e.id === this.active);
    if (!e) {
      this.resume(now);
      return;
    }
    const ids = new Set(e.values.filter((v) => !referenceIssue(p, v)).map((v) => v.parameterId));
    this.active = null;
    this.hold = e.release === 'neutral' ? ids : new Set();
    this.transition(now, e.releaseMs ?? settings(p).releaseMs, ids);
  }
  resume(now: number): void {
    now = this.time(now);
    this.frame(now);
    const ids = new Set([
      ...this.hold,
      ...(this.project?.expressions
        .find((e) => e.id === this.active)
        ?.values.map((v) => v.parameterId) ?? []),
    ]);
    this.active = null;
    this.hold.clear();
    this.transition(now, this.project ? settings(this.project).releaseMs : 0, ids);
  }
  frame(
    now: number,
    test: ReadonlyMap<string, number> = new Map(),
    automaticBlink = false,
  ): ControlFrame {
    now = this.time(now);
    const p = this.project;
    const values = new Map<string, number>(),
      owners = new Map<string, Owner>();
    if (!p) return this.last;
    const s = settings(p),
      e = p.expressions.find((v) => v.id === this.active);
    const issues =
      e?.values
        .filter((v) => referenceIssue(p, v))
        .map((v) => ({ parameterId: v.parameterId, reason: referenceIssue(p, v)! })) ?? [];
    const signal = (source: Source, id: string): number | undefined => {
      const packet = this.packets.get(source);
      return packet &&
        now >= packet.time &&
        now - packet.time <=
          (this.recoveryEnabled && source === 'microphone' ? inputTiming.microphoneFreshMs : 300)
        ? packet.values.get(id)
        : undefined;
    };
    const fraction = this.fade
      ? this.fade.duration === 0
        ? 1
        : Math.max(0, Math.min(1, (now - this.fade.start) / this.fade.duration))
      : 1;
    const blend = fraction * fraction * (3 - 2 * fraction);
    for (const param of p.parameters) {
      let value =
        p.motion?.settings.pose.find((v) => v.parameterId === param.id)?.value ?? param.neutral;
      let owner: Owner = 'neutral';
      const v = e?.values.find((v) => v.parameterId === param.id && !referenceIssue(p, v));
      const preferred: Source = param.previewKey === 'mouth' ? s.mouth : 'camera';
      let live = signal(preferred, param.id),
        liveOwner = preferred;
      if (live === undefined && param.previewKey === 'mouth' && s.alternate) {
        liveOwner = preferred === 'camera' ? 'microphone' : 'camera';
        live = signal(liveOwner, param.id);
      }
      if (v && !v.locked) {
        value = v.value;
        owner = 'expression-default';
      }
      if (
        (s.autoBlink || automaticBlink) &&
        param.previewKey?.startsWith('eye') &&
        targets(p, param.id).length
      ) {
        const t = now % 4000;
        if (t < 160) {
          value = param.min + ((param.neutral - param.min) * Math.abs(t - 80)) / 80;
          owner = 'automatic';
        }
      }
      if (this.recoveryEnabled)
        value = this.inputTransitions.frame(
          param.id,
          live === undefined
            ? null
            : { owner: liveOwner, value: live, time: this.packets.get(liveOwner)!.time },
          value,
          now,
        );
      else if (live !== undefined) value = live;
      if (live !== undefined) owner = liveOwner;
      if (this.hold.has(param.id)) {
        value = param.neutral;
        owner = 'neutral-hold';
      }
      if (v?.locked) {
        value = v.value;
        owner = 'expression-locked';
      }
      if (this.fade?.ids.has(param.id) && fraction < 1) {
        const from = this.fade.from.get(param.id) ?? param.neutral;
        value = from + (value - from) * blend;
      }
      const t = test.get(param.id);
      if (t !== undefined && Number.isFinite(t)) {
        value = t;
        owner = 'test';
      }
      values.set(param.id, limit(param, value));
      owners.set(param.id, owner);
    }
    if (fraction >= 1) this.fade = null;
    this.last = {
      values,
      owners,
      activeId: this.active,
      transitioning: this.fade !== null,
      issues,
    };
    return this.last;
  }
}
/** App-local keys only. Caller supplies modal/text/IME guards; no OS registration. */
export function shortcutSlot(
  e: {
    ctrlKey: boolean;
    altKey: boolean;
    shiftKey: boolean;
    metaKey: boolean;
    repeat: boolean;
    isComposing: boolean;
    code: string;
  },
  blocked: boolean,
): number | null {
  return !blocked &&
    !e.repeat &&
    !e.isComposing &&
    e.ctrlKey &&
    e.altKey &&
    e.shiftKey &&
    !e.metaKey &&
    /^Digit[0-3]$/.test(e.code)
    ? Number(e.code.slice(-1))
    : null;
}
