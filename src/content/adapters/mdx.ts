import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  caseFrontmatter,
  industryFrontmatter,
  insightFrontmatter,
  serviceFrontmatter,
} from "@/content/schema";
import type {
  CaseDoc,
  ContentSource,
  IndustryDoc,
  InsightDoc,
  ServiceDoc,
} from "@/content/types";

const CONTENT_ROOT = path.join(process.cwd(), "content");

const WORDS_PER_MIN = 220;

function readingTimeFor(body: string) {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / WORDS_PER_MIN));
}

async function readMdx(filePath: string) {
  const raw = await fs.readFile(filePath, "utf8");
  return matter(raw);
}

async function listMdxFiles(dir: string): Promise<string[]> {
  const out: string[] = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await listMdxFiles(full)));
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      out.push(full);
    }
  }
  return out;
}

/** Returns locale-specific dir if it exists, otherwise falls back to English root dir. */
function contentDir(type: string, locale = "en"): string {
  if (locale === "en") return path.join(CONTENT_ROOT, type);
  const localePath = path.join(CONTENT_ROOT, locale, type);
  return localePath;
}

/** Merges locale-specific files with English fallback (locale wins on same slug). */
async function mergedMdxFiles(type: string, locale: string): Promise<string[]> {
  const enRoot = path.join(CONTENT_ROOT, type);
  const enFiles = await listMdxFiles(enRoot);
  if (locale === "en") return enFiles;
  const localeRoot = path.join(CONTENT_ROOT, locale, type);
  const localeFiles = await listMdxFiles(localeRoot);
  if (localeFiles.length === 0) return enFiles;
  // Use relative path as key so e.g. business-development.mdx and
  // partnership/business-development.mdx don't clobber each other.
  const bySlug = new Map<string, string>();
  for (const f of enFiles) bySlug.set(path.relative(enRoot, f), f);
  for (const f of localeFiles) bySlug.set(path.relative(localeRoot, f), f);
  return Array.from(bySlug.values());
}

async function loadServices(locale = "en"): Promise<ServiceDoc[]> {
  const files = await mergedMdxFiles("services", locale);
  const docs = await Promise.all(
    files.map(async (file) => {
      const { data, content } = await readMdx(file);
      const parsed = serviceFrontmatter.safeParse(data);
      if (!parsed.success) {
        throw new Error(`Invalid service frontmatter in ${file}: ${parsed.error.message}`);
      }
      return {
        frontmatter: parsed.data,
        body: content,
        readingTime: readingTimeFor(content),
      } satisfies ServiceDoc;
    }),
  );
  return docs.sort((a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99));
}

async function loadCases(locale = "en"): Promise<CaseDoc[]> {
  const files = await mergedMdxFiles("cases", locale);
  const docs = await Promise.all(
    files.map(async (file) => {
      const { data, content } = await readMdx(file);
      const parsed = caseFrontmatter.safeParse(data);
      if (!parsed.success) {
        throw new Error(`Invalid case frontmatter in ${file}: ${parsed.error.message}`);
      }
      return {
        frontmatter: parsed.data,
        body: content,
        readingTime: readingTimeFor(content),
      } satisfies CaseDoc;
    }),
  );
  return docs.sort(
    (a, b) =>
      Date.parse(b.frontmatter.publishedAt) - Date.parse(a.frontmatter.publishedAt),
  );
}

async function loadInsights(locale = "en"): Promise<InsightDoc[]> {
  const files = await mergedMdxFiles("insights", locale);
  const docs = await Promise.all(
    files.map(async (file) => {
      const { data, content } = await readMdx(file);
      const parsed = insightFrontmatter.safeParse(data);
      if (!parsed.success) {
        throw new Error(`Invalid insight frontmatter in ${file}: ${parsed.error.message}`);
      }
      return {
        frontmatter: parsed.data,
        body: content,
        readingTime: readingTimeFor(content),
      } satisfies InsightDoc;
    }),
  );
  return docs.sort(
    (a, b) =>
      Date.parse(b.frontmatter.publishedAt) - Date.parse(a.frontmatter.publishedAt),
  );
}

async function loadIndustries(locale = "en"): Promise<IndustryDoc[]> {
  const files = await mergedMdxFiles("industries", locale);
  const docs = await Promise.all(
    files.map(async (file) => {
      const { data, content } = await readMdx(file);
      const parsed = industryFrontmatter.safeParse(data);
      if (!parsed.success) {
        throw new Error(`Invalid industry frontmatter in ${file}: ${parsed.error.message}`);
      }
      return {
        frontmatter: parsed.data,
        body: content,
        readingTime: readingTimeFor(content),
      } satisfies IndustryDoc;
    }),
  );
  return docs;
}

export const mdxAdapter: ContentSource = {
  async listServices(locale?: string) { return loadServices(locale); },
  async getService(slug: string, locale?: string) {
    const all = await loadServices(locale);
    return all.find((d) => d.frontmatter.slug === slug) ?? null;
  },
  async getServicesByCategory(category: string, locale?: string) {
    const all = await loadServices(locale);
    return all.filter((d) => d.frontmatter.parent === category);
  },

  async listIndustries(locale?: string) { return loadIndustries(locale); },
  async getIndustry(slug: string, locale?: string) {
    const all = await loadIndustries(locale);
    return all.find((d) => d.frontmatter.slug === slug) ?? null;
  },

  async listCases(locale?: string) { return loadCases(locale); },
  async getCase(slug: string, locale?: string) {
    const all = await loadCases(locale);
    return all.find((d) => d.frontmatter.slug === slug) ?? null;
  },

  async listInsights(locale?: string) { return loadInsights(locale); },
  async getInsight(slug: string, locale?: string) {
    const all = await loadInsights(locale);
    return all.find((d) => d.frontmatter.slug === slug) ?? null;
  },
};
