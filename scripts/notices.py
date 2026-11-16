"""Preserve exact installed license texts and classify build/runtime dependency inventory."""
from pathlib import Path
import importlib.metadata as meta,json,shutil
ROOT=Path(__file__).resolve().parent.parent
def run():
    out=ROOT/'dist/notices';out.mkdir(parents=True,exist_ok=True)
    shutil.copyfile(ROOT/'NOTICE.md',out/'NOTICE.md')
    shutil.copyfile(ROOT/'worker/resources/model-source.json',out/'model-source.json')
    registry=json.loads((ROOT/'assets/product/manifest.json').read_text(encoding='utf-8'))
    (out/'asset-provenance.json').write_text(json.dumps(registry,indent=2)+'\n',encoding='utf-8')
    shutil.copyfile(ROOT/'experiments/phase04/assets/premium/generation-prompts.md',out/'preview-generation-record.md')
    python=[]
    for dist in meta.distributions():
        name=dist.metadata['Name'];item={'name':name,'version':dist.version,'license':dist.metadata.get('License-Expression') or dist.metadata.get('License'),'scope':'installed build environment; bundled use verified separately'}
        target=out/'python'/name;target.mkdir(parents=True,exist_ok=True)
        for file in dist.files or []:
            path=Path(file)
            if any(word in path.name.lower() for word in ['license','copying','notice']) and path.suffix.lower() not in ['.py','.pyc','.dll','.pyd']:
                source=Path(dist.locate_file(file))
                if source.is_file() and source.stat().st_size<5*1024*1024:shutil.copyfile(source,target/path.name)
        python.append(item)
    lock=json.loads((ROOT/'package-lock.json').read_text(encoding='utf-8'));npm=[]
    for key,item in lock.get('packages',{}).items():
        if not key:continue
        directory=ROOT/key
        if not directory.exists():continue
        package=json.loads((directory/'package.json').read_text(encoding='utf-8'));name=package['name']
        npm.append({'name':name,'version':package['version'],'license':package.get('license'),'scope':'build' if item.get('dev') else 'runtime'})
        if not item.get('dev'):
            target=out/'npm'/name.replace('/','_');target.mkdir(parents=True,exist_ok=True)
            for source in directory.iterdir():
                if source.is_file() and source.name.lower().startswith(('license','notice','copying')):shutil.copyfile(source,target/source.name)
    (out/'dependency-inventory.json').write_text(json.dumps({'python':python,'npm':npm,'public_distribution_approved':False},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('Inventoried',len(python),'Python and',len(npm),'Node packages; public distribution not approved')
if __name__=='__main__':run()
