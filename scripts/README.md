This README is the **operating manual** of your transformation machinery.
It defines discipline, stages, accountability, and—most importantly—*what not to do*.

Below is a **final, long-lived `scripts/README.md`**.
You can paste it verbatim.

---

```md
# ⚙️ scripts/ — Canonical Transformation Pipelines

## Purpose of This Directory

The `scripts/` directory contains **all executable logic** used to transform raw source material
into canonical, structured data for the Vedic Library.

This includes:

- Validation of raw inputs
- Normalization and segmentation
- UID assignment
- Canonical text extraction
- Generation of derivative layers (translations, glosses, metadata)
- Structural and schema validation

No script in this directory is considered optional or experimental once committed.

---

## Core Principle

> **Scripts transform.  
They do not interpret.**

Scripts exist to **mechanically process text**, not to explain, summarize, or teach it.

All meaning remains in the text.  
All authority remains in canonical data.

---

## Three-Zone Model (Context Reminder)

The system operates on a strict, one-way flow:

```

data/_raw/   →   scripts/   →   data/ (canonical)

```

- `_raw/` is immutable intake
- `scripts/` is controlled transformation
- `data/` is authoritative output

Scripts must never write back to `_raw/`.

---

## Script Organization Philosophy

The `scripts/` directory reflects **actual, maintained capabilities**, not aspirational scope.

Therefore:

- Only texts currently being processed have script directories
- There is no full corpus mirror here
- Empty or speculative pipelines are forbidden

This prevents architectural drift and false completeness.

---

## Per-Text Pipeline Structure

Each text (e.g., Bhagavad-gītā) has its own pipeline directory:

```

scripts/
├── bhagavad-gita/
│   ├── stage-0-intake/
│   ├── stage-1-normalize/
│   ├── stage-2-canonical/
│   ├── stage-3-derivatives/
│   └── stage-4-validation/
├── shared/
└── README.md

````

Pipelines are **linear, ordered, and irreversible**.

---

## The Five Stages (Canonical Meaning)

### Stage 0 — Intake & Validation
Purpose:
- Verify file integrity
- Confirm encoding
- Check expected structure
- Reject malformed inputs

Output status: **Untrusted but known**

---

### Stage 1 — Structural Normalization
Purpose:
- Split text into logical units (verses, sūtras, etc.)
- Normalize line breaks and ordering
- Prepare data for UID assignment

Output status: **Structurally reliable**

---

### Stage 2 — Canonical Extraction
Purpose:
- Extract primary text only
- Assign permanent UIDs
- Generate canonical JSON files
- Write to canonical directories

Output status: **Authoritative**

Once data enters Stage 2 output, it is considered scripture.

---

### Stage 3 — Derivative Generation
Purpose:
- Convert translations to structured JSON
- Generate word-by-word glosses
- Produce non-authoritative layers

Output status: **Secondary**

Derivative layers must never modify canonical text.

---

### Stage 4 — Validation & Audit
Purpose:
- Schema validation
- UID completeness checks
- Verse count verification
- Cross-layer consistency checks

Output status: **Certified**

Only data that passes Stage 4 is considered complete.

---

## Script Naming & Versioning

Every script must:

- Be prefixed with its stage (`s0_`, `s1_`, etc.)
- Declare its version
- Declare input and output paths
- Be deterministic and repeatable

Example header:

```python
# script: s2_create_canonical_json.py
# stage: 2 (canonical extraction)
# version: 1.0.0
# input: data/_raw/itihasa/mahabharata/bhagavad-gita/
# output: data/itihasa/mahabharata/bhisma-parva/bhagavad-gita/canonical/
````

Scripts without headers are invalid.

---

## Shared Utilities

Common logic lives in:

```
scripts/shared/
```

Examples:

* UID generation
* Schema validators
* Text normalization utilities
* Logging helpers

Shared utilities must be:

* Stateless
* Corpus-agnostic
* Fully documented

---

## What Scripts Must NEVER Do

Scripts must never:

* ❌ Introduce interpretation
* ❌ Alter canonical text after Stage 2
* ❌ Merge textual layers
* ❌ “Fix” content silently
* ❌ Depend on UI or frontend logic
* ❌ Write directly to `_raw/`
* ❌ Embed tradition-specific ideology

If a change alters meaning, it requires **human review**, not automation.

---

## Reprocessing & Corrections

If a canonical error is discovered:

1. Identify the raw source
2. Update or add a new script version
3. Re-run the pipeline
4. Replace canonical output with full traceability

Manual edits to canonical data are forbidden.

---

## Guiding Principle

> **Scripts are tools, not authors.**
> **Their job is to preserve fidelity, not create meaning.**

Treat every script as part of a scholarly instrument, not a convenience hack.

```

---

## Status After This Step

You now have:

- A complete **corpus skeleton**
- A protected **raw intake zone**
- A disciplined **transformation pipeline**
- Clear separation of authority

At this point, your project is **architecturally complete**.

---

```

