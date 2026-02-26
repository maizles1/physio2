/**
 * Saved plans storage. Production (Vercel): uses Vercel Blob (data/saved-plans.json).
 * Local dev without BLOB_READ_WRITE_TOKEN: falls back to app/data/saved-plans.json.
 * On Vercel we never write to the filesystem; without Blob token, save returns an error.
 */
import { get, put, list } from "@vercel/blob";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const BLOB_PATHNAME = "data/saved-plans.json";

export interface PlanFeedbackMessage {
  id: string;
  author: "patient" | "therapist";
  text: string;
  createdAt: string;
  /** When set, this message is about a specific exercise in the plan. */
  exerciseId?: string;
  exerciseTitle?: string;
}

export interface SavedPlan {
  id: string;
  patientName: string;
  prescriptionParam: string;
  createdAt: string;
  updatedAt?: string;
  feedback?: PlanFeedbackMessage[];
}

function readFromFile(): SavedPlan[] {
  try {
    const path = join(process.cwd(), "app", "data", "saved-plans.json");
    const raw = readFileSync(path, "utf-8");
    const data = JSON.parse(raw);
    if (typeof data === "object" && data !== null && Array.isArray(data.plans)) {
      return data.plans;
    }
  } catch {
    // ignore
  }
  return [];
}

/** Read saved plans from Vercel Blob, or from file if Blob not configured. */
export async function readSavedPlans(): Promise<SavedPlan[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return readFromFile();
  }
  try {
    const { blobs } = await list({ prefix: "data/" });
    const blob = blobs.find((b) => b.pathname === BLOB_PATHNAME);
    if (!blob) return readFromFile();
    const res = await get(blob.url, { access: "private" });
    if (!res || !res.stream) return readFromFile();
    const text = await new Response(res.stream).text();
    const data = JSON.parse(text);
    if (typeof data === "object" && data !== null && Array.isArray(data.plans)) {
      return data.plans;
    }
  } catch {
    return readFromFile();
  }
  return readFromFile();
}

const VERCEL_BLOB_INSTRUCTIONS =
  "באזור הניהול של Vercel: Storage → Create Database → Blob. אחרי יצירת ה-Blob לעשות Redeploy לפרויקט.";

/** Write saved plans: Vercel Blob if token set, otherwise try writing to file (works locally). */
export async function writeSavedPlans(plans: SavedPlan[]): Promise<{ ok: boolean; error?: string }> {
  const body = JSON.stringify({ plans }, null, 2);

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      await put(BLOB_PATHNAME, body, {
        access: "private",
        contentType: "application/json",
        addRandomSuffix: false,
        allowOverwrite: true,
      });
      return { ok: true };
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";
      return { ok: false, error: `שמירה ל-Blob נכשלה: ${message}` };
    }
  }

  if (process.env.VERCEL) {
    return {
      ok: false,
      error: `שמירה לא זמינה: חסר BLOB_READ_WRITE_TOKEN. ב־Vercel: Storage → Blob → לחבר לפרויקט → Redeploy. ${VERCEL_BLOB_INSTRUCTIONS}`,
    };
  }

  try {
    const dir = join(process.cwd(), "app", "data");
    const path = join(dir, "saved-plans.json");
    try {
      mkdirSync(dir, { recursive: true });
    } catch {
      // dir may already exist
    }
    writeFileSync(path, body, "utf-8");
    return { ok: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return {
      ok: false,
      error: `לא ניתן לכתוב לקובץ: ${message}. ${VERCEL_BLOB_INSTRUCTIONS}`,
    };
  }
}

/** Append a feedback message to a plan. Returns ok and updated plans, or error. */
export async function addPlanFeedback(
  planId: string,
  message: {
    author: "patient" | "therapist";
    text: string;
    exerciseId?: string;
    exerciseTitle?: string;
  }
): Promise<{ ok: boolean; error?: string; plans?: SavedPlan[] }> {
  const plans = await readSavedPlans();
  const idx = plans.findIndex((p) => p.id === planId);
  if (idx === -1) {
    return { ok: false, error: "Plan not found" };
  }
  const plan = plans[idx]!;
  const feedback = plan.feedback ?? [];
  const newMessage: PlanFeedbackMessage = {
    id: crypto.randomUUID(),
    author: message.author,
    text: message.text.trim(),
    createdAt: new Date().toISOString(),
    ...(message.exerciseId && { exerciseId: message.exerciseId }),
    ...(message.exerciseTitle && { exerciseTitle: message.exerciseTitle }),
  };
  const nextPlans = [...plans];
  nextPlans[idx] = { ...plan, feedback: [...feedback, newMessage], updatedAt: newMessage.createdAt };
  const result = await writeSavedPlans(nextPlans);
  if (!result.ok) {
    return { ok: false, error: result.error };
  }
  return { ok: true, plans: nextPlans };
}
