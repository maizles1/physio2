"use client";

import { useState, useCallback } from "react";
import {
  exercisesData,
  CATEGORY_ORDER,
  CATEGORY_LABELS,
  DEFAULT_DOSAGE,
  buildPrescriptionParam,
  type Dosage,
} from "@/app/data/exercises";

const ADMIN_PASSWORD = "1234";

export default function AdminBuilderClient() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedDosages, setSelectedDosages] = useState<Record<string, Dosage>>({});
  const [copied, setCopied] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (password === ADMIN_PASSWORD) setAuthenticated(true);
    },
    [password]
  );

  const toggleExercise = useCallback((id: string) => {
    setSelectedDosages((prev) => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
        return next;
      }
      next[id] = { ...DEFAULT_DOSAGE };
      return next;
    });
  }, []);

  const updateDosage = useCallback((id: string, field: keyof Dosage, value: number) => {
    setSelectedDosages((prev) => {
      const current = prev[id] ?? { ...DEFAULT_DOSAGE };
      return { ...prev, [id]: { ...current, [field]: Math.max(0, value) } };
    });
  }, []);

  const copyPlanUrl = useCallback(() => {
    const ids = Object.keys(selectedDosages).sort((a, b) => Number(a) - Number(b));
    if (ids.length === 0) return;
    const items = ids.map((id) => ({ id, dosage: selectedDosages[id]! }));
    const param = buildPrescriptionParam(items);
    const path = `/plan?p=${param}`;
    const url = typeof window !== "undefined" ? `${window.location.origin}${path}` : path;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [selectedDosages]);

  if (!authenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4" dir="rtl">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm rounded-2xl bg-white shadow-lg border border-gray-200 p-8"
        >
          <label htmlFor="admin-password" className="block text-lg font-medium text-gray-800 mb-3">
            סיסמה
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="הזן סיסמה"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
            autoComplete="off"
          />
          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-primary-dark text-white font-medium py-3 hover:bg-primary-darker transition"
          >
            כניסה
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-28" dir="rtl">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">בונה תוכנית תרגילים</h1>
        <p className="text-gray-600 mb-6">
          לחץ על תרגיל כדי לסמן או לבטל. עבור תרגילים נבחרים – הגדר מינון. בסיום צור קישור והעתק ללוח.
        </p>

        <div className="space-y-8">
          {CATEGORY_ORDER.map((category) => {
            const exercisesInCategory = exercisesData.filter((ex) => ex.category === category);
            return (
              <section key={category}>
                <h2 className="text-lg font-bold text-primary-dark mb-3 pb-2 border-b border-gray-200">
                  {CATEGORY_LABELS[category]}
                </h2>
                <ul className="space-y-3">
                  {exercisesInCategory.length === 0 ? (
                    <li className="text-gray-500 text-sm py-2">אין תרגילים בקטגוריה זו</li>
                  ) : exercisesInCategory.map((ex) => {
                    const selected = !!selectedDosages[ex.id];
                    const dosage = selected ? selectedDosages[ex.id]! : DEFAULT_DOSAGE;
                    return (
                      <li key={ex.id}>
                        <div
                          className={`rounded-xl border-2 overflow-hidden transition ${
                            selected
                              ? "border-primary bg-primary/5"
                              : "border-gray-200 bg-white"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => toggleExercise(ex.id)}
                            className={`w-full text-right p-4 transition ${
                              selected
                                ? "text-primary-darker"
                                : "hover:bg-gray-50 text-gray-800"
                            }`}
                          >
                            <span className="font-medium block">{ex.title}</span>
                          </button>
                          {selected && (
                            <div
                              className="px-4 pb-4 pt-0 grid grid-cols-2 sm:grid-cols-4 gap-3"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <label className="flex flex-col gap-1">
                                <span className="text-xs text-gray-500">סטים</span>
                                <input
                                  type="number"
                                  min={0}
                                  value={dosage.sets}
                                  onChange={(e) =>
                                    updateDosage(ex.id, "sets", parseInt(e.target.value, 10) || 0)
                                  }
                                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm w-full"
                                />
                              </label>
                              <label className="flex flex-col gap-1">
                                <span className="text-xs text-gray-500">חזרות</span>
                                <input
                                  type="number"
                                  min={0}
                                  value={dosage.reps}
                                  onChange={(e) =>
                                    updateDosage(ex.id, "reps", parseInt(e.target.value, 10) || 0)
                                  }
                                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm w-full"
                                />
                              </label>
                              <label className="flex flex-col gap-1">
                                <span className="text-xs text-gray-500">פעמים ביום</span>
                                <input
                                  type="number"
                                  min={0}
                                  value={dosage.perDay}
                                  onChange={(e) =>
                                    updateDosage(ex.id, "perDay", parseInt(e.target.value, 10) || 0)
                                  }
                                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm w-full"
                                />
                              </label>
                              <label className="flex flex-col gap-1">
                                <span className="text-xs text-gray-500">ימים בשבוע</span>
                                <input
                                  type="number"
                                  min={0}
                                  max={7}
                                  value={dosage.perWeek}
                                  onChange={(e) =>
                                    updateDosage(ex.id, "perWeek", parseInt(e.target.value, 10) || 0)
                                  }
                                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm w-full"
                                />
                              </label>
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg safe-area-pb">
        <div className="mx-auto max-w-2xl px-4 py-4 flex items-center justify-between gap-4">
          <span className="text-sm text-gray-600">
            נבחרו {Object.keys(selectedDosages).length} תרגילים
          </span>
          <button
            type="button"
            onClick={copyPlanUrl}
            disabled={Object.keys(selectedDosages).length === 0}
            className="rounded-xl bg-primary-dark text-white font-medium px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-darker transition"
          >
            {copied ? "הועתק!" : "צור קישור והעתק"}
          </button>
        </div>
      </footer>
    </div>
  );
}
