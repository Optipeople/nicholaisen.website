/**
 * Public content API.
 *
 * All pages MUST go through this module — never import from /content or
 * /adapters directly. This is the seam that lets us swap MDX for a headless
 * CMS (Storyblok, Sanity) later without touching any pages or components.
 */
import { mdxAdapter } from "@/content/adapters/mdx";
import type { ContentSource } from "@/content/types";

const adapter: ContentSource = mdxAdapter;

export const listServices = adapter.listServices.bind(adapter);
export const getService = adapter.getService.bind(adapter);
export const getServicesByCategory = adapter.getServicesByCategory.bind(adapter);

export const listIndustries = adapter.listIndustries.bind(adapter);
export const getIndustry = adapter.getIndustry.bind(adapter);

export const listCases = adapter.listCases.bind(adapter);
export const getCase = adapter.getCase.bind(adapter);

export const listInsights = adapter.listInsights.bind(adapter);
export const getInsight = adapter.getInsight.bind(adapter);
