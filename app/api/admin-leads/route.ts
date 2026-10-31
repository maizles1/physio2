import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/adminSessionGuard";
import { readLeads } from "@/lib/leads";

/** GET: all saved leads, newest first (admin only). IP and browser details are left out. */
export async function GET() {
  const denied = await requireAdminSession();
  if (denied) return denied;
  const leads = await readLeads();
  const sorted = [...leads]
    .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))
    .map((lead) => ({
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      message: lead.message,
      area: lead.area,
      page: lead.page,
      source: lead.source,
      createdAt: lead.createdAt,
    }));
  return NextResponse.json(
    { leads: sorted },
    { headers: { "Cache-Control": "no-store" } }
  );
}
