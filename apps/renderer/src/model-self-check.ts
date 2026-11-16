import { AvatarRenderer } from '../../../packages/avatar-renderer';
import { IDENTITY, multiply, translate } from '../../../packages/coordinates';
import { assertProject, type Project } from '../../../packages/project-model';
import { projectToPreview } from '../../../packages/project-model/preview';

/** Explicit self-check only: actual GPU pixels must follow model translation and cropping. */
export async function checkModelPixels(project: Project): Promise<Record<string,unknown>> {
  const renderers: AvatarRenderer[] = []; const size = 180;
  const render = async (model: Project): Promise<Uint8Array> => {
    assertProject(model); const canvas = document.createElement('canvas'); canvas.width = size; canvas.height = size;
    const renderer = new AvatarRenderer(canvas,projectToPreview(model)); renderers.push(renderer);
    await renderer.load(document.baseURI); renderer.draw(); renderer.gl.finish();
    const pixels = new Uint8Array(size*size*4); renderer.gl.readPixels(0,0,size,size,renderer.gl.RGBA,renderer.gl.UNSIGNED_BYTE,pixels);
    if (renderer.gl.getError() !== 0) throw new Error('E_MODEL_GPU'); return pixels;
  };
  try {
    const original = await render(project);
    const moved = structuredClone(project);
    // Apply one world translation without changing resource coordinates or provenance.
    for (const part of moved.parts) if (!part.parentId) part.localTransform = multiply(translate(project.canvas.width*.1,0),part.localTransform);
    const shifted = await render(moved); let translationMismatches = 0;
    for (let y=0;y<size;y++) for (let x=0;x<size;x++) for (let c=0;c<4;c++) {
      const expected = x >= 18 ? original[(y*size+x-18)*4+c]! : 0;
      if (Math.abs(shifted[(y*size+x)*4+c]!-expected) > 3) translationMismatches++;
    }
    const base = structuredClone(project); const root = base.parts.find(part => part.role === 'base' || part.role === 'body');
    if (!root) throw new Error('E_MODEL_GPU_FIXTURE');
    base.parts = [root]; delete base.motion; base.partBindings = []; root.parentId = null; root.localTransform = [...IDENTITY];
    const asset = base.assets.find(a => a.id === root.textures[0]!.assetId)!; root.textures[0]!.assetToLocal = [...IDENTITY]; asset.sourceToEdited = [...IDENTITY];
    const full = await render(base); asset.sourceRegion.width /= 2; const cropped = await render(base); let cropMismatches = 0;
    for (let y=0;y<size;y++) for (let x=0;x<size;x++) for (let c=0;c<4;c++) {
      const expected = x < size/2 ? full[(y*size+x)*4+c]! : 0;
      if (Math.abs(cropped[(y*size+x)*4+c]!-expected) > 3) cropMismatches++;
    }
    const result = { passed:translationMismatches === 0 && cropMismatches === 0,translationPixels:18,translationMismatches,cropMismatches,tolerance:3,frameSize:[size,size],
      scope:'Actual GPU model translation/crop pixels; not full rigging, tracking or performance' };
    return result;
  } finally { for (const renderer of renderers) renderer.dispose(); }
}
