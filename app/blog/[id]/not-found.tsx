import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogNotFound() {
  return (
    <div className="blog-not-found sy-container text-center">
      <p className="font-mono text-sm text-[var(--accent)] mb-4">
        404 / ARTICLE NOT FOUND
      </p>
      <h1 className="text-3xl font-bold tracking-tight">
        This page is still a blank canvas.
      </h1>
      <p className="text-[var(--muted)] mt-4">
        The article may have moved, or this link may be incorrect. There’s more
        to explore in the blog.
      </p>
      <Link
        href="/blog"
        className="min-h-11 inline-flex items-center gap-2 mt-8 text-sm font-semibold"
      >
        <ArrowLeft size={15} />
        Browse all articles
      </Link>
    </div>
  );
}
