import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { datenschutz } from "@/content/datenschutz";

export const metadata: Metadata = {
  title: "Datenschutz | V.I.B. Voß Immobilien Beratung",
  description: datenschutz.hero.subline,
  robots: { index: true, follow: false },
};

export default function DatenschutzPage() {
  return (
    <>
      <Hero headline={datenschutz.hero.headline} subline={datenschutz.hero.subline} />
      <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-section-gap-mobile md:pb-section-gap">
        <div className="max-w-3xl flex flex-col gap-12">
          <div className="bg-zartrosa/40 border border-border-taupe rounded-lg p-6 font-body text-body-md text-primary">
            <strong>Hinweis:</strong> {datenschutz.hinweis}
          </div>
          {datenschutz.sections.map((section) => (
            <section key={section.title} className="flex flex-col gap-3">
              <h2 className="font-display text-headline-md text-primary">{section.title}</h2>
              {section.body.map((paragraph, idx) => (
                <p key={idx} className="font-body text-body-lg text-on-surface-variant leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
