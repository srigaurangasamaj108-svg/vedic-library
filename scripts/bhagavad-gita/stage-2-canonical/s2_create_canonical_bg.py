#!/usr/bin/env python3
"""
Stage-2 Canonical Extraction Script
Stage-1 Normalized Units → Canonical Bhagavad-gītā Scripture

FINAL CANONICAL RULES (LOCKED):

- Devanāgarī text alone determines verse boundaries
- Verse markers (॥ n ॥) are END delimiters, not verse content
- Verse text appears BEFORE its marker
- IAST is attached verbatim to each resulting verse
- No guessing, no silent failure, no fabrication

Schema: vedic-library.canonical.verse@1.0.0
"""

import json
import re
from pathlib import Path

# --------------------------------------------------
# CONFIGURATION (LOCKED)
# --------------------------------------------------

INTERMEDIATE_INPUT_DIR = Path(
    "data/_intermediate/bhagavad-gita/stage-1"
)

CANONICAL_OUTPUT_DIR = Path(
    "data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/canonical"
)

CANONICAL_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

SCRIPT_NAME = "s2_create_canonical_bg.py"
SCRIPT_VERSION = "1.4.0"

DEVANAGARI_VERSE_MARKER = re.compile(r"॥\s*(\d+)\s*॥")

# --------------------------------------------------
# HELPERS
# --------------------------------------------------

def split_devanagari(text: str):
    """
    Split Devanāgarī text using verse markers (॥ n ॥).

    IMPORTANT:
    - Markers are END delimiters
    - Verse n text is the text BEFORE marker (॥ n ॥)
    """
    matches = list(DEVANAGARI_VERSE_MARKER.finditer(text))

    if not matches:
        raise ValueError("No Devanāgarī verse markers found.")

    results = []

    for i, match in enumerate(matches):
        verse_num = int(match.group(1))

        # Slice boundaries
        start = matches[i - 1].end() if i > 0 else 0
        end = match.start()

        verse_text = text[start:end].strip()

        if not verse_text:
            raise ValueError(
                f"Empty Devanāgarī content for verse {verse_num}"
            )

        results.append((verse_num, verse_text))

    return results


def write_canonical(chapter, verse, devanagari, iast, derived_from):
    uid = f"bg.{chapter}.{verse}"
    out_path = CANONICAL_OUTPUT_DIR / f"{uid}.json"

    if out_path.exists():
        raise RuntimeError(f"Canonical file already exists: {uid}")

    canonical = {
        "uid": uid,

        "work": {
            "corpus": "itihasa",
            "text": "mahabharata",
            "section": "bhisma-parva",
            "subwork": "bhagavad-gita"
        },

        "location": {
            "chapter": chapter,
            "verse": verse
        },

        "text": {
            "script": "devanagari",
            "content": devanagari
        },

        "transliteration": {
            "scheme": "iast",
            "content": iast
        },

        "source": {
            "pipeline": "bhagavad-gita",
            "stage": 2,
            "script": SCRIPT_NAME,
            "script_version": SCRIPT_VERSION,
            "derived_from": derived_from
        },

        "schema": {
            "name": "vedic-library.canonical.verse",
            "version": "1.0.0"
        }
    }

    with out_path.open("w", encoding="utf-8") as f:
        json.dump(canonical, f, ensure_ascii=False, indent=2)

    print(f"✓ Canonical: {uid}")

# --------------------------------------------------
# PROCESSING
# --------------------------------------------------

def process_file(path: Path):
    with path.open(encoding="utf-8") as f:
        data = json.load(f)

    chapter = data["chapter"]
    verse = data["verse"]
    composite = data["composite"]

    devanagari = data["sanskrit"]["devanagari"]
    iast = data["sanskrit"]["iast"]

    derived_from = [
        f"vedabase/raw-json/{data['verse_id']}.json"
    ]

    # Non-composite verse
    if not composite:
        write_canonical(
            chapter,
            verse,
            devanagari,
            iast,
            derived_from
        )
        return

    # Composite verse-group → canonical split
    dev_splits = split_devanagari(devanagari)

    for vnum, dev_text in dev_splits:
        write_canonical(
            chapter,
            vnum,
            dev_text,
            iast,
            derived_from
        )

# --------------------------------------------------
# MAIN
# --------------------------------------------------

def main():
    files = sorted(INTERMEDIATE_INPUT_DIR.glob("*.normalized.json"))

    if not files:
        raise RuntimeError("No normalized files found.")

    print(f"Stage-2: Processing {len(files)} normalized files")
    print("Stage-2: Creating canonical Bhagavad-gītā scripture...")

    for f in files:
        process_file(f)

    print("Stage-2 canonical extraction COMPLETE.")

if __name__ == "__main__":
    main()

