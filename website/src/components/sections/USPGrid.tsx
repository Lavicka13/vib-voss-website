import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";

type USP = {
  icon: IconName;
  title: string;
  body: string;
  /** Optionaler Link: macht die Kachel klickbar (z.B. zu den aktuellen Immobilien). */
  href?: string;
  hrefLabel?: string;
};

type Props = {
  items: readonly USP[];
};

export function USPGrid({ items }: Props) {
  return (
    <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap border-t border-border-taupe">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-gutter gap-y-12">
        {items.map((usp) => {
          const inner = (
            <>
              <Icon
                name={usp.icon}
                size={32}
                className="text-secondary/80 group-hover:text-secondary transition-colors duration-500"
              />
              <h3 className="font-display text-headline-md text-primary leading-tight mt-2">
                {usp.title}
              </h3>
              <p className="font-body text-body-md text-muted-text leading-relaxed">{usp.body}</p>
              {usp.href && (
                <span className="font-body text-label-caps uppercase tracking-widest text-secondary mt-1 inline-flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {usp.hrefLabel ?? "Mehr ansehen"} &rarr;
                </span>
              )}
            </>
          );

          return usp.href ? (
            <Link
              key={usp.title}
              href={usp.href}
              className="group border-t border-primary/30 pt-6 pb-2 flex flex-col gap-5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-b-lg"
            >
              {inner}
            </Link>
          ) : (
            <article
              key={usp.title}
              className="group border-t border-primary/30 pt-6 pb-2 flex flex-col gap-5"
            >
              {inner}
            </article>
          );
        })}
      </div>
    </section>
  );
}
