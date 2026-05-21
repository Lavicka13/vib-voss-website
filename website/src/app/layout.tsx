import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "V.I.B. Voß Immobilien Beratung — Edith Voss",
  description:
    "Verkaufen aus Leidenschaft. Seit fast 30 Jahren begleite ich Eigentümer im Rhein-Neckar-Raum beim Verkauf besonderer Immobilien — persönlich, diskret und mit einem Netzwerk, das schon vor der Veröffentlichung wirkt.",
  metadataBase: new URL("https://e-vib.de"),
  openGraph: {
    title: "V.I.B. Voß Immobilien Beratung",
    description:
      "Verkaufen aus Leidenschaft — Edith Voss, Maklerin im Rhein-Neckar-Raum mit über 30 Jahren Erfahrung.",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${manrope.variable} ${playfair.variable}`}>
      <body className="bg-background text-on-surface-variant font-body antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
