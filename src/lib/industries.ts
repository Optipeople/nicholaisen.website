import { DoorIcon, GridIcon, LayersIcon, LogIcon } from "@/components/ui/icons";

/** Industry pages in display order, with their switcher icon. Content lives in content/industries. */
export const industryPages = [
  { slug: "solid-wood", Icon: LogIcon },
  { slug: "panel-furniture", Icon: LayersIcon },
  { slug: "doors-windows", Icon: DoorIcon },
] as const;

/**
 * The four industries shown on the homepage and the industries overview,
 * with photos; text in messages under `home.industries.items.<key>`.
 * Plastics & aluminium has no page yet (no `href`).
 */
export const industryTiles = [
  { key: "solidWood", href: "/industries/solid-wood", image: "/images/v3/industry-solid-wood.avif", position: "50% 50%", Icon: LogIcon },
  { key: "panelFurniture", href: "/industries/panel-furniture", image: "/images/v3/industry-panel-furniture.avif", position: "50% 50%", Icon: LayersIcon },
  { key: "doorsWindows", href: "/industries/doors-windows", image: "/images/v3/industry-doors-windows.jpg", position: "35% 50%", Icon: DoorIcon },
  { key: "plasticsAluminium", href: undefined, image: "/images/v3/industry-plastics-aluminium.avif", position: "50% 50%", Icon: GridIcon },
] as const;

/** Where an industry links: its page, or (no page yet) the contact form with the industry filled in. */
export const industryHref = (href: string | undefined, title: string) =>
  href ?? `/contact?topic=other&choice=${encodeURIComponent(title)}`;

export type IndustrySlug = (typeof industryPages)[number]["slug"];

export const sortIndustries = <T extends { frontmatter: { slug: string } }>(docs: T[]) =>
  industryPages.flatMap(({ slug }) => docs.filter((d) => d.frontmatter.slug === slug));

/**
 * Split an MDX body made of "## Heading" sections and plain paragraphs into
 * sections, so each can be laid out on its own.
 */
export function splitSections(body: string) {
  return body
    .split(/^## /m)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const [heading = "", ...rest] = chunk.split("\n");
      const paragraphs = rest
        .join("\n")
        .split(/\n\s*\n/)
        .map((p) => p.replace(/\s*\n\s*/g, " ").trim())
        .filter(Boolean);
      return { heading: heading.trim(), paragraphs };
    })
    .filter((s) => s.heading && s.paragraphs.length);
}
