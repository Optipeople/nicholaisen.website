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

async function loadServices(): Promise<ServiceDoc[]> {
  const dir = path.join(CONTENT_ROOT, "services");
  const files = await listMdxFiles(dir);
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

async function loadCases(): Promise<CaseDoc[]> {
  const dir = path.join(CONTENT_ROOT, "cases");
  const files = await listMdxFiles(dir);
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

async function loadInsights(): Promise<InsightDoc[]> {
  const dir = path.join(CONTENT_ROOT, "insights");
  const files = await listMdxFiles(dir);
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

async function loadIndustries(): Promise<IndustryDoc[]> {
  const dir = path.join(CONTENT_ROOT, "industries");
  const files = await listMdxFiles(dir);
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
  async listServices() {
    return loadServices();
  },
  async getService(slug: string) {
    const all = await loadServices();
    return all.find((d) => d.frontmatter.slug === slug) ?? null;
  },
  async getServicesByCategory(category: string) {
    const all = await loadServices();
    return all.filter((d) => d.frontmatter.parent === category);
  },

  async listIndustries() {
    return loadIndustries();
  },
  async getIndustry(slug: string) {
    const all = await loadIndustries();
    return all.find((d) => d.frontmatter.slug === slug) ?? null;
  },

  async listCases() {
    return loadCases();
  },
  async getCase(slug: string) {
    const all = await loadCases();
    return all.find((d) => d.frontmatter.slug === slug) ?? null;
  },

  async listInsights() {
    return loadInsights();
  },
  async getInsight(slug: string) {
    const all = await loadInsights();
    return all.find((d) => d.frontmatter.slug === slug) ?? null;
  },
};
