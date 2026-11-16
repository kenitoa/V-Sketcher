"""Regenerate the reviewed Windows wheel lock from the isolated build environment."""
from pathlib import Path
import hashlib,importlib.metadata as meta,json,urllib.request
from packaging.tags import sys_tags
from packaging.utils import parse_wheel_filename
ROOT=Path(__file__).resolve().parent.parent
tags=set(sys_tags());lines=[];inventory=[]
for dist in sorted(meta.distributions(),key=lambda d:d.metadata['Name'].lower()):
    name=dist.metadata['Name'];version=dist.version
    if name.lower()=='pip':continue
    url=f'https://pypi.org/pypi/{name}/{version}/json';data=json.load(urllib.request.urlopen(url))
    wheels=[]
    for item in data['urls']:
        if item['filename'].endswith('.whl') and parse_wheel_filename(item['filename'])[3]&tags:wheels.append(item)
    if not wheels:raise ValueError('No compatible pinned wheel: '+name)
    lines.append(name+'=='+version+' '+' '.join('--hash=sha256:'+w['digests']['sha256'] for w in wheels))
    inventory.append({'name':name,'version':version,'source':url,'wheels':[{'filename':w['filename'],'sha256':w['digests']['sha256']} for w in wheels]})
target=ROOT/'worker/requirements-win-py314.lock';target.write_text('\n'.join(lines)+'\n',encoding='utf-8')
out=ROOT/'evidence/phase06';out.mkdir(parents=True,exist_ok=True)
(out/'python-lock-sources.json').write_text(json.dumps({'scope':'Build environment superset; bundled runtime modules are separately inventoried','packages':inventory,'lock_sha256':hashlib.sha256(target.read_bytes()).hexdigest()},indent=2)+'\n',encoding='utf-8')
print('Pinned',len(lines),'build/runtime wheel distributions')
