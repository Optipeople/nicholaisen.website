import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cookies",
  description: "Cookie usage on nicholaisen.dk.",
  path: "/legal/cookies",
});

export default function CookiesPage() {
  return (
    <Section tone="cream" size="md">
      <Container size="narrow">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-4 text-display-2 text-balance">Cookie notice</h1>
          <p className="mt-6 text-lede">
            This page explains what cookies nicholaisen.dk sets, why, and how you can control
            them.
          </p>

          <h2 className="mt-12 text-xl font-semibold">What is a cookie?</h2>
          <p className="mt-3 text-[1rem] leading-relaxed">
            A cookie is a small text file stored on your device when you visit a website. Cookies
            allow the site to remember information about your visit.
          </p>

          <h2 className="mt-10 text-xl font-semibold">Cookies we use</h2>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[var(--color-beige-200)]">
                  <th className="py-3 pr-6 text-left font-semibold text-[var(--color-ink-900)]">Name</th>
                  <th className="py-3 pr-6 text-left font-semibold text-[var(--color-ink-900)]">Purpose</th>
                  <th className="py-3 pr-6 text-left font-semibold text-[var(--color-ink-900)]">Duration</th>
                  <th className="py-3 text-left font-semibold text-[var(--color-ink-900)]">Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-beige-200)] text-[var(--color-ink-700)]">
                <tr>
                  <td className="py-3 pr-6 font-mono text-xs">__vercel_live_token</td>
                  <td className="py-3 pr-6">Vercel infrastructure — enables preview deployments. Not set in production.</td>
                  <td className="py-3 pr-6">Session</td>
                  <td className="py-3">Necessary</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-[1rem] leading-relaxed">
            We use Vercel Analytics for aggregated, anonymised traffic measurement. It does not
            set persistent cookies and does not track individual visitors across sessions or
            sites.
          </p>

          <h2 className="mt-10 text-xl font-semibold">How to control cookies</h2>
          <p className="mt-3 text-[1rem] leading-relaxed">
            You can instruct your browser to refuse all cookies or to indicate when a cookie is
            being sent. If you do not accept cookies, some parts of the site may not function
            correctly. Most browsers allow you to manage cookies via their settings — look for
            "Privacy", "Security", or "Cookies" in your browser's preferences.
          </p>

          <h2 className="mt-10 text-xl font-semibold">Questions</h2>
          <p className="mt-3 text-[1rem] leading-relaxed">
            Questions about cookies or our privacy practices? Write to{" "}
            <a className="underline" href="mailto:info@nicholaisen.dk">info@nicholaisen.dk</a>.
          </p>
        </div>
      </Container>
    </Section>
  );
}
