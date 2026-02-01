This README is **crucial** — it defines provenance, discipline, and restraint.
What follows is a **final, archival-grade `_raw/README.md`**.
You can paste it verbatim.

---

```md
# 🧱 data/_raw/ — Archival Intake & Provenance Zone

## Purpose of This Directory

The `_raw/` directory is the **intake and preservation zone** of the Vedic Library.

It exists to store **original, unprocessed source material** exactly as it is received,
before any normalization, correction, or transformation occurs.

This includes (but is not limited to):

- Raw JSON dumps
- Plain text files (`.txt`)
- OCR outputs
- Scanned manuscripts
- PDFs received from external sources
- Research notes accompanying a source

Nothing in this directory is considered **canonical**.

---

## Core Principle

> **_raw preserves provenance, not authority._**

Files here represent **what was received**,  
not **what is correct**.

---

## Why `_raw/` Exists

This directory ensures:

- Reproducibility of the entire pipeline
- Auditability of transformations
- Ability to restart or revise processing at any time
- Protection of canonical layers from accidental corruption
- Clear separation between *source material* and *scripture*

Without `_raw/`, all later data becomes historically opaque.

---

## Ontological Structure

The folder structure inside `_raw/` mirrors the **full canonical Vedic corpus**, even if most folders are empty.

This ensures that **any incoming text** can be placed correctly without improvisation.

Example (illustrative):

```

data/_raw/
├── sruti/
├── smrti/
├── itihasa/
│   └── mahabharata/
│       └── bhagavad-gita/
├── purana/
├── agama/
├── vedanga/
├── upaveda/
├── darsana/
├── sampradaya/
└── README.md

```

Empty folders are intentional and meaningful.

---

## Typical Subfolders Within a Work

Inside a specific text (e.g., Bhagavad-gītā), `_raw/` may contain:

```

bhagavad-gita/
├── original-txt/
├── original-json/
├── ocr/
├── scans/
├── notes/
└── provenance.json

```

These names are descriptive, not prescriptive.
They may vary based on source type.

---

## Provenance File (`provenance.json`)

Whenever possible, each raw text collection should include a `provenance.json` file describing:

- Source name
- Editor / publisher (if known)
- Acquisition date
- Format (OCR, transcription, scan, etc.)
- Known issues or uncertainties
- Licensing or usage notes (if applicable)

This file documents **context**, not endorsement.

---

## What Is FORBIDDEN in `_raw/`

The following must **never** happen in this directory:

- ❌ Editing raw files “to fix mistakes”
- ❌ Adding UIDs
- ❌ Normalizing spellings
- ❌ Merging layers (e.g., verse + translation)
- ❌ Manual cleanup of OCR errors
- ❌ Direct consumption by frontend or backend
- ❌ Treating raw files as authoritative text

If a file needs fixing, it must be fixed **via scripts**, not by hand.

---

## Relationship to Scripts

All transformation of raw material is performed by **versioned scripts** in the `scripts/` directory.

Scripts must:
- Read from `_raw/`
- Write only to canonical data locations
- Declare their version and stage
- Leave `_raw/` untouched

The raw data is **never overwritten**.

---

## Relationship to Canonical Data

Canonical scripture lives outside `_raw/`.

Once a text enters canonical directories, it must be:

- Script-generated
- UID-stable
- Layer-separated
- Traceable back to `_raw/`

If canonical data cannot be traced to `_raw/`, it is invalid.

---

## Guiding Reminder

> **_raw is memory, not meaning._**  
> **_raw is history, not scripture._**

Treat this directory with archival seriousness.

Proceed slowly.  
Preserve everything.  
Transform deliberately.
```

---

## Why This README Matters

* Prevents accidental “quick fixes”
* Protects canonical sanctity
* Makes your pipeline defensible to scholars
* Allows future re-processing with confidence
* Signals that this project is **not casual**

Once this is in place, your data pipeline is **professionally complete**.

---


