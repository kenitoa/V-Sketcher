"""Validate tracked assets and provision only a pinned local model/resource cache."""
from pathlib import Path
import hashlib,json,shutil,urllib.request
ROOT=Path(__file__).resolve().parent.parent
def sha(path):return hashlib.sha256(Path(path).read_bytes()).hexdigest()
def run():
    source=json.loads((ROOT/'worker/resources/model-source.json').read_text(encoding='utf-8'))
    model=ROOT/'.local/models/face_landmarker.task';model.parent.mkdir(parents=True,exist_ok=True)
    if not model.exists():
        prior=ROOT/'experiments/phase03/models/face_landmarker.task'
        if prior.exists() and sha(prior)==source['sha256']:shutil.copyfile(prior,model)
        else:urllib.request.urlretrieve(source['url'],model)
    if sha(model)!=source['sha256']:raise ValueError('E_MODEL_HASH')
    assets=ROOT/'assets/product';manifest=json.loads((assets/'manifest.json').read_text(encoding='utf-8'))
    output=ROOT/'.local/staged-assets/assets';output.mkdir(parents=True,exist_ok=True)
    for item in manifest['assets']:
        file=(assets/item['path']).resolve()
        if not file.is_relative_to(assets.resolve()) or sha(file)!=item['sha256']:raise ValueError('E_ASSET_HASH')
        destination=output/item['path'];destination.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(file,destination)
    catalog=json.loads((assets/'parts/catalog.json').read_text(encoding='utf-8'))
    parts_output=output/'parts';parts_output.mkdir(parents=True,exist_ok=True)
    if not parts_output.resolve().is_relative_to(ROOT.resolve()):raise ValueError('E_PARTS_STAGE_PATH')
    allowed={Path(name).name for name in catalog['files'].values()}
    for stale in parts_output.glob('*.png'):
        if stale.name not in allowed:stale.unlink()
    for digest,name in catalog['files'].items():
        path=(assets/name).resolve()
        if not path.is_relative_to((assets/'parts').resolve()) or sha(path)!=digest:raise ValueError('E_PARTS_ASSET_HASH')
        destination=output/name;destination.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(path,destination)
    shutil.copyfile(assets/'parts/catalog.json',output/'parts/catalog.json')
    shutil.copyfile(assets/'preview-scene.json',output/'preview-scene.json')
    shutil.copyfile(assets/'preview-project.json',output/'preview-project.json')
    print('Model and',len(manifest['assets']),'premium assets verified')
if __name__=='__main__':run()
