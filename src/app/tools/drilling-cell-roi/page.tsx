import type { Metadata } from "next";
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

export default function DrillingCellRoiPage() {
  return (
    <section className="bg-[var(--color-cream-50)] pt-10 pb-20 lg:pt-16 lg:pb-28">
      <Container size="default">
        <DrillingCellRoiCalculator />
        <p className="mt-16 text-center text-xs tracking-wide text-[var(--color-slate-500)]">
          Nicholaisen · 6-Side Machining Cell ROI Estimator · For indicative purposes only
        </p>
      </Container>
    </section>
  );
}
