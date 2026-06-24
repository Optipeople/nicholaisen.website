"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

const solutionKeys = [
  { key: "businessDevelopment", slug: "business-development", image: "/images/top-view-boards-mdf-material-1-scaled-1.jpg" },
  { key: "productionOptimization", slug: "production-optimization", image: "/images/workshop/panel-saw.png" },
  { key: "projectSolutions", slug: "project-solutions", image: "/images/workshop/cnc-machining.jpg" },
  { key: "digitalPerformance", slug: "digital-performance", image: "/images/workshop/six-sided-drilling.jpg" },
  { key: "partnership", slug: "partnership", image: "/images/workshop/nesting.jpg" },
] as const;

export function SolutionTabs({ locale }: { locale: string }) {
  const [active, setActive] = useState(0);
  const lp = (path: string) => locale === routing.defaultLocale ? path : `/${locale}${path}`;
  const t = useTranslations("home");
  const tn = useTranslations("nav");
  const tc = useTranslations("common");

  const solutions = solutionKeys.map((s) => ({
    ...s,
    title: tn(`servicesMenu.${s.key}.title`),
    blurb: tn(`servicesMenu.${s.key}.description`),
    href: lp(`/services/${s.slug}`),
  }));

  const current = solutions[active]!;

  return (
    <Section tone="paper" size="md">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Eyebrow>{t("solutions.eyebrow")}</Eyebrow>
            <h2 className="mt-4 text-display-3 text-balance">
              {t("solutions.title")}
            </h2>
          </div>
          <Link
            href={lp("/services")}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-navy-900)] hover:gap-2 transition-all"
          >
            {t("solutions.allSolutions")} <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>

        <div
          role="tablist"
          aria-label={t("solutions.eyebrow")}
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
              {tc("learnMore")} <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
