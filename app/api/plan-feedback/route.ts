import { NextResponse } from "next/server";
import { readSavedPlans, addPlanFeedback } from "@/lib/plansStorage";

/** GET: return feedback messages for a plan. Query: planId (required). Public. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const planId = searchParams.get("planId")?.trim();
  if (!planId) {
    return NextResponse.json({ error: "planId required" }, { status: 400 });
  }
  const plans = await readSavedPlans();
  const plan = plans.find((p) => p.id === planId);
  const messages = plan?.feedback ?? [];
  return NextResponse.json({ messages });
}

/** POST: add a patient feedback message. Body: { planId: string; text: string; exerciseId?: string; exerciseTitle?: string }. Public. */
export async function POST(request: Request) {
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
    author: "patient",
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
