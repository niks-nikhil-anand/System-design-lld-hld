"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ViewType, RouteState, CatalogItem, PathItem } from "@/types/systemly";
import { BY_KEY, PATHS } from "@/data/catalog";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";

// Layout
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileMenu } from "@/components/layout/MobileMenu";

// Views
import { HomeView } from "@/components/views/HomeView";
import { ExploreView } from "@/components/views/ExploreView";
import { PathsView } from "@/components/views/PathsView";
import { PathDetailView } from "@/components/views/PathDetailView";
import { BookmarksView } from "@/components/views/BookmarksView";
import { PlaygroundView } from "@/components/views/PlaygroundView";
import { AboutView } from "@/components/views/AboutView";

// Modals
import { SearchModal } from "@/components/search/SearchModal";
import { DetailModal } from "@/components/views/DetailModal";

export default function App() {
  const [route, setRoute] = useState<RouteState>({
    view: "home",
    slug: null,
    q: "",
  });
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDetailItem, setSelectedDetailItem] =
    useState<CatalogItem | null>(null);

  const {
    bookmarks,
    learned,
    recent,
    toggleBookmark,
    isBookmarked,
    toggleLearned,
    isLearned,
    addRecent,
  } = useBookmarks();

  // Keyboard shortcut for Cmd+K
  useKeyboardShortcut("cmd+k", () => setSearchModalOpen((prev) => !prev));

  // Route hash mapping
  const hashFor = (r: RouteState): string => {
    switch (r.view) {
      case "home":
        return "#/";
      case "explore":
        if (r.q) return "#/search?q=" + encodeURIComponent(r.q);
        if (r.slug === "concept") return "#/concepts";
        if (r.slug === "algorithm") return "#/algorithms";
        if (r.slug === "company") return "#/companies";
        if (r.slug === "case") return "#/system-design";
        return "#/explore";
      case "paths":
        return "#/learning-paths";
      case "path":
        return "#/learning-paths/" + r.slug;
      case "playground":
        return "#/playground";
      case "bookmarks":
        return "#/bookmarks";
      case "about":
        return "#/about";
      default:
        return "#/" + r.view;
    }
  };

  const navigateTo = useCallback(
    (
      view: ViewType,
      slug: string | null = null,
      q: string = "",
      pushHistory = true,
    ) => {
      const nextRoute: RouteState = { view, slug, q };
      setRoute(nextRoute);
      setMobileMenuOpen(false);
      setSearchModalOpen(false);

      if (pushHistory && typeof window !== "undefined") {
        const hash = hashFor(nextRoute);
        if (window.location.hash !== hash) {
          window.history.pushState(null, "", hash);
        }
      }

      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [],
  );

  // Read URL hash on mount & popstate
  const readHash = useCallback(() => {
    if (typeof window === "undefined") return;
    const h = window.location.hash || "";
    if (!h || h === "#/" || h === "#") {
      navigateTo("home", null, "", false);
      return;
    }

    const clean = h.replace(/^#\//, "");
    const [pathPart, queryPart] = clean.split("?");
    const seg = pathPart.split("/");

    if (seg[0] === "search") {
      const q = decodeURIComponent((queryPart || "").replace(/^q=/, ""));
      navigateTo("explore", "all", q, false);
      return;
    }
    if (seg[0] === "explore") {
      navigateTo("explore", seg[1] || "all", "", false);
      return;
    }
    if (seg[0] === "concepts") {
      if (seg[1] && BY_KEY[`concept:${seg[1]}`]) {
        setSelectedDetailItem(BY_KEY[`concept:${seg[1]}`]);
      }
      navigateTo("explore", "concept", "", false);
      return;
    }
    if (seg[0] === "algorithms") {
      if (seg[1] && BY_KEY[`algorithm:${seg[1]}`]) {
        setSelectedDetailItem(BY_KEY[`algorithm:${seg[1]}`]);
      }
      navigateTo("explore", "algorithm", "", false);
      return;
    }
    if (seg[0] === "companies") {
      if (seg[1] && BY_KEY[`company:${seg[1]}`]) {
        setSelectedDetailItem(BY_KEY[`company:${seg[1]}`]);
      }
      navigateTo("explore", "company", "", false);
      return;
    }
    if (seg[0] === "system-design") {
      if (seg[1] && BY_KEY[`case:${seg[1]}`]) {
        setSelectedDetailItem(BY_KEY[`case:${seg[1]}`]);
      }
      navigateTo("explore", "case", "", false);
      return;
    }
    if (seg[0] === "learning-paths") {
      if (seg[1] && BY_KEY[`path:${seg[1]}`]) {
        navigateTo("path", seg[1], "", false);
      } else {
        navigateTo("paths", null, "", false);
      }
      return;
    }
    if (["playground", "bookmarks", "about"].includes(seg[0])) {
      navigateTo(seg[0] as ViewType, null, "", false);
      return;
    }
  }, [navigateTo]);

  useEffect(() => {
    readHash();
    window.addEventListener("popstate", readHash);
    window.addEventListener("hashchange", readHash);
    return () => {
      window.removeEventListener("popstate", readHash);
      window.removeEventListener("hashchange", readHash);
    };
  }, [readHash]);

  // Handle item click: If it's a path, navigate to PathDetailView, else open DetailModal
  const handleSelectItem = (item: CatalogItem) => {
    addRecent(item.title);
    if (item.kind === "path") {
      navigateTo("path", item.slug);
    } else {
      setSelectedDetailItem(item);
    }
  };

  const handleSearchQuery = (q: string) => {
    addRecent(q);
    navigateTo("explore", "all", q);
  };

  const handleScrollToFaq = () => {
    if (route.view !== "home") {
      navigateTo("home");
    }
    setTimeout(() => {
      const el = document.getElementById("faq");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Find active path for PathDetailView
  const currentPath: PathItem =
    route.view === "path" && route.slug && BY_KEY[`path:${route.slug}`]
      ? (BY_KEY[`path:${route.slug}`] as PathItem)
      : PATHS[0];

  return (
    <div className="sy flex flex-col min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors">
      {/* Navigation */}
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        currentView={route.view}
        currentSlug={route.slug}
        bookmarkCount={bookmarks.length}
        onNavigate={(view, slug) => navigateTo(view, slug || null)}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
      />

      {/* Main Content Body */}
      <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col">
        {route.view === "home" && (
          <HomeView
            onSelectItem={handleSelectItem}
            onSearchQuery={handleSearchQuery}
            onNavigateExplore={(type) => navigateTo("explore", type || "all")}
            onNavigatePaths={() => navigateTo("paths")}
            onOpenPlayground={() => navigateTo("playground")}
            isBookmarked={isBookmarked}
            onBookmarkToggle={toggleBookmark}
          />
        )}

        {route.view === "explore" && (
          <ExploreView
            key={`${route.slug}:${route.q}`}
            initialType={route.slug || "all"}
            initialQuery={route.q || ""}
            onSelectItem={handleSelectItem}
            isBookmarked={isBookmarked}
            onBookmarkToggle={toggleBookmark}
            onBackToHome={() => navigateTo("home")}
          />
        )}

        {route.view === "paths" && (
          <PathsView
            onSelectPath={(path) => navigateTo("path", path.slug)}
            onBackToHome={() => navigateTo("home")}
          />
        )}

        {route.view === "path" && (
          <PathDetailView
            path={currentPath}
            onBack={() => navigateTo("paths")}
            onSelectItem={handleSelectItem}
            isLearned={isLearned}
            onLearnedToggle={toggleLearned}
            isBookmarked={isBookmarked}
            onBookmarkToggle={toggleBookmark}
          />
        )}

        {route.view === "playground" && <PlaygroundView />}

        {route.view === "bookmarks" && (
          <BookmarksView
            bookmarks={bookmarks}
            onBookmarkToggle={toggleBookmark}
            onSelectItem={handleSelectItem}
            onExplore={() => navigateTo("explore", "all")}
          />
        )}

        {route.view === "about" && (
          <AboutView onBackToHome={() => navigateTo("home")} />
        )}
      </main>

      {/* Universal Detail Modal */}
      <DetailModal
        key={
          selectedDetailItem
            ? `${selectedDetailItem.kind}:${selectedDetailItem.slug}`
            : "closed"
        }
        item={selectedDetailItem}
        isOpen={!!selectedDetailItem}
        onClose={() => setSelectedDetailItem(null)}
        isBookmarked={
          selectedDetailItem
            ? isBookmarked(
                `${selectedDetailItem.kind}:${selectedDetailItem.slug}`,
              )
            : false
        }
        onBookmarkToggle={() => {
          if (selectedDetailItem) {
            toggleBookmark(
              `${selectedDetailItem.kind}:${selectedDetailItem.slug}`,
            );
          }
        }}
        isLearned={
          selectedDetailItem
            ? isLearned(`${selectedDetailItem.kind}:${selectedDetailItem.slug}`)
            : false
        }
        onLearnedToggle={() => {
          if (selectedDetailItem) {
            toggleLearned(
              `${selectedDetailItem.kind}:${selectedDetailItem.slug}`,
            );
          }
        }}
      />

      {/* Command-K Search Palette */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectItem={handleSelectItem}
        recentSearches={recent}
        onAddRecent={addRecent}
      />

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        currentView={route.view}
        currentSlug={route.slug}
        bookmarkCount={bookmarks.length}
        onNavigate={(view, slug) => navigateTo(view, slug || null)}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Footer */}
      <Footer
        onNavigate={(view, slug) => navigateTo(view, slug || null)}
        onScrollToFaq={handleScrollToFaq}
      />
    </div>
  );
}
