# Translation Layer (Stage-3.1)

This directory contains verse-level translations derived from
canonical Sanskrit verses.

Rules:
- Canonical text MUST NOT be duplicated here
- Each file references exactly one canonical UID
- Multiple translations may coexist
- Translation files are derivative and mutable

③ Write Stage-3.1 Translation Extraction Script

(Vedabase → Prabhupāda English)

This script:

Reads Stage-1 normalized Vedabase JSON

Extracts English translation

Writes Stage-3.1 derivative translation files

Never touches canonical files
