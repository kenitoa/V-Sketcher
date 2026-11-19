import { AvatarRenderer } from '../packages/avatar-renderer';
// Vite resolves this to the immutable, pre-optimization source snapshot.
// @ts-expect-error development-only benchmark alias
import { AvatarRenderer as BeforeRenderer } from '@cleanup-before-renderer';
import { NEUTRAL, type PreviewScene } from '../packages/scene-core';
const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const variant = new URLSearchParams(location.search).get('variant');
const run = async () => {
  const canvas = document.querySelector<HTMLCanvasElement>('#avatar')!;
  const scene = (await (await fetch('/scene.json')).json()) as PreviewScene;
  const Constructor = variant === 'before' ? BeforeRenderer : AvatarRenderer;
  const constructionStart = performance.now();
  const renderer: AvatarRenderer = new Constructor(canvas, scene);
  const constructionMs = performance.now() - constructionStart;
  let heldForMemorySample = false;
  const dispose = () => {
    renderer.dispose();
    if (renderer.textureEstimateMiB() !== 0) throw Error('E_BENCH_DISPOSE');
  };
  const start = performance.now();
  await renderer.load('cleanup://app/');
  const loadMs = performance.now() - start;
  try {
    const poses = [
      NEUTRAL,
      { ...NEUTRAL, eye_left: 0, eye_right: 0 },
      { ...NEUTRAL, mouth: 1 },
      { ...NEUTRAL, head_yaw: -1, head_roll: -0.5 },
      { ...NEUTRAL, head_yaw: 1, head_roll: 0.5 },
      { ...NEUTRAL, eye_left: 0, mouth: 1 },
    ];
    const frames = [];
    const pixels = new Uint8Array(canvas.width * canvas.height * 4);
    for (const pose of poses) {
      renderer.draw(pose);
      renderer.gl.finish();
      renderer.gl.readPixels(
        0,
        0,
        canvas.width,
        canvas.height,
        renderer.gl.RGBA,
        renderer.gl.UNSIGNED_BYTE,
        pixels,
      );
      const digest = await crypto.subtle.digest('SHA-256', pixels);
      frames.push(
        Array.from(new Uint8Array(digest))
          .map((value) => value.toString(16).padStart(2, '0'))
          .join(''),
      );
    }
    renderer.draw(NEUTRAL);
    const points = Array.from({ length: 625 }, (_, i) => ({
      x: (((i % 25) + 0.5) * scene.canvas[0]) / 25,
      y: ((Math.floor(i / 25) + 0.5) * scene.canvas[1]) / 25,
    }));
    const hits: (string | null)[][] = [];
    let hitMs = 0;
    for (const pose of poses) {
      renderer.draw(pose);
      renderer.gl.finish();
      const hitStart = performance.now();
      hits.push(points.map((point) => renderer.hitTest(point)));
      hitMs += performance.now() - hitStart;
    }
    const hitHash = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(JSON.stringify(hits)),
    );
    // Warm both renderer and driver; measure GPU-completed draws, not rAF callback count.
    const warmUntil = performance.now() + 2000;
    while (performance.now() < warmUntil) {
      renderer.draw(NEUTRAL);
      renderer.gl.finish();
      await pause(16);
    }
    const drawMs: number[] = [],
      intervalMs: number[] = [];
    let previous = performance.now(),
      next = previous;
    const begin = previous,
      end = begin + 15000;
    while (performance.now() < end) {
      const at = performance.now();
      renderer.draw({
        ...NEUTRAL,
        mouth: (Math.sin(at / 300) + 1) / 2,
        eye_left: (Math.sin(at / 500) + 1) / 2,
        head_yaw: Math.sin(at / 700),
      });
      renderer.gl.finish();
      const done = performance.now();
      drawMs.push(done - at);
      intervalMs.push(done - previous);
      previous = done;
      next += 1000 / 30;
      await pause(Math.max(0, next - performance.now()));
    }
    const measuredDuration = performance.now() - begin;
    renderer.draw(NEUTRAL);
    const neutral = canvas.toDataURL('image/png');
    const unique = [
      ...new Set(
        (
          renderer as unknown as {
            textures: Map<
              string,
              { width: number; height: number; alpha?: Uint8Array; image?: HTMLImageElement }
            >;
          }
        ).textures.values(),
      ),
    ];
    const alphaBytes = unique.reduce((n, t) => n + (t.alpha?.byteLength ?? 0), 0),
      oldDecodedEstimate = unique.reduce((n, t) => n + (t.image ? t.width * t.height * 4 : 0), 0);
    const report = renderer.report();
    (window as unknown as { cleanupDispose: () => void }).cleanupDispose = dispose;
    heldForMemorySample = true;
    return {
      passed: report.glError === 0,
      variant,
      loadMs,
      constructionMs,
      readyMs: constructionMs + loadMs,
      hitMs,
      hitDigest: Array.from(new Uint8Array(hitHash))
        .map((n) => n.toString(16).padStart(2, '0'))
        .join(''),
      posePixelHashes: frames,
      drawMs,
      intervalMs,
      completedFrames: drawMs.length,
      durationMs: measuredDuration,
      textureMiB: renderer.textureEstimateMiB(),
      ownedAlphaBytes: alphaBytes,
      referencedDecodedRGBABytesEstimate: oldDecodedEstimate,
      textureCount: unique.length,
      glError: report.glError,
      backend: report.renderer,
      neutralPNG: neutral,
      physicalDevicesOpened: false,
      actualOBS: false,
      releasePerformanceAcceptance: false,
    };
  } finally {
    if (!heldForMemorySample) dispose();
  }
};
(window as unknown as { cleanupBench: Promise<unknown> }).cleanupBench = run().catch((error) => ({
  passed: false,
  code:
    error instanceof Error
      ? (error.message.match(/E_[A-Z_]+/)?.[0] ?? 'E_BENCH_SCRIPT')
      : 'E_BENCH_SCRIPT',
}));
