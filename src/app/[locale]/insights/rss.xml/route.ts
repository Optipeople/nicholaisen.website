import { listInsights } from "@/content/loader";
import { site } from "@/lib/site";

function escape(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const insights = await listInsights();
  const items = insights
    .map((doc) => {
      const fm = doc.frontmatter;
      const url = `${site.url}/insights/${fm.slug}`;
      return `
    <item>
      <title>${escape(fm.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(fm.publishedAt).toUTCString()}</pubDate>
      <description>${escape(fm.excerpt)}</description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escape(site.name)} — Insights</title>
    <link>${site.url}/insights</link>
    <description>${escape(site.description)}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
