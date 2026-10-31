"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LEAD_SOURCE_LABELS } from "@/lib/leadOptions";

interface AdminLead {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  area?: string;
  page?: string;
  source: string;
  createdAt: string;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("he-IL", {
      timeZone: "Asia/Jerusalem",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function sourceLabel(source: string): string {
  return LEAD_SOURCE_LABELS[source as keyof typeof LEAD_SOURCE_LABELS] ?? source;
}

/** Turns 050-1234567 into 972501234567 for a wa.me link. */
function toWhatsApp(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("0") ? `972${digits.slice(1)}` : digits;
}

export default function AdminLeadsClient() {
  const router = useRouter();
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin-leads", { credentials: "include", cache: "no-store" });
      if (res.status === 401) {
        router.push("/admin-login?next=/admin-exercises-builder/leads");
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || "טעינת הלידים נכשלה.");
        return;
      }
      setLeads(Array.isArray(data?.leads) ? data.leads : []);
    } catch {
      setError("טעינת הלידים נכשלה. בדקו את החיבור לאינטרנט.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  const logout = useCallback(async () => {
    await fetch("/api/admin-logout", { method: "POST" });
    router.push("/admin-login");
  }, [router]);

  return (
    <div className="min-h-screen pb-12" dir="rtl">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/admin-exercises-builder" className="text-primary-dark hover:underline">
              ← בונה תוכנית
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">לידים</h1>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">אזור אדמין</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={load}
              className="text-sm rounded-lg border border-gray-300 px-3 py-1.5 text-gray-700 hover:bg-gray-50"
            >
              רענון
            </button>
            <button
              type="button"
              onClick={logout}
              className="text-sm rounded-lg border border-gray-300 px-3 py-1.5 text-gray-700 hover:bg-gray-50"
            >
              יציאה
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-500 py-4">טוען...</p>
        ) : error ? (
          <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</p>
        ) : leads.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-10 text-center shadow-sm">
            <p className="text-gray-800 font-medium">אין עדיין לידים</p>
            <p className="text-sm text-gray-600 mt-1">כשמישהו ימלא את הטופס באתר, הוא יופיע כאן.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-3">סה״כ {leads.length} לידים · החדשים למעלה</p>
            <ul className="space-y-3">
              {leads.map((lead, i) => (
                <li
                  key={`${lead.createdAt}-${i}`}
                  className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-md"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 text-lg">{lead.name}</p>
                      <p className="text-gray-800" dir="ltr" style={{ textAlign: "right" }}>
                        {lead.phone}
                      </p>
                      {lead.area && (
                        <p className="mt-1 inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-sm text-[#2A3080]">
                          {lead.area}
                        </p>
                      )}
                      {lead.email && <p className="text-sm text-gray-700 mt-1">{lead.email}</p>}
                      {lead.message && (
                        <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">{lead.message}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        {formatDate(lead.createdAt)} · {sourceLabel(lead.source)}
                        {lead.page ? ` (${lead.page})` : ""}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <a
                        href={`tel:${lead.phone}`}
                        className="rounded-lg bg-[#2080C0] px-3 py-2 text-sm font-semibold text-white hover:bg-[#1a6ea5]"
                      >
                        התקשר
                      </a>
                      <a
                        href={`https://wa.me/${toWhatsApp(lead.phone)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-[#25D366] px-3 py-2 text-sm font-semibold text-white hover:bg-[#1ebe57]"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
