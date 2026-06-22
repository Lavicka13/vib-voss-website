"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EditorialButton } from "@/components/ui/EditorialButton";

type CTA = { label: string; href: string };

type ImageProp = {
  src: string;
  alt: string;
};

type Props = {
  eyebrow?: string;
  headline: string;
  subline?: string;
  primaryCta?: CTA;
  secondaryCta?: CTA;
  trustStrip?: readonly string[];
  image?: ImageProp;
};

// Slow cinematic ease — deep curve for premium reveal
const EASE_CINEMA: [number, number, number, number] = [0.16, 0.84, 0.24, 1];
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Index des Worts in der Headline, das auf Desktop als Outline gesetzt wird ("aus")
const ACCENT_WORD = 1;

/**
 * Editorial Cinema Hero
 *
 * Concept: Magazine-cover composition. Type-as-architecture.
 * The headline does not sit in a column — it dominates the page,
 * fragmented in three weighted lines, an outlined word for tension,
 * with the portrait floating in an asymmetric pillar that overlaps
 * the type. Vertical issue-strip on the left like a real cover.
 *
 * Choreography (~2.6s total):
 *   0.00 — hairline rules grow from top
 *   0.20 — vertical edition strip fades in
 *   0.40 — Roman numeral marker drops
 *   0.55 — eyebrow line reveals
 *   0.75 — portrait blurs in, slow scale
 *   0.90 — headline cascades word-by-word, blur→sharp
 *   1.80 — subline + accent rule
 *   2.10 — CTA pair lifts
 *   2.30 — trust strip
 */
export function Hero({
  eyebrow,
  headline,
  subline,
  primaryCta,
  secondaryCta,
  trustStrip,
}: Props) {
  const shouldReduce = useReducedMotion();

  const words = headline.split(" ");

  const fxFull: Variants = {
    hidden: { opacity: 0, y: 14, filter: "blur(10px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.1, ease: EASE_CINEMA, delay: 0.9 + i * 0.11 },
    }),
  };

  const fxReduced: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const wordVariants = shouldReduce ? fxReduced : fxFull;

  return (
    <section
      className="relative w-full min-h-[100svh] md:min-h-0 md:h-[calc(100svh-5.5rem)] overflow-hidden bg-background text-primary"
      aria-label="Hero"
    >
      {/* ── Architectural atmosphere: classical stucco + arch, right-aligned ── */}
      <div
        className="hidden md:block absolute inset-y-0 right-0 w-[60%] lg:w-[55%] xl:w-[50%] z-[1] pointer-events-none select-none"
        aria-hidden="true"
      >
        <Image
          src="/images/ueber-mich-architecture-1600.jpg"
          alt=""
          fill
          sizes="(min-width: 1280px) 640px, (min-width: 768px) 50vw, 0vw"
          priority
          className="object-cover object-center opacity-[0.32]"
        />
        {/* Left-edge fade: image dissolves into background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--color-background) 0%, rgba(252,249,248,0.85) 18%, rgba(252,249,248,0.25) 45%, transparent 70%)",
          }}
        />
        {/* Bottom fade for type closer area */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background:
              "linear-gradient(to top, rgba(252,249,248,0.9) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Atmospheric grain layer ── */}
      <div
        className="bg-grain absolute inset-0 opacity-[0.07] mix-blend-multiply pointer-events-none z-[5]"
        aria-hidden="true"
      />

      {/* ── Soft vignette glow from upper right (logo-rose wash, tints the arch) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(80% 60% at 78% 18%, rgba(250,206,194,0.42) 0%, rgba(250,206,194,0) 60%)",
        }}
        aria-hidden="true"
      />

      {/* ── Hairline rules (top, left, right edges) ── */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-primary/15 origin-left z-[6]"
        initial={shouldReduce ? { opacity: 0 } : { scaleX: 0 }}
        animate={shouldReduce ? { opacity: 1 } : { scaleX: 1 }}
        transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.0 }}
        aria-hidden="true"
      />
      {/* ── Transparentes creme-Logo als dezenter Watermark, links mittig ── */}
      <motion.div
        className="hidden md:flex absolute left-0 top-0 bottom-0 w-[120px] lg:w-[140px] z-[3] flex-col items-center justify-center pointer-events-none select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.5 }}
        aria-hidden="true"
      >
        <Image
          src="/images/logo/logo-creme-720.png"
          alt=""
          width={157}
          height={240}
          priority
          className="w-20 lg:w-24 h-auto opacity-70 select-none"
        />
      </motion.div>

      {/* ── Main composition ── */}
      <div className="relative z-10 w-full max-w-container-max mx-auto min-h-[100svh] md:min-h-0 md:h-full pl-margin-mobile pr-margin-mobile md:pl-[120px] md:pr-margin-desktop pt-24 pb-16 md:pt-16 md:pb-8 flex flex-col">

        {/* ─── Eyebrow row ─── */}
        {eyebrow && (
          <motion.div
            className="flex items-center gap-4 mb-8 md:mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.4 }}
          >
            <motion.span
              className="block h-px bg-primary/40 origin-left"
              initial={shouldReduce ? { width: 48, opacity: 1 } : { width: 0, opacity: 0 }}
              animate={{ width: 48, opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.45 }}
              aria-hidden="true"
            />
            <span className="font-body text-[10px] md:text-[11px] tracking-[0.36em] uppercase text-secondary">
              {eyebrow}
            </span>
          </motion.div>
        )}

        {/* ─── Hero composition: type + portrait pillar ─── */}
        <div className="relative flex-1 flex flex-col">

          {/* ── HEADLINE TYPOGRAPHY ──
              Spans 9 cols, overlaps portrait. Three weighted lines.
              Middle word ("aus") is outlined for editorial tension.
              Words cascade with blur→sharp choreography. */}
          <h1
            className="w-full relative z-[4] font-display leading-[0.92] tracking-[-0.02em] text-primary"
            aria-label={headline}
          >
            <span className="sr-only">{headline}</span>
            <span
              className="block"
              aria-hidden="true"
              style={{ fontSize: "clamp(2.5rem, 8vw, 6.5rem)" }}
            >
              {words.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  className={
                    "inline-block mr-[0.18em] " +
                    // Akzentwort ("aus"): mobil solide & sichtbar, ab md als eleganter Outline.
                    (i === ACCENT_WORD
                      ? "italic font-light md:text-transparent md:[-webkit-text-stroke:1px_rgba(0,0,0,0.92)]"
                      : "")
                  }
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={wordVariants}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* ── Subline + accent + CTAs — sits below type, left-aligned ── */}
          <div className="w-full md:max-w-[58%] lg:max-w-[50%] mt-8 md:mt-6 relative z-[4]">
            {subline && (
              <motion.p
                className="font-body text-[17px] md:text-[19px] leading-[1.55] text-on-surface-variant max-w-[58ch] mb-8 md:mb-6"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: EASE_CINEMA, delay: 1.95 }}
              >
                {subline}
              </motion.p>
            )}

            {(primaryCta || secondaryCta) && (
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-8 md:mb-4"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE_CINEMA, delay: 2.1 }}
              >
                {primaryCta && (
                  <EditorialButton variant="primary" href={primaryCta.href}>
                    {primaryCta.label}
                  </EditorialButton>
                )}
                {secondaryCta && (
                  <EditorialButton variant="secondary" href={secondaryCta.href}>
                    {secondaryCta.label}
                  </EditorialButton>
                )}
              </motion.div>
            )}
          </div>

          {/* ── Trust strip — bottom row with logo closer on the right ── */}
          {trustStrip && trustStrip.length > 0 && (
            <motion.div
              className="w-full mt-8 md:mt-auto md:pt-4 relative z-[4]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: 2.3 }}
            >
              <div className="h-px w-full bg-primary/15 mb-5" aria-hidden="true" />
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
                <ul className="flex flex-wrap items-center gap-3">
                  {trustStrip.map((item) => (
                    <li
                      key={item}
                      className="bg-zartrosa px-[15px] py-[5px]"
                    >
                      <span className="font-body text-[11px] tracking-[0.24em] uppercase text-primary/80">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <motion.div
                  className="flex items-center gap-4 self-center md:self-end shrink-0"
                  initial={shouldReduce ? { opacity: 0 } : { opacity: 0, x: 12 }}
                  animate={shouldReduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 1.0, ease: EASE_CINEMA, delay: 2.45 }}
                  aria-hidden="true"
                >
                  <span className="font-body text-[10px] tracking-[0.4em] uppercase text-secondary/80 leading-[1.7] text-right">
                    Persönlich
                    <br />
                    Diskret
                  </span>
                  <span className="block w-px h-10 bg-primary/30" />
                  <Image
                    src="/images/logo/logo-mono-480.png"
                    alt="V.I.B."
                    width={157}
                    height={240}
                    priority
                    className="h-12 lg:h-14 w-auto select-none"
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
