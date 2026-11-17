"""Controlled product correction API measurements; not human usability/art ratings."""
from pathlib import Path
import copy,hashlib,json,sys,tempfile
import numpy as np
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parent.parent;sys.path.insert(0,str(ROOT/'worker'))
from structure import analyze,build

def frame(image,report,directory,closed=False):
    out=Image.open(directory/'structure-base.png').convert('RGBA')
    for region in report['regions']:
        if not region['enabled']:continue
        key=region['key'];state='closed' if key=='mouth' or closed and key.startswith('eye') else 'open'
        out.alpha_composite(Image.open(directory/f'structure-{key}-{state}.png').convert('RGBA'),(region['rect']['x'],region['rect']['y']))
    return out

def run():
    output=ROOT/'evidence/phase15';output.mkdir(parents=True,exist_ok=True)
    project=json.loads((ROOT/'assets/product/preview-project.json').read_text(encoding='utf-8'));asset=next(a for a in project['assets'] if a['id']==project['inputAssetIds'][0]);source=ROOT/'assets/product/preview'/(asset['fingerprint']['sha256']+'.png');image=Image.open(source).convert('RGBA');automatic=analyze(image,ROOT/'.local/models/face_landmarker.task')
    variants=[('automatic',copy.deepcopy(automatic)),('moved',copy.deepcopy(automatic)),('foreground-mask',copy.deepcopy(automatic)),('skipped',copy.deepcopy(automatic)),('restored',copy.deepcopy(automatic))]
    left=next(r for r in variants[1][1]['regions'] if r['key']=='eye_left');left['rect']['x']+=2
    masked=next(r for r in variants[2][1]['regions'] if r['key']=='eye_left');masked['rect']['x']+=2;masked['masks']=[{'mode':'erase','rect':{**masked['rect'],'width':10}},{'mode':'restore','rect':{**masked['rect'],'width':8,'height':5}}];masked['order']=17
    variants[3][1]['regions'][0]['enabled']=False
    sheet=Image.new('RGB',(1600,1080),'#302737');draw=ImageDraw.Draw(sheet);results=[]
    for index,(name,report) in enumerate(variants):
        with tempfile.TemporaryDirectory(dir=ROOT/'.local') as tmp:
            target=Path(tmp);result=build(image,report,target,'estimated');neutral=frame(image,result,target);closed=frame(image,result,target,True);pixels=np.asarray(neutral);original=np.asarray(image)
            changed=int(np.count_nonzero(pixels!=original));alpha=int(np.count_nonzero(np.asarray(closed)[:,:,3]!=original[:,:,3]));outside=np.ones(original.shape[:2],bool)
            for region in result['regions']:
                if region['enabled']:
                    r=region['rect'];outside[r['y']:r['y']+r['height'],r['x']:r['x']+r['width']]=False
            outside_change=int(np.count_nonzero(np.asarray(closed)[outside]!=original[outside]));results.append({'case':name,'neutralChangedChannels':changed,'closedAlphaChangedChannels':alpha,'outsideChangedChannels':outside_change,'enabledKeys':[r['key'] for r in result['regions'] if r['enabled']]})
            for row,picture in enumerate([neutral,closed]):
                if row==0:
                    thumb=picture.copy();thumb.thumbnail((320,440),Image.Resampling.LANCZOS);sheet.paste(thumb,(index*320+(320-thumb.width)//2,0),thumb)
                else:
                    face=report['face'];x=max(0,face['x']-30);y=max(0,face['y']-30);picture=picture.crop((x,y,min(image.width,x+face['width']+60),min(image.height,y+face['height']+60)));picture.thumbnail((320,500),Image.Resampling.LANCZOS);sheet.paste(picture,(index*320,540),picture)
                draw.text((index*320+8,row*540+480),name+(' / neutral' if row==0 else ' / estimated blink'),fill='#f5e8fb')
    passed=all(v['neutralChangedChannels']==v['closedAlphaChangedChannels']==v['outsideChangedChannels']==0 for v in results)
    record={'passed':passed,'scope':'Five actual worker correction variants and pixel/alpha locality; no fixture annotations, independent art scores, user observation or M0 performance claim','inputSha256':hashlib.sha256(source.read_bytes()).hexdigest(),'cases':results}
    (output/'correction-quality.json').write_text(json.dumps(record,ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n');sheet.save(output/'correction-comparison.png');print(json.dumps({'passed':passed,'cases':len(results)}))
    if not passed:raise SystemExit(1)
if __name__=='__main__':run()
