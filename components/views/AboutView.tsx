"use client";

import React from "react";
import { Info, ShieldCheck, FileText, ArrowLeft } from "lucide-react";

interface AboutViewProps {
  onBackToHome?: () => void;
}

export function AboutView({ onBackToHome }: AboutViewProps) {
  return (
    <div className="app-view about-view sy-container">
      {onBackToHome && (
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--text)] transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>
      )}

      <div className="about-card rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-md space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text)] mb-3">
            About System Design Mate
          </h1>
          <p className="text-base text-[var(--muted)] leading-relaxed">
            System Design Mate is an educational platform designed to build deep intuition
            for distributed systems, backend engineering architectures, and
            scalable data pipelines through interactive visual models.
          </p>
        </div>

        {/* Content Notes */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-[var(--accent)]" />
            <h2
              id="content-notes"
              className="text-xl font-bold text-[var(--text)]"
            >
              Content Notes & Educational Models
            </h2>
          </div>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            Company pages present simplified educational models assembled from
            public engineering talks, conference papers, and engineering blog
            posts. They are not verified descriptions of any company’s internal
            systems, and no company listed endorses or is affiliated with
            System Design Mate. Company names appear as plain text for identification
            only.
          </p>
        </div>

        {/* Privacy */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[var(--ok)]" />
            <h2 id="privacy" className="text-xl font-bold text-[var(--text)]">
              Privacy & Local Storage
            </h2>
          </div>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            This prototype operates entirely client-side. Bookmarks, learned
            topics, recent searches, and your theme choice are stored in your
            browser’s local storage and never leave your device. Clearing site
            data removes them.
          </p>
        </div>

        {/* Terms */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[var(--accent)]" />
            <h2 id="terms" className="text-xl font-bold text-[var(--text)]">
              Terms of Use
            </h2>
          </div>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            System Design Mate is provided free for learning and interview preparation.
            Content is structured to reflect common high-level design interview
            scenarios and industry standards.
          </p>
        </div>
      </div>
    </div>
  );
}
