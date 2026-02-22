# 🌐 Infrastructure Record — Version 1
## Vedic Library Project

Status: ACTIVE  
Phase Alignment: Canonical Expansion (Phase-2)  
Authority: Deployment Record  
Classification: Operational Infrastructure Documentation  

---

## 1. Project Overview

Project Name: Vedic Library  
Frontend Framework: Next.js (App Router)  
Deployment Platform: Vercel  

Primary Production URL:  
https://library.vedicskills.com  

Default Vercel URL:  
https://vedic-library-wffa.vercel.app  

---

## 2. Domain Structure

### Root Domain
Domain: vedicskills.com  
Registrar: GoDaddy  
Hosting: Hostinger (WordPress)  
Status: Managed independently from Vedic Library  

### Production Subdomain
Subdomain: library.vedicskills.com  
Purpose: Hosts Vedic Library application  
Points to: Vercel deployment  

The Vedic Library is intentionally isolated at subdomain level.

---

## 3. DNS Configuration

DNS Provider: Hostinger (DNS Zone Editor)

Record:

Type: CNAME  
Name: library  
Value: 30f019e3b446319a.vercel-dns-017.com  
TTL: 14400  

This record connects the subdomain to Vercel infrastructure.

No A-records or MX-records were modified.

---

## 4. SSL Configuration

SSL Provider: Vercel (Let's Encrypt auto-provisioned)  
Certificate Type: Automatic  
Status: Active  
Protocol: HTTPS enforced  

SSL is managed entirely by Vercel.

---

## 5. Deployment Flow

1. Code pushed to GitHub (main branch)
2. Vercel auto-build triggered
3. Production deployment generated
4. Subdomain linked via CNAME
5. SSL certificate auto-issued automatically

Deployment is CI/CD based.
No manual file uploads.

---

## 6. Repository & Build Configuration

GitHub Owner: srigaurangasamaj108-svg  
Repository: vedic-library  
Branch: main  

Vercel Project Root Directory:
frontend  

Framework Preset:
Next.js  

Local Development Command:
Run from /frontend  
npm run dev  

---

## 7. Data Layer

Canonical Data Location:
/data/ (monorepo root)

Frontend reads canonical data using:
process.cwd() + "../data/..."

Database:
None (filesystem-based canonical layer)

Supabase:
Not yet integrated (reserved for future phases)

---

## 8. Architectural Notes

- Canonical data remains filesystem-based
- UID system remains immutable
- No runtime mutation of canonical layer
- No user authentication layer yet
- Infrastructure sufficient for Phase-2 validation and IIT presentation

---

## 9. Future Migration Plan (Reserved)

When Supabase is introduced:

- It will support user accounts only
- Canonical data remains filesystem-based
- UID system remains unchanged
- Database will not replace canonical storage

---

## 10. Stability Declaration

This infrastructure is:

- Production-grade
- SSL-secured
- Version-controlled
- CI/CD automated
- Phase-2 compliant

This document prevents infrastructure drift and loss of deployment memory.
