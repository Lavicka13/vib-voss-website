"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 0.84, 0.24, 1];

type Props = {
  /** Roman numeral marker — e.g. "II", "III". The trailing dot is added. */
  numeral?: string;
  eyebrow?: string;
  headline: string;
  /** Optional zero-based index of the word in headline to render outlined-italic. */
  accentIndex?: number;
  /** Optional class on the headline element for size overrides. */
  headlineClassName?: string;
  /** Whether the head should center-align (e.g. for centered sections). */
  align?: "left" | "center";
  /** Max-width on the headline column (default keeps it tight). */
  maxWidth?: string;
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE, delay: 0.15 + i * 0.06 },
  }),
};

const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

/**
 * SectionHead
 *
 * Editorial chapter mark: roman numeral + hairline + eyebrow + display headline.
 * The headline can highlight one word as outlined italic for editorial tension.
 * Words cascade in with blur-to-sharp on viewport entry.
 *
 * Carries the Hero's visual language into every section so the page reads as
 * one continuous publication.
 */
export function SectionHead({
  numeral,
  eyebrow,
  headline,
  accentIndex,
  headlineClassName = "text-display-lg-mobile md:text-display-lg",
  align = "left",
  maxWidth,
}: Props) {
  const shouldReduce = useReducedMotion();
  const variants = shouldReduce ? reducedVariants : wordVariants;

  const words = headline.split(" ");
  const isCentered = align === "center";

  return (
    <div
      className={
        "relative grid grid-cols-12 gap-4 md:gap-6 items-baseline mb-10 md:mb-14 " +
        (isCentered ? "text-center" : "")
      }
    >
      {/* Roman numeral — desktop col-span-1, mobile col-span-2 */}
      {numeral && (
        <motion.span
          initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
          whileInView={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className={
            "font-display italic text-[26px] md:text-[34px] leading-none text-primary " +
            (isCentered
              ? "col-span-12 md:col-span-12 mb-2"
              : "col-span-2 md:col-span-1")
          }
          aria-hidden="true"
        >
          {numeral}.
        </motion.span>
      )}

      <div
        className={
          (numeral
            ? isCentered
              ? "col-span-12"
              : "col-span-10 md:col-span-11"
            : "col-span-12") +
          " " +
          (maxWidth ?? "")
        }
      >
        {eyebrow && (
          <div
            className={
              "flex items-center gap-4 mb-5 " + (isCentered ? "justify-center" : "")
            }
          >
            <motion.span
              initial={shouldReduce ? { width: 48, opacity: 1 } : { width: 0, opacity: 0 }}
              whileInView={{ width: 48, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
              className="block h-px bg-primary/40"
              aria-hidden="true"
            />
            <span className="font-body text-[10px] md:text-[11px] tracking-[0.36em] uppercase text-secondary">
              {eyebrow}
            </span>
          </div>
        )}

        <h2
          className={`font-display leading-[0.95] tracking-[-0.01em] text-primary ${headlineClassName}`}
          aria-label={headline}
        >
          <span className="sr-only">{headline}</span>
          <span aria-hidden="true" className="block">
            {words.map((word, i) => {
              const isAccent = accentIndex === i;
              return (
                <motion.span
                  key={`${word}-${i}`}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={variants}
                  className={
                    "inline-block mr-[0.18em] " +
                    (isAccent ? "italic font-light text-edge-light" : "")
                  }
                >
                  {word}
                </motion.span>
              );
            })}
          </span>
        </h2>
      </div>
    </div>
  );
}
