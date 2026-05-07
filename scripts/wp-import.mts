/**
 * WordPress → MDX importer (stub).
 *
 * Run during launch prep to scaffold MDX files from a live WP crawl. The
 * output still requires a human editorial pass; this script just gets the
 * structure and asset references right.
 *
 * Usage:
 *   npx tsx scripts/wp-import.mts \
 *     --base https://nicholaisen.dk \
 *     --type insights \
 *     --out content/insights
 *
 * What it does (TODO before launch):
 *   1. Fetches WP REST API list endpoints (`/wp-json/wp/v2/posts`,
 *      `/wp-json/wp/v2/pages`).
 *   2. For each post, downloads referenced media to /public/images/migrated/.
 *   3. Strips WP block markup, converts inline HTML to MDX-compatible markup.
 *   4. Writes one MDX file per post with a frontmatter block populated from
 *      WP fields (title, slug, excerpt, date, featured image, taxonomy).
 *   5. Emits a `redirects.suggested.json` mapping old → new URLs to merge
 *      into src/lib/redirects.ts.
 *
 * Implementation deferred — when launch is scheduled, fill in the body
 * below using `node-fetch` + `cheerio` + `turndown` (or `unified` +
 * `rehype-remark`) and run against the live site.
 */

console.log("WP importer stub. See header comment for the implementation plan.");
console.log("This script intentionally does nothing until launch prep.");
