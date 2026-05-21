# V.I.B. Website

Marketing-Site für V.I.B. Voß Immobilien Beratung (Edith Voß, Ilvesheim).

**Stack:** Next.js 16 · React 19 · Tailwind 4 · TypeScript · framer-motion · @tabler/icons-react · zod · sharp · Resend-bereit

## Skripte

```bash
npm run dev        # Dev-Server auf http://localhost:3000
npm run build      # Production Build
npm run start      # Production-Build lokal starten
npm run lint       # ESLint
```

## Environment Variables

Erstelle eine `.env.local` für lokale Mail-Funktion:

```
RESEND_API_KEY=re_...           # optional, ohne wird in Console geloggt statt versendet
MAIL_RECIPIENT=info@e-vib.de    # optional, Default ist info@e-vib.de
```

Ohne `RESEND_API_KEY` funktioniert das Kontaktformular trotzdem — Mails landen als Console-Log statt im Postfach. Praktisch für lokale Entwicklung.

## Projekt-Struktur

```
src/
├── app/
│   ├── layout.tsx              # Root mit Header/Footer/Fonts
│   ├── page.tsx                # Home
│   ├── ueber-mich/page.tsx
│   ├── leistungen/page.tsx
│   ├── immobilien/page.tsx
│   ├── immobilien/[slug]/page.tsx
│   ├── immobiliensuche/page.tsx
│   ├── kontakt/page.tsx
│   ├── impressum/page.tsx
│   ├── datenschutz/page.tsx
│   ├── globals.css             # Tailwind 4 @theme + custom utilities
│   └── api/
│       ├── kontakt/route.ts
│       └── immobiliensuche/route.ts
├── components/
│   ├── layout/                 # Header, Footer, MobileMenu
│   ├── sections/               # Hero, USPGrid, ServiceGrid, RegionBlock, etc.
│   ├── forms/                  # ContactForm, SuchprofilForm
│   ├── immobilien/             # ImmobilienCard, ExposeHero, etc.
│   └── ui/                     # Button, Input, Textarea, Checkbox, etc.
├── content/                    # Text-Inhalte als TS-Files (Single Source of Truth)
└── lib/                        # cn, mail, validation, seo
```

## API-Contract (für Formulare)

| Endpoint | Method | Body |
|----------|--------|------|
| `/api/kontakt` | POST | `{ name, email, telefon?, nachricht, dsgvo: true, website: "" }` |
| `/api/immobiliensuche` | POST | siehe `src/lib/validation.ts → suchprofilSchema` |

**Success:** `{ "ok": true }` (200)
**Validation Error:** `{ "ok": false, "error": "validation", "details": { fieldErrors, formErrors } }` (400)

`dsgvo` muss als Boolean `true` gesendet werden, nicht als String. `website` ist Honeypot (muss leer bleiben).

## Asset-Workflow (Welle 3)

```bash
# Porträt neu prozessieren (3 Größen × 3 Formate)
npx tsx scripts/process-portrait.ts

# Pexels-Bilder neu fetchen (braucht PEXELS_API_KEY)
npx tsx scripts/fetch-pexels.ts

# Pexels-Bilder optimieren
npx tsx scripts/optimize-pexels.ts
```

## Deployment (TODO)

Vorbereitet für Vercel. Beim Live-Gang:

1. Vercel-Projekt verknüpfen
2. Env-Vars setzen (`RESEND_API_KEY`, optional `MAIL_RECIPIENT`)
3. Domain `e-vib.de` aufschalten
4. Vor Launch: `TODO_VON_EDITH`-Marker im Impressum klären (USt-IdNr, Aufsichtsbehörde §34c GewO, Berufshaftpflicht)
5. Datenschutzerklärung juristisch prüfen lassen

## Offene Punkte vor Live-Schaltung

- `briefing/07-offene-punkte.md` — vollständige Liste
- Pflichtangaben Impressum (3 Felder mit `TODO_VON_EDITH`)
- Echte Objekt-Listings (aktuell Demo-Daten)
- Google-Bewertungen / Testimonials integrieren

## Briefing-Material

Alle Inhalte stammen direkt von Edith. Quell-MDs unter `../briefing/`:
- `04-website-texte.md` — alle Originaltexte
- `08-formular-immobiliensuche.md` — Formular-Spec
- `09-master-stitch-briefing.md` — vollständiges Briefing

## Hinweis zur Next.js-Version

Diese Codebase nutzt Next.js 16 mit breaking changes ggü. älteren Versionen. Beim Editieren bitte `node_modules/next/dist/docs/` als primäre Referenz nutzen — viele Konventionen aus Next.js 14/15 funktionieren nicht mehr (async params, Turbopack als Default-Bundler, Tailwind 4 ohne config-file, etc.).
