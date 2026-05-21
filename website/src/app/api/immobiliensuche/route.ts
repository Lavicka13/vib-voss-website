import type { NextRequest } from "next/server";
import { suchprofilSchema } from "@/lib/validation";
import { sendMail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = suchprofilSchema.safeParse(payload);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "validation", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const d = parsed.data;

  const body = `Neues Suchprofil:

Name: ${d.name}
E-Mail: ${d.email}
Telefon: ${d.telefon}

Absicht: ${d.absicht}
Art: ${d.art}
Wunschorte: ${d.orte}
Wohnfläche: ${d.wohnflaeche ?? "—"} m²
Grundstücksgröße: ${d.grundstueck ?? "—"} m²
Limitpreis: ${d.limit ? d.limit.toLocaleString("de-DE") + " €" : "—"}

Ausstattung: ${d.ausstattung?.join(", ") || "—"}
Lage-Wünsche: ${d.lage?.join(", ") || "—"}

Weitere Wünsche:
${d.wuensche || "—"}
`;

  const result = await sendMail({
    subject: `Suchprofil von ${d.name}`,
    body,
    replyTo: d.email,
  });

  if (!result.ok) {
    return Response.json(
      { ok: false, error: "mail_failed", reason: result.reason },
      { status: 500 },
    );
  }

  return Response.json({ ok: true });
}
