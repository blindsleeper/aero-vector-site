# Aero Vector Engineering Site — Setup & Deploy Guide

## Stack
- **Framework**: Astro (static output)
- **Hosting**: GitHub Pages (free)
- **Domain**: AeroVectorEngineering.com via Cloudflare DNS
- **Deploy**: Push to `main` → auto-deploys via GitHub Actions

---

## Local Dev Setup

```bash
# 1. Navigate into the project
cd aero-vector-site

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# → http://localhost:4321
```

---

## GitHub Setup (one-time)

1. Create a new repo on GitHub: `aero-vector-site` (private)
2. Push this project:
   ```bash
   git init
   git add .
   git commit -m "init: Aero Vector Engineering site"
   git remote add origin https://github.com/YOURUSERNAME/aero-vector-site.git
   git push -u origin main
   ```
3. In GitHub repo → **Settings → Pages**
   - Source: **GitHub Actions**
   - That's it. First deploy triggers automatically.

---

## Custom Domain Setup (Cloudflare)

AeroVectorEngineering.com is registered and DNS-managed through Cloudflare.

1. In GitHub repo → Settings → Pages → Custom Domain → enter `aerovectorengineering.com`
2. In the Cloudflare dashboard for the domain, go to **DNS → Records** and add:
   - Four **A records** at the root (`@`), pointing to GitHub Pages' IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - One **CNAME record**: `www` → `YOURUSERNAME.github.io`
3. **Important — set the proxy status to "DNS only" (grey cloud), not "Proxied" (orange cloud)**,
   on all of the records above. Cloudflare's proxy will break GitHub Pages' automatic HTTPS/SSL
   validation for a custom domain. Once the domain is verified and HTTPS is enforced in GitHub,
   the records can optionally be switched back to proxied — but leave them DNS-only during setup.
4. Back in GitHub → Settings → Pages, wait for DNS to propagate (usually a few minutes with
   Cloudflare, can take up to an hour), then check **"Enforce HTTPS."**
5. In `astro.config.mjs`, the `site` value is already set to `https://aerovectorengineering.com`.

---

## File Structure

```
aero-vector-site/
├── src/
│   ├── layouts/
│   │   └── Layout.astro       ← Nav + footer wrapper
│   ├── components/
│   │   └── Header.astro       ← Nav bar, mobile drawer
│   ├── pages/
│   │   ├── index.astro        ← Landing ✅
│   │   ├── services.astro     ← Services + software licensing ✅
│   │   ├── about.astro        ← About / Bio ✅
│   │   └── contact.astro      ← Contact (form submission is a TODO — see below) ✅
│   └── styles/
│       └── global.css         ← Full design system
├── public/                    ← Static assets (favicon)
├── images/                    ← Logo assets extracted from brand art
├── astro.config.mjs
└── package.json
```

---

## Open Items Before Launch

| Item | Status |
|------|--------|
| Software license numbers (Catia V5, Vericut, DISSOT Systems) | Placeholder — Trent is still applying for licenses |
| Service page copy | Draft — needs Trent's review/revision |
| About / bio copy | Draft — needs Trent's review/revision |
| Contact form submission mechanism | **Not wired up.** Needs a decision: Formspree (like dataforge-site uses) vs. a mailto link. See TODO comment in `src/pages/contact.astro`. |
| Business email | Pending — contact page currently shows a placeholder until a domain email is set up |
| Photography / imagery | No client photos exist. Hero uses an abstract CAD/toolpath-style SVG illustration instead of fabricated "client" photos — replace with real shop/workstation photography once available |

---

## Design Tokens (quick reference)

| Token | Value |
|-------|-------|
| `--accent` | `#D0121F` (bold red, sampled from the AV logo) |
| `--bg` | `#070707` (deep black) |
| `--text` | `#ECECEA` (metallic silver) |
| `--muted` | `#B7BABC` (silver-grey) |
| Display font | Barlow Condensed |
| Body font | DM Sans |
| Mono font | JetBrains Mono |

---

## Logo Assets

`images/aerovector-logo-full.png` and `images/aerovector-mark.png` are trimmed from the client-
supplied brand art at `D:\02_DataForge\00_Clients\Aero Vector Engineering\business card and email
signature.png`. `public/favicon.ico` / `public/favicon.png` are generated from the "A" mark only.
If Trent has (or can get) vector source files (.ai/.svg/.eps) for the logo, swap these raster
crops out for the real vector assets.
