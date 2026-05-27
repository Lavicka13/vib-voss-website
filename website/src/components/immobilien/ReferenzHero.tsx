"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type Props = {
  titel: string;
  untertitel?: string;
  ort: string;
  image: string | null;
};

const EASE_CINEMA: [number, number, number, number] = [0.16, 0.84, 0.24, 1];
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_CINEMA, delay: 0.5 + i * 0.07 },
  }),
};

const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

/**
 * ReferenzHero — Editorial Cinema variant for detail pages
 *
 * Echo of the home hero: roman numeral marker, hairlines, eyebrow,
 * cascading headline reveal, optional outlined accent. The portrait
 * carries a corner edition mark like the about chapter.
 */
export function ReferenzHero({ titel, untertitel, ort, image }: Props) {
  const shouldReduce = useReducedMotion();
  const variants = shouldReduce ? reducedVariants : wordVariants;
  const words = titel.split(" ");

  return (
    <section className="relative w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-12 md:pt-16 pb-4 md:pb-8">
      {/* Top meta row: eyebrow */}
      <motion.div
        className="flex items-center gap-4 mb-8 md:mb-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.15 }}
      >
        <span
          className="block h-px w-12 md:w-24 bg-primary/40"
          aria-hidden="true"
        />
        <span className="font-body text-[10px] md:text-[11px] tracking-[0.36em] uppercase text-secondary">
          Immobilie · {ort}
        </span>
      </motion.div>

      {/* Headline with cascading reveal */}
      <h1
        className="font-display leading-[0.95] tracking-[-0.01em] text-primary max-w-5xl mb-6"
        aria-label={titel}
      >
        <span className="sr-only">{titel}</span>
        <span
          aria-hidden="true"
          className="block"
          style={{ fontSize: "clamp(2.25rem, 6vw, 5rem)" }}
        >
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={variants}
              className="inline-block mr-[0.18em]"
            >
              {word}
            </motion.span>
          ))}
        </span>
      </h1>

      {untertitel && (
        <motion.div
          className="flex items-center gap-4 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 1.0 }}
        >
          <motion.span
            initial={shouldReduce ? { width: 48 } : { width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 0.8, ease: EASE_CINEMA, delay: 1.0 }}
            className="block h-px bg-primary"
            aria-hidden="true"
          />
          <p className="font-display italic text-signature-quote text-secondary max-w-3xl">
            {untertitel}
          </p>
        </motion.div>
      )}

      {/* Image with corner edition marker */}
      <motion.div
        className="relative w-full aspect-[16/10] md:aspect-[21/9] overflow-hidden bg-surface-container-low mt-4"
        initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
        animate={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: EASE_CINEMA, delay: 0.8 }}
      >
        {image ? (
          <Image
            src={image}
            alt={titel}
            fill
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-surface-container-low">
            <div className="flex flex-col items-center gap-3 text-center px-6">
              <span className="font-display italic text-signature-quote text-secondary">
                Diskretes Objekt
              </span>
              <span className="font-body text-body-md text-muted-text max-w-md">
                Bilder und Adresse erhalten Interessenten ausschließlich auf Anfrage im persönlichen Kontakt.
              </span>
            </div>
          </div>
        )}
        {/* Corner marker */}
        <div className="absolute bottom-4 right-4 flex items-center gap-3 bg-background/85 px-4 py-2 backdrop-blur-sm">
          <span className="font-body text-[10px] tracking-[0.32em] uppercase text-primary/80">
            Immobilie · {ort}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
