"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";

const STORAGE_KEY = "cookie_consent";
// Single source of truth: GTM owns GA4, Google Ads, Meta Pixel, TikTok, etc.
// Do NOT also load those tags from this file (double-counting).
const GTM_ID = "GTM-MK3F6SVQ";

type ConsentState = "granted" | "denied";
type StoredConsent = "accepted" | "declined";

// Update consent on already-loaded tags (used when user changes their choice).
function updateConsent(state: ConsentState) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  };
  if (w.gtag) {
    w.gtag("consent", "update", {
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state,
      analytics_storage: state,
    });
  }
  // If GTM loaded Meta Pixel, mirror consent to fbq when available.
  if (w.fbq) {
    w.fbq("consent", state === "granted" ? "grant" : "revoke");
  }
}

// Load GTM exactly once. Consent Mode v2 is initialized BEFORE GTM so Google
// sees the correct default state on page load, even if the user never clicks
// the banner.
function injectAnalyticsScripts(defaultState: ConsentState) {
  if (typeof document === "undefined") return;
  if (document.getElementById("gtag-consent-init")) return;

  // 1. dataLayer + gtag stub + Consent Mode v2 defaults (must be first).
  const initScript = document.createElement("script");
  initScript.id = "gtag-consent-init";
  initScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('consent', 'default', {
      ad_storage: '${defaultState}',
      ad_user_data: '${defaultState}',
      ad_personalization: '${defaultState}',
      analytics_storage: '${defaultState}',
      wait_for_update: 500
    });
    gtag('set', 'ads_data_redaction', ${defaultState === "granted" ? "false" : "true"});
    gtag('js', new Date());
  `;
  document.head.appendChild(initScript);

  // 2. GTM container (all marketing tags live here).
  const gtmScript = document.createElement("script");
  gtmScript.id = "google-tag-manager";
  gtmScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;
  document.head.appendChild(gtmScript);

  // 3. GTM <noscript> iframe fallback for users without JS.
  const gtmNoscript = document.createElement("noscript");
  const gtmIframe = document.createElement("iframe");
  gtmIframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
  gtmIframe.height = "0";
  gtmIframe.width = "0";
  gtmIframe.style.display = "none";
  gtmIframe.style.visibility = "hidden";
  gtmNoscript.appendChild(gtmIframe);
  document.body.insertBefore(gtmNoscript, document.body.firstChild);
}

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [stored, setStored] = useState<StoredConsent | null | "pending">("pending");

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMounted(true);
      let initial: StoredConsent | null = null;
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw === "accepted" || raw === "declined") initial = raw;
      } catch {
        // ignore storage errors
      }
      setStored(initial);
      // Load tags with the correct default consent on every page load so
      // Tag Assistant / GTM Preview can detect the container immediately.
      injectAnalyticsScripts(initial === "accepted" ? "granted" : "denied");
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const accept = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // ignore
    }
    setStored("accepted");
    updateConsent("granted");
  }, []);

  const decline = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "declined");
    } catch {
      // ignore
    }
    setStored("declined");
    updateConsent("denied");
  }, []);

  if (stored === "accepted" || stored === "declined") {
    return null;
  }
  if (!mounted || typeof document === "undefined") {
    return null;
  }

  const banner = (
    <div
      role="region"
      aria-label="הסכמה לשימוש בעוגיות"
      // z-[10001] sits above FloatingButtons (z-[10000]) so the consent
      // controls are never blocked by the floating phone/WhatsApp CTAs.
      className="fixed bottom-0 left-0 right-0 z-[10001] bg-white border-t-2 border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] pb-[env(safe-area-inset-bottom)]"
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
