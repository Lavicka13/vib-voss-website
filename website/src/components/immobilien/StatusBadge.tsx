import type { ImmobilieStatus } from "@/content/immobilien";

const labels: Record<ImmobilieStatus, string> = {
  diskret: "Diskret",
  verfuegbar: "Verfügbar",
  "auf-anfrage": "Auf Anfrage",
  verkauft: "Verkauft",
};

const styles: Record<ImmobilieStatus, string> = {
  diskret: "bg-primary text-on-primary",
  verfuegbar: "bg-surface-ivory border border-border-taupe text-primary",
  "auf-anfrage": "bg-zartrosa text-primary",
  verkauft: "bg-muted-text text-on-primary",
};

type Props = {
  status: ImmobilieStatus;
};

export function StatusBadge({ status }: Props) {
  return (
    <span
      className={`inline-block font-body text-label-caps uppercase tracking-widest px-3 py-1 rounded-sm ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
