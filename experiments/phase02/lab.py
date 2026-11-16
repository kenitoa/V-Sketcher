"""Deterministic preparation fixtures, structural checks and run-record creation.

This is an experiment utility, not the product importer, renderer or auto-rigger.
Run from any working directory. No camera, microphone or network access is used.
"""
from __future__ import annotations

import argparse
from copy import deepcopy
from datetime import datetime, timezone
import hashlib
import importlib.metadata
import json
from pathlib import Path
import platform
import time

from PIL import Image, ImageDraw

BASE = Path(__file__).resolve().parent
ASSETS = BASE / "assets"
CONFIG = json.loads((BASE / "config.json").read_text(encoding="utf-8"))
SIZE = tuple(CONFIG["canvas"])
SOURCE = "SRC-PROCEDURAL-001"
USAGE = ["project-development", "technical-evaluation", "regression", "project-docs-and-repository"]


def write_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def canvas():
    return Image.new("RGBA", SIZE, (0, 0, 0, 0))


def make_parts(style="flat"):
    """Full-canvas layers; names left/right mean the character's own sides."""
    ink = "#263048"
    skin = "#ffe1bc" if style != "line" else "#ffffff"
    hair = "#54729c" if style != "line" else "#ffffff"
    shirt = "#73c6c2" if style != "line" else "#ffffff"
    layers = {}
    def layer(name):
        im = canvas()
        layers[name] = im
        return ImageDraw.Draw(im)
    d = layer("hair_back")
    d.rounded_rectangle((130, 50, 382, 357), radius=112, fill=hair, outline=ink, width=5)
    d = layer("body")
    d.rounded_rectangle((104, 310, 408, 505), radius=78, fill=shirt, outline=ink, width=5)
    d.polygon([(218, 320), (256, 360), (294, 320)], fill=skin, outline=ink, width=4)
    d = layer("head")
    d.ellipse((146, 77, 366, 326), fill=skin, outline=ink, width=5)
    d.ellipse((165, 225, 200, 242), fill="#f7b5b0")
    d.ellipse((312, 225, 347, 242), fill="#f7b5b0")
    for name, x in [("eye_right_open", 206), ("eye_left_open", 306)]:
        d = layer(name)
        d.ellipse((x-22, 173, x+22, 220), fill="white", outline=ink, width=4)
        d.ellipse((x-11, 181, x+11, 215), fill="#42547d", outline=ink, width=3)
        d.ellipse((x-7, 184, x, 194), fill="white")
    for name, x in [("eye_right_closed", 206), ("eye_left_closed", 306)]:
        d = layer(name)
        d.arc((x-22, 184, x+22, 213), 0, 180, fill=ink, width=5)
    d = layer("mouth_closed")
    d.arc((232, 245, 280, 265), 0, 180, fill=ink, width=4)
    d = layer("mouth_open")
    d.ellipse((237, 243, 275, 281), fill="#733e59", outline=ink, width=4)
    d.ellipse((245, 266, 270, 277), fill="#ec8f9e")
    d = layer("hair_front")
    d.polygon([(141, 155), (154, 91), (214, 57), (297, 58), (360, 105),
               (374, 162), (325, 145), (286, 105), (272, 151), (223, 123), (188, 157)],
              fill=hair, outline=ink, width=5)
    d = layer("accessory")
    d.polygon([(338, 107), (366, 92), (375, 126), (349, 132)], fill="#ffcf76", outline=ink, width=3)
    if style == "shaded":
        for name in ("head", "body", "hair_back", "hair_front"):
            im = layers[name]
            alpha = im.getchannel("A")
            overlay = Image.new("RGBA", SIZE)
            od = ImageDraw.Draw(overlay)
            for x in range(SIZE[0]):
                od.line((x, 0, x, SIZE[1]), fill=(32, 31, 70, max(0, int((x-220)*0.22))))
            overlay.putalpha(Image.composite(overlay.getchannel("A"), Image.new("L", SIZE), alpha))
            layers[name] = Image.alpha_composite(im, overlay)
    return layers


ORDER = ["hair_back", "body", "head", "eye_right_open", "eye_left_open", "mouth_closed", "hair_front", "accessory"]


def flattened(parts, order=ORDER):
    out = canvas()
    for name in order:
        out = Image.alpha_composite(out, parts[name])
    return out


def build():
    rows = []
    def register(sid, path, kind, tags, expectation, derived=None):
        rows.append({"id": sid, "path": path.relative_to(ASSETS).as_posix(), "kind": kind,
                     "tags": tags, "source_id": SOURCE, "purpose": "phase02-preparation-and-later-feasibility",
                     "allowed_use": USAGE, "derived_from": derived, "expected_preflight": expectation,
                     "sha256": sha(path)})
    def save(sid, im, tags, derived="PARTS-001", ext="png", expected=None):
        p = ASSETS / "single" / f"{sid}.{ext}"
        p.parent.mkdir(parents=True, exist_ok=True)
        im.save(p)
        register(sid, p, "single", tags, expected or {"errors": [], "warnings": []}, derived)
    parts = make_parts()
    part_rows = []
    for name, im in parts.items():
        path = ASSETS / "parts" / f"{name}.png"
        path.parent.mkdir(parents=True, exist_ok=True)
        im.save(path)
        stem = name.replace("_open", "").replace("_closed", "")
        role = "eye" if stem.startswith("eye_") else ("mouth" if stem == "mouth" else stem)
        side = "left" if "eye_left" in stem else "right" if "eye_right" in stem else "center"
        part_rows.append({"id": name, "path": path.relative_to(ASSETS).as_posix(), "role": role,
                          "side": side, "state": name.split("_")[-1] if role in ("eye", "mouth") else "base",
                          "origin": [0, 0], "bounds": list(im.getbbox()), "sha256": sha(path),
                          "source_id": SOURCE, "allowed_use": USAGE})
    library = {"schema_version": 1, "id": "PARTS-001", "canvas": list(SIZE), "parts": part_rows,
               "default_order": ORDER, "eye_states": ["open", "closed"], "mouth_states": ["closed", "open"],
               "source_id": SOURCE, "allowed_use": USAGE}
    libpath = ASSETS / "parts" / "library.json"
    write_json(libpath, library)
    register("PARTS-001", libpath, "parts", ["eyes-mouth-head-body", "overlap", "state-alternatives"], {"errors": [], "warnings": []})
    base = flattened(parts)
    save("S-001", base, ["flat", "front", "transparent"])
    bg = Image.new("RGBA", SIZE, "#f5e5ca")
    bg.alpha_composite(base)
    save("S-002", bg.convert("RGB"), ["opaque-background"])
    save("S-003", base.rotate(15, Image.Resampling.BICUBIC), ["tilted", "rotation-15deg"])
    occluded = base.copy()
    ImageDraw.Draw(occluded).polygon([(269, 106), (355, 117), (351, 230), (286, 236)], fill="#54729c", outline="#263048", width=4)
    save("S-004", occluded, ["eye-occluded", "hidden-region"])
    occluded = base.copy()
    ImageDraw.Draw(occluded).rounded_rectangle((151, 238, 361, 314), radius=20, fill="#b96587", outline="#263048", width=4)
    save("S-005", occluded, ["mouth-occluded", "hidden-region"])
    save("S-006", base.crop((175, 90, 350, 325)), ["cropped-head", "cropped-body"])
    multiple = Image.new("RGBA", (900, 512), "#e8eef8")
    multiple.alpha_composite(base, (0, 0))
    multiple.alpha_composite(base, (390, 0))
    save("S-007", multiple, ["multiple-characters"])
    save("S-008", flattened(make_parts("line")), ["line-art", "white-fills"])
    save("S-009", flattened(make_parts("shaded")), ["shaded", "style-variation"])
    save("S-010", base.resize((96, 96), Image.Resampling.LANCZOS), ["small-face", "low-resolution"])
    pixel = base.resize((64, 64), Image.Resampling.NEAREST).resize(SIZE, Image.Resampling.NEAREST)
    save("S-011", pixel, ["pixel-style"])
    save("S-012", canvas(), ["empty", "no-character"], expected={"errors": ["empty_image"], "warnings": []})
    p = ASSETS / "single" / "S-013.png"
    p.write_bytes(b"intentional-corrupt-png-fixture\n")
    register("S-013", p, "single", ["corrupt", "invalid-encoding"], {"errors": ["image_unreadable"], "warnings": []})
    save("S-014", bg.convert("RGB"), ["jpeg", "opaque"], ext="jpg")
    save("S-015", base.resize((1536, 1536), Image.Resampling.LANCZOS), ["larger-input", "not-product-limit"])
    blank_bg = Image.new("RGB", SIZE, "#f5e5ca")
    save("S-016", blank_bg, ["opaque-no-character", "semantic-negative"])
    # S-016 must pass decoding: identifying absence of a character is phase03 work.
    items = [{"id": name, "name": name, "path": f"../parts/{name}.png", "role": next(p["role"] for p in part_rows if p["id"] == name),
              "side": next(p["side"] for p in part_rows if p["id"] == name), "origin": [0, 0], "z": z}
             for z, name in enumerate(ORDER)]
    split = {"schema_version": 1, "canvas": list(SIZE), "coordinates": "top-left-pixels", "layers": items}
    def split_save(sid, data, tags, errors=None, warnings=None):
        path = ASSETS / "split" / f"{sid}.json"
        write_json(path, data)
        register(sid, path, "split", tags, {"errors": errors or [], "warnings": warnings or []}, "PARTS-001")
    split_save("L-001", split, ["normal", "coordinates", "roles", "order"])
    d = deepcopy(split)
    for i, part in enumerate(d["layers"]):
        part["name"] = f"Layer {i+1}"
        part.pop("role")
    split_save("L-002", d, ["ambiguous-names", "unknown-roles"], warnings=["role_unassigned"])
    d = deepcopy(split)
    d["layers"][0].pop("origin")
    split_save("L-003", d, ["missing-coordinates"], errors=["coordinates_missing"])
    empty = canvas()
    empty.save(ASSETS / "parts" / "empty_accessory.png")
    d = deepcopy(split)
    d["layers"].append({"id": "empty", "name": "empty", "path": "../parts/empty_accessory.png", "role": "accessory", "origin": [0, 0], "z": 8})
    split_save("L-004", d, ["empty-optional-layer"], warnings=["empty_layer"])
    d = deepcopy(split)
    d["layers"][1]["id"] = d["layers"][0]["id"]
    split_save("L-005", d, ["duplicate-id"], errors=["duplicate_id"])
    d = deepcopy(split)
    d["layers"] = [p for p in d["layers"] if p["role"] != "mouth"]
    split_save("L-006", d, ["missing-mouth", "partial-motion-only"], warnings=["missing_role:mouth"])
    d = deepcopy(split)
    d["layers"][0]["path"] = "../parts/does-not-exist.png"
    split_save("L-007", d, ["missing-resource"], errors=["resource_missing"])
    d = deepcopy(split)
    d["layers"][3]["side"], d["layers"][4]["side"] = "left", "right"
    split_save("L-008", d, ["side-conflict"], warnings=["side_conflict"])
    # Cropped sprites use explicit offsets: exercise nonzero coordinates and different sizes.
    d = deepcopy(split)
    for part in d["layers"]:
        im = parts[part["id"]]
        box = im.getbbox()
        path = ASSETS / "parts" / f"cropped_{part['id']}.png"
        im.crop(box).save(path)
        part["path"] = f"../parts/{path.name}"
        part["origin"] = list(box[:2])
    split_save("L-009", d, ["cropped-parts", "different-sizes", "nonzero-coordinates"])
    d = deepcopy(split)
    for part in d["layers"]:
        if part["id"] == "hair_front":
            part["z"] = -1
    split_save("L-010", d, ["visually-wrong-order", "structurally-valid"])
    premium_catalog = ASSETS / "premium" / "catalog.json"
    if premium_catalog.is_file():
        for entry in json.loads(premium_catalog.read_text(encoding="utf-8"))["samples"]:
            entry = deepcopy(entry)
            entry["sha256"] = sha(ASSETS / entry["path"])
            rows.append(entry)
    manifest = {"schema_version": 1, "config_id": CONFIG["config_id"], "source_id": SOURCE,
                "source_ids": [SOURCE, "SRC-IMAGEGEN-001"],
                "source_path": "../lab.py", "rights_path": "RIGHTS.md", "samples": rows,
                "scope": "procedural structure fixtures plus generated premium-art inputs; not real-user art or algorithm-quality evidence"}
    # Include every payload, even auxiliary cropped/empty layers, in integrity verification.
    payloads = sorted(p for p in ASSETS.rglob("*") if p.is_file() and p.suffix in (".png", ".jpg", ".json") and p.name != "manifest.json")
    manifest["files"] = {p.relative_to(ASSETS).as_posix(): sha(p) for p in payloads}
    write_json(ASSETS / "manifest.json", manifest)
    contact_sheet(rows)
    print(f"Built {len(rows)} sample records and {len(payloads)} payload files")


def check_image(path):
    try:
        with Image.open(path) as im:
            im.load()
            if im.width * im.height > CONFIG["fixture_only_max_pixels"]:
                return {"errors": ["fixture_size_limit"], "warnings": []}
            if im.convert("RGBA").getchannel("A").getbbox() is None:
                return {"errors": ["empty_image"], "warnings": []}
    except (OSError, ValueError):
        return {"errors": ["image_unreadable"], "warnings": []}
    return {"errors": [], "warnings": []}


def check_split(path):
    data = json.loads(path.read_text(encoding="utf-8"))
    errors, warnings, ids, roles = set(), set(), set(), set()
    for part in data["layers"]:
        if part["id"] in ids:
            errors.add("duplicate_id")
        ids.add(part["id"])
        role = part.get("role")
        if not role:
            warnings.add("role_unassigned")
        else:
            roles.add(role)
        origin = part.get("origin")
        if not isinstance(origin, list) or len(origin) != 2 or not all(isinstance(v, (int, float)) for v in origin):
            errors.add("coordinates_missing")
        resource = (path.parent / part["path"]).resolve()
        if not resource.is_relative_to(ASSETS.resolve()):
            errors.add("resource_outside_assets")
            continue
        if not resource.is_file():
            errors.add("resource_missing")
            continue
        with Image.open(resource) as im:
            bbox = im.convert("RGBA").getchannel("A").getbbox()
            if bbox is None:
                warnings.add("empty_layer")
            elif role == "eye" and origin is not None:
                cx = (bbox[0]+bbox[2])/2 + origin[0]
                # Anatomical left is viewer-right for this front-facing fixture.
                if (part.get("side") == "left" and cx < data["canvas"][0]/2) or (part.get("side") == "right" and cx > data["canvas"][0]/2):
                    warnings.add("side_conflict")
    if "role_unassigned" not in warnings:
        for role in ("head", "body", "eye", "mouth"):
            if role not in roles:
                warnings.add(f"missing_role:{role}")
    return {"errors": sorted(errors), "warnings": sorted(warnings)}


def check_library(path):
    data = json.loads(path.read_text(encoding="utf-8"))
    errors = set()
    observed = set()
    for part in data["parts"]:
        resource = ASSETS / part["path"]
        if not resource.is_file() or sha(resource) != part["sha256"]:
            errors.add("part_integrity")
            continue
        with Image.open(resource) as im:
            if list(im.size) != data["canvas"] or list(im.getbbox() or []) != part["bounds"]:
                errors.add("part_coordinates")
        if part.get("origin") != [0, 0] or not part.get("allowed_use") or part.get("source_id") != SOURCE:
            errors.add("part_metadata")
        observed.add((part["role"], part["side"], part["state"]))
    expected = {("eye", side, state) for side in ("left", "right") for state in ("open", "closed")}
    expected |= {("mouth", "center", state) for state in ("open", "closed")}
    if not expected.issubset(observed) or not {"head", "body"}.issubset({p["role"] for p in data["parts"]}):
        errors.add("part_states_missing")
    if not set(data["default_order"]).issubset({p["id"] for p in data["parts"]}):
        errors.add("part_order_reference")
    return {"errors": sorted(errors), "warnings": []}


def contact_sheet(rows):
    singles = [row for row in rows if row["kind"] == "single"]
    sheet = Image.new("RGB", (4*240, 4*270), "#f4f5f8")
    d = ImageDraw.Draw(sheet)
    for i, row in enumerate(singles):
        x, y = (i%4)*240, (i//4)*270
        tile = Image.new("RGBA", (224, 230), "#dee2e8")
        if row["id"] != "S-013":
            im = Image.open(ASSETS / row["path"]).convert("RGBA")
            im.thumbnail((220, 220), Image.Resampling.LANCZOS)
            tile.alpha_composite(im, ((224-im.width)//2, (230-im.height)//2))
        sheet.paste(tile.convert("RGB"), (x+8, y+8))
        d.text((x+8, y+242), row["id"] + " " + row["tags"][0], fill="#263048")
    sheet.save(BASE / "fixture-contact-sheet.png")


def verify(report, environment):
    if not environment.is_file():
        raise SystemExit("Collect the environment inventory before verification, or pass --environment")
    env = json.loads(environment.read_text(encoding="utf-8-sig"))
    m = json.loads((ASSETS / "manifest.json").read_text(encoding="utf-8"))
    integrity = [{"path": rel, "matches": (ASSETS/rel).is_file() and sha(ASSETS/rel) == expected} for rel, expected in m["files"].items()]
    checks = []
    for row in m["samples"]:
        t = time.perf_counter()
        path = ASSETS / row["path"]
        actual = check_image(path) if row["kind"] in ("single", "premium") else check_split(path) if row["kind"] == "split" else check_library(path)
        expected = row["expected_preflight"]
        passed = actual == expected and sha(path) == row["sha256"] and row["source_id"] in m["source_ids"] and bool(row["allowed_use"])
        checks.append({"input_id": row["id"], "expected": expected, "actual": actual, "passed": passed,
                       "preflight_wall_ms": round((time.perf_counter()-t)*1000, 3)})
    # Input data equivalence, not the product compositor/renderer implementation.
    l1 = json.loads((ASSETS/"split/L-001.json").read_text())
    l9 = json.loads((ASSETS/"split/L-009.json").read_text())
    def reference_pixels(spec):
        out = canvas()
        for layer in sorted(spec["layers"], key=lambda p: p["z"]):
            with Image.open(ASSETS/"split"/layer["path"]) as im:
                out.alpha_composite(im.convert("RGBA"), tuple(layer["origin"]))
        return out.tobytes()
    coordinate_equivalence = reference_pixels(l1) == reference_pixels(l9)
    semantic_limits = {"S-016": "decodable-opaque-blank; no semantic detector run", "L-010": "structural-pass-does-not-prove-correct-visual-order", "HQ-002": "real-alpha-with-visible-preexisting-fringe; decoding-pass-is-not-visual-quality-pass"}
    result = {"schema_version": 1, "run_id": report.stem, "task_ids": ["T-011", "T-012", "T-013", "T-014", "T-016", "T-020"],
              "timestamp_utc": datetime.now(timezone.utc).isoformat(), "config_id": CONFIG["config_id"],
              "python": platform.python_version(), "dependencies": {"Pillow": importlib.metadata.version("Pillow")},
              "manifest_sha256": sha(ASSETS/"manifest.json"), "config_sha256": sha(BASE/"config.json"),
              "generator_sha256": sha(Path(__file__)), "integrity": integrity, "checks": checks,
              "environment": {"id": env["environment_id"], "inventory_file": environment.name, "sha256": sha(environment)},
              "coordinate_fixture_equivalence": coordinate_equivalence, "semantic_limits": semantic_limits,
              "scope": "preparation preflight only; no automatic detection, rigging, tracking, OBS or external export tested",
              "passed": all(c["passed"] for c in checks) and all(f["matches"] for f in integrity) and coordinate_equivalence}
    write_json(report, result)
    print(f"{sum(c['passed'] for c in checks)}/{len(checks)} expected preflight outcomes; {sum(f['matches'] for f in integrity)}/{len(integrity)} file hashes; coordinate equivalence={coordinate_equivalence}")
    if not result["passed"]:
        for c in checks:
            if not c["passed"]:
                print(c)
        raise SystemExit(1)


def new_run(input_id, run_id):
    if not run_id or any(c not in "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_" for c in run_id):
        raise SystemExit("Run ID must contain only ASCII letters, digits, hyphen and underscore")
    m = json.loads((ASSETS / "manifest.json").read_text(encoding="utf-8"))
    row = next((r for r in m["samples"] if r["id"] == input_id), None)
    if not row:
        raise SystemExit("Unknown input ID")
    path = BASE / "results" / f"{run_id}.json"
    if path.exists():
        raise SystemExit("Run record already exists; choose a new ID")
    template = json.loads((BASE / "run-template.json").read_text(encoding="utf-8"))
    template.update({"run_id": run_id, "input_ids": [input_id], "config_id": CONFIG["config_id"],
                     "input_sha256": {input_id: row["sha256"]}, "config_sha256": sha(BASE/"config.json"),
                     "generator_sha256": sha(Path(__file__)), "status": "not_run"})
    environment = BASE/"results"/"environment-current.json"
    if environment.is_file():
        template["environment"]["id"] = json.loads(environment.read_text(encoding="utf-8-sig"))["environment_id"]
        template["environment"]["inventory_sha256"] = sha(environment)
    write_json(path, template)
    print(f"Created unexecuted run record: results/{run_id}.json")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("build")
    p = sub.add_parser("verify")
    p.add_argument("--report", type=Path, default=BASE/"results"/"readiness-001.json")
    p.add_argument("--environment", type=Path, default=BASE/"results"/"environment-current.json")
    p = sub.add_parser("new-run")
    p.add_argument("--input", required=True)
    p.add_argument("--id", required=True)
    args = parser.parse_args()
    if args.command == "build":
        build()
    elif args.command == "verify":
        verify(args.report, args.environment)
    else:
        new_run(args.input, args.id)


if __name__ == "__main__":
    main()
