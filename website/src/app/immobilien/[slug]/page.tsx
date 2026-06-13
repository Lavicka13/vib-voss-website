import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { home } from "@/content/home";
import { ReferenzHero } from "@/components/immobilien/ReferenzHero";
import { ReferenzGalerie } from "@/components/immobilien/ReferenzGalerie";
import { ReferenzDataBlock } from "@/components/immobilien/ReferenzDataBlock";
import { ReferenzAusstattungList } from "@/components/immobilien/ReferenzAusstattungList";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHead } from "@/components/ui/SectionHead";
import { EditorialButton } from "@/components/ui/EditorialButton";

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
  preis?: string;
  eckdaten: Eckdaten;
  bauinfo: Bauinfo;
  verfuegbar?: string;
  beschreibung: readonly string[];
  lage?: string;
  ausstattung: readonly string[];
  bilder?: readonly string[];
};

function getItem(slug: string): Item | undefined {
  const found = home.immobilien.items.find((i) => i.slug === slug);
  return found as Item | undefined;
}

export function generateStaticParams() {
  return home.immobilien.items.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getItem(slug);
  if (!item) return { title: "Immobilie nicht gefunden" };
  const title = `${item.titel} — V.I.B. Voß Immobilien Beratung`;
  const description = `${item.untertitel ?? item.titel} in ${item.ort}. Verfügbarkeit auf Anfrage bei Edith Voss.`;
  return {
    title,
    description,
    robots: { index: true, follow: true },
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

  const hasGalerie = (item.bilder?.length ?? 0) > 1;

  const quickKpis: { label: string; value: string }[] = [];
  if (item.preis) quickKpis.push({ label: "Preis", value: item.preis });
  if (item.eckdaten.zimmer !== undefined) quickKpis.push({ label: "Zimmer", value: String(item.eckdaten.zimmer) });
  if (item.eckdaten.schlafzimmer !== undefined) quickKpis.push({ label: "Schlafzimmer", value: String(item.eckdaten.schlafzimmer) });
  if (item.eckdaten.wohnflaeche) quickKpis.push({ label: "Wohnfläche", value: item.eckdaten.wohnflaeche });


  return (
    <>
      <ReferenzHero
        titel={item.titel}
        untertitel={item.untertitel}
        ort={item.ort}
        image={item.image}
        hideImage={hasGalerie}
      />

      {hasGalerie && item.bilder && (
        <ReferenzGalerie images={item.bilder} titel={item.titel} />
      )}

      {/* ─────────────── KPI strip (editorial) ─────────────── */}
      {quickKpis.length > 0 && (
        <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-16">
          <RevealOnScroll>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 sm:gap-x-8 md:gap-x-gutter gap-y-7 md:gap-y-8">
              {quickKpis.map((kpi, i) => (
                <div
                  key={kpi.label}
                  className="border-t border-primary/30 pt-4 md:pt-5 flex flex-col gap-2 md:gap-3 min-w-0"
                >
                  <span className="font-body text-[9px] md:text-[10px] tracking-[0.28em] md:tracking-[0.32em] uppercase text-secondary/80 truncate">
                    {kpi.label}
                  </span>
                  <span className="font-display text-[22px] md:text-headline-md text-primary leading-tight mt-1 break-words">
                    {kpi.value}
                  </span>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </section>
      )}

      {/* ─────────────── II. BESCHREIBUNG ─────────────── */}
      <section className="relative w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap border-t border-border-taupe">
        <div className="bg-grain absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none" aria-hidden="true" />
        <div className="relative">
          <RevealOnScroll>
            <SectionHead
              eyebrow="Konzept"
              headline="Beschreibung des Objekts."
              accentIndex={2}
              headlineClassName="text-display-lg-mobile md:text-headline-md"
            />
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
              <div className="md:col-span-4 md:col-start-1 hidden md:block">
                <div className="font-display italic text-secondary text-[60px] lg:text-[80px] leading-none opacity-30 select-none -mt-2">
                  &mdash;
                </div>
                <span className="font-body text-[10px] tracking-[0.4em] uppercase text-secondary/70 block mt-4">
                  Ein Portrait
                </span>
              </div>
              <div className="md:col-span-7 md:col-start-6 flex flex-col gap-5">
                {item.beschreibung.map((p, i) => (
                  <p
                    key={i}
                    className="font-body text-body-lg text-on-surface-variant leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─────────────── III. LAGE ─────────────── */}
      {item.lage && (
        <section className="w-full bg-surface-ivory border-y border-border-taupe">
          <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
            <RevealOnScroll>
              <SectionHead
                eyebrow="Umgebung"
                headline="Lage & Anbindung."
                accentIndex={2}
                headlineClassName="text-display-lg-mobile md:text-headline-md"
              />
            </RevealOnScroll>
            <RevealOnScroll>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
                <p className="font-body text-body-lg text-on-surface-variant leading-relaxed md:col-span-7 md:col-start-6">
                  {item.lage}
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ─────────────── IV. ECKDATEN ─────────────── */}
      <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap border-t border-border-taupe">
        <RevealOnScroll>
          <SectionHead
            eyebrow="Daten & Fakten"
            headline="Eckdaten im Überblick."
            accentIndex={2}
            headlineClassName="text-display-lg-mobile md:text-headline-md"
          />
        </RevealOnScroll>
        <RevealOnScroll>
          <ReferenzDataBlock
            eckdaten={item.eckdaten}
            bauinfo={item.bauinfo}
            verfuegbar={item.verfuegbar}
          />
        </RevealOnScroll>
      </section>

      {/* ─────────────── V. AUSSTATTUNG ─────────────── */}
      {item.ausstattung.length > 0 && (
        <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap border-t border-border-taupe">
          <RevealOnScroll>
            <SectionHead
              eyebrow="Inventar"
              headline="Ausstattung im Detail."
              accentIndex={2}
              headlineClassName="text-display-lg-mobile md:text-headline-md"
            />
          </RevealOnScroll>
          <RevealOnScroll>
            <ReferenzAusstattungList items={item.ausstattung} />
          </RevealOnScroll>
        </section>
      )}

      {/* ─────────────── Exposé-Anfrage & Hinweise zur Haftung ─────────────── */}
      <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap border-t border-border-taupe">
        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
            <div className="md:col-span-5 flex flex-col gap-5">
              <h2 className="font-display text-display-lg-mobile md:text-headline-md text-primary leading-tight">
                Sie möchten ein ausführliches Exposé erhalten?
              </h2>
              <p className="font-body text-body-md text-muted-text leading-relaxed">
                Sprechen Sie mich direkt an, telefonisch oder über das Kontaktformular. Das vollständige Exposé mit allen Unterlagen erhalten Sie persönlich von mir.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-1">
                <EditorialButton variant="primary" href="/#kontakt">
                  Mit mir sprechen
                </EditorialButton>
                <a
                  href="tel:+491733601936"
                  className="font-body text-body-md text-primary hover:text-secondary transition-colors"
                >
                  +49 173 360 19 36
                </a>
              </div>
            </div>
            <div className="md:col-span-6 md:col-start-7 flex flex-col gap-4 border-t border-primary/20 pt-6 md:border-t-0 md:pt-1">
              <span className="font-body text-[10px] tracking-[0.32em] uppercase text-secondary/80">
                Hinweise zur Haftung
              </span>
              <p className="font-body text-[13px] text-muted-text leading-relaxed">
                Einige Bilder wurden zur besseren Visualisierung der Nutzungsmöglichkeiten digital möbliert (virtuelles Homestaging). Die dargestellte Einrichtung dient lediglich der Illustration und ist nicht Bestandteil des Angebots.
              </p>
              <p className="font-body text-[13px] text-muted-text leading-relaxed">
                Alle Angaben zu diesem Objekt beruhen auf den Informationen des Eigentümers. Eine Haftung für die Richtigkeit, Vollständigkeit oder Aktualität können wir nicht übernehmen. Es obliegt dem Interessenten, die Angaben eigenständig zu prüfen. Unsere Angebote sind freibleibend; Zwischenverkauf, Vermietung und sonstige Änderungen bleiben vorbehalten.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* ─────────────── Closer (Hero-echo) ─────────────── */}
      <section className="relative w-full overflow-hidden bg-zartrosa/25 border-y border-border-taupe">
        <div className="bg-grain absolute inset-0 opacity-[0.05] mix-blend-multiply pointer-events-none" aria-hidden="true" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(70% 60% at 50% 30%, rgba(244,212,198,0.4) 0%, rgba(244,212,198,0) 65%)",
          }}
          aria-hidden="true"
        />
        <div className="relative w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
          <div className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4">
              <span className="block h-px w-12 bg-primary/40" aria-hidden="true" />
              <span className="font-body text-[10px] tracking-[0.4em] uppercase text-secondary">
                Coda · Folio MMXXVI
              </span>
              <span className="block h-px w-12 bg-primary/40" aria-hidden="true" />
            </div>
            <h2
              className="font-display text-primary leading-[0.95]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Sie suchen ein ähnliches{" "}
              <span className="italic font-light text-edge-light">Objekt?</span>
            </h2>
            <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
              Aktuelle Immobilien vermittle ich diskret aus meinem gewachsenen Netzwerk, oft schon vor der offiziellen Vermarktung. Hinterlegen Sie Ihr Suchprofil oder besprechen Sie Ihre Verkaufsabsicht persönlich mit mir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <EditorialButton variant="primary" href="/#kontakt">
                Mit mir sprechen
              </EditorialButton>
              <EditorialButton variant="secondary" href="/#aktuelle-immobilien">
                Alle Immobilien ansehen
              </EditorialButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
