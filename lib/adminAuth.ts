export const ADMIN_COOKIE_NAME = "admin_session";

const ADMIN_DEFAULT_USER = "admin";
const ADMIN_DEFAULT_PASSWORD = "1234";
const ADMIN_DEFAULT_SESSION_TOKEN = "change-this-admin-session-token";

function normalize(s: string): string {
  return s
    .trim()
    .replace(/^["']|["']$/g, "") // strip surrounding quotes
    .replace(/[\u200B-\u200D\uFEFF]/g, ""); // strip zero-width chars
}

export function getAdminCredentials() {
  const rawUser = process.env.ADMIN_USERNAME ?? ADMIN_DEFAULT_USER;
  const rawPass = process.env.ADMIN_PASSWORD ?? ADMIN_DEFAULT_PASSWORD;
  return {
    username: normalize(typeof rawUser === "string" ? rawUser : String(rawUser)),
    password: normalize(typeof rawPass === "string" ? rawPass : String(rawPass)),
  };
}

export function getAdminSessionToken() {
  const raw = process.env.ADMIN_SESSION_TOKEN || ADMIN_DEFAULT_SESSION_TOKEN;
  return normalize(typeof raw === "string" ? raw : String(raw));
}

export function validateAdminCredentials(username: string, password: string): boolean {
  const u = normalize((username ?? "").trim());
  const p = normalize((password ?? "").trim());
  if (!u || !p) return false;
  const creds = getAdminCredentials();
  return u === creds.username && p === creds.password;
}

/** For debugging: returns whether custom env vars are set (no secrets). Remove in production if desired. */
export function isUsingCustomAdminCredentials(): boolean {
  return !!(process.env.ADMIN_USERNAME?.trim() || process.env.ADMIN_PASSWORD?.trim());
}
