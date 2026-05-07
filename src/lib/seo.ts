import type { Metadata } from "next";
import { site } from "@/lib/site";

type SeoInput = {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  ogImage,
}: SeoInput): Metadata {
  const url = new URL(path, site.url).toString();
  const fullTitle = title ?? `${site.name} — ${site.tagline}`;
  const desc = description ?? site.description;

  return {
    title: title ?? undefined,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description: desc,
      siteName: site.name,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
