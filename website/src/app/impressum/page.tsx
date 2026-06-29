import type { Metadata } from "next";
import { impressum } from "@/content/impressum";

export const metadata: Metadata = {
  title: "Impressum | V.I.B. Voß Immobilien Beratung",
  description: "Pflichtangaben gemäß §5 TMG.",
  robots: { index: true, follow: false },
};

function TodoMarker({ value }: { value: string }) {
  if (value.includes("TODO_VON_EDITH")) {
    return (
      <span className="bg-zartrosa/60 text-primary px-2 py-0.5 rounded text-sm font-body">
        [TODO vor Live-Schaltung]
      </span>
    );
  }
  return <>{value}</>;
}

export default function ImpressumPage() {
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
          Impressum
        </h1>
        <p className="font-body text-body-md text-muted-text mt-4">
          Pflichtangaben gemäß §5 TMG und §55 RStV.
        </p>
      </header>
      <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-16 md:pt-24 pb-section-gap-mobile md:pb-section-gap">
        <div className="max-w-3xl flex flex-col gap-12">

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-headline-md text-primary">Anbieter</h2>
            <p className="font-body text-body-lg text-on-surface-variant">
              {impressum.anbieter.firma}<br />
              Inhaberin: {impressum.anbieter.inhaberin}<br />
              {impressum.anbieter.rechtsform}
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-headline-md text-primary">Anschrift</h2>
            <p className="font-body text-body-lg text-on-surface-variant">
              {impressum.anschrift.strasse}<br />
              {impressum.anschrift.plz} {impressum.anschrift.ort}<br />
              {impressum.anschrift.land}
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-headline-md text-primary">Kontakt</h2>
            <p className="font-body text-body-lg text-on-surface-variant">
              Telefon:{" "}
              <a
                href={`tel:${impressum.kontakt.telefon.replace(/\s+/g, "")}`}
                className="underline hover:text-primary"
              >
                {impressum.kontakt.telefon}
              </a>
              <br />
              E-Mail:{" "}
              <a
                href={`mailto:${impressum.kontakt.email}`}
                className="underline hover:text-primary"
              >
                {impressum.kontakt.email}
              </a>
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-headline-md text-primary">Steuerliches</h2>
            <dl className="font-body text-body-lg text-on-surface-variant grid grid-cols-1 md:grid-cols-[200px_1fr] gap-y-2 gap-x-6">
              <dt className="text-muted-text">Steuernummer:</dt>
              <dd>{impressum.steuerliches.steuernummer}</dd>
            </dl>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-headline-md text-primary">Berufsrechtliche Angaben</h2>
            <dl className="font-body text-body-lg text-on-surface-variant grid grid-cols-1 md:grid-cols-[200px_1fr] gap-y-2 gap-x-6">
              <dt className="text-muted-text">Erlaubnis:</dt>
              <dd>
                {impressum.berufsrechtlich.erlaubnis}, erteilt durch{" "}
                <TodoMarker value={impressum.berufsrechtlich.erlaubnisBehoerde} />
              </dd>
              <dt className="text-muted-text">Aufsichtsbehörde:</dt>
              <dd>{impressum.berufsrechtlich.aufsichtsbehoerde}</dd>
            </dl>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-headline-md text-primary">
              EU-Streitschlichtung &amp; Verbraucherschlichtung
            </h2>
            <p className="font-body text-body-md text-on-surface-variant">
              {impressum.hinweise.streitschlichtung}
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-headline-md text-primary">Haftungsausschluss</h2>
            <p className="font-body text-body-md text-on-surface-variant">
              {impressum.hinweise.haftungInhalt}
            </p>
            <p className="font-body text-body-md text-on-surface-variant">
              {impressum.hinweise.haftungLinks}
            </p>
          </section>

        </div>
      </section>
    </>
  );
}
