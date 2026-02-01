Verse Index Schema
vedic-library.index.verse @ 1.0.0
1. Purpose (Normative)

The Verse Index is a routing and resolution layer that maps a single canonical verse to one or more Editorial Units that cover it.

It serves as the navigation hub of the Vedic Library.

The Verse Index does not store textual content.
It only stores references and availability metadata.

2. Conceptual Foundations (Normative)

Canonical verses are verse-atomic

Editorial Units may span one or more verses

A single verse may participate in:

multiple Editorial Units

multiple authors

multiple traditions

multiple editions

Therefore:

Verse Index files map verses → editorial units.
They never embed content.

3. Schema Identity

Schema name: vedic-library.index.verse

Schema version: 1.0.0

Granularity: one file per canonical verse

Stability: deterministic, derivable, safe to regenerate

4. Top-Level Structure
{
  "uid": "string",
  "canonical_verse_ref": { ... },
  "editorial_units": [ ... ],
  "schema": { ... }
}


All top-level fields are required.

5. Field Definitions
5.1 uid (string, required)

Globally unique identifier for the verse index entry.

Recommended format:

<canonical-verse-uid>.index


Example:

"uid": "bg.1.16.index"

5.2 canonical_verse_ref (object, required)

Reference to the canonical verse definition.

{
  "uid": "bg.1.16",
  "schema": "vedic-library.canonical.verse",
  "version": "1.0.0"
}


This reference is authoritative for verse identity.

5.3 editorial_units (array, required)

List of Editorial Units that cover this verse.

Each entry is a reference, not content.

[
  {
    "uid": "bg.1.16-18.prabhupada",
    "author": "A. C. Bhaktivedanta Swami Prabhupāda",
    "tradition": "Gaudiya Vaishnava",
    "covers_range": "1.16–1.18",
    "derivatives": { ... }
  }
]

Rules

The array MAY contain multiple entries

Order MAY reflect editorial or UI preference

covers_range is descriptive, not authoritative

Editorial Unit schema remains the authority on coverage

5.4 editorial_units[].derivatives (object, optional but recommended)

Describes availability and references to derivative layers
for this editorial unit as they relate to this verse.

This metadata is routing-only.

{
  "synonyms": {
    "available": true,
    "refs": ["bg.1.16-18.prabhupada.synonyms.en"]
  },
  "translations": {
    "available": true,
    "refs": ["bg.1.16-18.prabhupada.translation.en"]
  },
  "exposition": {
    "available": false,
    "refs": []
  }
}

Rules

MUST NOT embed derivative content

MUST NOT contradict the Editorial Unit

Absence of content is expressed as:

available: false

empty refs array

5.5 schema (object, required)

Schema identity descriptor.

{
  "name": "vedic-library.index.verse",
  "version": "1.0.0"
}

6. Normative Rules (Strict)

Each Verse Index file MUST correspond to exactly one canonical verse.

A Verse Index MUST NOT contain:

translation text

synonym text

exposition / purport text

Editorial Unit references MUST be valid and resolvable.

Derivative references MUST point to existing derivative identifiers.

Verse Index files:

MAY be regenerated automatically

MUST NOT alter canonical or editorial data

7. Relationship to Other Schemas
Schema	Role
canonical-verse.schema	Defines verse identity
editorial-unit.schema	Defines authored groupings
translation.schema	Translation content
synonyms.schema	Word-for-word meanings
exposition.schema	Purport / commentary
verse-index.schema	Navigation & routing hub
8. Stability & Regeneration

Verse Index files are:

deterministic

derivable

non-authoritative

safe to delete and regenerate

They may be rebuilt whenever:

Editorial Units change

Derivative availability changes

New authors or traditions are added

9. Design Principle (Final)

Canonical verses define truth.
Editorial Units define meaning.
Verse Index defines navigation.

End of Schema
