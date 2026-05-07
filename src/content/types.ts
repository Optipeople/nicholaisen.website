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
  listServices(): Promise<ServiceDoc[]>;
  getService(slug: string): Promise<ServiceDoc | null>;
  getServicesByCategory(category: string): Promise<ServiceDoc[]>;

  listIndustries(): Promise<IndustryDoc[]>;
  getIndustry(slug: string): Promise<IndustryDoc | null>;

  listCases(): Promise<CaseDoc[]>;
  getCase(slug: string): Promise<CaseDoc | null>;

  listInsights(): Promise<InsightDoc[]>;
  getInsight(slug: string): Promise<InsightDoc | null>;
};
