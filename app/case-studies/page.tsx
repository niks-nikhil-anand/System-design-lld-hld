import { Suspense } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo-metadata";
import { DirectoryPage } from "@/components/routes/DirectoryPage";
export const metadata: Metadata = pageMetadata({ title: "System Design Case Studies", description: "Practice real-world system design with requirements, capacity estimates, architecture choices, request flows, and trade-offs.", path: "/case-studies" });
export default function Page() {
  return <Suspense fallback={<div className="app-view sy-container" aria-busy="true">Loading topics…</div>}><DirectoryPage type="case" /></Suspense>;
}
