"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { ExploreView } from "@/components/views/ExploreView";

export function DirectoryPage({ type, query = "" }: { type: string; query?: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const itemSlug = params.get("item") || undefined;
  const initialItemKey = itemSlug ? `${type}:${itemSlug}` : undefined;
  const initialQuery = query || params.get("q") || "";
  return <SiteShell currentView="explore" currentSlug={type} initialItemKey={initialItemKey}>
    {({ onSelectItem, isBookmarked, onBookmarkToggle }) => <ExploreView key={`${type}:${initialQuery}`} initialType={type} initialQuery={initialQuery} lockedType={type !== "all"} onSelectItem={onSelectItem} isBookmarked={isBookmarked} onBookmarkToggle={onBookmarkToggle} onBackToHome={() => router.push("/")} />}
  </SiteShell>;
}
