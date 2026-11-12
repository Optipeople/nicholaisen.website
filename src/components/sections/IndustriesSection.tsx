import { getTranslations } from "next-intl/server";
import { ImageTile, ImageTileGrid } from "@/components/ui/ImageTile";
import { industryTiles } from "@/lib/industries";

/** "Industries we work in" — four square photo tiles. */
export async function IndustriesSection() {
  const t = await getTranslations("home.industries");
  return (
    <section id="industries" className="site-container section-top scroll-mt-6">
      <h2 className="text-display-2 m-0 mb-12">{t("title")}</h2>
      <ImageTileGrid>
        {industryTiles.map((ind) => (
          <ImageTile
            key={ind.key}
            href={ind.href ?? "/industries"}
            image={ind.image}
            alt={t(`items.${ind.key}.alt`)}
            title={t(`items.${ind.key}.title`)}
            description={t(`items.${ind.key}.description`)}
            objectPosition={ind.position}
          />
        ))}
      </ImageTileGrid>
    </section>
  );
}
