import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactForm } from "@/components/sections/ContactForm";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Tell us what you’re trying to make better. We reply within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Section tone="cream" size="md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Contact</Eyebrow>
              <h1 className="mt-4 text-display-1 text-balance">
                A 30-minute conversation. No deck.
              </h1>
              <p className="mt-6 text-lede max-w-xl">
                Tell us what you’re running, where you’re stuck, and what better would look
                like. We’ll come back with what we’d look at first.
              </p>

              <div className="mt-12 space-y-6">
                <ContactRow icon={<Phone className="size-4" aria-hidden />} label="Call us">
                  <a
                    href={`tel:${site.phone.replace(/\s+/g, "")}`}
                    className="hover:text-[var(--color-navy-900)]"
                  >
                    {site.phone}
                  </a>
                </ContactRow>
                <ContactRow icon={<Mail className="size-4" aria-hidden />} label="Email">
                  <a
                    href={`mailto:${site.email}`}
                    className="hover:text-[var(--color-navy-900)]"
                  >
                    {site.email}
                  </a>
                </ContactRow>
                <ContactRow icon={<MapPin className="size-4" aria-hidden />} label="Visit">
                  {site.address.street}
                  <br />
                  {site.address.postal} {site.address.city}, {site.address.country}
                </ContactRow>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--color-ink-300)]/30 bg-[var(--color-paper)] p-6 sm:p-10">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="mt-1 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-paper)] text-[var(--color-navy-900)]">
        {icon}
      </span>
      <div>
        <p className="text-eyebrow">{label}</p>
        <p className="mt-1 text-[1rem] leading-snug text-[var(--color-ink-700)]">{children}</p>
      </div>
    </div>
  );
}
