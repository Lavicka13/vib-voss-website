type Props = {
  items: readonly string[];
};

const ROMAN_LOWER = [
  "i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x",
  "xi", "xii", "xiii", "xiv", "xv", "xvi", "xvii", "xviii", "xix", "xx",
  "xxi", "xxii", "xxiii", "xxiv", "xxv",
] as const;

export function ReferenzAusstattungList({ items }: Props) {
  if (items.length === 0) return null;
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-4">
      {items.map((item, i) => (
        <li
          key={item}
          className="flex items-baseline gap-3 font-body text-body-md text-on-surface-variant"
        >
          <span
            className="font-display italic text-[12px] text-secondary leading-none w-8 shrink-0"
            aria-hidden="true"
          >
            {ROMAN_LOWER[i] ?? String(i + 1)}.
          </span>
          <span className="flex-1">{item}</span>
        </li>
      ))}
    </ul>
  );
}
