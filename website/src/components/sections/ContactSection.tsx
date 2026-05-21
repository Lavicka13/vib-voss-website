import { ContactForm } from "@/components/forms/ContactForm";

export function ContactSection() {
  return (
    <section
      id="kontakt"
      className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <div className="md:col-span-5 flex flex-col gap-6">
          <h2 className="font-display text-display-lg-mobile md:text-headline-md text-primary">
            Lassen Sie uns gemeinsam den besten Weg für Ihre Immobilie finden.
          </h2>
          <p className="font-display italic text-signature-quote text-secondary">
            Persönlich. Diskret. Erfolgreich.
          </p>
          <ul className="space-y-3 font-body text-body-md text-primary mt-4">
            <li>
              <a href="tel:+491733601936" className="hover:text-secondary transition-colors">
                +49 173 360 19 36
              </a>
            </li>
            <li>
              <a href="mailto:info@e-vib.de" className="hover:text-secondary transition-colors">
                info@e-vib.de
              </a>
            </li>
            <li className="text-muted-text">Alte Schulstraße 28, 68549 Ilvesheim</li>
            <li className="text-muted-text text-body-md mt-4 italic">
              Auch am Wochenende erreichbar.
            </li>
          </ul>
        </div>
        <div className="md:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
