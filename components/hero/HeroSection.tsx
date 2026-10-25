"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Sparkles, Play, Pause, RotateCcw } from "lucide-react";
import { searchCatalog } from "@/data/catalog";
import { useVisualViewport } from "@/hooks/useVisualViewport";
import { useVisibleAnimation } from "@/hooks/useVisibleAnimation";
import { FlowDiagram } from "@/components/ui/FlowDiagram";
import { CatalogItem } from "@/types/systemly";

interface HeroSectionProps {
  onSelectItem: (item: CatalogItem) => void;
  onSearchQuery: (query: string) => void;
}

export function HeroSection({ onSelectItem, onSearchQuery }: HeroSectionProps) {
  // Search state
  const viewport = useVisualViewport();
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const results = query.trim() ? searchCatalog(query).slice(0, 5) : [];
  const {
    ref: animationRef,
    active: animationActive,
    reducedMotion,
  } = useVisibleAnimation();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Network Simulation State
  // stage 0: at Client, stage 1: at LB, stage 2: at Server
  const [stage, setStage] = useState<number>(0);
  const [targetServer, setTargetServer] = useState<number>(0);
  const [serverCounts, setServerCounts] = useState<[number, number, number]>([
    3, 2, 3,
  ]);
  const [isSimPlaying, setIsSimPlaying] = useState<boolean>(true);

  // Click outside search
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Keep scheduled work bounded and cancel every pending step when paused.
  useEffect(() => {
    if (!isSimPlaying || !animationActive) return;
    let delivery: ReturnType<typeof setTimeout>;
    let reset: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      setStage(1);
      delivery = setTimeout(() => {
        setStage(2);
        setServerCounts((previous) => {
          const next = [...previous] as [number, number, number];
          next[targetServer] += 1;
          return next;
        });
        reset = setTimeout(() => {
          setTargetServer((previous) => (previous + 1) % 3);
          setStage(0);
        }, 650);
      }, 450);
    }, 1800);
    return () => {
      clearInterval(interval);
      clearTimeout(delivery);
      clearTimeout(reset);
    };
  }, [isSimPlaying, targetServer, animationActive]);

  const popularTags = [
    "load balancer",
    "caching",
    "consistent hashing",
    "kafka",
    "Netflix",
    "rate limiting",
  ];

  return (
    <section className="relative sy-container site-section">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column: Headline, stats, quick search */}
        <div className="lg:col-span-7 min-w-0 flex flex-col gap-5 sm:gap-6">
          {/* Stat Pill */}
          <div className="max-w-full self-start inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-xs font-medium text-[var(--muted)] shadow-xs">
            <span className="shrink-0 w-2 h-2 rounded-full bg-[var(--ok)] animate-pulse" />
            <span>20 concepts · 15 algorithms · 10 case studies</span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-title font-bold tracking-tight text-[var(--text)] leading-[1.08] text-balance">
            Understand System Design.{" "}
            <span className="text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4">
              See It in Action.
            </span>
          </h1>

          {/* Blurb */}
          <p className="text-base sm:text-lg text-[var(--muted)] max-w-xl leading-relaxed">
            Learn how modern distributed systems work through interactive
            diagrams, animated request flows, and architectural models of
            Google, Netflix, and Uber.
          </p>

          {/* Search Box with Autocomplete */}
          <div className="relative max-w-lg mt-1" ref={searchContainerRef}>
            <div className="flex items-center gap-2 h-12 px-3.5 rounded-2xl border-2 border-[var(--border)] focus-within:border-[var(--accent)] bg-[var(--surface)] shadow-sm transition-all">
              <Search className="w-5 h-5 text-[var(--muted)] flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setDropdownOpen(Boolean(e.target.value.trim()));
                }}
                aria-label="Search learning topics"
                aria-controls="hero-search-results"
                onKeyDown={(event) => {
                  if (event.key === "Escape") setDropdownOpen(false);
                  if (event.key === "Enter" && query.trim()) {
                    setDropdownOpen(false);
                    onSearchQuery(query.trim());
                  }
                }}
                onFocus={() => {
                  if (query.trim()) setDropdownOpen(true);
                }}
                placeholder="Search concepts, algorithms, companies... (e.g. cache, raft, uber)"
                className="min-w-0 w-full bg-transparent text-base text-[var(--text)] placeholder-[var(--muted)] outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="min-h-11 shrink-0 text-xs text-[var(--muted)] hover:text-[var(--text)] px-1"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Live Autocomplete Results */}
            {dropdownOpen && query.trim() && (
              <div
                id="hero-search-results"
                className="hero-suggestions absolute left-0 right-0 mt-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl py-2 z-30 max-h-[min(320px,45dvh)] overflow-y-auto overscroll-contain"
                style={{
                  boxShadow: "var(--shadow)",
                  maxHeight: viewport.height
                    ? Math.min(320, viewport.height * 0.45)
                    : undefined,
                }}
              >
                {results.length > 0 ? (
                  results.map((item) => (
                    <button
                      type="button"
                      key={`${item.kind}:${item.slug}`}
                      onClick={() => {
                        setDropdownOpen(false);
                        onSelectItem(item);
                      }}
                      className="w-full text-left flex flex-wrap items-center justify-between gap-2 min-h-11 px-4 py-2.5 hover:bg-[var(--surface2)] cursor-pointer transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-[var(--text)]">
                          {item.title}
                        </div>
                        <div className="text-xs text-[var(--muted)] line-clamp-1">
                          {item.blurb}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--accentSoft)] text-[var(--accent)] capitalize">
                        {item.kind}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-xs text-[var(--muted)] text-center">
                    No matching topics found for &ldquo;{query}&rdquo;.
                  </div>
                )}
              </div>
            )}

            {/* Popular search suggestions */}
            <div className="flex flex-wrap items-center gap-1.5 mt-3">
              <span className="text-xs text-[var(--muted)] font-medium mr-1">
                Popular:
              </span>
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setQuery(tag);
                    onSearchQuery(tag);
                  }}
                  className="min-h-11 text-xs font-medium px-2.5 py-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface2)] text-[var(--muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Network Simulation */}
        <div className="lg:col-span-5 min-w-0" ref={animationRef}>
          <div className="hero-simulation relative p-4 sm:p-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-lg overflow-hidden">
            {/* Header / Simulation Status */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-xs font-semibold text-[var(--text)]">
                  Live Request Dispatcher
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--okSoft)] text-[var(--ok)]">
                  Round Robin
                </span>
                <button
                  type="button"
                  onClick={() => setIsSimPlaying(!isSimPlaying)}
                  disabled={reducedMotion}
                  aria-label={
                    isSimPlaying
                      ? "Pause traffic simulation"
                      : "Play traffic simulation"
                  }
                  className="sy-icon-button rounded-md text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface2)]"
                  title={isSimPlaying ? "Pause simulation" : "Play simulation"}
                >
                  {isSimPlaying ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setServerCounts([0, 0, 0])}
                  className="sy-icon-button rounded-md text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface2)]"
                  aria-label="Reset traffic counters"
                  title="Reset counters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <FlowDiagram
              variant="hero"
              label="Requests flow from a client through a load balancer to three servers."
              activeNode={stage === 2 ? targetServer + 2 : stage}
              edges={[
                [0, 1],
                [1, 2],
                [1, 3],
                [1, 4],
              ]}
              nodes={[
                {
                  label: "Client",
                  detail: "Browser",
                  x: 14,
                  y: 50,
                  compactX: 50,
                  compactY: 14,
                },
                {
                  label: "Load balancer",
                  detail: "Layer 7",
                  x: 50,
                  y: 50,
                  compactX: 50,
                  compactY: 45,
                },
                ...["Server A", "Server B", "Server C"].map((label, index) => ({
                  label,
                  detail: `${serverCounts[index]} reqs`,
                  x: 86,
                  y: 18 + index * 32,
                  compactX: 15 + index * 35,
                  compactY: 80,
                })),
              ]}
            />

            {/* Simulation Footer Note */}
            <div className="pt-3 border-t border-[var(--border)] flex flex-wrap gap-2 items-center justify-between text-xs text-[var(--muted)]">
              <span>
                {reducedMotion
                  ? "Reduced motion: static preview"
                  : isSimPlaying
                    ? "Traffic distribution: Active"
                    : "Traffic distribution: Paused"}
              </span>
              <span className="font-mono text-[11px]">
                Total: {serverCounts[0] + serverCounts[1] + serverCounts[2]}{" "}
                requests served
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
