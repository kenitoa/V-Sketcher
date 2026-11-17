import assert from 'node:assert/strict';
import { cpSync, mkdirSync, readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join, relative } from 'node:path';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { listPackage, extractFile } from '@electron/asar';
import { root } from './common.mjs';

const source = resolve(root, 'out/2DSketcher-win32-x64');
const target = resolve(root, '.local/isolated', `run-${Date.now()}`, '한글 경로 with spaces');
assert.ok(relative(resolve(root, '.local/isolated'), target).startsWith('run-'));
mkdirSync(target, { recursive: true });
const bundle = join(target, '2DSketcher');
cpSync(source, bundle, { recursive: true, errorOnExist: true, force: false });
const evidenceArgument = process.argv.find(value => value.startsWith('--evidence-dir='))?.slice('--evidence-dir='.length);
const evidence = resolve(root, evidenceArgument ?? '.local/smoke/package'); mkdirSync(evidence, { recursive: true });
const archive = join(bundle, 'resources/app.asar');
const entries = listPackage(archive).map(path => path.replaceAll('\\', '/'));
const forbidden = /(^|\/)(experiments|tests|\.git|\.venv-product|\.local|scripts|worker\/main\.py|electron-forge|typescript|vite)(\/|$)/;
assert.ok(!entries.some(path => forbidden.test(path)), 'Development content entered application archive');
assert.equal(JSON.parse(extractFile(archive, 'dist/runtime-config.json').toString()).channel, 'release');
const assetManifest = JSON.parse(readFileSync(resolve(root, 'assets/product/manifest.json'), 'utf8'));
const previewEntries = entries.filter(path => path.startsWith('/dist/renderer/assets/preview/') && path.endsWith('.png'));
assert.equal(previewEntries.length, assetManifest.assets.length, 'Undeclared preview assets entered package');
for (const item of assetManifest.assets) {
  const bytes = extractFile(archive, join('dist', 'renderer', 'assets', item.path));
  assert.equal(createHash('sha256').update(bytes).digest('hex'), item.sha256, 'Bundled preview asset changed');
}
const model = JSON.parse(extractFile(archive, join('dist','renderer','assets','preview-project.json')).toString());
assert.equal(model.schemaVersion.major, 1); assert.equal(model.schemaVersion.minor, 9);
for (const asset of model.assets) assert.ok(assetManifest.assets.some(item => item.sha256 === asset.fingerprint.sha256), 'Undeclared model resource');
const partsCatalog=JSON.parse(extractFile(archive,join('dist','renderer','assets','parts','catalog.json')).toString());assert.equal(Object.keys(partsCatalog.files).length,13);const partsEntries=entries.filter(p=>p.startsWith('/dist/renderer/assets/parts/')&&p.endsWith('.png'));assert.equal(partsEntries.length,13);for(const [digest,path] of Object.entries(partsCatalog.files)){assert.equal(createHash('sha256').update(extractFile(archive,join('dist','renderer','assets',path))).digest('hex'),digest);}
const system = process.env.SystemRoot ?? 'C:\\Windows';
const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => !/^(PYTHON|NODE|NPM|ELECTRON|VIRTUAL_ENV|CONDA|VSCODE)/i.test(key)));
env.PATH = join(system, 'System32');
for (const command of ['node', 'npm', 'python', 'py']) {
  const found = spawnSync(join(system, 'System32/where.exe'), [command], { cwd: target, env, windowsHide: true, encoding: 'utf8' });
  assert.notEqual(found.status, 0, `${command} unexpectedly discoverable`);
}
const reports = [];
// Exercise the new frozen entry point with a real bundled original, outside ASAR and without Node/Python on PATH.
const inputSource=join(target,'input-source.png');const inputOutput=join(target,'input-output');mkdirSync(inputOutput);
const inputAsset=model.assets.find(asset=>model.inputAssetIds.includes(asset.id));
writeFileSync(inputSource,extractFile(archive,join('dist','renderer','assets','preview',inputAsset.fingerprint.sha256+'.png')));
const imageRun=spawnSync(join(bundle,'resources/worker/worker.exe'),['--image-input'],{cwd:target,env,windowsHide:true,encoding:'utf8',timeout:60000,input:JSON.stringify({operation:'probe',source:inputSource,suffix:'.png',output:inputOutput})+'\n'});
writeFileSync(join(target,'frozen-input.log'),(imageRun.stdout??'')+(imageRun.stderr??''));
assert.equal(imageRun.status,0,'Frozen image processor exited');const imageProbe=JSON.parse(imageRun.stdout);assert.equal(imageProbe.ok,true);assert.equal(imageProbe.report.detectorAvailable,true);assert.ok(statSync(join(inputOutput,'normalized.png')).size>1000);
for (const attempt of [1, 2]) {
  const reportPath = join(target, `report-${attempt}.json`);
  const args = [`--correction-screenshot=${join(evidence,attempt===1?'release-correction.png':'release-correction-compact.png')}`,`--correction-extremes=${join(evidence,attempt===1?'release-correction-extremes.png':'release-correction-extremes-compact.png')}`,`--structure-screenshot=${join(evidence,attempt===1?'release-structure.png':'release-structure-compact.png')}`,`--structure-extremes=${join(evidence,attempt===1?'release-structure-extremes.png':'release-structure-extremes-compact.png')}`,`--profile-dir=${join(target, `profile-${attempt}`)}`, `--self-check-report=${reportPath}`];
  if (attempt === 2) args.push('--compact-editor=true',`--editor-screenshot=${join(evidence,'release-editor-compact.png')}`,`--motion-screenshot=${join(evidence,'release-motion-compact.png')}`,`--input-screenshot=${join(evidence,'release-input-compact.png')}`,`--parts-screenshot=${join(evidence,'release-parts-compact.png')}`);
  if (attempt === 1) args.push(`--screenshot=${join(evidence, 'release-studio.png')}`,`--project-screenshot=${join(evidence,'release-project.png')}`,`--editor-screenshot=${join(evidence,'release-editor.png')}`,`--motion-screenshot=${join(evidence,'release-motion.png')}`,`--input-screenshot=${join(evidence,'release-input.png')}`,`--parts-screenshot=${join(evidence,'release-parts.png')}`,`--parts-contact=${join(evidence,'release-parts-contact.png')}`,`--parts-extremes=${join(evidence,'release-parts-extremes.png')}`);
  const result = spawnSync(join(bundle, '2DSketcher.exe'), args, { cwd: target, env, windowsHide: true, encoding: 'utf8', timeout: 1800000 });
  writeFileSync(join(target, `launch-${attempt}.log`), (result.stdout ?? '') + (result.stderr ?? ''));
  if (result.error) throw result.error;
  const report = JSON.parse(readFileSync(reportPath, 'utf8'));
  writeFileSync(join(evidence, `packaged-run-${attempt}.json`), JSON.stringify(report, null, 2) + '\n');
  assert.equal(result.status, 0); assert.equal(report.passed, true); assert.equal(report.packaged, true);
  assert.equal(report.channel, 'release'); assert.equal(report.worker.frozen, true);
  assert.equal(report.worker.dependencyFilesInsideBundle, true); assert.equal(report.worker.modelLoaded, true);
  assert.equal(report.workerStopped, true); assert.equal(report.renderer.workerReady, true);
  assert.equal(report.renderer.diagnosticsVisible, false); assert.equal(report.renderer.projectRoutesEnabled, true); assert.equal(report.projects?.passed,true);
  assert.equal(report.projects?.recoveryToNewFile,true); assert.equal(report.projects?.recoveryComparison,true);
  assert.equal(report.detail?.passed,true);assert.equal(report.split?.passed,true);assert.equal(report.corrections?.passed,true);assert.equal(report.corrections?.pixels?.passed,true);assert.equal(report.structure?.passed,true);assert.equal(report.structure?.pixels?.passed,true);assert.equal(report.parts?.passed,true);assert.equal(report.parts?.invalidRestores,true);assert.equal(report.renderer.partsPixels?.passed,true);assert.equal(report.renderer.partsPixels?.combinations,64);assert.equal(report.renderer.partsPixels?.frames,1472);assert.equal(report.input?.passed,true); assert.equal(report.input?.keyboardMask,true); assert.equal(report.input?.pointerCrop,true); assert.equal(report.motion?.passed,true); assert.equal(report.renderer.motionPixels?.passed,true); assert.equal(report.editor?.passed,true); assert.equal(report.editor?.contrast?.passed,true);
  assert.equal(report.renderer.projectModel?.schemaVersion, '1.9');
  assert.equal(report.renderer.projectModel?.projectId, model.projectId);
  assert.equal(report.renderer.modelPixels?.passed, true);
  assert.equal(report.renderer.workflowCore?.passed, true); assert.equal(report.renderer.sampleRuntimeFrozen, true);
  assert.equal(report.renderer.workflowLabVisible, false); assert.equal(report.renderer.workflowUI?.visible, false);
  reports.push({ attempt, freshProfile: true, exitCode: result.status, passed: report.passed });
}
const inventory = [];
function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) walk(path);
    else inventory.push({ path: relative(source, path).replaceAll('\\', '/'), bytes: statSync(path).size, sha256: createHash('sha256').update(readFileSync(path)).digest('hex') });
  }
}
walk(source);
const summary = { passed: true, platform: process.platform, architecture: process.arch, userApprovedScope: 'Same PC isolated runtime; no separate PC or VM available', cleanWindowsOS: false,
  singleImageStructure:{passed:true,configurationVersion:'1.0.0',reviewBeforeApply:true,estimatedStates:true,earlyPreview:true},modularParts:{selectedPngs:13,states:27,items:12,combinations:64},frozenImageInput:{passed:true,detectorAvailable:imageProbe.report.detectorAvailable,normalizedSize:imageProbe.report.size,originalSize:imageProbe.report.originalSize},
  isolation: { developerToolsOnPath: false, externalNodeOrPythonRequired: false, freshProfiles: 2, unicodeAndSpacePath: true, rendererExternalNetworkBlocked: true, systemNetworkDisabled: false },
  reports, archiveEntries: entries.length, forbiddenDevelopmentContent: false, packageBytes: inventory.reduce((total, item) => total + item.bytes, 0),
  commonProjectSchema: '1.9', limitations: ['Same Windows installation, drivers and system DLLs retained', 'No clean-OS claim', 'No camera/microphone, OBS, creation, full rigging or M0 performance test'], files: inventory };
writeFileSync(join(evidence, 'package-audit.json'), JSON.stringify(summary, null, 2) + '\n');
console.log(`Packaged release passed twice: ${inventory.length} files, ${summary.packageBytes} bytes; no developer tools on PATH. Same-PC scope.`);
