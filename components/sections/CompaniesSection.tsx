"use client";

import React from "react";
import { COMPANIES } from "@/data/companies";
import { CompanyCard } from "@/components/cards/CompanyCard";
import { CompanyItem } from "@/types/systemly";
import { ArrowRight } from "lucide-react";

interface CompaniesSectionProps {
  onSelectCompany: (company: CompanyItem) => void;
  isBookmarked: (key: string) => boolean;
  onBookmarkToggle: (key: string) => void;
  onViewAll?: () => void;
}

export function CompaniesSection({
  onSelectCompany,
  isBookmarked,
  onBookmarkToggle,
  onViewAll,
}: CompaniesSectionProps) {
  return (
    <section data-home-section="companies" className="sy-container site-section border-t border-[var(--border)]">
      {/* Section Header */}
      <div className="section-heading">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-1">
            Production Scale Case Studies
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text)]">
            Real-World Architectures
          </h2>
          <p className="text-sm text-[var(--muted)] mt-1 max-w-xl">
            Educational architecture models of tech leaders based on published
            engineering blog posts and research papers.
          </p>
        </div>

        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:underline cursor-pointer"
          >
            <span>View all 12 companies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="home-grid">
        {COMPANIES.map((item) => (
          <CompanyCard
            key={item.slug}
            item={item}
            isBookmarked={isBookmarked(`company:${item.slug}`)}
            onBookmarkToggle={onBookmarkToggle}
            onClick={() => onSelectCompany(item)}
          />
        ))}
      </div>
    </section>
  );
}
