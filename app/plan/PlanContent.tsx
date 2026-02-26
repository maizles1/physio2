"use client";

import { useState, useEffect, useCallback } from "react";
import { Repeat, Calendar, Clock, Check, MessageSquare, Send } from "lucide-react";
import type { PlanItem } from "./page";
import { CATEGORY_ORDER, CATEGORY_LABELS } from "@/app/data/exercises";

const DONE_KEY_PREFIX = "physio-plan-done-";

export interface PlanFeedbackMessage {
  id: string;
  author: "patient" | "therapist";
  text: string;
  createdAt: string;
  exerciseId?: string;
  exerciseTitle?: string;
}

interface PlanContentProps {
  planItems: PlanItem[];
  planId?: string;
}

/** Lightweight lazy YouTube: thumbnail until click, then iframe. Uses same thumbnail as YouTube (maxresdefault → hqdefault fallback). */
function LazyYouTube({ id, title }: { id: string; title: string }) {
  const [loaded, setLoaded] = useState(false);
  const [thumbSrc, setThumbSrc] = useState(`https://img.youtube.com/vi/${id}/maxresdefault.jpg`);
  const embedUrl = `https://www.youtube.com/embed/${id}?autoplay=1`;
  const handleThumbError = useCallback(() => {
    setThumbSrc(`https://img.youtube.com/vi/${id}/hqdefault.jpg`);
  }, [id]);

  useEffect(() => {
    setThumbSrc(`https://img.youtube.com/vi/${id}/maxresdefault.jpg`);
  }, [id]);

  if (loaded) {
    return (
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full rounded-t-2xl"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="group relative block w-full aspect-video bg-gray-900 rounded-t-2xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      aria-label={`הפעל סרטון: ${title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- YouTube thumbnail URL is dynamic external */}
      <img
        src={thumbSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        onError={handleThumbError}
      />
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/30 transition group-hover:bg-black/40">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition group-hover:scale-110 group-hover:animate-pulse">
          <svg className="mr-1 h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span className="rounded-md bg-black/40 px-3 py-1.5 text-base font-medium text-white shadow-sm">
          לחץ להפעלה
        </span>
      </span>
    </button>
  );
}

function DosageBadges({ dosage }: { dosage: PlanItem["dosage"] }) {
  const { sets, reps, perDay, perWeek, note } = dosage;
  return (
    <div className="mt-3" dir="rtl">
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary-dark px-3 py-1.5 text-sm font-medium">
          <Repeat className="h-4 w-4" aria-hidden />
          {sets} סטים × {reps} חזרות
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 text-secondary-dark px-3 py-1.5 text-sm font-medium">
          <Clock className="h-4 w-4" aria-hidden />
          {perDay} פעמים ביום
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 text-amber-800 px-3 py-1.5 text-sm font-medium">
          <Calendar className="h-4 w-4" aria-hidden />
          {perWeek} ימים בשבוע
        </span>
      </div>
      {note.trim() && (
        <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 whitespace-pre-line">
          <span className="font-semibold">הערת המטפל:</span> {note}
        </div>
      )}
    </div>
  );
}

export default function PlanContent({ planItems, planId }: PlanContentProps) {
  const byCategory = CATEGORY_ORDER.map((category) => ({
    category,
    categoryLabel: CATEGORY_LABELS[category],
    items: planItems.filter((item) => item.exercise.category === category),
  })).filter((g) => g.items.length > 0);

  const planIdsKey = planItems.map((p) => p.exercise.id).join(",");
  const [doneIds, setDoneIds] = useState<Set<string>>(() => new Set());
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored: string[] = [];
    planItems.forEach(({ exercise }) => {
      try {
        if (window.localStorage.getItem(DONE_KEY_PREFIX + exercise.id) === "1") {
          stored.push(exercise.id);
        }
      } catch {
        // ignore
      }
    });
    const next = new Set(stored);
    const t = setTimeout(() => setDoneIds(next), 0);
    return () => clearTimeout(t);
  }, [planIdsKey, planItems]);

  const toggleDone = useCallback((exerciseId: string) => {
    setDoneIds((prev) => {
      const next = new Set(prev);
      if (next.has(exerciseId)) {
        next.delete(exerciseId);
        try {
          window.localStorage.removeItem(DONE_KEY_PREFIX + exerciseId);
        } catch {
          // ignore
        }
      } else {
        next.add(exerciseId);
        try {
          window.localStorage.setItem(DONE_KEY_PREFIX + exerciseId, "1");
        } catch {
          // ignore
        }
      }
      return next;
    });
  }, []);

  const [feedbackMessages, setFeedbackMessages] = useState<PlanFeedbackMessage[]>([]);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSending, setFeedbackSending] = useState(false);
  const [exerciseTexts, setExerciseTexts] = useState<Record<string, string>>({});
  const [sendingExerciseId, setSendingExerciseId] = useState<string | null>(null);

  const fetchFeedback = useCallback(async () => {
    if (!planId) return;
    setFeedbackLoading(true);
    try {
      const res = await fetch(`/api/plan-feedback?planId=${encodeURIComponent(planId)}`);
      const data = await res.json().catch(() => ({}));
      if (Array.isArray(data?.messages)) setFeedbackMessages(data.messages);
    } catch {
      // ignore
    } finally {
      setFeedbackLoading(false);
    }
  }, [planId]);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  const sendFeedback = useCallback(async () => {
    const text = feedbackText.trim();
    if (!planId || !text || feedbackSending) return;
    setFeedbackSending(true);
    try {
      const res = await fetch("/api/plan-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, text }),
      });
      const data = await res.json().catch(() => ({}));
      if (data?.messages) setFeedbackMessages(data.messages);
      setFeedbackText("");
    } catch {
      // ignore
    } finally {
      setFeedbackSending(false);
    }
  }, [planId, feedbackText, feedbackSending]);

  const sendExerciseFeedback = useCallback(
    async (exerciseId: string, exerciseTitle: string, text: string) => {
      const t = text.trim();
      if (!planId || !t || sendingExerciseId) return;
      setSendingExerciseId(exerciseId);
      try {
        const res = await fetch("/api/plan-feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ planId, text: t, exerciseId, exerciseTitle }),
        });
        const data = await res.json().catch(() => ({}));
        if (data?.messages) setFeedbackMessages(data.messages);
        setExerciseTexts((prev) => {
          const next = { ...prev };
          delete next[exerciseId];
          return next;
        });
      } catch {
        // ignore
      } finally {
        setSendingExerciseId(null);
      }
    },
    [planId, sendingExerciseId]
  );

  return (
    <div className="space-y-10 pb-8" dir="rtl">
      {byCategory.map(({ category, categoryLabel, items }, sectionIndex) => (
        <section key={category}>
          <h2 className="text-lg font-bold text-primary-dark mb-4 pb-2 border-b-2 border-primary/20 bg-primary/5 rounded-t-xl px-4 pt-3 flex items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-dark text-white text-sm font-bold">
              {sectionIndex + 1}
            </span>
            {categoryLabel}
          </h2>
          <div className="space-y-6">
            {items.map(({ exercise: ex, dosage }) => (
              <article
                key={ex.id}
                className={`rounded-2xl border overflow-hidden transition ${
                  doneIds.has(ex.id)
                    ? "border-green-300 bg-green-50/70 shadow-sm"
                    : "border-gray-200 bg-white shadow-md hover:shadow-lg"
                }`}
              >
                {ex.youtubeId ? (
                  <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
                    <LazyYouTube id={ex.youtubeId} title={ex.title} />
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
                    אין סרטון
                  </div>
                )}
                <div className="p-5 sm:p-6">
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">{ex.title}</h3>
                  <DosageBadges dosage={dosage} />
                  <p className="mt-4 text-gray-700 leading-relaxed whitespace-pre-line">
                    {ex.instructions}
                  </p>
                  <button
                    type="button"
                    onClick={() => toggleDone(ex.id)}
                    className={`mt-4 inline-flex items-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-medium transition min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                      doneIds.has(ex.id)
                        ? "border-green-600 bg-green-100 text-green-900"
                        : "border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className={doneIds.has(ex.id) ? "text-green-700" : "text-gray-400"}>
                      <Check className={doneIds.has(ex.id) ? "h-6 w-6" : "h-5 w-5"} strokeWidth={2.5} aria-hidden />
                    </span>
                    {doneIds.has(ex.id) ? "בוצע" : "סמן כבוצע"}
                  </button>
                  {planId && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-2">איך היה התרגיל? – הערה למטפל</p>
                      {feedbackMessages.filter((m) => m.exerciseId === ex.id).length > 0 && (
                        <ul className="space-y-2 mb-3">
                          {feedbackMessages
                            .filter((m) => m.exerciseId === ex.id)
                            .map((msg) => (
                              <li
                                key={msg.id}
                                className={`flex ${msg.author === "therapist" ? "justify-start" : "justify-end"}`}
                              >
                                <div
                                  className={`max-w-[90%] rounded-lg px-2.5 py-1.5 text-sm ${
                                    msg.author === "therapist"
                                      ? "bg-primary/10 text-primary-darker border border-primary/20"
                                      : "bg-gray-100 text-gray-900 border border-gray-200"
                                  }`}
                                >
                                  <p className="whitespace-pre-wrap">{msg.text}</p>
                                  <p className="text-xs mt-1 opacity-80">
                                    {msg.author === "therapist" ? "המטפל" : "אני"} · {new Date(msg.createdAt).toLocaleDateString("he-IL", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                                  </p>
                                </div>
                              </li>
                            ))}
                        </ul>
                      )}
                      <div className="flex gap-2">
                        <textarea
                          value={exerciseTexts[ex.id] ?? ""}
                          onChange={(e) =>
                            setExerciseTexts((prev) => ({ ...prev, [ex.id]: e.target.value }))
                          }
                          placeholder="כתוב איך היה התרגיל או שאלה..."
                          rows={2}
                          className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm resize-y focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                          disabled={sendingExerciseId !== null}
                        />
                        <button
                          type="button"
                          onClick={() => sendExerciseFeedback(ex.id, ex.title, exerciseTexts[ex.id] ?? "")}
                          disabled={sendingExerciseId !== null || !(exerciseTexts[ex.id] ?? "").trim()}
                          className="rounded-xl bg-primary-dark text-white px-3 py-2 min-h-[44px] flex items-center gap-1.5 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-darker transition shrink-0"
                        >
                          <Send className="h-4 w-4" aria-hidden />
                          {sendingExerciseId === ex.id ? "שולח..." : "שלח"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
      {planId && (
        <section className="rounded-2xl border border-gray-200 bg-white shadow-md overflow-hidden">
          <h2 className="text-lg font-bold text-primary-dark px-4 py-3 border-b border-gray-100 flex items-center gap-2">
            <MessageSquare className="h-5 w-5" aria-hidden />
            איך היה התרגול? – התכתבות עם המטפל
          </h2>
          <div className="p-4 space-y-4">
            {feedbackLoading ? (
              <p className="text-gray-500 text-sm">טוען הודעות...</p>
            ) : feedbackMessages.length === 0 ? (
              <p className="text-gray-500 text-sm">אין עדיין הודעות. כתוב איך היה התרגול והמטפל יוכל לראות ולהיענות.</p>
            ) : (
              <ul className="space-y-3">
                {feedbackMessages.map((msg) => (
                  <li
                    key={msg.id}
                    className={`flex ${msg.author === "therapist" ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                        msg.author === "therapist"
                          ? "bg-primary/10 text-primary-darker border border-primary/20"
                          : "bg-gray-100 text-gray-900 border border-gray-200"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      <p className="text-xs mt-1 opacity-80">
                        {msg.author === "therapist" ? "המטפל" : "אני"} · {new Date(msg.createdAt).toLocaleDateString("he-IL", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex gap-2">
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="כתוב איך היה התרגול או שאלה למטפל..."
                rows={2}
                className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm resize-y focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                disabled={feedbackSending}
              />
              <button
                type="button"
                onClick={sendFeedback}
                disabled={feedbackSending || !feedbackText.trim()}
                className="rounded-xl bg-primary-dark text-white px-4 py-2 min-h-[44px] flex items-center gap-1.5 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-darker transition shrink-0"
              >
                <Send className="h-4 w-4" aria-hidden />
                {feedbackSending ? "שולח..." : "שלח"}
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
