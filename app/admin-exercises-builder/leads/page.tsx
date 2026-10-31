import type { Metadata } from "next";
import AdminLeadsClient from "./AdminLeadsClient";

export const metadata: Metadata = {
  title: "לידים",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminLeadsPage() {
  return <AdminLeadsClient />;
}
