# Formular „Immobiliensuche" — V.I.B.-Version

Edith hat Vorlage des DORN-Suchformulars (`dorn-living-solutions.de/immobiliensuche`) handschriftlich umgearbeitet. Datei-Belege: `20260520_110910.jpg` (Seite 1) und `20260520_110227.jpg` (Seite 2).

Diese MD ist die **build-fertige Spec** — Felder, Labels, Pflicht/Optional, Reihenfolge.

## Was Edith gestrichen hat

Alle diese DORN-Felder will sie **nicht** im Formular:

- Personen im Haushalt
- Haustiere vorhanden? / Welche?
- Barrierefreiheit
- Aufzug
- Smart-Home-Technologie
- Energieeffiziente Bauweise
- Öffentliche Verkehrsanbindung wichtig
- Nähe zu Schulen & Kitas
- Einkaufsmöglichkeiten in der Nähe
- Innenstadtlage bevorzugt
- Arbeitsplatz in der Nähe
- Maximale Nebenkosten (€/Monat)
- Finanzierung gesichert? (Ja/Nein)
- Kauf-/Mietentscheidung bis (Datum)
- Wann möchten Sie umziehen?
- Wunschzeitfenster
- „Wie dürfen wir Sie am besten kontaktieren?" → vereinfacht zu nur „Telefon"

**Logik:** Edith arbeitet im Premium-Segment. Ihre Käufer füllen kein 20-Felder-Lebenslauf-Formular aus, sie wollen kurz signalisieren was sie suchen und dann ein persönliches Gespräch.

## Was Edith umbenannt hat

| DORN-Original | V.I.B.-Version |
|---------------|----------------|
| Standort | **Wunschorte** |
| Wohnfläche (m²) | **Wohnfläche ca. m²** |
| Grundstücksgröße (m²) | **Grundstücksgröße ca. m² (falls relevant)** |
| Budget (€) | **Limitpreis** |
| Lage & Infrastruktur | **Lage** |

## Finale Feldliste (in Reihenfolge)

```
1.  Kauf / Miete                          Radio-Buttons
2.  Art der Immobilie                     Dropdown
3.  Wunschorte                            Text (mehrzeilig erlaubt)
4.  Wohnfläche ca. m²                     Number
5.  Grundstücksgröße ca. m²               Number (Hinweis: „falls relevant")
6.  Limitpreis €                          Number
7.  Ausstattung & Merkmale                Multi-Select Checkboxes
8.  Weitere Wünsche                       Textarea (groß, Freitext)
9.  Lage                                  Single Checkbox
10. Kontaktdaten                          Block
11. DSGVO-Einwilligung                    Pflicht-Checkbox
12. → Senden
```

### Feld 2 — Art der Immobilie (Dropdown-Werte)

```
- Villa
- Mehrfamilienhaus
- Einfamilienhaus
- Wohnung
- Apartment
- Sonstiges
```

### Feld 7 — Ausstattung & Merkmale (Edith hat im DORN-Bild diese ÜBRIG gelassen)

```
[ ] Balkon / Terrasse
[ ] Garten
[ ] Garage / Stellplatz
[ ] Einbauküche
[ ] Keller / Abstellraum
```

Die Felder *Barrierefreiheit, Aufzug, Smart Home, Energieeffizienz* hatte sie durchgestrichen — also nicht aufnehmen.

Im DORN-Original gab es darunter noch ein „Weitere Wünsche" Freitext-Feld mit Placeholder „z.B. Kamin, Fußbodenheizung". Das übernehmen wir als eigenes Feld 8.

### Feld 9 — Lage (Edith hat nur einen einzigen Punkt übrig gelassen)

```
[ ] Ruhige Wohngegend bevorzugt
```

Plus optional Freitext im „Weitere Wünsche" für ihre individuelle Lagewünsche. Das genügt.

### Feld 10 — Kontaktdaten

```
Name              Pflicht
E-Mail-Adresse    Pflicht
Telefon           Pflicht (Edith bevorzugt Telefon-Erstkontakt)
```

### Feld 11 — DSGVO

```
[ ] Ich willige ein, dass meine Angaben ausschließlich zur 
    Angebotserstellung verwendet und nicht an Dritte weitergegeben werden. 
    Weitere Informationen in der Datenschutzerklärung.
```

## Verhalten / UX

- **Nach Senden:** Bestätigungs-Screen, kein Reload. Kurzer Text: „Danke. Ich melde mich persönlich bei Ihnen — meist innerhalb von 24 Stunden, am Wochenende auch früher."
- **Mail-Empfänger:** `info@e-vib.de` (oder separate Suchprofil-Adresse, falls Edith das organisatorisch trennen will)
- **Spam-Schutz:** Honeypot + Rate-Limit, kein reCAPTCHA (DSGVO-/Drittland-Problem mit Google)
- **Validierung:** E-Mail-Format + Pflicht-Felder client + serverseitig
- **Mobile First:** Felder voll Breite, Touch-Targets ≥ 44px, Nummer-Felder mit `inputmode="numeric"`

## HTML-/Komponenten-Skelett (zur Orientierung)

```tsx
<form action="/api/immobiliensuche" method="POST">
  {/* 1 */}
  <fieldset>
    <legend>Kauf oder Miete?</legend>
    <label><input type="radio" name="absicht" value="kauf" /> Kauf</label>
    <label><input type="radio" name="absicht" value="miete" /> Miete</label>
  </fieldset>

  {/* 2 */}
  <label>
    Art der Immobilie
    <select name="art">
      <option>Villa</option>
      <option>Mehrfamilienhaus</option>
      <option>Einfamilienhaus</option>
      <option>Wohnung</option>
      <option>Apartment</option>
      <option>Sonstiges</option>
    </select>
  </label>

  {/* 3 */}
  <label>
    Wunschorte
    <textarea name="orte" rows={2} placeholder="z. B. Weinheim, Heidelberg, Bergstraße" />
  </label>

  {/* 4–6 */}
  <label>Wohnfläche ca. m² <input type="number" name="wohnflaeche" inputMode="numeric" /></label>
  <label>Grundstücksgröße ca. m² <small>(falls relevant)</small>
    <input type="number" name="grundstueck" inputMode="numeric" />
  </label>
  <label>Limitpreis € <input type="number" name="limit" inputMode="numeric" /></label>

  {/* 7 */}
  <fieldset>
    <legend>Ausstattung & Merkmale</legend>
    <label><input type="checkbox" name="ausstattung" value="balkon" /> Balkon / Terrasse</label>
    <label><input type="checkbox" name="ausstattung" value="garten" /> Garten</label>
    <label><input type="checkbox" name="ausstattung" value="garage" /> Garage / Stellplatz</label>
    <label><input type="checkbox" name="ausstattung" value="einbaukueche" /> Einbauküche</label>
    <label><input type="checkbox" name="ausstattung" value="keller" /> Keller / Abstellraum</label>
  </fieldset>

  {/* 8 */}
  <label>
    Weitere Wünsche
    <textarea name="wuensche" rows={5} placeholder="z. B. Kamin, Fußbodenheizung, individuelle Lage-Wünsche…" />
  </label>

  {/* 9 */}
  <fieldset>
    <legend>Lage</legend>
    <label><input type="checkbox" name="lage" value="ruhig" /> Ruhige Wohngegend bevorzugt</label>
  </fieldset>

  {/* 10 */}
  <label>Name <input type="text" name="name" required /></label>
  <label>E-Mail-Adresse <input type="email" name="email" required /></label>
  <label>Telefon <input type="tel" name="telefon" required /></label>

  {/* 11 */}
  <label>
    <input type="checkbox" name="dsgvo" required />
    Ich willige ein, dass meine Angaben ausschließlich zur Angebotserstellung
    verwendet und nicht an Dritte weitergegeben werden. Weitere Informationen
    in der <a href="/datenschutz">Datenschutzerklärung</a>.
  </label>

  <button type="submit">Suchprofil senden</button>
</form>
```

## Offen — vor Build noch zu klären

- [ ] Soll das Formular eine eigene Route `/immobiliensuche` bekommen oder als Inline-Sektion auf der Home auftauchen? Vorschlag: eigene Route, dazu kompakter CTA auf Home.
- [ ] Soll es eine **Kauf-/Miete**-Vorwahl überhaupt geben, oder konzentriert Edith sich nur auf Kauf? (Sie sprach im O-Ton überwiegend von „Verkauf".)
- [ ] Wohin geht die Mail (`info@e-vib.de` direkt oder separate Adresse)?
- [ ] Möchte Edith zusätzlich ein **Verkäufer-Formular** („Ich möchte meine Immobilie verkaufen") in derselben Schlankheit? Falls ja, wird das eine zweite, ähnlich aufgebaute Spec.
