export const navItems = [
  { label: "ÜBER MICH", href: "#ueber-mich" },
  { label: "LEISTUNGEN", href: "#leistungen" },
  { label: "IMMOBILIEN", href: "#immobilien" },
  { label: "REFERENZEN", href: "#referenzen" },
  { label: "REGION", href: "#region" },
  { label: "TIPPGEBER", href: "#tippgeber" },
  { label: "BEWERTUNGEN", href: "#bewertungen" },
  { label: "KONTAKT", href: "#kontakt" },
] as const;

export type NavItem = (typeof navItems)[number];
