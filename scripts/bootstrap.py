"""Windows development bootstrap, project-local Node/venv; no system configuration edits."""

from pathlib import Path
import hashlib, subprocess, sys, urllib.request, zipfile

ROOT = Path(__file__).resolve().parent.parent


def run():
    if sys.platform != 'win32' or sys.version_info[:3] != (3, 14, 10):
        raise SystemExit('Python 3.14.10 x64 on Windows is required for this development baseline.')
    local = ROOT / '.local/toolchain'
    local.mkdir(parents=True, exist_ok=True)
    version = '24.22.3'
    name = f'node-v{version}-win-x64.zip'
    base = f'https://nodejs.org/dist/v{version}/'
    sums = urllib.request.urlopen(base + 'SHASUMS256.txt').read().decode()
    expected = 'e612af99f626ab415ea225af6bce5c971feb448cb5cae250bb1c3fa50c5f7d9f'
    if next(v.split()[0] for v in sums.splitlines() if v.endswith(' ' + name)) != expected:
        raise ValueError('E_NODE_SOURCE_HASH')
    archive = local / name
    if not archive.exists():
        urllib.request.urlretrieve(base + name, archive)
    if hashlib.sha256(archive.read_bytes()).hexdigest() != expected:
        raise ValueError('E_NODE_HASH')
    if not (local / f'node-v{version}-win-x64/node.exe').exists():
        with zipfile.ZipFile(archive) as z:
            for info in z.infolist():
                if not (local / info.filename).resolve().is_relative_to(local.resolve()):
                    raise ValueError('E_TOOL_PATH')
            z.extractall(local)
    python = ROOT / '.venv-product/Scripts/python.exe'
    if not python.exists():
        subprocess.run([sys.executable, '-m', 'venv', str(ROOT / '.venv-product')], check=True)
    subprocess.run(
        [str(python), '-c', 'import sys; assert sys.version_info[:3] == (3,14,10)'], check=True
    )
    subprocess.run(
        [
            str(python),
            '-m',
            'pip',
            'install',
            '--require-hashes',
            '--only-binary=:all:',
            '-r',
            str(ROOT / 'worker/requirements-win-py314.lock'),
        ],
        check=True,
    )
    subprocess.run([str(python), str(ROOT / 'scripts/provision.py')], check=True)
    print('Project-local toolchain ready. Next: tools\\dev.cmd ci')


if __name__ == '__main__':
    run()
