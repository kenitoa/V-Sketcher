"""Final task/document/provenance audit; separate from product behavior tests."""

from pathlib import Path
import datetime, hashlib, json, re, subprocess, sys

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'evidence/phase06'


def load(path):
    return json.loads(Path(path).read_text(encoding='utf-8'))


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def save(path, data):
    Path(path).write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def run():
    errors = []

    def require(condition, message):
        if not condition:
            errors.append(message)

    todo = (ROOT / 'docs/Todo').read_text(encoding='utf-8')
    prd = (ROOT / 'docs/PRD.md').read_text(encoding='utf-8')
    fn = (ROOT / 'docs/Function.md').read_text(encoding='utf-8')
    tasks = re.findall(r'^- \[([ x])\] T-(\d{3})', todo, re.M)
    require([int(v) for _, v in tasks] == list(range(1, 411)), 'Todo task IDs changed')
    require(
        all((mark == 'x') == (int(number) <= 60) for mark, number in tasks),
        'Only T-001..060 must be checked',
    )
    baseline = load(ROOT / 'experiments/phase05/results/baseline.json')
    for key, text, pattern in [
        ('function_ids', fn, r'\bF-[A-Z0-9]{2,3}-\d{3}\b'),
        ('product_direction_ids', prd, r'\bPD-\d{2}\b'),
        ('acceptance_ids', prd, r'\bAC-\d{2}\b'),
    ]:
        require(sorted(set(re.findall(pattern, text))) == baseline[key], key + ' changed')
    for name, text in [('Todo', todo), ('PRD', prd), ('Function', fn)]:
        require('v0.7' in text[:1200], name + ' version not updated')
    ledger = load(ROOT / 'experiments/phase05/decisions.json')
    require(ledger['m0']['state'] == 'HOLD' and not ledger['m0']['passed'], 'M0 cannot be passed')
    require(
        all(v['state'] == 'OPEN' for v in ledger['m0']['open_revalidation']),
        'Open M0 returns changed',
    )
    repro = load(OUT / 'reproducibility.json')
    package = load(OUT / 'package-audit.json')
    require(
        repro['passed']
        and repro['freshNode']
        and repro['freshVenv']
        and repro['npmCi']
        and repro['hashedPipInstall']
        and repro['requiredChecks'],
        'Fresh developer setup missing',
    )
    require(
        package['passed'] and not package['cleanWindowsOS'] and len(package['reports']) == 2,
        'Same-PC package scope/results incorrect',
    )
    for attempt in [1, 2]:
        app = load(OUT / f'packaged-run-{attempt}.json')
        require(
            app['passed']
            and app['packaged']
            and app['workerStopped']
            and app['worker']['frozen']
            and app['worker']['modelLoaded']
            and app['worker']['dependencyFilesInsideBundle'],
            'Packaged worker check failed',
        )
        require(
            app['channel'] == 'release'
            and not app['renderer']['diagnosticsVisible']
            and not app['renderer']['nodeExposed'],
            'Release UI/isolation check failed',
        )
    for item in package['files']:
        require(
            sha(ROOT / 'out/2DSketcher-win32-x64' / item['path']) == item['sha256'],
            'Package hash mismatch: ' + item['path'],
        )
    old02 = load(ROOT / 'experiments/phase02/assets/manifest.json')
    preserved02 = all(
        sha(ROOT / 'experiments/phase02/assets' / name) == digest
        for name, digest in old02['files'].items()
    )
    old03 = load(ROOT / 'experiments/phase03/results/verification.json')
    preserved03 = all(
        sha(ROOT / 'experiments/phase03' / name) == digest
        for name, digest in old03['code_sha256'].items()
    )
    preserved = {}
    for phase in [4, 5]:
        prefix = f'experiments/phase{phase:02d}/'
        manifest = load(ROOT / prefix / 'results/artifact-manifest.json')
        preserved[str(phase)] = all(
            sha(ROOT / name) == info['sha256']
            for name, info in manifest['files'].items()
            if name.startswith(prefix)
        )
    require(preserved02 and preserved03 and all(preserved.values()), 'Historical evidence changed')
    docs = [
        ROOT / 'README.md',
        ROOT / 'CONTRIBUTING.md',
        ROOT / 'AGENTS.md',
        ROOT / 'docs/Todo',
        ROOT / 'docs/PRD.md',
        ROOT / 'docs/Function.md',
        ROOT / 'docs/planning/06-foundation.md',
        *sorted((ROOT / 'docs/architecture').glob('*.md')),
    ]
    generated = {OUT / 'audit.json', OUT / 'artifact-manifest.json'}
    for doc in docs:
        for link in re.findall(r'\]\(([^)]+)\)', doc.read_text(encoding='utf-8')):
            if re.match(r'^[a-z]+:', link) or link.startswith('#'):
                continue
            target = (doc.parent / link.split('#')[0]).resolve()
            require(
                target.exists() or target in generated,
                'Broken link in ' + str(doc.relative_to(ROOT)) + ': ' + link,
            )
    log = (ROOT / '.local/repro/latest.log').read_text(encoding='utf-8', errors='replace')
    require(
        'tests 8' in log and 'Ran 3 tests' in log and 'Required foundation checks passed' in log,
        '11 fresh-environment test groups missing',
    )
    summary = {
        'passed': not errors,
        'errors': errors,
        'date': datetime.datetime.now(datetime.timezone.utc).isoformat(),
        'scope': 'Task, requirement ID, link, artifact and historical provenance audit; not additional functional tests',
        'tasks': len(tasks),
        'completedTasks': sum(mark == 'x' for mark, _ in tasks),
        'functionIDs': len(baseline['function_ids']),
        'productDirectionIDs': len(baseline['product_direction_ids']),
        'acceptanceIDs': len(baseline['acceptance_ids']),
        'nodeTestGroups': 8,
        'pythonTestGroups': 3,
        'packagedRuns': 2,
        'm0State': 'HOLD',
        'openM0Returns': 5,
        'historical02to05Preserved': preserved02 and preserved03 and all(preserved.values()),
        'hostedCIRun': False,
        'cleanWindowsOS': False,
    }
    save(OUT / 'audit.json', summary)
    names = (
        subprocess.check_output(
            ['git', 'ls-files', '--cached', '--others', '--exclude-standard', '-z'], cwd=ROOT
        )
        .decode('utf-8')
        .split('\0')
    )
    files = {}
    for name in names:
        if (
            not name
            or name == 'evidence/phase06/artifact-manifest.json'
            or name.startswith('experiments/')
        ):
            continue
        path = ROOT / name
        if path.is_file():
            files[name] = {'bytes': path.stat().st_size, 'sha256': sha(path)}
    zipfile = ROOT / 'out/make/zip/win32/x64/2DSketcher-win32-x64-0.1.0.zip'
    save(
        OUT / 'artifact-manifest.json',
        {
            'scope': 'Final phase06 source/docs/evidence and portable ZIP; package file inventory is package-audit.json',
            'files': files,
            'portableZip': {
                'path': str(zipfile.relative_to(ROOT)).replace('\\', '/'),
                'bytes': zipfile.stat().st_size,
                'sha256': sha(zipfile),
            },
        },
    )
    print(json.dumps(summary, ensure_ascii=False))
    if errors:
        raise SystemExit(1)


if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    run()
