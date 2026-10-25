"use client";
import type { ContentData } from "@/lib/admin/config";
type Node = { id: string; name: string; type: string; x: number; y: number };
export function TopologyPreview({ data }: { data: ContentData }) {
  if (!Array.isArray(data.nodes) || !Array.isArray(data.flow)) return null;
  const nodes = data.nodes.filter(
    (n): n is Node =>
      n &&
      typeof n.id === "string" &&
      typeof n.name === "string" &&
      typeof n.x === "number" &&
      typeof n.y === "number",
  );
  const flow = (data.flow as string[])
    .map((id) => nodes.find((n) => n.id === id))
    .filter((n): n is Node => !!n);
  if (!nodes.length) return null;
  const x = (n: Node) => 80 + n.x * 6.4;
  const y = (n: Node) => 50 + n.y * 2.4;
  return (
    <section>
      <h3>Request flow preview</h3>
      <div className="cms-topology">
        <svg
          viewBox="0 0 800 360"
          role="img"
          aria-label="Architecture nodes connected in request flow order"
        >
          <title>{String(data.name || "Architecture request flow")}</title>
          {flow.slice(1).map((node, i) => (
            <line
              key={`${node.id}:${i}`}
              x1={x(flow[i])}
              y1={y(flow[i])}
              x2={x(node)}
              y2={y(node)}
              stroke="var(--accent)"
              strokeWidth="2"
              strokeDasharray="5 5"
            />
          ))}
          {nodes.map((node) => (
            <g key={node.id}>
              <rect
                x={x(node) - 62}
                y={y(node) - 28}
                width="124"
                height="56"
                rx="10"
                fill="var(--surface)"
                stroke="var(--border)"
              />
              <text
                x={x(node)}
                y={y(node) - 5}
                textAnchor="middle"
                fill="var(--accent)"
                fontSize="10"
              >
                {node.type}
              </text>
              <text
                x={x(node)}
                y={y(node) + 13}
                textAnchor="middle"
                fill="var(--text)"
                fontSize="11"
              >
                {node.name.length > 19
                  ? `${node.name.slice(0, 18)}…`
                  : node.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}
