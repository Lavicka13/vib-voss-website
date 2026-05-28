export const impressum = {
  anbieter: {
    firma: "V.I.B. Voß Immobilien Beratung",
    inhaberin: "Edith Voß",
    rechtsform: "Einzelfirma",
  },
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
  steuerliches: {
    steuernummer: "37401/40859", // Finanzamt Mannheim-Neckarstadt
    ustId: "TODO_VON_EDITH",
  },
  berufsrechtlich: {
    erlaubnis: "Erlaubnis nach §34c Abs. 1 GewO",
    erlaubnisBehoerde: "TODO_VON_EDITH", // erteilende Behörde, i.d.R. Gemeinde Ilvesheim / Rhein-Neckar-Kreis
    aufsichtsbehoerde: "Industrie- und Handelskammer (IHK) Rhein-Neckar, Geschäftsstelle Mannheim",
  },
  hinweise: {
    streitschlichtung: "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr. Ich bin nicht bereit oder verpflichtet, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    haftungInhalt: "Die Inhalte dieser Seiten wurden mit größtmöglicher Sorgfalt erstellt. Für Richtigkeit, Vollständigkeit und Aktualität kann jedoch keine Gewähr übernommen werden.",
    haftungLinks: "Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Für die Inhalte verlinkter Seiten ist stets der jeweilige Anbieter verantwortlich.",
  },
} as const;
