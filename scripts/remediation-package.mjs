import {readFileSync,writeFileSync,mkdirSync,existsSync,createReadStream} from 'node:fs';
import {resolve,join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {extractFile,listPackage} from '@electron/asar';
const out=resolve(process.argv[2]);assert.ok(!existsSync(out),'E_REMEDIATION_EXISTS');mkdirSync(out,{recursive:true});
const work=resolve('.local/remediation-package-'+Date.now());mkdirSync(work,{recursive:true});
const version=JSON.parse(readFileSync('package.json')).version,hash=data=>createHash('sha256').update(data).digest('hex');
async function digest(file){const h=createHash('sha256');for await(const block of createReadStream(file))h.update(block);return h.digest('hex');}
const old=JSON.parse(readFileSync('evidence/phase29/run-05/review.json')),originalHash=await digest(old.zip.path);assert.equal(originalHash,old.zip.sha256);
const env={...process.env};delete env.ELECTRON_RUN_AS_NODE;
const build=spawnSync(process.env.ComSpec??'cmd.exe',['/d','/c','tools\\dev.cmd','run','make'],{env,windowsHide:true,encoding:'utf8',timeout:1200000,maxBuffer:16*1024*1024});writeFileSync(join(work,'make.log'),(build.stdout??'')+(build.stderr??''));assert.equal(build.status,0,'E_REMEDIATION_PACKAGE_BUILD');
const baseline=readFileSync('scripts/environment-package-check.mjs','utf8');assert.ok(baseline.includes("'0.21.0'"));
const adapted=baseline.replaceAll("'0.21.0'",JSON.stringify(version)),controller=join(work,'current-settings-check.mjs');writeFileSync(controller,adapted);
const test=spawnSync(process.execPath,[controller,'--evidence-dir='+join(out,'settings')],{env,windowsHide:true,encoding:'utf8',timeout:1200000,maxBuffer:8*1024*1024});writeFileSync(join(work,'settings.log'),(test.stdout??'')+(test.stderr??''));assert.equal(test.status,0,'E_REMEDIATION_PACKAGE_SETTINGS');
const archive=resolve('out/2DSketcher-win32-x64/resources/app.asar'),compiled='dist/electron/packages/project-storage/replace.js',archivePath=join(...compiled.split('/'));assert.equal(hash(extractFile(archive,archivePath)),hash(readFileSync(compiled)),'E_REMEDIATION_JOURNAL_PACKAGE');
const entries=listPackage(archive);assert.ok(!entries.some(p=>/remediation-media|astronaut\.png|remediation-flow/.test(p)),'E_REMEDIATION_FIXTURE_BUNDLED');
assert.equal(await digest(old.zip.path),originalHash,'E_REMEDIATION_HISTORY_MODIFIED');
const zip='out/make/zip/win32/x64/2DSketcher-win32-x64-'+version+'.zip';assert.ok(existsSync(zip));
writeFileSync(join(out,'package.json'),JSON.stringify({passed:true,appVersion:version,patch:'bounded recovery journal rename retry',twoFreshPackagedSettingsRuns:true,unicodeSpacePaths:true,developerToolsOnPath:false,cleanWindowsOS:false,
 compiledJournalSha256:hash(extractFile(archive,archivePath)),testControllerBaseSha256:hash(Buffer.from(baseline)),adapterChanges:'expected app version only; original historical checker unchanged',
 zip:{file:zip,sha256:await digest(zip)},originalFrozenZipPreserved:true,fixturesBundled:false,published:false,signed:false,releaseDecision:'HOLD'},null,2)+'\n');
console.log('New patch package passed settings self-check twice; old frozen ZIP preserved.');
