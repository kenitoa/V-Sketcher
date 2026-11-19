import { AvatarRenderer } from '../packages/avatar-renderer';
import { NEUTRAL, type PreviewScene } from '../packages/scene-core';
const canvas = document.querySelector<HTMLCanvasElement>('#avatar')!;
const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));
async function run() {
  const scene = (await (await fetch('/scene.json')).json()) as PreviewScene,
    cycles: unknown[] = [],
    stages: unknown[] = [];
  let renderer: AvatarRenderer | null = null;
  try {
    for (let i = 0; i < 12; i++) {
      renderer = new AvatarRenderer(canvas, scene);
      await renderer.load('reliability://app/');
      renderer.draw(NEUTRAL);
      const r = renderer.report();
      if (r.glError !== 0 || Number(r.visiblePixels) < 10000) throw Error('E_GPU_RENDER');
      renderer.dispose();
      const disposed = renderer.textureEstimateMiB();
      if (disposed !== 0) throw Error('E_GPU_RELEASE');
      cycles.push({ cycle: i, visiblePixels: r.visiblePixels, releasedTextureMiB: disposed });
      renderer = null;
      await pause(25);
    }
    renderer = new AvatarRenderer(canvas, scene);
    await renderer.load('reliability://app/');
    for (const stage of [
      { width: 1280, height: 720, fps: 15, stress: false },
      { width: 1920, height: 1080, fps: 30, stress: false },
      { width: 1920, height: 1080, fps: 30, stress: true },
    ]) {
      canvas.width = stage.width;
      canvas.height = stage.height;
      const elapsed: number[] = [],
        intervals: number[] = [];
      let prior = performance.now(),
        next = prior;
      const start = prior,
        end = start + 12000;
      while (performance.now() < end) {
        const before = performance.now();
        if (stage.stress) {
          const until = before + 8;
          let x = 1;
          while (performance.now() < until) x = Math.sqrt(x + 123.4);
          if (!Number.isFinite(x)) throw Error('E_GPU_STRESS');
        }
        renderer.draw({
          ...NEUTRAL,
          mouth: (Math.sin(before / 300) + 1) / 2,
          eye_left: (Math.sin(before / 500) + 1) / 2,
          head_yaw: Math.sin(before / 700),
        });
        renderer.gl.finish();
        const completed = performance.now();
        elapsed.push(completed - before);
        intervals.push(completed - prior);
        prior = completed;
        next += 1000 / stage.fps;
        await pause(Math.max(0, next - performance.now()));
      }
      elapsed.sort((a, b) => a - b);
      intervals.sort((a, b) => a - b);
      stages.push({
        ...stage,
        durationMs: performance.now() - start,
        completedFrames: elapsed.length,
        completedFps: (elapsed.length * 1000) / (performance.now() - start),
        completionWallP95Ms: elapsed[Math.floor(elapsed.length * 0.95)],
        completionWallMaxMs: elapsed.at(-1),
        frameIntervalP95Ms: intervals[Math.floor(intervals.length * 0.95)],
        stallsOver100ms: intervals.filter((v) => v > 100).length,
        textureEstimateMiB: renderer.textureEstimateMiB(),
      });
    }
    const report = renderer.report();
    return {
      passed: true,
      cycles,
      stages,
      backend: report.renderer,
      webglVersion: report.version,
      glError: report.glError,
      scope:
        'Actual shared product renderer on one premium scene; draw plus gl.finish wall time, not GPU-only timestamps, camera/OBS delivery or release performance acceptance',
      actualGPUContext: true,
      physicalDevicesOpened: false,
      actualOBSVerified: false,
      performanceAcceptance: false,
      twoHourAcceptance: false,
    };
  } finally {
    renderer?.dispose();
  }
}
(window as unknown as { reliabilityGPU: Promise<unknown> }).reliabilityGPU = run().catch(
  (error) => ({
    passed: false,
    code:
      error instanceof Error
        ? (error.message.match(/E_[A-Z_]+/)?.[0] ?? 'E_GPU_SCRIPT')
        : 'E_GPU_SCRIPT',
    errorKind: error instanceof Error ? error.name : 'unknown',
  }),
);
