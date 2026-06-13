import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { IntroQuote } from "@/components/sections/IntroQuote";
import { USPGrid } from "@/components/sections/USPGrid";
import { TestimonialBlock } from "@/components/sections/TestimonialBlock";
import { ContactSection } from "@/components/sections/ContactSection";
import { ReferenzenCarousel } from "@/components/sections/ReferenzenCarousel";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHead } from "@/components/ui/SectionHead";
import { EditorialButton } from "@/components/ui/EditorialButton";
import { PresseSlideshow } from "@/components/ui/PresseSlideshow";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { IconStarFilled } from "@tabler/icons-react";
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
                <span className="font-body text-[10px] tracking-[0.32em] uppercase text-primary/80">Edith Voss · seit 1996</span>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
              <div className="md:col-span-10 md:col-start-2 flex flex-col gap-8">
                {/* Lead-Absatz — größer gesetzt für editorialen Einstieg */}
                <p className="font-display text-[22px] md:text-[26px] text-primary leading-snug max-w-3xl">
                  {home.ueberMich.paragraphs[0]}
                </p>
                {/* Restliche Absätze im zweispaltigen Fließtext */}
                <div className="md:columns-2 md:gap-gutter">
                  {home.ueberMich.paragraphs.slice(1).map((p, i) => (
                    <p
                      key={i}
                      className="font-body text-body-lg text-on-surface-variant leading-relaxed mb-5 break-inside-avoid"
                    >
                      {p}
                    </p>
                  ))}
                </div>
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
                <PresseSlideshow items={home.presse.images} />
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
            eyebrow={home.leistungen.eyebrow}
            headline={home.leistungen.headline}
            accentIndex={5}
            headlineClassName="text-display-lg-mobile md:text-headline-md"
          />
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter md:items-stretch">
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
            <div className="md:col-span-7 md:col-start-6 flex flex-col">
              <ul className="font-body text-body-lg text-on-surface-variant flex-1 flex flex-col justify-between gap-5 md:gap-0">
                {home.leistungen.items.map((item) => (
                  <li key={item} className="border-b border-border-taupe/60 py-3 first:pt-0 group">
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
              <BeforeAfterSlider
                beforeSrc="/images/home-staging-vorher-1200.jpg"
                afterSrc="/images/home-staging-nachher-1200.jpg"
                beforeAlt="Leerer Wohnraum vor dem Home Staging, kahle Wände und unmöblierter Boden"
                afterAlt="Derselbe Raum nach dem Home Staging, als moderne offene Wohnküche stilvoll inszeniert"
              />
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
            eyebrow={home.immobilien.eyebrow}
            headline={home.immobilien.headline}
            accentIndex={3}
          />
        </RevealOnScroll>
        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center mb-16">
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
        <RevealOnScroll>
          <div className="flex items-center gap-4 mb-8 mt-4">
            <span className="block h-px w-12 bg-primary/40" aria-hidden="true" />
            <h3 id="aktuelle-immobilien" className="font-body text-[11px] tracking-[0.36em] uppercase text-secondary scroll-mt-28">
              Aktuelle Immobilien
            </h3>
          </div>
        </RevealOnScroll>
        <RevealOnScroll>
          <ReferenzenCarousel items={home.immobilien.items} />
        </RevealOnScroll>

        {/* Referenzen — bereits verkaufte / vermittelte Objekte (ohne Links) */}
        <RevealOnScroll>
          <div className="mt-20 md:mt-28 pt-12 border-t border-border-taupe">
            <SectionHead
              eyebrow={home.referenzen.eyebrow}
              headline={home.referenzen.headline}
              accentIndex={1}
              headlineClassName="text-display-lg-mobile md:text-headline-md"
            />
            <p className="font-body text-body-md text-muted-text leading-relaxed max-w-2xl mb-10 -mt-4">
              {home.referenzen.intro}
            </p>
          </div>
        </RevealOnScroll>
        <RevealOnScroll>
          <ReferenzenCarousel items={home.referenzen.items} reference />
        </RevealOnScroll>
      </section>

      {/* ─────────────── V. REGION ─────────────── */}
      <section
        id="region"
        className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap border-t border-border-taupe"
      >
        <RevealOnScroll>
          <SectionHead
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
                {home.region.orte.map((ort) => (
                  <li key={ort} className="flex items-center gap-3">
                    <span className="block w-1.5 h-1.5 rounded-full bg-secondary shrink-0" aria-hidden="true" />
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

      {/* ─────────────── VI. ERFOLGSSCHLÜSSEL (Full-Editorial, full-bleed BG) ─────────────── */}
      <section
        id="erfolgsschluessel"
        className="relative w-full py-section-gap-mobile md:py-section-gap border-t border-border-taupe overflow-hidden"
      >
        <div className="bg-grain absolute inset-0 opacity-[0.04] mix-blend-multiply pointer-events-none" aria-hidden="true" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(45% 60% at 85% 20%, rgba(250,206,194,0.45) 0%, rgba(250,206,194,0) 70%), radial-gradient(50% 60% at 10% 80%, rgba(250,206,194,0.25) 0%, rgba(250,206,194,0) 65%)",
          }}
          aria-hidden="true"
        />

        <div className="relative w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <RevealOnScroll>
            <SectionHead
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-gutter gap-y-8">
              {home.erfolgsschluessel.items.map((item) => (
                <article
                  key={item.nr}
                  className="border-t border-primary/30 pt-8 md:pt-10 pb-6 md:pb-10 group"
                >
                  <h3 className="font-display text-headline-md text-primary leading-tight group-hover:text-secondary transition-colors duration-500">
                    {item.title}
                  </h3>
                </article>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─────────────── VII. TIPPGEBER ─────────────── */}
      <section
        id="tippgeber"
        className="w-full bg-zartrosa/30 border-y border-border-taupe"
      >
        <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
          <RevealOnScroll>
            <SectionHead
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
              {home.tippgeber.steps.map((step) => (
                <div
                  key={step.nr}
                  className="bg-surface border-t border-primary/30 pt-9 md:pt-10 pb-10 md:pb-12 px-7 md:px-9 flex flex-col gap-5"
                >
                  <div className="flex items-baseline gap-5">
                    <span className="text-[40px] md:text-[52px] leading-none text-secondary font-bold" aria-hidden="true">
                      ✓
                    </span>
                    <span className="font-body text-[14px] md:text-[16px] tracking-[0.28em] uppercase text-secondary/80 pb-2">
                      Schritt
                    </span>
                  </div>
                  <h3 className="font-display text-body-lg font-medium text-primary mt-3">
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
                      className="flex justify-between items-center px-8 md:px-10 py-5 font-body text-body-md"
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
                      <span className="text-[14px] text-secondary leading-none w-6 shrink-0 font-bold" aria-hidden="true">
                        ✓
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

      {/* ─────────────── VIII. KUNDENSTIMMEN ─────────────── */}
      <section
        id="bewertungen"
        className="w-full bg-surface-ivory border-y border-border-taupe"
      >
        <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
          <RevealOnScroll>
            <SectionHead
              eyebrow={home.kundenstimmen.eyebrow}
              headline={home.kundenstimmen.headline}
              accentIndex={2}
              align="left"
            />
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mt-2">
              {home.kundenstimmen.stimmen.map((s, idx) => (
                <figure
                  key={idx}
                  className="flex flex-col gap-6 bg-surface border border-border-taupe rounded-lg p-8 md:p-10"
                >
                  <div
                    className="flex items-center gap-1 text-secondary"
                    aria-label="5 von 5 Sternen"
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <IconStarFilled key={i} size={18} />
                    ))}
                  </div>
                  <blockquote className="font-display italic text-[clamp(1.1rem,1.8vw,1.45rem)] text-primary leading-snug flex-1">
                    &bdquo;{s.quote}&ldquo;
                  </blockquote>
                  <figcaption className="font-body text-label-caps text-muted-text uppercase tracking-widest border-t border-border-taupe pt-5">
                    {s.author}
                  </figcaption>
                </figure>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="flex flex-col items-center gap-6 mt-16 text-center">
              <p className="font-body text-body-md text-muted-text max-w-2xl italic">
                {home.kundenstimmen.googleHinweis}
              </p>
              {home.kundenstimmen.profilUrl !== "TODO_VON_EDITH" && (
                <EditorialButton variant="secondary" href={home.kundenstimmen.profilUrl} external>
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
              V.I.B. Voß Immobilien Beratung
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
