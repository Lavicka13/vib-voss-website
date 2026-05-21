import { StatusBadge } from "./StatusBadge";
import { IconMapPin } from "@tabler/icons-react";
import type { Immobilie } from "@/content/immobilien";

type Props = {
  immobilie: Immobilie;
};

export function ExposeHero({ immobilie }: Props) {
  return (
    <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-section-gap-mobile md:pt-section-gap">
      <div className="flex flex-col gap-6">
        <StatusBadge status={immobilie.status} />
        <h1 className="font-display text-display-lg-mobile md:text-display-lg text-primary">
          {immobilie.titel}
        </h1>
        <div className="flex items-center gap-2 text-muted-text font-body text-body-lg">
          <IconMapPin size={20} />
          <span>{immobilie.ort}</span>
        </div>
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg bg-surface-container-low">
          <div className="absolute inset-0 flex items-center justify-center text-muted-text font-body text-label-caps uppercase tracking-widest opacity-40">
            {immobilie.imageSlot}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter border-t border-b border-border-taupe py-8">
          <div>
            <div className="font-body text-label-caps text-muted-text uppercase tracking-widest mb-1">Preis</div>
            <div className="font-display text-headline-md text-primary">{immobilie.preis}</div>
          </div>
          {immobilie.zimmer && (
            <div>
              <div className="font-body text-label-caps text-muted-text uppercase tracking-widest mb-1">Zimmer</div>
              <div className="font-display text-headline-md text-primary">{immobilie.zimmer}</div>
            </div>
          )}
          {immobilie.schlafzimmer && (
            <div>
              <div className="font-body text-label-caps text-muted-text uppercase tracking-widest mb-1">Schlafzimmer</div>
              <div className="font-display text-headline-md text-primary">{immobilie.schlafzimmer}</div>
            </div>
          )}
          <div>
            <div className="font-body text-label-caps text-muted-text uppercase tracking-widest mb-1">Wohnfläche</div>
            <div className="font-display text-headline-md text-primary">ca. {immobilie.wohnflaeche} m²</div>
          </div>
        </div>
      </div>
    </section>
  );
}
