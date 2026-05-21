type Props = {
  eyebrow?: string;
  headline: string;
  paragraphs: readonly string[];
};

export function StorytellingBlock({ eyebrow, headline, paragraphs }: Props) {
  return (
    <section className="w-full bg-surface-ivory">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <div className="md:col-span-4 md:col-start-1 flex flex-col gap-4">
          {eyebrow && (
            <span className="font-body text-label-caps text-muted-text uppercase tracking-widest">
              {eyebrow}
            </span>
          )}
          <h2 className="font-display text-display-lg-mobile md:text-headline-md text-primary">
            {headline}
          </h2>
        </div>
        <div className="md:col-span-7 md:col-start-6 space-y-6 font-body text-body-lg text-on-surface-variant leading-relaxed">
          {paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
