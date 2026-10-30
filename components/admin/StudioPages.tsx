import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Box,
  Check,
  ChevronDown,
  CircleDot,
  Columns3,
  Database,
  FileText,
  Frame,
  Layers3,
  LayoutTemplate,
  Monitor,
  Network,
  Palette,
  PenTool,
  Plus,
  Server,
  Smartphone,
  Sparkles,
  Tablet,
  Waypoints,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeading } from "./AdminPrimitives";

const contentTypes = [
  ["Concept", "Explain one foundational system-design building block.", "concepts", Layers3],
  ["Algorithm", "Turn a repeatable approach into an interactive lesson.", "algorithms", Waypoints],
  ["Case study", "Walk through a complete system from requirements to trade-offs.", "case-studies", Network],
  ["Company", "Document the architectural choices behind a familiar product.", "companies", Server],
  ["Learning path", "Arrange lessons into a focused progression.", "learning-paths", Columns3],
  ["Blog post", "Publish an editorial explanation from the engineering desk.", "blog", FileText],
  ["Playground", "Give learners a system topology they can explore.", "playground", Box],
] as const;

export function ContentCreateHub() {
  return (
    <>
      <PageHeading
        eyebrow="CREATE CONTENT"
        title="What are you making?"
        description="Start from a focused content type, then shape it with System Design Mate’s structured editorial canvas."
      />
      <section className="cms-create-hero">
        <div>
          <span className="workspace-eyebrow"><Sparkles size={13} /> A thoughtful starting point</span>
          <h2>Turn clear thinking into a learning experience.</h2>
          <p>Each template gives your idea the right structure from the first section to the final takeaway.</p>
        </div>
        <div className="cms-create-steps" aria-label="Content workflow">
          <span><b>01</b> Choose a format</span><span><b>02</b> Shape the story</span><span><b>03</b> Review the experience</span>
        </div>
      </section>
      <section className="cms-type-grid" aria-label="Content types">
        {contentTypes.map(([title, description, section, Icon]) => (
          <Link className="cms-type-card" href={`/admin/${section}/new`} key={section}>
            <span className="cms-type-icon"><Icon size={21} /></span>
            <h2>{title}</h2><p>{description}</p>
            <span className="cms-type-action">Start with {title.toLowerCase()} <ArrowRight size={15} /></span>
          </Link>
        ))}
      </section>
    </>
  );
}

const palette: Array<[string, LucideIcon]> = [
  ["Client", Monitor], ["Gateway", Waypoints], ["Service", Server],
  ["Cache", Layers3], ["Queue", Columns3], ["Database", Database],
];

export function DiagramStudio() {
  return (
    <>
      <PageHeading eyebrow="DIAGRAM STUDIO" title="Map the system, make it memorable" description="A visual canvas for architecture diagrams that bring every system design to life.">
        <Button variant="outline"><LayoutTemplate /> Templates</Button>
        <Button><Plus /> Add node</Button>
      </PageHeading>
      <section className="cms-studio-shell" aria-label="Architecture diagram editor preview">
        <aside className="cms-studio-panel cms-palette">
          <div className="cms-panel-label">Node palette</div>
          <p>Drag a building block onto the canvas.</p>
          <div className="cms-node-palette">
            {palette.map(([label, Icon]) => <button type="button" key={label}><Icon size={16} /><span>{label}</span><Plus size={14} /></button>)}
          </div>
          <div className="cms-panel-label mt-6">Quick layouts</div>
          <div className="cms-layout-list"><button type="button">Horizontal flow</button><button type="button">Fan out</button><button type="button">Hub and spoke</button></div>
        </aside>
        <div className="cms-canvas" role="img" aria-label="Preview diagram with client, gateway, application service, cache, and database nodes">
          <div className="cms-canvas-bar"><span>Architecture diagram</span><span>100% <ChevronDown size={14} /></span></div>
          <div className="cms-canvas-grid">
            <div className="cms-diagram-node node-client"><Monitor size={18} /><span>Client</span></div>
            <i className="edge edge-1" /><div className="cms-diagram-node node-gateway"><Waypoints size={18} /><span>API Gateway</span></div>
            <i className="edge edge-2" /><div className="cms-diagram-node node-service"><Server size={18} /><span>App service</span></div>
            <i className="edge edge-cache" /><div className="cms-diagram-node node-cache"><Layers3 size={18} /><span>Cache</span></div>
            <i className="edge edge-db" /><div className="cms-diagram-node node-db"><Database size={18} /><span>Database</span></div>
            <span className="cms-canvas-note">Request path</span>
          </div>
          <div className="cms-canvas-controls"><button type="button">−</button><button type="button">100%</button><button type="button">+</button></div>
        </div>
        <aside className="cms-studio-panel cms-inspector">
          <div className="cms-panel-label">Selected node</div>
          <div className="cms-inspector-selected"><span className="cms-type-icon"><Server size={20} /></span><div><strong>App service</strong><small>Service</small></div></div>
          <label>Label<input defaultValue="App service" /></label>
          <label>Description<textarea defaultValue="Stateless API workers handling core requests." /></label>
          <label>Node type<select defaultValue="Service"><option>Service</option><option>Gateway</option><option>Database</option></select></label>
          <button className="cms-secondary-action" type="button"><PenTool size={15} /> Add connection</button>
          <div className="cms-inspector-tip"><CircleDot size={15} /> Use a concise label and describe what this component owns.</div>
        </aside>
      </section>
    </>
  );
}

export function BrandStudio() {
  const colors = [["Ink", "#12131a"], ["Indigo", "#4f46e5"], ["Lavender", "#eeedfd"], ["Success", "#15803d"], ["Warning", "#a64b05"]];
  return (
    <>
      <PageHeading eyebrow="BRAND STUDIO" title="The System Design Mate design language" description="Keep every learning moment coherent, accessible, and unmistakably System Design Mate.">
        <Button variant="outline">View public preview <ArrowRight /></Button><Button><Check /> Saved visual state</Button>
      </PageHeading>
      <div className="cms-brand-grid">
        <Card className="cms-brand-identity"><CardHeader><CardTitle>Identity</CardTitle><CardDescription>The foundation for every surface.</CardDescription></CardHeader><CardContent><div className="cms-brand-lockup"><Image src="/logo.png" alt="System Design Mate logo" width={40} height={40} className="cms-logo-mark object-contain" /><div><strong>System Design Mate</strong><span>Learn the systems behind software.</span></div></div><div className="cms-brand-copy"><span>Brand promise</span><p>Make complex systems feel clear, connected, and worth exploring.</p></div><button type="button" className="cms-secondary-action">Manage logo variations <ArrowRight size={15} /></button></CardContent></Card>
        <Card><CardHeader><CardTitle>Color language</CardTitle><CardDescription>Semantic tokens, built for light and dark surfaces.</CardDescription></CardHeader><CardContent className="cms-color-list">{colors.map(([name, value]) => <div key={name}><span style={{ background: value }} /><strong>{name}</strong><code>{value}</code></div>)}</CardContent></Card>
        <Card><CardHeader><CardTitle>Type and voice</CardTitle><CardDescription>Editorial clarity with a technical edge.</CardDescription></CardHeader><CardContent><div className="cms-type-sample"><span>DISPLAY</span><strong>Clear thinking<br />scales well.</strong><p>Geist Sans · 650 · Tight tracking</p></div><div className="cms-mono-sample">METRIC / 03 · 128ms · 99.99%</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Components in context</CardTitle><CardDescription>A compact review of the brand’s working parts.</CardDescription></CardHeader><CardContent className="cms-component-preview"><span className="cms-status cms-status-published"><i /> Published</span><button type="button">Primary action <ArrowRight size={14} /></button><div><span className="cms-type-icon"><Palette size={17} /></span><p>Purposeful, calm, technical.</p></div></CardContent></Card>
      </div>
    </>
  );
}

export function PreviewCenter() {
  return (
    <>
      <PageHeading eyebrow="PREVIEW CENTER" title="Review the learning experience" description="See how content feels before it reaches a learner, across every screen size.">
        <Button variant="outline">Share review <ArrowRight /></Button><Button>Open public preview <ArrowRight /></Button>
      </PageHeading>
      <section className="cms-preview-center">
        <aside className="cms-preview-controls"><div className="cms-panel-label">Currently previewing</div><button type="button" className="cms-preview-select"><span><Layers3 size={16} /> Concept</span><strong>Load Balancer</strong><ChevronDown size={15} /></button><div className="cms-panel-label">Viewport</div><div className="cms-viewport-tabs"><button type="button" className="is-active"><Monitor size={17} /> Desktop</button><button type="button"><Tablet size={17} /> Tablet</button><button type="button"><Smartphone size={17} /> Mobile</button></div><div className="cms-panel-label">Review checklist</div><ul className="cms-check-list"><li><Check /> Clear headline and summary</li><li><Check /> Diagram is understandable</li><li><Check /> Related topics are relevant</li><li><span /> Ready for editorial review</li></ul></aside>
        <div className="cms-device-wrap"><div className="cms-device"><div className="cms-device-top"><span className="cms-logo-mark small">S</span><span>Explore</span><span>Paths</span><span>Blog</span></div><article><span className="workspace-eyebrow">TRAFFIC · BEGINNER</span><h2>Load balancer</h2><p>Spreads incoming requests across healthy servers so no single machine is overwhelmed.</p><div className="cms-mini-diagram"><span>Client</span><i /><span className="highlight">Load balancer</span><i /><span>Servers ×3</span></div><h3>Why it matters</h3><p>One server has a ceiling. A load balancer lets capacity grow while keeping systems available when a backend fails.</p></article></div></div>
      </section>
    </>
  );
}
