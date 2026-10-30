import { ExplorePageClient } from "@/components/routes/ExplorePageClient";
import { pageMetadata } from "@/lib/seo-metadata";

export const metadata = pageMetadata({
  title: "Explore System Design Topics",
  description: "Search the System Design Mate learning library for concepts, algorithms, architectures, and case studies.",
  path: "/explore",
  noIndex: true,
});

export default function ExplorePage() {
  return <ExplorePageClient />;
}
