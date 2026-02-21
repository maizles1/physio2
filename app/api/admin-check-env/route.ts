import {
  isUsingCustomAdminCredentials,
  isSessionTokenConfigured,
} from "@/lib/adminAuth";
import { NextResponse } from "next/server";

/** GET: debug only – are admin env vars present on this server? No secrets. */
export async function GET() {
  return NextResponse.json({
    usingCustomCredentials: isUsingCustomAdminCredentials(),
    sessionTokenConfigured: isSessionTokenConfigured(),
    env: process.env.NODE_ENV,
  });
}
