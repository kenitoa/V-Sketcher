"""Remove only the throwaway distribution created by this remediation run."""
from pathlib import Path
import json
import re
import subprocess

root = Path(__file__).resolve().parents[1]
state_file = root/'.local/remediation-space/state.json'
state = json.loads(state_file.read_text(encoding='utf-8'))
install = Path(state['privateInstallDirectory']).resolve()
if not (install.is_relative_to((root/'.local/remediation-space').resolve()) and install.name == 'distro'
        and re.fullmatch(r'2DSketcher-Space-[a-f0-9]{10}', state['distro'])):
    raise SystemExit('E_REMEDIATION_CLEANUP_SCOPE')
out = root/'evidence/remediation26-31/cleanup-01.json'
if out.exists():
    raise SystemExit('E_REMEDIATION_EXISTS')
subprocess.run(['wsl.exe', '--terminate', state['distro']], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=60)
result = subprocess.run(['wsl.exe', '--unregister', state['distro']], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=120)
if result.returncode:
    raise SystemExit('E_REMEDIATION_CLEANUP')
state.update(mounted=False, unregistered=True)
state_file.write_text(json.dumps(state), encoding='utf-8')
out.write_text(json.dumps({'passed': True, 'ownedTemporaryDistroRemoved': True, 'normalWindowsDriveFilled': False,
                           'existingUserDistroModified': False, 'historicalEvidencePreserved': True}, indent=2)+'\n', encoding='utf-8')
print('Only the owned throwaway filesystem distribution was removed')
