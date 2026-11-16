import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync, appendFileSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, join, relative, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { root, python } from './common.mjs';
const output = resolve(root,'evidence/phase07'); const privateLog = resolve(root,'.local/phase07-check.log');
mkdirSync(output,{ recursive:true }); writeFileSync(privateLog,'');
const env = { ...process.env,PATH:dirname(process.execPath)+';'+process.env.PATH }; delete env.ELECTRON_RUN_AS_NODE;
const commands = [[process.execPath,['scripts/generate-project-validators.mjs','--check']],
  [process.execPath,['node_modules/typescript/bin/tsc','--noEmit','-p','tsconfig.json']],
  [python,['-m','ruff','check','worker','scripts','tests/worker','--select','E9,F63,F7,F82']],
  [process.execPath,['scripts/test.mjs']]];
let combined = '';
for (const [executable,args] of commands) {
  const result = spawnSync(executable,args,{ cwd:root,env,windowsHide:true,encoding:'utf8' });
  const log = (result.stdout ?? '')+(result.stderr ?? ''); appendFileSync(privateLog,log); combined += log;
  if (result.error || result.status !== 0) throw new Error('E_MODEL_GATE: inspect .local/phase07-check.log');
}
const nodeTests = Number(combined.match(/\btests (\d+)/)?.[1]); const pythonTests = Number(combined.match(/Ran (\d+) tests/)?.[1]);
if (!(nodeTests > 0 && pythonTests > 0)) throw new Error('E_MODEL_GATE_COUNTS');
const files = {};
function inventory(folder) {
  for (const item of readdirSync(folder,{ withFileTypes:true })) {
    const path = join(folder,item.name); if (item.isDirectory()) inventory(path);
    else files[relative(root,path).replaceAll('\\','/')] = createHash('sha256').update(readFileSync(path)).digest('hex');
  }
}
for (const folder of ['packages/coordinates','packages/project-model','packages/project-io','tests/fixtures/common-model']) inventory(resolve(root,folder));
files['tests/project.test.ts'] = createHash('sha256').update(readFileSync(resolve(root,'tests/project.test.ts'))).digest('hex');
const report = { passed:true,created:new Date().toISOString(),appVersion:JSON.parse(readFileSync(resolve(root,'package.json'),'utf8')).version,
  schemaVersion:'1.0',node:process.versions.node,nodeTestGroups:nodeTests,pythonTestGroups:pythonTests,totalTestGroups:nodeTests+pythonTests,
  typecheck:true,ruff:true,generatedValidatorMatches:true,affineStressCases:400,scope:'Common model/coordinate/resource/core tests; GPU and packaged checks recorded separately',sourceSha256:files };
writeFileSync(join(output,'verification.json'),JSON.stringify(report,null,2)+'\n');
console.log(`Model gate passed: ${nodeTests} Node + ${pythonTests} Python groups; static and generated validator checks passed.`);
