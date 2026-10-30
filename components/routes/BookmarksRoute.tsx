"use client";
import { useRouter } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { BookmarksView } from "@/components/views/BookmarksView";
import { useBookmarks } from "@/hooks/useBookmarks";
export function BookmarksRoute() {
  const router = useRouter();
  const { bookmarks, toggleBookmark } = useBookmarks();
  return <SiteShell currentView="bookmarks">{({ onSelectItem }) => <BookmarksView bookmarks={bookmarks} onBookmarkToggle={toggleBookmark} onSelectItem={onSelectItem} onExplore={() => router.push("/explore")} />}</SiteShell>;
}
