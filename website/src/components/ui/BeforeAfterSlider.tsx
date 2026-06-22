"use client";

import { useState } from "react";
import Image from "next/image";
import { IconArrowsHorizontal } from "@tabler/icons-react";

type Props = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
};

/**
 * Vorher/Nachher-Vergleich mit Ziehbalken.
 * Das "Nachher"-Bild liegt vollflächig im Hintergrund, das "Vorher"-Bild wird
 * per clip-path bis zur Reglerposition eingeblendet. Bedienung per Maus, Touch
 * und Tastatur (range-Input, Pfeiltasten).
 */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = "Vorher",
  afterLabel = "Nachher",
}: Props) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative w-full aspect-[1600/956] overflow-hidden rounded-lg bg-surface-container-low select-none">
      {/* Nachher — vollflächiger Hintergrund */}
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover pointer-events-none"
      />

      {/* Vorher — bis zur Reglerposition sichtbar */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      {/* Labels — blenden sich aus, sobald ihr Bildanteil nicht mehr sichtbar ist */}
      <span
        className="absolute top-3 left-3 bg-primary/80 text-on-primary font-body text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 backdrop-blur-sm pointer-events-none transition-opacity duration-200"
        style={{ opacity: Math.min(1, pos / 12) }}
      >
        {beforeLabel}
      </span>
      <span
        className="absolute top-3 right-3 bg-primary/80 text-on-primary font-body text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 backdrop-blur-sm pointer-events-none transition-opacity duration-200"
        style={{ opacity: Math.min(1, (100 - pos) / 12) }}
      >
        {afterLabel}
      </span>

      {/* Trennlinie + Griff */}
      <div
        className="absolute inset-y-0 pointer-events-none"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-background/90" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/90 backdrop-blur-sm shadow-md flex items-center justify-center">
          <IconArrowsHorizontal size={18} strokeWidth={1.5} className="text-primary" />
        </div>
      </div>

      {/* Bedienelement: range über die gesamte Fläche (Maus/Touch/Tastatur) */}
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Vorher-Nachher-Vergleich ziehen"
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
      />
    </div>
  );
}
