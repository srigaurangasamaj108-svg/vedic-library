# Bhagavad-gītā — Commentary Layer Policy

## Purpose of the Commentary Layer

The `commentaries/` directory contains **human-authored interpretive material**
related to Bhagavad-gītā.

This includes:
- Traditional ācārya commentaries
- Scholarly explanations
- Contextual notes tied to verses or chapters

Commentary is **never authoritative** over the canonical text.

---

## Structural Organization

Commentaries are organized by **scope**, not by author:

commentaries/
├── verse/ ← Commentary tied to individual verses
└── adhyaya/ ← Commentary spanning an entire chapter

yaml
Copy code

Author identity, tradition, and scope are declared **inside files**, not in folder names.

This prevents:
- Premature canonization of authors
- UI-driven hierarchy
- Ideological dominance

---

## Separation Rules

Commentary files must:

- Reference verses only by UID
- Never alter or paraphrase canonical text
- Never merge with translations
- Never appear inside `canonical/`

Canonical text must remain readable **without any commentary present**.

---

## Authority Boundaries

Commentaries must clearly declare:
- Author or source
- Tradition (if any)
- Scope and limits
- Intended audience

Anonymous or AI-authored commentaries are not allowed
unless explicitly labeled and constrained.

---

## Guiding Principle

> **The platform hosts commentators.  
It does not become one.**
