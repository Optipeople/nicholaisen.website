import type { Metadata } from "next";
import type React from "react";
import { Container } from "@/components/layout/Container";
import { DrillingCellRoiCalculator } from "./Calculator";

export const metadata: Metadata = {
  title: "6-Side Machining Cell ROI Calculator",
  description:
    "Calculate the potential time savings and payback period of a 6-Side Machining Cell — drilling, milling and grooving in one machine.",
  alternates: { canonical: "/tools/drilling-cell-roi" },
  openGraph: {
    title: "6-Side Machining Cell ROI Calculator — Nicholaisen",
    description:
      "Estimate your annual savings and payback period for a 6-Side Machining Cell in under two minutes.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

// NichoMachines presentation theme — swap back to original after presentation
const NM_THEME: React.CSSProperties = {
  ["--color-navy-950" as string]: "#da5f06",
  ["--color-navy-900" as string]: "#da5f06",
  ["--color-navy-700" as string]: "#b84f00",
  ["--color-navy-500" as string]: "#e8e8e8",
  ["--color-slate-500" as string]: "#666666",
  ["--color-tan-500" as string]: "#da5f06",
  ["--color-tan-300" as string]: "#f08040",
  ["--color-beige-200" as string]: "#e8e8e8",
  ["--color-cream-50" as string]: "#f5f5f5",
  ["--color-paper" as string]: "#ffffff",
  ["--color-paper-dark" as string]: "#e8e8e8",
  ["--color-ink-900" as string]: "#0a0a0a",
  ["--color-ink-700" as string]: "#2a2a2a",
  ["--color-ink-500" as string]: "#555555",
  ["--color-ink-300" as string]: "#999999",
  backgroundColor: "#f5f5f5",
  color: "#0a0a0a",
};

export default function DrillingCellRoiPage() {
  return (
    <section style={NM_THEME} className="pt-10 pb-20 lg:pt-16 lg:pb-28">
      <Container size="default">
        {/* NichoMachines logo — presentation only */}
        <div className="mb-10 flex items-center justify-center">
          <img
            src="/nichomachines-black.png"
            alt="NichoMachines"
            className="h-16 w-auto"
          />
        </div>
        <DrillingCellRoiCalculator />
        <p className="mt-16 text-center text-xs tracking-wide" style={{ color: "#555" }}>
          NichoMachines · 6-Side Machining Cell ROI Estimator · For indicative purposes only
        </p>
      </Container>
    </section>
  );
}
