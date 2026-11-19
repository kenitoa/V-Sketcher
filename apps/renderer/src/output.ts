import { AvatarRenderer } from '../../../packages/avatar-renderer';
import { NEUTRAL, type PreviewScene } from '../../../packages/scene-core';
import {
  assertOutputSettings,
  type OutputSettings,
  type OutputFrame,
} from '../../../packages/broadcast';
import './output.css';
const host = document.body,
  clientId = crypto.randomUUID();
let current: {
  renderer: AvatarRenderer;
  canvas: HTMLCanvasElement;
  sourceId: string;
  version: number;
  settings: OutputSettings;
} | null = null;
let candidate: AvatarRenderer | null = null,
  generation = 0,
  lastFrame = 0,
  lastSeq = -1,
  lastPaint = 0,
  building = '',
  failed = '',
  pendingAck = false;
let frame: OutputFrame | null = null;
function clear(): void {
  if (current) {
    const gl = current.renderer.gl;
    gl.disable(gl.SCISSOR_TEST);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
  document.documentElement.dataset.output = 'transparent';
}
function dispose(renderer: AvatarRenderer): void {
  renderer.dispose();
  renderer.gl.getExtension('WEBGL_lose_context')?.loseContext();
}
async function ack(
  ready: boolean,
  sourceId = current?.sourceId,
  version = current?.version,
): Promise<void> {
  if (!sourceId || !version || pendingAck) return;
  pendingAck = true;
  try {
    await fetch('ack', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientId,
        sourceId,
        settingsVersion: version,
        ready,
        width: innerWidth,
        height: innerHeight,
      }),
      signal: AbortSignal.timeout(800),
    });
  } catch {
    /* read-only receiver never exposes an error page */
  } finally {
    pendingAck = false;
  }
}
async function prepare(sourceId: string, version: number, settings: OutputSettings): Promise<void> {
  const key = sourceId + ':' + version;
  if (building === key || failed === key) return;
  building = key;
  const epoch = ++generation;
  if (candidate) {
    dispose(candidate);
    candidate = null;
  }
  const canvas = document.createElement('canvas');
  canvas.width = settings.width;
  canvas.height = settings.height;
  canvas.id = 'avatar-output';
  let renderer: AvatarRenderer | null = null,
    timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const response = await fetch(`scene/${sourceId}.json`, { signal: AbortSignal.timeout(2000) });
    if (!response.ok) throw new Error();
    const scene = (await response.json()) as PreviewScene;
    if (epoch !== generation) return;
    renderer = new AvatarRenderer(canvas, scene);
    candidate = renderer;
    await Promise.race([
      renderer.load(document.baseURI),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error()), 15000);
      }),
    ]);
    if (epoch !== generation) {
      dispose(renderer);
      return;
    }
    renderer.draw(NEUTRAL, settings);
    if (renderer.gl.getError() !== 0) throw new Error();
    const prior = current;
    current = { renderer, canvas, sourceId, version, settings };
    candidate = null;
    host.replaceChildren(canvas);
    if (prior) dispose(prior.renderer);
    failed = '';
    lastSeq = -1;
    await ack(true);
  } catch {
    if (renderer) dispose(renderer);
    if (epoch === generation) {
      candidate = null;
      clear();
      failed = key;
      await ack(false, sourceId, version);
    }
  } finally {
    if (timer) clearTimeout(timer);
    if (epoch === generation) building = '';
  }
}
async function poll(): Promise<void> {
  let delay = 33;
  try {
    const response = await fetch('state', { signal: AbortSignal.timeout(800) });
    if (!response.ok) throw new Error();
    const data = (await response.json()) as {
      protocol: number;
      state: string;
      sourceId: string | null;
      settings: OutputSettings;
      settingsVersion: number;
      frame: OutputFrame | null;
    };
    if (data.protocol !== 1) throw new Error();
    assertOutputSettings(data.settings);
    delay = 1000 / data.settings.fps;
    if (data.state !== 'SOURCE_READY' || !data.sourceId) {
      frame = null;
      clear();
      if (building) {
        ++generation;
        if (candidate) dispose(candidate);
        candidate = null;
        building = '';
      }
      failed = '';
    } else {
      if (current?.sourceId !== data.sourceId || current.version !== data.settingsVersion)
        void prepare(data.sourceId, data.settingsVersion, data.settings);
      frame = data.frame;
      if (frame && frame.seq !== lastSeq) {
        lastFrame = performance.now();
        lastSeq = frame.seq;
      }
      if (!frame) clear();
    }
  } catch {
    frame = null;
    clear();
  }
  setTimeout(() => void poll(), delay);
}
function paint(now: number): void {
  if (current && now - lastPaint >= 1000 / current.settings.fps - 1) {
    lastPaint = now;
    try {
      if (!frame || frame.sourceId !== current.sourceId || now - lastFrame > 1000 || frame.hidden)
        clear();
      else {
        current.renderer.draw(frame.parameters, current.settings);
        if (current.renderer.gl.isContextLost() || current.renderer.gl.getError() !== 0)
          throw new Error();
        document.documentElement.dataset.output = 'rendering';
      }
    } catch {
      clear();
      void ack(false);
    }
  }
  requestAnimationFrame(paint);
}
setInterval(() => {
  if (current && failed === '') void ack(!current.renderer.gl.isContextLost());
  if (performance.now() - lastFrame > 1000) clear();
}, 1000);
addEventListener('pagehide', () => {
  ++generation;
  if (candidate) dispose(candidate);
  if (current) dispose(current.renderer);
  current = null;
});
requestAnimationFrame(paint);
void poll();
