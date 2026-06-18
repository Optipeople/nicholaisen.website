import type {
  CaseFrontmatter,
  IndustryFrontmatter,
  InsightFrontmatter,
  ServiceFrontmatter,
} from "./schema";

export type ContentBody = string;

export type ServiceDoc = {
  frontmatter: ServiceFrontmatter;
  body: ContentBody;
  readingTime: number;
};

export type CaseDoc = {
  frontmatter: CaseFrontmatter;
  body: ContentBody;
  readingTime: number;
};

export type InsightDoc = {
  frontmatter: InsightFrontmatter;
  body: ContentBody;
  readingTime: number;
};

export type IndustryDoc = {
  frontmatter: IndustryFrontmatter;
  body: ContentBody;
  readingTime: number;
};

export type ContentSource = {
  listServices(locale?: string): Promise<ServiceDoc[]>;
  getService(slug: string, locale?: string): Promise<ServiceDoc | null>;
  getServicesByCategory(category: string, locale?: string): Promise<ServiceDoc[]>;

  listIndustries(locale?: string): Promise<IndustryDoc[]>;
  getIndustry(slug: string, locale?: string): Promise<IndustryDoc | null>;

  listCases(locale?: string): Promise<CaseDoc[]>;
  getCase(slug: string, locale?: string): Promise<CaseDoc | null>;

  listInsights(locale?: string): Promise<InsightDoc[]>;
  getInsight(slug: string, locale?: string): Promise<InsightDoc | null>;
};
