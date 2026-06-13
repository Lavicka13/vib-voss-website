type Props = {
  items: readonly string[];
};

export function ReferenzAusstattungList({ items }: Props) {
  if (items.length === 0) return null;
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
      {items.map((item) => (
        <li
          key={item}
          className="border border-border-taupe bg-surface px-4 py-3 font-body text-body-md text-on-surface-variant leading-snug"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
