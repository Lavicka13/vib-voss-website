import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExposeHero } from "@/components/immobilien/ExposeHero";
import { ExposeDataBlock } from "@/components/immobilien/ExposeDataBlock";
import { ExposeAusstattungList } from "@/components/immobilien/ExposeAusstattungList";
import { CTABlock } from "@/components/sections/CTABlock";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { immobilien } from "@/content/immobilien";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return immobilien.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const found = immobilien.find((i) => i.slug === slug);
  if (!found) return { title: "Immobilie nicht gefunden | V.I.B." };
  const desc = found.beschreibung[0]?.slice(0, 160) ?? "Exklusive Immobilie im Rhein-Neckar-Raum.";
  return {
    title: `${found.titel} | V.I.B.`,
    description: desc,
  };
}

export default async function ImmobilieDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const immobilie = immobilien.find((i) => i.slug === slug);
  if (!immobilie) notFound();
  return (
    <article>
      <ExposeHero immobilie={immobilie} />
      <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
        <div className="prose max-w-3xl font-body text-body-lg text-on-surface-variant leading-relaxed space-y-6">
          {immobilie.beschreibung.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </section>
      <RevealOnScroll>
        <ExposeDataBlock immobilie={immobilie} />
      </RevealOnScroll>
      {immobilie.ausstattung && immobilie.ausstattung.length > 0 && (
        <RevealOnScroll>
          <ExposeAusstattungList items={immobilie.ausstattung} />
        </RevealOnScroll>
      )}
      <CTABlock
        headline="Interesse an diesem Objekt?"
        sub="Vereinbaren Sie einen unverbindlichen Besichtigungstermin."
        button={{ label: "Besichtigung anfragen", href: "/kontakt" }}
      />
    </article>
  );
}
