"use client";

import React from "react";
import { PathItem } from "@/types/systemly";
import { Badge } from "@/components/ui/Badge";
import { Clock, ArrowRight, Layers } from "lucide-react";

interface PathCardProps {
  item: PathItem;
  onClick?: () => void;
  index?: number;
}

export function PathCard({ item, onClick, index = 0 }: PathCardProps) {
  const totalTopics =
    item.total || item.modules.reduce((acc, m) => acc + m.items.length, 0);

  return (
    <article
      onClick={onClick}
      className="sy-card group relative flex flex-col justify-between p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] cursor-pointer select-none transition-all duration-200"
    >
      <div>
        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-semibold text-[var(--muted)]">
              PATH 0{index + 1}
            </span>
            <Badge diff={item.diff} />
          </div>
          <span className="flex items-center gap-1.5 text-xs text-[var(--muted)] font-medium">
            <Clock className="w-3.5 h-3.5" />
            {item.duration}
          </span>
        </div>

        {/* Title & Blurb */}
        <h3 className="text-[17px] font-semibold text-[var(--text)] tracking-[-0.01em] group-hover:text-[var(--accent)] transition-colors mb-2">
          <button type="button" className="min-h-11 text-left cursor-pointer">
            {item.title}
          </button>
        </h3>
        <p className="text-[13px] text-[var(--muted)] line-clamp-2 leading-relaxed mb-4">
          {item.blurb}
        </p>

        {/* Modules Breakdown */}
        <div className="flex flex-col gap-1.5 mb-4 p-3 rounded-xl bg-[var(--surface2)] border border-[var(--border)]">
          <div className="text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wider flex flex-wrap gap-2 items-center justify-between">
            <span>Syllabus Modules</span>
            <span>{totalTopics} topics</span>
          </div>
          <div className="space-y-1">
            {item.modules.slice(0, 3).map((mod, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between gap-2 text-[12px] text-[var(--text)]"
              >
                <span className="min-w-0 break-words">• {mod.title}</span>
                <span className="shrink-0 font-mono text-[11px] text-[var(--muted)] ml-2">
                  {mod.items.length} items
                </span>
              </div>
            ))}
            {item.modules.length > 3 && (
              <div className="text-[11px] text-[var(--muted)] italic pt-0.5">
                +{item.modules.length - 3} more modules
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[var(--border)] text-xs text-[var(--muted)]">
        <span className="flex items-center gap-1.5 font-medium">
          <Layers className="w-3.5 h-3.5" />
          {item.modules.length} modules structured
        </span>
        <span className="font-medium text-[var(--accent)] group-hover:underline flex items-center gap-1">
          Start path
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
