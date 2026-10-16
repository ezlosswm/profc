import { Button } from "@/components/ui/button";
import Section from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/sectionheading";
import { newsArticles } from "@/data/news";
import { ArrowRight } from "lucide-react";
import { NewsCard } from "./NewsCard";

export function LatestNews() {
  return (
    <div className="border-t border-border bg-muted-background py-20 md:py-28">
      <Section aria-labelledby="latest-news-title">
        <div className="flex items-baseline w-full justify-between">
          <SectionHeading id="latest-news-title" heading="Latest News" />

          <Button variant="link" className="group">
            <span>View all news</span>
            <ArrowRight
              aria-hidden="true"
              className="group-hover:translate-x-0.5 ease-in"
            />
          </Button>
        </div>

        {newsArticles.length === 0 ? (
          <p className="mt-10 border-t border-border pt-6 text-foreground/70">
            None
          </p>
        ) : (
          <div className="mt-10 grid gap-x-8 gap-y-12 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {newsArticles.map((article) => (
              <NewsCard key={article.slug} {...article} />
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
