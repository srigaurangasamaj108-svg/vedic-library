#!/usr/bin/env python3
"""
m3_migrate_synonyms.py

Migrates word-for-word (synonyms) by Śrīla Prabhupāda
from normalized Vedabase data into Editorial-Unit–anchored
synonyms files.

Source of truth:
- normalized Vedabase JSON
- Editorial Units (M1 output)
"""

import json
from pathlib import Path

# ---------------------------------------------------------------------
# CONFIGURATION (LOCKED)
# ---------------------------------------------------------------------

NORMALIZED_DIR = Path(
    "data/_raw/itihasa/mahabharata/bhisma-parva/"
    "bhagavad-gita/vedabase/normalized"
)

EDITORIAL_UNIT_DIR = Path(
    "data/itihasa/mahabharata/bhisma-parva/"
    "bhagavad-gita/derivatives/editorial-units/prabhupada"
)

OUTPUT_DIR = Path(
    "data/itihasa/mahabharata/bhisma-parva/"
    "bhagavad-gita/derivatives/synonyms/prabhupada"
)

SCHEMA_INFO = {
    "name": "vedic-library.derivative.synonyms",
    "version": "2.0.0",
}

AUTHOR = "A. C. Bhaktivedanta Swami Prabhupāda"
LANGUAGE = "en"

# ---------------------------------------------------------------------
# HELPERS
# ---------------------------------------------------------------------

def load_json(path: Path) -> dict:
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def find_normalized_file(editorial_unit: dict) -> Path:
    source = editorial_unit.get("source", {})
    filename = source.get("normalized_file")

    if not filename:
        raise RuntimeError(
            f"Editorial Unit {editorial_unit['uid']} "
            "does not specify normalized_file"
        )

    path = NORMALIZED_DIR / filename
    if not path.exists():
        raise RuntimeError(f"Normalized file not found: {path}")

    return path


# ---------------------------------------------------------------------
# MAIN LOGIC
# ---------------------------------------------------------------------

def main():
    if not EDITORIAL_UNIT_DIR.exists():
        raise RuntimeError(f"Editorial Unit directory not found: {EDITORIAL_UNIT_DIR}")

    if not NORMALIZED_DIR.exists():
        raise RuntimeError(f"Normalized Vedabase directory not found: {NORMALIZED_DIR}")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    editorial_files = sorted(EDITORIAL_UNIT_DIR.glob("*.editorial-unit.json"))
    if not editorial_files:
        raise RuntimeError("No Editorial Unit files found.")

    print(f"Stage M3: Migrating synonyms for {len(editorial_files)} Editorial Units\n")

    migrated = 0
    skipped = 0

    for eu_path in editorial_files:
        editorial_unit = load_json(eu_path)
        uid = editorial_unit["uid"]

        scope = editorial_unit.get("scope", {})
        if not scope.get("has_synonyms"):
            print(f"⚠ Skipping {uid}: no synonyms in scope")
            skipped += 1
            continue

        normalized_path = find_normalized_file(editorial_unit)
        normalized = load_json(normalized_path)

        synonyms_data = normalized.get("synonyms")
        if not synonyms_data:
            print(f"⚠ Skipping {uid}: synonyms missing in normalized data")
            skipped += 1
            continue

        synonyms_obj = {
            "uid": f"{uid}.synonyms",
            "editorial_unit_ref": {
                "uid": uid,
                "schema": "vedic-library.editorial.unit",
                "version": "1.0.0",
            },
            "synonyms": {
                "language": LANGUAGE,
                "author": AUTHOR,
                "items": synonyms_data,
            },
            "source": {
                "derived_from": "vedabase.io",
                "normalized_file": normalized_path.name,
                "pipeline_stage": "migration.m3",
                "script": "m3_migrate_synonyms.py",
            },
            "schema": SCHEMA_INFO,
        }

        out_path = OUTPUT_DIR / f"{uid}.synonyms.json"
        with out_path.open("w", encoding="utf-8") as f:
            json.dump(synonyms_obj, f, ensure_ascii=False, indent=2)

        print(f"✓ Synonyms migrated: {uid}")
        migrated += 1

    print("\nStage M3 COMPLETE")
    print(f"  Migrated : {migrated}")
    print(f"  Skipped  : {skipped}")


if __name__ == "__main__":
    main()

