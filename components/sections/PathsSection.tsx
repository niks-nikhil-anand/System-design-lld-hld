"use client";

import React from "react";
import { PATHS } from "@/data/paths";
import { PathCard } from "@/components/cards/PathCard";
import { PathItem } from "@/types/systemly";
import { ArrowRight } from "lucide-react";

interface PathsSectionProps {
  onSelectPath: (path: PathItem) => void;
  onViewAll?: () => void;
}

export function PathsSection({ onSelectPath, onViewAll }: PathsSectionProps) {
  return (
    <section data-home-section="paths" className="sy-container site-section border-t border-[var(--border)]">
      {/* Section Header */}
      <div className="section-heading">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-1">
            Curated Curriculums
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text)]">
            Structured Learning Paths
          </h2>
          <p className="text-sm text-[var(--muted)] mt-1 max-w-xl">
            Step-by-step tracks connecting concepts, algorithms, and practical
            designs into coherent learning journeys.
          </p>
        </div>

        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:underline cursor-pointer"
          >
            <span>View all 7 paths</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="path-grid">
        {PATHS.slice(0, 6).map((item, index) => (
          <PathCard
            key={item.slug}
            item={item}
            index={index}
            onClick={() => onSelectPath(item)}
          />
        ))}
      </div>
    </section>
  );
}
