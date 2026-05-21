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

        <RevealOnScroll>
          <div className="mt-16 pt-12 border-t border-border-taupe grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
            <div className="md:col-span-7 flex flex-col gap-4 order-2 md:order-1">
              <span className="font-body text-label-caps text-muted-text uppercase tracking-widest">
                {home.presse.eyebrow}
              </span>
              <h3 className="font-display italic text-signature-quote text-primary">
                {home.presse.headline}
              </h3>
              <p className="font-body text-body-md text-muted-text leading-relaxed">
                {home.presse.zitat}
              </p>
            </div>
            <div className="md:col-span-4 md:col-start-9 order-1 md:order-2">
              <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-surface-container-low">
                <Image
                  src={home.presse.image.src}
                  alt={home.presse.image.alt}
                  fill
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-cover"
                />
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
        id="home-staging"
        className="w-full bg-surface-ivory border-y border-border-taupe"
      >
        <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
              <div className="flex flex-col gap-6">
                <span className="font-body text-label-caps text-muted-text uppercase tracking-widest">
                  {home.homeStaging.eyebrow}
                </span>
                <h2 className="font-display text-display-lg-mobile md:text-display-lg text-primary">
                  {home.homeStaging.headline}
                </h2>
                <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
                  {home.homeStaging.body}
                </p>
              </div>
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-surface-container-low">
                <Image
                  src={home.homeStaging.image.src}
                  alt={home.homeStaging.image.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </RevealOnScroll>
        </div>
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
        id="referenzen"
        className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap border-t border-border-taupe"
      >
        <RevealOnScroll>
          <div className="flex flex-col gap-6 max-w-3xl mb-12">
            <span className="font-body text-label-caps text-muted-text uppercase tracking-widest">
              {home.referenzen.eyebrow}
            </span>
            <h2 className="font-display text-display-lg-mobile md:text-display-lg text-primary">
              {home.referenzen.headline}
            </h2>
            <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
              {home.referenzen.body}
            </p>
            <p className="font-body text-body-md text-muted-text italic border-l-2 border-zartrosa pl-4">
              {home.referenzen.hinweis}
            </p>
          </div>
        </RevealOnScroll>
        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {home.referenzen.items.map((item) => (
              <article key={item.slug} className="flex flex-col gap-4">
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-surface-container-low">
                  <Image
                    src={item.image}
                    alt={item.titel}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-body-lg text-primary leading-tight">
                    {item.titel}
                  </h3>
                  <span className="font-body text-body-md text-muted-text">
                    {item.ort}
                  </span>
                </div>
              </article>
            ))}
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

      <section
        id="tippgeber"
        className="w-full bg-zartrosa/30 border-y border-border-taupe"
      >
        <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
          <RevealOnScroll>
            <div className="flex flex-col gap-6 max-w-3xl mb-12">
              <span className="font-body text-label-caps text-muted-text uppercase tracking-widest">
                {home.tippgeber.eyebrow}
              </span>
              <h2 className="font-display text-display-lg-mobile md:text-display-lg text-primary">
                {home.tippgeber.headline}
              </h2>
              <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
                {home.tippgeber.body}
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-12">
              {home.tippgeber.steps.map((step) => (
                <div
                  key={step.nr}
                  className="bg-surface border border-border-taupe rounded-lg p-8 flex flex-col gap-4"
                >
                  <span className="font-display text-headline-md text-secondary">
                    {step.nr}
                  </span>
                  <h3 className="font-display text-body-lg font-medium text-primary">
                    {step.title}
                  </h3>
                  <p className="font-body text-body-md text-muted-text leading-relaxed">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
              <div className="md:col-span-7">
                <p className="font-body text-label-caps text-muted-text uppercase tracking-widest mb-4">
                  {home.tippgeber.staffelHinweis}
                </p>
                <ul className="bg-surface border border-border-taupe rounded-lg divide-y divide-border-taupe">
                  {home.tippgeber.staffel.map((row) => (
                    <li
                      key={row.range}
                      className="flex justify-between items-center px-6 py-4 font-body text-body-md"
                    >
                      <span className="text-on-surface-variant">{row.range}</span>
                      <span className="font-display text-primary">{row.provision}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-5 flex flex-col gap-6">
                <ul className="space-y-3 font-body text-body-md text-muted-text">
                  {home.tippgeber.bedingungen.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-secondary mt-1.5">—</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={home.tippgeber.cta.href}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-body text-label-caps tracking-widest bg-primary text-on-primary hover:bg-secondary transition-colors duration-300 mt-2"
                >
                  {home.tippgeber.cta.label}
                </a>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <RevealOnScroll>
        <TestimonialBlock
          quote={home.testimonial.quote}
          attribution={home.testimonial.attribution}
        />
      </RevealOnScroll>

      <section
        id="bewertungen"
        className="w-full bg-surface-ivory border-y border-border-taupe"
      >
        <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
          <RevealOnScroll>
            <div className="flex flex-col items-center gap-4 text-center max-w-2xl mx-auto mb-12">
              <span className="font-body text-label-caps text-muted-text uppercase tracking-widest">
                {home.google.eyebrow}
              </span>
              <h2 className="font-display text-display-lg-mobile md:text-display-lg text-primary">
                {home.google.headline}
              </h2>
              <div className="flex flex-col items-center gap-3 mt-4">
                <span className="font-display text-headline-md text-primary">
                  {home.google.ratingLabel}
                </span>
                <div className="flex items-center gap-3">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Google"
                  >
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                  </svg>
                  <span className="font-display text-display-lg-mobile md:text-display-lg text-primary leading-none">
                    {home.google.rating}
                  </span>
                  <div className="flex" aria-label={`${home.google.rating} von 5 Sternen`}>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#FBBC04" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <span className="font-body text-body-md text-muted-text">
                  Basierend auf {home.google.bewertungen === "TODO" ? "[TODO: Anzahl Bewertungen]" : home.google.bewertungen} Google-Bewertungen
                </span>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {home.google.reviews.map((review, idx) => (
                <article
                  key={idx}
                  className="bg-surface border border-border-taupe rounded-lg p-8 flex flex-col gap-4"
                >
                  <div className="flex gap-1" aria-label="5 von 5 Sternen">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FBBC04" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                    &bdquo;{review.quote}&ldquo;
                  </p>
                  <span className="font-body text-label-caps text-muted-text uppercase tracking-widest mt-auto">
                    {review.author}
                  </span>
                </article>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="flex flex-col items-center gap-4 mt-12 text-center">
              <p className="font-body text-body-md text-muted-text max-w-2xl italic">
                {home.google.hinweis}
              </p>
              {home.google.profilUrl !== "TODO_VON_EDITH" && (
                <a
                  href={home.google.profilUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-body text-label-caps tracking-widest bg-transparent border border-primary text-primary hover:bg-surface-container-low transition-colors duration-300"
                >
                  Alle Google-Bewertungen ansehen
                </a>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </section>

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
