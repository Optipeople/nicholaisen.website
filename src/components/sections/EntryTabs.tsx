"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { useTranslations } from "next-intl";
import { LinkRow, LinkRowGrid } from "@/components/ui/LinkRow";
import { LinkButton } from "@/components/ui/Button";
import { BriefcaseIcon, CalendarCheckIcon, FactoryIcon, MailIcon, PhoneIcon } from "@/components/ui/icons";
import { tracks } from "@/lib/tracks";
import { site } from "@/lib/site";

const materials = ["solidPanel", "doorsWindows", "plasticsAluminium"] as const;
/** Each call topic opens the contact form with its topic selected. */
const callTopics = [
  { key: "investment", topic: "business" },
  { key: "runningCost", topic: "optimization" },
  { key: "criticalMachine", topic: "digital" },
  { key: "other", topic: "other" },
] as const;

const contactHref = (topic: string, choice: string) =>
  `/contact?topic=${topic}&choice=${encodeURIComponent(choice)}`;

/** "Start here" card overlapping the bottom of the homepage hero. */
export function EntryTabs() {
  const t = useTranslations("home.entry");
  const tt = useTranslations("home.tracks.items");
  const ti = useTranslations("contact.info");

  const tabs = [
    { value: "services", label: t("services"), Icon: BriefcaseIcon },
    { value: "industries", label: t("industries"), Icon: FactoryIcon },
    { value: "call", label: t("schedule"), Icon: CalendarCheckIcon },
  ];

  return (
    <section className="site-container relative z-[2] -mt-24">
      <Tabs.Root
        defaultValue="services"
        className="rounded-[12px] border border-[var(--color-tan)] bg-white shadow-[0_10px_32px_color-mix(in_srgb,#003050_14%,transparent)]"
      >
        <Tabs.List
          aria-label={t("tabsLabel")}
          className="flex flex-wrap gap-2 border-b border-[var(--color-accent-200)] px-7"
        >
          {tabs.map(({ value, label, Icon }) => (
            <Tabs.Trigger
              key={value}
              value={value}
              className="-mb-px flex cursor-pointer items-center gap-2.5 border-b-[3px] border-transparent px-3.5 pt-5 pb-[17px] text-[17px] leading-[1.55] font-normal text-[var(--color-accent-500)] data-[state=active]:border-[var(--color-accent)] data-[state=active]:font-medium data-[state=active]:text-[var(--color-text)]"
            >
              <Icon />
              {label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <div className="px-[clamp(20px,4vw,44px)] pt-8 pb-9">
          <Tabs.Content value="services" className="flex flex-col gap-[14px] outline-none">
            <p className="text-eyebrow m-0">{t("findService")}</p>
            <LinkRowGrid>
              {tracks.map((track) => (
                <LinkRow
                  key={track.key}
                  href={track.href}
                  title={tt(`${track.key}.title`)}
                  description={tt(`${track.key}.subtitle`)}
                />
              ))}
            </LinkRowGrid>
          </Tabs.Content>

          <Tabs.Content value="industries" className="flex flex-col gap-[14px] outline-none">
            <p className="text-eyebrow m-0">{t("pickMaterial")}</p>
            <LinkRowGrid>
              {materials.map((key) => (
                <LinkRow
                  key={key}
                  href="#industries"
                  title={t(`materials.${key}.title`)}
                  description={t(`materials.${key}.description`)}
                />
              ))}
            </LinkRowGrid>
          </Tabs.Content>

          <Tabs.Content
            value="call"
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-x-[clamp(32px,4vw,56px)] gap-y-8 outline-none"
          >
            <div className="flex flex-col gap-[14px]">
              <p className="text-eyebrow m-0">{t("whatToLookAt")}</p>
              <div className="flex flex-col">
                {callTopics.map(({ key, topic }) => (
                  <LinkRow
                    key={key}
                    href={contactHref(topic, t(`call.${key}.title`))}
                    title={t(`call.${key}.title`)}
                    description={t(`call.${key}.description`)}
                  />
                ))}
              </div>
            </div>

            {/* Direct line: phone, email and the contact form. */}
            <div className="flex flex-col gap-5 rounded-[8px] bg-[var(--color-accent-100)] p-[clamp(24px,3vw,32px)]">
              <p className="text-eyebrow m-0">{t("talk.kicker")}</p>
              <p className="text-heading-2 m-0 text-balance">{t("talk.title")}</p>
              <div className="flex flex-col gap-3">
                <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="flex items-center gap-3 text-[var(--color-text)] hover:text-[var(--color-accent-500)]">
                  <PhoneIcon />
                  <span className="flex flex-col">
                    <span className="text-meta">{ti("callUs")}</span>
                    <span className="text-[18px] leading-[1.5] font-medium">{site.phone}</span>
                  </span>
                </a>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-[var(--color-text)] hover:text-[var(--color-accent-500)]">
                  <MailIcon />
                  <span className="flex flex-col">
                    <span className="text-meta">{ti("emailLabel")}</span>
                    <span className="text-[18px] leading-[1.5] font-medium">{site.email}</span>
                  </span>
                </a>
              </div>
              <LinkButton href="/contact" variant="solid" size="panel" className="self-start px-5 text-[15px] font-medium">
                {t("schedule")} →
              </LinkButton>
            </div>
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </section>
  );
}
