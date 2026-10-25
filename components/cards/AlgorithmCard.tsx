"use client";

import React from "react";
import { AlgorithmItem } from "@/types/systemly";
import { Badge } from "@/components/ui/Badge";
import { Bookmark, Cpu, ArrowRight } from "lucide-react";

interface AlgorithmCardProps {
  item: AlgorithmItem;
  isBookmarked?: boolean;
  onBookmarkToggle?: (key: string) => void;
  onClick?: () => void;
  note?: string;
}

export function AlgorithmCard({
  item,
  isBookmarked = false,
  onBookmarkToggle,
  onClick,
  note,
}: AlgorithmCardProps) {
  const itemKey = `algorithm:${item.slug}`;
  const maxVal = Math.max(...item.mini, 1);

  return (
    <article
      onClick={onClick}
      className="sy-card group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] cursor-pointer select-none transition-all duration-200"
    >
      <div>
        {/* Header row */}
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
          <button type="button" className="min-h-11 text-left cursor-pointer">
            {item.title}
          </button>
        </h3>
        <p className="text-[13px] text-[var(--muted)] line-clamp-2 leading-relaxed mb-3">
          {item.blurb}
        </p>

        {/* Mini interactive bar chart representation */}
        <div className="flex items-end justify-between gap-1.5 h-10 py-1.5 px-3 rounded-xl bg-[var(--surface2)] border border-[var(--border)] mb-3">
          {item.mini.map((val, idx) => {
            const heightPercent = Math.max(
              15,
              Math.round((val / maxVal) * 100),
            );
            const isHighlight = idx % 3 === 1;
            return (
              <div
                key={idx}
                className="flex-1 rounded-sm transition-all duration-300 group-hover:scale-y-105 origin-bottom"
                style={{
                  height: `${heightPercent}%`,
                  backgroundColor: isHighlight
                    ? "var(--accent)"
                    : "var(--border)",
                }}
                title={`Value: ${val}`}
              />
            );
          })}
        </div>

        {/* Complexity tags */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-[var(--muted)] mb-3">
          <span className="px-2 py-0.5 rounded bg-[var(--surface2)] border border-[var(--border)] font-medium text-[var(--text)]">
            {item.time}
          </span>
          <span className="px-2 py-0.5 rounded bg-[var(--surface2)] border border-[var(--border)]">
            Space: {item.space}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[var(--border)] text-xs text-[var(--muted)]">
        <span className="flex items-center gap-1.5 font-medium">
          <Cpu className="w-3.5 h-3.5" />
          Interactive trace
        </span>
        <span className="font-medium text-[var(--accent)] group-hover:underline flex items-center gap-1">
          Visualize
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
