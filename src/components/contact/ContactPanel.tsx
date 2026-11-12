"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { topicKeys, type TopicKey } from "@/lib/contact";


type Status = "idle" | "sending" | "sent" | "error";

const labelClass = "text-label flex flex-col gap-3";

async function send(payload: Record<string, unknown>) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(String(res.status));
}

/**
 * White card on the contact page: a one-field call-back request, then the
 * full message form. Both post to /api/contact and end in the thank-you state.
 */
export function ContactPanel({
  initialTopic,
  initialMessage,
  prefill,
}: {
  initialTopic?: TopicKey;
  initialMessage?: string;
  /** Chips shown above the form when arriving from a solution page's finder. */
  prefill: string[];
}) {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<Status>("idle");
  const [chips, setChips] = useState(prefill);
  const [topic, setTopic] = useState<string>(initialTopic ?? "");
  const [message, setMessage] = useState(initialMessage ?? "");

  const submit = (build: (form: FormData) => Record<string, unknown>) => async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      await send(build(new FormData(form)));
      form.reset();
      setStatus("sent");
      setChips([]);
      setTopic("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  const field = (form: FormData, name: string) => String(form.get(name) ?? "").trim();
  const sending = status === "sending";

  return (
    <div className="rounded-[16px] bg-white p-[clamp(28px,4vw,56px)] text-[var(--color-text)]">
      {status === "sent" ? (
        <div role="status" className="flex flex-col gap-3 py-6">
          <span className="text-label text-[var(--color-spot)]">{t("successLabel")}</span>
          <span className="text-[26px] leading-[1.3] font-medium tracking-[-0.01em]">{t("sentTitle")}</span>
          <span className="text-[16.5px] leading-[1.6] text-[var(--color-accent-500)]">{t("replyTime")}</span>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-3 cursor-pointer self-start border-b-[1.5px] border-[var(--color-accent)] pb-0.5 text-[15px] font-medium text-[var(--color-accent)]"
          >
            {t("sendAnother")}
          </button>
        </div>
      ) : (
        <>
          <form
            onSubmit={submit((f) => ({ quick: true, email: field(f, "email"), website: field(f, "website") }))}
            className="flex flex-col gap-[14px]"
          >
            <span className="text-[22px] leading-[1.3] font-medium tracking-[-0.01em]">{t("quickTitle")}</span>
            <span className="text-[15.5px] leading-[1.5] text-[var(--color-accent-500)]">{t("quickBody")}</span>
            <div className="mt-1.5 flex flex-wrap gap-2.5">
              <input
                type="email"
                name="email"
                required
                aria-label={t("email")}
                placeholder="name@company.com"
                className="field-input min-w-0 flex-[1_1_220px]"
              />
              <Honeypot />
              <button
                type="submit"
                disabled={sending}
                className="flex cursor-pointer items-center gap-2.5 rounded-[6px] bg-[var(--color-accent)] px-6 py-4 text-[16px] leading-[1.55] font-medium text-white hover:bg-[var(--color-accent-600)] disabled:opacity-60"
              >
                {t("quickSubmit")} <span aria-hidden>→</span>
              </button>
            </div>
          </form>

          <div className="my-9 flex items-center gap-4">
            <span className="h-px flex-1 bg-[var(--color-divider)]" />
            <span className="text-label">{t("divider")}</span>
            <span className="h-px flex-1 bg-[var(--color-divider)]" />
          </div>

          <form
            onSubmit={submit((f) => ({
              name: field(f, "name"),
              company: field(f, "company"),
              email: field(f, "email"),
              role: field(f, "role") || undefined,
              // Send the visible label so the e-mail reads naturally.
              interest: topic ? t(`topics.${topic}`) : undefined,
              message: field(f, "message"),
              website: field(f, "website"),
            }))}
            className="flex flex-col gap-8"
          >
            {chips.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2 rounded-[8px] bg-[var(--color-accent-100)] px-4 py-3.5 text-[14.5px]">
                <span className="text-[var(--color-accent-500)]">{t("prefill")}</span>
                {chips.map((c) => (
                  <span key={c} className="rounded-full border border-[var(--color-accent-300)] bg-white px-2.5 py-1">
                    {c}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="grid grid-cols-[repeat(auto-fit,minmax(max(200px,calc(50%-16px)),1fr))] gap-8">
              <label className={labelClass}>
                {t("name")}
                <input type="text" name="name" required autoComplete="name" className="field-input" />
              </label>
              <label className={labelClass}>
                {t("company")}
                <input type="text" name="company" required autoComplete="organization" className="field-input" />
              </label>
              <label className={labelClass}>
                {t("email")}
                <input type="email" name="email" required autoComplete="email" className="field-input" />
              </label>
              <label className={labelClass}>
                <span>
                  {t("role")}{" "}
                  <span className="font-normal tracking-[0.08em] text-[var(--color-accent-400)] normal-case">
                    ({t("optional")})
                  </span>
                </span>
                <input type="text" name="role" autoComplete="organization-title" className="field-input" />
              </label>
            </div>

            <label className={labelClass}>
              {t("interest")}
              <select value={topic} onChange={(e) => setTopic(e.target.value)} className="field-input [appearance:auto]">
                <option value="">{t("interestDefault")}</option>
                {topicKeys.map((k) => (
                  <option key={k} value={k}>
                    {t(`topics.${k}`)}
                  </option>
                ))}
              </select>
            </label>

            <label className={labelClass}>
              {t("message")}
              <textarea
                name="message"
                rows={6}
                required
                minLength={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("messagePlaceholder")}
                className="field-input resize-y"
              />
            </label>
            <Honeypot />

            <div className="flex flex-col items-start gap-4">
              <button
                type="submit"
                disabled={sending}
                className="flex cursor-pointer items-center gap-3 rounded-[6px] bg-[var(--color-accent)] px-8 py-[18px] text-[17px] leading-[1.55] font-medium text-white hover:bg-[var(--color-accent-600)] disabled:opacity-60"
              >
                {sending ? t("submitting") : t("submit")} <span aria-hidden>→</span>
              </button>
              {status === "error" ? (
                <span role="alert" className="text-[14px] text-[var(--color-spot)]">
                  {t("error")}
                </span>
              ) : (
                <span className="text-[14px] text-[var(--color-accent-500)]">{t("replyTime")}</span>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );
}

/** Hidden field bots tend to fill in; the API ignores submissions that have it. */
function Honeypot() {
  return (
    <input
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden
      className="absolute -left-[9999px] h-px w-px opacity-0"
    />
  );
}
