#!/usr/bin/env python3
"""
Validate Verse Index files
Matches current M5 implementation (single editorial unit per verse)
"""

import json
from pathlib import Path
import sys

INDEX_DIR = Path(
    "data/itihasa/mahabharata/bhisma-parva/"
    "bhagavad-gita/index/verse"
)

REQUIRED_TOP = {
    "schema",
    "schema_version",
    "verse_uid",
    "work",
    "location",
    "canonical_ref",
    "editorial_unit",
    "derivatives"
}

def main():
    ok = True

    if not INDEX_DIR.exists():
        print(f"❌ Verse index directory not found: {INDEX_DIR}")
        sys.exit(1)

    for path in sorted(INDEX_DIR.glob("bg.*.index.json")):
        with path.open(encoding="utf-8") as f:
            data = json.load(f)

        missing = REQUIRED_TOP - data.keys()
        if missing:
            print(f"❌ {path.name}: missing {missing}")
            ok = False
            continue

        eu = data["editorial_unit"]
        if "uid" not in eu:
            print(f"❌ {path.name}: editorial_unit.uid missing")
            ok = False

        derivatives = data.get("derivatives", {})
        for layer in ("synonyms", "translations", "exposition"):
            if layer in derivatives:
                d = derivatives[layer]
                if "available" not in d or "refs" not in d:
                    print(
                        f"❌ {path.name}: malformed derivatives.{layer}"
                    )
                    ok = False

        print(f"✓ {path.name}")

    if not ok:
        sys.exit(1)

    print("\n✅ All verse index files are VALID")

if __name__ == "__main__":
    main()

