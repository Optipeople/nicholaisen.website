import { getTranslations } from "next-intl/server";
import type { Track } from "@/lib/tracks";
import { serviceHref, servicePageFor } from "@/lib/services";
import { TrackHero } from "@/components/solutions/TrackHero";
import { TrackFinder } from "@/components/solutions/TrackFinder";
import { ServiceCarousel } from "@/components/solutions/ServiceCarousel";
import { StatementSection } from "@/components/solutions/StatementSection";
import { MachineryGrid, type MachineryKey } from "@/components/solutions/MachineryGrid";
import { DeliverySteps } from "@/components/solutions/DeliverySteps";
import { RelatedCases } from "@/components/solutions/RelatedCases";
import { OfferTiles, type OfferKey } from "@/components/solutions/OfferTiles";
import { DigitalizedBlock } from "@/components/solutions/DigitalizedBlock";

type Statement = {
  kicker: string;
  title: string;
  body: string;
  note: string;
  figure: string;
  figureTitle: string;
  figureText: string;
};

/**
 * Landing page for one solution track (design v3 "LANDING" template).
 * Shared: hero with track switcher + finder card. The rest varies by track.
 */
export async function TrackLanding({ track, locale }: { track: Track; locale: string }) {
  const t = await getTranslations("solutions");
  const k = track.key;

  const services = t.raw(`tracks.${k}.services`) as { title: string; copy: string }[];
  const statement = k === "optimization" ? null : (t.raw(`tracks.${k}.statement`) as Statement);

  const whatWeDo =
    k === "machines" ? null : (
      <section className="site-container section-top">
        <div className="mx-auto mb-14 max-w-[820px] text-center">
          <h2 className="text-display-2 m-0">{t("whatWeDo")}</h2>
          <p className="text-intro mt-5 mb-0">{t(`tracks.${k}.proof`)}</p>
        </div>
        <ServiceCarousel
          cards={services.map((s, i) => ({
            ...s,
            image: track.services[i]?.image,
            digital: track.services[i]?.digital,
            // Services with a sub-page link to it; the rest fall back to contact, as in the design.
            href: (() => {
              const sub = servicePageFor(track.key, i);
              return sub ? serviceHref(sub) : "/contact";
            })(),
          }))}
          labels={{
            contact: t("contactUs"),
            learnMore: t("learnMore"),
            digitalized: t("digitalizedBadge"),
            prev: t("previous"),
            next: t("next"),
            page: t("page"),
          }}
        />
      </section>
    );

  return (
    <>
      <TrackHero track={track} />
      <TrackFinder track={k} />

      {whatWeDo}

      {k === "machines" ? (
        <>
          <MachineryGrid
            title={t("machinery.title")}
            intro={t("machinery.intro")}
            items={t.raw("machinery.items") as Record<MachineryKey, { title: string; description: string }>}
          />
          <StatementSection {...(t.raw("machinery.payback") as Statement)} />
          <DeliverySteps
            title={t("machinery.delivery.title")}
            steps={t.raw("machinery.delivery.steps") as { title: string; text: string }[]}
          />
        </>
      ) : null}

      {k === "optimization" ? (
        <OfferTiles
          title={t("offers.title")}
          intro={t("offers.intro")}
          items={t.raw("offers.items") as Record<OfferKey, { title: string; description: string; cta: string }>}
        />
      ) : null}

      {k === "digital" ? (
        <DigitalizedBlock
          kicker={t("digitalized.kicker")}
          title={t("digitalized.title")}
          intro={t("digitalized.intro")}
          rows={t.raw("digitalized.rows") as { when: string; lead: string; text: string }[]}
          contactLabel={t("digitalized.contact")}
          aboutLabel={t("digitalized.about")}
          imageAlt={t("digitalized.imageAlt")}
        />
      ) : null}

      {statement ? <StatementSection {...statement} /> : null}

      {k === "machines" ? (
        <RelatedCases locale={locale} slugs={["hardwood-drying-technology", "kitchen-producer-investment-decision"]} />
      ) : null}
    </>
  );
}
