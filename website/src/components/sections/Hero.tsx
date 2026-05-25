"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

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

// Today's edition stamp — fixed at build, no Date() runtime
const EDITION = {
  vol: "VOL · XXIX",
  folio: "Folio · MMXXVI",
};

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
      className="relative w-full min-h-[100svh] overflow-hidden bg-background text-primary"
      aria-label="Hero"
    >
      {/* ── Atmospheric grain layer ── */}
      <div
        className="bg-grain absolute inset-0 opacity-[0.07] mix-blend-multiply pointer-events-none z-[5]"
        aria-hidden="true"
      />

      {/* ── Soft vignette glow from upper right (pink wash) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(80% 60% at 78% 18%, rgba(244,212,198,0.42) 0%, rgba(244,212,198,0) 60%)",
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
      <motion.div
        className="hidden md:block absolute top-0 bottom-0 left-[64px] w-px bg-primary/12 origin-top z-[6]"
        initial={shouldReduce ? { opacity: 0 } : { scaleY: 0 }}
        animate={shouldReduce ? { opacity: 1 } : { scaleY: 1 }}
        transition={{ duration: 1.6, ease: EASE_OUT, delay: 0.15 }}
        aria-hidden="true"
      />

      {/* ── Left vertical edition strip — desktop only ── */}
      <motion.div
        className="hidden md:flex absolute left-0 top-0 bottom-0 w-[64px] z-[7] flex-col items-center justify-between py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.5 }}
        aria-hidden="true"
      >
        <span className="font-body text-[10px] tracking-[0.35em] uppercase text-secondary [writing-mode:vertical-rl] rotate-180">
          {EDITION.vol}
        </span>
        <span className="font-display italic text-[18px] text-primary/70">
          v.i.b
        </span>
        <span className="font-body text-[10px] tracking-[0.35em] uppercase text-secondary [writing-mode:vertical-rl] rotate-180">
          {EDITION.folio}
        </span>
      </motion.div>

      {/* ── Right vertical caption strip (mirror) — desktop only ── */}
      <motion.div
        className="hidden lg:flex absolute right-6 top-0 bottom-0 z-[7] flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.6 }}
        aria-hidden="true"
      >
        <span className="font-body text-[10px] tracking-[0.45em] uppercase text-muted-text [writing-mode:vertical-rl]">
          Edith Voss · Rhein-Neckar · seit MCMXCVII
        </span>
      </motion.div>

      {/* ── Main composition ── */}
      <div className="relative z-10 w-full max-w-container-max mx-auto min-h-[100svh] pl-margin-mobile pr-margin-mobile md:pl-[120px] md:pr-margin-desktop pt-24 pb-16 md:pt-28 md:pb-20 flex flex-col">

        {/* ─── Top meta row: Roman numeral + eyebrow ─── */}
        <motion.div
          className="flex items-baseline gap-6 md:gap-10 mb-10 md:mb-14"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.4 }}
        >
          <span
            className="font-display italic text-[28px] md:text-[36px] leading-none text-primary"
            aria-hidden="true"
          >
            I.
          </span>
          <span className="block h-px w-12 md:w-24 bg-primary/40 self-center" aria-hidden="true" />
          {eyebrow && (
            <span className="font-body text-[10px] md:text-[11px] tracking-[0.36em] uppercase text-secondary">
              {eyebrow}
            </span>
          )}
        </motion.div>

        {/* ─── Hero composition: type + portrait pillar ─── */}
        <div className="relative flex-1 grid grid-cols-12 gap-x-4 md:gap-x-6 items-start">

          {/* ── Portrait pillar — asymmetric, right side, overlapping ── */}
          <motion.div
            className="hidden md:block col-start-9 col-span-4 lg:col-start-9 lg:col-span-4 relative h-[68vh] max-h-[640px] z-[3] -mt-4"
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 1.06, filter: "blur(14px)" }}
            animate={shouldReduce ? { opacity: 1 } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.8, ease: EASE_CINEMA, delay: 0.75 }}
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/images/portraet-edith-1600.jpg"
                alt="Edith Voss, Inhaberin V.I.B. Voß Immobilien Beratung"
                fill
                sizes="(min-width: 1280px) 38vw, 40vw"
                className="object-cover object-[60%_15%]"
                priority
              />
              {/* warm color-grade overlay */}
              <div
                className="absolute inset-0 mix-blend-soft-light pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(244,212,198,0.28) 0%, rgba(113,89,78,0.18) 100%)",
                }}
              />
              {/* bottom fade into cream */}
              <div
                className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, #fcf9f8 95%)",
                }}
              />
            </div>
            {/* caption ticker under portrait */}
            <div className="absolute -bottom-2 left-0 right-0 flex items-center gap-3">
              <span className="block h-px flex-1 bg-primary/25" />
              <span className="font-body text-[10px] tracking-[0.3em] uppercase text-secondary whitespace-nowrap">
                Edith Voss · Maklerin
              </span>
            </div>
          </motion.div>

          {/* ── Mobile: portrait below meta ── */}
          <div className="block md:hidden col-span-12 mb-8 relative">
            <motion.div
              className="relative w-full aspect-[4/5] overflow-hidden"
              initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 1.06, filter: "blur(10px)" }}
              animate={shouldReduce ? { opacity: 1 } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.6, ease: EASE_CINEMA, delay: 0.55 }}
            >
              <Image
                src="/images/portraet-edith-1600.jpg"
                alt="Edith Voss, Inhaberin V.I.B. Voß Immobilien Beratung"
                fill
                sizes="100vw"
                className="object-cover object-[60%_15%]"
                priority
              />
              <div
                className="absolute inset-0 mix-blend-soft-light pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(244,212,198,0.28) 0%, rgba(113,89,78,0.18) 100%)",
                }}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
                style={{
                  background: "linear-gradient(to bottom, transparent, #fcf9f8)",
                }}
              />
            </motion.div>
          </div>

          {/* ── HEADLINE TYPOGRAPHY ──
              Spans 9 cols, overlaps portrait. Three weighted lines.
              Middle word ("aus") is outlined for editorial tension.
              Words cascade with blur→sharp choreography. */}
          <h1
            className="col-span-12 md:col-start-1 md:col-span-10 lg:col-span-10 relative z-[4] font-display leading-[0.92] tracking-[-0.02em] text-primary"
            aria-label={headline}
          >
            <span className="sr-only">{headline}</span>
            <span
              className="block"
              aria-hidden="true"
              style={{ fontSize: "clamp(3rem, 11vw, 9.5rem)" }}
            >
              {words.map((word, i) => {
                const isOutlined = i === 1; // "aus"
                return (
                  <motion.span
                    key={`${word}-${i}`}
                    className={
                      "inline-block mr-[0.18em] " +
                      (isOutlined
                        ? "italic font-light text-edge-light"
                        : "")
                    }
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={wordVariants}
                  >
                    {word}
                    {i === 1 && (
                      <span className="inline-block w-[0.05em]" aria-hidden="true" />
                    )}
                  </motion.span>
                );
              })}
            </span>
          </h1>

          {/* ── Subline + accent + CTAs — sits below type, left-aligned ── */}
          <div className="col-span-12 md:col-start-1 md:col-span-7 lg:col-span-6 mt-10 md:mt-14 relative z-[4]">
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.85 }}
            >
              <motion.span
                className="block h-px bg-primary origin-left"
                initial={shouldReduce ? { width: 56 } : { width: 0 }}
                animate={{ width: 56 }}
                transition={{ duration: 0.9, ease: EASE_CINEMA, delay: 1.85 }}
                aria-hidden="true"
              />
              <span className="font-body text-[10px] tracking-[0.36em] uppercase text-secondary">
                · ein Versprechen
              </span>
            </motion.div>

            {subline && (
              <motion.p
                className="font-body text-[17px] md:text-[19px] leading-[1.55] text-on-surface-variant max-w-[58ch] mb-10"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: EASE_CINEMA, delay: 1.95 }}
              >
                {subline}
              </motion.p>
            )}

            {(primaryCta || secondaryCta) && (
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-12"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE_CINEMA, delay: 2.1 }}
              >
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className="group relative inline-flex items-center justify-center gap-3 px-9 py-[18px] bg-primary text-on-primary font-body text-[11px] tracking-[0.32em] uppercase overflow-hidden transition-all duration-500 hover:bg-secondary cursor-pointer"
                  >
                    <span className="relative z-10">{primaryCta.label}</span>
                    <span
                      className="relative z-10 block w-4 h-px bg-on-primary transition-all duration-500 group-hover:w-8"
                      aria-hidden="true"
                    />
                    <span
                      className="absolute inset-0 bg-zartrosa translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
                      aria-hidden="true"
                    />
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="group inline-flex items-center justify-center gap-3 px-9 py-[18px] border border-primary/80 text-primary font-body text-[11px] tracking-[0.32em] uppercase transition-all duration-500 hover:border-secondary hover:text-secondary cursor-pointer"
                  >
                    <span>{secondaryCta.label}</span>
                    <span
                      className="block w-4 h-px bg-primary group-hover:bg-secondary transition-all duration-500 group-hover:w-8"
                      aria-hidden="true"
                    />
                  </Link>
                )}
              </motion.div>
            )}
          </div>

          {/* ── Trust strip — bottom-right, magazine footer style ── */}
          {trustStrip && trustStrip.length > 0 && (
            <motion.div
              className="col-span-12 md:col-start-1 md:col-span-12 mt-8 md:mt-auto md:pt-10 relative z-[4]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: 2.3 }}
            >
              <div className="h-px w-full bg-primary/15 mb-5" aria-hidden="true" />
              <ul className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 lg:gap-12">
                {trustStrip.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 group"
                  >
                    <span
                      className="font-display italic text-[14px] text-secondary leading-none"
                      aria-hidden="true"
                    >
                      {["i", "ii", "iii", "iv", "v"][i] ?? String(i + 1)}.
                    </span>
                    <span className="font-body text-[11px] tracking-[0.24em] uppercase text-primary/80">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        {/* ─── Bottom-right edition mark ─── */}
        <motion.div
          className="hidden md:flex absolute bottom-6 right-margin-desktop items-center gap-3 z-[7]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 2.4, ease: EASE_OUT }}
          aria-hidden="true"
        >
          <span className="block w-8 h-px bg-primary/35" />
          <span className="font-body text-[10px] tracking-[0.36em] uppercase text-secondary">
            scroll · weiterlesen
          </span>
        </motion.div>
      </div>
    </section>
  );
}
