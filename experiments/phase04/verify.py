"""Contract, invalid-input, recovery and actual-artifact checks for the feasibility spike."""
import io,json,struct,math,time
from pathlib import Path
import numpy as np
from PIL import Image
from tracking import BASE,engine,Controller
from runtime import compact
from preview_renderer import PreviewRenderer

def run():
    checks=[]
    def check(name,ok,detail=None):
        checks.append({'name':name,'pass':bool(ok),'detail':detail})
        if not ok:print('FAIL',name,detail)
    face={'blink_left':0.,'blink_right':0.,'jaw':0.,'yaw':12.,'roll':-5.}
    c=Controller();c.calibrate([face]*5)
    for i in range(100):v=c.update(face,None,i/30,1/30)
    check('neutral calibration removes measured head offset',abs(v['head_yaw'])<1e-6 and abs(v['head_roll'])<1e-6)
    f=dict(face,yaw=42.,roll=20.,jaw=.06,blink_left=1.)
    for i in range(100):v=c.update(f,None,4+i/30,1/30)
    check('face controls reach contract eye/mouth/head ranges',v['eye_left']<.01 and v['eye_right']>.99 and .7<v['mouth']<.74 and v['head_yaw']>.99 and v['head_roll']>.99)
    c.sign['yaw']=-1;c.gain['roll']=.25
    for i in range(100):v=c.update(f,None,8+i/30,1/30)
    check('direction and gain settings invert yaw/reduce roll',v['head_yaw']<-.99 and abs(v['head_roll']-.25)<.01)
    before=dict(v);v=c.update(dict(f,yaw=-999),None,12,10)
    check('long capture gap cannot cause parameter jump',max(abs(v[k]-before[k]) for k in v)<=.200001)
    for i in range(200):v=c.update(None,None,13+i/30,1/30)
    check('lost face decays to neutral',max(abs(v[k]-engine.PARAMS[k]) for k in v)<.001)
    for i in range(200):v=c.update(dict(f,yaw=float('nan')),float('nan'),20+i/30,1/30)
    check('invalid face/volume values fall back safely',all(math.isfinite(x) for x in v.values()) and v['mouth']<.001)
    c=Controller();c.mouth_source='microphone';c.mic_threshold=.005
    v=c.update(None,.05,0,1/30)
    for i in range(60):v=c.update(None,.05,i/30,1/30)
    check('microphone owns mouth without a face',v['mouth']>.53 and v['eye_left']>.99)
    c.mic_gain=4
    for i in range(60):v=c.update(None,.05,3+i/30,1/30)
    check('microphone gain reduces same RMS response',abs(v['mouth']-.18)<.001)
    for i in range(100):v=c.update(None,None,5+i/30,1/30)
    check('microphone disconnect returns mouth to closed',v['mouth']<.001)
    for route in ['parts','single','split']:
        p=engine.load_project(BASE.parent/f'phase03/results/projects/{route}/project.json')
        a=engine.render(p);b=engine.render(compact(p))
        check(f'crop preserves {route} neutral reference pixels',np.array_equal(a,b))
        r=PreviewRenderer(p);a=np.array(r.render({'mouth':1,'eye_left':0,'head_roll':.3}))
        check(f'preview accepts shared {route} control contract',a.shape[2]==4 and np.any(a[:,:,3]>0))
    p=engine.load_project(BASE/'assets/premium/project/project.json');r=PreviewRenderer(p)
    neutral=np.array(r.render({}));blink=np.array(r.render({'eye_left':0,'eye_right':0}));talk=np.array(r.render({'mouth':1}))
    check('premium authored eye states visibly differ',np.abs(neutral.astype(int)-blink.astype(int)).sum()>10000)
    check('premium authored mouth states visibly differ',np.abs(neutral.astype(int)-talk.astype(int)).sum()>10000)
    blob=(BASE/'exports/PREMIUM-003.inp').read_bytes();check('native INP header',blob[:8]==b'TRNSRTS\0')
    n=struct.unpack_from('>I',blob,8)[0];model=json.loads(blob[12:12+n]);off=12+n
    check('all five normalized native parameters exported',set(q['name'] for q in model['param'])==set(engine.PARAMS))
    check('native demo contains eye mouth and head animation lanes',len(model['animations']['phase04-demo']['lanes'])==5)
    check('texture section present',blob[off:off+8]==b'TEX_SECT');off+=8
    count=struct.unpack_from('>I',blob,off)[0];off+=4;textures=[]
    for i in range(count):
        size,kind=struct.unpack_from('>IB',blob,off);off+=5
        im=np.array(Image.open(io.BytesIO(blob[off:off+size])).convert('RGBA'));off+=size;textures.append(im)
    check('all exported textures use target premultiplied alpha',all(np.all(im[:,:,:3]<=im[:,:,3:4]) for im in textures))
    check('premium exports seven independently textured states',count==7)
    check('native extension section present',blob[off:off+8]==b'EXT_SECT');off+=8
    extcount,namelen=struct.unpack_from('>II',blob,off);off+=8;name=blob[off:off+namelen].decode();off+=namelen
    length=struct.unpack_from('>I',blob,off)[0];off+=4;ext=json.loads(blob[off:off+length]);off+=length
    check('autonomous demo loads, loops and survives inactive tracking zone',ext[0]['playEvent']==1 and ext[0]['loop'] and ext[0]['fullStopEvent']==0)
    check('native container has no trailing/lost payload',off==len(blob))
    independent=json.loads((BASE/'results/external-independent.json').read_text(encoding='utf-8'))
    check('actual official external runtime independent motion proof',independent['pass'] and independent['model_sha256']==engine.sha(BASE/'exports/PREMIUM-003.inp'))
    recovery=json.loads((BASE/'results/device-recovery.json').read_text(encoding='utf-8'))
    check('real device release/reopen recovered frames',recovery['reconnected_frames']>0 and recovery['neutral_error_after_2s']<.001)
    check('real recovery/controller step remains bounded',recovery['max_observed_parameter_step']<=.20001)
    mic=[]
    for stage in ['quiet','speech','noise']:
        d=json.loads((BASE/f'results/mic-{stage}.json').read_text(encoding='utf-8'));mic.append(d)
        check(f'real microphone {stage} captures callbacks without errors',d['blocks']>100 and not d['callback_errors'])
        response=[v['active_fraction'] for v in d['sensitivity']]
        check(f'{stage} sensitivity gate is monotonic',all(a>=b for a,b in zip(response,response[1:])))
    # Reproduce the *derived* real RMS through mouth control; no original audio replay.
    mouth=[];c=Controller();c.mouth_source='microphone';c.mic_threshold=.005
    for stage in mic:
        for row in stage['samples']:
            mouth.append({'stage':stage['stage'],'rms':row['rms'],'mouth':c.update(None,row['rms'],0,.025)['mouth']})
    engine.json_write(BASE/'results/mic-mouth-replay.json',{'source':'Actual RMS only; not raw audio/live replay','threshold':.005,'gain':12,'samples':mouth})
    prior=json.loads((BASE.parent/'phase03/results/verification.json').read_text(encoding='utf-8'))
    check('phase03 historical source snapshots unchanged',all(engine.sha(BASE.parent/'phase03'/name)==digest for name,digest in prior['code_sha256'].items()))
    alpha=json.loads((BASE/'results/obs-alpha-composite.json').read_text(encoding='utf-8'))
    check('actual OBS two-background composition preserves transparency',alpha['pass'] and len(alpha['checks'])==2)
    encoded=json.loads((BASE/'results/obs-encoded-load.json').read_text(encoding='utf-8'))
    inspection=json.loads((BASE/'results/recording-inspection.json').read_text(encoding='utf-8'))
    video=BASE/inspection['preserved_avatar_video']
    check('actual local encoder file finalized with matching preserved hash',encoded['conditions']['recording_started'] and engine.sha(video)==inspection['sha256']==encoded['recording']['sha256'])
    check('actual recording decodes moving avatar frames at expected video mode',inspection['decoded_samples']==4 and inspection['fps']==30 and inspection['size']==[1280,720] and min(inspection['sample_diff_from_first'][1:])>0)
    live=json.loads((BASE/'results/runtime-encoded-final-live.json').read_text(encoding='utf-8'))
    check('successful encoding session used real face input and browser frame consumption',live['input_mode']=='live' and sum(row['face_found'] for row in live['input'])>20 and len(live['browser_ack'])>20 and not live['errors'])
    result={'created':time.strftime('%Y-%m-%dT%H:%M:%S%z'),'passed':sum(q['pass'] for q in checks),'total':len(checks),'checks':checks,
            'code_sha256':{str(p.name):engine.sha(p) for p in sorted(BASE.glob('*.py'))}}
    engine.json_write(BASE/'results/verification.json',result);print(result['passed'],'/',result['total'])
    if result['passed']!=result['total']:raise SystemExit(1)

if __name__=='__main__':run()
