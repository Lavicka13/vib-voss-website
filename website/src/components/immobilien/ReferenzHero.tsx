import Image from "next/image";

type Props = {
  titel: string;
  untertitel?: string;
  ort: string;
  image: string | null;
};

export function ReferenzHero({ titel, untertitel, ort, image }: Props) {
  return (
    <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-12 md:pt-16">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low border border-border-taupe font-body text-label-caps uppercase tracking-widest text-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" aria-hidden="true" />
            Referenzobjekt
          </span>
          <span className="font-body text-body-md text-muted-text">{ort}</span>
        </div>
        <h1 className="font-display text-display-lg-mobile md:text-display-lg text-primary leading-tight max-w-4xl">
          {titel}
        </h1>
        {untertitel && (
          <p className="font-display italic text-signature-quote text-secondary max-w-3xl">
            {untertitel}
          </p>
        )}
        <div className="relative w-full aspect-[16/10] md:aspect-[21/9] rounded-lg overflow-hidden bg-surface-container-low mt-4">
          {image ? (
            <Image
              src={image}
              alt={titel}
              fill
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-surface-container-low">
              <div className="flex flex-col items-center gap-3 text-center px-6">
                <span className="font-display italic text-signature-quote text-secondary">
                  Diskretes Objekt
                </span>
                <span className="font-body text-body-md text-muted-text max-w-md">
                  Bilder und Adresse erhalten Interessenten ausschließlich auf Anfrage im persönlichen Kontakt.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
