import { ImageAsset, NewsArticle } from "@/types/types";
import Section from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { formatDateTime } from "@/lib/formatter";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type ArticleProps = {
  newsArticle: NewsArticle;
};

export function Article({ newsArticle }: ArticleProps) {
  return (
    <main className="min-h-[80vh] relative">
      <article aria-labelledby="article-title">
        <header className="bg-muted-background pb-12 pt-28 md:pb-16 md:pt-36">
          <Section className="max-w-3xl!">
            <Button href="/news" variant="link" className="group gap-2">
              <ArrowLeft
                aria-hidden="true"
                className="size-4 shrink-0 group-hover:-translate-x-0.5"
              />
              <span>All news</span>
            </Button>

            <h1
              id="article-title"
              className="mt-10 font-heading text-5xl uppercase md:text-7xl leading-[0.95]"
            >
              {newsArticle!.headline}
            </h1>
            {newsArticle.author ? (
              <div className="mt-3 text-sm items-center text-muted-foreground flex flex-wrap gap-3">
                <span>by {newsArticle.author}</span>
                <span>·</span>
                <span>{formatDateTime(newsArticle!.publicationDate)}</span>
              </div>
            ) : (
              <></>
            )}

            <PortableText value={newsArticle.content} components={components} />
          </Section>
        </header>
      </article>
    </main>
  );
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-14 font-heading text-4xl uppercase leading-[0.9] md:text-5xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 font-heading text-2xl uppercase leading-[0.9] tracking-wider md:text-3xl">
        {children}
      </h3>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href: string = value?.href ?? "";
      return (
        <Button
          href={href}
          variant="link"
          target="_blank"
          rel="noopener noreferrer"
          className="text-base p-0! italic underline underline-offset-4"
        >
          {children}
        </Button>
      );
    },
  },
  types: {
    image: ({ value }: { value: ImageAsset }) => {
      if (!value) return null;
      return (
        <figure className="my-10">
          <Image
            src={urlFor(value.asset).width(1920).height(1080).url()}
            alt={value.asset._ref ?? ""}
            width={1920}
            height={1080}
            className="w-full object-cover"
            loading="lazy"
          />
        </figure>
      );
    },
  },
};
