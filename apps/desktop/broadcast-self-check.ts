import type { BrowserWindow } from 'electron';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { BroadcastServer } from './broadcast-server';
import { createBroadcastWindow } from './broadcast-window';
import { defaultOutputSettings } from '../../packages/broadcast';
export const outputPixelProbe = `new Promise(resolve=>requestAnimationFrame(()=>{const c=document.querySelector('canvas');if(!c){resolve({visiblePixels:0,ready:false});return;}const g=c.getContext('webgl2'),p=new Uint8Array(c.width*c.height*4);g.readPixels(0,0,c.width,c.height,g.RGBA,g.UNSIGNED_BYTE,p);let visible=0,partial=0,hash=2166136261;for(let i=0;i<p.length;i++){hash=Math.imul(hash^p[i],16777619);if(i%4===3){if(p[i]>0)visible++;if(p[i]>0&&p[i]<255)partial++;}}resolve({ready:document.documentElement.dataset.output==='rendering',width:c.width,height:c.height,visiblePixels:visible,transparentPixels:c.width*c.height-visible,partialAlphaPixels:partial,pixelHash:hash>>>0,canvasOnly:document.body.children.length===1&&document.body.firstElementChild===c,bodyText:document.body.innerText,nodeExposed:typeof require!=='undefined',glError:g.getError()});}))`;
export async function checkBroadcastUI(host: {
  window: BrowserWindow;
  output: BroadcastServer;
  hold: (value: boolean) => void;
  directory: string;
  compact: boolean;
}) {
  const { window, output } = host;
  const step = (action: string, value?: unknown) =>
    window.webContents.executeJavaScript(
      `window.broadcastCheckStep(${JSON.stringify(action)},${JSON.stringify(value) ?? 'undefined'})`,
    ) as Promise<Record<string, unknown>>;
  const pause = (ms = 100) => new Promise((r) => setTimeout(r, ms));
  let receiver: BrowserWindow | null = null;
  let stage = 'prepare';
  const verify = (v: unknown, code: string) => {
    if (!v) throw new Error(code);
  };
  const until = async <T>(fn: () => Promise<T>, accept: (value: T) => unknown): Promise<T> => {
    const deadline = Date.now() + 30000;
    while (true) {
      const v = await fn();
      if (accept(v)) return v;
      if (Date.now() > deadline)
        throw new Error('E_BROADCAST_TIMEOUT_' + stage.toUpperCase().replace(/[^A-Z]/g, '_'));
      await pause();
    }
  };
  const pixels = () =>
    receiver!.webContents.executeJavaScript(outputPixelProbe) as Promise<
      Record<string, number | boolean | string>
    >;
  const visible = () => until(pixels, (p) => p.ready && Number(p.visiblePixels) > 0);
  const records: Record<string, unknown>[] = [];
  await mkdir(host.directory, { recursive: true });
  try {
    for (const route of ['parts', 'single-image', 'split-image']) {
      stage = route;
      await step('prepare', route);
      verify(output.view().state === 'SOURCE_READY', 'E_BROADCAST_SOURCE');
      receiver = await createBroadcastWindow(output, false);
      const neutral = await visible();
      verify(
        neutral.canvasOnly &&
          neutral.bodyText === '' &&
          !neutral.nodeExposed &&
          neutral.glError === 0 &&
          Number(neutral.transparentPixels) > 0,
        'E_BROADCAST_PRIVATE_ALPHA',
      );
      await step('hide');
      await until(pixels, (p) => p.visiblePixels === 0);
      await step('hide');
      await visible();
      await step('motion');
      const motionA = await visible();
      await pause(400);
      const motionB = await visible();
      verify(motionA.pixelHash !== motionB.pixelHash, 'E_BROADCAST_MOTION');
      await step('neutral');
      await visible();
      await step('expression');
      const expression = await visible();
      await step('neutral');
      const base = await visible();
      verify(expression.pixelHash !== base.pixelHash, 'E_BROADCAST_EXPRESSION');
      const id = output.view().sourceId;
      await step('edit');
      const before = await visible();
      verify(
        output.view().sourceId === id && before.pixelHash === base.pixelHash,
        'E_BROADCAST_EDITOR_ISOLATION',
      );
      const saved = await step('save');
      verify(
        saved.savedRevision === saved.workRevision && saved.runRevision !== saved.workRevision,
        'E_BROADCAST_SAVE_BASIS',
      );
      await step('apply');
      await until(
        async () => output.view(),
        (v) => v.sourceId !== id,
      );
      await visible();
      stage = 'stall';
      host.hold(true);
      await step('save');
      await until(pixels, (p) => p.visiblePixels === 0);
      verify(output.view().health === 'STALE', 'E_BROADCAST_WATCHDOG');
      const retained = await step('state');
      verify(retained.active, 'E_BROADCAST_RUN_PROTECTED');
      host.hold(false);
      await visible();
      if (route === 'parts') {
        stage = 'settings';
        const version = output.view().settingsVersion;
        await output.configure({
          ...defaultOutputSettings(),
          width: 1280,
          height: 720,
          fps: 15,
          scale: 0.75,
          x: 0.1,
          crop: { left: 0, right: 0, top: 0, bottom: 0.1 },
        });
        receiver.setContentSize(640, 360);
        const resized = await until(
          pixels,
          (p) => p.width === 1280 && p.height === 720 && Number(p.visiblePixels) > 0,
        );
        verify(output.view().settingsVersion > version, 'E_BROADCAST_VERSION');
        await output.restore();
        receiver.setContentSize(960, 540);
        await until(pixels, (p) => p.width === 1920 && Number(p.visiblePixels) > 0);
        stage = 'renderer-failure';
        await receiver.webContents.executeJavaScript(
          "document.querySelector('canvas').getContext('webgl2').getExtension('WEBGL_lose_context').loseContext()",
        );
        await until(
          async () => output.view(),
          (v) => v.health === 'CLIENT_FAILED',
        );
        verify((await step('state')).active, 'E_BROADCAST_GPU_FAILURE_RUN');
        await output.configure(output.view().settings);
        await visible();
        stage = 'rotation';
        const oldURL = output.url()!;
        await output.rotate();
        verify((await fetch(oldURL + 'state')).status === 403, 'E_BROADCAST_ROTATION');
        await until(pixels, (p) => p.visiblePixels === 0);
        await receiver.loadURL(output.url()!);
        await visible();
        stage = 'restart';
        const api = (await window.webContents.executeJavaScript(
          'window.studio.broadcast.restart()',
        )) as { state: string };
        verify(api.state === 'SOURCE_READY', 'E_BROADCAST_RESTART');
        await visible();
        verify(resized.canvasOnly, 'E_BROADCAST_RESIZED_CONTENT');
      }
      stage = 'input-loss';
      await step('input-loss');
      const driven = (await step('state')).frame;
      await pause(1300);
      const fallback = (await step('state')).frame;
      verify(JSON.stringify(driven) !== JSON.stringify(fallback), 'E_BROADCAST_INPUT_FALLBACK');
      await visible();
      await step('neutral');
      await output.configure(defaultOutputSettings());
      receiver.setContentSize(960, 540);
      await visible();
      records.push({
        route,
        passed: true,
        actualRoutePreparation: true,
        alpha: true,
        avatarOnly: true,
        motion: true,
        expression: true,
        hide: true,
        workingEditIsolated: true,
        workingSavePinned: true,
        executionReplacement: true,
        stalePublisherClears: true,
        inputLossFallback: true,
        physicalDevicesOpened: false,
        neutral,
      });
      receiver.close();
      receiver = null;
      if (route !== 'split-image') await step('stop');
    }
    stage = 'capture';
    await step('panel');
    if (host.compact) window.setSize(1080, 720);
    await pause(300);
    await writeFile(
      join(host.directory, host.compact ? 'broadcast-ui-compact.png' : 'broadcast-ui.png'),
      (await window.webContents.capturePage()).toPNG(),
    );
    return {
      passed: true,
      routes: records,
      settingsRestore: true,
      rendererFailureKeepsRun: true,
      tokenRotation: true,
      restartReconnect: true,
      receiverSandbox: true,
      externalOBS: 'NOT_RUN',
      osGlobalKeyDelivery: 'NOT_RUN',
      physicalDevicesOpened: false,
      rawCameraFramesSaved: false,
      rawAudioSaved: false,
      m0: 'HOLD',
    };
  } catch (e) {
    await writeFile(
      join(host.directory, 'failure-stage.json'),
      JSON.stringify({
        stage,
        errorCode:
          e instanceof Error
            ? (e.message.match(/E_[A-Z_]+/)?.[0] ?? 'E_BROADCAST_UI')
            : 'E_BROADCAST_UI',
      }) + '\n',
    );
    throw e;
  } finally {
    host.hold(false);
    if (receiver && !receiver.isDestroyed()) receiver.close();
  }
}
