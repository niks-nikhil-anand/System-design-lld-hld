"use client";

import React from "react";
import Link from "next/link";
import { SystemlyLogo } from "@/components/ui/SystemlyLogo";
import { ViewType } from "@/types/systemly";

interface FooterProps {
  onNavigate: (view: ViewType, slug?: string | null) => void;
  onScrollToFaq?: () => void;
}

export function Footer({ onNavigate, onScrollToFaq }: FooterProps) {
  const footerSections = [
    {
      title: "PRODUCT",
      links: [
        {
          label: "Explore Directory",
          onClick: () => onNavigate("explore", "all"),
        },
        {
          label: "System Design Concepts",
          onClick: () => onNavigate("explore", "concept"),
        },
        {
          label: "Core Algorithms",
          onClick: () => onNavigate("explore", "algorithm"),
        },
        { label: "Case Studies", onClick: () => onNavigate("explore", "case") },
        {
          label: "Architecture Playground",
          onClick: () => onNavigate("playground"),
        },
      ],
    },
    {
      title: "LEARN",
      links: [
        { label: "Learning Paths", onClick: () => onNavigate("paths") },
        {
          label: "Company Architectures",
          onClick: () => onNavigate("explore", "company"),
        },
        { label: "Your Bookmarks", onClick: () => onNavigate("bookmarks") },
        {
          label: "Frequently Asked Questions",
          onClick: onScrollToFaq || (() => onNavigate("home")),
        },
      ],
    },
    {
      title: "ABOUT",
      links: [
        { label: "Content Notes", onClick: () => onNavigate("about") },
        { label: "Privacy Policy", onClick: () => onNavigate("about") },
        { label: "Terms of Use", onClick: () => onNavigate("about") },
        { label: "Contact", onClick: () => onNavigate("about") },
      ],
    },
  ];

  return (
    <footer className="w-full border-t border-[var(--border)] bg-[var(--surface)] transition-colors mt-auto site-footer">
      <div className="sy-container site-section">
        <div className="footer-grid">
          {/* Brand info */}
          <div className="min-w-0 flex flex-col gap-3">
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
              className="inline-flex min-h-11 self-start items-center"
            >
              <SystemlyLogo size={28} />
            </Link>
            <p className="text-sm text-[var(--muted)] max-w-sm leading-relaxed">
              Systemly is an interactive visual platform for understanding
              scalable system design, distributed data structures, and
              production architectures.
            </p>
            <div className="flex items-center gap-2 text-xs text-[var(--muted)] pt-2">
              <span className="shrink-0 w-2 h-2 rounded-full bg-[var(--ok)] inline-block"></span>
              <span>
                All 20 concepts, 15 algorithms & 10 case studies active
              </span>
            </div>
          </div>

          {/* Columns */}
          <nav aria-label="Footer navigation" className="footer-groups">
            {footerSections.map((sec) => (
              <div key={sec.title} className="flex flex-col gap-3">
                <h4 className="text-xs font-semibold tracking-wider text-[var(--muted)] uppercase">
                  {sec.title}
                </h4>
                <ul className="space-y-2">
                  {sec.links.map((link) => (
                    <li key={link.label}>
                      <button
                        type="button"
                        onClick={link.onClick}
                        className="text-xs text-[var(--muted)] hover:text-[var(--text)] transition-colors text-left cursor-pointer"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                  {sec.title === "LEARN" && (
                    <li>
                      <Link
                        href="/blog"
                        className="text-xs !text-[var(--muted)] hover:!text-[var(--text)] transition-colors"
                      >
                        Blog
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © 2026 Systemly. Educational models based on public engineering
            resources.
          </div>
          <div className="flex items-center gap-4">
            <span className="break-words text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--surface2)] border border-[var(--border)]">
              Next.js 16 + React 19 + Tailwind v4
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
