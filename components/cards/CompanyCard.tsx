"use client";

import React from "react";
import Link from "next/link";
import { CompanyItem } from "@/types/systemly";
import { Bookmark, Building2, Layers, ArrowRight } from "lucide-react";

interface CompanyCardProps {
  item: CompanyItem;
  isBookmarked?: boolean;
  onBookmarkToggle?: (key: string) => void;
  onClick?: () => void;
  note?: string;
}

export function CompanyCard({
  item,
  isBookmarked = false,
  onBookmarkToggle,
  onClick,
}: CompanyCardProps) {
  const itemKey = `company:${item.slug}`;
  const initial = item.title.charAt(0);

  return (
    <article
      onClick={onClick}
      className="sy-card home-company-card group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] cursor-pointer select-none transition-all duration-200"
    >
      <div>
        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div data-company={item.slug}
              className="home-company-mark w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base bg-[var(--accentSoft)] text-[var(--accent)] border border-[var(--border)] shadow-xs">
              {initial}
            </div>
            <div>
              <h3 className="text-[16px] sm:text-[17px] font-semibold text-[var(--text)] tracking-[-0.01em] group-hover:text-[var(--accent)] transition-colors">
                <Link
                  href={"/companies/" + item.slug}
                  onClick={(event) => event.stopPropagation()}
                  className="min-h-11 inline-flex items-center text-left cursor-pointer"
                >
                  {item.title}
                </Link>
              </h3>
              <span className="text-[11px] font-medium text-[var(--muted)] flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                Architecture model
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onBookmarkToggle?.(itemKey);
            }}
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark topic"}
            className="p-1 rounded-md text-[var(--muted)] hover:text-[var(--accent)] hover:bg-[var(--surface2)] transition-colors"
          >
            <Bookmark
              className="w-4 h-4 transition-transform group-hover:scale-105"
              fill={isBookmarked ? "var(--accent)" : "none"}
              stroke={isBookmarked ? "var(--accent)" : "currentColor"}
            />
          </button>
        </div>

        {/* Blurb */}
        <p className="text-[13px] text-[var(--muted)] line-clamp-2 leading-relaxed mb-4">
          {item.blurb}
        </p>

        {/* Focus Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.tags.slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[var(--surface2)] text-[var(--muted)] border border-[var(--border)]"
            >
              #{tag}
            </span>
          ))}
          {item.tags.length > 4 && (
            <span className="px-1.5 py-0.5 text-[11px] text-[var(--muted)]">
              +{item.tags.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[var(--border)] text-xs text-[var(--muted)]">
        <span className="flex items-center gap-1.5 font-medium">
          <Layers className="w-3.5 h-3.5" />
          {item.topics} topics explored
        </span>
        <Link href={"/companies/" + item.slug} onClick={(event) => event.stopPropagation()} className="font-medium text-[var(--accent)] group-hover:underline flex items-center gap-1">
          View architecture
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
