import type { StudioInfo } from '../../../packages/contracts';
import type { SessionCommand,SessionView,SessionReply } from '../../../packages/project-session/contracts';
declare global {
  interface Window {
    microphoneLiveCheck?:(scripted?:boolean)=>Promise<Record<string,unknown>>;
    microphoneReviewPhase?:{phase:string;seconds:number;blocks:number;state:string;rms:number};
    prepareExecutionKeys?:()=>Promise<{registered:boolean;revision:number}>;
    executionKeyState?:()=>{hidden:boolean;neutral:boolean;active:boolean;lastAction:import('../../../packages/execution').RunAction|null};
    avatarExportSelfCheck?:()=>Promise<Record<string,unknown>>;
    fileOutputSelfCheck?:()=>Promise<Record<string,unknown>>;
    broadcastCheckStep?:(action:string,value?:unknown)=>Promise<Record<string,unknown>>;
    runtimeChangesSelfCheck?:()=>Promise<Record<string,unknown>>;
    runtimeChangesStop?:()=>Promise<void>;
    executionSelfCheck?:()=>Promise<Record<string,unknown>>;
    inputRecoverySelfCheck?:()=>Promise<Record<string,unknown>>;
    cameraLiveCheck?:(hint?:string|null)=>Promise<Record<string,unknown>>;
    liveReviewPhase?:{phase:string;seconds:number;faceCount?:number;selected?:boolean;brightness?:number|null;yaw?:number|null;roll?:number|null;state?:string};
    trackingSelfCheck?:()=>Promise<Record<string,unknown>>;
    expressionSelfCheck?:()=>Promise<Record<string,unknown>>;
    expressionExtremeData?:string;
    detailSelfCheck?:()=>Promise<Record<string,unknown>>;
    detailExtremeData?:string;
    splitSelfCheck?:(rows:import('./split-self-check').SplitFixtureRow[])=>Promise<Record<string,unknown>>;
    splitExtremeData?:string;
    correctionSelfCheck?:()=>Promise<Record<string,unknown>>;
    correctionExtremeData?:string;
    structureSelfCheck?:()=>Promise<Record<string,unknown>>;
    structureExtremeData?:string;
    workflowLabCheck?: (options?:{ holdForCapture:boolean }) => Promise<Record<string,unknown>>;
    studio: {avatar:import('../../../packages/avatar-export/types').AvatarAPI;image:import('../../../packages/image-export/types').ImageAPI;compatibility:import('../../../packages/export-check/types').CompatibilityAPI; broadcast:import('../../../packages/broadcast').BroadcastAPI;run:import('../../../packages/execution/api').RunAPI;microphone:import('../../../packages/input-control/api').MicrophoneAPI;tracking:import('../../../packages/tracking/api').TrackingAPI; info: () => Promise<StudioInfo>; health: () => Promise<{ ready: boolean }>; projects:{ dropImage:(file:File)=>Promise<SessionReply>;view:()=>Promise<SessionView>; command:(command:SessionCommand)=>Promise<SessionReply>; subscribe:(listener:(view:SessionView)=>void)=>()=>void } };
    projectSelfCheck?:()=>Promise<Record<string,unknown>>;
    projectSelfCheckCapture?:()=>Promise<void>;
    partsSelfCheck?:()=>Promise<Record<string,unknown>>;
    partsPixels?:(scenes:import('../../../packages/scene-core').PreviewScene[])=>Promise<Record<string,unknown>>;
    partsContactData?:string;
    partsExtremeData?:string;
    partsCapture?:()=>Promise<void>;
    inputSelfCheck?:()=>Promise<Record<string,unknown>>;
    inputCapture?:()=>Promise<void>;
    motionSelfCheck?:()=>Promise<Record<string,unknown>>;
    motionCapture?:()=>Promise<void>;
    editorSelfCheck?:()=>Promise<Record<string,unknown>>;
    editorCapture?:()=>Promise<void>;
    editorFailureState?:Record<string,unknown>;
    previewProbe?:()=>{ matrix:import('../../../packages/coordinates').Affine;view:import('../../../packages/editor-view').ViewportState;selected:string | null;compare:boolean;ready:boolean;report:Record<string,unknown> | null;toClient:(point:{ x:number;y:number })=>{ x:number;y:number };hit:(point:{ x:number;y:number })=>string | null };
    foundationSelfCheck?: () => Promise<Record<string, unknown>>;
  }
}
