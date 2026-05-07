import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { listCases } from "@/content/loader";

export async function CaseSpotlight() {
  const cases = await listCases();
  const featured = cases[0];
  if (!featured) return null;
  const fm = featured.frontmatter;

  return (
    <Section tone="navy" size="md">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <Eyebrow className="text-[var(--color-tan-300)]">Featured case</Eyebrow>
            <h2 className="mt-5 text-display-2 text-balance text-[var(--color-cream-50)]">
              {fm.title}
            </h2>
            <p className="mt-6 max-w-xl text-lede text-[var(--color-cream-50)]">
              {fm.excerpt}
            </p>

            {fm.metrics.length > 0 ? (
              <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:max-w-md">
                {fm.metrics.slice(0, 4).map((m) => (
                  <div key={m.label} className="border-l-2 border-[var(--color-tan-500)] pl-4">
                    <dt className="text-xs uppercase tracking-wider text-[var(--color-cream-50)]/60">
                      {m.label}
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold text-[var(--color-cream-50)]">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}

            <Link
              href={`/cases/${fm.slug}`}
              className="mt-10 inline-flex items-center gap-1.5 text-base font-medium text-[var(--color-cream-50)] hover:gap-2 transition-all"
            >
              Read the case <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--color-navy-700)]">
            <Image
              src={fm.heroImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
