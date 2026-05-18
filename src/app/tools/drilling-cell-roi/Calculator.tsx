"use client";

import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { PRODUCTS, type DrillingProduct } from "./products";

type Step = 0 | 1 | 2 | 3 | 4 | 5;
const INPUT_STEPS = 5; // 0..4 inclusive

type Contact = { name: string; email: string; job: string; company: string };

const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export function DrillingCellRoiCalculator() {
  const [step, setStep] = useState<Step>(0);
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(PRODUCTS.map((p) => p.id)),
  );
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [operators, setOperators] = useState<number>(2);
  const [investment, setInvestment] = useState<number>(110_000);
  const [contact, setContact] = useState<Contact>({
    name: "",
    email: "",
    job: "",
    company: "",
  });
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<Partial<Record<keyof Contact, boolean>>>(
    {},
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const topRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((next: Step) => {
    setStep(next);
    // Smooth scroll to the top of the calculator card
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const toggleProduct = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const setAll = (val: boolean) => {
    if (val) setSelected(new Set(PRODUCTS.map((p) => p.id)));
    else setSelected(new Set());
  };

  const activeProducts: DrillingProduct[] = useMemo(
    () => PRODUCTS.filter((p) => selected.has(p.id)),
    [selected],
  );

  const updateQty = (id: string, value: number) => {
    setQuantities((prev) => ({ ...prev, [id]: value }));
  };

  const firstName = (contact.name.trim().split(/\s+/)[0] || "there").trim();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = contact.name.trim();
    const email = contact.email.trim();
    const job = contact.job.trim();

    const nextErrors: Partial<Record<keyof Contact, boolean>> = {
      name: !name,
      email: !emailOk(email),
      job: !job,
    };
    setErrors(nextErrors);
    const bad = Object.values(nextErrors).some(Boolean);
    if (bad) {
      setFormError("Please complete all fields with a valid email.");
      return;
    }
    setFormError(null);
    setSubmitting(true);

    const payload = {
      contact: { name, email, job, company: contact.company.trim() || undefined },
      products: activeProducts.map((p) => ({
        id: p.id,
        name: p.name,
        size: p.size,
        unitsPerDay: quantities[p.id] ?? 0,
      })),
      operators,
      investment,
      website,
    };

    try {
      const res = await fetch("/api/roi/drilling-cell", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setFormError(data.error ?? "Could not submit right now. Please try again.");
        setSubmitting(false);
        return;
      }
      setSubmitting(false);
      goTo(5);
    } catch {
      setFormError("Network error. Please try again.");
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setAll(true);
    setQuantities({});
    setOperators(2);
    setInvestment(110_000);
    setContact({ name: "", email: "", job: "", company: "" });
    setErrors({});
    setFormError(null);
  };

  const progressPct =
    step === 0 ? 0 : Math.round((Math.min(step, INPUT_STEPS) / INPUT_STEPS) * 100);

  return (
    <div ref={topRef} className="scroll-mt-24 min-h-[600px]">
      {/* Progress + step dots */}
      <div className="mb-8">
        <div className="h-1 w-full rounded-full bg-[var(--color-paper-dark)] overflow-hidden">
          <div
            className="h-full bg-[var(--color-tan-500)] transition-[width] duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="mt-4 flex items-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                i < step
                  ? "bg-[var(--color-navy-500)]"
                  : i === step
                    ? "bg-[var(--color-tan-500)]"
                    : "bg-[var(--color-paper-dark)]",
              )}
            />
          ))}
        </div>
      </div>

      {/* STEP 0 — Intro */}
      {step === 0 && (
        <StepShell
          eyebrow="ROI Calculator"
          title={
            <>
              What can a <em className="not-italic text-[var(--color-tan-500)]">Drilling Cell</em> save you?
            </>
          }
          description="Calculate your potential time savings and payback period in under 2 minutes."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <IntroCard
              phase="Phase 1"
              title="Production Data"
              desc="Select your products, then enter daily unit volumes and operator count."
            />
            <IntroCard
              phase="Phase 2"
              title="Your Results"
              desc="Our team prepares a personalised ROI calculation and emails it to you."
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <PrimaryButton onClick={() => goTo(1)}>
              Get started
              <ArrowRight className="size-4" aria-hidden />
            </PrimaryButton>
          </div>
        </StepShell>
      )}

      {/* STEP 1 — Product selection */}
      {step === 1 && (
        <StepShell
          eyebrow="Step 1 of 4 — Products"
          title={
            <>
              Select the products you <em className="not-italic text-[var(--color-tan-500)]">manufacture</em>
            </>
          }
          description="Pick the panel types your facility produces. Sizes shown are typical reference dimensions."
        >
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <SmallButton onClick={() => setAll(true)}>Select all</SmallButton>
            <SmallButton onClick={() => setAll(false)}>Clear all</SmallButton>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {PRODUCTS.map((p) => {
              const isSel = selected.has(p.id);
              return (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => toggleProduct(p.id)}
                  aria-pressed={isSel}
                  className={cn(
                    "group relative flex flex-col gap-3 rounded-lg border bg-white p-4 text-left transition-colors",
                    isSel
                      ? "border-[var(--color-navy-900)] bg-[var(--color-paper)]"
                      : "border-[var(--color-paper-dark)] hover:border-[var(--color-navy-500)]",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute right-3 top-3 inline-flex size-5 items-center justify-center rounded border-2 transition-colors",
                      isSel
                        ? "border-[var(--color-navy-900)] bg-[var(--color-navy-900)] text-white"
                        : "border-[var(--color-ink-300)] bg-white text-transparent",
                    )}
                  >
                    <Check className="size-3" />
                  </span>
                  <div className="flex h-28 items-center justify-center rounded-md bg-[var(--color-cream-50)] p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt=""
                      className="h-full w-full max-w-[200px] object-contain"
                    />
                  </div>
                  <div className="pr-8">
                    <div className="text-sm font-semibold tracking-wide text-[var(--color-navy-900)]">
                      {p.id}
                    </div>
                    {p.name ? (
                      <div className="text-sm text-[var(--color-ink-500)]">{p.name}</div>
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>

          <NavRow onBack={() => goTo(0)} onNext={() => goTo(2)} nextDisabled={selected.size === 0} />
        </StepShell>
      )}

      {/* STEP 2 — Quantities + operators */}
      {step === 2 && (
        <StepShell
          eyebrow="Step 2 of 4 — Production"
          title={
            <>
              How many units and <em className="not-italic text-[var(--color-tan-500)]">operators?</em>
            </>
          }
          description="Enter daily unit volumes for your selected products and how many operators handle the work today."
        >
          {activeProducts.length === 0 ? (
            <p className="rounded-md border border-[var(--color-paper-dark)] bg-white p-4 text-sm text-[var(--color-ink-500)]">
              No products selected. Go back and select at least one.
            </p>
          ) : (
            <>
              {/* Mobile: card list */}
              <ul className="grid gap-3 sm:hidden">
                {activeProducts.map((p) => (
                  <li
                    key={p.id}
                    className="rounded-lg border border-[var(--color-paper-dark)] bg-white p-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded bg-[var(--color-cream-50)] p-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.image}
                          alt=""
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-[var(--color-navy-900)]">
                          {p.id}
                        </div>
                        <div className="text-xs text-[var(--color-slate-500)]">
                          {p.size}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3 border-t border-[var(--color-paper-dark)] pt-3">
                      <label
                        htmlFor={`qty-${p.id}`}
                        className="text-eyebrow text-[var(--color-slate-500)]"
                      >
                        Units / day
                      </label>
                      <NumberInput
                        id={`qty-${p.id}`}
                        value={quantities[p.id] ?? 0}
                        min={0}
                        onChange={(v) => updateQty(p.id, v)}
                        className="w-28"
                      />
                    </div>
                  </li>
                ))}
              </ul>

              {/* Tablet+: table */}
              <div className="hidden overflow-x-auto sm:block">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-[var(--color-navy-900)] text-left">
                      <th className="w-[110px] pb-3" />
                      <th className="pb-3 text-eyebrow">Product</th>
                      <th className="pb-3 text-eyebrow">Size</th>
                      <th className="pb-3 text-right text-eyebrow">Units / day</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeProducts.map((p) => (
                      <tr key={p.id} className="border-b border-[var(--color-paper-dark)]">
                        <td className="py-3 pr-4">
                          <div className="flex h-14 w-24 items-center justify-center rounded bg-[var(--color-cream-50)] p-1">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={p.image}
                              alt=""
                              className="h-full w-full object-contain"
                            />
                          </div>
                        </td>
                        <td className="py-3 pr-3 text-sm font-semibold text-[var(--color-navy-900)]">
                          {p.id}
                        </td>
                        <td className="py-3 pr-3 text-xs text-[var(--color-slate-500)]">
                          {p.size}
                        </td>
                        <td className="py-3 text-right">
                          <NumberInput
                            value={quantities[p.id] ?? 0}
                            min={0}
                            onChange={(v) => updateQty(p.id, v)}
                            className="w-28"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          <FieldRow
            label="Number of operators today"
            hint="How many employees currently perform the drilling manually?"
            unit="persons"
          >
            <NumberInput
              value={operators}
              min={0}
              max={1000}
              onChange={setOperators}
              className="w-28"
            />
          </FieldRow>

          <NavRow
            onBack={() => goTo(1)}
            onNext={() => goTo(3)}
            nextDisabled={activeProducts.length === 0}
          />
        </StepShell>
      )}

      {/* STEP 3 — Investment */}
      {step === 3 && (
        <StepShell
          eyebrow="Step 3 of 4 — Investment"
          title={
            <>
              What is the <em className="not-italic text-[var(--color-tan-500)]">capital investment?</em>
            </>
          }
          description="Enter the expected investment for a Drilling Cell solution. This is used to calculate the payback period."
        >
          <FieldRow
            label="Capital investment"
            hint="Typical investment for a complete Drilling Cell installation"
            unit="EUR"
          >
            <NumberInput
              value={investment}
              min={0}
              onChange={setInvestment}
              className="w-36"
            />
          </FieldRow>

          <NavRow onBack={() => goTo(2)} onNext={() => goTo(4)} />
        </StepShell>
      )}

      {/* STEP 4 — Contact */}
      {step === 4 && (
        <StepShell
          eyebrow="Step 4 of 4 — Your Details"
          title={
            <>
              Where should we send your <em className="not-italic text-[var(--color-tan-500)]">results?</em>
            </>
          }
          description="Almost done. Enter your details and our team will calculate your personalised ROI and send it to your inbox."
        >
          <form onSubmit={handleSubmit} noValidate className="grid gap-4">
            <TextField
              id="contactName"
              label="Full name"
              required
              autoComplete="name"
              placeholder="Jane Doe"
              value={contact.name}
              onChange={(v) => setContact((c) => ({ ...c, name: v }))}
              invalid={!!errors.name}
            />
            <TextField
              id="contactEmail"
              label="Work email"
              required
              type="email"
              autoComplete="email"
              placeholder="jane@company.com"
              value={contact.email}
              onChange={(v) => setContact((c) => ({ ...c, email: v }))}
              invalid={!!errors.email}
            />
            <TextField
              id="contactJob"
              label="Job title"
              required
              autoComplete="organization-title"
              placeholder="Production Manager"
              value={contact.job}
              onChange={(v) => setContact((c) => ({ ...c, job: v }))}
              invalid={!!errors.job}
            />
            <TextField
              id="contactCompany"
              label="Company"
              autoComplete="organization"
              placeholder="Optional"
              value={contact.company}
              onChange={(v) => setContact((c) => ({ ...c, company: v }))}
            />

            {/* Honeypot — hidden from real users */}
            <div className="hidden" aria-hidden>
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            {formError ? (
              <p className="text-sm text-[#b3261e]" role="alert">
                {formError}
              </p>
            ) : null}

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <SecondaryButton type="button" onClick={() => goTo(3)}>
                <ArrowLeft className="size-4" aria-hidden /> Back
              </SecondaryButton>
              <PrimaryButton type="submit" disabled={submitting}>
                {submitting ? "Sending…" : "Submit"}
                {!submitting && <ArrowRight className="size-4" aria-hidden />}
              </PrimaryButton>
            </div>
          </form>
        </StepShell>
      )}

      {/* STEP 5 — Thanks */}
      {step === 5 && (
        <StepShell
          eyebrow="Submission Received"
          title={
            <>
              Thank you, <em className="not-italic text-[var(--color-tan-500)]">{firstName}!</em>
            </>
          }
          description={
            <>
              We&apos;ve received your details. Our team will prepare your personalised ROI
              calculation based on your production data and send it to{" "}
              <strong className="text-[var(--color-navy-900)]">{contact.email || "your email"}</strong>{" "}
              shortly.
            </>
          }
        >
          <div className="mb-8 rounded-md border border-[var(--color-paper-dark)] border-l-4 border-l-[var(--color-navy-900)] bg-white p-5 text-sm leading-relaxed text-[var(--color-ink-500)]">
            <strong className="text-[var(--color-navy-900)]">What happens next?</strong>
            <br />A Nicholaisen specialist will review your submission and reach out within 1–2
            business days with a tailored breakdown of your potential savings, payback period, and
            recommended Drilling Cell configuration.
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <PrimaryButton
              onClick={() => {
                resetForm();
                goTo(0);
              }}
            >
              Submit another
            </PrimaryButton>
          </div>
        </StepShell>
      )}
    </div>
  );
}

/* -------- helper components -------- */

function StepShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="animate-[fadeUp_.35s_ease_forwards]">
      <p className="text-eyebrow text-[var(--color-tan-500)]">{eyebrow}</p>
      <h2 className="mt-3 text-display-3 text-balance text-[var(--color-navy-900)]">{title}</h2>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--color-ink-500)]">
        {description}
      </p>
      <div className="mt-8">{children}</div>
    </div>
  );
}

function IntroCard({ phase, title, desc }: { phase: string; title: string; desc: string }) {
  return (
    <div className="rounded-lg border border-[var(--color-paper-dark)] bg-white p-5">
      <p className="text-eyebrow text-[var(--color-tan-500)]">{phase}</p>
      <p className="mt-2 font-semibold text-[var(--color-navy-900)]">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-[var(--color-ink-500)]">{desc}</p>
    </div>
  );
}

function FieldRow({
  label,
  hint,
  unit,
  children,
}: {
  label: string;
  hint?: string;
  unit?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[var(--color-paper-dark)] bg-white p-5 focus-within:border-[var(--color-navy-900)]">
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold text-[var(--color-navy-900)]">{label}</div>
        {hint ? <div className="mt-0.5 text-xs text-[var(--color-slate-500)]">{hint}</div> : null}
      </div>
      <div className="flex items-center gap-2">
        {children}
        {unit ? (
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-slate-500)]">
            {unit}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  required,
  type = "text",
  autoComplete,
  placeholder,
  invalid,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  invalid?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-[var(--color-navy-900)]">
        {label}
        {required ? <span className="ml-1 text-[var(--color-tan-500)]">*</span> : null}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={invalid || undefined}
        className={cn(
          "w-full rounded-md border bg-white px-3.5 py-2.5 text-[0.95rem] outline-none transition-colors",
          "focus:border-[var(--color-navy-900)] focus:ring-2 focus:ring-[var(--color-navy-900)]/15",
          invalid
            ? "border-[#b3261e]"
            : "border-[var(--color-paper-dark)]",
        )}
      />
    </div>
  );
}

function NumberInput({
  id,
  value,
  onChange,
  min,
  max,
  className,
}: {
  id?: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  className?: string;
}) {
  return (
    <input
      id={id}
      type="number"
      inputMode="numeric"
      value={Number.isFinite(value) ? value : 0}
      min={min}
      max={max}
      onChange={(e) => {
        const n = parseFloat(e.target.value);
        onChange(Number.isFinite(n) ? n : 0);
      }}
      className={cn(
        "rounded-md border border-[var(--color-paper-dark)] bg-white px-3 py-2 text-right text-[0.95rem] font-medium text-[var(--color-ink-900)] outline-none transition-colors",
        "focus:border-[var(--color-navy-900)] focus:ring-2 focus:ring-[var(--color-navy-900)]/15",
        className,
      )}
    />
  );
}

function PrimaryButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[var(--color-navy-900)] px-5 text-[0.95rem] font-medium text-[var(--color-cream-50)] transition-colors",
        "hover:bg-[var(--color-navy-700)] disabled:opacity-50 disabled:pointer-events-none",
        props.className,
      )}
    >
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[var(--color-navy-900)]/20 bg-transparent px-5 text-[0.95rem] font-medium text-[var(--color-navy-900)] transition-colors",
        "hover:border-[var(--color-navy-900)]/60 disabled:opacity-50 disabled:pointer-events-none",
        props.className,
      )}
    >
      {children}
    </button>
  );
}

function SmallButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        "inline-flex items-center rounded border border-[var(--color-paper-dark)] bg-transparent px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-slate-500)] transition-colors",
        "hover:border-[var(--color-navy-900)] hover:text-[var(--color-navy-900)]",
        props.className,
      )}
    >
      {children}
    </button>
  );
}

function NavRow({
  onBack,
  onNext,
  nextDisabled,
}: {
  onBack: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
}) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <SecondaryButton onClick={onBack}>
        <ArrowLeft className="size-4" aria-hidden /> Back
      </SecondaryButton>
      <PrimaryButton onClick={onNext} disabled={nextDisabled}>
        Next <ArrowRight className="size-4" aria-hidden />
      </PrimaryButton>
    </div>
  );
}
