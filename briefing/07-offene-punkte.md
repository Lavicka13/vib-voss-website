# Offene Punkte vor dem Build

Diese Fragen sollten geklärt sein, bevor ich anfange zu bauen.

## Mit Edith zu klären

### Identität & Schreibweise
- [ ] **„Voss" oder „Voß"?** Briefbogen schreibt „Voß", URL-Domain `e-vib.de` lässt es offen. Empfehlung: Im Logo „Voß", im Body-Text und in URLs „Voss".
- [ ] **Erfahrungsjahre:** Edith sagt „fast 29 Jahre" — Stand 2026 sind es 30+. Aktualisieren?
- [ ] **Hero-Claim festlegen:** vier Optionen in `04-website-texte.md` — welcher soll es sein?

### Inhalt & Funktion
- [ ] **Floskel-Filter:** Edith hat gesagt, „Diskretion, Vertrauen, beste Wertermittlung" seien Makler-Floskeln. Aber genau diese tauchen in den ChatGPT-Texten und Inspirationsquellen auf. Welche Wörter ja, welche nein? Vorschlag in `02-positionierung.md`.
- [ ] **Tippgeber-System:** Will sie das wirklich auf die Website? Ihre handschriftlichen Korrekturen auf dem DORN-Modell deuten darauf hin, aber sie hat es nicht explizit gesagt.
- [ ] **Aktuelle Objekte:** Hat sie aktuell Immobilien zum Listen? Oder startet die Seite mit „Aktuell auf Anfrage"?
- [ ] **Google-Bewertungen:** Existieren welche? Wenn ja, Google-Place-ID / Profil-URL bereitstellen.
- [ ] **Home Staging als eigene Leistung:** Ist das ein Service, den sie selbst durchführt, oder vermittelt sie nur einen Stager? Bestimmt die Tiefe der Seitenstruktur.

### Bild- & Rechtematerial
- [ ] **Porträt 3 hat „Copyright"-Wasserzeichen.** Edith muss klären, ob sie die Rechte hat, oder wir nutzen ein anderes (Porträt 1 oder 2).
- [ ] **Welche der drei Porträts ist das offizielle?** Stilistisch passen Porträt 1 (mit Werbeplakat im Hintergrund — Edith Voss Immobilien?) oder Porträt 2 (Studiosituation) am besten.
- [ ] **Logo in Vektorform:** Aktuell nur PSD verfügbar (16 MB). Brauchen wir als SVG für saubere Web-Verwendung — kann ich aus PSD ableiten, oder hat Edith Original-AI-Datei?
- [ ] **Lifestyle-Bildmaterial / Stimmungsbilder:** Hat sie eigene Fotos von Innenräumen / Objekten, die sie zeigen darf? Sonst Stock.
- [ ] **Home-Staging-Foto:** Das Beispielbild im Material ist vermutlich aus einem fremden Exposé — wir brauchen lizensiertes Material.

### Rechtliches
- [ ] **Vollständige Impressums-Angaben:** Steuernummer + USt-IdNr? (Nur St.-Nr. 37401/40895 liegt vor.)
- [ ] **Aufsichtsbehörde nach §34c GewO:** Welches Gewerbeamt? (Pflicht im Impressum für Immobilienmakler)
- [ ] **Berufshaftpflicht / Berufshaftpflichtversicherung:** Anbieter + Geltungsbereich (für seriösen Impressums-Auftritt)
- [ ] **Datenschutzerklärung:** Muss individuell erstellt werden, basierend auf finalen Funktionen (Kontaktformular, Suchprofil, eventuell Google-Tools).

### Domain & Tech
- [ ] **Domain `e-vib.de`:** Bereits registriert? DNS-Zugriff?
- [ ] **E-Mail:** `info@e-vib.de` — schon eingerichtet? Postfach wo?
- [ ] **Hosting-Präferenz:** Vercel ok, oder soll es woanders liegen?
- [ ] **Analytics:** Plausible (DSGVO-light) oder Google Analytics (mehr Setup-Aufwand für Consent)?

## Von dir (Lukas) zu entscheiden

- [ ] **Designkonzept-Template** in `06-sitemap-und-empfehlung.md` mit Edith durchgehen und ausfüllen.
- [ ] **Stack-Bestätigung:** Next.js 16 / Tailwind / Vercel wie üblich?
- [ ] **Coming-Soon-Splash zuerst** oder direkt V1 launchen?
- [ ] **Wo soll das Projekt liegen?** Vorschlag: `~/Arbeit/Kunden/edith-voss-vib/` parallel zu deinen anderen Kunden-Verzeichnissen.
- [ ] **Brand-Skill anlegen?** Da Edith mehrere Touchpoints (Briefbogen, Exposés, evtl. Social) haben wird, könnte ein `client-vib`-Skill via `brand-factory` Sinn machen für konsistente Materialien.

## Was ich noch tun kann, wenn du grünes Licht gibst

1. **PSD-Logo öffnen** und exakte Hex-Farbwerte extrahieren + SVG bauen.
2. **Designkonzept erweitern**: konkrete Komponenten-Mockups (Hero, USP-Kacheln, Objektkarte) auf Basis dieses Briefings via `ui-ux-pro-max` oder `frontend-design`.
3. **Coming-Soon-Page** als 30-Minuten-Sprint, damit Domain live geht.
4. **Brand-Skill anlegen** (`client-vib`) damit Edith-Materialien langfristig konsistent bleiben.
5. **Datenschutz- und Impressums-Template** vorab vorbereiten, sobald die offenen Felder geklärt sind.
