import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy",
  description: "How we handle personal data on nicholaisen.dk.",
  path: "/legal/privacy",
});

export default function PrivacyPage() {
  return (
    <Section tone="cream" size="md">
      <Container size="narrow">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-4 text-display-2 text-balance">Privacy notice</h1>
          <p className="mt-6 text-lede">
            This is a placeholder. The final privacy notice will be reviewed by counsel before
            launch and reflect what we actually collect, how long we keep it, and your rights
            under GDPR.
          </p>
          <h2 className="mt-12 text-xl font-semibold">What we collect</h2>
          <p className="mt-3 text-[1rem] leading-relaxed">
            When you use the contact form we collect your name, company, role, email, area of
            interest, and message. We use this only to reply to your enquiry.
          </p>
          <h2 className="mt-10 text-xl font-semibold">Cookies</h2>
          <p className="mt-3 text-[1rem] leading-relaxed">
            We use a minimal set of cookies for analytics and to remember your preferences. You
            can opt out at any time via the cookie banner.
          </p>
          <h2 className="mt-10 text-xl font-semibold">Contact</h2>
          <p className="mt-3 text-[1rem] leading-relaxed">
            Questions about your data? Write to{" "}
            <a className="underline" href="mailto:info@nicholaisen.dk">
              info@nicholaisen.dk
            </a>
            .
          </p>
        </div>
      </Container>
    </Section>
  );
}
