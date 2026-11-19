import type { Asset, CharacterPart, Project } from '../project-model';
export type Slot = 'face' | 'hair' | 'eyes' | 'mouth' | 'outfit' | 'accessory';
export const SLOTS: Slot[] = ['face', 'hair', 'eyes', 'mouth', 'outfit', 'accessory'];
export interface Adjustment {
  key: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  hue: number;
}
export const defaults = (key: string): Adjustment => ({
  key,
  x: 0,
  y: 0,
  scale: 1,
  rotation: 0,
  hue: 0,
});
export interface Assembly {
  catalogId: string;
  version: string;
  choices: { slot: Slot; itemId: string | null; version: string }[];
  linkedEyes: boolean;
  adjustments: Adjustment[];
  warnings: string[];
}
export interface PartSource {
  catalogId: string;
  itemId: string;
  version: string;
  key: string;
}
export interface ColorAdjustment {
  hueDegrees: number;
  minimumHue: number;
  maximumHue: number;
  minimumSaturation: number;
}
export interface PartTemplate {
  key: string;
  role: CharacterPart['role'];
  side: CharacterPart['side'];
  order: number;
  anchor: [number, number];
  textures: CharacterPart['textures'];
  tint: [number, number, number];
}
export interface Item {
  id: string;
  version: string;
  slot: Slot;
  label: string;
  family: string;
  templates: PartTemplate[];
  thumbnail: {
    assetId: string;
    region: { x: number; y: number; width: number; height: number };
  } | null;
  limits: { position: number; scale: number; rotation: number; hue: number };
}
export interface Catalog {
  id: string;
  version: string;
  family: string;
  canvas: { width: number; height: number };
  assets: Asset[];
  files: Record<string, string>;
  items: Item[];
  defaults: Record<Slot, string>;
}
export function matches(catalog: Catalog, assembly: Assembly | undefined): boolean {
  return !!assembly && assembly.catalogId === catalog.id && assembly.version === catalog.version;
}
export function canonicalAsset(a: Asset, b: Asset): boolean {
  return (
    a.fingerprint.sha256 === b.fingerprint.sha256 &&
    a.fingerprint.bytes === b.fingerprint.bytes &&
    a.version === b.version &&
    a.mediaType === b.mediaType &&
    a.dimensions.width === b.dimensions.width &&
    a.dimensions.height === b.dimensions.height &&
    (['x', 'y', 'width', 'height'] as const).every(
      (k) => a.sourceRegion[k] === b.sourceRegion[k],
    ) &&
    a.sourceToEdited.every((n, i) => n === b.sourceToEdited[i])
  );
}
export function assemblyReason(p: Project, c: Catalog): string | null {
  if (!matches(c, p.assembly))
    return '현재 조합과 라이브러리 버전이 달라요. 기본 조합을 새로 준비해 주세요.';
  if (p.canvas.width !== c.canvas.width || p.canvas.height !== c.canvas.height)
    return '몸체 좌표 규격이 달라요. 같은 규격의 기본 조합을 사용해 주세요.';
  if (
    c.assets.some((a) => {
      const old = p.assets.find((v) => v.id === a.id);
      return !old || !canonicalAsset(old, a);
    })
  )
    return '파츠 자원·영역 규격이 달라요. 현재 모습을 보관하고 새 파츠 프로젝트에서 준비해 주세요.';
  return null;
}
