import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { home } from "@/content/home";
import { ReferenzDisclaimer } from "@/components/immobilien/ReferenzDisclaimer";
import { ReferenzHero } from "@/components/immobilien/ReferenzHero";
import { ReferenzDataBlock } from "@/components/immobilien/ReferenzDataBlock";
import { ReferenzAusstattungList } from "@/components/immobilien/ReferenzAusstattungList";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type Eckdaten = {
  wohnflaeche?: string;
  grundstueck?: string;
  nutzflaeche?: string;
  zimmer?: number;
  schlafzimmer?: number;
  badezimmer?: number;
  balkonTerrasse?: number;
  balkonFlaeche?: string;
  stellplaetze?: number;
};

type Bauinfo = {
  baujahr?: number;
  letzteModernisierung?: number;
  zustand?: string;
  energieausweis?: string;
  primaerenergie?: string;
  heizung?: string;
  denkmalgeschuetzt?: boolean;
  warmwasser?: boolean;
};

type Item = {
  slug: string;
  titel: string;
  untertitel?: string;
  ort: string;
  image: string | null;
  preisSeinerzeit?: string;
  eckdaten: Eckdaten;
  bauinfo: Bauinfo;
  verfuegbar?: string;
  beschreibung: readonly string[];
  lage?: string;
  ausstattung: readonly string[];
};

function getItem(slug: string): Item | undefined {
  const found = home.referenzen.items.find((i) => i.slug === slug);
  return found as Item | undefined;
}

export function generateStaticParams() {
  return home.referenzen.items.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item) return { title: "Referenz nicht gefunden" };
  const title = `${item.titel} — V.I.B. Voß Immobilien Beratung`;
  const description = `Referenz aus früheren Vermarktungen — ${item.untertitel ?? item.titel} in ${item.ort}. Aktuelle Verfügbarkeit auf Anfrage bei Edith Voss.`;
  return {
    title,
    description,
    robots: { index: false, follow: true },
    openGraph: {
      title,
      description,
      type: "article",
      locale: "de_DE",
      ...(item.image ? { images: [{ url: item.image, width: 1600, height: 1200, alt: item.titel }] } : {}),
    },
  };
}

export default async function ImmobilieDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item) notFound();

  const quickKpis: { label: string; value: string }[] = [];
  if (item.preisSeinerzeit) quickKpis.push({ label: "Preis", value: item.preisSeinerzeit });
  if (item.eckdaten.zimmer !== undefined) quickKpis.push({ label: "Zimmer", value: String(item.eckdaten.zimmer) });
  if (item.eckdaten.schlafzimmer !== undefined) quickKpis.push({ label: "Schlafzimmer", value: String(item.eckdaten.schlafzimmer) });
  if (item.eckdaten.wohnflaeche) quickKpis.push({ label: "Wohnfläche", value: item.eckdaten.wohnflaeche });

  return (
    <>
      <ReferenzDisclaimer />

      <ReferenzHero
        titel={item.titel}
        untertitel={item.untertitel}
        ort={item.ort}
        image={item.image}
      />

      {quickKpis.length > 0 && (
        <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-16">
          <RevealOnScroll>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border-taupe border border-border-taupe rounded-lg overflow-hidden">
              {quickKpis.map((kpi) => (
                <div key={kpi.label} className="bg-surface p-6 md:p-8 flex flex-col gap-2">
                  <span className="font-body text-label-caps uppercase tracking-widest text-muted-text">
                    {kpi.label}
                  </span>
                  <span className="font-display text-headline-md text-primary leading-tight">
                    {kpi.value}
                  </span>
                </div>
              ))}
            </div>
            {item.preisSeinerzeit && (
              <p className="font-body text-body-md text-muted-text italic mt-4">
                Die Preisangabe bezieht sich auf die seinerzeitige Vermarktung. Aktuelle Verfügbarkeit und Konditionen auf Anfrage.
              </p>
            )}
          </RevealOnScroll>
        </section>
      )}

      <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap border-t border-border-taupe">
        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="md:col-span-4">
              <h2 className="font-display text-display-lg-mobile md:text-headline-md text-primary">
                Beschreibung
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6 flex flex-col gap-5">
              {item.beschreibung.map((p, i) => (
                <p key={i} className="font-body text-body-lg text-on-surface-variant leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {item.lage && (
        <section className="w-full bg-surface-ivory border-y border-border-taupe">
          <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
            <RevealOnScroll>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
                <div className="md:col-span-4">
                  <h2 className="font-display text-display-lg-mobile md:text-headline-md text-primary">
                    Lage
                  </h2>
                </div>
                <div className="md:col-span-7 md:col-start-6">
                  <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
                    {item.lage}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      )}

      <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
        <RevealOnScroll>
          <div className="flex flex-col gap-8">
            <h2 className="font-display text-display-lg-mobile md:text-headline-md text-primary">
              Eckdaten im Überblick
            </h2>
            <ReferenzDataBlock
              eckdaten={item.eckdaten}
              bauinfo={item.bauinfo}
              verfuegbar={item.verfuegbar}
            />
          </div>
        </RevealOnScroll>
      </section>

      {item.ausstattung.length > 0 && (
        <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap border-t border-border-taupe">
          <RevealOnScroll>
            <ReferenzAusstattungList items={item.ausstattung} />
          </RevealOnScroll>
        </section>
      )}

      <section className="w-full bg-zartrosa/30 border-y border-border-taupe">
        <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
          <RevealOnScroll>
            <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
              <span className="font-body text-label-caps uppercase tracking-widest text-muted-text">
                Sie suchen ein ähnliches Objekt?
              </span>
              <h2 className="font-display text-display-lg-mobile md:text-display-lg text-primary">
                Sprechen Sie mich an.
              </h2>
              <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
                Aktuelle Objekte vermittle ich diskret aus meinem gewachsenen Netzwerk — oft schon vor der offiziellen Vermarktung. Hinterlegen Sie Ihr Suchprofil oder besprechen Sie Ihre Verkaufsabsicht persönlich mit mir.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Link
                  href="/#kontakt"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-body text-label-caps tracking-widest bg-primary text-on-primary hover:bg-secondary transition-colors duration-300"
                >
                  Mit mir sprechen
                </Link>
                <Link
                  href="/#referenzen"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-body text-label-caps tracking-widest bg-transparent border border-primary text-primary hover:bg-surface-container-low transition-colors duration-300"
                >
                  Weitere Referenzen
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
