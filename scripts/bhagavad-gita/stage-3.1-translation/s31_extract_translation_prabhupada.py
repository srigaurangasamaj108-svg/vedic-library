#!/usr/bin/env python3
"""
Stage-3.1 Translation Extraction Script
English Translation — Śrīla Prabhupāda

Handles:
- single-verse files (bg-1-15)
- multi-verse grouped files (bg-1-16-18)

Duplicates translation across verse range where required.
"""

import json
import re
from pathlib import Path

# --------------------------------------------------
# CONFIG
# --------------------------------------------------

NORMALIZED_DIR = Path(
    "data/_raw/itihasa/mahabharata/bhisma-parva/bhagavad-gita/vedabase/normalized"
)

OUTPUT_DIR = Path(
    "data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/derivatives/translations/en/prabhupada"
)

SCRIPT_NAME = "s31_extract_translation_prabhupada.py"
SCRIPT_VERSION = "1.1.0"

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# --------------------------------------------------
# FILENAME PARSER
# --------------------------------------------------

FILENAME_RE = re.compile(
    r"vedabase-bg-(\d+)-(\d+)(?:-(\d+))?\.normalized\.json"
)

# --------------------------------------------------
# TRANSLATION EXTRACTOR
# --------------------------------------------------

def extract_translation(src: dict) -> str:
    t = src.get("translation")
    if isinstance(t, str):
        return t.strip()
    if isinstance(t, dict):
        return t.get("en", "").strip()
    return ""

# --------------------------------------------------
# MAIN
# --------------------------------------------------

def main():
    files = sorted(NORMALIZED_DIR.glob("*.json"))

    if not files:
        raise RuntimeError(f"No normalized Vedabase files found in {NORMALIZED_DIR}")

    print(f"Stage-3.1: Extracting translations from {len(files)} files")

    for path in files:
        match = FILENAME_RE.match(path.name)
        if not match:
            print(f"⚠ Skipping unrecognized filename: {path.name}")
            continue

        chapter = int(match.group(1))
        verse_start = int(match.group(2))
        verse_end = int(match.group(3)) if match.group(3) else verse_start

        with path.open(encoding="utf-8") as f:
            src = json.load(f)

        translation_text = extract_translation(src)
        if not translation_text:
            continue

        for verse in range(verse_start, verse_end + 1):
            uid = f"bg.{chapter}.{verse}"

            out = {
                "uid": f"{uid}.translation.en.prabhupada",
                "canonical_ref": {
                    "uid": uid,
                    "schema": "vedic-library.canonical.verse",
                    "version": "1.0.0"
                },
                "translation": {
                    "language": "en",
                    "translator": "A.C. Bhaktivedanta Swami Prabhupāda",
                    "content": translation_text
                },
                "source": {
                    "edition": "Bhagavad-gītā As It Is",
                    "publisher": "BBT",
                    "year": 1972,
                    "derived_from": path.name,
                    "pipeline_stage": "3.1",
                    "script": SCRIPT_NAME,
                    "script_version": SCRIPT_VERSION
                },
                "schema": {
                    "name": "vedic-library.derivative.translation",
                    "version": "1.0.0"
                }
            }

            out_path = OUTPUT_DIR / f"{uid}.json"
            with out_path.open("w", encoding="utf-8") as f:
                json.dump(out, f, ensure_ascii=False, indent=2)

            print(f"✓ Translation: {uid}")

    print("Stage-3.1 translation extraction COMPLETE.")

# --------------------------------------------------

if __name__ == "__main__":
    main()

