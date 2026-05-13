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
            Nicholaisen A/S respects your privacy. This notice explains what personal data we
            collect, why, and your rights under the General Data Protection Regulation (GDPR).
          </p>

          <h2 className="mt-12 text-xl font-semibold">Data controller</h2>
          <p className="mt-3 text-[1rem] leading-relaxed">
            Nicholaisen A/S · Sønderskovvej 17 · 8362 Hørning · Denmark · CVR 19454770 ·{" "}
            <a className="underline" href="mailto:info@nicholaisen.dk">info@nicholaisen.dk</a>
          </p>

          <h2 className="mt-10 text-xl font-semibold">What we collect and why</h2>
          <p className="mt-3 text-[1rem] leading-relaxed">
            When you submit the contact form we collect your name, company, role, email address,
            area of interest, and message. We use this information solely to respond to your
            enquiry. The legal basis is our legitimate interest in handling business enquiries
            (GDPR Article 6(1)(f)).
          </p>
          <p className="mt-3 text-[1rem] leading-relaxed">
            We use Vercel Analytics to understand how visitors use the site. This collects
            anonymised, aggregated data (page views, referrer, country) and does not track
            individuals or set persistent cookies. The legal basis is our legitimate interest in
            improving the website (GDPR Article 6(1)(f)).
          </p>

          <h2 className="mt-10 text-xl font-semibold">How long we keep your data</h2>
          <p className="mt-3 text-[1rem] leading-relaxed">
            Contact form submissions are kept for up to 24 months. If an enquiry does not result
            in an ongoing business relationship, we delete it after that period.
          </p>

          <h2 className="mt-10 text-xl font-semibold">Who we share data with</h2>
          <p className="mt-3 text-[1rem] leading-relaxed">
            We use Resend (resend.com) to deliver contact form notifications by email. We do not
            sell, rent, or share your personal data with any other third parties for marketing
            purposes.
          </p>

          <h2 className="mt-10 text-xl font-semibold">Your rights</h2>
          <p className="mt-3 text-[1rem] leading-relaxed">
            Under GDPR you have the right to access, correct, or delete the personal data we
            hold about you, to object to processing, and to data portability. To exercise any of
            these rights, write to{" "}
            <a className="underline" href="mailto:info@nicholaisen.dk">info@nicholaisen.dk</a>.
            You also have the right to lodge a complaint with the Danish Data Protection Agency
            (Datatilsynet, datatilsynet.dk).
          </p>

          <h2 className="mt-10 text-xl font-semibold">Questions</h2>
          <p className="mt-3 text-[1rem] leading-relaxed">
            Any questions about this notice or how we handle your data? Contact us at{" "}
            <a className="underline" href="mailto:info@nicholaisen.dk">info@nicholaisen.dk</a>{" "}
            or +45 8692 4711.
          </p>
        </div>
      </Container>
    </Section>
  );
}
