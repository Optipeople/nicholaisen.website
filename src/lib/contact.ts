/**
 * Topics in the contact form's "I'm interested in" list. The five track keys
 * match lib/tracks.ts, so solution pages can link with `?topic=<track>`.
 * Labels live in messages under `contact.form.topics`.
 */
export const topicKeys = ["business", "optimization", "machines", "projects", "digital", "service", "other"] as const;
export type TopicKey = (typeof topicKeys)[number];

export const asTopic = (value?: string): TopicKey | undefined =>
  value && (topicKeys as readonly string[]).includes(value) ? (value as TopicKey) : undefined;
