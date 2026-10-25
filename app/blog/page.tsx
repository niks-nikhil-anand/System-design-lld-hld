import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/BlogIndex";

export const metadata: Metadata = {
  title: "Blog — Systemly",
  description:
    "Practical field notes on system design: caching, rate limiting, background jobs, and database scaling. Learn the patterns and tradeoffs behind scalable systems.",
};

export default function BlogPage() {
  return <BlogIndex />;
}
