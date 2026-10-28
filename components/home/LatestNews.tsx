import { Button } from "@/components/ui/button";
import Section from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/sectionheading";
import { ArrowRight } from "lucide-react";
import { NewsCard } from "../NewsCard";
import type { NewsArticle } from "@/types/types";
import { sanityFetch } from "@/lib/sanity";
import { NEWS_QUERY } from "@/lib/queries/queries";

export async function LatestNews() {
  const news = await sanityFetch<NewsArticle[]>({
    query: NEWS_QUERY,
    errorMessage: "Unable to get the news, call Jules Vasquez",
  });

  return (
    <div className="border-t border-border bg-muted-background py-20 md:py-28">
      <Section aria-labelledby="latest-news-title">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading id="latest-news-title" heading="Latest News" />

          <Button variant="link" className="group px-0! sm:px-4 justify-start">
            <span>View all news</span>
            <ArrowRight
              aria-hidden="true"
              className="group-hover:translate-x-0.5 ease-in"
            />
          </Button>
        </div>

        {news!.length === 0 ? (
          <p className="mt-10 border-t border-border pt-6 text-muted-foreground">
            None
          </p>
        ) : (
          <div className="mt-10 grid gap-x-8 gap-y-12 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {news!.map((article) => (
              <NewsCard key={article.slug.current} article={article} />
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
