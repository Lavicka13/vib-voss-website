# V.I.B. Website — Design Spec

**Datum:** 2026-05-21
**Kundin:** Edith Voß / V.I.B. Voß Immobilien Beratung
**Status:** Approved (Brainstorming-Phase), bereit für Implementation-Plan
**Verwandte Doks:**
- Briefing-MDs: `~/Downloads/Website - Vorbereitende Unterlagen/00_aufbereitet/01-09.md`
- Stitch-Outputs: vom User übergeben am 2026-05-21 (4 HTML-Files: Home, Über mich, Immobiliensuche, Immobilien)

---

## 1. Ziel

Produktionsreife Marketing-Website für V.I.B. Voß Immobilien Beratung mit 9 Routen, vollständig responsive, lokal lauffähig und Vercel-deploy-ready. **Kein Live-Deployment in diesem Build**.

Edith ist seit ~30 Jahren Immobilienmaklerin im Rhein-Neckar-Raum, baut die neue Marke V.I.B. (Ilvesheim) auf, Schwerpunkt exklusive Wohnimmobilien (Villen, MFH, EFH, Stadtwohnungen). Die Website soll das Off-Market-Netzwerk und ihre Persönlichkeit als USPs in den Vordergrund stellen.

## 2. Scope

### In Scope
- 9 Routen: `/`, `/ueber-mich`, `/leistungen`, `/immobilien`, `/immobilien/[slug]`, `/immobiliensuche`, `/kontakt`, `/impressum`, `/datenschutz`
- Reusable Section- und UI-Komponenten
- Design-Token-System aus Stitch
- Asset-Pipeline: Logo aus PSD als SVG, Porträt 2 in mehreren Größen, kuratierte Pexels-Bilder
- Kontakt- und Immobiliensuche-Formulare (API-Routes mit Mail-Versand-Skelett, Resend-bereit)
- Mobile + Tablet + Desktop Responsive
- Accessibility (semantisches HTML, ARIA, Keyboard-Nav)
- SEO-Grundlagen (Meta, OG, Schema.org RealEstateAgent)
- README mit Dev/Build/Deploy-Anleitung

### Out of Scope (für diesen Build)
- Live-Deployment auf Vercel
- Coming-Soon-Splash (User explizit: erst voll bauen, dann deployen)
- Tippgeber-Seite (Edith noch nicht final entschieden)
- Blog/Marktbericht (V2)
- CMS-Integration (Hardcoded Content / einfache Daten-Files reichen für V1)
- Tests (unit/e2e) — manuelle QA gemäß Quality Gates ist ausreichend für Marketing-Site V1
- Echte Objekt-Listings (Edith hat aktuell keine zu listen — Fallback-Block wird gebaut)

## 3. Stack

| Komponente | Wahl | Begründung |
|------------|------|-----------|
| Framework | Next.js 16 + App Router | Konsistent mit `kutscher-seminare` |
| UI Lib | React 19 | Aktuelle Version |
| Styling | Tailwind 4 (PostCSS-Plugin) | Konsistent mit `kutscher-seminare` |
| Sprache | TypeScript 5 | Type-Safety |
| Animationen | framer-motion 12 | Stitch nutzt reveal-Animationen, framer ist robuster als IntersectionObserver-Eigenbau |
| Icons | Material Symbols Outlined via `@tabler/icons-react` Fallback | Material Symbols sind im Stitch-Code, Tabler ist Standard im kutscher-Pattern |
| Fonts | Manrope + Playfair Display via `next/font/google` | Selbst-gehostet, kein CDN, besser für CWV |
| Mail (Formular) | Resend (Skelett, nicht aktiv) | Standard in deinem Stack |

## 4. Projekt-Struktur

```
~/Arbeit/Kunden/vib/
├── brand/
│   ├── logo.svg                    # Volles Logo
│   ├── logo-mark.svg               # Nur "V.I.B." Wortmarke
│   ├── porträt-edith.jpg           # Porträt 2 (Original)
│   └── design-tokens.json          # Single Source of Truth für Farben/Spacing/Typo
├── briefing/                       # Read-Only Kopien der Briefing-MDs
│   └── (Kopien von ../00_aufbereitet/*.md)
├── docs/
│   └── superpowers/
│       ├── specs/
│       │   └── 2026-05-21-vib-website-design.md   # DIESES DOKUMENT
│       └── plans/                  # writing-plans output landet hier
└── website/
    ├── public/
    │   ├── images/
    │   │   ├── porträt-edith-400.avif|webp|jpg
    │   │   ├── porträt-edith-800.avif|webp|jpg
    │   │   ├── porträt-edith-1200.avif|webp|jpg
    │   │   ├── hero-interior.avif|webp|jpg          # Pexels
    │   │   ├── ueber-mich-architecture.avif|webp|jpg # Pexels
    │   │   ├── region-bergstrasse.avif|webp|jpg     # Pexels
    │   │   ├── home-staging-mood.avif|webp|jpg      # Pexels
    │   │   ├── object-placeholder-1..4.avif|webp|jpg # Pexels
    │   │   └── og-image.jpg
    │   ├── favicon.ico
    │   ├── favicon-192.png
    │   └── favicon-512.png
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx                          # Root mit <html lang="de">, Header/Footer, Fonts
    │   │   ├── page.tsx                            # Home (12 Sektionen)
    │   │   ├── ueber-mich/page.tsx
    │   │   ├── leistungen/page.tsx
    │   │   ├── immobilien/page.tsx
    │   │   ├── immobilien/[slug]/page.tsx          # Detail-Exposé (DORN-Style)
    │   │   ├── immobiliensuche/page.tsx
    │   │   ├── kontakt/page.tsx
    │   │   ├── impressum/page.tsx
    │   │   ├── datenschutz/page.tsx
    │   │   ├── globals.css                         # Tailwind Layer + Custom Utilities
    │   │   └── api/
    │   │       ├── kontakt/route.ts                # POST Handler
    │   │       └── immobiliensuche/route.ts        # POST Handler
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── Header.tsx
    │   │   │   ├── Footer.tsx
    │   │   │   └── MobileMenu.tsx
    │   │   ├── sections/
    │   │   │   ├── Hero.tsx                        # Generisch, props-getrieben
    │   │   │   ├── IntroQuote.tsx
    │   │   │   ├── USPGrid.tsx                     # 3-Spalten Edith-USPs
    │   │   │   ├── ImmobilienGrid.tsx
    │   │   │   ├── ImmobilienFallback.tsx          # "Off-Market"-Block wenn kein Listing
    │   │   │   ├── ServiceGrid.tsx
    │   │   │   ├── HomeStagingSpotlight.tsx
    │   │   │   ├── RegionBlock.tsx
    │   │   │   ├── UeberMichTeaser.tsx
    │   │   │   ├── TestimonialBlock.tsx
    │   │   │   ├── CTABlock.tsx
    │   │   │   ├── ValuesGrid.tsx
    │   │   │   ├── StorytellingBlock.tsx
    │   │   │   └── ContactSection.tsx
    │   │   ├── forms/
    │   │   │   ├── ContactForm.tsx
    │   │   │   └── SuchprofilForm.tsx              # Felder aus 08-formular-immobiliensuche.md
    │   │   ├── immobilien/
    │   │   │   ├── ImmobilienCard.tsx
    │   │   │   ├── StatusBadge.tsx
    │   │   │   ├── ExposeHero.tsx
    │   │   │   ├── ExposeDataBlock.tsx
    │   │   │   └── ExposeAusstattungList.tsx
    │   │   └── ui/
    │   │       ├── Button.tsx
    │   │       ├── Input.tsx
    │   │       ├── Textarea.tsx
    │   │       ├── Select.tsx
    │   │       ├── Checkbox.tsx
    │   │       ├── QuoteIcon.tsx
    │   │       └── RevealOnScroll.tsx              # framer-motion wrapper
    │   ├── content/
    │   │   ├── home.ts                             # Alle Texte aus 04-website-texte.md
    │   │   ├── ueber-mich.ts
    │   │   ├── leistungen.ts
    │   │   ├── immobilien.ts                       # Initial leer / Demo-Daten
    │   │   ├── kontakt.ts
    │   │   ├── impressum.ts
    │   │   ├── datenschutz.ts
    │   │   └── nav.ts                              # Nav-Items
    │   └── lib/
    │       ├── tokens.ts                           # Re-Export aus design-tokens.json
    │       ├── mail.ts                             # Resend-Adapter (Skelett)
    │       ├── validation.ts                       # Zod-Schemas für Formulare
    │       └── seo.ts                              # Meta-Helper
    ├── tailwind.config.ts
    ├── next.config.ts
    ├── tsconfig.json
    ├── eslint.config.mjs
    ├── postcss.config.mjs
    ├── package.json
    └── README.md
```

## 5. Design Tokens

Aus Stitch-Config übernommen, leicht reduziert auf was tatsächlich gebraucht wird:

### Farben

```ts
{
  primary: "#000000",
  secondary: "#71594e",
  background: "#fcf9f8",
  surface: "#fcf9f8",
  "surface-ivory": "#FDFBFB",
  "surface-container-low": "#f6f3f2",
  "muted-text": "#6B6B6B",
  "on-surface-variant": "#444748",
  "border-taupe": "#E6D9D2",
  zartrosa: "#F4D4C6",        // Logo-Brand-Akzent
  "on-primary": "#ffffff",
  error: "#ba1a1a",
}
```

### Spacing

```ts
{
  gutter: "32px",
  "container-max": "1280px",
  "margin-desktop": "80px",
  "margin-mobile": "24px",
  "section-gap": "120px",
  "section-gap-mobile": "64px",
}
```

### Typography

```ts
fontFamily: {
  display: ["Playfair Display", "serif"],
  body: ["Manrope", "sans-serif"],
},
fontSize: {
  "display-lg": ["64px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "400" }],
  "display-lg-mobile": ["40px", { lineHeight: "1.2", fontWeight: "400" }],
  "headline-md": ["32px", { lineHeight: "1.3", fontWeight: "400" }],
  "signature-quote": ["24px", { lineHeight: "1.5", fontWeight: "400" }],
  "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "300" }],
  "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
  "label-caps": ["12px", { lineHeight: "1.2", letterSpacing: "0.1em", fontWeight: "600" }],
}
```

### Border-Radius

```ts
{
  DEFAULT: "0.125rem",
  lg: "0.25rem",
  xl: "0.5rem",
  full: "0.75rem",
}
```

## 6. Pages — Sektions-Mapping

**Texte:** Alle Texte aus `04-website-texte.md` (Edith-Originale). Stitch-Generika ersetzen — keine „Wir"-Form, keine Pseudo-Zitate, keine erfundenen Orte.

### `/` (Home) — 12 Sektionen
1. Hero — Headline „Verkaufen aus Leidenschaft." + Subline + 2 CTAs + Porträt 2
2. IntroQuote — Edith-O-Ton (Block A aus 04)
3. USPGrid — 3 Kacheln (Gespür · Netzwerk · Persönlichkeit)
4. ImmobilienGrid (mit Fallback-Block, da aktuell leer)
5. ServiceGrid — 6 Leistungs-Kacheln
6. HomeStagingSpotlight
7. RegionBlock („Regional verwurzelt — überregional erfolgreich.")
8. UeberMichTeaser (Porträt + Werte-Kacheln + Link zu /ueber-mich)
9. TestimonialBlock (Fallback: Edith-O-Ton-Zitat „Negativ-Image widerlegt")
10. ContactSection — Formular + Direktkontakt
11. (CTABlock + Footer aus Layout)

### `/ueber-mich`
1. Hero — Porträt-zentriert, Headline „Ihre Maklerin mit Leidenschaft im Rhein-Neckar-Raum"
2. StorytellingBlock — 3 Absätze (Anfang, Weinheim-Ära, Heute)
3. IntroQuote — Philosophie-Zitat („Verkaufen aus Leidenschaft. Nichts ist so beständig wie der Wandel.")
4. ValuesGrid — 4 Werte (Fairness · Fachwissen · Persönliche Betreuung · Verlässlichkeit)
5. CTABlock — „Lernen Sie mich persönlich kennen — auch am Wochenende"

### `/leistungen`
- Hero + ServiceGrid (alle 6 Leistungen ausführlich) + CTABlock
- Pro Leistung Subsektion mit Body-Text aus 03-leistungen-und-zielgruppe.md

### `/immobilien`
- Hero („Exklusive Immobilien im Rhein-Neckar-Raum")
- Filter-Bar (visuell, Logik V2)
- ImmobilienGrid mit Demo-Karten (3 Karten als Visualisierung, Status: Diskret/Verfügbar/Auf Anfrage)
- ImmobilienFallback / Netzwerk-CTA-Block

### `/immobilien/[slug]`
- ExposeHero (großes Foto + Titel + Status-Badge)
- 4-Kern-Daten unter Foto (Preis · Zimmer · Schlafzimmer · Wohnfläche)
- Fotogalerie
- Beschreibungstext
- ExposeDataBlock (2-Spalten Datenblock)
- ExposeAusstattungList (Icon-Liste)
- Lage-Absatz
- CTABlock („Besichtigung anfragen")
- **Initial nur 1-2 Beispiel-Slugs als Mock**, echte Objekte später

### `/immobiliensuche`
- Hero („Ihr Suchprofil — Diskret & Zielgerichtet")
- 2-Spalten-Layout: links Info-Card + Bild, rechts SuchprofilForm
- **SuchprofilForm folgt exakt 08-formular-immobiliensuche.md** (nicht Stitch-Felder)

### `/kontakt`
- Hero
- ContactForm (Name, Email, Telefon, Nachricht, DSGVO)
- Direktkontakt-Block (Tel, Mail, Adresse)
- Statisches Karten-Bild (DSGVO — kein eingebettetes Google Maps)
- Erreichbarkeitshinweis „Auch am Wochenende"

### `/impressum`
Statisch generiert aus `content/impressum.ts`. Pflichtfelder:
- V.I.B. Voß Immobilien Beratung
- Inhaberin: Edith Voß
- Anschrift: Alte Schulstraße 28, 68549 Ilvesheim
- Tel/Email
- Steuernummer: 37401/40895
- USt-IdNr.: **TODO_VON_EDITH** (Platzhalter mit Marker)
- Aufsichtsbehörde nach §34c GewO: **TODO_VON_EDITH**
- Berufshaftpflicht: **TODO_VON_EDITH**

### `/datenschutz`
Skelett mit Standard-Sektionen (Verantwortlicher, Erhebung Daten Kontaktformular, Cookies/keine Tracking, Auftragsverarbeitung Resend, Rechte). **Vor Live-Schaltung muss ein Jurist drüber**.

## 7. Komponenten-Inventar

Siehe Projekt-Struktur (Section 4) für vollständige Liste. Jede Komponente:
- Props-getrieben (kein hardcoded Content)
- TypeScript-typisiert
- Server Component wo möglich (Next.js 16 Default), Client Component nur für Interaktion (Forms, MobileMenu, RevealOnScroll)
- Reveal-Animationen via `framer-motion` whileInView (statt Eigenbau-IntersectionObserver aus Stitch)

## 8. Multi-Agent Build-Pipeline

3 Wellen, sequentiell:

**Welle 1 — Setup & Architecture (`nextjs-developer`)**
- `~/Arbeit/Kunden/vib/website/` mit `npx create-next-app@latest --typescript --tailwind --eslint --app --src-dir`
- Tailwind 4 + PostCSS-Plugin (analog kutscher)
- Token-Übertragung in `tailwind.config.ts`
- next/font Setup
- Layout (Header, Footer, MobileMenu)
- Alle 9 Route-Files als leere Skelette + Metadata
- API-Routes-Skelette
- README mit Dev/Build/Deploy-Befehlen

**Welle 2 — Section-Komponenten (`ui-ux-pro-max`)**
- Komponenten gemäß Inventar (Section 7)
- Content-Files (`src/content/*.ts`) mit Edith-Originalen aus 04-website-texte.md
- Mobile Responsive (Stitch lieferte nur Desktop)
- ARIA-Labels, semantic HTML, focus-states
- Inputs aus `forms/` mit Zod-Validation

**Welle 3 — Asset-Pipeline (`visual-enrich`)**
- Logo PSD → SVG (ImageMagick + manuelle Optimierung)
- Porträt 2 → 3 Größen × 3 Formate via `sharp`
- Pexels-API für 8-10 Bilder, kuratiert nach Vorgaben (Section 9)
- Alle Bilder mit aussagekräftigen Alt-Texten
- Favicons-Set
- OG-Image

Wellen können nicht parallel laufen, weil Welle 2 die Basis von Welle 1 braucht und Welle 3 die Bild-Slots aus Welle 2.

## 9. Asset-Strategie

### Logo
- Quelle: `~/Downloads/Website - Vorbereitende Unterlagen/Logo/Hintergrundbild mit Schriftzug V.I.B immobilien beratung.psd`
- Methode: PSD via Python+PIL oder ImageMagick öffnen, Layer extrahieren, Vektor-Trace versuchen. Fallback: manuell SVG nachbauen mit `Playfair Display` + `Manrope` für „IMMOBILIEN BERATUNG"-Suffix
- Output: `brand/logo.svg`, `brand/logo-mark.svg`

### Porträt
- Quelle: `~/Downloads/Website - Vorbereitende Unterlagen/Porträt 2.jpg`
- Verarbeitung: `sharp` → 400w/800w/1200w × AVIF+WebP+JPG
- Output: `public/images/porträt-edith-{400|800|1200}.{avif|webp|jpg}`

### Pexels-Bilder

| Slot | Suche | Verwendung |
|------|-------|-----------|
| Hero-Innenraum | „luxury minimalist living room natural light" | Home Hero rechts |
| Storytelling | „elegant architecture detail neutral" | /ueber-mich |
| Region/Bergstraße | „bergstrasse landscape rolling hills germany" oder Fallback „southern germany vineyard landscape" | RegionBlock |
| Home Staging | „minimalist home staging dining room taupe" | HomeStagingSpotlight |
| Immobiliensuche-Decor | „luxury interior elegant ivory" | /immobiliensuche links |
| Object-Mock 1-3 | „villa exterior weinheim style" / „penthouse interior premium" / „heritage house facade" | /immobilien Demo-Karten |
| OG-Image | Komposition aus Porträt + Logo | Social-Sharing |

Lizenz: alle Pexels-Bilder unter Pexels License (kommerziell ok, no attribution required).

## 10. Quality Gates

1. `npm run build` → 0 Fehler
2. `npm run lint` → 0 Fehler, max. Warnings dokumentiert
3. Routes-Smoke-Test: Alle 9 Routes return 200, no console errors
4. Responsive Check (manuelle Browser-Sicht): 375px (iPhone SE), 768px (iPad), 1280px (Desktop), 1920px (großer Monitor) — keine Layout-Brüche
5. Lighthouse Mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO 100
6. Content-Audit: Stichproben gegen 04-website-texte.md — keine „Wir"-Form auf Edith-Texten, keine erfundenen Orte, korrekte Kontaktdaten
7. README.md vollständig (Dev-Start, Build, Deploy, Env-Vars, Bild-Update-Workflow)

## 11. Was nach diesem Build kommt (nicht in Scope)

- Tippgeber-Seite (sobald Edith entschieden hat)
- Echte Objekt-Listings statt Demo
- Resend-API-Key + Live-Formular-Funktion
- Vercel-Deployment + DNS auf `e-vib.de`
- Lighthouse-Optimierung nach echtem Lasttest
- Google-Search-Console-Setup
- Datenschutzerklärung juristisch geprüft

## 12. Risiken & Mitigationen

| Risiko | Mitigation |
|--------|-----------|
| PSD-Logo lässt sich nicht clean tracen | Fallback: Manuelles SVG mit Webfonts nachbauen — Schriften sind Standard-Didone + Sans |
| Pexels findet nichts Passendes für „Bergstraße" | Generischere Vorgabe „Süddeutsche Weinlandschaft" — visuelle Stimmung wichtiger als geografische Genauigkeit |
| Stitch-Design hat keine Mobile-Variante | `ui-ux-pro-max` baut Mobile nach Tailwind Mobile-First-Konvention — Stitch-Desktop dient als Ziel-State für ≥768px |
| Edith ist nicht erreichbar für USt-IdNr./Aufsichtsbehörde | Platzhalter `TODO_VON_EDITH` mit deutlichem Marker im Impressum-Content-File — vor Live-Deploy ergänzen |
| Resend ohne API-Key in Welle 1 | Adapter ist Skelett mit Console-Log-Fallback — funktioniert lokal ohne echten Send |

## 13. Deliverable

Lauffähiges Next.js-Projekt unter `~/Arbeit/Kunden/vib/website/` das mit `npm run dev` startet und alle 9 Routes auf `localhost:3000` zeigt. README beschreibt nächste Schritte für Live-Deployment.

## 14. Schritte zum Implementation-Plan

Nach Approval dieses Spec-Docs:
1. `superpowers:writing-plans` invocieren
2. Plan-Output landet in `~/Arbeit/Kunden/vib/docs/superpowers/plans/2026-05-21-vib-website-plan.md`
3. Plan beschreibt jede Welle mit konkreten Tasks, Reihenfolge, Verifikations-Schritten
4. Danach Implementation via `subagent-driven-development` oder `executing-plans`
