#!/usr/bin/env python3
"""
Stage M4 — Migrate Exposition (Purports)

Creates exposition derivative files from normalized Vedabase data
using Editorial Units as the authoritative scope.

FINAL PATCH:
- Resolves normalized input via editorial_unit.source.normalized_file
- Correctly handles grouped verses (e.g. 1.16–18)
"""

import json
from pathlib import Path

# ------------------------------------------------------------------
# PATHS (LOCKED TO YOUR TREE)
# ------------------------------------------------------------------

EDITORIAL_DIR = Path(
    "data/itihasa/mahabharata/bhisma-parva/"
    "bhagavad-gita/derivatives/editorial-units/prabhupada"
)

NORMALIZED_DIR = Path(
    "data/_raw/itihasa/mahabharata/bhisma-parva/"
    "bhagavad-gita/vedabase/normalized"
)

OUTPUT_DIR = Path(
    "data/itihasa/mahabharata/bhisma-parva/"
    "bhagavad-gita/derivatives/exposition/en/prabhupada"
)

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

AUTHOR = "A. C. Bhaktivedanta Swami Prabhupāda"

# ------------------------------------------------------------------
# HELPERS
# ------------------------------------------------------------------

def load_json(path: Path):
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)

# ------------------------------------------------------------------
# MAIN
# ------------------------------------------------------------------

def main():
    editorial_files = sorted(
        EDITORIAL_DIR.glob("bg.*.prabhupada.editorial-unit.json")
    )

    migrated = 0
    skipped = 0

    for eu_path in editorial_files:
        eu = load_json(eu_path)

        # Gate: does this unit even have exposition?
        if not eu["scope"].get("has_exposition"):
            skipped += 1
            continue

        normalized_filename = eu["source"].get("normalized_file")
        if not normalized_filename:
            skipped += 1
            continue

        normalized_path = NORMALIZED_DIR / normalized_filename
        if not normalized_path.exists():
            print(f"⚠ Missing normalized file: {normalized_filename}")
            skipped += 1
            continue

        nd = load_json(normalized_path)
        purport = nd.get("purport")

        if not isinstance(purport, list):
            skipped += 1
            continue

        purport_paragraphs = [
            p.strip() for p in purport
            if isinstance(p, str) and p.strip()
        ]

        if not purport_paragraphs:
            skipped += 1
            continue

        exposition_text = "\n\n".join(purport_paragraphs)

        uid = eu["uid"] + ".exposition"

        out = {
            "schema": "vedic-library.exposition",
            "schema_version": "1.0.0",
            "uid": uid,
            "editorial_unit_ref": eu["uid"],
            "exposition": {
                "type": "purport",
                "language": "en",
                "author": AUTHOR,
                "content": exposition_text
            },
            "source": {
                "edition": "Bhagavad-gītā As It Is",
                "editor": "BBT",
                "lineage": "Gaudiya Vaishnava"
            }
        }

        out_path = OUTPUT_DIR / f"{uid}.json"
        with out_path.open("w", encoding="utf-8") as f:
            json.dump(out, f, ensure_ascii=False, indent=2)

        print(f"✓ Exposition migrated: {uid}")
        migrated += 1

    print("\nStage M4 COMPLETE")
    print(f"  Migrated : {migrated}")
    print(f"  Skipped  : {skipped}")

if __name__ == "__main__":
    main()

