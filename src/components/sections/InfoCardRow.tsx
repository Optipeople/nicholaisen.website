import Link from "next/link";
import { ArrowRight, Compass, Wrench, LineChart } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";

const cards = [
  {
    title: "New to Nicholaisen?",
    description:
      "Sales, engineering and consulting for the wood, plastic and aluminum industries — for over 50 years.",
    cta: "Learn what we do",
    href: "/about",
    icon: Compass,
  },
  {
    title: "Ready to optimize?",
    description:
      "From a single bottleneck to a turnkey factory. Five service tracks built around your line.",
    cta: "Explore our services",
    href: "/services",
    icon: Wrench,
  },
  {
    title: "Need Opti insights?",
    description:
      "Real-time visibility into the shop floor, with a path to predictive maintenance and continuous improvement.",
    cta: "Discover Opti",
    href: "/services/digital-performance",
    icon: LineChart,
  },
] as const;

export function InfoCardRow() {
  return (
    <Section tone="cream" size="md">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>How to get started</Eyebrow>
          <h2 className="mt-4 text-display-3 text-balance">Three ways in.</h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {cards.map(({ title, description, cta, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col rounded-xl border border-[var(--color-ink-300)]/30 bg-[var(--color-paper)] p-7 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
            >
              <Icon className="size-6 text-[var(--color-navy-900)]" aria-hidden />
              <h3 className="mt-6 text-lg font-semibold text-[var(--color-ink-900)]">{title}</h3>
              <p className="mt-2 text-sm text-[var(--color-ink-500)]">{description}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-navy-900)] group-hover:gap-2 transition-all">
                {cta}
                <ArrowRight className="size-3.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
