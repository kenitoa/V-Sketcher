const {app}=require('electron'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),arg=k=>process.argv.find(v=>v.startsWith('--'+k+'='))?.slice(k.length+3),bridge=path.resolve(arg('broadcast-obs-bridge')),profile=path.resolve(arg('profile-dir')),out=path.resolve(arg('linear-output')),library=path.resolve(arg('linear-library'));
app.setAppPath(root);let window,busy=false,seen='',loaded=false;app.on('browser-window-created',(_,w)=>{if(!window)window=w;});
const hash=data=>crypto.createHash('sha256').update(data).digest('hex');
const timer=setInterval(async()=>{if(busy||!window||!fs.existsSync(path.join(bridge,'ready.json')))return;busy=true;
try{if(!loaded){await window.webContents.executeJavaScript(fs.readFileSync(library,'utf8')+'\n;true');await window.webContents.executeJavaScript(fs.readFileSync(path.join(root,'tools/remediation-flow.js'),'utf8')+'\n;true');loaded=true;}
 const request=path.join(bridge,'linear-request.json');if(!fs.existsSync(request))return;const q=JSON.parse(fs.readFileSync(request));if(q.id===seen)return;seen=q.id;
 if(!/^[a-f0-9-]{36}$/.test(q.id)||!['parts','single-image','split-image'].includes(q.route)||![1,2].includes(q.version))throw Error('E_LINEAR_REQUEST');
 const value=await window.webContents.executeJavaScript(`window.remediationFlow(${JSON.stringify(q.route)},${q.version})`),images=[];
 for(const image of value.artifacts){const row={route:image.route,label:image.label};for(const kind of ['original','converted','target']){const name=image.route+'-'+image.label+'-'+kind+'.png';fs.writeFileSync(path.join(out,name),Buffer.from(image[kind].split(',')[1],'base64'));row[kind]=name;}images.push(row);}delete value.artifacts;
 const name='avatar-'+q.route+'-v'+q.version+'.inp',bytes=fs.readFileSync(path.join(profile,value.avatar.name));if(hash(bytes)!==value.avatar.sha256)throw Error('E_LINEAR_FILE_HASH');fs.writeFileSync(path.join(out,name),bytes);
 const png=fs.readFileSync(path.join(profile,value.png.name));if(hash(png)!==value.png.sha256)throw Error('E_LINEAR_PNG_HASH');const pngName=q.route+'-v'+q.version+'.png';fs.writeFileSync(path.join(out,pngName),png);
 const report={...value,output:undefined,images,file:{...value.avatar,route:q.route,version:q.version,name},png:{...value.png,name:pngName}};
 fs.writeFileSync(path.join(out,q.route+'-v'+q.version+'.json'),JSON.stringify(report,null,2)+'\n');fs.writeFileSync(path.join(bridge,'linear-reply.json'),JSON.stringify({id:q.id,passed:true,route:q.route,version:q.version}));
}catch(e){fs.writeFileSync(path.join(bridge,'linear-reply.json'),JSON.stringify({id:seen,passed:false,code:e.message.match(/E_[A-Z0-9_]+/)?.[0]??'E_LINEAR_CHECK'}));}finally{busy=false;}},100);timer.unref();require(path.join(root,'dist/electron/apps/desktop/main.js'));
