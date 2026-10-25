"use client";

import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useModalDialog } from "@/hooks/useModalDialog";
import { useVisualViewport } from "@/hooks/useVisualViewport";
import { CatalogItem } from "@/types/systemly";
import { Badge } from "@/components/ui/Badge";
import { X, Bookmark, CheckCircle, Clock, RotateCcw } from "lucide-react";
import { RichConceptItem } from "@/data/concepts";
import { RichCompanyItem } from "@/data/companies";
import { RichCaseItem } from "@/data/cases";

interface DetailModalProps {
  item: CatalogItem | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
  isLearned: boolean;
  onLearnedToggle: () => void;
  onNavigateToItem?: (itemKey: string) => void;
}

export function DetailModal({
  item,
  isOpen,
  onClose,
  isBookmarked,
  onBookmarkToggle,
  isLearned,
  onLearnedToggle,
}: DetailModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const [algoStep, setAlgoStep] = useState<number>(0);

  const dialogRef = useRef<HTMLDivElement>(null);
  const viewport = useVisualViewport();
  useModalDialog(isOpen && Boolean(item), dialogRef, onClose);
  if (!isOpen || !item) return null;
  const algorithm = item.kind === "algorithm" ? item : null;

  const concept = item.kind === "concept" ? (item as RichConceptItem) : null;
  const company = item.kind === "company" ? (item as RichCompanyItem) : null;
  const caseStudy = item.kind === "case" ? (item as RichCaseItem) : null;

  return createPortal(
    <div
      className="detail-overlay"
      style={
        viewport.height
          ? { height: viewport.height, top: viewport.top }
          : undefined
      }
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        tabIndex={-1}
        className="detail-dialog"
        style={{ boxShadow: "var(--shadow)" }}
      >
        <div className="detail-header border-b border-[var(--border)]">
          <div className="detail-meta">
            <span className="text-xs font-mono px-2 py-1 rounded bg-[var(--accentSoft)] text-[var(--accent)] capitalize">
              {item.kind}
            </span>
            <Badge diff={item.diff} />
            {item.mins ? (
              <span className="inline-flex items-center gap-1 text-xs text-[var(--muted)]">
                <Clock size={14} />
                {item.mins} min read
              </span>
            ) : null}
          </div>
          <button
            type="button"
            data-autofocus
            onClick={onClose}
            aria-label="Close topic details"
            className="detail-close sy-icon-button border border-[var(--border)]"
          >
            <X size={20} />
          </button>
          <div className="detail-actions">
            <button
              type="button"
              onClick={onLearnedToggle}
              aria-pressed={isLearned}
              className={`detail-learn-button ${isLearned ? "text-[var(--ok)] bg-[var(--okSoft)]" : "text-[var(--muted)] bg-[var(--surface2)]"}`}
            >
              <CheckCircle size={16} className="shrink-0" />
              <span>{isLearned ? "Learned" : "Mark learned"}</span>
            </button>
            <button
              type="button"
              onClick={onBookmarkToggle}
              aria-pressed={isBookmarked}
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark topic"}
              className="sy-icon-button border border-[var(--border)]"
            >
              <Bookmark
                size={17}
                fill={isBookmarked ? "var(--accent)" : "none"}
              />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="detail-body space-y-8">
          {/* Title & Blurb */}
          <div>
            <h2
              id="detail-title"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text)] mb-2"
            >
              {item.title}
            </h2>
            <p className="text-base text-[var(--muted)] leading-relaxed">
              {item.blurb}
            </p>
          </div>

          {/* CONCEPT DEEP DIVE */}
          {concept && (
            <div className="space-y-6">
              {/* What and Why */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[var(--surface2)] border border-[var(--border)]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-2">
                    What It Is
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--text)] leading-relaxed">
                    {concept.what || concept.blurb}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[var(--surface2)] border border-[var(--border)]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--ok)] mb-2">
                    Why We Use It
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--text)] leading-relaxed">
                    {concept.why ||
                      "Critical for scaling out system throughput and preventing service degradation under heavy spikes."}
                  </p>
                </div>
              </div>

              {/* Variants Selector */}
              {concept.variants && concept.variants.length > 0 && (
                <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                  <div className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-3">
                    {concept.variantLabel ||
                      "Topological Variants & Implementations"}
                  </div>
                  <div className="detail-variants">
                    {concept.variants.map((variant, idx) => (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariant(idx)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedVariant === idx
                            ? "border-[var(--accent)] bg-[var(--surface)] shadow-sm"
                            : "border-[var(--border)] bg-[var(--surface2)]/60 hover:bg-[var(--surface2)]"
                        }`}
                      >
                        <div className="font-semibold text-xs sm:text-sm text-[var(--text)] mb-1">
                          {variant.label}
                        </div>
                        <div className="text-[11px] text-[var(--muted)] leading-tight">
                          {variant.note}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* How it works */}
              {concept.how && concept.how.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-[var(--text)] mb-3">
                    How It Operates in Production
                  </h4>
                  <div className="space-y-2">
                    {concept.how.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-xl bg-[var(--surface2)]/70 border border-[var(--border)]"
                      >
                        <span className="w-5 h-5 rounded-full flex items-center justify-center font-mono text-[11px] font-bold bg-[var(--accentSoft)] text-[var(--accent)] flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-xs sm:text-sm text-[var(--text)] leading-relaxed">
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trade-offs */}
              {concept.tradeoffs && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl border border-[var(--ok)]/30 bg-[var(--okSoft)]/20">
                    <h5 className="text-xs font-bold text-[var(--ok)] uppercase tracking-wider mb-2">
                      Advantages (Pros)
                    </h5>
                    <ul className="text-xs sm:text-sm text-[var(--text)] space-y-1.5 list-disc list-inside">
                      {concept.tradeoffs.pros.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-2xl border border-[var(--bad)]/30 bg-[var(--badSoft)]/20">
                    <h5 className="text-xs font-bold text-[var(--bad)] uppercase tracking-wider mb-2">
                      Trade-offs & Constraints (Cons)
                    </h5>
                    <ul className="text-xs sm:text-sm text-[var(--text)] space-y-1.5 list-disc list-inside">
                      {concept.tradeoffs.cons.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ALGORITHM DEEP DIVE */}
          {algorithm && (
            <div className="space-y-6">
              {/* Complexities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[var(--surface2)] border border-[var(--border)]">
                  <span className="text-xs text-[var(--muted)] font-medium">
                    Time Complexity
                  </span>
                  <div className="text-base sm:text-lg font-mono font-bold text-[var(--accent)] mt-1">
                    {algorithm.time}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-[var(--surface2)] border border-[var(--border)]">
                  <span className="text-xs text-[var(--muted)] font-medium">
                    Space Complexity
                  </span>
                  <div className="text-base sm:text-lg font-mono font-bold text-[var(--text)] mt-1">
                    {algorithm.space}
                  </div>
                </div>
              </div>

              {/* Interactive Execution Trace Simulator */}
              <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                    Visual Trace Simulation
                  </h4>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setAlgoStep(
                          (prev) => (prev + 1) % (algorithm.mini.length || 1),
                        )
                      }
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[var(--accent)] text-[var(--accentText)] cursor-pointer"
                    >
                      Step Forward
                    </button>
                    <button
                      type="button"
                      aria-label="Reset algorithm trace"
                      onClick={() => setAlgoStep(0)}
                      className="p-1 rounded-lg border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Bars */}
                <div className="detail-bars flex items-end justify-between gap-1 h-44 px-2 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                  {algorithm.mini?.map((val: number, idx: number) => {
                    const isFocus = idx === algoStep;
                    const maxVal = Math.max(...algorithm.mini, 1);
                    const h = Math.max(15, Math.round((val / maxVal) * 100));
                    return (
                      <div
                        key={idx}
                        className="min-w-0 flex-1 flex flex-col items-center gap-1.5 h-full justify-end"
                      >
                        <span className="text-[10px] font-mono text-[var(--muted)]">
                          {val}
                        </span>
                        <div
                          className="w-full rounded-sm transition-all duration-300"
                          style={{
                            height: `${h}%`,
                            backgroundColor: isFocus
                              ? "var(--accent)"
                              : "var(--border)",
                          }}
                        />
                        <span className="text-[9px] font-mono text-[var(--muted)]">
                          i={idx}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2 text-xs text-[var(--muted)] text-center">
                  Pointer active at index {algoStep}. Invariant holds across
                  partitions.
                </div>
              </div>
            </div>
          )}

          {/* COMPANY DEEP DIVE */}
          {company && (
            <div className="space-y-6">
              {/* Scale metrics */}
              {company.scale && company.scale.length > 0 && (
                <div className="detail-stats">
                  {company.scale.map((sc, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-[var(--surface2)] border border-[var(--border)]"
                    >
                      <div className="text-[11px] text-[var(--muted)] font-medium">
                        {sc.k}
                      </div>
                      <div className="text-sm sm:text-base font-bold text-[var(--accent)] mt-0.5">
                        {sc.v}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Products & Problems */}
              {company.products && company.products.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-[var(--text)] mb-3">
                    Flagship Products & Core Challenges
                  </h4>
                  <div className="detail-variants">
                    {company.products.map((prod, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)]"
                      >
                        <div className="font-semibold text-xs sm:text-sm text-[var(--text)] mb-1">
                          {prod.name}
                        </div>
                        <div className="text-xs text-[var(--muted)] leading-relaxed">
                          {prod.problem}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Takeaways */}
              {company.takeaways && company.takeaways.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-[var(--text)] mb-2">
                    Key Architectural Takeaways
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--muted)] list-disc list-inside">
                    {company.takeaways.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* CASE STUDY DEEP DIVE */}
          {caseStudy && (
            <div className="space-y-6">
              {/* Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[var(--surface2)] border border-[var(--border)]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-2">
                    Functional Requirements
                  </h4>
                  <ul className="text-xs sm:text-sm text-[var(--text)] space-y-1 list-disc list-inside">
                    {caseStudy.functional?.map((fn, i) => (
                      <li key={i}>{fn}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 rounded-2xl bg-[var(--surface2)] border border-[var(--border)]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--ok)] mb-2">
                    Non-Functional Requirements
                  </h4>
                  <ul className="text-xs sm:text-sm text-[var(--text)] space-y-1 list-disc list-inside">
                    {caseStudy.nonFunctional?.map((nfn, i) => (
                      <li key={i}>{nfn}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Capacity estimations */}
              {caseStudy.capacity && caseStudy.capacity.length > 0 && (
                <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-3">
                    Back-of-the-Envelope Capacity Estimations
                  </h4>
                  <div className="detail-stats">
                    {caseStudy.capacity.map((cap, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]"
                      >
                        <div className="text-[11px] text-[var(--muted)]">
                          {cap.k}
                        </div>
                        <div className="text-sm font-bold text-[var(--text)] mt-0.5">
                          {cap.v}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* API Design */}
              {caseStudy.api && caseStudy.api.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-[var(--text)] mb-3">
                    REST API Specifications
                  </h4>
                  <div className="space-y-2">
                    {caseStudy.api.map(
                      (
                        endpoint:
                          | [string, string, string]
                          | { method: string; path: string; desc: string },
                        i: number,
                      ) => {
                        const method = Array.isArray(endpoint)
                          ? endpoint[0]
                          : endpoint?.method;
                        const path = Array.isArray(endpoint)
                          ? endpoint[1]
                          : endpoint?.path;
                        const desc = Array.isArray(endpoint)
                          ? endpoint[2]
                          : endpoint?.desc;
                        return (
                          <div
                            key={i}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-[var(--surface2)] border border-[var(--border)] font-mono text-xs"
                          >
                            <div className="detail-endpoint">
                              <span className="px-2 py-0.5 rounded bg-[var(--accent)] text-[var(--accentText)] font-bold text-[10px]">
                                {method}
                              </span>
                              <span className="font-semibold text-[var(--text)]">
                                {path}
                              </span>
                            </div>
                            <span className="font-sans text-xs text-[var(--muted)]">
                              {desc}
                            </span>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
