import type { NextRequest } from "next/server";
import { kontaktSchema } from "@/lib/validation";
import { sendMail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = kontaktSchema.safeParse(payload);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "validation", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { name, email, telefon, nachricht } = parsed.data;

  const body = `Neue Kontaktanfrage über die Website:

Name: ${name}
E-Mail: ${email}
Telefon: ${telefon || "—"}

Nachricht:
${nachricht}
`;

  const result = await sendMail({
    subject: `Kontaktanfrage von ${name}`,
    body,
    replyTo: email,
  });

  if (!result.ok) {
    return Response.json(
      { ok: false, error: "mail_failed", reason: result.reason },
      { status: 500 },
    );
  }

  return Response.json({ ok: true });
}
