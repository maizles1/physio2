import { NextResponse } from "next/server";
import { isValidEmail } from "@/lib/security";
import { addNewsletterSubscriber } from "@/lib/newsletterStorage";

/** POST: subscribe to newsletter. Body: { email: string }. Public. */
export async function POST(request: Request) {
  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const raw = typeof body?.email === "string" ? body.email.trim() : "";
  if (!raw) {
    return NextResponse.json({ error: "email required" }, { status: 400 });
  }
  if (!isValidEmail(raw)) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
  }

  const result = await addNewsletterSubscriber(raw);
  if (!result.ok) {
    return NextResponse.json(
      { error: result.error ?? "Subscription failed" },
      { status: 500 }
    );
  }

  if (result.alreadySubscribed) {
    return NextResponse.json({
      ok: true,
      message: "already_subscribed",
    });
  }

  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from =
        process.env.NEWSLETTER_FROM ?? "פיזיותרפיה.פלוס <onboarding@resend.dev>";
      await resend.emails.send({
        from,
        to: [raw],
        subject: "נרשמת לעדכונים – פיזיותרפיה.פלוס",
        html: `
          <p dir="rtl" style="font-family: Arial, sans-serif; font-size: 16px;">
            שלום,
          </p>
          <p dir="rtl" style="font-family: Arial, sans-serif; font-size: 16px;">
            תודה שנרשמת לעדכונים ולמאמרי הבלוג של פיזיותרפיה.פלוס. נשלח אליך עדכונים וטיפים מדי פעם.
          </p>
          <p dir="rtl" style="font-family: Arial, sans-serif; font-size: 16px;">
            בברכה,<br />
            צוות פיזיותרפיה.פלוס
          </p>
        `,
      });
    } catch {
      // Don't fail the request if welcome email fails; subscription was saved
    }
  }

  return NextResponse.json({ ok: true, message: "subscribed" });
}
