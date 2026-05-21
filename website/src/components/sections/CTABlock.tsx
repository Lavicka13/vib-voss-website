import { Button } from "@/components/ui/Button";

type Props = {
  headline: string;
  sub?: string;
  button?: { label: string; href: string };
};

export function CTABlock({ headline, sub, button }: Props) {
  return (
    <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
      <div className="border border-border-taupe rounded-lg bg-surface-ivory p-12 md:p-24 text-center flex flex-col items-center gap-8">
        <h2 className="font-display text-display-lg-mobile md:text-headline-md text-primary max-w-3xl">
          {headline}
        </h2>
        {sub && (
          <p className="font-display italic text-signature-quote text-secondary">
            {sub}
          </p>
        )}
        {button && <Button href={button.href}>{button.label}</Button>}
      </div>
    </section>
  );
}
