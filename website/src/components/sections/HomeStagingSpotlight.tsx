import Image from "next/image";

type ImageProp = { src: string; alt: string };

type Props = {
  eyebrow?: string;
  headline: string;
  body: string;
  image?: ImageProp;
};

export function HomeStagingSpotlight({ eyebrow, headline, body, image }: Props) {
  return (
    <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap bg-surface-container-low rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center p-8 md:p-16">
        <div className="flex flex-col gap-6 order-2 md:order-1">
          {eyebrow && (
            <span className="font-body text-label-caps text-secondary uppercase tracking-widest">
              {eyebrow}
            </span>
          )}
          <h2 className="font-display text-display-lg-mobile md:text-headline-md text-primary">{headline}</h2>
          <p className="font-body text-body-lg text-muted-text leading-relaxed">{body}</p>
        </div>
        <div className="order-1 md:order-2 w-full aspect-[4/5] md:aspect-[1/1] rounded-lg bg-zartrosa/30 overflow-hidden relative">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-text font-body text-label-caps uppercase tracking-widest">
              Home Staging
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
