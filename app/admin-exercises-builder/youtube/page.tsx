import type { Metadata } from "next";
import AdminYoutubeClient from "../AdminYoutubeClient";

export const metadata: Metadata = {
  title: "הגדרת סרטונים",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminYoutubePage() {
  return <AdminYoutubeClient />;
}
