#!/usr/bin/env python3
"""
Stage-1 Normalization Script
Vedabase Bhagavad-gītā JSON → Clean Intermediate Units

Stage: 1 (Structural Normalization)
Reads from: data/_raw/
Writes to:  data/_intermediate/
Does NOT write canonical data.
"""

import json
import re
from pathlib import Path

# --------------------------------------------------
# CONFIGURATION (LOCKED)
# --------------------------------------------------

RAW_INPUT_DIR = Path(
    "data/_raw/itihasa/mahabharata/bhisma-parva/bhagavad-gita/vedabase/raw-json"
)

INTERMEDIATE_OUTPUT_DIR = Path(
    "data/_intermediate/bhagavad-gita/stage-1"
)

INTERMEDIATE_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# --------------------------------------------------
# HELPER FUNCTIONS
# --------------------------------------------------

def strip_header(text: str) -> str:
    """
    Removes leading presentation headers such as:
    'Devanagari\\n', 'Verse text\\n', 'Synonyms\\n', 'Translation\\n'
    """
    if not text:
        return ""

    text = text.strip()

    # Remove known leading labels
    text = re.sub(
        r"^(Devanagari|Verse text|Synonyms|Translation)\n+",
        "",
        text
    )

    return text.strip()


def clean_purport(paragraphs):
    """
    Cleans purport array:
    - Removes standalone 'Purport' markers
    - Preserves paragraph order
    """
    if not isinstance(paragraphs, list):
        return []

    cleaned = []
    for p in paragraphs:
        if not isinstance(p, str):
            continue
        p = p.strip()
        if not p:
            continue
        if p.lower() == "purport":
            continue
        cleaned.append(p)

    return cleaned


# --------------------------------------------------
# NORMALIZATION LOGIC
# --------------------------------------------------

def normalize_file(path: Path):
    with path.open(encoding="utf-8") as f:
        raw = json.load(f)

    chapter = raw.get("chapter")
    verse = raw.get("verse")
    verse_id = raw.get("verse_id")
    verse_group = raw.get("verse_group")

    # Sanskrit text
    devanagari = strip_header(
        raw.get("sanskrit", {}).get("devanagari", "")
    )
    iast = strip_header(
        raw.get("sanskrit", {}).get("iast", "")
    )

    # Synonyms (raw, unparsed)
    synonyms_raw = strip_header(raw.get("synonyms", ""))

    # Translation
    translation = strip_header(raw.get("translation", ""))

    # Purport
    purport = clean_purport(raw.get("purport", []))

    # Source metadata (commentary provenance)
    source = raw.get("source", {})

    normalized = {
        "temp_id": f"vedabase-{verse_id}",
        "chapter": chapter,
        "verse": verse,
        "verse_id": verse_id,
        "verse_group": verse_group,
        "composite": bool(verse_group),

        "sanskrit": {
            "devanagari": devanagari,
            "iast": iast
        },

        "synonyms_raw": synonyms_raw,
        "translation": translation,
        "purport": purport,

        "source": source
    }

    return normalized


# --------------------------------------------------
# MAIN
# --------------------------------------------------

def main():
    if not RAW_INPUT_DIR.exists():
        raise RuntimeError(f"RAW_INPUT_DIR does not exist: {RAW_INPUT_DIR}")

    # Recursively find ALL JSON files (chapter-01/, chapter-02/, etc.)
    files = sorted(RAW_INPUT_DIR.rglob("*.json"))

    if not files:
        raise RuntimeError(
            f"No JSON files found under {RAW_INPUT_DIR}"
        )

    print(f"Stage-1: Found {len(files)} Vedabase JSON files")
    print("Stage-1: Starting normalization...")

    for file_path in files:
        normalized = normalize_file(file_path)

        out_name = f"{normalized['temp_id']}.normalized.json"
        out_path = INTERMEDIATE_OUTPUT_DIR / out_name

        with out_path.open("w", encoding="utf-8") as f:
            json.dump(
                normalized,
                f,
                ensure_ascii=False,
                indent=2
            )

        print(f"✓ {file_path.name} → {out_name}")

    print("Stage-1 normalization COMPLETE.")


if __name__ == "__main__":
    main()

