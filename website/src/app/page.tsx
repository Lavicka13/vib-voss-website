import { Hero } from "@/components/sections/Hero";
import { IntroQuote } from "@/components/sections/IntroQuote";
import { USPGrid } from "@/components/sections/USPGrid";
import { RegionBlock } from "@/components/sections/RegionBlock";
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

      <section id="ueber-mich" className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
        <RevealOnScroll>
          <div className="max-w-3xl mx-auto flex flex-col gap-6">
            <span className="font-body text-label-caps text-muted-text uppercase tracking-widest">{home.ueberMich.eyebrow}</span>
            <h2 className="font-display text-display-lg-mobile md:text-display-lg text-primary">{home.ueberMich.headline}</h2>
            <div className="flex flex-col gap-5 mt-4">
              {home.ueberMich.paragraphs.map((p, i) => (
                <p key={i} className="font-body text-body-lg text-on-surface-variant leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <section id="leistungen" className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap border-t border-border-taupe">
        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="md:col-span-4 flex flex-col gap-4">
              <span className="font-body text-label-caps text-muted-text uppercase tracking-widest">{home.leistungen.eyebrow}</span>
              <h2 className="font-display text-display-lg-mobile md:text-headline-md text-primary">{home.leistungen.headline}</h2>
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
              <p className="font-display italic text-body-lg text-primary border-t border-border-taupe pt-6 mt-2">
                {home.leistungen.schwerpunkt}
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <section id="region">
        <RevealOnScroll>
          <RegionBlock headline={home.region.headline} body={home.region.body} orte={home.region.orte} />
        </RevealOnScroll>
      </section>

      <RevealOnScroll>
        <TestimonialBlock quote={home.testimonial.quote} attribution={home.testimonial.attribution} />
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
