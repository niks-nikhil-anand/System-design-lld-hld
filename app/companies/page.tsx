import { Suspense } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo-metadata";
import { DirectoryPage } from "@/components/routes/DirectoryPage";
export const metadata: Metadata = pageMetadata({ title: "Company Architecture Examples", description: "Study educational architecture models for products from Netflix, Uber, Amazon, Google, and other technology companies, based on public sources.", path: "/companies" });
export default function Page() {
  return <Suspense fallback={<div className="app-view sy-container" aria-busy="true">Loading topics…</div>}><DirectoryPage type="company" /></Suspense>;
}
