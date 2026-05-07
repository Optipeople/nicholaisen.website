import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { footerNav } from "@/lib/nav";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--color-navy-900)] text-[var(--color-cream-50)]">
      <Container>
        <div className="grid gap-12 py-20 lg:grid-cols-[1.4fr_2.6fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Nicholaisen — Home">
              <Image
                src="/brand/nicholaisen-logo-white.png"
                alt=""
                width={36}
                height={36}
                className="size-9"
              />
              <span className="text-lg font-semibold tracking-tight">Nicholaisen</span>
            </Link>
            <p className="mt-6 max-w-sm text-sm text-[var(--color-cream-50)]/70">
              {site.description}
            </p>
            <address className="mt-8 not-italic text-sm leading-relaxed text-[var(--color-cream-50)]/70">
              {site.address.street}
              <br />
              {site.address.postal} {site.address.city}, {site.address.country}
              <br />
              <a
                href={`mailto:${site.email}`}
                className="mt-3 inline-block hover:text-[var(--color-cream-50)]"
              >
                {site.email}
              </a>
              <br />
              <a
                href={`tel:${site.phone.replace(/\s+/g, "")}`}
                className="hover:text-[var(--color-cream-50)]"
              >
                {site.phone}
              </a>
            </address>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footerNav).map(([title, links]) => (
              <div key={title}>
                <p className="text-eyebrow text-[var(--color-tan-300)]">{title}</p>
                <ul className="mt-4 space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--color-cream-50)]/80 hover:text-[var(--color-cream-50)] transition-colors"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col-reverse items-start gap-4 border-t border-[var(--color-cream-50)]/10 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--color-cream-50)]/60">
            © {new Date().getFullYear()} {site.legalName} · CVR {site.cvr}
          </p>
          <p className="text-xs italic text-[var(--color-cream-50)]/60">{site.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
