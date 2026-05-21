import { IconCheck } from "@tabler/icons-react";

type Props = {
  items: readonly string[];
};

export function ExposeAusstattungList({ items }: Props) {
  if (items.length === 0) return null;
  return (
    <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap border-t border-border-taupe">
      <h2 className="font-display text-headline-md text-primary mb-8">Ausstattung</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-gutter gap-y-4">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3 font-body text-body-md text-primary">
            <IconCheck size={18} className="text-secondary shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
