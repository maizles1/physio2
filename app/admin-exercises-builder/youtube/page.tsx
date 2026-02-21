import type { Metadata } from "next";
import AdminYoutubeClient from "../AdminYoutubeClient";

export const metadata: Metadata = {
  title: "הגדרת סרטונים",
  robots: { index: false, follow: false },
};

export default function AdminYoutubePage() {
  return <AdminYoutubeClient />;
}
