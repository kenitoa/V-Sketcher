import type { StudioInfo } from '../../../packages/contracts';
declare global {
  interface Window {
    workflowLabCheck?: (options?:{ holdForCapture:boolean }) => Promise<Record<string,unknown>>;
    studio: { info: () => Promise<StudioInfo>; health: () => Promise<{ ready: boolean }> };
    foundationSelfCheck?: () => Promise<Record<string, unknown>>;
  }
}
