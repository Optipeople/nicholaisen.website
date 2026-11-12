import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

/** Case order used across the site (design v3), with the key for each case's short title. */
export const caseOrder = [
  { slug: "hardwood-drying-technology", key: "hardwood" },
  { slug: "kitchen-producer-investment-decision", key: "kitchen" },
  { slug: "million-unit-production-facility", key: "million" },
  { slug: "turnkey-factory-establishment", key: "greenfield" },
] as const;

export const sortCases = <T extends { frontmatter: { slug: string } }>(docs: T[]) =>
  caseOrder.flatMap(({ slug }) => docs.filter((d) => d.frontmatter.slug === slug));

/** "21 Nov 2025" in the page's language. */
export function formatCaseDate(iso: string, locale: string) {
  // Guard: unknown segments (e.g. /favicon.ico) can reach a page as a "locale".
  const tag = locale !== "en" && hasLocale(routing.locales, locale) ? locale : "en-GB";
  return new Date(iso).toLocaleDateString(tag, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

export type CaseExtras = {
  /** Case body with the components below removed. */
  body: string;
  figures: { label: string; value: string }[];
  quote?: { text: string; by?: string };
  callout?: { title?: string; text: string };
};

/**
 * The design shows a case's figures, quote and key insight in their own
 * sections, so pull <MetricRow>, <PullQuote> and <Callout> out of the MDX body.
 */
export function splitCaseBody(source: string): CaseExtras {
  let body = source;
  const extras: CaseExtras = { body: "", figures: [] };

  const metric = body.match(/<MetricRow\s+metrics=\{(\[[\s\S]*?\])\}\s*\/>/);
  if (metric?.[1]) {
    try {
      extras.figures = JSON.parse(metric[1]);
    } catch {
      /* leave figures empty if the array isn't plain JSON */
    }
    body = body.replace(metric[0], "");
  }

  const quote = body.match(/<PullQuote(?:\s+attribution="([^"]*)")?\s*>([\s\S]*?)<\/PullQuote>/);
  if (quote?.[2]) {
    extras.quote = { text: quote[2].trim(), by: quote[1] };
    body = body.replace(quote[0], "");
  }

  const callout = body.match(/<Callout([^>]*)>([\s\S]*?)<\/Callout>/);
  if (callout?.[2]) {
    extras.callout = { title: callout[1]?.match(/title="([^"]*)"/)?.[1], text: callout[2].trim() };
    body = body.replace(callout[0], "");
  }

  extras.body = body;
  return extras;
}
