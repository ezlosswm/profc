import { NewsCard } from "@/components/NewsCard";
import Section from "@/components/ui/section";
import { sanityFetch } from "@/lib/sanity";
import { NewsArticle } from "@/types/types";
import { NEWS_QUERY } from "@/lib/queries/queries";

export default async function NewsPage() {
  const news = await sanityFetch<NewsArticle[]>({
    query: NEWS_QUERY,
    errorMessage: "Unable to get the news, call Jules Vasquez",
  });

  return (
    <main aria-labelledby="news-title" className="bg-muted-background">
      <Section className="min-h-[80vh] pb-20 pt-32 md:pb-28 md:pt-40">
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
