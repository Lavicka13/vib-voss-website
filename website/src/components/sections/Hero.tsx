import { Button } from "@/components/ui/Button";

type CTA = { label: string; href: string };

type ImageProp = {
  src: string;
  alt: string;
};

type Props = {
  eyebrow?: string;
  headline: string;
  subline?: string;
  primaryCta?: CTA;
  secondaryCta?: CTA;
  trustStrip?: readonly string[];
  image?: ImageProp;
};

export function Hero({
  eyebrow,
  headline,
  subline,
  primaryCta,
  secondaryCta,
  trustStrip,
  image,
}: Props) {
  const hasImage = !!image;
  return (
    <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
      <div
        className={`grid grid-cols-1 ${hasImage ? "md:grid-cols-2" : ""} gap-gutter items-center`}
      >
        <div className="flex flex-col items-start gap-6">
          {eyebrow && (
            <span className="font-body text-label-caps text-secondary uppercase tracking-widest">
              {eyebrow}
            </span>
          )}
          <h1 className="font-display text-display-lg-mobile md:text-display-lg text-primary">
            {headline}
          </h1>
          {subline && (
            <p className="font-body text-body-lg text-muted-text max-w-prose">
              {subline}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
              {primaryCta && (
                <Button href={primaryCta.href}>{primaryCta.label}</Button>
              )}
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="secondary">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
          {trustStrip && trustStrip.length > 0 && (
            <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-6 pt-6 border-t border-border-taupe w-full">
              {trustStrip.map((item) => (
                <li
                  key={item}
                  className="font-body text-label-caps text-muted-text uppercase tracking-widest"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
        {image && (
          <div className="relative w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-lg bg-surface-container-low">
            {/* Placeholder for next/image — Welle 3 will wire actual <Image> */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image.src})` }}
              role="img"
              aria-label={image.alt}
            />
          </div>
        )}
      </div>
    </section>
  );
}
