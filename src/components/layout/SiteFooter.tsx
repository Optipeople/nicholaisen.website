import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { site } from "@/lib/site";
import { tracks } from "@/lib/tracks";
import { FooterCta } from "@/components/layout/FooterCta";
import { NewsletterSignup } from "@/components/layout/NewsletterSignup";
import { FooterShell } from "@/components/layout/FooterShell";

const group = [
  { title: "Nicholaisen A/S", href: "/about/group#denmark" },
  { title: "Nicholaisen Sweden AB", href: "/about/group#sweden" },
  { title: "Nicholaisen Baltic OÜ", href: "/about/group#baltics" },
];

const heading = "mb-2 text-[13px] font-semibold tracking-[0.08em] text-[var(--color-accent-400)] uppercase";
const columnLink = "text-white/80 hover:text-white group-data-[light]:text-[var(--color-text)] group-data-[light]:hover:text-[var(--color-accent-500)]";

/** Round outline badge for a social icon. */
const social =
  "flex size-10 items-center justify-center rounded-full border border-white/30 text-white group-data-[light]:border-[var(--color-accent-300)] group-data-[light]:text-[var(--color-accent)]";

/**
 * Footer: newsletter sign-up, then on desktop the four link columns (brand and
 * contact, solutions, group, company); on phones a compact version (logo,
 * contact details and four key links). Copyright and social icons below.
 */
export async function SiteFooter({ locale }: { locale: string }) {
  const [tf, tm, tc, tt, tn] = await Promise.all([
    getTranslations({ locale, namespace: "footer" }),
    getTranslations({ locale, namespace: "nav.menu" }),
    getTranslations({ locale, namespace: "contact.info" }),
    getTranslations({ locale, namespace: "home.tracks.items" }),
    getTranslations({ locale, namespace: "nav.companyMenu" }),
  ]);
  const solutions = tracks.map((tr) => ({ title: tt(`${tr.key}.title`), href: tr.href }));
  const company = [
    { title: tf("company.about"), href: "/about" },
    { title: tn("team"), href: "/about/team" },
    { title: tn("group"), href: "/about/group" },
    { title: tm("cases"), href: "/cases" },
    { title: tf("company.contact"), href: "/contact" },
    { title: tf("legal.privacy"), href: "/legal/privacy" },
  ];
  const logo = (
    <Link href="/" aria-label="Nicholaisen — Home" className="block">
      <Image src="/brand/logo-white.png" alt="Nicholaisen" width={140} height={48} className="block h-12 w-auto group-data-[light]:hidden" />
      <Image src="/brand/logo-navy.png" alt="Nicholaisen" width={472} height={190} className="hidden h-12 w-auto group-data-[light]:block" />
    </Link>
  );
  const links = [
    { title: tf("company.about"), href: "/about" },
    { title: tm("cases"), href: "/cases" },
    { title: tf("company.contact"), href: "/contact" },
    { title: tf("legal.privacy"), href: "/legal/privacy" },
  ];

  return (
    <>
      <FooterCta />

      <FooterShell>
        <div className="site-container pt-[72px] pb-8">
          <NewsletterSignup />

          {/* Desktop: the four link columns */}
          <div className="mt-14 hidden grid-cols-4 gap-8 text-[15px] leading-[2] md:grid">
            <div>
              <div className="mb-3">{logo}</div>
              <div className="text-[14px] leading-[1.7] text-[var(--color-accent-300)] group-data-[light]:text-[var(--color-accent-500)]">
                {site.address.street}
                <br />
                {site.address.postal} {site.address.city}, {tc("country")}
                <br />
                <a href={`mailto:${site.email}`} className="text-inherit hover:text-white group-data-[light]:hover:text-[var(--color-text)]">
                  {site.email}
                </a>
                <br />
                <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="text-inherit hover:text-white group-data-[light]:hover:text-[var(--color-text)]">
                  {site.phone}
                </a>
              </div>
            </div>
            <div className="flex flex-col">
              <span className={heading}>{tf("sections.solutions")}</span>
              {solutions.map((l) => (
                <Link key={l.href} href={l.href} className={columnLink}>
                  {l.title}
                </Link>
              ))}
            </div>
            <div className="flex flex-col">
              <span className={heading}>{tf("sections.group")}</span>
              {group.map((l) => (
                <Link key={l.title} href={l.href} className={columnLink}>
                  {l.title}
                </Link>
              ))}
            </div>
            <div className="flex flex-col">
              <span className={heading}>{tf("sections.company")}</span>
              {company.map((l) => (
                <Link key={l.href} href={l.href} className={columnLink}>
                  {l.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Phones: logo and contact details, key links */}
          <div className="mt-12 flex flex-wrap items-end justify-between gap-x-12 gap-y-8 md:hidden">
            <div className="flex flex-col gap-3">
              {logo}
              <p className="m-0 text-[14px] leading-[1.7] text-[var(--color-accent-300)] group-data-[light]:text-[var(--color-accent-500)]">
                {site.address.street}, {site.address.postal} {site.address.city}, {tc("country")}
                <br />
                <a href={`mailto:${site.email}`} className="text-inherit hover:text-white group-data-[light]:hover:text-[var(--color-text)]">
                  {site.email}
                </a>
                {" · "}
                <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="text-inherit hover:text-white group-data-[light]:hover:text-[var(--color-text)]">
                  {site.phone}
                </a>
              </p>
            </div>

            <nav aria-label={tf("sections.company")} className="flex flex-wrap gap-x-7 gap-y-2 text-[15px]">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className={columnLink}>
                  {l.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t md:mt-14 border-white/15 pt-5 text-[14px] text-[var(--color-accent-300)] group-data-[light]:text-[var(--color-accent-500)]">
            <span>
              © {new Date().getFullYear()} Nicholaisen A/S · CVR {site.cvr}
            </span>
            <div className="flex items-center gap-2.5">
              <a href="https://www.linkedin.com/company/nicholaisen" aria-label="LinkedIn" rel="noopener noreferrer" target="_blank" className={social}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              {/* Instagram and Facebook: not linked yet. */}
              <span role="img" aria-label="Instagram" className={social}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </span>
              <span role="img" aria-label="Facebook" className={social}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </FooterShell>
    </>
  );
}
