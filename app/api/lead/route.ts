import { NextResponse } from "next/server";
import { addLead } from "@/lib/leads";
import {
  checkRateLimit,
  getClientIdentifier,
  isValidEmail,
  isValidPhone,
  sanitizeInput,
} from "@/lib/security";
import { LEAD_AREAS, LEAD_SOURCES, LEAD_SOURCE_LABELS } from "@/lib/leadOptions";

const LEAD_RATE_LIMIT = 5; // per IP per window
const LEAD_RATE_WINDOW_MS = 60 * 1000; // 1 minute
const NAME_MIN = 2;
const NAME_MAX = 80;
const MESSAGE_MAX = 500;
const ALLOWED_SOURCES = new Set<string>(LEAD_SOURCES);
const ALLOWED_AREAS = new Set<string>(LEAD_AREAS);
const PAGE_PATTERN = /^\/[a-z0-9\-/]{0,120}$/;
const NOTIFY_EMAIL = "amphysiotherapy1@gmail.com";

interface LeadRequestBody {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  source?: string;
  area?: string;
  page?: string;
  /** Hidden anti-spam field; real visitors leave it empty. */
  website?: string;
}

/** POST: submit a contact lead. Body: { name, phone, email?, message?, source }. Public. */
export async function POST(request: Request) {
  const clientId = `lead:${getClientIdentifier(request.headers)}`;
  const rl = checkRateLimit(clientId, LEAD_RATE_LIMIT, LEAD_RATE_WINDOW_MS);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "יותר מדי בקשות. נסו שוב בעוד דקה." },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil((rl.resetTime - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  let body: LeadRequestBody;
  try {
    body = (await request.json()) as LeadRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Bots fill the hidden field. Pretend success so they don't retry.
  if (typeof body?.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body?.name === "string" ? sanitizeInput(body.name).trim() : "";
  const phoneRaw = typeof body?.phone === "string" ? body.phone.trim() : "";
  const emailRaw = typeof body?.email === "string" ? body.email.trim() : "";
  const messageRaw = typeof body?.message === "string" ? sanitizeInput(body.message).trim() : "";
  const sourceRaw = typeof body?.source === "string" ? body.source.trim() : "";

  if (!name || name.length < NAME_MIN || name.length > NAME_MAX) {
    return NextResponse.json(
      { error: `שם חייב להיות באורך ${NAME_MIN}–${NAME_MAX} תווים.` },
      { status: 400 }
    );
  }
  if (!phoneRaw || !isValidPhone(phoneRaw)) {
    return NextResponse.json(
      { error: "מספר טלפון לא תקין." },
      { status: 400 }
    );
  }
  const email = emailRaw || undefined;
  if (email && !isValidEmail(email)) {
    return NextResponse.json(
      { error: "כתובת מייל לא תקינה." },
      { status: 400 }
    );
  }
  if (messageRaw.length > MESSAGE_MAX) {
    return NextResponse.json(
      { error: `הודעה ארוכה מדי (מקסימום ${MESSAGE_MAX} תווים).` },
      { status: 413 }
    );
  }
  const source = ALLOWED_SOURCES.has(sourceRaw) ? sourceRaw : "meuhedet";
  const areaRaw = typeof body?.area === "string" ? body.area.trim() : "";
  const area = ALLOWED_AREAS.has(areaRaw) ? areaRaw : undefined;
  const pageRaw = typeof body?.page === "string" ? body.page.trim() : "";
  const page = PAGE_PATTERN.test(pageRaw) ? pageRaw : undefined;

  const userAgent = request.headers.get("user-agent") ?? undefined;
  const ip = getClientIdentifier(request.headers);

  const saved = await addLead({
    name,
    phone: phoneRaw,
    email,
    message: messageRaw || undefined,
    area,
    page,
    source,
    ip,
    userAgent,
  });

  if (!saved.ok || !saved.lead) {
    return NextResponse.json(
      { error: saved.error ?? "שמירת הליד נכשלה. נסו שוב." },
      { status: 500 }
    );
  }

  const lead = saved.lead;
  const sourceLabel =
    LEAD_SOURCE_LABELS[source as keyof typeof LEAD_SOURCE_LABELS] ?? source;
  const subject = `ליד חדש מהאתר: ${lead.name}${area ? ` – ${area}` : ""}`;

  // Optional: notify by email via Resend if configured. Failure here must not fail the request.
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from =
        process.env.LEADS_FROM ??
        process.env.NEWSLETTER_FROM ??
        "פיזיותרפיה.פלוס <onboarding@resend.dev>";
      const to = process.env.LEADS_TO ?? NOTIFY_EMAIL;
      const { error: sendError } = await resend.emails.send({
        from,
        to: [to],
        subject,
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
            <h2 style="color:#2A3080;">ליד חדש מהאתר</h2>
            <p><strong>מקור:</strong> ${escapeHtml(sourceLabel)}${page ? ` (${escapeHtml(page)})` : ""}</p>
            <p><strong>שם:</strong> ${escapeHtml(lead.name)}</p>
            <p><strong>טלפון:</strong> <a href="tel:${escapeHtml(lead.phone)}">${escapeHtml(lead.phone)}</a></p>
            ${area ? `<p><strong>מה כואב:</strong> ${escapeHtml(area)}</p>` : ""}
            ${lead.email ? `<p><strong>אימייל:</strong> <a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></p>` : ""}
            ${lead.message ? `<p><strong>תיאור:</strong><br/>${escapeHtml(lead.message).replace(/\n/g, "<br/>")}</p>` : ""}
            <hr style="margin-top:24px;border:none;border-top:1px solid #e5e7eb;" />
            <p style="color:#6b7280;font-size:13px;">נשלח אוטומטית מאתר פיזיותרפיה.פלוס</p>
          </div>
        `,
      });
      if (sendError) {
        console.error("Lead email notification rejected:", sendError);
      }
    } catch (err) {
      // Don't fail the request, but leave a trace in the server logs.
      console.error("Lead email notification failed:", err);
    }
  } else {
    console.warn("RESEND_API_KEY is not set: lead saved but no email was sent.");
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
