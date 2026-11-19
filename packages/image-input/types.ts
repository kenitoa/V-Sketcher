import type { Rect, Affine } from '../coordinates';
export interface Selection {
  rect: Rect;
  backgroundTolerance: number | null;
  masks: { mode: 'erase' | 'restore'; rect: Rect }[];
  occluded: boolean;
}
export interface Probe {
  detectorAvailable: boolean;
  originalSize: { width: number; height: number };
  size: { width: number; height: number };
  orientation: number;
  iccConverted: boolean;
  sourceToNormalized: Affine;
  reduced: boolean;
  estimatedWorkingBytes: number;
  format: 'png' | 'jpeg';
  hasAlpha: boolean;
  faceCount: number;
  candidates: { rect: Rect; method: 'alpha' | 'face' | 'manual-required' }[];
}
export interface Analysis {
  faces: Rect[];
  warnings: string[];
  crop: Rect;
  analysisSize: { width: number; height: number };
}
export interface InputPreparation {
  version: 1;
  originalAssetId: string;
  normalizedAssetId: string;
  selectedAssetId: string;
  analysisAssetId: string;
  probe: Probe;
  selection: Selection;
  analysis: Analysis;
}
export interface InputDraftView {
  id: string;
  preview: string;
  probe: Probe;
}
export interface InputView {
  draft: InputDraftView | null;
  jobId: string | null;
  busy: boolean;
  canRetry: boolean;
  errorCode: string | null;
}
export interface InputProcessor {
  structure?(
    operation: 'analyze' | 'build',
    bytes: Buffer,
    options: import('../single-image/types').StructureOptions,
    signal: AbortSignal,
  ): Promise<{
    report: import('../single-image/types').StructureReport;
    files: Map<string, Buffer>;
  }>;
  run(
    operation: 'probe' | 'select',
    bytes: Buffer,
    suffix: string,
    selection: Selection | null,
    signal: AbortSignal,
  ): Promise<{ report: Probe | Analysis; files: Map<string, Buffer> }>;
}
export function assertSelection(value: unknown): asserts value is Selection {
  const v = value as Selection;
  const rect = (r: any): boolean =>
    !!r &&
    Object.keys(r).sort().join(',') === 'height,width,x,y' &&
    [r.x, r.y, r.width, r.height].every(Number.isFinite) &&
    r.x >= 0 &&
    r.y >= 0 &&
    r.width >= 1 &&
    r.height >= 1 &&
    r.x + r.width <= 4096 &&
    r.y + r.height <= 4096;
  if (
    !v ||
    Object.keys(v).sort().join(',') !== 'backgroundTolerance,masks,occluded,rect' ||
    !rect(v.rect) ||
    !(
      v.backgroundTolerance === null ||
      (Number.isInteger(v.backgroundTolerance) &&
        v.backgroundTolerance >= 0 &&
        v.backgroundTolerance <= 80)
    ) ||
    typeof v.occluded !== 'boolean' ||
    !Array.isArray(v.masks) ||
    v.masks.length > 64 ||
    v.masks.some(
      (m) =>
        !m ||
        Object.keys(m).sort().join(',') !== 'mode,rect' ||
        !['erase', 'restore'].includes(m.mode) ||
        !rect(m.rect),
    )
  )
    throw new Error('E_INPUT_REGION');
}
