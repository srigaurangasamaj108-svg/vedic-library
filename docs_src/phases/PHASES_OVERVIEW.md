# 📘 Project Phases Overview

## Phase 0 – Preparation (Current)
- Scraped Bhagavad-gītā data
- JSON normalization
- UID design
- Project constitution defined

---

## Phase 1 – Bhagavad-gītā Pilot (Library Mode)
**Goal:** Reproduce Vedabase-style Bhagavad-gītā faithfully

### Features
- Verse-by-verse display (BG 1.1 onward)
- Sanskrit (Devanāgarī)
- Transliteration
- Word-for-word synonyms
- English translation
- English purport
- Hindi:
  - श्लोक
  - शब्दार्थ
  - अनुवाद
  - तात्पर्य
- Language toggle
- Static JSON consumption

### Tech
- Next.js
- React components
- JSON as data source
- No database
- No users yet (optional read-only)

---

## Phase 2 – Commentary Expansion
**Goal:** Multiple ācārya layers

### Features
- Multiple commentaries (4+ ācāryas)
- Toggle between ācāryas
- AI-assisted Hindi translations for commentaries
- Commentary metadata (ācārya, sampradāya)

---

## Phase 3 – Users & Support
**Goal:** Community readiness

### Features
- User login (Auth.js)
- Roles:
  - Reader
  - Supporter
  - Admin
- Donation entry point
- Session handling

---

## Phase 4 – Structured Expansion
**Goal:** Multi-śāstra readiness

- UID system applied to all śāstra
- Hierarchical navigation
- Database introduction (PostgreSQL)

---

## Phase 5 – Analysis, Education, Guidance
**Goal:** Meaning-making layers

- Thematic analysis
- Education tracks
- Guidance systems
- Community interaction

Each phase must be completed and stable before moving forward.

