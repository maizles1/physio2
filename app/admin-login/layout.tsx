import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "כניסת אדמין",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://physio-plus.co.il/admin-login" },
};

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
