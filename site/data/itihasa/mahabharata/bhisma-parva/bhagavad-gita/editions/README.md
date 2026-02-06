# Bhagavad-gītā — Editions & Representations

## Purpose of This Directory

The `editions/` directory contains **representations** of Bhagavad-gītā,
not the canonical text itself.

This may include:
- Printed editions (PDF)
- Critical editions
- Manuscript scans
- Facsimiles
- Publisher-specific versions

These files are preserved for **reference and study**, not authority.

---

## Relationship to Canonical Text

Canonical authority resides exclusively in:

canonical/

yaml
Copy code

Editions in this directory:

- Do not replace canonical JSON
- Do not override UID structure
- Do not serve as primary data sources for the platform

They are treated as **historical or scholarly witnesses**.

---

## Naming & Organization

Edition files should be clearly named to indicate:

- Publisher or editor
- Edition type
- Approximate date (if known)

Example:
gita-press-gorakhpur.pdf
critical-edition-bori.pdf
manuscript-scan-kashmir-01/

yaml
Copy code

---

## Usage Policy

Editions may be:
- Linked for reference
- Used for comparison
- Cited in scholarship

They must never be:
- Parsed directly by frontend
- Treated as structured canonical data
- Used to silently modify canonical text

---

## Guiding Principle

> **Editions witness the text.  
They do not define it.**
