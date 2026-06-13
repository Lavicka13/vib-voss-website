# Offene Punkte — Umsetzung Änderungen 11.06.2026

Stand: 13.06.2026. Branch `single-page`. Alle eindeutigen Vorgaben aus
„Änderungen besprochen.docx" sind umgesetzt (4 Commits). Was noch Ediths
Input braucht:

## 1. Galerie-Bilder für die übrigen Objekte
Die Bildergalerie (Hauptbild + Vorschaubilder, wie Dorn Living Solutions) ist
gebaut und am neuen Objekt **Dachgeschosswohnung Rheinebene** live (6 Fotos aus
dem Dorn-Exposé). Die anderen Objekte zeigen weiterhin nur ein Einzelbild, bis
echte Bildersets vorliegen für:
- Juwel an der Bergstraße (Dorn-Link existiert, Fotos fehlen lokal)
- Reizvolle Villa in Bestlage (Rheinebene)
- Denkmalgeschütztes Mehrfamilienhaus
- Familienglück Einfamilienhaus (Bretten)
- Top-Secret Villa Rhein-Neckar
→ Sobald Fotos da sind: pro Objekt ein `bilder: [...]`-Array in `home.ts` ergänzen,
Galerie erscheint automatisch.

## 2. Referenz-Foto Edenkoben ist ein Listing-Screenshot
Das Bild für „Juwel in der Südpfalz / Edenkoben" ist ein Screenshot einer
Listing-Karte (mit eingebranntem Titel + Icon-Leiste), kein sauberes Foto. Sollte
durch ein normales Objektfoto ersetzt werden (`ref-edenkoben-villa-1600.jpg`).
Die übrigen 12 Referenzfotos sind echte Fotos (teils niedrig aufgelöst, da aus dem
Dokument extrahiert — höher aufgelöste Versionen verbessern die Schärfe).

## 3. Datenkonflikt neue Dachgeschosswohnung
Übernommen wurden **Ediths Angaben** aus dem Änderungsdokument:
4 Stellplätze, Doppelgarage, 2 Balkone, keine Fernwärme, Parkett.
Das Dorn-Exposé nennt abweichend: Duplex-Stellplatz (2) in Gemeinschaftsgarage,
Fernwärme + Gas, Laminat. **Bitte gegenprüfen**, welche Angaben stimmen.

## 4. Objektbeschreibungen „wie im Original-Exposé"
Vorgabe „Texte wie im Original Exposé": Die bestehenden Beschreibungstexte wurden
nicht 1:1 mit den Original-Exposés abgeglichen (liegen nicht alle vor). Falls
Originaltexte gewünscht sind: Exposés liefern, dann übernehme ich sie wortgenau.
Offene Frage aus dem Dokument: „warum wurden manche Beschreibungen nicht
übernommen?" — bitte klären, welche Texte konkret fehlen.

## 5. Noch nachzuliefernde Referenzobjekte
- Nr. 9 Birkenau (Angaben fehlen)
- Nr. 15 Weinheim-West (wird nachgeliefert)

## 6. Presse-Original
Edith hat ein Original des Artikels „Das Original ist zurück" geschickt
(`public/images/presse-original-2026-1600.jpg`, noch nicht eingebunden). Aktuell
ist die Version mit Zeitungs-Kopf (`presse-neu`) eingebunden. Falls die gesendete
Original-Version bevorzugt wird: 1-Zeilen-Tausch in `home.ts`.

## Rechtliches (vor Live-Schaltung)
- Widerrufsbelehrung (`/widerruf`) ist ein Entwurf → anwaltlich prüfen lassen.
