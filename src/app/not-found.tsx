import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section tone="cream" size="lg">
      <Container size="narrow">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>404</Eyebrow>
          <h1 className="mt-4 text-display-1 text-balance">
            That page isn’t here.
          </h1>
          <p className="mt-6 text-lede">
            It may have moved during our site rebuild. Try one of these instead.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <LinkButton href="/" variant="primary" size="md" withArrow>
              Home
            </LinkButton>
            <LinkButton href="/services" variant="secondary" size="md">
              Services
            </LinkButton>
            <LinkButton href="/contact" variant="secondary" size="md">
              Contact
            </LinkButton>
          </div>
          <div className="mt-12 text-sm">
            <Link
              href="/insights"
              className="inline-flex items-center gap-1.5 text-[var(--color-navy-900)] hover:gap-2 transition-all"
            >
              Read our latest insights <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
