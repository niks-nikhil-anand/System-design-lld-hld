export type Kind = 'concept' | 'algorithm' | 'company' | 'case' | 'path';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface ConceptItem {
  kind: 'concept';
  slug: string;
  title: string;
  blurb: string;
  cat: 'Traffic' | 'Networking' | 'Data' | 'Messaging' | 'Architecture' | string;
  diff: Difficulty;
  mins: number;
  tags: string[];
  preview: string[];
  def?: string;
  variants?: { id: string; label: string; note: string }[];
  variantLabel?: string;
  what?: string;
  why?: string;
  how?: string[];
  tradeoffs?: { pros: string[]; cons: string[] };
}

export interface AlgorithmItem {
  kind: 'algorithm';
  slug: string;
  title: string;
  blurb: string;
  cat: string;
  diff: Difficulty;
  time: string;
  space: string;
  tags: string[];
  mini: number[];
  mins: number;
}

export interface CompanyItem {
  kind: 'company';
  slug: string;
  title: string;
  blurb: string;
  cat: 'Company';
  diff: Difficulty;
  mins: number;
  tags: string[];
  topics: number;
}

export interface CaseItem {
  kind: 'case';
  slug: string;
  title: string;
  blurb: string;
  cat: 'Case study';
  diff: Difficulty;
  mins: number;
  tags: string[];
  preview: string[];
  objectives: string[];
}

export interface PathModule {
  title: string;
  items: string[]; // e.g. "concept:dns"
}

export interface PathItem {
  kind: 'path';
  slug: string;
  title: string;
  blurb: string;
  cat: 'Path';
  diff: Difficulty;
  duration: string;
  modules: PathModule[];
  tags: string[];
  mins: number;
  total?: number;
}

export type CatalogItem =
  | ConceptItem
  | AlgorithmItem
  | CompanyItem
  | CaseItem
  | PathItem;

export type ViewType =
  | 'home'
  | 'explore'
  | 'concept'
  | 'algorithm'
  | 'company'
  | 'case'
  | 'paths'
  | 'path'
  | 'playground'
  | 'bookmarks'
  | 'about';

export interface RouteState {
  view: ViewType;
  slug?: string | null;
  q?: string;
}

export interface Shelf {
  title: string;
  items: (CatalogItem & { note?: string })[];
}

export interface FaqItem {
  q: string;
  a: string;
}
