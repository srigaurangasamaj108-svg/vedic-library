#!/usr/bin/env python3

import json
from pathlib import Path
import sys

TRANSLATION_DIR = Path(
    "data/itihasa/mahabharata/bhisma-parva/"
    "bhagavad-gita/derivatives/translations/en/prabhupada"
)

REQUIRED = {"schema", "schema_version", "uid", "editorial_unit_ref", "translation"}

def main():
    ok = True

    for path in TRANSLATION_DIR.glob("bg.*.translation.en.prabhupada.json"):
        with path.open(encoding="utf-8") as f:
            data = json.load(f)

        missing = REQUIRED - data.keys()
        if missing:
            print(f"❌ {path.name}: missing {missing}")
            ok = False
            continue

        t = data["translation"]
        if not t.get("content") or not t["content"].strip():
            print(f"❌ {path.name}: empty translation")
            ok = False

        print(f"✓ {path.name}")

    if not ok:
        sys.exit(1)

    print("\n✅ All translations are VALID")

if __name__ == "__main__":
    main()

