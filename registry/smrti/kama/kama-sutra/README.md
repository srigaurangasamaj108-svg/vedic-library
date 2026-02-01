📘 Kāma-sūtra

Canonical Text Overview & UID Specification

1. Identity of the Text

Title: Kāma-sūtra
Corpus: Smṛti
Domain: Kāma-śāstra
Attribution: Traditionally to Vātsyāyana
Status in Project: Canonical Text (Primary Layer)

The Kāma-sūtra is treated in this project as a classical smṛti text concerned with kāma as a puruṣārtha, situated alongside dharma and artha, not in opposition to them.

No moral framing, apologetics, or modern reinterpretation is encoded at the canonical level.

2. Canonical Nature in Vedic Library

In the Vedic Library:

The Kāma-sūtra exists as canonical Sanskrit text only

No translation, commentary, or pedagogy is embedded in canonical files

All interpretive material belongs to Editorial Units or derivative layers

Canonical text is:

Script-stable

UID-stable

Interpretation-neutral

This follows the global Canonical Text Policy of the project.

3. Structural Organization (Traditional)

The Kāma-sūtra is traditionally organized as follows:

Adhikaraṇa
(Major divisions / books — total: 7)

Adhyāya
(Chapters within each adhikaraṇa)

Prakaraṇa
(Topical units)

Numbered progressively across the entire text

Do not reset per adhikaraṇa or adhyāya

Sometimes:

one full adhyāya = one prakaraṇa

multiple prakaraṇas occur within a single adhyāya

Sūtra
(Aphoristic units)

This structure is textual, not editorial, and is respected in UID design.

4. UID Philosophy for Kāma-sūtra
4.1 Core Principle

UIDs encode location, not meaning.

Therefore:

No topic names

No prakaraṇa titles

No moral categories

No commentary structures

5. Canonical UID Patterns
5.1 Minimal UID (Always Valid)
kamasutra.<adhikarana>.<adhyaya>.<sutra>


This form:

Is compatible with legacy citations

Works even when prakaraṇa boundaries are implicit or absent

Example

kamasutra.1.2.15

5.2 Extended UID (Preferred When Prakaraṇa Is Known)
kamasutra.<adhikarana>.<adhyaya>.p<prakarana>.<sutra>


Where:

p<prakarana> refers to the global prakaraṇa number

Prakaraṇa numbering is continuous across all 7 adhikaraṇas

The p prefix is mandatory to avoid numeric ambiguity

Examples

kamasutra.1.2.p3.15
kamasutra.4.1.p22.7

6. Rules Governing Prakaraṇa Usage

Prakaraṇa numbering is global

Prakaraṇa is structural, not interpretive

Prakaraṇa inclusion is:

encouraged when known

not mandatory for UID validity

Absence of prakaraṇa does not invalidate a UID

Validators must accept both minimal and extended forms.

7. What the UID Must NOT Contain

A Kāma-sūtra UID must never encode:

Topic names

Section titles

Author names

Commentators

Moral or cultural judgments

Modern classifications

All such material belongs to:

Editorial Units

Translations

Educational layers

8. Relationship to Other Corpora

Kāma-sūtra UIDs are independent of:

Purāṇic citations

Āyurvedic discussions

Later kāma-śāstra texts (Ananga-raṅga, Ratirahasya, etc.)

Cross-textual references are handled at:

Editorial Unit level

Index layer

Never by altering canonical UIDs

9. Stability & Locking

Once a canonical Kāma-sūtra verse is:

assigned a UID

validated

declared locked

It must never be modified.

Improvements require:

a new canonical pipeline version, or

a new schema version

Silent changes are forbidden.

10. Final Statement

The Kāma-sūtra is preserved here
not to instruct desire,
not to restrain it,
but to record what was said,
exactly where it was said,
and allow readers to approach it freely.

Status: LOCKED
Applies To: All Kāma-sūtra data in Vedic Library
Version: 1.0.0

🙏
