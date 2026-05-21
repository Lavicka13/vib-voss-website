import { Button } from "@/components/ui/Button";

export function ImmobilienFallback() {
  return (
    <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap-mobile md:py-section-gap">
      <div className="bg-surface-container-low border border-border-taupe rounded-lg p-8 md:p-12 lg:p-24 text-center flex flex-col items-center gap-6">
        <p className="font-display italic text-signature-quote text-primary max-w-2xl">
          &bdquo;Aktuelle Objekte werden meist vor Veröffentlichung über mein diskretes Netzwerk vermittelt.&ldquo;
        </p>
        <p className="font-body text-body-md text-muted-text max-w-xl">
          Wenn Sie suchen oder verkaufen möchten, sprechen Sie mich direkt an — oder hinterlegen Sie Ihr Suchprofil.
        </p>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <Button href="#kontakt">Persönlich besprechen</Button>
          <Button href="/immobiliensuche" variant="secondary">Suchprofil anlegen</Button>
        </div>
      </div>
    </section>
  );
}
