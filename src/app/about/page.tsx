import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Nicholaisen — sales, engineering and consulting for the wood, plastics and aluminum industries.",
  path: "/about",
});

const milestones = [
  {
    year: "1972",
    title: "Founded in Hørning",
    description:
      "Started as a sales agent for woodworking machinery. The hard-won shop-floor knowledge from that era still shapes how we work.",
  },
  {
    year: "1990s",
    title: "Engineering moves in-house",
    description:
      "Customers asked for more than equipment — they wanted layouts, integrations, results. Engineering became part of the offer.",
  },
  {
    year: "2010s",
    title: "Consulting becomes a discipline",
    description:
      "Pre-investment data analysis. Production optimization. Capacity planning. The advisory work formalized into named tracks.",
  },
  {
    year: "Today",
    title: "Opti — digital performance",
    description:
      "Real-time machine data turned into the decisions that move the line. Where strategy and shop floor meet.",
  },
];

const principles = [
  {
    title: "Data before opinions",
    description:
      "Every recommendation we make is anchored in what the line is actually doing — not what it should be doing on paper.",
  },
  {
    title: "Specific over impressive",
    description:
      "We’d rather promise a 6-minute changeover than a digital transformation. Specific is testable.",
  },
  {
    title: "Long over fast",
    description:
      "We work with our customers across investment cycles, not just projects. The good results compound.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Your efficiency partner."
        lede="Sales, engineering and consulting for innovative machine solutions in the wood, plastics and aluminum industries — for over 50 years."
        align="wide"
      />

      <Section tone="paper" size="md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-20">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--color-paper-dark)]">
              <Image
                src="/images/hero-mdf.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <Eyebrow>What we do</Eyebrow>
              <h2 className="mt-4 text-display-2 text-balance">
                Together with you, we analyze and illuminate your data, strengths and potentials.
              </h2>
              <p className="mt-6 text-lede max-w-2xl">
                We provide sales, engineering and consulting of innovative machine solutions and
                service concepts. We advise on intelligent optimizations and profitable
                investments — from the first conversation through long after commissioning.
              </p>
              <p className="mt-4 text-[1rem] leading-relaxed text-[var(--color-ink-700)] max-w-2xl">
                Most of our customers stay with us for decades. That isn’t loyalty for its own
                sake — it’s the practical result of working with a partner who knows the line and
                shows up when something is off.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="cream" size="md">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>How we work</Eyebrow>
            <h2 className="mt-4 text-display-3 text-balance">Three principles, applied repeatedly.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {principles.map((p) => (
              <div
                key={p.title}
                className="rounded-xl border border-[var(--color-ink-300)]/30 bg-[var(--color-paper)] p-7"
              >
                <h3 className="text-lg font-semibold text-[var(--color-ink-900)]">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-500)]">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="paper" size="md">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>History</Eyebrow>
            <h2 className="mt-4 text-display-3 text-balance">Five decades, four turning points.</h2>
          </div>
          <ol className="mt-12 grid gap-x-12 gap-y-10 lg:grid-cols-2">
            {milestones.map((m) => (
              <li key={m.year} className="grid grid-cols-[auto_1fr] gap-6">
                <div className="text-eyebrow text-[var(--color-tan-500)]">{m.year}</div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-ink-900)]">{m.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-[var(--color-ink-500)]">
                    {m.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="cream" size="md">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 lg:gap-20">
            <div>
              <Eyebrow>Find us</Eyebrow>
              <h2 className="mt-4 text-display-3 text-balance">Hørning, Denmark.</h2>
              <address className="mt-6 not-italic text-lede leading-relaxed">
                {site.address.street}
                <br />
                {site.address.postal} {site.address.city}
                <br />
                {site.address.country}
              </address>
              <p className="mt-6 text-base text-[var(--color-ink-700)]">
                <a
                  href={`tel:${site.phone.replace(/\s+/g, "")}`}
                  className="hover:text-[var(--color-navy-900)]"
                >
                  {site.phone}
                </a>
                <br />
                <a
                  href={`mailto:${site.email}`}
                  className="hover:text-[var(--color-navy-900)]"
                >
                  {site.email}
                </a>
              </p>
              <p className="mt-6 text-xs text-[var(--color-ink-500)]">CVR {site.cvr}</p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--color-paper-dark)]">
              <Image
                src="/images/hero-workshop.jpg"
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
