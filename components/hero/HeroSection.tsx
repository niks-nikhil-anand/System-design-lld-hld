"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, BookOpen, Building2, Code2, Search, Play } from "lucide-react";
import { searchCatalog } from "@/data/catalog";
import { useVisualViewport } from "@/hooks/useVisualViewport";
import { CatalogItem } from "@/types/systemly";
import { HeroArchitecture } from "./HeroArchitecture";
import { styles } from "./styles";
import "./hero.css";

interface HeroSectionProps {
  onSelectItem: (item: CatalogItem) => void;
  onSearchQuery: (query: string) => void;
}
const popularTags = ["load balancer", "caching", "consistent hashing", "kafka", "Netflix", "rate limiting"];
const features = [
  [BookOpen, "Interactive Diagrams", "Visualize complex systems"],
  [Play, "Animated Request Flows", "See how things work end-to-end"],
  [Building2, "Real Company Case Studies", "Learn from Google, Netflix, Uber"],
  [Code2, "Hands-on Playground", "Experiment and build"],
] as const;

export function HeroSection({ onSelectItem, onSearchQuery }: HeroSectionProps) {
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const viewport = useVisualViewport();
  const results = query.trim() ? searchCatalog(query).slice(0, 5) : [];
  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!searchRef.current?.contains(event.target as Node)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  function submit() {
    if (!query.trim()) return;
    setDropdownOpen(false);
    onSearchQuery(query.trim());
  }
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <Image className={styles.backdrop} src="/images/hero/developer-scene.webp" alt="" fill sizes="100vw" preload />
      <div className={styles.shade} />
      <Image className="sd-hero-person" src="/images/hero/developer-scene.webp" alt="" fill sizes="100vw" aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.main}>
          <div className={styles.copy}>
            <div className={styles.stats}><i />20 concepts · 15 algorithms · 10 case studies</div>
            <h1 id="hero-heading">Understand<br />System Design.<br /><span>See It in Action.</span></h1>
            <p className={styles.description}>Learn how modern distributed systems work through interactive diagrams, animated request flows, and real-world case studies from Google, Netflix, and Uber.</p>
            <div className={styles.searchArea} ref={searchRef} onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setDropdownOpen(false);
            }}>
              <form className={styles.search} onSubmit={(event) => { event.preventDefault(); submit(); }}>
                <Search size={23} aria-hidden="true" />
                <input aria-label="Search learning topics" aria-controls={dropdownOpen ? "hero-search-results" : undefined} value={query} onChange={(event) => { setQuery(event.target.value); setDropdownOpen(Boolean(event.target.value.trim())); }} onFocus={() => setDropdownOpen(Boolean(query.trim()))} onKeyDown={(event) => { if (event.key === "Escape") setDropdownOpen(false); }} placeholder="Search concepts, algorithms, companies... (e.g. cache, raft, uber)" />
                <button type="submit" aria-label="Search topics"><ArrowRight size={25} /></button>
              </form>
              {dropdownOpen && query.trim() && <div id="hero-search-results" className={styles.suggestions} style={{ maxHeight: viewport.height ? Math.min(320, viewport.height * .45) : 320 }}>
                {results.length ? results.map((item) => <button type="button" key={`${item.kind}:${item.slug}`} onClick={() => { setDropdownOpen(false); onSelectItem(item); }}><span><strong>{item.title}</strong><small>{item.blurb}</small></span><em>{item.kind}</em></button>) : <p>No matching topics found for &ldquo;{query}&rdquo;.</p>}
              </div>}
            </div>
            <div className={styles.tags}><span>Popular:</span>{popularTags.map((tag) => <button type="button" key={tag} onClick={() => { setQuery(tag); setDropdownOpen(false); onSearchQuery(tag); }}>{tag}</button>)}</div>
          </div>
          <HeroArchitecture onSearchQuery={onSearchQuery} />
        </div>
        <div className={styles.features}>{features.map(([Icon, title, description]) => <div key={title}><span className={styles.featureIcon}><Icon size={28} strokeWidth={1.7} /></span><span><strong>{title}</strong><small>{description}</small></span></div>)}</div>
      </div>
    </section>
  );
}
