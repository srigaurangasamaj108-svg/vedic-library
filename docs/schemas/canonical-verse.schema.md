# Canonical Verse Schema
## vedic-library.canonical.verse @ 1.0.0

This document defines the **structural schema** for a canonical verse
in the Vedic Library.

It specifies **what fields exist** and **how they are shaped**.
Rules for how canonical content is *constructed* are defined separately
in `CANONICAL_TEXT_POLICY.md`.

---

## Schema Identity

- **Schema name:** `vedic-library.canonical.verse`
- **Schema version:** `1.0.0`
- **Granularity:** One file = one verse

---

## Top-Level Structure

```json
{
  "uid": "string",
  "work": { ... },
  "location": { ... },
  "text": { ... },
  "transliteration": { ... },
  "source": { ... },
  "schema": { ... }
}
All top-level fields are required.

Field Definitions
1. uid (string, required)
A globally unique, stable identifier for the verse.

Format (Bhagavad-gītā example):

php-template
Copy code
bg.<chapter>.<verse>
Example:

json
Copy code
"uid": "bg.13.12"
2. work (object, required)
Identifies the canonical position of the verse in the Vedic corpus.

json
Copy code
"work": {
  "corpus": "itihasa",
  "text": "mahabharata",
  "section": "bhisma-parva",
  "subwork": "bhagavad-gita"
}
All fields are required.

3. location (object, required)
Numeric verse location within the work.

json
Copy code
"location": {
  "chapter": 13,
  "verse": 12
}
Values MUST be integers

Chapter/verse identity MUST NOT be inferred from text content

4. text (object, required)
Canonical Sanskrit text in Devanāgarī script.

json
Copy code
"text": {
  "script": "devanagari",
  "content": "…"
}
script is fixed to "devanagari"

content contains the verse text

Verse markers MAY be present as defined by canonical policy

5. transliteration (object, required)
Canonical-aligned IAST transliteration.

json
Copy code
"transliteration": {
  "scheme": "iast",
  "content": "…"
}
Generated mechanically from Devanāgarī

No interpretive changes permitted

Verse markers MAY be present as defined by canonical policy

6. source (object, required)
Provenance and pipeline metadata.

json
Copy code
"source": {
  "pipeline": "bhagavad-gita",
  "stage": "2.5",
  "script": "s25_realign_iast_bg.py",
  "script_version": "2.2.0",
  "derived_from": [
    "vedabase/raw-json/bg-13-12.json"
  ]
}
Documents how this canonical verse was produced

Required for auditability and reproducibility

7. schema (object, required)
Schema declaration.

json
Copy code
"schema": {
  "name": "vedic-library.canonical.verse",
  "version": "1.0.0"
}
This binds the file to this schema definition.

Stability Guarantee
Once a canonical verse file conforms to this schema and is declared
locked, it MUST NOT be modified.

Any future improvements require:

A new canonical pipeline version, or

A new schema version

Canonical stability is mandatory.

yaml
Copy code

---

## Final clarification (important)

- ❌ The file was **not missing due to an error**
- ✅ It simply hadn’t been *materialized yet*
- ✅ Now is the **perfect moment** to create it, because:
  - Stage-2.5 is locked
  - Canonical policy is finalized
  - No churn remains

---

