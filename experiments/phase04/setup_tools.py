"""Pinned official portable tools, isolated from existing user installations/configuration."""
import hashlib,json,urllib.request,zipfile
from pathlib import Path
BASE=Path(__file__).resolve().parent
def run():
    root=BASE/'tools'
    for source in json.loads((root/'sources.json').read_text(encoding='utf-8')):
        archive=root/source['filename']
        if not archive.exists():urllib.request.urlretrieve(source['url'],archive)
        if hashlib.sha256(archive.read_bytes()).hexdigest()!=source['sha256']:raise ValueError('tool_checksum_mismatch:'+source['id'])
        destination=(root/source['id']).resolve();destination.mkdir(parents=True,exist_ok=True)
        with zipfile.ZipFile(archive) as z:
            for entry in z.infolist():
                target=(destination/entry.filename).resolve()
                if not target.is_relative_to(destination):raise ValueError('archive_path_outside_tool_root')
            z.extractall(destination)
        print(source['id'],source['tag'],'verified')
if __name__=='__main__':run()
