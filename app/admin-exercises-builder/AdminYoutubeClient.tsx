"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  exercisesData,
  CATEGORY_ORDER,
  CATEGORY_LABELS,
  type Category,
  type Exercise,
} from "@/app/data/exercises";

interface CustomExerciseEntry {
  id: string;
  category: Category;
  title: string;
  youtubeId: string;
}

/** Extract YouTube video ID from URL or return as-is if already an ID-like string. */
function parseYoutubeId(input: string): string {
  const s = input.trim();
  if (!s) return "";
  const watchMatch = s.match(/[?&]v=([^&]+)/);
  if (watchMatch) return watchMatch[1];
  const pathMatch = s.match(/\/(?:shorts|embed)\/([^/?&]+)/);
  if (pathMatch) return pathMatch[1];
  if (/^[a-zA-Z0-9_-]{10,12}$/.test(s)) return s;
  return s;
}

export default function AdminYoutubeClient() {
  const router = useRouter();
  const [youtubeOverrides, setYoutubeOverrides] = useState<Record<string, string>>({});
  const [customExercises, setCustomExercises] = useState<CustomExerciseEntry[]>([]);
  const [copiedKind, setCopiedKind] = useState<"youtube" | "custom" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch("/api/admin-youtube-ids", { credentials: "include" }).then((r) => (r.ok ? r.json() : {})),
      fetch("/api/admin-custom-exercises", { credentials: "include" }).then((r) =>
        r.ok ? r.json() : { exercises: [] }
      ),
    ])
      .then(([overrides, custom]) => {
        if (!cancelled) {
          setYoutubeOverrides(typeof overrides === "object" && overrides !== null ? overrides : {});
          setCustomExercises(Array.isArray(custom?.exercises) ? custom.exercises : []);
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

  const setOverride = useCallback((id: string, value: string) => {
    setYoutubeOverrides((prev) => ({ ...prev, [id]: value }));
  }, []);

  const addCustomExercise = useCallback((category: Category, youtubeLinkOrId: string, title: string) => {
    const youtubeId = parseYoutubeId(youtubeLinkOrId);
    const trimmedTitle = title.trim();
    if (!youtubeId || !trimmedTitle) return;
    const id = `custom-${category}-${Date.now()}`;
    setCustomExercises((prev) => [
      ...prev,
      { id, category, title: trimmedTitle, youtubeId },
    ]);
  }, []);

  const removeCustomExercise = useCallback((id: string) => {
    setCustomExercises((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const copyYoutubeJson = useCallback(() => {
    const out: Record<string, string> = {};
    for (const [id, raw] of Object.entries(youtubeOverrides)) {
      const parsed = parseYoutubeId(raw);
      if (parsed) out[id] = parsed;
    }
    navigator.clipboard.writeText(JSON.stringify(out, null, 2)).then(() => {
      setCopiedKind("youtube");
      setTimeout(() => setCopiedKind(null), 3000);
    });
  }, [youtubeOverrides]);

  const copyCustomJson = useCallback(() => {
    const payload = { exercises: customExercises };
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2)).then(() => {
      setCopiedKind("custom");
      setTimeout(() => setCopiedKind(null), 3000);
    });
  }, [customExercises]);

  const logout = useCallback(async () => {
    await fetch("/api/admin-logout", { method: "POST" });
    router.push("/admin-login");
  }, [router]);

  const byCategory = (exercises: Exercise[]) => {
    const map = new Map<Category, Exercise[]>();
    for (const cat of CATEGORY_ORDER) map.set(cat, []);
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

  const predefinedGrouped = byCategory(exercisesData);

  return (
    <div className="min-h-screen pb-24" dir="rtl">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/admin-exercises-builder" className="text-primary-dark hover:underline">
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
          תחת כל חלק גוף: הכנס לינק יוטיוב וכתוב את שם התרגיל – התרגיל נוצר אוטומטית. בסיום העתק את קבצי ה-JSON והדבק בקבצים בפרויקט.
        </p>

        {loading ? (
          <p className="text-gray-500 py-4">טוען...</p>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={copyYoutubeJson}
                className="rounded-xl bg-primary-dark text-white font-medium px-4 py-2.5 hover:bg-primary-darker transition"
              >
                {copiedKind === "youtube" ? "הועתק!" : "העתק youtube-ids.json"}
              </button>
              <button
                type="button"
                onClick={copyCustomJson}
                className="rounded-xl border-2 border-primary-dark text-primary-dark font-medium px-4 py-2.5 hover:bg-primary/10 transition"
              >
                {copiedKind === "custom" ? "הועתק!" : "העתק custom-exercises.json"}
              </button>
              {(copiedKind === "youtube" || copiedKind === "custom") && (
                <span className="text-sm text-green-600 self-center">
                  הדבק בקובץ app/data/{copiedKind === "youtube" ? "youtube-ids.json" : "custom-exercises.json"} ושמור.
                </span>
              )}
            </div>

            <div className="space-y-10">
              {CATEGORY_ORDER.map((category) => {
                const label = CATEGORY_LABELS[category];
                const customInCategory = customExercises.filter((e) => e.category === category);
                const predefinedInCategory = predefinedGrouped.find((g) => g.category === category)?.exercises ?? [];

                return (
                  <section key={category} className="rounded-2xl border border-gray-200 bg-white p-5">
                    <h2 className="text-lg font-bold text-primary-dark mb-4 pb-2 border-b border-gray-200">
                      {label}
                    </h2>

                    {/* Add new exercise from video */}
                    <div className="mb-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-3">הוסף תרגיל מסרטון</p>
                      <AddExerciseForm
                        category={category}
                        onAdd={addCustomExercise}
                      />
                    </div>

                    {/* Custom exercises in this category */}
                    {customInCategory.length > 0 && (
                      <ul className="space-y-3 mb-6">
                        <p className="text-sm font-medium text-gray-600">תרגילים שנוספו מסרטונים</p>
                        {customInCategory.map((ex) => (
                          <li
                            key={ex.id}
                            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3"
                          >
                            <div className="flex-1 min-w-0">
                              <span className="font-medium text-gray-900 block">{ex.title}</span>
                              <span className="text-xs text-gray-500">ID: {ex.youtubeId}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeCustomExercise(ex.id)}
                              className="text-red-600 hover:text-red-700 text-sm shrink-0"
                            >
                              הסר
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Predefined exercises with override */}
                    {predefinedInCategory.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">תרגילים מוגדרים בקוד (לינק יוטיוב)</p>
                        <ul className="space-y-3">
                          {predefinedInCategory.map((ex) => (
                            <li key={ex.id} className="rounded-xl border border-gray-200 bg-white p-4">
                              <label className="block">
                                <span className="font-medium text-gray-900 block mb-1">{ex.title}</span>
                                <input
                                  type="text"
                                  value={youtubeOverrides[ex.id] ?? ""}
                                  onChange={(e) => setOverride(ex.id, e.target.value)}
                                  placeholder="לינק יוטיוב או ID"
                                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                                />
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function AddExerciseForm({
  category,
  onAdd,
}: {
  category: Category;
  onAdd: (category: Category, youtubeLinkOrId: string, title: string) => void;
}) {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(category, link, title);
    setLink("");
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="לינק יוטיוב"
        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
        required
      />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="שם התרגיל"
        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
        required
      />
      <button
        type="submit"
        className="rounded-lg bg-primary-dark text-white font-medium px-4 py-2 text-sm hover:bg-primary-darker shrink-0"
      >
        הוסף תרגיל
      </button>
    </form>
  );
}
