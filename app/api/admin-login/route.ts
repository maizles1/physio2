import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSessionToken, validateAdminCredentials } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { username?: string; password?: string } | null;
  const username = typeof body?.username === "string" ? body.username.trim() : "";
  const password = typeof body?.password === "string" ? body.password.trim() : "";
  if (!username || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  const isValid = validateAdminCredentials(username, password);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  let sessionToken: string;
  try {
    sessionToken = getAdminSessionToken();
  } catch {
    return NextResponse.json(
      { error: "Admin login is not configured (set ADMIN_SESSION_TOKEN in production)" },
      { status: 503 }
    );
  }

  const response = NextResponse.json({ ok: true });
  const isProd = process.env.NODE_ENV === "production";
  response.cookies.set(ADMIN_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax", // so cookie is sent on next full navigation
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return response;
}
