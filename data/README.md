This README is **not documentation fluff** — it is a *constitutional guide* for anyone (including future you) who touches `data/`.

Below is a **final, production-grade `data/README.md`**, written to match the seriousness, neutrality, and longevity of your project.

You can copy–paste this verbatim.

---

```md
# 📚 data/ — Canonical Text & Knowledge Repository

## Purpose of This Directory

The `data/` directory is the **canonical heart** of the Vedic Library.

It contains **all non-code, non-UI, non-documentation assets** related to the Vedic corpus, including:

- Canonical textual data
- Structured representations of śāstra
- Translations and commentarial layers (when applicable)
- Future editions, facsimiles, and metadata

This directory is **framework-agnostic** and **frontend-independent**.

Frontend, backend, search engines, and APIs may be replaced.  
The structure and integrity of `data/` must endure.

---

## Core Design Principles

### 1. Textual Truth Over Convenience

The filesystem structure reflects **textual and canonical reality**, not UI convenience.

Examples:
- Bhagavad-gītā lives inside *Mahābhārata*
- Mahābhārata lives inside *Itihāsa*
- Itihāsa is treated as an independent canonical domain

Standalone views (e.g., “Bhagavad-gītā Reader”) are **UI projections**, not filesystem distortions.

---

### 2. Canonical Skeleton First, Content Later

This directory intentionally contains **many empty folders**.

This is not incompleteness — it is **architectural discipline**.

The full Vedic corpus is represented as a **canonical skeleton**, even if only a small portion
(e.g., Bhagavad-gītā) is populated initially.

Empty folders indicate:
- Planned scope
- Ontological clarity
- Future readiness without refactor

---

### 3. Clear Separation of Domains

Top-level folders represent **major canonical domains**, such as:

- Śruti
- Smṛti
- Itihāsa
- Purāṇa
- Āgama / Tantra
- Vedāṅga
- Upaveda
- Darśana
- Sampradāya traditions

No folder exists without **textual justification**.

No text is placed outside its proper domain.

---

### 4. Separation of Text and Interpretation

Where applicable, textual layers are kept separate:

- Canonical text (primary)
- Translations (secondary)
- Commentaries (tertiary)
- Educational or guided material (optional)

Canonical text is never:
- Rewritten
- Summarized
- Merged with interpretation

---

### 5. UID-Centric Design

All individual textual units (verses, sūtras, ślokas, etc.) are identified by **stable UIDs**.

UIDs:
- Never change
- Do not encode language, author, or interpretation
- Remain valid across UI, backend, and future systems

UID rules are defined in the documentation under `docs/`.

---

## What Does NOT Belong in `data/`

The following must **never** appear in this directory:

- Frontend code
- Backend code
- Framework configuration
- UI assets unrelated to texts
- Application state or user data
- AI-generated content without explicit labeling

---

## About PDFs, Facsimiles, and Editions

When present, PDFs or scanned materials are treated as **representations**, not as canonical text.

They are stored:
- Alongside the text they represent
- Clearly labeled by edition or source
- Without replacing structured canonical data

Example (future):

```

bhagavad-gita/
├── canonical/
├── translations/
├── commentaries/
└── editions/
├── critical-edition.pdf
├── gita-press.pdf
└── manuscript-facsimile/

```

---

## Pilot Scope: Bhagavad-gītā

Although the full Vedic corpus is structurally represented, **only Bhagavad-gītā** is actively
implemented as the initial pilot.

This is intentional.

All architectural decisions must remain **corpus-agnostic** and valid for:
- Vedas
- Upaniṣads
- Sūtras
- Purāṇas
- Āgamas
- Darśana texts
- Sampradāya literature

If a feature works only for Bhagavad-gītā, it is incomplete.

---

## Final Guiding Principle

> **This directory preserves what has been said —  
> not what is convenient to display.**

Treat every change here as **irreversible scholarship**, not application code.

Proceed slowly.  
Proceed correctly.
```

---

## What This README Achieves

* Locks **intent**
* Prevents future shortcuts
* Explains empty folders
* Protects canonical truth
* Makes the project intelligible to scholars, not just developers

Once this file is saved, `data/` becomes **constitutionally guarded**.

---

