type Props = {
  headline: string;
  body: string;
  orte: readonly string[];
};

export function RegionBlock({ headline, body, orte }: Props) {
  return (
    <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap border-t border-border-taupe">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
        <div className="flex flex-col gap-6">
          <h2 className="font-display text-display-lg-mobile md:text-display-lg text-primary">{headline}</h2>
          <p className="font-body text-body-lg text-muted-text leading-relaxed">{body}</p>
        </div>
        <div className="bg-surface-ivory border border-border-taupe p-10 rounded-lg">
          <ul className="space-y-3 font-body text-body-lg text-primary">
            {orte.map((ort) => (
              <li key={ort} className="flex items-start gap-3">
                <span className="text-secondary mt-1">—</span>
                <span>{ort}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
