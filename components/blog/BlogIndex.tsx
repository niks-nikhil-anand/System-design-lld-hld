"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Search } from "lucide-react";
import { BLOG_POSTS, formatBlogDate } from "@/data/blogs";
import { BlogArtwork } from "./BlogArtwork";
import { BlogCard } from "./BlogCard";

const categories = [
  "All articles",
  ...new Set(BLOG_POSTS.map((post) => post.category)),
];

export function BlogIndex() {
  const [category, setCategory] = useState("All articles");
  const [query, setQuery] = useState("");
  const featured = BLOG_POSTS[0];
  const posts = BLOG_POSTS.filter(
    (post) =>
      (category === "All articles" || post.category === category) &&
      [post.title, post.excerpt, post.category, ...post.tags]
        .join(" ")
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <div className="blog-page sy-container">
      <header className="blog-intro">
        <Link
          href="/"
          className="blog-back-link inline-flex items-center gap-2 !text-[var(--muted)] hover:!text-[var(--accent)]"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>
        <div className="blog-intro-grid">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)] mb-3">
              The System Design Mate blog
            </p>
            <h1 className="blog-index-title font-bold tracking-tight">
              Good systems start with better questions.
            </h1>
          </div>
          <p className="blog-intro-description text-[var(--muted)]">
            Field notes on building systems that scale. Explore practical
            patterns, thoughtful tradeoffs, and the ideas behind the diagrams.
          </p>
        </div>
      </header>
      <section aria-label="Featured article">
        <Link
          href={`/blog/${featured.id}`}
          className="blog-featured sy-card group grid rounded-2xl border border-[var(--border)] overflow-hidden bg-[var(--surface)] !text-[var(--text)]"
        >
          <BlogArtwork post={featured} large />
          <div className="blog-featured-copy flex flex-col justify-center">
            <p className="text-[11px] uppercase tracking-wider font-semibold text-[var(--accent)] mb-4">
              Featured article · {featured.category}
            </p>
            <h2 className="blog-featured-title font-bold tracking-tight leading-tight group-hover:text-[var(--accent)]">
              {featured.title}
            </h2>
            <p className="text-base text-[var(--muted)] leading-relaxed mt-4">
              {featured.excerpt}
            </p>
            <p className="text-xs text-[var(--muted)] mt-6">
              {formatBlogDate(featured.publishedAt)} · {featured.readMinutes}{" "}
              min read
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] mt-5">
              Read the story <ArrowUpRight size={16} />
            </span>
          </div>
        </Link>
      </section>
      <section
        aria-labelledby="articles-heading"
        className="blog-articles-section"
      >
        <div className="blog-search-heading">
          <h2
            id="articles-heading"
            className="text-2xl font-bold tracking-tight"
          >
            All articles{" "}
            <span className="text-sm font-normal text-[var(--muted)]">
              / {String(BLOG_POSTS.length).padStart(2, "0")}
            </span>
          </h2>
          <label className="blog-search-field flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3">
            <Search size={16} className="text-[var(--muted)] shrink-0" />
            <span className="sr-only">Search blog articles</span>
            <input
              type="search"
              placeholder="Search articles…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="min-w-0 w-full bg-transparent text-base outline-none"
            />
          </label>
        </div>
        <div
          role="group"
          aria-label="Filter by topic"
          className="blog-topic-filters flex flex-wrap gap-2 mb-7"
        >
          {categories.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={category === value}
              onClick={() => setCategory(value)}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium cursor-pointer transition-colors ${category === value ? "border-[var(--accent)] bg-[var(--accentSoft)] text-[var(--accent)]" : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)]"}`}
            >
              {value}
            </button>
          ))}
        </div>
        <p
          role="status"
          className="blog-search-status text-sm text-[var(--muted)] mb-5"
        >
          {posts.length} {posts.length === 1 ? "article" : "articles"}
          {query.trim() ? ` matching “${query.trim()}”` : " to explore"}
        </p>
        {posts.length ? (
          <div className="blog-index-grid">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="blog-empty-state text-center py-12 px-4 border border-dashed border-[var(--border)] rounded-2xl">
            <h3 className="text-lg font-semibold">No articles found</h3>
            <p className="text-sm text-[var(--muted)] mt-2">
              Try a different topic or search term.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory("All articles");
                setQuery("");
              }}
              className="min-h-11 mt-5 text-sm font-semibold text-[var(--accent)] cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
      <aside className="blog-learning-cta rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        <div>
          <h2 className="text-lg font-bold tracking-tight">
            Turn the reading into understanding.
          </h2>
          <p className="text-sm text-[var(--muted)] mt-1">
            Explore the concepts behind these articles with interactive
            diagrams.
          </p>
        </div>
        <Link
          href="/#/concepts"
          className="blog-cta-link inline-flex items-center justify-center gap-2 text-sm font-semibold shrink-0"
        >
          Explore concepts <ArrowUpRight size={16} />
        </Link>
      </aside>
    </div>
  );
}
