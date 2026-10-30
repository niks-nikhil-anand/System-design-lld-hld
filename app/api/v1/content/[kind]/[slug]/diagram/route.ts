import { NextRequest } from "next/server";
import { body, error, ok } from "@/lib/api/response";
import { requireEditor } from "@/lib/auth/guards";
import { findContent, isContentKind } from "@/lib/api/content";
import { prisma } from "@/lib/prisma";

const db = prisma as any;

export async function GET(request: NextRequest, ctx: RouteContext<"/api/v1/content/[kind]/[slug]/diagram">) {
  const user = await requireEditor(request); if (user instanceof Response) return user;
  const { kind, slug } = await ctx.params; if (!isContentKind(kind)) return error(404, "NOT_FOUND", "Content kind was not found.");
  const content = await findContent(kind, slug); return content?.diagram ? ok(content.diagram) : error(404, "NOT_FOUND", "Diagram was not found.");
}

export async function PUT(request: NextRequest, ctx: RouteContext<"/api/v1/content/[kind]/[slug]/diagram">) {
  const user = await requireEditor(request); if (user instanceof Response) return user;
  const { kind, slug } = await ctx.params; if (!isContentKind(kind)) return error(404, "NOT_FOUND", "Content kind was not found.");
  const input = await body(request); if (!input) return error(400, "INVALID_BODY", "Send a JSON object.");
  const content = await findContent(kind, slug); if (!content) return error(404, "NOT_FOUND", "Content was not found.");
  const nodes = Array.isArray(input.nodes) ? input.nodes : []; const edges = Array.isArray(input.edges) ? input.edges : [];
  const diagram = await db.architectureDiagram.upsert({ where: { contentId: content.id }, create: { contentId: content.id, title: typeof input.title === "string" ? input.title : null, nodes: { create: nodes.map((node: any, sortOrder) => ({ externalKey: String(node.externalKey || node.id), label: String(node.label || node.name), type: String(node.type), description: node.description || node.desc || null, x: Number(node.x) || 50, y: Number(node.y) || 50, sortOrder })) }, edges: { create: edges.map((edge: any, sortOrder) => ({ sourceNodeKey: String(edge.sourceNodeKey || edge.source), targetNodeKey: String(edge.targetNodeKey || edge.target), label: edge.label || null, sortOrder })) } }, update: { title: typeof input.title === "string" ? input.title : null, nodes: { deleteMany: {}, create: nodes.map((node: any, sortOrder) => ({ externalKey: String(node.externalKey || node.id), label: String(node.label || node.name), type: String(node.type), description: node.description || node.desc || null, x: Number(node.x) || 50, y: Number(node.y) || 50, sortOrder })) }, edges: { deleteMany: {}, create: edges.map((edge: any, sortOrder) => ({ sourceNodeKey: String(edge.sourceNodeKey || edge.source), targetNodeKey: String(edge.targetNodeKey || edge.target), label: edge.label || null, sortOrder })) } }, include: { nodes: { orderBy: { sortOrder: "asc" } }, edges: { orderBy: { sortOrder: "asc" } } } });
  return ok(diagram);
}
