"use client";

import { useState } from "react";
import type { CatalogItem } from "@/types/systemly";
import { BY_KEY } from "@/data/catalog";
import { Bookmark, Trash2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface BookmarksViewProps {
  bookmarks: string[];
  onBookmarkToggle: (key: string) => void;
  onSelectItem: (item: CatalogItem) => void;
  onExplore: () => void;
}
const filters = [
  { id: "all", label: "All" },
  { id: "concept", label: "Concepts" },
  { id: "algorithm", label: "Algorithms" },
  { id: "company", label: "Companies" },
  { id: "case", label: "Case studies" },
  { id: "path", label: "Paths" },
];

export function BookmarksView({
  bookmarks,
  onBookmarkToggle,
  onSelectItem,
  onExplore,
}: BookmarksViewProps) {
  const [filterKind, setFilterKind] = useState("all");
  const items = bookmarks
    .map((key) => BY_KEY[key])
    .filter((item): item is CatalogItem => Boolean(item));
  const filteredItems =
    filterKind === "all"
      ? items
      : items.filter((item) => item.kind === filterKind);
  return (
    <div className="app-view bookmarks-view sy-container">
      <header className="view-heading">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-2">
          <Bookmark size={15} />
          Saved reference
        </p>
        <h1 className="font-bold tracking-tight">Your bookmarks</h1>
        <p className="text-base text-[var(--muted)] mt-3 max-w-2xl leading-relaxed">
          Your saved concepts, algorithms, and architecture references.
          Bookmarks stay in this browser.
        </p>
      </header>
      {items.length > 0 && (
        <div
          className="view-filters mb-6"
          role="group"
          aria-label="Filter bookmarks by topic type"
        >
          {filters.map((filter) => (
            <button
              type="button"
              key={filter.id}
              aria-pressed={filterKind === filter.id}
              onClick={() => setFilterKind(filter.id)}
              className={filterKind === filter.id ? "view-filter-active" : ""}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}
      <p role="status" className="text-sm text-[var(--muted)] mb-5">
        {filteredItems.length} saved{" "}
        {filteredItems.length === 1 ? "topic" : "topics"}
      </p>
      {filteredItems.length ? (
        <div className="view-grid">
          {filteredItems.map((item) => {
            const key = `${item.kind}:${item.slug}`;
            return (
              <article
                key={key}
                className="sy-card bookmark-card flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs capitalize text-[var(--accent)]">
                      {item.kind}
                    </span>
                    <Badge diff={item.diff} size="sm" />
                  </div>
                  <button
                    type="button"
                    onClick={() => onBookmarkToggle(key)}
                    aria-label={`Remove bookmark for ${item.title}`}
                    className="sy-icon-button hover:text-[var(--bad)]"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
                <h2 className="text-lg font-semibold mb-3">
                  <button
                    type="button"
                    onClick={() => onSelectItem(item)}
                    className="text-left min-h-11 cursor-pointer"
                  >
                    {item.title}
                  </button>
                </h2>
                <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">
                  {item.blurb}
                </p>
                <div className="mt-auto pt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3 text-sm">
                  <span className="text-[var(--muted)]">
                    {item.mins ? `${item.mins} min read` : "Learning path"}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectItem(item)}
                    className="inline-flex items-center gap-2 min-h-11 text-[var(--accent)] font-medium cursor-pointer"
                  >
                    View topic
                    <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="view-empty-state rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <Bookmark size={36} className="mx-auto mb-4 text-[var(--muted)]" />
          <h2 className="text-xl font-semibold mb-3">
            {items.length
              ? "No bookmarks in this category"
              : "No bookmarks saved yet"}
          </h2>
          <p className="text-base text-[var(--muted)] max-w-md mx-auto mb-5">
            {items.length
              ? "Choose another category to see your saved topics."
              : "Use the bookmark button on a topic card to keep it here for later."}
          </p>
          <button
            type="button"
            onClick={items.length ? () => setFilterKind("all") : onExplore}
            className="view-primary-button"
          >
            {items.length ? "Show all bookmarks" : "Explore topics"}
          </button>
        </div>
      )}
    </div>
  );
}
