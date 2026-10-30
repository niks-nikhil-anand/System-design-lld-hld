"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { DirectoryPage } from "@/components/routes/DirectoryPage";

function ExploreWithQuery() {
  const params = useSearchParams();
  return <DirectoryPage type="all" query={params.get("q") || ""} />;
}

export function ExplorePageClient() {
  return <Suspense fallback={<div className="app-view sy-container" aria-busy="true">Loading topics…</div>}><ExploreWithQuery /></Suspense>;
}
