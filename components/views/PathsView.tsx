"use client";

import React from "react";
import { PATHS } from "@/data/paths";
import { PathCard } from "@/components/cards/PathCard";
import { PathItem } from "@/types/systemly";

interface PathsViewProps {
  onSelectPath: (path: PathItem) => void;
  onBackToHome?: () => void;
}

export function PathsView({ onSelectPath, onBackToHome }: PathsViewProps) {
  return (
    <div className="app-view paths-view sy-container">
      {/* Breadcrumb */}
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
        <span className="text-[var(--text)] font-medium">Learning paths</span>
      </nav>

      {/* Header */}
      <div className="view-heading">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text)]">
          Structured Learning Paths
        </h1>
        <p className="text-sm sm:text-base text-[var(--muted)] mt-1.5 max-w-2xl leading-relaxed">
          Curated sequences connecting foundational concepts, core algorithms,
          and real-world system designs into comprehensive mastery tracks.
          Progress stays saved in your browser.
        </p>
      </div>

      {/* Grid */}
      <div className="view-grid">
        {PATHS.map((item, index) => (
          <PathCard
            key={item.slug}
            item={item}
            index={index}
            onClick={() => onSelectPath(item)}
          />
        ))}
      </div>
    </div>
  );
}
