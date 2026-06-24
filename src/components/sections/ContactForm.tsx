"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClasses =
  "w-full rounded-md border border-[var(--color-ink-300)]/50 bg-[var(--color-cream-50)] px-4 py-3 text-[0.95rem] placeholder:text-[var(--color-ink-300)] focus:border-[var(--color-navy-900)] focus:outline-none focus:ring-2 focus:ring-[var(--color-navy-900)]/15";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const t = useTranslations("contact.form");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(json.error ?? "Something went wrong.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-[var(--color-navy-900)]/15 bg-[var(--color-paper)] p-8">
        <p className="text-eyebrow">{t("successLabel")}</p>
        <h3 className="mt-3 text-2xl font-semibold text-[var(--color-ink-900)]">
          {t("successTitle")}
        </h3>
        <p className="mt-3 text-[0.95rem] text-[var(--color-ink-500)]">
          {t("successBody")}{" "}
          <a className="underline" href="tel:+4586924711">
            +45 8692 4711
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      {/* Honeypot — bots fill this; humans don't */}
      <div className="hidden" aria-hidden>
        <label>
          Don't fill this out: <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("name")} name="name" type="text" required />
        <Field label={t("company")} name="company" type="text" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("email")} name="email" type="email" required />
        <Field label={t("role")} name="role" type="text" optionalLabel={t("optional")} />
      </div>
      <div>
        <label className="text-eyebrow" htmlFor="interest">
          {t("interest")}
        </label>
        <select id="interest" name="interest" className={cn(fieldClasses, "mt-2")} defaultValue="">
          <option value="" disabled>
            {t("interestDefault")}
          </option>
          <option value="ligna-2026">{t("interests.ligna")}</option>
          <option value="business-development">{t("interests.businessDevelopment")}</option>
          <option value="production-optimization">{t("interests.productionOptimization")}</option>
          <option value="project-solutions">{t("interests.projectSolutions")}</option>
          <option value="digital-performance">{t("interests.digitalPerformance")}</option>
          <option value="partnership">{t("interests.partnership")}</option>
          <option value="other">{t("interests.other")}</option>
        </select>
      </div>
      <div>
        <label className="text-eyebrow" htmlFor="message">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={cn(fieldClasses, "mt-2 resize-y")}
          placeholder={t("messagePlaceholder")}
        />
      </div>

      {status === "error" ? (
        <p className="text-sm text-red-700">{errorMessage}</p>
      ) : null}

      <div>
        <Button type="submit" size="lg" disabled={status === "submitting"} withArrow>
          {status === "submitting" ? t("submitting") : t("submit")}
        </Button>
        <p className="mt-3 text-xs text-[var(--color-ink-500)]">
          {t("replyTime")}
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  required,
  optionalLabel = "optional",
}: {
  label: string;
  name: string;
  type: "text" | "email";
  required?: boolean;
  optionalLabel?: string;
}) {
  return (
    <div>
      <label className="text-eyebrow" htmlFor={name}>
        {label}
        {required ? "" : <span className="ml-1 normal-case text-[var(--color-ink-300)]">({optionalLabel})</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className={cn(fieldClasses, "mt-2")}
        autoComplete={
          name === "email"
            ? "email"
            : name === "name"
            ? "name"
            : name === "company"
            ? "organization"
            : "off"
        }
      />
    </div>
  );
}
