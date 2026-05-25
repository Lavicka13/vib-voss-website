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

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const VARIANTS_FULL = {
  container: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  } satisfies Variants,
  item: {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
  } satisfies Variants,
  line: {
    hidden: { scaleX: 0, originX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.9, delay: 0.05, ease: EASE } },
  } satisfies Variants,
  image: {
    hidden: { opacity: 0, scale: 1.04 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: EASE } },
  } satisfies Variants,
};

const VARIANTS_REDUCED = {
  container: { hidden: {}, visible: {} } satisfies Variants,
  item: { hidden: { opacity: 0 }, visible: { opacity: 1 } } satisfies Variants,
  line: { hidden: { opacity: 0 }, visible: { opacity: 1 } } satisfies Variants,
  image: { hidden: { opacity: 0 }, visible: { opacity: 1 } } satisfies Variants,
};

function useVariants(reduced: boolean | null) {
  return reduced ? VARIANTS_REDUCED : VARIANTS_FULL;
}

export function Hero({
  eyebrow,
  headline,
  subline,
  primaryCta,
  secondaryCta,
  trustStrip,
}: Props) {
  const shouldReduce = useReducedMotion();
  const v = useVariants(shouldReduce);

  return (
    <section
      className="relative w-full min-h-[92svh] md:min-h-[90svh] flex flex-col overflow-hidden bg-background"
      aria-label="Hero"
    >
      {/* Mobile atmosphere image — full bleed, top portion */}
      <div className="relative block md:hidden w-full h-[45svh] flex-shrink-0 overflow-hidden">
        <Image
          src="/images/hero-interior-1600.jpg"
          alt="Stilvoll inszeniertes, lichtdurchflutetes Wohnzimmer — symbolisch für die exklusiven Immobilien, die Edith Voss vermittelt"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        {/* Bottom gradient fading into background */}
        <div
          className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, #fcf9f8)",
          }}
        />
      </div>

      {/* Main layout: text + desktop portrait */}
      <div className="flex-1 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:grid md:grid-cols-[1fr_420px] lg:grid-cols-[1fr_500px] gap-0 items-stretch">

        {/* ── Text column ── */}
        <motion.div
          className="flex flex-col justify-center py-12 md:py-section-gap pr-0 md:pr-16 lg:pr-24"
          variants={v.container}
          initial="hidden"
          animate="visible"
        >
          {/* Editorial marker */}
          <motion.div
            className="flex items-center gap-4 mb-8 md:mb-10"
            variants={v.item}
          >
            <span className="font-body text-label-caps text-secondary tracking-[0.2em] uppercase">
              No&thinsp;01
            </span>
            <motion.span
              className="block h-px flex-1 max-w-[48px] bg-zartrosa"
              variants={v.line}
            />
            {eyebrow && (
              <span className="font-body text-label-caps text-muted-text tracking-[0.15em] uppercase">
                {eyebrow}
              </span>
            )}
          </motion.div>

          {/* Headline — Playfair Display, large */}
          <motion.h1
            className="font-display text-display-lg-mobile md:text-display-lg text-primary leading-[1.08] tracking-[-0.01em] mb-6 md:mb-8"
            variants={v.item}
          >
            {headline}
          </motion.h1>

          {/* Zartrosa accent rule */}
          <motion.div
            className="w-12 h-px bg-zartrosa mb-6 md:mb-8"
            variants={v.line}
          />

          {/* Subline */}
          {subline && (
            <motion.p
              className="font-body text-body-lg text-on-surface-variant leading-relaxed max-w-[52ch] mb-10 md:mb-12"
              variants={v.item}
            >
              {subline}
            </motion.p>
          )}

          {/* CTAs */}
          {(primaryCta || secondaryCta) && (
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-12 md:mb-16"
              variants={v.item}
            >
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-on-primary font-body text-label-caps tracking-widest transition-all duration-300 hover:bg-secondary hover:tracking-[0.22em]"
                >
                  {primaryCta.label}
                  <span
                    className="block w-4 h-px bg-on-primary transition-all duration-300 group-hover:w-6"
                    aria-hidden="true"
                  />
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-primary text-primary font-body text-label-caps tracking-widest transition-colors duration-300 hover:border-secondary hover:text-secondary"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </motion.div>
          )}

          {/* Trust strip — vertical list, editorial */}
          {trustStrip && trustStrip.length > 0 && (
            <motion.ul
              className="flex flex-col gap-3 pt-8 border-t border-border-taupe"
              variants={v.item}
            >
              {trustStrip.map((item, i) => (
                <li key={item} className="flex items-center gap-3">
                  <span
                    className="font-body text-label-caps text-zartrosa tracking-[0.18em]"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-body text-label-caps text-muted-text uppercase tracking-[0.15em]">
                    {item}
                  </span>
                </li>
              ))}
            </motion.ul>
          )}
        </motion.div>

        {/* ── Portrait column — desktop only ── */}
        <motion.div
          className="hidden md:block relative self-stretch overflow-hidden"
          variants={v.image}
          initial="hidden"
          animate="visible"
        >
          {/* Subtle warm overlay so portrait doesn't fight with content */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, #fcf9f8 0%, transparent 12%)",
            }}
          />
          <Image
            src="/images/portraet-edith-1600.jpg"
            alt="Edith Voss, Inhaberin V.I.B. Voß Immobilien Beratung"
            fill
            sizes="(min-width: 1280px) 500px, 420px"
            className="object-cover object-top"
            priority
          />
        </motion.div>
      </div>

      {/* Scroll hint — desktop only */}
      <motion.div
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="font-body text-label-caps text-muted-text tracking-[0.2em] uppercase">
          Scroll
        </span>
        <motion.span
          className="block w-px h-8 bg-border-taupe origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
        />
      </motion.div>
    </section>
  );
}
