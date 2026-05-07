import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { industries } from "@/lib/nav";

const industryImages: Record<string, string> = {
  "/industries/doors-windows": "/images/industries/doors-windows.jpg",
  "/industries/panel-furniture": "/images/industries/panel-furniture.jpg",
  "/industries/solid-wood": "/images/industries/solid-wood.jpg",
};

export function IndustryStrip() {
  return (
    <Section tone="cream" size="md">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>By industry</Eyebrow>
          <h2 className="mt-4 text-display-3 text-balance">Built for how wood is actually made.</h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {industries.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="group relative block aspect-[4/5] overflow-hidden rounded-xl bg-[var(--color-paper-dark)]"
            >
              <Image
                src={industryImages[i.href] ?? "/images/industries/panel-furniture.jpg"}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-950)]/85 via-[var(--color-navy-950)]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-eyebrow text-[var(--color-tan-300)]">Industry</p>
                    <h3 className="mt-2 text-2xl font-semibold text-[var(--color-cream-50)]">
                      {i.title}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--color-cream-50)]/80">
                      {i.description}
                    </p>
                  </div>
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-cream-50)] text-[var(--color-navy-900)] transition-transform group-hover:rotate-12">
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
