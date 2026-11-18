import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,readFile,rename,access} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {replaceJournal} from '../packages/project-storage/replace';

async function files(){const base=resolve('.local/journal-replace-tests');await mkdir(base,{recursive:true});const directory=await mkdtemp(join(base,'run-')),target=join(directory,'catalog.json'),temporary=join(directory,'prepared.tmp');await writeFile(target,'old-normal');await writeFile(temporary,'verified-next');return {target,temporary};}
test('journal replacement survives a transient sharing denial without deleting the previous file',async()=>{
 const {target,temporary}=await files();let attempts=0;
 await replaceJournal(temporary,target,async(from,to)=>{if(++attempts<=3){assert.equal(await readFile(target,'utf8'),'old-normal');throw Object.assign(new Error('busy'),{code:'EPERM'});}await rename(from,to);});
 assert.equal(attempts,4);assert.equal(await readFile(target,'utf8'),'verified-next');await assert.rejects(access(temporary));
});
test('permanent sharing denial is bounded and leaves both normal and prepared bytes intact',async()=>{
 const {target,temporary}=await files();let attempts=0;
 await assert.rejects(replaceJournal(temporary,target,async()=>{attempts++;throw Object.assign(new Error('busy'),{code:'EBUSY'});}),{code:'EBUSY'});
 assert.equal(attempts,7);assert.equal(await readFile(target,'utf8'),'old-normal');assert.equal(await readFile(temporary,'utf8'),'verified-next');
});
test('journal disk-full failures are returned immediately with no replacement or deletion',async()=>{
 const {target,temporary}=await files();let attempts=0;
 await assert.rejects(replaceJournal(temporary,target,async()=>{attempts++;throw Object.assign(new Error('full'),{code:'ENOSPC'});}),{code:'ENOSPC'});
 assert.equal(attempts,1);assert.equal(await readFile(target,'utf8'),'old-normal');assert.equal(await readFile(temporary,'utf8'),'verified-next');
});
