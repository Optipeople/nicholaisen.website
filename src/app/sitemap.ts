import type { MetadataRoute } from "next";
import {
  listCases,
  listIndustries,
  listInsights,
  listServices,
} from "@/content/loader";
import { site } from "@/lib/site";
import { tracks } from "@/lib/tracks";
import { serviceHref, servicePages } from "@/lib/services";

const STATIC_PATHS = [
  "/",
  "/services",
  "/industries",
  "/cases",
  "/insights",
  "/about",
  "/about/team",
  "/about/group",
  "/contact",
  "/legal/privacy",
  "/legal/cookies",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p === "/" ? 1 : 0.7,
  }));

  const [services, industries, cases, insights] = await Promise.all([
    listServices(),
    listIndustries(),
    listCases(),
    listInsights(),
  ]);

  // Track landing pages plus every MDX service (Machines has no MDX file).
  const serviceSlugs = [
    ...new Set([
      ...tracks.map((t) => t.slug),
      ...servicePages.map((p) => serviceHref(p).replace("/services/", "")),
      ...services.map((s) => s.frontmatter.slug),
    ]),
  ];
  const serviceEntries: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${base}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const industryEntries: MetadataRoute.Sitemap = industries.map((i) => ({
    url: `${base}/industries/${i.frontmatter.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const caseEntries: MetadataRoute.Sitemap = cases.map((c) => ({
    url: `${base}/cases/${c.frontmatter.slug}`,
    lastModified: new Date(c.frontmatter.publishedAt),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const insightEntries: MetadataRoute.Sitemap = insights.map((p) => ({
    url: `${base}/insights/${p.frontmatter.slug}`,
    lastModified: new Date(p.frontmatter.updatedAt ?? p.frontmatter.publishedAt),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...serviceEntries,
    ...industryEntries,
    ...caseEntries,
    ...insightEntries,
  ];
}
