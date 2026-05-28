"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { IconX, IconZoomIn, IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

type Item = { src: string; alt: string };
type Props = { items: readonly Item[]; intervalMs?: number };

/**
 * Presse-Slideshow mit sanfter Überblendung (auto-advance nach Zeit).
 * Unterschiedliche Bildformate → object-contain in festem Rahmen, damit nichts
 * beschnitten wird. Klick öffnet den aktuellen Ausschnitt vergrößert (lesbar).
 */
export function PresseSlideshow({ items, intervalMs = 6500 }: Props) {
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (open || paused || items.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), intervalMs);
    return () => clearInterval(t);
  }, [open, paused, items.length, intervalMs]);

  const close = useCallback(() => setOpen(false), []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  const current = items[idx];
  const go = (d: 1 | -1) => setIdx((i) => (i + d + items.length) % items.length);

  return (
    <>
      <div
        className="relative w-full aspect-[3/2] overflow-hidden bg-surface-container-low rounded-sm"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); go(-1); }}
              aria-label="Vorheriger Artikel"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full bg-background/85 text-primary shadow-sm backdrop-blur-sm hover:bg-zartrosa transition-colors cursor-pointer"
            >
              <IconArrowLeft size={18} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); go(1); }}
              aria-label="Nächster Artikel"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full bg-background/85 text-primary shadow-sm backdrop-blur-sm hover:bg-zartrosa transition-colors cursor-pointer"
            >
              <IconArrowRight size={18} strokeWidth={1.5} />
            </button>
          </>
        )}
        {items.map((it, i) => (
          <button
            key={it.src}
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`${it.alt} — vergrößern`}
            aria-hidden={i !== idx}
            tabIndex={i === idx ? 0 : -1}
            className={
              "absolute inset-0 cursor-zoom-in transition-opacity duration-[1200ms] ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary " +
              (i === idx ? "opacity-100" : "opacity-0 pointer-events-none")
            }
          >
            <Image
              src={it.src}
              alt={it.alt}
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-contain"
            />
          </button>
        ))}
        <span className="absolute bottom-3 right-3 flex items-center gap-2 bg-background/90 backdrop-blur-sm px-4 py-2 font-body text-[10px] tracking-[0.32em] uppercase text-primary/85 pointer-events-none">
          <IconZoomIn size={14} strokeWidth={1.5} />
          Vergrößern
        </span>
      </div>

      {items.length > 1 && (
        <div className="mt-5 flex items-center justify-center gap-3">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Artikel ${i + 1} anzeigen`}
              aria-current={i === idx ? "true" : undefined}
              className={
                "block h-px transition-all duration-500 cursor-pointer " +
                (i === idx ? "w-8 bg-primary" : "w-3 bg-border-taupe hover:w-5 hover:bg-primary/60")
              }
            />
          ))}
        </div>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Presseartikel — vergrößerte Ansicht"
          className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-sm"
          onClick={close}
        >
          <div className="fixed top-0 left-0 right-0 flex items-center justify-between px-4 md:px-8 py-4 md:py-5 z-[110] pointer-events-none">
            <span className="font-body text-[10px] tracking-[0.36em] uppercase text-white/70 pointer-events-auto">
              Presse · V.I.B.
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Schließen"
              className="pointer-events-auto group inline-flex items-center gap-3 text-white/90 hover:text-white font-body text-[10px] md:text-[11px] tracking-[0.32em] uppercase transition-colors"
            >
              <span>Schließen</span>
              <IconX size={18} strokeWidth={1.5} />
            </button>
          </div>
          <div className="absolute inset-0 overflow-auto flex items-start md:items-center justify-center p-4 pt-16 md:p-12 md:pt-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.src}
              alt={current.alt}
              onClick={(e) => e.stopPropagation()}
              className="block w-full md:w-auto md:max-w-[92vw] md:max-h-[82vh] h-auto select-none"
              draggable={false}
            />
          </div>
          <div className="fixed bottom-4 left-0 right-0 flex justify-center pointer-events-none">
            <span className="font-body text-[10px] tracking-[0.36em] uppercase text-white/50">
              <span className="hidden md:inline">Esc · Klick · Schließen</span>
              <span className="md:hidden">Pinch zum Zoomen</span>
            </span>
          </div>
        </div>
      )}
    </>
  );
}
