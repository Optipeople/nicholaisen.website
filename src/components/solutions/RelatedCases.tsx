import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { listCases } from "@/content/loader";

/** "Related cases" — bordered case cards fed by the localized case content. */
export async function RelatedCases({ locale, slugs }: { locale: string; slugs: string[] }) {
  const [t, th] = await Promise.all([getTranslations("solutions"), getTranslations("home.cases")]);
  const all = await listCases(locale);
  const cases = slugs.flatMap((slug) => all.filter((c) => c.frontmatter.slug === slug));

  return (
    <section className="site-container section-top">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
        <h2 className="m-0 text-[clamp(30px,3.4vw,48px)] leading-[1.12] font-medium tracking-[-0.02em]">
          {t("relatedCases")}
        </h2>
        <Link href="/cases" className="text-[16px] font-medium text-[var(--color-accent)]">
          {th("all")}
        </Link>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-7">
        {cases.map(({ frontmatter: c }) => (
          <Link
            key={c.slug}
            href={`/cases/${c.slug}`}
            className="flex flex-col gap-[18px] rounded-[4px] border border-[var(--color-divider)] bg-white px-5 pt-5 pb-7 text-[var(--color-text)] transition-[border-color,box-shadow] duration-200 hover:border-[var(--color-accent-400)] hover:text-[var(--color-text)] hover:shadow-[0_10px_32px_color-mix(in_srgb,#003050_10%,transparent)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-[var(--color-accent-200)]">
              {c.heroImage ? (
                <Image src={c.heroImage} alt={c.title} fill sizes="(min-width: 1320px) 420px, 90vw" className="object-cover" />
              ) : null}
            </div>
            <div className="flex flex-1 flex-col gap-3 px-2 pt-1">
              <span className="text-[13px] font-medium tracking-[0.16em] text-[var(--color-accent-500)] uppercase">
                {th(`industries.${c.industry}`)}
              </span>
              <h3 className="m-0 text-[clamp(22px,2vw,26px)] leading-[1.2] font-medium tracking-[-0.015em] text-pretty">
                {c.title}
              </h3>
              <p className="m-0 flex-1 text-[16px] leading-[1.6] text-pretty text-[var(--color-accent-500)]">{c.excerpt}</p>
              <span className="mt-2.5 flex items-center gap-2.5 text-[16px] font-medium text-[var(--color-accent)]">
                {th("read")} <span aria-hidden>→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
