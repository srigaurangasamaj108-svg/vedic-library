#!/usr/bin/env python3

import json
from pathlib import Path
import sys

EDITORIAL_DIR = Path(
    "data/itihasa/mahabharata/bhisma-parva/"
    "bhagavad-gita/derivatives/editorial-units/prabhupada"
)

REQUIRED_TOP = {
    "uid", "author", "work", "covers", "scope", "content", "source", "schema"
}

def main():
    ok = True

    for path in EDITORIAL_DIR.glob("bg.*.editorial-unit.json"):
        with path.open(encoding="utf-8") as f:
            data = json.load(f)

        missing = REQUIRED_TOP - data.keys()
        if missing:
            print(f"❌ {path.name}: missing {missing}")
            ok = False
            continue

        c = data["covers"]
        if c["from_verse"] > c["to_verse"]:
            print(f"❌ {path.name}: invalid verse range")
            ok = False

        scope = data["scope"]
        content = data["content"]

        if scope["has_exposition"] and not content.get("exposition_ref"):
            print(f"❌ {path.name}: exposition_ref missing")
            ok = False

        if not scope["has_exposition"] and content.get("exposition_ref") is not None:
            print(f"❌ {path.name}: exposition_ref should be null")
            ok = False

        print(f"✓ {path.name}")

    if not ok:
        sys.exit(1)

    print("\n✅ All editorial units are VALID")

if __name__ == "__main__":
    main()

