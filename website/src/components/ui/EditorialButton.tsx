import Link from "next/link";

type Variant = "primary" | "secondary";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
};

/**
 * EditorialButton
 *
 * Same vocabulary as the Hero CTAs — wide tracking caps, growing-line indicator,
 * rising zartrosa wash on hover. Use everywhere CTAs appear so the page reads
 * as one publication.
 */
export function EditorialButton({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: Props) {
  const base =
    "group relative inline-flex items-center justify-center gap-3 px-9 py-[18px] " +
    "font-body text-[11px] tracking-[0.32em] uppercase overflow-hidden " +
    "transition-all duration-500 cursor-pointer";

  const variantClass =
    variant === "primary"
      ? "bg-primary text-on-primary hover:bg-secondary"
      : "border border-primary/80 text-primary hover:border-secondary hover:text-secondary";

  const lineClass =
    variant === "primary"
      ? "bg-on-primary"
      : "bg-primary group-hover:bg-secondary";

  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  const isHash = href.startsWith("#");

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <span
        className={
          "relative z-10 block w-4 h-px transition-all duration-500 group-hover:w-8 " +
          lineClass
        }
        aria-hidden="true"
      />
      {variant === "primary" && (
        <span
          className="absolute inset-0 bg-zartrosa translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (isHash || external) {
    return (
      <a href={href} className={`${base} ${variantClass} ${className}`} {...linkProps}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${variantClass} ${className}`}>
      {inner}
    </Link>
  );
}
