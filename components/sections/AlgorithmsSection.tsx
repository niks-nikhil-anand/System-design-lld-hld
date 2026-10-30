"use client";

import React from "react";
import { ALGORITHMS } from "@/data/algorithms";
import { AlgorithmCard } from "@/components/cards/AlgorithmCard";
import { AlgorithmItem } from "@/types/systemly";
import { ArrowRight } from "lucide-react";

interface AlgorithmsSectionProps {
  onSelectAlgorithm: (algo: AlgorithmItem) => void;
  isBookmarked: (key: string) => boolean;
  onBookmarkToggle: (key: string) => void;
  onViewAll?: () => void;
}

export function AlgorithmsSection({
  onSelectAlgorithm,
  isBookmarked,
  onBookmarkToggle,
  onViewAll,
}: AlgorithmsSectionProps) {
  return (
    <section data-home-section="algorithms" className="sy-container site-section border-t border-[var(--border)]">
      {/* Section Header */}
      <div className="section-heading">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-1">
            Visual Traces & Complexities
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text)]">
            Core Algorithms
          </h2>
          <p className="text-sm text-[var(--muted)] mt-1 max-w-xl">
            Input-driven execution traces of 15 classic algorithms behind search
            indexes, caches, and pathfinding.
          </p>
        </div>

        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:underline cursor-pointer"
          >
            <span>Explore all 15 algorithms</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="home-grid">
        {ALGORITHMS.map((item) => (
          <AlgorithmCard
            key={item.slug}
            item={item}
            isBookmarked={isBookmarked(`algorithm:${item.slug}`)}
            onBookmarkToggle={onBookmarkToggle}
            onClick={() => onSelectAlgorithm(item)}
          />
        ))}
      </div>
    </section>
  );
}
