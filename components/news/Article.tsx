import { NewsArticle } from "@/types/types";
import Section from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { formatNewsPublicationdate } from "@/lib/formatter";

type ArticleProps = {
  newsArticle: NewsArticle;
};

export function Article({ newsArticle }: ArticleProps) {
  return (
    <main className="min-h-[80vh] relative">
      <article aria-labelledby="article-title">
        <header className="bg-muted-background pb-12 pt-28 md:pb-16 md:pt-36">
          <Section>
            <Button href="/news" variant="link" className="group gap-2">
              <ArrowLeft className="size-4 shrink-0 group-hover:-translate-x-0.5" />
              <span>All news</span>
            </Button>

            <span className="mt-10 flex flex-wrap items-center gap-x-3 text-sm font-medium text-muted-foreground">
              {formatNewsPublicationdate(newsArticle!.publicationDate)}
            </span>
            <h1
              id="article-title"
              className="mt-4 font-heading text-5xl uppercase md:text-7xl leading-[0.95]"
            >
              {newsArticle!.headline}
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              {newsArticle!.summary}
            </p>
          </Section>
        </header>
      </article>
    </main>
  );
}
