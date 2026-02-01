# Canonical Text Policy
## Vedic Library Project

This document defines the **binding rules** for creating and maintaining
canonical textual data in the Vedic Library.

These rules apply to **all śāstra**, regardless of corpus, tradition,
language, or source edition.

---

## 1. Definition of “Canonical”

In this project, **canonical text** means:

- Textual content that represents the *primary śāstric witness*
- Free from interpretation, commentary, or pedagogy
- Stable, reproducible, and auditable

Canonical text is **not**:
- A translation
- A commentary
- A paraphrase
- A reader-oriented presentation

---

## 2. Canonical Authority Layers

### 2.1 Primary Canonical Layer
- **Script:** Devanāgarī
- **Status:** Absolute authority
- **Source:** Normalized from textual editions

No canonical operation may alter Devanāgarī content *semantically*.

---

### 2.2 Canonical-Aligned Mechanical Layers
These are derived mechanically from the primary layer.

#### a) IAST Transliteration
- Generated algorithmically from Devanāgarī
- No human intervention
- No borrowing from third-party transliterations

IAST is canonical-aligned, **not independently authoritative**.

---

## 3. Verse Identity & Structure

- Verse identity is determined by metadata:
  - `location.chapter`
  - `location.verse`
- Verse numbers are **structural metadata**, not śloka content.

---

## 4. Verse Markers (LOCKED)

### 4.1 Devanāgarī Marker Rules

- Every canonical verse MUST end with exactly one marker:
॥ <Devanāgarī numeral> ॥

diff
Copy code
- Example:
॥ २४ ॥

yaml
Copy code
- Arabic numerals MUST NOT appear in Devanāgarī text.

If a source omits verse markers, they are **added mechanically**.
If a source contains markers, they are **normalized**.

---

### 4.2 IAST Marker Rules

- Every IAST block MUST end with exactly one marker:
|| <Arabic numeral> ||

diff
Copy code
- Example:
|| 24 ||

yaml
Copy code

No IAST block may contain more than one verse marker.

---

## 5. Normalization Rules (Stage-2.5)

Stage-2.5 is a **mechanical canonical alignment stage**.

It is responsible for:

1. Removing any pre-existing verse markers
2. Appending normalized verse markers
3. Regenerating IAST via a transliteration engine
4. Ensuring one-to-one verse alignment

Stage-2.5 MUST:
- Never interpret meaning
- Never guess segmentation
- Never fabricate text

---

## 6. Prohibited Actions

Canonical data MUST NOT:

- Include translations
- Include commentary
- Include word meanings
- Include explanatory notes
- Mix scripts or numeral systems

All such material belongs to **derivative stages (Stage-3+)**.

---

## 7. Schema Binding

All canonical verse files MUST conform to:

schema.name = vedic-library.canonical.verse
schema.version = 1.0.0

yaml
Copy code

Any future changes to canonical rules MUST result in:
- A new policy document revision
- OR a new schema version

---

## 8. Finality

Once a canonical layer is declared “locked”:

- It MUST NOT be modified
- Any improvements require a **new canonical version**
- Downstream layers must adapt to it

Canonical stability is a first-class principle.
