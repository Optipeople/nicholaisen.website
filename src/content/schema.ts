import { z } from "zod";

const seo = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
  })
  .optional();

const serviceCategoryEnum = z.enum([
  "business-development",
  "production-optimization",
  "project-solutions",
  "digital-performance",
  "partnership",
]);

const industryEnum = z.enum(["doors-windows", "panel-furniture", "solid-wood"]);

export const serviceFrontmatter = z.object({
  title: z.string(),
  slug: z.string(),
  category: serviceCategoryEnum,
  parent: z.string().optional(),
  eyebrow: z.string(),
  lede: z.string(),
  heroImage: z.string(),
  outcomes: z.array(z.string()).optional(),
  capabilities: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
      }),
    )
    .optional(),
  process: z
    .array(
      z.object({
        step: z.number(),
        title: z.string(),
        description: z.string(),
      }),
    )
    .optional(),
  relatedCases: z.array(z.string()).optional(),
  order: z.number().optional(),
  seo,
});

export const caseFrontmatter = z.object({
  title: z.string(),
  slug: z.string(),
  client: z.string().optional(),
  industry: industryEnum,
  services: z.array(z.string()).default([]),
  excerpt: z.string(),
  challenge: z.string(),
  approach: z.string(),
  outcome: z.string(),
  metrics: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .default([]),
  heroImage: z.string(),
  publishedAt: z.string(),
  seo,
});

export const insightFrontmatter = z.object({
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  category: z.enum(["industry", "optimization", "opti-platform", "company"]),
  author: z.string(),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  heroImage: z.string(),
  tags: z.array(z.string()).default([]),
  seo,
});

export const industryFrontmatter = z.object({
  title: z.string(),
  slug: industryEnum,
  eyebrow: z.string(),
  lede: z.string(),
  heroImage: z.string(),
  challenges: z.array(z.string()).optional(),
  relevantServices: z.array(z.string()).optional(),
  seo,
});

export type ServiceFrontmatter = z.infer<typeof serviceFrontmatter>;
export type CaseFrontmatter = z.infer<typeof caseFrontmatter>;
export type InsightFrontmatter = z.infer<typeof insightFrontmatter>;
export type IndustryFrontmatter = z.infer<typeof industryFrontmatter>;
export type ServiceCategory = z.infer<typeof serviceCategoryEnum>;
export type Industry = z.infer<typeof industryEnum>;
