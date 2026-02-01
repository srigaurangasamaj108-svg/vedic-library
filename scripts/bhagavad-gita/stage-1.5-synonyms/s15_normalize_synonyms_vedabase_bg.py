#!/usr/bin/env python3
"""
Stage-1.5 — Normalize Vedabase Word-for-Word (Synonyms)

Reads `synonyms_raw` from normalized Vedabase JSON,
parses it, and writes structured `synonyms`.

SAFE:
- non-destructive
- idempotent
"""

import json
from pathlib import Path

# ------------------------------------------------------------------
# CONFIGURATION (LOCKED)
# ------------------------------------------------------------------

NORMALIZED_DIR = Path(
    "data/_raw/itihasa/mahabharata/bhisma-parva/"
    "bhagavad-gita/vedabase/normalized"
)

LANGUAGE = "en"

# ------------------------------------------------------------------
# PARSER
# ------------------------------------------------------------------

def parse_vedabase_synonyms(raw: str):
    lines = [l.strip() for l in raw.splitlines() if l.strip()]

    # Remove heading if present
    if lines and lines[0].lower() == "synonyms":
        lines = lines[1:]

    blocks = []
    buf = []

    for line in lines:
        buf.append(line)
        if line == ";":
            blocks.append(buf)
            buf = []

    results = []

    for block in blocks:
        if "—" not in block:
            continue

        idx = block.index("—")
        sanskrit = " ".join(p for p in block[:idx] if p not in {"-", "—"}).strip()
        meaning = " ".join(p for p in block[idx + 1:] if p not in {";", "—"}).strip()

        if sanskrit and meaning:
            results.append({
                "sanskrit": sanskrit,
                "meaning": meaning
            })

    return results

# ------------------------------------------------------------------
# MAIN
# ------------------------------------------------------------------

def main():
    files = sorted(NORMALIZED_DIR.glob("vedabase-bg-*.normalized.json"))
    if not files:
        raise RuntimeError("No normalized Vedabase files found.")

    updated = 0
    skipped = 0

    print(f"Stage-1.5: Processing {len(files)} normalized files\n")

    for path in files:
        with path.open("r", encoding="utf-8") as f:
            data = json.load(f)

        raw_syn = data.get("synonyms_raw")
        if not isinstance(raw_syn, str):
            skipped += 1
            continue

        items = parse_vedabase_synonyms(raw_syn)
        if not items:
            skipped += 1
            continue

        data["synonyms"] = {
            "language": LANGUAGE,
            "items": items
        }

        with path.open("w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        print(f"✓ Synonyms normalized: {path.name}")
        updated += 1

    print("\nStage-1.5 COMPLETE")
    print(f"  Updated : {updated}")
    print(f"  Skipped : {skipped}")

if __name__ == "__main__":
    main()

