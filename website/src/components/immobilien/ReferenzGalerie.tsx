"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

type Props = {
  /** Alle Bilder des Objekts (mindestens eines). Erstes Bild ist die Hauptansicht. */
  images: readonly string[];
  titel: string;
};

/**
 * ReferenzGalerie — Hauptansicht mit Vorschaubildern (wie Dorn Living Solutions).
 * Klick auf ein Vorschaubild oder die Pfeile (außerhalb des Bildes) wechselt die
 * Hauptansicht. Keine KI-Interpretation, echte Objektfotos.
 */
export function ReferenzGalerie({ images, titel }: Props) {
  const [active, setActive] = useState(0);
  const count = images.length;

  const go = useCallback(
    (dir: 1 | -1) => setActive((i) => (i + dir + count) % count),
    [count]
  );

  return (
    <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-4 md:pb-8">
      {/* Hauptansicht mit außenliegenden Pfeilen */}
      <div className="group/galerie relative">
        <div className="relative w-full aspect-[16/10] md:aspect-[16/9] overflow-hidden bg-surface-container-low">
          <Image
            key={images[active]}
            src={images[active]}
            alt={`${titel} — Ansicht ${active + 1} von ${count}`}
            fill
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="object-cover"
            priority={active === 0}
          />
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Vorheriges Bild"
              className="absolute -left-3 lg:-left-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-surface text-primary shadow-md border border-border-taupe opacity-100 md:opacity-0 md:group-hover/galerie:opacity-100 transition-opacity duration-300 hover:bg-zartrosa cursor-pointer"
            >
              <IconArrowLeft size={18} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Nächstes Bild"
              className="absolute -right-3 lg:-right-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-surface text-primary shadow-md border border-border-taupe opacity-100 md:opacity-0 md:group-hover/galerie:opacity-100 transition-opacity duration-300 hover:bg-zartrosa cursor-pointer"
            >
              <IconArrowRight size={18} strokeWidth={1.5} />
            </button>
            <span className="absolute bottom-3 left-3 bg-background/85 backdrop-blur-sm px-3 py-1 font-body text-[11px] tracking-[0.18em] text-primary/80">
              {active + 1} / {count}
            </span>
          </>
        )}
      </div>

      {/* Vorschaubilder */}
      {count > 1 && (
        <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Bild ${i + 1} anzeigen`}
              aria-current={i === active}
              className={`relative aspect-[4/3] overflow-hidden bg-surface-container-low cursor-pointer transition-opacity duration-200 ${
                i === active ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt={`${titel} — Vorschaubild ${i + 1}`}
                fill
                sizes="(min-width: 640px) 16vw, 25vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
