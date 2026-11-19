"""Reduce cold replay objects losslessly. Never modifies live models or archive indexes."""

import argparse
from compression import zstd
import importlib.util
import json
import lzma
import os
from pathlib import Path
import tempfile
import time
import zlib

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location(
    'compact_archive', ROOT / 'scripts/cache-archive.py'
)
archive = importlib.util.module_from_spec(spec)
spec.loader.exec_module(archive)
FILTERS = [{'id': lzma.FILTER_LZMA2, 'dict_size': 1024**2, 'preset': 4}]


def candidates(data, existing_size, fast=False):
    # Probe a bounded sample; avoid running a full compressor on high-entropy PNG/ZIP data.
    sample = data[:65536]
    codecs = [('zst', lambda value: zstd.compress(value, 1))]
    if not fast:
        codecs.extend(
            [
                ('z', lambda value: zlib.compress(value, 6)),
                ('xz', lambda value: lzma.compress(value, filters=FILTERS)),
            ]
        )
    for shuffled in (False, True):
        probe = archive.shuffle4(sample) if shuffled else sample
        source = None
        for codec, encode in codecs:
            if len(encode(probe)) / len(probe) >= existing_size / len(data) * 0.94:
                continue
            if source is None:
                source = archive.shuffle4(data) if shuffled else data
            payload = encode(source)
            if len(payload) < existing_size * 0.95:
                yield ('s4' if shuffled else '') + codec, payload


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        '--fast', action='store_true', help='probe only the fast Zstandard codec'
    )
    args = parser.parse_args()
    if any(
        'cache-archive-batch.py' in command
        or 'scripts/cache-policy.py' in command.replace('\\', '/')
        for command in archive.running_commands()
    ):
        raise ValueError('E_CACHE_COMPACT_ACTIVE')
    folder = archive.STORE / 'objects'
    before = after = changed = checked = 0
    started = time.monotonic()
    listing = tempfile.TemporaryFile(mode='w+t', encoding='utf-8')
    suffixes = tuple('.' + codec for codec in archive.CODECS)
    with os.scandir(folder) as entries:
        for entry in entries:
            if entry.name.endswith(suffixes) and entry.is_file(follow_symlinks=False):
                size = entry.stat(follow_symlinks=False).st_size
                before += size
                if size >= 16384:
                    listing.write(f'{size} {entry.name}\n')
    after = before
    listing.seek(0)
    for line in listing:
        length, name = line.rstrip('\n').split(' ', 1)
        size = int(length)
        file = folder / name
        checked += 1
        # Each known codec is read once. No lookup or decompressed-object cache is needed.
        with file.open('rb') as stream:
            data = archive.decode_object(
                stream.read(archive.BLOCK + 1), file.suffix[1:]
            )
        if archive.digest(data) != file.stem:
            raise ValueError('E_CACHE_OBJECT_HASH')
        best_codec, best_payload = None, None
        for codec, payload in candidates(data, size, fast=args.fast):
            if best_payload is None or len(payload) < len(best_payload):
                best_codec, best_payload = codec, payload
        if best_payload is None:
            continue
        if archive.digest(archive.decode_object(best_payload, best_codec)) != file.stem:
            raise ValueError('E_CACHE_COMPACT_HASH')
        destination = file.with_suffix('.' + best_codec)
        if destination == file or destination.exists():
            continue
        staging = None
        try:
            # Same-directory staging is required for the atomic replace; removed on failure.
            with tempfile.NamedTemporaryFile(
                prefix='.compact-', dir=folder, delete=False
            ) as stream:
                staging = Path(stream.name)
                stream.write(best_payload)
                stream.flush()
                os.fsync(stream.fileno())
            if (
                archive.digest(archive.decode_object(staging.read_bytes(), best_codec))
                != file.stem
            ):
                raise ValueError('E_CACHE_COMPACT_HASH')
            staging.replace(destination)
            file.unlink()
            after -= size - len(best_payload)
            changed += 1
        finally:
            if staging is not None:
                staging.unlink(missing_ok=True)
        if changed % 100 == 0:
            print(
                json.dumps(
                    {
                        'objectsCompacted': changed,
                        'savedMiB': round((before - after) / 1024**2, 2),
                    }
                ),
                flush=True,
            )
    listing.close()
    report = {
        'beforeBytes': before,
        'afterBytes': after,
        'objectsChecked': checked,
        'objectsCompacted': changed,
        'fastZstandardOnly': args.fast,
        'allChangedObjectsDecodedAndHashMatched': True,
        'liveModelsModified': False,
        'archiveIndexesModified': False,
        'lzmaDictionaryMiB': 1,
        'decoderMemoryLimitMiB': 32,
        'readCacheMiBLimit': 0,
        'seconds': round(time.monotonic() - started, 2),
    }
    output = ROOT / (
        'evidence/cleanup/run-01/store-compaction-' + str(time.time_ns()) + '.json'
    )
    output.write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(report), flush=True)


if __name__ == '__main__':
    try:
        main()
    except Exception as error:
        code = str(error)
        print(
            code
            if code.startswith('E_CACHE_') and code.replace('_', '').isalnum()
            else 'E_CACHE_COMPACT'
        )
        raise SystemExit(1)
