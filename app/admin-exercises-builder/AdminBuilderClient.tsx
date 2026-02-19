"use client";

import { useState, useCallback } from "react";
import { EXERCISES, CATEGORIES } from "@/app/data/exercises";

const ADMIN_PASSWORD = "1234";

export default function AdminBuilderClient() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [copied, setCopied] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (password === ADMIN_PASSWORD) setAuthenticated(true);
    },
    [password]
  );

  const toggleExercise = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const copyPlanUrl = useCallback(() => {
    const ids = Array.from(selectedIds).sort((a, b) => a - b);
    if (ids.length === 0) return;
    const path = `/plan?ids=${ids.join(",")}`;
    const url = typeof window !== "undefined" ? `${window.location.origin}${path}` : path;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [selectedIds]);

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
        <p className="text-gray-600 mb-6">לחץ על תרגיל כדי לסמן או לבטל. בסיום צור קישור והעתק ללוח.</p>

        <div className="space-y-8">
          {CATEGORIES.map((category) => {
            const exercisesInCategory = EXERCISES.filter((ex) => ex.category === category);
            if (exercisesInCategory.length === 0) return null;
            return (
              <section key={category}>
                <h2 className="text-lg font-bold text-primary-dark mb-3 pb-2 border-b border-gray-200">
                  {category}
                </h2>
                <ul className="space-y-3">
                  {exercisesInCategory.map((ex) => {
                    const selected = selectedIds.has(ex.id);
                    return (
                      <li key={ex.id}>
                        <button
                          type="button"
                          onClick={() => toggleExercise(ex.id)}
                          className={`w-full text-right rounded-xl border-2 p-4 transition ${
                            selected
                              ? "border-primary bg-primary/10 text-primary-darker"
                              : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 text-gray-800"
                          }`}
                        >
                          <span className="font-medium block">{ex.title}</span>
                        </button>
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
            נבחרו {selectedIds.size} תרגילים
          </span>
          <button
            type="button"
            onClick={copyPlanUrl}
            disabled={selectedIds.size === 0}
            className="rounded-xl bg-primary-dark text-white font-medium px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-darker transition"
          >
            {copied ? "הועתק!" : "צור קישור והעתק"}
          </button>
        </div>
      </footer>
    </div>
  );
}
