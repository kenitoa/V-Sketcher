"""Real OBS compositor + avatar renderer measurement; no internet broadcast."""
import sys, time, json, urllib.request, subprocess
from pathlib import Path
import psutil, numpy as np
from PIL import Image
from obs_control import OBSClient,BASE
from tracking import engine

def run(seconds=30,port=18764,out='obs-load.json',record=False):
    c=OBSClient();rows=[]
    recording=None
    if record:
        if c.request('GetRecordStatus')['outputActive']:raise RuntimeError('recording_already_active')
        for v in c.request('GetSpecialInputs').values():
            if v:
                c.request('SetInputMute',inputName=v,inputMuted=True)
                assert c.request('GetInputMute',inputName=v)['inputMuted']
        enabled=[v['sourceName'] for v in c.request('GetSceneItemList',sceneName='Phase04Avatar')['sceneItems'] if v['sceneItemEnabled']]
        if enabled!=['AvatarRGBA']:raise RuntimeError('record_requires_avatar_only_scene')
        folder=BASE/'.local/recordings';folder.mkdir(parents=True,exist_ok=True)
        c.request('SetRecordDirectory',recordDirectory=str(folder))
        for category,name,value in [('Output','Mode','Simple'),('SimpleOutput','RecQuality','Small'),('SimpleOutput','RecEncoder','x264'),('SimpleOutput','RecFormat2','mkv')]:
            c.request('SetProfileParameter',parameterCategory=category,parameterName=name,parameterValue=value)
        # SetProfileParameter saves values but does not rebuild the output handler.
        # Reload our isolated profile so the actual encoder/container match them.
        profiles=c.request('GetProfileList');current=profiles['currentProfileName']
        other=next((name for name in profiles['profiles'] if name!=current),None)
        if other is None:
            other='Phase04-OutputInit';c.request('CreateProfile',profileName=other)
        c.request('SetCurrentProfile',profileName=other);time.sleep(.3)
        c.request('SetCurrentProfile',profileName=current);time.sleep(.3)
        c.request('StartRecord')
        for _ in range(30):
            if c.request('GetRecordStatus')['outputActive']:break
            time.sleep(.2)
        else:raise RuntimeError('recording_start_response_did_not_produce_active_output')
    def processes():
        result=[]
        for p in psutil.process_iter(['pid','name','cmdline']):
            cmd=' '.join(p.info['cmdline'] or []).replace('\\','/')
            if (p.info['name'] or '').lower() in ['obs64.exe','obs-browser-page.exe','obs-ffmpeg-mux.exe'] or (any(s in cmd for s in ['phase04/runtime.py','phase04/demo.py']) and 'python' in (p.info['name'] or '').lower()):
                result.append(p)
        return result
    procs=processes()
    for p in procs:p.cpu_percent()
    start=time.monotonic();before=c.request('GetStats')
    while time.monotonic()-start<seconds:
        time.sleep(1)
        items=[]
        for p in procs:
            try:items.append({'pid':p.pid,'name':p.name(),'cpu_one_core_percent':p.cpu_percent(),'rss_mib':p.memory_info().rss/2**20})
            except psutil.Error:pass
        rows.append({'t':time.monotonic()-start,'obs':c.request('GetStats'),'processes':items,'system_cpu_percent':psutil.cpu_percent()})
    state=json.load(urllib.request.urlopen(f'http://127.0.0.1:{port}/state'))
    end=state['frames'][-1]['t'];recent=[f for f in state['frames'] if f['t']>=end-seconds]
    indexed={f['seq']:f for f in state['frames']};ages=[];seen=set()
    for ack in state['browser_ack']:
        if ack['seq'] in indexed and ack['seq'] not in seen and ack['t']>=end-seconds:
            ages.append(max(0,(ack['t']-indexed[ack['seq']]['t'])*1000));seen.add(ack['seq'])
    def stats(vals):return {k:float(v) for k,v in zip(['min','p50','p95','max'],np.percentile(vals,[0,50,95,100]))} if vals else None
    screenshot=BASE/'results'/(Path(out).stem+'-source.png')
    after=c.request('GetStats');c.screenshot('AvatarRGBA',screenshot)
    if record:
        status=c.request('GetRecordStatus');saved=c.request('StopRecord');file=Path(saved['outputPath'])
        # The frontend response can precede the muxer draining/closing its file.
        stable=0;previous=-1
        for _ in range(50):
            size=file.stat().st_size if file.exists() else 0
            stable=stable+1 if size>0 and size==previous else 0
            if stable>=5:break
            previous=size;time.sleep(.2)
        recording={'path':str(file.relative_to(BASE)).replace('\\','/'),'bytes':file.stat().st_size,'sha256':engine.sha(file),
                   'output_duration_ms':status['outputDuration'],'output_bytes':status['outputBytes'],
                   'settings':'isolated SimpleOutput RecEncoder=x264 RecQuality=Small RecFormat2=mkv',
                   'content':'avatar only, all special desktop/microphone sources muted; no raw camera/audio source'}
    im=np.array(Image.open(screenshot).convert('RGBA'));alpha=im[:,:,3]
    gpu=subprocess.run(['nvidia-smi','--query-gpu=name,utilization.gpu,memory.used','--format=csv,noheader,nounits'],capture_output=True,text=True)
    result={'duration_s':time.monotonic()-start,'source_screenshot':str(screenshot.relative_to(BASE)).replace('\\','/'),
        'conditions':{'input':state['input_mode'],'renderer':state['renderer'],'avatar_canvas':state['size'],
        'obs_video':c.request('GetVideoSettings'),'stream_started':False,'recording_started':record,
        'latency_definition':'PNG published to first browser decode acknowledgement; excludes camera exposure, display scanout and network stream'},
        'version':{k:v for k,v in c.request('GetVersion').items() if k!='availableRequests'},
        'summary':{'avatar_unique_fps':(len(recent)-1)/(recent[-1]['t']-recent[0]['t']) if len(recent)>1 else 0,
        'render_encode_ms':stats([f['ms'] for f in recent]),'publish_to_browser_ack_ms':stats(ages),
        'browser_unique_acks':len(ages),'obs_skipped_delta':after['renderSkippedFrames']-before['renderSkippedFrames'],
        'obs_frames_delta':after['renderTotalFrames']-before['renderTotalFrames'],
        'source_alpha':{'transparent_pixels':int((alpha==0).sum()),'partial_pixels':int(((alpha>0)&(alpha<255)).sum()),'opaque_pixels':int((alpha==255).sum())}},
        'gpu_snapshot':gpu.stdout.strip(),'rows':rows,'input_errors':state['errors'],'recording':recording}
    engine.json_write(BASE/'results'/out,result);c.close();print(json.dumps(result['summary']))

if __name__=='__main__':
    import argparse
    p=argparse.ArgumentParser();p.add_argument('--seconds',type=float,default=30);p.add_argument('--port',type=int,default=18764);p.add_argument('--out',default='obs-load.json');p.add_argument('--record',action='store_true')
    a=p.parse_args();run(a.seconds,a.port,a.out,a.record)
