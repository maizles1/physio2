import type { Metadata } from "next";
import AdminPlansClient from "./AdminPlansClient";

export const metadata: Metadata = {
  title: "תוכניות שמורות",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminPlansPage() {
  return <AdminPlansClient />;
}
