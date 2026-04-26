import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/adminSessionGuard";
import { addPlanFeedback } from "@/lib/plansStorage";

/** POST: add a therapist reply to plan feedback. Body: { planId: string; text: string }. Admin only. */
export async function POST(request: Request) {
  const denied = await requireAdminSession();
  if (denied) return denied;
  let body: { planId?: string; text?: string; exerciseId?: string; exerciseTitle?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const planId = typeof body?.planId === "string" ? body.planId.trim() : "";
  const text = typeof body?.text === "string" ? body.text.trim() : "";
  const exerciseId = typeof body?.exerciseId === "string" ? body.exerciseId.trim() : undefined;
  const exerciseTitle = typeof body?.exerciseTitle === "string" ? body.exerciseTitle.trim() : undefined;
  if (!planId) {
    return NextResponse.json({ error: "planId required" }, { status: 400 });
  }
  if (!text) {
    return NextResponse.json({ error: "text required" }, { status: 400 });
  }
  const result = await addPlanFeedback(planId, {
    author: "therapist",
    text,
    ...(exerciseId && { exerciseId }),
    ...(exerciseTitle && { exerciseTitle }),
  });
  if (!result.ok) {
    const status = result.error === "Plan not found" ? 404 : 500;
    return NextResponse.json({ error: result.error ?? "Failed" }, { status });
  }
  const messages = result.plans?.find((p) => p.id === planId)?.feedback ?? [];
  return NextResponse.json({ ok: true, messages });
}
