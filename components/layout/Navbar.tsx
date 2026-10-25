"use client";

import Link from "next/link";
import { Search, Bookmark, Menu, LogIn } from "lucide-react";
import { SystemlyLogo } from "@/components/ui/SystemlyLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NAVIGATION, homeHref, isNavigationActive } from "./navigation";
import type { ViewType } from "@/types/systemly";

interface NavbarProps {
  currentView: ViewType | "blog";
  currentSlug?: string | null;
  bookmarkCount: number;
  mobileMenuOpen?: boolean;
  onNavigate: (view: ViewType, slug?: string | null) => void;
  onOpenSearch: () => void;
  onOpenMobileMenu: () => void;
}

export function Navbar({
  currentView,
  currentSlug,
  bookmarkCount,
  mobileMenuOpen = false,
  onNavigate,
  onOpenSearch,
  onOpenMobileMenu,
}: NavbarProps) {
  return (
    <header className="site-header sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-md">
      <a
        href="#main-content"
        className="skip-link"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById("main-content");
          main?.focus();
          main?.scrollIntoView({ block: "start" });
        }}
      >
        Skip to content
      </a>
      <div className="sy-container navbar-inner">
        <Link
          href="/"
          aria-label="Systemly home"
          onClick={(event) => {
            if (
              !event.metaKey &&
              !event.ctrlKey &&
              !event.shiftKey &&
              !event.altKey
            ) {
              event.preventDefault();
              onNavigate("home");
            }
          }}
          className="shrink-0 inline-flex min-h-11 items-center"
        >
          <SystemlyLogo />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {NAVIGATION.map((link) => {
            const active = isNavigationActive(
              currentView,
              currentSlug,
              link.view,
              link.slug,
            );
            return (
              <a
                key={link.label}
                href={homeHref(link.view, link.slug)}
                aria-current={active ? "page" : undefined}
                onClick={(event) => {
                  if (
                    !event.metaKey &&
                    !event.ctrlKey &&
                    !event.shiftKey &&
                    !event.altKey
                  ) {
                    event.preventDefault();
                    onNavigate(link.view, link.slug);
                  }
                }}
                className={`sy-ghost nav-link ${active ? "nav-link-active" : ""}`}
              >
                {link.label}
              </a>
            );
          })}
          <Link
            href="/blog"
            aria-current={currentView === "blog" ? "page" : undefined}
            className={`sy-ghost nav-link ${currentView === "blog" ? "nav-link-active" : ""}`}
          >
            Blog
          </Link>
        </nav>
        <div className="navbar-actions">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search topics"
            className="sy-ghost nav-action"
          >
            <Search size={17} className="shrink-0" />
            <span className="nav-search-label">Search topics</span>
            <kbd className="nav-shortcut">⌘K</kbd>
          </button>
          <button
            type="button"
            onClick={() => onNavigate("bookmarks")}
            aria-label={`View bookmarks (${bookmarkCount})`}
            className={`sy-ghost nav-action nav-bookmarks ${currentView === "bookmarks" ? "nav-link-active" : ""}`}
          >
            <Bookmark
              size={17}
              className="shrink-0"
              fill={bookmarkCount ? "var(--accent)" : "none"}
            />
            <span className="nav-bookmarks-label">Bookmarks</span>
            {bookmarkCount > 0 && (
              <span className="bookmark-count" aria-hidden="true">
                {bookmarkCount > 99 ? "99+" : bookmarkCount}
              </span>
            )}
          </button>
          <Link href="/login" aria-label="Log in" className="sy-ghost nav-action"><LogIn size={17} /></Link>
          <div className="nav-theme">
            <ThemeToggle />
          </div>
          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="site-navigation-dialog"
            className="sy-ghost nav-action nav-menu"
          >
            <Menu size={19} />
          </button>
        </div>
      </div>
    </header>
  );
}
