# Übergabe — V.I.B. Voß Immobilien Beratung (Single-Page Website)

Stand: 22.06.2026. Branch `single-page`. Next.js 16, Deployment über Vercel
(Projekt `vib-single`, Domain vib-single.vercel.app).

Dieses Repository ist **öffentlich**. Klonen/Forken ausdrücklich erlaubt.
Die laufende Verwaltung (ca. 50 €/Monat) übernimmt der Auftraggeber; offene
Punkte unten lassen sich im Rahmen des Wartungsvertrags erledigen.

---

## In dieser Runde umgesetzt (22.06.2026)

- Hero-Subline neu formuliert (ohne „Vollblutmaklerin")
- Neue Kundenstimme **Barbara Stüssel** ergänzt; Kundenstimmen jetzt als 3 Karten
- Home-Staging-Sektion im 2/3-1/3-Layout; Vorher/Nachher-Slider im korrekten
  Seitenverhältnis (kein Beschnitt mehr)
- Referenzen-Intro: „verkaufte oder vermittelte Immobilien"
- Presse-Text neutral/ehrlich formuliert (siehe offener Punkt 1)
- GSK-Zeile im Presse-Bild unscharf gemacht
- USP-Kachel „persönlicher Umgang" verlinkt zu den aktuellen Immobilien (siehe Punkt 2)
- Carousel: „Zurück/Weiter" fixiert (kein Springen mehr), Referenz-Eckdaten als Overlay
- „Coda · Folio"-Block auf den Detailseiten entfernt
- Objekt-Galerien aus den Dorn-Exposés übernommen (66 Bilder, 5 Objekte)

---

## Offene Punkte (brauchen Input von Edith Voß / Auftraggeber)

1. **Presse-Sektion entfernt.** Die „Aus der Presse"-Sektion wurde auf
   Kundenwunsch komplett entfernt (Render-Block aus `page.tsx`). Die zugehörigen
   Daten (`presse` in `home.ts`) und Bilder liegen ungenutzt im Repo, falls die
   Sektion später wieder gewünscht wird.

2. **„Icon nahbar" (Annahme getroffen).** Die Notiz „Icon nahbar → direkt zu den
   aktuellen Objekten" war mehrdeutig. Umgesetzt: Die USP-Kachel „Professionelles
   Auftreten, persönlicher Umgang" ist jetzt klickbar und führt zu
   `#aktuelle-immobilien`. Falls ein anderes Element gemeint war, in
   `home.ts` (USP `href`) bzw. `USPGrid.tsx` anpassen.

3. **Badge Verkauft/Vermietet bestätigen.** Aktuell: *Weinheim-Weststadt* und
   *Mainz* = „Vermietet", alle übrigen 11 Referenzen = „Verkauft". Vom Kunden
   gegenprüfen lassen (`referenzen.items[].badge` in `home.ts`).

4. **Hero „100 vh".** Der Hero nutzt bereits `min-h-[100svh]` (volle
   Bildschirmhöhe inkl. Mobile). Falls eine andere Höhenwirkung gewünscht ist,
   im Wartungsvertrag justieren (`Hero.tsx`).

5. **Bildmaterial.**
   - Galerien der Objekte stammen aus den Dorn-Exposés und enthalten teils
     **digital gestagte / KI-generierte** Visualisierungen. Haftungshinweis ist
     auf den Detailseiten vorhanden. Bei Bedarf durch reine Echtfotos ersetzen.
   - Diskrete „Top-Secret"-Villa bewusst ohne Bild.
   - Referenzen Nr. 9 (Birkenau) und Nr. 15 (Weinheim-West): Angaben/Fotos fehlen.

6. **Rechtliches vor Live-Gang.** Widerrufsbelehrung (`/widerruf`) ist ein
   Entwurf → anwaltlich prüfen lassen.

7. **Google-Bewertungen.** `kundenstimmen.profilUrl` ist `TODO_VON_EDITH` —
   Google-Business-Profil-URL eintragen, sobald vorhanden (dann erscheint der
   Button „Alle Google-Bewertungen ansehen" automatisch).

---

## Technik-Kurzreferenz

- **Inhalte pflegen:** fast alle Texte/Objekte in `website/src/content/home.ts`.
- **Bauen:** `cd website && npm install && npm run build`
- **Lokal:** `npm run dev` (Port 3000)
- **Deployen:** `cd website && vercel --prod` (Vercel-Login nötig)
- **Kontaktformular:** versendet per Resend, wenn `RESEND_API_KEY` als Env-Var
  gesetzt ist; ohne Key werden Anfragen nur in der Server-Konsole geloggt.
  Empfänger: `MAIL_RECIPIENT` (Default `info@e-vib.de`).
