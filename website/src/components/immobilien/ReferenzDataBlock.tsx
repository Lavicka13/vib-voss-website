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

type Props = {
  eckdaten: Eckdaten;
  bauinfo: Bauinfo;
  verfuegbar?: string;
};

type Row = { label: string; value: string };

const BLOCK_NUMERALS = ["i", "ii", "iii"] as const;

export function ReferenzDataBlock({ eckdaten, bauinfo, verfuegbar }: Props) {
  const objektRows: Row[] = [];
  if (eckdaten.wohnflaeche) objektRows.push({ label: "Wohnfläche", value: eckdaten.wohnflaeche });
  if (eckdaten.nutzflaeche) objektRows.push({ label: "Nutzfläche", value: eckdaten.nutzflaeche });
  if (eckdaten.grundstueck) objektRows.push({ label: "Grundstücksfläche", value: eckdaten.grundstueck });
  if (eckdaten.zimmer !== undefined) objektRows.push({ label: "Zimmer", value: String(eckdaten.zimmer) });
  if (eckdaten.schlafzimmer !== undefined) objektRows.push({ label: "Schlafzimmer", value: String(eckdaten.schlafzimmer) });
  if (eckdaten.badezimmer !== undefined) objektRows.push({ label: "Badezimmer", value: String(eckdaten.badezimmer) });
  if (eckdaten.balkonTerrasse !== undefined) {
    const val = eckdaten.balkonFlaeche
      ? `${eckdaten.balkonTerrasse} (${eckdaten.balkonFlaeche})`
      : String(eckdaten.balkonTerrasse);
    objektRows.push({ label: "Balkon / Terrasse", value: val });
  }
  if (eckdaten.stellplaetze !== undefined) objektRows.push({ label: "Stellplätze", value: String(eckdaten.stellplaetze) });

  const bauRows: Row[] = [];
  if (bauinfo.baujahr) bauRows.push({ label: "Baujahr", value: String(bauinfo.baujahr) });
  if (bauinfo.letzteModernisierung) bauRows.push({ label: "Letzte Modernisierung", value: String(bauinfo.letzteModernisierung) });
  if (bauinfo.zustand) bauRows.push({ label: "Zustand", value: bauinfo.zustand });
  if (bauinfo.denkmalgeschuetzt) bauRows.push({ label: "Denkmalschutz", value: "Ja" });
  if (verfuegbar) bauRows.push({ label: "Verfügbar ab", value: verfuegbar });

  const energieRows: Row[] = [];
  if (bauinfo.energieausweis) energieRows.push({ label: "Energieausweis", value: bauinfo.energieausweis });
  if (bauinfo.primaerenergie) energieRows.push({ label: "Primärenergieträger", value: bauinfo.primaerenergie });
  if (bauinfo.heizung) energieRows.push({ label: "Heizungsart", value: bauinfo.heizung });
  if (bauinfo.warmwasser) energieRows.push({ label: "Warmwasser", value: "Ja" });

  const blocks: { title: string; rows: Row[] }[] = [
    { title: "Objektdaten", rows: objektRows },
    { title: "Bauinformation", rows: bauRows },
    { title: "Energie & Heizung", rows: energieRows },
  ];
  const visible = blocks.filter((b) => b.rows.length > 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-gutter gap-y-10">
      {visible.map((b, i) => (
        <Block key={b.title} index={i} title={b.title} rows={b.rows} />
      ))}
    </div>
  );
}

function Block({ title, rows, index }: { title: string; rows: Row[]; index: number }) {
  return (
    <div className="border-t border-primary/30 pt-7 md:pt-9 pb-2 flex flex-col gap-7 md:gap-8">
      <div className="flex items-baseline gap-4 md:gap-5">
        <span className="font-display italic text-[32px] md:text-[42px] leading-none text-primary">
          {(BLOCK_NUMERALS[index] ?? String(index + 1)).toString()}.
        </span>
        <span className="font-body text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-secondary/80">
          {title}
        </span>
      </div>
      <dl className="flex flex-col gap-5">
        {rows.map((row) => (
          <div key={row.label} className="flex flex-col gap-1">
            <dt className="font-body text-[10px] tracking-[0.24em] uppercase text-muted-text">
              {row.label}
            </dt>
            <dd className="font-body text-body-md text-primary leading-snug">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
