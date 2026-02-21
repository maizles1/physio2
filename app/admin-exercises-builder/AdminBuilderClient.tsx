"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CATEGORY_ORDER,
  CATEGORY_LABELS,
  DEFAULT_DOSAGE,
  buildPrescriptionParam,
  parsePrescriptionParam,
  type Category,
  type Dosage,
  type Exercise,
} from "@/app/data/exercises";

interface SavedPlanItem {
  id: string;
  patientName: string;
  prescriptionParam: string;
  createdAt: string;
  updatedAt?: string;
}

export default function AdminBuilderClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [exercisesLoading, setExercisesLoading] = useState(true);
  const [selectedDosages, setSelectedDosages] = useState<Record<string, Dosage>>({});
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [copied, setCopied] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [updatePlanId, setUpdatePlanId] = useState<string>("");
  const [savedPlans, setSavedPlans] = useState<SavedPlanItem[]>([]);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    fetch("/api/exercises")
      .then((r) => (r.ok ? r.json() : { exercises: [] }))
      .then((data) => {
        setAllExercises(Array.isArray(data?.exercises) ? data.exercises : []);
      })
      .catch(() => setAllExercises([]))
      .finally(() => setExercisesLoading(false));
  }, []);

  const loadPlanId = searchParams.get("load");
  useEffect(() => {
    if (!loadPlanId) return;
    let cancelled = false;
    fetch("/api/admin-saved-plans", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : { plans: [] }))
      .then((data) => {
        if (cancelled || !Array.isArray(data?.plans)) return;
        const plan = data.plans.find((p: SavedPlanItem) => p.id === loadPlanId);
        if (!plan) return;
        const items = parsePrescriptionParam(plan.prescriptionParam);
        const dosages: Record<string, Dosage> = {};
        for (const { id, dosage } of items) {
          dosages[id] = dosage;
        }
        setSelectedDosages(dosages);
        setPatientName(plan.patientName);
        setUpdatePlanId(plan.id);
        router.replace("/admin-exercises-builder", { scroll: false });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [loadPlanId, router]);

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

  const updateNumericDosage = useCallback((id: string, field: "sets" | "reps" | "perDay" | "perWeek", value: number) => {
    setSelectedDosages((prev) => {
      const current = prev[id] ?? { ...DEFAULT_DOSAGE };
      return { ...prev, [id]: { ...current, [field]: Math.max(0, value) } };
    });
  }, []);

  const updateNote = useCallback((id: string, note: string) => {
    setSelectedDosages((prev) => {
      const current = prev[id] ?? { ...DEFAULT_DOSAGE };
      return { ...prev, [id]: { ...current, note } };
    });
  }, []);

  const clearAll = useCallback(() => {
    setSelectedDosages({});
    setCopied(false);
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

  useEffect(() => {
    if (!saveModalOpen) return;
    fetch("/api/admin-saved-plans", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : { plans: [] }))
      .then((data) => {
        setSavedPlans(Array.isArray(data?.plans) ? data.plans : []);
      })
      .catch(() => setSavedPlans([]));
  }, [saveModalOpen]);

  const savePlanUnderPatient = useCallback(async () => {
    const name = patientName.trim();
    if (!name) {
      setSaveError("הזן שם מטופל");
      return;
    }
    const ids = Object.keys(selectedDosages).sort((a, b) => {
      const aNum = Number(a);
      const bNum = Number(b);
      if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) return aNum - bNum;
      return String(a).localeCompare(String(b));
    });
    const items = ids.map((id) => ({ id, dosage: selectedDosages[id]! }));
    const prescriptionParam = buildPrescriptionParam(items);
    setSaveStatus("saving");
    setSaveError("");
    try {
      const body: { patientName: string; prescriptionParam: string; id?: string } = {
        patientName: name,
        prescriptionParam,
      };
      if (updatePlanId) body.id = updatePlanId;
      const res = await fetch("/api/admin-saved-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg =
          res.status === 401
            ? "התחבר מחדש לאדמין ונסה שוב"
            : (typeof data?.error === "string" ? data.error : "שמירה נכשלה");
        setSaveError(msg);
        setSaveStatus("error");
        return;
      }
      setSaveStatus("success");
      setSaveModalOpen(false);
      setPatientName("");
      setUpdatePlanId("");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch {
      setSaveError("שגיאת רשת");
      setSaveStatus("error");
    }
  }, [patientName, updatePlanId, selectedDosages]);

  const exercisesInSelectedCategory =
    selectedCategory !== null ? allExercises.filter((e) => e.category === selectedCategory) : [];
  const filteredExercisesInSelectedCategory = useMemo(() => {
    if (!searchTerm.trim()) return exercisesInSelectedCategory;
    const q = searchTerm.trim().toLowerCase();
    return exercisesInSelectedCategory.filter((ex) => ex.title.toLowerCase().includes(q));
  }, [exercisesInSelectedCategory, searchTerm]);

  const selectedIds = Object.keys(selectedDosages).sort((a, b) => {
    const aNum = Number(a);
    const bNum = Number(b);
    if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) return aNum - bNum;
    return String(a).localeCompare(String(b));
  });
  const selectedExercises = selectedIds
    .map((id) => allExercises.find((e) => e.id === id))
    .filter((ex): ex is Exercise => ex != null);

  const logout = useCallback(async () => {
    await fetch("/api/admin-logout", { method: "POST" });
    router.push("/admin-login");
  }, [router]);

  return (
    <div className="min-h-screen pb-56 md:pb-60" dir="rtl">
      <div className="mx-auto max-w-2xl px-4 py-8">
        {selectedCategory === null ? (
          <>
            <div className="mb-6 flex items-center justify-between gap-3">
              <h1 className="text-2xl font-bold text-gray-900">בונה תוכנית תרגילים</h1>
              <div className="flex items-center gap-2">
                <Link
                  href="/admin-exercises-builder/plans"
                  className="text-sm rounded-lg border border-gray-300 px-3 py-1.5 text-gray-700 hover:bg-gray-50"
                >
                  תוכניות שמורות
                </Link>
                <Link
                  href="/admin-exercises-builder/youtube"
                  className="text-sm rounded-lg border border-gray-300 px-3 py-1.5 text-gray-700 hover:bg-gray-50"
                >
                  הגדרת סרטונים
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="text-sm rounded-lg border border-gray-300 px-3 py-1.5 text-gray-700 hover:bg-gray-50"
                >
                  יציאה
                </button>
              </div>
            </div>
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
            <div className="mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="חיפוש תרגיל בקטגוריה..."
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
              />
            </div>
            <ul className="space-y-3">
              {exercisesLoading ? (
                <li className="text-gray-500 text-sm py-2">טוען תרגילים...</li>
              ) : filteredExercisesInSelectedCategory.length === 0 ? (
                <li className="text-gray-500 text-sm py-2">אין תרגילים בקטגוריה זו. הוסף תרגילים בהגדרת סרטונים.</li>
              ) : (
                filteredExercisesInSelectedCategory.map((ex) => {
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
                                  updateNumericDosage(ex.id, "sets", parseInt(e.target.value, 10) || 0)
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
                                  updateNumericDosage(ex.id, "reps", parseInt(e.target.value, 10) || 0)
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
                                  updateNumericDosage(ex.id, "perDay", parseInt(e.target.value, 10) || 0)
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
                                  updateNumericDosage(ex.id, "perWeek", parseInt(e.target.value, 10) || 0)
                                }
                                className="rounded-lg border border-gray-300 px-3 py-2 text-sm w-full"
                              />
                            </label>
                            <label className="col-span-2 sm:col-span-4 flex flex-col gap-1">
                              <span className="text-xs text-gray-500">הערה אישית למטופל</span>
                              <textarea
                                value={dosage.note}
                                onChange={(e) => updateNote(ex.id, e.target.value)}
                                rows={2}
                                placeholder="לדוגמה: לשים לב לנשימה ולבצע לאט"
                                className="rounded-lg border border-gray-300 px-3 py-2 text-sm w-full resize-y"
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
          <div className="rounded-2xl border border-gray-200 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)] h-36 overflow-hidden flex flex-col">
            <div className="px-4 py-2 border-b border-gray-100 font-bold text-gray-900 text-sm shrink-0">
              התרגילים שנבחרו ({selectedExercises.length})
            </div>
            <div className="p-2 overflow-x-auto overflow-y-hidden">
              <div className="flex gap-2 h-full">
                {selectedExercises.map((ex) => {
                  const dosage = selectedDosages[ex.id]!;
                  return (
                    <div
                      key={ex.id}
                      className="shrink-0 w-56 rounded-xl border border-gray-200 bg-gray-50 p-2 flex flex-col gap-1"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-medium text-gray-900 text-xs leading-tight line-clamp-2">
                          {ex.title}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleExercise(ex.id)}
                          className="text-gray-400 hover:text-red-600 shrink-0 p-1 leading-none"
                          aria-label="הסר מתוכנית"
                        >
                          ×
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 mt-auto">
                        <label className="flex flex-col gap-0.5">
                          <span className="text-[10px] text-gray-500">סטים</span>
                          <input
                            type="number"
                            min={0}
                            value={dosage.sets}
                            onChange={(e) =>
                              updateNumericDosage(ex.id, "sets", parseInt(e.target.value, 10) || 0)
                            }
                            className="rounded-md border border-gray-300 px-1.5 py-1 text-xs w-full"
                          />
                        </label>
                        <label className="flex flex-col gap-0.5">
                          <span className="text-[10px] text-gray-500">חזרות</span>
                          <input
                            type="number"
                            min={0}
                            value={dosage.reps}
                            onChange={(e) =>
                              updateNumericDosage(ex.id, "reps", parseInt(e.target.value, 10) || 0)
                            }
                            className="rounded-md border border-gray-300 px-1.5 py-1 text-xs w-full"
                          />
                        </label>
                        <label className="flex flex-col gap-0.5">
                          <span className="text-[10px] text-gray-500">ימים/שבוע</span>
                          <input
                            type="number"
                            min={0}
                            max={7}
                            value={dosage.perWeek}
                            onChange={(e) =>
                              updateNumericDosage(ex.id, "perWeek", parseInt(e.target.value, 10) || 0)
                            }
                            className="rounded-md border border-gray-300 px-1.5 py-1 text-xs w-full"
                          />
                        </label>
                      </div>
                    <textarea
                      value={dosage.note}
                      onChange={(e) => updateNote(ex.id, e.target.value)}
                      rows={1}
                      placeholder="הערה אישית..."
                      className="rounded-md border border-gray-300 px-2 py-1 text-xs w-full resize-none"
                    />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg safe-area-pb z-10">
        <div className="mx-auto max-w-2xl px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm text-gray-600">
            נבחרו {selectedIds.length} תרגילים
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSaveModalOpen(true)}
              disabled={selectedIds.length === 0}
              className="rounded-xl border border-primary-dark text-primary-dark font-medium px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/10 transition"
            >
              שמור תוכנית תחת שם המטופל
            </button>
            <button
              type="button"
              onClick={copyPlanUrl}
              disabled={selectedIds.length === 0}
              className="rounded-xl bg-primary-dark text-white font-medium px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-darker transition"
            >
              {copied ? "הועתק!" : "צור קישור והעתק"}
            </button>
            <button
              type="button"
              onClick={clearAll}
              disabled={selectedIds.length === 0}
              className="rounded-xl border border-gray-300 bg-white text-gray-700 font-medium px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
            >
              נקה הכל
            </button>
          </div>
        </div>
      </footer>

      {saveModalOpen && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center p-4 bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="save-plan-title"
          onClick={() => {
            setSaveModalOpen(false);
            setSaveError("");
            setSaveStatus("idle");
          }}
        >
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6" dir="rtl" onClick={(e) => e.stopPropagation()}>
            <h2 id="save-plan-title" className="text-lg font-bold text-gray-900 mb-4">שמור תוכנית תחת שם המטופל</h2>
            <label className="block text-sm font-medium text-gray-700 mb-1">שם המטופל (חובה)</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="לדוגמה: ישראל ישראלי"
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none mb-4"
              autoFocus
              aria-required="true"
            />
            {savedPlans.length > 0 && (
              <>
                <label className="block text-sm font-medium text-gray-700 mb-1">עדכן תוכנית קיימת (אופציונלי)</label>
                <select
                  value={updatePlanId}
                  onChange={(e) => {
                    const id = e.target.value;
                    setUpdatePlanId(id);
                    const plan = savedPlans.find((p) => p.id === id);
                    if (plan) setPatientName(plan.patientName);
                  }}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none mb-4"
                >
                  <option value="">תוכנית חדשה</option>
                  {savedPlans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.patientName} ({new Date(p.updatedAt ?? p.createdAt).toLocaleDateString("he-IL")})
                    </option>
                  ))}
                </select>
              </>
            )}
            {saveError && (
              <div className="mb-2 p-2 rounded-lg bg-red-50 border border-red-200 max-h-24 overflow-y-auto">
                <p className="text-sm text-red-700 whitespace-pre-wrap">{saveError}</p>
              </div>
            )}
            {saveStatus === "success" && <p className="text-sm text-green-700 mb-2">התוכנית נשמרה בהצלחה.</p>}
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => {
                  setSaveModalOpen(false);
                  setSaveError("");
                  setSaveStatus("idle");
                }}
                className="rounded-xl border border-gray-300 px-4 py-2.5 text-gray-700 hover:bg-gray-50"
              >
                ביטול
              </button>
              <button
                type="button"
                onClick={savePlanUnderPatient}
                disabled={saveStatus === "saving" || !patientName.trim()}
                className="rounded-xl bg-primary-dark text-white font-medium px-5 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-darker"
              >
                {saveStatus === "saving" ? "שומר..." : "שמור"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
