import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { BlogArtwork } from "./BlogArtwork";
import { formatBlogDate, type BlogPost } from "@/data/blogs";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="blog-card sy-card min-w-0 h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      <Link
        href={`/blog/${post.id}`}
        className="blog-card-link group flex h-full flex-col !text-[var(--text)]"
      >
        <BlogArtwork post={post} />
        <div className="blog-card-body min-w-0 flex flex-1 flex-col">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs mb-3">
            <span className="font-semibold text-[var(--accent)]">
              {post.category}
            </span>
            <span className="text-[var(--muted)]">{post.level}</span>
          </div>
          <h3 className="blog-card-title text-xl font-bold tracking-tight leading-snug group-hover:text-[var(--accent)] transition-colors">
            {post.title}
          </h3>
          <p className="mt-3 mb-6 text-sm leading-relaxed text-[var(--muted)]">
            {post.excerpt}
          </p>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-[var(--border)] text-[11px] text-[var(--muted)]">
            <time dateTime={post.publishedAt}>
              {formatBlogDate(post.publishedAt)}
            </time>
            <span className="inline-flex flex-wrap items-center gap-1">
              <Clock size={12} />
              {post.readMinutes} min read
              <ArrowUpRight size={15} className="ml-2 text-[var(--accent)]" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
