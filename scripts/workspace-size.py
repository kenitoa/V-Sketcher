"""Read-only workspace inventory. Skip directory links; never emit personal paths."""

import argparse
import ctypes
import json
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--output', required=True)
    args = parser.parse_args()
    output = (ROOT / args.output).resolve()
    if not output.is_relative_to(ROOT / 'evidence/cleanup') or output.exists():
        raise ValueError('E_SIZE_OUTPUT')
    output.parent.mkdir(parents=True, exist_ok=True)
    kernel = ctypes.WinDLL('kernel32', use_last_error=True)
    allocated = kernel.GetCompressedFileSizeW
    allocated.argtypes = [ctypes.c_wchar_p, ctypes.POINTER(ctypes.c_ulong)]
    allocated.restype = ctypes.c_ulong
    by_root, by_local = {}, {}
    totals = {
        'files': 0,
        'logicalBytes': 0,
        'allocatedBytes': 0,
        'uniqueLogicalBytes': 0,
        'uniqueAllocatedBytes': 0,
        'skippedDirectoryLinks': 0,
        'errors': 0,
    }

    def add(bucket, name, size, disk):
        row = bucket.setdefault(
            name, {'files': 0, 'logicalBytes': 0, 'allocatedBytes': 0}
        )
        row['files'] += 1
        row['logicalBytes'] += size
        row['allocatedBytes'] += disk

    pending = [ROOT]
    seen_links = set()

    def scan_directory(directory, entries):
        parts = directory.relative_to(ROOT).parts
        group = parts[0] if parts else '(root files)'
        local_group = parts[1] if group == '.local' and len(parts) > 1 else None
        for entry in entries:
            try:
                if entry.is_junction() or entry.is_symlink():
                    if entry.is_junction() or entry.is_dir():
                        totals['skippedDirectoryLinks'] += 1
                    continue
                if entry.is_dir(follow_symlinks=False):
                    pending.append(Path(entry.path))
                    continue
                if not entry.is_file(follow_symlinks=False):
                    continue
                # Windows DirEntry.stat can omit the link count and file identity.
                stat = os.stat(entry.path, follow_symlinks=False)
                high = ctypes.c_ulong()
                ctypes.set_last_error(0)
                low = allocated(entry.path, ctypes.byref(high))
                if low == 0xFFFFFFFF and ctypes.get_last_error():
                    raise OSError('E_SIZE_ALLOCATION')
                disk = (high.value << 32) | low
                add(by_root, group, stat.st_size, disk)
                if local_group:
                    add(by_local, local_group, stat.st_size, disk)
                totals['files'] += 1
                totals['logicalBytes'] += stat.st_size
                totals['allocatedBytes'] += disk
                if stat.st_nlink > 1:
                    identity = (stat.st_dev, stat.st_ino)
                    if identity in seen_links:
                        continue
                    seen_links.add(identity)
                totals['uniqueLogicalBytes'] += stat.st_size
                totals['uniqueAllocatedBytes'] += disk
            except OSError:
                totals['errors'] += 1

    while pending:
        directory = pending.pop()
        try:
            with os.scandir(directory) as entries:
                scan_directory(directory, entries)
        except OSError:
            totals['errors'] += 1
    report = {
        'format': '2dsketcher-workspace-size/1',
        'totals': totals,
        'topLevel': dict(
            sorted(by_root.items(), key=lambda pair: -pair[1]['logicalBytes'])
        ),
        'localGroups': dict(
            sorted(by_local.items(), key=lambda pair: -pair[1]['logicalBytes'])
        ),
        'directoryLinksFollowed': False,
        'allocatedMeasurement': 'GetCompressedFileSizeW; file data only, excludes directory metadata and allocation slack',
        'privatePathsStored': False,
    }
    output.write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
    print(
        json.dumps(
            {
                'files': totals['files'],
                'logicalGiB': round(totals['logicalBytes'] / 1024**3, 3),
                'allocatedGiB': round(totals['uniqueAllocatedBytes'] / 1024**3, 3),
                'errors': totals['errors'],
            }
        )
    )


if __name__ == '__main__':
    try:
        main()
    except Exception:
        print('E_WORKSPACE_SIZE')
        raise SystemExit(1)
