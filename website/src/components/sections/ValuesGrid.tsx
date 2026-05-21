import { Icon, type IconName } from "@/components/ui/Icon";

type Value = {
  icon: IconName;
  title: string;
  body: string;
};

type Props = {
  items: readonly Value[];
  eyebrow?: string;
  headline?: string;
};

export function ValuesGrid({ items, eyebrow = "Wofür ich stehe", headline = "Meine Werte" }: Props) {
  return (
    <section className="w-full bg-zartrosa/60 py-section-gap-mobile md:py-section-gap">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-16 flex flex-col gap-3">
          <span className="font-body text-label-caps text-primary/70 uppercase tracking-widest">{eyebrow}</span>
          <h2 className="font-display text-display-lg-mobile md:text-headline-md text-primary">{headline}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border-taupe border border-border-taupe rounded-lg overflow-hidden">
          {items.map((value) => (
            <article
              key={value.title}
              className="bg-surface p-10 md:p-12 hover:bg-surface-ivory transition-colors duration-500 flex flex-col gap-4"
            >
              <Icon name={value.icon} size={28} className="text-secondary" />
              <h3 className="font-display text-2xl text-primary">{value.title}</h3>
              <p className="font-body text-body-md text-muted-text leading-relaxed">{value.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
