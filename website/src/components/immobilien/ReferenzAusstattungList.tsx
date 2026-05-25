type Props = {
  items: readonly string[];
};

export function ReferenzAusstattungList({ items }: Props) {
  if (items.length === 0) return null;
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-display text-display-lg-mobile md:text-headline-md text-primary">
        Ausstattung
      </h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 font-body text-body-md text-on-surface-variant"
          >
            <span className="text-secondary mt-1.5 shrink-0">—</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
