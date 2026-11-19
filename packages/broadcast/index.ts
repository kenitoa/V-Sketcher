import type { Parameters, PreviewScene } from '../scene-core';
export const BROADCAST_PROTOCOL = 1;
export interface OutputSettings {
  width: number;
  height: number;
  fps: 15 | 30;
  scale: number;
  x: number;
  y: number;
  crop: { left: number; right: number; top: number; bottom: number };
}
export const defaultOutputSettings = (): OutputSettings => ({
  width: 1920,
  height: 1080,
  fps: 30,
  scale: 1,
  x: 0,
  y: 0,
  crop: { left: 0, right: 0, top: 0, bottom: 0 },
});
export function assertOutputSettings(value: unknown): asserts value is OutputSettings {
  const v = value as OutputSettings;
  if (
    !v ||
    Object.keys(v).sort().join(',') !== 'crop,fps,height,scale,width,x,y' ||
    ![
      [1920, 1080],
      [1280, 720],
    ].some(([w, h]) => v.width === w && v.height === h) ||
    ![15, 30].includes(v.fps) ||
    !Number.isFinite(v.scale) ||
    v.scale < 0.1 ||
    v.scale > 3 ||
    ![v.x, v.y].every((n) => Number.isFinite(n) && Math.abs(n) <= 1) ||
    !v.crop ||
    Object.keys(v.crop).sort().join(',') !== 'bottom,left,right,top' ||
    !Object.values(v.crop).every((n) => Number.isFinite(n) && n >= 0 && n <= 0.45) ||
    v.crop.left + v.crop.right >= 0.9 ||
    v.crop.top + v.crop.bottom >= 0.9
  )
    throw new Error('E_OUTPUT_SETTINGS');
}
export interface OutputFrame {
  sourceId: string;
  seq: number;
  parameters: Parameters;
  hidden: boolean;
}
export interface OutputSource {
  id: string;
  revision: number;
  scene: PreviewScene;
  assets: Map<string, Buffer>;
}
export interface OutputConfirmation {
  method: 'USER_CONFIRMED';
  target: 'OBS Studio';
  targetVersion: string;
  settingsVersion: number;
  sourceId: string;
  at: string;
  checks: { alpha: boolean; motion: boolean; expression: boolean; shortcut: boolean };
}
export interface OutputView {
  state: 'OFF' | 'PREPARING' | 'SOURCE_READY' | 'FAILED';
  health: 'WAITING' | 'RENDERING' | 'STALE' | 'CLIENT_FAILED';
  settings: OutputSettings;
  previous: OutputSettings | null;
  settingsVersion: number;
  sourceId: string | null;
  sourceRevision: number | null;
  hidden: boolean;
  pageConsumers: number;
  viewportMismatch: boolean;
  confirmation: OutputConfirmation | null;
  confirmationCurrent: boolean;
  errorCode: string | null;
}
export interface BroadcastAPI {
  view: () => Promise<OutputView>;
  preview: () => Promise<boolean>;
  start: (sourceId: string) => Promise<OutputView>;
  stop: () => Promise<OutputView>;
  restart: () => Promise<OutputView>;
  configure: (settings: OutputSettings) => Promise<OutputView>;
  restore: () => Promise<OutputView>;
  rotate: () => Promise<OutputView>;
  copyURL: () => Promise<boolean>;
  confirm: (input: {
    targetVersion: string;
    settingsVersion: number;
    sourceId: string;
    checks: OutputConfirmation['checks'];
  }) => Promise<OutputView>;
  frame: (value: OutputFrame) => void;
  subscribe: (listener: (view: OutputView) => void) => () => void;
}
export const OUTPUT_DIAGNOSIS = {
  missing: [
    '출력 준비 상태와 캐릭터 실행을 확인하세요.',
    'OBS 브라우저 소스의 로컬 파일을 끄고 연결 주소를 다시 붙여 넣으세요.',
    '앱을 먼저 켠 뒤 브라우저 소스의 현재 페이지 캐시 새로고침을 누르세요.',
  ],
  opaque: [
    'OBS 브라우저 소스를 사용하고 창 캡처·화면 캡처와 구분하세요.',
    '브라우저 소스의 사용자 지정 CSS를 기본 투명 설정으로 복원하세요.',
    '소스 아래 밝은 색·어두운 색 배경을 번갈아 놓아 가장자리를 확인하세요.',
  ],
  cropped: [
    'OBS 소스 너비·높이를 앱 출력 크기와 맞추세요.',
    'OBS 변환의 자르기를 확인하고 필요하면 변환을 초기화하세요.',
    '앱 출력 배치·잘림을 복원하세요. 편집기 확대는 방송에 적용되지 않습니다.',
  ],
  frozen: [
    '앱 실행과 입력 상태를 확인하고 숨김·기본 자세 고정을 해제하세요.',
    '페이지 소비는 OBS 화면 확인을 보증하지 않습니다. OBS 미리보기를 직접 확인하세요.',
    '출력을 다시 연결하고 필요하면 OBS 현재 페이지 캐시를 새로고침하세요.',
  ],
  load: [
    '출력 프레임을 15FPS 또는 1280×720으로 변경하세요. 원본 그림은 유지됩니다.',
    '해상도를 바꾸면 OBS 소스 너비·높이도 바꾸고 외부 확인을 다시 진행하세요.',
  ],
} as const;
