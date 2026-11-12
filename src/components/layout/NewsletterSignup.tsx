"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Newsletter sign-up at the top of the footer: an e-mail field and a button.
 * Posts to /api/contact, which e-mails the address to us.
 */
export function NewsletterSignup() {
  const t = useTranslations("footer.newsletter");
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newsletter: true, email: String(data.get("email") ?? "").trim(), website: String(data.get("website") ?? "") }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-center gap-x-12 gap-y-6 border-b border-white/15 pb-12">
      <div className="flex flex-col gap-2">
        <span className="text-[13px] font-semibold tracking-[0.08em] text-[var(--color-accent-400)] uppercase">{t("title")}</span>
        <p className="m-0 text-[18px] leading-[1.5] text-white">{t("text")}</p>
      </div>

      {status === "sent" ? (
        <p role="status" className="m-0 text-[16px] text-white">
          {t("sent")}
        </p>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-3">
            <label className="sr-only" htmlFor="newsletter-email">
              {t("emailLabel")}
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="name@company.com"
              className="min-w-0 flex-[1_1_220px] rounded-[4px] border border-white/30 bg-transparent px-4 py-3 text-[16px] text-white outline-none placeholder:text-white/50 focus:border-white"
            />
            {/* Honeypot: hidden from people, filled in by bots. */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
            <button
              type="submit"
              disabled={status === "sending"}
              className="cursor-pointer rounded-[4px] bg-white px-6 py-3 text-[16px] font-medium text-[var(--color-accent)] hover:bg-[var(--color-accent-100)] disabled:opacity-60"
            >
              {t("button")}
            </button>
          </div>
          {status === "error" ? (
            <p role="alert" className="m-0 text-[14px] text-[var(--color-spot)]">
              {t("error")}
            </p>
          ) : null}
        </form>
      )}
    </div>
  );
}
