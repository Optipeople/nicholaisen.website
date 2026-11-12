import { getTranslations } from "next-intl/server";
import { SplitFeature, FeatureText } from "@/components/ui/SplitFeature";
import { LinkButton } from "@/components/ui/Button";
import { industryHref } from "@/lib/industries";

/**
 * Closing call-to-action on the industry pages, in the service pages' style:
 * photo, "Get in touch", a heading and a button to the contact form with the
 * industry filled in.
 */
export async function IndustryCta({ image, title, industry }: { image: string; title: string; industry?: string }) {
  const [tl, ts, tf] = await Promise.all([
    getTranslations("serviceDetail.labels"),
    getTranslations("solutions"),
    getTranslations("footerCta"),
  ]);

  return (
    <SplitFeature
      image={image}
      alt={title}
      imageFirst
      kicker={tl("getInTouch")}
      title={title}
      gap="card"
      tightActions
      className="pb-28"
      actions={
        <LinkButton href={industry ? industryHref(undefined, industry) : "/contact"} variant="solid" size="feature">
          {ts("contactUs")} →
        </LinkButton>
      }
    >
      <FeatureText muted>{tf("body")}</FeatureText>
    </SplitFeature>
  );
}
