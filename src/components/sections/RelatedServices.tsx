import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { ServiceDoc } from "@/content/types";

export async function RelatedServices({
  siblings,
  parentTitle,
  locale = "en",
  id,
}: {
  siblings: ServiceDoc[];
  parentTitle: string;
  locale?: string;
  id?: string;
}) {
  if (siblings.length === 0) return null;
  const t = await getTranslations({ locale, namespace: "services" });

  return (
    <Section tone="paper" size="sm" id={id}>
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>{t("related")}</Eyebrow>
          <h2 className="mt-4 text-display-3 text-balance">
            {t("moreWithin", { title: parentTitle })}
          </h2>
        </div>
        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {siblings.map((s) => (
            <Link
              key={s.frontmatter.slug}
              href={`/${locale}/services/${s.frontmatter.slug}`}
              className="group flex flex-col rounded-xl border border-[var(--color-ink-300)]/30 bg-[var(--color-cream-50)] p-6 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
            >
              <h3 className="text-base font-semibold text-[var(--color-ink-900)] group-hover:text-[var(--color-navy-900)]">
                {s.frontmatter.title}
              </h3>
              {s.frontmatter.lede ? (
                <p className="mt-2 text-sm text-[var(--color-ink-500)]">{s.frontmatter.lede}</p>
              ) : null}
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-navy-900)] group-hover:gap-2 transition-all">
                {t("learnMore")} <ArrowRight className="size-3.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
