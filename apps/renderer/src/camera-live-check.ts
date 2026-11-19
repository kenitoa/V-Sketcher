import { clickCommittedControl } from './ui-check-control';
import type {
  SessionView,
  SessionCommand,
  SessionReply,
} from '../../../packages/project-session/contracts';
import type { CameraRuntime } from './camera-runtime';
import { TRACK_KEYS, type Signals } from '../../../packages/tracking';
export async function checkCameraLive(
  host: {
    current: () => SessionView | null;
    command: (c: SessionCommand) => Promise<SessionReply>;
    settled: () => Promise<unknown>;
    runtime: CameraRuntime;
  },
  deviceHint: string | null = null,
) {
  const r = host.runtime;
  const pause = (ms = 50) => new Promise((resolve) => setTimeout(resolve, ms));
  const click = async (selector: string) => {
    await clickCommittedControl(selector, host.current);
    await host.settled();
    await pause();
  };
  const verify = (v: unknown, code: string) => {
    if (!v) throw new Error(code);
  };
  const segment = async (phase: string, message: string, duration: number, calibrate = false) => {
    window.liveReviewPhase = { phase, seconds: Math.ceil(duration / 1000) };
    let previous = -1,
      frames = 0,
      detected = 0,
      multiple = 0,
      tracked = 0,
      lowLight = 0;
    const brightness: number[] = [],
      faceBrightness: number[] = [],
      latency: number[] = [],
      ranges = Object.fromEntries(
        TRACK_KEYS.map((k) => [k, { min: Infinity, max: -Infinity }]),
      ) as Record<keyof Signals, { min: number; max: number }>;
    let began = false;
    const end = performance.now() + duration;
    while (performance.now() < end) {
      const seconds = Math.max(0, Math.ceil((end - performance.now()) / 1000));
      r.reviewPrompt = `${message} · ${seconds}초`;
      window.liveReviewPhase = { phase, seconds };
      const d = r.result;
      if (d && d.seq !== previous) {
        previous = d.seq;
        frames++;
        detected += d.faces.length > 0 ? 1 : 0;
        multiple += d.faces.length >= 2 ? 1 : 0;
        tracked += r.selected ? 1 : 0;
        lowLight += d.brightness < 35 ? 1 : 0;
        brightness.push(d.brightness);
        if (r.selected) faceBrightness.push(r.selected.brightness);
        latency.push(d.inferenceMs);
        if (r.selected)
          for (const k of TRACK_KEYS) {
            ranges[k].min = Math.min(ranges[k].min, r.selected.values[k]);
            ranges[k].max = Math.max(ranges[k].max, r.selected.values[k]);
          }
      }
      if (calibrate && r.selected && !began) {
        r.beginCalibration();
        began = true;
      }
      if (calibrate && r.calibration.state === 'ready') await r.applyCalibration();
      if (r.state === 'failed') break;
      await pause();
    }
    const median = (a: number[]) => {
      a.sort((a, b) => a - b);
      return a.length ? a[Math.floor(a.length / 2)]! : null;
    };
    return {
      frames,
      detectedFrames: detected,
      selectedFrames: tracked,
      multipleFrames: multiple,
      lowLightFrames: lowLight,
      medianBrightness: median(brightness),
      medianFaceBrightness: median(faceBrightness),
      medianInferenceMs: median(latency),
      ranges: Object.fromEntries(
        TRACK_KEYS.map((k) => [
          k,
          Number.isFinite(ranges[k].min)
            ? { ...ranges[k], span: ranges[k].max - ranges[k].min }
            : null,
        ]),
      ),
    };
  };
  try {
    await host.command({ type: 'new', name: '실제 카메라 검증', sourceType: 'parts' });
    await host.command({
      type: 'parts-start',
      expectedRevision: host.current()!.project!.revision,
    });
    await pause();
    await click('[data-step="motion"]');
    await click('[data-camera-open]');
    await pause(500);
    r.showPreview = true;
    await pause(200);
    r.reviewPrompt =
      '카메라를 선택해 연결하세요. 처음 분의 얼굴이 중앙에 크게 보이도록 거리·조명을 조절한 뒤 얼굴 선택 → 실제 시험 시작을 눌러 주세요.';
    r.reviewCanStart = true;
    r.reviewStartRequested = false;
    if (deviceHint) {
      r.reviewPrompt = '실제 HD 웹캠 연결 중 · 먼저 한 분만 정면에서 눈을 뜨고 기다려 주세요';
      await r.start('');
      const devices = await r.devices(),
        matches = devices.filter((d) => d.label.toLowerCase().includes(deviceHint.toLowerCase()));
      verify(matches.length === 1, 'E_LIVE_DEVICE_SELECTION');
      if (r.deviceId !== matches[0]!.deviceId) await r.start(matches[0]!.deviceId);
      verify(r.state === 'open', 'E_LIVE_CAMERA_OPEN');
      r.reviewPrompt =
        '한 분만 정면을 봐 주세요. 밝고 안정된 얼굴이 확인되면 자동으로 시험이 시작됩니다.';
    }
    window.liveReviewPhase = { phase: 'preparing', seconds: 120 };
    const deadline = performance.now() + 120000;
    while (!r.reviewStartRequested && performance.now() < deadline) {
      if (deviceHint && r.result?.faces.length === 1) {
        const f = r.result.faces[0]!;
        if (
          f.brightness >= 35 &&
          Math.abs(f.values.head_yaw) <= 20 &&
          Math.abs(f.values.head_roll) <= 15 &&
          f.values.eye_left >= 0.35 &&
          f.values.eye_right >= 0.35
        ) {
          if (!r.selected) r.select(f.box);
          if (r.selected && r.calibration.state !== 'collecting' && r.calibration.state !== 'ready')
            r.beginCalibration();
          if (r.calibration.state === 'ready') r.reviewStartRequested = true;
        }
      }
      window.liveReviewPhase = {
        phase: 'preparing',
        seconds: Math.ceil((deadline - performance.now()) / 1000),
        faceCount: r.result?.faces.length ?? 0,
        selected: !!r.selected,
        brightness: r.selected?.brightness ?? r.result?.brightness ?? null,
        yaw: r.selected?.values.head_yaw ?? null,
        roll: r.selected?.values.head_roll ?? null,
        state: r.state,
      };
      await pause();
    }
    r.reviewCanStart = false;
    verify(r.reviewStartRequested && r.state === 'open', 'E_LIVE_CAMERA_OPEN');
    r.player.stop();
    const initial = JSON.stringify(host.current()!.project);
    const normal = await segment(
      'normal',
      '① 처음 한 분만 정면 유지 · 눈을 뜨고 입을 편하게 다물어 주세요',
      15000,
      true,
    );
    const baseline = JSON.stringify(r.profile);
    r.beginCalibration();
    await pause(400);
    r.calibration.cancel();
    const cancelPreserved = JSON.stringify(r.profile) === baseline;
    const motion = await segment(
      'motion',
      '② 처음 분은 눈 깜빡임·고개 좌우·기울이기를 해주세요',
      10000,
    );
    const multiple = await segment(
      'multiple',
      '③ 처음 분은 같은 위치 유지 · 다른 분이 옆에 들어와 주세요. 얼굴을 겹치지 마세요',
      12000,
    );
    const dark = await segment(
      'dark',
      '④ 처음 분만 남고 조명을 낮춰 주세요 · 얼굴을 완전히 가리지는 마세요',
      12000,
    );
    const restore = await segment(
      'restore',
      '⑤ 조명을 복구해 주세요 · 대상 놓침이면 처음 분의 얼굴 선택 버튼을 눌러 주세요',
      10000,
    );
    const profileReady = !!r.profile,
      projectUnchanged = JSON.stringify(host.current()!.project) === initial;
    const report = {
      passed:
        r.state === 'open' &&
        normal.detectedFrames >= 10 &&
        profileReady &&
        cancelPreserved &&
        multiple.multipleFrames >= 3 &&
        restore.selectedFrames >= 3,
      source: 'selected-camera-device',
      physicalDeviceConfirmation: 'PENDING_USER',
      manualPreflight: !deviceHint,
      physicalDeviceMatched: !!deviceHint,
      cameraOpened: true,
      microphoneOpened: false,
      normal,
      motion,
      multiple,
      dark,
      restore,
      calibrationApplied: profileReady,
      cancelPreserved,
      projectUnchanged,
      framesSaved: false,
      pcmSaved: false,
      previewInCharacterOutput: false,
      environmentConfirmation: 'PENDING_USER',
      cameraErrorCode: r.errorCode,
      m0: 'HOLD',
      scope:
        'Real camera and user-directed scenes; aggregate derived metrics only, no performance/identity/broadcast or M0 approval',
    };
    r.reviewPrompt = '시험 종료 · 카메라를 중지합니다';
    return report;
  } finally {
    r.reviewCanStart = false;
    r.showPreview = false;
    r.stop();
    window.liveReviewPhase = { phase: 'finished', seconds: 0 };
    await pause(300);
  }
}
