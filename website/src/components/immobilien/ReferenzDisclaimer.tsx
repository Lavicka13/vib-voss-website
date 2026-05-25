export function ReferenzDisclaimer() {
  return (
    <div className="w-full bg-zartrosa/25 border-b border-primary/15">
      <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-3">
        <div className="flex items-center gap-4">
          <span
            className="font-display italic text-[14px] text-secondary leading-none"
            aria-hidden="true"
          >
            N.B.
          </span>
          <span className="block h-px w-8 bg-primary/30" aria-hidden="true" />
          <p className="font-body text-[11px] tracking-[0.18em] uppercase text-primary/80">
            Referenz aus früheren Vermarktungen · Aktuelle Verfügbarkeit auf Anfrage
          </p>
        </div>
      </div>
    </div>
  );
}
