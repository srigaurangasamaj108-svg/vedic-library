#!/usr/bin/env python3

import json
from pathlib import Path
import sys

SYN_DIR = Path(
    "data/itihasa/mahabharata/bhisma-parva/"
    "bhagavad-gita/derivatives/synonyms/prabhupada"
)

def main():
    ok = True

    for path in SYN_DIR.glob("bg.*.synonyms.en.prabhupada.json"):
        with path.open(encoding="utf-8") as f:
            data = json.load(f)

        items = data.get("synonyms", {}).get("items", [])
        if not items:
            print(f"❌ {path.name}: empty synonyms")
            ok = False
            continue

        for i in items:
            if not i.get("sanskrit") or not i.get("meaning"):
                print(f"❌ {path.name}: malformed item")
                ok = False
                break

        print(f"✓ {path.name}")

    if not ok:
        sys.exit(1)

    print("\n✅ All synonyms are VALID")

if __name__ == "__main__":
    main()

