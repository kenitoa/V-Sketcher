export interface EnvironmentSettings {
  version:1; recovery:'standard'|'frequent'|'off'; previewFps:15|30|60; previewScale:.5|.75|1;
  cameraId:string; microphoneId:string; cameraRequests:boolean; microphoneRequests:boolean; localDiagnostics:boolean;
}
export const defaults=():EnvironmentSettings=>({version:1,recovery:'standard',previewFps:30,previewScale:1,cameraId:'',microphoneId:'',cameraRequests:true,microphoneRequests:true,localDiagnostics:true});
export function assertSettings(value:unknown):asserts value is EnvironmentSettings {
  const v=value as EnvironmentSettings;
  if(!v||typeof v!=='object'||Object.keys(v).sort().join(',')!==Object.keys(defaults()).sort().join(',')||v.version!==1||!['standard','frequent','off'].includes(v.recovery)||![15,30,60].includes(v.previewFps)||![.5,.75,1].includes(v.previewScale)||![v.cameraId,v.microphoneId].every(x=>typeof x==='string'&&x.length<=512&&!/[\u0000-\u001f]/.test(x))||![v.cameraRequests,v.microphoneRequests,v.localDiagnostics].every(x=>typeof x==='boolean'))throw new Error('E_SETTINGS_VALUE');
}
export interface SettingsView {value:EnvironmentSettings;loadError:boolean;defaultFolderSet:boolean;diagnosticTransmission:false;assetTraining:false;automaticQuality:false;}
export interface MetricSummary {kind:'MEASURED'|'ESTIMATED'|'UNMEASURED';value:number|null;unit:string;windowMs:number;samples:number;}
/** Submission timing measures CPU submission, never GPU completion or sensor-to-OBS latency. */
export class RenderMetrics {
 private samples:{at:number;duration:number}[]=[]; private start=0;
 record(at:number,duration:number):void{if(!Number.isFinite(at)||!Number.isFinite(duration)||duration<0)return;if(this.samples.length&&at<this.samples.at(-1)!.at)this.reset();if(!this.start)this.start=at;this.samples.push({at,duration});this.prune(at);}
 private prune(now:number):void{this.samples=this.samples.filter(s=>s.at>=now-5000).slice(-600);}
 reset():void{this.samples=[];this.start=0;}
 summary(now:number):{fps:MetricSummary;submissionP95:MetricSummary;endToEnd:MetricSummary}{this.prune(now);const count=this.samples.length,elapsed=count?Math.min(5000,Math.max(0,now-this.start)):0,active=count>1&&now-this.samples.at(-1)!.at<1000;const durations=this.samples.map(x=>x.duration).sort((a,b)=>a-b);const base={windowMs:elapsed,samples:count};return {fps:{...base,kind:active?'MEASURED':'UNMEASURED',value:active?(count-1)*1000/Math.max(1,this.samples.at(-1)!.at-this.samples[0]!.at):null,unit:'FPS'},submissionP95:{...base,kind:active?'MEASURED':'UNMEASURED',value:active?durations[Math.ceil(count*.95)-1]!:null,unit:'ms'},endToEnd:{kind:'UNMEASURED',value:null,unit:'ms',windowMs:0,samples:0}};}
}
export interface ResourceMetrics {kind:'MEASURED';windowMs:number;processes:number;cpuPercent:number|null;rssMiB:number;gpu:'UNMEASURED';scope:'ELECTRON_PROCESSES';}
export interface SettingsAPI {
 view:()=>Promise<SettingsView>;save:(value:EnvironmentSettings)=>Promise<{ok:boolean;errorCode?:string}>;
 folder:(clear?:boolean)=>Promise<{ok:boolean;selected:boolean}>;
 metrics:()=>Promise<ResourceMetrics>;
 diagnostic:(summary:unknown)=>Promise<{ok:boolean;cancelled?:boolean;errorCode?:string}>;
 clearLogs:()=>Promise<{ok:boolean}>;notices:()=>Promise<boolean>;dataFolder:()=>Promise<boolean>;subscribe:(fn:(view:SettingsView)=>void)=>()=>void;
 support:()=>Promise<{versions:Record<string,string>;attributions:{source:string;license:string;author:string}[];noticesAvailable:boolean}>;
}
export function diagnosticData(input:unknown,versions:Record<string,string>):Record<string,unknown>{
 const v=input&&typeof input==='object'?input as Record<string,unknown>:{};
 const statuses=new Set(['idle','connecting','open','failed','starting','normal','limited','stopping']);
 const state=(key:string)=>statuses.has(String(v[key]))?v[key]:'unknown';
 const metric=(key:string)=>typeof v[key]==='number'&&Number.isFinite(v[key])&&Number(v[key])>=0&&Number(v[key])<1e9?Number(v[key]):null;
 return {format:'2DSketcher-diagnostic-1',versions,processing:'LOCAL',networkTransmission:false,assetTraining:false,states:{run:state('run'),camera:state('camera'),microphone:state('microphone')},measurements:{submittedFps:metric('fps'),cpuSubmissionP95Ms:metric('submissionP95'),endToEndLatency:'UNMEASURED',textureAllocationEstimateMiB:metric('textureMiB')},excluded:['project names and identifiers','artwork and file names','camera frames','microphone PCM','device identifiers and names','personal paths','broadcast addresses and tokens','raw errors','event logs']};
}
