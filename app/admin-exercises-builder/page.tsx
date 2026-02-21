import type { Metadata } from "next";
import { Suspense } from "react";
import AdminBuilderClient from "./AdminBuilderClient";

export const metadata: Metadata = {
  title: "בונה תוכנית תרגילים",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminExercisesBuilderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500">טוען...</div>}>
      <AdminBuilderClient />
    </Suspense>
  );
}
