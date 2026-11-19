import type { RunAction, RunLease, RunMode, RunPreferences, ShortcutStatus } from './index';
import type { ChangeRequest, InputBasis } from './changes';
import type { SessionCommand, SessionReply } from '../project-session/contracts';
export interface RunAPI {
  prepareChange: (
    request: ChangeRequest,
  ) => Promise<{ ok: boolean; lease?: RunLease; errorCode?: string }>;
  commitChange: (request: {
    ownerId: string;
    baseId: string;
    requestId: string;
    restart: boolean;
  }) => Promise<{ ok: boolean; errorCode?: string }>;
  rollbackChange: (
    ownerId: string,
    requestId: string,
    baseId: string,
  ) => Promise<{ ok: boolean; errorCode?: string }>;
  stop: (ownerId: string) => Promise<void>;
  transition: (command: SessionCommand, baseId: string) => Promise<SessionReply>;
  inputBasis: (
    source: 'working' | 'execution',
    projectId: string,
    revision: number,
  ) => Promise<{ ok: boolean; basis?: InputBasis; errorCode?: string }>;
  prepare: (request: {
    requestId: string;
    sessionId: string;
    revision: number;
    mode: RunMode;
  }) => Promise<{ ok: boolean; lease?: RunLease; errorCode?: string }>;
  release: (requestId: string) => Promise<void>;
  preferences: () => Promise<{ ok: boolean; value: RunPreferences; statuses: ShortcutStatus[] }>;
  configure: (
    value: RunPreferences,
  ) => Promise<{ ok: boolean; errorCode?: string; statuses: ShortcutStatus[] }>;
  active: (requestId: string, active: boolean) => Promise<ShortcutStatus[]>;
  context: (suspended: boolean, editing?: boolean) => Promise<ShortcutStatus[]>;
  subscribe: (listener: (event: { requestId: string; action: RunAction }) => void) => () => void;
}
