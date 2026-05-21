type MailOptions = {
  subject: string;
  body: string;
  replyTo?: string;
};

const RECIPIENT = process.env.MAIL_RECIPIENT ?? "info@e-vib.de";
const RESEND_KEY = process.env.RESEND_API_KEY;

export async function sendMail(
  opts: MailOptions,
): Promise<{ ok: boolean; reason?: string }> {
  if (!RESEND_KEY) {
    console.info("[mail] no RESEND_API_KEY — logging instead of sending");
    console.info("[mail] To:", RECIPIENT);
    console.info("[mail] Subject:", opts.subject);
    console.info("[mail] Body:", opts.body);
    if (opts.replyTo) console.info("[mail] Reply-To:", opts.replyTo);
    return { ok: true, reason: "logged-only" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "V.I.B. Website <noreply@e-vib.de>",
        to: [RECIPIENT],
        subject: opts.subject,
        text: opts.body,
        reply_to: opts.replyTo,
      }),
    });

    if (!res.ok) {
      return { ok: false, reason: `resend ${res.status}` };
    }

    return { ok: true };
  } catch (err) {
    return { ok: false, reason: String(err) };
  }
}
