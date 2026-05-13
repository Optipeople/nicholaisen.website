import Link from "next/link";
import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { MegaNav } from "@/components/layout/MegaNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { Container } from "@/components/layout/Container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-ink-300)]/30 bg-[var(--color-cream-50)]/85 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-cream-50)]/70">
      <Container>
        <div className="flex h-20 items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3" aria-label="Nicholaisen — Home">
            <Image
              src="/brand/nicholaisen-logo.png"
              alt=""
              width={36}
              height={36}
              priority
              className="size-9"
            />
            <span className="text-lg font-semibold tracking-tight text-[var(--color-navy-900)]">
              Nicholaisen
            </span>
          </Link>

          <div className="hidden lg:flex flex-1 justify-center">
            <MegaNav />
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <LinkButton href="/contact" variant="primary" size="sm" withArrow>
              Schedule a call
            </LinkButton>
          </div>

          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
