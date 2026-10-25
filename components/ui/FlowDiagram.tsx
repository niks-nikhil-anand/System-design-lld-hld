import type { LucideIcon } from "lucide-react";

export interface FlowNode {
  label: string;
  detail?: string;
  icon?: LucideIcon;
  x: number;
  y: number;
  compactX: number;
  compactY: number;
}

interface Props {
  nodes: FlowNode[];
  edges: [number, number][];
  activeNode: number;
  variant: "hero" | "playground";
  label: string;
}

// Each arrangement shares its coordinates between nodes, edges, and packet.
// Container queries choose by available diagram width, including split layouts.
export function FlowDiagram({
  nodes,
  edges,
  activeNode,
  variant,
  label,
}: Props) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`${variant === "hero" ? "hero-diagram" : "playground-canvas"} select-none`}
    >
      {(["compact", "wide"] as const).map((arrangement) => {
        const compact = arrangement === "compact";
        const positions = nodes.map((node) => ({
          ...node,
          x: compact ? node.compactX : node.x,
          y: compact ? node.compactY : node.y,
        }));
        const active = positions[activeNode];
        return (
          <div
            key={arrangement}
            aria-hidden="true"
            className={`relative w-full h-full ${variant === "hero" ? `hero-diagram-${arrangement}` : `playground-${arrangement}`}`}
          >
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {edges.map(([from, to]) => (
                <line
                  key={`${from}-${to}`}
                  x1={`${positions[from].x}%`}
                  y1={`${positions[from].y}%`}
                  x2={`${positions[to].x}%`}
                  y2={`${positions[to].y}%`}
                  stroke={activeNode === to ? "var(--accent)" : "var(--border)"}
                  strokeWidth={activeNode === to ? 2.5 : 1.5}
                  strokeDasharray={activeNode === to ? "4 3" : undefined}
                />
              ))}
            </svg>
            {positions.map((node, index) => {
              const Icon = node.icon;
              return (
                <div
                  key={node.label}
                  data-flow-node
                  className={`flow-node ${variant === "hero" ? "flow-node-hero" : ""} ${activeNode === index ? "flow-node-active" : ""}`}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  {Icon && <Icon size={16} className="mb-1 shrink-0" />}
                  <span className="font-semibold">{node.label}</span>
                  {node.detail && (
                    <span className="text-[10px] font-mono text-[var(--muted)] mt-1">
                      {node.detail}
                    </span>
                  )}
                </div>
              );
            })}
            {active && (
              <div
                className="flow-packet"
                style={{ left: `${active.x}%`, top: `${active.y}%` }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
