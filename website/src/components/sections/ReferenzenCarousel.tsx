"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

type Item = {
  slug: string;
  titel: string;
  ort: string;
  image: string | null;
  /** Badge oben rechts im Bild, z.B. "Verkauft" / "Vermietet" — nur im Referenz-Modus genutzt. */
  badge?: string;
  /** Eckdaten, die im Referenz-Modus beim Mouseover erscheinen (z.B. Immobilienart, Fläche, Zimmer). */
  meta?: readonly string[];
};

type Props = {
  items: readonly Item[];
  /** true = verkaufte/vermietete Referenzen: keine Links, Badge oben rechts, kein "Details ansehen". */
  reference?: boolean;
};

export function ReferenzenCarousel({ items, reference = false }: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pageCount, setPageCount] = useState(items.length);

  const updateState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < max - 8);
    const firstCard = el.querySelector<HTMLElement>("[data-card]");
    if (firstCard) {
      const cardW = firstCard.offsetWidth + 24; // + gap
      const idx = Math.round(el.scrollLeft / cardW);
      const pages = max > 0 ? Math.max(1, Math.ceil(max / cardW) + 1) : 1;
      const cappedPages = Math.min(items.length, pages);
      setPageCount(cappedPages);
      setActiveIndex(Math.min(idx, cappedPages - 1));
    }
  }, [items.length]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateState();
    el.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);
    return () => {
      el.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, [updateState]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("[data-card]");
    const step = firstCard ? firstCard.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const scrollToIndex = (idx: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("[data-card]");
    const step = firstCard ? firstCard.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollTo({ left: step * idx, behavior: "smooth" });
  };

  const cardBody = (item: Item) => (
    <>
      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-surface-container-low">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.titel}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 85vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full px-4 text-center">
            <span className="font-display italic text-signature-quote text-secondary">
              Diskretes Objekt
            </span>
            <span className="font-body text-body-md text-muted-text mt-2">
              Bilder auf Anfrage
            </span>
          </div>
        )}
        {item.badge && (
          <span className="absolute top-3 right-3 max-w-[50%] truncate bg-primary/85 text-on-primary font-body text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 backdrop-blur-sm">
            {item.badge}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-body-lg text-primary leading-tight line-clamp-2 min-h-[2.6em] group-hover:text-secondary transition-colors duration-300">
          {item.titel}
        </h3>
        <span className="font-body text-body-md text-muted-text">{item.ort}</span>
        {!reference ? (
          <span className="font-body text-label-caps uppercase tracking-widest text-secondary mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Details ansehen &rarr;
          </span>
        ) : (
          item.meta && item.meta.length > 0 && (
            <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1 max-h-0 overflow-hidden opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-300">
              {item.meta.map((m) => (
                <li key={m} className="font-body text-[12px] tracking-[0.02em] text-muted-text">
                  {m}
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </>
  );

  return (
    <div className="group/carousel relative">
      {/* ── Hover-Pfeile links/rechts (Desktop) für bessere Intuition ── */}
      <button
        type="button"
        onClick={() => scrollBy(-1)}
        disabled={!canPrev}
        aria-label="Vorheriges Objekt"
        className="hidden md:flex absolute -left-4 lg:-left-6 top-[33%] z-20 -translate-y-1/2 items-center justify-center w-12 h-12 rounded-full bg-surface text-primary shadow-md border border-border-taupe opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-zartrosa disabled:opacity-0 cursor-pointer"
      >
        <IconArrowLeft size={18} strokeWidth={1.5} />
      </button>
      <button
        type="button"
        onClick={() => scrollBy(1)}
        disabled={!canNext}
        aria-label="Nächstes Objekt"
        className="hidden md:flex absolute -right-4 lg:-right-6 top-[33%] z-20 -translate-y-1/2 items-center justify-center w-12 h-12 rounded-full bg-surface text-primary shadow-md border border-border-taupe opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-zartrosa disabled:opacity-0 cursor-pointer"
      >
        <IconArrowRight size={18} strokeWidth={1.5} />
      </button>

      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pl-margin-mobile md:-mx-margin-desktop md:px-margin-desktop scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {items.map((item) => (
          <article
            key={item.slug}
            data-card
            className="snap-start shrink-0 w-[85%] sm:w-[60%] md:w-[48%] lg:w-[32%]"
          >
            {reference ? (
              <div className="group flex flex-col gap-4">{cardBody(item)}</div>
            ) : (
              <Link
                href={`/immobilien/${item.slug}`}
                className="group flex flex-col gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-lg"
              >
                {cardBody(item)}
              </Link>
            )}
          </article>
        ))}
      </div>

      {/* ── Navigation: mittig unterhalb (Zurück | Weiter), ohne römische Zahlen ── */}
      <div className="mt-8 flex items-center justify-center gap-6 md:gap-8">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          disabled={!canPrev}
          aria-label="Vorheriges Objekt"
          className="group inline-flex items-center gap-3 font-body text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-primary hover:text-secondary transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <span className="block w-6 h-px bg-current transition-all duration-500 group-hover:w-10 group-disabled:group-hover:w-6" />
          <IconArrowLeft size={14} strokeWidth={1.5} />
          <span>Zurück</span>
        </button>

        {/* dezente Positions-Indikatoren (keine Numeralen) */}
        <div className="flex items-center gap-2" aria-hidden="true">
          {Array.from({ length: pageCount }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToIndex(idx)}
              aria-label={`Objekt ${idx + 1} anzeigen`}
              className={`block h-px transition-all duration-500 cursor-pointer ${
                idx === activeIndex
                  ? "w-8 bg-primary"
                  : "w-3 bg-border-taupe hover:w-5 hover:bg-primary/60"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollBy(1)}
          disabled={!canNext}
          aria-label="Nächstes Objekt"
          className="group inline-flex items-center gap-3 font-body text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-primary hover:text-secondary transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>Weiter</span>
          <IconArrowRight size={14} strokeWidth={1.5} />
          <span className="block w-6 h-px bg-current transition-all duration-500 group-hover:w-10 group-disabled:group-hover:w-6" />
        </button>
      </div>
    </div>
  );
}
