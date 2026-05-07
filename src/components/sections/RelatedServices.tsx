import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { services as servicesNav } from "@/lib/nav";

export function RelatedServices({
  currentSlug,
  parentCategory,
  id,
}: {
  currentSlug: string;
  parentCategory?: string;
  id?: string;
}) {
  // Find sibling sub-services within the same parent category
  const category = parentCategory
    ? servicesNav.find((s) => s.href === `/services/${parentCategory}`)
    : null;

  const siblings = category?.items.filter((item) => !item.href.endsWith(`/${currentSlug}`)) ?? [];
  if (siblings.length === 0) return null;

  return (
    <Section tone="paper" size="sm" id={id}>
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Related</Eyebrow>
          <h2 className="mt-4 text-display-3 text-balance">More within {category?.title}.</h2>
        </div>
        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {siblings.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex flex-col rounded-xl border border-[var(--color-ink-300)]/30 bg-[var(--color-cream-50)] p-6 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
            >
              <h3 className="text-base font-semibold text-[var(--color-ink-900)] group-hover:text-[var(--color-navy-900)]">
                {s.title}
              </h3>
              {s.description ? (
                <p className="mt-2 text-sm text-[var(--color-ink-500)]">{s.description}</p>
              ) : null}
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-navy-900)] group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="size-3.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
