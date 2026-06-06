/**
 * Leads storage. Production (Vercel): uses Vercel Blob (data/meuhedet-leads.json).
 * Local dev without BLOB_READ_WRITE_TOKEN: falls back to app/data/meuhedet-leads.json.
 * Mirrors the contract of `lib/newsletterStorage.ts` so it integrates the same way.
 */
import { get, put, list } from "@vercel/blob";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const BLOB_PATHNAME = "data/meuhedet-leads.json";

export type LeadSource = "meuhedet" | string;

export interface Lead {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  source: LeadSource;
  createdAt: string;
  ip?: string;
  userAgent?: string;
}

function readFromFile(): Lead[] {
  try {
    const path = join(process.cwd(), "app", "data", "meuhedet-leads.json");
    const raw = readFileSync(path, "utf-8");
    const data = JSON.parse(raw);
    if (typeof data === "object" && data !== null && Array.isArray(data.leads)) {
      return data.leads;
    }
  } catch {
    // ignore - file may not exist yet
  }
  return [];
}

/** Read all stored leads from Vercel Blob, or from local file if Blob not configured. */
export async function readLeads(): Promise<Lead[]> {
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
    if (typeof data === "object" && data !== null && Array.isArray(data.leads)) {
      return data.leads;
    }
  } catch {
    return readFromFile();
  }
  return readFromFile();
}

const VERCEL_BLOB_INSTRUCTIONS =
  "באזור הניהול של Vercel: Storage → Blob. אחרי יצירת ה-Blob לעשות Redeploy לפרויקט.";

/** Persist the leads list. */
export async function writeLeads(
  leads: Lead[]
): Promise<{ ok: boolean; error?: string }> {
  const body = JSON.stringify({ leads }, null, 2);

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
      error: `שמירה לא זמינה: חסר BLOB_READ_WRITE_TOKEN. ${VERCEL_BLOB_INSTRUCTIONS}`,
    };
  }

  try {
    const dir = join(process.cwd(), "app", "data");
    const path = join(dir, "meuhedet-leads.json");
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

/** Append a new lead and persist. Returns ok and the persisted lead. */
export async function addLead(
  input: Omit<Lead, "createdAt"> & { createdAt?: string }
): Promise<{ ok: boolean; error?: string; lead?: Lead }> {
  const lead: Lead = {
    name: input.name.trim(),
    phone: input.phone.trim(),
    email: input.email?.trim() || undefined,
    message: input.message?.trim() || undefined,
    source: input.source,
    createdAt: input.createdAt ?? new Date().toISOString(),
    ip: input.ip,
    userAgent: input.userAgent,
  };

  const existing = await readLeads();
  const next = [...existing, lead];
  const result = await writeLeads(next);
  if (!result.ok) {
    return { ok: false, error: result.error };
  }
  return { ok: true, lead };
}
