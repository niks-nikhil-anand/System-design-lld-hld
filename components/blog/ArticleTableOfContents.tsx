import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import type { BlogSection } from "@/data/blogs";

export function ArticleTableOfContents({
  sections,
}: {
  sections: BlogSection[];
}) {
  const links = (
    <ol>
      {sections.map((section, index) => (
        <li key={section.id}>
          <a href={`#${section.id}`} className="post-toc-link">
            <span
              aria-hidden="true"
              className="font-mono text-xs opacity-60 shrink-0"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{section.title}</span>
          </a>
        </li>
      ))}
    </ol>
  );
  return (
    <aside className="post-toc">
      <details className="post-toc-mobile rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        <summary className="flex items-center justify-between gap-3 p-4 font-semibold text-sm cursor-pointer">
          <span>
            In this article{" "}
            <span className="font-normal text-[var(--muted)]">
              · {sections.length} sections
            </span>
          </span>
          <ChevronDown
            size={17}
            className="post-toc-chevron shrink-0 text-[var(--muted)]"
          />
        </summary>
        <nav aria-label="Table of contents" className="px-3 pb-3">
          {links}
        </nav>
      </details>
      <nav
        aria-label="Table of contents"
        className="post-toc-desktop rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
      >
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-3">
          In this article
        </h2>
        {links}
        <div className="mt-4 pt-4 border-t border-[var(--border)] text-xs text-[var(--muted)]">
          Part of the System Design Mate field notes.
          <Link
            href="/#/learning-paths"
            className="min-h-11 flex items-center gap-1 font-medium"
          >
            Keep learning <ArrowUpRight size={13} className="shrink-0" />
          </Link>
        </div>
      </nav>
    </aside>
  );
}
