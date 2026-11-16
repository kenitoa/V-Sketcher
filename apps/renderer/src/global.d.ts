import type { StudioInfo } from '../../../packages/contracts';
import type { SessionCommand,SessionView,SessionReply } from '../../../packages/project-session/contracts';
declare global {
  interface Window {
    workflowLabCheck?: (options?:{ holdForCapture:boolean }) => Promise<Record<string,unknown>>;
    studio: { info: () => Promise<StudioInfo>; health: () => Promise<{ ready: boolean }>; projects:{ view:()=>Promise<SessionView>; command:(command:SessionCommand)=>Promise<SessionReply>; subscribe:(listener:(view:SessionView)=>void)=>()=>void } };
    projectSelfCheck?:()=>Promise<Record<string,unknown>>;
    projectSelfCheckCapture?:()=>Promise<void>;
    foundationSelfCheck?: () => Promise<Record<string, unknown>>;
  }
}
