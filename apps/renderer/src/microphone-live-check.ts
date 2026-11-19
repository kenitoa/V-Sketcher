import { clickCommittedControl } from './ui-check-control';
import type { MicrophoneRuntime } from './microphone-runtime';
import type {
  SessionView,
  SessionCommand,
  SessionReply,
} from '../../../packages/project-session/contracts';
export async function checkMicrophoneLive(
  host: {
    current: () => SessionView | null;
    command: (c: SessionCommand) => Promise<SessionReply>;
    settled: () => Promise<unknown>;
    mic: MicrophoneRuntime;
  },
  scripted = false,
) {
  const r = host.mic,
    pause = (ms = 50) => new Promise((resolve) => setTimeout(resolve, ms));
  const click = async (selector: string) => {
    await clickCommittedControl(selector, host.current);
    await host.settled();
    await pause();
  };
  const until = async (fn: () => boolean) => {
    const end = performance.now() + 20000;
    while (!fn()) {
      if (r.state === 'failed' || performance.now() > end) {
        window.editorFailureState = {
          microphone: r.state,
          errorCode: r.errorCode,
          health: r.lastFailure ?? r.diagnostics(),
        };
        throw new Error(r.errorCode ?? 'E_LIVE_MIC_INPUT');
      }
      await pause();
    }
  };
  const segment = async (phase: string, prompt: string, ms: number) => {
    const values: number[] = [],
      peaks: number[] = [],
      mouth: number[] = [];
    let previous = -1;
    const end = performance.now() + ms;
    while (performance.now() < end) {
      r.reviewPrompt = prompt + ' · ' + Math.ceil((end - performance.now()) / 1000) + '초';
      window.microphoneReviewPhase = {
        phase,
        seconds: Math.ceil((end - performance.now()) / 1000),
        blocks: r.blocks,
        state: r.state,
        rms: r.rms,
      };
      if (r.blocks !== previous) {
        previous = r.blocks;
        values.push(r.rms);
        peaks.push(r.peak);
        mouth.push(r.mouth);
      }
      if (r.state !== 'open') break;
      await pause();
    }
    const median = (a: number[]) => [...a].sort((a, b) => a - b)[Math.floor(a.length / 2)] ?? null;
    return {
      samples: values.length,
      medianRms: median(values),
      maxPeak: peaks.length ? Math.max(...peaks) : null,
      maxMappedMouth: mouth.length ? Math.max(...mouth) : null,
    };
  };
  try {
    await host.command({ type: 'new', name: '실제 마이크 확인', sourceType: 'parts' });
    await host.command({
      type: 'parts-start',
      expectedRevision: host.current()!.project!.revision,
    });
    await click('[data-step="motion"]');
    await click('[data-input-open]');
    r.reviewPrompt = scripted
      ? '시험 준비 · 첫 구간에는 조용히 있어 주세요'
      : '실제 마이크 연결·레벨 확인 · 말하기 시험은 하지 않습니다';
    await click('[data-mic-start]');
    await until(() => r.state === 'open' && r.blocks >= 3);
    const initial = JSON.stringify(host.current()!.project);
    let quiet: null | Awaited<ReturnType<typeof segment>> = null,
      speech: null | Awaited<ReturnType<typeof segment>> = null,
      noise: null | Awaited<ReturnType<typeof segment>> = null,
      baselineApplied = false;
    if (scripted) {
      r.beginCalibration();
      quiet = await segment('quiet', '① 조용히 있어 주세요', 8000);
      if (r.calibration.state === 'ready') baselineApplied = await r.applyCalibration();
      speech = await segment('speech', '② 계속 말해 주세요', 8000);
      noise = await segment('noise', '③ 말하지 않고 키보드·손뼉 소음을 내주세요', 8000);
    }
    const observed = scripted
      ? null
      : await segment('passive-level', '입력 레벨만 확인 중 · 무음/말/소음 구분 시험 아님', 8000);
    await click('[data-mic-stop]');
    await pause(800);
    const stopped = !r.player.microphoneLive && r.state === 'idle';
    await click('[data-mic-start]');
    await until(() => r.state === 'open' && r.blocks >= 3);
    const reconnected = await segment('reconnected', '재연결 입력 확인 중', 4000);
    return {
      passed:
        stopped &&
        r.state === 'open' &&
        reconnected.samples >= 10 &&
        (scripted
          ? baselineApplied &&
            !!quiet &&
            quiet.samples >= 20 &&
            !!speech &&
            speech.samples >= 20 &&
            !!noise &&
            noise.samples >= 20
          : !!observed && observed.samples >= 20),
      source: 'Windows default selected microphone',
      scriptedHumanScenes: scripted,
      humanSceneConfirmation: scripted ? 'PENDING_USER' : 'NOT_RUN',
      quiet,
      speech,
      noise,
      observed,
      reconnected,
      baselineApplied,
      manualStopAndReconnect: stopped,
      projectUnchanged: JSON.stringify(host.current()!.project) === initial,
      cameraOpened: false,
      physicalUnplug: 'NOT_RUN',
      pcmSaved: false,
      framesSaved: false,
      audioPlayed: false,
      m0: 'HOLD',
      scope: scripted
        ? 'Actual microphone and user-directed audio segments; levels only, no speech recognition, physical unplug/camera scenes or M0 approval'
        : 'Actual microphone open, aggregate level reception, manual stop and reconnect only; no quiet/speech/noise classification or physical unplug/camera scene acceptance',
    };
  } finally {
    r.reviewPrompt = '';
    await r.stop();
    window.microphoneReviewPhase = {
      phase: 'finished',
      seconds: 0,
      blocks: r.blocks,
      state: r.state,
      rms: 0,
    };
  }
}
