"""Human prompted, isolated real microphone RMS stages; never saves PCM."""
import argparse,time,json
import numpy as np
from tracking import Microphone,BASE,engine

def run(stage,seconds=8):
    mic=Microphone();rows=[];start=time.monotonic()
    try:
        while time.monotonic()-start<seconds:
            rows.append({'t':time.monotonic()-start,'rms':mic.rms});time.sleep(.025)
    finally:mic.close()
    vals=np.array([r['rms'] for r in rows[4:]])
    result={'stage':stage,'created':time.strftime('%Y-%m-%dT%H:%M:%S%z'),'duration':seconds,
            'label_evidence':'Separate user-facing start instruction; no automatic speech classification',
            'device':mic.device,'sample_rate':mic.rate,'callback_errors':mic.errors,'blocks':mic.blocks,
            'raw_audio_saved':False,'rms_percentiles':dict(zip(['min','p50','p95','max'],[float(v) for v in np.percentile(vals,[0,50,95,100])])),
            'sensitivity':[{'threshold':t,'gain':12,'active_fraction':float((vals>t).mean()),
                            'mean_mouth':float(np.clip((vals-t)*12,0,1).mean())} for t in [.005,.015,.03,.06]],'samples':rows}
    engine.json_write(BASE/f'results/mic-{stage}.json',result);print(json.dumps({k:v for k,v in result.items() if k!='samples'}))

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('stage',choices=['quiet','speech','noise']);p.add_argument('--seconds',type=float,default=8)
    a=p.parse_args();run(a.stage,a.seconds)
