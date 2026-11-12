import { DoorIcon, LayersIcon, LogIcon } from "@/components/ui/icons";

/** Industry pages in display order, with their switcher icon. Content lives in content/industries. */
export const industryPages = [
  { slug: "solid-wood", Icon: LogIcon },
  { slug: "panel-furniture", Icon: LayersIcon },
  { slug: "doors-windows", Icon: DoorIcon },
] as const;

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
