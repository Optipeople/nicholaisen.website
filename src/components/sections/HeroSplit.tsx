import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { trackHref } from "@/lib/tracks";
import { LinkButton } from "@/components/ui/Button";

/** Homepage hero: full-bleed photo, navy gradient, heading bottom-left. */
export async function HeroSplit() {
  const t = await getTranslations("home.hero");
  return (
    <section className="relative flex min-h-[clamp(660px,90vh,880px)] items-end bg-[var(--color-accent)] text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/v3/hero-production.png"
          alt={t("imageAlt")}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, color-mix(in srgb, #003050 80%, transparent) 0%, color-mix(in srgb, #003050 40%, transparent) 60%, color-mix(in srgb, #003050 10%, transparent) 100%)",
        }}
      />

      <div className="site-container relative pt-[clamp(180px,20vw,220px)] pb-[170px]">
        <span className="text-kicker mb-5 flex items-center gap-2.5">
          <span aria-hidden className="block h-[2px] w-7 bg-[var(--color-spot)]" />
          {t("eyebrow")}
        </span>
        <h1 className="text-display-1 m-0 max-w-[16ch]">{t("title")}</h1>
        <p className="text-lede mt-6 mb-0 max-w-[46ch]">{t("lede")}</p>
        <div className="mt-9 flex flex-wrap gap-4">
          {/* The solutions landing (first track), as "Solutions" in the header. */}
          <LinkButton href={trackHref("business")} variant="light" size="hero">
            {t("primary")}
          </LinkButton>
          <LinkButton href="/contact" variant="outline-light" size="hero">
            {t("secondary")}
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
