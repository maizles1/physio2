"use client";

import { useState, useCallback } from "react";
import {
  exercisesData,
  CATEGORY_ORDER,
  CATEGORY_LABELS,
  DEFAULT_DOSAGE,
  buildPrescriptionParam,
  type Category,
  type Dosage,
} from "@/app/data/exercises";

const ADMIN_PASSWORD = "1234";

export default function AdminBuilderClient() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedDosages, setSelectedDosages] = useState<Record<string, Dosage>>({});
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
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

  const exercisesInSelectedCategory =
    selectedCategory !== null
      ? exercisesData.filter((ex) => ex.category === selectedCategory)
      : [];

  const selectedIds = Object.keys(selectedDosages).sort((a, b) => Number(a) - Number(b));
  const selectedExercises = selectedIds
    .map((id) => exercisesData.find((e) => e.id === id))
    .filter((ex): ex is (typeof exercisesData)[0] => ex != null);

  return (
    <div className="min-h-screen pb-40 md:pb-44" dir="rtl">
      <div className="mx-auto max-w-2xl px-4 py-8">
        {selectedCategory === null ? (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">בונה תוכנית תרגילים</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {CATEGORY_ORDER.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className="aspect-square rounded-xl border-2 border-gray-200 bg-white hover:border-primary hover:bg-primary/5 transition flex items-center justify-center p-3 text-center"
                >
                  <span className="font-medium text-gray-800">{CATEGORY_LABELS[category]}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className="mb-4 text-primary-dark hover:underline flex items-center gap-1"
            >
              <span className="text-lg" aria-hidden="true">←</span>
              חזור לקטגוריות
            </button>
            <h2 className="text-xl font-bold text-primary-dark mb-4 pb-2 border-b border-gray-200">
              {CATEGORY_LABELS[selectedCategory]}
            </h2>
            <ul className="space-y-3">
              {exercisesInSelectedCategory.length === 0 ? (
                <li className="text-gray-500 text-sm py-2">אין תרגילים בקטגוריה זו</li>
              ) : (
                exercisesInSelectedCategory.map((ex) => {
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
                })
              )}
            </ul>
          </>
        )}
      </div>

      {selectedExercises.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 z-20 mx-auto max-w-2xl px-4">
          <div className="rounded-t-2xl border border-b-0 border-gray-200 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)] max-h-[50vh] overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-gray-100 font-bold text-gray-900 shrink-0">
              התרגילים שנבחרו ({selectedExercises.length})
            </div>
            <div className="overflow-y-auto p-4 space-y-3">
              {selectedExercises.map((ex) => {
                const dosage = selectedDosages[ex.id]!;
                return (
                  <div
                    key={ex.id}
                    className="rounded-xl border border-gray-200 bg-gray-50/80 p-3 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-medium text-gray-900 text-sm leading-tight">
                        {ex.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleExercise(ex.id)}
                        className="text-gray-400 hover:text-red-600 shrink-0 p-1"
                        aria-label="הסר מתוכנית"
                      >
                        ×
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <label className="flex flex-col gap-0.5">
                        <span className="text-xs text-gray-500">סטים</span>
                        <input
                          type="number"
                          min={0}
                          value={dosage.sets}
                          onChange={(e) =>
                            updateDosage(ex.id, "sets", parseInt(e.target.value, 10) || 0)
                          }
                          className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm w-full"
                        />
                      </label>
                      <label className="flex flex-col gap-0.5">
                        <span className="text-xs text-gray-500">חזרות</span>
                        <input
                          type="number"
                          min={0}
                          value={dosage.reps}
                          onChange={(e) =>
                            updateDosage(ex.id, "reps", parseInt(e.target.value, 10) || 0)
                          }
                          className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm w-full"
                        />
                      </label>
                      <label className="flex flex-col gap-0.5">
                        <span className="text-xs text-gray-500">פעמים ביום</span>
                        <input
                          type="number"
                          min={0}
                          value={dosage.perDay}
                          onChange={(e) =>
                            updateDosage(ex.id, "perDay", parseInt(e.target.value, 10) || 0)
                          }
                          className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm w-full"
                        />
                      </label>
                      <label className="flex flex-col gap-0.5">
                        <span className="text-xs text-gray-500">ימים בשבוע</span>
                        <input
                          type="number"
                          min={0}
                          max={7}
                          value={dosage.perWeek}
                          onChange={(e) =>
                            updateDosage(ex.id, "perWeek", parseInt(e.target.value, 10) || 0)
                          }
                          className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm w-full"
                        />
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg safe-area-pb z-10">
        <div className="mx-auto max-w-2xl px-4 py-4 flex items-center justify-between gap-4">
          <span className="text-sm text-gray-600">
            נבחרו {selectedIds.length} תרגילים
          </span>
          <button
            type="button"
            onClick={copyPlanUrl}
            disabled={selectedIds.length === 0}
            className="rounded-xl bg-primary-dark text-white font-medium px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-darker transition"
          >
            {copied ? "הועתק!" : "צור קישור והעתק"}
          </button>
        </div>
      </footer>
    </div>
  );
}
