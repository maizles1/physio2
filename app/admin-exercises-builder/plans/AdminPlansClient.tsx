"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SavedPlan {
  id: string;
  patientName: string;
  prescriptionParam: string;
  createdAt: string;
  updatedAt?: string;
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("he-IL", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function AdminPlansClient() {
  const router = useRouter();
  const [plans, setPlans] = useState<SavedPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin-saved-plans", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : { plans: [] }))
      .then((data) => {
        if (!cancelled && Array.isArray(data?.plans)) {
          setPlans(data.plans);
        }
      })
      .catch(() => setPlans([]))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const copyPlanLink = useCallback((plan: SavedPlan) => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/plan?p=${encodeURIComponent(plan.prescriptionParam)}`
        : "";
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(plan.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/admin-logout", { method: "POST" });
    router.push("/admin-login");
  }, [router]);

  return (
    <div className="min-h-screen pb-12" dir="rtl">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/admin-exercises-builder"
              className="text-primary-dark hover:underline"
            >
              ← בונה תוכנית
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">תוכניות שמורות</h1>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              אזור אדמין
            </span>
          </div>
          <button
            type="button"
            onClick={logout}
            className="text-sm rounded-lg border border-gray-300 px-3 py-1.5 text-gray-700 hover:bg-gray-50"
          >
            יציאה
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500 py-4">טוען...</p>
        ) : plans.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">
            <p className="text-gray-700">אין עדיין תוכניות שמורות.</p>
            <p className="text-sm text-gray-500 mt-2">
              בבניית תוכנית לחץ &quot;שמור תוכנית תחת שם המטופל&quot; כדי לשמור.
            </p>
            <Link
              href="/admin-exercises-builder"
              className="inline-block mt-4 rounded-xl bg-primary-dark text-white font-medium px-5 py-2.5 hover:bg-primary-darker"
            >
              בונה תוכנית
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {plans.map((plan) => (
              <li
                key={plan.id}
                className="rounded-xl border border-gray-200 bg-white p-4 flex flex-wrap items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {plan.patientName}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {plan.updatedAt
                      ? `עודכן: ${formatDate(plan.updatedAt)}`
                      : formatDate(plan.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => copyPlanLink(plan)}
                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    {copiedId === plan.id ? "הועתק!" : "פתח קישור / העתק"}
                  </button>
                  <Link
                    href={`/admin-exercises-builder?load=${encodeURIComponent(plan.id)}`}
                    className="rounded-lg border border-primary-dark bg-white px-3 py-1.5 text-sm text-primary-dark hover:bg-primary/10"
                  >
                    ערוך
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
