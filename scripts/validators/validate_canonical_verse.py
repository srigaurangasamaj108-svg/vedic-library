#!/usr/bin/env python3
"""
Canonical Verse Schema Validator
Schema: vedic-library.canonical.verse @ 1.0.0

Validates:
- Required fields
- Field types
- Canonical structure
- Verse marker correctness
- Script / numeral purity

Read-only. No mutations.
"""

import json
import re
import sys
from pathlib import Path

# --------------------------------------------------
# CONFIG
# --------------------------------------------------

CANONICAL_DIR = Path(
    "data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/canonical"
)

SCHEMA_NAME = "vedic-library.canonical.verse"
SCHEMA_VERSION = "1.0.0"

# --------------------------------------------------
# REGEX RULES
# --------------------------------------------------

DEV_VERSE_MARKER = re.compile(r"॥\s*[०-९]+\s*॥$")
IAST_VERSE_MARKER = re.compile(r"\|\|\s*\d+\s*\|\|$")

DEVANAGARI_DIGITS = set("०१२३४५६७८९")
ARABIC_DIGITS = set("0123456789")

# --------------------------------------------------
# UTILITIES
# --------------------------------------------------

def fail(path, message):
    print(f"❌ {path.name}: {message}")
    return False


def success(path):
    print(f"✓ {path.name}")
    return True


# --------------------------------------------------
# VALIDATION LOGIC
# --------------------------------------------------

def validate_file(path: Path) -> bool:
    try:
        with path.open(encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        return fail(path, f"Invalid JSON ({e})")

    # ---- Top-level keys ----
    required_keys = {
        "uid", "work", "location",
        "text", "transliteration",
        "source", "schema"
    }

    if not required_keys.issubset(data.keys()):
        return fail(path, "Missing required top-level keys")

    # ---- Schema binding ----
    schema = data["schema"]
    if schema.get("name") != SCHEMA_NAME:
        return fail(path, "Invalid schema name")

    if schema.get("version") != SCHEMA_VERSION:
        return fail(path, "Invalid schema version")

    # ---- UID ----
    uid = data["uid"]
    if not isinstance(uid, str) or not uid:
        return fail(path, "Invalid uid")

    # ---- Location ----
    loc = data["location"]
    if not isinstance(loc.get("chapter"), int):
        return fail(path, "location.chapter must be int")
    if not isinstance(loc.get("verse"), int):
        return fail(path, "location.verse must be int")

    verse_num = loc["verse"]

    # ---- Devanāgarī text ----
    text = data["text"]
    if text.get("script") != "devanagari":
        return fail(path, "text.script must be 'devanagari'")

    dev_content = text.get("content", "")
    if not isinstance(dev_content, str) or not dev_content.strip():
        return fail(path, "Empty Devanāgarī content")

    # Must end with Devanāgarī verse marker
    if not DEV_VERSE_MARKER.search(dev_content):
        return fail(path, "Missing or invalid Devanāgarī verse marker")

    # Must NOT contain Arabic digits
    if any(d in dev_content for d in ARABIC_DIGITS):
        return fail(path, "Arabic digits found in Devanāgarī text")

    # ---- IAST ----
    trans = data["transliteration"]
    if trans.get("scheme") != "iast":
        return fail(path, "transliteration.scheme must be 'iast'")

    iast_content = trans.get("content", "")
    if not isinstance(iast_content, str) or not iast_content.strip():
        return fail(path, "Empty IAST content")

    # Must end with || n ||
    if not IAST_VERSE_MARKER.search(iast_content):
        return fail(path, "Missing or invalid IAST verse marker")

    # Must NOT contain Devanāgarī digits
    if any(d in iast_content for d in DEVANAGARI_DIGITS):
        return fail(path, "Devanāgarī digits found in IAST")

    return success(path)


# --------------------------------------------------
# MAIN
# --------------------------------------------------

def main():
    if not CANONICAL_DIR.exists():
        print("Canonical directory not found.")
        sys.exit(1)

    files = sorted(CANONICAL_DIR.glob("bg.*.json"))

    if not files:
        print("No canonical verse files found.")
        sys.exit(1)

    print(f"Validating {len(files)} canonical verses...\n")

    ok = True
    for f in files:
        if not validate_file(f):
            ok = False

    if not ok:
        print("\n❌ Validation FAILED.")
        sys.exit(1)

    print("\n✅ All canonical verses are VALID.")
    sys.exit(0)


if __name__ == "__main__":
    main()

