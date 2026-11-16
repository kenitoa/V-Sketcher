import type { StudioInfo } from '../../../packages/contracts';
declare global {
  interface Window {
    studio: { info: () => Promise<StudioInfo>; health: () => Promise<{ ready: boolean }> };
    foundationSelfCheck?: () => Promise<Record<string, unknown>>;
  }
}
