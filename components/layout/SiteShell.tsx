"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { homeHref } from "@/components/layout/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Footer } from "@/components/layout/Footer";
import { SearchModal } from "@/components/search/SearchModal";
import { DetailModal } from "@/components/views/DetailModal";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import { BY_KEY } from "@/data/catalog";
import type { CatalogItem, ViewType } from "@/types/systemly";

type SiteShellView = ViewType | "blog";
export interface SiteControls {
  onSelectItem: (item: CatalogItem) => void;
  isBookmarked: (key: string) => boolean;
  onBookmarkToggle: (key: string) => void;
  isLearned: (key: string) => boolean;
  onLearnedToggle: (key: string) => void;
}
export function SiteShell({
  children,
  currentView,
  currentSlug,
  initialItemKey,
}: {
  children: React.ReactNode | ((controls: SiteControls) => React.ReactNode);
  currentView: SiteShellView;
  currentSlug?: string | null;
  initialItemKey?: string;
}) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(() => initialItemKey ? BY_KEY[initialItemKey] || null : null);
  const store = useBookmarks();
  useKeyboardShortcut("cmd+k", () => setSearchOpen((open) => !open));
  const navigate = (view: ViewType, slug?: string | null) => {
    setMenuOpen(false);
    setSearchOpen(false);
    router.push(homeHref(view, slug));
  };
  const selectItem = (item: CatalogItem) => {
    store.addRecent(item.title);
    setSearchOpen(false);
    if (item.kind === "path") router.push(homeHref("path", item.slug));
    else setSelectedItem(item);
  };
  const controls: SiteControls = {
    onSelectItem: selectItem,
    isBookmarked: store.isBookmarked,
    onBookmarkToggle: store.toggleBookmark,
    isLearned: store.isLearned,
    onLearnedToggle: store.toggleLearned,
  };
  return (
    <div className="sy min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)]">
      <Navbar mobileMenuOpen={menuOpen} currentView={currentView} currentSlug={currentSlug} bookmarkCount={store.bookmarks.length} onNavigate={navigate} onOpenSearch={() => setSearchOpen(true)} onOpenMobileMenu={() => setMenuOpen(true)} />
      <main id="main-content" tabIndex={-1} className="flex-1">
        {typeof children === "function" ? children(controls) : children}
      </main>
      <Footer />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} currentView={currentView} currentSlug={currentSlug} bookmarkCount={store.bookmarks.length} onNavigate={navigate} onOpenSearch={() => setSearchOpen(true)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} onSelectItem={selectItem} recentSearches={store.recent} onAddRecent={store.addRecent} />
      <DetailModal key={selectedItem ? `${selectedItem.kind}:${selectedItem.slug}` : "closed"} item={selectedItem} isOpen={Boolean(selectedItem)} onClose={() => setSelectedItem(null)} isBookmarked={selectedItem ? store.isBookmarked(`${selectedItem.kind}:${selectedItem.slug}`) : false} onBookmarkToggle={() => selectedItem && store.toggleBookmark(`${selectedItem.kind}:${selectedItem.slug}`)} isLearned={selectedItem ? store.isLearned(`${selectedItem.kind}:${selectedItem.slug}`) : false} onLearnedToggle={() => selectedItem && store.toggleLearned(`${selectedItem.kind}:${selectedItem.slug}`)} />
    </div>
  );
}
