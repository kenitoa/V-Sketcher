/* Processes in memory. Posts only bounded aggregate levels; no PCM messages or audio output. */
class LevelProcessor extends AudioWorkletProcessor {
  sum=0;peak=0;count=0;
  process(inputs,outputs) {
    for(const output of outputs)for(const channel of output)channel.fill(0);
    const channels=inputs[0];if(!channels?.length)return true;
    const length=channels[0].length;
    for(let i=0;i<length;i++){let energy=0;for(const channel of channels){const v=channel[i];if(Number.isFinite(v)){energy+=v*v;this.peak=Math.max(this.peak,Math.abs(v));}}this.sum+=energy/channels.length;this.count++;}
    if(this.count>=sampleRate*.05){this.port.postMessage({rms:Math.min(1,Math.sqrt(this.sum/this.count)),peak:Math.min(1,this.peak),time:currentTime,frames:currentFrame});this.sum=0;this.peak=0;this.count=0;}
    return true;
  }
}
registerProcessor('local-level',LevelProcessor);
