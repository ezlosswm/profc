import { NewsCard } from "@/components/NewsCard";
import Section from "@/components/ui/section";
import { sanityFetch } from "@/lib/sanity";
import { createPageMetadata } from "@/lib/seo";
import { NewsArticle } from "@/types/types";

export const metadata = createPageMetadata({
  title: "MMA News & Updates",
  description:
    "Stay up to date with PROFC Belize MMA news, upcoming fight announcements, event results, fighter updates, and championship developments in Belize.",

  path: "/news",
  openGraph: {
    image: "/images/Logo.webp",
  },
});

const NEWS_QUERY = `*[_type == "news"]`;

export default async function News() {
  const news = await sanityFetch<NewsArticle[]>({
    query: NEWS_QUERY,
    errorMessage: "Unable to get the news, call Jules Vasquez",
  });

  return (
    <main aria-labelledby="news-title">
      <Section className="min-h-[80vh] bg-muted-background pb-20 pt-32 md:pb-28 md:pt-40">
        <h1
          id="news-title"
          className="font-heading text-6xl uppercase md:text-7xl leading-[0.9]"
        >
          News
        </h1>
        <p className="mt-6 max-w-lg text-muted-foreground">
          Announcements, fight cards and results from PROFC Belize
        </p>
        <div className="mt-10 grid gap-x-8 gap-y-12 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {news!.map((article) => (
            <NewsCard key={article.slug.current} article={article} />
          ))}
        </div>
      </Section>
    </main>
  );
}
