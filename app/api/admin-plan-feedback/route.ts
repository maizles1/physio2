import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, getAdminSessionToken } from "@/lib/adminAuth";
import { addPlanFeedback } from "@/lib/plansStorage";

/** POST: add a therapist reply to plan feedback. Body: { planId: string; text: string }. Admin only. */
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const token = getAdminSessionToken();
  if (!sessionCookie || sessionCookie !== token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: { planId?: string; text?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const planId = typeof body?.planId === "string" ? body.planId.trim() : "";
  const text = typeof body?.text === "string" ? body.text.trim() : "";
  if (!planId) {
    return NextResponse.json({ error: "planId required" }, { status: 400 });
  }
  if (!text) {
    return NextResponse.json({ error: "text required" }, { status: 400 });
  }
  const result = await addPlanFeedback(planId, { author: "therapist", text });
  if (!result.ok) {
    const status = result.error === "Plan not found" ? 404 : 500;
    return NextResponse.json({ error: result.error ?? "Failed" }, { status });
  }
  const messages = result.plans?.find((p) => p.id === planId)?.feedback ?? [];
  return NextResponse.json({ ok: true, messages });
}
