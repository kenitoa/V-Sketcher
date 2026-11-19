import type { Calibration, Detection } from './index';
export interface TrackingAPI {
  begin: (owner?: string | null) => Promise<{ ok: boolean; errorCode?: string; reason?: string }>;
  end: (owner?: string | null) => Promise<void>;
  frame: (
    seq: number,
    jpeg: Uint8Array,
    owner?: string | null,
  ) => Promise<{ ok: boolean; result?: Detection; errorCode?: string }>;
  profiles: () => Promise<{ ok: boolean; profiles: Calibration[] }>;
  saveCalibration: (value: Calibration) => Promise<{ ok: boolean; errorCode?: string }>;
}
