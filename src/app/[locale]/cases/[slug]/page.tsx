import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PhotoHero } from "@/components/ui/PhotoHero";
import { OverlapCard } from "@/components/ui/OverlapCard";
import { CardMetrics } from "@/components/ui/CardLink";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { RelatedCases } from "@/components/solutions/RelatedCases";
import { Mdx } from "@/components/mdx/Mdx";
import { getCase, getService, listCases } from "@/content/loader";
import { caseOrder, formatCaseDate, splitCaseBody } from "@/lib/cases";
import { tracks } from "@/lib/tracks";
import { buildMetadata } from "@/lib/seo";

type Params = { slug: string; locale: string };

export async function generateStaticParams() {
  const cases = await listCases();
  return cases.map((c) => ({ slug: c.frontmatter.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const doc = await getCase(slug, locale);
  if (!doc) return {};
  const fm = doc.frontmatter;
  return buildMetadata({
    title: fm.seo?.title ?? fm.title,
    description: fm.seo?.description ?? fm.excerpt,
    path: `/cases/${fm.slug}`,
    ogImage: fm.heroImage,
  });
}

/** Case body typography from the design: 26–34px section headings, 17.5px copy. */
const caseMdx = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="m-0 text-[clamp(26px,2.4vw,34px)] leading-[1.2] font-medium tracking-[-0.02em] [&:not(:first-child)]:mt-[38px]" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="m-0 text-[17.5px] leading-[1.7] text-pretty text-[var(--color-text)]" {...props} />
  ),
};

/** Case detail (design v3 "CASE DETAIL"). */
export default async function CasePage({ params }: { params: Promise<Params> }) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const doc = await getCase(slug, locale);
  if (!doc) notFound();
  const fm = doc.frontmatter;
  const [t, th] = await Promise.all([getTranslations("casePage"), getTranslations("home.cases")]);
  const { body, figures, quote, callout } = splitCaseBody(doc.body);

  // "Services applied": each service's own title, linked to its track page.
  const services = (
    await Promise.all(
      fm.services.map(async (s) => {
        const track = tracks.find((tr) => tr.slug === s.split("/")[0]);
        const svc = await getService(s, locale);
        return track && svc ? { label: svc.frontmatter.title, href: track.href } : null;
      }),
    )
  ).filter((s): s is { label: string; href: string } => !!s);

  const i = caseOrder.findIndex((c) => c.slug === fm.slug);
  const more = [1, 2, 3].map((d) => caseOrder[(i + d + caseOrder.length) % caseOrder.length]!.slug);
  const metricsBySlug = new Map((await listCases(locale)).map((c) => [c.frontmatter.slug, c.frontmatter.metrics]));
  const cao = [
    { title: t("challenge"), text: fm.challenge },
    { title: t("approach"), text: fm.approach },
    { title: t("outcome"), text: fm.outcome },
  ];

  return (
    <main>
      <PhotoHero
        image={fm.heroImage}
        alt={fm.title}
        back={{ href: "/cases", label: t("allCases") }}
        kicker={`${th(`industries.${fm.industry}`)} · ${formatCaseDate(fm.publishedAt, locale)}`}
        title={fm.title}
        lede={fm.excerpt}
        note={fm.client ? `${t("client")}: ${fm.client}` : undefined}
        titleMaxWidth="18ch"
        ledeMaxWidth="60ch"
        bottom="overlap"
      />

      {/* Results card over the hero */}
      <OverlapCard tab={t("results")}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-x-10 gap-y-7 px-[clamp(20px,4vw,48px)] pt-8 pb-9">
          {fm.metrics.map((m) => (
            <div key={m.label} className="flex flex-col gap-2.5">
              <span className="text-[13px] font-medium tracking-[0.1em] text-[var(--color-accent-500)] uppercase">{m.label}</span>
              <span className="text-[clamp(30px,3vw,44px)] leading-none font-medium tracking-[-0.02em] text-[var(--color-accent)] tabular-nums">
                {m.value}
              </span>
            </div>
          ))}
        </div>
      </OverlapCard>

      {/* Challenge · Approach · Outcome */}
      <section className="site-container pt-24">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-[clamp(32px,4vw,64px)] gap-y-12">
          {cao.map((b, n) => (
            <div key={b.title} className="flex flex-col gap-3.5 border-t-2 border-[var(--color-accent)] pt-5">
              <span className="text-[13px] font-semibold text-[var(--color-spot)] tabular-nums">0{n + 1}</span>
              <h2 className="m-0 text-[26px] leading-[1.12] font-medium tracking-[-0.015em]">{b.title}</h2>
              <p className="m-0 text-[16.5px] leading-[1.65] text-pretty text-[var(--color-accent-500)]">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services applied + story */}
      <section className="site-container grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] items-start gap-x-[clamp(32px,6vw,96px)] gap-y-12 py-24">
        <aside className="flex flex-col gap-3.5">
          <span className="text-label">{t("servicesApplied")}</span>
          <div className="flex flex-col gap-2">
            {services.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className="flex items-center justify-between gap-3 rounded-[4px] border border-[var(--color-divider)] px-3.5 py-3 text-[15.5px] text-[var(--color-text)] hover:border-[var(--color-accent-400)] hover:bg-[var(--color-accent-100)] hover:text-[var(--color-text)]"
              >
                {s.label} <span className="text-[var(--color-accent-400)]">→</span>
              </Link>
            ))}
          </div>
        </aside>
        <article className="col-span-2 flex max-w-[760px] min-w-[min(100%,300px)] flex-col gap-[18px] max-[920px]:col-span-1">
          <Mdx source={body} components={caseMdx} />
          {callout ? (
            <div className="mt-[38px] flex flex-col gap-3 rounded-[4px] bg-[var(--color-navy-900)] px-[clamp(24px,3vw,40px)] py-8 text-white">
              <span className="text-label text-[var(--color-spot)]">{t("keyInsight")}</span>
              {callout.title ? (
                <h3 className="m-0 text-[22px] leading-[1.3] font-medium tracking-[-0.01em] text-white">{callout.title}</h3>
              ) : null}
              <p className="m-0 text-[16.5px] leading-[1.65] text-pretty text-white/75">{callout.text}</p>
            </div>
          ) : null}
        </article>
      </section>

      {/* Figures band: white like the rest of the page, set off by a hairline above */}
      {figures.length ? (
        <section className="site-container">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-10 border-t border-[var(--color-divider)] pt-16 pb-4">
            {figures.map((f) => (
              <div key={f.label}>
                <div className="text-[clamp(48px,5.6vw,80px)] leading-[0.95] font-extralight tracking-[-0.04em] tabular-nums">
                  {f.value}
                </div>
                <span aria-hidden className="mt-5 mb-3 block h-[2px] w-10 bg-[var(--color-spot)]" />
                <div className="text-[14px] font-medium tracking-[0.06em] uppercase">{f.label}</div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {quote ? (
        <section className="mx-auto max-w-[1040px] px-[clamp(20px,5vw,64px)] pt-28 text-center">
          <blockquote className="m-0 text-[clamp(26px,3vw,40px)] leading-[1.3] font-medium tracking-[-0.02em] text-balance">
            “{quote.text}”
          </blockquote>
          {quote.by ? (
            <p className="mt-6 mb-0 text-[15px] tracking-[0.1em] text-[var(--color-accent-500)] uppercase">— {quote.by}</p>
          ) : null}
        </section>
      ) : null}

      <RelatedCases locale={locale} slugs={more} title={t("moreCases")} large>
        {(s) => <CardMetrics metrics={(metricsBySlug.get(s) ?? []).slice(0, 3)} />}
      </RelatedCases>
    </main>
  );
}
