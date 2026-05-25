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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-gutter gap-y-12">
        {items.map((usp) => (
          <article
            key={usp.title}
            className="group border-t border-primary/30 pt-6 pb-2 flex flex-col gap-5"
          >
            <Icon
              name={usp.icon}
              size={32}
              className="text-secondary/80 group-hover:text-secondary transition-colors duration-500"
            />
            <h3 className="font-display text-headline-md text-primary leading-tight mt-2">
              {usp.title}
            </h3>
            <p className="font-body text-body-md text-muted-text leading-relaxed">{usp.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
