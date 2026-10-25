import { CatalogItem, Kind, Shelf } from '@/types/systemly';
import { CONCEPTS } from './concepts';
import { ALGORITHMS } from './algorithms';
import { COMPANIES } from './companies';
import { CASES } from './cases';
import { PATHS } from './paths';

export { CONCEPTS, ALGORITHMS, COMPANIES, CASES, PATHS };

export const ALL_ITEMS: CatalogItem[] = [
  ...CONCEPTS,
  ...ALGORITHMS,
  ...COMPANIES,
  ...CASES,
  ...PATHS
];

export const BY_KEY: Record<string, CatalogItem> = {};
ALL_ITEMS.forEach((it) => {
  BY_KEY[`${it.kind}:${it.slug}`] = it;
});

export const KIND_LABELS: Record<Kind, string> = {
  concept: 'Concept',
  algorithm: 'Algorithm',
  company: 'Company',
  case: 'System design',
  path: 'Learning path'
};

export const KIND_VIEWS: Record<Kind, string> = {
  concept: 'concept',
  algorithm: 'algorithm',
  company: 'company',
  case: 'case',
  path: 'path'
};

export const DIFF_RANK: Record<string, number> = {
  Beginner: 0,
  Intermediate: 1,
  Advanced: 2
};

export const TYPE_PRESETS: Record<string, { heading: string; sub: string }> = {
  all: {
    heading: 'Explore all topics',
    sub: 'Search and filter every concept, algorithm, company and case study.'
  },
  concept: {
    heading: 'System design concepts',
    sub: 'Twenty building blocks, each with an animated step-by-step flow.'
  },
  algorithm: {
    heading: 'Algorithms',
    sub: 'Input-driven visualizations of fifteen core algorithms.'
  },
  company: {
    heading: 'Companies',
    sub: 'Educational architecture models of well-known products, based on public information.'
  },
  case: {
    heading: 'System design case studies',
    sub: 'End-to-end designs with requirements, estimates, APIs and request flows.'
  },
  path: {
    heading: 'Learning paths',
    sub: 'Curated sequences across concepts, algorithms and case studies.'
  }
};

export function scoreItem(item: CatalogItem, tokens: string[]): number {
  let total = 0;
  for (const t of tokens) {
    let s = 0;
    const title = item.title.toLowerCase();
    const stem = t.length > 4 ? t.replace(/(ing|es|e|s)$/, '') : t;
    if (title.startsWith(t) || title.startsWith(stem)) s += 15;
    else if (title.includes(t) || title.includes(stem)) s += 10;

    if (item.tags && item.tags.some((g) => g.toLowerCase().includes(t))) s += 6;
    if ((item.cat || '').toLowerCase().includes(t)) s += 4;
    if (KIND_LABELS[item.kind]?.toLowerCase().includes(t)) s += 3;
    if (item.blurb && item.blurb.toLowerCase().includes(t)) s += 2;

    if (s === 0) return 0;
    total += s;
  }
  return total;
}

export function searchCatalog(q: string): CatalogItem[] {
  const tokens = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];
  return ALL_ITEMS.map((it) => ({ it, s: scoreItem(it, tokens) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .map((x) => x.it);
}

export const SHELVES: Shelf[] = [
  {
    title: 'Recently added',
    items: [
      { ...BY_KEY['concept:kafka'], note: 'Added Oct 2026' },
      { ...BY_KEY['concept:circuit-breaker'], note: 'Added Oct 2026' },
      { ...BY_KEY['algorithm:a-star'], note: 'Added Sep 2026' },
      { ...BY_KEY['case:food-delivery'], note: 'Added Sep 2026' },
      { ...BY_KEY['case:job-queue'], note: 'Added Sep 2026' }
    ].filter(Boolean)
  },
  {
    title: 'Trending concepts',
    items: [
      { ...BY_KEY['concept:load-balancer'], note: 'Interview staple' },
      { ...BY_KEY['concept:consistent-hashing'], note: 'Distributed caches' },
      { ...BY_KEY['case:url-shortener'], note: 'Classic warm-up' },
      { ...BY_KEY['algorithm:dijkstra'], note: 'Routing and maps' },
      { ...BY_KEY['concept:rate-limiting'], note: 'API protection' }
    ].filter(Boolean)
  },
  {
    title: 'Beginner-friendly',
    items: [
      { ...BY_KEY['concept:dns'], note: '10 min' },
      { ...BY_KEY['concept:caching'], note: '12 min' },
      { ...BY_KEY['concept:cdn'], note: '11 min' },
      { ...BY_KEY['algorithm:binary-search'], note: 'O(log n)' },
      { ...BY_KEY['concept:scaling'], note: '10 min' }
    ].filter(Boolean)
  }
];
