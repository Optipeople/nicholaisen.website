import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { listCases } from "@/content/loader";

export async function CaseList({
  id,
  filterBySlug,
  filterByIndustry,
  limit = 3,
  title = "Case studies",
  eyebrow = "Cases",
  emptyMessage = "Selected cases coming soon.",
}: {
  id?: string;
  filterBySlug?: string[];
  filterByIndustry?: string;
  limit?: number;
  title?: string;
  eyebrow?: string;
  emptyMessage?: string;
}) {
  let cases = await listCases();
  if (filterBySlug && filterBySlug.length > 0) {
    cases = cases.filter((c) => filterBySlug.includes(c.frontmatter.slug));
  }
  if (filterByIndustry) {
    cases = cases.filter((c) => c.frontmatter.industry === filterByIndustry);
  }
  cases = cases.slice(0, limit);

  return (
    <Section tone="cream" size="md" id={id}>
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-display-3 text-balance">{title}</h2>
        </div>
        {cases.length === 0 ? (
          <p className="mt-12 text-[var(--color-ink-500)]">{emptyMessage}</p>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {cases.map(({ frontmatter: fm }) => (
              <article key={fm.slug}>
                <Link href={`/cases/${fm.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--color-paper-dark)]">
                    <Image
                      src={fm.heroImage}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-5 text-eyebrow">{fm.industry.replace("-", " · ")}</p>
                  <h3 className="mt-2 text-xl font-semibold leading-tight text-[var(--color-ink-900)] group-hover:text-[var(--color-navy-900)] text-balance">
                    {fm.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] text-[var(--color-ink-500)]">{fm.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-navy-900)] group-hover:gap-2 transition-all">
                    Read the case <ArrowRight className="size-3.5" aria-hidden />
                  </span>
                </Link>
              </article>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
