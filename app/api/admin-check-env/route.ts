import {
  isUsingCustomAdminCredentials,
  isSessionTokenConfigured,
} from "@/lib/adminAuth";
import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/adminSessionGuard";

/** GET: debug only – env flags (no secrets). Requires admin session. */
export async function GET() {
  const denied = await requireAdminSession();
  if (denied) return denied;
  return NextResponse.json({
    usingCustomCredentials: isUsingCustomAdminCredentials(),
    sessionTokenConfigured: isSessionTokenConfigured(),
    blobConfigured: !!process.env.BLOB_READ_WRITE_TOKEN,
    env: process.env.NODE_ENV,
  });
}
