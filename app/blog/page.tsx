import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { pageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = pageMetadata({
  title: "System Design Tutorials & Articles",
  description: "Practical system design tutorials about caching, rate limiting, background jobs, and database scaling, with examples and trade-offs.",
  path: "/blog",
});

export default function BlogPage() {
  return <BlogIndex />;
}
