import type { Metadata } from "next";

const socialImage = { url: "/opengraph-image", width: 1200, height: 630, alt: "System Design Mate — learn system design visually" };

export function pageMetadata({ title, description, path, noIndex = false }: { title: string; description: string; path: string; noIndex?: boolean }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: { type: "website", url: path, title, description, images: [socialImage] },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}
