import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { listCases } from "@/content/loader";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cases",
  description: "Selected work — investments validated, factories built, lines optimized.",
  path: "/cases",
});

export default async function CasesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cases" });
  const cases = await listCases(locale);

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lede={t("hero.lede")}
        align="wide"
      />

      <Section tone="paper" size="md">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {cases.map(({ frontmatter: c }) => (
              <Link
                key={c.slug}
                href={`/${locale}/cases/${c.slug}`}
                className="group block rounded-xl border border-[var(--color-ink-300)]/30 bg-[var(--color-cream-50)] p-6 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-[var(--color-paper-dark)]">
                  <Image
                    src={c.heroImage}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-6">
                  <Eyebrow>{c.industry.replace("-", " · ")}</Eyebrow>
                  <h2 className="mt-3 text-2xl font-semibold leading-tight text-[var(--color-ink-900)] group-hover:text-[var(--color-navy-900)] text-balance">
                    {c.title}
                  </h2>
                  <p className="mt-3 text-[0.95rem] text-[var(--color-ink-500)]">{c.excerpt}</p>
                  {c.metrics.length > 0 ? (
                    <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                      {c.metrics.slice(0, 3).map((m) => (
                        <div key={m.label}>
                          <dt className="text-xs uppercase tracking-wider text-[var(--color-ink-500)]">
                            {m.label}
                          </dt>
                          <dd className="text-lg font-semibold text-[var(--color-navy-900)]">
                            {m.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-navy-900)] group-hover:gap-2 transition-all">
                    {t("readCase")} <ArrowRight className="size-3.5" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand locale={locale} />
    </>
  );
}
