import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { ALL_ITEMS, KIND_LABELS } from "@/data/catalog";
import type { CatalogItem } from "@/types/systemly";
import type { RichConceptItem } from "@/data/concepts";
import type { RichCompanyItem } from "@/data/companies";
import type { RichCaseItem } from "@/data/cases";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/seo-metadata";

const sectionForKind = {
  concept: { href: "/concepts", title: "System design concepts" },
  algorithm: { href: "/algorithms", title: "System design algorithms" },
  company: { href: "/companies", title: "Company architecture examples" },
  case: { href: "/case-studies", title: "System design case studies" },
  path: { href: "/learning-paths", title: "System design learning paths" },
} as const;

const curatedRelatedConcepts: Record<string, string[]> = {
  "company:google": ["consistent-hashing", "db-sharding", "caching", "cdn"],
  "company:amazon": ["message-queues", "db-replication", "caching", "rate-limiting"],
  "company:netflix": ["cdn", "caching", "circuit-breaker", "load-balancer"],
  "company:uber": ["load-balancer", "message-queues", "caching", "db-sharding"],
  "company:youtube": ["cdn", "message-queues", "caching", "db-replication"],
  "company:instagram": ["db-sharding", "caching", "cdn", "message-queues"],
  "case:url-shortener": ["caching", "db-sharding", "consistent-hashing", "api-gateway"],
  "case:video-streaming": ["cdn", "caching", "message-queues", "db-replication"],
  "case:chat-app": ["websockets", "message-queues", "caching"],
  "case:ride-hailing": ["websockets", "message-queues", "load-balancer", "db-sharding"],
};

export function catalogItemPath(item: CatalogItem) {
  const root = sectionForKind[item.kind].href;
  return `${root}/${item.slug}`;
}

export function getCatalogItem(kind: CatalogItem["kind"], slug: string) {
  return ALL_ITEMS.find((item) => item.kind === kind && item.slug === slug);
}

export function catalogItemMetadata(item: CatalogItem) {
  const section = sectionForKind[item.kind];
  const title = item.kind === "company"
    ? `${item.title} Architecture: System Design & Scaling`
    : item.kind === "case"
      ? `${item.title}: System Design Case Study`
      : item.kind === "concept"
        ? `${item.title}: How It Works in System Design`
        : `${item.title}: ${section.title}`;
  return pageMetadata({ title, description: item.blurb, path: catalogItemPath(item) });
}

function RelatedConcepts({ item }: { item: CatalogItem }) {
  const curated = item.kind === "concept"
    ? (item as RichConceptItem).related || []
    : curatedRelatedConcepts[`${item.kind}:${item.slug}`] || [];
  const selected = curated.length
    ? curated.map((slug) => ALL_ITEMS.find((candidate) => candidate.kind === "concept" && candidate.slug === slug)).filter((candidate): candidate is CatalogItem => Boolean(candidate))
    : ALL_ITEMS.filter((candidate) => candidate.kind === "concept" && candidate.slug !== item.slug)
        .map((candidate) => ({ candidate, overlap: candidate.tags.filter((tag) => item.tags.some((itemTag) => itemTag.toLowerCase() === tag.toLowerCase())).length }))
        .filter(({ overlap }) => overlap >= 2)
        .sort((a, b) => b.overlap - a.overlap)
        .slice(0, 3)
        .map(({ candidate }) => candidate);
  if (!selected.length) return null;
  return <section className="catalog-related" aria-labelledby="related-concepts-title"><h2 id="related-concepts-title">Related system design concepts</h2><ul>{selected.map((related) => <li key={related.slug}><Link href={catalogItemPath(related)}>{related.title}<ArrowRight size={14} /></Link></li>)}</ul></section>;
}

function ItemBody({ item }: { item: CatalogItem }) {
  if (item.kind === "concept") {
    const concept = item as RichConceptItem;
    return <>
      <section><h2>What is {item.title.toLowerCase()}?</h2><p>{concept.what || concept.def || item.blurb}</p></section>
      {concept.why && <section><h2>Why it matters</h2><p>{concept.why}</p></section>}
      {concept.how?.length ? <section><h2>How {item.title.toLowerCase()} works</h2><ol>{concept.how.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}</ol></section> : null}
      {concept.variants?.length ? <section><h2>Common approaches</h2><div className="catalog-detail-grid">{concept.variants.map((variant) => <article key={variant.id}><h3>{variant.label}</h3><p>{variant.note}</p></article>)}</div></section> : null}
      {concept.tradeoffs && (concept.tradeoffs.pros.length > 0 || concept.tradeoffs.cons.length > 0) ? <section><h2>Benefits and trade-offs</h2><div className="catalog-detail-grid">{concept.tradeoffs.pros.length > 0 && <article><h3>Benefits</h3><ul>{concept.tradeoffs.pros.map((entry) => <li key={entry}>{entry}</li>)}</ul></article>}{concept.tradeoffs.cons.length > 0 && <article><h3>Trade-offs</h3><ul>{concept.tradeoffs.cons.map((entry) => <li key={entry}>{entry}</li>)}</ul></article>}</div></section> : null}
    </>;
  }
  if (item.kind === "algorithm") {
    return <>
      <section><h2>How {item.title} works</h2><p>{item.blurb}</p><p>For this algorithm, the stated time complexity is <code>{item.time}</code> and the space complexity is <code>{item.space}</code>. Use the visual trace in the algorithms library to step through an example input.</p></section>
      {item.mini.length > 0 && <section><h2>Example values in the visual trace</h2><p>The trace preview uses these values to make the algorithm’s state easier to follow step by step.</p><ol className="catalog-value-list">{item.mini.map((value, index) => <li key={`${index}:${value}`}><span>Index {index}</span><strong>{value}</strong></li>)}</ol></section>}
      <section><h2>Where it fits in system design</h2><p>Algorithms help turn system requirements into concrete behavior. Consider input size, expected workload, memory limits, and failure conditions when choosing an approach.</p><Link className="catalog-inline-link" href="/algorithms">Explore visual algorithm traces <ArrowRight size={15} /></Link></section>
    </>;
  }
  if (item.kind === "company") {
    const company = item as RichCompanyItem;
    return <>
      {company.overview && <section><h2>Architecture overview</h2><p>{company.overview}</p></section>}
      {company.products?.length ? <section><h2>Products and system problems</h2><div className="catalog-detail-grid">{company.products.map((product) => <article key={product.name}><h3>{product.name}</h3><p>{product.problem}</p></article>)}</div></section> : null}
      {company.takeaways?.length ? <section><h2>System design takeaways</h2><ul>{company.takeaways.map((entry) => <li key={entry}>{entry}</li>)}</ul></section> : null}
      <p className="catalog-disclaimer">This is an educational architecture model based on public information, not a representation of private internal systems.</p>
    </>;
  }
  if (item.kind === "case") {
    const study = item as RichCaseItem;
    return <>
      {study.problem && <section><h2>Problem statement</h2><p>{study.problem}</p></section>}
      {study.objectives?.length ? <section><h2>Design objectives</h2><ul>{study.objectives.map((entry) => <li key={entry}>{entry}</li>)}</ul></section> : null}
      {study.functional?.length ? <section><h2>Functional requirements</h2><ul>{study.functional.map((entry) => <li key={entry}>{entry}</li>)}</ul></section> : null}
      {study.nonFunctional?.length ? <section><h2>Scale, reliability, and performance goals</h2><ul>{study.nonFunctional.map((entry) => <li key={entry}>{entry}</li>)}</ul></section> : null}
      {study.capacity?.length ? <section><h2>Capacity estimates</h2><div className="catalog-detail-grid">{study.capacity.map((entry) => <article key={entry.k}><h3>{entry.k}: {entry.v}</h3><p>{entry.how}</p></article>)}</div></section> : null}
      {study.deepDives?.length ? <section><h2>Design trade-offs and deeper dives</h2><div className="catalog-detail-grid">{study.deepDives.map((entry, index) => <article key={entry.title || index}><h3>{entry.title || `Design decision ${index + 1}`}</h3><p>{entry.content || entry.description || "Compare the options against the system requirements."}</p></article>)}</div></section> : null}
    </>;
  }
  return null;
}

export function CatalogDetailPage({ item }: { item: CatalogItem }) {
  const section = sectionForKind[item.kind];
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: section.title, item: new URL(section.href, siteConfig.url).href },
      { "@type": "ListItem", position: 3, name: item.title, item: new URL(catalogItemPath(item), siteConfig.url).href },
    ],
  };
  return <SiteShell currentView="explore"><article className="catalog-detail sy-container">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }} />
    <nav aria-label="Breadcrumb"><ol><li><Link href="/">Home</Link></li><li aria-hidden="true">/</li><li><Link href={section.href}>{section.title}</Link></li><li aria-hidden="true">/</li><li aria-current="page">{item.title}</li></ol></nav>
    <Link className="catalog-back-link" href={section.href}><ArrowLeft size={15} /> Back to {section.title.toLowerCase()}</Link>
    <header className="catalog-detail-header"><div className="catalog-detail-meta"><span>{KIND_LABELS[item.kind]}</span><span>{item.diff}</span>{item.mins > 0 && <span><Clock size={13} /> {item.mins} min read</span>}</div><h1>{item.kind === "company" ? `${item.title} Architecture` : item.kind === "case" ? `How to Design ${item.title}` : item.title}</h1><p>{item.blurb}</p></header>
    <div className="catalog-detail-layout"><main className="catalog-detail-content"><ItemBody item={item} /><RelatedConcepts item={item} /></main><aside className="catalog-detail-aside"><span>Continue learning</span><h2>Explore the {section.title.toLowerCase()} library</h2><p>Browse related visual guides, compare approaches, and continue your system design learning path.</p><Link href={section.href}>Browse the library <ArrowRight size={15} /></Link><Link href="/learning-paths">Follow a learning path <ArrowRight size={15} /></Link></aside></div>
  </article></SiteShell>;
}
