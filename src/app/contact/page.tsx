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
  description: "Tell us what you're trying to make better. We reply within one business day.",
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
                Tell us what you're running, where you're stuck, and what better would look
                like. We'll come back with what we'd look at first.
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

          <TeamSection label="Leadership" people={management} />
          <TeamSection label="Administration" people={administration} />
          <TeamSection label="Sales – Denmark" people={salesDenmark} />
          <TeamSection label="Sales – Baltic" people={baltic} usePhone />
          <TeamSection label="Sales – Sweden" people={sweden} usePhone />
          <TeamSection label="Innovation & Efficiency" people={innovation} />
          <TeamSection label="Service & Spare Parts" people={service} />
          <TeamSection label="Marketing" people={marketing} />
          <TeamSection label="Finance" people={finance} />
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
  { name: "Thomas Biehl", title: "CEO", email: "tb@nicholaisen.dk", image: "/images/Medarbejder/Thomas%20Biehl.jpeg" },
  { name: "Henrik Ibsen", title: "COO", email: "hi@nicholaisen.dk", image: "/images/Medarbejder/Henrik%20Ibsen.jpg" },
  { name: "Lars Sommer", title: "CFO", email: "ls@nicholaisen.dk", image: "/images/Medarbejder/Lars%20Sommer.jpeg" },
];

const administration: Person[] = [
  { name: "Kathrine Hovesen", title: "PA to CEO", email: "kh@nicholaisen.dk", image: "/images/Medarbejder/Kathrine%20Hovesen.jpeg" },
  { name: "Svenja Hartmann", title: "Project Coordinator", email: "sh@nicholaisen.dk", image: "/images/Medarbejder/Svenja%20Hartmann.jpeg" },
  { name: "Gitte Sandholm", title: "Office Assistant", email: "gis@nicholaisen.dk", image: "/images/Medarbejder/Gitte%20Sandholm.jpeg" },
];

const salesDenmark: Person[] = [
  { name: "Bo Bruun Holm", title: "Sales – Plate & Furniture Industry", email: "bbh@nicholaisen.dk", phone: "+45 40 54 47 64", image: "/images/Medarbejder/Bo%20Holm.jpeg" },
  { name: "Mark Dige Høgh", title: "Sales – Plate & Furniture Industry", email: "mdh@nicholaisen.dk", image: "/images/Medarbejder/Mark%20Dige.jpg" },
  { name: "Bo Rasmussen", title: "Sales – Door & Window Industry", email: "br@nicholaisen.dk", phone: "+45 40 82 55 45", image: "/images/Medarbejder/Bo%20Rasmusen.png" },
  { name: "Peter Haahr Larsen", title: "Sales – Door & Window Industry", email: "phl@nicholaisen.dk", image: "/images/Medarbejder/Peter%20Haahr.jpeg" },
  { name: "Jørn Biehl", title: "Sales – Wood Drying", image: "/images/Medarbejder/J%C3%B8rn%20Biehl.jpeg" },
  { name: "Claus Capion", title: "Sales – Automation", email: "cca@nicholaisen.dk", phone: "+45 40880061", image: "/images/Medarbejder/Claus%20Capion.jpeg" },
  { name: "René Beldam", title: "Sales – NichoMachines", email: "rb@nicholaisen.dk", phone: "+45 24 59 03 50", image: "/images/Medarbejder/Ren%C3%A9%20Beldam.jpeg" },
];

const baltic: Person[] = [
  { name: "Siim Türk", title: "Sales Manager", phone: "+372 5867 6119", image: "/images/Medarbejder/Siim%20T%C3%BCrk.jpg" },
  { name: "Søren Jørgensen", title: "Business Development Manager", phone: "+372 509 6780", image: "/images/Medarbejder/S%C3%B8ren%20J%C3%B8rgensen.jpeg" },
  { name: "John Tøttrup Christensen", title: "Sales", phone: "+372 510 9486", image: "/images/Medarbejder/John%20T%C3%B8ttrup%20Christensen.jpg" },
  { name: "Andrejus Petrusovas", title: "Sales", phone: "+370 605 79720", image: "/images/Medarbejder/Andrejus%20Petrusovas.jpg" },
];

const sweden: Person[] = [
  { name: "Erik Nord", title: "Sales", phone: "+46 72 70 17 300", image: "/images/Medarbejder/Erik%20Nord.jpg" },
];


const innovation: Person[] = [
  { name: "Kenneth Bech Sørensen", title: "Project Manager – Data", email: "ks@nicholaisen.dk", image: "/images/Medarbejder/Kenneth%20Bech%20S%C3%B8rensen.jpeg" },
  { name: "Henrik Risgaard Lundfold", title: "Project Manager", email: "hl@nicholaisen.dk", image: "/images/Medarbejder/Henrik%20Risgaard%20Lundfold.jpg" },
];

const service: Person[] = [
  { name: "Tobias Kjærgaard", title: "Service Manager", email: "tk@nicholaisen.dk", image: "/images/Medarbejder/Tobias%20Kj%C3%A6rgaard.jpeg" },
  { name: "Lars Skaarup Petersen", title: "Spare Parts Manager", email: "lp@nicholaisen.dk", image: "/images/Medarbejder/Lars%20Skaarup%20Petersen.jpeg" },
  { name: "Søren Solhaug Madsen", title: "Consultant – Business Development", email: "sm@nicholaisen.dk", image: "/images/Medarbejder/S%C3%B8ren%20Solhaug%20Madsen.jpeg" },
  { name: "Johnny B. Kristensen", title: "Service Technician", email: "jk@nicholaisen.dk", image: "/images/Medarbejder/Johnny%20B.%20Kristensen.jpeg" },
  { name: "Søren Baldtzar Rasmussen", title: "Service Technician", email: "sr@nicholaisen.dk", image: "/images/Medarbejder/S%C3%B8ren%20Baldtzer%20Rasmussen.jpg" },
];

const marketing: Person[] = [
  { name: "Jacob Vedsø", title: "Communications & Marketing Manager", email: "jv@nicholaisen.dk", image: "/images/Medarbejder/Jacob%20Vedsø.jpg" },
  { name: "Simone Jørgensen", title: "Marketing Coordinator", email: "sj@nicholaisen.dk", image: "/images/Medarbejder/Simone%20J%C3%B8rgensen.jpg" },
  { name: "Dennis Harløv Madsen", title: "Market Manager – Telemarketing", email: "dm@nicholaisen.dk", image: "/images/Medarbejder/Dennis%20Harl%C3%B8v%20Madsen.jpg" },
];

const finance: Person[] = [
  { name: "Ole Faurholt Rasmussen", title: "Accountant", email: "or@nicholaisen.dk", image: "/images/Medarbejder/Ole%20Faurholt%20Rasmussen.jpeg" },
  { name: "Andreas Wrona", title: "Financial Controller", email: "aw@nicholaisen.dk", image: "/images/Medarbejder/Andreas%20Wrona.jpg" },
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
