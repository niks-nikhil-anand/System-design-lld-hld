"use client";

import React from "react";
import { HeroSection } from "@/components/hero/HeroSection";
import { ShelvesSection } from "@/components/sections/ShelvesSection";
import { ConceptsSection } from "@/components/sections/ConceptsSection";
import { PlaygroundTeaser } from "@/components/sections/PlaygroundTeaser";
import { AlgorithmsSection } from "@/components/sections/AlgorithmsSection";
import { CompaniesSection } from "@/components/sections/CompaniesSection";
import { CasesSection } from "@/components/sections/CasesSection";
import { PathsSection } from "@/components/sections/PathsSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CatalogItem } from "@/types/systemly";

interface HomeViewProps {
  onSelectItem: (item: CatalogItem) => void;
  onSearchQuery: (query: string) => void;
  onNavigateExplore: (type?: string) => void;
  onNavigatePaths: () => void;
  onOpenPlayground: () => void;
  isBookmarked: (key: string) => boolean;
  onBookmarkToggle: (key: string) => void;
}

export function HomeView({
  onSelectItem,
  onSearchQuery,
  onNavigateExplore,
  onNavigatePaths,
  onOpenPlayground,
  isBookmarked,
  onBookmarkToggle,
}: HomeViewProps) {
  return (
    <div className="homepage w-full flex flex-col">
      {/* 1. Hero Section with Live Request Dispatcher */}
      <HeroSection onSelectItem={onSelectItem} onSearchQuery={onSearchQuery} />

      {/* 2. Curated Shelves (Recently added, Trending, Beginner) */}
      <ShelvesSection
        onSelectItem={onSelectItem}
        isBookmarked={isBookmarked}
        onBookmarkToggle={onBookmarkToggle}
      />

      {/* 3. System Design Concepts Grid */}
      <ConceptsSection
        onSelectConcept={onSelectItem}
        isBookmarked={isBookmarked}
        onBookmarkToggle={onBookmarkToggle}
        onViewAll={() => onNavigateExplore("concept")}
      />

      {/* 4. Interactive Architecture Playground Teaser */}
      <PlaygroundTeaser onOpenPlayground={onOpenPlayground} />

      {/* 5. Core Algorithms with Mini Bar Chart Previews */}
      <AlgorithmsSection
        onSelectAlgorithm={onSelectItem}
        isBookmarked={isBookmarked}
        onBookmarkToggle={onBookmarkToggle}
        onViewAll={() => onNavigateExplore("algorithm")}
      />

      {/* 6. Real-World Company Architectures */}
      <CompaniesSection
        onSelectCompany={onSelectItem}
        isBookmarked={isBookmarked}
        onBookmarkToggle={onBookmarkToggle}
        onViewAll={() => onNavigateExplore("company")}
      />

      {/* 7. System Design Interview Case Studies */}
      <CasesSection
        onSelectCase={onSelectItem}
        isBookmarked={isBookmarked}
        onBookmarkToggle={onBookmarkToggle}
        onViewAll={() => onNavigateExplore("case")}
      />

      {/* 8. Curated Learning Paths */}
      <PathsSection onSelectPath={onSelectItem} onViewAll={onNavigatePaths} />

      <BlogSection />

      {/* 9. Interactive FAQ Accordion */}
      <FaqSection />
    </div>
  );
}
