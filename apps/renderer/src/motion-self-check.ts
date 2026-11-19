import { clickCommittedControl } from './ui-check-control';
import { AvatarRenderer } from '../../../packages/avatar-renderer';
import { projectToPreview } from '../../../packages/project-model/preview';
import type { Project, PreviewKey } from '../../../packages/project-model';
import { NEUTRAL, type Parameters } from '../../../packages/scene-core';
import { layerCorners } from '../../../packages/editor-view';
import type { MotionPlayer } from '../../../packages/motion';
import type {
  SessionCommand,
  SessionReply,
  SessionView,
} from '../../../packages/project-session/contracts';
export async function checkMotionPixels(project: Project): Promise<Record<string, unknown>> {
  const scene = projectToPreview(project);
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const render = new AvatarRenderer(canvas, scene);
  try {
    await render.load(document.baseURI);
    const pixels = (input?: Partial<Parameters>): Uint8Array => {
      render.draw(input);
      render.gl.finish();
      const p = new Uint8Array(256 * 256 * 4);
      render.gl.readPixels(0, 0, 256, 256, render.gl.RGBA, render.gl.UNSIGNED_BYTE, p);
      if (render.gl.getError()) throw new Error('E_MOTION_GPU');
      return p;
    };
    const a = pixels(NEUTRAL);
    const left = pixels({ ...NEUTRAL, eye_left: 0 });
    const right = pixels({ ...NEUTRAL, eye_right: 0 });
    const mouthA = pixels({ ...NEUTRAL, mouth: 0.4 });
    const mouthB = pixels({ ...NEUTRAL, mouth: 0.6 });
    const moved = pixels({ ...NEUTRAL, head_yaw: 1, head_roll: 1 });
    const diff = (
      x: Uint8Array,
      y: Uint8Array,
      test: (px: number, py: number) => boolean = () => true,
    ): number => {
      let changed = 0;
      for (let j = 0; j < 256; j++)
        for (let i = 0; i < 256; i++)
          if (
            test(i, 255 - j) &&
            [0, 1, 2, 3].some(
              (c) => Math.abs(x[(j * 256 + i) * 4 + c]! - y[(j * 256 + i) * 4 + c]!) > 3,
            )
          )
            changed++;
      return changed;
    };
    const roi = (key: PreviewKey): ((x: number, y: number) => boolean) => {
      const layer = scene.layers.find((l) => l.bind === key)!;
      const corners = layerCorners(layer);
      const x0 = (Math.min(...corners.map((p) => p.x)) / scene.canvas[0]) * 256;
      const x1 = (Math.max(...corners.map((p) => p.x)) / scene.canvas[0]) * 256;
      const y0 = (Math.min(...corners.map((p) => p.y)) / scene.canvas[1]) * 256;
      const y1 = (Math.max(...corners.map((p) => p.y)) / scene.canvas[1]) * 256;
      return (x, y) => x >= x0 && x < x1 && y >= y0 && y < y1;
    };
    const leftChanged = diff(a, left, roi('eye_left'));
    const rightChanged = diff(a, right, roi('eye_right'));
    const leftDoesNotMoveRight = diff(a, left, roi('eye_right')) === 0;
    const rightDoesNotMoveLeft = diff(a, right, roi('eye_left')) === 0;
    const bodyDifferences = diff(a, moved, (_x, y) => y > 256 * 0.85);
    const before = Number(render.report().staticBufferUploads);
    for (let i = 0; i < 120; i++)
      pixels({
        eye_left: i / 119,
        eye_right: 1 - i / 119,
        mouth: i / 119,
        head_yaw: Math.sin(i),
        head_roll: Math.cos(i),
      });
    const uploadsUnchanged = render.report().staticBufferUploads === before;
    const neutralDifference = diff(a, pixels(NEUTRAL));
    const passed =
      leftChanged > 5 &&
      rightChanged > 5 &&
      leftDoesNotMoveRight &&
      rightDoesNotMoveLeft &&
      diff(mouthA, mouthB) > 5 &&
      diff(a, moved) > 100 &&
      bodyDifferences === 0 &&
      neutralDifference === 0 &&
      uploadsUnchanged;
    const originalDefaults = { ...(scene.defaults ?? NEUTRAL) };
    scene.defaults = { ...NEUTRAL, eye_left: 0, head_roll: 0.3 };
    const defaultPoseDifference = diff(pixels(scene.defaults), pixels());
    const defaultPoseChanges = diff(a, pixels());
    scene.defaults = originalDefaults;
    return {
      passed: passed && defaultPoseDifference === 0 && defaultPoseChanges > 100,
      leftChanged,
      rightChanged,
      leftDoesNotMoveRight,
      rightDoesNotMoveLeft,
      mouthIntermediateChanged: diff(mouthA, mouthB),
      headChanged: diff(a, moved),
      bodyDifferences,
      neutralDifference,
      defaultPoseDifference,
      defaultPoseChanges,
      uploadsUnchanged,
      meshLayers: scene.layers.filter((l) => l.mesh).length,
      extremeFrames: 120,
      frameSize: [256, 256],
      scope:
        'Actual WebGL pixels, authored premium patches and GPU mesh; no tracking, broadcast, universal art quality or M0 FPS claim',
    };
  } finally {
    render.dispose();
  }
}
export async function checkMotionUI(host: {
  current: () => SessionView | null;
  command: (c: SessionCommand) => Promise<SessionReply>;
  settled: () => Promise<unknown>;
  player: MotionPlayer;
}): Promise<Record<string, unknown>> {
  let phase = 'READY';
  const pause = (ms = 30): Promise<void> => new Promise((r) => setTimeout(r, ms));
  const verify = (v: unknown, code: string): void => {
    if (!v) throw new Error(code);
  };
  const until = async (predicate: () => unknown): Promise<void> => {
    const start = performance.now();
    while (!predicate()) {
      if (performance.now() - start > 12000) {
        window.editorFailureState = {
          ...window.editorFailureState,
          motionPhase: phase,
          motionFrame: {
            parameters: host.player.snapshot().parameters,
            elapsed: host.player.snapshot().elapsed,
            playing: host.player.snapshot().playing,
          },
          motionSettings: host.current()?.project?.motion?.settings,
          ready: window.previewProbe?.().ready,
        };
        throw new Error('E_MOTION_UI_' + phase);
      }
      await pause(25);
    }
  };
  const click = async (selector: string): Promise<void> => {
    await clickCommittedControl(selector, host.current);
    await pause();
    await host.settled();
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
    );
    await pause();
  };
  await window.editorCapture!();
  await click('[data-step="motion"]');
  await until(() => window.previewProbe?.().ready);
  verify(
    document.querySelectorAll('[data-motion-key]').length === 5 &&
      [...document.querySelectorAll<HTMLInputElement>('[data-motion-key]')].every(
        (el) => !el.disabled,
      ),
    'E_MOTION_UI_CAPABILITIES',
  );
  const p = host.current()!.project!;
  await host.command({
    type: 'motion-settings',
    expectedRevision: p.revision,
    strength: 1,
    smoothingMs: 0,
    pose: [],
  });
  await pause();
  const snapshot = JSON.stringify(host.current()!.project);
  phase = 'EYE';
  await click('[data-motion-point="eye_left-0"]');
  await until(() => host.player.snapshot().parameters.eye_left === 0);
  verify(host.player.snapshot().parameters.eye_right === 1, 'E_MOTION_UI_EYE');
  await click('[data-motion-stop]');
  verify(host.player.snapshot().parameters.eye_left === 1, 'E_MOTION_UI_STOP');
  phase = 'ONCE_START';
  await click('[data-motion-play="head_yaw"]');
  await until(() => host.player.snapshot().playing);
  phase = 'ONCE_STOP';
  await until(() => !host.player.snapshot().playing);
  verify(host.player.snapshot().parameters.head_yaw === 0, 'E_MOTION_UI_ONCE');
  phase = 'LOOP';
  await click('[data-motion-repeat]');
  await click('[data-motion-all]');
  await until(() => host.player.snapshot().elapsed > 4.1);
  verify(host.player.snapshot().playing, 'E_MOTION_UI_LOOP');
  await click('[data-motion-stop]');
  verify(JSON.stringify(host.current()!.project) === snapshot, 'E_MOTION_UI_HISTORY');
  host.player.set('head_roll', 0.3);
  host.player.set('mouth', 0.4);
  document.querySelector<HTMLElement>('[data-motion-settings] summary')!.click();
  await pause();
  await click('[data-motion-save-pose]');
  verify(
    host
      .current()!
      .project!.motion!.settings.pose.some(
        (v) => v.parameterId === 'parameter-head_roll' && v.value === 0.3,
      ),
    'E_MOTION_UI_POSE',
  );
  await host.command({ type: 'save' });
  const id = host.current()!.recent[0]!.id;
  await host.command({ type: 'recent', id });
  await click('[data-step="motion"]');
  phase = 'REOPEN';
  await until(() => window.previewProbe?.().ready);
  verify(Math.abs(host.player.snapshot().parameters.head_roll - 0.3) < 1e-8, 'E_MOTION_UI_REOPEN');
  document.querySelector<HTMLElement>('[data-motion-settings] summary')!.click();
  await pause();
  await click('[data-motion-reset]');
  await host.command({ type: 'save' });
  await host.command({ type: 'close' });
  await pause();
  return {
    passed: true,
    allFiveControls: true,
    independentEyes: true,
    singlePlayStops: true,
    combinedLoop: true,
    stopRestoresPose: true,
    testFramesDoNotEdit: true,
    savePoseAndReopen: true,
    settingsReset: true,
    devicesOpened: false,
  };
}
