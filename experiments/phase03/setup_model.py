"""Download only the pinned static-image landmark model; verify before use."""
from pathlib import Path
from urllib.request import urlopen
import hashlib
import json

base=Path(__file__).resolve().parent/"models"
source=json.loads((base/"source.json").read_text(encoding="utf-8"))
path=base/"face_landmarker.task"
if path.is_file() and hashlib.sha256(path.read_bytes()).hexdigest()==source["sha256"]:
    print("Pinned model already verified")
else:
    data=urlopen(source["url"],timeout=60).read()
    if hashlib.sha256(data).hexdigest()!=source["sha256"]:
        raise SystemExit("Model hash mismatch; original kept; inspect source/version before updating")
    path.write_bytes(data)
    print("Downloaded and verified",source["id"],len(data),"bytes")
