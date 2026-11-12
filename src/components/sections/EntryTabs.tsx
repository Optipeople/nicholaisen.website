"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { useTranslations } from "next-intl";
import { LinkRow, LinkRowGrid } from "@/components/ui/LinkRow";
import { BriefcaseIcon, CalendarCheckIcon, FactoryIcon } from "@/components/ui/icons";
import { tracks } from "@/lib/tracks";

const materials = ["solidPanel", "doorsWindows", "plasticsAluminium"] as const;
const callTopics = ["investment", "runningCost", "criticalMachine"] as const;

/** "Start here" card overlapping the bottom of the homepage hero. */
export function EntryTabs() {
  const t = useTranslations("home.entry");
  const tt = useTranslations("home.tracks.items");

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

          <Tabs.Content value="call" className="flex flex-col gap-[14px] outline-none">
            <p className="text-eyebrow m-0">{t("whatToLookAt")}</p>
            <LinkRowGrid>
              {callTopics.map((key) => (
                <LinkRow
                  key={key}
                  href="/contact"
                  title={t(`call.${key}.title`)}
                  description={t(`call.${key}.description`)}
                />
              ))}
            </LinkRowGrid>
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </section>
  );
}
