import Loader from "@/components/Loader";
import NewsPage from "@/components/news/NewsPage";
import { createPageMetadata } from "@/lib/seo";
import { Suspense } from "react";

export const metadata = createPageMetadata({
  title: "MMA News & Updates",
  description:
    "Stay up to date with PROFC Belize MMA news, upcoming fight announcements, event results, fighter updates, and championship developments in Belize.",

  path: "/news",
  openGraph: {
    image: "/images/Logo.webp",
  },
});

export default async function News() {
  return (
    <Suspense fallback={<Loader />}>
      <NewsPage />
    </Suspense>
  );
}
