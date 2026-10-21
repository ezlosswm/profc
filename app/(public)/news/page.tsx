import { createPageMetadata } from "@/lib/seo";
export const metadata = createPageMetadata({
  title: "MMA News & Updates",
  description:
    "Stay up to date with PROFC Belize MMA news, upcoming fight announcements, event results, fighter updates, and championship developments in Belize.",

  path: "/news",
});

export function News() {
  <>
    <div className="mt-16 min-h-dvh">
      <h1>News</h1>
    </div>
  </>;
}
export default News;
