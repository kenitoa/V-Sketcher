import { AvatarRenderer } from '../../../packages/avatar-renderer';
import type { PreviewScene } from '../../../packages/scene-core';
import './output.css';
async function start() {
  const scene = await (await fetch(new URL('assets/preview-scene.json', document.baseURI))).json() as PreviewScene;
  const renderer = new AvatarRenderer(document.querySelector<HTMLCanvasElement>('canvas')!, scene); await renderer.load(document.baseURI); renderer.draw();
}
void start();
