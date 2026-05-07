import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function HeroSplit() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-navy-950)]">
      <Image
        src="/images/hero-workshop.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[var(--color-navy-950)]/95 via-[var(--color-navy-950)]/70 to-[var(--color-navy-950)]/30"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-950)]/80 via-transparent to-[var(--color-navy-950)]/40"
      />

      <Container>
        <div className="relative flex min-h-[78vh] flex-col justify-center pt-28 pb-24 lg:min-h-[88vh] lg:pt-40 lg:pb-36">
          <div className="max-w-3xl">
            <Eyebrow className="text-[var(--color-tan-300)]">
              Nicholaisen · Your efficiency partner
            </Eyebrow>
            <h1 className="mt-6 text-display-1 text-balance text-[var(--color-cream-50)]">
              Optimizing wood production from strategy to shop floor.
            </h1>
            <p className="mt-8 max-w-xl text-lede text-pretty text-[var(--color-beige-200)]">
              Sales, engineering, and consulting for innovative machine solutions in the wood,
              plastics, and aluminum industries. Together, we turn your data into intelligent
              optimizations and profitable investments.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <LinkButton href="/services" size="lg" withArrow>
                Explore solutions
              </LinkButton>
              <LinkButton
                href="/contact"
                variant="secondary"
                size="lg"
                className="border-[var(--color-cream-50)]/30 bg-transparent text-[var(--color-cream-50)] hover:bg-[var(--color-cream-50)]/10"
              >
                Get in touch
              </LinkButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
