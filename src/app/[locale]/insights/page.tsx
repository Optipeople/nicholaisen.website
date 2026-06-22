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
import { listInsights } from "@/content/loader";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = buildMetadata({
  title: "Insights",
  description: "Notes from the shop floor — observations, methods, and what we're learning.",
  path: "/insights",
});

export default async function InsightsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "insights" });
  const insights = await listInsights(locale);
  const [featured, ...rest] = insights;

  const categoryLabels: Record<string, string> = {
    industry: t("categoryIndustry"),
    optimization: t("categoryOptimization"),
    "opti-platform": t("categoryOptiPlatform"),
    company: t("categoryCompany"),
  };

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lede={t("hero.lede")}
        align="wide"
      />

      {featured ? (
        <Section tone="paper" size="md">
          <Container>
            <Link
              href={`/${locale}/insights/${featured.frontmatter.slug}`}
              className="group grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--color-paper-dark)]">
                <Image
                  src={featured.frontmatter.heroImage}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div>
                <Eyebrow>{t("featured")}</Eyebrow>
                <p className="mt-4 text-eyebrow text-[var(--color-tan-500)]">
                  {categoryLabels[featured.frontmatter.category] ??
                    featured.frontmatter.category}{" "}
                  · {formatDate(featured.frontmatter.publishedAt)} · {featured.readingTime} {t("minRead")}
                </p>
                <h2 className="mt-3 text-display-2 leading-[1.05] text-balance text-[var(--color-ink-900)] group-hover:text-[var(--color-navy-900)]">
                  {featured.frontmatter.title}
                </h2>
                <p className="mt-5 text-lede max-w-xl">{featured.frontmatter.excerpt}</p>
                <span className="mt-8 inline-flex items-center gap-1.5 text-base font-medium text-[var(--color-navy-900)] group-hover:gap-2 transition-all">
                  {t("readIt")} <ArrowRight className="size-4" aria-hidden />
                </span>
              </div>
            </Link>
          </Container>
        </Section>
      ) : null}

      {rest.length > 0 ? (
        <Section tone="cream" size="md">
          <Container>
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((doc) => (
                <article key={doc.frontmatter.slug}>
                  <Link href={`/${locale}/insights/${doc.frontmatter.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--color-paper-dark)]">
                      <Image
                        src={doc.frontmatter.heroImage}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="mt-5 flex items-center gap-3 text-xs uppercase tracking-wider text-[var(--color-ink-500)]">
                      <span>{categoryLabels[doc.frontmatter.category] ?? doc.frontmatter.category}</span>
                      <span aria-hidden>·</span>
                      <time dateTime={doc.frontmatter.publishedAt}>
                        {formatDate(doc.frontmatter.publishedAt)}
                      </time>
                      <span aria-hidden>·</span>
                      <span>{doc.readingTime} {t("minRead")}</span>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold leading-tight text-[var(--color-ink-900)] group-hover:text-[var(--color-navy-900)] text-balance">
                      {doc.frontmatter.title}
                    </h3>
                    <p className="mt-3 text-[0.95rem] text-[var(--color-ink-500)]">
                      {doc.frontmatter.excerpt}
                    </p>
                  </Link>
                </article>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaBand locale={locale} />
    </>
  );
}
