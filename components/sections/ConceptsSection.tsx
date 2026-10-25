"use client";

import React, { useState } from "react";
import { CONCEPTS } from "@/data/concepts";
import { ConceptCard } from "@/components/cards/ConceptCard";
import { ConceptItem } from "@/types/systemly";
import { ArrowRight } from "lucide-react";

interface ConceptsSectionProps {
  onSelectConcept: (concept: ConceptItem) => void;
  isBookmarked: (key: string) => boolean;
  onBookmarkToggle: (key: string) => void;
  onViewAll?: () => void;
}

export function ConceptsSection({
  onSelectConcept,
  isBookmarked,
  onBookmarkToggle,
  onViewAll,
}: ConceptsSectionProps) {
  const [selectedCat, setSelectedCat] = useState<string>("All");

  const categories = [
    "All",
    "Traffic",
    "Networking",
    "Data",
    "Messaging",
    "Architecture",
  ];

  const filteredConcepts =
    selectedCat === "All"
      ? CONCEPTS
      : CONCEPTS.filter((c) => c.cat === selectedCat);

  return (
    <section className="sy-container site-section border-t border-[var(--border)]">
      {/* Section Header */}
      <div className="section-heading">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-1">
            System Design Building Blocks
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text)]">
            Core Concepts
          </h2>
          <p className="text-sm text-[var(--muted)] mt-1 max-w-xl">
            From reverse proxies to distributed commit logs: 20 foundational
            blocks every system architect must master.
          </p>
        </div>

        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:underline cursor-pointer"
          >
            <span>Explore all 20 concepts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category filter pills */}
      <p className="filter-hint" id="concept-filter-hint">
        Swipe or scroll to explore all topics.
      </p>
      <div
        className="filter-strip"
        role="group"
        aria-label="Filter concepts by topic"
        aria-describedby="concept-filter-hint"
      >
        {categories.map((cat) => {
          const isActive = selectedCat === cat;
          const count =
            cat === "All"
              ? CONCEPTS.length
              : CONCEPTS.filter((c) => c.cat === cat).length;
          return (
            <button
              key={cat}
              type="button"
              aria-pressed={isActive}
              onFocus={(event) =>
                event.currentTarget.scrollIntoView({
                  block: "nearest",
                  inline: "nearest",
                })
              }
              onClick={() => setSelectedCat(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[var(--accent)] text-[var(--accentText)] shadow-xs"
                  : "bg-[var(--surface)] text-[var(--muted)] border border-[var(--border)] hover:bg-[var(--surface2)] hover:text-[var(--text)]"
              }`}
            >
              {cat}{" "}
              <span className="opacity-70 text-[11px] ml-1">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="home-grid">
        {filteredConcepts.map((item) => (
          <ConceptCard
            key={item.slug}
            item={item}
            isBookmarked={isBookmarked(`concept:${item.slug}`)}
            onBookmarkToggle={onBookmarkToggle}
            onClick={() => onSelectConcept(item)}
          />
        ))}
      </div>
    </section>
  );
}
