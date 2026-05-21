"use client";

import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

const ART_OPTIONS = [
  { value: "villa", label: "Villa" },
  { value: "mehrfamilienhaus", label: "Mehrfamilienhaus" },
  { value: "einfamilienhaus", label: "Einfamilienhaus" },
  { value: "wohnung", label: "Wohnung" },
  { value: "apartment", label: "Apartment" },
  { value: "sonstiges", label: "Sonstiges" },
] as const;

const AUSSTATTUNG_OPTIONS = [
  { value: "balkon-terrasse", label: "Balkon / Terrasse" },
  { value: "garten", label: "Garten" },
  { value: "garage-stellplatz", label: "Garage / Stellplatz" },
  { value: "einbaukueche", label: "Einbauküche" },
  { value: "keller-abstellraum", label: "Keller / Abstellraum" },
] as const;

export function SuchprofilForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [ausstattung, setAusstattung] = useState<string[]>([]);
  const [lageRuhig, setLageRuhig] = useState(false);

  function toggleAusstattung(value: string) {
    setAusstattung((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMsg(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const wohnflaecheStr = String(fd.get("wohnflaeche") || "");
    const grundstueckStr = String(fd.get("grundstueck") || "");
    const limitStr = String(fd.get("limit") || "");
    const payload: Record<string, unknown> = {
      absicht: String(fd.get("absicht") || ""),
      art: String(fd.get("art") || ""),
      orte: String(fd.get("orte") || ""),
      wuensche: String(fd.get("wuensche") || ""),
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      telefon: String(fd.get("telefon") || ""),
      ausstattung,
      lage: lageRuhig ? ["ruhig"] : [],
      dsgvo: fd.get("dsgvo") === "on" || fd.get("dsgvo") === "true",
      website: String(fd.get("website") || ""),
    };
    if (wohnflaecheStr) payload.wohnflaeche = Number(wohnflaecheStr);
    if (grundstueckStr) payload.grundstueck = Number(grundstueckStr);
    if (limitStr) payload.limit = Number(limitStr);

    try {
      const res = await fetch("/api/immobiliensuche", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setErrorMsg(
          j.error === "validation"
            ? "Bitte prüfen Sie Ihre Angaben — alle Pflichtfelder ausfüllen und Datenschutz akzeptieren."
            : "Senden fehlgeschlagen. Bitte versuchen Sie es später erneut oder kontaktieren Sie mich telefonisch."
        );
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
      setAusstattung([]);
      setLageRuhig(false);
    } catch {
      setErrorMsg("Verbindungsproblem. Bitte versuchen Sie es später erneut.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-border-taupe rounded-lg p-12 bg-surface-ivory text-center flex flex-col gap-4">
        <h3 className="font-display text-headline-md text-primary">Danke. Ihr Suchprofil ist hinterlegt.</h3>
        <p className="font-body text-body-md text-muted-text">
          Ich melde mich persönlich bei Ihnen — meist innerhalb von 24 Stunden, am Wochenende auch schneller.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative border border-border-taupe rounded-lg p-8 md:p-10 bg-surface-ivory flex flex-col gap-8"
      noValidate
    >
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] w-px h-px"
        aria-hidden="true"
      />

      <fieldset className="flex flex-col gap-3">
        <legend className="font-body text-label-caps text-muted-text uppercase tracking-widest mb-2">
          Kauf oder Miete?
        </legend>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="absicht" value="kauf" required defaultChecked className="accent-primary" />
            <span className="font-body text-body-md text-primary">Kauf</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="absicht" value="miete" className="accent-primary" />
            <span className="font-body text-body-md text-primary">Miete</span>
          </label>
        </div>
      </fieldset>

      <Select id="suche-art" name="art" label="Art der Immobilie" required defaultValue="">
        <option value="" disabled>Bitte wählen</option>
        {ART_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </Select>

      <Textarea id="suche-orte" name="orte" label="Wunschorte" required minLength={2} maxLength={500} rows={2} placeholder="z. B. Weinheim, Heidelberg, Bergstraße" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <Input id="suche-wohnflaeche" name="wohnflaeche" type="number" inputMode="numeric" label="Wohnfläche ca. m²" min={10} max={10000} />
        <Input id="suche-grundstueck" name="grundstueck" type="number" inputMode="numeric" label="Grundstücksgröße ca. m² (falls relevant)" min={0} max={100000} />
        <Input id="suche-limit" name="limit" type="number" inputMode="numeric" label="Limitpreis €" min={50000} max={50000000} />
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="font-body text-label-caps text-muted-text uppercase tracking-widest mb-2">
          Ausstattung & Merkmale
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-3">
          {AUSSTATTUNG_OPTIONS.map((opt) => (
            <Checkbox
              key={opt.value}
              id={`suche-ausstattung-${opt.value}`}
              checked={ausstattung.includes(opt.value)}
              onChange={() => toggleAusstattung(opt.value)}
              label={opt.label}
            />
          ))}
        </div>
      </fieldset>

      <Textarea id="suche-wuensche" name="wuensche" label="Weitere Wünsche" maxLength={5000} rows={5} placeholder="z. B. Kamin, Fußbodenheizung, individuelle Lagewünsche…" />

      <fieldset className="flex flex-col gap-3">
        <legend className="font-body text-label-caps text-muted-text uppercase tracking-widest mb-2">Lage</legend>
        <Checkbox
          id="suche-lage-ruhig"
          checked={lageRuhig}
          onChange={(e) => setLageRuhig(e.currentTarget.checked)}
          label="Ruhige Wohngegend bevorzugt"
        />
      </fieldset>

      <div className="border-t border-border-taupe pt-6 grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <Input id="suche-name" name="name" label="Name" required minLength={2} maxLength={100} />
        <Input id="suche-email" name="email" type="email" label="E-Mail" required />
        <Input id="suche-telefon" name="telefon" type="tel" label="Telefon" required minLength={5} maxLength={40} />
      </div>

      <Checkbox
        id="suche-dsgvo"
        name="dsgvo"
        value="true"
        required
        label={
          <span>
            Meine Angaben werden ausschließlich zur Bearbeitung des Suchprofils verwendet und nicht an Dritte weitergegeben.{" "}
            <a href="/datenschutz" className="underline hover:text-primary">Datenschutzerklärung</a>.
          </span>
        }
      />

      {errorMsg && <p className="text-error font-body text-body-md">{errorMsg}</p>}

      <Button type="submit" disabled={status === "submitting"} fullWidth>
        {status === "submitting" ? "Wird gesendet…" : "Suchprofil übermitteln"}
      </Button>
    </form>
  );
}
