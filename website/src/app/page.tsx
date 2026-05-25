import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { IntroQuote } from "@/components/sections/IntroQuote";
import { USPGrid } from "@/components/sections/USPGrid";
import { TestimonialBlock } from "@/components/sections/TestimonialBlock";
import { CTABlock } from "@/components/sections/CTABlock";
import { ContactSection } from "@/components/sections/ContactSection";
import { ReferenzenCarousel } from "@/components/sections/ReferenzenCarousel";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHead } from "@/components/ui/SectionHead";
import { EditorialButton } from "@/components/ui/EditorialButton";
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

      {/* ─────────────── II. ÜBER MICH (Full-Editorial Hero-Echo) ─────────────── */}
      <section
        id="ueber-mich"
        className="relative w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap"
      >
        {/* grain layer + soft pink vignette */}
        <div className="bg-grain absolute inset-0 opacity-[0.04] mix-blend-multiply pointer-events-none" aria-hidden="true" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 50% at 12% 18%, rgba(244,212,198,0.28) 0%, rgba(244,212,198,0) 65%)",
          }}
          aria-hidden="true"
        />

        <div className="relative">
          <RevealOnScroll>
            <SectionHead
              numeral="II"
              eyebrow={home.ueberMich.eyebrow}
              headline={home.ueberMich.headline}
              accentIndex={1}
              headlineClassName="text-[clamp(2.5rem,8vw,5.5rem)]"
            />
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="relative w-full aspect-[2/1] md:aspect-[21/9] overflow-hidden bg-surface-container-low mb-12 md:mb-16">
              <Image
                src="/images/portraet-edith-1600.jpg"
                alt="Edith Voss, Inhaberin V.I.B. Voß Immobilien Beratung"
                fill
                sizes="(min-width: 1280px) 1280px, 100vw"
                className="object-cover object-top"
                priority
              />
              {/* corner edition marker */}
              <div className="absolute bottom-4 right-4 flex items-center gap-3 bg-background/85 px-4 py-2 backdrop-blur-sm">
                <span className="font-display italic text-[14px] text-secondary leading-none" aria-hidden="true">II.</span>
                <span className="font-body text-[10px] tracking-[0.32em] uppercase text-primary/80">Edith Voss · seit MCMXCVII</span>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
              <div className="md:col-span-4 md:col-start-1 hidden md:block">
                <div className="font-display italic text-secondary text-[80px] lg:text-[120px] leading-none opacity-30 select-none -mt-4">
                  &mdash;
                </div>
                <span className="font-body text-[10px] tracking-[0.4em] uppercase text-secondary/70 block mt-4">
                  Ein Versprechen
                </span>
              </div>
              <div className="md:col-span-7 md:col-start-6 flex flex-col gap-5">
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
          </RevealOnScroll>

          {/* Presse block — nested into Über-Mich chapter */}
          <RevealOnScroll>
            <div className="mt-16 md:mt-20 pt-12 border-t border-border-taupe grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
              <div className="md:col-span-7 flex flex-col gap-4 order-2 md:order-1">
                <div className="flex items-center gap-4 mb-2">
                  <span className="block h-px w-12 bg-primary/40" aria-hidden="true" />
                  <span className="font-body text-[10px] tracking-[0.36em] uppercase text-secondary">
                    {home.presse.eyebrow}
                  </span>
                </div>
                <h3 className="font-display italic text-signature-quote text-primary">
                  {home.presse.headline}
                </h3>
                <p className="font-body text-body-md text-muted-text leading-relaxed">
                  {home.presse.zitat}
                </p>
              </div>
              <div className="md:col-span-12 order-1 md:order-2 mt-8">
                <div className="relative w-full overflow-hidden">
                  <Image
                    src={home.presse.image.src}
                    alt={home.presse.image.alt}
                    width={1600}
                    height={970}
                    sizes="(min-width: 1280px) 1200px, 100vw"
                    className="w-full h-auto block"
                  />
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─────────────── III. LEISTUNGEN ─────────────── */}
      <section
        id="leistungen"
        className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap border-t border-border-taupe"
      >
        <RevealOnScroll>
          <SectionHead
            numeral="III"
            eyebrow={home.leistungen.eyebrow}
            headline={home.leistungen.headline}
            accentIndex={5}
            headlineClassName="text-display-lg-mobile md:text-headline-md"
          />
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="md:col-span-4 hidden md:block">
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-container-low">
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
              <ul className="space-y-4 font-body text-body-lg text-on-surface-variant">
                {home.leistungen.items.map((item, i) => (
                  <li key={item} className="flex items-baseline gap-4 group">
                    <span className="font-display italic text-[13px] text-secondary leading-none w-8 shrink-0" aria-hidden="true">
                      {romanize(i + 1).toLowerCase()}.
                    </span>
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* ─────────────── Home Staging — Interlude (kein Numeral) ─────────────── */}
      <section
        id="home-staging"
        className="w-full bg-surface-ivory border-y border-border-taupe"
      >
        <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <span className="block h-px w-12 bg-primary/40" aria-hidden="true" />
                  <span className="font-body text-[10px] tracking-[0.36em] uppercase text-secondary">
                    {home.homeStaging.eyebrow}
                  </span>
                </div>
                <h2 className="font-display text-display-lg-mobile md:text-display-lg text-primary leading-[0.95]">
                  {home.homeStaging.headline}
                </h2>
                <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
                  {home.homeStaging.body}
                </p>
              </div>
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-container-low">
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

      {/* ─────────────── IV. IMMOBILIEN ─────────────── */}
      <section
        id="immobilien"
        className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap border-t border-border-taupe"
      >
        <RevealOnScroll>
          <SectionHead
            numeral="IV"
            eyebrow={home.immobilien.eyebrow}
            headline={home.immobilien.headline}
            accentIndex={3}
          />
        </RevealOnScroll>
        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
            <div className="relative w-full aspect-[4/5] md:aspect-[4/5] overflow-hidden bg-surface-container-low order-2 md:order-1">
              <Image
                src="/images/immobiliensuche-decor-1600.jpg"
                alt="Lichtdurchflutetes Premium-Interieur — Atmosphäre der Objekte aus dem Off-Market-Netzwerk"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-6 order-1 md:order-2">
              <div className="flex flex-col gap-5">
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
                <EditorialButton variant="primary" href={home.immobilien.ctaVerkauf.href}>
                  {home.immobilien.ctaVerkauf.label}
                </EditorialButton>
                <EditorialButton variant="secondary" href={home.immobilien.ctaKauf.href}>
                  {home.immobilien.ctaKauf.label}
                </EditorialButton>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* ─────────────── V. REFERENZEN ─────────────── */}
      <section
        id="referenzen"
        className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap border-t border-border-taupe"
      >
        <RevealOnScroll>
          <SectionHead
            numeral="V"
            eyebrow={home.referenzen.eyebrow}
            headline={home.referenzen.headline}
            accentIndex={3}
          />
        </RevealOnScroll>
        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-12">
            <div className="md:col-span-7 md:col-start-2">
              <p className="font-body text-body-lg text-on-surface-variant leading-relaxed mb-5">
                {home.referenzen.body}
              </p>
              <p className="font-body text-body-md text-muted-text italic border-l-2 border-zartrosa pl-4">
                {home.referenzen.hinweis}
              </p>
            </div>
          </div>
        </RevealOnScroll>
        <RevealOnScroll>
          <ReferenzenCarousel items={home.referenzen.items} />
        </RevealOnScroll>
      </section>

      {/* ─────────────── VI. REGION ─────────────── */}
      <section
        id="region"
        className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap border-t border-border-taupe"
      >
        <RevealOnScroll>
          <SectionHead
            numeral="VI"
            eyebrow="Tätigkeitsgebiet"
            headline={home.region.headline}
            accentIndex={2}
          />
        </RevealOnScroll>
        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
            <div className="flex flex-col gap-6">
              <p className="font-body text-body-lg text-muted-text leading-relaxed">
                {home.region.body}
              </p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 font-body text-body-md text-primary mt-2">
                {home.region.orte.map((ort, i) => (
                  <li key={ort} className="flex items-baseline gap-3">
                    <span className="font-display italic text-[12px] text-secondary leading-none w-6 shrink-0" aria-hidden="true">
                      {romanize(i + 1).toLowerCase()}.
                    </span>
                    <span>{ort}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-surface-container-low">
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

      {/* ─────────────── VII. ERFOLGSSCHLÜSSEL (Full-Editorial) ─────────────── */}
      <section
        id="erfolgsschluessel"
        className="relative w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap border-t border-border-taupe"
      >
        <div className="bg-grain absolute inset-0 opacity-[0.04] mix-blend-multiply pointer-events-none" aria-hidden="true" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 50% at 88% 18%, rgba(244,212,198,0.32) 0%, rgba(244,212,198,0) 65%)",
          }}
          aria-hidden="true"
        />

        <div className="relative">
          <RevealOnScroll>
            <SectionHead
              numeral="VII"
              eyebrow={home.erfolgsschluessel.eyebrow}
              headline={home.erfolgsschluessel.headline}
              accentIndex={3}
            />
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-12 md:mb-16">
              <p className="font-body text-body-lg text-on-surface-variant leading-relaxed md:col-span-7 md:col-start-6 max-w-2xl">
                {home.erfolgsschluessel.body}
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-gutter">
              {home.erfolgsschluessel.items.map((item, i) => (
                <article
                  key={item.nr}
                  className="border-t border-primary/30 pt-6 pb-8 flex flex-col gap-4 group"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-display italic text-[60px] md:text-[80px] leading-none text-primary group-hover:text-secondary transition-colors duration-500">
                      {romanize(i + 1)}.
                    </span>
                    <span className="font-body text-[10px] tracking-[0.32em] uppercase text-secondary/70">
                      .{String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display text-headline-md text-primary leading-tight mt-2">
                    {item.title}
                  </h3>
                </article>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─────────────── VIII. TIPPGEBER ─────────────── */}
      <section
        id="tippgeber"
        className="w-full bg-zartrosa/30 border-y border-border-taupe"
      >
        <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
          <RevealOnScroll>
            <SectionHead
              numeral="VIII"
              eyebrow={home.tippgeber.eyebrow}
              headline={home.tippgeber.headline}
              accentIndex={4}
            />
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-12">
              <p className="font-body text-body-lg text-on-surface-variant leading-relaxed md:col-span-7 md:col-start-6">
                {home.tippgeber.body}
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-12">
              {home.tippgeber.steps.map((step, i) => (
                <div
                  key={step.nr}
                  className="bg-surface border-t border-primary/30 pt-6 pb-8 px-2 flex flex-col gap-4"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-display italic text-[48px] md:text-[64px] leading-none text-primary">
                      {romanize(i + 1)}.
                    </span>
                    <span className="font-body text-[10px] tracking-[0.32em] uppercase text-secondary/70">
                      Schritt
                    </span>
                  </div>
                  <h3 className="font-display text-body-lg font-medium text-primary mt-2">
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
                <ul className="bg-surface border-t border-b border-primary/30 divide-y divide-border-taupe">
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
                    <li key={i} className="flex items-baseline gap-3">
                      <span className="font-display italic text-[12px] text-secondary leading-none w-6 shrink-0" aria-hidden="true">
                        {romanize(i + 1).toLowerCase()}.
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2">
                  <EditorialButton variant="primary" href={home.tippgeber.cta.href}>
                    {home.tippgeber.cta.label}
                  </EditorialButton>
                </div>
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

      {/* ─────────────── IX. BEWERTUNGEN ─────────────── */}
      <section
        id="bewertungen"
        className="w-full bg-surface-ivory border-y border-border-taupe"
      >
        <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
          <RevealOnScroll>
            <SectionHead
              numeral="IX"
              eyebrow={home.google.eyebrow}
              headline={home.google.headline}
              accentIndex={2}
              align="center"
            />
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="flex flex-col items-center gap-3 mb-12">
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
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-gutter gap-y-10">
              {home.google.reviews.map((review, idx) => (
                <article
                  key={idx}
                  className="border-t border-primary/30 pt-6 flex flex-col gap-4"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-display italic text-[42px] leading-none text-primary">
                      {romanize(idx + 1)}.
                    </span>
                    <div className="flex gap-1" aria-label="5 von 5 Sternen">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FBBC04" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
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
            <div className="flex flex-col items-center gap-6 mt-16 text-center">
              <p className="font-body text-body-md text-muted-text max-w-2xl italic">
                {home.google.hinweis}
              </p>
              {home.google.profilUrl !== "TODO_VON_EDITH" && (
                <EditorialButton variant="secondary" href={home.google.profilUrl} external>
                  Alle Google-Bewertungen ansehen
                </EditorialButton>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <RevealOnScroll>
        <ContactSection />
      </RevealOnScroll>

      <CTABlock headline={home.cta.headline} sub={home.cta.sub} />

      {/* ─────────────── XI. SCHLUSS (Hero-Echo) ─────────────── */}
      <section className="relative w-full overflow-hidden border-t border-border-taupe">
        <div className="bg-grain absolute inset-0 opacity-[0.05] mix-blend-multiply pointer-events-none" aria-hidden="true" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(70% 60% at 50% 30%, rgba(244,212,198,0.35) 0%, rgba(244,212,198,0) 65%)",
          }}
          aria-hidden="true"
        />
        <div className="relative w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="block h-px w-12 bg-primary/40" aria-hidden="true" />
            <span className="font-body text-[10px] tracking-[0.4em] uppercase text-secondary">
              Coda · Folio MMXXVI
            </span>
            <span className="block h-px w-12 bg-primary/40" aria-hidden="true" />
          </div>
          <p
            className="font-display text-primary max-w-3xl mx-auto leading-[0.95]"
            style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
          >
            <span className="italic">{home.cta.schluss.split(" — ")[0]}</span>
            {home.cta.schluss.includes(" — ") && (
              <>
                <span className="block my-3 h-px w-16 bg-primary/40 mx-auto" aria-hidden="true" />
                <span className="text-edge-light italic font-light">
                  {home.cta.schluss.split(" — ")[1]}
                </span>
              </>
            )}
          </p>
          <div className="mt-10 flex items-center justify-center gap-3 font-body text-[10px] tracking-[0.4em] uppercase text-secondary/80">
            <span className="font-display italic text-[14px] text-secondary not-italic-on-hover">·</span>
            <span>V.I.B. Voß Immobilien Beratung</span>
            <span className="font-display italic text-[14px] text-secondary">·</span>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Compact roman numeralizer for 1–20 — sufficient for any list length on this page.
 */
function romanize(n: number): string {
  const map: Record<number, string> = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
    8: "VIII",
    9: "IX",
    10: "X",
    11: "XI",
    12: "XII",
    13: "XIII",
    14: "XIV",
    15: "XV",
    16: "XVI",
    17: "XVII",
    18: "XVIII",
    19: "XIX",
    20: "XX",
  };
  return map[n] ?? String(n);
}
