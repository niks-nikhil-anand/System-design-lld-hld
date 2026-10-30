const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://systemdesignmate.in";

export const siteConfig = {
  name: "System Design Mate",
  shortName: "SD Mate",
  url: configuredUrl.replace(/\/+$/, ""),
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@systemdesignmate.com",
  description:
    "Learn system design through interactive diagrams, animated request flows, architecture case studies, and hands-on experiments.",
  locale: "en_US",
} as const;
