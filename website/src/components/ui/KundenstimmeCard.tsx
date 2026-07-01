"use client";

import { useState, useEffect, useCallback } from "react";
import { IconStarFilled, IconX, IconArrowNarrowRight } from "@tabler/icons-react";

type Props = {
  teaser: string;
  quote: string;
  author: string;
};

const Stars = () => (
  <div
    className="flex items-center gap-1 text-secondary"
    aria-label="5 von 5 Sternen"
  >
    {Array.from({ length: 5 }).map((_, i) => (
      <IconStarFilled key={i} size={18} />
    ))}
  </div>
);

/**
 * Testimonial card showing a curated teaser excerpt with a "Weiterlesen" link
 * that opens a modal with the full review.
 *
 * Close: backdrop click, X button, Escape key.
 * Mobile: modal uses dvh + overflow scroll so long quotes are never cut off.
 */
export function KundenstimmeCard({ teaser, quote, author }: Props) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  return (
    <>
      <figure className="flex flex-col gap-6 bg-surface border border-border-taupe rounded-lg p-8 md:p-9">
        <Stars />
        <blockquote className="font-display italic text-[clamp(1.1rem,1.8vw,1.45rem)] text-primary leading-snug flex-1">
          &bdquo;{teaser}&ldquo;
        </blockquote>
        <figcaption className="font-body text-label-caps text-muted-text uppercase tracking-widest border-t border-border-taupe pt-5">
          {author}
        </figcaption>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Vollständige Bewertung von ${author} lesen`}
          className="group inline-flex items-center gap-2 self-start font-body text-[11px] tracking-[0.28em] uppercase text-secondary hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
        >
          Weiterlesen
          <IconArrowNarrowRight
            size={18}
            strokeWidth={1.5}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </figure>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Bewertung von ${author}`}
          className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-sm flex items-start md:items-center justify-center p-4 md:p-8 overflow-y-auto"
          onClick={close}
        >
          <figure
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl my-auto bg-surface border border-border-taupe rounded-lg p-7 md:p-10 max-h-[88dvh] overflow-y-auto flex flex-col gap-6"
          >
            <div className="flex items-start justify-between gap-6">
              <Stars />
              <button
                type="button"
                onClick={close}
                aria-label="Schließen"
                className="group inline-flex items-center gap-2 text-muted-text hover:text-primary font-body text-[10px] tracking-[0.3em] uppercase transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              >
                <span className="hidden sm:inline">Schließen</span>
                <IconX size={18} strokeWidth={1.5} />
              </button>
            </div>
            <blockquote className="font-display italic text-[clamp(1.05rem,1.6vw,1.3rem)] text-primary leading-relaxed">
              &bdquo;{quote}&ldquo;
            </blockquote>
            <figcaption className="font-body text-label-caps text-muted-text uppercase tracking-widest border-t border-border-taupe pt-5">
              {author}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
