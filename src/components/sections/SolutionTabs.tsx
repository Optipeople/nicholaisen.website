"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

const solutions = [
  {
    key: "business-development",
    title: "Business Development",
    blurb:
      "Align direction, sequence the right investments, plan capacity for the next five years.",
    href: "/services/business-development",
    image: "/images/top-view-boards-mdf-material-1-scaled-1.jpg",
  },
  {
    key: "production-optimization",
    title: "Production Optimization",
    blurb:
      "Throughput, quality, and uptime. Most of it without capex — just better flow and fewer changeovers.",
    href: "/services/production-optimization",
    image: "/images/workshop/panel-saw.png",
  },
  {
    key: "project-solutions",
    title: "Project Solutions",
    blurb:
      "From a single line to a turnkey factory. Specified, sourced, installed, signed off.",
    href: "/services/project-solutions",
    image: "/images/workshop/cnc-machining.jpg",
  },
  {
    key: "digital-performance",
    title: "Digital Performance · Opti",
    blurb:
      "Real-time machine data turned into the decisions that move the line. Insights, predictive maintenance, continuous improvement.",
    href: "/services/digital-performance",
    image: "/images/workshop/six-sided-drilling.jpg",
  },
  {
    key: "partnership",
    title: "Partnership",
    blurb:
      "A long-term efficiency partner — not a transactional vendor. Capacity planning, shared goals, sustained results.",
    href: "/services/partnership",
    image: "/images/workshop/nesting.jpg",
  },
] as const;

export function SolutionTabs() {
  const [active, setActive] = useState(0);
  const current = solutions[active]!;

  return (
    <Section tone="paper" size="md">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Solutions</Eyebrow>
            <h2 className="mt-4 text-display-3 text-balance">
              Five tracks. One efficiency partner.
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-navy-900)] hover:gap-2 transition-all"
          >
            All solutions <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>

        <div
          role="tablist"
          aria-label="Solution categories"
          className="mt-10 flex flex-wrap gap-1 border-b border-[var(--color-ink-300)]/30"
        >
          {solutions.map((s, i) => (
            <button
              key={s.key}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "relative -mb-px border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                i === active
                  ? "border-[var(--color-navy-900)] text-[var(--color-navy-900)]"
                  : "border-transparent text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)]",
              )}
            >
              {s.title}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--color-paper-dark)]">
            <Image
              src={current.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <Eyebrow>{`0${active + 1} / 0${solutions.length}`}</Eyebrow>
            <h3 className="mt-4 text-display-3 text-balance">{current.title}</h3>
            <p className="mt-5 text-lede max-w-xl">{current.blurb}</p>
            <Link
              href={current.href}
              className="mt-8 inline-flex items-center gap-1.5 text-base font-medium text-[var(--color-navy-900)] hover:gap-2 transition-all"
            >
              Learn more <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
