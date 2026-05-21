import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { realEstateAgentSchema } from "@/lib/seo";

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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "V.I.B. Voß Immobilien Beratung",
    description:
      "Verkaufen aus Leidenschaft — Edith Voss, Maklerin im Rhein-Neckar-Raum mit über 30 Jahren Erfahrung.",
    locale: "de_DE",
    type: "website",
    siteName: "V.I.B. Voß Immobilien Beratung",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "V.I.B. Voß Immobilien Beratung — Verkaufen aus Leidenschaft",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "V.I.B. Voß Immobilien Beratung",
    description:
      "Verkaufen aus Leidenschaft — Edith Voss, Maklerin im Rhein-Neckar-Raum.",
    images: ["/og-image.jpg"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgentSchema) }}
        />
        <Header />
        <main className="flex-grow w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
