"use client";

import React from "react";
import { FAQS } from "@/data/faqs";
import { ChevronRight, HelpCircle } from "lucide-react";

export function FaqSection() {
  return (
    <section
      id="faq"
      className="sy-container site-section faq-section border-t border-[var(--border)]"
    >
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--surface2)] text-xs font-semibold text-[var(--accent)] mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Knowledge & Methodology</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text)]">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-[var(--muted)] mt-2">
          Everything you need to know about the simulations, models, and how to
          get the most out of Systemly.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {FAQS.map((faq, idx) => (
          <details
            key={idx}
            className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5 transition-all overflow-hidden"
          >
            <summary className="flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[var(--text)] select-none cursor-pointer">
              <span>{faq.q}</span>
              <span className="p-1 rounded-md text-[var(--muted)] group-open:rotate-90 transition-transform duration-200 flex-shrink-0">
                <ChevronRight className="w-4 h-4 sy-chev" />
              </span>
            </summary>
            <div className="mt-3 text-xs sm:text-sm text-[var(--muted)] leading-relaxed border-t border-[var(--border)]/60 pt-3">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
