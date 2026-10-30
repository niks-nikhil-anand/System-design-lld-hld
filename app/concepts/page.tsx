import { Suspense } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo-metadata";
import { DirectoryPage } from "@/components/routes/DirectoryPage";
export const metadata: Metadata = pageMetadata({ title: "System Design Concepts", description: "Learn system design concepts including caching, load balancing, databases, networking, scalability, and reliability.", path: "/concepts" });
export default function Page() {
  return <Suspense fallback={<div className="app-view sy-container" aria-busy="true">Loading topics…</div>}><DirectoryPage type="concept" /></Suspense>;
}
