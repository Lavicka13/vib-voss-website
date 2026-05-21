import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Immobilien | V.I.B.",
  description:
    "Aktuelle und diskret vermittelte Immobilien im Rhein-Neckar-Raum.",
};

export default function ImmobilienPage() {
  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
      <h1 className="font-display text-display-lg-mobile md:text-display-lg text-primary">
        Immobilien
      </h1>
      <p className="font-body text-body-lg text-muted-text mt-8">
        [Skelett — Inhalt in Welle 2]
      </p>
    </div>
  );
}
