import { Icon, type IconName } from "@/components/ui/Icon";

type USP = {
  icon: IconName;
  title: string;
  body: string;
};

type Props = {
  items: readonly USP[];
};

export function USPGrid({ items }: Props) {
  return (
    <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap border-t border-border-taupe">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {items.map((usp) => (
          <article
            key={usp.title}
            className="bg-surface-ivory border border-border-taupe p-10 rounded-lg flex flex-col gap-6 hover:border-secondary transition-colors duration-500"
          >
            <Icon name={usp.icon} size={32} className="text-secondary" />
            <h3 className="font-display text-headline-md text-primary">
              {usp.title}
            </h3>
            <p className="font-body text-body-md text-muted-text">{usp.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
