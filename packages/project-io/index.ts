/** Host-only file access. The renderer never imports this module. */
import { realpath, open } from 'node:fs/promises';
import { resolve, relative, isAbsolute, extname } from 'node:path';
import { createHash } from 'node:crypto';
import { assertProject, portableResourcePath, editProject, type Project, type Asset, type Fingerprint } from '../project-model';
export interface ResourceInspection { assetId:string; state:'ok' | 'missing' | 'changed' | 'unsafe' | 'invalid'; code:string; actual?:Fingerprint; }
function inside(root: string, file: string): boolean { const part = relative(root,file); return part !== '..' && !part.startsWith('..\\') && !part.startsWith('../') && !isAbsolute(part); }
async function inspect(root: string, path: string, asset: Asset): Promise<ResourceInspection> {
  const base = { assetId:asset.id };
  if (!portableResourcePath(path)) return { ...base,state:'unsafe',code:'E_RESOURCE_PATH' };
  try {
    const canonicalRoot = await realpath(root); const candidate = resolve(canonicalRoot,path);
    if (!inside(canonicalRoot,candidate)) return { ...base,state:'unsafe',code:'E_RESOURCE_PATH' };
    const file = await realpath(candidate);
    if (!inside(canonicalRoot,file)) return { ...base,state:'unsafe',code:'E_RESOURCE_ESCAPE' };
    const handle = await open(file,'r');
    try {
      const before = await handle.stat();
      if (!before.isFile() || before.size > 512*1024*1024) return { ...base,state:'invalid',code:'E_RESOURCE_SIZE' };
      const header = Buffer.alloc(32); await handle.read(header,0,header.length,0);
      const isPNG = header.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])) && header.toString('ascii',12,16) === 'IHDR';
      const isJPEG = header[0] === 255 && header[1] === 216 && header[2] === 255;
      const formatValid = asset.mediaType === 'image/png' ? isPNG && header.readUInt32BE(16) === asset.dimensions.width && header.readUInt32BE(20) === asset.dimensions.height : isJPEG;
      const hash = createHash('sha256');
      for await (const chunk of handle.createReadStream({ start:0,autoClose:false })) hash.update(chunk as Buffer);
      const after = await handle.stat(); const actual = { sha256:hash.digest('hex'),bytes:after.size };
      if (before.size !== after.size || before.mtimeMs !== after.mtimeMs || before.ctimeMs !== after.ctimeMs) return { ...base,state:'changed',code:'E_RESOURCE_CHANGED_DURING_READ',actual };
      if (actual.bytes !== asset.fingerprint.bytes || actual.sha256 !== asset.fingerprint.sha256) return { ...base,state:'changed',code:'E_RESOURCE_CHANGED',actual };
      const allowedExtension = asset.mediaType === 'image/png' ? extname(path).toLowerCase() === '.png' : ['.jpg','.jpeg'].includes(extname(path).toLowerCase());
      if (!formatValid || !allowedExtension) return { ...base,state:'invalid',code:'E_RESOURCE_FORMAT',actual };
      return { ...base,state:'ok',code:'OK',actual };
    } finally { await handle.close(); }
  } catch (error) {
    return { ...base,state:(error as NodeJS.ErrnoException).code === 'ENOENT' ? 'missing' : 'invalid',code:(error as NodeJS.ErrnoException).code === 'ENOENT' ? 'E_RESOURCE_MISSING' : 'E_RESOURCE_READ' };
  }
}
export async function inspectProjectResources(project: Project, projectRoot: string): Promise<ResourceInspection[]> {
  assertProject(project); const output: ResourceInspection[] = [];
  for (const asset of project.assets) output.push(await inspect(projectRoot,asset.storage.path,asset)); return output;
}
export async function findRelinkCandidates(project: Project, projectRoot: string, assetId: string, selectedPaths: readonly string[]): Promise<string[]> {
  assertProject(project); if (selectedPaths.length > 1024) throw new Error('E_RELINK_LIMIT');
  const asset = project.assets.find(v => v.id === assetId); if (!asset) throw new Error('E_REFERENCE_MISSING');
  const matches: string[] = [];
  for (const path of new Set(selectedPaths)) if ((await inspect(projectRoot,path,asset)).state === 'ok') matches.push(path);
  return matches.sort();
}
export async function relinkAsset(project: Project, projectRoot: string, assetId: string, selectedPath: string, now?: Date): Promise<Project> {
  assertProject(project); const asset = project.assets.find(v => v.id === assetId); if (!asset) throw new Error('E_REFERENCE_MISSING');
  if ((await inspect(projectRoot,selectedPath,asset)).state !== 'ok') throw new Error('E_RELINK_CONTENT');
  return editProject(project,draft => { draft.assets.find(v => v.id === assetId)!.storage.path = selectedPath; },now);
}
