import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
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
      <Hero
        headline="Impressum"
        subline="Pflichtangaben gemäß §5 TMG und §55 RStV."
      />
      <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-section-gap-mobile md:pb-section-gap">
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
              <dt className="text-muted-text">USt-IdNr.:</dt>
              <dd>
                <TodoMarker value={impressum.steuerliches.ustId} />
              </dd>
            </dl>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-headline-md text-primary">Berufsrechtliche Angaben</h2>
            <dl className="font-body text-body-lg text-on-surface-variant grid grid-cols-1 md:grid-cols-[200px_1fr] gap-y-2 gap-x-6">
              <dt className="text-muted-text">Erlaubnis:</dt>
              <dd>
                Erlaubnis nach §34c GewO erteilt durch{" "}
                <TodoMarker value={impressum.berufsrechtlich.aufsichtsbehoerde} />
              </dd>
              <dt className="text-muted-text">Aufsichtsbehörde:</dt>
              <dd>
                <TodoMarker value={impressum.berufsrechtlich.aufsichtsbehoerde} />
              </dd>
              <dt className="text-muted-text">Berufshaftpflicht:</dt>
              <dd>
                <TodoMarker value={impressum.berufsrechtlich.berufshaftpflicht} />
              </dd>
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
