"""Fetch a checksum-verified official portable comparison tool, never install system-wide."""
from pathlib import Path
import hashlib
import json
import urllib.request
import zipfile

ROOT = Path(__file__).resolve().parents[1]
VERSION = '4.5.3'
BASE = 'https://download.blender.org/release/Blender4.5/'
NAME = f'blender-{VERSION}-windows-x64.zip'


def main():
    parent = ROOT/'.local/research31'
    parent.mkdir(parents=True, exist_ok=True)
    sums = urllib.request.urlopen(BASE+f'blender-{VERSION}.sha256', timeout=30).read()
    rows = [r.split() for r in sums.decode().splitlines() if r.strip().endswith(NAME)]
    if len(rows) != 1:
        raise ValueError('E_3D_TOOL_CHECKSUM')
    expected = rows[0][0]
    archive = parent/NAME
    if not archive.exists():
        with urllib.request.urlopen(BASE+NAME, timeout=120) as response, archive.open('wb') as target:
            while chunk := response.read(1024*1024):
                target.write(chunk)
    actual = hashlib.file_digest(archive.open('rb'), 'sha256').hexdigest()
    if actual != expected:
        raise ValueError('E_3D_TOOL_CHECKSUM')
    folder = parent/f'blender-{VERSION}-windows-x64'
    if not folder.exists():
        with zipfile.ZipFile(archive) as z:
            for info in z.infolist():
                target = (parent/info.filename).resolve()
                if not target.is_relative_to(parent.resolve()) or info.external_attr >> 16 & 0o170000 == 0o120000:
                    raise ValueError('E_3D_TOOL_ARCHIVE')
            z.extractall(parent)
    receipt = {'name': 'Blender', 'version': VERSION, 'source': BASE+NAME,
               'checksumSource': BASE+f'blender-{VERSION}.sha256', 'sha256': actual,
               'portableOnly': True, 'systemInstalled': False, 'redistributed': False}
    (parent/'blender-receipt.json').write_text(json.dumps(receipt, indent=2)+'\n', encoding='utf-8')
    print('Official portable Blender checksum verified.')


if __name__ == '__main__':
    try:
        main()
    except Exception:
        print('E_3D_EXTERNAL_TOOL')
        raise SystemExit(1) from None
