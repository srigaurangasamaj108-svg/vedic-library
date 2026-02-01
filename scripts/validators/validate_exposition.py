#!/usr/bin/env python3

import json
from pathlib import Path
import sys

EXP_DIR = Path(
    "data/itihasa/mahabharata/bhisma-parva/"
    "bhagavad-gita/derivatives/exposition/en/prabhupada"
)

REQUIRED = {"schema", "schema_version", "uid", "editorial_unit_ref", "exposition"}

def main():
    ok = True

    for path in EXP_DIR.glob("bg.*.exposition.json"):
        with path.open(encoding="utf-8") as f:
            data = json.load(f)

        missing = REQUIRED - data.keys()
        if missing:
            print(f"❌ {path.name}: missing {missing}")
            ok = False
            continue

        content = data["exposition"].get("content", "").strip()
        if not content:
            print(f"❌ {path.name}: empty exposition")
            ok = False

        print(f"✓ {path.name}")

    if not ok:
        sys.exit(1)

    print("\n✅ All expositions are VALID")

if __name__ == "__main__":
    main()

