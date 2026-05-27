import { QuoteIcon } from "@/components/ui/QuoteIcon";

type Props = {
  body: readonly string[];
  attribution?: string;
};

export function IntroQuote({ body, attribution }: Props) {
  return (
    <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
        <QuoteIcon className="text-border-taupe mb-8" />
        <div className="flex flex-col gap-6">
          {body.map((paragraph, idx) => (
            <p
              key={idx}
              className="font-body text-body-lg text-on-surface-variant leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <QuoteIcon className="text-border-taupe mt-8 rotate-180" />
        {attribution && (
          <p className="mt-8 font-body text-label-caps text-muted-text uppercase tracking-widest">
            {attribution}
          </p>
        )}
      </div>
    </section>
  );
}
