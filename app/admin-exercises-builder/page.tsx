import type { Metadata } from "next";
import AdminBuilderClient from "./AdminBuilderClient";

export const metadata: Metadata = {
  title: "בונה תוכנית תרגילים",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminExercisesBuilderPage() {
  return <AdminBuilderClient />;
}
