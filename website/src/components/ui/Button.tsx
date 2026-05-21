import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

type Props = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-body text-label-caps tracking-widest transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-on-primary hover:bg-secondary",
  secondary:
    "bg-transparent border border-primary text-primary hover:bg-surface-container-low",
  ghost: "bg-transparent text-primary hover:text-secondary",
};

export function Button({
  variant = "primary",
  className,
  children,
  href,
  onClick,
  type = "button",
  disabled,
  fullWidth,
}: Props) {
  const classes = cn(base, variants[variant], fullWidth && "w-full", className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
