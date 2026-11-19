import { AvatarRenderer } from '../../../packages/avatar-renderer';
import { assertImageSettings, type ImageRenderInput } from '../../../packages/image-export/types';
declare global {
  interface Window {
    renderImage?: (input: ImageRenderInput) => Promise<string>;
  }
}
window.renderImage = async (input) => {
  const { scene, settings, parameters } = input;
  assertImageSettings(settings);
  const canvas = document.createElement('canvas');
  canvas.width = settings.width;
  canvas.height = settings.height;
  let renderer: AvatarRenderer | null = null;
  try {
    renderer = new AvatarRenderer(canvas, scene);
    await renderer.load(document.baseURI);
    renderer.draw(parameters, settings);
    if (renderer.gl.isContextLost() || renderer.gl.getError() !== 0)
      throw new Error('E_IMAGE_RENDER');
    const output = document.createElement('canvas');
    output.width = canvas.width;
    output.height = canvas.height;
    const ctx = output.getContext('2d', { alpha: true, colorSpace: 'srgb' });
    if (!ctx) throw new Error('E_IMAGE_RENDER');
    if (!settings.transparent) {
      ctx.fillStyle = settings.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(canvas, 0, 0);
    const png = output.toDataURL('image/png');
    if (!png.startsWith('data:image/png;base64,')) throw new Error('E_IMAGE_RENDER');
    return png;
  } finally {
    renderer?.dispose();
    renderer?.gl.getExtension('WEBGL_lose_context')?.loseContext();
    canvas.remove();
  }
};
