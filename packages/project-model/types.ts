import type { Affine, Rect } from '../coordinates';
export type SourceType = 'parts' | 'single-image' | 'split-image';
export interface Fingerprint { sha256: string; bytes: number; }
export interface Asset {
  id: string; kind: 'original-image' | 'part-texture' | 'supplement-image' | 'edited-image';
  origin: 'imported' | 'bundled' | 'auto-preparation' | 'auto-completion' | 'manual-edit' | 'generated'; parentAssetIds: string[];
  storage: { path: string }; fingerprint: Fingerprint; version: number; mediaType: 'image/png' | 'image/jpeg';
  dimensions: { width: number; height: number }; sourceRegion: Rect; sourceToEdited: Affine;
  colorSpace: 'srgb' | 'unknown'; alphaMode: 'straight' | 'premultiplied' | 'opaque';
  producer: { name: string; version: string };
  attribution: { creator: string; source: string; usage: string; status: 'verified' | 'unverified' };
}
export interface PartTexture { state: string; assetId: string; assetVersion: number; assetToLocal: Affine; }
export interface CharacterPart {
  library?:import('../parts-library/types').PartSource;
  color?:import('../parts-library/types').ColorAdjustment;
  id: string; displayName: string; role: 'base' | 'body' | 'head' | 'hair-front' | 'hair-back' | 'eye' | 'mouth' | 'accessory' | 'custom';
  side: 'character-left' | 'character-right' | 'center' | 'none'; parentId: string | null; groupId: string | null;
  textures: PartTexture[]; localTransform: Affine; drawOrder: number; visible: boolean; opacity: number;
  correctionOrigin: 'automatic' | 'user-confirmed' | 'manual'; limitations: string[];
}
export interface PartGroup { id: string; displayName: string; parentGroupId: string | null; visible: boolean; }
export type PreviewKey = 'eye_left' | 'eye_right' | 'mouth' | 'head_yaw' | 'head_roll';
export interface Parameter { id: string; displayName: string; semantic: string; unit: 'ratio' | 'degrees' | 'custom'; min: number; neutral: number; max: number; previewKey: PreviewKey | null; }
interface BindingIdentity { id: string; parameterId: string; partId: string; }
export type PartBinding = BindingIdentity & (
  { kind:'state-blend'; mapping:{ minimumState:string; maximumState:string;middleState?:string } } |
  { kind:'transform'; mapping:{ component:'rotate-degrees' | 'translate-x' | 'translate-y' | 'scale-x' | 'scale-y'; outputRange:[number,number] } }
);
export interface InputBinding {
  id: string; source: 'face' | 'microphone' | 'manual'; channel: string; parameterId: string; inputRange: [number,number];
  invert: boolean; gain: number; offset: number; smoothingMs: number;
  fallback: { mode: 'neutral' | 'hold' | 'constant'; value: number; returnMs: number };
}
export interface Expression { id: string; displayName: string; values: { parameterId: string; value: number; locked: boolean }[]; transitionMs: number; release: 'live-input' | 'neutral'; }
export interface RuntimeProfile { id: string; revision: number; mode: 'idle' | 'camera' | 'microphone' | 'camera-microphone'; mirror: boolean; fallbackExpressionId: string | null; }
export interface BroadcastProfile { id: string; revision: number; displayName: string; width: number; height: number; fps: number; transparent: boolean; region: Rect; fit: 'contain' | 'cover'; }
export interface ExportProfile { id: string; revision: number; displayName: string; target: 'inochi2d'; targetVersion: string; format: 'inp'; converterVersion: string; parameterMap: { parameterId: string; targetName: string }[]; }
export interface MotionMesh { partId:string; pivot:[number,number]; vertices:{ position:[number,number]; weight:number; minimum:[number,number]; maximum:[number,number] }[]; triangles:number[]; yawParameterId:string | null; rollParameterId:string | null; curve:'linear' | 'smoothstep'; }
export interface MotionRig { version:1; meshes:MotionMesh[]; faceWidth:number; maxRollDegrees:number; settings:{ strength:number; smoothingMs:number; pose:{ parameterId:string; value:number }[] }; secondary:'disabled'; }
export interface Project {
  assembly?:import('../parts-library/types').Assembly;
  inputPreparation?:import('../image-input/types').InputPreparation;
  motion?:MotionRig;
  projectId: string; schemaVersion: { major: number; minor: number }; displayName: string; sourceType: SourceType;
  createdAt: string; modifiedAt: string; revision: number; savedRevision: number | null;
  canvas: { width: number; height: number }; inputAssetIds: string[];
  assets: Asset[]; parts: CharacterPart[]; groups: PartGroup[]; parameters: Parameter[]; partBindings: PartBinding[];
  inputBindings: InputBinding[]; expressions: Expression[]; runtimeProfile: RuntimeProfile;
  broadcastProfiles: BroadcastProfile[]; exportProfiles: ExportProfile[];
  provenance: { preparation: string; limitations: string[] }; derivedProjects: { projectId: string; relation: '3d' | 'generated-variant' }[];
}
/** Local-only document. Never serialized as part of Project. Hardware identifiers are opaque. */
export interface MachineSettings {
  schemaVersion: 1; projectId: string; cameraId: string | null; microphoneId: string | null;
  calibrations: { bindingId: string; inputRange: [number,number] }[];
}
export interface ValidationIssue { code: string; location: string; }
