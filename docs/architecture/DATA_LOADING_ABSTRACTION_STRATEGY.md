This document is written as an architectural backbone, not a tutorial.
It explains why data loading is designed the way it is, what is guaranteed, what is deferred, and how the system scales from Phase 1 to Phase N without rewrites.

I have written it assuming:

you are a learner

the corpus is vast

mistakes here would multiply everywhere
So nothing is left implicit.

🧱 Data Loading Abstraction Strategy
Vedic Library Project
0. Purpose of This Document

This document defines how data is loaded, from where, and under what guarantees, across the entire Vedic Library system.

It answers:

How does the frontend request data?

How is canonical data located?

How are extended layers attached?

What must loaders never assume?

How does loading evolve across phases?

This is not an implementation guide.
This is a contractual abstraction strategy.

1. Core Design Principle (Non-Negotiable)

The loader knows what it wants, not where it lives.

Therefore:

UI components never know file paths

UI components never know directory layout

UI components never know storage medium

They ask for conceptual units, not files.

2. What Is a “Data Loader” in This System?

A data loader is a function or service that:

accepts a canonical reference

resolves canonical identity

fetches canonical data

optionally attaches extended layers

returns a normalized object

It is the only layer allowed to touch storage details.

3. Canonical Loading (Layer A)
3.1 Canonical Load Input

Canonical data is always requested by:

{
  uid: "bg.2.13"
}


Never by:

filenames

URLs

language

author

phase

3.2 Canonical Load Guarantee

When requesting canonical data:

✔ exactly one result
✔ immutable content
✔ language-independent
✔ schema-validated

If the canonical unit does not exist:

loader returns null

UI renders Verse Not Found

no fallback guessing

3.3 Canonical Loader Responsibility

The canonical loader MUST:

map UID → storage location

validate against schema

return canonical unit only

It MUST NOT:

attach translations

attach commentary

interpret text

mutate content

4. Extended Layer Loading (Layer B+)

Extended data layers are optional, attachable, and plural.

Examples:

translation

synonyms

commentary

gloss

principles

skills

guidance

Each layer has its own loader.

4.1 Extended Load Input

Extended layers are requested as:

{
  ref: "bg.2.13",
  layer: "translation",
  language: "en"
}


or

{
  ref: "bg.2.13",
  layer: "commentary",
  author: "prabhupada",
  language: "en"
}


The ref always points to canonical UID.

4.2 Extended Load Guarantee

✔ canonical UID remains untouched
✔ absence does not break rendering
✔ multiple layers may coexist
✔ fallback rules are explicit

Extended loaders may return:

null

partial data

multiple entries

This is expected, not an error.

5. Composition Model (Critical)
5.1 Canonical-First Assembly

The UI never loads “everything”.

Instead:

Load canonical unit

Render immediately

Attach extended layers progressively

This ensures:

reading always works

scholarship does not block access

incomplete data is safe

5.2 Loader Orchestration

A composite loader may orchestrate:

loadVerse({
  uid,
  language,
  commentary,
  options
})


Internally, it delegates to:

canonical loader

translation loader

commentary loader

The UI never sees this complexity.

6. Phase-Wise Loading Evolution
Phase 1 (Current)

Static JSON

File-based loaders

No caching layer

No backend API

No persistence

Loader maps:

UID → filesystem JSON

Phase 2–3

Indexed lookup tables

Registry-based resolution

Optional in-memory cache

Still read-only

Phase 4+

Backend API

Versioned canonical pipelines

User-specific extended layers

Distributed storage

The loader interface does not change.

Only the implementation does.

7. What Loaders Must NEVER Do

❌ assume directory names
❌ assume file extensions
❌ assume language defaults
❌ infer missing data
❌ mutate canonical text
❌ mix layers

Loaders are pure resolvers, not editors.

8. Error Handling Philosophy
Situation	Response
Canonical missing	Calm “Not Found”
Translation missing	Hide or fallback
Commentary missing	Omit silently
Schema invalid	Hard failure
UID invalid	Validation error

Silence is preferred over noise.

9. Caching Rules (Deferred)

Caching is:

allowed

optional

never relied upon

Cache keys must be:

<uid>:<layer>:<language>:<author>


No cache may modify data.

10. Why This Abstraction Matters

Without abstraction:

UI breaks when files move

phases require rewrites

storage dictates architecture

With abstraction:

texts outlive frameworks

loaders evolve quietly

the system remains calm

11. Relationship to Other Documents

This strategy depends on:

UID_SYSTEM.md

NAMING_CONVENTIONS.md

DATA_SCHEMA.md

CANONICAL_UNIT_DEFINITION.md

And supports:

KNOWLEDGE_LAYER_MODEL.md

SEMANTIC_DERIVATION_POLICY.md

12. Status

Category: EVOLVING ARCHITECTURE (Versioned)

Current Version: 1.0.0

Changes allowed only if:

canonical contract unchanged

loader interface preserved

13. Closing Principle

Data loading is an act of humility.
We ask the text to come forth —
we do not force it.
