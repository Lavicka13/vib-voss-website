"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ContactForm } from "@/components/forms/ContactForm";
import { widerruf } from "@/content/widerruf";

const EASE: [number, number, number, number] = [0.16, 0.84, 0.24, 1];

export function ContactSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="kontakt"
      className="relative w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap border-t border-border-taupe"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-12">
        <div className="col-span-12">
          <div className="flex items-center gap-4 mb-5">
            <motion.span
              initial={shouldReduce ? { width: 48 } : { width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
              className="block h-px bg-primary/40"
              aria-hidden="true"
            />
            <span className="font-body text-[10px] md:text-[11px] tracking-[0.36em] uppercase text-secondary">
              Kontakt
            </span>
          </div>
          <h2
            className="font-display text-display-lg-mobile md:text-display-lg text-primary leading-[0.95] max-w-3xl"
          >
            Lassen Sie uns gemeinsam den besten Weg für Ihre Immobilie{" "}
            <span className="italic font-light md:text-transparent md:[-webkit-text-stroke:1px_rgba(0,0,0,0.92)]">finden.</span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <div className="md:col-span-5 flex flex-col gap-6">
          <p className="font-display italic text-signature-quote text-secondary">
            Persönlich. Diskret. Erfolgreich.
          </p>
          <ul className="space-y-3 font-body text-body-md text-primary mt-4">
            <li className="flex items-center gap-3">
              <span className="block w-1.5 h-1.5 rounded-full bg-secondary shrink-0" aria-hidden="true" />
              <a href="tel:+491733601936" className="hover:text-secondary transition-colors">
                +49 173 360 19 36
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="block w-1.5 h-1.5 rounded-full bg-secondary shrink-0" aria-hidden="true" />
              <a href="mailto:info@e-vib.de" className="hover:text-secondary transition-colors">
                info@e-vib.de
              </a>
            </li>
            <li className="flex items-center gap-3 text-muted-text">
              <span className="block w-1.5 h-1.5 rounded-full bg-secondary shrink-0" aria-hidden="true" />
              <span>Alte Schulstraße 28, 68549 Ilvesheim</span>
            </li>
            <li className="text-muted-text text-body-md mt-4 italic pl-[18px]">
              Auch am Wochenende erreichbar.
            </li>
          </ul>
        </div>
        <div className="md:col-span-7">
          <ContactForm />
        </div>
      </div>

      {/* Widerrufsbelehrung — ausklappbar (Maklervertrag, V.I.B. Voß als Anbieter) */}
      <details className="group mt-12 border-t border-border-taupe pt-6">
        <summary className="flex items-center justify-between cursor-pointer list-none font-body text-[11px] tracking-[0.28em] uppercase text-secondary hover:text-primary transition-colors">
          <span>{widerruf.title}</span>
          <span className="font-display text-[20px] leading-none transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
            +
          </span>
        </summary>
        <div className="mt-6 flex flex-col gap-6 max-w-3xl">
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            {widerruf.intro}
          </p>
          {widerruf.sections.map((s) => (
            <div key={s.heading} className="flex flex-col gap-2">
              <h3 className="font-display text-body-lg text-primary">{s.heading}</h3>
              {s.body.map((p, i) => (
                <p key={i} className="font-body text-body-md text-muted-text leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          ))}
          <p className="font-body text-[12px] text-muted-text italic">{widerruf.pruefHinweis}</p>
        </div>
      </details>
    </section>
  );
}
