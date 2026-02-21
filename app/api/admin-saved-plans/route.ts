import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, getAdminSessionToken } from "@/lib/adminAuth";
import { readSavedPlans, writeSavedPlans, type SavedPlan } from "@/lib/plansStorage";

/** GET: return all saved plans (admin only). */
export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const token = getAdminSessionToken();
  if (!sessionCookie || sessionCookie !== token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const plans = await readSavedPlans();
  return NextResponse.json({ plans });
}

/** POST: create or update a saved plan (admin only). Body: { id?: string; patientName: string; prescriptionParam: string } */
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const token = getAdminSessionToken();
  if (!sessionCookie || sessionCookie !== token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: { id?: string; patientName?: string; prescriptionParam?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const patientName = typeof body?.patientName === "string" ? body.patientName.trim() : "";
  const prescriptionParam = typeof body?.prescriptionParam === "string" ? body.prescriptionParam : "";
  if (!patientName || !prescriptionParam) {
    return NextResponse.json({ error: "patientName and prescriptionParam required" }, { status: 400 });
  }
  const plans = await readSavedPlans();
  const now = new Date().toISOString();
  const existingId = typeof body?.id === "string" ? body.id.trim() : undefined;
  let nextPlans: SavedPlan[];
  if (existingId) {
    const idx = plans.findIndex((p) => p.id === existingId);
    if (idx === -1) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }
    nextPlans = [...plans];
    nextPlans[idx] = {
      ...nextPlans[idx]!,
      patientName,
      prescriptionParam,
      updatedAt: now,
    };
  } else {
    const newPlan: SavedPlan = {
      id: crypto.randomUUID(),
      patientName,
      prescriptionParam,
      createdAt: now,
    };
    nextPlans = [...plans, newPlan];
  }
  const result = await writeSavedPlans(nextPlans);
  if (!result.ok) {
    return NextResponse.json({ error: result.error ?? "Save failed" }, { status: 500 });
  }
  return NextResponse.json({ ok: true, plans: nextPlans });
}

/** DELETE: remove a saved plan (admin only). Body: { id: string } */
export async function DELETE(request: Request) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const token = getAdminSessionToken();
  if (!sessionCookie || sessionCookie !== token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: { id?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const id = typeof body?.id === "string" ? body.id.trim() : "";
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }
  const plans = await readSavedPlans();
  const nextPlans = plans.filter((p) => p.id !== id);
  if (nextPlans.length === plans.length) {
    return NextResponse.json({ error: "Plan not found" }, { status: 404 });
  }
  const result = await writeSavedPlans(nextPlans);
  if (!result.ok) {
    return NextResponse.json({ error: result.error ?? "Delete failed" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
