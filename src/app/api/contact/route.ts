import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { site } from "@/lib/site";

const Schema = z.object({
  name: z.string().min(1).max(120),
  company: z.string().min(1).max(160),
  email: z.string().email(),
  role: z.string().max(120).optional(),
  interest: z.string().max(80).optional(),
  message: z.string().min(5).max(4000),
  // honeypot — must be empty
  website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = Schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the highlighted fields." },
      { status: 400 },
    );
  }

  const { website, ...data } = parsed.data;
  if (website) {
    // Looks like a bot. Pretend success.
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? `website@${new URL(site.url).host}`;

  // If Resend isn't configured, log + accept so dev/preview deploys keep working.
  if (!apiKey) {
    console.info("[contact] received (no Resend key configured)", data);
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `Website enquiry — ${data.company}`,
      text: [
        `Name:     ${data.name}`,
        `Company:  ${data.company}`,
        `Role:     ${data.role ?? "-"}`,
        `Email:    ${data.email}`,
        `Interest: ${data.interest ?? "-"}`,
        "",
        data.message,
      ].join("\n"),
    });
  } catch (err) {
    console.error("[contact] send failed", err);
    return NextResponse.json(
      { error: "Could not send right now. Please try again or call us." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
