import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/data/blogs";
import { BlogCard } from "@/components/blog/BlogCard";

export function BlogSection() {
  return (
    <section data-home-section="blog"
      aria-labelledby="home-blog-heading"
      className="sy-container site-section border-t border-[var(--border)]"
    >
      <div className="section-heading">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-1">
            Ideas behind the architecture
          </p>
          <h2
            id="home-blog-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight"
          >
            From the blog
          </h2>
          <p className="text-sm text-[var(--muted)] mt-2 max-w-xl">
            Practical deep dives into the decisions, patterns, and tradeoffs
            behind scalable systems.
          </p>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline self-start shrink-0"
        >
          View all 4 articles <ArrowRight size={14} />
        </Link>
      </div>
      <div className="blog-home-grid">
        {BLOG_POSTS.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
