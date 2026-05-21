import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-border-taupe mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-start px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap w-full max-w-container-max mx-auto gap-12 md:gap-0">
        <div className="flex flex-col gap-4 max-w-sm">
          <Image src="/logo-mark.svg" alt="V.I.B. Voß Immobilien Beratung" width={140} height={50} unoptimized className="mb-2" />
          <p className="font-body text-body-md text-muted-text">
            Voß Immobilien Beratung — Edith Voss
            <br />
            Alte Schulstraße 28, 68549 Ilvesheim
          </p>
          <p className="font-body text-body-md text-muted-text">
            <a href="tel:+491733601936" className="hover:text-secondary transition-colors">
              +49 173 360 19 36
            </a>
            <br />
            <a href="mailto:info@e-vib.de" className="hover:text-secondary transition-colors">
              info@e-vib.de
            </a>
          </p>
          <p className="font-display italic text-body-md text-primary mt-4">
            &bdquo;Man lebt nur einmal &mdash; wir zeigen Ihnen wo.&ldquo;
          </p>
        </div>
        <nav className="flex flex-col gap-4">
          <Link href="/impressum" className="font-body text-body-md text-muted-text hover:text-secondary transition-colors">
            Impressum
          </Link>
          <Link href="/datenschutz" className="font-body text-body-md text-muted-text hover:text-secondary transition-colors">
            Datenschutz
          </Link>
          <Link href="/kontakt" className="font-body text-body-md text-muted-text hover:text-secondary transition-colors">
            Kontakt
          </Link>
          <p className="font-body text-body-md text-muted-text mt-8">
            © {new Date().getFullYear()} V.I.B. Voß Immobilien Beratung
          </p>
        </nav>
      </div>
    </footer>
  );
}
