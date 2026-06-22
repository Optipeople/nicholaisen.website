import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { listInsights } from "@/content/loader";
import { formatDate } from "@/lib/format";

export async function InsightGrid({ locale, limit = 3 }: { locale: string; limit?: number }) {
  const t = await getTranslations({ locale, namespace: "home" });
  const ti = await getTranslations({ locale, namespace: "insights" });
  const insights = (await listInsights(locale)).slice(0, limit);
  if (insights.length === 0) return null;

  const categoryLabels: Record<string, string> = {
    industry: ti("categoryIndustry"),
    optimization: ti("categoryOptimization"),
    "opti-platform": ti("categoryOptiPlatform"),
    company: ti("categoryCompany"),
  };

  return (
    <Section tone="cream" size="md">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>{t("latestInsights.eyebrow")}</Eyebrow>
            <h2 className="mt-4 text-display-3 text-balance">
              {t("latestInsights.title")}
            </h2>
          </div>
          <Link
            href={`/${locale}/insights`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-navy-900)] hover:gap-2 transition-all"
          >
            {ti("allInsights")} <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {insights.map((doc) => {
            const fm = doc.frontmatter;
            return (
              <article key={fm.slug}>
                <Link href={`/${locale}/insights/${fm.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--color-paper-dark)]">
                    <Image
                      src={fm.heroImage}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-5 flex items-center gap-3 text-xs uppercase tracking-wider text-[var(--color-ink-500)]">
                    <span>{categoryLabels[fm.category] ?? fm.category}</span>
                    <span aria-hidden>·</span>
                    <time dateTime={fm.publishedAt}>{formatDate(fm.publishedAt)}</time>
                    <span aria-hidden>·</span>
                    <span>{doc.readingTime} {ti("minRead")}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold leading-tight text-[var(--color-ink-900)] group-hover:text-[var(--color-navy-900)] text-balance">
                    {fm.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] text-[var(--color-ink-500)]">
                    {fm.excerpt}
                  </p>
                </Link>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
