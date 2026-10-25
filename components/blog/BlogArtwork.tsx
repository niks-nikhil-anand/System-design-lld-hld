import {
  ArrowDown,
  ArrowRight,
  Database,
  Layers,
  Network,
  Timer,
} from "lucide-react";
import type { BlogPost } from "@/data/blogs";

const themes = {
  Caching: {
    color: "var(--accent)",
    background: "var(--accentSoft)",
    Icon: Database,
    number: "01",
  },
  Traffic: {
    color: "var(--info)",
    background: "var(--infoSoft)",
    Icon: Timer,
    number: "02",
  },
  Messaging: {
    color: "var(--ok)",
    background: "var(--okSoft)",
    Icon: Network,
    number: "03",
  },
  Databases: {
    color: "var(--warn)",
    background: "var(--warnSoft)",
    Icon: Layers,
    number: "04",
  },
};

export function BlogArtwork({
  post,
  large = false,
}: {
  post: BlogPost;
  large?: boolean;
}) {
  const { color, background, Icon, number } = themes[post.category];
  return (
    <div
      className={`blog-artwork relative overflow-hidden flex flex-col justify-between p-5 sm:p-7 ${large ? "min-h-[280px] sm:min-h-[320px]" : "min-h-[210px]"}`}
      style={{ color, background }}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.18em]">
        <span className="flex items-center gap-2">
          <Icon size={15} /> Systemly field notes
        </span>
        <span>/{number}</span>
      </div>
      <div className="relative py-6">
        <div className="blog-art-flow">
          {post.diagram.nodes.map((node, index) => (
            <div key={node} className="contents">
              {index > 0 && (
                <ArrowRight
                  size={14}
                  className="blog-art-arrow shrink-0 opacity-60"
                />
              )}
              <div className="blog-art-node rounded-lg border border-current/20 bg-[var(--surface)]/75 font-mono text-center shadow-sm">
                {node}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-1 mt-3 opacity-65">
          <ArrowDown size={14} />
          <span className="text-[9px] font-mono uppercase tracking-widest">
            Architecture, explained
          </span>
        </div>
      </div>
      <div className="text-xs sm:text-sm font-medium tracking-tight">
        {post.diagram.label}
      </div>
    </div>
  );
}
