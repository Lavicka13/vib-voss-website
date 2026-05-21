import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { IntroQuote } from "@/components/sections/IntroQuote";
import { USPGrid } from "@/components/sections/USPGrid";
import { TestimonialBlock } from "@/components/sections/TestimonialBlock";
import { CTABlock } from "@/components/sections/CTABlock";
import { ContactSection } from "@/components/sections/ContactSection";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { home } from "@/content/home";

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow={home.hero.eyebrow}
        headline={home.hero.headline}
        subline={home.hero.subline}
        primaryCta={home.hero.primaryCta}
        secondaryCta={home.hero.secondaryCta}
        trustStrip={home.hero.trustStrip}
        image={{
          src: "/images/hero-interior-1600.jpg",
          alt: "Stilvoll inszeniertes, lichtdurchflutetes Wohnzimmer — symbolisch für die exklusiven Immobilien, die Edith Voss vermittelt",
        }}
      />

      <RevealOnScroll>
        <IntroQuote body={home.intro.body} />
      </RevealOnScroll>

      <RevealOnScroll>
        <USPGrid items={home.usps} />
      </RevealOnScroll>

      <section
        id="ueber-mich"
        className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap"
      >
        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
            <div className="md:col-span-5 order-2 md:order-1">
              <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-surface-container-low">
                <Image
                  src="/images/portraet-edith-800.jpg"
                  alt="Edith Voss, Inhaberin V.I.B. Voß Immobilien Beratung"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-6 md:col-start-7 order-1 md:order-2 flex flex-col gap-6">
              <span className="font-body text-label-caps text-muted-text uppercase tracking-widest">
                {home.ueberMich.eyebrow}
              </span>
              <h2 className="font-display text-display-lg-mobile md:text-display-lg text-primary">
                {home.ueberMich.headline}
              </h2>
              <div className="flex flex-col gap-5 mt-2">
                {home.ueberMich.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="font-body text-body-lg text-on-surface-variant leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <section
        id="leistungen"
        className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap border-t border-border-taupe"
      >
        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="md:col-span-4 flex flex-col gap-4">
              <span className="font-body text-label-caps text-muted-text uppercase tracking-widest">
                {home.leistungen.eyebrow}
              </span>
              <h2 className="font-display text-display-lg-mobile md:text-headline-md text-primary">
                {home.leistungen.headline}
              </h2>
              <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-surface-container-low mt-6 hidden md:block">
                <Image
                  src="/images/ueber-mich-architecture-800.jpg"
                  alt="Stilvolles architektonisches Detail — symbolisch für die Qualität der Immobilien aus dem Netzwerk"
                  fill
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-7 md:col-start-6 flex flex-col gap-6">
              <ul className="space-y-3 font-body text-body-lg text-on-surface-variant">
                {home.leistungen.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-secondary mt-1.5">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <section
        id="immobilien"
        className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap border-t border-border-taupe"
      >
        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
            <div className="relative w-full aspect-[4/5] md:aspect-[4/5] rounded-lg overflow-hidden bg-surface-container-low order-2 md:order-1">
              <Image
                src="/images/immobiliensuche-decor-1600.jpg"
                alt="Lichtdurchflutetes Premium-Interieur — Atmosphäre der Objekte aus dem Off-Market-Netzwerk"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-6 order-1 md:order-2">
              <span className="font-body text-label-caps text-muted-text uppercase tracking-widest">
                {home.immobilien.eyebrow}
              </span>
              <h2 className="font-display text-display-lg-mobile md:text-display-lg text-primary">
                {home.immobilien.headline}
              </h2>
              <div className="flex flex-col gap-4">
                {home.immobilien.body.map((p, i) => (
                  <p
                    key={i}
                    className="font-body text-body-lg text-on-surface-variant leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
              <p className="font-display italic text-body-md text-primary border-t border-border-taupe pt-6 mt-2">
                {home.immobilien.schwerpunkt}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <a
                  href={home.immobilien.ctaVerkauf.href}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-body text-label-caps tracking-widest bg-primary text-on-primary hover:bg-secondary transition-colors duration-300"
                >
                  {home.immobilien.ctaVerkauf.label}
                </a>
                <a
                  href={home.immobilien.ctaKauf.href}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-body text-label-caps tracking-widest bg-transparent border border-primary text-primary hover:bg-surface-container-low transition-colors duration-300"
                >
                  {home.immobilien.ctaKauf.label}
                </a>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <section
        id="region"
        className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap border-t border-border-taupe"
      >
        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
            <div className="flex flex-col gap-6">
              <h2 className="font-display text-display-lg-mobile md:text-display-lg text-primary">
                {home.region.headline}
              </h2>
              <p className="font-body text-body-lg text-muted-text leading-relaxed">
                {home.region.body}
              </p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 font-body text-body-md text-primary mt-2">
                {home.region.orte.map((ort) => (
                  <li key={ort} className="flex items-start gap-2">
                    <span className="text-secondary mt-1">—</span>
                    <span>{ort}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative w-full aspect-[4/5] md:aspect-[3/4] rounded-lg overflow-hidden bg-surface-container-low">
              <Image
                src="/images/region-bergstrasse-1600.jpg"
                alt="Landschaft der Bergstraße und Rhein-Neckar-Region — Tätigkeitsgebiet von Edith Voss"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <RevealOnScroll>
        <TestimonialBlock
          quote={home.testimonial.quote}
          attribution={home.testimonial.attribution}
        />
      </RevealOnScroll>

      <RevealOnScroll>
        <ContactSection />
      </RevealOnScroll>

      <CTABlock headline={home.cta.headline} sub={home.cta.sub} />

      <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-section-gap-mobile md:pb-section-gap text-center">
        <p className="font-display italic text-signature-quote text-primary max-w-2xl mx-auto">
          {home.cta.schluss}
        </p>
      </section>
    </>
  );
}
