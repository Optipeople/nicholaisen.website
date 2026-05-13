import type { Metadata } from "next";
import Image from "next/image";
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
                  <br />
                  <span className="text-[var(--color-ink-500)]">Service: </span>
                  <a
                    href={`tel:${site.phoneService.replace(/\s+/g, "")}`}
                    className="hover:text-[var(--color-navy-900)]"
                  >
                    {site.phoneService}
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

      <Section tone="paper" size="md">
        <Container>
          <Eyebrow>Our team</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--color-ink-900)]">
            The people you'll work with
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-[var(--color-ink-500)] max-w-xl">
            We are a small, specialised team. When you reach out, you speak directly with the people who do the work.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((person) => (
              <div key={person.name} className="group">
                <div className="overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-beige-200)] aspect-[3/4]">
                  <Image
                    src={person.image}
                    alt={person.name}
                    width={480}
                    height={640}
                    className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-[1.0625rem] font-semibold text-[var(--color-ink-900)]">{person.name}</p>
                  <p className="mt-0.5 text-sm text-[var(--color-ink-500)]">{person.title}</p>
                  {person.email && (
                    <a
                      href={`mailto:${person.email}`}
                      className="mt-2 inline-flex items-center gap-1.5 text-sm text-[var(--color-slate-500)] hover:text-[var(--color-navy-900)] transition-colors"
                    >
                      <Mail className="size-3.5" aria-hidden />
                      {person.email}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

const team = [
  {
    name: "Thomas Biehl",
    title: "CEO",
    email: "tb@nicholaisen.dk",
    image: "/images/Medarbejder/Thomas%20Biehl.jpeg",
  },
  {
    name: "Henrik Ibsen",
    title: "COO",
    email: "hi@nicholaisen.dk",
    image: "/images/Medarbejder/Henrik%20Ibsen.jpg",
  },
  {
    name: "Lars Sommer",
    title: "CFO",
    email: "ls@nicholaisen.dk",
    image: "/images/Medarbejder/Lars%20Sommer.jpeg",
  },
];

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
