import type { StudioInfo } from '../../../packages/contracts';
import type { SessionCommand,SessionView,SessionReply } from '../../../packages/project-session/contracts';
declare global {
  interface Window {
    workflowLabCheck?: (options?:{ holdForCapture:boolean }) => Promise<Record<string,unknown>>;
    studio: { info: () => Promise<StudioInfo>; health: () => Promise<{ ready: boolean }>; projects:{ view:()=>Promise<SessionView>; command:(command:SessionCommand)=>Promise<SessionReply>; subscribe:(listener:(view:SessionView)=>void)=>()=>void } };
    projectSelfCheck?:()=>Promise<Record<string,unknown>>;
    projectSelfCheckCapture?:()=>Promise<void>;
    motionSelfCheck?:()=>Promise<Record<string,unknown>>;
    motionCapture?:()=>Promise<void>;
    editorSelfCheck?:()=>Promise<Record<string,unknown>>;
    editorCapture?:()=>Promise<void>;
    editorFailureState?:Record<string,unknown>;
    previewProbe?:()=>{ matrix:import('../../../packages/coordinates').Affine;view:import('../../../packages/editor-view').ViewportState;selected:string | null;compare:boolean;ready:boolean;report:Record<string,unknown> | null;toClient:(point:{ x:number;y:number })=>{ x:number;y:number };hit:(point:{ x:number;y:number })=>string | null };
    foundationSelfCheck?: () => Promise<Record<string, unknown>>;
  }
}
