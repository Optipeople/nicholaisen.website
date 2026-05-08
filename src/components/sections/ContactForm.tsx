"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClasses =
  "w-full rounded-md border border-[var(--color-ink-300)]/50 bg-[var(--color-cream-50)] px-4 py-3 text-[0.95rem] placeholder:text-[var(--color-ink-300)] focus:border-[var(--color-navy-900)] focus:outline-none focus:ring-2 focus:ring-[var(--color-navy-900)]/15";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
        <p className="text-eyebrow">Thank you</p>
        <h3 className="mt-3 text-2xl font-semibold text-[var(--color-ink-900)]">
          We’ll be in touch within one business day.
        </h3>
        <p className="mt-3 text-[0.95rem] text-[var(--color-ink-500)]">
          For anything urgent, you can reach us directly at{" "}
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
          Don’t fill this out: <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" type="text" required />
        <Field label="Company" name="company" type="text" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" name="email" type="email" required />
        <Field label="Role" name="role" type="text" />
      </div>
      <div>
        <label className="text-eyebrow" htmlFor="interest">
          I’m interested in
        </label>
        <select id="interest" name="interest" className={cn(fieldClasses, "mt-2")} defaultValue="">
          <option value="" disabled>
            Choose a topic
          </option>
          <option value="ligna-2026">Ligna 2026 — pre-book a meeting</option>
          <option value="business-development">Business Development</option>
          <option value="production-optimization">Production Optimization</option>
          <option value="project-solutions">Project Solutions</option>
          <option value="digital-performance">Digital Performance · Opti</option>
          <option value="partnership">Partnership</option>
          <option value="other">Something else</option>
        </select>
      </div>
      <div>
        <label className="text-eyebrow" htmlFor="message">
          What are you trying to make better?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={cn(fieldClasses, "mt-2 resize-y")}
          placeholder="A few sentences is plenty."
        />
      </div>

      {status === "error" ? (
        <p className="text-sm text-red-700">{errorMessage}</p>
      ) : null}

      <div>
        <Button type="submit" size="lg" disabled={status === "submitting"} withArrow>
          {status === "submitting" ? "Sending…" : "Send message"}
        </Button>
        <p className="mt-3 text-xs text-[var(--color-ink-500)]">
          We reply within one business day.
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
}: {
  label: string;
  name: string;
  type: "text" | "email";
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-eyebrow" htmlFor={name}>
        {label}
        {required ? "" : <span className="ml-1 normal-case text-[var(--color-ink-300)]">(optional)</span>}
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
