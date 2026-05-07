import { ImageResponse } from "next/og";
import { getInsight } from "@/content/loader";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Nicholaisen Insight";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = await getInsight(slug);
  const title = doc?.frontmatter.title ?? "Nicholaisen — Insights";
  const category = doc?.frontmatter.category ?? "insight";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0E2238",
          color: "#F6F1E6",
          padding: "80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#D9C29A",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <span>Nicholaisen · Insights</span>
          <span>{category.replace("-", " · ")}</span>
        </div>
        <div
          style={{
            fontSize: 72,
            lineHeight: 1.05,
            fontWeight: 600,
            letterSpacing: -2,
            maxWidth: 1040,
            display: "flex",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "rgba(246, 241, 230, 0.7)",
            fontSize: 22,
          }}
        >
          <span>nicholaisen.dk</span>
          <span style={{ fontStyle: "italic" }}>Engineered precision, told quietly.</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
