import { QuoteIcon } from "@/components/ui/QuoteIcon";

type Props = {
  quote: string;
  attribution?: string;
};

export function TestimonialBlock({ quote, attribution }: Props) {
  return (
    <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-8">
        <QuoteIcon className="text-zartrosa" />
        <blockquote className="font-display italic text-signature-quote md:text-headline-md text-primary leading-relaxed">
          &bdquo;{quote}&ldquo;
        </blockquote>
        {attribution && (
          <p className="font-body text-label-caps text-muted-text uppercase tracking-widest">
            {attribution}
          </p>
        )}
      </div>
    </section>
  );
}
