/** Runtime/device settings only: never microphone PCM or hardware names in Project. */
export interface MicrophoneProfile {version:1;key:string;noiseFloor:number;margin:number;sensitivity:number;strength:number;smoothingMs:number;}
export const microphoneDefaults=(key:string):MicrophoneProfile=>({version:1,key,noiseFloor:0,margin:.005,sensitivity:2,strength:1,smoothingMs:80});
export function assertMicrophoneProfile(v:unknown):asserts v is MicrophoneProfile {const p=v as MicrophoneProfile;if(!p||Object.keys(p).sort().join(',')!=='key,margin,noiseFloor,sensitivity,smoothingMs,strength,version'||p.version!==1||!/^[a-f0-9]{64}$/.test(p.key)||![p.noiseFloor,p.margin,p.sensitivity,p.strength,p.smoothingMs].every(Number.isFinite)||p.noiseFloor<0||p.noiseFloor>.2||p.margin<0||p.margin>.1||p.sensitivity<.1||p.sensitivity>10||p.strength<0||p.strength>2||!Number.isInteger(p.smoothingMs)||p.smoothingMs<0||p.smoothingMs>500)throw new Error('E_MIC_PROFILE');}
export class NoiseCalibration {
 private samples:number[]=[];private start=0;private previous=-1;state:'idle'|'collecting'|'ready'|'failed'|'cancelled'='idle';candidate:number|null=null;
 begin(now:number):void{this.start=now;this.previous=-1;this.samples=[];this.candidate=null;this.state='collecting';}
 cancel():void{this.samples=[];this.candidate=null;this.state='cancelled';}
 sample(rms:number,now:number):void{if(this.state!=='collecting'||!Number.isFinite(now)||now<this.start||now<=this.previous||!Number.isFinite(rms)||rms<0||rms>1)return;this.previous=now;if(now-this.start>5000||rms>.2){this.state='failed';this.candidate=null;return;}this.samples.push(rms);if(this.samples.length>=20&&now-this.start>=2000){const sorted=[...this.samples].sort((a,b)=>a-b);this.candidate=sorted[Math.floor((sorted.length-1)*.9)]!;this.state='ready';}}
}
export class MicrophoneMapper {
 private value=0;private previous:number|null=null;
 reset():void{this.value=0;this.previous=null;}
 map(rms:number,p:MicrophoneProfile,now:number):number|null{assertMicrophoneProfile(p);if(!Number.isFinite(rms)||rms<0||rms>1||!Number.isFinite(now)||now<0||this.previous!==null&&now<=this.previous)return null;const dt=this.previous===null?.05:Math.min(.1,(now-this.previous)/1000);this.previous=now;const floor=Math.min(.95,p.noiseFloor+p.margin),target=Math.max(0,Math.min(1,(rms-floor)/Math.max(.05,1-floor)*p.sensitivity*p.strength));const filtered=p.smoothingMs===0?target:this.value+(target-this.value)*(1-Math.exp(-dt/(p.smoothingMs/1000)));this.value+=Math.max(-8*dt,Math.min(8*dt,filtered-this.value));return this.value;}
}
export const inputTiming={cameraFreshMs:300,microphoneFreshMs:150,returnMs:500,recoverMs:250} as const;
/** Validate age against the live audio clock; UI and engine clocks can pause independently. */
export class AudioClock {
 private previousProcessing=-1;private previousMapped=-1;lastAgeMs:number|null=null;
 map(processingSeconds:number,contextSeconds:number,now:number):number|null {if(![processingSeconds,contextSeconds,now].every(Number.isFinite)||processingSeconds<0||contextSeconds<0||now<0||processingSeconds<=this.previousProcessing)return null;this.lastAgeMs=(contextSeconds-processingSeconds)*1000;const time=now-this.lastAgeMs;if(time<0||time<=this.previousMapped||this.lastAgeMs< -50||this.lastAgeMs>inputTiming.microphoneFreshMs)return null;this.previousProcessing=processingSeconds;this.previousMapped=time;return time;}
}
/** A delayed UI scheduler gets one short drain window; stale control packets remain excluded. */
export class InputWatchdog {
 private deferredUntil=0;private observedInput=-1;private graceUsed=false;constructor(private pollTime:number){}
 expired(now:number,lastInput:number):boolean{if(lastInput>this.observedInput){this.observedInput=lastInput;this.graceUsed=false;}if(now-this.pollTime>500&&now-lastInput>1500&&!this.graceUsed){this.deferredUntil=now+250;this.graceUsed=true;}this.pollTime=now;return now>=this.deferredUntil&&now-lastInput>1500;}
}
type Source='camera'|'microphone';
interface TransitionState {owner:Source|null;value:number;from:number;start:number;packetTime:number;}
/** Driven by display time even if device callbacks stop. Higher priority expression/test runs afterward. */
export class InputTransitions {
 private states=new Map<string,TransitionState>();
 reset():void{this.states.clear();}
 phase(now:number):'idle'|'live'|'recovering'|'returning'{if([...this.states.values()].some(s=>s.owner===null&&now-s.start<inputTiming.returnMs))return 'returning';if([...this.states.values()].some(s=>s.owner!==null&&now-s.start<inputTiming.recoverMs))return 'recovering';return this.states.size?'live':'idle';}
 frame(id:string,live:{owner:Source;value:number;time:number}|null,fallback:number,now:number):number {let s=this.states.get(id);if(!s){if(!live)return fallback;s={owner:live.owner,value:fallback,from:fallback,start:now,packetTime:live.time};this.states.set(id,s);}const owner=live?.owner??null;if(owner!==s.owner){s.from=s.value;s.start=owner===null?s.packetTime+(s.owner==='microphone'?inputTiming.microphoneFreshMs:inputTiming.cameraFreshMs):now;s.owner=owner;}else if(live&&live.time-s.packetTime>(owner==='microphone'?inputTiming.microphoneFreshMs:inputTiming.cameraFreshMs)){s.from=s.value;s.start=now;}if(live)s.packetTime=live.time;const duration=owner===null?inputTiming.returnMs:inputTiming.recoverMs;const q=Math.max(0,Math.min(1,(now-s.start)/duration)),blend=q*q*(3-2*q);s.value=s.from+((live?.value??fallback)-s.from)*blend;if(!owner&&q>=1)this.states.delete(id);return s.value;}
}
