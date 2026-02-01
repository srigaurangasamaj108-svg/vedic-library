# 🔄 Data Loading Strategy – JSON → Backend Migration

This document explains **how data is loaded in Phase 1**, and **how it will safely migrate**
to a **Python + FastAPI backend** in later phases.

This strategy ensures:
- Zero rewrite of frontend components
- Zero corruption of canonical data
- Gradual, reversible migration
- Long-term scalability

---

## 1. Core Principle (Must Be Remembered)

> **Frontend components must never care where data comes from.**

Whether data comes from:
- Local JSON
- Backend API
- Database
- Cache

…the **shape of the data must remain identical**.

This is the single most important rule.

---

## 2. Phase 1 – Local JSON Loading (Current)

### Data Source
- JSON files stored locally in:
```text
frontend/src/data/
How Data Is Loaded
Direct import or fs-based loading

One verse at a time

UID-based selection

Example (Phase 1)
ts
Copy code
import verse from "@/data/bg-1-1.json";

export function loadVerse() {
  return verse;
}
Characteristics
No backend

No network calls

Fast

Simple

Git-controlled

3. Abstraction Layer (CRITICAL DESIGN)
Even in Phase 1, data must be loaded through a single abstraction function.

File
bash
Copy code
frontend/src/lib/loadVerse.ts
Phase 1 Implementation
ts
Copy code
import verse from "@/data/bg-1-1.json";

export async function loadVerse(uid: string) {
  return verse;
}
⚠️ Frontend pages must only call loadVerse()
They must never import JSON directly.

4. Why This Abstraction Matters
Because in Phase 2+, you will replace only this file, not your UI.

UI stays the same.
Components stay the same.
Pages stay the same.

Only the data source changes.

5. Phase 2 – Backend API Introduction
Backend Role
Serve verse data over HTTP

Assemble canonical + extended layers

Enforce UID validation

API Example
swift
Copy code
GET /api/v1/verses/bg/2/13
New loadVerse() Implementation
ts
Copy code
export async function loadVerse(uid: string) {
  const response = await fetch(`/api/v1/verses/${uid}`);
  return response.json();
}
Frontend code remains unchanged.

6. Phase 3 – Authentication-Aware Data
At this stage:

Some data may be public

Some data may require login

Example
ts
Copy code
export async function loadVerse(uid: string) {
  const response = await fetch(`/api/v1/verses/${uid}`, {
    credentials: "include"
  });
  return response.json();
}
Still:

Same return shape

Same component usage

7. Phase 4 – Database-Backed Backend
Backend evolution:

JSON → PostgreSQL

Indexed UID lookups

Caching layers

Frontend impact:

None

Because frontend never knew where data lived.

8. Canonical vs Extended Data Handling
Backend Responsibility
Load canonical JSON (immutable)

Load extended JSON (translations, commentaries)

Merge data in memory

Return unified object

Frontend Responsibility
Render data only

Never merge files

Never modify text

9. Unified Data Shape (Contract)
The backend must return data in this stable shape:

ts
Copy code
interface VerseData {
  uid: string;
  chapter: number;
  verse: number;
  sloka: string;
  iast: string;
  synonyms?: {
    en?: Synonym[];
    hi?: Synonym[];
  };
  translation: {
    en: string;
    hi?: string;
  };
  purport?: {
    en: string;
    hi?: string;
  };
}
This contract must not break.

10. Error Handling Strategy
Phase 1
Missing file → crash acceptable (dev only)

Phase 2+
Missing verse → 404

Missing translation → fallback language

Backend failure → graceful UI message

11. Performance Considerations
Early Phases
Load one verse at a time

No prefetching

No caching

Later Phases
Server-side caching

CDN

Prefetch adjacent verses

12. What Must NEVER Change
❌ UID format
❌ Canonical JSON files
❌ Data shape expected by UI
❌ Component responsibilities

Changing these causes rewrites.

13. Migration Checklist
Before migrating from JSON to backend, confirm:

 loadVerse() abstraction exists

 Frontend never imports JSON directly

 UID-based addressing everywhere

 Backend returns correct data shape

14. Summary Timeline
Phase	Data Source
Phase 1	Local JSON
Phase 2	FastAPI (JSON)
Phase 3	FastAPI + Auth
Phase 4	PostgreSQL
Phase 5	Analytics & Guidance

🕉️ Guiding Principle
Data location may change.
Data meaning must not.
UI must remain peaceful.


