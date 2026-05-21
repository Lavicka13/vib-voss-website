import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leistungen | V.I.B.",
  description:
    "Wertberatung, Off-Market-Vermarktung, Exposé, Verhandlung, Home Staging — alle Leistungen aus einer Hand.",
};

export default function LeistungenPage() {
  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
      <h1 className="font-display text-display-lg-mobile md:text-display-lg text-primary">
        Leistungen
      </h1>
      <p className="font-body text-body-lg text-muted-text mt-8">
        [Skelett — Inhalt in Welle 2]
      </p>
    </div>
  );
}
