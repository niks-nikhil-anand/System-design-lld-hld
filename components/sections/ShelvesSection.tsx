"use client";

import React from "react";
import { SHELVES } from "@/data/catalog";
import { CatalogItem } from "@/types/systemly";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, ArrowRight, Bookmark } from "lucide-react";

interface ShelvesSectionProps {
  onSelectItem: (item: CatalogItem) => void;
  isBookmarked: (key: string) => boolean;
  onBookmarkToggle: (key: string) => void;
}

export function ShelvesSection({
  onSelectItem,
  isBookmarked,
  onBookmarkToggle,
}: ShelvesSectionProps) {
  return (
    <section className="sy-container site-section border-t border-[var(--border)]">
      <div className="flex flex-col gap-12">
        {SHELVES.map((shelf) => (
          <div key={shelf.title} className="flex flex-col gap-5">
            {/* Shelf Title */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text)]">
                  {shelf.title}
                </h3>
              </div>
            </div>

            {/* Shelf Items - Horizontal Scroll on small, flex/grid on large */}
            <div className="shelf-grid">
              {shelf.items.map((item) => {
                const itemKey = `${item.kind}:${item.slug}`;
                const bookmarked = isBookmarked(itemKey);

                return (
                  <div
                    key={itemKey}
                    onClick={() => onSelectItem(item)}
                    className="sy-card group flex flex-col justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] cursor-pointer select-none transition-all duration-200"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--surface2)] text-[var(--muted)] capitalize">
                          {item.kind}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onBookmarkToggle(itemKey);
                          }}
                          aria-label={
                            bookmarked
                              ? `Remove bookmark for ${item.title}`
                              : `Bookmark ${item.title}`
                          }
                          className="sy-icon-button rounded text-[var(--muted)] hover:text-[var(--accent)]"
                        >
                          <Bookmark
                            className="w-3.5 h-3.5"
                            fill={bookmarked ? "var(--accent)" : "none"}
                            stroke={
                              bookmarked ? "var(--accent)" : "currentColor"
                            }
                          />
                        </button>
                      </div>

                      <h4 className="text-sm font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors line-clamp-2 mb-1">
                        <button
                          type="button"
                          className="text-left min-h-11 cursor-pointer"
                        >
                          {item.title}
                        </button>
                      </h4>
                      <p className="text-xs text-[var(--muted)] line-clamp-2 leading-relaxed mb-3">
                        {item.blurb}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[var(--border)] text-[11px] text-[var(--muted)]">
                      {item.note ? (
                        <span className="font-medium text-[var(--accent)]">
                          {item.note}
                        </span>
                      ) : (
                        <Badge diff={item.diff} size="sm" />
                      )}
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
