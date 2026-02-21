import { isUsingCustomAdminCredentials } from "@/lib/adminAuth";
import { NextResponse } from "next/server";

/** GET: returns whether server has custom admin env vars. No secrets. Use to verify Vercel env. */
export async function GET() {
  return NextResponse.json({
    usingCustomCredentials: isUsingCustomAdminCredentials(),
  });
}
