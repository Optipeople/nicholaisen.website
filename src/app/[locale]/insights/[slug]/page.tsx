import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CtaBand } from "@/components/sections/CtaBand";
import { Mdx } from "@/components/mdx/Mdx";
import { getInsight, listInsights } from "@/content/loader";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/format";

type Params = { slug: string; locale: string };

export async function generateStaticParams() {
  const insights = await listInsights();
  return insights.map((i) => ({ slug: i.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getInsight(slug);
  if (!doc) return {};
  const fm = doc.frontmatter;
  return buildMetadata({
    title: fm.seo?.title ?? fm.title,
    description: fm.seo?.description ?? fm.excerpt,
    path: `/insights/${fm.slug}`,
    ogImage: fm.heroImage,
  });
}

function scoreOverlap(a: string[], b: string[]) {
  const setB = new Set(b);
  return a.filter((tag) => setB.has(tag)).length;
}

export default async function InsightPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: "insights" });
  const doc = await getInsight(slug, locale);
  if (!doc) notFound();
  const fm = doc.frontmatter;

  const categoryLabels: Record<string, string> = {
    industry: t("categoryIndustry"),
    optimization: t("categoryOptimization"),
    "opti-platform": t("categoryOptiPlatform"),
    company: t("categoryCompany"),
  };

  const all = await listInsights(locale);
  const related = all
    .filter((d) => d.frontmatter.slug !== fm.slug)
    .map((d) => ({
      doc: d,
      score:
        scoreOverlap(d.frontmatter.tags, fm.tags) +
        (d.frontmatter.category === fm.category ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <>
      <section className="bg-[var(--color-cream-50)] pt-10 pb-12 lg:pt-16">
        <Container size="narrow">
          <Link
            href={`/${locale}/insights`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink-500)] hover:text-[var(--color-navy-900)]"
          >
            <ArrowLeft className="size-3.5" /> {t("allInsights")}
          </Link>
          <div className="mx-auto mt-8 max-w-3xl">
            <Eyebrow>
              {categoryLabels[fm.category] ?? fm.category} · {formatDate(fm.publishedAt)} ·{" "}
              {doc.readingTime} {t("minRead")}
            </Eyebrow>
            <h1 className="mt-5 text-display-1 text-balance">{fm.title}</h1>
            <p className="mt-6 text-lede max-w-2xl">{fm.excerpt}</p>
            <p className="mt-6 text-sm text-[var(--color-ink-500)]">{t("by")} {fm.author}</p>
          </div>
        </Container>
      </section>

      <section className="relative">
        <Container size="narrow">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[var(--color-paper-dark)]">
            <Image
              src={fm.heroImage}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <Section tone="cream" size="md">
        <Container size="narrow">
          <article className="mx-auto max-w-3xl">
            <Mdx source={doc.body} />

            {fm.tags.length > 0 ? (
              <div className="mt-16 flex flex-wrap gap-2 border-t border-[var(--color-ink-300)]/30 pt-8">
                {fm.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-[var(--color-paper)] px-3 py-1 text-xs font-medium text-[var(--color-ink-700)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </article>
        </Container>
      </Section>

      {related.length > 0 ? (
        <Section tone="paper" size="md">
          <Container>
            <Eyebrow>{t("keepReading")}</Eyebrow>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {related.map(({ doc: r }) => (
                <Link
                  key={r.frontmatter.slug}
                  href={`/${locale}/insights/${r.frontmatter.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--color-paper-dark)]">
                    <Image
                      src={r.frontmatter.heroImage}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-wider text-[var(--color-ink-500)]">
                    {categoryLabels[r.frontmatter.category] ?? r.frontmatter.category} ·{" "}
                    {formatDate(r.frontmatter.publishedAt)}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold leading-tight text-[var(--color-ink-900)] group-hover:text-[var(--color-navy-900)] text-balance">
                    {r.frontmatter.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-navy-900)] group-hover:gap-2 transition-all">
                    {t("readIt")} <ArrowRight className="size-3.5" aria-hidden />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaBand locale={locale} />
    </>
  );
}
