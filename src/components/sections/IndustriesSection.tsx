import { getTranslations } from "next-intl/server";
import { ImageTile, ImageTileGrid } from "@/components/ui/ImageTile";

const industries = [
  { key: "solidWood", href: "/industries/solid-wood", image: "/images/v3/industry-solid-wood.avif", position: "50% 50%" },
  { key: "panelFurniture", href: "/industries/panel-furniture", image: "/images/v3/industry-panel-furniture.avif", position: "50% 50%" },
  { key: "doorsWindows", href: "/industries/doors-windows", image: "/images/v3/industry-doors-windows.jpg", position: "35% 50%" },
  // No plastics & aluminium page yet; link to the industries overview.
  { key: "plasticsAluminium", href: "/industries", image: "/images/v3/industry-plastics-aluminium.avif", position: "50% 50%" },
] as const;

/** "Industries we work in" — four square photo tiles. */
export async function IndustriesSection() {
  const t = await getTranslations("home.industries");
  return (
    <section id="industries" className="site-container section-top scroll-mt-6">
      <h2 className="text-display-2 m-0 mb-12">{t("title")}</h2>
      <ImageTileGrid>
        {industries.map((ind) => (
          <ImageTile
            key={ind.key}
            href={ind.href}
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
