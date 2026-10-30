import type { NextRequest } from "next/server";
import { error } from "@/lib/api/response";
import { getCurrentUser } from "./session";

export async function requireUser(request: NextRequest) {
  const user = await getCurrentUser(request);
  return user ?? error(401, "UNAUTHORIZED", "Sign in is required.");
}

export async function requireEditor(request: NextRequest) {
  const result = await requireUser(request);
  if (result instanceof Response) return result;
  return result.role === "EDITOR" || result.role === "ADMIN"
    ? result
    : error(403, "FORBIDDEN", "Editor access is required.");
}

export async function requireAdmin(request: NextRequest) {
  const result = await requireUser(request);
  if (result instanceof Response) return result;
  return result.role === "ADMIN"
    ? result
    : error(403, "FORBIDDEN", "Admin access is required.");
}
