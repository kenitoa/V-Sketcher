"""Download public, pinned TripoSR research inputs; never upload user artwork."""
from pathlib import Path
import hashlib
import json
import shutil
import urllib.request
import zipfile

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT/'.local/research31'


def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': '2DSketcher-local-research'}), timeout=90)


def metadata(url):
    with get(url) as response:
        return json.load(response)


def download(url, path, expected=None):
    if path.exists():
        digest = hashlib.sha256(path.read_bytes()).hexdigest()
        if expected and digest != expected:
            raise ValueError('E_3D_DOWNLOAD_HASH')
        return digest
    temporary = path.with_suffix(path.suffix+'.partial')
    digest = hashlib.sha256()
    with get(url) as response, temporary.open('wb') as stream:
        while block := response.read(4*1024*1024):
            stream.write(block)
            digest.update(block)
    if expected and digest.hexdigest() != expected:
        raise ValueError('E_3D_DOWNLOAD_HASH')
    temporary.replace(path)
    return digest.hexdigest()


def main():
    BASE.mkdir(parents=True, exist_ok=True)
    receipt = BASE/'triposr-receipt.json'
    if receipt.exists():
        record = json.loads(receipt.read_text())
        for entry in record['downloads']:
            if hashlib.sha256((BASE/entry['file']).read_bytes()).hexdigest() != entry['sha256']:
                raise ValueError('E_3D_RESEARCH_HASH')
        print('Pinned research downloads already verified')
        return
    if shutil.disk_usage(BASE).free < 5*1024**3:
        raise ValueError('E_3D_RESEARCH_DISK')
    commit = metadata('https://api.github.com/repos/VAST-AI-Research/TripoSR/commits/main')['sha']
    model = metadata('https://huggingface.co/api/models/stabilityai/TripoSR?blobs=true')
    dino = metadata('https://huggingface.co/api/models/facebook/dino-vitb16?blobs=true')
    downloads = []

    def fetch(url, relative, expected=None):
        path = BASE/relative
        path.parent.mkdir(parents=True, exist_ok=True)
        digest = download(url, path, expected)
        downloads.append({'url': url, 'file': relative, 'sha256': digest, 'bytes': path.stat().st_size})
        print('Verified public research file:', relative, flush=True)
        return path

    archive = fetch(f'https://codeload.github.com/VAST-AI-Research/TripoSR/zip/{commit}', 'triposr-source.zip')
    with zipfile.ZipFile(archive) as zipped:
        expected_prefix = 'TripoSR-'+commit+'/'
        for entry in zipped.infolist():
            if not entry.filename.startswith(expected_prefix):
                raise ValueError('E_3D_SOURCE_ARCHIVE')
            name = entry.filename[len(expected_prefix):]
            if not name:
                continue
            target = (BASE/'triposr-source'/name).resolve()
            if not target.is_relative_to((BASE/'triposr-source').resolve()) or entry.external_attr >> 16 & 0o170000 == 0o120000:
                raise ValueError('E_3D_SOURCE_ARCHIVE')
            if entry.is_dir():
                target.mkdir(parents=True, exist_ok=True)
            else:
                target.parent.mkdir(parents=True, exist_ok=True)
                if target.exists() and target.read_bytes() != zipped.read(entry):
                    raise ValueError('E_3D_SOURCE_CHANGED')
                target.write_bytes(zipped.read(entry))
    for name in ['config.yaml', 'model.ckpt', 'README.md']:
        sibling = next(v for v in model['siblings'] if v['rfilename'] == name)
        expected = sibling.get('lfs', {}).get('sha256')
        fetch(f'https://huggingface.co/stabilityai/TripoSR/resolve/{model["sha"]}/{name}?download=true', 'triposr-weights/'+name, expected)
    fetch(f'https://huggingface.co/facebook/dino-vitb16/resolve/{dino["sha"]}/config.json', 'triposr-weights/dino-config.json')
    receipt.write_text(json.dumps({'sourceCommit': commit, 'modelRevision': model['sha'], 'dinoConfigRevision': dino['sha'],
                                   'license': 'MIT per upstream code/model statement; no product redistribution approval',
                                   'sourceImagesUploaded': False, 'downloads': downloads}, indent=2)+'\n', encoding='utf-8')


if __name__ == '__main__':
    try:
        main()
    except Exception:
        print('E_3D_RESEARCH_PREPARE')
        raise SystemExit(1)
