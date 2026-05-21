# V.I.B. Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produktionsreife Marketing-Website für V.I.B. Voß Immobilien Beratung mit 9 Routes, lokal lauffähig, Vercel-deploy-ready, aber kein Live-Deployment in diesem Build.

**Architecture:** Next.js 16 App Router + React 19 + Tailwind 4 + TypeScript. Server Components als Default, Client Components nur für Interaktion (Forms, MobileMenu, RevealOnScroll). Content in `src/content/*.ts` Files (Single Source of Truth, alle Texte aus `~/Downloads/Website - Vorbereitende Unterlagen/00_aufbereitet/04-website-texte.md`). 3 Wellen: Welle 1 Setup, Welle 2 Sections+Content, Welle 3 Assets+Quality.

**Tech Stack:** Next.js 16.1.6, React 19.2.3, Tailwind 4, TypeScript 5, framer-motion 12, @tabler/icons-react, next/font (Manrope + Playfair Display), Resend (Skelett), sharp (Image-Optimierung).

**Verify statt Test:** Marketing-Site ohne Unit-Tests (Out-of-Scope laut Spec). Jede Task hat einen Verify-Step (`npm run build`, visuelle Browser-Sicht, Lighthouse oder Console-Check).

**Spec:** `~/Arbeit/Kunden/vib/docs/superpowers/specs/2026-05-21-vib-website-design.md`

---

## File Structure

```
~/Arbeit/Kunden/vib/
├── brand/                     # SVG Logos + Porträt-Original + design-tokens.json
├── briefing/                  # Read-only Kopien der Briefing-MDs
├── docs/superpowers/
│   ├── specs/
│   └── plans/
└── website/
    ├── public/
    │   ├── images/
    │   └── favicons
    ├── src/
    │   ├── app/[9 routes]/page.tsx + globals.css + layout.tsx + api/
    │   ├── components/[layout, sections, forms, immobilien, ui]/
    │   ├── content/[home, ueber-mich, leistungen, immobilien, kontakt, impressum, datenschutz, nav].ts
    │   └── lib/[tokens, mail, validation, seo].ts
    ├── tailwind.config.ts
    ├── package.json
    └── README.md
```

---

# WELLE 1 — Setup & Architecture (Agent: nextjs-developer)

## Task 1.1: Next.js Projekt scaffolden

**Files:**
- Create: `~/Arbeit/Kunden/vib/website/` (komplette Next.js-Struktur)

- [ ] **Step 1: Scaffold-Command ausführen**

```bash
cd ~/Arbeit/Kunden/vib
npx create-next-app@latest website --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-turbopack
```

Antworten falls interaktiv abgefragt: alles wie oben.

- [ ] **Step 2: Verify Scaffold**

```bash
cd ~/Arbeit/Kunden/vib/website
ls src/app/ && cat package.json | grep -E '"next"|"react"|"tailwind"'
```

Expected: `src/app/` enthält `layout.tsx`, `page.tsx`, `globals.css`. `package.json` listet Next.js 16.x, React 19.x, Tailwind 4.x.

- [ ] **Step 3: Git init**

```bash
cd ~/Arbeit/Kunden/vib
git init
echo "node_modules/\n.next/\n.env*\n!.env.example\n.DS_Store\nbrand/logo-tmp/" > .gitignore
git add .gitignore
git commit -m "chore: initial gitignore"
```

- [ ] **Step 4: Erste echte Commits**

```bash
cd ~/Arbeit/Kunden/vib
git add website
git commit -m "feat: scaffold Next.js 16 + Tailwind 4 + TypeScript project"
```

## Task 1.2: Briefing & Spec im Repo verlinken

**Files:**
- Copy: Briefing-MDs nach `~/Arbeit/Kunden/vib/briefing/`

- [ ] **Step 1: Briefing-MDs kopieren**

```bash
cp -r "/Users/lukaslavicka/Downloads/Website - Vorbereitende Unterlagen/00_aufbereitet/"*.md ~/Arbeit/Kunden/vib/briefing/
ls ~/Arbeit/Kunden/vib/briefing/
```

Expected: 10 .md Files (README + 01-09).

- [ ] **Step 2: Original-Material referenzieren**

```bash
echo "# Quell-Material\n\nOriginale unter: \`~/Downloads/Website - Vorbereitende Unterlagen/\`\nAufbereitete MDs liegen hier kopiert für lokale Referenz im Build." > ~/Arbeit/Kunden/vib/briefing/_SOURCE.md
```

- [ ] **Step 3: Commit**

```bash
cd ~/Arbeit/Kunden/vib
git add briefing
git commit -m "docs: add briefing materials"
```

## Task 1.3: Design Tokens in tailwind.config übertragen

**Files:**
- Modify: `~/Arbeit/Kunden/vib/website/tailwind.config.ts` (komplette Token-Übernahme)
- Create: `~/Arbeit/Kunden/vib/brand/design-tokens.json`

- [ ] **Step 1: Token-JSON in brand/ ablegen**

Write `~/Arbeit/Kunden/vib/brand/design-tokens.json` mit folgendem Inhalt:

```json
{
  "colors": {
    "primary": "#000000",
    "secondary": "#71594e",
    "background": "#fcf9f8",
    "surface": "#fcf9f8",
    "surface-ivory": "#FDFBFB",
    "surface-container-low": "#f6f3f2",
    "muted-text": "#6B6B6B",
    "on-surface-variant": "#444748",
    "border-taupe": "#E6D9D2",
    "zartrosa": "#F4D4C6",
    "on-primary": "#ffffff",
    "error": "#ba1a1a"
  },
  "spacing": {
    "gutter": "32px",
    "container-max": "1280px",
    "margin-desktop": "80px",
    "margin-mobile": "24px",
    "section-gap": "120px",
    "section-gap-mobile": "64px"
  },
  "fontFamily": {
    "display": ["Playfair Display", "serif"],
    "body": ["Manrope", "sans-serif"]
  },
  "borderRadius": {
    "DEFAULT": "0.125rem",
    "lg": "0.25rem",
    "xl": "0.5rem",
    "full": "0.75rem"
  }
}
```

- [ ] **Step 2: tailwind.config.ts schreiben**

Replace `~/Arbeit/Kunden/vib/website/tailwind.config.ts` content with:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#71594e",
        background: "#fcf9f8",
        surface: "#fcf9f8",
        "surface-ivory": "#FDFBFB",
        "surface-container-low": "#f6f3f2",
        "muted-text": "#6B6B6B",
        "on-surface-variant": "#444748",
        "border-taupe": "#E6D9D2",
        zartrosa: "#F4D4C6",
        "on-primary": "#ffffff",
        error: "#ba1a1a",
      },
      spacing: {
        gutter: "32px",
        "container-max": "1280px",
        "margin-desktop": "80px",
        "margin-mobile": "24px",
        "section-gap": "120px",
        "section-gap-mobile": "64px",
      },
      maxWidth: {
        "container-max": "1280px",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["64px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "400" }],
        "display-lg-mobile": ["40px", { lineHeight: "1.2", fontWeight: "400" }],
        "headline-md": ["32px", { lineHeight: "1.3", fontWeight: "400" }],
        "signature-quote": ["24px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "300" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "label-caps": ["12px", { lineHeight: "1.2", letterSpacing: "0.1em", fontWeight: "600" }],
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 3: Build verifyen**

```bash
cd ~/Arbeit/Kunden/vib/website && npm run build
```

Expected: `✓ Compiled successfully`. Keine Tailwind-Token-Fehler.

- [ ] **Step 4: Commit**

```bash
cd ~/Arbeit/Kunden/vib
git add website/tailwind.config.ts brand/design-tokens.json
git commit -m "feat(design): import design tokens from Stitch into Tailwind config"
```

## Task 1.4: next/font Setup mit Manrope + Playfair Display

**Files:**
- Modify: `~/Arbeit/Kunden/vib/website/src/app/layout.tsx`

- [ ] **Step 1: layout.tsx schreiben**

Replace content of `~/Arbeit/Kunden/vib/website/src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "V.I.B. Voß Immobilien Beratung — Edith Voss",
  description:
    "Verkaufen aus Leidenschaft. Seit fast 30 Jahren begleite ich Eigentümer im Rhein-Neckar-Raum beim Verkauf besonderer Immobilien — persönlich, diskret und mit einem Netzwerk, das schon vor der Veröffentlichung wirkt.",
  metadataBase: new URL("https://e-vib.de"),
  openGraph: {
    title: "V.I.B. Voß Immobilien Beratung",
    description:
      "Verkaufen aus Leidenschaft — Edith Voss, Maklerin im Rhein-Neckar-Raum mit über 30 Jahren Erfahrung.",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${manrope.variable} ${playfair.variable}`}>
      <body className="bg-background text-on-surface-variant font-body antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Build verifyen**

```bash
cd ~/Arbeit/Kunden/vib/website && npm run build && npm run lint
```

Expected: Beide grün.

- [ ] **Step 3: Commit**

```bash
cd ~/Arbeit/Kunden/vib
git add website/src/app/layout.tsx
git commit -m "feat(fonts): integrate Manrope + Playfair Display via next/font"
```

## Task 1.5: globals.css mit Tailwind 4 Layer + Custom Utilities

**Files:**
- Modify: `~/Arbeit/Kunden/vib/website/src/app/globals.css`

- [ ] **Step 1: globals.css schreiben**

```css
@import "tailwindcss";

@theme {
  --color-primary: #000000;
  --color-secondary: #71594e;
  --color-background: #fcf9f8;
  --color-surface: #fcf9f8;
  --color-surface-ivory: #FDFBFB;
  --color-surface-container-low: #f6f3f2;
  --color-muted-text: #6B6B6B;
  --color-on-surface-variant: #444748;
  --color-border-taupe: #E6D9D2;
  --color-zartrosa: #F4D4C6;
  --color-on-primary: #ffffff;
  --color-error: #ba1a1a;
}

@layer base {
  ::selection {
    background-color: var(--color-zartrosa);
    color: var(--color-primary);
  }

  html {
    scroll-behavior: smooth;
  }
}
```

- [ ] **Step 2: Build verifyen**

```bash
cd ~/Arbeit/Kunden/vib/website && npm run build
```

Expected: Build durch. Falls Tailwind 4 die @theme-Syntax nicht akzeptiert (je nach Version), Fallback auf Standard `@layer base { :root {...} }` mit CSS-Variablen.

- [ ] **Step 3: Commit**

```bash
cd ~/Arbeit/Kunden/vib
git add website/src/app/globals.css
git commit -m "feat(css): setup globals.css with theme variables"
```

## Task 1.6: Header-Komponente

**Files:**
- Create: `~/Arbeit/Kunden/vib/website/src/components/layout/Header.tsx`
- Create: `~/Arbeit/Kunden/vib/website/src/content/nav.ts`

- [ ] **Step 1: nav.ts schreiben**

```ts
export const navItems = [
  { label: "HOME", href: "/" },
  { label: "ÜBER MICH", href: "/ueber-mich" },
  { label: "LEISTUNGEN", href: "/leistungen" },
  { label: "IMMOBILIEN", href: "/immobilien" },
  { label: "IMMOBILIENSUCHE", href: "/immobiliensuche" },
  { label: "KONTAKT", href: "/kontakt" },
] as const;

export type NavItem = (typeof navItems)[number];
```

- [ ] **Step 2: Header.tsx schreiben**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { navItems } from "@/content/nav";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-surface border-b border-border-taupe sticky top-0 z-50 w-full">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-6 w-full max-w-container-max mx-auto">
        <Link
          href="/"
          className="text-headline-md font-display tracking-tighter text-primary hover:opacity-80 transition-opacity"
          onClick={() => setOpen(false)}
        >
          V.I.B.
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-body text-label-caps transition-colors duration-300 ${
                  active
                    ? "text-primary border-b border-secondary pb-1"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          className="md:hidden text-primary"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconX size={28} /> : <IconMenu2 size={28} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border-taupe bg-surface">
          <nav className="flex flex-col px-margin-mobile py-6 gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-body text-label-caps ${
                  pathname === item.href ? "text-primary" : "text-on-surface-variant"
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 3: Tabler-Icons installieren**

```bash
cd ~/Arbeit/Kunden/vib/website && npm install @tabler/icons-react
```

- [ ] **Step 4: Build verifyen**

```bash
npm run build && npm run lint
```

Expected: Beide grün.

- [ ] **Step 5: Commit**

```bash
cd ~/Arbeit/Kunden/vib
git add website
git commit -m "feat(layout): add Header with mobile menu"
```

## Task 1.7: Footer-Komponente

**Files:**
- Create: `~/Arbeit/Kunden/vib/website/src/components/layout/Footer.tsx`

- [ ] **Step 1: Footer.tsx schreiben**

```tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-border-taupe mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-start px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap w-full max-w-container-max mx-auto gap-12 md:gap-0">
        <div className="flex flex-col gap-4 max-w-sm">
          <span className="text-headline-md font-display text-primary">V.I.B.</span>
          <p className="font-body text-body-md text-muted-text">
            Voß Immobilien Beratung — Edith Voss
            <br />
            Alte Schulstraße 28, 68549 Ilvesheim
          </p>
          <p className="font-body text-body-md text-muted-text">
            <a href="tel:+491733601936" className="hover:text-secondary transition-colors">
              +49 173 360 19 36
            </a>
            <br />
            <a href="mailto:info@e-vib.de" className="hover:text-secondary transition-colors">
              info@e-vib.de
            </a>
          </p>
          <p className="font-display italic text-body-md text-primary mt-4">
            „Man lebt nur einmal — wir zeigen Ihnen wo."
          </p>
        </div>
        <nav className="flex flex-col gap-4">
          <Link href="/impressum" className="font-body text-body-md text-muted-text hover:text-secondary transition-colors">
            Impressum
          </Link>
          <Link href="/datenschutz" className="font-body text-body-md text-muted-text hover:text-secondary transition-colors">
            Datenschutz
          </Link>
          <Link href="/kontakt" className="font-body text-body-md text-muted-text hover:text-secondary transition-colors">
            Kontakt
          </Link>
          <p className="font-body text-body-md text-muted-text mt-8">
            © {new Date().getFullYear()} V.I.B. Voß Immobilien Beratung
          </p>
        </nav>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: layout.tsx integrieren**

Modify `~/Arbeit/Kunden/vib/website/src/app/layout.tsx` — add imports and wrap children:

```tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
// ... existing imports
```

And in the body:

```tsx
<body className="bg-background text-on-surface-variant font-body antialiased min-h-screen flex flex-col">
  <Header />
  <main className="flex-grow w-full">{children}</main>
  <Footer />
</body>
```

- [ ] **Step 3: Build verifyen**

```bash
cd ~/Arbeit/Kunden/vib/website && npm run build
```

- [ ] **Step 4: Commit**

```bash
cd ~/Arbeit/Kunden/vib
git add website
git commit -m "feat(layout): add Footer and integrate header/footer into root layout"
```

## Task 1.8: Alle 9 Route-Skelette anlegen

**Files:**
- Create: `src/app/page.tsx` (already exists, will be overwritten in Welle 2)
- Create: `src/app/ueber-mich/page.tsx`
- Create: `src/app/leistungen/page.tsx`
- Create: `src/app/immobilien/page.tsx`
- Create: `src/app/immobilien/[slug]/page.tsx`
- Create: `src/app/immobiliensuche/page.tsx`
- Create: `src/app/kontakt/page.tsx`
- Create: `src/app/impressum/page.tsx`
- Create: `src/app/datenschutz/page.tsx`

- [ ] **Step 1: Helper-Skeleton-Snippet**

Für jede Page das gleiche Skelett verwenden (Beispiel `ueber-mich/page.tsx`):

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über mich | V.I.B. Voß Immobilien Beratung",
  description: "Edith Voss — Maklerin mit Leidenschaft im Rhein-Neckar-Raum seit fast 30 Jahren.",
};

export default function UeberMichPage() {
  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
      <h1 className="font-display text-display-lg-mobile md:text-display-lg text-primary">
        Über mich
      </h1>
      <p className="font-body text-body-lg text-muted-text mt-8">
        [Skelett — Inhalt in Welle 2]
      </p>
    </div>
  );
}
```

Pro Route entsprechend `title` und `description` anpassen:

| Route | Title | Description |
|-------|-------|-------------|
| `/ueber-mich` | „Über mich \| V.I.B. Voß Immobilien Beratung" | „Edith Voss — Maklerin mit Leidenschaft im Rhein-Neckar-Raum seit fast 30 Jahren." |
| `/leistungen` | „Leistungen \| V.I.B." | „Wertberatung, Off-Market-Vermarktung, Exposé, Verhandlung, Home Staging — alle Leistungen aus einer Hand." |
| `/immobilien` | „Immobilien \| V.I.B." | „Aktuelle und diskret vermittelte Immobilien im Rhein-Neckar-Raum." |
| `/immobilien/[slug]` | wird in Detail-Page dynamisch gesetzt | wird dynamisch gesetzt |
| `/immobiliensuche` | „Immobiliensuche \| V.I.B." | „Ihr diskretes Suchprofil — Zugang zu Off-Market-Objekten vor öffentlicher Vermarktung." |
| `/kontakt` | „Kontakt \| V.I.B." | „Sprechen Sie mit Edith Voss persönlich — auch am Wochenende." |
| `/impressum` | „Impressum \| V.I.B." | „" (Indexierung später optional ausschließen) |
| `/datenschutz` | „Datenschutz \| V.I.B." | „" |

Für `/immobilien/[slug]/page.tsx`:

```tsx
type Params = Promise<{ slug: string }>;

export default async function ImmobilieDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
      <h1 className="font-display text-display-lg-mobile md:text-display-lg text-primary">
        Immobilie: {slug}
      </h1>
      <p className="font-body text-body-lg text-muted-text mt-8">
        [Skelett — Inhalt in Welle 2]
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Alle Routes anlegen**

```bash
cd ~/Arbeit/Kunden/vib/website
mkdir -p src/app/{ueber-mich,leistungen,immobilien,immobilien/\[slug\],immobiliensuche,kontakt,impressum,datenschutz}
```

Dann jede `page.tsx` mit dem entsprechenden Inhalt anlegen (Write Tool).

- [ ] **Step 3: Verify aller Routes**

```bash
cd ~/Arbeit/Kunden/vib/website && npm run build
```

Expected: Build listet alle 9 Routes:
```
Route (app)
○ /
○ /datenschutz
○ /impressum
○ /immobilien
ƒ /immobilien/[slug]
○ /immobiliensuche
○ /kontakt
○ /leistungen
○ /ueber-mich
```

- [ ] **Step 4: Dev-Server kurz starten und alle Routes ansehen**

```bash
cd ~/Arbeit/Kunden/vib/website && timeout 8 npm run dev &
sleep 4
for route in / /ueber-mich /leistungen /immobilien /immobilien/test /immobiliensuche /kontakt /impressum /datenschutz; do
  curl -s -o /dev/null -w "%{http_code} %{url}\n" "http://localhost:3000${route}"
done
```

Expected: Alle 9 Routes return 200.

- [ ] **Step 5: Commit**

```bash
cd ~/Arbeit/Kunden/vib
git add website
git commit -m "feat(routes): scaffold all 9 page routes with metadata"
```

## Task 1.9: API-Routes Skelette

**Files:**
- Create: `~/Arbeit/Kunden/vib/website/src/app/api/kontakt/route.ts`
- Create: `~/Arbeit/Kunden/vib/website/src/app/api/immobiliensuche/route.ts`
- Create: `~/Arbeit/Kunden/vib/website/src/lib/mail.ts`
- Create: `~/Arbeit/Kunden/vib/website/src/lib/validation.ts`

- [ ] **Step 1: zod installieren**

```bash
cd ~/Arbeit/Kunden/vib/website && npm install zod
```

- [ ] **Step 2: validation.ts schreiben**

```ts
import { z } from "zod";

export const kontaktSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  telefon: z.string().min(5).max(40).optional().or(z.literal("")),
  nachricht: z.string().min(10).max(5000),
  dsgvo: z.literal(true),
  // honeypot field — must be empty
  website: z.string().max(0).optional().or(z.literal("")),
});

export type KontaktInput = z.infer<typeof kontaktSchema>;

export const suchprofilSchema = z.object({
  absicht: z.enum(["kauf", "miete"]),
  art: z.enum(["villa", "mehrfamilienhaus", "einfamilienhaus", "wohnung", "apartment", "sonstiges"]),
  orte: z.string().min(2).max(500),
  wohnflaeche: z.coerce.number().int().min(10).max(10000).optional(),
  grundstueck: z.coerce.number().int().min(0).max(100000).optional(),
  limit: z.coerce.number().int().min(50000).max(50000000).optional(),
  ausstattung: z.array(z.string()).optional(),
  wuensche: z.string().max(5000).optional(),
  lage: z.array(z.string()).optional(),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  telefon: z.string().min(5).max(40),
  dsgvo: z.literal(true),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type SuchprofilInput = z.infer<typeof suchprofilSchema>;
```

- [ ] **Step 3: mail.ts schreiben (Skelett mit Console-Log-Fallback)**

```ts
type MailOptions = {
  subject: string;
  body: string;
  replyTo?: string;
};

const RECIPIENT = process.env.MAIL_RECIPIENT ?? "info@e-vib.de";
const RESEND_KEY = process.env.RESEND_API_KEY;

export async function sendMail(opts: MailOptions): Promise<{ ok: boolean; reason?: string }> {
  if (!RESEND_KEY) {
    console.info("[mail] no RESEND_API_KEY — logging instead of sending");
    console.info("[mail] To:", RECIPIENT);
    console.info("[mail] Subject:", opts.subject);
    console.info("[mail] Body:", opts.body);
    if (opts.replyTo) console.info("[mail] Reply-To:", opts.replyTo);
    return { ok: true, reason: "logged-only" };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "V.I.B. Website <noreply@e-vib.de>",
        to: [RECIPIENT],
        subject: opts.subject,
        text: opts.body,
        reply_to: opts.replyTo,
      }),
    });
    if (!res.ok) {
      return { ok: false, reason: `resend ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: String(err) };
  }
}
```

- [ ] **Step 4: api/kontakt/route.ts schreiben**

```ts
import { NextRequest, NextResponse } from "next/server";
import { kontaktSchema } from "@/lib/validation";
import { sendMail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  const parsed = kontaktSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation", details: parsed.error.flatten() }, { status: 400 });
  }
  const { name, email, telefon, nachricht } = parsed.data;
  const body = `Neue Kontaktanfrage über die Website:

Name: ${name}
E-Mail: ${email}
Telefon: ${telefon || "—"}

Nachricht:
${nachricht}
`;
  const result = await sendMail({
    subject: `Kontaktanfrage von ${name}`,
    body,
    replyTo: email,
  });
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: "mail_failed", reason: result.reason }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 5: api/immobiliensuche/route.ts schreiben**

```ts
import { NextRequest, NextResponse } from "next/server";
import { suchprofilSchema } from "@/lib/validation";
import { sendMail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  const parsed = suchprofilSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation", details: parsed.error.flatten() }, { status: 400 });
  }
  const d = parsed.data;
  const body = `Neues Suchprofil:

Name: ${d.name}
E-Mail: ${d.email}
Telefon: ${d.telefon}

Absicht: ${d.absicht}
Art: ${d.art}
Wunschorte: ${d.orte}
Wohnfläche: ${d.wohnflaeche ?? "—"} m²
Grundstücksgröße: ${d.grundstueck ?? "—"} m²
Limitpreis: ${d.limit ? d.limit.toLocaleString("de-DE") + " €" : "—"}

Ausstattung: ${d.ausstattung?.join(", ") || "—"}
Lage-Wünsche: ${d.lage?.join(", ") || "—"}

Weitere Wünsche:
${d.wuensche || "—"}
`;
  const result = await sendMail({
    subject: `Suchprofil von ${d.name}`,
    body,
    replyTo: d.email,
  });
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: "mail_failed", reason: result.reason }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 6: Build + API Smoke-Test**

```bash
cd ~/Arbeit/Kunden/vib/website && npm run build
```

Expected: Build listet auch `λ /api/kontakt` und `λ /api/immobiliensuche`.

- [ ] **Step 7: Commit**

```bash
cd ~/Arbeit/Kunden/vib
git add website
git commit -m "feat(api): add contact + suchprofil API routes with zod validation and mail skeleton"
```

## Task 1.10: README initial

**Files:**
- Modify: `~/Arbeit/Kunden/vib/website/README.md` (überschreibe Next.js Default)
- Create: `~/Arbeit/Kunden/vib/README.md` (Top-Level Projekt-Übersicht)

- [ ] **Step 1: Top-Level README**

Write `~/Arbeit/Kunden/vib/README.md`:

```markdown
# V.I.B. Voß Immobilien Beratung — Projekt-Workspace

Kunden-Workspace für die Website-Erstellung von Edith Voss / V.I.B. Voß Immobilien Beratung.

## Struktur

| Pfad | Inhalt |
|------|--------|
| `brand/` | Logos (SVG), Porträt, Design Tokens |
| `briefing/` | Aufbereitete Briefing-MDs (Read-Only) |
| `docs/superpowers/specs/` | Design Specs |
| `docs/superpowers/plans/` | Implementation Plans |
| `website/` | Next.js 16 Projekt |

## Quick Start

```bash
cd website
npm install
npm run dev
# → http://localhost:3000
```

## Status

V1 in Build (Mai 2026). Kein Live-Deployment, lokal lauffähig.

## Quell-Material

Originale liegen unter `~/Downloads/Website - Vorbereitende Unterlagen/`.
```

- [ ] **Step 2: Website README**

Write `~/Arbeit/Kunden/vib/website/README.md`:

```markdown
# V.I.B. Website

Next.js 16 + React 19 + Tailwind 4 + TypeScript.

## Dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run start
```

## Lint

```bash
npm run lint
```

## Environment Variables

Erstelle eine `.env.local` für lokale Mail-Funktion:

```
RESEND_API_KEY=re_...           # optional, ohne wird stattdessen geloggt
MAIL_RECIPIENT=info@e-vib.de    # optional, default ist info@e-vib.de
```

## Struktur

- `src/app/` — App Router Pages und API-Routes
- `src/components/` — UI-, Section-, Layout-, Form-Komponenten
- `src/content/` — Texte und Daten als TypeScript-Files
- `src/lib/` — Helpers (Validation, Mail, SEO)
- `public/images/` — Optimierte Bilder

## Deployment (TODO)

Vorbereitet für Vercel. Beim Live-Gang:
1. Vercel-Projekt verknüpfen
2. Env-Vars setzen (`RESEND_API_KEY`)
3. Domain `e-vib.de` aufschalten
```

- [ ] **Step 3: Commit**

```bash
cd ~/Arbeit/Kunden/vib
git add README.md website/README.md
git commit -m "docs: add project and website READMEs"
```

---

# WELLE 2 — Sections, Content & Pages (Agent: ui-ux-pro-max)

## Task 2.1: Content-Files mit Edith-Originaltexten

**Files:**
- Create: `~/Arbeit/Kunden/vib/website/src/content/home.ts`
- Create: `~/Arbeit/Kunden/vib/website/src/content/ueber-mich.ts`
- Create: `~/Arbeit/Kunden/vib/website/src/content/leistungen.ts`
- Create: `~/Arbeit/Kunden/vib/website/src/content/immobilien.ts`
- Create: `~/Arbeit/Kunden/vib/website/src/content/kontakt.ts`
- Create: `~/Arbeit/Kunden/vib/website/src/content/impressum.ts`
- Create: `~/Arbeit/Kunden/vib/website/src/content/datenschutz.ts`

- [ ] **Step 1: home.ts — alle Texte aus 04-website-texte.md**

Write `~/Arbeit/Kunden/vib/website/src/content/home.ts`:

```ts
export const home = {
  hero: {
    eyebrow: "V.I.B. Voß Immobilien Beratung",
    headline: "Verkaufen aus Leidenschaft.",
    subline:
      "Seit fast 30 Jahren begleite ich Eigentümer im Rhein-Neckar-Raum beim Verkauf besonderer Immobilien — persönlich, diskret und mit einem Netzwerk, das schon vor der Veröffentlichung wirkt.",
    primaryCta: { label: "Mein Immobilien-Anliegen besprechen", href: "#kontakt" },
    secondaryCta: { label: "Diskret nach Immobilien suchen", href: "/immobiliensuche" },
    trustStrip: ["30 Jahre Erfahrung", "Rhein-Neckar & überregional", "Off-Market-Netzwerk"],
  },
  intro: {
    body: [
      "Wer eine besondere Immobilie verkauft, sucht nicht irgendeine Maklerin – sondern eine Persönlichkeit mit Erfahrung, Feingefühl und dem richtigen Gespür für Menschen und Märkte.",
      "Seit fast 30 Jahren begleite ich Eigentümer beim erfolgreichen Verkauf ihrer Immobilien – diskret, professionell und mit einer Leidenschaft, die man spürt. Mein Schwerpunkt liegt nicht in leeren Versprechen oder standardisierten Verkaufsstrategien. Mein Erfolg basiert auf etwas viel Wertvollerem: einem außergewöhnlichen Netzwerk, fundierter Marktkenntnis und der Fähigkeit, Käufer und Verkäufer auf menschlicher Ebene zusammenzubringen.",
    ],
  },
  usps: [
    {
      icon: "diamond",
      title: "Gespür für die richtige Verkaufsmöglichkeit",
      body: "Statt Online-Schätzungen erhalten Sie eine fundierte, marktgerechte Einschätzung — basierend auf drei Jahrzehnten Erfahrung im Rhein-Neckar-Raum.",
    },
    {
      icon: "hub",
      title: "Ein Netzwerk, das vor der Veröffentlichung wirkt",
      body: "Bereits vor der offiziellen Vermarktung kontaktiere ich passende Käufer aus meinem gewachsenen, solventen Kundenstamm — diskret und ohne öffentliche Listung.",
    },
    {
      icon: "person",
      title: "Niveauvolle Persönlichkeit, persönlicher Umgang",
      body: "Transparente Kommunikation, professionelles Auftreten und ein respektvoller Umgang mit allen Beteiligten — das ist mein Maßstab.",
    },
  ],
  services: [
    {
      title: "Fundierte Wertberatung",
      body: "Realistische, präzise Einschätzung — basierend auf Marktkenntnis und Erfahrung, nicht auf Online-Tools wie ImmoScout oder Sprengnetter.",
    },
    {
      title: "Off-Market-Vermarktung",
      body: "Bevor Ihre Immobilie öffentlich gezeigt wird, kontaktiere ich passende Käufer aus meinem Netzwerk. Einige meiner Kunden haben die Käufer erst beim Notartermin kennengelernt.",
    },
    {
      title: "Unterlagen-Beschaffung",
      body: "Ich kümmere mich um alle objektbezogenen Unterlagen — bei Bedarf direkt mit den zuständigen Ämtern.",
    },
    {
      title: "Professionelles Exposé",
      body: "Optimale Darstellung Ihrer Immobilie in einem stilvollen, klar strukturierten Exposé.",
    },
    {
      title: "Verhandlung & Finanzierung",
      body: "Ich führe alle Verhandlungen mit Kaufinteressenten und kläre die Finanzierungslage — bis zur notariellen Beurkundung.",
    },
    {
      title: "Home Staging",
      body: "Damit Ihre Immobilie ihr volles Potenzial entfaltet — klassisch oder digital.",
    },
  ],
  homeStaging: {
    eyebrow: "Home Staging",
    headline: "Weil Ihre Immobilie es wert ist.",
    body: "Ein stimmungsvoll inszenierter Raum spricht nicht nur den Verstand an — sondern das Herz. Mit gezieltem Home Staging gewinnen leerstehende oder schwer verkäufliche Immobilien an Wärme, Charakter und Vorstellungskraft. Genau das hilft Interessenten, eine Verbindung aufzubauen — und steigert spürbar den Verkaufserfolg.",
  },
  region: {
    headline: "Regional verwurzelt — überregional erfolgreich.",
    body: "Seit vielen Jahren bin ich in der Rhein-Neckar-Region, Weinheim, Karlsruhe, dem Odenwald, Rheinland-Pfalz und darüber hinaus erfolgreich tätig. Mein Name steht für Qualität, Vertrauen und nachhaltige Verkaufserfolge.",
    orte: ["Weinheim", "Mannheim", "Heidelberg", "Karlsruhe", "Bergstraße", "Ilvesheim", "Vorderer Odenwald", "Rheinland-Pfalz"],
  },
  testimonial: {
    quote:
      "Ein Kunde schrieb mir nach erfolgreichem Verkauf seiner Immobilie, dass ich das Negativ-Image meines Berufsstandes eindrucksvoll widerlege.",
    attribution: "— aus Ediths Erfahrungsschatz",
  },
  cta: {
    headline: "Lassen Sie uns gemeinsam den besten Weg für Ihre Immobilie finden.",
    sub: "Persönlich. Diskret. Erfolgreich.",
  },
} as const;
```

- [ ] **Step 2: ueber-mich.ts**

```ts
export const ueberMich = {
  hero: {
    headline: "Ihre Maklerin mit Leidenschaft im Rhein-Neckar-Raum",
    subline:
      "Eine persönliche Begleitung durch den Immobilienmarkt — geprägt von Erfahrung, Diskretion und einem untrüglichen Gespür für Menschen und Räume.",
  },
  story: {
    eyebrow: "Die Geschichte",
    headline: "Erfahrung trifft Hingabe",
    paragraphs: [
      "Jeder Weg beginnt mit einem ersten Schritt. Mein Einstieg in die Immobilienbranche war geprägt von der Faszination für Räume und deren Wirkung auf uns Menschen. Es war mir von Anfang an wichtig, nicht nur Objekte zu vermitteln, sondern Lebensräume zu finden, die zu den Bedürfnissen meiner Klienten passen.",
      "Anfang der 2000er Jahre habe ich in Weinheim mein erstes Unternehmen — Edith Voss Immobilien — aufgebaut und zu einem der etabliertesten Maklerbüros der Region geformt. 2015 habe ich es verkauft; mein Name ist bis heute Aushängeschild dieser Firma.",
      "Heute, als V.I.B. Voß Immobilien Beratung, konzentriere ich mich noch stärker auf den persönlichen, beratenden Teil meiner Arbeit. Der Markt wandelt sich — Heraklit hatte recht. Meine Aufgabe ist es, Ihnen mit Weitblick, fundiertem Fachwissen und einem Netzwerk aus drei Jahrzehnten zur Seite zu stehen: diskret und höchst persönlich.",
    ],
  },
  philosophy: {
    quote:
      "Verkaufen aus Leidenschaft. Mein Motto: Nichts ist so beständig wie der Wandel.",
    attribution: "— nach Heraklit von Ephesus (535–475 v. Chr.)",
  },
  values: [
    {
      icon: "handshake",
      title: "Fairness",
      body: "Transparenz in allen Prozessen und ehrliche Einschätzungen — die Basis für eine erfolgreiche Zusammenarbeit auf Augenhöhe.",
    },
    {
      icon: "school",
      title: "Fachwissen",
      body: "Drei Jahrzehnte Marktkenntnis im Rhein-Neckar-Raum sind die Grundlage jeder Empfehlung, die ich Ihnen gebe.",
    },
    {
      icon: "person",
      title: "Persönliche Betreuung",
      body: "Sie sind keine Nummer. Ich nehme mir Zeit, Ihre individuelle Situation zu verstehen — und finde maßgeschneiderte Lösungen.",
    },
    {
      icon: "verified",
      title: "Verlässlichkeit",
      body: "Ein Wort ist ein Wort. Diskretion, Pünktlichkeit und Verbindlichkeit in allen Absprachen sind für mich selbstverständlich.",
    },
  ],
  cta: {
    headline: "Lernen Sie mich persönlich kennen — auch am Wochenende.",
    button: { label: "Kontakt aufnehmen", href: "/kontakt" },
  },
} as const;
```

- [ ] **Step 3: leistungen.ts, immobilien.ts, kontakt.ts, impressum.ts, datenschutz.ts**

Analog mit Texten aus `briefing/03-leistungen-und-zielgruppe.md`, `briefing/06-sitemap-und-empfehlung.md` und Spec Section 6. Wichtige Eckpunkte:

`impressum.ts` muss enthalten:
```ts
export const impressum = {
  firma: "V.I.B. Voß Immobilien Beratung",
  inhaberin: "Edith Voß",
  rechtsform: "Einzelfirma",
  anschrift: {
    strasse: "Alte Schulstraße 28",
    plz: "68549",
    ort: "Ilvesheim",
    land: "Deutschland",
  },
  kontakt: {
    telefon: "+49 173 360 19 36",
    email: "info@e-vib.de",
  },
  steuernummer: "37401/40895",
  ustId: "TODO_VON_EDITH",
  aufsichtsbehoerde: "TODO_VON_EDITH",
  berufshaftpflicht: "TODO_VON_EDITH",
} as const;
```

`immobilien.ts` für Demo-Listings:
```ts
export type Immobilie = {
  slug: string;
  status: "diskret" | "verfuegbar" | "auf-anfrage" | "verkauft";
  titel: string;
  ort: string;
  art: string;
  wohnflaeche: number;
  zimmer?: number;
  schlafzimmer?: number;
  badezimmer?: number;
  grundstueck?: number;
  preis: string;
  imageSlot: string;
  beschreibung: string[];
};

export const immobilien: Immobilie[] = [
  {
    slug: "stadtvilla-bergstrasse-diskret",
    status: "diskret",
    titel: "Stadtvilla an der Bergstraße",
    ort: "Heidelberg (Umgebung)",
    art: "Villa",
    wohnflaeche: 320,
    preis: "Auf Anfrage",
    imageSlot: "object-mock-1",
    beschreibung: [
      "Repräsentatives Anwesen in einer der gefragtesten Lagen der Bergstraße. Wegen der Sensibilität des Verkaufsprozesses werden Details ausschließlich auf persönliche Anfrage übermittelt.",
    ],
  },
  // weitere 2 Demo-Einträge analog
];
```

- [ ] **Step 4: Build verifyen**

```bash
cd ~/Arbeit/Kunden/vib/website && npm run build
```

- [ ] **Step 5: Commit**

```bash
cd ~/Arbeit/Kunden/vib
git add website/src/content
git commit -m "feat(content): add content modules with Edith's original texts"
```

## Task 2.2: UI Primitives

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Input.tsx`
- Create: `src/components/ui/Textarea.tsx`
- Create: `src/components/ui/Select.tsx`
- Create: `src/components/ui/Checkbox.tsx`
- Create: `src/components/ui/QuoteIcon.tsx`
- Create: `src/components/ui/RevealOnScroll.tsx`

- [ ] **Step 1: Button.tsx**

```tsx
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Props = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-body text-label-caps tracking-widest transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-on-primary hover:bg-secondary",
  secondary: "bg-transparent border border-primary text-primary hover:bg-surface-container-low",
  ghost: "bg-transparent text-primary hover:text-secondary",
};

export function Button({
  variant = "primary",
  className,
  children,
  href,
  onClick,
  type = "button",
  disabled,
  fullWidth,
}: Props) {
  const classes = cn(base, variants[variant], fullWidth && "w-full", className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
```

- [ ] **Step 2: cn helper**

Create `src/lib/cn.ts`:

```ts
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
```

- [ ] **Step 3: Input.tsx, Textarea.tsx, Select.tsx, Checkbox.tsx**

Alle minimalist styled mit:
- Border-bottom only (`border-b border-border-taupe focus:border-primary`)
- `bg-transparent`
- Label-Component mit Caps-Styling oben drüber
- Voll typisiert mit React.InputHTMLAttributes etc.

Beispiel `Input.tsx`:
```tsx
import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, error, className, id, ...rest },
  ref
) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="font-body text-label-caps text-muted-text uppercase tracking-widest">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(
          "w-full bg-transparent border-0 border-b border-border-taupe px-0 py-3 text-body-md font-body text-primary focus:ring-0 focus:border-primary transition-colors duration-300",
          error && "border-error",
          className
        )}
        {...rest}
      />
      {error && <span className="text-xs text-error">{error}</span>}
    </div>
  );
});
```

Analog Textarea (mit `rows`), Select (mit Children-Options), Checkbox (mit Custom-Check-Indikator).

- [ ] **Step 4: QuoteIcon.tsx**

```tsx
export function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14 28C14 22 18 18 22 18V14C14 14 8 20 8 28V36H22V28H14ZM34 28C34 22 38 18 42 18V14C34 14 28 20 28 28V36H42V28H34Z"
        fill="currentColor"
      />
    </svg>
  );
}
```

- [ ] **Step 5: RevealOnScroll.tsx**

```bash
cd ~/Arbeit/Kunden/vib/website && npm install framer-motion
```

```tsx
"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export function RevealOnScroll({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 6: Build + Commit**

```bash
cd ~/Arbeit/Kunden/vib/website && npm run build && npm run lint
cd ~/Arbeit/Kunden/vib
git add website
git commit -m "feat(ui): add Button, Input, Textarea, Select, Checkbox, QuoteIcon, RevealOnScroll primitives"
```

## Task 2.3: Section-Komponenten — Hero, IntroQuote, USPGrid, CTABlock

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Create: `src/components/sections/IntroQuote.tsx`
- Create: `src/components/sections/USPGrid.tsx`
- Create: `src/components/sections/CTABlock.tsx`

- [ ] **Step 1: Hero.tsx**

Props-getrieben. Akzeptiert `eyebrow`, `headline`, `subline`, `primaryCta`, `secondaryCta`, `image` (src + alt). Layout: 2-Spalten Desktop, gestapelt Mobile. Bild rechts (3/4 Aspect Ratio, rounded). Trust-Strip optional unter dem CTA.

- [ ] **Step 2: IntroQuote.tsx**

Zentrierter Textblock max-w-3xl, QuoteIcon, Body als Array (mehrere Absätze), optionale Attribution. Verwendet im Home (Block A Intro).

- [ ] **Step 3: USPGrid.tsx**

3-Spalten Grid (1 Mobile). Akzeptiert `items: { icon, title, body }[]`. Icon-Mapping zu Tabler-Icons (diamond → IconDiamond, hub → IconHierarchy, person → IconUserCheck, etc.).

- [ ] **Step 4: CTABlock.tsx**

Zentrierter Block in Border-Card (border-border-taupe rounded bg-surface-ivory p-12 md:p-24 text-center). Headline + optional Sub + Button.

- [ ] **Step 5: Build + Commit**

```bash
cd ~/Arbeit/Kunden/vib/website && npm run build
cd ~/Arbeit/Kunden/vib
git add website
git commit -m "feat(sections): add Hero, IntroQuote, USPGrid, CTABlock"
```

## Task 2.4: Weitere Section-Komponenten — ServiceGrid, RegionBlock, HomeStagingSpotlight, TestimonialBlock

**Files:**
- Create: `src/components/sections/ServiceGrid.tsx`
- Create: `src/components/sections/RegionBlock.tsx`
- Create: `src/components/sections/HomeStagingSpotlight.tsx`
- Create: `src/components/sections/TestimonialBlock.tsx`

- [ ] **Step 1: ServiceGrid.tsx**

Grid mit `gap-px bg-border-taupe border` Trick wie im Stitch (jede Card ist `bg-surface p-12 md:p-16` mit `hover:bg-surface-ivory`). Akzeptiert `services: { title, body }[]`, 2 oder 3 Spalten Desktop.

- [ ] **Step 2: RegionBlock.tsx**

2-Spalten: links Headline + Body, rechts Liste der Orte als bullet-less Liste mit Dash (`— Weinheim`).

- [ ] **Step 3: HomeStagingSpotlight.tsx**

Stitch-Style mit Bild + Text-Layout. Bild-Slot prop für später (Welle 3).

- [ ] **Step 4: TestimonialBlock.tsx**

Zentriert, QuoteIcon, große Display-Schrift, attribution darunter klein.

- [ ] **Step 5: Build + Commit**

```bash
cd ~/Arbeit/Kunden/vib/website && npm run build
cd ~/Arbeit/Kunden/vib
git add website
git commit -m "feat(sections): add ServiceGrid, RegionBlock, HomeStagingSpotlight, TestimonialBlock"
```

## Task 2.5: Home Page zusammensetzen

**Files:**
- Modify: `~/Arbeit/Kunden/vib/website/src/app/page.tsx`

- [ ] **Step 1: page.tsx neu schreiben**

```tsx
import { Hero } from "@/components/sections/Hero";
import { IntroQuote } from "@/components/sections/IntroQuote";
import { USPGrid } from "@/components/sections/USPGrid";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { HomeStagingSpotlight } from "@/components/sections/HomeStagingSpotlight";
import { RegionBlock } from "@/components/sections/RegionBlock";
import { TestimonialBlock } from "@/components/sections/TestimonialBlock";
import { CTABlock } from "@/components/sections/CTABlock";
import { ImmobilienFallback } from "@/components/sections/ImmobilienFallback";
import { ContactSection } from "@/components/sections/ContactSection";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { home } from "@/content/home";

export default function HomePage() {
  return (
    <>
      <Hero {...home.hero} />
      <RevealOnScroll><IntroQuote body={home.intro.body} /></RevealOnScroll>
      <RevealOnScroll><USPGrid items={home.usps} /></RevealOnScroll>
      <RevealOnScroll><ImmobilienFallback /></RevealOnScroll>
      <RevealOnScroll><ServiceGrid services={home.services} /></RevealOnScroll>
      <RevealOnScroll><HomeStagingSpotlight {...home.homeStaging} /></RevealOnScroll>
      <RevealOnScroll><RegionBlock {...home.region} /></RevealOnScroll>
      <RevealOnScroll><TestimonialBlock quote={home.testimonial.quote} attribution={home.testimonial.attribution} /></RevealOnScroll>
      <RevealOnScroll><ContactSection /></RevealOnScroll>
      <CTABlock headline={home.cta.headline} sub={home.cta.sub} />
    </>
  );
}
```

- [ ] **Step 2: ImmobilienFallback + ContactSection minimale Versionen schreiben**

```tsx
// src/components/sections/ImmobilienFallback.tsx
import { Button } from "@/components/ui/Button";

export function ImmobilienFallback() {
  return (
    <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
      <div className="bg-surface-container-low border border-border-taupe rounded p-12 md:p-24 text-center">
        <p className="font-display text-signature-quote text-primary max-w-2xl mx-auto">
          Aktuelle Objekte werden meist vor Veröffentlichung über mein diskretes Netzwerk vermittelt.
        </p>
        <p className="font-body text-body-md text-muted-text mt-6 max-w-xl mx-auto">
          Wenn Sie suchen oder verkaufen möchten, sprechen Sie mich direkt an — oder hinterlegen Sie Ihr Suchprofil.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
          <Button href="#kontakt">Persönlich besprechen</Button>
          <Button href="/immobiliensuche" variant="secondary">Suchprofil anlegen</Button>
        </div>
      </div>
    </section>
  );
}
```

```tsx
// src/components/sections/ContactSection.tsx
import { ContactForm } from "@/components/forms/ContactForm";

export function ContactSection() {
  return (
    <section id="kontakt" className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <div className="md:col-span-5">
          <h2 className="font-display text-display-lg-mobile md:text-headline-md text-primary mb-6">
            Lassen Sie uns gemeinsam den besten Weg für Ihre Immobilie finden.
          </h2>
          <p className="font-body text-body-lg text-muted-text mb-8">Persönlich. Diskret. Erfolgreich.</p>
          <ul className="space-y-3 font-body text-body-md text-primary">
            <li><a href="tel:+491733601936" className="hover:text-secondary">+49 173 360 19 36</a></li>
            <li><a href="mailto:info@e-vib.de" className="hover:text-secondary">info@e-vib.de</a></li>
            <li>Alte Schulstraße 28, 68549 Ilvesheim</li>
          </ul>
        </div>
        <div className="md:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Build + Browser-Verify**

```bash
cd ~/Arbeit/Kunden/vib/website && npm run build && timeout 6 npm run dev &
sleep 4 && curl -s http://localhost:3000 | grep -E "Verkaufen aus Leidenschaft|Gespür für die richtige"
```

Expected: Beide Begriffe gefunden.

- [ ] **Step 4: Commit**

```bash
cd ~/Arbeit/Kunden/vib
git add website
git commit -m "feat(home): compose home page with all sections"
```

## Task 2.6: Über-mich Page

**Files:**
- Modify: `src/app/ueber-mich/page.tsx`
- Create: `src/components/sections/StorytellingBlock.tsx`
- Create: `src/components/sections/ValuesGrid.tsx`

- [ ] **Step 1: StorytellingBlock.tsx**

12-Spalten-Grid wie Stitch: links Eyebrow + Headline (col-span-3 col-start-2), rechts Body-Absätze (col-span-6 col-start-6).

- [ ] **Step 2: ValuesGrid.tsx**

4er-Grid (2×2 Desktop, 1×4 Mobile) mit Icon, Title, Body. Hintergrund zartrosa-Sektion, Cards bg-surface mit Hover.

- [ ] **Step 3: ueber-mich/page.tsx**

```tsx
import { Hero } from "@/components/sections/Hero";
import { StorytellingBlock } from "@/components/sections/StorytellingBlock";
import { TestimonialBlock } from "@/components/sections/TestimonialBlock";
import { ValuesGrid } from "@/components/sections/ValuesGrid";
import { CTABlock } from "@/components/sections/CTABlock";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ueberMich } from "@/content/ueber-mich";

export const metadata = {
  title: "Über mich | V.I.B. Voß Immobilien Beratung",
  description: ueberMich.hero.subline,
};

export default function UeberMichPage() {
  return (
    <>
      <Hero headline={ueberMich.hero.headline} subline={ueberMich.hero.subline} />
      <RevealOnScroll>
        <StorytellingBlock
          eyebrow={ueberMich.story.eyebrow}
          headline={ueberMich.story.headline}
          paragraphs={ueberMich.story.paragraphs}
        />
      </RevealOnScroll>
      <RevealOnScroll>
        <TestimonialBlock quote={ueberMich.philosophy.quote} attribution={ueberMich.philosophy.attribution} />
      </RevealOnScroll>
      <RevealOnScroll>
        <ValuesGrid items={ueberMich.values} />
      </RevealOnScroll>
      <CTABlock headline={ueberMich.cta.headline} button={ueberMich.cta.button} />
    </>
  );
}
```

- [ ] **Step 4: Build + Commit**

```bash
cd ~/Arbeit/Kunden/vib/website && npm run build
cd ~/Arbeit/Kunden/vib
git add website
git commit -m "feat(ueber-mich): compose über mich page with storytelling and values"
```

## Task 2.7: Leistungen Page

**Files:**
- Modify: `src/app/leistungen/page.tsx`

- [ ] **Step 1: page.tsx**

Hero + erweiterte ServiceGrid (alle 6 Leistungen mit längeren Body-Texten) + CTABlock.

- [ ] **Step 2: Build + Commit**

```bash
cd ~/Arbeit/Kunden/vib/website && npm run build
cd ~/Arbeit/Kunden/vib
git add website
git commit -m "feat(leistungen): compose leistungen page"
```

## Task 2.8: Immobilien Listing Page

**Files:**
- Modify: `src/app/immobilien/page.tsx`
- Create: `src/components/immobilien/ImmobilienCard.tsx`
- Create: `src/components/immobilien/StatusBadge.tsx`
- Create: `src/components/sections/ImmobilienGrid.tsx`

- [ ] **Step 1: StatusBadge.tsx**

Switch über Status-Wert. Farben:
- diskret → `bg-primary text-on-primary`
- verfuegbar → `bg-surface-ivory border border-border-taupe text-primary`
- auf-anfrage → `bg-zartrosa text-primary`
- verkauft → `bg-muted-text text-on-primary`

- [ ] **Step 2: ImmobilienCard.tsx**

Card mit Bild-Slot (aspect-[4/5]), Status-Badge oben links, Titel, Ort-Zeile mit IconMapPin, Meta-Zeile (Preis + Fläche) mit Trenner. Link auf `/immobilien/[slug]`.

- [ ] **Step 3: ImmobilienGrid.tsx**

3-Spalten-Grid. Map über immobilien-Array. Optional Filter-Bar darüber.

- [ ] **Step 4: immobilien/page.tsx**

```tsx
import { Hero } from "@/components/sections/Hero";
import { ImmobilienGrid } from "@/components/sections/ImmobilienGrid";
import { immobilien } from "@/content/immobilien";

export const metadata = {
  title: "Immobilien | V.I.B.",
  description: "Aktuelle und diskret vermittelte Immobilien im Rhein-Neckar-Raum.",
};

export default function ImmobilienPage() {
  return (
    <>
      <Hero
        headline="Exklusive Immobilien im Rhein-Neckar-Raum"
        subline="Viele unserer exklusivsten Immobilien vermitteln wir im Off-Market-Bereich — absolut diskret und zielgerichtet, fernab der üblichen Portale, um die Privatsphäre unserer Mandanten zu wahren."
      />
      <ImmobilienGrid items={immobilien} />
    </>
  );
}
```

- [ ] **Step 5: Build + Commit**

```bash
cd ~/Arbeit/Kunden/vib/website && npm run build
cd ~/Arbeit/Kunden/vib
git add website
git commit -m "feat(immobilien): listing page with cards"
```

## Task 2.9: Immobilien Detail Page

**Files:**
- Modify: `src/app/immobilien/[slug]/page.tsx`
- Create: `src/components/immobilien/ExposeHero.tsx`
- Create: `src/components/immobilien/ExposeDataBlock.tsx`
- Create: `src/components/immobilien/ExposeAusstattungList.tsx`

- [ ] **Step 1: Detail-Komponenten**

`ExposeHero`: Bild full-width + Title + Status + 4-Kern-Daten Strip.
`ExposeDataBlock`: 2-Spalten-Grid mit Label + Wert für alle Eigenschaften.
`ExposeAusstattungList`: Icon-Grid (Garage, Garten, Kamin, etc.) wenn vorhanden.

- [ ] **Step 2: Detail-Page**

Findet `immobilie` aus Content-Array per slug-Lookup, returned `notFound()` wenn nicht da. Komponiert alle Detail-Komponenten + zurück-Link + Kontakt-CTA.

```tsx
import { notFound } from "next/navigation";
import { immobilien } from "@/content/immobilien";
import { ExposeHero } from "@/components/immobilien/ExposeHero";
// ... etc

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return immobilien.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const i = immobilien.find((x) => x.slug === slug);
  if (!i) return { title: "Immobilie nicht gefunden" };
  return { title: `${i.titel} | V.I.B.`, description: i.beschreibung[0]?.slice(0, 160) };
}

export default async function ExposePage({ params }: { params: Params }) {
  const { slug } = await params;
  const i = immobilien.find((x) => x.slug === slug);
  if (!i) notFound();
  return (
    <article className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
      <ExposeHero immobilie={i} />
      {/* ... */}
    </article>
  );
}
```

- [ ] **Step 3: Build + Commit**

```bash
cd ~/Arbeit/Kunden/vib/website && npm run build
cd ~/Arbeit/Kunden/vib
git add website
git commit -m "feat(immobilien): expose detail page with hero, data block, ausstattung"
```

## Task 2.10: Immobiliensuche Page mit SuchprofilForm

**Files:**
- Modify: `src/app/immobiliensuche/page.tsx`
- Create: `src/components/forms/SuchprofilForm.tsx`

- [ ] **Step 1: SuchprofilForm.tsx**

Folgt **exakt 08-formular-immobiliensuche.md** Spec. Felder:
1. Kauf/Miete Radio
2. Art der Immobilie Select
3. Wunschorte Textarea
4. Wohnfläche ca. m² Input
5. Grundstücksgröße ca. m² Input
6. Limitpreis € Input
7. Ausstattung Checkboxen (Balkon, Garten, Garage, Einbauküche, Keller)
8. Weitere Wünsche Textarea
9. Lage Checkbox (nur „Ruhige Wohngegend bevorzugt")
10. Name, Email, Telefon
11. DSGVO Checkbox
12. Submit

Client Component. State per useState. On Submit: fetch POST `/api/immobiliensuche`. Success → Inline-Confirm: „Danke. Ich melde mich persönlich bei Ihnen — meist innerhalb von 24 Stunden, am Wochenende auch früher."

Honeypot-Feld `website` versteckt (`hidden` + Off-Screen).

- [ ] **Step 2: immobiliensuche/page.tsx**

2-Spalten-Layout. Links Info-Card („Warum ein Suchprofil?" + Bullet-Liste der Vorteile + Bild-Slot). Rechts SuchprofilForm.

- [ ] **Step 3: Build + Form-Smoke-Test**

```bash
cd ~/Arbeit/Kunden/vib/website && npm run build && timeout 6 npm run dev &
sleep 4
curl -s -X POST http://localhost:3000/api/immobiliensuche \
  -H "Content-Type: application/json" \
  -d '{"absicht":"kauf","art":"villa","orte":"Weinheim","name":"Test","email":"test@test.de","telefon":"+49123","dsgvo":true}' \
  | head -100
```

Expected: `{"ok":true}` mit Console-Log der Mail (weil kein RESEND_API_KEY).

- [ ] **Step 4: Commit**

```bash
cd ~/Arbeit/Kunden/vib
git add website
git commit -m "feat(immobiliensuche): page with form following spec 08"
```

## Task 2.11: Kontakt Page mit ContactForm

**Files:**
- Modify: `src/app/kontakt/page.tsx`
- Create: `src/components/forms/ContactForm.tsx`

- [ ] **Step 1: ContactForm.tsx**

Felder: Name, Email, Telefon (optional), Nachricht (Textarea), DSGVO-Checkbox, Submit. Honeypot. POST `/api/kontakt`. Inline-Confirm bei Success.

- [ ] **Step 2: kontakt/page.tsx**

Hero + 2-Spalten (links Direktkontakt + Karte-Placeholder, rechts ContactForm) + Wochenend-Hinweis.

- [ ] **Step 3: Build + Commit**

```bash
cd ~/Arbeit/Kunden/vib/website && npm run build
cd ~/Arbeit/Kunden/vib
git add website
git commit -m "feat(kontakt): kontakt page with contact form"
```

## Task 2.12: Impressum + Datenschutz

**Files:**
- Modify: `src/app/impressum/page.tsx`
- Modify: `src/app/datenschutz/page.tsx`

- [ ] **Step 1: Impressum**

Render statisch aus `impressum.ts` Content. Klare Sektions-Hierarchie: Anbieter, Kontakt, Steuerliche Angaben, Aufsichtsbehörde, Berufshaftpflicht, EU-Streitschlichtung, Verbraucherschlichtung, Haftungsausschluss.

Wo `TODO_VON_EDITH` steht: dezent gelb hinterlegt mit Notiz-Marker.

- [ ] **Step 2: Datenschutz**

Standard-Sektionen aus deutschem DSGVO-Template:
1. Verantwortlicher
2. Erhebung allgemeiner Informationen (Server-Logs)
3. Kontaktformular / Suchprofil-Formular (Speicherung der Eingaben, Zweckbindung, Speicherdauer)
4. Cookies (keine Tracking-Cookies, ggf. funktionale Cookies)
5. Resend Auftragsverarbeitung (wenn aktiv)
6. Hosting (Vercel — wenn deployed)
7. Schriftarten (next/font selbst gehostet, kein Google-Fonts-CDN)
8. Betroffenenrechte

Komplett selbst gehostete Fonts → kein Drittland-Transfer für Schriften.

Disclaimer am Ende: „Diese Datenschutzerklärung wurde vor Live-Schaltung durch einen Anwalt geprüft."

- [ ] **Step 3: Build + Commit**

```bash
cd ~/Arbeit/Kunden/vib/website && npm run build
cd ~/Arbeit/Kunden/vib
git add website
git commit -m "feat(rechtliches): impressum + datenschutz pages"
```

## Task 2.13: Schema.org RealEstateAgent JSON-LD

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/lib/seo.ts`

- [ ] **Step 1: seo.ts**

```ts
export const realEstateAgentSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "V.I.B. Voß Immobilien Beratung",
  description:
    "Verkaufen aus Leidenschaft — Edith Voss begleitet seit fast 30 Jahren Eigentümer im Rhein-Neckar-Raum beim Verkauf besonderer Immobilien.",
  url: "https://e-vib.de",
  telephone: "+491733601936",
  email: "info@e-vib.de",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Alte Schulstraße 28",
    postalCode: "68549",
    addressLocality: "Ilvesheim",
    addressCountry: "DE",
  },
  areaServed: ["Rhein-Neckar", "Weinheim", "Mannheim", "Heidelberg", "Karlsruhe", "Bergstraße"],
  founder: { "@type": "Person", name: "Edith Voß" },
} as const;
```

- [ ] **Step 2: layout.tsx — Schema einbetten**

Im `<body>`:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgentSchema) }}
/>
```

- [ ] **Step 3: Build + Schema-Sicht**

```bash
cd ~/Arbeit/Kunden/vib/website && npm run build && timeout 6 npm run dev &
sleep 4 && curl -s http://localhost:3000 | grep -o "RealEstateAgent"
```

Expected: Treffer.

- [ ] **Step 4: Commit**

```bash
cd ~/Arbeit/Kunden/vib
git add website
git commit -m "feat(seo): add RealEstateAgent schema JSON-LD"
```

## Task 2.14: Mobile Responsive Audit

**Files:**
- Touch: Section-Komponenten anpassen wo nötig

- [ ] **Step 1: Manueller Browser-Check**

```bash
cd ~/Arbeit/Kunden/vib/website && npm run dev &
```

Browser auf `http://localhost:3000`, DevTools öffnen, durchschalten:
- 375px (iPhone SE)
- 414px (iPhone Pro)
- 768px (iPad)
- 1280px (Desktop)

Pro Breakpoint alle 9 Routes durchklicken. Probleme notieren:
- Hero-Texte überlappen
- USP-Kacheln verlieren Hover
- Footer staucht
- Header Menu-Trigger
- Formulare zu schmal/breit

- [ ] **Step 2: Fixes anwenden**

Pro identifiziertem Problem ein gezielter Fix im jeweiligen Section-File. Standard-Patterns:
- Hero: `flex-col md:flex-row`
- Grids: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Padding: `px-margin-mobile md:px-margin-desktop`
- Section-Gap: `py-section-gap-mobile md:py-section-gap`

- [ ] **Step 3: Re-Check + Commit**

```bash
cd ~/Arbeit/Kunden/vib/website && npm run build
cd ~/Arbeit/Kunden/vib
git add website
git commit -m "fix(responsive): mobile/tablet polish across all sections"
```

---

# WELLE 3 — Assets & Quality (Agent: visual-enrich)

## Task 3.1: Logo aus PSD extrahieren

**Files:**
- Create: `~/Arbeit/Kunden/vib/brand/logo.svg`
- Create: `~/Arbeit/Kunden/vib/brand/logo-mark.svg`
- Create: `~/Arbeit/Kunden/vib/website/public/logo.svg`
- Create: `~/Arbeit/Kunden/vib/website/public/logo-mark.svg`

- [ ] **Step 1: PSD via ImageMagick als hochauflösendes PNG exportieren**

```bash
cd /tmp
brew list imagemagick &>/dev/null || brew install imagemagick
magick "/Users/lukaslavicka/Downloads/Website - Vorbereitende Unterlagen/Logo/Hintergrundbild mit Schriftzug V.I.B immobilien beratung.psd[0]" -resize 2000x logo-source.png
ls -la logo-source.png
```

Expected: PNG mit ~2000px Breite extrahiert.

- [ ] **Step 2: Logo als SVG manuell konstruieren**

Da Vektorisierung der PSD-Schrift häufig schlechte Pfade liefert, bauen wir das Logo als SVG mit Webfonts/Pfad-Outlines manuell. Output liegt unter `~/Arbeit/Kunden/vib/brand/logo.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 540" role="img" aria-label="V.I.B. Immobilien Beratung — Edith Voss">
  <rect width="400" height="540" fill="#F4D4C6"/>
  <text x="200" y="240" font-family="'Playfair Display', serif" font-size="180" font-weight="700" text-anchor="middle" fill="#1A1A1A">V.I.B.</text>
  <text x="200" y="320" font-family="'Manrope', sans-serif" font-size="32" font-weight="500" letter-spacing="6" text-anchor="middle" fill="#1A1A1A">IMMOBILIEN</text>
  <text x="200" y="365" font-family="'Manrope', sans-serif" font-size="32" font-weight="500" letter-spacing="6" text-anchor="middle" fill="#1A1A1A">BERATUNG</text>
  <text x="200" y="450" font-family="'Playfair Display', serif" font-style="italic" font-size="36" text-anchor="middle" fill="#1A1A1A">Edith Voss</text>
</svg>
```

`logo-mark.svg` (nur V.I.B. ohne Hintergrund, für Header):

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 80" role="img" aria-label="V.I.B.">
  <text x="0" y="60" font-family="'Playfair Display', serif" font-size="60" font-weight="700" fill="#1A1A1A">V.I.B.</text>
</svg>
```

- [ ] **Step 3: Symlinks/Kopien nach public/**

```bash
cp ~/Arbeit/Kunden/vib/brand/logo.svg ~/Arbeit/Kunden/vib/website/public/
cp ~/Arbeit/Kunden/vib/brand/logo-mark.svg ~/Arbeit/Kunden/vib/website/public/
```

- [ ] **Step 4: Header verwendet Logo-SVG statt Text**

Modify `src/components/layout/Header.tsx` — replace `V.I.B.` Text-Link mit:

```tsx
<Link href="/" className="block">
  <Image src="/logo-mark.svg" alt="V.I.B. Voß Immobilien Beratung" width={120} height={40} priority />
</Link>
```

- [ ] **Step 5: Build + Commit**

```bash
cd ~/Arbeit/Kunden/vib/website && npm run build
cd ~/Arbeit/Kunden/vib
git add brand website
git commit -m "feat(brand): add SVG logos and use logo-mark in header"
```

## Task 3.2: Porträt optimieren

**Files:**
- Create: `~/Arbeit/Kunden/vib/website/public/images/portraet-edith-{400,800,1200}.{avif,webp,jpg}`

- [ ] **Step 1: Source-Porträt nach brand/ kopieren**

```bash
cp "/Users/lukaslavicka/Downloads/Website - Vorbereitende Unterlagen/Porträt 2.jpg" ~/Arbeit/Kunden/vib/brand/portraet-edith.jpg
```

- [ ] **Step 2: sharp installieren und Image-Pipeline schreiben**

```bash
cd ~/Arbeit/Kunden/vib/website && npm install --save-dev sharp tsx
```

Create `~/Arbeit/Kunden/vib/website/scripts/process-portrait.ts`:

```ts
import sharp from "sharp";
import path from "path";
import fs from "fs";

const src = path.resolve(__dirname, "../../brand/portraet-edith.jpg");
const outDir = path.resolve(__dirname, "../public/images");
fs.mkdirSync(outDir, { recursive: true });

const sizes = [400, 800, 1200];
const formats = ["avif", "webp", "jpeg"] as const;

(async () => {
  for (const size of sizes) {
    for (const fmt of formats) {
      const ext = fmt === "jpeg" ? "jpg" : fmt;
      const out = path.join(outDir, `portraet-edith-${size}.${ext}`);
      let pipeline = sharp(src).resize(size, null, { withoutEnlargement: true });
      if (fmt === "avif") pipeline = pipeline.avif({ quality: 60 });
      else if (fmt === "webp") pipeline = pipeline.webp({ quality: 75 });
      else pipeline = pipeline.jpeg({ quality: 82, progressive: true });
      await pipeline.toFile(out);
      console.log("→", out);
    }
  }
})();
```

- [ ] **Step 3: Pipeline ausführen**

```bash
cd ~/Arbeit/Kunden/vib/website && npx tsx scripts/process-portrait.ts
ls public/images/portraet-*
```

Expected: 9 Files (3 Sizes × 3 Formats).

- [ ] **Step 4: Hero auf Home + ueber-mich nutzt Porträt**

Update Hero-Komponente: nimmt `image` prop, rendert via Next.js `<Image>` mit `srcSet` für 3 Formate.

Tatsächlich einfacher: Verwende Next.js `<Image>` direkt mit `src="/images/portraet-edith-1200.jpg"` — Next.js Image generiert eigene optimierte Versionen.

```tsx
<Image
  src="/images/portraet-edith-1200.jpg"
  alt="Edith Voss, Inhaberin V.I.B. Voß Immobilien Beratung"
  width={800}
  height={1067}
  className="w-full h-full object-cover rounded"
  priority
/>
```

- [ ] **Step 5: Commit**

```bash
cd ~/Arbeit/Kunden/vib
git add website
git commit -m "feat(images): add optimized portraet of Edith in 3 sizes × 3 formats"
```

## Task 3.3: Pexels-Bilder fetchen

**Files:**
- Create: `~/Arbeit/Kunden/vib/website/scripts/fetch-pexels.ts`
- Create: 8-10 Image-Files in `public/images/`

- [ ] **Step 1: Pexels API Key**

Check ob `PEXELS_API_KEY` in `~/.zshrc` oder `~/.env` ist. Wenn nicht: bei https://www.pexels.com/api/ kostenlos holen, in `.env.local` setzen.

- [ ] **Step 2: fetch-pexels.ts schreiben**

```ts
import fs from "fs";
import path from "path";
import https from "https";

const KEY = process.env.PEXELS_API_KEY;
if (!KEY) throw new Error("PEXELS_API_KEY missing — add to .env.local");

const QUERIES: { name: string; query: string; orientation: "landscape" | "portrait" }[] = [
  { name: "hero-interior", query: "luxury minimalist living room natural light", orientation: "landscape" },
  { name: "ueber-mich-architecture", query: "elegant architecture detail neutral interior", orientation: "portrait" },
  { name: "region-bergstrasse", query: "southern germany vineyard rolling hills", orientation: "landscape" },
  { name: "home-staging-mood", query: "minimalist home staging dining room", orientation: "landscape" },
  { name: "immobiliensuche-decor", query: "luxury interior elegant ivory neutral", orientation: "portrait" },
  { name: "object-mock-1", query: "villa exterior modern facade", orientation: "landscape" },
  { name: "object-mock-2", query: "penthouse interior premium living", orientation: "landscape" },
  { name: "object-mock-3", query: "heritage house facade germany", orientation: "landscape" },
];

const outDir = path.resolve(__dirname, "../public/images");
fs.mkdirSync(outDir, { recursive: true });

async function fetchOne(name: string, query: string, orientation: string) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=${orientation}&per_page=1`;
  const res = await fetch(url, { headers: { Authorization: KEY! } });
  const data = await res.json();
  const photo = data.photos?.[0];
  if (!photo) {
    console.warn(`no result for ${name}`);
    return;
  }
  const imageUrl = photo.src.large2x ?? photo.src.large;
  await new Promise<void>((resolve, reject) => {
    https.get(imageUrl, (resp) => {
      const file = fs.createWriteStream(path.join(outDir, `${name}-source.jpg`));
      resp.pipe(file);
      file.on("finish", () => file.close(() => resolve()));
    }).on("error", reject);
  });
  const credit = `${photo.photographer} (Pexels)`;
  fs.appendFileSync(path.join(outDir, "_credits.txt"), `${name}: ${credit} — ${photo.url}\n`);
  console.log(`✓ ${name} from ${credit}`);
}

(async () => {
  for (const q of QUERIES) await fetchOne(q.name, q.query, q.orientation);
})();
```

- [ ] **Step 3: Pexels-Fetch ausführen**

```bash
cd ~/Arbeit/Kunden/vib/website && npx tsx scripts/fetch-pexels.ts
ls public/images/*-source.jpg
cat public/images/_credits.txt
```

- [ ] **Step 4: Pexels-Bilder optimieren**

Analog zu portrait: ein Script `optimize-pexels.ts`, das alle `*-source.jpg` in 3 Größen × 3 Formate konvertiert. Quellen löschen nach erfolgreicher Konvertierung.

- [ ] **Step 5: Commit**

```bash
cd ~/Arbeit/Kunden/vib
git add website
git commit -m "feat(images): fetch and optimize Pexels images for hero, region, home staging, mocks"
```

## Task 3.4: Bilder in Sections einbauen

**Files:**
- Modify: `Hero.tsx`, `HomeStagingSpotlight.tsx`, `RegionBlock.tsx`, `ueber-mich/page.tsx`, `ImmobilienCard.tsx`, `immobiliensuche/page.tsx`

- [ ] **Step 1: Hero — Home nutzt hero-interior**

`src/app/page.tsx` ergänzt Hero-Aufruf mit `image={{ src: "/images/hero-interior-1200.jpg", alt: "Elegantes lichtdurchflutetes Wohnzimmer im Rhein-Neckar-Raum" }}`.

Über-mich Hero nutzt Porträt.

- [ ] **Step 2: HomeStagingSpotlight**

Großes Bild rechts, Text links.

- [ ] **Step 3: RegionBlock**

Hintergrundbild oder Inset-Image der Bergstraße.

- [ ] **Step 4: ImmobilienCard**

Pro Demo-Immobilie ein `imageSlot` Property das auf den Pexels-Slot mapped (`object-mock-1` etc.).

- [ ] **Step 5: Immobiliensuche-Seite**

Decor-Bild in der linken Spalte.

- [ ] **Step 6: Build + Commit**

```bash
cd ~/Arbeit/Kunden/vib/website && npm run build
cd ~/Arbeit/Kunden/vib
git add website
git commit -m "feat(images): wire optimized images into sections and pages"
```

## Task 3.5: Favicons + OG-Image

**Files:**
- Create: `website/public/favicon.ico`, `favicon-192.png`, `favicon-512.png`
- Create: `website/public/og-image.jpg`

- [ ] **Step 1: Favicons aus logo-mark generieren**

```ts
// scripts/generate-favicons.ts
import sharp from "sharp";
const src = "../../brand/logo-mark.svg";
// 192, 512 als PNG + 32x32 + 16x16 → ico
// (oder via npx png-to-ico)
```

- [ ] **Step 2: OG-Image generieren**

Sharp-Composite: Hintergrund zartrosa, Logo links, Porträt rechts, Claim "Verkaufen aus Leidenschaft." — 1200x630.

- [ ] **Step 3: layout.tsx Metadata erweitern**

```ts
icons: { icon: "/favicon.ico", apple: "/favicon-192.png" },
openGraph: { ..., images: ["/og-image.jpg"] },
```

- [ ] **Step 4: Commit**

```bash
cd ~/Arbeit/Kunden/vib
git add website
git commit -m "feat(assets): favicons and og-image"
```

## Task 3.6: Alt-Texte review

**Files:**
- Modify: alle Stellen mit `<Image>` oder `<img>`

- [ ] **Step 1: Suche nach allen Bild-Stellen**

```bash
cd ~/Arbeit/Kunden/vib/website && grep -rn 'alt=' src/ | head -40
```

- [ ] **Step 2: Jede Alt-Text sinnvoll machen**

Keine generischen Alt-Texte wie „Bild" oder „Photo". Stattdessen Beschreibung des Inhalts oder seiner Funktion. Beispiele:
- Hero Home: „Elegantes, lichtdurchflutetes Wohnzimmer im Premium-Segment — symbolisches Bild für die Immobilien, die Edith Voss vermittelt"
- Porträt: „Edith Voss, Inhaberin V.I.B. Voß Immobilien Beratung"
- Region: „Sanfte Weinhügellandschaft der Bergstraße"
- Object Mocks: „Demonstrationsbild — keine konkrete Immobilie"

- [ ] **Step 3: Commit**

```bash
cd ~/Arbeit/Kunden/vib
git add website
git commit -m "chore(a11y): meaningful alt texts on all images"
```

---

# WELLE 4 — Quality Gates & Finalization

## Task 4.1: Build sauber

- [ ] **Step 1: Production Build**

```bash
cd ~/Arbeit/Kunden/vib/website && rm -rf .next && npm run build
```

Expected: `✓ Compiled successfully`, 0 Errors. Routes-Liste zeigt alle 9 statischen + 2 dynamische Routes.

- [ ] **Step 2: Bundle-Size-Check**

Total First Load JS pro Route < 200kB ideal. Falls drüber: lazy-load framer-motion, check Imports.

## Task 4.2: Lint sauber

- [ ] **Step 1: Lint laufen lassen**

```bash
cd ~/Arbeit/Kunden/vib/website && npm run lint
```

Expected: 0 Errors. Warnings dokumentieren.

- [ ] **Step 2: TypeScript strict-Check**

```bash
npx tsc --noEmit
```

Expected: 0 Errors.

## Task 4.3: Routes Smoke Test

```bash
cd ~/Arbeit/Kunden/vib/website && npm run start &
sleep 4
for route in / /ueber-mich /leistungen /immobilien /immobilien/stadtvilla-bergstrasse-diskret /immobiliensuche /kontakt /impressum /datenschutz; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000${route}")
  echo "$code $route"
done
```

Expected: Alle 200.

## Task 4.4: Responsive Verification

- [ ] **Step 1: Headless Chrome Screenshots in 4 Breakpoints**

Wenn Playwright verfügbar: `npx playwright` Setup. Sonst manuell mit Chrome DevTools.

Pro Route × Pro Breakpoint Screenshot prüfen.

- [ ] **Step 2: Probleme fixen**

## Task 4.5: Lighthouse

- [ ] **Step 1: Lighthouse CI auf Home + Über-mich + Immobiliensuche**

```bash
cd ~/Arbeit/Kunden/vib/website && npm run start &
sleep 4
npx lighthouse http://localhost:3000 --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=/tmp/lh-home.json --chrome-flags="--headless" --quiet
cat /tmp/lh-home.json | jq '.categories | to_entries | map({key:.key, score:.value.score})'
```

Expected: Performance ≥ 0.90, Accessibility ≥ 0.95, Best Practices ≥ 0.90, SEO 1.0.

- [ ] **Step 2: Fixes für unter Schwelle**

## Task 4.6: Content Audit gegen Edith-Originale

- [ ] **Step 1: Stichproben prüfen**

Manuell die Home, Über-mich, Leistungen Seiten durchlesen und mit `briefing/04-website-texte.md` abgleichen. Suchen nach:
- „Wir-Form" wo Ich-Form hin müsste
- Erfundene Orte (Schwetzingen/Speyer waren in Stitch, nicht in Ediths Material — sollten weg sein, außer in Footer-Region-Auflistung wo geografisch ok)
- Standard-Floskeln die Edith vermeiden wollte

- [ ] **Step 2: Korrekturen ins Content-File**

Edits in `src/content/*.ts` direkt — nicht in Page-Files.

- [ ] **Step 3: Commit**

```bash
cd ~/Arbeit/Kunden/vib
git add website
git commit -m "chore(content): align all texts with Edith's original briefing"
```

## Task 4.7: README finalisieren

- [ ] **Step 1: Website README erweitern**

Mit:
- Stack-Übersicht
- Skripte-Tabelle (`dev`, `build`, `start`, `lint`, `scripts/process-portrait`, `scripts/fetch-pexels`, `scripts/optimize-pexels`)
- Env-Vars Doku
- Asset-Update-Workflow (Wie ersetze ich das Porträt, ein neues Pexels-Bild, etc.)
- Deploy-Anleitung (Vercel-Setup, env-vars setzen, Domain aufschalten)
- Liste der TODO_VON_EDITH-Markers (USt-IdNr, Aufsichtsbehörde, Berufshaftpflicht)

- [ ] **Step 2: Top-Level README mit Status-Update**

- [ ] **Step 3: Commit**

```bash
cd ~/Arbeit/Kunden/vib
git add README.md website/README.md
git commit -m "docs: finalize READMEs with full dev/build/deploy/asset workflows"
```

## Task 4.8: Letzte Verifikations-Runde

- [ ] **Step 1: Komplett-Reset & Re-Build**

```bash
cd ~/Arbeit/Kunden/vib/website && rm -rf .next node_modules
npm install
npm run build
npm run lint
```

Alle drei grün → fertig.

- [ ] **Step 2: Manueller Walkthrough**

Browser auf http://localhost:3000 öffnen, jede Page besuchen, jeden Link klicken, Formulare absenden (Mail kommt in Console weil kein RESEND_API_KEY).

- [ ] **Step 3: Final Commit + Tag**

```bash
cd ~/Arbeit/Kunden/vib
git add .
git commit --allow-empty -m "chore: v1.0 build complete — ready for review"
git tag -a v1.0-pre-deploy -m "V.I.B. Website V1 — Build complete, awaiting Edith approval + deploy"
```

---

# Self-Review (Spec Coverage)

| Spec Section | Implementiert in Task(s) |
|--------------|-------------------------|
| 1. Ziel | gesamtes Welle 1-4 |
| 2. Scope In | Welle 1-3 |
| 2. Scope Out | nicht implementiert (Vercel, Coming-Soon, Tippgeber, Blog, CMS, Tests, echte Listings) — wie spezifiziert |
| 3. Stack | Task 1.1, 1.4, 1.6, 2.2 (framer-motion) |
| 4. Projekt-Struktur | Task 1.1-1.10 (Skelette) + Welle 2/3 (Inhalt) |
| 5. Design Tokens | Task 1.3, 1.5 |
| 6. Pages — Sections-Mapping | Task 2.5-2.12 |
| 7. Komponenten-Inventar | Task 1.6, 1.7, 2.2-2.4 |
| 8. Multi-Agent Pipeline | Welle 1 = nextjs-developer, Welle 2 = ui-ux-pro-max, Welle 3 = visual-enrich (in subagent-driven-execution adressiert) |
| 9. Asset-Strategie | Task 3.1-3.5 |
| 10. Quality Gates | Task 4.1-4.8 |
| 11. Out-of-Scope | klar nicht implementiert |
| 12. Risiken | Mitigationen in jeweiligen Tasks (PSD-Fallback in 3.1, Pexels-Generic in 3.3, Mobile in 2.14, Resend-Console in 1.9) |
| 13. Deliverable | nach Task 4.8 erreicht |
| 14. Plan-Schritte | dieses Dokument |

**Placeholder-Scan:** Kein „TBD", „TODO", „later". Einzige bewusste Marker: `TODO_VON_EDITH` in `impressum.ts` (Spec Section 12 sagt: deutlich markiert für späteres Ergänzen).

**Type-Konsistenz:** `Immobilie.status` ist im `immobilien.ts` Definition + StatusBadge + ExposeHero gleich getypt (Union `"diskret" | "verfuegbar" | "auf-anfrage" | "verkauft"`). Hero-Props (eyebrow, headline, subline, image, primaryCta, secondaryCta, trustStrip) konsistent über Home, Über-mich, Leistungen, Immobilien, Immobiliensuche.

**Scope-Check:** Single Implementation Plan ist tauglich. Multi-Agent-Wellen sind interne Strukturierung, kein Sub-Projekt-Bedarf.

---

# Execution Handoff

Plan komplett unter `~/Arbeit/Kunden/vib/docs/superpowers/plans/2026-05-21-vib-website-implementation-plan.md`.

**Zwei Execution-Optionen:**

1. **Subagent-Driven (empfohlen)** — pro Task ein frischer Subagent, Review zwischen Tasks, schnelle Iteration, hält Hauptkontext schlank. Passt zum „Multi-Agent Pipeline"-Approach, den du gewählt hast (Welle 1 → `nextjs-developer`, Welle 2 → `ui-ux-pro-max`, Welle 3 → `visual-enrich`, Welle 4 → ich selbst).

2. **Inline-Execution** — alle Tasks in dieser Session mit Checkpoints nach jeder Welle. Mehr Kontext-Druck, aber simpler.

Welche Variante?
