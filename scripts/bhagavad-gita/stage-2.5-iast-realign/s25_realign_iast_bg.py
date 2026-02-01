#!/usr/bin/env python3
"""
Stage-2.5 Canonical Alignment Script (FINAL)

Responsibilities:
- Normalize verse markers in Devanāgarī using Devanāgarī numerals (॥ १२ ॥)
- Regenerate clean, verse-exact IAST using indic-transliteration
- Append || 12 || markers in IAST (Arabic numerals)
- Guarantee exactly ONE marker per verse in both scripts

This stage is purely MECHANICAL and CANONICAL.
"""

import json
import re
from pathlib import Path

from indic_transliteration import sanscript
from indic_transliteration.sanscript import transliterate

# --------------------------------------------------
# CONFIGURATION (LOCKED)
# --------------------------------------------------

CANONICAL_DIR = Path(
    "data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/canonical"
)

SCRIPT_NAME = "s25_realign_iast_bg.py"
SCRIPT_VERSION = "2.2.0"

# --------------------------------------------------
# REGEX & NUMERAL MAPS
# --------------------------------------------------

DEV_VERSE_MARKER = re.compile(r"॥\s*\d+\s*॥")

DEVANAGARI_DIGITS = {
    "0": "०",
    "1": "१",
    "2": "२",
    "3": "३",
    "4": "४",
    "5": "५",
    "6": "६",
    "7": "७",
    "8": "८",
    "9": "९",
}

# --------------------------------------------------
# HELPERS
# --------------------------------------------------

def to_devanagari_numerals(number: int) -> str:
    """Convert Arabic numerals to Devanāgarī numerals."""
    return "".join(DEVANAGARI_DIGITS[d] for d in str(number))


def normalize_devanagari(dev_text: str, verse: int) -> str:
    """
    Remove any existing verse markers and append a normalized one
    using Devanāgarī numerals.
    """
    clean = DEV_VERSE_MARKER.sub("", dev_text).strip()
    dev_num = to_devanagari_numerals(verse)
    return f"{clean}\n॥ {dev_num} ॥"


def devanagari_to_iast(dev_text: str) -> str:
    """
    Proper Sanskrit transliteration using indic-transliteration.
    """
    return transliterate(
        dev_text,
        sanscript.DEVANAGARI,
        sanscript.IAST
    )

# --------------------------------------------------
# MAIN
# --------------------------------------------------

def main():
    files = sorted(CANONICAL_DIR.glob("bg.*.json"))

    if not files:
        raise RuntimeError("No canonical Bhagavad-gītā files found.")

    print(f"Stage-2.5: Canonical alignment for {len(files)} verses")

    for path in files:
        with path.open(encoding="utf-8") as f:
            data = json.load(f)

        chapter = data["location"]["chapter"]
        verse = data["location"]["verse"]

        original_dev = data["text"]["content"]

        # --- Normalize Devanāgarī (with Devanāgarī numerals) ---
        normalized_dev = normalize_devanagari(original_dev, verse)

        # --- Prepare clean Devanāgarī for transliteration ---
        clean_dev_for_iast = DEV_VERSE_MARKER.sub("", original_dev).strip()

        # --- Generate IAST ---
        iast = devanagari_to_iast(clean_dev_for_iast).strip()
        iast = f"{iast}\n|| {verse} ||"

        # --- Write back ---
        data["text"]["content"] = normalized_dev

        data["transliteration"] = {
            "scheme": "iast",
            "content": iast
        }

        # Provenance update
        data["source"]["stage"] = "2.5"
        data["source"]["script"] = SCRIPT_NAME
        data["source"]["script_version"] = SCRIPT_VERSION

        with path.open("w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        print(f"✓ Canonical aligned: bg.{chapter}.{verse}")

    print("Stage-2.5 canonical alignment COMPLETE.")

# --------------------------------------------------

if __name__ == "__main__":
    main()

