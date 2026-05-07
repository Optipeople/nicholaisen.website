import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  lede?: string;
  image?: string;
  imageAlt?: string;
  align?: "split" | "wide";
  children?: React.ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  imageAlt = "",
  align = "split",
  children,
}: PageHeroProps) {
  if (align === "wide") {
    return (
      <section className="bg-[var(--color-cream-50)] pt-12 pb-16 lg:pt-20 lg:pb-24">
        <Container>
          <div className="max-w-3xl">
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h1 className="mt-5 text-display-1 text-balance">{title}</h1>
            {lede ? <p className="mt-6 text-lede max-w-2xl">{lede}</p> : null}
            {children ? <div className="mt-8">{children}</div> : null}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-[var(--color-cream-50)] pt-10 pb-16 lg:pt-16 lg:pb-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <div>
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h1 className="mt-5 text-display-1 text-balance">{title}</h1>
            {lede ? <p className="mt-6 text-lede max-w-xl">{lede}</p> : null}
            {children ? <div className="mt-8">{children}</div> : null}
          </div>
          {image ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--color-paper-dark)] shadow-[var(--shadow-lift)]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
