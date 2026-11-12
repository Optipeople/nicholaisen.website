import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { site } from "@/lib/site";

const MessageSchema = z.object({
  quick: z.undefined().optional(),
  newsletter: z.undefined().optional(),
  name: z.string().min(1).max(120),
  company: z.string().min(1).max(160),
  email: z.string().email(),
  role: z.string().max(120).optional(),
  interest: z.string().max(80).optional(),
  message: z.string().min(5).max(4000),
  // honeypot — must be empty
  website: z.string().max(0).optional(),
});

/** "Reach out to me" on the contact page: just an e-mail address to call back. */
const QuickSchema = z.object({
  quick: z.literal(true),
  email: z.string().email(),
  website: z.string().max(0).optional(),
});

/** Newsletter sign-up in the footer: just an e-mail address. */
const NewsletterSchema = z.object({
  newsletter: z.literal(true),
  email: z.string().email(),
  website: z.string().max(0).optional(),
});

const Schema = z.union([QuickSchema, NewsletterSchema, MessageSchema]);

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
    const result = await resend.emails.send(
      "newsletter" in data && data.newsletter
        ? {
            from,
            to,
            replyTo: data.email,
            subject: `Website: newsletter sign-up - ${data.email}`,
            text: `Newsletter sign-up from the website footer.\n\nEmail: ${data.email}`,
          }
        : "quick" in data && data.quick
        ? {
            from,
            to,
            replyTo: data.email,
            subject: `Website: please reach out - ${data.email}`,
            text: `Reach-out request from the contact page.\n\nEmail: ${data.email}`,
          }
        : {
            from,
            to,
            replyTo: data.email,
            subject: `Website enquiry - ${data.company}`,
            text: [
              `Name:     ${data.name}`,
              `Company:  ${data.company}`,
              `Role:     ${data.role ?? "-"}`,
              `Email:    ${data.email}`,
              `Interest: ${data.interest ?? "-"}`,
              "",
              data.message,
            ].join("\n"),
          },
    );
    if (result.error) {
      console.error("[contact] resend rejected send", result.error, { from, to });
      return NextResponse.json(
        { error: "Could not send right now. Please try again or call us." },
        { status: 502 },
      );
    }
    console.info("[contact] sent", { id: result.data?.id, to });
  } catch (err) {
    console.error("[contact] send failed", err);
    return NextResponse.json(
      { error: "Could not send right now. Please try again or call us." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
