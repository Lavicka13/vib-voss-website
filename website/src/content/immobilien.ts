export type ImmobilieStatus = "diskret" | "verfuegbar" | "auf-anfrage" | "verkauft";

export type Immobilie = {
  slug: string;
  status: ImmobilieStatus;
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
  ausstattung?: string[];
};

export const immobilien: Immobilie[] = [
  {
    slug: "stadtvilla-bergstrasse-diskret",
    status: "diskret",
    titel: "Stadtvilla an der Bergstraße",
    ort: "Heidelberg (Umgebung)",
    art: "Villa",
    wohnflaeche: 320,
    grundstueck: 850,
    zimmer: 8,
    schlafzimmer: 4,
    badezimmer: 3,
    preis: "Auf Anfrage",
    imageSlot: "object-mock-1",
    beschreibung: [
      "Repräsentatives Anwesen in einer der gefragtesten Lagen der Bergstraße. Wegen der Sensibilität des Verkaufsprozesses werden Details ausschließlich auf persönliche Anfrage übermittelt.",
      "Großzügige Wohnflächen, parkähnlicher Garten, exklusive Privatsphäre — ein Objekt, das nicht öffentlich vermarktet wird.",
    ],
    ausstattung: ["Garten", "Garage", "Kamin", "Keller", "Terrasse"],
  },
  {
    slug: "penthouse-mannheim-rheinblick",
    status: "verfuegbar",
    titel: "Penthouse mit Rheinblick",
    ort: "Mannheim Oststadt",
    art: "Penthouse",
    wohnflaeche: 185,
    zimmer: 4,
    schlafzimmer: 2,
    badezimmer: 2,
    preis: "1.850.000 €",
    imageSlot: "object-mock-2",
    beschreibung: [
      "Außergewöhnliche Penthouse-Wohnung mit umlaufender Dachterrasse und Blick über den Rhein. Helle Räume, hochwertige Materialien, ruhige Lage in zentraler Stadtnähe.",
      "Ideal für anspruchsvolle Käufer, die urbane Lage mit ländlicher Weite verbinden möchten.",
    ],
    ausstattung: ["Dachterrasse", "Einbauküche", "Tiefgarage", "Aufzug", "Fußbodenheizung"],
  },
  {
    slug: "architektenhaus-weinheim",
    status: "auf-anfrage",
    titel: "Architektenhaus im Grünen",
    ort: "Weinheim",
    art: "Einfamilienhaus",
    wohnflaeche: 240,
    grundstueck: 720,
    zimmer: 6,
    schlafzimmer: 4,
    badezimmer: 2,
    preis: "Preis auf Anfrage",
    imageSlot: "object-mock-3",
    beschreibung: [
      "Modernes Architektenhaus mit klarer Linienführung, großzügigen Glasflächen und sorgfältig kuratiertem Garten. Ruhige Wohnlage mit guter Anbindung.",
    ],
    ausstattung: ["Garten", "Garage", "Studio", "Smart Home"],
  },
];
