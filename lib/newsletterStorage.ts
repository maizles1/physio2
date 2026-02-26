/**
 * Newsletter subscribers storage. Production (Vercel): uses Vercel Blob (data/newsletter-subscribers.json).
 * Local dev without BLOB_READ_WRITE_TOKEN: falls back to app/data/newsletter-subscribers.json.
 */
import { get, put, list } from "@vercel/blob";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const BLOB_PATHNAME = "data/newsletter-subscribers.json";

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
}

function readFromFile(): NewsletterSubscriber[] {
  try {
    const path = join(process.cwd(), "app", "data", "newsletter-subscribers.json");
    const raw = readFileSync(path, "utf-8");
    const data = JSON.parse(raw);
    if (typeof data === "object" && data !== null && Array.isArray(data.subscribers)) {
      return data.subscribers;
    }
  } catch {
    // ignore
  }
  return [];
}

/** Read newsletter subscribers from Vercel Blob, or from file if Blob not configured. */
export async function readNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
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
    if (typeof data === "object" && data !== null && Array.isArray(data.subscribers)) {
      return data.subscribers;
    }
  } catch {
    return readFromFile();
  }
  return readFromFile();
}

const VERCEL_BLOB_INSTRUCTIONS =
  "באזור הניהול של Vercel: Storage → Blob. אחרי יצירת ה-Blob לעשות Redeploy לפרויקט.";

/** Write newsletter subscribers. */
export async function writeNewsletterSubscribers(
  subscribers: NewsletterSubscriber[]
): Promise<{ ok: boolean; error?: string }> {
  const body = JSON.stringify({ subscribers }, null, 2);

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
    const path = join(dir, "newsletter-subscribers.json");
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

/** Add a subscriber. Returns ok and whether it was new (not duplicate). */
export async function addNewsletterSubscriber(
  email: string
): Promise<{ ok: boolean; error?: string; alreadySubscribed?: boolean }> {
  const normalized = email.trim().toLowerCase();
  const subscribers = await readNewsletterSubscribers();
  const exists = subscribers.some((s) => s.email.toLowerCase() === normalized);
  if (exists) {
    return { ok: true, alreadySubscribed: true };
  }
  const next = [...subscribers, { email: normalized, subscribedAt: new Date().toISOString() }];
  const result = await writeNewsletterSubscribers(next);
  if (!result.ok) {
    return { ok: false, error: result.error };
  }
  return { ok: true, alreadySubscribed: false };
}
