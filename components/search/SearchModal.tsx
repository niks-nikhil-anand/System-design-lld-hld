"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { useVisualViewport } from "@/hooks/useVisualViewport";
import { useModalDialog } from "@/hooks/useModalDialog";
import { Search, X, ArrowRight, History, Sparkles } from "lucide-react";
import { CatalogItem } from "@/types/systemly";
import { searchCatalog } from "@/data/catalog";
import { Badge } from "@/components/ui/Badge";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: CatalogItem) => void;
  recentSearches: string[];
  onAddRecent: (query: string) => void;
}

export function SearchModal({
  isOpen,
  onClose,
  onSelectItem,
  recentSearches,
  onAddRecent,
}: SearchModalProps) {
  const viewport = useVisualViewport();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  useModalDialog(isOpen, dialogRef, onClose);

  useEffect(() => {
    if (!isOpen) return;
    const frame = requestAnimationFrame(() => {
      setQuery("");
      setActiveIndex(0);
    });
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  const results = useMemo(
    () => (query.trim() ? searchCatalog(query) : []),
    [query],
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || e.target !== inputRef.current) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) =>
          results.length ? (prev + 1) % results.length : 0,
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) =>
          results.length ? (prev - 1 + results.length) % results.length : 0,
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (results.length > 0 && results[activeIndex]) {
          onAddRecent(results[activeIndex].title);
          onSelectItem(results[activeIndex]);
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, activeIndex, onSelectItem, onClose, onAddRecent]);

  useEffect(() => {
    if (isOpen)
      dialogRef.current
        ?.querySelector('[data-active-result="true"]')
        ?.scrollIntoView({ block: "nearest" });
  }, [isOpen, activeIndex]);

  if (!isOpen) return null;

  const popularSuggestions = [
    "Load Balancer",
    "Consistent Hashing",
    "URL Shortener",
    "Kafka",
    "Dijkstra",
    "Netflix",
    "Redis",
  ];

  return createPortal(
    <div
      className="search-overlay"
      style={
        viewport.height
          ? { height: viewport.height, top: viewport.top }
          : undefined
      }
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search learning topics"
        tabIndex={-1}
        className="search-dialog"
        style={{ boxShadow: "var(--shadow)" }}
      >
        {/* Search Input Bar */}
        <div className="shrink-0 flex items-center gap-2 px-3 py-2 border-b border-[var(--border)] bg-[var(--surface)]">
          <Search className="w-5 h-5 text-[var(--muted)] flex-shrink-0" />
          <input
            ref={inputRef}
            data-autofocus
            aria-label="Search all learning topics"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            placeholder="Search all concepts, algorithms, companies, or case studies..."
            className="w-full bg-transparent text-base text-[var(--text)] placeholder-[var(--muted)] outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close topic search"
            className="sy-icon-button"
          >
            <X size={20} />
          </button>
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="sy-icon-button rounded-md text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface2)]"
            >
              <span className="text-xs">Clear</span>
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--surface2)] border border-[var(--border)] text-[var(--muted)]">
              ESC
            </kbd>
          )}
        </div>

        {/* Content Body */}
        <div data-search-results className="min-h-0 flex-1 overflow-y-auto p-3">
          {query.trim().length > 0 ? (
            results.length > 0 ? (
              <div className="space-y-1">
                <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">
                  {results.length} results matching &ldquo;{query}&rdquo;
                </div>
                {results.map((item, idx) => {
                  const isSelected = idx === activeIndex;
                  return (
                    <button
                      type="button"
                      data-active-result={isSelected}
                      key={`${item.kind}:${item.slug}`}
                      onClick={() => {
                        onAddRecent(item.title);
                        onSelectItem(item);
                        onClose();
                      }}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`w-full text-left flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl cursor-pointer transition-all ${
                        isSelected
                          ? "bg-[var(--surface2)] border-l-4 border-[var(--accent)] pl-2.5"
                          : "hover:bg-[var(--surface2)]"
                      }`}
                    >
                      <div className="min-w-0 flex flex-col gap-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-[var(--text)]">
                            {item.title}
                          </span>
                          <span className="hidden sm:inline-flex text-[10px] font-mono px-1.5 py-0.2 rounded bg-[var(--accentSoft)] text-[var(--accent)] capitalize">
                            {item.kind}
                          </span>
                        </div>
                        <span className="text-xs text-[var(--muted)] line-clamp-1 max-w-md">
                          {item.blurb}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.diff && <Badge diff={item.diff} size="sm" />}
                        <ArrowRight
                          className={`w-4 h-4 ${
                            isSelected
                              ? "text-[var(--accent)]"
                              : "text-transparent"
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center text-sm text-[var(--muted)]">
                No matching topics found for &ldquo;{query}&rdquo;. Try checking
                your spelling or searching broader terms like cache, queue, or
                netflix.
              </div>
            )
          ) : (
            <div className="space-y-6 p-2">
              {/* Recent searches */}
              {recentSearches && recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-2.5 px-2">
                    <History className="w-3.5 h-3.5" />
                    <span>Recent Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2 px-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setQuery(term)}
                        className="min-h-11 text-xs px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface2)] hover:bg-[var(--border)] text-[var(--text)] transition-colors cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-2.5 px-2">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>Suggested Topics</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {popularSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setQuery(suggestion)}
                      className="min-h-11 flex items-center justify-between p-2.5 rounded-xl hover:bg-[var(--surface2)] text-left text-xs text-[var(--text)] font-medium transition-colors cursor-pointer"
                    >
                      <span>{suggestion}</span>
                      <ArrowRight className="w-3 h-3 text-[var(--muted)]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="hidden sm:flex shrink-0 px-4 py-2.5 border-t border-[var(--border)] bg-[var(--surface2)]/50 flex items-center justify-between text-[11px] text-[var(--muted)]">
          <div className="min-w-0 flex items-center gap-3">
            <span>
              <kbd className="font-mono bg-[var(--surface)] px-1 py-0.5 rounded border border-[var(--border)]">
                ↑
              </kbd>{" "}
              <kbd className="font-mono bg-[var(--surface)] px-1 py-0.5 rounded border border-[var(--border)]">
                ↓
              </kbd>{" "}
              to navigate
            </span>
            <span>
              <kbd className="font-mono bg-[var(--surface)] px-1 py-0.5 rounded border border-[var(--border)]">
                ↵
              </kbd>{" "}
              to select
            </span>
          </div>
          <span>Systemly universal index</span>
        </div>
      </div>
    </div>,
    document.body,
  );
}
