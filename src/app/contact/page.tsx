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
            Reach out directly to the person who covers your area. Everyone you contact does the actual work.
          </p>

          {/* Leadership */}
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {management.map((person) => (
              <div
                key={person.name}
                className="flex items-center gap-4 rounded-xl border border-[var(--color-ink-300)]/20 bg-[var(--color-cream)] px-4 py-3"
              >
                <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-[var(--color-beige-200)]">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="48px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[var(--color-ink-900)]">{person.name}</p>
                  <p className="truncate text-xs leading-snug text-[var(--color-ink-500)]">{person.title}</p>
                  {person.email && (
                    <a
                      href={`mailto:${person.email}`}
                      className="mt-1 inline-flex items-center gap-1 text-xs text-[var(--color-slate-500)] hover:text-[var(--color-navy-900)] transition-colors"
                    >
                      <Mail className="size-3" aria-hidden />
                      {person.email}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Sales & project management */}
          <div className="mt-10 border-t border-[var(--color-ink-300)]/20 pt-10">
            <p className="text-eyebrow text-[var(--color-ink-500)]">Sales & Project Management</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {sales.map((person) => (
                <div
                  key={person.name}
                  className="flex items-center gap-4 rounded-xl border border-[var(--color-ink-300)]/20 bg-[var(--color-cream)] px-4 py-3"
                >
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-[var(--color-beige-200)]">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      sizes="48px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[var(--color-ink-900)]">{person.name}</p>
                    <p className="truncate text-xs leading-snug text-[var(--color-ink-500)]">{person.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

const management = [
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

const sales = [
  {
    name: "Bo Bruun Holm",
    title: "Sales – Plate & Furniture Industry",
    image: "/images/Medarbejder/Bo%20Holm.jpeg",
  },
  {
    name: "Mark Dige Høgh",
    title: "Sales – Plate & Furniture Industry",
    image: "/images/Medarbejder/Mark%20Dige.jpg",
  },
  {
    name: "Bo Rasmussen",
    title: "Sales – Door & Window Industry",
    image: "/images/Medarbejder/Bo%20Rasmusen.png",
  },
  {
    name: "Peter Haahr Larsen",
    title: "Sales – Door & Window Industry",
    image: "/images/Medarbejder/Peter%20Haahr.jpeg",
  },
  {
    name: "Jørn Biehl",
    title: "Sales – Wood Drying",
    image: "/images/Medarbejder/J%C3%B8rn%20Biehl.jpeg",
  },
  {
    name: "Claus Capion",
    title: "Sales – Automation",
    image: "/images/Medarbejder/Claus%20Capion.jpeg",
  },
  {
    name: "René Beldam",
    title: "Sales – NichoMachines",
    image: "/images/Medarbejder/Ren%C3%A9%20Beldam.jpeg",
  },
  {
    name: "Svenja Hartmann",
    title: "Project Coordinator",
    image: "/images/Medarbejder/Svenja%20Hartmann.jpeg",
  },
  {
    name: "Kathrine Hovesen",
    title: "PA to CEO",
    image: "/images/Medarbejder/Kathrine%20Hovesen.jpeg",
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
