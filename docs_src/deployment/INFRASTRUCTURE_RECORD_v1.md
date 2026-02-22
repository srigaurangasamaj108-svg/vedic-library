# Vedic Library – Infrastructure Record v1

## Project Overview

**Project Name:** Vedic Library  
**Frontend Framework:** Next.js  
**Deployment Platform:** Vercel  
**Primary Production URL:** https://library.vedicskills.com  
**Default Vercel URL:** https://vedic-library-wffa.vercel.app  

---

## Domain Structure

### Root Domain
- Domain: vedicskills.com
- Registrar: GoDaddy
- Hosting: Hostinger (WordPress)
- Status: Managed separately from Vedic Library

### Subdomain (Production)
- Subdomain: library.vedicskills.com
- Purpose: Hosts the Vedic Library application
- Points to: Vercel deployment

---

## DNS Configuration

### DNS Provider
Hostinger DNS Zone Editor

### Record Added

Type: CNAME  
Name: library  
Value: 30f019e3b446319a.vercel-dns-017.com  
TTL: 14400  

This record connects the subdomain to Vercel.

---

## SSL Configuration

SSL Provider: Vercel (automatic via Let's Encrypt)  
Certificate Type: Auto-generated  
Status: Active  
Protocol: HTTPS enforced

---

## Deployment Flow

1. Code pushed to GitHub (main branch)
2. Vercel auto-build triggered
3. Production deployment generated
4. Subdomain linked via CNAME
5. SSL certificate auto-issued

---

## Root Directory on Vercel

Root Directory: frontend  
Framework Preset: Next.js  

---

## Git Repository

Owner: srigaurangasamaj108-svg  
Repository: vedic-library  
Branch: main  

---

## Notes

- Root domain (vedicskills.com) remains hosted on Hostinger.
- Only subdomain (library.vedicskills.com) is connected to Vercel.
- No changes were made to existing A records or email DNS.
- DNS propagation time: typically 5–30 minutes.

---

## Version

Infrastructure Record Version: v1  
Created: Initial Production Deployment
