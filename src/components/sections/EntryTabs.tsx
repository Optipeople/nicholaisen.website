"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, Factory, CalendarCheck } from "lucide-react";
import { services, industries } from "@/lib/nav";
import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Tab = "services" | "industries" | "schedule";

export function EntryTabs() {
  const [tab, setTab] = useState<Tab>("services");

  return (
    <Container>
      <div className="-mt-16 lg:-mt-20 relative z-10">
        <div className="rounded-2xl border border-[var(--color-ink-300)]/30 bg-[var(--color-paper)] shadow-[var(--shadow-lift)]">
          <div className="flex flex-wrap gap-1 border-b border-[var(--color-ink-300)]/30 px-3 pt-3">
            <TabButton active={tab === "services"} onClick={() => setTab("services")}>
              <Briefcase className="size-4" /> Services
            </TabButton>
            <TabButton active={tab === "industries"} onClick={() => setTab("industries")}>
              <Factory className="size-4" /> Industries
            </TabButton>
            <TabButton active={tab === "schedule"} onClick={() => setTab("schedule")}>
              <CalendarCheck className="size-4" /> Schedule a call
            </TabButton>
          </div>
          <div className="p-6 sm:p-8">
            {tab === "services" ? <ServicesPanel /> : null}
            {tab === "industries" ? <IndustriesPanel /> : null}
            {tab === "schedule" ? <SchedulePanel /> : null}
          </div>
        </div>
      </div>
    </Container>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-t-md px-4 py-3 text-sm font-medium transition-colors",
        active
          ? "bg-[var(--color-paper)] text-[var(--color-navy-900)]"
          : "text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)]",
      )}
      role="tab"
      aria-selected={active}
    >
      {children}
    </button>
  );
}

function ServicesPanel() {
  return (
    <div>
      <p className="text-eyebrow">Find a service</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group flex items-start justify-between gap-3 rounded-md border border-transparent p-3 hover:border-[var(--color-ink-300)]/40 hover:bg-[var(--color-paper-dark)] transition-colors"
          >
            <div>
              <p className="text-sm font-semibold text-[var(--color-ink-900)] group-hover:text-[var(--color-navy-900)]">
                {s.title}
              </p>
              {s.description ? (
                <p className="mt-0.5 text-xs text-[var(--color-ink-500)]">{s.description}</p>
              ) : null}
            </div>
            <ArrowRight className="mt-0.5 size-4 shrink-0 text-[var(--color-ink-500)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--color-navy-900)]" />
          </Link>
        ))}
      </div>
    </div>
  );
}

function IndustriesPanel() {
  return (
    <div>
      <p className="text-eyebrow">Browse by industry</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {industries.map((i) => (
          <Link
            key={i.href}
            href={i.href}
            className="group flex items-start justify-between gap-3 rounded-md border border-transparent p-3 hover:border-[var(--color-ink-300)]/40 hover:bg-[var(--color-paper-dark)] transition-colors"
          >
            <div>
              <p className="text-sm font-semibold text-[var(--color-ink-900)] group-hover:text-[var(--color-navy-900)]">
                {i.title}
              </p>
              <p className="mt-0.5 text-xs text-[var(--color-ink-500)]">{i.description}</p>
            </div>
            <ArrowRight className="mt-0.5 size-4 shrink-0 text-[var(--color-ink-500)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--color-navy-900)]" />
          </Link>
        ))}
      </div>
    </div>
  );
}

function SchedulePanel() {
  return (
    <div className="grid gap-6 sm:grid-cols-[2fr_1fr] sm:items-end">
      <div>
        <p className="text-eyebrow">Talk to an engineer</p>
        <h3 className="mt-2 text-xl font-semibold text-[var(--color-ink-900)]">
          A 30-minute conversation. No deck.
        </h3>
        <p className="mt-2 text-sm text-[var(--color-ink-500)]">
          Tell us what you’re running, where you’re stuck, and what better would look like. We’ll
          come back with what we’d look at first.
        </p>
      </div>
      <LinkButton href="/contact" size="md" withArrow>
        Schedule a call
      </LinkButton>
    </div>
  );
}
