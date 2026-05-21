import { Hero } from "@/components/sections/Hero";
import { IntroQuote } from "@/components/sections/IntroQuote";
import { USPGrid } from "@/components/sections/USPGrid";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { HomeStagingSpotlight } from "@/components/sections/HomeStagingSpotlight";
import { RegionBlock } from "@/components/sections/RegionBlock";
import { TestimonialBlock } from "@/components/sections/TestimonialBlock";
import { CTABlock } from "@/components/sections/CTABlock";
import { ImmobilienFallback } from "@/components/sections/ImmobilienFallback";
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
      />
      <RevealOnScroll>
        <IntroQuote body={home.intro.body} />
      </RevealOnScroll>
      <RevealOnScroll>
        <USPGrid items={home.usps} />
      </RevealOnScroll>
      <RevealOnScroll>
        <ImmobilienFallback />
      </RevealOnScroll>
      <RevealOnScroll>
        <ServiceGrid services={home.services} columns={3} />
      </RevealOnScroll>
      <RevealOnScroll>
        <HomeStagingSpotlight
          eyebrow={home.homeStaging.eyebrow}
          headline={home.homeStaging.headline}
          body={home.homeStaging.body}
        />
      </RevealOnScroll>
      <RevealOnScroll>
        <RegionBlock
          headline={home.region.headline}
          body={home.region.body}
          orte={home.region.orte}
        />
      </RevealOnScroll>
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
    </>
  );
}
