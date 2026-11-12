import { getTranslations } from "next-intl/server";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { CardLink } from "@/components/ui/CardLink";
import { listCases } from "@/content/loader";

/** "Related cases" / "More cases" — case cards fed by the localized case content. */
export async function RelatedCases({
  locale,
  slugs,
  title,
  large = false,
  children,
}: {
  locale: string;
  slugs: string[];
  title?: string;
  /** Case-page size (28px titles, 340px min column). */
  large?: boolean;
  /** Rendered inside each card above the CTA, keyed by slug. */
  children?: (slug: string) => React.ReactNode;
}) {
  const [t, th] = await Promise.all([getTranslations("solutions"), getTranslations("home.cases")]);
  const all = await listCases(locale);
  const cases = slugs.flatMap((slug) => all.filter((c) => c.frontmatter.slug === slug));

  return (
    <section className="site-container section-top">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
        <h2 className="m-0 text-[clamp(30px,3.4vw,48px)] leading-[1.12] font-medium tracking-[-0.02em]">
          {title ?? t("relatedCases")}
        </h2>
        <Link href="/cases" className="text-[16px] font-medium text-[var(--color-accent)]">
          {th("all")}
        </Link>
      </div>
      <div
        className={
          large
            ? "grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-7"
            : "grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-7"
        }
      >
        {cases.map(({ frontmatter: c }) => (
          <CardLink
            key={c.slug}
            href={`/cases/${c.slug}`}
            image={c.heroImage}
            alt={c.title}
            label={th(`industries.${c.industry}`)}
            title={c.title}
            text={c.excerpt}
            cta={th("read")}
            large={large}
          >
            {children?.(c.slug)}
          </CardLink>
        ))}
      </div>
    </section>
  );
}
