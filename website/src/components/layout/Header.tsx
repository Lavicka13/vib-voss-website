"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { navItems } from "@/content/nav";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-surface/95 backdrop-blur-sm border-b border-border-taupe sticky top-0 z-50 w-full">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 md:py-5 w-full max-w-container-max mx-auto">
        <Link
          href="/"
          className="block transition-opacity hover:opacity-80"
          onClick={() => setOpen(false)}
          aria-label="V.I.B. — Startseite"
        >
          <Image
            src="/images/logo/logo-mono-480.png"
            alt="V.I.B. Voß Immobilien Beratung"
            width={157}
            height={240}
            priority
            className="h-12 md:h-14 w-auto"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-body text-label-caps text-on-surface-variant hover:text-primary transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          className="md:hidden text-primary"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconX size={28} /> : <IconMenu2 size={28} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border-taupe bg-surface">
          <nav className="flex flex-col px-margin-mobile py-6 gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-body text-label-caps text-on-surface-variant"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
