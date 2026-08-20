import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactForm } from "@/components/sections/ContactForm";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Tell us what you're trying to make better. We reply within one business day.",
  path: "/contact",
});

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <>
      <Section tone="cream" size="md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
              <h1 className="mt-4 text-display-1 text-balance">
                {t("hero.title")}
              </h1>
              <p className="mt-6 text-lede max-w-xl">
                {t("hero.lede")}
              </p>

              <div className="mt-12 space-y-6">
                <ContactRow icon={<Phone className="size-4" aria-hidden />} label={t("info.callUs")}>
                  <a
                    href={`tel:${site.phone.replace(/\s+/g, "")}`}
                    className="hover:text-[var(--color-navy-900)]"
                  >
                    {site.phone}
                  </a>
                  <br />
                  <span className="text-[var(--color-ink-500)]">{t("info.serviceLabel")}: </span>
                  <a
                    href={`tel:${site.phoneService.replace(/\s+/g, "")}`}
                    className="hover:text-[var(--color-navy-900)]"
                  >
                    {site.phoneService}
                  </a>
                </ContactRow>
                <ContactRow icon={<Mail className="size-4" aria-hidden />} label={t("info.emailLabel")}>
                  <a
                    href={`mailto:${site.email}`}
                    className="hover:text-[var(--color-navy-900)]"
                  >
                    {site.email}
                  </a>
                </ContactRow>
                <ContactRow icon={<MapPin className="size-4" aria-hidden />} label={t("info.visit")}>
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
          <Eyebrow>{t("team.eyebrow")}</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--color-ink-900)]">
            {t("team.title")}
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-[var(--color-ink-500)] max-w-xl">
            {t("team.lede")}
          </p>

          <TeamSection label={t("sections.leadership")} people={management} />
          <TeamSection label={t("sections.administration")} people={administration} />
          <TeamSection label={t("sections.salesDenmark")} people={salesDenmark} />
          <TeamSection label={t("sections.salesBaltic")} people={baltic} usePhone />
          <TeamSection label={t("sections.salesSweden")} people={sweden} usePhone />
          <TeamSection label={t("sections.innovation")} people={innovation} />
          <TeamSection label={t("sections.service")} people={service} />
          <TeamSection label={t("sections.marketing")} people={marketing} />
          <TeamSection label={t("sections.finance")} people={finance} />
        </Container>
      </Section>
    </>
  );
}

type Person = {
  name: string;
  title: string;
  email?: string;
  phone?: string;
  image: string;
};

function TeamSection({
  label,
  people,
  usePhone = false,
}: {
  label: string;
  people: Person[];
  usePhone?: boolean;
}) {
  return (
    <div className="mt-12 border-t border-[var(--color-ink-300)]/20 pt-10 first:border-t-0 first:pt-0 first:mt-12">
      <p className="text-eyebrow text-[var(--color-ink-500)]">{label}</p>
      <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {people.map((person) => (
          <div key={person.name}>
            <div className="relative aspect-square overflow-hidden rounded-xl bg-[var(--color-beige-200)]">
              <Image
                src={person.image}
                alt={person.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover object-top"
              />
            </div>
            <div className="mt-3">
              <p className="text-sm font-semibold text-[var(--color-ink-900)]">{person.name}</p>
              <p className="mt-0.5 text-xs text-[var(--color-ink-500)]">{person.title}</p>
              {person.email && (
                <a
                  href={`mailto:${person.email}`}
                  className="mt-1.5 flex items-center gap-1 text-xs text-[var(--color-slate-500)] hover:text-[var(--color-navy-900)] transition-colors"
                >
                  <Mail className="size-3" aria-hidden />
                  {person.email}
                </a>
              )}
              {person.phone && (
                <a
                  href={`tel:${person.phone.replace(/\s+/g, "")}`}
                  className="mt-1 flex items-center gap-1 text-xs text-[var(--color-slate-500)] hover:text-[var(--color-navy-900)] transition-colors"
                >
                  <Phone className="size-3" aria-hidden />
                  {person.phone}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const management: Person[] = [
  { name: "Thomas Biehl", title: "CEO", email: "tb@nicholaisen.dk", image: "/images/Medarbejder/Thomas Biehl.jpeg" },
  { name: "Henrik Ibsen", title: "COO", email: "hib@nicholaisen.dk", image: "/images/Medarbejder/Henrik Ibsen.jpg" },
  { name: "Lars Sommer", title: "CFO", email: "ls@nicholaisen.dk", image: "/images/Medarbejder/Lars Sommer.jpeg" },
];

const administration: Person[] = [
  { name: "Kathrine Hovesen", title: "PA to CEO", email: "kh@nicholaisen.dk", image: "/images/Medarbejder/Kathrine Hovesen.jpeg" },
  { name: "Svenja Hartmann", title: "Project Coordinator", email: "sh@nicholaisen.dk", image: "/images/Medarbejder/Svenja Hartmann.jpeg" },
  { name: "Gitte Sandholm", title: "Office Assistant", email: "gis@nicholaisen.dk", image: "/images/Medarbejder/Gitte Sandholm.jpeg" },
];

const salesDenmark: Person[] = [
  { name: "Bo Bruun Holm", title: "Sales – Plate & Furniture Industry", email: "bbh@nicholaisen.dk", phone: "+45 40 54 47 64", image: "/images/Medarbejder/Bo Holm.jpeg" },
  { name: "Mark Dige Høgh", title: "Sales – Plate & Furniture Industry", email: "mdh@nicholaisen.dk", phone: "+45 26 16 92 80", image: "/images/Medarbejder/Mark Dige.jpg" },
  { name: "Bo Rasmussen", title: "Sales – Door & Window Industry", email: "br@nicholaisen.dk", phone: "+45 40 82 55 45", image: "/images/Medarbejder/Bo Rasmusen.png" },
  { name: "Peter Haahr Larsen", title: "Sales – Door & Window Industry", email: "phrl@nicholaisen.dk", phone: "+45 40 96 47 11", image: "/images/Medarbejder/Peter Haahr.jpeg" },
  { name: "Jørn Biehl", title: "Sales – Wood Drying", image: "/images/Medarbejder/Jørn Biehl.jpeg" },
  { name: "Claus Capion", title: "Sales – Automation", email: "cca@nicholaisen.dk", phone: "+45 40 88 00 61", image: "/images/Medarbejder/Claus Capion.jpeg" },
  { name: "René Beldam", title: "Sales – NichoMachines", email: "rb@nicholaisen.dk", phone: "+45 24 59 03 50", image: "/images/Medarbejder/René Beldam.jpeg" },
];

const baltic: Person[] = [
  { name: "Siim Türk", title: "Sales Manager", phone: "+372 5867 6119", image: "/images/Medarbejder/Siim Türk.jpg" },
  { name: "Søren Jørgensen", title: "Business Development Manager", phone: "+372 509 6780", image: "/images/Medarbejder/Søren Jørgensen.jpeg" },
  { name: "John Tøttrup Christensen", title: "Sales", phone: "+372 510 9486", image: "/images/Medarbejder/John Tøttrup Christensen.jpg" },
  { name: "Andrejus Petrusovas", title: "Sales", phone: "+370 605 79720", image: "/images/Medarbejder/Andrejus Petrusovas.jpg" },
];

const sweden: Person[] = [
  { name: "Erik Nord", title: "Sales", phone: "+46 72 70 17 300", image: "/images/Medarbejder/Erik Nord.jpg" },
];


const innovation: Person[] = [
  { name: "Kenneth Bech Sørensen", title: "Project Manager – Data", email: "kbs@nicholaisen.dk", image: "/images/Medarbejder/Kenneth Bech Sørensen.jpeg" },
];

const service: Person[] = [
  { name: "Tobias Kjærgaard", title: "Service Manager", email: "tk@nicholaisen.dk", image: "/images/Medarbejder/Tobias Kjærgaard.jpeg" },
  { name: "Lars Skaarup Petersen", title: "Spare Parts Manager", email: "lsp@nicholaisen.dk", image: "/images/Medarbejder/Lars Skaarup Petersen.jpeg" },
  { name: "Søren Solhaug Madsen", title: "Consultant – Business Development", email: "ssm@nicholaisen.dk", image: "/images/Medarbejder/Søren Solhaug Madsen.jpeg" },
  { name: "Johnny B. Kristensen", title: "Service Technician", email: "jbk@nicholaisen.dk", image: "/images/Medarbejder/Johnny B. Kristensen.jpeg" },
  { name: "Søren Baldtzar Rasmussen", title: "Service Technician", email: "sbr@nicholaisen.dk", image: "/images/Medarbejder/Søren Baldtzer Rasmussen.jpg" },
];

const marketing: Person[] = [
  { name: "Jacob Vedsø", title: "Communications & Marketing Manager", email: "jv@nicholaisen.dk", image: "/images/Medarbejder/Jacob Vedsø.jpg" },
  { name: "Simone Jørgensen", title: "Marketing Coordinator", email: "simone@nicholaisen.dk", image: "/images/Medarbejder/Simone Jørgensen.jpg" },
  { name: "Dennis Harløv Madsen", title: "Market Manager – Telemarketing", email: "dhm@nicholaisen.dk", image: "/images/Medarbejder/Dennis Harløv Madsen.jpg" },
];

const finance: Person[] = [
  { name: "Ole Faurholt Rasmussen", title: "Accountant", email: "or@nicholaisen.dk", image: "/images/Medarbejder/Ole Faurholt Rasmussen.jpeg" },
  { name: "Andreas Wrona", title: "Financial Controller", email: "aw@nicholaisen.dk", image: "/images/Medarbejder/Andreas Wrona.jpg" },
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
