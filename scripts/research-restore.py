"""Restore optional offline research tools without downloading or changing their bytes."""

import importlib.util
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('research_archive', ROOT / 'scripts/cache-archive.py')
archive = importlib.util.module_from_spec(spec)
spec.loader.exec_module(archive)
GROUPS = {'research-torch', 'research-weights', 'research-blender'}


def main():
    groups = sys.argv[1:] or sorted(GROUPS)
    if any(group not in GROUPS for group in groups):
        raise ValueError('E_RESEARCH_GROUP')
    for group in groups:
        if archive.group_path(group).exists():
            print(group + ': already available')
        else:
            archive.restore(group)


if __name__ == '__main__':
    try:
        main()
    except Exception as error:
        code = str(error)
        print(
            code
            if code.startswith('E_') and code.replace('_', '').isalnum()
            else 'E_RESEARCH_RESTORE'
        )
        raise SystemExit(1)
