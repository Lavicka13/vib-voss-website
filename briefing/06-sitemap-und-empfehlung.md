# Sitemap-Vorschlag & Designkonzept-Template

## Vorgeschlagene Sitemap

Basierend auf dem Material — modular, kann erweitert / gekürzt werden.

```
/                              Home / Landing (alle Kern-Botschaften, alle CTAs)
/ueber-mich                    Edith Voss — Person, Historie, Werte
/leistungen                    Was ich tue (Verkauf, Bewertung, Home Staging, Begleitung)
/immobilien                    Aktuelle Objekte (initial leer / „auf Anfrage")
   └─ /immobilien/[slug]       Einzelobjekt-Seite (Exposé-Style à la DORN)
/immobiliensuche               Suchprofil-Formular (schlank, wie in 05- empfohlen)
/tippgeber                     Tippgeber-Modell (optional, Edith überlegt es noch)
/kontakt                       Kontaktformular + Daten + Karte
/impressum                     Pflicht (mit Daten aus 01-)
/datenschutz                   Pflicht (DSGVO-konform)
```

### Optionale Erweiterungen für später (V2)
- `/blog` oder `/marktbericht` — Edith könnte zu Rhein-Neckar-Marktlage schreiben (SEO-Hebel)
- `/referenzen` — sobald Google Bewertungen oder Kundenzitate gesammelt sind
- `/home-staging` — eigene Seite, wenn das ein eigenständiger Service-Schwerpunkt wird

## Empfohlener Seitenaufbau Home

```
1. HERO
   - Großes Porträt-Bild (Porträt 2 empfohlen, weil kein Copyright-Wasserzeichen)
   - Headline: „Verkaufen aus Leidenschaft." (oder Alternative aus 04-)
   - Subline: regional + Erfahrung
   - Zwei CTAs: „Immobilie verkaufen" + „Diskret nach Immobilie suchen"

2. INTRO / EDITH-STATEMENT (Block A aus 04-)
   - 2-3 Absätze, persönlich, in Ich-Form

3. DREI USP-KACHELN
   - Gespür · Netzwerk · Persönlichkeit
   - kurze 2-Zeilen-Beschreibung, dezente Icons

4. „REGIONAL VERWURZELT" (Block D aus 04-)
   - mit kleiner Karte oder Region-Aufzählung
   - Trust: Erfahrungsjahre prominent

5. OFF-MARKET / NETZWERK (Block C aus 04-)
   - hier Edith's stärkstes Asset zeigen
   - Mit Zitat: „Einige meiner Kunden haben die Käufer erst anlässlich des Notartermins kennengelernt."

6. LEISTUNGEN (kurze Liste mit Verweis auf /leistungen)
   - Wertberatung · Vermarktung · Unterlagen · Verhandlung · Begleitung bis Notar · Home Staging

7. HOME STAGING TEASER
   - Lifestyle-Bild + Claim „weil Ihre Immobilie es wert ist"

8. „ÜBER MICH"-TEASER
   - Porträt + 2 Sätze + Link zu /ueber-mich

9. KUNDENSTIMMEN
   - Falls Google-Bewertungen vorhanden: Widget einbinden
   - Falls nicht: Edith um 2-3 Zitate bitten (anonym ok), Format wie Anja Wolff

10. CALL-TO-ACTION
    - „Lassen Sie uns gemeinsam den besten Weg für Ihre Immobilie finden."
    - Kontaktformular oder Telefon-CTA

11. FOOTER
    - V.I.B. Logo (klein)
    - Adresse, Tel, Mail
    - Quicklinks: Impressum · Datenschutz · Kontakt
    - „Man lebt nur einmal — wir zeigen Ihnen wo."
```

## Designkonzept-Template (für deine Übergabe an mich)

> Dieser Block ist absichtlich leer / als Skelett — du füllst ihn aus, bevor wir bauen.
> Was unten in Kursiv steht, sind **meine Vorschläge** basierend auf Material.

### Farbpalette

| Rolle | Wert | Notiz |
|-------|------|-------|
| Primary (Text/Logo) | `#1A1A1A` | *Aus Logo abgeleitet — final: aus PSD ziehen* |
| Accent (Hintergründe, Akzent-Flächen) | `#F4D4C6` | *Zartrosa Logo-Hintergrund* |
| Background | `#FFFFFF` | |
| Body Text | `#2B2B2B` | |
| Subtle Text | `#6B6B6B` | |
| Border / Trenner | `#E6D9D2` | |
| Optional zweiter Akzent | `?` | *Vielleicht ein gedämpftes Bordeaux/Burgundy als Premium-Kontrast?* |

### Typografie

| Rolle | Vorschlag | Begründung |
|-------|-----------|-----------|
| Display (Hero/H1) | Didone-Serif (z.B. **Playfair Display**, **Cormorant**, **DM Serif Display**) | Passt zum Logo-Stil |
| Headline (H2/H3) | Gleiche Serif, kleinere Größe oder gleich | |
| Body | Saubere Sans (z.B. **Inter**, **Manrope**, **Spectral** für Variante) | |
| Akzent / Brand | **Edith Voss** in Kursiv-Serif wie auf Briefbogen | |

### Bildstil

- **Helle, lichtdurchflutete Innenraum-Fotos** (wie DORN-Exposés)
- **Premium-Lifestyle-Eindruck** ohne Kitsch
- **Porträt mit Wärme** (Porträt 2 ist freundlich und gut beleuchtet)
- Keine Stock-Fotos mit „glücklichen Familien vor Reihenhaus"

### Mood / Inspiration

- Mark Fiedler (visuell): aufgeräumt, hell, klassisch-modern
- Anja Wolff (textlich): warm, emotional, persönlich
- DORN (strukturell): saubere Daten-Darstellung bei Objekten

### Technische Empfehlung

- **Stack:** Next.js 16 + Tailwind + Vercel (wie bei deinen anderen Projekten)
- **Responsive:** Mobile First, gerade weil die Premium-Zielgruppe oft auf dem Handy schaut
- **Performance:** Bilder als WebP/AVIF, lazy loading
- **SEO:**
  - Title: „V.I.B. Immobilien Beratung · Edith Voss · Rhein-Neckar"
  - Description: nutzt die Block-A-Subline
  - Lokale Schema.org RealEstateAgent-Auszeichnung
  - Ortsnamen (Weinheim, Mannheim, Heidelberg, Karlsruhe, Bergstraße) im Body
- **Cookie / Datenschutz:** Vollständig DSGVO-konform — kein Google Maps ohne Consent, kein Google Fonts via CDN

### Aufbau-Phase / „Coming Soon"-Frage

Edith hat im Ordner `under construct/` einen klassischen „Website im Aufbau"-GIF beigelegt. Frage an dich/sie:

- Soll die Domain `e-vib.de` jetzt **schon** mit einem Coming-Soon-Splash live gehen, während die Vollversion entsteht?
- Oder direkt mit der V1 launchen?

**Empfehlung:** Wenn Edith schon Visitenkarten / Briefbogen mit der Domain rausgibt, **kurzfristig** eine schlanke 1-Seiter-Coming-Soon mit Logo, Claim, Telefonnummer und Kontaktmail aufsetzen. Das ist eine 30-Minuten-Sache und überbrückt sauber.
