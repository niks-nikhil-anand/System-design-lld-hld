"use client";

import React from "react";
import Link from "next/link";
import { ConceptItem } from "@/types/systemly";
import { Badge } from "@/components/ui/Badge";
import { Bookmark, Clock, ArrowRight } from "lucide-react";

interface ConceptCardProps {
  item: ConceptItem;
  isBookmarked?: boolean;
  onBookmarkToggle?: (key: string) => void;
  onClick?: () => void;
  note?: string;
}

export function ConceptCard({
  item,
  isBookmarked = false,
  onBookmarkToggle,
  onClick,
  note,
}: ConceptCardProps) {
  const itemKey = `concept:${item.slug}`;

  return (
    <article
      onClick={onClick}
      className="sy-card home-concept-card group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] cursor-pointer select-none transition-all duration-200"
    >
      <div>
        {/* Header row: Difficulty & Bookmark button */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge diff={item.diff} />
            <span className="text-[12px] font-medium text-[var(--muted)]">
              {item.cat}
            </span>
            {note && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[var(--accentSoft)] text-[var(--accent)]">
                {note}
              </span>
            )}
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

        {/* Title & Blurb */}
        <h3 className="text-[16px] sm:text-[17px] font-semibold text-[var(--text)] tracking-[-0.01em] group-hover:text-[var(--accent)] transition-colors mb-1.5">
          <Link href={"/concepts/" + item.slug} onClick={(event) => event.stopPropagation()} className="min-h-11 inline-flex items-center text-left cursor-pointer">
            {item.title}
          </Link>
        </h3>
        <p className="text-[13px] text-[var(--muted)] line-clamp-2 leading-relaxed mb-4">
          {item.blurb}
        </p>

        {/* Stage preview chips (e.g. Client -> LB -> App) */}
        {item.preview && item.preview.length > 0 && (
          <div className="home-mini-flow flex items-center gap-1.5 py-2 px-2.5 rounded-xl bg-[var(--surface2)] border border-[var(--border)] text-[11px] font-mono font-medium text-[var(--muted)] mb-4 overflow-x-auto">
            {item.preview.map((chip, idx) => (
              <React.Fragment key={idx}>
                <span className="whitespace-nowrap px-1.5 py-0.5 rounded bg-[var(--surface)] text-[var(--text)] border border-[var(--border)]">
                  {chip}
                </span>
                {idx < item.preview.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-[var(--muted)] flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Footer row: Read time & CTA */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[var(--border)] text-xs text-[var(--muted)]">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {item.mins} min read
        </span>
        <Link href={"/concepts/" + item.slug} onClick={(event) => event.stopPropagation()} className="font-medium text-[var(--accent)] group-hover:underline flex items-center gap-1">
          Explore
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
