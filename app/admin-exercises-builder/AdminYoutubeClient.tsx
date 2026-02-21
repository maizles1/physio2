"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CATEGORY_ORDER,
  CATEGORY_LABELS,
  type Category,
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

const DEFAULT_TITLE = "תרגיל חדש";

export default function AdminYoutubeClient() {
  const router = useRouter();
  const [customExercises, setCustomExercises] = useState<CustomExerciseEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin-custom-exercises", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : { exercises: [] }))
      .then((data) => {
        if (!cancelled && Array.isArray(data?.exercises)) {
          setCustomExercises(data.exercises);
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

  const addCustomExercise = useCallback((category: Category, youtubeLinkOrId: string) => {
    const youtubeId = parseYoutubeId(youtubeLinkOrId);
    if (!youtubeId) return;
    const id = `custom-${category}-${Date.now()}`;
    setCustomExercises((prev) => [
      ...prev,
      { id, category, title: DEFAULT_TITLE, youtubeId },
    ]);
  }, []);

  const updateTitle = useCallback((id: string, title: string) => {
    setCustomExercises((prev) =>
      prev.map((e) => (e.id === id ? { ...e, title: title.trim() || e.title } : e))
    );
  }, []);

  const removeCustomExercise = useCallback((id: string) => {
    setCustomExercises((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const copyCustomJson = useCallback(() => {
    const payload = { exercises: customExercises };
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  }, [customExercises]);

  const logout = useCallback(async () => {
    await fetch("/api/admin-logout", { method: "POST" });
    router.push("/admin-login");
  }, [router]);

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
          תחת כל חלק גוף: הכנס כתובת יוטיוב והוסף – ייפתח כרטיס תרגיל. ערוך את שם התרגיל בכרטיס. בסיום העתק והדבק ב־app/data/custom-exercises.json.
        </p>

        {loading ? (
          <p className="text-gray-500 py-4">טוען...</p>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={copyCustomJson}
                className="rounded-xl bg-primary-dark text-white font-medium px-4 py-2.5 hover:bg-primary-darker transition"
              >
                {copied ? "הועתק!" : "העתק custom-exercises.json"}
              </button>
              {copied && (
                <span className="text-sm text-green-600">
                  הדבק בקובץ app/data/custom-exercises.json ושמור.
                </span>
              )}
            </div>

            <div className="space-y-10">
              {CATEGORY_ORDER.map((category) => {
                const label = CATEGORY_LABELS[category];
                const customInCategory = customExercises.filter((e) => e.category === category);

                return (
                  <section key={category} className="rounded-2xl border border-gray-200 bg-white p-5">
                    <h2 className="text-lg font-bold text-primary-dark mb-4 pb-2 border-b border-gray-200">
                      {label}
                    </h2>

                    {/* Bar stays at top so you can keep adding links under same body part */}
                    <div className="sticky top-0 z-10 bg-white py-2 -mx-1 px-1 mb-3 border-b border-gray-100">
                      <p className="text-xs text-gray-500 mb-2">הוסף לינק יוטיוב – ניתן להמשיך להוסיף עוד תחת אותו איבר</p>
                      <AddExerciseBar category={category} onAdd={addCustomExercise} />
                    </div>

                    {/* Exercise cards: thumbnail + editable title + remove */}
                    {customInCategory.length > 0 && (
                      <ul className="space-y-4">
                        {customInCategory.map((ex) => (
                          <li
                            key={ex.id}
                            className="rounded-xl border border-gray-200 bg-gray-50 overflow-hidden"
                          >
                            <div className="flex gap-4 p-4">
                              <a
                                href={`https://www.youtube.com/watch?v=${ex.youtubeId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 block w-40 h-24 rounded-lg overflow-hidden bg-gray-200"
                              >
                                <img
                                  src={`https://img.youtube.com/vi/${ex.youtubeId}/hqdefault.jpg`}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              </a>
                              <div className="flex-1 min-w-0 flex flex-col gap-2">
                                <label className="text-xs text-gray-500">שם התרגיל</label>
                                <input
                                  type="text"
                                  value={ex.title}
                                  onChange={(e) => updateTitle(ex.id, e.target.value)}
                                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                  placeholder="שם התרגיל"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removeCustomExercise(ex.id)}
                                className="text-red-600 hover:text-red-700 text-sm shrink-0 self-center"
                              >
                                הסר
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
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

function AddExerciseBar({
  category,
  onAdd,
}: {
  category: Category;
  onAdd: (category: Category, youtubeLinkOrId: string) => void;
}) {
  const [link, setLink] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!link.trim()) return;
    onAdd(category, link);
    setLink("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="כתובת יוטיוב"
        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
      />
      <button
        type="submit"
        className="rounded-lg bg-primary-dark text-white font-medium px-4 py-2 text-sm hover:bg-primary-darker shrink-0"
      >
        הוסף
      </button>
    </form>
  );
}
