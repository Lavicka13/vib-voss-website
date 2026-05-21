import { ImmobilienCard } from "@/components/immobilien/ImmobilienCard";
import type { Immobilie } from "@/content/immobilien";

type Props = {
  items: Immobilie[];
};

export function ImmobilienGrid({ items }: Props) {
  return (
    <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {items.map((immobilie) => (
          <ImmobilienCard key={immobilie.slug} immobilie={immobilie} />
        ))}
      </div>
    </section>
  );
}
