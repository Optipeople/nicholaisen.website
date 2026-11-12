import { getTranslations } from "next-intl/server";
import { PhotoHero } from "@/components/ui/PhotoHero";
import { HeroIconLinks } from "@/components/ui/HeroIconLinks";
import { SplitFeature, FeatureText } from "@/components/ui/SplitFeature";
import { CardLink } from "@/components/ui/CardLink";
import { Kicker } from "@/components/ui/Kicker";
import { LinkButton } from "@/components/ui/Button";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { ChartLineIcon, PackageIcon, PlayCircleIcon } from "@/components/ui/icons";
import { trackHref } from "@/lib/tracks";
import { serviceHref, servicePageByKey, type ServicePage } from "@/lib/services";

type Pair = { title: string; text: string };

const h2Small = "m-0 text-[clamp(30px,3.4vw,48px)] leading-[1.1] font-medium tracking-[-0.02em]";

/** Service sub-page (design v3 "SERVICE"), shared by every service that has one. */
export async function ServiceDetail({ page }: { page: ServicePage }) {
  const [t, ts, tt] = await Promise.all([
    getTranslations("serviceDetail"),
    getTranslations("solutions.tracks"),
    getTranslations("home.tracks.items"),
  ]);
  const p = (key: string) => t(`pages.${page.key}.${key}`);
  const raw = <T,>(key: string) => t.raw(`pages.${page.key}.${key}`) as T;
  const serviceTitle = (track: string, index: number) =>
    (ts.raw(`${track}.services`) as { title: string; copy: string }[])[index]!;

  const title = serviceTitle(page.track, page.index).title;
  const area = tt(`${page.track}.title`);
  const why = raw<Pair[]>("why");
  const how = raw<string[]>("how");
  const stats = raw<{ value: string; label: string }[]>("stats");

  const related = page.related.map((r) => {
    if ("page" in r) {
      const target = servicePageByKey(r.page);
      return {
        href: serviceHref(target),
        image: target.image,
        area: tt(`${target.track}.title`),
        title: serviceTitle(target.track, target.index).title,
        text: t(`pages.${target.key}.teaser`),
      };
    }
    const s = serviceTitle(r.track, r.index);
    return { href: trackHref(r.track), image: "/images/v3/cnc-technician.jpg", area: tt(`${r.track}.title`), title: s.title, text: s.copy };
  });

  return (
    <main>
      <PhotoHero
        image={page.image}
        alt={title}
        back={{ href: trackHref(page.track), label: area }}
        kicker={title}
        title={p("headline")}
        lede={p("sub")}
        titleMaxWidth="18ch"
        ledeMaxWidth="58ch"
      >
        <HeroIconLinks
          label={t("labels.jumpLabel")}
          maxWidth="720px"
          items={[
            { href: "#what-you-get", label: t("labels.whatYouGet"), Icon: PackageIcon },
            { href: "#how-it-works", label: t("labels.howItWorks"), Icon: PlayCircleIcon },
            { href: "#proof", label: t("labels.theProof"), Icon: ChartLineIcon },
          ]}
        />
      </PhotoHero>

      <SplitFeature
        image={page.image}
        alt={title}
        kicker={area}
        title={p("introTitle")}
        actions={
          <>
            <LinkButton href="/contact" variant="solid" size="feature">
              {p("cta")}
            </LinkButton>
            <LinkButton href="#how-it-works" variant="outline" size="feature" className="py-3">
              {t("labels.seeHow")}
            </LinkButton>
          </>
        }
      >
        {raw<string[]>("intro").map((para) => (
          <FeatureText key={para}>{para}</FeatureText>
        ))}
      </SplitFeature>

      <SplitFeature
        id="what-you-get"
        image={page.image2}
        alt={title}
        imageFirst
        kicker={t("labels.whatYouGet")}
        title={p("getTitle")}
      >
        {raw<Pair[]>("get").map((g) => (
          <FeatureText key={g.title}>
            <strong className="font-semibold">{g.title}.</strong> {g.text}
          </FeatureText>
        ))}
      </SplitFeature>

      <section className="site-container section-top">
        <h2 className={`${h2Small} mb-10`}>{t("labels.why")}</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-10 gap-y-8">
          {why.map((w, i) => (
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
        <h2 className={`${h2Small} mb-14`}>{t("labels.howItWorks")}</h2>
        <div className="no-scrollbar overflow-x-auto">
          <div className="relative grid min-w-[560px] grid-cols-4 gap-4">
            <div aria-hidden className="absolute top-7 right-[12.5%] left-[12.5%] h-px bg-[var(--color-accent-300)]" />
            {how.map((step, i) => (
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

      <section
        id="proof"
        className="site-container section-top grid scroll-mt-6 grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-x-[clamp(32px,6vw,96px)] gap-y-12"
      >
        <div className="flex flex-col items-start gap-5">
          <Kicker line>{t("labels.customerCase")}</Kicker>
          <h2 className="text-display-2 m-0 text-balance">{t("labels.proofTitle")}</h2>
          <FeatureText>{p("proof")}</FeatureText>
          <Link
            href="/cases"
            className="mt-2 border-b-[1.5px] border-[var(--color-accent)] pb-0.5 text-[16px] font-medium text-[var(--color-accent)]"
          >
            {t("labels.seeAllCases")}
          </Link>
        </div>
        <div className="flex flex-col border-t border-[var(--color-divider)]">
          {stats.map((s) => (
            <div key={s.label} className="grid grid-cols-2 items-center gap-6 border-b border-[var(--color-divider)] py-7">
              <span className="text-[clamp(40px,4vw,56px)] leading-none font-extralight tracking-[-0.04em] text-[var(--color-accent)] tabular-nums">
                {s.value}
              </span>
              <span className="text-[16px] leading-[1.45] text-[var(--color-accent-500)]">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="site-container section-top">
        <h2 className={`${h2Small} mb-8`}>{t("labels.related")}</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-7">
          {related.map((r) => (
            <CardLink
              key={r.title}
              href={r.href}
              image={r.image}
              alt={r.title}
              label={r.area}
              title={r.title}
              text={r.text}
              cta={t("labels.learnMore")}
            />
          ))}
        </div>
      </section>

      <SplitFeature
        image="/images/v3/complete-factory.png"
        alt={t("labels.teamAlt")}
        objectPosition="60% 40%"
        imageFirst
        kicker={t("labels.getInTouch")}
        title={p("closing")}
        gap="card"
        tightActions
        className="pb-28"
        actions={
          <LinkButton href="/contact" variant="solid" size="feature">
            {p("cta")} →
          </LinkButton>
        }
      />
    </main>
  );
}
