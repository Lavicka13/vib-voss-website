import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ContactForm } from "@/components/forms/ContactForm";
import { kontakt } from "@/content/kontakt";

export const metadata: Metadata = {
  title: "Kontakt | V.I.B. Voß Immobilien Beratung",
  description: kontakt.hero.subline,
};

export default function KontaktPage() {
  return (
    <>
      <Hero headline={kontakt.hero.headline} subline={kontakt.hero.subline} />
      <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-section-gap-mobile md:pb-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <aside className="md:col-span-5 flex flex-col gap-6">
            <h2 className="font-display text-headline-md text-primary">So erreichen Sie mich</h2>
            <ul className="space-y-4 font-body text-body-lg text-primary">
              <li>
                <a href={kontakt.daten.telefonHref} className="hover:text-secondary transition-colors">
                  {kontakt.daten.telefon}
                </a>
              </li>
              <li>
                <a href={kontakt.daten.emailHref} className="hover:text-secondary transition-colors">
                  {kontakt.daten.email}
                </a>
              </li>
              <li className="text-muted-text">
                {kontakt.daten.adresse.strasse}<br />
                {kontakt.daten.adresse.plz} {kontakt.daten.adresse.ort}
              </li>
            </ul>
            <p className="font-body italic text-muted-text mt-4">{kontakt.hinweis}</p>
          </aside>
          <div className="md:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
