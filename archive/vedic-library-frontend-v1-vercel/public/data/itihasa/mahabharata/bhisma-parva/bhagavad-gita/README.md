The Three Bhagavad-gītā READMEs (Authoritative)

There are exactly three README.md files you must have for Bhagavad-gītā, each with a different scope of authority.

Location	Scope	Purpose
bhagavad-gita/README.md	Text-level	What this work is, where it sits canonically
bhagavad-gita/commentaries/README.md	Interpretation-level	Rules for commentary layers
bhagavad-gita/editions/README.md	Representation-level	PDFs, scans, editions policy
======================================================================================

# Bhagavad-gītā — Canonical Work Overview

## Canonical Placement

Bhagavad-gītā is preserved here as a **canonical component of the Mahābhārata**.

Its placement reflects textual reality:

Itihāsa → Mahābhārata → Bhīṣma Parva → Bhagavad-gītā

yaml
Copy code

This repository does not treat Bhagavad-gītā as an independent or floating text.
Standalone presentations are handled at the UI level only.

---

## Purpose of This Directory

This directory contains **all authoritative data related to Bhagavad-gītā**, including:

- Canonical Sanskrit text
- Translations (separated by language)
- Commentarial layers
- Word-by-word glosses
- Structural metadata
- Editions and representations

The canonical Sanskrit text is the **primary authority**.
All other layers are explicitly secondary.

---

## UID System

Each verse is identified by a permanent UID of the form:

bg.<chapter>.<verse>

yaml
Copy code

Examples:
- bg.1.1
- bg.2.47
- bg.18.66

UIDs:
- Never change
- Do not encode language, author, or interpretation
- Are stable across frontend, backend, and future systems

---

## Layer Separation

The following separation is strictly enforced:

- `canonical/` → Sanskrit text only
- `translations/` → Language-specific renderings
- `commentaries/` → Human-authored explanations
- `word-by-word/` → Lexical and grammatical glosses
- `metadata/` → Structural information only
- `editions/` → PDFs, scans, and published representations

No file may mix layers.

---

## Pilot Status

Bhagavad-gītā serves as the **pilot text** for the Vedic Library.

All architectural decisions made here must remain valid for:
- Other Mahābhārata passages
- Other Itihāsa works
- Śruti, Smṛti, Āgama, Darśana, and Sampradāya texts

If a feature works only for Bhagavad-gītā, it is incomplete.

---

## Guiding Principle

> **This directory preserves the text as it exists,  
not as it is interpreted or popularized.**

Proceed with care.
