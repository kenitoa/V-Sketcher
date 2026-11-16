"""One-time import of immutable premium experiment textures into product preview assets."""
from pathlib import Path
import hashlib,json,shutil
ROOT=Path(__file__).resolve().parent.parent
source=ROOT/'experiments/phase04/assets/premium/project'
destination=ROOT/'assets/product/preview';destination.mkdir(parents=True,exist_ok=True)
project=json.loads((source/'project.json').read_text(encoding='utf-8'))
assets=[];layers=[]
for part in project['parts']:
    states={}
    for state,resource in part['states'].items():
        path=source/resource['path'];digest=hashlib.sha256(path.read_bytes()).hexdigest()
        if digest!=resource['sha256']:raise ValueError('source_hash_mismatch')
        name=digest+'.png';shutil.copyfile(path,destination/name)
        states[state]='assets/preview/'+name
        if not any(a['sha256']==digest for a in assets):assets.append({'path':'preview/'+name,'sha256':digest,'bytes':path.stat().st_size,'source':'experiments/phase04/assets/premium/project/'+resource['path'],'use':'bundled-premium-preview-only'})
    layers.append({'id':part['id'],'z':part['z'],'origin':part['origin'],'opacity':part['opacity'],'bind':part['bind'],'states':states})
scene={'version':1,'name':'PREMIUM-003','canvas':project['canvas'],'layers':layers}
(destination.parent/'preview-scene.json').write_text(json.dumps(scene,indent=2)+'\n',encoding='utf-8')
(destination.parent/'manifest.json').write_text(json.dumps({'version':1,'scope':'Premium foundation preview, not a finished parts library or automatic rig','source_record':'experiments/phase04/assets/premium/generation-prompts.md','assets':assets},indent=2)+'\n',encoding='utf-8')
print('Imported',len(assets),'verified premium textures')
