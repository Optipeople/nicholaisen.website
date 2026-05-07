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
            Placeholder. The final notice will list every cookie we set, its purpose, and the
            duration. Categories will follow GDPR best practice (necessary, analytics,
            marketing).
          </p>
        </div>
      </Container>
    </Section>
  );
}
