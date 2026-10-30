import { prisma } from "@/lib/prisma";

const db = prisma as any;

export const contentKinds = {
  concept: "CONCEPT",
  algorithm: "ALGORITHM",
  "case-study": "CASE_STUDY",
  company: "COMPANY",
  "learning-path": "LEARNING_PATH",
  "blog-post": "BLOG_POST",
  "playground-template": "PLAYGROUND_TEMPLATE",
} as const;

export type ContentKindSlug = keyof typeof contentKinds;

export function isContentKind(value: string): value is ContentKindSlug {
  return value in contentKinds;
}

const include = {
  category: true,
  tags: { include: { tag: true } },
  outgoingLinks: { include: { target: true } },
  diagram: { include: { nodes: { orderBy: { sortOrder: "asc" } }, edges: { orderBy: { sortOrder: "asc" } } } },
  concept: { include: { steps: { orderBy: { sortOrder: "asc" } }, variants: { orderBy: { sortOrder: "asc" } }, tradeoffs: { orderBy: { sortOrder: "asc" } } } },
  algorithm: true,
  caseStudy: { include: { objectives: { orderBy: { sortOrder: "asc" } }, requirements: { orderBy: { sortOrder: "asc" } }, capacityEstimates: { orderBy: { sortOrder: "asc" } }, apiEndpoints: { orderBy: { sortOrder: "asc" } }, deepDives: { orderBy: { sortOrder: "asc" } }, tradeoffs: { orderBy: { sortOrder: "asc" } } } },
  company: { include: { products: { orderBy: { sortOrder: "asc" } }, metrics: { orderBy: { sortOrder: "asc" } }, takeaways: { orderBy: { sortOrder: "asc" } } } },
  learningPath: { include: { modules: { orderBy: { sortOrder: "asc" }, include: { items: { orderBy: { sortOrder: "asc" }, include: { content: true } } } } } },
  blogPost: { include: { author: true, sections: { orderBy: { sortOrder: "asc" } } } },
  playground: true,
} as const;

const asArray = (value: unknown) => Array.isArray(value) ? value : [];
const asString = (value: unknown) => typeof value === "string" ? value.trim() : "";
const asNumber = (value: unknown) => typeof value === "number" && Number.isFinite(value) ? value : undefined;
const asRecord = (value: unknown) => value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};

function ordered(values: unknown, map: (item: Record<string, unknown>, sortOrder: number) => Record<string, unknown>) {
  return asArray(values).map(asRecord).map((item, sortOrder) => map(item, sortOrder));
}

function detailData(kind: ContentKindSlug, input: Record<string, unknown>) {
  const diagram = asRecord(input.diagram);
  const sharedDiagram = Object.keys(diagram).length ? {
    title: asString(diagram.title) || null,
    nodes: { create: ordered(diagram.nodes, (node, sortOrder) => ({
      externalKey: asString(node.externalKey || node.id), label: asString(node.label || node.name), type: asString(node.type), description: asString(node.description || node.desc) || null,
      x: asNumber(node.x) ?? 50, y: asNumber(node.y) ?? 50, sortOrder,
    })) },
    edges: { create: ordered(diagram.edges, (edge, sortOrder) => ({
      sourceNodeKey: asString(edge.sourceNodeKey || edge.source), targetNodeKey: asString(edge.targetNodeKey || edge.target), label: asString(edge.label) || null, sortOrder,
    })) },
  } : null;

  const result: Record<string, unknown> = sharedDiagram ? { diagram: { create: sharedDiagram } } : {};
  if (kind === "concept") result.concept = { create: {
    definition: asString(input.definition) || null, whatItIs: asString(input.whatItIs) || null, whyItMatters: asString(input.whyItMatters) || null,
    steps: { create: ordered(input.steps, (item, sortOrder) => ({ body: asString(item.body), sortOrder })) },
    variants: { create: ordered(input.variants, (item, sortOrder) => ({ key: asString(item.key), label: asString(item.label), note: asString(item.note), sortOrder })) },
    tradeoffs: { create: ordered(input.tradeoffs, (item, sortOrder) => ({ side: asString(item.side) === "CON" ? "CON" : "PRO", body: asString(item.body), sortOrder })) },
  } };
  if (kind === "algorithm") result.algorithm = { create: { timeComplexity: asString(input.timeComplexity), spaceComplexity: asString(input.spaceComplexity), visualization: asArray(input.visualization).filter((item): item is number => typeof item === "number") } };
  if (kind === "case-study") result.caseStudy = { create: {
    problem: asString(input.problem) || null, assumptions: asString(input.assumptions) || null, architectureTitle: asString(input.architectureTitle) || null,
    objectives: { create: ordered(input.objectives, (item, sortOrder) => ({ body: asString(item.body), sortOrder })) },
    requirements: { create: ordered(input.requirements, (item, sortOrder) => ({ type: asString(item.type) === "NON_FUNCTIONAL" ? "NON_FUNCTIONAL" : "FUNCTIONAL", body: asString(item.body), sortOrder })) },
    capacityEstimates: { create: ordered(input.capacityEstimates, (item, sortOrder) => ({ label: asString(item.label), value: asString(item.value), rationale: asString(item.rationale) || null, sortOrder })) },
    apiEndpoints: { create: ordered(input.apiEndpoints, (item, sortOrder) => ({ method: asString(item.method), path: asString(item.path), description: asString(item.description), sortOrder })) },
    deepDives: { create: ordered(input.deepDives, (item, sortOrder) => ({ title: asString(item.title), body: asString(item.body), sortOrder })) },
    tradeoffs: { create: ordered(input.tradeoffs, (item, sortOrder) => ({ question: asString(item.question), decision: asString(item.decision), rationale: asString(item.rationale), sortOrder })) },
  } };
  if (kind === "company") result.company = { create: {
    overview: asString(input.overview) || null, architectureTitle: asString(input.architectureTitle) || null,
    products: { create: ordered(input.products, (item, sortOrder) => ({ name: asString(item.name), problem: asString(item.problem), sortOrder })) },
    metrics: { create: ordered(input.metrics, (item, sortOrder) => ({ label: asString(item.label), value: asString(item.value), sortOrder })) },
    takeaways: { create: ordered(input.takeaways, (item, sortOrder) => ({ body: asString(item.body), sortOrder })) },
  } };
  if (kind === "learning-path") result.learningPath = { create: {
    durationMinutes: asNumber(input.durationMinutes), modules: { create: ordered(input.modules, (item, sortOrder) => ({ title: asString(item.title), sortOrder, items: { create: ordered(item.items, (entry, itemSortOrder) => ({ contentId: asString(entry.contentId), sortOrder: itemSortOrder })) } })) },
  } };
  if (kind === "blog-post") result.blogPost = { create: {
    intro: asString(input.intro), authorId: asString(input.authorId) || null,
    sections: { create: ordered(input.sections, (item, sortOrder) => ({ anchor: asString(item.anchor), title: asString(item.title), body: asString(item.body), code: asString(item.code) || null, takeaway: asString(item.takeaway) || null, sortOrder })) },
  } };
  if (kind === "playground-template") result.playground = { create: { p99Latency: asString(input.p99Latency) || null, throughput: asString(input.throughput) || null, bottleneck: asString(input.bottleneck) || null } };
  return result;
}

function baseData(kind: ContentKindSlug, input: Record<string, unknown>) {
  const tags = asArray(input.tagIds).filter((tagId): tagId is string => typeof tagId === "string");
  return {
    kind: contentKinds[kind], slug: asString(input.slug), title: asString(input.title), summary: asString(input.summary),
    status: asString(input.status) || "DRAFT", difficulty: asString(input.difficulty) || null, readingMinutes: asNumber(input.readingMinutes),
    category: asString(input.categoryId) ? { connect: { id: asString(input.categoryId) } } : undefined,
    publishedAt: input.publishedAt ? new Date(asString(input.publishedAt)) : null,
    tags: { create: tags.map((tagId) => ({ tag: { connect: { id: tagId } } })) },
  };
}

export function validateContent(input: Record<string, unknown>) {
  const fields: Record<string, string[]> = {};
  if (!asString(input.slug).match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)) fields.slug = ["Use lowercase letters, numbers, and hyphens."];
  if (!asString(input.title)) fields.title = ["Title is required."];
  if (!asString(input.summary)) fields.summary = ["Summary is required."];
  return Object.keys(fields).length ? fields : null;
}

export async function listContent(kind?: ContentKindSlug, options?: { page?: number; limit?: number; query?: string; status?: string }) {
  const page = Math.max(1, options?.page || 1); const limit = Math.min(100, Math.max(1, options?.limit || 20));
  const where: Record<string, unknown> = { ...(kind ? { kind: contentKinds[kind] } : {}), ...(options?.status ? { status: options.status } : {}), ...(options?.query ? { OR: [{ title: { contains: options.query, mode: "insensitive" } }, { summary: { contains: options.query, mode: "insensitive" } }] } : {}) };
  const [data, total] = await db.$transaction([db.content.findMany({ where, include, orderBy: { updatedAt: "desc" }, skip: (page - 1) * limit, take: limit }), db.content.count({ where })]);
  return { data, meta: { page, limit, total } };
}

export async function findContent(kind: ContentKindSlug, slug: string) {
  return db.content.findUnique({ where: { kind_slug: { kind: contentKinds[kind], slug } }, include });
}

export async function createContent(kind: ContentKindSlug, input: Record<string, unknown>, authorId?: string) {
  const data = await db.content.create({ data: { ...baseData(kind, input), ...detailData(kind, input) }, include });
  await db.contentRevision.create({ data: { contentId: data.id, authorId: authorId || null, version: 1, status: data.status, snapshot: input as any } });
  return data;
}

async function clearDetails(tx: any, contentId: string) {
  await tx.architectureDiagram.deleteMany({ where: { contentId } });
  await tx.concept.deleteMany({ where: { contentId } }); await tx.algorithm.deleteMany({ where: { contentId } }); await tx.caseStudy.deleteMany({ where: { contentId } });
  await tx.company.deleteMany({ where: { contentId } }); await tx.learningPath.deleteMany({ where: { contentId } }); await tx.blogPost.deleteMany({ where: { contentId } }); await tx.playgroundTemplate.deleteMany({ where: { contentId } });
}

export async function replaceContent(kind: ContentKindSlug, slug: string, input: Record<string, unknown>, authorId?: string) {
  const existing = await findContent(kind, slug); if (!existing) return null;
  return db.$transaction(async (tx: any) => {
    await clearDetails(tx, existing.id);
    const data = await tx.content.update({ where: { id: existing.id }, data: { ...baseData(kind, input), ...detailData(kind, input), tags: { deleteMany: {}, create: asArray(input.tagIds).filter((id): id is string => typeof id === "string").map((tagId) => ({ tag: { connect: { id: tagId } } })) } }, include });
    const revisionCount = await tx.contentRevision.count({ where: { contentId: existing.id } });
    await tx.contentRevision.create({ data: { contentId: existing.id, authorId: authorId || null, version: revisionCount + 1, status: data.status, snapshot: input as any } });
    return data;
  });
}

export async function archiveContent(kind: ContentKindSlug, slug: string) {
  return db.content.update({ where: { kind_slug: { kind: contentKinds[kind], slug } }, data: { status: "ARCHIVED" } });
}

export { include };
