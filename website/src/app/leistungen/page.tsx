import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { CTABlock } from "@/components/sections/CTABlock";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { leistungen } from "@/content/leistungen";

export const metadata: Metadata = {
  title: "Leistungen | V.I.B. Voß Immobilien Beratung",
  description: leistungen.hero.subline,
};

export default function LeistungenPage() {
  return (
    <>
      <Hero headline={leistungen.hero.headline} subline={leistungen.hero.subline} />
      <RevealOnScroll>
        <ServiceGrid services={leistungen.services} columns={2} variant="split" />
      </RevealOnScroll>
      <CTABlock
        headline={leistungen.cta.headline}
        sub={leistungen.cta.sub}
        button={leistungen.cta.button}
      />
    </>
  );
}
