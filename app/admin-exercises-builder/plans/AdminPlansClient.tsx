"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, MessageSquare, Send } from "lucide-react";

interface PlanFeedbackMessage {
  id: string;
  author: "patient" | "therapist";
  text: string;
  createdAt: string;
}

interface SavedPlan {
  id: string;
  patientName: string;
  prescriptionParam: string;
  createdAt: string;
  updatedAt?: string;
  feedback?: PlanFeedbackMessage[];
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
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [expandedFeedbackId, setExpandedFeedbackId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyingPlanId, setReplyingPlanId] = useState<string | null>(null);

  const fetchPlans = useCallback(() => {
    fetch("/api/admin-saved-plans", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : { plans: [] }))
      .then((data) => {
        if (Array.isArray(data?.plans)) setPlans(data.plans);
      })
      .catch(() => setPlans([]));
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch("/api/admin-saved-plans", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : { plans: [] }))
      .then((data) => {
        if (!cancelled && Array.isArray(data?.plans)) {
          setPlans(data.plans);
        }
      })
      .catch(() => { if (!cancelled) setPlans([]); })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const copyPlanLink = useCallback((plan: SavedPlan) => {
    const params = new URLSearchParams();
    params.set("planId", plan.id);
    params.set("p", plan.prescriptionParam);
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/plan?${params.toString()}`
        : "";
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(plan.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }, []);

  const sendReply = useCallback(async (planId: string, text: string) => {
    const t = text.trim();
    if (!t || replyingPlanId) return;
    setReplyingPlanId(planId);
    try {
      const res = await fetch("/api/admin-plan-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ planId, text: t }),
      });
      if (res.ok) {
        setReplyText("");
        fetchPlans();
      }
    } catch {
      // ignore
    } finally {
      setReplyingPlanId(null);
    }
  }, [replyingPlanId, fetchPlans]);

  const deletePlan = useCallback(async (plan: SavedPlan) => {
    if (!confirm(`למחוק את התוכנית של ${plan.patientName}?`)) return;
    setDeletingId(plan.id);
    try {
      const res = await fetch("/api/admin-saved-plans", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: plan.id }),
      });
      if (res.ok) {
        setPlans((prev) => prev.filter((p) => p.id !== plan.id));
      }
    } catch {
      // ignore
    } finally {
      setDeletingId(null);
    }
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
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-10 text-center shadow-sm">
            <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark mb-4" aria-hidden>
              <Calendar className="w-7 h-7" />
            </div>
            <p className="text-gray-800 font-medium">אין עדיין תוכניות שמורות</p>
            <p className="text-sm text-gray-600 mt-1">
              בנה תוכנית ושמור תחת שם המטופל – אז תוכל לחזור אליה ולערוך בכל זמן.
            </p>
            <Link
              href="/admin-exercises-builder"
              className="inline-block mt-6 rounded-xl bg-primary-dark text-white font-medium px-6 py-3 min-h-[44px] hover:bg-primary-darker shadow-sm transition"
            >
              בונה תוכנית
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {plans.map((plan) => (
              <li
                key={plan.id}
                className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-md hover:shadow-lg hover:border-primary/30 transition flex flex-wrap items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {plan.patientName}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 shrink-0" aria-hidden />
                    {plan.updatedAt
                      ? `עודכן: ${formatDate(plan.updatedAt)}`
                      : formatDate(plan.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => copyPlanLink(plan)}
                    className="rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 min-h-[44px] flex items-center"
                  >
                    {copiedId === plan.id ? "הועתק!" : "פתח קישור / העתק"}
                  </button>
                  <Link
                    href={`/admin-exercises-builder?load=${encodeURIComponent(plan.id)}`}
                    className="rounded-xl bg-primary-dark text-white px-4 py-2 text-sm font-medium hover:bg-primary-darker min-h-[44px] flex items-center shadow-sm"
                  >
                    ערוך
                  </Link>
                  <button
                    type="button"
                    onClick={() => deletePlan(plan)}
                    disabled={deletingId === plan.id}
                    className="rounded-xl border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 min-h-[44px] flex items-center"
                    aria-label={`מחק תוכנית של ${plan.patientName}`}
                  >
                    {deletingId === plan.id ? "מוחק..." : "מחק"}
                  </button>
                </div>
                <div className="w-full flex flex-col gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setExpandedFeedbackId((prev) => (prev === plan.id ? null : plan.id));
                      if (expandedFeedbackId !== plan.id) setReplyText("");
                    }}
                    className="rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 min-h-[44px] flex items-center gap-2 w-fit"
                  >
                    <MessageSquare className="h-4 w-4" aria-hidden />
                    הערות המטופל
                    {(plan.feedback?.length ?? 0) > 0 && (
                      <span className="bg-primary/20 text-primary-darker text-xs px-1.5 py-0.5 rounded-full">
                        {plan.feedback!.length}
                      </span>
                    )}
                  </button>
                  {expandedFeedbackId === plan.id && (
                    <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-3 space-y-3">
                      {!(plan.feedback && plan.feedback.length > 0) ? (
                        <p className="text-gray-500 text-sm">אין עדיין הודעות מהמטופל.</p>
                      ) : (
                        <ul className="space-y-2">
                          {plan.feedback!.map((msg) => (
                            <li
                              key={msg.id}
                              className={`flex ${msg.author === "therapist" ? "justify-start" : "justify-end"}`}
                            >
                              <div
                                className={`max-w-[85%] rounded-lg px-2.5 py-1.5 text-sm ${
                                  msg.author === "therapist"
                                    ? "bg-primary/15 text-primary-darker border border-primary/25"
                                    : "bg-white border border-gray-200 text-gray-900"
                                }`}
                              >
                                <p className="whitespace-pre-wrap">{msg.text}</p>
                                <p className="text-xs mt-1 opacity-80">
                                  {msg.author === "therapist" ? "אני" : "המטופל"} · {new Date(msg.createdAt).toLocaleDateString("he-IL", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="flex gap-2">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="השב למטופל..."
                          rows={2}
                          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm resize-y focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                          disabled={replyingPlanId !== null}
                        />
                        <button
                          type="button"
                          onClick={() => sendReply(plan.id, replyText)}
                          disabled={replyingPlanId !== null || !replyText.trim()}
                          className="rounded-xl bg-primary-dark text-white px-3 py-2 text-sm font-medium min-h-[44px] flex items-center gap-1.5 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-darker transition"
                        >
                          <Send className="h-4 w-4" aria-hidden />
                          {replyingPlanId === plan.id ? "שולח..." : "שלח"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
