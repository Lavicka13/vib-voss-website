import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über mich | V.I.B. Voß Immobilien Beratung",
  description:
    "Edith Voss — Maklerin mit Leidenschaft im Rhein-Neckar-Raum seit fast 30 Jahren.",
};

export default function UeberMichPage() {
  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
      <h1 className="font-display text-display-lg-mobile md:text-display-lg text-primary">
        Über mich
      </h1>
      <p className="font-body text-body-lg text-muted-text mt-8">
        [Skelett — Inhalt in Welle 2]
      </p>
    </div>
  );
}
