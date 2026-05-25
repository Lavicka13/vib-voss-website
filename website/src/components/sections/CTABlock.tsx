import { EditorialButton } from "@/components/ui/EditorialButton";

type Props = {
  headline: string;
  sub?: string;
  button?: { label: string; href: string };
};

export function CTABlock({ headline, sub, button }: Props) {
  return (
    <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
      <div className="relative bg-surface-ivory border-t border-b border-primary/30 p-8 md:p-14 lg:p-20 text-center flex flex-col items-center gap-8">
        <div className="flex items-center justify-center gap-4">
          <span className="block h-px w-12 bg-primary/40" aria-hidden="true" />
          <span className="font-body text-[10px] tracking-[0.4em] uppercase text-secondary">
            Ihre Einladung
          </span>
          <span className="block h-px w-12 bg-primary/40" aria-hidden="true" />
        </div>
        <h2 className="font-display text-display-lg-mobile md:text-headline-md text-primary leading-[0.95] max-w-3xl">
          {headline}
        </h2>
        {sub && (
          <p className="font-display italic text-signature-quote text-secondary">
            {sub}
          </p>
        )}
        {button && (
          <EditorialButton variant="primary" href={button.href}>
            {button.label}
          </EditorialButton>
        )}
      </div>
    </section>
  );
}
