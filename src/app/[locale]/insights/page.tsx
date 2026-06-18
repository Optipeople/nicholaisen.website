import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { listInsights } from "@/content/loader";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/format";

const categoryLabels: Record<string, string> = {
  industry: "Industry",
  optimization: "Optimization",
  "opti-platform": "Opti",
  company: "Company",
};

export const metadata: Metadata = buildMetadata({
  title: "Insights",
  description: "Notes from the shop floor — observations, methods, and what we’re learning.",
  path: "/insights",
});

export default async function InsightsIndexPage() {
  const insights = await listInsights();
  const [featured, ...rest] = insights;

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Notes from the shop floor."
        lede="Observations, methods, and what we’re learning. Written by the people doing the work."
        align="wide"
      />

      {featured ? (
        <Section tone="paper" size="md">
          <Container>
            <Link
              href={`/insights/${featured.frontmatter.slug}`}
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
                <Eyebrow>Featured</Eyebrow>
                <p className="mt-4 text-eyebrow text-[var(--color-tan-500)]">
                  {categoryLabels[featured.frontmatter.category] ??
                    featured.frontmatter.category}{" "}
                  · {formatDate(featured.frontmatter.publishedAt)} · {featured.readingTime} min
                </p>
                <h2 className="mt-3 text-display-2 leading-[1.05] text-balance text-[var(--color-ink-900)] group-hover:text-[var(--color-navy-900)]">
                  {featured.frontmatter.title}
                </h2>
                <p className="mt-5 text-lede max-w-xl">{featured.frontmatter.excerpt}</p>
                <span className="mt-8 inline-flex items-center gap-1.5 text-base font-medium text-[var(--color-navy-900)] group-hover:gap-2 transition-all">
                  Read it <ArrowRight className="size-4" aria-hidden />
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
                  <Link href={`/insights/${doc.frontmatter.slug}`} className="group block">
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
                      <span>{doc.readingTime} min</span>
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

      <CtaBand
        title="Want these in your inbox?"
        body="A short note when something genuinely useful goes up. No filler."
        primary={{ label: "Get in touch", href: "/contact" }}
        secondary={{ label: "RSS feed", href: "/insights/rss.xml" }}
      />
    </>
  );
}
