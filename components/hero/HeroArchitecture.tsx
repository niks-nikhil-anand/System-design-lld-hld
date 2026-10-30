"use client";

import { useEffect, useState } from "react";
import { ChevronRight, Database, Layers3, Laptop, Network, Pause, Play, Server } from "lucide-react";
import { useVisibleAnimation } from "@/hooks/useVisibleAnimation";
import { styles } from "./styles";
import "./hero.css";

const steps = ["Client sends request", "Load balancer routes to server", "Cache lookup (miss)", "Query database", "Response returned to client"];
const timings = [12, 8, 24, 68, 12];
const tabs = ["Diagram", "Request Flow", "Code"] as const;
type Tab = typeof tabs[number];
const nodes = [
  { name: "Client", detail: "Browser / App", x: 8, y: 50, Icon: Laptop },
  { name: "Load Balancer", detail: "Layer 7", x: 27, y: 50, Icon: Layers3 },
  { name: "Application Server", detail: "Auto Scaling", x: 55, y: 19, Icon: Server },
  { name: "Application Server", detail: "Auto Scaling", x: 55, y: 50, Icon: Server },
  { name: "Application Server", detail: "Auto Scaling", x: 55, y: 81, Icon: Server },
  { name: "Cache", detail: "Redis", x: 87, y: 19, Icon: Layers3 },
  { name: "Database", detail: "PostgreSQL", x: 87, y: 50, Icon: Database },
  { name: "Message Queue", detail: "Kafka", x: 87, y: 81, Icon: Network },
];
export function HeroArchitecture({ onSearchQuery }: { onSearchQuery: (query: string) => void }) {
  const { ref, active, reducedMotion } = useVisibleAnimation();
  const [playing, setPlaying] = useState(true);
  const [step, setStep] = useState(0);
  const [tab, setTab] = useState<Tab>("Diagram");
  const running = playing && active;
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setStep((value) => (value + 1) % steps.length), 1200);
    return () => clearInterval(timer);
  }, [running]);
  return <div ref={ref} className={styles.scene}>
    <div className={styles.companies}>{["Google", "Netflix", "Uber"].map((name) => <button key={name} type="button" onClick={() => onSearchQuery(name)} className={styles[name.toLowerCase() as "google" | "netflix" | "uber"]}>{name === "Google" ? <span>{[...name].map((letter, i) => <span key={i} style={{ color: ["#4285f4", "#ea4335", "#fbbc05", "#4285f4", "#34a853", "#ea4335"][i] }}>{letter}</span>)}</span> : name}</button>)}<span className={styles.more}>•••</span></div>
    <div className={styles.caseCard}><strong>Real-world case studies</strong>{["Google", "Netflix", "Uber"].map((name) => <button key={name} type="button" onClick={() => onSearchQuery(name)}><b className={styles[name.toLowerCase() as "google" | "netflix" | "uber"]}>{name[0]}</b>{name}<ChevronRight size={15} /></button>)}</div>
    <div className={styles.panel}>
      <div className={styles.toolbar}><span className={styles.dots} aria-hidden="true"><i /><i /><i /></span><div className={styles.tabs} aria-label="Architecture views">{tabs.map((name) => <button key={name} type="button" aria-pressed={tab === name} onClick={() => setTab(name)}>{name}</button>)}</div><button type="button" className={styles.animate} disabled={reducedMotion} onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause traffic simulation" : "Play traffic simulation"}>{playing && !reducedMotion ? <Pause size={13} /> : <Play size={13} />}{reducedMotion ? "Static" : playing ? "Pause" : "Animate"}</button></div>
      {tab === "Diagram" ? <div className={styles.diagram} role="img" aria-label="Client connects through a load balancer to three application servers, with Redis cache, PostgreSQL database, and Kafka message queue.">
        <svg viewBox="0 0 700 250" preserveAspectRatio="none" aria-hidden="true" className={running ? styles.running : undefined}><g fill="none" strokeWidth="2"><path d="M 80 125 H 190 M 210 125 H 280 Q 290 125 290 115 V 58 Q 290 48 305 48 H 385 M 290 125 H 385 M 290 125 V 192 Q 290 202 305 202 H 385" stroke="#25d5ff" /><path d="M 420 48 H 510 Q 520 48 520 58 V 192 Q 520 202 535 202 H 609 M 420 125 H 609 M 420 202 H 510 Q 520 202 520 192 V 58 Q 520 48 535 48 H 609" stroke="#ffad68" /></g></svg>
        {nodes.map(({ name, detail, x, y, Icon }, index) => <div key={`${name}-${index}`} className={`${styles.node} ${index < 2 ? styles.entryNode : ""} ${index === [0, 1, 5, 6, 3][step] ? styles.activeNode : ""}`} style={{ left: `${x}%`, top: `${y}%` }}><Icon size={27} /><span><strong>{name}</strong><small>{detail}</small></span></div>)}
      </div> : tab === "Request Flow" ? <ol className={styles.flowView}>{steps.map((label, index) => <li key={label} data-active={step === index}><span>{index + 1}</span>{label}<small>{timings[index]} ms</small></li>)}</ol> : <pre className={styles.code}><code>{`// Illustrative cache-aside request flow\nasync function handleRequest(key) {\n  const cached = await redis.get(key);\n  if (cached) return cached;\n\n  const result = await database.find(key);\n  await redis.set(key, result, { ttl: 60 });\n  await kafka.publish("request.served", { key });\n  return result;\n}`}</code></pre>}
    </div>
    <div className={styles.livePanel}><div className={styles.liveHeading}><strong>Live Request Flow</strong><small>Demo · 124 ms</small></div><div className={styles.liveBody}><ol>{steps.map((label, index) => <li key={label} data-active={step === index}><i />{label}<span>{timings[index]} ms</span></li>)}</ol><div className={styles.bars} aria-hidden="true">{[66, 82, 74, 52, 37].map((height, index) => <i key={index} style={{ height: `${height}%`, opacity: step === index ? 1 : .55 }} />)}</div></div></div>
  </div>;
}
