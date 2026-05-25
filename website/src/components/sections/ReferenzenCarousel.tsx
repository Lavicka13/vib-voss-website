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
};

type Props = {
  items: readonly Item[];
};

export function ReferenzenCarousel({ items }: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < max - 8);
    // approximate active index via card width
    const firstCard = el.querySelector<HTMLElement>("[data-card]");
    if (firstCard) {
      const cardW = firstCard.offsetWidth + 24; // + gap
      setActiveIndex(Math.round(el.scrollLeft / cardW));
    }
  }, []);

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

  return (
    <div className="relative">
      <div className="flex justify-end gap-3 mb-6">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          disabled={!canPrev}
          aria-label="Vorheriges Objekt"
          className="w-12 h-12 flex items-center justify-center rounded-full border border-border-taupe text-primary hover:bg-surface-container-low transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <IconArrowLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          disabled={!canNext}
          aria-label="Nächstes Objekt"
          className="w-12 h-12 flex items-center justify-center rounded-full border border-border-taupe text-primary hover:bg-surface-container-low transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <IconArrowRight size={20} />
        </button>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-margin-mobile px-margin-mobile md:-mx-margin-desktop md:px-margin-desktop scrollbar-hide"
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
            <Link
              href={`/immobilien/${item.slug}`}
              className="group flex flex-col gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-lg"
            >
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
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-body-lg text-primary leading-tight group-hover:text-secondary transition-colors duration-300">
                  {item.titel}
                </h3>
                <span className="font-body text-body-md text-muted-text">
                  {item.ort}
                </span>
                <span className="font-body text-label-caps uppercase tracking-widest text-secondary mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Details ansehen &rarr;
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => scrollToIndex(idx)}
            aria-label={`Objekt ${idx + 1} anzeigen`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === activeIndex
                ? "w-8 bg-primary"
                : "w-1.5 bg-border-taupe hover:bg-muted-text"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
