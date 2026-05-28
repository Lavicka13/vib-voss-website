// Quelle: Widerrufsbelehrung aus den Unterlagen (WA0013), angepasst auf V.I.B. Voß
// Immobilien Beratung (Anbieter laut Abstimmung, nicht Dorn Living Solutions).
// TODO vor Live-Schaltung: anwaltlich prüfen lassen + ggf. Muster-Widerrufsformular ergänzen.
export const widerruf = {
  title: "Widerrufsbelehrung",
  intro:
    "Im Falle eines zustande kommenden Maklervertrages haben Verbraucher das folgende Widerrufsrecht:",
  sections: [
    {
      heading: "Widerrufsrecht",
      body: [
        "Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen den Maklervertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.",
        "Um Ihr Widerrufsrecht auszuüben, müssen Sie mir (V.I.B. Voß Immobilien Beratung, Edith Voß, Alte Schulstraße 28, 68549 Ilvesheim, info@e-vib.de) mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Maklervertrag zu widerrufen, informieren. Sie können dafür ein Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.",
        "Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.",
      ],
    },
    {
      heading: "Folgen des Widerrufs",
      body: [
        "Wenn Sie diesen Vertrag widerrufen, habe ich Ihnen alle Zahlungen, die ich von Ihnen erhalten habe, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei mir eingegangen ist. Für die Rückzahlung verwende ich dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart.",
        "Haben Sie verlangt, dass die Maklerleistung während der Widerrufsfrist beginnen soll, so haben Sie mir einen angemessenen Betrag zu zahlen, der dem Anteil der bis zum Zeitpunkt Ihres Widerrufs bereits erbrachten Leistungen im Vergleich zum Gesamtumfang der vertraglich vorgesehenen Leistungen entspricht.",
      ],
    },
  ],
  pruefHinweis:
    "Dieser Text ist ein Entwurf und sollte vor Live-Schaltung anwaltlich geprüft werden.",
} as const;
