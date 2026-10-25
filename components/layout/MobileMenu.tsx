"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { X, Search, Bookmark, ChevronRight } from "lucide-react";
import { SystemlyLogo } from "@/components/ui/SystemlyLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useModalDialog } from "@/hooks/useModalDialog";
import { NAVIGATION, homeHref, isNavigationActive } from "./navigation";
import type { ViewType } from "@/types/systemly";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: ViewType | "blog";
  currentSlug?: string | null;
  bookmarkCount: number;
  onNavigate: (view: ViewType, slug?: string | null) => void;
  onOpenSearch: () => void;
}

export function MobileMenu({
  isOpen,
  onClose,
  currentView,
  currentSlug,
  bookmarkCount,
  onNavigate,
  onOpenSearch,
}: MobileMenuProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useModalDialog(isOpen, dialogRef, onClose);
  useEffect(() => {
    if (!isOpen) return;
    const media = window.matchMedia("(min-width: 1280px)");
    const handleChange = () => {
      if (media.matches) onClose();
    };
    handleChange();
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  const links = [
    ...NAVIGATION,
    { label: "About & notes", view: "about" as const },
  ];
  return createPortal(
    <div className="drawer-overlay">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        id="site-navigation-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="navigation-title"
        tabIndex={-1}
        ref={dialogRef}
        className="navigation-drawer"
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
          <h2 id="navigation-title">
            <span className="sr-only">Systemly navigation</span>
            <span aria-hidden="true">
              <SystemlyLogo size={24} />
            </span>
          </h2>
          <button
            type="button"
            data-autofocus
            onClick={onClose}
            aria-label="Close navigation menu"
            className="sy-icon-button"
          >
            <X size={20} />
          </button>
        </div>
        <nav
          aria-label="Mobile navigation"
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-4"
        >
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="drawer-link mb-3 border border-[var(--border)] bg-[var(--surface2)]"
          >
            <Search size={17} />
            <span>Search topics</span>
          </button>
          {links.map((link) => {
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
                className={`drawer-link ${active ? "nav-link-active" : ""}`}
                onClick={(event) => {
                  if (
                    !event.metaKey &&
                    !event.ctrlKey &&
                    !event.shiftKey &&
                    !event.altKey
                  ) {
                    event.preventDefault();
                    onClose();
                    onNavigate(link.view, link.slug);
                  }
                }}
              >
                <span>{link.label}</span>
                <ChevronRight size={16} className="ml-auto shrink-0" />
              </a>
            );
          })}
          <Link
            href="/blog"
            onClick={onClose}
            aria-current={currentView === "blog" ? "page" : undefined}
            className={`drawer-link ${currentView === "blog" ? "nav-link-active" : ""}`}
          >
            <span>Blog</span>
            <ChevronRight size={16} className="ml-auto" />
          </Link>
          <Link href="/login" onClick={onClose} className="drawer-link"><span>Log in</span><ChevronRight size={16} className="ml-auto" /></Link>
          <button
            type="button"
            onClick={() => {
              onClose();
              onNavigate("bookmarks");
            }}
            className="drawer-link"
          >
            <Bookmark size={17} />
            <span>Your bookmarks</span>
            <span
              className="ml-auto text-xs"
              aria-label={`${bookmarkCount} bookmarks`}
            >
              {bookmarkCount > 99 ? "99+" : bookmarkCount}
            </span>
          </button>
          <div className="flex items-center justify-between gap-4 mt-4 px-3 pt-4 border-t border-[var(--border)]">
            <span className="text-sm text-[var(--muted)]">Appearance</span>
            <ThemeToggle placement="top" />
          </div>
        </nav>
      </div>
    </div>,
    document.body,
  );
}
