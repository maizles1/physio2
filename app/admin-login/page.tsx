"use client";

import { useEffect, useState } from "react";

export default function AdminLoginPage() {
  const [nextPath, setNextPath] = useState("/admin-exercises-builder");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [configBanner, setConfigBanner] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next = params.get("next");
    if (next) setNextPath(next);
    if (params.get("error") === "config") {
      setConfigBanner(
        "השרת לא מוגדר לכניסת אדמין: הגדרו בפרודקשן את ADMIN_SESSION_TOKEN ואת ADMIN_PASSWORD (למשל ב-Vercel → Environment Variables)."
      );
    }
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        if (res.status === 503) {
          setError("כניסת אדמין לא זמינה בשרת (חסר ADMIN_SESSION_TOKEN או הגדרות אחרות).");
          return;
        }
        setError(
          data.error === "Invalid credentials" ? "שם משתמש או סיסמה שגויים" : "אירעה שגיאה. נסה שוב."
        );
        return;
      }
      window.location.assign(nextPath);
    } catch {
      setError("אירעה שגיאה. נסה שוב.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4" dir="rtl">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-2xl bg-white shadow-lg border border-gray-200 p-8">
        <h1 className="text-xl font-bold text-gray-900 mb-4">כניסת אדמין</h1>
        {configBanner && (
          <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 mb-4">
            {configBanner}
          </p>
        )}
        <label htmlFor="admin-username" className="block text-sm font-medium text-gray-700 mb-1">
          שם משתמש
        </label>
        <input
          id="admin-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition mb-3"
          autoComplete="username"
          required
        />
        <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-1">
          סיסמה
        </label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
          autoComplete="current-password"
          required
        />
        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full rounded-xl bg-primary-dark text-white font-medium py-3 hover:bg-primary-darker transition disabled:opacity-60"
        >
          {loading ? "מתחבר..." : "כניסה"}
        </button>
      </form>
    </div>
  );
}
