import { getTranslations } from "next-intl/server";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { ImageTile, ImageTileGrid } from "@/components/ui/ImageTile";
import { trackHref } from "@/lib/tracks";

const tiles = [
  { key: "standalone", href: trackHref("machines"), image: "/images/v3/machine-nkb2812.jpg", position: "55% 50%" },
  { key: "machineRobot", href: trackHref("projects"), image: "/images/v3/robot-sorting.png", position: "50% 50%" },
  // Factory layout & sourcing live under Business Development until their own pages exist.
  { key: "factory", href: trackHref("business"), image: "/images/v3/complete-factory.png", position: "65% 50%" },
] as const;

/** "One machine or a whole factory" — three scale tiles and a payback figure. */
export async function ScaleTiles() {
  const t = await getTranslations("home.scale");
  return (
    <section className="site-container section-top">
      <h2 className="text-display-2 m-0 mb-[18px]">{t("title")}</h2>
      <p className="text-intro mt-0 mb-14 max-w-[62ch]">{t("intro")}</p>

      <ImageTileGrid>
        {tiles.map((tile) => (
          <ImageTile
            key={tile.key}
            href={tile.href}
            image={tile.image}
            alt={t(`tiles.${tile.key}.alt`)}
            title={t(`tiles.${tile.key}.title`)}
            objectPosition={tile.position}
            arrow
          />
        ))}
      </ImageTileGrid>

      <StatRow
        figure={t("stat.figure")}
        title={t("stat.title")}
        body={t("stat.body")}
        linkLabel={t("stat.link")}
        linkHref={trackHref("business")}
      />
    </section>
  );
}

/** Big light figure beside a short explanation, above a hairline. */
function StatRow({
  figure,
  title,
  body,
  linkLabel,
  linkHref,
}: {
  figure: string;
  title: string;
  body: string;
  linkLabel: string;
  linkHref: string;
}) {
  return (
    <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-[var(--color-divider)] pt-8">
      <span className="text-stat text-[var(--color-accent)]">{figure}</span>
      <div className="flex flex-[1_1_320px] flex-col gap-1 border-l border-[var(--color-divider)] pl-10">
        <span className="text-[19px] leading-[1.55] font-medium">{title}</span>
        <span className="text-body text-[var(--color-accent-500)]">{body}</span>
        <Link
          href={linkHref}
          className="mt-1.5 self-start border-b-[1.5px] border-[var(--color-accent)] pb-0.5 text-[15px] font-medium text-[var(--color-accent)] hover:border-[var(--color-accent-500)] hover:text-[var(--color-accent-500)]"
        >
          {linkLabel}
        </Link>
      </div>
    </div>
  );
}
