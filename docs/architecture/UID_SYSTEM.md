# 🧱 Universal UID System for All Śāstra

## Purpose
UIDs uniquely identify canonical textual units independent of:
- Language
- Translation
- Commentary
- UI
- Framework

---

## Core Rule
UIDs encode **location**, not meaning.

---

## Canonical Format
<work>.<structure>.<unit>

yaml
Copy code

Dot (`.`) is mandatory.

---

## Examples

### Bhagavad-gītā
- `bg.1.1`
- `bg.2.13`

### Śrīmad-Bhāgavatam
- `sb.7.7.19`

### Upaniṣads
- `isa.up.1`
- `kena.up.1.2`

### Mahābhārata
- `mbh.adi.1.85`

---

## What UID Must NOT Contain
- Language (`en`, `hi`)
- Author
- Sampradāya
- Commentary name
- Interpretation

---

## Extended Content (Referenced, Not Embedded)

Example: Translation
```json
{
  "ref": "bg.2.13",
  "type": "translation",
  "language": "en",
  "text": "As the embodied soul..."
}
Example: Commentary

json
Copy code
{
  "ref": "bg.2.13",
  "type": "commentary",
  "author": "Prabhupāda",
  "sampradāya": "Gauḍīya"
}
UIDs are eternal. Everything else evolves.
