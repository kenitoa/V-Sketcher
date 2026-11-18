const fs=require('node:fs/promises'),path=require('node:path'),assert=require('node:assert/strict');
const {spawn,spawnSync}=require('node:child_process'),{randomBytes}=require('node:crypto');
const {readProject,editProject}=require(path.resolve('.local/test-js/packages/project-model'));
const {encodeBundle,readBundle,sha256}=require(path.resolve('.local/test-js/packages/project-storage/archive'));
const {atomicBundle,storageError}=require(path.resolve('.local/test-js/packages/project-storage/atomic'));
const {ProjectCatalog}=require(path.resolve('.local/test-js/packages/project-storage/catalog'));
const out=path.resolve(process.argv[2]);let stage='setup',keeper=null,ownedDistro=null;
(async()=>{
 assert.ok(!await fs.stat(out).then(()=>true,()=>false),'E_REMEDIATION_EXISTS');await fs.mkdir(out,{recursive:true});
 const state=JSON.parse(await fs.readFile('.local/remediation-space/state.json','utf8')),root=state.unc;
 assert.match(root,/^\\\\wsl\.localhost\\2DSketcher-Space-[a-f0-9]{10}\\test-space$/);assert.equal(state.capacityBytes,33554432);assert.equal(state.mounted,true);
 const nonce=randomBytes(8).toString('hex');ownedDistro=state.distro;assert.match(ownedDistro,/^2DSketcher-Space-[a-f0-9]{10}$/);
 keeper=spawn('wsl.exe',['-d',ownedDistro,'-u','root','--','sh','-c',`mountpoint -q /test-space || mount -t tmpfs -o size=32m tmpfs /test-space; printf %s ${nonce} > /test-space/.ready; exec sleep 3600`],{windowsHide:true,stdio:'ignore'});
 const deadline=Date.now()+30000;while(Date.now()<deadline){if(await fs.readFile(path.join(root,'.ready'),'utf8').catch(()=>'')===nonce)break;await new Promise(r=>setTimeout(r,100));}
 assert.equal(await fs.readFile(path.join(root,'.ready'),'utf8'),nonce,'E_REMEDIATION_MOUNT_READY');
 const check=spawnSync('wsl.exe',['-d',ownedDistro,'-u','root','--','stat','-f','-c','%T','/test-space'],{windowsHide:true,encoding:'utf8',timeout:15000});assert.equal(check.status,0);assert.equal(check.stdout.trim(),'tmpfs','E_REMEDIATION_NOT_TMPFS');
 const p=readProject(await fs.readFile('assets/product/preview-project.json','utf8')).project,resources=new Map();
 for(const a of p.assets)resources.set(a.id,await fs.readFile(path.join('assets/product/preview',a.fingerprint.sha256+'.png')));
 const updated=editProject(p,d=>{d.displayName='actual-filesystem-space-retry';});
 const old=await encodeBundle(p,resources,'manual'),next=await encodeBundle(updated,resources,'manual');
 const results=[];
 for(const kind of ['new','existing','autosave'])for(let attempt=1;attempt<=3;attempt++){
  stage=kind+'-'+attempt;const directory=path.join(root,nonce+'-'+stage);assert.ok(directory.startsWith(root+path.sep));await fs.mkdir(directory);
  const target=path.join(directory,'normal.2dsketch'),backup=path.join(directory,'backup.2dsketch'),filler=path.join(directory,'filler.bin');
  await atomicBundle(target,old,{expectedHash:null});assert.equal((await readBundle(target,false)).fileHash,sha256(old));
  const catalog=new ProjectCatalog(path.join(directory,'catalog'));await catalog.init();
  const previous=kind==='autosave'?await catalog.record(p,resources,'autosave',target,'last-known-recovery'):null;
  const beforeRecovery=previous?await readBundle(catalog.file(previous.id),false):null;
  let rawCode=null;const handle=await fs.open(filler,'wx');
  try{const block=Buffer.alloc(1024*1024,0x47);for(let i=0;i<64;i++)await handle.write(block);throw Error('E_REMEDIATION_NOT_BOUNDED');}
  catch(e){rawCode=e.code;assert.equal(rawCode,'ENOSPC','E_REMEDIATION_REAL_ENOSPC_REQUIRED');const info=await handle.stat();await handle.truncate(Math.max(0,info.size-256*1024));}
  finally{await handle.close();}
  let code=null;const destination=kind==='new'?path.join(directory,'new.2dsketch'):target;
  try{if(kind==='autosave')await catalog.record(updated,resources,'autosave',target,'actual-full-filesystem');
      else await atomicBundle(destination,next,{expectedHash:kind==='new'?null:sha256(old),backup:bytes=>fs.writeFile(backup,bytes)});}
  catch(e){code=storageError(e);}assert.equal(code,'E_SAVE_SPACE','E_REMEDIATION_PRODUCT_SPACE_ERROR');
  assert.equal(sha256(await fs.readFile(target)),sha256(old));
  if(previous)assert.equal((await readBundle(catalog.file(previous.id),false)).fileHash,beforeRecovery.fileHash);
  if(kind==='new')assert.equal(await fs.stat(destination).then(()=>true,()=>false),false);
  await fs.unlink(filler);
  if(kind==='autosave'){const recovered=await catalog.record(updated,resources,'autosave',target,'retry-after-free-space');assert.equal((await readBundle(catalog.file(recovered.id),false)).project.displayName,updated.displayName);}
  else{await atomicBundle(destination,next,{expectedHash:kind==='new'?null:sha256(old),backup:bytes=>fs.writeFile(backup,bytes)});assert.equal((await readBundle(destination,false)).project.displayName,updated.displayName);}
  const other=path.resolve('.local/remediation-saveas',nonce+'-'+kind+'-'+attempt+'.2dsketch');await fs.mkdir(path.dirname(other),{recursive:true});await atomicBundle(other,next,{expectedHash:null});assert.equal((await readBundle(other,false)).fileHash,sha256(next));
  results.push({kind,attempt,passed:true,actualOSCode:rawCode,productCode:code,lastNormalPreserved:true,previousRecoveryPreserved:!!previous,partialNewFileNotPublished:kind==='new',retryAfterFreeSpace:true,saveToOtherWindowsLocation:true});
  assert.ok(path.resolve(directory).startsWith(path.resolve(root)+path.sep));await fs.rm(directory,{recursive:true,force:true});
 }
 await fs.writeFile(path.join(out,'space.json'),JSON.stringify({passed:true,tests:results,filesystem:'owned WSL2 32 MiB tmpfs accessed by Windows Node over local WSL filesystem bridge',actualFilesystemExhaustion:true,faultInjectionUsed:false,normalWindowsDriveFilled:false,hostSecuritySettingsChanged:false,existingDistroModified:false,scope:'actual space exhaustion and retry; not NTFS crash durability or clean Windows support'},null,2)+'\n');
 console.log('Nine actual full-filesystem cases preserved normal/recovery files and retried successfully.');
})().catch(async e=>{await fs.mkdir(out,{recursive:true});await fs.writeFile(path.join(out,'failure.json'),JSON.stringify({passed:false,stage,code:e.message.match(/E_[A-Z0-9_]+/)?.[0]??'E_REMEDIATION_SPACE',osCode:['ENOSPC','EACCES','EIO','ENOENT','EINVAL'].includes(e.code)?e.code:null})+'\n');console.error('E_REMEDIATION_SPACE');process.exitCode=1;}).finally(()=>{if(ownedDistro)spawnSync('wsl.exe',['--terminate',ownedDistro],{windowsHide:true,stdio:'ignore',timeout:30000});keeper?.kill();});
