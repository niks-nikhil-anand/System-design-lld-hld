import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  BookOpen,
  Building2,
  Code2,
  Compass,
  Layers3,
  Route,
  Search,
  Sparkles,
} from "lucide-react";
import { ALGORITHMS, CASES, COMPANIES, CONCEPTS, PATHS } from "@/data/catalog";
import { BLOG_POSTS, formatBlogDate } from "@/data/blogs";
import { BlogArtwork } from "@/components/blog/BlogArtwork";

const offers = [
  { href: "/concepts", icon: Blocks, title: "System design concepts", description: "Learn distributed systems, caching, databases, networking, scalability, and reliability." },
  { href: "/algorithms", icon: Code2, title: "System design algorithms", description: "Explore algorithms used in scalable systems, with visual traces and complexity guides." },
  { href: "/companies", icon: Building2, title: "Company architecture examples", description: "Study educational architecture models based on public engineering sources." },
  { href: "/case-studies", icon: Layers3, title: "System design case studies", description: "Practice requirements, capacity estimates, trade-offs, and end-to-end designs." },
  { href: "/learning-paths", icon: Route, title: "System design learning paths", description: "Follow a structured roadmap from core fundamentals to distributed systems." },
  { href: "/playground", icon: Compass, title: "Interactive system design playground", description: "Experiment with architecture components and follow request flows." },
];

const companySlugs = ["netflix", "uber", "amazon", "youtube", "instagram"];
const conceptSlugs = ["load-balancer", "caching", "db-sharding", "consistent-hashing", "message-queues", "cdn", "api-gateway", "db-replication"];
const caseSlugs = ["url-shortener", "video-streaming", "chat-app", "ride-hailing"];

const faqItems = [
  ["What is system design?", "System design is the process of defining the components, data flows, and trade-offs that let software meet its functional and reliability needs at scale."],
  ["How should a beginner start learning system design?", "Start with how requests move through networks, APIs, databases, and caches, then combine those building blocks in a guided learning path."],
  ["What system design concepts should I learn first?", "Begin with networking, load balancing, caching, database fundamentals, and scaling. These ideas appear in many larger architectures."],
  ["How can I practice system design interviews?", "Work through a case study by clarifying requirements, estimating capacity, proposing components, and explaining trade-offs before comparing alternatives."],
  ["Are the company architecture examples exact internal designs?", "No. They are educational models based on publicly available engineering information, not claims about private internal systems."],
];

function SectionHeading({ eyebrow, title, description, id }: { eyebrow: string; title: string; description: string; id: string }) {
  return <div className="landing-section-heading"><span className="home-eyebrow">{eyebrow}</span><h2 id={id}>{title}</h2><p>{description}</p></div>;
}

export function LandingPage() {
  const companies = companySlugs.map((slug) => COMPANIES.find((item) => item.slug === slug)).filter((item): item is (typeof COMPANIES)[number] => Boolean(item));
  const concepts = conceptSlugs.map((slug) => CONCEPTS.find((item) => item.slug === slug)).filter((item): item is (typeof CONCEPTS)[number] => Boolean(item));
  const cases = caseSlugs.map((slug) => CASES.find((item) => item.slug === slug)).filter((item): item is (typeof CASES)[number] => Boolean(item));
  const learningLevels = ["Beginner", "Intermediate", "Advanced"].map((level) => PATHS.find((path) => path.diff === level)).filter((item): item is (typeof PATHS)[number] => Boolean(item));
  const articles = [...BLOG_POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 3);

  return (
    <div className="homepage landing-page">
      <section className="landing-intro" aria-labelledby="landing-title">
        <div className="landing-copy">
          <span className="landing-kicker"><Sparkles size={15} /> Visual lessons from fundamentals to real architectures</span>
          <h1 id="landing-title">Learn System Design Through Concepts, Algorithms &amp; Real-World Architecture</h1>
          <p>Build a practical understanding of distributed systems. Explore core concepts, follow request flows, study architecture examples, and practice designing real applications.</p>
          <div className="landing-actions">
            <Link href="/learning-paths/fundamentals" className="home-primary">Start learning <ArrowRight size={18} /></Link>
            <Link href="/concepts" className="landing-secondary">Explore system design concepts</Link>
          </div>
          <form action="/explore" method="get" role="search" className="landing-search">
            <Search size={18} aria-hidden="true" />
            <label className="sr-only" htmlFor="landing-search-input">Search system design topics</label>
            <input id="landing-search-input" type="search" name="q" placeholder="Search concepts, algorithms, and architectures" />
            <button type="submit" aria-label="Search topics"><ArrowRight size={18} /></button>
          </form>
          <div className="landing-facts"><span><b>{CONCEPTS.length}</b> concepts</span><i /><span><b>{ALGORITHMS.length}</b> algorithms</span><i /><span><b>{CASES.length}</b> case studies</span></div>
        </div>
        <div className="landing-visual" aria-label="Example request flow from client through load balancer and services to a database">
          <div className="landing-orbit landing-orbit-one" /><div className="landing-orbit landing-orbit-two" />
          <div className="landing-visual-card"><span>EXAMPLE SYSTEM ARCHITECTURE</span><div className="landing-flow"><i>Client</i><b aria-hidden="true">→</b><i>Load balancer</i><b aria-hidden="true">→</b><i>Services</i><b aria-hidden="true">→</b><i>Database</i></div><div className="landing-visual-caption"><span /><span /><span /> Follow a request across a distributed system</div></div>
        </div>
      </section>

      <section className="landing-offers" aria-labelledby="landing-offers-title">
        <SectionHeading id="landing-offers-title" eyebrow="One place to learn and practice" title="Explore system design topics and tools" description="Choose a focused topic, use a visual tool, or follow a guided path through the fundamentals." />
        <div className="landing-offer-grid">{offers.map(({ href, icon: Icon, title, description }) => <Link href={href} className="landing-offer" key={href}><span className="landing-offer-icon"><Icon size={22} /></span><span className="landing-offer-copy"><strong>{title}</strong><small>{description}</small></span><ArrowRight className="landing-offer-arrow" size={18} /></Link>)}</div>
      </section>

      <section className="landing-featured" aria-labelledby="landing-companies-title">
        <SectionHeading id="landing-companies-title" eyebrow="Learn from public engineering material" title="Explore real-world system architecture examples" description="See how large products handle search, streaming, rides, and media delivery through educational architecture models." />
        <div className="landing-feature-grid landing-company-grid">{companies.map((company) => <Link className="landing-feature-card" href={`/companies/${company.slug}`} key={company.slug}><span className="landing-feature-kicker">Company architecture</span><strong>{company.title}</strong><p>{company.blurb}</p><span className="landing-feature-link">Explore {company.title} architecture <ArrowRight size={15} /></span></Link>)}</div>
        <Link className="landing-inline-link" href="/companies">Explore all company architectures <ArrowRight size={16} /></Link>
      </section>

      <section className="landing-featured" aria-labelledby="landing-concepts-title">
        <SectionHeading id="landing-concepts-title" eyebrow="Build a strong foundation" title="Explore essential system design concepts" description="Understand the components and principles behind scalable, reliable, distributed applications." />
        <div className="landing-feature-grid landing-topic-grid">{concepts.map((concept) => <Link className="landing-topic-card" href={`/concepts/${concept.slug}`} key={concept.slug}><span>{concept.cat}</span><strong>{concept.title}</strong><p>{concept.blurb}</p></Link>)}</div>
        <Link className="landing-inline-link" href="/concepts">Explore all system design concepts <ArrowRight size={16} /></Link>
      </section>

      <section className="landing-featured" aria-labelledby="landing-cases-title">
        <SectionHeading id="landing-cases-title" eyebrow="Practice the design process" title="Practice real-world system design case studies" description="Clarify requirements, estimate capacity, choose components, and explain the trade-offs behind an end-to-end design." />
        <div className="landing-feature-grid landing-case-grid">{cases.map((item) => <Link className="landing-feature-card" href={`/case-studies/${item.slug}`} key={item.slug}><span className="landing-feature-kicker">{item.mins} min · {item.diff}</span><strong>{item.title}</strong><p>{item.blurb}</p><span className="landing-feature-link">Open case study <ArrowRight size={15} /></span></Link>)}</div>
        <Link className="landing-inline-link" href="/case-studies">Explore all system design case studies <ArrowRight size={16} /></Link>
      </section>

      <section className="landing-method" aria-labelledby="landing-method-title">
        <div><span className="home-eyebrow">A practical way to learn</span><h2 id="landing-method-title">Learn system architecture step by step</h2><p>Start with an individual building block, follow it through a request flow, then apply it to a complete design. The diagrams connect each idea to the systems engineers build.</p><Link href="/learning-paths" className="landing-inline-link">See the learning paths <ArrowRight size={16} /></Link></div>
        <div className="landing-steps"><div><b>01</b><span><strong>Explore</strong><small>Find a concept or architecture</small></span></div><div><b>02</b><span><strong>Visualize</strong><small>Follow requests through diagrams</small></span></div><div><b>03</b><span><strong>Practice</strong><small>Apply what you learned to a design</small></span></div></div>
      </section>

      <section className="landing-paths" aria-labelledby="landing-paths-title">
        <SectionHeading id="landing-paths-title" eyebrow="Choose your next step" title="Follow a structured system design roadmap" description="Use a guided sequence to connect networking, data, scalability, and system trade-offs." />
        <div className="landing-path-grid">{learningLevels.map((path) => <Link className="landing-path-card" href={`/learning-paths/${path.slug}`} key={path.slug}><span>{path.diff} · {path.duration}</span><strong>{path.title}</strong><p>{path.blurb}</p><span className="landing-feature-link">View this learning path <ArrowRight size={15} /></span></Link>)}</div>
        <Link className="landing-inline-link" href="/learning-paths">Explore all learning paths <ArrowRight size={16} /></Link>
      </section>

      <section className="landing-playground" aria-labelledby="landing-playground-title">
        <div><span className="home-eyebrow">Try the interactive system design playground</span><h2 id="landing-playground-title">Learn architecture by building and tracing it</h2><p>Experiment with architecture templates, inspect system components, and see how requests move between services.</p><Link href="/playground" className="home-primary">Open the playground <ArrowRight size={18} /></Link></div>
        <div className="landing-playground-preview" aria-hidden="true"><span>CLIENT</span><i>→</i><span>LOAD BALANCER</span><i>→</i><span>APP SERVERS</span><i>→</i><span>DATABASE</span></div>
      </section>

      <section className="landing-articles" aria-labelledby="landing-articles-title">
        <div className="landing-section-heading"><span className="home-eyebrow">Field notes from the learning library</span><h2 id="landing-articles-title">Latest system design tutorials and articles</h2><p>Read focused explanations of patterns, algorithms, and the trade-offs behind them.</p></div>
        <div className="landing-article-grid">{articles.map((post) => <article className="landing-article-card" key={post.id}><Link href={`/blog/${post.id}`} className="landing-article-art"><BlogArtwork post={post} /></Link><div className="landing-article-copy"><span>{post.category} · {formatBlogDate(post.publishedAt)}</span><h3><Link href={`/blog/${post.id}`}>{post.title}</Link></h3><p>{post.excerpt}</p><Link className="landing-feature-link" href={`/blog/${post.id}`}>Read article <ArrowRight size={15} /></Link></div></article>)}</div>
        <Link className="landing-inline-link" href="/blog">Read all system design articles <ArrowRight size={16} /></Link>
      </section>

      <section id="faq" className="landing-faq" aria-labelledby="landing-faq-title"><div><span className="home-eyebrow">Common questions</span><h2 id="landing-faq-title">System design learning FAQs</h2></div><div className="landing-faq-list">{faqItems.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>

      <section className="landing-final"><span className="landing-kicker"><BookOpen size={15} /> Built for curious engineers</span><h2>Start learning system design today</h2><p>Build your understanding of distributed systems, core algorithms, and real-world software architecture.</p><Link href="/concepts" className="home-primary">Start exploring concepts <ArrowRight size={18} /></Link></section>
    </div>
  );
}
