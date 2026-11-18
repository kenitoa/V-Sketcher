// Owned test processes deliberately terminate at real product persistence boundaries.
const {readFile,writeFile}=require('node:fs/promises');
const {resolve,join}=require('node:path');
const {atomicBundle}=require(resolve('.local/test-js/packages/project-storage/atomic'));
const {readBundle,sha256}=require(resolve('.local/test-js/packages/project-storage/archive'));
const {writeINP}=require(resolve('.local/test-js/packages/avatar-export/atomic'));
const {ProjectSession}=require(resolve('.local/test-js/packages/project-session'));
const hold=async phase=>{setInterval(()=>{},1000);process.send({ready:true,phase});await new Promise(()=>{});};
(async()=>{
 const job=JSON.parse(await readFile(process.argv[2],'utf8'));
 if(job.kind==='save')await atomicBundle(job.target,await readFile(job.next),{expectedHash:sha256(await readFile(job.target)),backup:b=>writeFile(job.backup,b),fault:p=>p===job.phase?hold(p):undefined});
 else if(job.kind==='export')await writeINP(job.target,await readFile(job.next),sha256(await readFile(job.target)),new AbortController().signal,p=>p===job.phase?hold(p):undefined);
 else if(job.kind==='edit'){
  const bundle=await readBundle(job.target,false),project=bundle.project;
  const bytes=new Map(project.assets.map(a=>[a.id,bundle.resources.get(a.storage.path)]));
  const s=new ProjectSession({dataDir:job.directory,dialogs:{unsaved:async()=>'discard',saveProject:async()=>null,openProject:async()=>null,relinkImage:async()=>null},bundled:project,bundledBytes:bytes,autoTimers:false});
  await s.init();await s.openFile(job.target);await s.dispatch({type:'edit',target:'project-name',id:null,parameterId:null,value:'unsaved-recoverable-edit',expectedRevision:s.view().project.revision,groupId:null});await s.autosaveDue(true);await hold('recovery-durable');
 }
})().catch(()=>{process.send?.({ready:false,code:'E_RELIABILITY_CHILD'});process.exit(1);});
