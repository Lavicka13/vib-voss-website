export const navItems = [
  { label: "ÜBER MICH", href: "#ueber-mich" },
  { label: "LEISTUNGEN", href: "#leistungen" },
  { label: "REGION", href: "#region" },
  { label: "KONTAKT", href: "#kontakt" },
] as const;

export type NavItem = (typeof navItems)[number];
