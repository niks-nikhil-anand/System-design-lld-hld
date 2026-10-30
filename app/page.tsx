import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { LandingPage } from "@/components/landing/LandingPage";
import { LegacyHashRedirect } from "@/components/routes/LegacyHashRedirect";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Learn System Design | Concepts, Algorithms & Architecture",
  description: "Learn system design through visual lessons on distributed systems, core algorithms, real-world architectures, and guided hands-on practice.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Learn System Design | Concepts, Algorithms & Architecture",
    description: "Learn system design through visual lessons on distributed systems, core algorithms, real-world architectures, and guided hands-on practice.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "System Design Mate — learn system design visually" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn System Design | Concepts, Algorithms & Architecture",
    description: "Learn system design through visual lessons on distributed systems, core algorithms, real-world architectures, and guided hands-on practice.",
    images: ["/opengraph-image"],
  },
};
export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: "DevKit Market",
        url: "https://www.devkitmarket.com/",
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: "System Design Mate",
        url: siteConfig.url,
        description: "Learn system design through visual lessons, architecture examples, and guided practice.",
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
    ],
  };
  return <SiteShell currentView="home"><><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /><LegacyHashRedirect /><LandingPage /></></SiteShell>;
}
