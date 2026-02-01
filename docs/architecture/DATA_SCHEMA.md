# 🗃️ Data Schema – Bhagavad-gītā (Canonical & Extended JSON)

This document defines the **official data schema** for storing Bhagavad-gītā
in the **Vedic Library** project.

The schema is designed to be:
- Textually accurate
- Framework-independent
- Scalable to all śāstra
- Stable for decades

---

## 1. Core Data Philosophy

1. **Canonical data is immutable**
2. **Extended data is additive**
3. **UID is the spine**
4. **No UI assumptions**
5. **No interpretation embedded in canonical layer**

This mirrors the traditional separation of:
- Mūla text
- Bhāṣya
- Ṭīkā
- Anuvāda

---

## 2. UID System (Mandatory)

Every verse is identified by a **Universal Identifier (UID)**.

### Format
bg.<chapter>.<verse>

yaml
Copy code

### Examples
- `bg.1.1`
- `bg.2.13`
- `bg.18.66`

The UID:
- Never changes
- Is language-independent
- Is commentary-independent

---

## 3. Canonical Layer (Layer A)

### Purpose
To preserve the **original Sanskrit text and structure** of the Bhagavad-gītā.

### Rules
- No translations
- No commentaries
- No AI output
- No language variants
- Never edited after creation

---

### 3.1 Canonical Verse JSON

**File location**
data/bhagavad-gita/canonical/bg-<chapter>-<verse>.json

pgsql
Copy code

### Schema

```json
{
  "uid": "bg.1.1",
  "work": "Bhagavad-gita",
  "category": "smriti",
  "chapter": 1,
  "verse": 1,
  "text": {
    "sanskrit": {
      "devanagari": "धर्मक्षेत्रे कुरुक्षेत्रे...",
      "iast": "dharma-kṣetre kuru-kṣetre..."
    }
  }
}
Field Explanation
Field	Description
uid	Eternal identifier
work	Name of the śāstra
category	Śāstra category
chapter	Adhyāya number
verse	Śloka number
text.sanskrit.devanagari	Original text
text.sanskrit.iast	Roman transliteration

4. Extended Layer (Layer B)
Extended layers reference the UID but never modify the canonical file.

Multiple extended files may exist for the same UID.

5. Word-by-Word Synonyms
File location

swift
Copy code
data/bhagavad-gita/translations/en/synonyms/bg-1-1.json
Schema
json
Copy code
{
  "ref": "bg.1.1",
  "type": "synonyms",
  "language": "en",
  "entries": [
    {
      "word": "dharma-kṣetre",
      "meaning": "in the place of pilgrimage"
    },
    {
      "word": "kuru-kṣetre",
      "meaning": "in the place named Kurukṣetra"
    }
  ]
}
6. Translation Layer
English Translation
File location

swift
Copy code
data/bhagavad-gita/translations/en/translation/bg-1-1.json
json
Copy code
{
  "ref": "bg.1.1",
  "type": "translation",
  "language": "en",
  "source": "Vedabase",
  "text": "Dhṛtarāṣṭra said: O Sañjaya..."
}
Hindi Translation
File location

swift
Copy code
data/bhagavad-gita/translations/hi/translation/bg-1-1.json
json
Copy code
{
  "ref": "bg.1.1",
  "type": "translation",
  "language": "hi",
  "source": "AI-assisted (Gemini)",
  "review_status": "unreviewed",
  "text": "धृतराष्ट्र ने कहा—हे संजय..."
}
7. Purport / Commentary Layer
English Purport (Prabhupāda)
File location

swift
Copy code
data/bhagavad-gita/commentaries/prabhupada/en/bg-1-1.json
json
Copy code
{
  "ref": "bg.1.1",
  "type": "purport",
  "author": "A.C. Bhaktivedanta Swami Prabhupāda",
  "sampradaya": "Gauḍīya",
  "language": "en",
  "text": "Bhagavad-gītā is the widely read..."
}
Hindi Purport (AI-assisted)
File location

swift
Copy code
data/bhagavad-gita/commentaries/prabhupada/hi/bg-1-1.json
json
Copy code
{
  "ref": "bg.1.1",
  "type": "purport",
  "author": "A.C. Bhaktivedanta Swami Prabhupāda",
  "sampradaya": "Gauḍīya",
  "language": "hi",
  "source": "AI-assisted (Gemini)",
  "review_status": "unreviewed",
  "text": "भगवद्गीता व्यापक रूप से पढ़ी जाती है..."
}
8. Multiple Ācārya Support (Phase 2+)
Each ācārya gets a separate folder.

text
Copy code
commentaries/
├── prabhupada/
├── shankara/
├── ramanuja/
└── madhva/
All reference the same UID.

9. Metadata & Review Flags
Extended layers may include:

json
Copy code
{
  "review_status": "unreviewed | reviewed | verified",
  "confidence": "low | medium | high",
  "notes": "Optional editorial notes"
}
Canonical layer NEVER includes metadata of opinion.

10. What Must NEVER Be Stored Together
❌ Sanskrit + translation in same file
❌ Canonical text + commentary
❌ Multiple languages in same text field
❌ AI output inside canonical files

11. Why This Schema Scales to All Śāstra
This schema supports:

Verse-based texts (Gītā, Bhāgavata)

Mantra-based texts (Upaniṣads)

Prose texts (Arthaśāstra)

Multi-commentary traditions

Multi-language expansion

Only the UID addressing scheme changes.

12. Guiding Principle
Canonical text is truth.
Commentary is guidance.
Translation is service.
AI is assistance, never authority.


