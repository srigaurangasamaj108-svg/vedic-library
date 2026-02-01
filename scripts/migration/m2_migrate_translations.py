#!/usr/bin/env python3
"""
m2_migrate_translations.py

Migrates English translations by Śrīla Prabhupāda
from normalized Vedabase data into Editorial-Unit–anchored
translation files.

Source of truth:
- normalized Vedabase JSON
- Editorial Units (M1 output)

Stage-3.1 verse-based translations are NOT used.
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
    "bhagavad-gita/derivatives/translations/en/prabhupada"
)

SCHEMA_INFO = {
    "name": "vedic-library.derivative.translation",
    "version": "2.0.0",
}

TRANSLATOR = "A. C. Bhaktivedanta Swami Prabhupāda"
LANGUAGE = "en"

# ---------------------------------------------------------------------
# HELPERS
# ---------------------------------------------------------------------

def load_json(path: Path) -> dict:
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def find_normalized_file(editorial_unit: dict) -> Path:
    """
    Locate normalized Vedabase file using source metadata.
    """
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

    print(f"Stage M2: Migrating translations for {len(editorial_files)} Editorial Units\n")

    migrated = 0
    skipped = 0

    for eu_path in editorial_files:
        editorial_unit = load_json(eu_path)
        uid = editorial_unit["uid"]

        scope = editorial_unit.get("scope", {})
        if not scope.get("has_translation"):
            print(f"⚠ Skipping {uid}: no translation in scope")
            skipped += 1
            continue

        normalized_path = find_normalized_file(editorial_unit)
        normalized = load_json(normalized_path)

        translation_text = normalized.get("translation")
        if not translation_text:
            print(f"⚠ Skipping {uid}: translation missing in normalized data")
            skipped += 1
            continue

        translation_obj = {
            "uid": f"{uid}.translation.en",
            "editorial_unit_ref": {
                "uid": uid,
                "schema": "vedic-library.editorial.unit",
                "version": "1.0.0",
            },
            "translation": {
                "language": LANGUAGE,
                "translator": TRANSLATOR,
                "content": translation_text.strip(),
            },
            "source": {
                "derived_from": "vedabase.io",
                "normalized_file": normalized_path.name,
                "pipeline_stage": "migration.m2",
                "script": "m2_migrate_translations.py",
            },
            "schema": SCHEMA_INFO,
        }

        out_path = OUTPUT_DIR / f"{uid}.translation.json"
        with out_path.open("w", encoding="utf-8") as f:
            json.dump(translation_obj, f, ensure_ascii=False, indent=2)

        print(f"✓ Translation migrated: {uid}")
        migrated += 1

    print("\nStage M2 COMPLETE")
    print(f"  Migrated : {migrated}")
    print(f"  Skipped  : {skipped}")


if __name__ == "__main__":
    main()

