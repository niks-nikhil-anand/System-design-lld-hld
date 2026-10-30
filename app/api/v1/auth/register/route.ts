import { NextRequest, NextResponse } from "next/server";
import { body, error } from "@/lib/api/response";
import { hashPassword } from "@/lib/auth/password";
import { createSession, setSessionCookie } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const input = await body(request); if (!input) return error(400, "INVALID_BODY", "Send a JSON object.");
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const password = typeof input.password === "string" ? input.password : "";
  const name = typeof input.name === "string" ? input.name.trim() : "";
  if (!email || !/^\S+@\S+\.\S+$/.test(email) || password.length < 12) return error(422, "VALIDATION_ERROR", "Provide a valid email and a password with at least 12 characters.");
  if (await prisma.user.findUnique({ where: { email } })) return error(409, "EMAIL_TAKEN", "An account already uses this email.");
  const user = await prisma.user.create({ data: { email, name: name || null, passwordHash: await hashPassword(password) } as any });
  const session = await createSession(user.id);
  const response = NextResponse.json({ data: { id: user.id, email: user.email, name: user.name, role: user.role } }, { status: 201 });
  return setSessionCookie(response, session.token, session.expires);
}
