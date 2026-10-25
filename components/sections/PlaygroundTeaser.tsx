"use client";

import { useEffect, useState } from "react";
import {
  Play,
  Pause,
  ArrowRight,
  Layers,
  Box,
  Cpu,
  Database,
  HardDrive,
} from "lucide-react";
import { FlowDiagram } from "@/components/ui/FlowDiagram";
import { useVisibleAnimation } from "@/hooks/useVisibleAnimation";

export function PlaygroundTeaser({
  onOpenPlayground,
}: {
  onOpenPlayground: () => void;
}) {
  const [hop, setHop] = useState(0);
  const [playing, setPlaying] = useState(true);
  const {
    ref: animationRef,
    active: animationActive,
    reducedMotion,
  } = useVisibleAnimation();
  const nodes = [
    { label: "Client", x: 10, y: 50, compactX: 50, compactY: 9, icon: Box },
    {
      label: "CDN edge",
      x: 28,
      y: 50,
      compactX: 50,
      compactY: 27,
      icon: HardDrive,
    },
    {
      label: "Load balancer",
      x: 46,
      y: 50,
      compactX: 50,
      compactY: 45,
      icon: Layers,
    },
    {
      label: "API server",
      x: 64,
      y: 50,
      compactX: 50,
      compactY: 63,
      icon: Cpu,
    },
    {
      label: "Cache (Redis)",
      x: 88,
      y: 25,
      compactX: 25,
      compactY: 85,
      icon: Layers,
    },
    {
      label: "Database (SQL)",
      x: 88,
      y: 75,
      compactX: 75,
      compactY: 85,
      icon: Database,
    },
  ];
  useEffect(() => {
    if (!animationActive || !playing) return;
    const timer = setInterval(
      () => setHop((previous) => (previous + 1) % 6),
      950,
    );
    return () => clearInterval(timer);
  }, [animationActive, playing]);
  return (
    <section className="sy-container site-section border-t border-[var(--border)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center p-4 sm:p-6 lg:p-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-md">
        <div className="lg:col-span-5 min-w-0 flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-[var(--border)] bg-[var(--surface2)] text-xs font-medium text-[var(--accent)] self-start">
            <Play size={14} className="shrink-0" />
            <span>Interactive Architecture Sandbox</span>
          </div>
          <h2 className="font-bold tracking-tight">
            Design &amp; test custom topologies
          </h2>
          <p className="text-base text-[var(--muted)] leading-relaxed max-w-xl">
            Drag components onto an infinite canvas, wire up requests, caches,
            and queues, and simulate traffic spikes to observe bottlenecks and
            failover modes in real time.
          </p>
          <button
            type="button"
            onClick={onOpenPlayground}
            className="sy-primary w-full sm:w-auto self-start inline-flex justify-center items-center gap-2 px-4 py-3 min-h-11 rounded-xl text-sm font-semibold text-[var(--accentText)] bg-[var(--accent)] cursor-pointer"
          >
            <span>Launch full playground</span>
            <ArrowRight size={16} className="shrink-0" />
          </button>
        </div>
        <div
          ref={animationRef}
          className="lg:col-span-7 min-w-0 playground-diagram rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-2 sm:p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 px-2">
            <span className="text-xs font-medium text-[var(--muted)]">
              Request journey
            </span>
            <button
              type="button"
              disabled={reducedMotion}
              onClick={() => setPlaying((value) => !value)}
              aria-label={
                playing
                  ? "Pause architecture animation"
                  : "Play architecture animation"
              }
              className="sy-icon-button disabled:opacity-40"
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </button>
          </div>
          <FlowDiagram
            variant="playground"
            nodes={nodes}
            edges={[
              [0, 1],
              [1, 2],
              [2, 3],
              [3, 4],
              [3, 5],
            ]}
            activeNode={hop}
            label="A client connects through a CDN and load balancer to an API server, which accesses a cache or database."
          />
          <p className="text-xs font-mono text-[var(--muted)] px-2 pb-2">
            {reducedMotion
              ? "Reduced motion: static preview"
              : `Trace hop: ${nodes[hop].label}`}
          </p>
        </div>
      </div>
    </section>
  );
}
