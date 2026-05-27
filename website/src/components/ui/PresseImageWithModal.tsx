"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { IconX, IconZoomIn } from "@tabler/icons-react";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * Newspaper article image with a click-to-enlarge modal.
 *
 * Desktop: image fits inside viewport (max 92vw × 88vh).
 * Mobile:  image takes full width; container scrolls; pinch-zoom works
 *          natively because the inner element is a plain <img>.
 * Close:   backdrop click, X button, Escape key.
 */
export function PresseImageWithModal({ src, alt, width, height }: Props) {
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
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${alt} — vergrößern`}
        className="group relative block w-full overflow-hidden cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="w-full h-auto block transition-opacity duration-300 group-hover:opacity-95"
        />
        <span className="absolute bottom-3 right-3 md:bottom-5 md:right-5 flex items-center gap-2 bg-background/90 backdrop-blur-sm px-4 py-2 font-body text-[10px] tracking-[0.32em] uppercase text-primary/85 opacity-90 md:opacity-0 md:group-hover:opacity-100 md:group-focus:opacity-100 transition-opacity duration-300">
          <IconZoomIn size={14} strokeWidth={1.5} />
          Vergrößern
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Pressartikel — vergrößerte Ansicht"
          className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-sm"
          onClick={close}
        >
          {/* Top bar */}
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

          {/* Image scroll container */}
          <div className="absolute inset-0 overflow-auto flex items-start md:items-center justify-center p-4 pt-16 md:p-12 md:pt-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              onClick={(e) => e.stopPropagation()}
              className="block w-full md:w-auto md:max-w-[92vw] md:max-h-[82vh] h-auto select-none"
              draggable={false}
            />
          </div>

          {/* Bottom hint */}
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
