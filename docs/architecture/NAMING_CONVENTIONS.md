This document may look “simple”, but in reality it is one of the most protective architectural shields you can put around a long-lived knowledge system.
I’ve written it with zero shortcuts, because naming mistakes are the #1 cause of entropy in large archives.

🏷️ Naming Conventions
Vedic Library Project
0. Purpose of This Document

This document defines binding naming conventions for the Vedic Library.

It answers:

How are files named?

How are folders named?

How are schemas named?

How are JSON fields named?

How are languages indicated?

What is explicitly forbidden?

The goal is not beauty, but:

Predictability, permanence, and zero ambiguity.

This document applies to:

data/

docs/

registry/

schemas

pipelines

frontend data loaders

1. Core Principle (Non-Negotiable)

Names encode role and location — never opinion, workflow, or time.

Therefore, names must never encode:

“final”

“new”

“updated”

“draft”

“v2”

personal initials

UI assumptions

Those belong in git history, not filenames.

2. Global Rules (Apply Everywhere)
2.1 Character Set

✔ lowercase only
✔ ASCII only
✔ digits 0–9
✔ hyphen -
✔ dot . (for UID-like structures)

❌ no spaces
❌ no underscores (_) in data paths
❌ no diacritics (ā, ī, ṛ, etc.) in filenames

2.2 Word Separation
Context	Separator
folders	-
filenames	-
UIDs	.
schema names	.
3. Directory Naming Rules
3.1 Corpus Directories

Corpus directories are fixed vocabulary.

data/
├── sruti/
├── smrti/
├── itihasa/
├── purana/
├── agama/
├── vedanga/
├── upaveda/
├── darsana/
├── sampradaya/


❌ No aliases
❌ No abbreviations
❌ No pluralization drift

3.2 Internal Structural Directories

Structure follows textual reality, not UI needs.

Examples:

itihasa/mahabharata/bhisma-parva/
purana/bhagavata/skandha-01/adhyaya-01/
vedanga/vyakarana/astadhyayi/01/


Rules:

use traditional names

hyphenate multi-word Sanskrit terms

numeric ordering must be zero-padded in directories (01, 02, …)

4. Canonical Data File Naming
4.1 Canonical Verse Files

Canonical data files are named by UID-equivalent location, not by language.

Example (Bhagavad-gītā):

bg-2-13.json


✔ chapter-verse
✔ hyphen-separated
✔ no language suffix
✔ no author

❌ bg-2-13-en.json
❌ bg-2-13-final.json

Language is not part of canonical data.

4.2 Canonical Mantra / Sūtra Files

Examples:

rv-samhita-1-1-1.json
panini-as-1-1-1.json
yoga-sutra-1-2.json


Rule:

File name mirrors structural path, not display form.

5. Extended / Editorial Data Naming

Extended data always lives in explicit subfolders, never mixed.

5.1 Language as Directory, Not Filename

Correct:

translations/en/bg-2-13.json
translations/hi/bg-2-13.json


Incorrect:

bg-2-13.en.json
bg-2-13_hi.json


Why?

Because:

language is context

UID remains stable

filenames stay predictable

5.2 Commentary Naming
commentaries/prabhupada/en/bg-2-13.json
commentaries/shankara/sa/bg-2-13.json


Rules:

author as directory

language as directory

file = referenced UID

6. Schema Naming Rules

Schemas are formal contracts.

6.1 Schema Filenames
canonical-verse.schema.md
canonical-sutra.schema.md
editorial-unit.schema.md


Rules:

singular

kebab-case

role-first naming

6.2 Schema Identity Inside File
{
  "schema": {
    "name": "vedic-library.canonical.verse",
    "version": "1.0.0"
  }
}


✔ dot-namespaced
✔ versioned
✔ immutable once locked

7. Document Naming (docs/)
7.1 Architectural Documents
CANONICAL_TEXT_POLICY.md
UID_SYSTEM.md
NAMING_CONVENTIONS.md


Rules:

UPPERCASE

underscore separation

conceptual nouns only

7.2 Guides & Process Docs
DATA_LOADING_STRATEGY.md
CANONICAL_INTAKE_AND_NORMALIZATION.md


No dates. No phase numbers inside filenames.

8. JSON Field Naming Rules
8.1 Style

✔ snake_case
✔ lowercase
✔ no abbreviations unless canonical

Example:

{
  "review_status": "unreviewed",
  "confidence": "high"
}

8.2 Forbidden Field Names

❌ lang → use language
❌ txt → use text
❌ id → use uid

Consistency beats brevity.

9. Language Codes

Language codes follow ISO-639-1 / community standard.

Examples:

Language	Code
Sanskrit	sa
English	en
Hindi	hi
Bengali	bn
Tamil	ta

Rules:

language never encoded in UID

language never embedded in canonical filenames

10. What Is Explicitly Forbidden (Critical)

❌ _final, _latest, _new
❌ .bak, .old
❌ mixed casing
❌ personal initials
❌ UI-driven names (homepage.json)
❌ environment names (prod, test)

These destroy archival clarity.

11. Validation & Enforcement

Automated checks must ensure:

filenames match registry

language appears only in directories

canonical files have no language marker

UID ↔ filename correspondence holds

Violations are hard failures, not warnings.

12. Why This Matters (Long-Term View)

Without strict naming:

duplicate verses appear

translators overwrite canon

editors argue over filenames

automation becomes impossible

With strict naming:

tools can be dumb and reliable

humans can focus on meaning

the archive survives people, teams, and decades

13. Status

Category: LOCKED ARCHITECTURAL CONTRACT

Applies to all phases

Amendments require:

formal proposal

cross-doc review

version bump

14. Closing Principle

A name is not a label.
It is a promise to the future.

This document exists to keep that promise.

