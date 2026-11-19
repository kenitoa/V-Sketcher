"""Own WSL2 distribution and bounded tmpfs; never fill a normal Windows drive."""

from pathlib import Path
import hashlib
import io
import json
import re
import subprocess
import tarfile
import urllib.request
import uuid

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / '.local/remediation-space'


def command(*args):
    result = subprocess.run(
        ['wsl.exe', *args], stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=180
    )
    if result.returncode:
        raise ValueError('E_REMEDIATION_WSL')
    return result.stdout


def main():
    if WORK.exists():
        raise ValueError('E_REMEDIATION_EXISTS')
    WORK.mkdir(parents=True)
    base = 'https://dl-cdn.alpinelinux.org/alpine/v3.22/releases/x86_64/'
    archive = 'alpine-minirootfs-3.22.2-x86_64.tar.gz'
    with urllib.request.urlopen(base + archive + '.sha256', timeout=60) as response:
        expected = response.read().decode('ascii').split()[0]
    with urllib.request.urlopen(base + archive, timeout=60) as response:
        data = response.read(16 * 1024 * 1024)
    if not re.fullmatch('[a-f0-9]{64}', expected) or hashlib.sha256(data).hexdigest() != expected:
        raise ValueError('E_REMEDIATION_ROOTFS_HASH')
    original = WORK / archive
    original.write_bytes(data)
    # Only this imported test distro: no host drive automount, no interop or user account changes.
    rootfs = WORK / 'isolated-rootfs.tar'
    with (
        tarfile.open(fileobj=io.BytesIO(data), mode='r:gz') as source,
        tarfile.open(rootfs, mode='w') as target,
    ):
        for entry in source:
            if entry.name.lstrip('./') == 'etc/wsl.conf':
                continue
            target.addfile(entry, source.extractfile(entry) if entry.isfile() else None)
        config = b'[automount]\nenabled=false\n[interop]\nenabled=false\nappendWindowsPath=false\n[boot]\nsystemd=false\n'
        entry = tarfile.TarInfo('etc/wsl.conf')
        entry.size, entry.mode = len(config), 0o644
        target.addfile(entry, io.BytesIO(config))
    distro = '2DSketcher-Space-' + uuid.uuid4().hex[:10]
    state = {
        'distro': distro,
        'source': base + archive,
        'originalSha256': expected,
        'privateInstallDirectory': str(WORK / 'distro'),
        'capacityBytes': 32 * 1024 * 1024,
        'hostSecuritySettingsChanged': False,
        'existingDistroModified': False,
    }
    (WORK / 'state.json').write_text(json.dumps(state), encoding='utf-8')
    command('--import', distro, str(WORK / 'distro'), str(rootfs), '--version', '2')
    command(
        '-d',
        distro,
        '-u',
        'root',
        '--',
        'sh',
        '-c',
        'mkdir -p /test-space && mount -t tmpfs -o size=32m tmpfs /test-space',
    )
    state['unc'] = '\\\\wsl.localhost\\' + distro + '\\test-space'
    state['mounted'] = True
    (WORK / 'state.json').write_text(json.dumps(state), encoding='utf-8')
    print('Owned 32 MiB filesystem ready; no normal drive filled')


if __name__ == '__main__':
    try:
        main()
    except Exception:
        WORK.mkdir(parents=True, exist_ok=True)
        (WORK / 'failure.json').write_text(
            json.dumps(
                {
                    'passed': False,
                    'code': 'E_REMEDIATION_SPACE_SETUP',
                    'hostSecuritySettingsChanged': False,
                }
            ),
            encoding='utf-8',
        )
        print('E_REMEDIATION_SPACE_SETUP')
        raise SystemExit(1)
