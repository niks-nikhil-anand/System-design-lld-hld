"use client";

import type { PathItem, CatalogItem } from "@/types/systemly";
import { BY_KEY } from "@/data/catalog";
import { Badge } from "@/components/ui/Badge";
import {
  Clock,
  CheckCircle2,
  Circle,
  ArrowLeft,
  ArrowRight,
  Bookmark,
} from "lucide-react";

interface PathDetailViewProps {
  path: PathItem;
  onBack: () => void;
  onSelectItem: (item: CatalogItem) => void;
  isLearned: (key: string) => boolean;
  onLearnedToggle: (key: string) => void;
  isBookmarked: (key: string) => boolean;
  onBookmarkToggle: (key: string) => void;
}

export function PathDetailView({
  path,
  onBack,
  onSelectItem,
  isLearned,
  onLearnedToggle,
  isBookmarked,
  onBookmarkToggle,
}: PathDetailViewProps) {
  const topicKeys = path.modules.flatMap((module) => module.items);
  const learnedCount = topicKeys.filter(isLearned).length;
  const totalItems = topicKeys.length;
  const progressPercent = totalItems
    ? Math.round((learnedCount / totalItems) * 100)
    : 0;
  return (
    <div className="app-view path-detail-view sy-container">
      <button type="button" onClick={onBack} className="view-back-link">
        <ArrowLeft size={16} className="shrink-0" />
        Back to learning paths
      </button>
      <header className="path-summary rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted)] mb-4">
          <Badge diff={path.diff} />
          <span className="inline-flex items-center gap-1">
            <Clock size={14} />
            {path.duration}
          </span>
          <span>{totalItems} topics</span>
        </div>
        <h1 className="font-bold tracking-tight mb-4">{path.title}</h1>
        <p className="text-base text-[var(--muted)] leading-relaxed max-w-2xl mb-6">
          {path.blurb}
        </p>
        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface2)]">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-sm">
            <span className="font-semibold">Course progress</span>
            <span className="font-mono text-[var(--accent)]">
              {learnedCount} / {totalItems} ({progressPercent}%)
            </span>
          </div>
          <div
            role="progressbar"
            aria-label="Course progress"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-2 rounded-full bg-[var(--border)] overflow-hidden"
          >
            <div
              className="h-full rounded-full bg-[var(--ok)] transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </header>
      <div className="path-modules">
        <h2 className="text-2xl font-bold tracking-tight">
          Syllabus &amp; modules
        </h2>
        {path.modules.map((module, index) => (
          <section
            key={module.title}
            aria-labelledby={`path-module-${index}`}
            className="path-module rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-start gap-3 min-w-0">
                <span className="shrink-0 w-7 h-7 rounded-lg inline-flex items-center justify-center text-sm font-mono bg-[var(--accentSoft)] text-[var(--accent)]">
                  {index + 1}
                </span>
                <h3
                  id={`path-module-${index}`}
                  className="font-semibold text-lg"
                >
                  {module.title}
                </h3>
              </div>
              <span className="text-sm text-[var(--muted)]">
                {module.items.length} topics
              </span>
            </div>
            <div className="space-y-3">
              {module.items.map((key) => {
                const item = BY_KEY[key];
                if (!item) return null;
                const learned = isLearned(key);
                const bookmarked = isBookmarked(key);
                return (
                  <div
                    key={key}
                    className="path-topic-row border border-[var(--border)] bg-[var(--surface2)] rounded-xl"
                  >
                    <button
                      type="button"
                      onClick={() => onSelectItem(item)}
                      className="path-topic-open text-left"
                    >
                      <span className="flex flex-wrap items-center gap-2 mb-1">
                        <span
                          className={`text-base font-semibold ${learned ? "line-through text-[var(--muted)]" : ""}`}
                        >
                          {item.title}
                        </span>
                        <span className="text-[10px] font-mono text-[var(--muted)] capitalize">
                          {item.kind}
                        </span>
                        <ArrowRight
                          size={15}
                          className="shrink-0 text-[var(--accent)]"
                        />
                      </span>
                      <span className="block text-sm text-[var(--muted)] leading-relaxed">
                        {item.blurb}
                      </span>
                    </button>
                    <div className="path-topic-actions">
                      <button
                        type="button"
                        aria-label={`Mark ${item.title} as ${learned ? "unlearned" : "learned"}`}
                        aria-pressed={learned}
                        onClick={() => onLearnedToggle(key)}
                        className="path-learn-button"
                      >
                        {learned ? (
                          <CheckCircle2
                            size={18}
                            className="text-[var(--ok)] shrink-0"
                          />
                        ) : (
                          <Circle size={18} className="shrink-0" />
                        )}
                        <span>{learned ? "Learned" : "Mark learned"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onBookmarkToggle(key)}
                        aria-label={`${bookmarked ? "Remove bookmark for" : "Bookmark"} ${item.title}`}
                        aria-pressed={bookmarked}
                        className="sy-icon-button"
                      >
                        <Bookmark
                          size={17}
                          fill={bookmarked ? "var(--accent)" : "none"}
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
