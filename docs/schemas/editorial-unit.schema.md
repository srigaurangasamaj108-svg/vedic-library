# Editorial Unit Schema
## vedic-library.editorial.unit @ 1.0.0

This document defines the **Editorial Unit** concept used in the
Vedic Library to model authored explanatory material that spans
one or more canonical verses.

An Editorial Unit preserves **authorial intent** without altering
canonical verse identity.

---

## 1. Definition

An **Editorial Unit** is the smallest unit of authored exposition
as intended by a specific author or tradition.

It may include:
- word-by-word (synonyms)
- translation
- purport / commentary

An Editorial Unit:
- MAY span one or more verses
- MUST reference canonical verses
- MUST be attributed to an author
- MUST NOT alter canonical text

---

## 2. Schema Identity

- **Schema name:** `vedic-library.editorial.unit`
- **Schema version:** `1.0.0`
- **Granularity:** one authored explanatory unit

---

## 3. Top-Level Structure

```json
{
  "uid": "string",
  "author": { ... },
  "work": { ... },
  "scope": { ... },
  "covers": { ... },
  "content": { ... },
  "source": { ... },
  "schema": { ... }
}
All top-level fields are required.

4. Field Definitions
4.1 uid (string, required)
Globally unique identifier for the Editorial Unit.

Format (recommended):

php-template
Copy code
<work>.<chapter>.<start>-<end>.<author-id>
Example:

json
Copy code
"uid": "bg.1.16-18.prabhupada"
4.2 author (object, required)
Identifies the authorial authority.

json
Copy code
"author": {
  "id": "prabhupada",
  "name": "A. C. Bhaktivedanta Swami Prabhupāda",
  "tradition": "Gaudiya Vaishnava"
}
4.3 work (object, required)
Canonical placement.

json
Copy code
"work": {
  "corpus": "itihasa",
  "text": "mahabharata",
  "section": "bhisma-parva",
  "subwork": "bhagavad-gita"
}
4.4 scope (object, required)
Defines what kinds of content this Editorial Unit contains.

json
Copy code
"scope": {
  "has_synonyms": true,
  "has_translation": true,
  "has_exposition": true
}
Note: “exposition” is the neutral umbrella term
(explained in section 6).

4.5 covers (object, required)
Defines the verse range covered by this unit.

json
Copy code
"covers": {
  "chapter": 1,
  "from_verse": 16,
  "to_verse": 18
}
from_verse and to_verse MAY be equal (single-verse unit)

4.6 content (object, required)
Contains references (or embedded data) for the unit’s materials.

json
Copy code
"content": {
  "synonyms_ref": "bg.1.16-18.synonyms.prabhupada",
  "translation_ref": "bg.1.16-18.translation.en.prabhupada",
  "exposition_ref": "bg.1.16-18.exposition.prabhupada"
}
Each reference points to a separate derivative content file.

4.7 source (object, required)
Provenance metadata.

json
Copy code
"source": {
  "edition": "Bhagavad-gītā As It Is",
  "publisher": "BBT",
  "year": 1972,
  "derived_from": "vedabase.io",
  "pipeline_stage": "3.x"
}
4.8 schema (object, required)
json
Copy code
"schema": {
  "name": "vedic-library.editorial.unit",
  "version": "1.0.0"
}
5. Rules (Normative)
Canonical verses MUST remain verse-atomic.

Editorial Units MAY span verse ranges.

Translation, synonyms, and exposition belong to Editorial Units.

Verse-level derivative files MUST reference Editorial Units, not own content.

Multiple Editorial Units MAY overlap (different authors).

6. Terminology Clarification (IMPORTANT)
6.1 Why we do NOT use only “commentary”
In Sanskrit tradition:

Bhāṣya

Ṭīkā

Vivaraṇa

Vṛtti

Anuvāda

are all different kinds of commentary.

In ISKCON usage:

“Purport” is a specific editorial genre, not a generic commentary.

6.2 Final terminology decision (locked)
Term	Meaning
Exposition	Neutral umbrella term (schema-level)
Purport	A specific type of exposition (Prabhupāda)
Commentary	Generic human term (UI / docs)
Bhāṣya / Ṭīkā	Sanskrit-specific exposition types

📌 Schema uses exposition
📌 Metadata specifies subtype if needed

Example:

json
Copy code
"exposition_type": "purport"
or

json
Copy code
"exposition_type": "bhāṣya"
This avoids terminological confusion forever.

7. Stability
Editorial Units are versioned, attributable, and immutable once published.

Changes require:

new unit UID, or

new schema version

End of Schema
