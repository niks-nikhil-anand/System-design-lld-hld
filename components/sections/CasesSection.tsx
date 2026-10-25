"use client";

import React from "react";
import { CASES } from "@/data/cases";
import { CaseCard } from "@/components/cards/CaseCard";
import { CaseItem } from "@/types/systemly";
import { ArrowRight } from "lucide-react";

interface CasesSectionProps {
  onSelectCase: (caseStudy: CaseItem) => void;
  isBookmarked: (key: string) => boolean;
  onBookmarkToggle: (key: string) => void;
  onViewAll?: () => void;
}

export function CasesSection({
  onSelectCase,
  isBookmarked,
  onBookmarkToggle,
  onViewAll,
}: CasesSectionProps) {
  return (
    <section className="sy-container site-section border-t border-[var(--border)]">
      {/* Section Header */}
      <div className="section-heading">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-1">
            Interview Prep & Architecture Walks
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text)]">
            System Design Case Studies
          </h2>
          <p className="text-sm text-[var(--muted)] mt-1 max-w-xl">
            Complete high-level designs featuring capacity estimations, API
            specifications, and database schemas.
          </p>
        </div>

        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:underline cursor-pointer"
          >
            <span>View all 10 case studies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="case-grid">
        {CASES.map((item) => (
          <CaseCard
            key={item.slug}
            item={item}
            isBookmarked={isBookmarked(`case:${item.slug}`)}
            onBookmarkToggle={onBookmarkToggle}
            onClick={() => onSelectCase(item)}
          />
        ))}
      </div>
    </section>
  );
}
