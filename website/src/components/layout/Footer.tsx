import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-logo-rose mt-auto">
      {/* Top hairline */}
      <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="h-px bg-primary/15" aria-hidden="true" />
      </div>

      {/* Main */}
      <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-16 md:pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* ── Brand column ── */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <Link
              href="/"
              className="inline-block transition-opacity hover:opacity-90"
              aria-label="V.I.B. — Startseite"
            >
              <Image
                src="/images/logo/logo-mono-480.png"
                alt="V.I.B. Voß Immobilien Beratung"
                width={157}
                height={240}
                className="h-28 md:h-32 w-auto"
              />
            </Link>
            <p className="font-display italic text-signature-quote text-primary max-w-sm leading-snug mt-2">
              &bdquo;Man lebt nur einmal &mdash; wir zeigen Ihnen wo.&ldquo;
            </p>
          </div>

          {/* ── Kontakt column ── */}
          <div className="md:col-span-4 md:col-start-7 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="block h-px w-8 bg-primary/40" aria-hidden="true" />
              <span className="font-body text-[10px] tracking-[0.36em] uppercase text-primary/80">
                Kontakt
              </span>
            </div>
            <address className="not-italic flex flex-col gap-3 font-body text-body-md text-primary/90">
              <span>
                Voß Immobilien Beratung
                <br />
                Edith Voss
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

          {/* ── Verzeichnis column ── */}
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

      {/* Bottom bar */}
      <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-10">
        <div className="h-px bg-primary/15 mb-6" aria-hidden="true" />
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-4">
          <p className="font-body text-[11px] tracking-[0.18em] uppercase text-primary/70">
            © {year} V.I.B. Voß Immobilien Beratung
          </p>
          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="font-display italic text-[14px] text-secondary leading-none">
              Folio
            </span>
            <span className="block h-px w-8 bg-primary/40" aria-hidden="true" />
            <span className="font-body text-[10px] tracking-[0.4em] uppercase text-primary/70">
              MMXXVI · Rhein-Neckar
            </span>
          </div>
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
      <span className="block w-3 h-px bg-primary/40 transition-all duration-500 group-hover:w-6 group-hover:bg-secondary" aria-hidden="true" />
      <span>{children}</span>
    </Link>
  );
}
