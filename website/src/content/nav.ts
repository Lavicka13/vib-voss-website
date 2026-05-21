export const navItems = [
  { label: "HOME", href: "/" },
  { label: "ÜBER MICH", href: "/ueber-mich" },
  { label: "LEISTUNGEN", href: "/leistungen" },
  { label: "IMMOBILIEN", href: "/immobilien" },
  { label: "IMMOBILIENSUCHE", href: "/immobiliensuche" },
  { label: "KONTAKT", href: "/kontakt" },
] as const;

export type NavItem = (typeof navItems)[number];
