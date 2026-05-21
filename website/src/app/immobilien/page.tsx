import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ImmobilienGrid } from "@/components/sections/ImmobilienGrid";
import { CTABlock } from "@/components/sections/CTABlock";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { immobilien } from "@/content/immobilien";

export const metadata: Metadata = {
  title: "Immobilien | V.I.B. Voß Immobilien Beratung",
  description:
    "Aktuelle und diskret vermittelte Immobilien im Rhein-Neckar-Raum. Viele Objekte werden vor Veröffentlichung über das Netzwerk vermittelt.",
};

export default function ImmobilienPage() {
  return (
    <>
      <Hero
        headline="Exklusive Immobilien im Rhein-Neckar-Raum"
        subline="Viele unserer exklusivsten Immobilien vermitteln wir im Off-Market-Bereich — absolut diskret und zielgerichtet, fernab der üblichen Portale, um die Privatsphäre meiner Mandanten zu wahren."
      />
      <RevealOnScroll>
        <ImmobilienGrid items={immobilien} />
      </RevealOnScroll>
      <CTABlock
        headline="Sie suchen ein bestimmtes Objekt?"
        sub="Hinterlegen Sie Ihr Suchprofil — diskret und ohne Verpflichtung."
        button={{ label: "Suchprofil anlegen", href: "/immobiliensuche" }}
      />
    </>
  );
}
