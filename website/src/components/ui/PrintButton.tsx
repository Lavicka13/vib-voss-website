"use client";

import { IconPrinter } from "@tabler/icons-react";

export function PrintButton({ label = "Drucken / als PDF speichern" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print:hidden inline-flex items-center gap-3 font-body text-[11px] tracking-[0.28em] uppercase text-secondary hover:text-primary transition-colors cursor-pointer"
    >
      <IconPrinter size={16} strokeWidth={1.5} />
      <span>{label}</span>
    </button>
  );
}
