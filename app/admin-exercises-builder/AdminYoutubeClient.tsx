"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  exercisesData,
  CATEGORY_ORDER,
  CATEGORY_LABELS,
  type Exercise,
} from "@/app/data/exercises";

/** Extract YouTube video ID from URL or return as-is if already an ID-like string. */
function parseYoutubeId(input: string): string {
  const s = input.trim();
  if (!s) return "";
  // watch?v=XXX
  const watchMatch = s.match(/[?&]v=([^&]+)/);
  if (watchMatch) return watchMatch[1];
  // /shorts/XXX or /embed/XXX
  const pathMatch = s.match(/\/(?:shorts|embed)\/([^/?&]+)/);
  if (pathMatch) return pathMatch[1];
  // Already ID-like (alphanumeric, dash, underscore; typical length 11)
  if (/^[a-zA-Z0-9_-]{10,12}$/.test(s)) return s;
  return s;
}

export default function AdminYoutubeClient() {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin-youtube-ids", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : {}))
      .then((data: Record<string, string>) => {
        if (!cancelled && typeof data === "object" && data !== null) {
          setValues(data as Record<string, string>);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const setValue = useCallback((id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  }, []);

  const copyJson = useCallback(() => {
    const out: Record<string, string> = {};
    for (const [id, raw] of Object.entries(values)) {
      const idParsed = parseYoutubeId(raw);
      if (idParsed) out[id] = idParsed;
    }
    const json = JSON.stringify(out, null, 2);
    navigator.clipboard.writeText(json).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  }, [values]);

  const logout = useCallback(async () => {
    await fetch("/api/admin-logout", { method: "POST" });
    router.push("/admin-login");
  }, [router]);

  const byCategory = (exercises: Exercise[]) => {
    const map = new Map<string, Exercise[]>();
    for (const cat of CATEGORY_ORDER) {
      map.set(cat, []);
    }
    for (const ex of exercises) {
      const list = map.get(ex.category) ?? [];
      list.push(ex);
      map.set(ex.category, list);
    }
    return CATEGORY_ORDER.map((category) => ({
      category,
      label: CATEGORY_LABELS[category],
      exercises: map.get(category) ?? [],
    })).filter((g) => g.exercises.length > 0);
  };

  const grouped = byCategory(exercisesData);

  return (
    <div className="min-h-screen pb-24" dir="rtl">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/admin-exercises-builder"
              className="text-primary-dark hover:underline"
            >
              ← בונה תוכנית
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">הגדרת סרטונים</h1>
          </div>
          <button
            type="button"
            onClick={logout}
            className="text-sm rounded-lg border border-gray-300 px-3 py-1.5 text-gray-700 hover:bg-gray-50"
          >
            יציאה
          </button>
        </div>

        <p className="text-gray-600 text-sm mb-4">
          הדבק לינק יוטיוב או רק מזהה סרטון (ID) ליד כל תרגיל. בסיום לחץ &quot;העתק JSON&quot; והדבק את התוכן בקובץ <code className="bg-gray-100 px-1 rounded">app/data/youtube-ids.json</code>.
        </p>

        {loading ? (
          <p className="text-gray-500 py-4">טוען...</p>
        ) : (
          <>
            <div className="mb-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={copyJson}
                className="rounded-xl bg-primary-dark text-white font-medium px-4 py-2.5 hover:bg-primary-darker transition"
              >
                {copied ? "הועתק!" : "העתק JSON"}
              </button>
              {copied && (
                <span className="text-sm text-green-600 self-center">
                  הדבק את התוכן בקובץ app/data/youtube-ids.json ושמור.
                </span>
              )}
            </div>

            <div className="space-y-8">
              {grouped.map(({ category, label, exercises }) => (
                <section key={category}>
                  <h2 className="text-lg font-bold text-primary-dark mb-3 pb-2 border-b border-gray-200">
                    {label}
                  </h2>
                  <ul className="space-y-3">
                    {exercises.map((ex) => (
                      <li
                        key={ex.id}
                        className="rounded-xl border border-gray-200 bg-white p-4"
                      >
                        <label className="block">
                          <span className="font-medium text-gray-900 block mb-1">
                            {ex.title}
                          </span>
                          <input
                            type="text"
                            value={values[ex.id] ?? ""}
                            onChange={(e) => setValue(ex.id, e.target.value)}
                            placeholder="לינק יוטיוב או ID"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                          />
                        </label>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
