import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { StorytellingBlock } from "@/components/sections/StorytellingBlock";
import { TestimonialBlock } from "@/components/sections/TestimonialBlock";
import { ValuesGrid } from "@/components/sections/ValuesGrid";
import { CTABlock } from "@/components/sections/CTABlock";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ueberMich } from "@/content/ueber-mich";

export const metadata: Metadata = {
  title: "Über mich | V.I.B. Voß Immobilien Beratung",
  description: ueberMich.hero.subline,
};

export default function UeberMichPage() {
  return (
    <>
      <Hero
        headline={ueberMich.hero.headline}
        subline={ueberMich.hero.subline}
        image={{
          src: "/images/portraet-edith-1200.jpg",
          alt: "Edith Voss, Inhaberin V.I.B. Voß Immobilien Beratung",
        }}
      />
      <RevealOnScroll>
        <StorytellingBlock
          eyebrow={ueberMich.story.eyebrow}
          headline={ueberMich.story.headline}
          paragraphs={ueberMich.story.paragraphs}
        />
      </RevealOnScroll>
      <RevealOnScroll>
        <TestimonialBlock
          quote={ueberMich.philosophy.quote}
          attribution={ueberMich.philosophy.attribution}
        />
      </RevealOnScroll>
      <RevealOnScroll>
        <ValuesGrid items={ueberMich.values} />
      </RevealOnScroll>
      <CTABlock headline={ueberMich.cta.headline} button={ueberMich.cta.button} />
    </>
  );
}
