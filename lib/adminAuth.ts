export const ADMIN_COOKIE_NAME = "admin_session";

const ADMIN_DEFAULT_USER = "admin";
const ADMIN_DEFAULT_PASSWORD = "1234";
const ADMIN_DEFAULT_SESSION_TOKEN = "change-this-admin-session-token";

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || ADMIN_DEFAULT_USER,
    password: process.env.ADMIN_PASSWORD || ADMIN_DEFAULT_PASSWORD,
  };
}

export function getAdminSessionToken() {
  return process.env.ADMIN_SESSION_TOKEN || ADMIN_DEFAULT_SESSION_TOKEN;
}

export function validateAdminCredentials(username: string, password: string): boolean {
  const creds = getAdminCredentials();
  return username === creds.username && password === creds.password;
}
