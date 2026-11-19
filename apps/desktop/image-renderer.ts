import { BrowserWindow, nativeImage } from 'electron';
import type { ImageRenderInput } from '../../packages/image-export/types';
import { assertPNG } from '../../packages/image-export/atomic';
export async function renderPNG(input: ImageRenderInput, signal: AbortSignal): Promise<Buffer> {
  const window = new BrowserWindow({
    width: 800,
    height: 800,
    show: false,
    webPreferences: {
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: true,
      backgroundThrottling: false,
    },
  });
  const abort = () => {
    if (!window.isDestroyed()) window.destroy();
  };
  signal.addEventListener('abort', abort, { once: true });
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    if (signal.aborted) throw new Error('E_IMAGE_CANCELLED');
    await window.loadURL('sketcher://app/image-export.html');
    await window.webContents.executeJavaScript(
      `new Promise((resolve,reject)=>{const start=Date.now(),timer=setInterval(()=>{if(window.renderImage){clearInterval(timer);resolve(true)}else if(Date.now()-start>10000){clearInterval(timer);reject(new Error('E_IMAGE_RENDER'))}},20)})`,
    );
    const value = (await Promise.race([
      window.webContents.executeJavaScript('window.renderImage(' + JSON.stringify(input) + ')'),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error('E_IMAGE_RENDER')), 20000);
      }),
    ])) as string;
    if (signal.aborted) throw new Error('E_IMAGE_CANCELLED');
    const bytes = Buffer.from(value.slice('data:image/png;base64,'.length), 'base64');
    assertPNG(bytes, input.settings.width, input.settings.height);
    const size = nativeImage.createFromBuffer(bytes).getSize();
    if (size.width !== input.settings.width || size.height !== input.settings.height)
      throw new Error('E_IMAGE_VERIFY');
    return bytes;
  } catch {
    throw new Error(signal.aborted ? 'E_IMAGE_CANCELLED' : 'E_IMAGE_RENDER');
  } finally {
    if (timer) clearTimeout(timer);
    signal.removeEventListener('abort', abort);
    if (!window.isDestroyed()) window.destroy();
  }
}
