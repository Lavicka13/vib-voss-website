import Link from "next/link";
import { IconMapPin } from "@tabler/icons-react";
import { StatusBadge } from "./StatusBadge";
import type { Immobilie } from "@/content/immobilien";

type Props = {
  immobilie: Immobilie;
};

export function ImmobilienCard({ immobilie }: Props) {
  const href = `/immobilien/${immobilie.slug}`;
  return (
    <article className="group">
      <Link href={href} className="block">
        <div className="relative overflow-hidden bg-surface-container-low border border-border-taupe rounded-lg aspect-[4/5] mb-6">
          <div className="absolute inset-0 flex items-center justify-center text-muted-text font-body text-label-caps uppercase tracking-widest opacity-40">
            {immobilie.imageSlot}
          </div>
          <div className="absolute top-4 left-4">
            <StatusBadge status={immobilie.status} />
          </div>
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-display text-2xl text-primary group-hover:text-secondary transition-colors">
            {immobilie.titel}
          </h3>
          <div className="flex items-center gap-2 text-muted-text font-body text-body-md">
            <IconMapPin size={16} />
            <span>{immobilie.ort}</span>
          </div>
          <div className="flex items-center gap-3 text-on-surface-variant font-body text-body-md border-t border-border-taupe pt-3 mt-2">
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
