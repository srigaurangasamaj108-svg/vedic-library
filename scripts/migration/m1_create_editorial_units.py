#!/usr/bin/env python3
"""
m1_create_editorial_units.py

Creates Editorial Unit metadata files from normalized Vedabase data.

Source of truth:
data/_raw/itihasa/mahabharata/bhisma-parva/bhagavad-gita/vedabase/normalized/

This script DOES NOT copy translation/synonyms/purport text.
It only creates Editorial Unit descriptors.
"""

import json
import re
from pathlib import Path

# ---------------------------------------------------------------------
# CONFIGURATION (LOCKED)
# ---------------------------------------------------------------------

INPUT_DIR = Path(
    "data/_raw/itihasa/mahabharata/bhisma-parva/"
    "bhagavad-gita/vedabase/normalized"
)

OUTPUT_DIR = Path(
    "data/itihasa/mahabharata/bhisma-parva/"
    "bhagavad-gita/derivatives/editorial-units/prabhupada"
)

AUTHOR = {
    "id": "prabhupada",
    "name": "A. C. Bhaktivedanta Swami Prabhupāda",
    "tradition": "Gaudiya Vaishnava",
}

EDITORIAL_SCHEMA = {
    "name": "vedic-library.editorial.unit",
    "version": "1.0.0",
}

# ---------------------------------------------------------------------
# HELPERS
# ---------------------------------------------------------------------

FILENAME_PATTERN = re.compile(
    r"vedabase-bg-(\d{2})-(\d{2})(?:-(\d{2}))?\.normalized\.json"
)


def parse_filename(filename: str):
    """
    Extract chapter, from_verse, to_verse from filename.
    """
    match = FILENAME_PATTERN.fullmatch(filename)
    if not match:
        raise ValueError(f"Unrecognized filename format: {filename}")

    chapter = int(match.group(1))
    from_verse = int(match.group(2))
    to_verse = int(match.group(3)) if match.group(3) else from_verse

    return chapter, from_verse, to_verse


def detect_scope(normalized_data: dict):
    """
    Infer what kinds of content exist in this editorial unit.
    """
    return {
        "has_synonyms": bool(normalized_data.get("synonyms")),
        "has_translation": bool(normalized_data.get("translation")),
        "has_exposition": bool(normalized_data.get("purport")),
    }


# ---------------------------------------------------------------------
# MAIN LOGIC
# ---------------------------------------------------------------------

def main():
    if not INPUT_DIR.exists():
        raise RuntimeError(f"Input directory not found: {INPUT_DIR}")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    files = sorted(INPUT_DIR.glob("vedabase-bg-*.normalized.json"))
    if not files:
        raise RuntimeError("No normalized Vedabase files found.")

    print(f"Creating Editorial Units from {len(files)} files...\n")

    for file_path in files:
        chapter, from_v, to_v = parse_filename(file_path.name)

        with file_path.open("r", encoding="utf-8") as f:
            normalized = json.load(f)

        uid = (
            f"bg.{chapter}.{from_v}"
            if from_v == to_v
            else f"bg.{chapter}.{from_v}-{to_v}"
        )
        uid = f"{uid}.prabhupada"

        editorial_unit = {
            "uid": uid,
            "author": AUTHOR,
            "work": {
                "corpus": "itihasa",
                "text": "mahabharata",
                "section": "bhisma-parva",
                "subwork": "bhagavad-gita",
            },
            "covers": {
                "chapter": chapter,
                "from_verse": from_v,
                "to_verse": to_v,
            },
            "scope": detect_scope(normalized),
            "content": {
                "synonyms_ref": f"{uid}.synonyms.en"
                if normalized.get("synonyms")
                else None,
                "translation_ref": f"{uid}.translation.en"
                if normalized.get("translation")
                else None,
                "exposition_ref": f"{uid}.exposition"
                if normalized.get("purport")
                else None,
            },
            "source": {
                "derived_from": "vedabase.io",
                "normalized_file": file_path.name,
                "pipeline_stage": "migration.m1",
            },
            "schema": EDITORIAL_SCHEMA,
        }

        out_file = OUTPUT_DIR / f"{uid}.editorial-unit.json"
        with out_file.open("w", encoding="utf-8") as f:
            json.dump(editorial_unit, f, ensure_ascii=False, indent=2)

        print(f"✓ Editorial Unit: {uid}")

    print("\nStage M1 COMPLETE: Editorial Units created.")


if __name__ == "__main__":
    main()

