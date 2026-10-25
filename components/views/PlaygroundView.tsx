"use client";

import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  SkipForward,
  ArrowDown,
} from "lucide-react";
import {
  PLAYGROUND_TEMPLATES,
  type PlaygroundTemplateId,
} from "@/data/playground";
import { TopologyCanvas } from "@/components/playground/TopologyCanvas";
import { useVisibleAnimation } from "@/hooks/useVisibleAnimation";

export function PlaygroundView() {
  const [selectedTemplate, setSelectedTemplate] =
    useState<PlaygroundTemplateId>("web");
  const [trafficRate, setTrafficRate] = useState<"low" | "med" | "high">("med");
  const [playing, setPlaying] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedNode, setSelectedNode] = useState("lb");
  const {
    ref: canvasRef,
    active: animationActive,
    reducedMotion,
  } = useVisibleAnimation();
  const template = PLAYGROUND_TEMPLATES[selectedTemplate];
  const activeNodeId = template.flow[activeStep % template.flow.length];
  const inspectedNode =
    template.nodes.find((node) => node.id === selectedNode) ||
    template.nodes[0];
  useEffect(() => {
    if (!playing || !animationActive) return;
    const timer = setInterval(
      () => setActiveStep((step) => (step + 1) % template.flow.length),
      trafficRate === "high" ? 450 : trafficRate === "med" ? 700 : 1000,
    );
    return () => clearInterval(timer);
  }, [playing, animationActive, trafficRate, template]);
  return (
    <div className="app-view playground-view sy-container">
      <header className="view-heading pg-heading">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-2">
            <Sparkles size={15} className="shrink-0" />
            Interactive simulator
          </p>
          <h1 className="font-bold tracking-tight">System design playground</h1>
          <p className="text-base text-[var(--muted)] mt-3 max-w-2xl leading-relaxed">
            Explore architecture templates, follow request flows, and inspect
            the role of each component.
          </p>
        </div>
        <div
          role="group"
          aria-label="Architecture template"
          className="pg-templates"
        >
          {(
            [
              { id: "web", label: "Web tier" },
              { id: "event", label: "Event driven" },
              { id: "edge", label: "Edge global" },
            ] as const
          ).map((option) => (
            <button
              type="button"
              key={option.id}
              aria-pressed={selectedTemplate === option.id}
              onClick={() => {
                setSelectedTemplate(option.id);
                setActiveStep(0);
                setSelectedNode(PLAYGROUND_TEMPLATES[option.id].nodes[0].id);
              }}
              className={
                selectedTemplate === option.id ? "pg-template-selected" : ""
              }
            >
              {option.label}
            </button>
          ))}
        </div>
      </header>
      <div className="pg-workspace">
        <div className="pg-main">
          <section
            ref={canvasRef}
            aria-label="Architecture simulation"
            className="pg-canvas-panel rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
          >
            <div className="mb-4">
              <h2 className="text-xl font-bold tracking-tight">
                {template.name}
              </h2>
              <p className="text-sm leading-relaxed text-[var(--muted)] mt-2">
                {template.desc}
              </p>
            </div>
            <div className="pg-controls border-y border-[var(--border)] py-3">
              <div role="group" aria-label="Traffic load" className="pg-load">
                <span className="text-sm text-[var(--muted)]">Load</span>
                {(["low", "med", "high"] as const).map((rate) => (
                  <button
                    type="button"
                    key={rate}
                    aria-pressed={trafficRate === rate}
                    onClick={() => setTrafficRate(rate)}
                    className={
                      trafficRate === rate ? "pg-template-selected" : ""
                    }
                  >
                    {rate === "med"
                      ? "Medium"
                      : rate === "low"
                        ? "Low"
                        : "High"}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  disabled={reducedMotion}
                  onClick={() => setPlaying((value) => !value)}
                  aria-label={playing ? "Pause simulation" : "Play simulation"}
                  className="sy-icon-button border border-[var(--border)] disabled:opacity-40"
                >
                  {playing ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPlaying(false);
                    setActiveStep((step) => (step + 1) % template.flow.length);
                  }}
                  aria-label="Step simulation forward"
                  className="sy-icon-button border border-[var(--border)]"
                >
                  <SkipForward size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(0)}
                  aria-label="Reset simulation trace"
                  className="sy-icon-button border border-[var(--border)]"
                >
                  <RotateCcw size={18} />
                </button>
              </div>
            </div>
            <TopologyCanvas
              template={template}
              templateId={selectedTemplate}
              activeNodeId={activeNodeId}
              selectedNode={selectedNode}
              onSelectNode={setSelectedNode}
            />
            <p className="text-xs text-[var(--muted)] mb-3">
              {reducedMotion
                ? "Reduced motion enabled. Use Step to follow the flow."
                : "Load changes the speed of this illustrative request flow."}
            </p>
            <div className="pg-selection-summary border-t border-[var(--border)] pt-3">
              <p role="status" className="text-sm text-[var(--muted)]">
                Selected:{" "}
                <strong className="text-[var(--text)]">
                  {inspectedNode.name}
                </strong>
              </p>
              <button
                type="button"
                className="pg-inspector-link"
                onClick={() => {
                  const inspector = document.getElementById(
                    "component-inspector",
                  );
                  inspector?.scrollIntoView({
                    block: "start",
                    behavior: "smooth",
                  });
                  inspector?.focus({ preventScroll: true });
                }}
              >
                Component details <ArrowDown size={14} />
              </button>
            </div>
          </section>
          <section aria-label="Template metrics" className="pg-metrics">
            <div className="pg-metric">
              <p className="text-sm text-[var(--muted)]">
                Template latency (p99)
              </p>
              <p className="pg-metric-value text-[var(--ok)]">{template.p99}</p>
            </div>
            <div className="pg-metric">
              <p className="text-sm text-[var(--muted)]">Template throughput</p>
              <p className="pg-metric-value text-[var(--accent)]">
                {template.qps}
              </p>
            </div>
            <div className="pg-metric">
              <p className="text-sm text-[var(--muted)]">Failover status</p>
              <p className="pg-metric-value text-[var(--ok)] flex flex-wrap items-center gap-2">
                <CheckCircle2 size={18} className="shrink-0" />
                Healthy
              </p>
            </div>
          </section>
        </div>
        <aside className="pg-sidebar">
          <section
            id="component-inspector"
            tabIndex={-1}
            className="pg-inspector rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
          >
            <h2 className="text-lg font-bold flex items-center gap-2 border-b border-[var(--border)] pb-3 mb-5">
              <Sliders size={18} className="text-[var(--accent)] shrink-0" />
              Component inspector
            </h2>
            <p className="text-xs font-mono uppercase text-[var(--accent)] mb-2">
              {inspectedNode.type}
            </p>
            <h3 className="text-xl font-semibold mb-3">{inspectedNode.name}</h3>
            <p className="text-base leading-relaxed text-[var(--muted)] mb-5">
              {inspectedNode.desc}
            </p>
            <dl className="pg-inspector-properties rounded-xl border border-[var(--border)] bg-[var(--surface2)] p-4">
              <div>
                <dt>Status</dt>
                <dd>Active &amp; healthy</dd>
              </div>
              <div>
                <dt>Scaling</dt>
                <dd>Horizontal</dd>
              </div>
              <div>
                <dt>Resilience</dt>
                <dd>Multi-AZ replicated</dd>
              </div>
            </dl>
          </section>
          <section className="pg-inspector rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <h2 className="text-sm font-bold text-[var(--warn)] flex items-start gap-2 mb-3">
              <AlertTriangle size={18} className="shrink-0" />
              Example bottleneck
            </h2>
            <p className="text-base leading-relaxed text-[var(--muted)]">
              {template.bottleneck}. Explore buffering, replication, and
              capacity limits when evaluating this design.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
