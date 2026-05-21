import type { Immobilie } from "@/content/immobilien";

type Props = {
  immobilie: Immobilie;
};

export function ExposeDataBlock({ immobilie }: Props) {
  const rows: Array<[string, string | number | undefined]> = [
    ["Ort", immobilie.ort],
    ["Art", immobilie.art],
    ["Wohnfläche", `ca. ${immobilie.wohnflaeche} m²`],
    ["Grundstück", immobilie.grundstueck ? `ca. ${immobilie.grundstueck} m²` : undefined],
    ["Zimmer", immobilie.zimmer],
    ["Schlafzimmer", immobilie.schlafzimmer],
    ["Badezimmer", immobilie.badezimmer],
    ["Preis", immobilie.preis],
  ];
  const visible = rows.filter(([, v]) => v !== undefined && v !== null && v !== "");
  return (
    <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
      <h2 className="font-display text-headline-md text-primary mb-8">Eckdaten</h2>
      <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-4">
        {visible.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 border-b border-border-taupe py-3">
            <dt className="font-body text-body-md text-muted-text">{label}</dt>
            <dd className="font-body text-body-md text-primary text-right">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
