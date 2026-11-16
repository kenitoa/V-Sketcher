import { AvatarRenderer } from '../../../packages/avatar-renderer';
import { readProject } from '../../../packages/project-model';
import { projectToPreview } from '../../../packages/project-model/preview';
import './output.css';
async function start() {
  const opened = readProject(await (await fetch(new URL('assets/preview-project.json', document.baseURI))).json());
  if (opened.mode !== 'read-write') throw new Error('E_SCHEMA_READ_ONLY');
  const scene = projectToPreview(opened.project);
  const renderer = new AvatarRenderer(document.querySelector<HTMLCanvasElement>('canvas')!, scene); await renderer.load(document.baseURI); renderer.draw();
}
void start();
