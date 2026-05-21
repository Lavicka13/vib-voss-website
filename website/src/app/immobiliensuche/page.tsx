import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { SuchprofilForm } from "@/components/forms/SuchprofilForm";

export const metadata: Metadata = {
  title: "Immobiliensuche | V.I.B. Voß Immobilien Beratung",
  description: "Ihr diskretes Suchprofil — Zugang zu Off-Market-Objekten vor öffentlicher Vermarktung.",
};

export default function ImmobiliensuchePage() {
  return (
    <>
      <Hero
        headline="Ihr Suchprofil — diskret & zielgerichtet"
        subline="Teilen Sie mir Ihre Wünsche mit. Ich melde mich, sobald ein passendes Objekt verfügbar wird — oft bevor es öffentlich gezeigt wird. Dieser Service ist unverbindlich."
      />
      <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-section-gap-mobile md:pb-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <aside className="md:col-span-4 flex flex-col gap-6">
            <div className="bg-surface-ivory border border-border-taupe p-8 rounded-lg">
              <h3 className="font-display text-signature-quote text-primary mb-4">Warum ein Suchprofil?</h3>
              <p className="font-body text-body-md text-muted-text mb-6">
                Viele exklusive Immobilien wechseln den Besitzer &bdquo;Off-Market&ldquo; — bevor sie auf Immobilienportalen erscheinen.
              </p>
              <ul className="space-y-3 font-body text-body-md text-muted-text">
                <li className="flex items-start gap-2"><span className="text-secondary mt-1">—</span><span>Frühzeitiger Zugang zu neuen Angeboten</span></li>
                <li className="flex items-start gap-2"><span className="text-secondary mt-1">—</span><span>Passgenaue Vorschläge nach Ihren Kriterien</span></li>
                <li className="flex items-start gap-2"><span className="text-secondary mt-1">—</span><span>Absolute Diskretion garantiert</span></li>
              </ul>
            </div>
            <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
              <Image
                src="/images/immobiliensuche-decor-1600.jpg"
                alt="Stilvolles, lichtdurchflutetes Interieur — Atmosphäre der Objekte aus dem Off-Market-Netzwerk"
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
          </aside>
          <div className="md:col-span-8">
            <SuchprofilForm />
          </div>
        </div>
      </section>
    </>
  );
}
