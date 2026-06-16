import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden mt-auto bg-background print:hidden">
      {/* ── Durchgehende, gleichmäßige Warm-Tönung, damit sich das Logo einfügt (kein „Fleck") ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(250,206,194,0.07) 0%, rgba(250,206,194,0.18) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Top fade — weicher Übergang von der Sektion darüber ── */}
      <div
        className="absolute inset-x-0 top-0 h-24 md:h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-background) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Main ── */}
      <div className="relative w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-20 md:pt-28 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Brand column — Logo als gerahmte Tile, Spruch darunter */}
          <div className="md:col-span-5 flex flex-col gap-8">
            <Link
              href="/"
              className="group block w-fit rounded-lg overflow-hidden ring-1 ring-black/[0.06] shadow-[0_10px_34px_-12px_rgba(113,89,78,0.35)] transition-shadow duration-300 hover:shadow-[0_14px_40px_-12px_rgba(113,89,78,0.45)]"
              aria-label="V.I.B. — Startseite"
            >
              <Image
                src="/images/logo/logo-plaque-centered-720.png"
                alt="V.I.B. Voß Immobilien Beratung"
                width={208}
                height={261}
                className="h-36 md:h-44 w-auto block"
              />
            </Link>
          </div>

          {/* Kontakt column */}
          <div className="md:col-span-4 md:col-start-7 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="block h-px w-8 bg-primary/40" aria-hidden="true" />
              <span className="font-body text-[10px] tracking-[0.36em] uppercase text-primary/80">
                Kontakt
              </span>
            </div>
            <address className="not-italic flex flex-col gap-3 font-body text-body-md text-primary/90">
              <span>
                V.I.B. Voß Immobilien Beratung
                <br />
                Edith Voß
              </span>
              <span>
                Alte Schulstraße 28
                <br />
                68549 Ilvesheim
              </span>
              <span className="flex flex-col">
                <a
                  href="tel:+491733601936"
                  className="hover:text-secondary transition-colors"
                >
                  +49 173 360 19 36
                </a>
                <a
                  href="mailto:info@e-vib.de"
                  className="hover:text-secondary transition-colors"
                >
                  info@e-vib.de
                </a>
              </span>
            </address>
          </div>

          {/* Verzeichnis column */}
          <div className="md:col-span-3 md:col-start-11 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="block h-px w-8 bg-primary/40" aria-hidden="true" />
              <span className="font-body text-[10px] tracking-[0.36em] uppercase text-primary/80">
                Verzeichnis
              </span>
            </div>
            <nav className="flex flex-col gap-3 font-body text-body-md text-primary/90">
              <FooterLink href="/#kontakt">Kontakt</FooterLink>
              <FooterLink href="/impressum">Impressum</FooterLink>
              <FooterLink href="/datenschutz">Datenschutz</FooterLink>
            </nav>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-10">
        <div className="h-px bg-primary/20 mb-6" aria-hidden="true" />
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-4">
          <p className="font-body text-[11px] tracking-[0.18em] uppercase text-primary/70">
            © {year} V.I.B. Voß Immobilien Beratung
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-baseline gap-3 hover:text-secondary transition-colors"
    >
      <span
        className="block w-3 h-px bg-primary/40 transition-all duration-500 group-hover:w-6 group-hover:bg-secondary"
        aria-hidden="true"
      />
      <span>{children}</span>
    </Link>
  );
}
