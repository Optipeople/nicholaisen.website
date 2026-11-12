import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactPanel } from "@/components/contact/ContactPanel";
import { asTopic } from "@/lib/contact";
import { NextSteps } from "@/components/contact/NextSteps";
import { trackKeys } from "@/lib/tracks";
import { buildMetadata } from "@/lib/seo";

type Params = { locale: string };
type Search = { topic?: string; message?: string; choice?: string | string[] };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.meta" });
  return buildMetadata({ title: t("title"), description: t("description"), path: "/contact" });
}

/**
 * Contact page (design v3). Solution pages link here with
 * `?topic=<track>&choice=…&message=…` to pre-fill the form.
 */
export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<Search>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { topic, message, choice } = await searchParams;
  const tt = await getTranslations("home.tracks.items");

  const initialTopic = asTopic(topic);
  const choices = (Array.isArray(choice) ? choice : choice ? [choice] : []).map((c) => c.slice(0, 80)).slice(0, 4);
  const trackTitle =
    initialTopic && (trackKeys as readonly string[]).includes(initialTopic) ? tt(`${initialTopic}.title`) : null;
  const prefill = trackTitle ? [trackTitle, ...choices] : [];

  return (
    <main className="bg-[var(--color-accent)] text-white">
      <section className="site-container grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-start gap-x-[clamp(40px,6vw,96px)] gap-y-14 pt-[clamp(56px,7vw,96px)] pb-[clamp(72px,8vw,112px)]">
        <ContactInfo />
        <ContactPanel
          initialTopic={initialTopic}
          initialMessage={typeof message === "string" ? message.slice(0, 2000) : undefined}
          prefill={prefill}
        />
      </section>
      <NextSteps />
    </main>
  );
}
