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

export const listServices = adapter.listServices;
export const getService = adapter.getService;
export const getServicesByCategory = adapter.getServicesByCategory;

export const listIndustries = adapter.listIndustries;
export const getIndustry = adapter.getIndustry;

export const listCases = adapter.listCases;
export const getCase = adapter.getCase;

export const listInsights = adapter.listInsights;
export const getInsight = adapter.getInsight;
