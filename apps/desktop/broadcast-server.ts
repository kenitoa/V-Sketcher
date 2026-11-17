import {createServer,type Server,type IncomingMessage,type ServerResponse} from 'node:http';
import {readFile,mkdir,rename,writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {randomBytes} from 'node:crypto';
import {parameters,validateScene,NEUTRAL} from '../../packages/scene-core';
import {assertOutputSettings,defaultOutputSettings,type OutputSettings,type OutputFrame,type OutputSource,type OutputView,type OutputConfirmation} from '../../packages/broadcast';

interface Profile {version:1;port:number;token:string;settings:OutputSettings;previous:OutputSettings|null;settingsVersion:number;history:OutputConfirmation[];}
export class BroadcastServer {
 private profile:Profile={version:1,port:0,token:randomBytes(32).toString('hex'),settings:defaultOutputSettings(),previous:null,settingsVersion:1,history:[]};
 private server:Server|null=null;private source:OutputSource|null=null;private prior:OutputSource|null=null;private frame:OutputFrame|null=null;private received=0;
 private state:OutputView['state']='OFF';private errorCode:string|null=null;private generation=0;private busy=false;
 private clients=new Map<string,{at:number;ready:boolean;width:number;height:number;failed:boolean}>();
 private listeners=new Set<()=>void>();private heartbeat:ReturnType<typeof setInterval>|null=null;
 constructor(private directory:string,private rendererRoot:string,private now=Date.now){}
 subscribe(fn:()=>void):()=>void{this.listeners.add(fn);return()=>this.listeners.delete(fn);}
 private emit():void{for(const fn of this.listeners)fn();}
 async init():Promise<void>{
  await mkdir(this.directory,{recursive:true});
  try{const v=JSON.parse(await readFile(join(this.directory,'broadcast.json'),'utf8')) as Profile;
   assertOutputSettings(v.settings);if(v.version!==1||!Number.isInteger(v.port)||v.port<0||v.port>65535||!/^[a-f0-9]{64}$/.test(v.token)||!Number.isSafeInteger(v.settingsVersion)||v.settingsVersion<1||!Array.isArray(v.history)||v.history.length>20)throw new Error();
   if(v.previous)assertOutputSettings(v.previous);this.profile=v;
  }catch(e){if((e as NodeJS.ErrnoException).code!=='ENOENT'){this.state='FAILED';this.errorCode='E_OUTPUT_PROFILE';}}
  this.heartbeat=setInterval(()=>{this.prune();this.emit();},1000);this.heartbeat.unref();
 }
 private async save(next:Profile):Promise<void>{const file=join(this.directory,'broadcast.json');await writeFile(file+'.pending',JSON.stringify(next),{mode:0o600});await rename(file+'.pending',file);}
 private prune():void{for(const [id,c]of this.clients)if(this.now()-c.at>4000)this.clients.delete(id);}
 view():OutputView{
  this.prune();const confirmation=this.profile.history.at(-1)??null;const values=[...this.clients.values()];
  return {state:this.state,health:values.some(c=>c.failed)?'CLIENT_FAILED':this.state==='SOURCE_READY'&&this.received>0&&this.now()-this.received>1000?'STALE':values.some(c=>c.ready)?'RENDERING':'WAITING',settings:structuredClone(this.profile.settings),previous:structuredClone(this.profile.previous),settingsVersion:this.profile.settingsVersion,sourceId:this.source?.id??null,sourceRevision:this.source?.revision??null,hidden:this.frame?.hidden??true,pageConsumers:values.filter(c=>c.ready).length,viewportMismatch:values.some(c=>c.width!==this.profile.settings.width||c.height!==this.profile.settings.height),confirmation:structuredClone(confirmation),confirmationCurrent:!!confirmation&&this.state==='SOURCE_READY'&&confirmation.settingsVersion===this.profile.settingsVersion&&confirmation.sourceId===this.source?.id,errorCode:this.errorCode};
 }
 /** Deliberately separate from normal state/logs: the URL contains a read capability. */
 url():string|null{return this.server?`http://127.0.0.1:${this.profile.port}/b/${this.profile.token}/`:null;}
 private async listen():Promise<void>{
  if(this.server)return;
  const server=createServer((q,s)=>{void this.handle(q,s).catch(()=>{if(!s.headersSent)s.writeHead(500);s.end();});});server.requestTimeout=3000;server.headersTimeout=3000;server.maxHeadersCount=24;
  try{await new Promise<void>((ok,no)=>{server.once('error',no);server.listen(this.profile.port,'127.0.0.1',()=>{server.removeListener('error',no);ok();});});
   const port=(server.address() as {port:number}).port;await this.save({...this.profile,port});this.profile.port=port;this.server=server;server.on('error',()=>{this.state='FAILED';this.errorCode='E_OUTPUT_LISTEN';this.emit();});
  }catch{server.close();throw new Error('E_OUTPUT_PORT');}
 }
 async start(source:OutputSource):Promise<OutputView>{
  if(this.busy)throw new Error('E_OUTPUT_BUSY');this.busy=true;if(!this.heartbeat){this.heartbeat=setInterval(()=>{this.prune();this.emit();},1000);this.heartbeat.unref();}const generation=++this.generation;this.state='PREPARING';this.errorCode=null;this.emit();
  try{validateScene(source.scene);await this.listen();if(generation!==this.generation)return this.view();this.setSource(source);this.state='SOURCE_READY';this.emit();return this.view();}
  catch(e){if(generation===this.generation){this.state='FAILED';this.errorCode=e instanceof Error&&e.message==='E_OUTPUT_PORT'?'E_OUTPUT_PORT':'E_OUTPUT_START';this.emit();}return this.view();}finally{this.busy=false;}
 }
 setSource(source:OutputSource):void{if(this.state==='OFF')return;validateScene(source.scene);if(this.source?.id!==source.id){this.prior=this.source;this.source=source;this.frame=null;this.received=0;this.clients.clear();this.emit();}}
 publish(value:OutputFrame):void{
  if(this.state!=='SOURCE_READY'||!this.source||value.sourceId!==this.source.id||!Number.isSafeInteger(value.seq)||value.seq<0||typeof value.hidden!=='boolean'||this.frame&&value.seq<=this.frame.seq)return;
  try{if(Object.keys(value).sort().join(',')!=='hidden,parameters,seq,sourceId'||Object.keys(value.parameters).sort().join(',')!==Object.keys(NEUTRAL).sort().join(','))return;this.frame={...value,parameters:parameters(value.parameters)};this.received=this.now();}catch{/* invalid input never becomes broadcast state */}
 }
 stop():OutputView{++this.generation;this.state='OFF';this.source=this.prior=null;this.frame=null;this.received=0;this.clients.clear();this.errorCode=null;this.emit();return this.view();}
 async configure(settings:OutputSettings):Promise<OutputView>{
  assertOutputSettings(settings);if(this.busy)throw new Error('E_OUTPUT_BUSY');this.busy=true;
  try{const next={...this.profile,settings:structuredClone(settings),previous:this.profile.settings,settingsVersion:this.profile.settingsVersion+1};await this.save(next);this.profile=next;this.clients.clear();this.emit();return this.view();}finally{this.busy=false;}
 }
 async restore():Promise<OutputView>{if(!this.profile.previous)throw new Error('E_OUTPUT_SETTINGS');return this.configure(this.profile.previous);}
 async rotate():Promise<OutputView>{if(this.busy)throw new Error('E_OUTPUT_BUSY');this.busy=true;try{const next={...this.profile,token:randomBytes(32).toString('hex'),settingsVersion:this.profile.settingsVersion+1};await this.save(next);this.profile=next;this.clients.clear();this.emit();return this.view();}finally{this.busy=false;}}
 async confirm(input:{targetVersion:string;settingsVersion:number;sourceId:string;checks:OutputConfirmation['checks']}):Promise<OutputView>{
  if(this.busy)throw new Error('E_OUTPUT_BUSY');if(!input||Object.keys(input).sort().join(',')!=='checks,settingsVersion,sourceId,targetVersion'||input.targetVersion!=='33.0.1'||input.settingsVersion!==this.profile.settingsVersion||input.sourceId!==this.source?.id||this.state!=='SOURCE_READY'||!input.checks||Object.keys(input.checks).sort().join(',')!=='alpha,expression,motion,shortcut'||!Object.values(input.checks).every(v=>v===true))throw new Error('E_OUTPUT_CONFIRM');
  this.busy=true;try{const record:OutputConfirmation={...structuredClone(input),method:'USER_CONFIRMED',target:'OBS Studio',at:new Date(this.now()).toISOString()};const next={...this.profile,history:[...this.profile.history,record].slice(-20)};await this.save(next);this.profile=next;this.emit();return this.view();}finally{this.busy=false;}
 }
 async close():Promise<void>{this.stop();if(this.heartbeat)clearInterval(this.heartbeat);this.heartbeat=null;const server=this.server;this.server=null;if(server){server.closeAllConnections();await new Promise<void>(r=>server.close(()=>r()));}}
 private async handle(q:IncomingMessage,s:ServerResponse):Promise<void>{
  s.setHeader('Cache-Control','no-store');s.setHeader('Referrer-Policy','no-referrer');s.setHeader('X-Content-Type-Options','nosniff');s.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'");
  const prefix=`/b/${this.profile.token}/`,raw=q.url??'';
  if(q.headers.host!==`127.0.0.1:${this.profile.port}`||!['127.0.0.1','::ffff:127.0.0.1'].includes(q.socket.remoteAddress??'')||!raw.startsWith(prefix)||/[?%\\\0]/.test(raw)||raw.includes('..')){s.writeHead(403);s.end();return;}
  const path=raw.slice(prefix.length);const json=(value:unknown)=>{s.setHeader('Content-Type','application/json');s.end(JSON.stringify(value));};
  if(q.method==='POST'&&path==='ack'){
   if(q.headers.origin!==`http://127.0.0.1:${this.profile.port}`||Number(q.headers['content-length']??0)>1024){s.writeHead(403);s.end();return;}
   let body='';for await(const chunk of q){body+=chunk;if(body.length>1024){s.writeHead(413);s.end();return;}}
   try{const a=JSON.parse(body) as {clientId:string;sourceId:string;settingsVersion:number;ready:boolean;width:number;height:number};if(Object.keys(a).sort().join(',')!=='clientId,height,ready,settingsVersion,sourceId,width'||!/^[a-f0-9-]{36}$/.test(a.clientId)||a.sourceId!==this.source?.id||a.settingsVersion!==this.profile.settingsVersion||typeof a.ready!=='boolean'||![a.width,a.height].every(n=>Number.isInteger(n)&&n>0&&n<=8192))throw new Error();this.prune();if(this.clients.has(a.clientId)||this.clients.size<16)this.clients.set(a.clientId,{at:this.now(),ready:a.ready,width:a.width,height:a.height,failed:!a.ready});json({ok:true});}catch{s.writeHead(400);s.end();}return;
  }
  if(q.method!=='GET'){s.writeHead(405);s.end();return;}
  if(path==='state'){json({protocol:1,state:this.state,sourceId:this.source?.id??null,settings:this.profile.settings,settingsVersion:this.profile.settingsVersion,frame:this.now()-this.received<=1000?this.frame:null});return;}
  if(/^scene\/[a-f0-9-]{36}\.json$/.test(path)){const source=[this.source,this.prior].find(v=>v&&path===`scene/${v.id}.json`);if(source){json(source.scene);return;}}
  const source=[this.source,this.prior].find(v=>v?.assets.has(path));if(source){s.setHeader('Content-Type',path.endsWith('.png')?'image/png':'image/jpeg');s.end(source.assets.get(path));return;}
  if(path===''||path==='output.html'||/^assets\/[A-Za-z0-9_-]+\.(js|css)$/.test(path)){
   try{const content=await readFile(join(this.rendererRoot,path||'output.html'));s.setHeader('Content-Type',path.endsWith('.js')?'text/javascript':path.endsWith('.css')?'text/css':'text/html; charset=utf-8');s.end(content);return;}catch{/* return empty 404, never a filesystem error */}
  }
  s.writeHead(404);s.end();
 }
}
