import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { listInsights } from "@/content/loader";
import { formatDate } from "@/lib/format";

const categoryLabels: Record<string, string> = {
  industry: "Industry",
  optimization: "Optimization",
  "opti-platform": "Opti",
  company: "Company",
};

export async function InsightGrid({ limit = 3 }: { limit?: number } = {}) {
  const insights = (await listInsights()).slice(0, limit);
  if (insights.length === 0) return null;

  return (
    <Section tone="cream" size="md">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>Latest insights</Eyebrow>
            <h2 className="mt-4 text-display-3 text-balance">
              Notes from the shop floor.
            </h2>
          </div>
          <Link
            href="/insights"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-navy-900)] hover:gap-2 transition-all"
          >
            All insights <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {insights.map((doc) => {
            const fm = doc.frontmatter;
            return (
              <article key={fm.slug}>
                <Link href={`/insights/${fm.slug}`} className="group block">
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
                    <span>{doc.readingTime} min</span>
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
