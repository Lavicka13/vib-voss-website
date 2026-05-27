"use client";

import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMsg(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      telefon: String(fd.get("telefon") || ""),
      nachricht: String(fd.get("nachricht") || ""),
      dsgvo: fd.get("dsgvo") === "on" || fd.get("dsgvo") === "true",
      website: String(fd.get("website") || ""),
    };
    try {
      const res = await fetch("/api/kontakt", {
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
    } catch {
      setErrorMsg("Verbindungsproblem. Bitte versuchen Sie es später erneut.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-border-taupe rounded-lg p-12 bg-surface-ivory text-center flex flex-col gap-4">
        <h3 className="font-display text-headline-md text-primary">Danke für Ihre Nachricht.</h3>
        <p className="font-body text-body-md text-muted-text">
          Ich melde mich persönlich bei Ihnen — meist innerhalb von 24 Stunden, am Wochenende auch schneller.
        </p>
      </div>
    );
  }

  return (
    <>
      <h3 className="font-display text-headline-md text-primary">Ihre Kontaktdaten</h3>
    <form
      onSubmit={handleSubmit}
      className="relative border border-border-taupe rounded-lg p-8 md:p-10 bg-surface-ivory flex flex-col gap-6"
      noValidate
    >
      {/* Honeypot — hidden, never filled by real users */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] w-px h-px"
        aria-hidden="true"
      />
      <Input id="kontakt-name" name="name" label="Name" required minLength={2} maxLength={100} />
      <Input id="kontakt-email" name="email" type="email" label="E-Mail" required />
      <Input id="kontakt-telefon" name="telefon" type="tel" label="Telefon (optional)" />
      <Textarea id="kontakt-nachricht" name="nachricht" label="Nachricht" required minLength={10} maxLength={5000} rows={6} />
      <Checkbox
        id="kontakt-dsgvo"
        name="dsgvo"
        value="true"
        required
        label={
          <span>
            Ich willige ein, dass meine Angaben ausschließlich zur Bearbeitung meiner Anfrage verwendet werden. Weitere Informationen in der{" "}
            <a href="/datenschutz" className="underline hover:text-primary">Datenschutzerklärung</a>.
          </span>
        }
      />
      {errorMsg && <p className="text-error font-body text-body-md">{errorMsg}</p>}
      <Button type="submit" disabled={status === "submitting"} fullWidth>
        {status === "submitting" ? "Wird gesendet…" : "Nachricht senden"}
      </Button>
    </form>
    <p className="font-body text-[12px] text-muted-text">
      Sie können Ihre Einwilligung jederzeit widerrufen und die Löschung Ihrer Daten verlangen. Schreiben Sie dazu an info@e-vib.de.
    </p>
    </>
  );
}
