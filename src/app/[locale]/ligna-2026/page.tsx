import type { Metadata } from "next";
import Image from "next/image";
import { Calendar, MapPin, Building2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkButton } from "@/components/ui/Button";
import { CtaBand } from "@/components/sections/CtaBand";
import { FeatureSlider } from "./FeatureSlider";
import { buildMetadata } from "@/lib/seo";

// TODO: Replace placeholders below once details are confirmed.
const event = {
  dates: "TBC — May 2026",
  hall: "Hall TBC",
  booth: "Booth TBC",
  city: "Hannover, Germany",
  directionsUrl: "https://www.ligna.de/", // TODO: replace with floor-plan or stand link
};

export const metadata: Metadata = buildMetadata({
  title: "Ligna 2026",
  description:
    "Meet Nicholaisen at Ligna 2026 in Hannover. Pre-book a meeting with our team about wood production optimization, Opti digital performance, and custom machine solutions.",
  path: "/ligna-2026",
});

export default function Ligna2026Page() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[var(--color-navy-950)]">
        <Image
          src="/images/top-view-boards-mdf-material-1-scaled-1.jpg"
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
                Ligna 2026 · {event.city}
              </Eyebrow>
              <h1 className="mt-6 text-display-1 text-balance text-[var(--color-cream-50)]">
                Meet us in Hannover.
              </h1>
              <p className="mt-8 max-w-xl text-lede text-pretty text-[var(--color-beige-200)]">
                We’ll be at Ligna 2026 to talk through the part of your line
                that frustrates you — and what we’d look at first. Pre-book a
                30-minute slot so we’re ready when you arrive.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <LinkButton href="/contact" size="lg" withArrow>
                  Pre-book a meeting
                </LinkButton>
                <LinkButton
                  href="#where"
                  variant="secondary"
                  size="lg"
                  className="border-[var(--color-cream-50)]/30 bg-transparent text-[var(--color-cream-50)] hover:bg-[var(--color-cream-50)]/10"
                >
                  Where to find us
                </LinkButton>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section id="where" tone="paper" size="md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <div>
              <Eyebrow>Where to find us</Eyebrow>
              <h2 className="mt-4 text-display-3 text-balance">
                Ligna 2026 · {event.city}
              </h2>
              <p className="mt-6 text-[1rem] leading-relaxed text-[var(--color-ink-700)] max-w-md">
                The world’s leading trade fair for woodworking and wood processing. Drop by
                the stand or pre-book a slot to skip the queue.
              </p>
            </div>

            <dl className="grid gap-6 sm:grid-cols-2">
              <DetailRow
                icon={<Calendar className="size-4" aria-hidden />}
                label="Dates"
                value={event.dates}
              />
              <DetailRow
                icon={<Building2 className="size-4" aria-hidden />}
                label="Hall"
                value={event.hall}
              />
              <DetailRow
                icon={<MapPin className="size-4" aria-hidden />}
                label="Booth"
                value={event.booth}
              />
              <DetailRow
                icon={<MapPin className="size-4" aria-hidden />}
                label="City"
                value={event.city}
              />
            </dl>
          </div>
        </Container>
      </Section>

      <FeatureSlider />

      <CtaBand
        eyebrow="Pre-book your slot"
        title="Skip the queue. Bring the question."
        body="Tell us what you’re running and where you’re stuck. We’ll set aside 30 minutes at the stand and come prepared."
        primary={{ label: "Pre-book a meeting", href: "/contact" }}
        secondary={{ label: "Plan your visit", href: event.directionsUrl }}
      />
    </>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="mt-1 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-paper)] text-[var(--color-navy-900)]">
        {icon}
      </span>
      <div>
        <dt className="text-eyebrow">{label}</dt>
        <dd className="mt-1 text-[1rem] leading-snug text-[var(--color-ink-900)]">
          {value}
        </dd>
      </div>
    </div>
  );
}
