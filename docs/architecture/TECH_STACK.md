# ⚙️ Technology Stack – Vedic Library

This document defines the complete technology stack for the **Vedic Library** project.
It explains **what technologies are used, why they are used, and when they are introduced**.

This file explains *decisions*, not just tools.

---

## 1. Architectural Philosophy

Vedic Library follows these core architectural principles:

1. **Data-first**: Canonical textual data comes before UI or frameworks
2. **Layered growth**: Features are introduced phase by phase
3. **Framework independence**: Data must survive framework changes
4. **Open standards**: Prefer open-source and non-proprietary systems
5. **Low-cost start**: ₹0–₹500/month initially, scale only when needed
6. **Long lifespan**: Designed for decades, not startups

---

## 2. Frontend Stack

### 2.1 Next.js (Primary Frontend Framework)

**Status:** Core technology (from Phase 1)

**Why Next.js**
- Built on React (long-term stable ecosystem)
- Supports:
  - Static pages (library mode)
  - Dynamic pages (users, search, guidance)
- SEO-friendly (important for scripture discovery)
- File-based routing (clear mapping to śāstra structure)
- Works well with GitHub, Vercel, and self-hosting

**Usage**
- Phase 1: Static scripture pages using JSON
- Phase 2+: Dynamic layers (commentaries, users, guidance)

---

### 2.2 React (UI Paradigm)

**Status:** Core technology (implicit via Next.js)

**Why React**
- Component-based (ideal for verse, translation, purport units)
- Encourages reuse and clarity
- Scales well for complex layered UI
- Long-term ecosystem support

**Core React Concepts Used**
- Components (Verse, Translation, Purport)
- Props (data passed to components)
- State (UI toggles, language switch)
- Minimal hooks only (no advanced patterns initially)

---

### 2.3 Styling

**Phase 1**
- Plain CSS or basic module CSS

**Phase 2+**
- Tailwind CSS (optional)
- Chosen for:
  - Readable typography
  - Consistent spacing
  - Minimal visual noise

---

## 3. Backend Stack

### 3.1 Python (Core Logic Language)

**Status:** Core technology (from Phase 1, light use)

**Why Python**
- Excellent for text processing
- Ideal for JSON transformation
- Strong AI & NLP ecosystem
- Ideal for analysis, education, guidance layers

**Usage**
- JSON normalization
- UID generation
- AI translation pipelines
- Commentary processing
- Later: analytics & guidance logic

---

### 3.2 FastAPI (Backend Framework)

**Status:** Introduced in Phase 2+

**Why FastAPI**
- Simple, readable Python-based API
- High performance
- Automatic documentation
- Clean separation of frontend & backend

**Usage**
- Serve JSON data dynamically (later)
- Handle authenticated requests
- Act as AI translation gateway
- Manage private resources (PDFs, restricted data)

---

## 4. Data Layer

### 4.1 JSON (Primary Data Format)

**Status:** Core technology (Phase 0–3)

**Why JSON**
- Human-readable
- Version-controllable (Git-friendly)
- Framework-agnostic
- Ideal for canonical texts

**Usage**
- Canonical text storage
- Translations
- Commentaries
- Cross-references

**Key Rule**
> Canonical JSON is immutable  
> Extended JSON is additive

---

### 4.2 PostgreSQL (Future Database)

**Status:** Introduced in Phase 4+

**Why PostgreSQL**
- Strong relational integrity
- Excellent text handling
- JSONB support
- Widely supported and future-proof

**Usage**
- User data
- Bookmarks
- Commentary metadata
- Analytics
- Education progress

---

## 5. Authentication & Users

### 5.1 Auth.js (NextAuth)

**Status:** Phase 3 (Initial user system)

**Why Auth.js**
- Free and open-source
- Designed for Next.js
- Supports:
  - Email login
  - Google login
  - GitHub login
- Session handling included
- No vendor lock-in

**Roles (Planned)**
- Reader
- Supporter
- Student
- Teacher
- Admin

---

### 5.2 Supabase Auth (Scaling Option)

**Status:** Phase 4+

**Why Supabase**
- Generous free tier (~50k users)
- PostgreSQL included
- Simple dashboard
- Row-level security

Used only when:
- User count grows
- Persistent data is required

---

### 5.3 Firebase Auth (Advanced Phase)

**Status:** Optional, Phase 5+

**Why Firebase**
- Global scale
- Enterprise-grade auth
- Used only if platform grows significantly

---

## 6. AI & Language Processing

### 6.1 Gemini APIs

**Status:** Phase 1+

**Primary Use**
- Hindi translation:
  - Śloka
  - Śabdārtha
  - Anuvāda
  - Tātparya

**Important Rules**
- AI output is always marked
- AI never overwrites canonical text
- Human review remains possible

**Future Use**
- Thematic analysis
- Concept mapping
- Educational structuring

---

## 7. Hosting & Deployment

### 7.1 Local Development

**Status:** Phase 0–1
- Runs on local machine
- No cost

---

### 7.2 GitHub

**Status:** Phase 1+
- Version control
- Data backup
- Documentation storage

---

### 7.3 Hosting Options (Future)

- GitHub Pages (static)
- Vercel (Next.js native)
- Self-hosted VPS (later)

Hosting choice is **decoupled** from architecture.

---

## 8. What Is Explicitly NOT Used (Initially)

- Docker
- Kubernetes
- Microservices
- GraphQL
- Paid cloud services
- Complex CI/CD

These are intentionally postponed.

---

## 9. Summary Table

| Layer | Technology |
|-----|-----------|
| UI | React |
| Frontend | Next.js |
| Backend | Python, FastAPI |
| Data | JSON → PostgreSQL |
| Auth | Auth.js → Supabase |
| AI | Gemini APIs |
| Hosting | Local → GitHub → Cloud |

---

## 10. Guiding Principle

> **Technology serves the text.  
> The text never serves technology.**

This stack may evolve, but this principle does not.

