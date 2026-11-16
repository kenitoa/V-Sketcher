"""Re-run product analysis on frozen inputs; never load their annotations into analyzer."""
from pathlib import Path
import hashlib,json,sys,tempfile
import numpy as np
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parent.parent
sys.path.insert(0,str(ROOT/'worker'))
from image_input import decode
from structure import analyze,build

def run():
    output=ROOT/'evidence/phase14';output.mkdir(parents=True,exist_ok=True)
    manifest=json.loads((ROOT/'experiments/phase02/assets/manifest.json').read_text(encoding='utf-8'))
    inputs=[(s['id'],ROOT/'experiments/phase02/assets'/s['path']) for s in manifest['samples'] if s['kind'] in ['single','premium']]
    p=json.loads((ROOT/'assets/product/preview-project.json').read_text(encoding='utf-8'));a=next(a for a in p['assets'] if a['id']==p['inputAssetIds'][0]);inputs.append(('PREMIUM-003',ROOT/'assets/product/preview'/(a['fingerprint']['sha256']+'.png')))
    rows=[];sheet=Image.new('RGB',(1536,3*510),'#302737');draw=ImageDraw.Draw(sheet);premium=0
    for name,path in inputs:
        raw=path.read_bytes();entry={'id':name,'inputSha256':hashlib.sha256(raw).hexdigest()}
        try:
            im,_=decode(raw,path.suffix);r=analyze(im,ROOT/'.local/models/face_landmarker.task');entry.update({'status':r['status'],'analysis':r})
            if r['status']!='failed':
                with tempfile.TemporaryDirectory(dir=ROOT/'.local') as temp:
                    target=Path(temp);b=build(im,r,target,'estimated');base=Image.open(target/'structure-base.png').convert('RGBA');frames=[]
                    for state in ['neutral','blink','mouth']:
                        frame=base.copy()
                        for region in b['regions']:
                            if not region['enabled']:continue
                            key=region['key'];selected='open' if key.startswith('eye') else 'closed'
                            if state=='blink' and key.startswith('eye'):selected='closed'
                            if state=='mouth' and key=='mouth':selected='open'
                            frame.alpha_composite(Image.open(target/f'structure-{key}-{selected}.png').convert('RGBA'),(region['rect']['x'],region['rect']['y']))
                        frames.append(frame)
                    original=np.array(im);neutral=np.array(frames[0]);mask=np.zeros(original.shape[:2],bool)
                    for region in b['regions']:
                        if region['enabled']:
                            v=region['rect'];mask[v['y']:v['y']+v['height'],v['x']:v['x']+v['width']]=True
                    entry['neutralChangedChannels']=int(np.count_nonzero(original!=neutral));entry['expressionOutsideChangedChannels']=sum(int(np.count_nonzero(np.array(frame)[~mask]!=original[~mask])) for frame in frames[1:]);entry['alphaChangedChannels']=sum(int(np.count_nonzero(np.array(frame)[:,:,3]!=original[:,:,3])) for frame in frames)
                    if name.startswith(('HQ','PREMIUM')):
                        for column,frame in enumerate([im,*frames]):
                            frame=frame.copy();frame.thumbnail((384,480),Image.Resampling.LANCZOS);x=column*384+(384-frame.width)//2;y=premium*510;sheet.paste(frame,(x,y),frame);draw.text((column*384+8,y+484),name+' / '+['source','neutral','blink-estimated','mouth-estimated'][column],fill='#eee3f4')
                        premium+=1
        except ValueError as error:entry.update({'status':'rejected','code':str(error)})
        rows.append(entry)
    passed=all(v.get('neutralChangedChannels',0)==0 and v.get('expressionOutsideChangedChannels',0)==0 and v.get('alphaChangedChannels',0)==0 for v in rows) and rows[-1]['status']=='ready'
    counts={state:sum(v['status']==state for v in rows) for state in ['ready','partial','failed','rejected']}
    result={'passed':passed,'method':'Product local decoder + landmark analysis + expression preparation; no sample metadata passed to inference','inputs':len(rows),'counts':counts,'limits':'Identity/line/color exact neutral pixels and static expression locality; independent ART-01, unseen restoration, GPU extremes and M0 FPS evaluated separately','results':rows}
    (output/'quality.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n');sheet.save(output/'quality-comparison.png');print(json.dumps({'passed':passed,'inputs':len(rows),'counts':counts}))
    if not passed:raise SystemExit(1)
if __name__=='__main__':run()
