import { NextRequest, NextResponse } from "next/server";
import { body, error } from "@/lib/api/response";
import { verifyPassword } from "@/lib/auth/password";
import { createSession, setSessionCookie } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const input = await body(request); if (!input) return error(400, "INVALID_BODY", "Send a JSON object.");
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const password = typeof input.password === "string" ? input.password : "";
  const user = await prisma.user.findUnique({ where: { email } });
  const passwordHash = (user as unknown as { passwordHash?: string } | null)?.passwordHash;
  if (!user || !passwordHash || !(await verifyPassword(password, passwordHash))) return error(401, "INVALID_CREDENTIALS", "Email or password is incorrect.");
  const session = await createSession(user.id);
  const response = NextResponse.json({ data: { id: user.id, email: user.email, name: user.name, role: user.role } });
  return setSessionCookie(response, session.token, session.expires);
}
