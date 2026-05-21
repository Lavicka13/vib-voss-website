# Master-Briefing für Stitch — V.I.B. Immobilien Beratung

> **Zweck dieses Dokuments:**
> Stitch (oder einem anderen UI-Generator) ein vollständiges Inhalts- und Sektions-Briefing in die Hand zu geben, damit ein konkretes Designkonzept entsteht, das danach 1:1 als Website umgesetzt werden kann.
>
> Alle Texte sind **Originale von Edith Voss** (Inhaberin). Strukturelle Inspiration: dorn-living-solutions.de — orientiert, **nicht** kopiert.

---

## 1. Projekt-Steckbrief

| Feld | Wert |
|------|------|
| **Brand** | V.I.B. Voß Immobilien Beratung |
| **Inhaberin / Gesicht der Marke** | Edith Voss (Einzelfirma, ~30 Jahre Erfahrung) |
| **Branche** | Wohnimmobilien-Vermittlung im Premium-Segment |
| **Region** | Rhein-Neckar (Weinheim, Mannheim, Heidelberg), Bergstraße, Karlsruhe, vorderer Odenwald, Rheinland-Pfalz, überregional |
| **Zielgruppe Primär** | Verkäufer hochwertiger Immobilien (Villen, MFH), 50+, Wert auf Diskretion |
| **Zielgruppe Sekundär** | Solvente Kaufinteressenten (Off-Market-Käufer) |
| **Tonalität** | Premium, persönlich (Ich-Form), klassisch-elegant, warm, niveauvoll |
| **Design-Mood** | Klassisch-modern · feminin-elegant · Premium · viel Weißraum |
| **Strukturelle Inspiration** | dorn-living-solutions.de (Sektions-Aufbau, Card-Grids, Service-Kacheln) |
| **Visuelle Inspiration** | Logo-Farbwelt (Schwarz × Zartrosa × Weiß), Mark-Fiedler-Studio-Look |
| **NICHT übernehmen von DORN** | Türkis-Akzent, ChatGPT-Hero-Bilder, Tom-Dorn-Fotostil |

---

## 2. Brand-Kern (was Edith differenziert)

Edith hat im Briefing explizit gesagt, dass sie sich **gegen** die üblichen Makler-Floskeln positionieren will:

> „Mir geht es darum, dass ich **nicht die typischen Eigenschaften aufzähle**, die die meisten Makler aufführen … z.B. Diskretion, Vertrauen, beste Wertermittlung etc., sondern mein Schwerpunkt ist:
> 1. Mein **Gespür** für beste Verkaufsmöglichkeiten
> 2. Mein weit über die Grenzen hinausgehendes **Netzwerk**
> 3. Das **professionelle Auftreten** sowie der **persönliche Umgang** mit Käufer und Verkäufer."

**Diese drei Säulen sind die Marken-DNA** und sollen in Hero, USP-Sektion und Footer sichtbar bleiben.

### Markante Sprüche/Mottos (Edith verwendet sie selbst)
- **„Verkaufen aus Leidenschaft"** — Hauptphilosophie
- **„Nichts ist so beständig wie der Wandel"** — Heraklit-Zitat, ihr Motto
- **„Man lebt nur einmal — wir zeigen Ihnen wo."** — Ediths eigener Spruch, „bestens bekannt"
- **„Die etwas andere Maklerin"** — Selbstbeschreibung
- **„Vollblutmaklerin"** — O-Ton

### Originalformulierung mit Beweis-Kraft (für Trust-Block)
> „Einige meiner Kunden haben die Käufer erst anlässlich des Notartermins kennengelernt."

---

## 3. Sitemap (Empfehlung)

```
/                       Home (Single-Page mit Anker-Sektionen, wie DORN)
/ueber-mich             Detail-Seite zu Edith — Person, Historie, Werte
/leistungen             (Anker auf Home reicht — oder eigene Seite, wenn V2 ausgebaut)
/immobilien             Listing aktueller Objekte (Cards-Grid)
   └─ /immobilien/[slug]   Einzelobjekt im Exposé-Stil (à la DORN-Detailseite)
/immobiliensuche        Suchprofil-Formular (schlank — siehe Spec in 08-)
/tippgeber              Tippgeber-System (optional, Edith überlegt es noch)
/kontakt                Kontaktformular + Karte + Anfahrt
/impressum              Pflicht
/datenschutz            Pflicht
```

### Top-Navigation (Header)
```
HOME · ÜBER MICH · LEISTUNGEN · IMMOBILIEN · IMMOBILIENSUCHE · KONTAKT
```
Tippgeber optional als kleiner Link im Footer oder Sub-Item.

---

## 4. Page-by-Page Sektions-Briefing

### 4.1 Home (Single-Page mit Ankern)

**Strukturell orientiert an DORN, aber inhaltlich V.I.B.**

#### Sektion 1 — HERO
- **Layout:** Großes Porträt von Edith links (oder als Hintergrund mit Overlay), Text rechts. Mobile: Porträt oben, Text unten.
- **Headline:** *„Verkaufen aus Leidenschaft."*
- **Subline:** *„Seit fast 30 Jahren begleite ich Eigentümer im Rhein-Neckar-Raum beim Verkauf besonderer Immobilien — persönlich, diskret und mit einem Netzwerk, das schon vor der Veröffentlichung wirkt."*
- **Primärer CTA:** „Mein Immobilien-Anliegen besprechen" → Anker `#kontakt`
- **Sekundärer CTA:** „Diskret nach Immobilien suchen" → Link `/immobiliensuche`
- **Trust-Element unter dem Hero:** Kleine Leiste mit „30 Jahre Erfahrung · Rhein-Neckar & überregional · Off-Market-Netzwerk"

#### Sektion 2 — KURZ-INTRO (Edith-O-Ton)
- **Layout:** Zentrierter Textblock, max. ~640px breit, ruhiger Whitespace darunter/darüber
- **Inhalt (Originaltext):**
  > Wer eine besondere Immobilie verkauft, sucht nicht irgendeine Maklerin – sondern eine Persönlichkeit mit Erfahrung, Feingefühl und dem richtigen Gespür für Menschen und Märkte.
  >
  > Seit fast 30 Jahren begleite ich Eigentümer beim erfolgreichen Verkauf ihrer Immobilien – diskret, professionell und mit einer Leidenschaft, die man spürt. Mein Schwerpunkt liegt nicht in leeren Versprechen oder standardisierten Verkaufsstrategien. Mein Erfolg basiert auf etwas viel Wertvollerem: einem außergewöhnlichen Netzwerk, fundierter Marktkenntnis und der Fähigkeit, Käufer und Verkäufer auf menschlicher Ebene zusammenzubringen.

#### Sektion 3 — DREI USP-KACHELN
- **Layout:** 3-Spalten-Grid (Desktop), 1-Spalte (Mobile). Jede Kachel: Icon/Linie · kurze Headline · 2-Satz-Beschreibung.
- **Inhalt:**

| # | Headline | Body |
|---|----------|------|
| 1 | **Gespür für die richtige Verkaufsmöglichkeit** | Statt Online-Schätzungen erhalten Sie eine fundierte, marktgerechte Einschätzung — basierend auf drei Jahrzehnten Erfahrung im Rhein-Neckar-Raum. |
| 2 | **Ein Netzwerk, das vor der Veröffentlichung wirkt** | Bereits vor der offiziellen Vermarktung kontaktiere ich passende Käufer aus meinem gewachsenen, solventen Kundenstamm — diskret und ohne öffentliche Listung. |
| 3 | **Niveauvolle Persönlichkeit, persönlicher Umgang** | Transparente Kommunikation, professionelles Auftreten und ein respektvoller Umgang mit allen Beteiligten — das ist mein Maßstab. |

#### Sektion 4 — AKTUELLE IMMOBILIEN
- **Layout:** Card-Grid (3-spaltig Desktop, 2-spaltig Tablet, 1-spaltig Mobile) — orientiert an DORN
- **Card-Inhalt:** Hero-Foto · Status-Badge oben („Diskret"/„Verfügbar"/„Auf Anfrage"/„Verkauft") · Titel · Ort · m² · Zimmer · Preis (oder „auf Anfrage")
- **Fallback wenn noch keine Objekte:** Block mit Text „Aktuelle Objekte werden meist vor Veröffentlichung über mein Netzwerk vermittelt. Wenn Sie suchen oder verkaufen möchten, sprechen Sie mich direkt an." + CTA

#### Sektion 5 — ERFOLGREICH VERMITTELT (Referenz-Sektion)
- **Layout:** Wie Sektion 4, aber kleinere Cards, schlichter (z.B. Schwarz-Weiß-Foto, „Verkauft"/„Vermietet"-Badge)
- **Fallback:** Falls Edith keine Erlaubnis hat, frühere Verkäufe öffentlich zu zeigen → Sektion durch Zahlen-Block ersetzen („Über 250 erfolgreich vermittelte Immobilien" o.ä. — Zahl mit Edith abklären, **nicht erfinden**)

#### Sektion 6 — LEISTUNGEN (4-6 Service-Kacheln)
- **Layout:** Kachel-Grid wie DORN-„Unsere Leistungen"
- **Inhalt (aus Ediths O-Ton):**

| # | Headline | Body |
|---|----------|------|
| 1 | Fundierte Wertberatung | Realistische, präzise Einschätzung — basierend auf Marktkenntnis und Erfahrung, nicht auf Online-Tools wie ImmoScout oder Sprengnetter. |
| 2 | Off-Market-Vermarktung | Bevor Ihre Immobilie öffentlich gezeigt wird, kontaktiere ich passende Käufer aus meinem Netzwerk. Einige meiner Kunden haben die Käufer erst beim Notartermin kennengelernt. |
| 3 | Unterlagen-Beschaffung | Ich kümmere mich um alle objektbezogenen Unterlagen — bei Bedarf direkt mit den zuständigen Ämtern. |
| 4 | Professionelles Exposé | Optimale Darstellung Ihrer Immobilie in einem stilvollen, klar strukturierten Exposé. |
| 5 | Verhandlung & Finanzierung | Ich führe alle Verhandlungen mit Kaufinteressenten und kläre die Finanzierungslage — bis zur notariellen Beurkundung. |
| 6 | Home Staging | Damit Ihre Immobilie ihr volles Potenzial entfaltet — klassisch oder digital (optional als eigene Sektion 7). |

#### Sektion 7 — HOME-STAGING-SPOTLIGHT (optional, wenn Service angeboten)
- **Layout:** Wie DORN — großes Stimmungsfoto + Body-Text + ggf. Vorher/Nachher-Slider
- **Headline:** *„Home Staging — weil Ihre Immobilie es wert ist."*
- **Body:**
  > Ein stimmungsvoll inszenierter Raum spricht nicht nur den Verstand an — sondern das Herz. Mit gezieltem Home Staging gewinnen leerstehende oder schwer verkäufliche Immobilien an Wärme, Charakter und Vorstellungskraft. Genau das hilft Interessenten, eine Verbindung aufzubauen — und steigert spürbar den Verkaufserfolg.

#### Sektion 8 — REGIONAL VERWURZELT (Region-Block)
- **Layout:** Zwei-Spalten — links Text, rechts dezente Karte/Illustration der Region
- **Headline:** *„Regional verwurzelt — überregional erfolgreich."*
- **Body (Edith-O-Ton):**
  > Seit vielen Jahren bin ich in der Rhein-Neckar-Region, Weinheim, Karlsruhe, dem Odenwald, Rheinland-Pfalz und darüber hinaus erfolgreich tätig. Mein Name steht für Qualität, Vertrauen und nachhaltige Verkaufserfolge.
- **Visualisierung:** Schlanke Karte (z.B. abstrahierte Linien) oder Liste der Hauptorte: Weinheim · Mannheim · Heidelberg · Karlsruhe · Bergstraße · Ilvesheim · vorderer Odenwald · Rheinland-Pfalz

#### Sektion 9 — ÜBER MICH (Edith-Profil-Teaser)
- **Layout:** Wie DORN-„Über uns" — Porträt links, 3-4 Werte-Kacheln rechts, oder andersherum
- **Inhalt:**

| Headline | Body |
|----------|------|
| Persönlichkeit über Standard | Ich glaube nicht an Massenabwicklung. Jede Immobilie ist eine eigene Geschichte — und jeder Verkauf eine persönliche Beziehung. |
| Drei Jahrzehnte im selben Markt | Anfang der 2000er habe ich in Weinheim mein erstes Maklerbüro aufgebaut und 2015 erfolgreich verkauft. Heute bringe ich diese Erfahrung in V.I.B. ein. |
| Fairness, Fachwissen, Verlässlichkeit | Mein Erfolgsschlüssel ist die Kombination aus Fairness, Fachwissen, fundierter persönlicher Betreuung und kompetenter Unterstützung — auf beiden Seiten der Transaktion. |
| Auch am Wochenende erreichbar | Wenn es um Ihre Immobilie geht, bin ich erreichbar — auch außerhalb der klassischen Bürozeiten. |

- **CTA unter den Kacheln:** „Mehr über mich erfahren" → `/ueber-mich`

#### Sektion 10 — KUNDENSTIMMEN / TESTIMONIALS
- **Layout:** Slider/Carousel oder 3-Zitat-Grid
- **Status:** Aktuell **noch keine** Google-Bewertungen / Zitate vorhanden — siehe offene Punkte. Sektion vorerst als optional vorbereiten.
- **Wenn vorhanden:** Format wie Anja Wolff: Sterne-Rating + „Exzellent 5,0 · X Google Bewertungen" + 2-3 ausgewählte Zitate
- **Beweis-Zitat (Edith O-Ton, kein Kundenzitat):**
  > „Ein Kunde schrieb mir nach erfolgreichem Verkauf seiner Immobilie, dass ich das Negativ-Image meines Berufsstandes eindrucksvoll widerlege."

#### Sektion 11 — KONTAKT / CTA
- **Headline:** *„Lassen Sie uns gemeinsam den besten Weg für Ihre Immobilie finden."*
- **Sub:** *„Persönlich. Diskret. Erfolgreich."*
- **Layout:** Zwei-Spalten — links Kontaktdaten + Porträt-Detail, rechts schlankes Kontaktformular
- **Kontaktformular-Felder:** Name · E-Mail · Telefon · Nachricht · DSGVO-Checkbox · Senden
- **Direkt-Kontaktdaten:**
  - Tel: +49 173 360 19 36 (klickbar)
  - Mail: info@e-vib.de (klickbar)
  - Adresse: Alte Schulstraße 28, 68549 Ilvesheim
- **Optional:** Eingebettete Karte (DSGVO-konform via Statisches OpenStreetMap-Bild oder Click-to-Load)

#### Sektion 12 — FOOTER
- **Inhalt:**
  - V.I.B.-Logo (klein)
  - Closing-Claim: *„Man lebt nur einmal — wir zeigen Ihnen wo."*
  - Kontakt-Zusammenfassung
  - Quicklinks: Impressum · Datenschutz · Kontakt · Immobiliensuche
  - Copyright-Zeile

---

### 4.2 /ueber-mich (Detail-Seite Edith)

#### Sektion 1 — Hero
- Großes Porträt + Edith-Name + Untertitel „Ihre Maklerin mit Leidenschaft im Rhein-Neckar-Raum"

#### Sektion 2 — Mein Weg (Storytelling-Block)
- 3 Absätze:
  1. **Anfang:** Wie sie zum Beruf kam, was sie antreibt
  2. **Weinheim-Ära:** „Edith Voss Immobilien" (Anfang 2000er bis 2015) — Aufbau und Verkauf
  3. **Heute:** V.I.B. — wie sie jetzt arbeitet, was sich verändert hat, was bleibt
- **Wichtiger O-Ton einbauen:**
  > Mein Anfang der 2000er Jahre gegründetes Unternehmen Edith Voss Immobilien in Weinheim habe ich mit viel Fleiß und Freude am Makeln zu einem der etabliertesten Maklerbüros aufgebaut und 2015 verkauft — mein Name ist noch heute das Aushängeschild der Firma.

#### Sektion 3 — Meine Philosophie
- Vollzitat:
  > „Verkaufen aus Leidenschaft. Mein Motto: Nichts ist so beständig wie der Wandel. (Nach einem Zitat von Heraklit von Ephesus, 535–475 v. Chr.) — Dieser Anspruch passt exakt auf meine Arbeit."

#### Sektion 4 — Werte
- 4-Kachel-Grid: Fairness · Fachwissen · Persönliche Betreuung · Verlässlichkeit

#### Sektion 5 — Pressestimmen (optional)
- Falls Edith den Weinheimer-Nachrichten-Artikel von 2020 zeigen darf → eingebunden als Foto-Galerie oder Zitat-Kachel

#### Sektion 6 — CTA
- „Lernen Sie mich persönlich kennen — auch am Wochenende." → Kontakt-Anker

---

### 4.3 /immobilien (Listing)

- Card-Grid wie auf Home, aber alle aktuellen Objekte
- Filter (optional V2): Region, Art, Preisrahmen
- Bei leerem Listing: Hinweis-Block mit Off-Market-Erklärung + CTA zur Immobiliensuche

### 4.4 /immobilien/[slug] (Detail / Exposé)

Aufbau orientiert an DORN-Exposés (siehe `Objekte/*.pdf`):

1. Großes Hero-Foto
2. Titel + Untertitel + Status-Badge
3. **Vier Kern-Daten** unter dem Foto: Preis · Zimmer · Schlafzimmer · Wohnfläche
4. Fotogalerie (Karussell oder Grid)
5. **Beschreibung** (langer Body-Text, 2-3 Absätze)
6. **Datenblock** (zwei Spalten):
   - Ort, Wohnfläche, Nutzfläche, Grundstücksfläche
   - Anzahl Zimmer, Schlaf-, Badezimmer, Balkon/Terrasse, Stellplätze
   - Provisionspflichtig, Käuferprovision, Provisionshinweis
   - Verfügbar ab, Baujahr, Letzte Modernisierung, Zustand
   - Energieausweis, Primärenergieträger, Heizungsart
7. **Ausstattung** als Icon-Liste (Balkon, Garage, Garten, Kamin, etc.)
8. **Lage**-Beschreibung (eigener Absatz)
9. CTA-Block: „Besichtigung anfragen" + Mini-Formular oder Telefon-CTA

### 4.5 /immobiliensuche

Schlankes Formular nach Ediths Anpassung — vollständige Spec liegt bereits in **[08-formular-immobiliensuche.md](08-formular-immobiliensuche.md)**. Stitch soll dieser Spec folgen.

### 4.6 /kontakt

- Kontaktformular (wie Sektion 11 auf Home, aber als Vollseite)
- Erreichbarkeitshinweis: „Auch am Wochenende"
- Karte / Anfahrt (DSGVO-konform)
- Foto vom Büro / Außenansicht (falls vorhanden)

### 4.7 /tippgeber (optional)

Wenn Edith das System will: Aufbau wie DORN-Tippgeber-Seite mit ihrer angepassten Staffelung (siehe `05-inspirationsquellen.md`).

---

## 5. Brand- und Design-Spec für Stitch

### 5.1 Farbpalette

Aus dem Logo abgeleitet (Briefbogen `Logo/VIB_Briefbogen.docx`). **Exakte Werte aus PSD noch zu verifizieren.**

| Rolle | Hex | Beispiel-Einsatz |
|-------|-----|------------------|
| Primary / Text | `#1A1A1A` | Schrift, Logo, dunkle Buttons |
| Accent / Brand-Fläche | `#F4D4C6` | Logo-Hintergrundfarbe, Sektions-Backgrounds, Hover-States |
| Background | `#FFFFFF` | Standard |
| Body Text | `#2B2B2B` | Fließtext |
| Muted Text | `#6B6B6B` | Captions, Metadaten |
| Border / Trenner | `#E6D9D2` | Card-Borders, Hairlines |
| Optional Accent (für Premium-Touch) | `#8E2A2A` Burgundy *(Vorschlag)* | sparsam für Highlights / Hover |

**Stitch:** Bitte die Hauptfarben `#1A1A1A` + `#F4D4C6` + `#FFFFFF` als Kern verwenden. Tonality: hell, warm, ruhig.

### 5.2 Typografie

| Rolle | Schrift | Begründung |
|-------|---------|-----------|
| Display (H1, Hero) | **Didone-Serif** — z.B. Playfair Display, DM Serif Display, Cormorant Garamond | Passt zur Logo-Schrift (klassisch-elegant) |
| Headlines (H2-H4) | Gleiche Serif, deutlich kleiner | |
| Body | Klare Sans-Serif — z.B. Inter, Manrope, Outfit | Lesbarkeit |
| Brand-Element / Signature | **Italic-Serif** wie auf Logo („Edith Voss") | Identifikation |

### 5.3 Komponenten-Inventar

Was Stitch bauen sollte:

- **Header / Top-Nav** mit Logo links, Menü rechts, klein-versaler Stil
- **Hero-Block** mit Porträt + Headline + zwei CTAs
- **USP-Kachel** (Icon + Headline + Body) in 3er-Reihe
- **Immobilien-Card** mit Foto-Top, Status-Badge, Titel, Meta-Zeile, Preis-Footer
- **Service-Kachel** (mit kleinem Icon, Headline, Body — wie DORN-Leistungen)
- **Testimonial-Card** mit Sternchen, Zitat, Name
- **CTA-Block** in Edith-Brand-Rosa als Hintergrund
- **Footer** schlicht, dunkel oder rosa-Akzent
- **Formular-Komponente** (klare Labels, viel Padding, große Inputs — siehe 08)
- **Karte / Region-Visualisierung** (abstrakt, nicht Google-Maps-Standard)
- **Vorher/Nachher-Slider** für Home Staging
- **Quote-Block** für markante Sätze („Einige meiner Kunden haben…")

### 5.4 Tonalität (für AI-Texte / weitere Sektionen, falls Stitch welche generiert)

- **Ich-Form** verwenden, **niemals „Wir"** (Einzelfirma, Marke = Person)
- **Originalsprüche von Edith** beibehalten — nicht umformulieren
- **Niveau** halten — kein „Hey", „Boom" o.ä.
- **Keine Buzzwords** („revolutionär", „ganzheitlich", „innovativ")
- **Konkrete Beispiele** über abstrakte Versprechen („Einige meiner Kunden…" > „Wir sorgen für…")

### 5.5 Bildsprache

- **Porträt:** Porträt 2 (`Porträt 2.jpg`) ist erste Wahl — freundlich, klares Studio-Light, keine Wasserzeichen. Porträt 1 zeigt Edith vor Werbeplakat (vermutlich altes Studio) — gut für Über-mich-Story.
- **Innenräume:** Hell, lichtdurchflutet, klassisch-modern (DORN-Foto-Stil oder besser Mark-Fiedler-Aufgeräumtheit)
- **Keine ChatGPT-/KI-generierten Hero-Bilder** (wie DORN sie nutzt) — wirkt billig
- **Stockfotos** nur als letzte Option, dann hochwertig (z.B. Unsplash Premium)

### 5.6 Was Stitch anders machen soll als DORN

| DORN | V.I.B. |
|------|--------|
| Türkisblauer Akzent | Zartrosa (`#F4D4C6`) Akzent |
| Tom-Dorn-Stil (sportlich, Lifestyle-Studio) | Edith-Stil (klassisch-elegant, Mid-Career, weiblich) |
| Wir-Sprache | Ich-Sprache |
| Lead-Magnet „2-Min-Bewertung" sehr prominent | Stattdessen Off-Market-Netzwerk als Killer-USP prominent |
| KI-generierte Hero-Bilder | Echte Fotos (oder hochwertige Stocks) |
| Sehr viele Cards / dichtes Listing | Mehr Whitespace, weniger Cards, klarere Hierarchie |
| Divi-WordPress-Look | Schlank, modern, Next.js + Tailwind |
| Großes Formular mit Captcha-Rechnung | Schlankes Formular ohne Captcha (Honeypot + Rate-Limit) |

---

## 6. CTAs und Funnel-Logik

### Drei klare Funnel pro Zielgruppe

| Zielgruppe | Primärer CTA | Zielseite | Erfolg = |
|-----------|--------------|-----------|----------|
| **Verkäufer** | „Den Wert meiner Immobilie persönlich besprechen" | Kontakt/Hero | Anruf oder Mail an info@e-vib.de |
| **Käufer** | „In den vertraulichen Verteiler aufnehmen lassen" | /immobiliensuche | Formular-Submit |
| **Tippgeber** (optional) | „Objekt empfehlen" | /tippgeber | Tippgeber-Formular |

CTAs werden **nicht vermischt** — eine klare Aktion pro Sektion.

---

## 7. Kontakt- und Footer-Daten (Pflicht-Felder)

```
V.I.B. Voß Immobilien Beratung
Inhaberin: Edith Voß (Einzelfirma)
Alte Schulstraße 28
68549 Ilvesheim
Deutschland

Telefon: +49 173 360 19 36
E-Mail:  info@e-vib.de

Steuernummer: 37401/40895
USt-IdNr.: [NOCH ZU ERGÄNZEN]
Aufsichtsbehörde nach §34c GewO: [NOCH ZU ERGÄNZEN]

Bankverbindung (nur für interne Verwendung, nicht Website):
IBAN DE56 6705 0505 0038 9676 86
BIC  MANSDE66XXX
```

---

## 8. Übergabe-Hinweise an Stitch

1. **Bitte alle Sektionen aus Kapitel 4 als eigene Screens/Frames bauen.**
2. **Pro Page mindestens Desktop + Mobile Variante** liefern.
3. **Komponenten in Kapitel 5.3** als reusable Module / Symbols anlegen.
4. **Farben aus 5.1, Typo aus 5.2** als Design Tokens definieren — damit ich sie direkt in Tailwind übertragen kann.
5. **Texte bitte 1:1 aus dieser MD übernehmen** — nicht eigenmächtig umformulieren. Edith ist die Autorin.
6. **Output-Format:** Figma-Frames (oder vergleichbar) + Token-JSON wenn möglich.

---

## 9. Was nach Stitch passiert (Build-Plan)

1. Lukas review Stitch-Konzept mit Edith
2. Iteration auf Designkonzept (1-2 Runden)
3. Übergabe an mich → Next.js 16 + Tailwind + Vercel
4. **Coming-Soon-Splash zuerst live** (1-Stunden-Sprint), damit `e-vib.de` heute schon präsent ist
5. Voll-Build über 1-2 Wochen
6. Edith-Approval + Launch

---

## 10. Pflicht-Querverweise

- **Originaltexte:** [04-website-texte.md](04-website-texte.md)
- **Formular-Spec:** [08-formular-immobiliensuche.md](08-formular-immobiliensuche.md)
- **Inspirationsquellen-Analyse:** [05-inspirationsquellen.md](05-inspirationsquellen.md)
- **Brand-Details:** [01-brand-und-unternehmen.md](01-brand-und-unternehmen.md)
- **Offene Punkte vor Build:** [07-offene-punkte.md](07-offene-punkte.md)
