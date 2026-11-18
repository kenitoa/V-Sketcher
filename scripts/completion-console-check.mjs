import {mkdirSync,existsSync,readFileSync} from 'node:fs';
import {resolve,relative} from 'node:path';
import {spawnSync} from 'node:child_process';
import {electronPath} from './common.mjs';
const out=resolve('.local/completion-console-'+Date.now());if(existsSync(out))throw Error('E_CONSOLE_EXISTS');mkdirSync(out);
const env={...process.env};delete env.ELECTRON_RUN_AS_NODE;
const result=spawnSync(electronPath(),['tools/completion-console-check.cjs','--output='+out],{env,windowsHide:true,stdio:'ignore',timeout:60000});
if(result.status!==0||!JSON.parse(readFileSync(resolve(out,'console-check.json'),'utf8')).passed){console.error('E_CONSOLE_CHECK');process.exitCode=1;}else console.log('Offline observation console checked: '+relative(process.cwd(),out).replaceAll('\\','/'));
