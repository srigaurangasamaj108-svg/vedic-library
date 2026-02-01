
#!/usr/bin/env python3
"""
Stage M5 — Create Verse Index (Per Verse)

Creates one index file per canonical verse, resolving
editorial units and derivative availability.
"""

import json
from pathlib import Path

# --------------------------------------------------
# PATHS (LOCKED)
# --------------------------------------------------

CANONICAL_DIR = Path(
    "data/itihasa/mahabharata/bhisma-parva/"
    "bhagavad-gita/canonical"
)

EDITORIAL_DIR = Path(
    "data/itihasa/mahabharata/bhisma-parva/"
    "bhagavad-gita/derivatives/editorial-units/prabhupada"
)

OUTPUT_DIR = Path(
    "data/itihasa/mahabharata/bhisma-parva/"
    "bhagavad-gita/index/verse"
)

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# --------------------------------------------------
# HELPERS
# --------------------------------------------------

def load_json(path: Path):
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)

# --------------------------------------------------
# MAIN
# --------------------------------------------------

def main():
    # Load editorial units
    editorial_units = []
    for eu_path in EDITORIAL_DIR.glob("bg.*.prabhupada.editorial-unit.json"):
        editorial_units.append(load_json(eu_path))

    # Build verse → editorial unit map
    verse_map = {}

    for eu in editorial_units:
        chapter = eu["covers"]["chapter"]
        start = eu["covers"]["from_verse"]
        end = eu["covers"]["to_verse"]

        for v in range(start, end + 1):
            verse_uid = f"bg.{chapter}.{v}"
            verse_map[verse_uid] = eu

    created = 0

    for canon_path in CANONICAL_DIR.glob("bg.*.json"):
        canon = load_json(canon_path)

        chapter = canon["location"]["chapter"]
        verse = canon["location"]["verse"]
        verse_uid = f"bg.{chapter}.{verse}"

        eu = verse_map.get(verse_uid)
        if not eu:
            continue

        derivatives = {
            "synonyms": {
                "available": eu["scope"]["has_synonyms"],
                "refs": (
                    [eu["content"]["synonyms_ref"]]
                    if eu["scope"]["has_synonyms"]
                    else []
                )
            },
            "translations": {
                "available": eu["scope"]["has_translation"],
                "refs": (
                    [eu["content"]["translation_ref"]]
                    if eu["scope"]["has_translation"]
                    else []
                )
            },
            "exposition": {
                "available": eu["scope"]["has_exposition"],
                "refs": (
                    [eu["content"]["exposition_ref"]]
                    if eu["scope"]["has_exposition"]
                    else []
                )
            }
        }

        index = {
            "schema": "vedic-library.verse.index",
            "schema_version": "1.0.0",
            "verse_uid": verse_uid,
            "work": eu["work"],
            "location": {
                "chapter": chapter,
                "verse": verse
            },
            "canonical_ref": verse_uid,
            "editorial_unit": {
                "uid": eu["uid"],
                "covers": eu["covers"]
            },
            "derivatives": derivatives
        }

        out_path = OUTPUT_DIR / f"{verse_uid}.index.json"
        with out_path.open("w", encoding="utf-8") as f:
            json.dump(index, f, ensure_ascii=False, indent=2)

        print(f"✓ Verse index created: {verse_uid}")
        created += 1

    print("\nStage M5 COMPLETE")
    print(f"  Created : {created}")

if __name__ == "__main__":
    main()

