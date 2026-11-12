import { getTranslations } from "next-intl/server";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";

const tel = (n: string) => `tel:${n.replace(/\s+/g, "")}`;
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.address.street}, ${site.address.postal} ${site.address.city}, ${site.address.country}`,
)}`;
const link = "text-white underline-offset-4 hover:text-white hover:underline";

/** One way to reach us; the icon links to the same place as the row's main link. */
function InfoRow({
  icon,
  label,
  href,
  external = false,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[32px_minmax(0,1fr)] items-start gap-x-6 gap-y-1">
      <a
        href={href}
        aria-hidden
        tabIndex={-1}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="mt-6 text-white hover:text-[var(--color-accent-300)]"
      >
        {icon}
      </a>
      <div className="flex flex-col gap-2">
        <span className="text-label text-[var(--color-accent-300)]">{label}</span>
        <div className="text-[18px] leading-[1.5] text-white">{children}</div>
      </div>
    </div>
  );
}

/** Contact page left column: heading, intro and how to reach us. */
export async function ContactInfo() {
  const t = await getTranslations("contact");
  return (
    <div className="flex flex-col">
      <span className="text-label mb-7 text-[var(--color-accent-300)]">{t("hero.eyebrow")}</span>
      <h1 className="m-0 text-[clamp(48px,6.4vw,96px)] leading-none font-medium tracking-[-0.04em] text-balance">
        {t("hero.title")}
      </h1>
      <p className="text-lede mt-9 mb-0 max-w-[46ch] text-white">{t("hero.lede")}</p>

      <div className="mt-16 flex flex-col gap-9">
        <InfoRow icon={<PhoneIcon />} label={t("info.callUs")} href={tel(site.phone)}>
          <a href={tel(site.phone)} className={link}>
            {site.phone}
          </a>
          <br />
          <span className="text-[var(--color-accent-300)]">{t("info.serviceLabel")}:</span>{" "}
          <a href={tel(site.phoneService)} className={link}>
            {site.phoneService}
          </a>
        </InfoRow>
        <InfoRow icon={<MailIcon />} label={t("info.emailLabel")} href={`mailto:${site.email}`}>
          <a href={`mailto:${site.email}`} className={link}>
            {site.email}
          </a>
        </InfoRow>
        <InfoRow icon={<MapPinIcon />} label={t("info.visit")} href={mapsUrl} external>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={link}>
            {site.address.street}
            <br />
            {site.address.postal} {site.address.city}, {t("info.country")}
          </a>
        </InfoRow>
      </div>
    </div>
  );
}
