"""Lossless archiving and individually verified eviction of generated test caches."""

import argparse
from collections import OrderedDict
from compression import zstd
import gzip
import hashlib
import json
import lzma
import os
from pathlib import Path
import re
import shutil
import struct
import subprocess
import tempfile
import time
import zipfile
import zlib

ROOT = Path(__file__).resolve().parents[1]
STORE = ROOT / '.local/replay-store-01'
BLOCK = 4 * 1024 * 1024
CODECS = ('raw', 'z', 'zst', 's4zst', 's4z', 'xz', 's4xz')
SMALL_FILE_GROUPS = {'research-torch', 'research-blender'}
ALLOWED = {
    'correction-tests',
    'detail-tests',
    'parts-tests',
    'project-tests',
    'runtime-change-tests',
    'structure-tests',
    'input-tests',
    'editor-tests',
    'motion-tests',
    'tracking-tests',
    'storage-tests',
    'expression-tests',
    'settings-tests',
    'journal-replace-tests',
    'workflow-tests',
    'split-tests',
    'avatar-export-tests',
    'file-output-tests',
    'execution-tests',
    'smoke',
    'isolated',
    'input-control-tests',
    'broadcast-tests',
    'user-guide-tests',
}
PACKAGE_VERSIONS = {
    'intermediate-packages': {(0, 22, 1), (0, 22, 2), (0, 22, 3)},
    'previous-candidates': {(0, 22, 0), (0, 22, 4)},
}
PACKAGE_GROUPS = {'legacy-packages', *PACKAGE_VERSIONS}
EXTRA_GROUPS = {
    'research-torch': '.local/research31/triposr-env',
    'research-weights': '.local/research31/triposr-weights',
    'research-blender': '.local/research31/blender-4.5.3-windows-x64',
    'old-lab-environment': '.venv-lab',
    'old-phase03-environment': '.venv-phase03',
    'old-phase04-environment': '.venv-phase04',
    **dict.fromkeys(PACKAGE_GROUPS, 'out/make/zip/win32/x64'),
    'completion-old': '.local/completion26-31',
    'validation-obs-01': '.local/phase27-target-1794981943076',
    'validation-inochi-01': '.local/phase25-target-02',
    'isolated-later': '.local/isolated',
}
GENERATED = re.compile(
    r'^(?:phase\d+-[A-Za-z0-9_.-]+|release30(?:-external)?-\d+|remediation-[A-Za-z0-9_.-]+|(?:input-recovery|tracking)-ui-\d+|expression-ui-dev\d+|reliability-\d+|completion-probe-\d+|(?:camera|microphone)-live-\d+|(?:environment|usability)-profile-\d+|cleanup-bench-\d+|split-ui-initial-profile|compact-check|repro|caches)$'
)


def digest(data):
    return hashlib.sha256(data).hexdigest()


def shuffle4(data):
    return b''.join(data[lane::4] for lane in range(4))


def unshuffle4(data):
    result = bytearray(len(data))
    start = 0
    for lane in range(4):
        count = (len(data) + 3 - lane) // 4
        result[lane::4] = data[start : start + count]
        start += count
    return bytes(result)


def decode_object(payload, codec):
    if codec == 'raw':
        data = payload
    elif codec in {'z', 's4z'}:
        decoder = zlib.decompressobj()
        data = decoder.decompress(payload, BLOCK + 1)
        if not decoder.eof or decoder.unconsumed_tail or decoder.unused_data:
            raise ValueError('E_CACHE_COMPRESSED_OBJECT')
    elif codec in {'xz', 's4xz'}:
        decoder = lzma.LZMADecompressor(memlimit=32 * 1024**2)
        data = decoder.decompress(payload, max_length=BLOCK + 1)
        if not decoder.eof or decoder.unused_data:
            raise ValueError('E_CACHE_COMPRESSED_OBJECT')
    elif codec in {'zst', 's4zst'}:
        decoder = zstd.ZstdDecompressor(
            options={zstd.DecompressionParameter.window_log_max: 23}
        )
        data = decoder.decompress(payload, max_length=BLOCK + 1)
        if not decoder.eof or decoder.unused_data:
            raise ValueError('E_CACHE_COMPRESSED_OBJECT')
    else:
        raise ValueError('E_CACHE_OBJECT_CODEC')
    if len(data) > BLOCK:
        raise ValueError('E_CACHE_OBJECT_SIZE')
    return unshuffle4(data) if codec.startswith('s4') else data


def hash_file(path):
    sha = hashlib.sha256()
    with path.open('rb') as stream:
        while data := stream.read(BLOCK):
            sha.update(data)
    return sha.hexdigest()


def evidence_path(name, action):
    folder = ROOT / 'evidence/cleanup/run-01'
    first = folder / (name + '-' + action + '.json')
    return (
        first
        if not first.exists()
        else folder / (name + '-' + action + '-' + str(time.time_ns()) + '.json')
    )


def prune_empty(source):
    boundary = source.absolute()
    stack = [(source, False)]
    while stack:
        path, visited = stack.pop()
        if (
            path.is_symlink()
            or path.is_junction()
            or not path.resolve().is_relative_to(boundary)
        ):
            continue
        if visited:
            try:
                path.rmdir()
            except OSError:
                pass
            continue
        stack.append((path, True))
        with os.scandir(path) as entries:
            for entry in entries:
                child = Path(entry.path)
                if (
                    entry.is_dir(follow_symlinks=False)
                    and not child.is_junction()
                    and not entry.is_symlink()
                ):
                    stack.append((child, False))


def group_path(name):
    generated = (
        name.removeprefix('generated-') if name.startswith('generated-') else None
    )
    if (
        name not in ALLOWED
        and name not in EXTRA_GROUPS
        and not (generated and GENERATED.fullmatch(generated))
    ):
        raise ValueError('E_CACHE_GROUP')
    path = ROOT / (
        EXTRA_GROUPS[name] if name in EXTRA_GROUPS else '.local/' + (generated or name)
    )
    if path.is_symlink() or path.is_junction() or path.resolve() != path.absolute():
        raise ValueError('E_CACHE_ROOT')
    return path


def running_commands():
    query = '[Console]::OutputEncoding=[System.Text.UTF8Encoding]::new($false); Get-CimInstance Win32_Process | Select-Object -ExpandProperty CommandLine | ConvertTo-Json -Compress'
    scan = subprocess.run(
        ['powershell.exe', '-NoProfile', '-Command', query],
        capture_output=True,
        encoding='utf-8',
        errors='strict',
        timeout=30,
    )
    if scan.returncode:
        raise ValueError('E_CACHE_PROCESS_SCAN')
    try:
        commands = json.loads(scan.stdout)
    except ValueError as error:
        raise ValueError('E_CACHE_PROCESS_SCAN') from error
    if isinstance(commands, str):
        commands = [commands]
    if not isinstance(commands, list):
        raise ValueError('E_CACHE_PROCESS_SCAN')
    return [command for command in commands if isinstance(command, str)]


def assert_inactive(source, commands=None):
    if commands is None:
        commands = running_commands()
    target = str(source).replace('/', '\\').casefold()
    relative = '\\' + str(source.relative_to(ROOT)).replace('/', '\\').casefold()
    if any(
        target in command.replace('/', '\\').casefold()
        or relative in command.replace('/', '\\').casefold()
        for command in commands
    ):
        raise ValueError('E_CACHE_ACTIVE_PROCESS')


def segments(path, size):
    """Keep raw ZIP member boundaries so repeated compressed art deduplicates exactly."""
    cuts = {0, size}
    try:
        with path.open('rb') as stream:
            if stream.read(4) != b'PK\x03\x04':
                return sorted(cuts)
            with zipfile.ZipFile(path) as archive:
                if len(archive.infolist()) > 20000:
                    return sorted(cuts)
                for info in archive.infolist():
                    stream.seek(info.header_offset)
                    header = stream.read(30)
                    if len(header) != 30 or header[:4] != b'PK\x03\x04':
                        return [0, size]
                    name_size, extra_size = struct.unpack_from('<HH', header, 26)
                    start = info.header_offset + 30 + name_size + extra_size
                    end = start + info.compress_size
                    if not 0 <= start <= end <= size:
                        return [0, size]
                    cuts.update([info.header_offset, start, end])
    except (OSError, zipfile.BadZipFile, ValueError):
        return [0, size]
    return sorted(cuts)


class Objects:
    def __init__(self, folder):
        self.folder = folder
        folder.mkdir(parents=True, exist_ok=True)
        self.cache = OrderedDict()
        self.cache_bytes = 0
        self.new_bytes = 0

    def put(self, data):
        key = digest(data)
        plain, compressed = self.folder / (key + '.raw'), self.folder / (key + '.z')
        if not any((self.folder / (key + '.' + codec)).exists() for codec in CODECS):
            packed = zlib.compress(data, 6)
            target, payload = (
                (compressed, packed) if len(packed) < len(data) * 0.9 else (plain, data)
            )
            staging = None
            try:
                with tempfile.NamedTemporaryFile(
                    dir=self.folder, prefix='.object-', delete=False
                ) as stream:
                    staging = Path(stream.name)
                    stream.write(payload)
                    stream.flush()
                    os.fsync(stream.fileno())
                # Atomic no-replace publication. Another group can finish the same object first.
                if os.name == 'nt':
                    staging.rename(target)
                else:
                    os.link(staging, target)
                self.new_bytes += len(payload)
            except FileExistsError:
                pass
            finally:
                if staging is not None:
                    staging.unlink(missing_ok=True)
        return key

    def get(self, key):
        if (
            not isinstance(key, str)
            or len(key) != 64
            or any(c not in '0123456789abcdef' for c in key)
        ):
            raise ValueError('E_CACHE_OBJECT_KEY')
        if key in self.cache:
            self.cache.move_to_end(key)
            return self.cache[key]
        data = None
        for codec in CODECS:
            try:
                with (self.folder / (key + '.' + codec)).open('rb') as stream:
                    payload = stream.read(BLOCK + 1)
                data = decode_object(payload, codec)
                break
            except FileNotFoundError:
                continue
        if data is None:
            raise ValueError('E_CACHE_OBJECT_MISSING')
        if len(data) > BLOCK or digest(data) != key:
            raise ValueError('E_CACHE_OBJECT_HASH')
        # Tiny, usually unique ZIP headers must not evict reusable artwork chunks.
        if len(data) >= 32 * 1024:
            self.cache[key] = data
            self.cache_bytes += len(data)
            while self.cache_bytes > 32 * 1024**2:
                _, removed = self.cache.popitem(last=False)
                self.cache_bytes -= len(removed)
        return data


def files_under(path):
    stack = [path]
    while stack:
        folder = stack.pop()
        with os.scandir(folder) as entries:
            for entry in entries:
                item = Path(entry.path)
                if entry.is_symlink() or item.is_junction():
                    raise ValueError('E_CACHE_LINK')
                if entry.is_dir(follow_symlinks=False):
                    stack.append(item)
                elif entry.is_file(follow_symlinks=False):
                    yield item
                else:
                    raise ValueError('E_CACHE_FILE_TYPE')


def selected_files(name):
    for file in files_under(group_path(name)):
        if name in PACKAGE_GROUPS:
            match = re.fullmatch(
                r'2DSketcher-win32-x64-(\d+)\.(\d+)\.(\d+)\.zip', file.name
            )
            version = tuple(map(int, match.groups())) if match else None
            selected = version is not None and (
                version < (0, 22, 0)
                if name == 'legacy-packages'
                else version in PACKAGE_VERSIONS[name]
            )
            if not selected:
                continue
        yield file


class SmallFiles:
    """Share bounded blocks across small research files, retaining a checksum for each file."""

    def __init__(self, objects, rows):
        self.objects = objects
        self.rows = rows
        self.data = bytearray()
        self.records = []

    def add(self, record, data):
        if len(self.data) + len(data) > BLOCK or len(self.records) >= 512:
            self.flush()
        record['offset'] = len(self.data)
        self.data.extend(data)
        self.records.append(record)

    def flush(self):
        if not self.records:
            return
        key = self.objects.put(self.data)
        for record in self.records:
            record['chunks'] = [key]
            self.rows.write(json.dumps(record, ensure_ascii=False) + '\n')
        self.records.clear()
        self.data.clear()


def pack(name):
    source = group_path(name)
    index = STORE / 'indexes' / (name + '.jsonl.gz')
    if index.exists() or not source.is_dir():
        raise ValueError('E_CACHE_EXISTS')
    index.parent.mkdir(parents=True, exist_ok=True)
    objects = Objects(STORE / 'objects')
    count, total = 0, 0
    partial = index.with_name(index.name + '.partial-' + str(time.time_ns()))
    with gzip.open(partial, 'xt', encoding='utf-8') as rows:
        small_files = SmallFiles(objects, rows)
        for file in selected_files(name):
            before = file.stat()
            sha = hashlib.sha256()
            chunks = []
            small = None
            if name in SMALL_FILE_GROUPS and 0 < before.st_size <= 65536:
                with file.open('rb') as stream:
                    small = stream.read(before.st_size + 1)
                if len(small) != before.st_size:
                    raise ValueError('E_CACHE_CHANGED')
                sha.update(small)
            else:
                limits = segments(file, before.st_size)
                with file.open('rb') as stream:
                    for left, right in zip(limits, limits[1:]):
                        remaining = right - left
                        while remaining:
                            data = stream.read(min(BLOCK, remaining))
                            if not data:
                                raise ValueError('E_CACHE_SHORT_READ')
                            sha.update(data)
                            chunks.append(objects.put(data))
                            remaining -= len(data)
            after = file.stat()
            if (before.st_size, before.st_mtime_ns) != (
                after.st_size,
                after.st_mtime_ns,
            ):
                raise ValueError('E_CACHE_CHANGED')
            record = {
                'path': file.relative_to(source).as_posix(),
                'bytes': before.st_size,
                'sha256': sha.hexdigest(),
                'chunks': chunks,
                'mtimeNs': before.st_mtime_ns,
            }
            if small is None:
                rows.write(json.dumps(record, ensure_ascii=False) + '\n')
            else:
                small_files.add(record, small)
            count += 1
            total += before.st_size
            if count % 2000 == 0:
                print(
                    json.dumps(
                        {
                            'group': name,
                            'archivedFiles': count,
                            'logicalGiB': round(total / 1024**3, 3),
                        }
                    ),
                    flush=True,
                )
        small_files.flush()
    partial.rename(index)
    print(
        json.dumps(
            {
                'group': name,
                'files': count,
                'logicalBytes': total,
                'newObjectBytes': objects.new_bytes,
                'sourceRemoved': False,
            }
        ),
        flush=True,
    )


def record_bytes(record, objects):
    if 'offset' in record:
        start, size = record['offset'], record['bytes']
        if (
            len(record['chunks']) != 1
            or type(start) is not int
            or type(size) is not int
        ):
            raise ValueError('E_CACHE_SLICE')
        block = objects.get(record['chunks'][0])
        if start < 0 or size <= 0 or size > 65536 or start + size > len(block):
            raise ValueError('E_CACHE_SLICE')
        yield memoryview(block)[start : start + size]
    else:
        for key in record['chunks']:
            yield objects.get(key)


def verified_records(name):
    source = group_path(name)
    index = STORE / 'indexes' / (name + '.jsonl.gz')
    objects = Objects(STORE / 'objects')
    with gzip.open(index, 'rt', encoding='utf-8') as rows:
        for line in rows:
            record = json.loads(line)
            rel = Path(record['path'])
            if rel.is_absolute() or '..' in rel.parts or ':' in record['path']:
                raise ValueError('E_CACHE_ENTRY')
            sha, size = hashlib.sha256(), 0
            for data in record_bytes(record, objects):
                sha.update(data)
                size += len(data)
            if sha.hexdigest() != record['sha256'] or size != record['bytes']:
                raise ValueError('E_CACHE_RECONSTRUCTION')
            yield source, record, objects


def verify(name):
    source = group_path(name)
    count, size = 0, 0
    indexed = set()
    for _, record, _ in verified_records(name):
        file = source / record['path']
        stat = file.stat()
        if stat.st_size != record['bytes'] or stat.st_mtime_ns != record['mtimeNs']:
            raise ValueError('E_CACHE_SOURCE_CHANGED')
        indexed.add(record['path'])
        count += 1
        size += record['bytes']
        if count % 2000 == 0:
            print(json.dumps({'group': name, 'verifiedFiles': count}), flush=True)
    if {p.relative_to(source).as_posix() for p in selected_files(name)} != indexed:
        raise ValueError('E_CACHE_FILE_SET')
    report = {
        'format': '2dsketcher-cache-archive/1',
        'group': name,
        'verified': True,
        'files': count,
        'logicalBytes': size,
        'everyArchiveFileReconstructedAndHashMatched': True,
        'originalSourceHashesRecordedAtPack': True,
        'sourceSizeAndModificationTimeUnchanged': True,
        'sourceHashRecheckedDuringVerify': False,
        'sourceHashRequiredAgainBeforeEviction': True,
        'indexSha256': hash_file(STORE / 'indexes' / (name + '.jsonl.gz')),
        'sourceRemoved': False,
        'maxObjectMiB': BLOCK / 1024**2,
        'readCacheMiBLimit': 32,
        'historicalEvidenceModified': False,
    }
    output = evidence_path(name, 'verified')
    with output.open('x', encoding='utf-8') as stream:
        json.dump(report, stream, indent=2)
        stream.write('\n')
    print(
        json.dumps(
            {
                'group': name,
                'verified': True,
                'files': count,
                'logicalGiB': round(size / 1024**3, 3),
            }
        ),
        flush=True,
    )


def restore(name):
    target = group_path(name)
    shared_parent = name in {
        *PACKAGE_GROUPS,
        'isolated',
        'isolated-later',
    }
    if target.exists() and not shared_parent:
        raise ValueError('E_CACHE_RESTORE_EXISTS')

    def missing(record):
        file = target / record['path']
        resolved = file.resolve()
        if resolved != file.absolute() or not resolved.is_relative_to(target):
            raise ValueError('E_CACHE_RESTORE_LINK')
        if not file.exists():
            return True
        if shared_parent and file.is_file() and file.stat().st_size == record['bytes']:
            if hash_file(file) == record['sha256']:
                return False
        raise ValueError('E_CACHE_RESTORE_EXISTS')

    needed = 0
    for _, record, _ in verified_records(name):
        if missing(record):
            needed += record['bytes']
    if shutil.disk_usage(ROOT).free < needed + 512 * 1024**2:
        raise ValueError('E_CACHE_RESTORE_SPACE')
    target.parent.mkdir(parents=True, exist_ok=True)
    # Same-volume staging keeps incomplete research environments out of the live path.
    with tempfile.TemporaryDirectory(
        dir=target.parent, prefix='.restore-'
    ) as temporary:
        staged = Path(temporary) / 'tree'
        staged.mkdir()
        for _, record, objects in verified_records(name):
            if not missing(record):
                continue
            file = staged / record['path']
            file.parent.mkdir(parents=True, exist_ok=True)
            with file.open('xb') as stream:
                for data in record_bytes(record, objects):
                    stream.write(data)
            os.utime(file, ns=(record['mtimeNs'], record['mtimeNs']))
            if shared_parent:
                destination = target / record['path']
                destination.parent.mkdir(parents=True, exist_ok=True)
                # Publish without replacing a concurrent writer. Later retries skip exact copies.
                if os.name == 'nt':
                    file.rename(destination)
                else:
                    os.link(file, destination)
                    file.unlink()
        if not shared_parent:
            staged.rename(target)
    print(json.dumps({'group': name, 'restored': True}), flush=True)


def remove_verified_files(source, records):
    """Consume validated, private metadata; hash every live file before unlinking it."""
    removed, removed_bytes, retained = 0, 0, 0
    for line in records:
        record = json.loads(line)
        file = source / record['path']
        if not file.exists():
            continue
        if file.is_symlink() or not file.resolve().is_relative_to(source.absolute()):
            raise ValueError('E_CACHE_EVICT_LINK')
        actual = hash_file(file)
        if actual != record['sha256'] or file.stat().st_size != record['bytes']:
            retained += 1
            continue
        try:
            file.unlink()
        except PermissionError:
            retained += 1
            continue
        removed += 1
        removed_bytes += record['bytes']
    return removed, removed_bytes, retained


def evict(name):
    """Validate the complete archive once, then rehash each source before eviction."""
    source = group_path(name)
    assert_inactive(source)
    current_package = None
    if name in PACKAGE_GROUPS:
        version = json.loads((ROOT / 'package.json').read_text(encoding='utf-8'))[
            'version'
        ]
        current_package = f'2DSketcher-win32-x64-{version}.zip'
    proof = ROOT / 'evidence/cleanup/run-01' / (name + '-verified.json')
    report = json.loads(proof.read_text(encoding='utf-8')) if proof.exists() else None
    if report is not None:
        if not isinstance(report, dict):
            raise ValueError('E_CACHE_EVICT_PROOF')
        archive_verified = report.get('everyFileReconstructedAndSourceHashMatched') or (
            report.get('everyArchiveFileReconstructedAndHashMatched')
            and report.get('originalSourceHashesRecordedAtPack')
        )
        if (
            report.get('group') != name
            or not report.get('verified')
            or not archive_verified
        ):
            raise ValueError('E_CACHE_EVICT_PROOF')
    index = STORE / 'indexes' / (name + '.jsonl.gz')
    index_digest = hash_file(index)
    if report and report.get('indexSha256') and index_digest != report['indexSha256']:
        raise ValueError('E_CACHE_INDEX_CHANGED')
    # No deletion starts until every backup file has been reconstructed and hashed.
    # Freeze only the validated metadata in a system-temporary stream. This avoids
    # a second full reconstruction and never trusts a subsequently changed index.
    count = total = 0
    with tempfile.TemporaryFile(mode='w+t', encoding='utf-8') as records:
        for record in (entry[1] for entry in verified_records(name)):
            if record['path'] == current_package:
                raise ValueError('E_CACHE_CURRENT_PACKAGE')
            records.write(
                json.dumps({key: record[key] for key in ('path', 'bytes', 'sha256')})
                + '\n'
            )
            count += 1
            total += record['bytes']
            if count % 2000 == 0:
                print(
                    json.dumps(
                        {'group': name, 'archiveFilesValidatedForEviction': count}
                    ),
                    flush=True,
                )
        if report and (count != report['files'] or total != report['logicalBytes']):
            raise ValueError('E_CACHE_EVICT_PROOF')
        if hash_file(index) != index_digest:
            raise ValueError('E_CACHE_INDEX_CHANGED')
        if report is None:
            # A complete backup validation is sufficient here: every live source
            # is still hashed below, and new or changed files are always retained.
            report = {
                'format': '2dsketcher-cache-archive/1',
                'group': name,
                'verified': True,
                'files': count,
                'logicalBytes': total,
                'everyArchiveFileReconstructedAndHashMatched': True,
                'originalSourceHashesRecordedAtPack': True,
                'sourceHashRecheckedDuringVerify': False,
                'sourceHashRequiredAgainBeforeEviction': True,
                'indexSha256': index_digest,
                'sourceRemoved': False,
                'historicalEvidenceModified': False,
            }
            with proof.open('x', encoding='utf-8') as stream:
                json.dump(report, stream, indent=2)
                stream.write('\n')
        records.seek(0)
        removed, removed_bytes, retained = remove_verified_files(source, records)
    # Empty directories only. Newly created or changed files always prevent pruning.
    prune_empty(source)
    remaining = sum(1 for _ in selected_files(name)) if source.exists() else 0
    result = {
        'group': name,
        'removedFiles': removed,
        'removedLogicalBytes': removed_bytes,
        'retainedChangedOrProtectedFiles': retained,
        'remainingSelectedFiles': remaining,
        'losslessArchiveRetained': True,
        'wholeArchiveReconstructedBeforeFirstRemoval': True,
        'sourceHashRecheckedBeforeEachRemoval': True,
        'recursiveDeletionUsed': False,
        'historicalEvidenceModified': False,
    }
    output = evidence_path(name, 'evicted')
    with output.open('x', encoding='utf-8') as stream:
        json.dump(result, stream, indent=2)
        stream.write('\n')
    print(json.dumps(result), flush=True)
    return result


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('action', choices=['pack', 'verify', 'restore', 'evict'])
    parser.add_argument('group')
    args = parser.parse_args()
    started = time.monotonic()
    try:
        {'pack': pack, 'verify': verify, 'restore': restore, 'evict': evict}[
            args.action
        ](args.group)
        print(json.dumps({'seconds': round(time.monotonic() - started, 2)}), flush=True)
    except Exception as error:
        code = str(error)
        print(
            code
            if code.startswith('E_CACHE_') and code.replace('_', '').isalnum()
            else 'E_CACHE_ARCHIVE',
            flush=True,
        )
        raise SystemExit(1)
