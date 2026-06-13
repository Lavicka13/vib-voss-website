import type { Metadata } from "next";
import { widerruf } from "@/content/widerruf";
import { PrintButton } from "@/components/ui/PrintButton";

export const metadata: Metadata = {
  title: "Widerrufsbelehrung | V.I.B. Voß Immobilien Beratung",
  description:
    "Widerrufsbelehrung für Verbraucher im Falle eines zustande kommenden Maklervertrages mit V.I.B. Voß Immobilien Beratung.",
  robots: { index: true, follow: false },
};

export default function WiderrufPage() {
  return (
    <>
      <header className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-32 md:pt-40 pb-12 md:pb-16 border-b border-border-taupe">
        <div className="flex items-center gap-4 mb-5">
          <span className="block h-px w-12 bg-primary/40" aria-hidden="true" />
          <span className="font-body text-[10px] tracking-[0.36em] uppercase text-secondary">
            V.I.B. Voß Immobilien Beratung
          </span>
        </div>
        <h1 className="font-display text-display-lg-mobile md:text-display-lg text-primary leading-[0.95]">
          {widerruf.title}
        </h1>
        <p className="font-body text-body-md text-muted-text mt-4 max-w-2xl">
          {widerruf.intro}
        </p>
        <div className="mt-6">
          <PrintButton />
        </div>
      </header>
      <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-16 md:pt-24 pb-section-gap-mobile md:pb-section-gap">
        <div className="max-w-3xl flex flex-col gap-12">
          {widerruf.sections.map((section) => (
            <section key={section.heading} className="flex flex-col gap-3">
              <h2 className="font-display text-headline-md text-primary">{section.heading}</h2>
              {section.body.map((paragraph, idx) => (
                <p key={idx} className="font-body text-body-lg text-on-surface-variant leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
          <p className="font-body text-[12px] text-muted-text italic">{widerruf.pruefHinweis}</p>
        </div>
      </section>
    </>
  );
}
