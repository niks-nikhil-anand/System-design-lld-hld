"use client";

import type { CSSProperties } from "react";
import type {
  PlaygroundTemplate,
  PlaygroundTemplateId,
} from "@/data/playground";

interface Props {
  template: PlaygroundTemplate;
  templateId: PlaygroundTemplateId;
  activeNodeId: string;
  selectedNode: string;
  onSelectNode: (id: string) => void;
}

export function TopologyCanvas({
  template,
  templateId,
  activeNodeId,
  selectedNode,
  onSelectNode,
}: Props) {
  const edges: [number, number][] =
    templateId === "web"
      ? [
          [0, 1],
          [1, 2],
          [2, 3],
          [3, 4],
          [3, 5],
        ]
      : templateId === "event"
        ? [
            [0, 1],
            [1, 2],
            [2, 3],
            [2, 4],
          ]
        : [
            [0, 1],
            [1, 2],
            [2, 3],
          ];
  const compactPositions =
    templateId === "web"
      ? [
          [50, 10],
          [50, 28],
          [50, 46],
          [50, 64],
          [25, 86],
          [75, 86],
        ]
      : templateId === "event"
        ? [
            [50, 12],
            [50, 34],
            [50, 56],
            [25, 84],
            [75, 84],
          ]
        : [
            [50, 12],
            [50, 36],
            [50, 60],
            [50, 84],
          ];
  return (
    <div
      className="pg-topology"
      role="group"
      aria-label="Interactive architecture diagram"
    >
      <div
        className="pg-diagram"
        style={
          {
            "--pg-height":
              templateId === "web"
                ? "520px"
                : templateId === "event"
                  ? "460px"
                  : "400px",
          } as CSSProperties
        }
      >
        {(["compact", "wide"] as const).map((arrangement) => {
          const nodes = template.nodes.map((node, index) => ({
            ...node,
            x: arrangement === "compact" ? compactPositions[index][0] : node.x,
            y: arrangement === "compact" ? compactPositions[index][1] : node.y,
          }));
          const active =
            nodes.find((node) => node.id === activeNodeId) || nodes[0];
          return (
            <div
              key={arrangement}
              className={`pg-arrangement pg-arrangement--${arrangement}`}
            >
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                aria-hidden="true"
              >
                {edges.map(([from, to]) => (
                  <line
                    key={`${from}-${to}`}
                    x1={`${nodes[from].x}%`}
                    y1={`${nodes[from].y}%`}
                    x2={`${nodes[to].x}%`}
                    y2={`${nodes[to].y}%`}
                    stroke={
                      nodes[to].id === activeNodeId
                        ? "var(--accent)"
                        : "var(--border)"
                    }
                    strokeWidth={nodes[to].id === activeNodeId ? 2.5 : 1.5}
                  />
                ))}
              </svg>
              {nodes.map((node) => (
                <button
                  key={node.id}
                  type="button"
                  data-topology-node
                  aria-label={`Inspect ${node.name}`}
                  aria-pressed={selectedNode === node.id}
                  onClick={() => onSelectNode(node.id)}
                  className={`pg-node ${selectedNode === node.id ? "pg-node-selected" : ""} ${activeNodeId === node.id ? "pg-node-active" : ""}`}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <span className="pg-node-type">{node.type}</span>
                  <span className="pg-node-title">{node.name}</span>
                </button>
              ))}
              <div
                aria-hidden="true"
                className="pg-packet"
                style={{ left: `${active.x}%`, top: `${active.y}%` }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
