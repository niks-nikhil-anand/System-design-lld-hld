"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { homeHref } from "@/components/layout/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Footer } from "@/components/layout/Footer";
import { SearchModal } from "@/components/search/SearchModal";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import type { CatalogItem, ViewType } from "@/types/systemly";

export function BlogShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { bookmarks, recent, addRecent } = useBookmarks();
  useKeyboardShortcut("cmd+k", () => setSearchOpen((open) => !open));
  const navigate = (view: ViewType, slug?: string | null) => {
    setMenuOpen(false);
    setSearchOpen(false);
    router.push(homeHref(view, slug));
  };
  const selectItem = (item: CatalogItem) => {
    addRecent(item.title);
    setSearchOpen(false);
    if (item.kind === "path") return router.push(homeHref("path", item.slug));
    router.push(`${homeHref("explore", item.kind)}/${item.slug}`);
  };
  return (
    <div className="sy min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)]">
      <Navbar
        mobileMenuOpen={menuOpen}
        currentView="blog"
        bookmarkCount={bookmarks.length}
        onNavigate={navigate}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenMobileMenu={() => setMenuOpen(true)}
      />
      <main id="main-content" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <Footer
        onNavigate={navigate}
        onScrollToFaq={() => router.push("/#faq")}
      />
      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentView="blog"
        bookmarkCount={bookmarks.length}
        onNavigate={navigate}
        onOpenSearch={() => setSearchOpen(true)}
      />
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectItem={selectItem}
        recentSearches={recent}
        onAddRecent={addRecent}
      />
    </div>
  );
}
