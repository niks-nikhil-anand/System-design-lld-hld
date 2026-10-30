import { Suspense } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo-metadata";
import { DirectoryPage } from "@/components/routes/DirectoryPage";
export const metadata: Metadata = pageMetadata({ title: "System Design Algorithms", description: "Explore algorithms used in scalable systems, including graph search, consistent hashing, and other core techniques with visual traces.", path: "/algorithms" });
export default function Page() {
  return <Suspense fallback={<div className="app-view sy-container" aria-busy="true">Loading topics…</div>}><DirectoryPage type="algorithm" /></Suspense>;
}
