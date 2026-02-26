"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";

const STORAGE_KEY = "cookie_consent";
const GTM_ID = "GTM-58XQH9KN";
const GTAW_ID = "AW-705216601";

function injectAnalyticsScripts() {
  if (typeof document === "undefined") return;
  if (document.getElementById("google-tag-manager")) return;

  const gtmScript = document.createElement("script");
  gtmScript.id = "google-tag-manager";
  gtmScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;
  document.body.appendChild(gtmScript);

  const gtagScript = document.createElement("script");
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GTAW_ID}`;
  gtagScript.async = true;
  document.body.appendChild(gtagScript);

  const gtagConfig = document.createElement("script");
  gtagConfig.id = "google-analytics";
  gtagConfig.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GTAW_ID}');
  `;
  document.body.appendChild(gtagConfig);
}

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [consent, setConsent] = useState<"accepted" | "declined" | null | "pending">("pending");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as "accepted" | "declined" | null;
      if (stored === "accepted" || stored === "declined") {
        setConsent(stored);
        if (stored === "accepted") injectAnalyticsScripts();
      } else {
        setConsent(null);
      }
    } catch {
      setConsent(null);
    }
  }, [mounted]);

  const accept = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // ignore
    }
    setConsent("accepted");
    injectAnalyticsScripts();
  }, []);

  const decline = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "declined");
    } catch {
      // ignore
    }
    setConsent("declined");
  }, []);

  if (consent === "accepted" || consent === "declined") {
    return null;
  }
  if (!mounted || typeof document === "undefined") {
    return null;
  }

  const banner = (
    <div
      role="region"
      aria-label="הסכמה לשימוש בעוגיות"
      className="fixed bottom-0 left-0 right-0 z-[9998] bg-white border-t-2 border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] pb-[env(safe-area-inset-bottom)]"
      dir="rtl"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-gray-700 text-sm leading-relaxed max-w-2xl">
            אנחנו משתמשים בעוגיות כדי לשפר את החוויה ולנתח תעבורה באתר. לחיצה על &quot;מאשר/ים&quot; מסכימה לשימוש.{" "}
            <Link
              href="/privacy"
              className="text-[#2080C0] hover:underline font-medium"
            >
              מדיניות פרטיות
            </Link>
          </p>
          <div className="flex gap-3 shrink-0">
            <button
              type="button"
              onClick={decline}
              className="rounded-xl border-2 border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 min-h-[44px] transition-colors"
            >
              דחה
            </button>
            <button
              type="button"
              onClick={accept}
              className="rounded-xl bg-[#2A3080] hover:bg-[#004080] text-white px-5 py-2.5 text-sm font-medium min-h-[44px] transition-colors"
            >
              מאשר/ים
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(banner, document.body);
}
