import { getTranslations } from "next-intl/server";
import { PhotoHero } from "@/components/ui/PhotoHero";
import { HeroIconLinks } from "@/components/ui/HeroIconLinks";
import { SplitFeature, FeatureText } from "@/components/ui/SplitFeature";
import { TextSection } from "@/components/ui/TextSection";
import { CardLink } from "@/components/ui/CardLink";
import { Kicker } from "@/components/ui/Kicker";
import { LinkButton } from "@/components/ui/Button";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { ChartLineIcon, PackageIcon, PlayCircleIcon } from "@/components/ui/icons";
import { trackHref, type TrackKey } from "@/lib/tracks";
import {
  mdxServiceHref,
  mdxServicePages,
  serviceHref,
  servicePageByKey,
  type MdxServicePage,
  type ServicePage,
} from "@/lib/services";
import { getCase, getService } from "@/content/loader";
import { splitSections } from "@/lib/industries";

type Pair = { title: string; text: string };
type Related = { href: string; image: string; area: string; title: string; text: string };

/** Everything the service template shows, whichever source it comes from. */
export type ServiceDetailData = {
  image: string;
  image2: string;
  /** Small label above the headline (the service's name). */
  kicker: string;
  area: string;
  areaHref: string;
  headline: string;
  sub: string;
  cta: string;
  introTitle: string;
  intro: string[];
  getTitle: string;
  /** "What you get" lines; a title is shown in bold before the text. */
  get: { title?: string; text: string }[];
  whyTitle: string;
  why: Pair[];
  how: string[];
  /** Extra text sections after the grid (MDX story sections). */
  extra: { kicker: string; title: string; paragraphs: string[]; link?: { href: string; label: string } }[];
  proof: string;
  stats: { value: string; label: string }[];
  proofLink: { href: string; label: string };
  related: Related[];
  closing: string;
};

const h2Small = "m-0 text-[clamp(30px,3.4vw,48px)] leading-[1.1] font-medium tracking-[-0.02em]";

/** Service sub-page (design v3 "SERVICE"), shared by every service that has one. */
export async function ServiceDetailView({ data }: { data: ServiceDetailData }) {
  const t = await getTranslations("serviceDetail.labels");
  // Without a case and its figures there is no "proof" section (or jump to it).
  const hasProof = data.stats.length > 0;

  return (
    <main>
      <PhotoHero
        image={data.image}
        alt={data.kicker}
        back={{ href: data.areaHref, label: data.area }}
        kicker={data.kicker}
        title={data.headline}
        lede={data.sub}
        titleMaxWidth="18ch"
        ledeMaxWidth="58ch"
      >
        <HeroIconLinks
          label={t("jumpLabel")}
          maxWidth="720px"
          items={[
            { href: "#what-you-get", label: t("whatYouGet"), Icon: PackageIcon },
            { href: "#how-it-works", label: t("howItWorks"), Icon: PlayCircleIcon },
            ...(hasProof ? [{ href: "#proof", label: t("theProof"), Icon: ChartLineIcon }] : []),
          ]}
        />
      </PhotoHero>

      <SplitFeature
        image={data.image}
        alt={data.kicker}
        kicker={data.area}
        title={data.introTitle}
        actions={
          <>
            <LinkButton href="/contact" variant="solid" size="feature">
              {data.cta}
            </LinkButton>
            <LinkButton href="#how-it-works" variant="outline" size="feature" className="py-3">
              {t("seeHow")}
            </LinkButton>
          </>
        }
      >
        {data.intro.map((para) => (
          <FeatureText key={para}>{para}</FeatureText>
        ))}
      </SplitFeature>

      <SplitFeature id="what-you-get" image={data.image2} alt={data.kicker} imageFirst kicker={t("whatYouGet")} title={data.getTitle}>
        {data.get.map((g) => (
          <FeatureText key={g.text}>
            {g.title ? <strong className="font-semibold">{g.title}.</strong> : null} {g.text}
          </FeatureText>
        ))}
      </SplitFeature>

      <section className="site-container section-top">
        <h2 className={`${h2Small} mb-10`}>{data.whyTitle}</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-10 gap-y-8">
          {data.why.map((w, i) => (
            <div
              key={w.title}
              className="flex flex-col gap-2.5 border-t-2 pt-5"
              style={{ borderColor: i === 0 ? "var(--color-accent)" : "var(--color-accent-300)" }}
            >
              <span className="text-[22px] leading-[1.3] font-medium tracking-[-0.01em]">{w.title}</span>
              <span className="text-[15.5px] leading-[1.55] text-[var(--color-accent-500)]">{w.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="site-container section-top scroll-mt-6">
        <h2 className={`${h2Small} mb-14`}>{t("howItWorks")}</h2>
        <div className="no-scrollbar overflow-x-auto">
          <div
            className="relative grid gap-4"
            style={{ gridTemplateColumns: `repeat(${data.how.length}, minmax(0, 1fr))`, minWidth: data.how.length > 4 ? 700 : 560 }}
          >
            <div
              aria-hidden
              className="absolute top-7 h-px bg-[var(--color-accent-300)]"
              style={{ left: `${50 / data.how.length}%`, right: `${50 / data.how.length}%` }}
            />
            {data.how.map((step, i) => (
              <div key={step} className="relative z-[1] flex flex-col items-center gap-4 text-center">
                <span className="flex size-14 items-center justify-center rounded-full border border-[var(--color-accent-300)] bg-white text-[15px] font-semibold text-[var(--color-accent)] tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="max-w-[18ch] text-[18px] leading-[1.55] font-medium">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {data.extra.map((s) => (
        <TextSection
          key={s.title}
          kicker={s.kicker}
          title={s.title}
          paragraphs={s.paragraphs}
          action={
            s.link ? (
              <LinkButton href={s.link.href} external variant="outline" size="card" className="py-[11px]">
                {s.link.label} <span aria-hidden>↗</span>
              </LinkButton>
            ) : null
          }
        />
      ))}

      {hasProof ? (
      <section
        id="proof"
        className="site-container section-top grid scroll-mt-6 grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-x-[clamp(32px,6vw,96px)] gap-y-12"
      >
        <div className="flex flex-col items-start gap-5">
          <Kicker line>{t("customerCase")}</Kicker>
          <h2 className="text-display-2 m-0 text-balance">{t("proofTitle")}</h2>
          <FeatureText>{data.proof}</FeatureText>
          <Link
            href={data.proofLink.href}
            className="mt-2 border-b-[1.5px] border-[var(--color-accent)] pb-0.5 text-[16px] font-medium text-[var(--color-accent)]"
          >
            {data.proofLink.label}
          </Link>
        </div>
        <div className="flex flex-col border-t border-[var(--color-divider)]">
          {data.stats.map((s) => (
            <div key={s.label} className="grid grid-cols-2 items-center gap-6 border-b border-[var(--color-divider)] py-7">
              <span className="text-[clamp(40px,4vw,56px)] leading-none font-extralight tracking-[-0.04em] text-[var(--color-accent)] tabular-nums">
                {s.value}
              </span>
              <span className="text-[16px] leading-[1.45] text-[var(--color-accent-500)]">{s.label}</span>
            </div>
          ))}
        </div>
      </section>
      ) : null}

      <section className="site-container section-top">
        <h2 className={`${h2Small} mb-8`}>{t("related")}</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-7">
          {data.related.map((r) => (
            <CardLink key={r.title} href={r.href} image={r.image} alt={r.title} label={r.area} title={r.title} text={r.text} cta={t("learnMore")} />
          ))}
        </div>
      </section>

      <SplitFeature
        image="/images/v3/complete-factory.png"
        alt={t("teamAlt")}
        objectPosition="60% 40%"
        imageFirst
        kicker={t("getInTouch")}
        title={data.closing}
        gap="card"
        tightActions
        className="pb-28"
        actions={
          <LinkButton href="/contact" variant="solid" size="feature">
            {data.cta} →
          </LinkButton>
        }
      />
    </main>
  );
}

/** A track service's title and short copy (`solutions.tracks.<track>.services`). */
async function trackService(track: TrackKey, index: number) {
  const ts = await getTranslations("solutions.tracks");
  return (ts.raw(`${track}.services`) as { title: string; copy: string }[])[index]!;
}

/** Design sub-pages (Business Development): text from messages. */
export async function ServiceDetail({ page }: { page: ServicePage }) {
  const [t, tt] = await Promise.all([getTranslations("serviceDetail"), getTranslations("home.tracks.items")]);
  const p = (key: string) => t(`pages.${page.key}.${key}`);
  const raw = <T,>(key: string) => t.raw(`pages.${page.key}.${key}`) as T;

  const related = await Promise.all(
    page.related.map(async (r): Promise<Related> => {
      if ("page" in r) {
        const target = servicePageByKey(r.page);
        return {
          href: serviceHref(target),
          image: target.image,
          area: tt(`${target.track}.title`),
          title: (await trackService(target.track, target.index)).title,
          text: t(`pages.${target.key}.teaser`),
        };
      }
      const s = await trackService(r.track, r.index);
      return { href: trackHref(r.track), image: "/images/v3/cnc-technician.jpg", area: tt(`${r.track}.title`), title: s.title, text: s.copy };
    }),
  );

  return (
    <ServiceDetailView
      data={{
        image: page.image,
        image2: page.image2,
        kicker: (await trackService(page.track, page.index)).title,
        area: tt(`${page.track}.title`),
        areaHref: trackHref(page.track),
        headline: p("headline"),
        sub: p("sub"),
        cta: p("cta"),
        introTitle: p("introTitle"),
        intro: raw<string[]>("intro"),
        getTitle: p("getTitle"),
        get: raw<Pair[]>("get"),
        whyTitle: t("labels.why"),
        why: raw<Pair[]>("why"),
        how: raw<string[]>("how"),
        extra: [],
        proof: p("proof"),
        stats: raw<{ value: string; label: string }[]>("stats"),
        proofLink: { href: "/cases", label: t("labels.seeAllCases") },
        related,
        closing: p("closing"),
      }}
    />
  );
}

/**
 * Sub-pages whose content is an MDX service file (Project Solutions).
 * Everything shown comes from that file in the page's language; only the
 * section labels come from messages. Returns null if the file is missing.
 */
export async function MdxServiceDetail({ page, locale }: { page: MdxServicePage; locale: string }) {
  const doc = await getService(page.mdxSlug, locale);
  if (!doc) return null;
  const fm = doc.frontmatter;
  const [ts, tt, tc, tSol, tl] = await Promise.all([
    getTranslations("services"),
    getTranslations("home.tracks.items"),
    getTranslations("home.cases"),
    getTranslations("solutions.tracks"),
    getTranslations("serviceDetail.labels"),
  ]);
  const self = await trackService(page.track, page.index);
  const sections = splitSections(doc.body);
  const [first, ...rest] = sections;

  // Proof: the first related case's summary and figures.
  const caseDoc = fm.relatedCases?.[0] ? await getCase(fm.relatedCases[0], locale) : null;

  // Related: the track's other sub-pages, described by their own card copy.
  const related = await Promise.all(
    mdxServicePages
      .filter((p) => p.track === page.track && p !== page)
      .map(async (p): Promise<Related> => {
        const s = await trackService(p.track, p.index);
        const other = await getService(p.mdxSlug, locale);
        return {
          href: mdxServiceHref(p),
          image: p.image ?? other?.frontmatter.heroImage ?? fm.heroImage,
          area: tt(`${p.track}.title`),
          title: s.title,
          text: s.copy,
        };
      }),
  );

  return (
    <ServiceDetailView
      data={{
        image: page.image ?? fm.heroImage,
        image2: page.image2,
        kicker: self.title,
        area: tt(`${page.track}.title`),
        areaHref: trackHref(page.track),
        headline: fm.title,
        sub: fm.lede,
        cta: tt(`${page.track}.cta`),
        introTitle: first?.heading ?? fm.title,
        intro: first?.paragraphs ?? [fm.lede],
        getTitle: ts("whatYouGet"),
        get: (fm.outcomes ?? []).map((text) => ({ text })),
        whyTitle: ts("whatCovers", { title: fm.title }),
        why: (fm.capabilities ?? []).map((c) => ({ title: c.title, text: c.description })),
        how: (fm.process ?? []).map((s) => s.title),
        extra: rest.map((s, i) => ({
          kicker: self.title,
          title: s.heading,
          paragraphs: s.paragraphs,
          // The page's external link goes under its last text section.
          link: page.externalLink && i === rest.length - 1 ? { href: page.externalLink, label: tl("visitOptipeople") } : undefined,
        })),
        proof: caseDoc?.frontmatter.excerpt ?? self.copy,
        stats: (caseDoc?.frontmatter.metrics ?? []).slice(0, 3),
        proofLink: caseDoc
          ? { href: `/cases/${caseDoc.frontmatter.slug}`, label: `${tc("read")} →` }
          : { href: "/cases", label: tc("all") },
        related,
        closing: (tSol.raw(`${page.track}.statement`) as { title: string }).title,
      }}
    />
  );
}
