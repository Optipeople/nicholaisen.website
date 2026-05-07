import { mdxAdapter } from "../src/content/adapters/mdx";

const services = await mdxAdapter.listServices();
const cases = await mdxAdapter.listCases();
const insights = await mdxAdapter.listInsights();
const industries = await mdxAdapter.listIndustries();

console.log("services:", services.length);
for (const s of services) {
  console.log("  -", s.frontmatter.slug, "| parent:", s.frontmatter.parent ?? "(category)");
}
console.log("cases:", cases.length, cases.map((c) => c.frontmatter.slug).join(", "));
console.log("insights:", insights.length, insights.map((i) => i.frontmatter.slug).join(", "));
console.log("industries:", industries.length, industries.map((i) => i.frontmatter.slug).join(", "));
