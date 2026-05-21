import Image from "next/image";
import Link from "next/link";
import { IconMapPin } from "@tabler/icons-react";
import { StatusBadge } from "./StatusBadge";
import type { Immobilie } from "@/content/immobilien";

type Props = {
  immobilie: Immobilie;
};

const imageMap: Record<string, string> = {
  "object-mock-1": "/images/object-mock-1-1600.jpg",
  "object-mock-2": "/images/object-mock-2-1600.jpg",
  "object-mock-3": "/images/object-mock-3-1600.jpg",
};

export function ImmobilienCard({ immobilie }: Props) {
  const href = `/immobilien/${immobilie.slug}`;
  const imageSrc = imageMap[immobilie.imageSlot];
  return (
    <article className="group">
      <Link href={href} className="block">
        <div className="relative overflow-hidden bg-surface-container-low border border-border-taupe rounded-lg aspect-[4/5] mb-6">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={`${immobilie.titel} — Stimmungsbild`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-text font-body text-label-caps uppercase tracking-widest opacity-40">
              {immobilie.imageSlot}
            </div>
          )}
          <div className="absolute top-4 left-4 z-10">
            <StatusBadge status={immobilie.status} />
          </div>
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 pointer-events-none" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-display text-2xl text-primary group-hover:text-secondary transition-colors">
            {immobilie.titel}
          </h3>
          <div className="flex items-center gap-2 text-muted-text font-body text-body-md">
            <IconMapPin size={16} />
            <span>{immobilie.ort}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-on-surface-variant font-body text-body-md border-t border-border-taupe pt-3 mt-2">
            <span>{immobilie.preis}</span>
            <span className="text-border-taupe">|</span>
            <span>ca. {immobilie.wohnflaeche} m²</span>
            {immobilie.zimmer && (
              <>
                <span className="text-border-taupe">|</span>
                <span>{immobilie.zimmer} Zimmer</span>
              </>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
