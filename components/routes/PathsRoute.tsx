"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { PathsView } from "@/components/views/PathsView";
import { PathDetailView } from "@/components/views/PathDetailView";
import { BY_KEY } from "@/data/catalog";
import type { PathItem } from "@/types/systemly";

export function PathsRoute({ slug }: { slug?: string }) {
  const router = useRouter();
  const selectedPath = slug ? BY_KEY[`path:${slug}`] as PathItem | undefined : undefined;
  useEffect(() => { if (slug && !selectedPath) router.replace("/learning-paths"); }, [slug, selectedPath, router]);
  return <SiteShell currentView={slug ? "path" : "paths"} currentSlug={slug}>
    {({ onSelectItem, isBookmarked, onBookmarkToggle, isLearned, onLearnedToggle }) => selectedPath ?
      <PathDetailView path={selectedPath} onBack={() => router.push("/learning-paths")} onSelectItem={onSelectItem} isLearned={isLearned} onLearnedToggle={onLearnedToggle} isBookmarked={isBookmarked} onBookmarkToggle={onBookmarkToggle} /> :
      <PathsView onSelectPath={(path) => router.push(`/learning-paths/${path.slug}`)} onBackToHome={() => router.push("/")} />}
  </SiteShell>;
}
