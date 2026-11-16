/** Boundary contracts for subsequent implementation; these ports are not implemented features. */
import type { PreviewScene, Parameters } from '../scene-core';
import type { Asset, Project, SourceType } from '../project-model';
import type { ResultEnvelope, JobIdentity as WorkflowIdentity } from '../workflow';
export type ResourceId = Asset['id'];
export type JobIdentity = WorkflowIdentity;
export type InputRoute = SourceType;
export interface ResourceReference { id: ResourceId; sha256: string; mediaType: 'image/png'; }
export interface InputDescriptor { route: InputRoute; resources: readonly ResourceReference[]; }
export interface AnalysisResult { identity: JobIdentity; sourceIds: readonly ResourceId[]; warnings: readonly string[]; }
export interface InputPort { inspect(input: InputDescriptor, signal: AbortSignal): Promise<readonly string[]>; }
export interface AnalysisPort { analyze(input: InputDescriptor, identity: JobIdentity, signal: AbortSignal): Promise<AnalysisResult>; }
export interface EditorPort { currentRevision(projectId: string): number; apply(result: ResultEnvelope): 'applied' | 'awaiting-review' | 'rejected'; }
export interface ProjectModelPort { read(projectId:string):Readonly<Project>; }
export interface MotionPort { sample(seconds: number): Parameters; }
export interface RuntimePort { setScene(scene: PreviewScene): Promise<void>; draw(parameters: Partial<Parameters>): void; dispose(): void; }
export interface OutputPort { start(sceneId: string): Promise<void>; stop(): Promise<void>; }
export interface ExportPort { validate(sceneId: string, targetVersion: string): Promise<readonly string[]>; export(sceneId: string, signal: AbortSignal): Promise<ResourceId>; }
