"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { LinkRow, LinkRowGrid } from "@/components/ui/LinkRow";
import { LinkButton } from "@/components/ui/Button";
import { BriefcaseIcon, CalendarCheckIcon, ChevronDownIcon, FactoryIcon, MailIcon, PhoneIcon } from "@/components/ui/icons";
import { tracks } from "@/lib/tracks";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

const materials = ["solidPanel", "doorsWindows", "plasticsAluminium"] as const;
/** Each call topic opens the contact form with its topic selected. */
const callTopics = [
  { key: "investment", topic: "business" },
  { key: "runningCost", topic: "optimization" },
  { key: "criticalMachine", topic: "digital" },
  { key: "other", topic: "other" },
] as const;

const contactHref = (topic: string, choice: string) => `/contact?topic=${topic}&choice=${encodeURIComponent(choice)}`;

type TabKey = "services" | "industries" | "call";

/**
 * "Start here" card overlapping the bottom of the homepage hero. Services is open
 * at first on wider screens (closed on phones); clicking another tab switches to
 * it, clicking the open tab closes it.
 */
export function EntryTabs() {
  const t = useTranslations("home.entry");
  const tt = useTranslations("home.tracks.items");
  const ti = useTranslations("contact.info");

  const [open, setOpen] = useState<TabKey | null>("services");
  // The last open tab stays rendered while its options slide shut.
  const [shown, setShown] = useState<TabKey>("services");
  // Phones start with the box closed. Animations switch on only after that
  // first adjustment, so the box doesn't visibly fold shut on load.
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(max-width: 639px)").matches) setOpen(null);
    const id = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(id);
  }, []);
  const toggle = (value: TabKey) => {
    setOpen((cur) => (cur === value ? null : value));
    setShown(value);
  };

  // Width to shrink to when closed: the tab row's own width. Measured so the
  // change from full width can animate (CSS can't animate to "fit-content").
  const rowRef = useRef<HTMLDivElement>(null);
  const [fitWidth, setFitWidth] = useState<number | null>(null);
  // Full inner width: the options are laid out at this width even while the box
  // is still widening, so their text doesn't reflow (and jump) during the animation.
  const [fullWidth, setFullWidth] = useState<number | null>(null);
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const measure = () => {
      const style = getComputedStyle(row);
      const buttons = Array.from(row.children) as HTMLElement[];
      const inner = buttons.reduce((w, b) => w + b.offsetWidth, 0) + parseFloat(style.columnGap || "0") * (buttons.length - 1);
      // + side padding and the box's 1px borders.
      setFitWidth(Math.ceil(inner + parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + 2));
      const section = row.parentElement?.parentElement;
      if (section) {
        const ss = getComputedStyle(section);
        // Minus the section's side padding and the box's 1px borders.
        setFullWidth(section.clientWidth - parseFloat(ss.paddingLeft) - parseFloat(ss.paddingRight) - 2);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // Re-measure when a tab opens or closes: the open tab's label is bolder.
  }, [open]);
  const tabs: { value: TabKey; label: string; Icon: typeof BriefcaseIcon }[] = [
    { value: "services", label: t("services"), Icon: BriefcaseIcon },
    { value: "industries", label: t("industries"), Icon: FactoryIcon },
    { value: "call", label: t("schedule"), Icon: CalendarCheckIcon },
  ];

  return (
    <section className="site-container relative z-[2] -mt-24">
      {/* Only as wide as the tabs while closed; full width with the options open. Both animate. */}
      <div
        className="w-full overflow-hidden rounded-[12px] border border-[var(--color-tan)] bg-white shadow-[0_10px_32px_color-mix(in_srgb,#003050_14%,transparent)]"
        style={{
          maxWidth: open || fitWidth === null ? "100%" : `${fitWidth}px`,
          // Opening: widen while the options slide down. Closing: fold the options away, then narrow.
          transition: animate ? `max-width 450ms cubic-bezier(0.4, 0, 0.2, 1) ${open ? "0ms" : "300ms"}` : "none",
        }}
      >
        <div
          ref={rowRef}
          role="group"
          aria-label={t("tabsLabel")}
          className={cn(
            // Phones: three equal columns, icon over label. Wider: one row.
            "grid grid-cols-3 border-b px-2 transition-colors duration-300 sm:flex sm:flex-wrap sm:gap-2 sm:px-7",
            open ? "border-[var(--color-accent-200)]" : "border-transparent",
          )}
        >
          {tabs.map(({ value, label, Icon }) => (
            <button
              key={value}
              type="button"
              aria-expanded={open === value}
              aria-controls={`entry-${value}`}
              data-state={open === value ? "active" : "inactive"}
              onClick={() => toggle(value)}
              className="-mb-px flex min-w-0 cursor-pointer flex-col items-center gap-1.5 border-b-[3px] border-transparent px-1 pt-4 pb-3 text-center text-[14px] leading-[1.3] font-normal text-[var(--color-accent-500)] data-[state=active]:border-[var(--color-accent)] data-[state=active]:font-medium data-[state=active]:text-[var(--color-text)] sm:flex-none sm:flex-row sm:gap-2.5 sm:px-3.5 sm:pt-5 sm:pb-[17px] sm:text-left sm:text-[17px] sm:leading-[1.55]"
            >
              <Icon />
              <span className="inline-flex items-center gap-1 text-balance sm:gap-2.5">
                {label}
                {/* Shows the tab opens downwards; turns over while open. */}
                <span
                  aria-hidden
                  className={cn("flex flex-none text-[var(--color-accent)] transition-transform duration-200", open === value && "rotate-180")}
                >
                  <ChevronDownIcon size={14} strokeWidth={1.75} />
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Options slide open and shut (grid rows 0fr ↔ 1fr). */}
        <div
          inert={!open}
          className={cn("grid", animate && "transition-[grid-template-rows,opacity] duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)]")}
          style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="px-[clamp(20px,4vw,44px)] pt-8 pb-9" style={fullWidth ? { width: fullWidth } : undefined}>
              {shown === "services" ? (
                <div id="entry-services" className="flex flex-col gap-[14px]">
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
                </div>
              ) : null}

              {shown === "industries" ? (
                <div id="entry-industries" className="flex flex-col gap-[14px]">
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
                </div>
              ) : null}

              {shown === "call" ? (
                <div
                  id="entry-call"
                  className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-x-[clamp(32px,4vw,56px)] gap-y-8"
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
                      <a
                        href={`tel:${site.phone.replace(/\s+/g, "")}`}
                        className="flex items-center gap-3 text-[var(--color-text)] hover:text-[var(--color-accent-500)]"
                      >
                        <PhoneIcon />
                        <span className="flex flex-col">
                          <span className="text-meta">{ti("callUs")}</span>
                          <span className="text-[18px] leading-[1.5] font-medium">{site.phone}</span>
                        </span>
                      </a>
                      <a
                        href={`mailto:${site.email}`}
                        className="flex items-center gap-3 text-[var(--color-text)] hover:text-[var(--color-accent-500)]"
                      >
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
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
