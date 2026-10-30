"use client";

import React, { useState, useMemo } from "react";
import { CatalogItem } from "@/types/systemly";
import {
  ALL_ITEMS,
  TYPE_PRESETS,
  searchCatalog,
  DIFF_RANK,
} from "@/data/catalog";
import { ConceptCard } from "@/components/cards/ConceptCard";
import { AlgorithmCard } from "@/components/cards/AlgorithmCard";
import { CompanyCard } from "@/components/cards/CompanyCard";
import { CaseCard } from "@/components/cards/CaseCard";
import { PathCard } from "@/components/cards/PathCard";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";

interface ExploreViewProps {
  initialType?: string;
  initialQuery?: string;
  onSelectItem: (item: CatalogItem) => void;
  isBookmarked: (key: string) => boolean;
  onBookmarkToggle: (key: string) => void;
  onBackToHome?: () => void;
  lockedType?: boolean;
}

export function ExploreView({
  initialType = "all",
  initialQuery = "",
  onSelectItem,
  isBookmarked,
  onBookmarkToggle,
  onBackToHome,
  lockedType = false,
}: ExploreViewProps) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [selectedDiff, setSelectedDiff] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("relevance");

  const types: { id: string; label: string }[] = [
    { id: "all", label: "All Topics" },
    { id: "concept", label: "Concepts" },
    { id: "algorithm", label: "Algorithms" },
    { id: "company", label: "Companies" },
    { id: "case", label: "Case Studies" },
    { id: "path", label: "Learning Paths" },
  ];

  const difficulties: { id: string; label: string }[] = [
    { id: "all", label: "All Difficulties" },
    { id: "Beginner", label: "Beginner" },
    { id: "Intermediate", label: "Intermediate" },
    { id: "Advanced", label: "Advanced" },
  ];

  const filteredItems = useMemo(() => {
    let pool = query.trim() ? searchCatalog(query) : ALL_ITEMS.slice();

    if (selectedType !== "all") {
      pool = pool.filter((it) => it.kind === selectedType);
    }

    if (selectedDiff !== "all") {
      pool = pool.filter((it) => it.diff === selectedDiff);
    }

    if (sortOrder === "az") {
      pool = pool.slice().sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "short") {
      pool = pool.slice().sort((a, b) => (a.mins || 99) - (b.mins || 99));
    } else if (sortOrder === "easy") {
      pool = pool
        .slice()
        .sort((a, b) => (DIFF_RANK[a.diff] || 0) - (DIFF_RANK[b.diff] || 0));
    }

    return pool;
  }, [query, selectedType, selectedDiff, sortOrder]);

  const preset = TYPE_PRESETS[selectedType] || TYPE_PRESETS.all;

  return (
    <div className="app-view explore-view sy-container">
      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="view-breadcrumb text-[var(--muted)]"
      >
        {onBackToHome && (
          <button
            type="button"
            onClick={onBackToHome}
            className="hover:text-[var(--text)] transition-colors cursor-pointer"
          >
            Home
          </button>
        )}
        <span>/</span>
        <span className="text-[var(--text)] font-medium">{preset.heading}</span>
      </nav>

      {/* Header */}
      <div className="view-heading">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text)]">
          {query.trim() ? `Search results for "${query}"` : preset.heading}
        </h1>
        <p className="text-sm sm:text-base text-[var(--muted)] mt-1.5 max-w-2xl">
          {query.trim()
            ? `Matching topics across concepts, algorithms, companies and case studies.`
            : preset.sub}
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="explore-toolbar flex flex-col gap-4 p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] mb-8 shadow-xs">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
          <input
            type="search"
            aria-label="Filter topics by keyword"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by keyword (e.g. cache, hash, streaming, paxos)..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-[var(--border)] bg-[var(--surface2)] text-[var(--text)] placeholder-[var(--muted)] outline-none focus:border-[var(--accent)]"
          />
        </div>

        {/* Type Filter Pills */}
        {!lockedType && <div className="view-filters" role="group" aria-label="Topic type">
          {types.map((t) => {
            const isActive = selectedType === t.id;
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedType(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[var(--accent)] text-[var(--accentText)]"
                    : "bg-[var(--surface2)] text-[var(--muted)] hover:text-[var(--text)]"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>}

        {/* Second Row: Difficulty and Sort Selectors */}
        <div className="explore-selects border-t border-[var(--border)] text-[var(--muted)]">
          <label className="explore-select-group">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--muted)]" />
            <span className="font-medium">Difficulty:</span>
            <select
              value={selectedDiff}
              onChange={(e) => setSelectedDiff(e.target.value)}
              className="bg-[var(--surface2)] text-[var(--text)] rounded-lg px-2 py-1 border border-[var(--border)] outline-none"
            >
              {difficulties.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
          </label>

          <label className="explore-select-group">
            <ArrowUpDown className="w-3.5 h-3.5 text-[var(--muted)]" />
            <span className="font-medium">Sort by:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-[var(--surface2)] text-[var(--text)] rounded-lg px-2 py-1 border border-[var(--border)] outline-none"
            >
              <option value="relevance">Relevance</option>
              <option value="az">Alphabetical (A-Z)</option>
              <option value="short">Shortest read</option>
              <option value="easy">Easiest first</option>
            </select>
          </label>
        </div>
      </div>

      {/* Results Count Summary */}
      <div role="status" className="text-sm text-[var(--muted)] mb-5">
        <span>
          Showing{" "}
          <strong className="text-[var(--text)]">{filteredItems.length}</strong>{" "}
          {filteredItems.length === 1 ? "topic" : "topics"}
        </span>
      </div>

      {/* Grid of Results */}
      {filteredItems.length > 0 ? (
        <div className="view-grid">
          {filteredItems.map((item) => {
            if (item.kind === "concept") {
              return (
                <ConceptCard
                  key={`concept:${item.slug}`}
                  item={item}
                  isBookmarked={isBookmarked(`concept:${item.slug}`)}
                  onBookmarkToggle={onBookmarkToggle}
                  onClick={() => onSelectItem(item)}
                />
              );
            }
            if (item.kind === "algorithm") {
              return (
                <AlgorithmCard
                  key={`algorithm:${item.slug}`}
                  item={item}
                  isBookmarked={isBookmarked(`algorithm:${item.slug}`)}
                  onBookmarkToggle={onBookmarkToggle}
                  onClick={() => onSelectItem(item)}
                />
              );
            }
            if (item.kind === "company") {
              return (
                <CompanyCard
                  key={`company:${item.slug}`}
                  item={item}
                  isBookmarked={isBookmarked(`company:${item.slug}`)}
                  onBookmarkToggle={onBookmarkToggle}
                  onClick={() => onSelectItem(item)}
                />
              );
            }
            if (item.kind === "case") {
              return (
                <CaseCard
                  key={`case:${item.slug}`}
                  item={item}
                  isBookmarked={isBookmarked(`case:${item.slug}`)}
                  onBookmarkToggle={onBookmarkToggle}
                  onClick={() => onSelectItem(item)}
                />
              );
            }
            if (item.kind === "path") {
              return (
                <PathCard
                  key={`path:${item.slug}`}
                  item={item}
                  onClick={() => onSelectItem(item)}
                />
              );
            }
            return null;
          })}
        </div>
      ) : (
        <div className="view-empty-state rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
          <h3 className="text-lg font-semibold text-[var(--text)] mb-2">
            No matching topics found
          </h3>
          <p className="text-sm text-[var(--muted)] max-w-md mx-auto mb-5">
            We couldn’t find anything matching your filters. Try clearing your
            search or switching to All Topics.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSelectedType("all");
              setSelectedDiff("all");
              setSortOrder("relevance");
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[var(--accent)] text-[var(--accentText)] cursor-pointer"
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
}
