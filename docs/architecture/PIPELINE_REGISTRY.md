# PIPELINE REGISTRY  
Vedic Library — Data Architecture & Processing Rules

Version: 1.0.0  
Status: LOCKED  
Scope: Bhagavad-gītā (reference implementation)

---

## 1. Purpose

This document is the **single source of truth** for:

- directory structure
- data layers
- file naming conventions
- processing stages
- schema responsibilities
- validation rules

All scripts, migrations, validators, and future expansions **must conform**
to this registry.

---

## 2. Core Design Principles (Normative)

- Canonical verses are immutable
- Editorial Units define authored meaning
- Derivative layers never modify canonical text
- Verse Index is routing-only
- Absence is represented by absence, not null artifacts
- Every layer is independently regenerable
- Every layer has its own validator

---

## 3. Data Layers Overview

_raw → source ingestion
normalized → cleaned source data
canonical → śāstra truth
editorial-units → authored semantic groupings
derivatives → translations, synonyms, exposition
index → routing & navigation

yaml
Copy code

Each layer is **strictly separated** and independently validated.

---

## 4. Canonical Layer

### Path
data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/canonical/

shell
Copy code

### Files
bg.1.1.json
bg.1.2.json
...

shell
Copy code

### Schema
vedic-library.canonical.verse @ 1.0.0

yaml
Copy code

### Rules

- One file per verse
- Sanskrit only (Devanāgarī + IAST)
- No translations
- No purports
- No editorial content

Canonical verses define **textual truth**.

---

## 5. Raw & Normalized Data

### Raw (Vedabase)
data/_raw/itihasa/mahabharata/bhisma-parva/bhagavad-gita/vedabase/raw-json/

shell
Copy code

### Normalized
data/_raw/itihasa/mahabharata/bhisma-parva/bhagavad-gita/vedabase/normalized/

yaml
Copy code

### Rules

- Normalized files may represent single verses or verse groups
- Grouped files (e.g. 1.16–18) reflect **source editorial grouping**
- Grouped files **inform** Editorial Unit creation but are not authoritative
- Provenance is preserved

---

## 5.5 Canonical Realignment Stage (Stage-2.5)

After canonical extraction, a corrective realignment stage may be applied
to ensure:

- proper Devanāgarī numerals
- consistent IAST markers
- verse-accurate transliteration

This stage **does not alter verse identity** and preserves canonical UIDs.

---

## 6. Editorial Units (Semantic Authority)

### Path
data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/
derivatives/editorial-units/prabhupada/

shell
Copy code

### Files
bg.1.1.prabhupada.editorial-unit.json
bg.1.16-18.prabhupada.editorial-unit.json

shell
Copy code

### Schema
vedic-library.editorial.unit @ 1.0.0

yaml
Copy code

### Rules

Editorial Units define:

- verse coverage
- author
- tradition
- derivative availability

Additional rules:

- Editorial Units may span multiple verses
- Editorial Units are the **semantic authority** for derivatives
- No derivative may exist without an Editorial Unit

---

## 7. Derivative Layers

All derivatives live under:

data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/derivatives/

shell
Copy code

### 7.1 Translations
translations/en/prabhupada/
bg.1.16-18.prabhupada.translation.en.json

shell
Copy code

### 7.2 Synonyms (Word-for-word)
synonyms/en/prabhupada/
bg.1.16-18.prabhupada.synonyms.en.json

shell
Copy code

### 7.3 Exposition (Purport / Commentary)
exposition/en/prabhupada/
bg.1.16-18.prabhupada.exposition.json

yaml
Copy code

### Rules

- One derivative file per Editorial Unit
- No derivative file is created if content does not exist
- Grouped verses share a single derivative file
- Derivatives never modify canonical text

---

## 8. Verse Index (Routing Layer)

### Path
data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/index/verse/

shell
Copy code

### Files
bg.1.16.index.json
bg.1.17.index.json
bg.1.18.index.json

shell
Copy code

### Schema
vedic-library.index.verse @ 1.0.0

yaml
Copy code

### Rules

- One index file per verse
- Index files:
  - reference canonical verse
  - reference editorial units
  - describe derivative availability
- Index files contain **no text**

---

## 9. Validators

### Location
scripts/validators/

yaml
Copy code

### Validators (Locked Set)

- validate_canonical_verse.py
- validate_editorial_unit.py
- validate_translation.py
- validate_synonyms.py
- validate_exposition.py
- validate_verse_index.py

### Rules

- Validators validate **structure**, not meaning
- Validators do not regenerate data
- All layers must validate cleanly

---

## 10. Regeneration Policy

### Safe to regenerate
- Verse Index
- Derivatives
- Normalized data

### Never regenerate (without scholarly review)
- Canonical verses
- Schema contracts

---

## 11. Expansion Policy

This pipeline is **text-agnostic**.

The same architecture applies to:

- Upaniṣads
- Purāṇas
- Dharmaśāstra
- Darśana texts
- Sampradāya corpora

Only paths and Editorial Units change.

---

## 12. Final Principle (Authoritative)

**Canonical text defines truth.**  
**Editorial Units define meaning.**  
**Derivatives express interpretation.**  
**Index defines navigation.**

---

**END OF PIPELINE REGISTRY**
